import zhCN from 'antd/locale/zh_CN'
import enUS from 'antd/locale/en_US'

export type LocaleType = 'zh-CN' | 'en-US'

export const locales = {
  'zh-CN': {
    antd: zhCN,
    messages: {
      // 中文翻译
      'app.title': '礁岛AGI设计UI',
      'menu.dashboard': '仪表板',
      'menu.api-cascader': 'API级联选择器',
      'menu.profile': '个人资料',
      'common.loading': '加载中...',
      'common.save': '保存',
      'common.cancel': '取消',
      'common.confirm': '确认',
      'common.delete': '删除',
      'common.edit': '编辑',
      'common.add': '添加',
      'common.search': '搜索',
      'common.reset': '重置',
      'common.submit': '提交',
      'common.back': '返回',
      'common.next': '下一步',
      'common.previous': '上一步',
      'common.finish': '完成',
      'common.close': '关闭',
      'common.open': '打开',
      'common.expand': '展开',
      'common.collapse': '收起',
    },
  },
  'en-US': {
    antd: enUS,
    messages: {
      // 英文翻译
      'app.title': 'CAYDE AGI Design UI',
      'menu.dashboard': 'Dashboard',
      'menu.api-cascader': 'API Cascader',
      'menu.profile': 'Profile',
      'common.loading': 'Loading...',
      'common.save': 'Save',
      'common.cancel': 'Cancel',
      'common.confirm': 'Confirm',
      'common.delete': 'Delete',
      'common.edit': 'Edit',
      'common.add': 'Add',
      'common.search': 'Search',
      'common.reset': 'Reset',
      'common.submit': 'Submit',
      'common.back': 'Back',
      'common.next': 'Next',
      'common.previous': 'Previous',
      'common.finish': 'Finish',
      'common.close': 'Close',
      'common.open': 'Open',
      'common.expand': 'Expand',
      'common.collapse': 'Collapse',
    },
  },
}

export const getLocale = (locale: LocaleType) => locales[locale]

export const getCurrentLocale = (): LocaleType => {
  const stored = localStorage.getItem('locale')
  return (stored as LocaleType) || 'zh-CN'
}

export const setCurrentLocale = (locale: LocaleType) => {
  localStorage.setItem('locale', locale)
}

export const getMessage = (key: string, locale?: LocaleType): string => {
  const currentLocale = locale || getCurrentLocale()
  const localeData = locales[currentLocale]
  return (localeData?.messages as any)?.[key] || key
}
