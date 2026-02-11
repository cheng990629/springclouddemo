import React from 'react'
import { Layout, Typography } from 'antd'

const { Footer: AntFooter } = Layout
const { Text } = Typography
import { Button } from 'antd'
import { AppstoreOutlined } from '@ant-design/icons'
import useOverlayStore from '@/store/overlayStore'

const Footer: React.FC = () => {
  const openOverlay = useOverlayStore((s) => s.openOverlay)

  return (
    <AntFooter style={{ textAlign: 'center', background: '#fff', position: 'relative' }}>
      <Text type="secondary">© 2024 CAYDE AGI Design UI</Text>

      <div style={{ position: 'fixed', right: 20, bottom: 24, zIndex: 10010 }}>
        <Button
          type="primary"
          shape="circle"
          size="large"
          icon={<AppstoreOutlined />}
          onClick={() => openOverlay('/')}
        />
      </div>
    </AntFooter>
  )
}

export default Footer


