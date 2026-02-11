/**
 * AI 服务管理器
 *
 * 统一管理多个 AI 适配器，支持负载均衡和故障转移
 */

import type { AIAdapter, AIConfig, AIRequest, AIResponse, AIStreamChunk } from './types';
import { OpenAIAdapter } from './openai-adapter';

export class AIService {
  private adapters: Map<string, AIAdapter> = new Map();
  private defaultProvider: string = 'openai';

  constructor() {
    this.registerAdapter('openai', new OpenAIAdapter({
      provider: 'openai',
      model: import.meta.env.VITE_AI_MODEL || 'gpt-4',
      apiKey: import.meta.env.VITE_AI_API_KEY || '',
      baseURL: import.meta.env.VITE_AI_BASE_URL || 'https://api.openai.com/v1',
    }));
  }

  registerAdapter(provider: string, adapter: AIAdapter): void {
    this.adapters.set(provider, adapter);
  }

  setDefaultProvider(provider: string): void {
    if (!this.adapters.has(provider)) {
      throw new Error(`Adapter for provider '${provider}' not found`);
    }
    this.defaultProvider = provider;
  }

  async chat(request: AIRequest, provider?: string): Promise<AIResponse> {
    const adapter = this.getAdapter(provider || this.defaultProvider);
    return adapter.chat(request);
  }

  async *chatStream(request: AIRequest, provider?: string): AsyncGenerator<AIStreamChunk, void, unknown> {
    const adapter = this.getAdapter(provider || this.defaultProvider);
    yield* adapter.chatStream(request);
  }

  async listModels(provider?: string): Promise<string[]> {
    const adapter = this.getAdapter(provider || this.defaultProvider);
    return adapter.listModels();
  }

  validateConfig(config: AIConfig): boolean {
    const adapter = this.adapters.get(config.provider);
    return adapter ? adapter.validateConfig(config) : false;
  }

  private getAdapter(provider: string): AIAdapter {
    const adapter = this.adapters.get(provider);
    if (!adapter) {
      throw new Error(`Adapter for provider '${provider}' not found`);
    }
    return adapter;
  }

  getAvailableProviders(): string[] {
    return Array.from(this.adapters.keys());
  }
}

// 创建全局 AI 服务实例
export const aiService = new AIService();

