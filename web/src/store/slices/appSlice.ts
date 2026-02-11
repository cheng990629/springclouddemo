import type { StateCreator } from 'zustand'
import type { LocaleType } from '@/adapter/locales'

export interface AppSlice {
  loading: boolean
  theme: 'light' | 'dark'
  locale: LocaleType
  collapsed: boolean
  applicationSidebarCollapsed: boolean // 应用侧边栏折叠状态
  breadcrumbs: Array<{ title: string; path?: string }>
  sidebarWidth: number // 左侧栏总宽度

  setLoading: (loading: boolean) => void
  setTheme: (theme: 'light' | 'dark') => void
  setLocale: (locale: LocaleType) => void
  setCollapsed: (collapsed: boolean) => void
  setApplicationSidebarCollapsed: (collapsed: boolean) => void
  setBreadcrumbs: (breadcrumbs: Array<{ title: string; path?: string }>) => void
  setSidebarWidth: (width: number) => void
}

export const createAppSlice: StateCreator<
  AppSlice,
  [['zustand/devtools', never], ['zustand/persist', unknown]],
  [],
  AppSlice
> = (set, _get) => ({
  loading: false,
  theme: 'dark',
  locale: 'zh-CN',
  collapsed: false,
  applicationSidebarCollapsed: true, // 默认折叠
  breadcrumbs: [],
  sidebarWidth: 480, // 默认SystemSidebar 200 + ApplicationSidebar 280

  setLoading: (loading) => set({ loading }, false, 'setLoading'),

  setTheme: (theme) => set({ theme }, false, 'setTheme'),

  setLocale: (locale) => set({ locale }, false, 'setLocale'),

  setCollapsed: (collapsed) => set({ collapsed }, false, 'setCollapsed'),

  setApplicationSidebarCollapsed: (applicationSidebarCollapsed) => set({ applicationSidebarCollapsed }, false, 'setApplicationSidebarCollapsed'),

  setBreadcrumbs: (breadcrumbs) => set({ breadcrumbs }, false, 'setBreadcrumbs'),

  setSidebarWidth: (sidebarWidth) => set({ sidebarWidth }, false, 'setSidebarWidth'),
})
