import React, { useState } from 'react';
import {
    Card,
    Row,
    Col,
    Statistic,
    Progress,
    Table,
    Tag,
    Button,
    Space,
    Tabs,
    Alert,
    Descriptions,
    Badge
} from 'antd';
import {
    DashboardOutlined,
    EnvironmentOutlined,
    SettingOutlined,
    AlertOutlined,
    DatabaseOutlined,
    CloudOutlined,
    BulbOutlined,
    ExperimentOutlined,
    BugOutlined,
    FireOutlined,
} from '@ant-design/icons';
import AdminLayout from '@/components/AdminLayout';
import type { MenuProps } from 'antd';

const { TabPane } = Tabs;

/**
 * 智慧大棚页面
 * 智慧农业大棚管理系统
 */
const SmartGreenhouse: React.FC = () => {
    const [activeTab, setActiveTab] = useState('dashboard');

    // 菜单配置
    const menuItems: MenuProps['items'] = [
        {
            key: 'dashboard',
            icon: <DashboardOutlined />,
            label: '监控总览',
        },
        {
            key: 'environment',
            icon: <EnvironmentOutlined />,
            label: '环境监测',
            children: [
                {
                    key: 'temperature',
                    label: '温度监控',
                },
                {
                    key: 'humidity',
                    label: '湿度监控',
                },
                {
                    key: 'light',
                    label: '光照监测',
                },
                {
                    key: 'soil',
                    label: '土壤监测',
                },
            ],
        },
        {
            key: 'irrigation',
            icon: <CloudOutlined />,
            label: '灌溉控制',
        },
        {
            key: 'fertilizer',
            icon: <ExperimentOutlined />,
            label: '施肥管理',
        },
        {
            key: 'pest',
            icon: <BugOutlined />,
            label: '病虫害防治',
        },
        {
            key: 'equipment',
            icon: <SettingOutlined />,
            label: '设备管理',
        },
        {
            key: 'data',
            icon: <DatabaseOutlined />,
            label: '数据分析',
        },
        {
            key: 'alert',
            icon: <AlertOutlined />,
            label: '告警中心',
        },
    ];

    // 模拟数据
    const greenhouseStats = {
        temperature: 25.3,
        humidity: 65,
        light: 1200,
        soilMoisture: 78,
        co2: 420,
        ph: 6.8,
    };

    const equipmentData = [
        {
            id: 'GH001',
            name: '温室1号',
            status: '正常',
            temperature: 25.3,
            humidity: 65,
            lastUpdate: '2024-01-15 10:30:00',
        },
        {
            id: 'GH002',
            name: '温室2号',
            status: '警告',
            temperature: 28.7,
            humidity: 72,
            lastUpdate: '2024-01-15 10:28:00',
        },
        {
            id: 'GH003',
            name: '温室3号',
            status: '正常',
            temperature: 24.1,
            humidity: 68,
            lastUpdate: '2024-01-15 10:25:00',
        },
    ];

    const alertData = [
        {
            id: 'ALT001',
            type: '温度过高',
            level: 'warning',
            message: '温室2号温度超过28°C',
            time: '2024-01-15 10:28:00',
            status: '未处理',
        },
        {
            id: 'ALT002',
            type: '湿度异常',
            level: 'info',
            message: '温室1号湿度偏低',
            time: '2024-01-15 10:15:00',
            status: '已处理',
        },
    ];

    const columns = [
        {
            title: '温室编号',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: '温室名称',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            render: (status: string) => {
                const color = status === '正常' ? 'green' : status === '警告' ? 'orange' : 'red';
                return <Badge status={color as any} text={status} />;
            },
        },
        {
            title: '温度(°C)',
            dataIndex: 'temperature',
            key: 'temperature',
        },
        {
            title: '湿度(%)',
            dataIndex: 'humidity',
            key: 'humidity',
        },
        {
            title: '最后更新',
            dataIndex: 'lastUpdate',
            key: 'lastUpdate',
        },
        {
            title: '操作',
            key: 'action',
            render: () => (
                <Space size="small">
                    <Button type="link" size="small">详情</Button>
                    <Button type="link" size="small">控制</Button>
                </Space>
            ),
        },
    ];

    const alertColumns = [
        {
            title: '告警ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: '告警类型',
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: '级别',
            dataIndex: 'level',
            key: 'level',
            render: (level: string) => {
                const color = level === 'error' ? 'red' : level === 'warning' ? 'orange' : 'blue';
                return <Tag color={color}>{level.toUpperCase()}</Tag>;
            },
        },
        {
            title: '消息',
            dataIndex: 'message',
            key: 'message',
        },
        {
            title: '时间',
            dataIndex: 'time',
            key: 'time',
        },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            render: (status: string) => (
                <Tag color={status === '未处理' ? 'red' : 'green'}>{status}</Tag>
            ),
        },
    ];

    const renderDashboard = () => (
        <div>
            <Row gutter={[16, 16]}>
                <Col span={24}>
                    <Alert
                        title="系统运行正常"
                        description="所有温室设备运行稳定，无严重告警。"
                        type="success"
                        showIcon
                        style={{ marginBottom: 16 }}
                    />
                </Col>
            </Row>

            <Row gutter={[16, 16]}>
                <Col xs={24} sm={12} md={6}>
                    <Card>
                        <Statistic
                            title="平均温度"
                            value={greenhouseStats.temperature}
                            suffix="°C"
                            styles={{ content: { color: '#3f8600' } }}
                            prefix={<FireOutlined />}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={6}>
                    <Card>
                        <Statistic
                            title="平均湿度"
                            value={greenhouseStats.humidity}
                            suffix="%"
                            styles={{ content: { color: '#1890ff' } }}
                            prefix={<CloudOutlined />}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={6}>
                    <Card>
                        <Statistic
                            title="光照强度"
                            value={greenhouseStats.light}
                            suffix="lux"
                            styles={{ content: { color: '#722ed1' } }}
                            prefix={<BulbOutlined />}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={6}>
                    <Card>
                        <Statistic
                            title="土壤湿度"
                            value={greenhouseStats.soilMoisture}
                            suffix="%"
                            styles={{ content: { color: '#13c2c2' } }}
                            prefix={<CloudOutlined />}
                        />
                    </Card>
                </Col>
            </Row>

            <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
                <Col xs={24} md={12}>
                    <Card title="环境参数详情" size="small">
                        <Descriptions size="small" column={2}>
                            <Descriptions.Item label="CO2浓度">{greenhouseStats.co2} ppm</Descriptions.Item>
                            <Descriptions.Item label="土壤pH值">{greenhouseStats.ph}</Descriptions.Item>
                            <Descriptions.Item label="光照周期">16h/8h</Descriptions.Item>
                            <Descriptions.Item label="通风状态">自动</Descriptions.Item>
                        </Descriptions>
                    </Card>
                </Col>
                <Col xs={24} md={12}>
                    <Card title="设备运行状态" size="small">
                        <div style={{ marginBottom: 12 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                                <span>灌溉系统</span>
                                <span>85%</span>
                            </div>
                            <Progress percent={85} status="active" />
                        </div>
                        <div style={{ marginBottom: 12 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                                <span>通风系统</span>
                                <span>92%</span>
                            </div>
                            <Progress percent={92} status="active" />
                        </div>
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                                <span>照明系统</span>
                                <span>78%</span>
                            </div>
                            <Progress percent={78} status="active" />
                        </div>
                    </Card>
                </Col>
            </Row>

            <Card title="温室设备列表" style={{ marginTop: 16 }}>
                <Table
                    columns={columns}
                    dataSource={equipmentData}
                    rowKey="id"
                    size="small"
                    pagination={{ pageSize: 5 }}
                />
            </Card>
        </div>
    );

    const renderEnvironment = () => (
        <div>
            <Tabs defaultActiveKey="temperature">
                <TabPane tab="温度监控" key="temperature">
                    <Card title="温度实时数据">
                        <Row gutter={[16, 16]}>
                            <Col span={12}>
                                <Statistic title="当前温度" value={25.3} suffix="°C" />
                                <div style={{ marginTop: 16 }}>
                                    <div>温度范围: 20°C - 30°C</div>
                                    <Progress percent={63} status="active" />
                                </div>
                            </Col>
                            <Col span={12}>
                                <div>温度趋势图占位符</div>
                                <div style={{ height: 200, background: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 4 }}>
                                    温度趋势图
                                </div>
                            </Col>
                        </Row>
                    </Card>
                </TabPane>
                <TabPane tab="湿度监控" key="humidity">
                    <Card title="湿度实时数据">
                        <Row gutter={[16, 16]}>
                            <Col span={12}>
                                <Statistic title="当前湿度" value={65} suffix="%" />
                                <div style={{ marginTop: 16 }}>
                                    <div>湿度范围: 50% - 80%</div>
                                    <Progress percent={65} status="active" />
                                </div>
                            </Col>
                            <Col span={12}>
                                <div>湿度趋势图占位符</div>
                                <div style={{ height: 200, background: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 4 }}>
                                    湿度趋势图
                                </div>
                            </Col>
                        </Row>
                    </Card>
                </TabPane>
                <TabPane tab="光照监测" key="light">
                    <Card title="光照实时数据">
                        <Row gutter={[16, 16]}>
                            <Col span={12}>
                                <Statistic title="当前光照" value={1200} suffix="lux" />
                                <div style={{ marginTop: 16 }}>
                                    <div>光照范围: 800-1500 lux</div>
                                    <Progress percent={75} status="active" />
                                </div>
                            </Col>
                            <Col span={12}>
                                <div>光照趋势图占位符</div>
                                <div style={{ height: 200, background: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 4 }}>
                                    光照趋势图
                                </div>
                            </Col>
                        </Row>
                    </Card>
                </TabPane>
                <TabPane tab="土壤监测" key="soil">
                    <Card title="土壤实时数据">
                        <Row gutter={[16, 16]}>
                            <Col span={12}>
                                <Statistic title="土壤湿度" value={78} suffix="%" />
                                <Statistic title="土壤pH值" value={6.8} />
                            </Col>
                            <Col span={12}>
                                <div>土壤参数图表占位符</div>
                                <div style={{ height: 200, background: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 4 }}>
                                    土壤参数图表
                                </div>
                            </Col>
                        </Row>
                    </Card>
                </TabPane>
            </Tabs>
        </div>
    );

    const renderAlerts = () => (
        <Card title="告警中心">
            <Table
                columns={alertColumns}
                dataSource={alertData}
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
            case 'environment':
            case 'temperature':
            case 'humidity':
            case 'light':
            case 'soil':
                return renderEnvironment();
            case 'alert':
                return renderAlerts();
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
            title="智慧大棚"
            subtitle="农业智能化管理平台"
            menuItems={menuItems}
            defaultSelectedKey="dashboard"
            defaultOpenKey="environment"
        >
            {renderContent()}
        </AdminLayout>
    );
};

export default SmartGreenhouse;
