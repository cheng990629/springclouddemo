import React, { createContext, useContext, useState, useEffect } from 'react'
import { useSetUser as useZustandSetUser, useSetToken as useZustandSetToken } from '@/store'

interface User {
  username: string
  roles: string[]
  // GitHub OAuth2 用户资料
  name?: string
  email?: string
  avatar?: string
  provider?: 'local' | 'github'
  // 额外信息
  company?: string
  location?: string
  blog?: string
  bio?: string
  html_url?: string
  // 统计信息
  public_repos?: number
  public_gists?: number
  followers?: number
  following?: number
  // 其他
  twitter?: string
  account_type?: string
  hireable?: boolean
  created_at?: string
  github_username?: string
  github_id?: string
}

interface AuthContextType {
  user: User | null
  token: string | null
  loading: boolean
  error: string | null
  login: (username: string, password: string, type?: 'password' | 'ldap') => Promise<boolean>
  logout: () => void
  hasRole: (role: string) => boolean
  isAuthenticated: boolean
  setUser: (user: User | null) => void
  setToken: (token: string | null) => void
}

const AuthContext = createContext<AuthContextType | null>(null)

const API_BASE = '/uaa'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'))
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // 同步获取 Zustand store 的更新方法
  const setZustandUser = useZustandSetUser()
  const setZustandToken = useZustandSetToken()

  // 初始化时同步 localStorage 中的用户数据
  useEffect(() => {
    if (token) {
      const savedUser = localStorage.getItem('user')
      if (savedUser) {
        try {
          setUser(JSON.parse(savedUser))
        } catch (e) {
          console.error('Failed to parse user:', e)
        }
      }
    }
  }, []) // 空依赖数组，只在挂载时执行一次

  // token 变化时也同步（保持兼容性）
  useEffect(() => {
    if (token) {
      const savedUser = localStorage.getItem('user')
      if (savedUser) {
        try {
          setUser(JSON.parse(savedUser))
        } catch (e) {
          console.error('Failed to parse user:', e)
        }
      }
    } else {
      // token 为空时清空用户
      setUser(null)
    }
  }, [token])

  const login = async (username: string, password: string, type: 'password' | 'ldap' = 'password'): Promise<boolean> => {
    setLoading(true)
    setError(null)

    try {
      let response

      if (type === 'ldap') {
        response = await fetch(`${API_BASE}/ldap/token`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password })
        })
      } else {
        response = await fetch(`${API_BASE}/token`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password, grant_type: 'password' })
        })
      }

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || '登录失败')
      }

      const { accessToken, username: userName, roles } = data

      const userData: User = { username: userName, roles }
      // 同步更新 AuthContext 和 Zustand store
      setUser(userData)
      setToken(accessToken)
      setZustandUser(userData)
      setZustandToken(accessToken)
      localStorage.setItem('token', accessToken)
      localStorage.setItem('user', JSON.stringify(userData))

      return true
    } catch (err) {
      console.error('Login error:', err)
      setError(err instanceof Error ? err.message : '登录失败，请检查用户名和密码')
      return false
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    setZustandUser(null)
    setZustandToken(null)
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  const hasRole = (role: string): boolean => {
    if (!user || !user.roles) return false
    return user.roles.includes(role) || user.roles.includes('PRODUCT_ADMIN')
  }

  const value: AuthContextType = {
    user,
    token,
    loading,
    error,
    login,
    logout,
    hasRole,
    isAuthenticated: !!token,
    setUser: (user: User | null) => setUser(user),
    setToken: (token: string | null) => setToken(token),
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

// 导出 AuthContext 以便在 OAuthCallback 中直接访问
export { AuthContext }
