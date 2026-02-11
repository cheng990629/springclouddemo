import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

class ApiAdapter {
  private instance: AxiosInstance

  constructor() {
    this.instance = axios.create({
      baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
      timeout: Number(import.meta.env.VITE_API_TIMEOUT) || 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    })

    this.setupInterceptors()
  }

  private setupInterceptors() {
    // 请求拦截器
    this.instance.interceptors.request.use(
      (config) => {
        // 添加认证token等
        const token = localStorage.getItem('token')
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }

        // 演示用的mock数据拦截
        if (import.meta.env.VITE_ENABLE_MOCK === 'true' || config.url?.startsWith('/api/')) {
          this.handleMockData(config)
        }

        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )

    // 响应拦截器
    this.instance.interceptors.response.use(
      (response) => {
        return response
      },
      (error) => {
        if (error.response?.status === 401) {
          // 处理未授权
          localStorage.removeItem('token')
          window.location.href = '/login'
        }
        return Promise.reject(error)
      }
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private handleMockData(config: any) {
    // Mock数据处理 - 仅用于演示
    if (config.url === '/api/provinces') {
      config.adapter = () => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve({
              data: {
                data: [
                  {
                    code: '110000',
                    name: '北京市',
                    cities: [
                      {
                        code: '110100',
                        name: '北京市',
                        districts: [
                          { code: '110101', name: '东城区' },
                          { code: '110102', name: '西城区' },
                          { code: '110105', name: '朝阳区' },
                        ],
                      },
                    ],
                  },
                  {
                    code: '310000',
                    name: '上海市',
                    cities: [
                      {
                        code: '310100',
                        name: '上海市',
                        districts: [
                          { code: '310101', name: '黄浦区' },
                          { code: '310104', name: '徐汇区' },
                          { code: '310105', name: '长宁区' },
                        ],
                      },
                    ],
                  },
                ]
              },
              status: 200,
              statusText: 'OK',
              headers: {},
              config,
            })
          }, 500) // 模拟网络延迟
        })
      }
    }

    // 注意：产品管理接口 /product 直接调用后台真实接口
    // 后台接口返回的数据格式: { id, name, description, price }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public get<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.instance.get(url, config)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.instance.post(url, data, config)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.instance.put(url, data, config)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.instance.delete(url, config)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.instance.patch(url, data, config)
  }
}

export const apiAdapter = new ApiAdapter()
export default apiAdapter
