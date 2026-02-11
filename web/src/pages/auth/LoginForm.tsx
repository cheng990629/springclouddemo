import React, { useState } from 'react'
import { Form, Input, Button, message, Divider, Card, Typography, Space, Tag } from 'antd'
import { UserOutlined, LockOutlined, SafetyCertificateOutlined, GithubOutlined, DatabaseOutlined, TeamOutlined } from '@ant-design/icons'
import { useAuth } from '@/contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

const { Title, Text, Paragraph } = Typography

// 测试用户凭据数据
const testCredentials = {
  database: [
    { role: '普通用户', username: 'user_1', password: 'user_1', color: 'default' },
    { role: 'EDITOR', username: 'editor_1', password: 'editor_1', color: 'blue' },
    { role: 'PRODUCT_ADMIN', username: 'adm_1', password: 'adm_1', color: 'red' }
  ],
  ldap: [
    { role: '普通用户', username: 'ldap_user_1', password: 'ldap_user_1', color: 'default' },
    { role: 'EDITOR', username: 'ldap_editor_1', password: 'ldap_editor_1', color: 'blue' },
    { role: 'PRODUCT_ADMIN', username: 'ldap_adm_1', password: 'ldap_adm_1', color: 'red' }
  ]
}

function LoginForm() {
  const [loading, setLoading] = useState(false)
  const [loginType, setLoginType] = useState<'password' | 'ldap' | 'github'>('password')
  const { login } = useAuth()
  const navigate = useNavigate()
  const [form] = Form.useForm()

  const handleSubmit = async (values: { username: string; password: string }) => {
    setLoading(true)
    try {
      const username = values.username
      const password = values.password

      if (!username || !password) {
        message.error('请填写用户名和密码')
        return
      }

      const success = await login(username, password, loginType)

      if (success) {
        message.success('登录成功！')
        navigate('/')
      } else {
        message.error('登录失败，请检查用户名和密码')
      }
    } catch (error) {
      message.error('登录失败，请检查用户名和密码')
      console.error('Login error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleGitHubLogin = () => {
    window.location.href = '/uaa/oauth2/authorize/github'
  }

  const fillCredentials = (username: string, password: string) => {
    form.setFieldsValue({ username, password })
  }

  return (
    <div style={{ width: '100%' }}>
      <style>{`
        #username::placeholder,
        #password::placeholder {
          color: #d9d9d9 !important;
        }
        #username::-webkit-input-placeholder,
        #password::-webkit-input-placeholder {
          color: #d9d9d9 !important;
        }
        #username::-moz-placeholder,
        #password::-moz-placeholder {
          color: #d9d9d9 !important;
        }
        #username::-ms-input-placeholder,
        #password::-ms-input-placeholder {
          color: #d9d9d9 !important;
        }
      `}</style>
      {/* 登录类型切换 */}
      <div style={{ display: 'flex', marginBottom: 24, borderBottom: '2px solid #f0f0f0' }}>
        <Button
          type="text"
          onClick={() => setLoginType('password')}
          style={{
            flex: 1,
            padding: '12px 0',
            fontSize: 16,
            fontWeight: 500,
            borderBottom: loginType === 'password' ? '2px solid #1677ff' : 'none',
            color: loginType === 'password' ? '#1677ff' : '#666',
            marginBottom: -2
          }}
        >
          <TeamOutlined style={{ fontSize: 18, marginRight: 8 }} />账号密码
        </Button>
        <Button
          type="text"
          onClick={() => setLoginType('ldap')}
          style={{
            flex: 1,
            padding: '12px 0',
            fontSize: 16,
            fontWeight: 500,
            borderBottom: loginType === 'ldap' ? '2px solid #1677ff' : 'none',
            color: loginType === 'ldap' ? '#1677ff' : '#666',
            marginBottom: -2
          }}
        >
          <SafetyCertificateOutlined style={{ fontSize: 18, marginRight: 8 }} />LDAP
        </Button>
      </div>

      {/* 账号密码 / LDAP 表单 */}
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          name="username"
          rules={[{ required: true, message: '请输入用户名' }]}
        >
          <Input
            prefix={<UserOutlined />}
            placeholder={loginType === 'ldap' ? 'LDAP 用户名' : '用户名'}
            size="large"
            style={{ height: 48, color: '#fff' }}
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: '请输入密码' }]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder={loginType === 'ldap' ? 'LDAP 密码' : '密码'}
            size="large"
            style={{ height: 48, color: '#fff' }}
          />
        </Form.Item>
        <Form.Item style={{ marginTop: 24 }}>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            block
            size="large"
            style={{ height: 48, fontSize: 16 }}
          >
            {loginType === 'ldap' ? 'LDAP 登录' : '登录'}
          </Button>
        </Form.Item>
      </Form>

      {/* 分隔线 */}
      <Divider plain>
        <span style={{ color: '#999' }}>其他登录方式</span>
      </Divider>

      {/* GitHub 登录按钮 */}
      <Button
        onClick={handleGitHubLogin}
        block
        size="large"
        style={{
          height: 48,
          fontSize: 16,
          backgroundColor: '#24292e',
          color: 'white',
          borderColor: '#24292e',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8
        }}
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
        GitHub 登录（登录后赋予 EDITOR 角色）
      </Button>

      {/* 测试用户凭据 - 登录区域下方 */}
      <Divider />

      <Card
        size="small"
        title={
          <Space>
            <Text strong>🧪 测试用户凭据</Text>
            <Tag color="orange">测试环境</Tag>
          </Space>
        }
        style={{ backgroundColor: '#fffbe6', borderColor: '#ffe58f' }}
      >
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>

          {/* 数据库凭据 */}
          <div>
            <Paragraph strong style={{ marginBottom: 8, color: '#1890ff' }}>
              <DatabaseOutlined /> 数据库
            </Paragraph>
            <Space direction="vertical" size="small" style={{ width: '100%' }}>
              {testCredentials.database.map((user, index) => (
                <Button
                  key={`db-${index}`}
                  type="dashed"
                  size="small"
                  block
                  style={{ textAlign: 'left', height: 'auto', padding: '8px 12px' }}
                  onClick={() => {
                    setLoginType('password')
                    fillCredentials(user.username, user.password)
                  }}
                >
                  <Space wrap style={{ width: '100%', justifyContent: 'space-between' }}>
                    <Space>
                      <Tag color={user.color}>{user.role}</Tag>
                      <Text code style={{ fontSize: 12 }}>{user.username}</Text>
                    </Space>
                    <Text type="secondary" style={{ fontSize: 12 }}>密码: {user.password}</Text>
                  </Space>
                </Button>
              ))}
            </Space>
          </div>

          {/* LDAP凭据 */}
          <div>
            <Paragraph strong style={{ marginBottom: 8, color: '#722ed1' }}>
              <SafetyCertificateOutlined /> LDAP
            </Paragraph>
            <Space direction="vertical" size="small" style={{ width: '100%' }}>
              {testCredentials.ldap.map((user, index) => (
                <Button
                  key={`ldap-${index}`}
                  type="dashed"
                  size="small"
                  block
                  style={{ textAlign: 'left', height: 'auto', padding: '8px 12px' }}
                  onClick={() => {
                    setLoginType('ldap')
                    fillCredentials(user.username, user.password)
                  }}
                >
                  <Space wrap style={{ width: '100%', justifyContent: 'space-between' }}>
                    <Space>
                      <Tag color={user.color}>{user.role}</Tag>
                      <Text code style={{ fontSize: 12 }}>{user.username}</Text>
                    </Space>
                    <Text type="secondary" style={{ fontSize: 12 }}>密码: {user.password}</Text>
                  </Space>
                </Button>
              ))}
            </Space>
          </div>

          {/* GitHub 登录说明 */}
          <div style={{ backgroundColor: '#f0f0f0', padding: 8, borderRadius: 6 }}>
            <Paragraph strong style={{ marginBottom: 4, fontSize: 12 }}>
              <GithubOutlined /> GitHub 登录
            </Paragraph>
            <Text type="secondary" style={{ fontSize: 12 }}>
              点击上方 GitHub 按钮登录，登录后自动赋予 <Tag color="blue">EDITOR</Tag> 角色
            </Text>
          </div>

        </Space>
      </Card>
    </div>
  )
}

export default LoginForm
