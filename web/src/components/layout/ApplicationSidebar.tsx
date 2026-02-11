import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageOutlined, BookOutlined, FileTextOutlined, CompassOutlined, AppstoreAddOutlined, GlobalOutlined, ContainerOutlined, PlusOutlined, DesktopOutlined, ShopOutlined, MobileOutlined, ExperimentOutlined, RobotOutlined, ClusterOutlined, CalculatorOutlined, MedicineBoxOutlined, MoneyCollectOutlined, UserOutlined, FileProtectOutlined, DashboardOutlined, MonitorOutlined, SettingOutlined, ApiOutlined, FolderAddOutlined, FolderOutlined } from '@ant-design/icons';
import { Select, ConfigProvider, Dropdown } from 'antd';
import { createStyles } from 'antd-style';
import { getAllMenuItems, MenuGroup } from '@/router/menus';

  const useStyle = createStyles(({ token, css }) => {
  return {
    'sidebar-container': css`
      background: ${token.colorBgElevated};
      width: 280px;
      height: 100%;
      display: flex;
      flex-direction: column;
      padding: 0 12px;
      box-sizing: border-box;
      transition: width 0.3s ease, padding 0.3s ease, left 0.3s ease;
      overflow: hidden;
      position: fixed;
      top: 0;
      bottom: 0;
      z-index: 1000;
      box-shadow: 2px 0 12px ${token.boxShadowSecondary};
      backdrop-filter: blur(10px);
      border-right: 1px solid ${token.colorBorderSecondary};
    `,
    'sidebar-logo': css`
      display: flex;
      align-items: center;
      justify-content: flex-start;
      padding: 10px;
      box-sizing: border-box;
      cursor: pointer;
      transition: all 0.3s ease;
      user-select: none;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;

      span {
        font-weight: bold;
        color: ${token.colorText};
        font-size: 16px;
      }
    `,
    'sidebar-footer': css`
      border-top: 1px solid ${token.colorBorderSecondary};
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 8px;
    `,
    'sidebar-collapse-icon': css`
      width: 28px;
      height: 28px;
      color: ${token.colorText};
    `,
    'sidebar-section-title': css`
      font-size: 14px;
      font-weight: bold;
      color: ${token.colorText};
      margin-bottom: 8px;
      padding: 0 4px;
    `,
    'sidebar-section-header': css`
      height: 39px;
      border-bottom: 1px solid ${token.colorBorderSecondary};
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 12px;
      font-size: 14px;
      font-weight: bold;
      color: ${token.colorText};
      background-color: ${token.colorBgContainer};
    `,
    'sidebar-card': css`
      background: ${token.colorBgContainer};
      border-radius: 12px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.3s ease;
      width: 80px;
      height: 80px;
      backdrop-filter: blur(8px);
      border: 1px solid ${token.colorBorderSecondary};
      box-shadow: ${token.boxShadowTertiary};

      &:hover {
        transform: scale(1.05);
        box-shadow: ${token.boxShadow};
      }
    `,
    'sidebar-card-text': css`
      padding: 4px 8px 8px 8px;
      font-size: 12px;
      color: ${token.colorText};
      font-weight: bold;
      text-align: center;
    `,
    'sidebar-divider': css`
      margin: 8px 10px;
      height: 1px;
      background-color: ${token.colorBorderSecondary};
    `,
    'sidebar-footer-button': css`
      width: 28px;
      height: 28px;
      color: ${token.colorText};
      cursor: pointer;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;

      &:hover {
        background-color: ${token.colorBgTextHover};
      }
    `,
  };
});

interface ApplicationSidebarProps {
  isAGIMode?: boolean;
  collapsed?: boolean; // 添加外部控制的折叠状态
  onCollapsedChange?: (collapsed: boolean) => void; // 折叠状态变化回调
  systemSidebarWidth?: number; // SystemSidebar的宽度，用于定位
}

const ApplicationSidebar: React.FC<ApplicationSidebarProps> = ({
  isAGIMode = true, // 默认AGI模式
  collapsed = true, // 使用外部传入的状态，默认折叠
  onCollapsedChange,
  systemSidebarWidth = 250, // 默认SystemSidebar宽度
}) => {
  const { styles, theme } = useStyle();
  const navigate = useNavigate();
  const [selectedSpace, setSelectedSpace] = useState('space1');
  const [isFlipped, setIsFlipped] = useState(false);
  const [folders, setFolders] = useState<Array<{id: string, name: string, cards: Array<any>}>>([]);
  const [contextMenu, setContextMenu] = useState<{visible: boolean, x: number, y: number}>({visible: false, x: 0, y: 0});
  const [draggedCard, setDraggedCard] = useState<any>(null);
  const [movedCards, setMovedCards] = useState<Set<string>>(new Set());
  const [currentFolderId, setCurrentFolderId] = useState<string | null>(null);

  // 右键菜单处理
  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault();
    setContextMenu({
      visible: true,
      x: event.clientX,
      y: event.clientY
    });
  };

  const handleCreateFolder = () => {
    const folderName = `文件夹${folders.length + 1}`;
    const newFolder = {
      id: `folder-${Date.now()}`,
      name: folderName,
      cards: []
    };
    setFolders(prev => [...prev, newFolder]);
    setContextMenu({visible: false, x: 0, y: 0});
  };

  const hideContextMenu = () => {
    setContextMenu({visible: false, x: 0, y: 0});
  };

  // 拖拽处理
  const handleDragStart = (card: any) => {
    setDraggedCard(card);
  };

  const handleDragEnd = () => {
    setDraggedCard(null);
  };

  const handleDrop = (folderId: string) => {
    if (draggedCard) {
      setFolders(prev => prev.map(folder =>
        folder.id === folderId
          ? { ...folder, cards: [...folder.cards, draggedCard] }
          : folder
      ));
      setMovedCards(prev => new Set([...prev, draggedCard.id]));
      setDraggedCard(null);
    }
  };

  // 文件夹导航
  const enterFolder = (folderId: string) => {
    setCurrentFolderId(folderId);
  };

  const exitFolder = () => {
    setCurrentFolderId(null);
  };

  // 新建菜单项
  const createMenuItems = [
    {
      key: 'space',
      label: (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <AppstoreAddOutlined />
          <span>新建空间</span>
        </div>
      ),
      onClick: () => {
        // TODO: 实现新建空间的逻辑
        console.log('新建空间');
      }
    },
    {
      key: 'folder',
      label: (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <FolderAddOutlined />
          <span>新建文件夹</span>
        </div>
      ),
      onClick: () => {
        // TODO: 实现新建文件夹的逻辑
        console.log('新建文件夹');
      }
    },
    {
      key: 'conversation',
      label: (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <MessageOutlined />
          <span>新建对话</span>
        </div>
      ),
      onClick: () => {
        // TODO: 实现新建对话的逻辑
        console.log('新建对话');
      }
    }
  ];

  // 工作台菜单项
  const workbenchMenuItems = [
    {
      key: 'agi-intro',
      label: '👋 AGI自我介绍',
      onClick: () => {
        console.log('AGI自我介绍');
        navigate('/agi/intro');
      }
    },
    {
      key: 'sales-analysis',
      label: '📊 销售数据分析报告',
      onClick: () => {
        console.log('销售数据分析报告');
        navigate('/agi/sales-analysis');
      }
    },
    {
      key: 'product-review',
      label: '🔍 商品审核任务',
      onClick: () => {
        console.log('商品审核任务');
        navigate('/agi/product-review');
      }
    },
    {
      key: 'order-refund',
      label: '💰 订单返现检查',
      onClick: () => {
        console.log('订单返现检查');
        navigate('/agi/order-refund');
      }
    },
    {
      key: 'activity-management',
      label: '🎯 活动管理任务',
      onClick: () => {
        console.log('活动管理任务');
        navigate('/agi/activity-management');
      }
    },
    {
      key: 'product-listing',
      label: '📦 商品上架任务',
      onClick: () => {
        console.log('商品上架任务');
        navigate('/agi/product-listing');
      }
    },
    {
      key: 'inventory-analysis',
      label: '📈 库存分析报告',
      onClick: () => {
        console.log('库存分析报告');
        navigate('/agi/inventory-analysis');
      }
    }
  ];

  // 图标映射表
  const iconMap: Record<string, React.ComponentType<any>> = {
    MessageOutlined,
    BookOutlined,
    FileTextOutlined,
    CompassOutlined,
    AppstoreAddOutlined,
    GlobalOutlined,
    ContainerOutlined,
    PlusOutlined,
    DesktopOutlined,
    ShopOutlined,
    MobileOutlined,
    ExperimentOutlined,
    RobotOutlined,
    ClusterOutlined,
    CalculatorOutlined,
    MedicineBoxOutlined,
    MoneyCollectOutlined,
    UserOutlined,
    FileProtectOutlined,
    DashboardOutlined,
    MonitorOutlined,
    SettingOutlined,
    ApiOutlined,
  };


  // 空间1功能卡片数据（主要功能菜单）- 全局排序
  const space1Cards = getAllMenuItems()
    .filter(item => {
      // 排除专项应用（辽博作诗等），这些在specialCards中单独处理
      return item.group !== MenuGroup.SPECIAL;
    })
    .filter(item => {
      if (isAGIMode) {
        return !item.traditionalOnly;
      } else {
        return !item.agiOnly;
      }
    })
    .sort((a, b) => a.order - b.order)
    .map(item => {
      const IconComponent = iconMap[item.icon];
      return {
        id: item.path,
        path: item.path,
        agiOnly: item.agiOnly,
        traditionalOnly: item.traditionalOnly,
        icon: IconComponent ? <IconComponent
          style={{
            fontSize: '24px',
            color: item.renderConfig.iconStyle?.color || item.renderConfig.textColor
          }}
        /> : null,
        text: item.label,
        gradient: item.renderConfig.gradient,
        shadowColor: item.renderConfig.shadowColor,
        textColor: item.renderConfig.textColor,
        onClick: () => navigate(item.path)
      };
    });

  // 专项应用功能卡片数据
  const specialCards = getAllMenuItems()
    .filter(item => item.group === MenuGroup.SPECIAL)
    .filter(item => {
      if (isAGIMode) {
        return !item.traditionalOnly;
      } else {
        return !item.agiOnly;
      }
    })
    .sort((a, b) => a.order - b.order)
    .map(item => {
      const IconComponent = iconMap[item.icon];
      return {
        id: item.path,
        path: item.path,
        agiOnly: item.agiOnly,
        traditionalOnly: item.traditionalOnly,
        icon: IconComponent ? <IconComponent
          style={{
            fontSize: '24px',
            color: item.renderConfig.iconStyle?.color || item.renderConfig.textColor
          }}
        /> : null,
        text: item.label,
        gradient: item.renderConfig.gradient,
        shadowColor: item.renderConfig.shadowColor,
        textColor: item.renderConfig.textColor,
        onClick: () => navigate(item.path)
      };
    });

  // 传统模式功能卡片数据（过滤出传统模式专用的）
  const traditionalCards = getAllMenuItems()
    .filter(item => item.group === MenuGroup.TRADITIONAL)
    .filter(item => !item.agiOnly || item.path.includes('/traditional/'))
    .filter(item => {
      // 在任何模式下都显示传统项目
      return item.traditionalOnly === true;
    })
    .sort((a, b) => a.order - b.order)
    .map(item => {
      const IconComponent = iconMap[item.icon];
      return {
        id: item.path,
        path: item.path,
        agiOnly: item.agiOnly,
        traditionalOnly: item.traditionalOnly,
        icon: IconComponent ? <IconComponent
          style={{
            fontSize: '24px',
            color: item.renderConfig.iconStyle?.color || item.renderConfig.textColor
          }}
        /> : null,
        text: item.label,
        gradient: item.renderConfig.gradient,
        shadowColor: item.renderConfig.shadowColor,
        textColor: item.renderConfig.textColor,
        onClick: () => navigate(item.path)
      };
    });



  return (
    <>
      {/* 右键菜单 */}
      {contextMenu.visible && (
        <div
          style={{
            position: 'fixed',
            top: contextMenu.y,
            left: contextMenu.x,
            zIndex: 10500,
            backgroundColor: theme.colorBgElevated,
            border: `1px solid ${theme.colorBorderSecondary}`,
            borderRadius: '6px',
            boxShadow: theme.boxShadow,
            padding: '4px 0',
            minWidth: '120px'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            style={{
              padding: '8px 12px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '14px',
              color: theme.colorText
            }}
            onClick={handleCreateFolder}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = theme.colorBgTextHover}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <FolderAddOutlined />
            新建文件夹
          </div>
        </div>
      )}

      {/* 点击其他地方隐藏右键菜单 */}
      {contextMenu.visible && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 10499
          }}
          onClick={hideContextMenu}
        />
      )}

      {/* 浮动折叠图标 */}
      {collapsed && (
        <div
          style={{
            position: 'fixed',
            top: '0px',
            left: `${systemSidebarWidth}px`,
            zIndex: 10100,
            width: '40px',
            height: '40px',

            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            userSelect: 'none',
            WebkitUserSelect: 'none',
            MozUserSelect: 'none',
            msUserSelect: 'none',
          }}
          onClick={() => {
            onCollapsedChange?.(!collapsed);
            setIsFlipped(!isFlipped);
          }}
        >
          <svg
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              width: '16px',
              height: '16px',
              color: theme.colorText,
              transition: 'transform 0.3s ease'
            }}
          >
         <path d="M4.66667 1.83317C5.03486 1.83317 5.33333 2.13165 5.33333 2.49984L5.33333 13.4998C5.33333 13.868 5.03486 14.1665 4.66667 14.1665C4.29848 14.1665 4 13.868 4 13.4998L4 2.49984C4 2.13165 4.29848 1.83317 4.66667 1.83317Z" fill="currentColor"></path><path d="M8.56836 5.06722C8.84922 4.82941 9.26982 4.86398 9.50781 5.14469L11.6572 7.68115C11.8818 7.94636 11.8628 8.33595 11.6237 8.57894L11.4476 8.80094L11.4342 8.81755L9.50846 11.0972C9.27086 11.3781 8.85017 11.4133 8.56901 11.1759C8.28795 10.9384 8.25281 10.5177 8.49023 10.2365L10.2799 8.11833L8.49089 6.00667C8.25292 5.72583 8.28762 5.30527 8.56836 5.06722Z" fill="currentColor"></path> </svg>
         
        </div>
      )}

      <div
        className={`${styles['sidebar-container']} sidebar-container`}
        style={{
          width: collapsed ? '0px' : '280px',
          padding: collapsed ? '0px' : '0 0',
          left: `${systemSidebarWidth}px`
        }}
      >


      {/* 内容区域 */}
      {!collapsed && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {/* 顶部切换区域 */}
          <div className={styles['sidebar-section-header']}>
            <svg
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                width: '16px',
                height: '16px',
                cursor: 'pointer',
                userSelect: 'none',
                WebkitUserSelect: 'none',
                MozUserSelect: 'none',
                msUserSelect: 'none',
                transform: isFlipped ? 'scaleX(-1)' : 'scaleX(1)',
                transition: 'transform 0.3s ease'
              }}
              onClick={() => {
                onCollapsedChange?.(!collapsed);
                setIsFlipped(!isFlipped);
              }}
            >
              <path d="M4.9987 1.99992C5.36689 1.99992 5.66536 2.2984 5.66536 2.66659L5.66536 13.6666C5.36689 14.0348 5.66536 14.3333 4.9987 14.3333C4.63051 14.3333 4.33203 14.0348 4.33203 13.6666L4.33203 2.66659C4.33203 2.2984 4.63051 1.99992 4.9987 1.99992Z" fill="currentColor"></path>
              <path d="M10.8053 4.97843C11.0429 4.69744 11.4636 4.66236 11.7448 4.89966C12.0258 5.13729 12.061 5.55794 11.8236 5.83911L10.0339 7.95728L11.8229 10.0689C12.0608 10.3498 12.0262 10.7704 11.7454 11.0084C11.4646 11.2463 11.044 11.2116 10.806 10.9309L8.65658 8.39445C8.43208 8.1292 8.4509 7.7396 8.6901 7.49666L8.86621 7.27466L8.87956 7.25806L10.8053 4.97843Z" fill="currentColor"></path>
            </svg>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '16px', height: '16px', cursor: 'pointer', userSelect: 'none', WebkitUserSelect: 'none', MozUserSelect: 'none', msUserSelect: 'none' }}>
                <path fillRule="evenodd" clipRule="evenodd" d="M15.5 4.41496H6.5V3.08496H15.5V4.41496ZM14.5 8.66496H6.5V7.33496H14.5V8.66496ZM6.5 12.915H13.5V11.585H6.5V12.915Z" fill="currentColor"></path>
                <path fillRule="evenodd" clipRule="evenodd" d="M2.35691 11L2.35691 1.83984H3.68691L3.68691 11H4.96012C5.19534 11 5.33906 11.2584 5.215 11.4582L3.26956 14.5922C3.15264 14.7805 2.87884 14.7814 2.76076 14.5937L0.788755 11.4598C0.663046 11.26 0.806629 11 1.04267 11H2.35691Z" fill="currentColor"></path>
              </svg>
              <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '16px', height: '16px', cursor: 'pointer', userSelect: 'none', WebkitUserSelect: 'none', MozUserSelect: 'none', msUserSelect: 'none' }}>
                <g>
                  <path fillRule="evenodd" clipRule="evenodd" d="M2.75 7.5C2.75 4.87665 4.87665 2.75 7.5 2.75C10.1234 2.75 12.25 4.87665 12.25 7.5C12.25 10.1234 10.1234 12.25 7.5 12.25C4.87665 12.25 2.75 10.1234 2.75 7.5ZM7.5 1.25C4.04822 1.25 1.25 4.04822 1.25 7.5C1.25 10.9518 4.04822 13.75 7.5 13.75C8.95559 13.75 10.295 13.2524 11.3573 12.4181L13.7929 14.8536L14.8535 13.793L12.418 11.3574C13.2524 10.2951 13.75 8.95564 13.75 7.5C13.75 4.04822 10.9518 1.25 7.5 1.25Z" fill="currentColor"></path>
                </g>
              </svg>
            </div>
          </div>

          {/* 空间1功能区 */}
          <div
            style={{ padding: '10px 10px 0 10px' }}
            onContextMenu={!currentFolderId ? handleContextMenu : undefined}
            onClick={hideContextMenu}
          >
            <div className={styles['sidebar-section-title']}>
              {currentFolderId ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span
                    style={{
                      cursor: 'pointer',
                      color: theme.colorTextSecondary,
                      fontSize: '14px'
                    }}
                    onClick={exitFolder}
                  >
                    空间1
                  </span>
                  <span style={{ color: theme.colorTextSecondary }}>›</span>
                  <span>{folders.find(f => f.id === currentFolderId)?.name}</span>
                </div>
              ) : (
                '空间1'
              )}
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '8px',
              marginBottom: '16px'
            }}>
              {currentFolderId ? (
                // 文件夹视图 - 只显示该文件夹内的卡片
                <>
                  {folders.find(f => f.id === currentFolderId)?.cards.map((card: any) => (
                    <div
                      key={card.id}
                      className={styles['sidebar-card']}
                      style={{
                        background: card.gradient,
                      }}
                      onClick={card.onClick}
                    >
                      <div style={{ padding: '8px 4px 4px 4px' }}>
                        {card.icon}
                      </div>
                      <div className={styles['sidebar-card-text']} style={{ color: card.textColor }}>
                        {card.text}
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                // 根目录视图 - 显示文件夹和普通卡片
                <>
                  {/* 文件夹 */}
                  {folders.map((folder) => (
                    <div
                      key={folder.id}
                      className={styles['sidebar-card']}
                      style={{
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        position: 'relative',
                        cursor: 'pointer'
                      }}
                      onClick={() => enterFolder(folder.id)}
                      onDrop={(e) => {
                        e.preventDefault();
                        handleDrop(folder.id);
                      }}
                      onDragOver={(e) => e.preventDefault()}
                    >
                      <div style={{ padding: '8px 4px 4px 4px' }}>
                        <FolderOutlined style={{ fontSize: '24px', color: '#fff' }} />
                      </div>
                      <div className={styles['sidebar-card-text']} style={{ color: '#fff' }}>
                        {folder.name}
                      </div>
                      {folder.cards.length > 0 && (
                        <div style={{
                          position: 'absolute',
                          top: '4px',
                          right: '4px',
                          backgroundColor: 'rgba(255, 255, 255, 0.2)',
                          borderRadius: '10px',
                          padding: '2px 6px',
                          fontSize: '10px',
                          color: '#fff'
                        }}>
                          {folder.cards.length}
                        </div>
                      )}
                    </div>
                  ))}

                  {/* 普通卡片 */}
                  {space1Cards.filter(card => !movedCards.has(card.id)).map((card) => (
                    <div
                      key={card.id}
                      className={styles['sidebar-card']}
                      style={{
                        background: card.gradient,
                      }}
                      onClick={card.onClick}
                      draggable
                      onDragStart={() => handleDragStart(card)}
                      onDragEnd={handleDragEnd}
                    >
                    <div style={{ padding: '8px 4px 4px 4px' }}>
                      {card.icon}
                    </div>
                      <div className={styles['sidebar-card-text']} style={{ color: card.textColor }}>
                        {card.text}
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>

          {/* 分割线 */}
          <div className={styles['sidebar-divider']}></div>

          {/* 传统模式功能区 */}
          <div style={{ padding: '0 10px 10px 10px' }}>
            <div className={styles['sidebar-section-title']}>
              传统模式
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '8px',
            }}>
              {traditionalCards.map((card) => (
                <div
                  key={card.id}
                  className={styles['sidebar-card']}
                  style={{
                    background: card.gradient,
                  }}
                  onClick={card.onClick}
                >
                  <div style={{ padding: '8px 4px 4px 4px' }}>
                    {card.icon}
                  </div>
                  <div className={styles['sidebar-card-text']} style={{ color: card.textColor }}>
                    {card.text}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 分割线 */}
          <div className={styles['sidebar-divider']}></div>

          {/* 专项应用功能区 */}
          <div style={{ padding: '0 10px 10px 10px' }}>
            <div className={styles['sidebar-section-title']}>
              专项应用
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '8px',
            }}>
              {specialCards.map((card) => (
                <div
                  key={card.id}
                  className={styles['sidebar-card']}
                  style={{
                    background: card.gradient,
                  }}
                  onClick={card.onClick}
                >
                  <div style={{ padding: '8px 4px 4px 4px' }}>
                    {card.icon}
                  </div>
                  <div className={styles['sidebar-card-text']} style={{ color: card.textColor }}>
                    {card.text}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 底部区域 */}
      <div className={styles['sidebar-footer']}>
        <Dropdown
          menu={{
            items: workbenchMenuItems,
            onClick: ({ key }) => {
              const item = workbenchMenuItems.find(item => item.key === key);
              item?.onClick();
            }
          }}
          trigger={['click']}
          placement="topLeft"
        >
          <div className={styles['sidebar-footer-button']}>
            <ContainerOutlined style={{ fontSize: '16px' }} />
          </div>
        </Dropdown>

        {/* 空间选择器 */}
        <div style={{
          flex: '1 1 0%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-end'
        }}>
          <ConfigProvider
            theme={{
              components: {
                Select: {
                  controlHeight: 28,
                  fontSize: 12,
                  borderRadius: 4,
                  colorBorder: 'transparent',
                  colorBgContainer: 'transparent',
                  colorText: theme.colorText,
                  colorTextPlaceholder: theme.colorTextQuaternary,
                  controlOutline: 'transparent',
                  colorBgElevated: theme.colorBgElevated,
                  boxShadow: theme.boxShadowSecondary,
                }
              }
            }}
          >
            <Select
              value={selectedSpace}
              onChange={setSelectedSpace}
              style={{
                width: 'auto',
                minWidth: '60px',
                fontSize: '12px',
                border: 'none',
                backgroundColor: 'transparent'
              }}
              styles={{
                popup: {
                  root: {
                    minWidth: '120px',
                    width: 'auto'
                  }
                }
              }}
              size="small"
              placeholder="选择空间"
              variant="borderless"
              suffixIcon={null}
            >
              <Select.Option value="space1">空间1</Select.Option>
              <Select.Option value="space2">空间2</Select.Option>
              <Select.Option value="space3">空间3</Select.Option>
            </Select>
          </ConfigProvider>
        </div>

        <Dropdown
          menu={{
            items: createMenuItems,
            onClick: ({ key }) => {
              const item = createMenuItems.find(item => item.key === key);
              item?.onClick();
            }
          }}
          trigger={['click']}
          placement="topRight"
        >
          <div className={styles['sidebar-footer-button']}>
            <PlusOutlined style={{ fontSize: '16px' }} />
          </div>
        </Dropdown>
      </div>

      </div>
    </>
  );
};

export default ApplicationSidebar;
