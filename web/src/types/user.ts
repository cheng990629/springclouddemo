// 用户相关类型定义

// 用户角色
export type UserRole = 'admin' | 'user' | 'auditor' | 'manager'

// 用户状态
export type UserStatus = 'active' | 'inactive' | 'banned' | 'pending'

// 用户信息
export interface User {
  id: string
  username: string
  email: string
  phone?: string
  avatar?: string
  roles: UserRole[]
  status: UserStatus
  createdAt: string
  updatedAt: string
  lastLoginAt?: string
  department?: string
  position?: string
}

// 用户创建/更新参数
export interface UserFormData {
  username: string
  email: string
  phone?: string
  roles: UserRole[]
  department?: string
  position?: string
  status: UserStatus
}

// 登录参数
export interface LoginParams {
  username: string
  password: string
  remember?: boolean
}

// 注册参数
export interface RegisterParams {
  username: string
  email: string
  password: string
  confirmPassword: string
  phone?: string
}

// 修改密码参数
export interface ChangePasswordParams {
  oldPassword: string
  newPassword: string
  confirmPassword: string
}

// 用户偏好设置
export interface UserPreferences {
  theme: 'light' | 'dark'
  language: 'zh-CN' | 'en-US'
  timezone: string
  notifications: {
    email: boolean
    sms: boolean
    push: boolean
  }
}

// 用户权限
export interface Permission {
  id: string
  name: string
  resource: string
  action: string
  description?: string
}

// 角色权限配置
export interface RolePermissions {
  role: UserRole
  permissions: Permission[]
}
