/**
 * Anthropic Claude 适配器
 * TODO: 实现 Claude API 适配
 */

import type { AIAdapter, AIRequest, AIResponse, AIConfig } from './types';

export class AnthropicAdapter implements AIAdapter {
  // TODO: 实现 Anthropic API 适配逻辑
  chat(_request: AIRequest): Promise<AIResponse> {
    throw new Error('Anthropic adapter not implemented yet');
  }

  async *chatStream(_request: AIRequest): AsyncGenerator<any, void, unknown> {
    throw new Error('Anthropic adapter not implemented yet');
  }

  listModels(): Promise<string[]> {
    throw new Error('Anthropic adapter not implemented yet');
  }

  validateConfig(_config: AIConfig): boolean {
    return false;
  }
}

