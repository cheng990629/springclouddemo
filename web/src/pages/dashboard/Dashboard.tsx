import React from 'react'
import { Row, Col, Card, Statistic, Progress } from 'antd'
import { ApiOutlined, UserOutlined, DatabaseOutlined, ThunderboltOutlined } from '@ant-design/icons'
import { PageCard } from '@/adapter/views'

const Dashboard: React.FC = () => {
  const stats = [
    { title: 'API Calls', value: 12345, icon: <ApiOutlined /> },
    { title: 'Active Users', value: 234, icon: <UserOutlined /> },
    { title: 'Data', value: 89.5, icon: <DatabaseOutlined /> },
    { title: 'Load', value: 65, icon: <ThunderboltOutlined /> },
  ]

  return (
    <div style={{ padding: 24 }}>
      <h1>Dashboard</h1>
      <Row gutter={[16, 16]}>
        {stats.map((s, idx) => (
          <Col xs={24} sm={12} lg={6} key={idx}>
            <Card variant="borderless">
              <Statistic title={s.title} value={s.value} prefix={s.icon} />
            </Card>
          </Col>
        ))}
      </Row>

      <PageCard title="System Status">
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <div>
              <h4>CPU</h4>
              <Progress percent={65} status="active" />
            </div>
          </Col>
          <Col xs={24} md={12}>
            <div>
              <h4>Memory</h4>
              <Progress percent={45} strokeColor="#52c41a" />
            </div>
          </Col>
        </Row>
      </PageCard>
    </div>
  )
}

export default Dashboard


