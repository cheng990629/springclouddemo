// 通用类型定义

// 组件基础Props
export interface BaseComponentProps {
  className?: string
  style?: React.CSSProperties
  children?: React.ReactNode
}

// 表单字段配置
export interface FormField {
  name: string
  label: string
  type: 'input' | 'select' | 'textarea' | 'checkbox' | 'radio' | 'date' | 'upload'
  required?: boolean
  placeholder?: string
  options?: Array<{ label: string; value: any }>
  rules?: Array<{
    required?: boolean
    message?: string
    pattern?: RegExp
    validator?: (rule: any, value: any) => Promise<void>
  }>
}

// 表格列配置
export interface TableColumn<T = any> {
  title: string
  dataIndex: string
  key?: string
  width?: number | string
  align?: 'left' | 'center' | 'right'
  sorter?: boolean | ((a: T, b: T) => number)
  render?: (value: any, record: T, index: number) => React.ReactNode
  ellipsis?: boolean
  fixed?: 'left' | 'right'
}

// 菜单项
export interface MenuItem {
  key: string
  label: string | React.ReactNode
  icon?: React.ReactNode
  children?: MenuItem[]
  path?: string
  disabled?: boolean
}

// 面包屑项
export interface BreadcrumbItem {
  title: string | React.ReactNode
  path?: string
}

// 通知配置
export interface NotificationConfig {
  type: 'success' | 'info' | 'warning' | 'error'
  title: string
  content?: string | React.ReactNode
  duration?: number
}

// 主题配置
export type ThemeType = 'light' | 'dark'

// 语言配置
export type LocaleType = 'zh-CN' | 'en-US'

// 文件信息
export interface FileInfo {
  uid: string
  name: string
  size: number
  type: string
  url?: string
  status?: 'uploading' | 'done' | 'error'
  percent?: number
}

// 排序配置
export type SortOrder = 'ascend' | 'descend' | null

export interface SortConfig {
  field: string
  order: SortOrder
}

// 过滤配置
export interface FilterConfig {
  field: string
  value: any[]
}
