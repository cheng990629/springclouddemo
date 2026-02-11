import React from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import type { RouteObject } from 'react-router-dom'

export interface RouteConfig {
  path: string
  component: React.ComponentType
  title?: string
  meta?: {
    requiresAuth?: boolean
    roles?: string[]
    title?: string
    icon?: React.ComponentType
  }
  children?: RouteConfig[]
}

interface RouterAdapterProps {
  routes: RouteConfig[]
  fallback?: React.ComponentType
}

const RouteRenderer: React.FC<{ routes: RouteConfig[] }> = ({ routes }) => {
  const location = useLocation()

  return (
    <Routes>
      {routes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={<route.component />}
        />
      ))}
      {/* 默认重定向到第一个路由 */}
      {routes.length > 0 && location.pathname === '/' && (
        <Route path="/" element={<Navigate to={routes[0].path} replace />} />
      )}
    </Routes>
  )
}

export const RouterAdapter: React.FC<RouterAdapterProps> = ({
  routes,
}) => {
  return <RouteRenderer routes={routes} />
}

// 路由守卫
export const RouteGuard: React.FC<{
  children: React.ReactNode
  requiresAuth?: boolean
  roles?: string[]
}> = ({ children, requiresAuth, roles }) => {
  const token = localStorage.getItem('token')
  const userRoles = JSON.parse(localStorage.getItem('userRoles') || '[]')

  if (requiresAuth && !token) {
    return <Navigate to="/login" replace />
  }

  if (roles && roles.length > 0) {
    const hasRole = roles.some(role => userRoles.includes(role))
    if (!hasRole) {
      return <Navigate to="/403" replace />
    }
  }

  return <>{children}</>
}

// 路由工具函数
export const createRoutes = (routes: RouteConfig[]): RouteObject[] => {
  return routes.map(route => ({
    path: route.path,
    element: route.component ? React.createElement(route.component) : undefined,
    children: route.children ? createRoutes(route.children) : undefined,
  }))
}

export const flattenRoutes = (routes: RouteConfig[]): RouteConfig[] => {
  const result: RouteConfig[] = []

  const flatten = (routes: RouteConfig[]) => {
    routes.forEach(route => {
      result.push(route)
      if (route.children) {
        flatten(route.children)
      }
    })
  }

  flatten(routes)
  return result
}

export const findRouteByPath = (routes: RouteConfig[], path: string): RouteConfig | undefined => {
  return flattenRoutes(routes).find(route => route.path === path)
}
