import React, { lazy } from 'react'
import type { RouteObject } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import { getAllRoutes } from './menus'

// 懒加载页面组件
const AgentTbox = lazy(() => import('@/components/agent/AgentTbox'))
const NotesPage = lazy(() => import('@/pages/notes/Notes'))
const KnowledgePage = lazy(() => import('@/pages/knowledge/Knowledge'))
const Dashboard = lazy(() => import('@/pages/dashboard/Dashboard'))
const LargeScreenDashboard = lazy(() => import('@/pages/dashboard/LargeScreenDashboard'))
const SystemManagement = lazy(() => import('@/pages/system/SystemManagement'))
const Accounting = lazy(() => import('@/pages/business/Accounting'))
const Zhenjiuchengagi = lazy(() => import('@/pages/business/Zhenjiuchengagi'))
const SalarySystem = lazy(() => import('@/pages/business/SalarySystem'))
const InterviewWork = lazy(() => import('@/pages/business/InterviewWork'))
const ContractReview = lazy(() => import('@/pages/business/ContractReview'))
const ApiCascaderDemo = lazy(() => import('@/pages/business/ApiCascaderDemo'))
const Profile = lazy(() => import('@/pages/profile/Profile'))
const LiaoboPoetry = lazy(() => import('@/pages/LiaoboPoetry'))
const ZhenjiuchengPlatform = lazy(() => import('@/pages/ZhenjiuchengPlatform'))
const ZhenjiuchengMerchant = lazy(() => import('@/pages/ZhenjiuchengMerchant'))
const ZhenjiuchengMobile = lazy(() => import('@/pages/ZhenjiuchengMobile'))
const ZhenjiuchengPlatformTraditional = lazy(() => import('@/pages/ZhenjiuchengPlatformTraditional'))
const ZhenjiuchengMerchantTraditional = lazy(() => import('@/pages/ZhenjiuchengMerchantTraditional'))
const ZhenjiuchengMobileTraditional = lazy(() => import('@/pages/ZhenjiuchengMobileTraditional'))
const SmartGreenhouse = lazy(() => import('@/pages/SmartGreenhouse'))
const ScienceAi = lazy(() => import('@/pages/ScienceAi'))
const TkStoreManagement = lazy(() => import('@/pages/TkStoreManagement'))
const Workbench = lazy(() => import('@/pages/workbench/Workbench'))
const ProductList = lazy(() => import('@/pages/product/ProductList'))

// 组件映射表
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const componentMap: Record<string, React.ComponentType<any>> = {
  // AGI核心功能
  '/chat': AgentTbox,
  '/knowledge': KnowledgePage,
  '/notes': NotesPage,
  '/discover': lazy(() => import('@/pages/discover/Discover')),

  // 业务功能
  '/business': AgentTbox,
  '/accounting': Accounting,
  '/salary-system': SalarySystem,
  '/interview-work': InterviewWork,
  '/contract-review': ContractReview,
  '/product': ProductList,

  // 系统功能
  '/dashboard': Dashboard,
  '/large-screen-dashboard': LargeScreenDashboard,
  '/system-management': SystemManagement,
  '/profile': Profile,
  '/api-tools': ApiCascaderDemo,

  // 传统模式应用
  '/zhenjiucheng-platform': ZhenjiuchengPlatform,
  '/traditional/zhenjiucheng-platform': ZhenjiuchengPlatformTraditional,
  '/zhenjiucheng-merchant': ZhenjiuchengMerchant,
  '/traditional/zhenjiucheng-merchant': ZhenjiuchengMerchantTraditional,
  '/zhenjiucheng-mobile': ZhenjiuchengMobile,
  '/traditional/zhenjiucheng-mobile': ZhenjiuchengMobileTraditional,
  '/smart-greenhouse': SmartGreenhouse,
  '/traditional/smart-greenhouse': SmartGreenhouse,
  '/science-ai': ScienceAi,
  '/traditional/science-ai': ScienceAi,
  '/tk-store-management': TkStoreManagement,
  '/traditional/tk-store-management': TkStoreManagement,
  '/liaobo-poetry': LiaoboPoetry,
  '/workbench': Workbench,
}

// 主路由配置 - 基于modules的统一路由系统
export const routes: RouteObject[] = [
  // 默认路由 - 跳转到大屏仪表作为主要入口
  {
    path: '/',
    element: <Navigate to="/large-screen-dashboard" replace />,
  },

  // 从modules动态生成路由
  ...getAllRoutes().map(route => {
    const Component = componentMap[route.path];
    return {
      path: route.path,
      element: Component ? <Component /> : null,
    };
  }).filter(route => route.element !== null),
]

// 路由元数据和工具函数
export const routeMetadata = Object.fromEntries(
  getAllRoutes().map(route => [
    route.path,
    {
      label: route.label,
      icon: route.icon,
      inMenu: route.inMenu,
      permissions: route.permissions,
      order: route.order,
      group: route.group,
      description: route.description,
    }
  ])
)

export type RoutePath = keyof typeof routeMetadata

// 工具函数：获取路由的元数据
export const getRouteMetadata = (path: RoutePath) => routeMetadata[path]

// 工具函数：获取所有菜单路由（按order排序）
export const getMenuRoutes = (): RoutePath[] =>
  getAllRoutes()
    .filter(route => route.inMenu)
    .sort((a, b) => a.order - b.order)
    .map(route => route.path as RoutePath)

// 工具函数：检查路由是否在菜单中
export const isMenuRoute = (path: RoutePath): boolean =>
  routeMetadata[path]?.inMenu || false

// 保持向后兼容的导出
export const agiRoutes = routes
export const routeNames = routeMetadata
