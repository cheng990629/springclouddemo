// API相关类型定义

// 通用响应格式
export interface ApiResponse<T = any> {
  code: number
  message: string
  data: T
  success: boolean
}

// 分页参数
export interface PaginationParams {
  page: number
  pageSize: number
  total?: number
}

// 分页响应
export interface PaginatedResponse<T> extends ApiResponse<{
  list: T[]
  pagination: {
    current: number
    pageSize: number
    total: number
    totalPages: number
  }
}> {}

// 请求状态
export type RequestStatus = 'idle' | 'loading' | 'success' | 'error'

// HTTP方法
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

// 请求配置
export interface RequestConfig {
  method?: HttpMethod
  headers?: Record<string, string>
  params?: Record<string, any>
  data?: any
  timeout?: number
}

// 错误响应
export interface ApiError {
  code: number
  message: string
  details?: any
}
