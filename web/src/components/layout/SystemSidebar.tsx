import React, { useState, useEffect } from 'react';
import { Button, Avatar, Modal, Form, Input, message, Checkbox, Typography, Space, Flex, Tag, Dropdown } from 'antd';
import { WindowsOutlined, MoonOutlined, SunOutlined, UserOutlined, BookOutlined, FileTextOutlined, CompassOutlined, GithubOutlined, DatabaseOutlined, SafetyCertificateOutlined, TeamOutlined, LogoutOutlined } from '@ant-design/icons';
import type { NavigateFunction } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useAppStore, useUser, useLogout, useSetUser, useSetToken } from '@/store';
import { LogoIcon, AIChatIcon } from '@/constants';

interface SystemSidebarProps {
  onWindowView: () => void;
  navigate: NavigateFunction;
  onWidthChange?: (width: number) => void;
  onApplicationSidebarCollapsedChange?: (collapsed: boolean) => void;
  isMobile?: boolean;
}

const SystemSidebar: React.FC<SystemSidebarProps> = ({
  onWindowView,
  navigate,
  onWidthChange,
  onApplicationSidebarCollapsedChange,
  isMobile = false,
}) => {
  const { theme, setTheme } = useAppStore()
  const user = useUser()
  const logout = useLogout()
  const setUser = useSetUser()
  const setToken = useSetToken()
  const location = useLocation()
  const [loginModalVisible, setLoginModalVisible] = useState(false)
  const [logoHovered, setLogoHovered] = useState(false)
  const [collapsed, setCollapsed] = useState(isMobile)
  const [form] = Form.useForm()

  // 通知父组件宽度变化
  useEffect(() => {
    onWidthChange?.(collapsed ? 70 : 250)
  }, [collapsed, onWidthChange])

  const handleLogout = () => {
    logout()
    // 点击任何按钮都折叠ApplicationSidebar
    onApplicationSidebarCollapsedChange?.(true)
  }

  // 创建一个包装函数，执行导航后折叠ApplicationSidebar
  const createNavigationHandler = (path: string) => () => {
    navigate(path)
    onApplicationSidebarCollapsedChange?.(true)
  }

  // 创建一个包装函数，执行回调后折叠ApplicationSidebar
  const createActionHandler = (action: () => void) => () => {
    action()
    onApplicationSidebarCollapsedChange?.(true)
  }

  const handleThemeToggle = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
    // 点击任何按钮都折叠ApplicationSidebar
    onApplicationSidebarCollapsedChange?.(true)
  }

  const handleSidebarToggle = () => {
    const newCollapsed = !collapsed
    setCollapsed(newCollapsed)
    onWidthChange?.(newCollapsed ? 70 : 250)
    // 当SystemSidebar折叠时，同时折叠ApplicationSidebar
    if (newCollapsed) {
      onApplicationSidebarCollapsedChange?.(true)
    }
  }

  // 判断按钮是否激活的函数
  const isButtonActive = (path: string) => {
    return location.pathname === path
  }

  const [loginType, setLoginType] = useState<'password' | 'ldap'>('password')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (values: { username: string; password: string; agreement: boolean }) => {
    try {
      setLoading(true)
      const username = values.username
      const password = values.password

      if (!username || !password) {
        message.error('请填写用户名和密码')
        setLoading(false)
        return
      }

      let response

      if (loginType === 'ldap') {
        response = await fetch('/uaa/ldap/token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password })
        })
      } else {
        response = await fetch('/uaa/token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password, grant_type: 'password' })
        })
      }

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || '登录失败')
      }

      const { accessToken, username: userName, roles } = data

      // 同步更新 Zustand store
      setToken(accessToken)
      setUser({ username: userName, roles })

      localStorage.setItem('token', accessToken)
      localStorage.setItem('user', JSON.stringify({ username: userName, roles }))

      message.success('登录成功！')
      hideLoginModal()
      // 不再需要刷新页面，状态已同步更新
    } catch (error) {
      console.error('Login error:', error)
      message.error('登录失败，请检查用户名和密码')
    } finally {
      setLoading(false)
    }
  }

  const handleGitHubLogin = () => {
    window.location.href = '/uaa/oauth2/authorize/github'
  }

  const showLoginModal = () => {
    setLoginModalVisible(true)
    // 点击任何按钮都折叠ApplicationSidebar
    onApplicationSidebarCollapsedChange?.(true)
  }

  const hideLoginModal = () => {
    setLoginModalVisible(false)
    form.resetFields()
  }

  return (
    <>
      {/* SVG symbols definition */}
      <svg style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}>
        <defs>
          <symbol id="masterapp__ic_sidebarclose_outline" viewBox="0 0 1024 1024">
            <path d="M807.018667 380.885333v87.936a43.712 43.712 0 0 0 87.402666 0v-87.936q0-89.109333-64.704-153.813333-64.725333-64.725333-153.813333-64.725333h-393.386667q-89.088 0-153.813333 64.725333Q64 291.776 64 380.885333v262.229334q0 89.109333 64.725333 153.813333 64.704 64.725333 153.813334 64.725333h305.941333a43.712 43.712 0 1 0 0-87.402666h-172.586667l-1.194666-524.48h261.205333q52.885333 0 91.989333 39.104 39.125333 39.104 39.125334 92.010666zM327.253333 249.770667l1.216 524.48h-45.952q-52.906667 0-92.010666-39.125334-39.104-39.104-39.104-92.010666V380.885333q0-52.906667 39.104-92.010666 39.104-39.104 92.010666-39.104h44.736zM789.76 765.269333l-26.176-34.901333h152.746667a43.712 43.712 0 1 0 0-87.402667h-152.832l26.261333-35.029333c5.653333-7.530667 8.725333-16.661333 8.746667-26.069333v-0.149334a43.733333 43.733333 0 0 0-43.136-43.733333h-0.576c-13.738667 0-26.709333 6.485333-34.965334 17.493333l-78.656 104.896a43.712 43.712 0 0 0 0 52.458667l78.656 104.896a43.733333 43.733333 0 0 0 78.677334-25.834667v-0.384c0-9.472-3.072-18.666667-8.746667-26.24z"></path>
          </symbol>
        </defs>
      </svg>

      <div className="side-bar" style={{
        width: collapsed ? '70px' : '250px',
        transition: 'all 0.3s ease'
      }}>
      <div style={{
        padding: '22px 12px 16px',
        width: '100%'
      }}>
      <div
        className="sidebar-logo"
        onClick={handleSidebarToggle}
        onMouseEnter={() => setLogoHovered(true)}
        onMouseLeave={() => setLogoHovered(false)}
        style={{
          cursor: 'pointer',
          marginLeft: '9px',
          position: 'relative',
          userSelect: 'none',
          marginBottom: '22px',
          WebkitUserSelect: 'none',
          MozUserSelect: 'none',
          msUserSelect: 'none'
         }}
      >
        <LogoIcon style={{
          width: '24px',
          height: '24px',
          color: '#1890ff',
          opacity: logoHovered ? 0 : 1,
          transition: 'opacity 0.2s ease'
        }} />
        <svg
          style={{
            position: 'absolute',
            top: '-2px',
            left: '3px',
            width: '22px',
            height: '22px',
            opacity: logoHovered ? 1 : 0,
            transition: 'opacity 0.2s ease',
            color: 'white',
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            padding: '1px',
            borderRadius: '3px',
            transform: 'scaleX(-1)'
          }}
          viewBox="0 0 1024 1024"
          fill="currentColor"
        >
          <use href="#masterapp__ic_sidebarclose_outline" />
        </svg>
      </div>

      <Button
        className={`side-bar-btn new-chat-btn ${isButtonActive('/large-screen-dashboard') ? 'active' : ''}`}
        type="text"
        onClick={createNavigationHandler('/large-screen-dashboard')}
        disabled={location.pathname === '/large-screen-dashboard'}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: collapsed ? 'center' : 'flex-start',
          padding: '0 12px',
          width: '100%'
        }}
      >
        <AIChatIcon style={{ marginRight: collapsed ? 0 : '6px' }} />
        {!collapsed && <span style={{ fontSize: '14px' }}>新对话</span>}
      </Button>
     
      <Button
        className={`side-bar-btn ${isButtonActive('/notes') ? 'active' : ''}`}
        type="text"
        onClick={createNavigationHandler('/notes')}
        style={{ display: 'flex', alignItems: 'center', justifyContent: collapsed ? 'center' : 'flex-start', padding: '0 12px', width: '100%' }}
      >
        <FileTextOutlined style={{ marginRight: collapsed ? 0 : '6px' }} />
        {!collapsed && <span style={{ fontSize: '14px' }}>随手记</span>}
      </Button>
      <Button
        className={`side-bar-btn ${isButtonActive('/knowledge') ? 'active' : ''}`}
        type="text"
        onClick={createNavigationHandler('/knowledge')}
        style={{ display: 'flex', alignItems: 'center', justifyContent: collapsed ? 'center' : 'flex-start', padding: '0 12px', width: '100%' }}
      >
        <BookOutlined style={{ marginRight: collapsed ? 0 : '6px' }} />
        {!collapsed && <span style={{ fontSize: '14px' }}>知识库</span>}
      </Button>

      <Button
        className={`side-bar-btn ${isButtonActive('/discover') ? 'active' : ''}`}
        type="text"
        onClick={createNavigationHandler('/discover')}
        style={{ display: 'flex', alignItems: 'center', justifyContent: collapsed ? 'center' : 'flex-start', padding: '0 12px', width: '100%' }}
      >
        <CompassOutlined style={{ marginRight: collapsed ? 0 : '6px' }} />
        {!collapsed && <span style={{ fontSize: '14px' }}>去发现</span>}
      </Button>
      <Button
        className="side-bar-btn"
        type="text"
        onClick={createActionHandler(onWindowView)}
        style={{ display: 'flex', alignItems: 'center', justifyContent: collapsed ? 'center' : 'flex-start', padding: '0 12px', width: '100%' }}
      >
        <WindowsOutlined style={{ marginRight: collapsed ? 0 : '6px' }} />
        {!collapsed && <span style={{ fontSize: '14px' }}>工作台</span>}
      </Button>
      <Button
          className="side-bar-btn"
          type="text"
          onClick={handleThemeToggle}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: collapsed ? 'center' : 'flex-start',
            padding: '0 12px',
            width: '100%'
          }}
        >
          {theme === 'dark' ? (
            <SunOutlined style={{ marginRight: collapsed ? 0 : '6px' }} />
          ) : (
            <MoonOutlined style={{ marginRight: collapsed ? 0 : '6px' }} />
          )}
          {!collapsed && <span style={{ fontSize: '14px' }}>主题切换</span>}
        </Button>

      </div>


      {/* 登录/用户信息区域 */}
      <div style={{
        padding: '0 12px 16px',
        width: '100%',
        marginTop: 'auto'
      }}>
      {user ? (
        <Dropdown
          menu={{
            items: [
              {
                key: 'profile',
                icon: <UserOutlined />,
                label: '个人信息',
                onClick: () => navigate('/profile'),
              },
              {
                key: 'logout',
                icon: <LogoutOutlined />,
                label: '退出登录',
                onClick: handleLogout,
                danger: true,
              },
            ],
          }}
          trigger={['click']}
          placement={collapsed ? 'top' : 'topRight'}
        >
          <Button
            className="side-bar-btn"
            type="text"
            style={{
              marginTop: 'auto',
              marginBottom: '0px',
              padding: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: collapsed ? 'center' : 'flex-start',
              width: collapsed ? '100%' : 'auto',
            }}
          >
            <Avatar
              size="small"
              src={user?.avatar}
              icon={
                user?.provider === 'github' ? <GithubOutlined /> :
                user?.provider === 'ldap' ? <SafetyCertificateOutlined /> :
                <UserOutlined />
              }
              style={{ width: '24px', height: '24px', marginRight: collapsed ? 0 : '6px' }}
            />
            {!collapsed && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', lineHeight: 1.3 }}>
                <span style={{ fontSize: '14px' }}>{user?.username || '用户'}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 2 }}>
                  {user?.provider === 'github' && (
                    <span style={{ fontSize: '10px', color: '#8c8c8c', display: 'flex', alignItems: 'center' }}>
                      <GithubOutlined style={{ marginRight: 2 }} /> GitHub
                    </span>
                  )}
                  {user?.provider === 'ldap' && (
                    <span style={{ fontSize: '10px', color: '#8c8c8c', display: 'flex', alignItems: 'center' }}>
                      <SafetyCertificateOutlined style={{ marginRight: 2 }} /> LDAP
                    </span>
                  )}
                  {(!user?.provider || user?.provider === 'local') && (
                    <span style={{ fontSize: '10px', color: '#8c8c8c', display: 'flex', alignItems: 'center' }}>
                      <TeamOutlined style={{ marginRight: 2 }} /> 普通登录
                    </span>
                  )}
                  {user?.roles && user.roles.length > 0 && (
                    <span style={{ fontSize: '10px', color: '#1890ff' }}>
                      {user.roles.join(', ')}
                    </span>
                  )}
                </div>
              </div>
            )}
          </Button>
        </Dropdown>
      ) : (
        <Button
          className="side-bar-btn login-btn"
          type="text"

          style={{
            marginTop: 'auto',
            marginBottom: '0px',
            padding: '0px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '14px',
            width: '100%',
            background: theme === 'dark' ? '#3C3E43' : '#e6e6e6',
            backdropFilter: 'blur(0)'
          }}
          onClick={showLoginModal}
        >
          <span style={{ fontSize: '14px' }}>登录</span>
        </Button>
      )}
      </div>

      {/* 登录弹窗 */}
      <Modal
        open={loginModalVisible}
        onCancel={hideLoginModal}
        footer={null}
        width={820}
        destroyOnHidden
        className="login-modal"
        centered
        styles={{
          body: {
            height: '450px',
            padding: 0,
            overflow: 'hidden',
            position: 'relative'
          }
        }}
      >
        {/* 整个modal的背景 */}
        <div className="login-bg-section">
          {/* 视频背景 */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="login-video-bg"
            poster="/src/assets/images/sidebar-poster.jpg"
          >
            <source src="/src/assets/videos/sidebar-video.mp4" type="video/mp4" />
          </video>

          {/* 背景图片 */}
          <img
            className="login-bg-image"
            src="/src/assets/images/sidebar-poster.jpg"
            alt="background"
          />

          {/* 标题文字 */}
          <div style={{
            position: 'absolute',
            top: '40px',
            right: '100px',
            zIndex: 10,
            pointerEvents: 'none'
          }}>
            <div style={{
              fontSize: '28px',
              fontWeight: 900,
              textAlign:'center',
              color: '#fff',
              letterSpacing: '6px',
              textShadow: '0 0 10px rgba(59, 130, 246, 0.8), 0 0 20px rgba(59, 130, 246, 0.6), 0 0 40px rgba(59, 130, 246, 0.4)',
              background: 'linear-gradient(135deg, #fff 0%, #3b82f6 50%, #fff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              fontFamily: "'Inter', 'Microsoft YaHei', sans-serif"
            }}>
              LUBASE
            </div>
            <div style={{
              fontSize: '12px',
              fontWeight: 400,
              color: 'rgba(255, 255, 255, 0.8)',
              letterSpacing: '4px',
              marginTop: '4px',
              textShadow: '0 0 10px rgba(59, 130, 246, 0.5)'
            }}>
              鲁班-工软-微服务-笔试Demo
            </div>
          </div>
        </div>

        {/* 表单内容区域 */}
        <Flex className="login-content-overlay" vertical={false} align="stretch">
          {/* 左侧测试用户凭据区域 */}
          <Flex
            flex={1}
            vertical
            justify="center"
            style={{
              padding: '16px',
              marginLeft: '100px',
              maxWidth: '320px',
              overflow: 'hidden'
            }}
          >
            {/* 测试用户凭据标题 */}
            <div style={{
              color: '#fff',
              fontSize: '14px',
              fontWeight: 600,
              marginBottom: 10,
              display: 'flex',
              alignItems: 'center',
              gap: 6
            }}>
              <Tag color="orange" style={{ margin: 0, fontSize: '11px', padding: '0 6px' }}>🧪 测试用户</Tag>
            </div>

            {/* 数据库凭据 */}
            <div style={{ marginBottom: 12 }}>
              <div style={{ color: '#d4d4d4', fontSize: '13px', fontWeight: 600, marginBottom: 6, display: 'flex', alignItems: 'center', gap: 4 }}>
                <DatabaseOutlined /> 数据库
              </div>
              {[
                { role: '普通用户', username: 'user_1', password: 'user_1', color: 'default' },
                { role: 'EDITOR', username: 'editor_1', password: 'editor_1', color: 'cyan' },
                { role: 'PRODUCT_ADMIN', username: 'adm_1', password: 'adm_1', color: 'green' }
              ].map((user, idx) => (
                <Button
                  key={`db-${idx}`}
                  type="text"
                  block
                  style={{
                    textAlign: 'left',
                    padding: '6px 10px',
                    height: 'auto',
                    marginBottom: 4,
                    background: '#1a1a2e',
                    border: '1px solid #595959',
                    color: '#d4d4d4'
                  }}
                  onClick={() => {
                    setLoginType('password')
                    form.setFieldsValue({ username: user.username, password: user.password })
                  }}
                >
                  <Space style={{ width: '100%', justifyContent: 'space-between' }}>
                    <Space>
                      <Tag color={user.color} style={{ margin: 0, fontSize: '10px', padding: '0 4px' }}>{user.role}</Tag>
                      <span style={{ fontSize: '12px' }}>{user.username}</span>
                    </Space>
                    <span style={{ fontSize: '11px', color: '#bfbfbf' }}>密码：{user.password}</span>
                  </Space>
                </Button>
              ))}
            </div>

            {/* LDAP凭据 */}
            <div style={{ marginBottom: 12 }}>
              <div style={{ color: '#d4d4d4', fontSize: '13px', fontWeight: 600, marginBottom: 6, display: 'flex', alignItems: 'center', gap: 4 }}>
                <SafetyCertificateOutlined /> LDAP
              </div>
              {[
                { role: '普通用户', username: 'ldap_user_1', password: 'ldap_user_1', color: 'default' },
                { role: 'EDITOR', username: 'ldap_editor_1', password: 'ldap_editor_1', color: 'orange' },
                { role: 'PRODUCT_ADMIN', username: 'ldap_adm_1', password: 'ldap_adm_1', color: 'gold' }
              ].map((user, idx) => (
                <Button
                  key={`ldap-${idx}`}
                  type="text"
                  block
                  style={{
                    textAlign: 'left',
                    padding: '6px 10px',
                    height: 'auto',
                    marginBottom: 4,
                    background: '#1a1a2e',
                    border: '1px solid #fa8c16',
                    color: '#d4d4d4'
                  }}
                  onClick={() => {
                    setLoginType('ldap')
                    form.setFieldsValue({ username: user.username, password: user.password })
                  }}
                >
                  <Space style={{ width: '100%', justifyContent: 'space-between' }}>
                    <Space>
                      <Tag color={user.color} style={{ margin: 0, fontSize: '10px', padding: '0 4px' }}>{user.role}</Tag>
                      <span style={{ fontSize: '12px' }}>{user.username}</span>
                    </Space>
                    <span style={{ fontSize: '11px', color: '#fa8c16' }}>密码：{user.password}</span>
                  </Space>
                </Button>
              ))}
            </div>

            {/* GitHub 登录说明 */}
            <div style={{
              padding: '8px 10px',
              background: '#1a1a2e',
              borderRadius: 3,
              border: '1px solid #24292e'
            }}>
              <div style={{ color: '#fff', fontSize: '12px', fontWeight: 500, marginBottom: 4, display: 'flex', alignItems: 'center', gap: 4 }}>
                <GithubOutlined /> GitHub 登录
              </div>
              <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '11px' }}>
                登录后自动赋予 <Tag color="blue" style={{ margin: 0, fontSize: '10px', padding: '0 4px' }}>EDITOR</Tag>
              </div>
            </div>
          </Flex>

          {/* 右侧表单区域 */}
          <Flex flex={1} vertical={false} justify="flex-end" align="flex-end" className="login-form-section">
            <div className="login-form-container">
              {/* 登录类型切换 */}
              <Flex style={{ marginBottom: 20, borderBottom: '2px solid rgba(255,255,255,0.2)' }}>
                <Button
                  type="text"
                  onClick={() => setLoginType('password')}
                  style={{
                    flex: 1,
                    padding: '8px 0',
                    color: loginType === 'password' ? '#1677ff' : '#fff',
                    borderBottom: loginType === 'password' ? '2px solid #1677ff' : 'none',
                    marginBottom: -2
                  }}
                >
                  <TeamOutlined style={{ marginRight: 6 }} />账号密码
                </Button>
                <Button
                  type="text"
                  onClick={() => setLoginType('ldap')}
                  style={{
                    flex: 1,
                    padding: '8px 0',
                    color: loginType === 'ldap' ? '#1677ff' : '#fff',
                    borderBottom: loginType === 'ldap' ? '2px solid #1677ff' : 'none',
                    marginBottom: -2
                  }}
                >
                  <SafetyCertificateOutlined style={{ marginRight: 6 }} />LDAP
                </Button>
              </Flex>

              <Form
                form={form}
                layout="vertical"
                onFinish={handleLogin}
                autoComplete="off"
                className="login-form"
              >
                <Flex vertical justify="space-between" style={{ height: '100%' }}>
                  {/* 用户名密码输入区域 */}
                  <Flex vertical gap="16px">
                    <Form.Item
                      name="username"
                      rules={[{ required: true, message: '' }]}
                      help=""
                      style={{ marginBottom: 0 }}
                    >
                      <Input
                        placeholder={loginType === 'ldap' ? 'LDAP 用户名' : '用户名'}
                        size="large"
                        onBlur={({ target }) => {
                          if (!target.value) {
                            message.warning('请输入用户名');
                          }
                        }}
                        style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff' }}
                      />
                    </Form.Item>

                    <Form.Item
                      name="password"
                      rules={[{ required: true, message: '' }]}
                      help=""
                      style={{ marginBottom: 0 }}
                    >
                      <Input.Password
                        placeholder={loginType === 'ldap' ? 'LDAP 密码' : '密码'}
                        size="large"
                        onBlur={({ target }) => {
                          if (!target.value) {
                            message.warning('请输入密码');
                          }
                        }}
                        style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff' }}
                      />
                    </Form.Item>

                    {/* 登录按钮 */}
                    <Button
                      type="primary"
                      size="large"
                      block
                      loading={loading}
                      className="next-button"
                      style={{ background: '#1677ff', borderColor: '#1677ff' }}
                      onClick={() => {
                        const agreement = form.getFieldValue('agreement')
                        if (!agreement) {
                          message.warning('请先阅读并同意服务协议和隐私政策')
                          return
                        }
                        const username = form.getFieldValue('username')
                        const password = form.getFieldValue('password')
                        if (!username) {
                          message.warning('请输入用户名')
                          return
                        }
                        if (!password) {
                          message.warning('请输入密码')
                          return
                        }
                        form.submit()
                      }}
                    >
                      {loginType === 'ldap' ? 'LDAP 登录' : '登录'}
                    </Button>

                    {/* GitHub 登录按钮 */}
                    <Button
                      onClick={() => {
                        const agreement = form.getFieldValue('agreement')
                        if (!agreement) {
                          message.warning('请先阅读并同意服务协议和隐私政策')
                          return
                        }
                        handleGitHubLogin()
                      }}
                      block
                      size="large"
                      style={{
                        background: '#24292e',
                        color: '#fff',
                        borderColor: '#24292e',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 8
                      }}
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                      GitHub 登录
                    </Button>
                  </Flex>

                  {/* 服务协议和隐私政策 - 放在底部 */}
                  <Form.Item
                    name="agreement"
                    valuePropName="checked"
                    rules={[
                      {
                        validator: (_, value) =>
                          value ? Promise.resolve() : Promise.reject(new Error('')),
                      },
                    ]}
                    style={{ marginBottom: 0 }}
                  >
                    <Checkbox className="terms-checkbox">
                      <div style={{ display: 'inline', whiteSpace: 'nowrap' }}>
                        <Typography.Text style={{ color: '#fff', fontSize: '12px' }}>
                          我已阅读并同意
                        </Typography.Text>
                        <Typography.Text style={{ color: '#fff', fontSize: '12px' }}>
                          {' '}
                        </Typography.Text>
                        <Typography.Text style={{ color: '#fff', fontSize: '12px', fontWeight: 500 }}>
                          Lubase
                        </Typography.Text>
                        <Typography.Text style={{ color: '#fff', fontSize: '12px' }}>
                          {' '}的{' '}
                        </Typography.Text>
                        <Typography.Link href="#" className="agreement-link" style={{ fontSize: '12px', color: '#1890ff' }}>
                          服务协议
                        </Typography.Link>
                        <Typography.Text style={{ color: '#fff', fontSize: '12px' }}>
                          {' '}和{' '}
                        </Typography.Text>
                        <Typography.Link href="#" className="agreement-link" style={{ fontSize: '12px', color: '#1890ff' }}>
                          隐私政策
                        </Typography.Link>
                      </div>
                    </Checkbox>
                  </Form.Item>
                </Flex>
              </Form>
            </div>

          </Flex>
        </Flex>
      </Modal>
    </div>
    </>
  );
};

export default SystemSidebar;
