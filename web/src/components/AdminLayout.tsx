import React from 'react';
import { Menu, Layout, Avatar, Button, Dropdown, Space, Typography } from 'antd';
import {
    SettingOutlined,
    UserOutlined,
    LogoutOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
} from '@ant-design/icons';
import { createStyles } from 'antd-style';
import type { MenuProps } from 'antd';
import { useCollapsed } from '@/store';

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

interface AdminLayoutProps {
    title: string;
    subtitle?: string;
    menuItems: MenuProps['items'];
    children: React.ReactNode;
    logoSrc?: string;
    defaultSelectedKey?: string;
    defaultOpenKey?: string;
}

const useStyles = createStyles(({ token, css }) => ({
    layout: css`
        min-height: 100vh;
        background: ${token.colorBgContainer};
    `,
    header: css`
        background: ${token.colorBgContainer};
        padding: 0 24px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid ${token.colorBorderSecondary};
        box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
    `,
    headerLeft: css`
        display: flex;
        align-items: center;
        gap: 16px;
    `,
    logo: css`
        display: flex;
        align-items: center;
        gap: 12px;
        font-size: 18px;
        font-weight: 600;
        color: ${token.colorText};
    `,
    headerTitle: css`
        margin: 0;
        color: ${token.colorText};
    `,
    sider: css`
        background: ${token.colorBgContainer};
        border-right: 1px solid ${token.colorBorderSecondary};
        .ant-layout-sider-children {
            display: flex;
            flex-direction: column;
        }
    `,
    menu: css`
        border-right: none;
        flex: 1;
        .ant-menu-item {
            margin: 4px 8px;
            border-radius: ${token.borderRadius}px;
            &:hover {
                background: ${token.colorBgTextHover};
            }
        }
        .ant-menu-submenu-title {
            margin: 4px 8px;
            border-radius: ${token.borderRadius}px;
            &:hover {
                background: ${token.colorBgTextHover};
            }
        }
    `,
    content: css`
        padding: 24px;
        background: ${token.colorBgContainer};
        overflow: auto;
    `,
    userMenu: css`
        cursor: pointer;
        padding: 4px 8px;
        border-radius: ${token.borderRadius}px;
        &:hover {
            background: ${token.colorBgTextHover};
        }
    `,
}));

const AdminLayout: React.FC<AdminLayoutProps> = ({
    title,
    subtitle,
    menuItems,
    children,
    logoSrc = "/src/assets/images/logo.png",
    defaultSelectedKey = 'dashboard',
    defaultOpenKey,
}) => {
    const { styles } = useStyles();
    const collapsed = useCollapsed();

    const userMenuItems: MenuProps['items'] = [
        {
            key: 'profile',
            icon: <UserOutlined />,
            label: '个人资料',
        },
        {
            key: 'settings',
            icon: <SettingOutlined />,
            label: '系统设置',
        },
        {
            type: 'divider',
        },
        {
            key: 'logout',
            icon: <LogoutOutlined />,
            label: '退出登录',
            danger: true,
        },
    ];

    const handleUserMenuClick: MenuProps['onClick'] = (e) => {
        switch (e.key) {
            case 'profile':
                // Handle profile click
                break;
            case 'settings':
                // Handle settings click
                break;
            case 'logout':
                // Handle logout
                break;
        }
    };

    return (
        <Layout className={`admin-layout ${styles.layout}`}>
            <Sider
                className={`admin-layout-sider ${styles.sider}`}
                collapsible
                collapsed={collapsed}
                trigger={null}
                width={280}
                style={{
                    position: 'relative',
                    height: '100vh',
                }}
            >
                <div className="admin-layout-sider-header" style={{
                    padding: '16px',
                    borderBottom: '1px solid #f0f0f0',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px'
                }}>
                    <img
                        src={logoSrc}
                        alt="logo"
                        className="admin-layout-logo"
                        style={{ width: '32px', height: '32px', borderRadius: '6px' }}
                    />
                    {!collapsed && (
                        <div className="admin-layout-title-section">
                            <div className="admin-layout-title" style={{ fontSize: '16px', fontWeight: '600', color: '#1890ff' }}>
                                {title}
                            </div>
                            {subtitle && (
                                <div className="admin-layout-subtitle" style={{ fontSize: '12px', color: '#666' }}>
                                    {subtitle}
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <Menu
                    className={`admin-layout-menu ${styles.menu}`}
                    mode="inline"
                    defaultSelectedKeys={[defaultSelectedKey]}
                    defaultOpenKeys={defaultOpenKey ? [defaultOpenKey] : undefined}
                    items={menuItems}
                    style={{ padding: '8px 0' }}
                />
            </Sider>

            <Layout className="admin-layout-main">
                <Header className={`admin-layout-header ${styles.header}`}>
                    <div className={`admin-layout-header-left ${styles.headerLeft}`}>
                        <Button
                            type="text"
                            className="admin-layout-collapse-btn"
                            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                            onClick={() => {
                                // This would normally be handled by the store
                                // For now, we'll just log it
                                console.log('Toggle sidebar');
                            }}
                            style={{ fontSize: '16px' }}
                        />
                        <div className={`admin-layout-header-logo ${styles.logo}`}>
                            <Title level={4} className={`admin-layout-header-title ${styles.headerTitle}`}>
                                {title}管理系统
                            </Title>
                        </div>
                    </div>

                    <Dropdown
                        menu={{ items: userMenuItems, onClick: handleUserMenuClick }}
                        placement="bottomRight"
                        trigger={['click']}
                    >
                        <div className={`admin-layout-user-menu ${styles.userMenu}`}>
                            <Space>
                                <Avatar icon={<UserOutlined />} className="admin-layout-user-avatar" />
                                {!collapsed && <span className="admin-layout-user-name">管理员</span>}
                            </Space>
                        </div>
                    </Dropdown>
                </Header>

                <Content className={`admin-layout-content ${styles.content}`}>
                    {children}
                </Content>
            </Layout>
        </Layout>
    );
};

export default AdminLayout;
