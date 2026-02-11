import React from 'react'
import { routeMetadata, RoutePath } from '@/router/routes'

// 从路由配置自动生成菜单项（只包含基本信息，不包含 JSX）
export const functionMenuItems = Object.entries(routeMetadata)
  .filter(([_, metadata]) => metadata.inMenu)
  .map(([path, metadata]) => ({
    key: path as RoutePath,
    icon: metadata.icon, // 存储图标名称字符串
    label: metadata.label,
  }))

// 菜单项类型定义（基础版本，不包含 JSX）
export interface MenuItem {
  key: RoutePath
  icon: string | null // 图标名称字符串
  label: string
}

// 运行时菜单项类型（包含 JSX 图标）
export interface RuntimeMenuItem {
  key: RoutePath
  icon: React.ReactNode | null
  label: string
}

// 获取路由的权限
export const getRoutePermissions = (path: RoutePath): string[] => {
  return [...(routeMetadata[path]?.permissions || [])]
}

// 检查用户是否有路由权限
export const hasRoutePermission = (path: RoutePath, userRoles: string[]): boolean => {
  const permissions = getRoutePermissions(path)
  return permissions.length === 0 || permissions.some(role => userRoles.includes(role))
}

// 创建运行时菜单项的工具函数（在 React 组件中使用）
export const createRuntimeMenuItems = (
  iconComponents: Record<string, React.ComponentType<any>>
): RuntimeMenuItem[] => {
  return functionMenuItems.map(item => ({
    key: item.key,
    icon: item.icon ? React.createElement(iconComponents[item.icon]) : null,
    label: item.label,
  }))
}
