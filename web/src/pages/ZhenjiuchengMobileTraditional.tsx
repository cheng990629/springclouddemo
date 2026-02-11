import React, { useState } from 'react';
import {
    Card,
    Row,
    Col,
    Statistic,
    Table,
    Tag,
    Button,
    Space,
    Progress,
    Avatar,
    Descriptions,
    Badge,
    Form,
    Input,
    Modal
} from 'antd';
import {
    DashboardOutlined,
    ShopOutlined,
    BarChartOutlined,
    StockOutlined,
    ShoppingCartOutlined,
    TeamOutlined,
    DollarOutlined,
    UserOutlined,
    SettingOutlined,
    FileTextOutlined,
    PlusOutlined,
} from '@ant-design/icons';
import AdminLayout from '@/components/AdminLayout';
import type { MenuProps } from 'antd';


/**
 * TK店群页面
 * TK连锁店群管理系统
 */
const TkStoreManagement: React.FC = () => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [addStoreModalVisible, setAddStoreModalVisible] = useState(false);
    const [form] = Form.useForm();

    // 菜单配置
    const menuItems: MenuProps['items'] = [
        {
            key: 'dashboard',
            icon: <DashboardOutlined />,
            label: '运营总览',
        },
        {
            key: 'stores',
            icon: <ShopOutlined />,
            label: '店铺管理',
        },
        {
            key: 'sales',
            icon: <BarChartOutlined />,
            label: '销售统计',
        },
        {
            key: 'inventory',
            icon: <StockOutlined />,
            label: '库存管理',
        },
        {
            key: 'orders',
            icon: <ShoppingCartOutlined />,
            label: '订单管理',
        },
        {
            key: 'customers',
            icon: <UserOutlined />,
            label: '客户管理',
        },
        {
            key: 'staff',
            icon: <TeamOutlined />,
            label: '员工管理',
        },
        {
            key: 'finance',
            icon: <DollarOutlined />,
            label: '财务管理',
        },
        {
            key: 'reports',
            icon: <FileTextOutlined />,
            label: '报表中心',
        },
        {
            key: 'settings',
            icon: <SettingOutlined />,
            label: '系统设置',
        },
    ];

    // 模拟数据
    const storeStats = {
        totalStores: 28,
        activeStores: 26,
        totalRevenue: 2850000,
        monthlyGrowth: 12.5,
        totalOrders: 15420,
        averageOrderValue: 185,
        totalCustomers: 8750,
        newCustomers: 420,
    };

    const storeData = [
        {
            id: 'ST001',
            name: 'TK北京王府井店',
            location: '北京市东城区',
            status: '营业中',
            revenue: 125000,
            orders: 680,
            staff: 12,
            rating: 4.8,
        },
        {
            id: 'ST002',
            name: 'TK上海南京路店',
            location: '上海市黄浦区',
            status: '营业中',
            revenue: 98000,
            orders: 520,
            staff: 10,
            rating: 4.6,
        },
        {
            id: 'ST003',
            name: 'TK广州天河店',
            location: '广州市天河区',
            status: '营业中',
            revenue: 156000,
            orders: 820,
            staff: 15,
            rating: 4.9,
        },
        {
            id: 'ST004',
            name: 'TK深圳华强北店',
            location: '深圳市福田区',
            status: '装修中',
            revenue: 0,
            orders: 0,
            staff: 0,
            rating: 0,
        },
        {
            id: 'ST005',
            name: 'TK成都春熙路店',
            location: '成都市锦江区',
            status: '营业中',
            revenue: 87000,
            orders: 450,
            staff: 8,
            rating: 4.7,
        },
    ];

    const productData = [
        {
            id: 'PD001',
            name: 'TK经典白酒500ml',
            category: '白酒',
            stock: 1250,
            sold: 890,
            price: 128,
            status: '正常',
        },
        {
            id: 'PD002',
            name: 'TK精品红酒750ml',
            category: '红酒',
            stock: 680,
            sold: 520,
            price: 256,
            status: '正常',
        },
        {
            id: 'PD003',
            name: 'TK养生酒380ml',
            category: '养生酒',
            stock: 45,
            sold: 320,
            price: 89,
            status: '缺货',
        },
        {
            id: 'PD004',
            name: 'TK礼盒装1280ml',
            category: '礼盒',
            stock: 156,
            sold: 98,
            price: 580,
            status: '正常',
        },
    ];

    const orderData = [
        {
            id: 'ORD001',
            customer: '张先生',
            store: 'TK北京王府井店',
            products: ['TK经典白酒500ml', 'TK精品红酒750ml'],
            amount: 384,
            status: '已完成',
            date: '2024-01-15 14:30',
        },
        {
            id: 'ORD002',
            customer: '李女士',
            store: 'TK上海南京路店',
            products: ['TK礼盒装1280ml'],
            amount: 580,
            status: '进行中',
            date: '2024-01-15 16:45',
        },
        {
            id: 'ORD003',
            customer: '王先生',
            store: 'TK广州天河店',
            products: ['TK养生酒380ml', 'TK经典白酒500ml'],
            amount: 217,
            status: '待发货',
            date: '2024-01-15 11:20',
        },
    ];

    const staffData = [
        {
            id: 'SF001',
            name: '赵经理',
            store: 'TK北京王府井店',
            position: '店长',
            salary: 8500,
            performance: 95,
        },
        {
            id: 'SF002',
            name: '钱销售',
            store: 'TK上海南京路店',
            position: '销售员',
            salary: 4500,
            performance: 88,
        },
        {
            id: 'SF003',
            name: '孙主管',
            store: 'TK广州天河店',
            position: '主管',
            salary: 6500,
            performance: 92,
        },
    ];

    const columns = [
        {
            title: '店铺编号',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: '店铺名称',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '位置',
            dataIndex: 'location',
            key: 'location',
        },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            render: (status: string) => {
                const color = status === '营业中' ? 'green' : status === '装修中' ? 'orange' : 'red';
                return <Tag color={color}>{status}</Tag>;
            },
        },
        {
            title: '月营收',
            dataIndex: 'revenue',
            key: 'revenue',
            render: (revenue: number) => `¥${revenue.toLocaleString()}`,
        },
        {
            title: '月订单',
            dataIndex: 'orders',
            key: 'orders',
        },
        {
            title: '员工数',
            dataIndex: 'staff',
            key: 'staff',
        },
        {
            title: '评分',
            dataIndex: 'rating',
            key: 'rating',
            render: (rating: number) => rating > 0 ? `${rating}/5.0` : '-',
        },
        {
            title: '操作',
            key: 'action',
            render: () => (
                <Space size="small">
                    <Button type="link" size="small">详情</Button>
                    <Button type="link" size="small">编辑</Button>
                </Space>
            ),
        },
    ];

    const productColumns = [
        {
            title: '商品编号',
            dataIndex: 'id',
            key: 'id',
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
        },
        {
            title: '库存',
            dataIndex: 'stock',
            key: 'stock',
            render: (stock: number) => (
                <Badge count={stock} showZero color={stock < 100 ? 'red' : 'green'} />
            ),
        },
        {
            title: '已售',
            dataIndex: 'sold',
            key: 'sold',
        },
        {
            title: '价格',
            dataIndex: 'price',
            key: 'price',
            render: (price: number) => `¥${price}`,
        },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            render: (status: string) => {
                const color = status === '正常' ? 'green' : status === '缺货' ? 'red' : 'orange';
                return <Tag color={color}>{status}</Tag>;
            },
        },
        {
            title: '操作',
            key: 'action',
            render: () => (
                <Space size="small">
                    <Button type="link" size="small">补货</Button>
                    <Button type="link" size="small">编辑</Button>
                </Space>
            ),
        },
    ];

    const orderColumns = [
        {
            title: '订单号',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: '客户',
            dataIndex: 'customer',
            key: 'customer',
        },
        {
            title: '店铺',
            dataIndex: 'store',
            key: 'store',
        },
        {
            title: '商品',
            dataIndex: 'products',
            key: 'products',
            render: (products: string[]) => products.join(', '),
        },
        {
            title: '金额',
            dataIndex: 'amount',
            key: 'amount',
            render: (amount: number) => `¥${amount}`,
        },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            render: (status: string) => {
                const color = status === '已完成' ? 'green' : status === '进行中' ? 'blue' : 'orange';
                return <Tag color={color}>{status}</Tag>;
            },
        },
        {
            title: '下单时间',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: '操作',
            key: 'action',
            render: () => (
                <Space size="small">
                    <Button type="link" size="small">详情</Button>
                    <Button type="link" size="small">发货</Button>
                </Space>
            ),
        },
    ];

    const staffColumns = [
        {
            title: '员工编号',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '店铺',
            dataIndex: 'store',
            key: 'store',
        },
        {
            title: '职位',
            dataIndex: 'position',
            key: 'position',
        },
        {
            title: '月薪',
            dataIndex: 'salary',
            key: 'salary',
            render: (salary: number) => `¥${salary}`,
        },
        {
            title: '绩效',
            dataIndex: 'performance',
            key: 'performance',
            render: (performance: number) => (
                <Progress percent={performance} size="small" status={performance >= 90 ? 'success' : 'active'} />
            ),
        },
        {
            title: '操作',
            key: 'action',
            render: () => (
                <Space size="small">
                    <Button type="link" size="small">详情</Button>
                    <Button type="link" size="small">调岗</Button>
                </Space>
            ),
        },
    ];

    const renderDashboard = () => (
        <div>
            <Row gutter={[16, 16]}>
                <Col span={24}>
                    <Card>
                        <div style={{ textAlign: 'center', marginBottom: 24 }}>
                            <h2>TK连锁店群运营总览</h2>
                            <p>统一数字化管理平台，为多门店协同运营提供全面支持</p>
                        </div>
                    </Card>
                </Col>
            </Row>

            <Row gutter={[16, 16]}>
                <Col xs={24} sm={12} md={6}>
                    <Card>
                        <Statistic
                            title="总店铺数"
                            value={storeStats.totalStores}
                            prefix={<ShopOutlined />}
                            styles={{ content: { color: '#1890ff' } }}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={6}>
                    <Card>
                        <Statistic
                            title="月总营收"
                            value={storeStats.totalRevenue}
                            prefix={<DollarOutlined />}
                            suffix="万"
                            styles={{ content: { color: '#52c41a' } }}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={6}>
                    <Card>
                        <Statistic
                            title="月增长率"
                            value={storeStats.monthlyGrowth}
                            suffix="%"
                            prefix={<BarChartOutlined />}
                            styles={{ content: { color: storeStats.monthlyGrowth > 0 ? '#52c41a' : '#ff4d4f' } }}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={6}>
                    <Card>
                        <Statistic
                            title="总订单数"
                            value={storeStats.totalOrders}
                            prefix={<ShoppingCartOutlined />}
                            styles={{ content: { color: '#722ed1' } }}
                        />
                    </Card>
                </Col>
            </Row>

            <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
                <Col xs={24} md={8}>
                    <Card title="店铺运营状态" size="small">
                        <div style={{ marginBottom: 12 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                                <span>营业中</span>
                                <span>{storeStats.activeStores}家</span>
                            </div>
                            <Progress percent={Math.round((storeStats.activeStores / storeStats.totalStores) * 100)} status="success" />
                        </div>
                        <div style={{ marginBottom: 12 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                                <span>装修中</span>
                                <span>2家</span>
                            </div>
                            <Progress percent={7} status="exception" />
                        </div>
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                                <span>暂停营业</span>
                                <span>0家</span>
                            </div>
                            <Progress percent={0} />
                        </div>
                    </Card>
                </Col>
                <Col xs={24} md={8}>
                    <Card title="销售业绩Top5" size="small">
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {[
                                { name: '北京王府井店', revenue: 125000 },
                                { name: '广州天河店', revenue: 156000 },
                                { name: '上海南京路店', revenue: 98000 },
                                { name: '成都春熙路店', revenue: 87000 },
                                { name: '深圳华强北店', revenue: 0 },
                            ].map((item, index) => (
                                <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <Avatar size="small">{index + 1}</Avatar>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontWeight: '500', fontSize: '14px' }}>{item.name}</div>
                                        <div style={{ color: '#666', fontSize: '12px' }}>¥{item.revenue.toLocaleString()}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </Col>
                <Col xs={24} md={8}>
                    <Card title="客户数据概览" size="small">
                        <Descriptions size="small" column={1}>
                            <Descriptions.Item label="累计客户数">{storeStats.totalCustomers.toLocaleString()}</Descriptions.Item>
                            <Descriptions.Item label="本月新增">{storeStats.newCustomers}</Descriptions.Item>
                            <Descriptions.Item label="平均客单价">¥{storeStats.averageOrderValue}</Descriptions.Item>
                            <Descriptions.Item label="客户复购率">68%</Descriptions.Item>
                        </Descriptions>
                    </Card>
                </Col>
            </Row>

            <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
                <Col xs={24} md={12}>
                    <Card title="库存预警" size="small">
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {[
                                { name: 'TK养生酒380ml', stock: 45, status: '严重缺货' },
                                { name: 'TK精品红酒750ml', stock: 680, status: '库存充足' },
                                { name: 'TK经典白酒500ml', stock: 1250, status: '库存充足' },
                            ].map((item, index) => (
                                <div key={index}>
                                    <div style={{ fontWeight: '500', fontSize: '14px', marginBottom: '4px' }}>
                                        {item.name}
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <span style={{ color: '#666', fontSize: '12px' }}>库存: {item.stock}</span>
                                        <Tag color={item.status === '严重缺货' ? 'red' : 'green'} size="small">
                                            {item.status}
                                        </Tag>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </Col>
                <Col xs={24} md={12}>
                    <Card title="最新动态" size="small">
                        <div style={{ marginBottom: 12 }}>
                            <Badge status="success" text="广州天河店月销售额突破15万" />
                        </div>
                        <div style={{ marginBottom: 12 }}>
                            <Badge status="processing" text="深圳华强北店正在装修中" />
                        </div>
                        <div style={{ marginBottom: 12 }}>
                            <Badge status="warning" text="3款商品库存不足，需要补货" />
                        </div>
                        <div>
                            <Badge status="default" text="新品TK精品红酒即将上市" />
                        </div>
                    </Card>
                </Col>
            </Row>
        </div>
    );

    const renderStores = () => (
        <Card
            title="店铺管理"
            extra={
                <Button type="primary" icon={<PlusOutlined />} onClick={() => setAddStoreModalVisible(true)}>
                    新增店铺
                </Button>
            }
        >
            <Table
                columns={columns}
                dataSource={storeData}
                rowKey="id"
                size="small"
                pagination={{ pageSize: 10 }}
            />

            <Modal
                title="新增店铺"
                open={addStoreModalVisible}
                onCancel={() => setAddStoreModalVisible(false)}
                onOk={() => form.submit()}
            >
                <Form form={form} layout="vertical" onFinish={() => setAddStoreModalVisible(false)}>
                    <Form.Item name="name" label="店铺名称" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="location" label="店铺位置" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="manager" label="店长" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="area" label="营业面积(㎡)">
                        <Input type="number" />
                    </Form.Item>
                </Form>
            </Modal>
        </Card>
    );

    const renderInventory = () => (
        <Card title="库存管理">
            <Table
                columns={productColumns}
                dataSource={productData}
                rowKey="id"
                size="small"
                pagination={{ pageSize: 10 }}
            />
        </Card>
    );

    const renderOrders = () => (
        <Card title="订单管理">
            <Table
                columns={orderColumns}
                dataSource={orderData}
                rowKey="id"
                size="small"
                pagination={{ pageSize: 10 }}
            />
        </Card>
    );

    const renderStaff = () => (
        <Card title="员工管理">
            <Table
                columns={staffColumns}
                dataSource={staffData}
                rowKey="id"
                size="small"
                pagination={{ pageSize: 10 }}
            />
        </Card>
    );

    const renderContent = () => {
        switch (activeTab) {
            case 'dashboard':
                return renderDashboard();
            case 'stores':
                return renderStores();
            case 'inventory':
                return renderInventory();
            case 'orders':
                return renderOrders();
            case 'staff':
                return renderStaff();
            default:
                return (
                    <Card>
                        <div style={{ textAlign: 'center', padding: '50px 0', color: '#999' }}>
                            {activeTab} 功能开发中...
                        </div>
                    </Card>
                );
        }
    };

    return (
        <AdminLayout
            title="TK店群"
            subtitle="连锁店群数字化管理系统"
            menuItems={menuItems}
            defaultSelectedKey="dashboard"
        >
            {renderContent()}
        </AdminLayout>
    );
};

export default TkStoreManagement;
