// 路由常量
export const ROUTES = {
  HOME: '/',
  SYSTEM_MANAGEMENT: '/system-management',
  USER_MANAGEMENT: '/user-management',
  DISCOVER: '/discover',
  LARGE_SCREEN_DASHBOARD: '/large-screen-dashboard',
  API_TOOLS: '/api-tools',
  PROFILE: '/profile',
  // 向后兼容路由
  DASHBOARD: '/dashboard',
  KNOWLEDGE: '/knowledge',
  NOTES: '/notes',
  API_CASCADER: '/api-cascader',
} as const

export type RoutePath = typeof ROUTES[keyof typeof ROUTES]

// 路由权限配置
export const ROUTE_PERMISSIONS = {
  [ROUTES.SYSTEM_MANAGEMENT]: ['admin', 'manager'],
  [ROUTES.USER_MANAGEMENT]: ['admin', 'manager'],
  [ROUTES.LARGE_SCREEN_DASHBOARD]: ['admin', 'manager', 'user'],
  [ROUTES.API_TOOLS]: ['admin', 'manager', 'user'],
} as const

// 公开路由（不需要登录）
export const PUBLIC_ROUTES = [
  ROUTES.HOME,
] as const

// 私有路由（需要登录）
export const PRIVATE_ROUTES = [
  ROUTES.SYSTEM_MANAGEMENT,
  ROUTES.USER_MANAGEMENT,
  ROUTES.DISCOVER,
  ROUTES.LARGE_SCREEN_DASHBOARD,
  ROUTES.API_TOOLS,
  ROUTES.PROFILE,
] as const
