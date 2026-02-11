import React from 'react'
import { Layout, Menu } from 'antd'
import { DashboardOutlined, UserOutlined } from '@ant-design/icons'

const { Sider } = Layout

const items = [
  { key: '/', icon: <DashboardOutlined />, label: 'Dashboard' },
  { key: '/api-cascader', icon: <UserOutlined />, label: 'API Cascader' },
  { key: '/profile', icon: <UserOutlined />, label: 'Profile' },
]

const Sidebar: React.FC = () => {
  return (
    <Sider width={200} style={{ background: '#001529' }}>
      <div style={{ height: 64, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
        CAYDE
      </div>
      <Menu theme="dark" mode="inline" items={items} />
    </Sider>
  )
}

export default Sidebar


