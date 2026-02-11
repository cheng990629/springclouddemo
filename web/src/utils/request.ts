// HTTP请求工具函数

export interface RequestConfig {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  headers?: Record<string, string>
  body?: any
  timeout?: number
}

export interface ResponseData<T = any> {
  code: number
  message: string
  data: T
}

// 请求基础配置
const DEFAULT_CONFIG: Required<Omit<RequestConfig, 'body'>> & { timeout: number } = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
}

// 基础请求函数
export const request = async <T = any>(
  url: string,
  config: RequestConfig = {}
): Promise<ResponseData<T>> => {
  const {
    method = DEFAULT_CONFIG.method,
    headers = {},
    body,
    timeout = DEFAULT_CONFIG.timeout,
  } = config

  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), timeout)

  try {
    const requestHeaders = {
      ...DEFAULT_CONFIG.headers,
      ...headers,
    }

    const requestConfig: RequestInit = {
      method,
      headers: requestHeaders,
      signal: controller.signal,
    }

    if (body && method !== 'GET') {
      requestConfig.body = typeof body === 'string' ? body : JSON.stringify(body)
    }

    const response = await fetch(url, requestConfig)
    clearTimeout(timeoutId)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const result: ResponseData<T> = await response.json()
    return result
  } catch (error) {
    clearTimeout(timeoutId)

    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        throw new Error('Request timeout')
      }
      throw error
    }

    throw new Error('Unknown error occurred')
  }
}

// GET请求
export const get = <T = any>(url: string, config?: Omit<RequestConfig, 'method' | 'body'>) => {
  return request<T>(url, { ...config, method: 'GET' })
}

// POST请求
export const post = <T = any>(url: string, data?: any, config?: Omit<RequestConfig, 'method' | 'body'>) => {
  return request<T>(url, { ...config, method: 'POST', body: data })
}

// PUT请求
export const put = <T = any>(url: string, data?: any, config?: Omit<RequestConfig, 'method' | 'body'>) => {
  return request<T>(url, { ...config, method: 'PUT', body: data })
}

// DELETE请求
export const del = <T = any>(url: string, config?: Omit<RequestConfig, 'method' | 'body'>) => {
  return request<T>(url, { ...config, method: 'DELETE' })
}

// PATCH请求
export const patch = <T = any>(url: string, data?: any, config?: Omit<RequestConfig, 'method' | 'body'>) => {
  return request<T>(url, { ...config, method: 'PATCH', body: data })
}
