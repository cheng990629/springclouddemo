/**
 * AI 相关类型定义
 */

export interface AIMessage {
  role: 'system' | 'user' | 'assistant' | 'tool';
  content: string;
  name?: string;
  tool_calls?: AIToolCall[];
  tool_call_id?: string;
}

export interface AIToolCall {
  id: string;
  type: 'function';
  function: {
    name: string;
    arguments: string;
  };
}

export interface AIConfig {
  provider: 'openai' | 'anthropic' | 'deepseek' | 'custom';
  model: string;
  apiKey: string;
  baseURL?: string;
  temperature?: number;
  maxTokens?: number;
  stream?: boolean;
}

export interface AIRequest {
  messages: AIMessage[];
  config?: Partial<AIConfig>;
  tools?: AITool[];
  tool_choice?: 'none' | 'auto' | 'required';
}

export interface AIResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: AIChoice[];
  usage: AIUsage;
}

export interface AIChoice {
  index: number;
  message: AIMessage;
  finish_reason: 'stop' | 'length' | 'tool_calls' | 'content_filter';
}

export interface AIUsage {
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
}

export interface AITool {
  type: 'function';
  function: {
    name: string;
    description: string;
    parameters: {
      type: 'object';
      properties: Record<string, any>;
      required?: string[];
    };
  };
}

export interface AIStreamChunk {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: Array<{
    index: number;
    delta: Partial<AIMessage>;
    finish_reason: string | null;
  }>;
  usage?: AIUsage;
}

export interface AIAdapter {
  chat(request: AIRequest): Promise<AIResponse>;
  chatStream(request: AIRequest): AsyncGenerator<AIStreamChunk, void, unknown>;
  listModels(): Promise<string[]>;
  validateConfig(config: AIConfig): boolean;
}

