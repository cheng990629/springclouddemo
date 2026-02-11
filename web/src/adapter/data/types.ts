/**
 * 数据访问相关类型定义
 */

export interface RequestConfig {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  params?: Record<string, any>;
  data?: any;
  timeout?: number;
  responseType?: 'json' | 'text' | 'blob' | 'arraybuffer';
}

export interface Response<T = any> {
  data: T;
  status: number;
  statusText: string;
  headers: Record<string, string>;
  config: RequestConfig;
}

export interface PaginationParams {
  page?: number;
  pageSize?: number;
  sort?: string;
  order?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface DataAdapter {
  request<T = any>(config: RequestConfig): Promise<Response<T>>;
  get<T = any>(url: string, params?: Record<string, any>): Promise<Response<T>>;
  post<T = any>(url: string, data?: any): Promise<Response<T>>;
  put<T = any>(url: string, data?: any): Promise<Response<T>>;
  delete<T = any>(url: string): Promise<Response<T>>;
}

export interface StorageAdapter {
  get<T = any>(key: string): Promise<T | null>;
  set<T = any>(key: string, value: T): Promise<void>;
  remove(key: string): Promise<void>;
  clear(): Promise<void>;
  has(key: string): Promise<boolean>;
  keys(): Promise<string[]>;
}

export interface GraphQLQuery {
  query: string;
  variables?: Record<string, any>;
  operationName?: string;
}

export interface GraphQLAdapter {
  query<T = any>(query: GraphQLQuery): Promise<T>;
  mutate<T = any>(mutation: GraphQLQuery): Promise<T>;
  subscribe<T = any>(subscription: GraphQLQuery): AsyncGenerator<T, void, unknown>;
}

