/**
 * OpenAI 适配器
 */

import type { AIAdapter, AIConfig, AIRequest, AIResponse, AIStreamChunk } from './types';

export class OpenAIAdapter implements AIAdapter {
  private config: AIConfig;

  constructor(config: AIConfig) {
    this.config = config;
  }

  async chat(request: AIRequest): Promise<AIResponse> {
    const response = await fetch(`${this.config.baseURL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.config.apiKey}`,
      },
      body: JSON.stringify({
        model: this.config.model,
        messages: request.messages,
        temperature: this.config.temperature ?? 0.7,
        max_tokens: this.config.maxTokens ?? 2000,
        stream: false,
        tools: request.tools,
        tool_choice: request.tool_choice,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  async *chatStream(request: AIRequest): AsyncGenerator<AIStreamChunk, void, unknown> {
    const response = await fetch(`${this.config.baseURL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.config.apiKey}`,
      },
      body: JSON.stringify({
        model: this.config.model,
        messages: request.messages,
        temperature: this.config.temperature ?? 0.7,
        max_tokens: this.config.maxTokens ?? 2000,
        stream: true,
        tools: request.tools,
        tool_choice: request.tool_choice,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status} ${response.statusText}`);
    }

    const reader = response.body?.getReader();
    if (!reader) {
      throw new Error('Failed to get response reader');
    }

    const decoder = new TextDecoder();
    let buffer = '';

    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            if (data === '[DONE]') return;

            try {
              const chunk: AIStreamChunk = JSON.parse(data);
              yield chunk;
            } catch (e) {
              // 忽略解析错误
            }
          }
        }
      }
    } finally {
      reader.releaseLock();
    }
  }

  async listModels(): Promise<string[]> {
    const response = await fetch(`${this.config.baseURL}/models`, {
      headers: {
        'Authorization': `Bearer ${this.config.apiKey}`,
      },
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data.data.map((model: any) => model.id);
  }

  validateConfig(config: AIConfig): boolean {
    return !!(config.apiKey && config.model && config.baseURL);
  }
}

