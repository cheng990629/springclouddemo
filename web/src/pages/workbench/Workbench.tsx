import React, { useState, useEffect } from 'react';
import { Card, Avatar, Typography, Space, Tag, Row, Col, Statistic, Table, Progress, message, Modal, List } from 'antd';
import { MessageOutlined, ClockCircleOutlined, PlusOutlined, ShoppingOutlined, BarChartOutlined, RiseOutlined, TeamOutlined, CheckCircleOutlined, WarningOutlined, RocketOutlined } from '@ant-design/icons';
import { useAppStore } from '@/store';

const { Text, Paragraph, Title } = Typography;

interface ConversationRecord {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: Date;
  messageCount: number;
  isActive: boolean;
}

const Workbench: React.FC = () => {
  const { theme } = useAppStore()
  const [conversations, setConversations] = useState<ConversationRecord[]>([]);
  const [loading, setLoading] = useState(false);

  // 获取对话记录数据
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
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
          title: '📦 工软产品列表',
          lastMessage: '生成工软产品列表相关信息，包括产品详情、分类、销量统计等',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7), // 1周前
          messageCount: 9,
          isActive: false,
        },
      ];
      setConversations(mockData);
      setLoading(false);
    }, 100);
  }, []);

  const handleSelectConversation = (conversation: ConversationRecord) => {
    console.log('Selected conversation:', conversation);
    // 这里可以添加选择对话后的逻辑
  };

  // 处理新建AGI任务
  const handleNewAGITask = () => {
    message.info('新建AGI任务功能开发中...');
  };

  // 生成产品列表
  const [generating, setGenerating] = useState(false);
  const [productReport, setProductReport] = useState<any>(null);
  const [showProductModal, setShowProductModal] = useState(false);

  const generateProductList = () => {
    setGenerating(true);
    setShowProductModal(true);

    // 模拟AI生成产品列表
    setTimeout(() => {
      const report = {
        title: '珍酒城销售业绩总览',
        timestamp: new Date(),
        dataFromAI: true,
        summary: '根据珍酒城AGI系统最新运营数据分析，2024年第三季度销售业绩整体呈上升趋势，但存在结构性问题需要重点关注',
        analysis: [
          {
            category: '白酒类产品',
            content: '销售占比持续提升，高端酒品增长迅猛',
            trend: 'up'
          },
          {
            category: '线上渠道',
            content: '销售额同比增长35%，线下门店销售相对稳定',
            trend: 'up'
          },
          {
            category: '客户群体',
            content: '主要增长点集中在40-60岁中高端消费群体',
            trend: 'stable'
          },
          {
            category: '获客成本',
            content: '新客户获取成本有所上升，需要优化营销策略',
            trend: 'down'
          }
        ],
        suggestions: [
          '加大高端白酒产品库存和陈列，满足市场需求',
          '优化线上线下融合销售模式，提升全渠道体验',
          '加强会员营销，开发高价值客户群体',
          '关注库存周转率，避免积压风险'
        ],
        opportunities: [
          '中秋、国庆双节临近，礼品酒市场潜力巨大',
          '新兴消费群体对个性化酒品需求增加',
          '跨区域销售机会值得重点关注'
        ],
        risks: [
          '部分产品价格敏感度较高，需谨慎调整',
          '竞争对手促销活动可能影响市场份额',
          '物流成本上升对毛利率造成一定压力'
        ],
        salesData: {
          totalSales: 590000,
          totalOrders: 1247,
          newCustomers: 156,
          distribution: [
            { name: '高端白酒', value: 285000, color: '#1890ff' },
            { name: '中档白酒', value: 168000, color: '#52c41a' },
            { name: '葡萄酒', value: 95000, color: '#722ed1' },
            { name: '啤酒', value: 42000, color: '#faad14' }
          ]
        },
        products: [
          {
            id: 'P001',
            name: '珍酒30年陈酿',
            category: '高端白酒',
            price: 2999,
            stock: 156,
            sales: 89,
            status: '正常',
            growth: '+23%'
          },
          {
            id: 'P002',
            name: '珍酒15年陈酿',
            category: '高端白酒',
            price: 1599,
            stock: 234,
            sales: 156,
            status: '正常',
            growth: '+18%'
          },
          {
            id: 'P003',
            name: '珍酒珍品',
            category: '中档白酒',
            price: 599,
            stock: 567,
            sales: 234,
            status: '正常',
            growth: '+12%'
          },
          {
            id: 'P004',
            name: '珍酒佳品',
            category: '中档白酒',
            price: 399,
            stock: 890,
            sales: 345,
            status: '正常',
            growth: '+8%'
          },
          {
            id: 'P005',
            name: '珍酒典藏',
            category: '高端白酒',
            price: 888,
            stock: 123,
            sales: 67,
            status: '预警',
            growth: '+35%'
          },
          {
            id: 'P006',
            name: '珍酒干红',
            category: '葡萄酒',
            price: 288,
            stock: 456,
            sales: 123,
            status: '正常',
            growth: '+5%'
          },
          {
            id: 'P007',
            name: '珍酒原浆',
            category: '中档白酒',
            price: 199,
            stock: 1200,
            sales: 567,
            status: '正常',
            growth: '+15%'
          },
          {
            id: 'P008',
            name: '珍酒啤酒礼盒',
            category: '啤酒',
            price: 128,
            stock: 780,
            sales: 234,
            status: '正常',
            growth: '-3%'
          }
        ]
      };
      setProductReport(report);
      setGenerating(false);
    }, 2000);
  };

  const productColumns = [
    {
      title: '商品编号',
      dataIndex: 'id',
      key: 'id',
      width: 100,
    },
    {
      title: '商品名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '分类',
      dataIndex: 'category',
      key: 'category',
      render: (category: string) => {
        const color = category.includes('高端') ? 'gold' : category.includes('中档') ? 'blue' : category.includes('葡萄') ? 'purple' : 'orange';
        return <Tag color={color}>{category}</Tag>;
      }
    },
    {
      title: '价格',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => `¥${price.toLocaleString()}`,
    },
    {
      title: '库存',
      dataIndex: 'stock',
      key: 'stock',
      render: (stock: number) => (
        <span style={{ color: stock < 150 ? '#ff4d4f' : '#52c41a' }}>
          {stock} {stock < 150 && <WarningOutlined />}
        </span>
      ),
    },
    {
      title: '销量',
      dataIndex: 'sales',
      key: 'sales',
    },
    {
      title: '增长',
      dataIndex: 'growth',
      key: 'growth',
      render: (growth: string) => (
        <Text type={growth.includes('+') ? 'success' : 'danger'}>
          {growth}
        </Text>
      ),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === '正常' ? 'success' : 'warning'}>
          {status}
        </Tag>
      ),
    },
  ];

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
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const hours = date.getHours();
      const mins = date.getMinutes();
      return `${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')} ${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
    }
  };

  return (
    <div style={{
      padding: '32px',
      minHeight: '100vh',
      background: theme === 'dark'
        ? '#141414'
        : 'linear-gradient(135deg, #ffffff 0%, #f5f5f5 50%, #e8e8e8 100%)',
      color: theme === 'dark' ? 'white' : '#333333'
    }}>
      {loading ? (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '300px',
          color: theme === 'dark' ? 'white' : '#333333'
        }}>
          加载中...
        </div>
      ) : (
        <>
          {/* 标题 */}
          <div style={{
            textAlign: 'center',
            marginBottom: '24px',
            color: theme === 'dark' ? 'white' : '#333333'
          }}>
            <Space>
              <Text style={{
                fontSize: '18px',
                fontWeight: 'bold',
                color: theme === 'dark' ? 'white' : '#333333'
              }}>
                🤖 珍酒城AGI会话中心
              </Text>
            </Space>
            <div style={{
              fontSize: '12px',
              color: theme === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6)',
              marginTop: '4px'
            }}>
              选择AGI会话
            </div>
          </div>

          {/* 对话网格 */}
          <Row gutter={[16, 16]} justify="start">
            {conversations.map((item) => (
              <Col key={item.id} style={{ flex: '0 0 280px' }}>
                <Card
                  style={{
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    background: theme === 'dark'
                      ? (item.isActive
                          ? 'rgba(255, 255, 255, 0.1)'
                          : 'rgba(255, 255, 255, 0.05)')
                      : (item.isActive
                          ? 'rgba(0, 0, 0, 0.05)'
                          : 'rgba(0, 0, 0, 0.02)'),
                    border: item.isActive
                      ? '2px solid rgba(102, 126, 234, 0.5)'
                      : (theme === 'dark'
                          ? '2px solid rgba(255, 255, 255, 0.1)'
                          : '2px solid rgba(0, 0, 0, 0.1)'),
                    borderRadius: '12px',
                    backdropFilter: 'blur(10px)',
                    boxShadow: theme === 'dark'
                      ? '0 4px 16px rgba(0, 0, 0, 0.2)'
                      : '0 4px 16px rgba(0, 0, 0, 0.1)',
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
                        color: theme === 'dark' ? 'white' : '#333333',
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
                  <div style={{
                    fontSize: '11px',
                    color: theme === 'dark' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.7)'
                  }}>
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
                      color: theme === 'dark' ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.5)',
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
                style={{
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  background: theme === 'dark'
                    ? 'rgba(255, 255, 255, 0.05)'
                    : 'rgba(0, 0, 0, 0.02)',
                  border: theme === 'dark'
                    ? '2px solid rgba(255, 255, 255, 0.1)'
                    : '2px solid rgba(0, 0, 0, 0.1)',
                  borderRadius: '12px',
                  backdropFilter: 'blur(10px)',
                  boxShadow: theme === 'dark'
                    ? '0 4px 16px rgba(0, 0, 0, 0.2)'
                    : '0 4px 16px rgba(0, 0, 0, 0.1)',
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
                onClick={handleNewAGITask}
              >
                <div style={{
                  textAlign: 'center',
                  color: theme === 'dark' ? 'white' : '#333333'
                }}>
                  <PlusOutlined style={{ fontSize: '32px', marginBottom: '8px', display: 'block' }} />
                  <div style={{ fontSize: '14px', fontWeight: 'bold' }}>💬 新建AGI任务</div>
                </div>
              </Card>
            </Col>

            {/* 生成产品列表卡片 */}
            <Col style={{ flex: '0 0 280px' }}>
              <Card
                style={{
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  background: theme === 'dark'
                    ? 'rgba(82, 196, 26, 0.1)'
                    : 'rgba(24, 144, 255, 0.05)',
                  border: theme === 'dark'
                    ? '2px solid rgba(82, 196, 26, 0.3)'
                    : '2px solid rgba(24, 144, 255, 0.3)',
                  borderRadius: '12px',
                  backdropFilter: 'blur(10px)',
                  boxShadow: theme === 'dark'
                    ? '0 4px 16px rgba(0, 0, 0, 0.2)'
                    : '0 4px 16px rgba(24, 144, 255, 0.15)',
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
                onClick={generateProductList}
              >
                <div style={{
                  textAlign: 'center',
                  color: theme === 'dark' ? 'white' : '#333333'
                }}>
                  <RocketOutlined style={{ fontSize: '32px', marginBottom: '8px', display: 'block', color: '#1890ff' }} />
                  <div style={{ fontSize: '14px', fontWeight: 'bold' }}>📊 生成产品列表</div>
                  <div style={{ fontSize: '11px', color: theme === 'dark' ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.5)', marginTop: '4px' }}>
                    AI智能分析销售数据
                  </div>
                </div>
              </Card>
            </Col>
          </Row>

          {/* 产品报告 Modal */}
          <Modal
            title={
              <Space>
                <ShoppingOutlined />
                <span>{productReport?.title || '产品分析报告'}</span>
              </Space>
            }
            open={showProductModal}
            onCancel={() => setShowProductModal(false)}
            footer={null}
            width={1200}
            styles={{ body: { maxHeight: '70vh', overflowY: 'auto' } }}
          >
            {generating ? (
              <div style={{ textAlign: 'center', padding: '60px 0' }}>
                <RocketOutlined style={{ fontSize: 48, color: '#1890ff', marginBottom: 16 }} spin />
                <Title level={4}>AI 正在分析产品数据...</Title>
                <Text type="secondary">请稍候，系统正在生成销售分析报告</Text>
              </div>
            ) : productReport ? (
              <div>
                {/* AI 数据标识 */}
                <div style={{ textAlign: 'center', marginBottom: 16 }}>
                  <Tag color="blue" icon={<BarChartOutlined />}>
                    🤖 以上数据由AI模型实时生成
                  </Tag>
                </div>

                {/* 核心指标 */}
                <Row gutter={16} style={{ marginBottom: 24 }}>
                  <Col span={6}>
                    <Card size="small">
                      <Statistic
                        title="总销售额"
                        value={productReport.salesData.totalSales}
                        prefix={<RiseOutlined />}
                        suffix="元"
                        valueStyle={{ color: '#1890ff' }}
                      />
                    </Card>
                  </Col>
                  <Col span={6}>
                    <Card size="small">
                      <Statistic
                        title="订单总数"
                        value={productReport.salesData.totalOrders}
                        prefix={<ShoppingOutlined />}
                        valueStyle={{ color: '#52c41a' }}
                      />
                    </Card>
                  </Col>
                  <Col span={6}>
                    <Card size="small">
                      <Statistic
                        title="新增客户"
                        value={productReport.salesData.newCustomers}
                        prefix={<TeamOutlined />}
                        valueStyle={{ color: '#722ed1' }}
                      />
                    </Card>
                  </Col>
                  <Col span={6}>
                    <Card size="small">
                      <Statistic
                        title="商品种类"
                        value={productReport.products.length}
                        prefix={<CheckCircleOutlined />}
                        valueStyle={{ color: '#faad14' }}
                      />
                    </Card>
                  </Col>
                </Row>

                {/* 销售分布 */}
                <Card title="📊 销售分布" size="small" style={{ marginBottom: 16 }}>
                  <Row gutter={16}>
                    {productReport.salesData.distribution.map((item: any, index: number) => (
                      <Col span={6} key={index}>
                        <div style={{ textAlign: 'center' }}>
                          <Progress
                            type="circle"
                            percent={Math.round((item.value / productReport.salesData.totalSales) * 100)}
                            strokeColor={item.color}
                            size={80}
                          />
                          <div style={{ marginTop: 8 }}>
                            <Text strong>{item.name}</Text>
                            <br />
                            <Text type="secondary">¥{item.value.toLocaleString()}</Text>
                          </div>
                        </div>
                      </Col>
                    ))}
                  </Row>
                </Card>

                {/* AI 分析 */}
                <Card title="📈 数据分析" size="small" style={{ marginBottom: 16 }}>
                  <List
                    size="small"
                    dataSource={productReport.analysis}
                    renderItem={(item: any) => (
                      <List.Item>
                        <List.Item.Meta
                          avatar={
                            <Tag color={item.trend === 'up' ? 'green' : item.trend === 'down' ? 'red' : 'blue'}>
                              {item.trend === 'up' ? '📈' : item.trend === 'down' ? '📉' : '➡️'}
                            </Tag>
                          }
                          title={item.category}
                          description={item.content}
                        />
                      </List.Item>
                    )}
                  />
                </Card>

                {/* 运营建议 */}
                <Card title="💡 运营建议" size="small" style={{ marginBottom: 16 }}>
                  <List
                    size="small"
                    dataSource={productReport.suggestions}
                    renderItem={(item: string, index: number) => (
                      <List.Item>
                        <Text>{index + 1}. {item}</Text>
                      </List.Item>
                    )}
                  />
                </Card>

                {/* 市场机会 */}
                <Row gutter={16} style={{ marginBottom: 16 }}>
                  <Col span={12}>
                    <Card title="🎯 市场机会" size="small">
                      <List
                        size="small"
                        dataSource={productReport.opportunities}
                        renderItem={(item: string) => (
                          <List.Item>
                            <Text type="success">✓ {item}</Text>
                          </List.Item>
                        )}
                      />
                    </Card>
                  </Col>
                  <Col span={12}>
                    <Card title="⚠️ 风险提示" size="small">
                      <List
                        size="small"
                        dataSource={productReport.risks}
                        renderItem={(item: string) => (
                          <List.Item>
                            <Text type="danger">✗ {item}</Text>
                          </List.Item>
                        )}
                      />
                    </Card>
                  </Col>
                </Row>

                {/* 产品表格 */}
                <Card title="📦 产品列表" size="small">
                  <Table
                    columns={productColumns}
                    dataSource={productReport.products}
                    rowKey="id"
                    size="small"
                    pagination={{ pageSize: 5 }}
                  />
                </Card>
              </div>
            ) : null}
          </Modal>
        </>
      )}
    </div>
  );
};

export default Workbench
