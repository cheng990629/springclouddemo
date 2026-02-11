import { theme as antdTheme } from 'antd'
import type { ThemeConfig } from 'antd'

const { defaultAlgorithm, darkAlgorithm } = antdTheme

// 自定义颜色变量
export const colors = {
  primary: {
    50: '#e6f7ff',
    100: '#bae7ff',
    400: '#69c0ff',
    500: '#1890ff',
    600: '#096dd9',
    700: '#0050b3',
  },
  success: {
    50: '#f6ffed',
    100: '#b7eb8f',
    400: '#73d13d',
    500: '#52c41a',
    600: '#389e0d',
    700: '#237804',
  },
  warning: {
    50: '#fffbe6',
    100: '#ffe58f',
    400: '#ffc069',
    500: '#faad14',
    600: '#d48806',
    700: '#ad6800',
  },
  error: {
    50: '#fff2f0',
    100: '#ffccc7',
    400: '#ff7875',
    500: '#ff4d4f',
    600: '#cf1322',
    700: '#a8071a',
  },
  gray: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#e8e8e8',
    300: '#d9d9d9',
    400: '#bfbfbf',
    500: '#8c8c8c',
    600: '#595959',
    700: '#434343',
    800: '#262626',
    900: '#1f1f1f',
  },
}

// 亮色主题配置
export const lightTheme: ThemeConfig = {
  algorithm: [defaultAlgorithm],
  token: {
    colorPrimary: colors.primary[500],
    colorSuccess: colors.success[500],
    colorWarning: colors.warning[500],
    colorError: colors.error[500],
    colorInfo: colors.primary[500],

    // 背景色
    colorBgContainer: '#ffffff',
    colorBgLayout: '#f5f5f5',
    colorBgSpotlight: '#ffffff',

    // 文字颜色
    colorText: colors.gray[700],
    colorTextSecondary: colors.gray[500],
    colorTextTertiary: colors.gray[400],

    // 边框颜色
    colorBorder: colors.gray[200],
    colorBorderSecondary: colors.gray[100],

    // 阴影
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
    boxShadowSecondary: '0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)',
  },
  components: {
    Layout: {
      headerBg: '#ffffff',
      bodyBg: '#f5f5f5',
      triggerBg: '#ffffff',
    },
    Menu: {
      colorBgContainer: 'transparent',
      itemBg: 'transparent',
      itemSelectedBg: colors.primary[50],
      itemColor: colors.gray[600],
      itemSelectedColor: colors.primary[600],
    },
    Tooltip: {
      colorBgSpotlight: colors.gray[800],
      colorTextLightSolid: colors.gray[100],
    },
  },
}

// 暗色主题配置
export const darkTheme: ThemeConfig = {
  algorithm: [darkAlgorithm],
  token: {
    colorPrimary: colors.primary[400],
    colorSuccess: colors.success[400],
    colorWarning: colors.warning[400],
    colorError: colors.error[400],
    colorInfo: colors.primary[400],

    // 背景色
    colorBgContainer: colors.gray[800],
    colorBgLayout: colors.gray[900],
    colorBgSpotlight: colors.gray[800],

    // 文字颜色
    colorText: colors.gray[100],
    colorTextSecondary: colors.gray[200],
    colorTextTertiary: colors.gray[300],

    // 边框颜色
    colorBorder: colors.gray[600],
    colorBorderSecondary: colors.gray[700],

    // 阴影
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.3), 0 1px 2px rgba(0, 0, 0, 0.2)',
    boxShadowSecondary: '0 4px 6px rgba(0, 0, 0, 0.3), 0 2px 4px rgba(0, 0, 0, 0.2)',
  },
  components: {
    Layout: {
      headerBg: colors.gray[800],
      bodyBg: colors.gray[900],
      triggerBg: colors.gray[700],
    },
    Menu: {
      colorBgContainer: 'transparent',
      itemBg: 'transparent',
      itemSelectedBg: colors.primary[700],
      itemColor: colors.gray[200],
      itemSelectedColor: colors.primary[400],
    },
    Tooltip: {
      colorBgSpotlight: colors.gray[800],
      colorTextLightSolid: colors.gray[100],
    },
  },
}

// 获取主题配置的工具函数
export const getThemeConfig = (theme: 'light' | 'dark'): ThemeConfig => {
  return theme === 'dark' ? darkTheme : lightTheme
}

export default {
  colors,
  lightTheme,
  darkTheme,
  getThemeConfig,
}
