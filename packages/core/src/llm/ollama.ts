import {
  VercelAiClient,
  VercelAiClientConfigureProps,
} from './vercelai-client';
import { testConnection } from '../utils/connection-test';
import { LanguageModelV1 } from 'ai';

type ConfigureProps = {
  baseURL?: string;
} & VercelAiClientConfigureProps;

type OllamaProvider = (model: string) => LanguageModelV1;
interface Module {
  createOllama: (options: { baseURL: string }) => OllamaProvider;
}
/**
 * Ollama Assistant LLM for Client only
 */
export class OllamaAssistant extends VercelAiClient {
  protected static baseURL: string = 'http://127.0.0.1:11434/api';
  protected static instance: OllamaAssistant | null = null;
  protected providerInstance: OllamaProvider | null = null;

  protected static checkBaseURL() {
    if (!OllamaAssistant.baseURL || OllamaAssistant.baseURL.trim() === '') {
      throw new Error(
        'Base URL is not configured for Ollama. Please call configure() first.'
      );
    }
  }

  public static getBaseURL() {
    return OllamaAssistant.baseURL;
  }

  private static async loadModule(): Promise<Module> {
    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore dynamic import will be installed by the user
      return await import('ollama-ai-provider');
    } catch (error) {
      throw new Error(`Failed to load ollama-ai-provider: ${error}`);
    }
  }

  public static async testConnection(
    apiKey: string,
    model: string
  ): Promise<boolean> {
    const module = await this.loadModule();
    const llm = module.createOllama({
      baseURL: OllamaAssistant.baseURL,
    });
    return await testConnection(llm(model));
  }

  public static override configure(config: ConfigureProps) {
    // remove baseURL from config
    const { baseURL, ...rest } = config;
    // config baseURL
    if (baseURL) OllamaAssistant.baseURL = baseURL;
    // call parent configure, with config without baseURL
    super.configure(rest);
  }

  private constructor(module: Module) {
    super();
    this.initializeProvider(module);
  }

  private initializeProvider(module: Module) {
    if (!OllamaAssistant.model) {
      const options = {
        baseURL: OllamaAssistant.baseURL,
      };

      this.providerInstance = module.createOllama(options);

      // create a language model from the provider instance, e.g. phi3
      this.llm = this.providerInstance(OllamaAssistant.model);
    }
  }

  public static async getInstance(): Promise<OllamaAssistant> {
    if (!OllamaAssistant.instance) {
      const module = await this.loadModule();
      OllamaAssistant.instance = new OllamaAssistant(module);
    }

    if (!OllamaAssistant.instance.llm) {
      OllamaAssistant.instance.restart();
      throw new Error('OllamaAssistant is not initialized');
    }
    return OllamaAssistant.instance;
  }

  public override restart() {
    super.restart();
    // need to reset the instance so getInstance doesn't return the same instance
    this.providerInstance = null;
    OllamaAssistant.instance = null;
  }
}
