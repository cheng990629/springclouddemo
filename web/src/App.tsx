import React, { Suspense, useState, useEffect } from 'react'
import { Routes, Route, RouteObject, Navigate } from 'react-router-dom'
import { ConfigProvider, Spin } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import { useTheme } from '@/store'
import { getThemeConfig } from '@/theme'
import WorkspaceLayout from '@/components/layout/WorkspaceLayout'
import { agiRoutes } from '@/router'
import Login from '@/pages/auth/Login'
import OAuthCallback from '@/pages/auth/OAuthCallback'
import { useAuth } from '@/contexts/AuthContext'

// 登录守卫组件
const AuthGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}

// 登录页守卫（已登录用户访问登录页会跳转到首页）
const LoginGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth()

  if (isAuthenticated) {
    return <Navigate to="/" replace />
  }

  return <>{children}</>
}

const App: React.FC = () => {
  const theme = useTheme()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    checkIsMobile()
    window.addEventListener('resize', checkIsMobile)

    return () => window.removeEventListener('resize', checkIsMobile)
  }, [])

  return (
    <div data-theme={theme}>
      <ConfigProvider locale={zhCN} theme={getThemeConfig(theme)}>
        <WorkspaceLayout isMobile={isMobile}>
          <Suspense fallback={
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '200px'
            }}>
              <Spin size="large" />
            </div>
          }>
            <Routes>
              {/* 登录相关路由 - 不需要登录 */}
              <Route
                path="/login"
                element={
                  <LoginGuard>
                    <Login />
                  </LoginGuard>
                }
              />
              <Route path="/login/oauth2/code/github" element={<OAuthCallback />} />

              {/* 需要登录的路由 */}
              <Route
                path="/oauth2/authorize/:provider"
                element={<Navigate to="/login" replace />}
              />

              {/* 受保护的路由 */}
              {agiRoutes.map((route: RouteObject) => (
                <Route
                  key={route.path || ''}
                  path={route.path || ''}
                  element={
                    <AuthGuard>
                      {route.element}
                    </AuthGuard>
                  }
                />
              ))}

              {/* 默认路由 */}
              <Route path="/" element={<Navigate to="/large-screen-dashboard" replace />} />
            </Routes>
          </Suspense>
        </WorkspaceLayout>
      </ConfigProvider>
    </div>
  )
}

export default App
