import { ToolCall } from 'ai';
import {
  CustomFunctionOutputProps,
  CustomFunctions,
  ToolCallMessage,
} from '../types';

export async function proceedToolCall({
  toolCall,
  customFunctions,
  previousOutput,
}: {
  toolCall: ToolCall<string, unknown>;
  customFunctions: CustomFunctions;
  previousOutput?: CustomFunctionOutputProps<unknown, unknown>[];
}): Promise<CustomFunctionOutputProps<unknown, unknown>> {
  const functionName = toolCall.toolName;
  const functionArgs = toolCall.args as Record<string, unknown>;

  try {
    // get the registered function, context and callback message
    const { func, context, callbackMessage, component } =
      customFunctions[functionName];

    // execute the function
    const output = await func({
      functionName,
      functionArgs: functionArgs,
      functionContext: context,
      previousOutput,
    });

    return {
      ...output,
      name: functionName,
      args: functionArgs,
      customMessageCallback: callbackMessage,
      ...(component
        ? { component: { toolName: functionName, component } }
        : {}),
    };
  } catch (err) {
    // make sure to return something back to openai when the function execution fails
    return {
      type: 'errorOutput',
      name: functionName,
      args: functionArgs,
      result: {
        success: false,
        details: `The function "${functionName}" is not executed. The error message is: ${err}`,
      },
    };
  }
}

export function createToolCallCustomMessage(
  toolCall: ToolCall<string, unknown>,
  output: CustomFunctionOutputProps<unknown, unknown>
): ToolCallMessage | null {
  if (
    output &&
    output.component &&
    output.result &&
    typeof output.result === 'object' &&
    'success' in output.result &&
    output.result.success === true
  ) {
    try {
      return {
        toolCallId: toolCall.toolCallId,
        toolName: toolCall.toolName,
        args: toolCall.args as Record<string, unknown>,
        additionalData: output.data,
        llmResult: output.result,
        // componentName: output.component?.component.displayName,
        // element: output.customMessageCallback({
        //   functionName: output.name,
        //   functionArgs: output.args || {},
        //   output: output,
        // }),
      };
    } catch (error) {
      console.error(
        `Error creating custom message for tool call ${toolCall.toolCallId}: ${error}`
      );
    }
  }
  return null;
}
