import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface User {
  id: string
  username: string
  email: string
  avatar?: string
  roles: string[]
}

interface AppState {
  // 用户状态
  user: User | null
  token: string | null
  isAuthenticated: boolean

  // 应用状态
  loading: boolean
  theme: 'light' | 'dark'
  locale: string
  collapsed: boolean

  // 页面状态
  breadcrumbs: Array<{ title: string; path?: string }>

  // Actions
  setUser: (user: User | null) => void
  setToken: (token: string | null) => void
  setLoading: (loading: boolean) => void
  setTheme: (theme: 'light' | 'dark') => void
  setLocale: (locale: string) => void
  setCollapsed: (collapsed: boolean) => void
  setBreadcrumbs: (breadcrumbs: Array<{ title: string; path?: string }>) => void
  logout: () => void
}

export const useAppStore = create<AppState>()(
  devtools(
    persist(
      (set, _get) => ({
        // 初始状态
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false,
        theme: 'light',
        locale: 'zh-CN',
        collapsed: false,
        breadcrumbs: [],

        // Actions
        setUser: (user) => set({
          user,
          isAuthenticated: !!user,
        }),

        setToken: (token) => set({
          token,
          isAuthenticated: !!token,
        }),

        setLoading: (loading) => set({ loading }),

        setTheme: (theme) => set({ theme }),

        setLocale: (locale) => set({ locale }),

        setCollapsed: (collapsed) => set({ collapsed }),

        setBreadcrumbs: (breadcrumbs) => set({ breadcrumbs }),

        logout: () => set({
          user: null,
          token: null,
          isAuthenticated: false,
          breadcrumbs: [],
        }),
      }),
      {
        name: 'app-store',
        partialize: (state) => ({
          theme: state.theme,
          locale: state.locale,
          collapsed: state.collapsed,
        }),
      }
    ),
    {
      name: 'app-store',
    }
  )
)

// 选择器 hooks
export const useUser = () => useAppStore((state) => state.user)
export const useToken = () => useAppStore((state) => state.token)
export const useIsAuthenticated = () => useAppStore((state) => state.isAuthenticated)
export const useLoading = () => useAppStore((state) => state.loading)
export const useTheme = () => useAppStore((state) => state.theme)
export const useLocale = () => useAppStore((state) => state.locale)
export const useCollapsed = () => useAppStore((state) => state.collapsed)
export const useBreadcrumbs = () => useAppStore((state) => state.breadcrumbs)

// Action hooks - 使用单个selector避免每次渲染创建新对象
export const useSetUser = () => useAppStore((state) => state.setUser)
export const useSetToken = () => useAppStore((state) => state.setToken)
export const useSetLoading = () => useAppStore((state) => state.setLoading)
export const useSetTheme = () => useAppStore((state) => state.setTheme)
export const useSetLocale = () => useAppStore((state) => state.setLocale)
export const useSetCollapsed = () => useAppStore((state) => state.setCollapsed)
export const useSetBreadcrumbs = () => useAppStore((state) => state.setBreadcrumbs)
export const useLogout = () => useAppStore((state) => state.logout)

// 为了向后兼容，提供一个稳定的actions对象
export const useAppActions = () => {
  const setUser = useSetUser()
  const setToken = useSetToken()
  const setLoading = useSetLoading()
  const setTheme = useSetTheme()
  const setLocale = useSetLocale()
  const setCollapsed = useSetCollapsed()
  const setBreadcrumbs = useSetBreadcrumbs()
  const logout = useLogout()

  return {
    setUser,
    setToken,
    setLoading,
    setTheme,
    setLocale,
    setCollapsed,
    setBreadcrumbs,
    logout,
  }
}
