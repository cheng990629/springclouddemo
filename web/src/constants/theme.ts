// 主题相关常量
export const THEME_TYPES = {
  LIGHT: 'light',
  DARK: 'dark',
} as const

export type ThemeType = typeof THEME_TYPES[keyof typeof THEME_TYPES]

// 主题配置
export const THEME_CONFIG = {
  BORDER_RADIUS: {
    SMALL: 4,
    MEDIUM: 8,
    LARGE: 12,
    XLARGE: 16,
  },
  SPACING: {
    XS: 4,
    SM: 8,
    MD: 16,
    LG: 24,
    XL: 32,
    XXL: 48,
  },
  FONT_SIZE: {
    XS: 12,
    SM: 14,
    MD: 16,
    LG: 18,
    XL: 20,
    XXL: 24,
    XXXL: 32,
  },
  SHADOW: {
    SMALL: '0 1px 3px rgba(0, 0, 0, 0.1)',
    MEDIUM: '0 4px 6px rgba(0, 0, 0, 0.1)',
    LARGE: '0 10px 25px rgba(0, 0, 0, 0.1)',
  },
  Z_INDEX: {
    DROPDOWN: 1000,
    MODAL: 1000,
    TOOLTIP: 1100,
    POPOVER: 1030,
  },
} as const

// 颜色常量
export const COLORS = {
  PRIMARY: '#1890ff',
  SUCCESS: '#52c41a',
  WARNING: '#faad14',
  ERROR: '#ff4d4f',
  INFO: '#13c2c2',
  WHITE: '#ffffff',
  BLACK: '#000000',
  GRAY: {
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
} as const

// 断点常量 (基于Ant Design的断点)
export const BREAKPOINTS = {
  XS: 480,
  SM: 576,
  MD: 768,
  LG: 992,
  XL: 1200,
  XXL: 1600,
} as const
