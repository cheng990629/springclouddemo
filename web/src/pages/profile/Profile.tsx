import React, { useEffect, useState } from 'react'
import { Form, Input, Button, Avatar, Card, Row, Col, Tag, Typography, Space, Descriptions, message, Tabs, List, Statistic } from 'antd'
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  HomeOutlined,
  GlobalOutlined,
  TwitterOutlined,
  GithubOutlined,
  TeamOutlined,
  SafetyCertificateOutlined,
  CalendarOutlined,
  BookOutlined,
  BankOutlined,
  LinkOutlined,
  EditOutlined,
  LockOutlined
} from '@ant-design/icons'
import { useUser } from '@/store'

const { Title, Text } = Typography

const Profile: React.FC = () => {
  const [form] = Form.useForm()
  const [editing, setEditing] = useState(false)
  const [loading, setLoading] = useState(false)
  const user = useUser()

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        username: user.username,
        email: user.email,
        name: user.name,
        phone: user.company, // 使用 company 字段存储手机号或其他信息
        location: user.location,
        blog: user.blog,
        bio: user.bio,
      })
    }
  }, [user, form])

  const handleFinish = (values: Record<string, string>) => {
    setLoading(true)
    // 模拟保存
    setTimeout(() => {
      message.success('个人信息更新成功')
      setLoading(false)
      setEditing(false)
    }, 1000)
  }

  const getProviderInfo = (provider?: string) => {
    switch (provider) {
      case 'github':
        return { color: '#333', icon: <GithubOutlined />, text: 'GitHub' }
      case 'ldap':
        return { color: '#1890ff', icon: <SafetyCertificateOutlined />, text: 'LDAP' }
      case 'alipay':
        return { color: '#1677ff', icon: <TeamOutlined />, text: '支付宝' }
      default:
        return { color: '#52c41a', icon: <UserOutlined />, text: '普通登录' }
    }
  }

  const providerInfo = getProviderInfo(user?.provider)

  return (
    <div style={{ padding: 24, maxWidth: 1200, margin: '0 auto' }}>
      <Title level={2}>个人中心</Title>

      <Tabs
        defaultActiveKey="basic"
        items={[
          {
            key: 'basic',
            label: '基本信息',
            children: (
              <Row gutter={24}>
                <Col xs={24} lg={8}>
                  <Card hoverable>
                    <div style={{ textAlign: 'center', marginBottom: 16 }}>
                      <Avatar
                        size={100}
                        src={user?.avatar}
                        icon={user?.provider === 'github' ? <GithubOutlined /> : <UserOutlined />}
                        style={{ cursor: 'pointer' }}
                      />
                      <Title level={4} style={{ margin: '16px 0 8px' }}>{user?.username || '未设置'}</Title>
                      {user?.roles && user.roles.length > 0 && (
                        <Space wrap>
                          {user.roles.map(role => (
                            <Tag key={role} color={role.includes('ADMIN') ? 'blue' : 'green'}>
                              {role}
                            </Tag>
                          ))}
                        </Space>
                      )}
                    </div>

                    <Descriptions column={1} size="small">
                      <Descriptions.Item label={<><SafetyCertificateOutlined /> 登录方式</>}>
                        <Tag color={providerInfo.color} icon={providerInfo.icon}>
                          {providerInfo.text}
                        </Tag>
                      </Descriptions.Item>
                      <Descriptions.Item label={<><MailOutlined /> 邮箱</>}>
                        {user?.email || '未绑定'}
                      </Descriptions.Item>
                      <Descriptions.Item label={<><CalendarOutlined /> 创建时间</>}>
                        {user?.created_at ? new Date(user.created_at).toLocaleDateString() : '未知'}
                      </Descriptions.Item>
                      {user?.github_id && (
                        <Descriptions.Item label={<><GithubOutlined /> GitHub ID</>}>
                          {user.github_id}
                        </Descriptions.Item>
                      )}
                    </Descriptions>
                  </Card>
                </Col>

                <Col xs={24} lg={16}>
                  <Card
                    title="编辑个人信息"
                    extra={
                      <Button
                        type={editing ? 'default' : 'primary'}
                        icon={editing ? <EditOutlined /> : <EditOutlined />}
                        onClick={() => setEditing(!editing)}
                      >
                        {editing ? '取消' : '编辑'}
                      </Button>
                    }
                  >
                    <Form
                      form={form}
                      onFinish={handleFinish}
                      layout="vertical"
                      disabled={!editing}
                    >
                      <Row gutter={16}>
                        <Col xs={24} sm={12}>
                          <Form.Item label="用户名" name="username" rules={[{ required: true, message: '请输入用户名' }]}>
                            <Input prefix={<UserOutlined />} placeholder="用户名" />
                          </Form.Item>
                        </Col>
                        <Col xs={24} sm={12}>
                          <Form.Item label="显示名称" name="name">
                            <Input prefix={<UserOutlined />} placeholder="显示名称" />
                          </Form.Item>
                        </Col>
                      </Row>

                      <Row gutter={16}>
                        <Col xs={24} sm={12}>
                          <Form.Item label="邮箱" name="email" rules={[{ type: 'email', message: '请输入有效的邮箱' }]}>
                            <Input prefix={<MailOutlined />} placeholder="邮箱" />
                          </Form.Item>
                        </Col>
                        <Col xs={24} sm={12}>
                          <Form.Item label="手机号" name="phone">
                            <Input prefix={<PhoneOutlined />} placeholder="手机号" />
                          </Form.Item>
                        </Col>
                      </Row>

                      <Row gutter={16}>
                        <Col xs={24} sm={12}>
                          <Form.Item label="所在地" name="location">
                            <Input prefix={<HomeOutlined />} placeholder="所在地" />
                          </Form.Item>
                        </Col>
                        <Col xs={24} sm={12}>
                          <Form.Item label="个人网站" name="blog">
                            <Input prefix={<GlobalOutlined />} placeholder="个人网站" />
                          </Form.Item>
                        </Col>
                      </Row>

                      <Form.Item label="个人简介" name="bio">
                        <Input.TextArea rows={3} placeholder="个人简介" />
                      </Form.Item>

                      {editing && (
                        <Form.Item>
                          <Space>
                            <Button type="primary" htmlType="submit" loading={loading}>
                              保存
                            </Button>
                            <Button onClick={() => setEditing(false)}>
                              取消
                            </Button>
                          </Space>
                        </Form.Item>
                      )}
                    </Form>
                  </Card>
                </Col>
              </Row>
            )
          },
          {
            key: 'github',
            label: 'GitHub 资料',
            children: user?.provider === 'github' ? (
              <Row gutter={24}>
                <Col xs={24} sm={6}>
                  <Card hoverable>
                    <Statistic
                      title="仓库数"
                      value={user?.public_repos || 0}
                      prefix={<BookOutlined />}
                    />
                  </Card>
                </Col>
                <Col xs={24} sm={6}>
                  <Card hoverable>
                    <Statistic
                      title="Gists"
                      value={user?.public_gists || 0}
                      prefix={<GlobalOutlined />}
                    />
                  </Card>
                </Col>
                <Col xs={24} sm={6}>
                  <Card hoverable>
                    <Statistic
                      title="粉丝"
                      value={user?.followers || 0}
                      prefix={<TeamOutlined />}
                    />
                  </Card>
                </Col>
                <Col xs={24} sm={6}>
                  <Card hoverable>
                    <Statistic
                      title="关注"
                      value={user?.following || 0}
                      prefix={<TeamOutlined />}
                    />
                  </Card>
                </Col>

                {user?.html_url && (
                  <Col xs={24} style={{ marginTop: 16 }}>
                    <Card title="链接">
                      <Space>
                        <Button
                          type="link"
                          icon={<GithubOutlined />}
                          href={user.html_url}
                          target="_blank"
                        >
                          GitHub 主页
                        </Button>
                        {user?.blog && (
                          <Button
                            type="link"
                            icon={<GlobalOutlined />}
                            href={user.blog}
                            target="_blank"
                          >
                            个人网站
                          </Button>
                        )}
                        {user?.twitter_username && (
                          <Button
                            type="link"
                            icon={<TwitterOutlined />}
                            href={`https://twitter.com/${user.twitter_username}`}
                            target="_blank"
                          >
                            Twitter
                          </Button>
                        )}
                      </Space>
                    </Card>
                  </Col>
                )}

                {user?.bio && (
                  <Col xs={24} style={{ marginTop: 16 }}>
                    <Card title="个人简介">
                      <Text>{user.bio}</Text>
                    </Card>
                  </Col>
                )}
              </Row>
            ) : (
              <Card>
                <div style={{ textAlign: 'center', padding: 40 }}>
                  <GithubOutlined style={{ fontSize: 48, color: '#8c8c8c' }} />
                  <Title level={4} style={{ marginTop: 16 }}>非 GitHub 登录</Title>
                  <Text type="secondary">当前账号未使用 GitHub 登录，无法查看 GitHub 资料</Text>
                </div>
              </Card>
            )
          },
          {
            key: 'security',
            label: '安全设置',
            children: (
              <Card>
                <List
                  dataSource={[
                    {
                      title: '修改密码',
                      description: '定期修改密码可以保护账号安全',
                      icon: <LockOutlined style={{ fontSize: 24, color: '#1890ff' }} />,
                      action: <Button type="link">修改</Button>
                    },
                    {
                      title: '绑定手机',
                      description: '用于账号找回和二次验证',
                      icon: <PhoneOutlined style={{ fontSize: 24, color: '#52c41a' }} />,
                      action: <Button type="link">{user?.company ? '已绑定' : '去绑定'}</Button>
                    },
                    {
                      title: '绑定邮箱',
                      description: '用于接收系统通知和密码找回',
                      icon: <MailOutlined style={{ fontSize: 24, color: '#722ed1' }} />,
                      action: <Button type="link">{user?.email ? '已绑定' : '去绑定'}</Button>
                    },
                  ]}
                  renderItem={(item) => (
                    <List.Item
                      actions={[item.action]}
                    >
                      <List.Item.Meta
                        avatar={item.icon}
                        title={item.title}
                        description={item.description}
                      />
                    </List.Item>
                  )}
                />
              </Card>
            )
          }
        ]}
      />
    </div>
  )
}

export default Profile
