// 验证工具函数

// 邮箱验证
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// 手机号验证（中国大陆）
export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^1[3-9]\d{9}$/
  return phoneRegex.test(phone)
}

// URL验证
export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

// 密码强度验证
export const isValidPassword = (password: string): { isValid: boolean; message: string } => {
  if (password.length < 6) {
    return { isValid: false, message: '密码长度至少为6位' }
  }

  if (password.length > 20) {
    return { isValid: false, message: '密码长度不能超过20位' }
  }

  // 检查是否包含至少一个数字和一个字母
  const hasNumber = /\d/.test(password)
  const hasLetter = /[a-zA-Z]/.test(password)

  if (!hasNumber || !hasLetter) {
    return { isValid: false, message: '密码必须包含至少一个数字和一个字母' }
  }

  return { isValid: true, message: '密码格式正确' }
}

// 用户名验证
export const isValidUsername = (username: string): { isValid: boolean; message: string } => {
  if (username.length < 3) {
    return { isValid: false, message: '用户名长度至少为3位' }
  }

  if (username.length > 20) {
    return { isValid: false, message: '用户名长度不能超过20位' }
  }

  // 只允许字母、数字、下划线
  const usernameRegex = /^[a-zA-Z0-9_]+$/
  if (!usernameRegex.test(username)) {
    return { isValid: false, message: '用户名只能包含字母、数字和下划线' }
  }

  return { isValid: true, message: '用户名格式正确' }
}

// 必填字段验证
export const isRequired = (value: any): boolean => {
  if (value === null || value === undefined) return false
  if (typeof value === 'string') return value.trim().length > 0
  if (Array.isArray(value)) return value.length > 0
  return true
}

// 数值范围验证
export const isInRange = (value: number, min: number, max: number): boolean => {
  return value >= min && value <= max
}

// 字符串长度验证
export const isValidLength = (str: string, min: number, max: number): boolean => {
  return str.length >= min && str.length <= max
}

// 文件大小验证
export const isValidFileSize = (file: File, maxSizeInMB: number): boolean => {
  const maxSizeInBytes = maxSizeInMB * 1024 * 1024
  return file.size <= maxSizeInBytes
}

// 文件类型验证
export const isValidFileType = (file: File, allowedTypes: string[]): boolean => {
  return allowedTypes.includes(file.type)
}

// 表单验证器集合
export const validators = {
  email: (value: string) => isValidEmail(value),
  phone: (value: string) => isValidPhone(value),
  url: (value: string) => isValidUrl(value),
  required: (value: any) => isRequired(value),
  password: (value: string) => isValidPassword(value).isValid,
  username: (value: string) => isValidUsername(value).isValid,
}
