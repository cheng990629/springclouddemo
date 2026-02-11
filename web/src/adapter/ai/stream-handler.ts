/**
 * 流处理器
 *
 * 处理 AI 响应的流式数据，支持实时更新和错误处理
 */

import type { AIStreamChunk, AIMessage } from './types';

export interface StreamHandlerOptions {
  onStart?: () => void;
  onChunk?: (chunk: AIStreamChunk) => void;
  onMessage?: (message: AIMessage) => void;
  onComplete?: (fullMessage: AIMessage) => void;
  onError?: (error: Error) => void;
}

export class StreamHandler {
  private options: StreamHandlerOptions;
  private accumulatedMessage: AIMessage | null = null;

  constructor(options: StreamHandlerOptions = {}) {
    this.options = options;
  }

  async handleStream(stream: AsyncGenerator<AIStreamChunk, void, unknown>): Promise<AIMessage> {
    this.options.onStart?.();

    try {
      for await (const chunk of stream) {
        this.options.onChunk?.(chunk);
        this.processChunk(chunk);
      }

      if (!this.accumulatedMessage) {
        throw new Error('No message received from stream');
      }

      this.options.onComplete?.(this.accumulatedMessage);
      return this.accumulatedMessage;
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error));
      this.options.onError?.(err);
      throw err;
    }
  }

  private processChunk(chunk: AIStreamChunk): void {
    if (!chunk.choices || chunk.choices.length === 0) return;

    const choice = chunk.choices[0];
    const delta = choice.delta;

    if (!this.accumulatedMessage) {
      this.accumulatedMessage = {
        role: delta.role || 'assistant',
        content: delta.content || '',
        name: delta.name,
        tool_calls: delta.tool_calls ? [...delta.tool_calls] : undefined,
      };
    } else {
      // 累积内容
      if (delta.content) {
        this.accumulatedMessage.content += delta.content;
      }

      // 处理工具调用
      if (delta.tool_calls) {
        if (!this.accumulatedMessage.tool_calls) {
          this.accumulatedMessage.tool_calls = [];
        }

        for (const toolCall of delta.tool_calls) {
          const existingIndex = this.accumulatedMessage.tool_calls.findIndex(
            tc => tc.id === toolCall.id
          );

          if (existingIndex >= 0) {
            // 更新现有工具调用
            const existing = this.accumulatedMessage.tool_calls[existingIndex];
            if (toolCall.function?.arguments) {
              existing.function.arguments += toolCall.function.arguments;
            }
          } else {
            // 添加新工具调用
            this.accumulatedMessage.tool_calls.push({ ...toolCall });
          }
        }
      }
    }

    // 实时通知消息更新
    if (this.accumulatedMessage) {
      this.options.onMessage?.(this.accumulatedMessage);
    }
  }

  getAccumulatedMessage(): AIMessage | null {
    return this.accumulatedMessage;
  }
}

// 便捷的流处理函数
export async function handleAIStream(
  stream: AsyncGenerator<AIStreamChunk, void, unknown>,
  options: StreamHandlerOptions = {}
): Promise<AIMessage> {
  const handler = new StreamHandler(options);
  return handler.handleStream(stream);
}

