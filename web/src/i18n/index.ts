import zhCN from './locales/zh-CN'
import enUS from './locales/en-US'

// 语言包集合
export const locales = {
  'zh-CN': zhCN,
  'en-US': enUS,
} as const

export type LocaleType = keyof typeof locales
export type LocaleData = typeof zhCN

// 获取语言包
export const getLocale = (locale: LocaleType): LocaleData => {
  return locales[locale] || locales['zh-CN']
}

// 默认语言
export const defaultLocale: LocaleType = 'zh-CN'

// 支持的语言列表
export const supportedLocales: Array<{ value: LocaleType; label: string }> = [
  { value: 'zh-CN', label: '中文' },
  { value: 'en-US', label: 'English' },
]

// 语言检测和设置
export const getBrowserLocale = (): LocaleType => {
  const browserLang = navigator.language || 'zh-CN'
  return browserLang.startsWith('zh') ? 'zh-CN' : 'en-US'
}

export default {
  locales,
  getLocale,
  defaultLocale,
  supportedLocales,
  getBrowserLocale,
}
