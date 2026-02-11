import React, { useState, useEffect } from 'react';
import { Modal, Card, Avatar, Typography, Space, Tag, Row, Col } from 'antd';
import { MessageOutlined, ClockCircleOutlined, PlusOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

const { Text, Paragraph } = Typography;

interface ConversationRecord {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: Date;
  messageCount: number;
  isActive: boolean;
}

interface ConversationHistoryModalProps {
  visible: boolean;
  onClose: () => void;
  onSelectConversation?: (conversation: ConversationRecord) => void;
}

const ConversationHistoryModal: React.FC<ConversationHistoryModalProps> = ({
  visible,
  onClose,
  onSelectConversation,
}) => {
  const [conversations, setConversations] = useState<ConversationRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  // 获取对话记录数据
  useEffect(() => {
    if (visible) {
      setLoading(true);
      setSelectedIndex(0); // 重置选中索引

      // 直接加载数据，无延迟
      const mockData: ConversationRecord[] = [
        {
          id: '1',
          title: '👋 AGI自我介绍',
          lastMessage: '我可以直接操作系统帮你完成各种任务 - 行程规划、交通安排、住宿预订、餐饮推荐',
          timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30分钟前
          messageCount: 8,
          isActive: true,
        },
        {
          id: '2',
          title: '📊 销售数据分析报告',
          lastMessage: '2024年第三季度销售业绩整体呈上升趋势，白酒类产品销售占比持续提升',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2小时前
          messageCount: 15,
          isActive: false,
        },
        {
          id: '3',
          title: '🔍 商品审核任务',
          lastMessage: '帮我审核最近上传的5个新商品是否符合上架标准',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4), // 4小时前
          messageCount: 12,
          isActive: false,
        },
        {
          id: '4',
          title: '💰 订单返现检查',
          lastMessage: '检查今天所有订单的返现状态，确保已正确发放',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1天前
          messageCount: 6,
          isActive: false,
        },
        {
          id: '5',
          title: '🎯 活动管理任务',
          lastMessage: '关闭即将到期的限时优惠活动，并生成活动总结报告',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2天前
          messageCount: 10,
          isActive: false,
        },
        {
          id: '6',
          title: '📦 商品上架任务',
          lastMessage: '上传一款新到货的精品白酒到商品库',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3天前
          messageCount: 5,
          isActive: false,
        },
        {
          id: '7',
          title: '📈 库存分析报告',
          lastMessage: '分析库存预警商品，生成补货建议清单',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5), // 5天前
          messageCount: 18,
          isActive: false,
        },
        {
          id: '8',
          title: '🎪 活动参与查询',
          lastMessage: '查看当前正在进行的珍享活动详情和参与情况',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7), // 1周前
          messageCount: 9,
          isActive: false,
        },
      ];
      setConversations(mockData);
      setLoading(false);
    }
  }, [visible]);

  // 键盘事件处理
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!visible) return;

      const totalItems = conversations.length + 1; // 包括新建对话

      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          setSelectedIndex(prev => Math.max(0, prev - 1));
          break;
        case 'ArrowRight':
          e.preventDefault();
          setSelectedIndex(prev => Math.min(conversations.length, prev + 1));
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex(prev => {
            const cols = 3; // 每行3个
            const currentRow = Math.floor(prev / cols);
            const currentCol = prev % cols;
            if (currentRow > 0) {
              return (currentRow - 1) * cols + currentCol;
            }
            return prev;
          });
          break;
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex(prev => {
            const cols = 3; // 每行3个
            const currentRow = Math.floor(prev / cols);
            const currentCol = prev % cols;
            const maxRow = Math.floor(totalItems / cols);
            if (currentRow < maxRow) {
              const nextIndex = (currentRow + 1) * cols + currentCol;
              return Math.min(totalItems - 1, nextIndex);
            }
            return prev;
          });
          break;
        case 'Enter':
          e.preventDefault();
          if (selectedIndex < conversations.length) {
            handleSelectConversation(conversations[selectedIndex]);
          } else {
            handleNewAGITask();
          }
          break;
        case 'Escape':
          e.preventDefault();
          onClose();
          break;
        case 'Tab':
          e.preventDefault();
          if (e.shiftKey) {
            setSelectedIndex(prev => prev > 0 ? prev - 1 : totalItems - 1);
          } else {
            setSelectedIndex(prev => prev < totalItems - 1 ? prev + 1 : 0);
          }
          break;
      }
    };

    if (visible) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [visible, conversations, selectedIndex, onClose]);

  const handleSelectConversation = (conversation: ConversationRecord) => {
    if (onSelectConversation) {
      onSelectConversation(conversation);
    }
    onClose();
  };

  // 处理新建AGI任务
  const handleNewAGITask = () => {
    console.log('新建AGI任务');
    // 这里可以添加新建AGI任务的逻辑
    onClose();
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 60) {
      return `${minutes}分钟前`;
    } else if (hours < 24) {
      return `${hours}小时前`;
    } else if (days < 7) {
      return `${days}天前`;
    } else {
      return dayjs(date).format('MM-DD HH:mm');
    }
  };

  return (
    <Modal
      title={null}
      open={visible}
      onCancel={onClose}
      footer={null}
      width="90vw"
      styles={{
        body: {
        padding: '32px',
        height: '100%',
        overflow: 'auto'
        },
        mask: { background: 'rgba(0, 0, 0, 0.5)' }
      }}
      className="conversation-history-modal alt-tab-style"
      centered
      destroyOnHidden
      style={{ maxWidth: '90vw', maxHeight: '80vh', height: '80vh' }}
    >
      {loading ? (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '300px',
          color: 'white'
        }}>
          加载中...
        </div>
      ) : (
        <>
          {/* 标题 */}
          <div style={{
            textAlign: 'center',
            marginBottom: '24px',
            color: 'white'
          }}>
            <Space>
              <Text style={{ fontSize: '18px', fontWeight: 'bold', color: 'white' }}>
                🤖 珍酒城AGI会话中心
              </Text>
            </Space>
            <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.7)', marginTop: '4px' }}>
              选择AGI会话
            </div>
          </div>

          {/* 对话网格 */}
          <Row gutter={[16, 16]} justify="center">
            {conversations.map((item, index) => (
              <Col key={item.id} style={{ flex: '0 0 280px' }}>
                <Card
                  className={`conversation-card ${selectedIndex === index ? 'selected' : ''} ${item.isActive ? 'active' : ''}`}
                  style={{
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    background: selectedIndex === index
                      ? 'rgba(102, 126, 234, 0.9)'
                      : item.isActive
                        ? 'rgba(255, 255, 255, 0.1)'
                        : 'rgba(255, 255, 255, 0.05)',
                    border: selectedIndex === index
                      ? '2px solid #667eea'
                      : item.isActive
                        ? '2px solid rgba(102, 126, 234, 0.5)'
                        : '2px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '12px',
                    backdropFilter: 'blur(10px)',
                    boxShadow: selectedIndex === index
                      ? '0 8px 32px rgba(102, 126, 234, 0.3)'
                      : '0 4px 16px rgba(0, 0, 0, 0.2)',
                    height: '180px',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}
                  styles={{
                    body: {
                    padding: '16px',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                    }
                  }}
                  onClick={() => handleSelectConversation(item)}
                >
                  {/* 头部：图标和状态 */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '8px'
                  }}>
                    <Avatar
                      size={40}
                      icon={<MessageOutlined />}
                      style={{
                        background: item.isActive ? '#667eea' : '#d9d9d9',
                        flexShrink: 0
                      }}
                    />
                    {item.isActive && (
                      <Tag
                        color="blue"
                        style={{
                          fontSize: '10px',
                          padding: '2px 6px',
                          lineHeight: '1'
                        }}
                      >
                        活跃
                      </Tag>
                    )}
                  </div>

                  {/* 标题 */}
                  <div style={{ marginBottom: '8px' }}>
                    <Text
                      strong
                      style={{
                        fontSize: '14px',
                        color: 'white',
                        display: 'block',
                        lineHeight: '1.3',
                        marginBottom: '4px'
                      }}
                      ellipsis={{ tooltip: item.title }}
                    >
                      {item.title}
                    </Text>
                  </div>

                  {/* 信息 */}
                  <div style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.8)' }}>
                    <div style={{ marginBottom: '4px' }}>
                      <ClockCircleOutlined style={{ marginRight: '4px' }} />
                      {formatTime(item.timestamp)}
                    </div>
                    <div>{item.messageCount} 条消息</div>
                  </div>

                  {/* 最后消息预览 */}
                  <Paragraph
                    ellipsis={{ rows: 1 }}
                    style={{
                      fontSize: '11px',
                      color: 'rgba(255, 255, 255, 0.6)',
                      margin: '8px 0 0 0',
                      lineHeight: '1.3'
                    }}
                  >
                    {item.lastMessage}
                  </Paragraph>
                </Card>
              </Col>
            ))}

            {/* 新建对话卡片 */}
            <Col style={{ flex: '0 0 280px' }}>
              <Card
                className={`conversation-card new-conversation ${selectedIndex === conversations.length ? 'selected' : ''}`}
                style={{
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  background: selectedIndex === conversations.length
                    ? 'rgba(34, 197, 94, 0.9)'
                    : 'rgba(255, 255, 255, 0.05)',
                  border: selectedIndex === conversations.length
                    ? '2px solid #22c55e'
                    : '2px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  backdropFilter: 'blur(10px)',
                  boxShadow: selectedIndex === conversations.length
                    ? '0 8px 32px rgba(34, 197, 94, 0.3)'
                    : '0 4px 16px rgba(0, 0, 0, 0.2)',
                  height: '180px',
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                styles={{
                  body: {
                  padding: '16px',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                  }
                }}
                onClick={() => {
                  console.log('新建AGI任务');
                  // 可以在这里添加新建AGI任务的逻辑
                }}
              >
                <div style={{ textAlign: 'center', color: 'white' }}>
                  <PlusOutlined style={{ fontSize: '32px', marginBottom: '8px', display: 'block' }} />
                  <div style={{ fontSize: '14px', fontWeight: 'bold' }}>💬 新建AGI任务</div>
                </div>
              </Card>
            </Col>
          </Row>

          {/* 底部提示 */}
          <div style={{
            textAlign: 'center',
            marginTop: '24px',
            color: 'rgba(255, 255, 255, 0.6)',
            fontSize: '12px'
          }}>
            当前选中: {selectedIndex < conversations.length ? conversations[selectedIndex]?.title : '💬 新建AGI任务'}
          </div>
        </>
      )}
    </Modal>
  );
};

export default ConversationHistoryModal;
