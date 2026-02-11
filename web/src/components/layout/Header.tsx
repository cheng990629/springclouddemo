import React from 'react'
import { Layout, Input, Select, Dropdown, Avatar, Button } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'

const { Header: AntHeader } = Layout

const userMenuItems: MenuProps['items'] = [
  { key: 'profile', label: 'Profile' },
  { key: 'settings', label: 'Settings' },
  { type: 'divider' },
  { key: 'logout', label: 'Logout', danger: true },
]

const Header: React.FC = () => {
  return (
    <AntHeader style={{ background: '#fff', padding: '8px 16px', display: 'flex', alignItems: 'center' }}>
      <div style={{ fontWeight: 700, fontSize: 18, marginRight: 16 }}>CAYDE AGI</div>

      <Input.Search placeholder="搜索或输入 URL" style={{ maxWidth: 560, flex: 1 }} />

      <div style={{ marginLeft: 12, display: 'flex', gap: 12, alignItems: 'center' }}>
        <Select defaultValue="zh-CN" options={[{ value: 'zh-CN', label: '中文' }, { value: 'en-US', label: 'English' }]} />

        <Dropdown menu={{ items: userMenuItems }}>
          <Button type="text" icon={<Avatar icon={<UserOutlined />} />} />
        </Dropdown>
      </div>
    </AntHeader>
  )
}

export default Header


