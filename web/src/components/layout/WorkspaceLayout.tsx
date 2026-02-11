import React, { useState, useCallback, useEffect } from 'react'
import { Layout } from 'antd'
import { useNavigate } from 'react-router-dom'
import ConversationHistoryModal from '@/pages/profile/ConversationHistoryModal'
import SystemSidebar from './SystemSidebar'
import ApplicationSidebar from './ApplicationSidebar'
import { useSetSidebarWidth, useApplicationSidebarCollapsed, useSetApplicationSidebarCollapsed } from '@/store'
import '@/styles/overlay2.css'
import BusinessLayoutHeader from './BusinessLayoutHeader'

interface WorkspaceLayoutProps {
  children: React.ReactNode
  isMobile: boolean
}

const WorkspaceLayout: React.FC<WorkspaceLayoutProps> = ({ children, isMobile }) => {
  const [conversationModalVisible, setConversationModalVisible] = useState(false)
  const [systemSidebarWidth, setSystemSidebarWidth] = useState(isMobile ? 60 : 200) // 根据设备类型设置默认宽度
  const applicationSidebarCollapsed = useApplicationSidebarCollapsed()
  const setSidebarWidth = useSetSidebarWidth()
  const setApplicationSidebarCollapsed = useSetApplicationSidebarCollapsed()
  const navigate = useNavigate()

  // 初始化sidebarWidth
  useEffect(() => {
    const applicationWidth = applicationSidebarCollapsed ? 0 : 280
    setSidebarWidth(systemSidebarWidth + applicationWidth)
  }, [systemSidebarWidth, applicationSidebarCollapsed, setSidebarWidth])


  const handleWindowView = () => {
    // 导航到工作台页面
    navigate('/workbench')
  }

  const handleAdd = () => {
    // 添加逻辑
    console.log('Add clicked')
  }


  // 计算侧边栏宽度（响应式）
  const getSidebarWidth = () => {
    const applicationWidth = applicationSidebarCollapsed ? 0 : 280 // ApplicationSidebar 可折叠
    return systemSidebarWidth + applicationWidth
  }

  // 处理SystemSidebar宽度变化
  const handleSystemSidebarWidthChange = useCallback((width: number) => {
    setSystemSidebarWidth(width)
    // 计算并更新总的sidebar宽度
    const applicationWidth = applicationSidebarCollapsed ? 0 : 280
    setSidebarWidth(width + applicationWidth)
  }, [applicationSidebarCollapsed, setSidebarWidth])

  // 处理ApplicationSidebar折叠变化
  const handleApplicationSidebarCollapsedChange = useCallback((collapsed: boolean) => {
    setApplicationSidebarCollapsed(collapsed)
    // 计算并更新总的sidebar宽度
    const applicationWidth = collapsed ? 0 : 280
    setSidebarWidth(systemSidebarWidth + applicationWidth)
  }, [systemSidebarWidth, setSidebarWidth])

  // PC端：正常布局
  if (!isMobile) {
    return (
      <div style={{ position: 'relative', height: '100vh' }}>
        {/* 系统侧边栏 */}
        <SystemSidebar
          onWindowView={handleWindowView}
          onAdd={handleAdd}
          navigate={navigate}
          onWidthChange={handleSystemSidebarWidthChange}
          onApplicationSidebarCollapsedChange={setApplicationSidebarCollapsed}
          isMobile={isMobile}
        />
        <ApplicationSidebar
          collapsed={applicationSidebarCollapsed}
          onCollapsedChange={handleApplicationSidebarCollapsedChange}
          systemSidebarWidth={systemSidebarWidth}
        />

        <div style={{
          height: '100vh',
          marginLeft: `${getSidebarWidth()}px`,
          overflow: 'hidden',
          transition: 'margin-left 0.3s ease'
        }}>
          <Layout className="agi-root" style={{ height: '100%', overflow: 'hidden' }}>
            <BusinessLayoutHeader applicationSidebarCollapsed={applicationSidebarCollapsed} />
            {children}
          </Layout>
        </div>

        {/* 对话记录弹窗 */}
        <ConversationHistoryModal
          visible={conversationModalVisible}
          onClose={() => setConversationModalVisible(false)}
          onSelectConversation={(conversation) => {
            console.log('Selected conversation:', conversation)
            // 这里可以添加选择对话后的逻辑，比如切换到对应的对话
          }}
        />
      </div>
    )
  }

  // 手机端：简化布局，只显示系统侧边栏
  return (
    <div style={{ position: 'relative', height: '100vh' }}>
      {/* 手机端只显示系统侧边栏，应用侧边栏默认隐藏 */}
      <SystemSidebar
        onWindowView={handleWindowView}
        onAdd={handleAdd}
        navigate={navigate}
        onWidthChange={handleSystemSidebarWidthChange}
        isMobile={isMobile}
      />

      <div style={{
        height: '100vh',
        marginLeft: `${systemSidebarWidth}px`, // 动态调整侧边栏宽度
        overflow: 'hidden',
        transition: 'margin-left 0.3s ease'
      }}>
        <Layout className="agi-root mobile" style={{ height: '100%', overflow: 'hidden' }}>
          {children}
        </Layout>
      </div>

      {/* 对话记录弹窗 */}
      <ConversationHistoryModal
        visible={conversationModalVisible}
        onClose={() => setConversationModalVisible(false)}
        onSelectConversation={(conversation) => {
          console.log('Selected conversation:', conversation)
          // 这里可以添加选择对话后的逻辑，比如切换到对应的对话
        }}
      />
    </div>
  )
}

export default WorkspaceLayout
