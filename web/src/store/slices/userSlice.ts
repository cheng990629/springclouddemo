import type { StateCreator } from 'zustand'

export interface User {
  id?: string
  username: string
  email?: string
  avatar?: string
  roles: string[]
  provider?: 'local' | 'ldap' | 'github' | 'alipay'
  name?: string
  company?: string
  location?: string
  blog?: string
  bio?: string
  html_url?: string
  twitter_username?: string
  public_repos?: number
  public_gists?: number
  followers?: number
  following?: number
  created_at?: string
  account_type?: string
  hireable?: boolean
  github_id?: string
  github_username?: string
}

export interface UserSlice {
  user: User | null
  token: string | null
  isAuthenticated: boolean

  setUser: (user: User | null) => void
  setToken: (token: string | null) => void
  logout: () => void
}

export const createUserSlice: StateCreator<
  UserSlice,
  [['zustand/devtools', never], ['zustand/persist', unknown]],
  [],
  UserSlice
> = (set, _get) => ({
  user: null,
  token: null,
  isAuthenticated: false,

  setUser: (user) => set({
    user,
    isAuthenticated: !!user,
  }, false, 'setUser'),

  setToken: (token) => set({
    token,
    isAuthenticated: !!token,
  }, false, 'setToken'),

  logout: () => set({
    user: null,
    token: null,
    isAuthenticated: false,
  }, false, 'logout'),
})
