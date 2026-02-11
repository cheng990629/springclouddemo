import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { createUserSlice, type UserSlice } from './slices/userSlice'
import { createAppSlice, type AppSlice } from './slices/appSlice'

export type AppStore = UserSlice & AppSlice

export const useAppStore = create<AppStore>()(
  devtools(
    persist(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (set, get, api: any) => ({
        ...createUserSlice(set, get, api),
        ...createAppSlice(set, get, api),
      }),
      {
        name: 'app-store',
        partialize: (state) => ({
          user: state.user,
          token: state.token,
          theme: state.theme,
          locale: state.locale,
          collapsed: state.collapsed,
          isAuthenticated: state.isAuthenticated,
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
export const useApplicationSidebarCollapsed = () => useAppStore((state) => state.applicationSidebarCollapsed)
export const useBreadcrumbs = () => useAppStore((state) => state.breadcrumbs)
export const useSidebarWidth = () => useAppStore((state) => state.sidebarWidth)

// Action hooks
export const useSetUser = () => useAppStore((state) => state.setUser)
export const useSetToken = () => useAppStore((state) => state.setToken)
export const useSetLoading = () => useAppStore((state) => state.setLoading)
export const useSetTheme = () => useAppStore((state) => state.setTheme)
export const useSetLocale = () => useAppStore((state) => state.setLocale)
export const useSetCollapsed = () => useAppStore((state) => state.setCollapsed)
export const useSetApplicationSidebarCollapsed = () => useAppStore((state) => state.setApplicationSidebarCollapsed)
export const useSetBreadcrumbs = () => useAppStore((state) => state.setBreadcrumbs)
export const useSetSidebarWidth = () => useAppStore((state) => state.setSidebarWidth)
export const useLogout = () => useAppStore((state) => state.logout)

// 为了向后兼容，提供一个稳定的actions对象
export const useAppActions = () => {
  const setUser = useSetUser()
  const setToken = useSetToken()
  const setLoading = useSetLoading()
  const setTheme = useSetTheme()
  const setLocale = useSetLocale()
  const setCollapsed = useSetCollapsed()
  const setApplicationSidebarCollapsed = useSetApplicationSidebarCollapsed()
  const setBreadcrumbs = useSetBreadcrumbs()
  const setSidebarWidth = useSetSidebarWidth()
  const logout = useLogout()

  return {
    setUser,
    setToken,
    setLoading,
    setTheme,
    setLocale,
    setCollapsed,
    setApplicationSidebarCollapsed,
    setBreadcrumbs,
    setSidebarWidth,
    logout,
  }
}
