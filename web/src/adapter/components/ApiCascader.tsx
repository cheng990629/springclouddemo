import React, { useState, useEffect } from 'react'
import { Cascader, Spin } from 'antd'
import type { CascaderProps, DefaultOptionType } from 'antd/es/cascader'
import { apiAdapter } from '@/adapter/api'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface ApiCascaderOption extends DefaultOptionType {
  fieldName?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

export interface ApiCascaderProps extends Omit<CascaderProps<DefaultOptionType>, 'options' | 'multiple'> {
  /**
   * API接口地址
   */
  apiUrl: string
  /**
   * 请求参数
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params?: Record<string, any>
  /**
   * 数据字段名，默认使用 'data'
   */
  fieldName?: string
  /**
   * 选项值字段，默认使用 'value'
   */
  valueField?: string
  /**
   * 选项标签字段，默认使用 'label'
   */
  labelField?: string
  /**
   * 子选项字段，默认使用 'children'
   */
  childrenField?: string
  /**
   * 是否显示加载状态
   */
  loading?: boolean
  /**
   * 数据转换函数
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  transformData?: (data: any[]) => ApiCascaderOption[]
  /**
   * 错误处理函数
   */
  onError?: (error: Error) => void
}

export const ApiCascader: React.FC<ApiCascaderProps> = ({
  apiUrl,
  params = {},
  fieldName = 'data',
  valueField = 'value',
  labelField = 'label',
  childrenField = 'children',
  loading: externalLoading = false,
  transformData,
  onError,
  ...cascaderProps
}) => {
  const [loading, setLoading] = useState(false)
  const [options, setOptions] = useState<ApiCascaderOption[]>([])

  const fetchOptions = async () => {
    try {
      setLoading(true)
      const response = await apiAdapter.get(apiUrl, { params })

      let data = response.data
      if (fieldName && data[fieldName]) {
        data = data[fieldName]
      }

      let processedOptions: ApiCascaderOption[] = data

      // 如果提供了数据转换函数，使用它处理数据
      if (transformData) {
        processedOptions = transformData(data)
      } else {
        // 默认数据转换
        processedOptions = transformOptions(data, valueField, labelField, childrenField)
      }

      setOptions(processedOptions)
    } catch (error) {
      console.error('ApiCascader fetch error:', error)
      if (onError) {
        onError(error as Error)
      }
    } finally {
      setLoading(false)
    }
  }

  const transformOptions = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any[],
    valueField: string,
    labelField: string,
    childrenField: string
  ): ApiCascaderOption[] => {
    if (!Array.isArray(data)) return []

    return data.map(item => ({
      value: item[valueField],
      label: item[labelField],
      children: item[childrenField]
        ? transformOptions(item[childrenField], valueField, labelField, childrenField)
        : undefined,
      ...item,
    }))
  }

  useEffect(() => {
    fetchOptions()
  }, [apiUrl, JSON.stringify(params)])

  return (
    <Cascader
      {...cascaderProps}
      options={options}
      loading={loading || externalLoading}
      notFoundContent={loading ? <Spin size="small" /> : '暂无数据'}
    />
  )
}

export default ApiCascader
