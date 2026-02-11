import dayjs from 'dayjs'

// 格式化日期时间
export const formatDateTime = (date: string | number | Date, format = 'YYYY-MM-DD HH:mm:ss') => {
  return dayjs(date).format(format)
}

// 格式化日期
export const formatDate = (date: string | number | Date, format = 'YYYY-MM-DD') => {
  return dayjs(date).format(format)
}

// 格式化时间
export const formatTime = (date: string | number | Date, format = 'HH:mm:ss') => {
  return dayjs(date).format(format)
}

// 格式化数字
export const formatNumber = (num: number, options?: Intl.NumberFormatOptions) => {
  return new Intl.NumberFormat('zh-CN', options).format(num)
}

// 格式化文件大小
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 B'

  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return `${(bytes / Math.pow(k, i)).toFixed(1)} ${sizes[i]}`
}

// 格式化百分比
export const formatPercent = (value: number, decimals = 1): string => {
  return `${(value * 100).toFixed(decimals)}%`
}

// 格式化货币
export const formatCurrency = (amount: number, currency = 'CNY'): string => {
  return new Intl.NumberFormat('zh-CN', {
    style: 'currency',
    currency,
  }).format(amount)
}

// 截断字符串
export const truncateText = (text: string, maxLength: number, suffix = '...'): string => {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength - suffix.length) + suffix
}

// 首字母大写
export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

// 驼峰命名转横线命名
export const camelToKebab = (str: string): string => {
  return str.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase()
}

// 横线命名转驼峰命名
export const kebabToCamel = (str: string): string => {
  return str.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase())
}
