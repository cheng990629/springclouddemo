import React from 'react';
import { Typography, Tooltip, Popover } from 'antd';
import { useLocation } from 'react-router-dom';
import { DatabaseOutlined, MoreOutlined, MessageOutlined, MobileOutlined } from '@ant-design/icons';
import { routeMetadata } from '@/router/routes';

interface BusinessLayoutHeaderProps {
  title?: string;
  applicationSidebarCollapsed?: boolean;
  transparent?: boolean;
  showText?: boolean;
}

const BusinessLayoutHeader: React.FC<BusinessLayoutHeaderProps> = ({
  title,
  applicationSidebarCollapsed = false,
  transparent = false,
  showText = true
}) => {
  const location = useLocation();

  // 根据页面路径决定显示效果
  const isLargeScreenDashboard = location.pathname === '/large-screen-dashboard';
  const shouldBeTransparent = transparent || isLargeScreenDashboard;
  const shouldShowText = showText && !isLargeScreenDashboard;

  // 根据当前路径获取菜单标题
  const getCurrentPageTitle = () => {
    if (title) return title; // 如果传入了title prop，优先使用

    const currentRoute = routeMetadata[location.pathname as keyof typeof routeMetadata];
    return currentRoute?.label || '应用';
  };

  return (
    <div
      className={`business-layout-header ${shouldBeTransparent ? 'business-layout-header-transparent' : ''}`}
      style={{ height: '39px', zIndex: 9999 }}
    >
      <div className="blh-content">
        {shouldShowText && (
          <div
            className="blh-left"
            style={{
              marginLeft: applicationSidebarCollapsed ? '13px' : '16px',
              marginTop: applicationSidebarCollapsed ? '-8px' : '-8px'
            }}
          >
            <Typography.Title level={4} style={{ fontSize: '14px', fontWeight: 600 }}>
              {getCurrentPageTitle()}
            </Typography.Title>
          </div>
        )}

        {/* Notes page action buttons */}
        {location.pathname === '/notes' && (
          <div className="blh-actions">
            <Tooltip title="添加到知识库" placement="bottom">
              <button
                type="button"
                onClick={() => console.log('添加到知识库')}
                className="blh-action-btn"
              >
                <DatabaseOutlined />
              </button>
            </Tooltip>
            <Tooltip title="更多菜单" placement="bottom">
              <button
                type="button"
                onClick={() => console.log('更多菜单')}
                className="blh-action-btn"
              >
                <MoreOutlined />
              </button>
            </Tooltip>
            <Tooltip title="问问叨叨" placement="bottom">
              <button
                type="button"
                onClick={() => console.log('问问叨叨')}
                className="blh-action-btn"
              >
                <MessageOutlined />
              </button>
            </Tooltip>
          </div>
        )}

        {/* Knowledge page action buttons */}
        {location.pathname === '/knowledge' && (
          <div className="blh-actions">
            <Tooltip title="添加到知识库" placement="bottom">
              <button
                type="button"
                onClick={() => console.log('添加到知识库')}
                className="blh-action-btn"
              >
                <DatabaseOutlined />
              </button>
            </Tooltip>
            <Tooltip title="更多菜单" placement="bottom">
              <button
                type="button"
                onClick={() => console.log('更多菜单')}
                className="blh-action-btn"
              >
                <MoreOutlined />
              </button>
            </Tooltip>
            <Tooltip title="问问叨叨" placement="bottom">
              <button
                type="button"
                onClick={() => console.log('问问叨叨')}
                className="blh-action-btn"
              >
                <MessageOutlined />
              </button>
            </Tooltip>
          </div>
        )}

        {/* Large screen dashboard action buttons */}
        {location.pathname === '/large-screen-dashboard' && (
          <div className="blh-actions" style={{ marginLeft: 'auto', marginRight: '16px' }}>
            <Tooltip title="添加到知识库" placement="bottom">
              <button
                type="button"
                onClick={() => console.log('添加到知识库')}
                className="blh-action-btn"
              >
                <DatabaseOutlined />
              </button>
            </Tooltip>
            <Tooltip title="更多菜单" placement="bottom">
              <button
                type="button"
                onClick={() => console.log('更多菜单')}
                className="blh-action-btn"
              >
                <MoreOutlined />
              </button>
            </Tooltip>
            <Tooltip title="问问叨叨" placement="bottom">
              <button
                type="button"
                onClick={() => console.log('问问叨叨')}
                className="blh-action-btn"
              >
                <MessageOutlined />
              </button>
            </Tooltip>
            <Popover
              content={
                <div style={{ textAlign: 'center' }}>
                  <img
                    src="/qrcode.png"
                    alt="下载二维码"
                    style={{
                      width: 120,
                      height: 120,
                      border: '1px solid #ddd',
                      margin: '0 auto 8px',
                      display: 'block'
                    }}
                  />
                  <p style={{ margin: 0, fontSize: '12px', color: '#666' }}>
                    扫码联系作者
                  </p>
                </div>
              }
              title="联系作者"
              trigger="hover"
              placement="bottom"
            >
              <button
                type="button"
                onClick={() => console.log('联系作者')}
                className="blh-action-btn"
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '4px 8px',
                  minWidth: '120px',
                  backgroundColor: '#ffffff33'
                }}
              >
                <MobileOutlined />
                <span style={{ fontSize: '10px', lineHeight: '1' }}>联系作者</span>
              </button>
            </Popover>
          </div>
        )}
      </div>
    </div>
  );
};

export default BusinessLayoutHeader;


