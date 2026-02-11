import { Routes, Route } from 'react-router-dom'
import { Layout } from 'antd'
import { XProvider } from '@ant-design/x'
import { Suspense } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { routes } from '@/router'
import { Spin } from 'antd'

const { Content } = Layout

function TraditionalApp() {
  return (
    <XProvider>
      <Layout style={{ height: '100vh' }}>
        <Layout style={{ display: 'flex', flexDirection: 'column' }}>
          <Header />
          <Content style={{
            margin: '24px 16px',
            padding: 24,
            background: '#fff',
            borderRadius: 8,
            flex: 1,
            overflow: 'auto',
          }}>
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
                {routes.map((route) => (
                  <Route
                    key={route.path}
                    path={route.path}
                    element={route.element}
                  />
                ))}
              </Routes>
            </Suspense>
          </Content>
          <Footer />
        </Layout>
      </Layout>
    </XProvider>
  )
}

export default TraditionalApp


