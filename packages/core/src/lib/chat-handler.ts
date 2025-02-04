import { CoreMessage, LanguageModel, Message, streamText, ToolSet } from 'ai';
import { convertOpenAIToolsToVercelTools } from './tool-utils';

/**
 * Abstract class for handling token management in chat interactions
 */
abstract class TokenHandler {
  // token count for each message, stored using the usage.totalTokens returned by the streamText function
  protected messageTokenCount: number[] = [];
  // total tokens used so far
  protected previousTotalTokens: { value: number } = { value: 0 };
  // maximum number of tokens allowed
  protected tokenLimit: number;

  /**
   * @param {number} tokenLimit - Maximum number of tokens allowed (default: 128K)
   */
  constructor(tokenLimit: number = 128 * 1024) {
    this.tokenLimit = tokenLimit;
  }

  /**
   * Calculates the total number of tokens from an array of token counts
   * @param {number[]} messageTokenCount - Array of token counts per message
   * @returns {number} Total token count
   */
  protected calculateTotalTokens(messageTokenCount: number[]): number {
    return messageTokenCount.reduce((acc, curr) => acc + curr, 0);
  }

  /**
   * Removes oldest messages until total token count is within limit
   * @param {Message[]} messages - Array of chat messages
   * @param {number[]} messageTokenCount - Array of token counts per message
   * @param {number} tokenLimit - Maximum allowed tokens
   */
  protected trimMessagesByTokenLimit(
    messages: Array<CoreMessage | Message>,
    messageTokenCount: number[],
    tokenLimit: number
  ) {
    while (
      this.calculateTotalTokens(messageTokenCount) > tokenLimit &&
      messages.length > 1
    ) {
      messages.shift();
      messageTokenCount.shift();
    }
  }

  /**
   * Handles stream completion event and updates token counts
   * @param {Object} event - Stream completion event
   * @param {Object} event.usage - Token usage information
   * @param {number} event.usage.totalTokens - Total tokens used
   */
  protected handleStreamFinish(event: { usage: { totalTokens: number } }) {
    const currentMessageTokens =
      event.usage.totalTokens - this.previousTotalTokens.value;
    this.messageTokenCount.push(currentMessageTokens);
    this.previousTotalTokens.value = event.usage.totalTokens;
  }

  /**
   * Abstract method to process incoming requests
   * @param {Request} req - Incoming request object
   * @returns {Promise<Response>} Response promise
   */
  abstract processRequest(req: Request): Promise<Response>;
}

/**
 * Handles chat-specific token management and request processing
 * @extends TokenHandler
 */
export class ChatHandler extends TokenHandler {
  private model: LanguageModel;
  private tools?: ToolSet;
  private instructions?: string;
  private messageHistory: Array<CoreMessage | Message> = [];

  /**
   * @param {Object} config - Configuration object
   * @param {LanguageModel} config.model - Language model instance to use for chat
   * @param {ToolSet} [config.tools] - Optional tools configuration
   * @param {string} [config.instructions] - Optional system instructions
   */
  constructor({
    model,
    tools,
    instructions,
  }: {
    model: LanguageModel;
    tools?: ToolSet;
    instructions?: string;
  }) {
    super(128 * 1024);
    this.model = model;
    this.tools = tools;
    this.instructions = instructions;
  }

  /**
   * Processes chat requests, managing message history and token limits
   * @param {Request} req - Incoming request object
   * @returns {Promise<Response>} Streaming response
   */
  async processRequest(req: Request): Promise<Response> {
    const { message, imageBase64, tools, instructions } = await req.json();
    
    // Only update tools and instructions if provided (first time)
    if (tools) {
      this.tools = convertOpenAIToolsToVercelTools(tools);
    }
    if (instructions) {
      this.instructions = instructions;
    }

    if (message) {
      if (imageBase64) {
        this.messageHistory.push({
          role: message.role,
          content: [
            { type: 'text', text: message.content },
            { type: 'image', image: imageBase64 },
          ],
        });
      } else {
        this.messageHistory.push(message);
      }
    }

    this.trimMessagesByTokenLimit(
      this.messageHistory,
      this.messageTokenCount,
      this.tokenLimit
    );

    const result = streamText({
      model: this.model,
      system: this.instructions,
      messages: this.messageHistory as CoreMessage[],
      tools: this.tools,
      onFinish: (event) => this.handleStreamFinish(event),
    });

    for await (const chunk of result.fullStream) {
      if (chunk.type === 'error') {
        console.error('API server error:', chunk);
      }
    }
    return result.toDataStreamResponse();
  }

  clearHistory(): void {
    this.messageHistory = [];
    this.messageTokenCount = [];
    this.previousTotalTokens.value = 0;
  }
}
