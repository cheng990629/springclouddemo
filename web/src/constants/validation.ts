// 验证规则常量
export const VALIDATION_RULES = {
  // 用户名规则
  USERNAME: {
    MIN_LENGTH: 3,
    MAX_LENGTH: 20,
    PATTERN: /^[a-zA-Z0-9_]+$/,
    MESSAGE: {
      REQUIRED: '请输入用户名',
      LENGTH: '用户名长度必须在3-20个字符之间',
      PATTERN: '用户名只能包含字母、数字和下划线',
    },
  },

  // 密码规则
  PASSWORD: {
    MIN_LENGTH: 6,
    MAX_LENGTH: 20,
    PATTERN: /^(?=.*[a-zA-Z])(?=.*\d)/,
    MESSAGE: {
      REQUIRED: '请输入密码',
      LENGTH: '密码长度必须在6-20个字符之间',
      PATTERN: '密码必须包含至少一个字母和一个数字',
      CONFIRM: '两次输入的密码不一致',
    },
  },

  // 邮箱规则
  EMAIL: {
    PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    MESSAGE: {
      REQUIRED: '请输入邮箱地址',
      INVALID: '请输入正确的邮箱地址',
    },
  },

  // 手机号规则 (中国大陆)
  PHONE: {
    PATTERN: /^1[3-9]\d{9}$/,
    MESSAGE: {
      REQUIRED: '请输入手机号码',
      INVALID: '请输入正确的手机号码',
    },
  },

  // 文件上传规则
  FILE: {
    MAX_SIZE: 10 * 1024 * 1024, // 10MB
    ALLOWED_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'],
    MESSAGE: {
      SIZE: '文件大小不能超过10MB',
      TYPE: '不支持的文件类型',
    },
  },

  // 通用规则
  COMMON: {
    REQUIRED: '此字段为必填项',
    MAX_LENGTH: (max: number) => `最多输入${max}个字符`,
    MIN_LENGTH: (min: number) => `最少输入${min}个字符`,
  },
} as const

// 表单验证模式
export const VALIDATION_MODES = {
  CREATE: 'create',
  UPDATE: 'update',
  DELETE: 'delete',
} as const

export type ValidationMode = typeof VALIDATION_MODES[keyof typeof VALIDATION_MODES]
