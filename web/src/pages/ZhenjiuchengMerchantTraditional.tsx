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
    Timeline
} from 'antd';
import {
    DashboardOutlined,
    ProjectOutlined,
    ExperimentOutlined,
    RobotOutlined,
    TeamOutlined,
    TrophyOutlined,
    BulbOutlined,
    DatabaseOutlined,
    BarChartOutlined,
} from '@ant-design/icons';
import AdminLayout from '@/components/AdminLayout';
import type { MenuProps } from 'antd';


/**
 * 科创AI页面
 * 科技创新AI应用
 */
const ScienceAi: React.FC = () => {
    const [activeTab, setActiveTab] = useState('dashboard');

    // 菜单配置
    const menuItems: MenuProps['items'] = [
        {
            key: 'dashboard',
            icon: <DashboardOutlined />,
            label: '创新总览',
        },
        {
            key: 'projects',
            icon: <ProjectOutlined />,
            label: '项目管理',
        },
        {
            key: 'research',
            icon: <ExperimentOutlined />,
            label: '科研辅助',
            children: [
                {
                    key: 'literature',
                    label: '文献分析',
                },
                {
                    key: 'patent',
                    label: '专利分析',
                },
                {
                    key: 'prediction',
                    label: '技术预测',
                },
            ],
        },
        {
            key: 'ai-tools',
            icon: <RobotOutlined />,
            label: 'AI工具',
            children: [
                {
                    key: 'design',
                    label: '创新设计',
                },
                {
                    key: 'simulation',
                    label: '模拟实验',
                },
                {
                    key: 'optimization',
                    label: '优化算法',
                },
            ],
        },
        {
            key: 'achievements',
            icon: <TrophyOutlined />,
            label: '成果库',
        },
        {
            key: 'resources',
            icon: <DatabaseOutlined />,
            label: '资源配置',
        },
        {
            key: 'team',
            icon: <TeamOutlined />,
            label: '团队管理',
        },
        {
            key: 'analytics',
            icon: <BarChartOutlined />,
            label: '数据分析',
        },
    ];

    // 模拟数据
    const innovationStats = {
        totalProjects: 156,
        activeProjects: 42,
        completedProjects: 89,
        innovationIndex: 87.5,
        aiUtilization: 92.3,
        patentApplications: 28,
    };

    const projectData = [
        {
            id: 'PRJ001',
            name: 'AI驱动的药物研发平台',
            status: '进行中',
            progress: 75,
            team: '药物研发组',
            deadline: '2024-06-30',
            budget: '¥2,500,000',
        },
        {
            id: 'PRJ002',
            name: '智能材料设计系统',
            status: '已完成',
            progress: 100,
            team: '材料科学组',
            deadline: '2024-01-15',
            budget: '¥1,800,000',
        },
        {
            id: 'PRJ003',
            name: '量子计算应用研究',
            status: '规划中',
            progress: 15,
            team: '量子计算组',
            deadline: '2025-12-31',
            budget: '¥5,000,000',
        },
        {
            id: 'PRJ004',
            name: '绿色能源优化算法',
            status: '进行中',
            progress: 45,
            team: '能源技术组',
            deadline: '2024-09-15',
            budget: '¥3,200,000',
        },
    ];

    const achievementData = [
        {
            id: 'ACH001',
            title: '新型AI算法突破',
            type: '技术成果',
            authors: ['张三', '李四', '王五'],
            publishDate: '2024-01-10',
            citations: 45,
            status: '已发表',
        },
        {
            id: 'ACH002',
            title: '智能制造专利',
            type: '专利',
            authors: ['赵六', '钱七'],
            publishDate: '2024-01-08',
            citations: 12,
            status: '已授权',
        },
        {
            id: 'ACH003',
            title: 'AI辅助药物设计论文',
            type: '论文',
            authors: ['孙八', '周九', '吴十'],
            publishDate: '2024-01-05',
            citations: 78,
            status: '已发表',
        },
    ];

    const teamData = [
        {
            id: 'TM001',
            name: '张三',
            role: '首席科学家',
            department: 'AI算法组',
            projects: 5,
            publications: 23,
        },
        {
            id: 'TM002',
            name: '李四',
            role: '高级工程师',
            department: '数据科学组',
            projects: 3,
            publications: 15,
        },
        {
            id: 'TM003',
            name: '王五',
            role: '研究员',
            department: '应用研究组',
            projects: 4,
            publications: 18,
        },
    ];

    const columns = [
        {
            title: '项目编号',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: '项目名称',
            dataIndex: 'name',
            key: 'name',
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
            title: '进度',
            dataIndex: 'progress',
            key: 'progress',
            render: (progress: number) => <Progress percent={progress} size="small" />,
        },
        {
            title: '负责团队',
            dataIndex: 'team',
            key: 'team',
        },
        {
            title: '截止日期',
            dataIndex: 'deadline',
            key: 'deadline',
        },
        {
            title: '预算',
            dataIndex: 'budget',
            key: 'budget',
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

    const achievementColumns = [
        {
            title: '成果编号',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: '成果标题',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: '类型',
            dataIndex: 'type',
            key: 'type',
            render: (type: string) => {
                const color = type === '专利' ? 'gold' : type === '论文' ? 'blue' : 'green';
                return <Tag color={color}>{type}</Tag>;
            },
        },
        {
            title: '作者',
            dataIndex: 'authors',
            key: 'authors',
            render: (authors: string[]) => authors.join(', '),
        },
        {
            title: '发表日期',
            dataIndex: 'publishDate',
            key: 'publishDate',
        },
        {
            title: '引用次数',
            dataIndex: 'citations',
            key: 'citations',
        },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            render: (status: string) => (
                <Badge status={status === '已发表' ? 'success' : 'processing'} text={status} />
            ),
        },
    ];

    const teamColumns = [
        {
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '角色',
            dataIndex: 'role',
            key: 'role',
        },
        {
            title: '部门',
            dataIndex: 'department',
            key: 'department',
        },
        {
            title: '参与项目',
            dataIndex: 'projects',
            key: 'projects',
        },
        {
            title: '发表论文',
            dataIndex: 'publications',
            key: 'publications',
        },
        {
            title: '操作',
            key: 'action',
            render: () => (
                <Space size="small">
                    <Button type="link" size="small">详情</Button>
                    <Button type="link" size="small">分配项目</Button>
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
                            <h2>科技创新AI平台总览</h2>
                            <p>融合人工智能与科技创新的综合性应用平台</p>
                        </div>
                    </Card>
                </Col>
            </Row>

            <Row gutter={[16, 16]}>
                <Col xs={24} sm={12} md={6}>
                    <Card>
                        <Statistic
                            title="总项目数"
                            value={innovationStats.totalProjects}
                            prefix={<ProjectOutlined />}
                            styles={{ content: { color: '#1890ff' } }}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={6}>
                    <Card>
                        <Statistic
                            title="进行中项目"
                            value={innovationStats.activeProjects}
                            prefix={<ExperimentOutlined />}
                            styles={{ content: { color: '#52c41a' } }}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={6}>
                    <Card>
                        <Statistic
                            title="创新指数"
                            value={innovationStats.innovationIndex}
                            suffix="%"
                            prefix={<BulbOutlined />}
                            styles={{ content: { color: '#722ed1' } }}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={6}>
                    <Card>
                        <Statistic
                            title="AI使用率"
                            value={innovationStats.aiUtilization}
                            suffix="%"
                            prefix={<RobotOutlined />}
                            styles={{ content: { color: '#13c2c2' } }}
                        />
                    </Card>
                </Col>
            </Row>

            <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
                <Col xs={24} md={12}>
                    <Card title="项目进度概览" size="small">
                        <div style={{ marginBottom: 16 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                                <span>AI药物研发平台</span>
                                <span>75%</span>
                            </div>
                            <Progress percent={75} status="active" />
                        </div>
                        <div style={{ marginBottom: 16 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                                <span>智能材料设计系统</span>
                                <span>100%</span>
                            </div>
                            <Progress percent={100} status="success" />
                        </div>
                        <div style={{ marginBottom: 16 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                                <span>量子计算应用研究</span>
                                <span>15%</span>
                            </div>
                            <Progress percent={15} />
                        </div>
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                                <span>绿色能源优化算法</span>
                                <span>45%</span>
                            </div>
                            <Progress percent={45} status="active" />
                        </div>
                    </Card>
                </Col>
                <Col xs={24} md={12}>
                    <Card title="最新动态" size="small">
                        <Timeline
                            items={[
                                {
                                    content: 'AI药物研发平台取得阶段性突破，成功筛选出3个候选化合物',
                                    color: 'green',
                                },
                                {
                                    content: '智能材料设计系统完成验收，正式投入使用',
                                    color: 'blue',
                                },
                                {
                                    content: '量子计算研究项目获得国家重点研发计划资助',
                                    color: 'gold',
                                },
                                {
                                    content: '绿色能源优化算法在国际会议上获得最佳论文奖',
                                    color: 'purple',
                                },
                            ]}
                        />
                    </Card>
                </Col>
            </Row>

            <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
                <Col xs={24} md={12}>
                    <Card title="核心技术指标" size="small">
                        <Descriptions size="small" column={2}>
                            <Descriptions.Item label="专利申请数">{innovationStats.patentApplications}</Descriptions.Item>
                            <Descriptions.Item label="论文发表数">156</Descriptions.Item>
                            <Descriptions.Item label="技术转化率">68%</Descriptions.Item>
                            <Descriptions.Item label="国际合作项目">12</Descriptions.Item>
                        </Descriptions>
                    </Card>
                </Col>
                <Col xs={24} md={12}>
                    <Card title="团队贡献排行" size="small">
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {[
                                { name: '张三', contributions: 45, rank: 1 },
                                { name: '李四', contributions: 38, rank: 2 },
                                { name: '王五', contributions: 32, rank: 3 },
                            ].map((item) => (
                                <div key={item.rank} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <Avatar size="small">{item.rank}</Avatar>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontWeight: '500', fontSize: '14px' }}>{item.name}</div>
                                        <div style={{ color: '#666', fontSize: '12px' }}>贡献值: {item.contributions}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </Col>
            </Row>
        </div>
    );

    const renderProjects = () => (
        <Card title="项目管理">
            <Table
                columns={columns}
                dataSource={projectData}
                rowKey="id"
                size="small"
                pagination={{ pageSize: 10 }}
            />
        </Card>
    );

    const renderAchievements = () => (
        <Card title="成果库">
            <Table
                columns={achievementColumns}
                dataSource={achievementData}
                rowKey="id"
                size="small"
                pagination={{ pageSize: 10 }}
            />
        </Card>
    );

    const renderTeam = () => (
        <Card title="团队管理">
            <Table
                columns={teamColumns}
                dataSource={teamData}
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
            case 'projects':
                return renderProjects();
            case 'achievements':
                return renderAchievements();
            case 'team':
                return renderTeam();
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
            title="科创AI"
            subtitle="科技创新AI应用平台"
            menuItems={menuItems}
            defaultSelectedKey="dashboard"
            defaultOpenKey="research"
        >
            {renderContent()}
        </AdminLayout>
    );
};

export default ScienceAi;
