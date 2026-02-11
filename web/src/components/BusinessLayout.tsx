import type { BubbleListProps, ConversationItemType } from '@ant-design/x';
import {
    Attachments,
    type AttachmentsProps,
    Bubble,
    Conversations,
    Prompts,
    Sender,
    Suggestion,
    Think,
    Welcome,
} from '@ant-design/x';
import { BubbleListRef } from '@ant-design/x/es/bubble';
import XMarkdown, { type ComponentProps } from '@ant-design/x-markdown';
import type { SSEFields } from '@ant-design/x-sdk';
import {
    DeepSeekChatProvider,
    useXChat,
    useXConversations,
    XModelParams,
    XModelResponse,
    XRequest,
} from '@ant-design/x-sdk';
import {
    AppstoreAddOutlined,
    CloudUploadOutlined,
    CommentOutlined,
    CopyOutlined,
    DeleteOutlined,
    DislikeOutlined,
    DollarOutlined,
    ExportOutlined,
    EyeOutlined,
    LikeOutlined,
    LoginOutlined,
    OpenAIFilled,
    PaperClipOutlined,
    PlusOutlined,
    ProductOutlined,
    QuestionCircleOutlined,
    ReloadOutlined,
    ScheduleOutlined,
    ShoppingCartOutlined,
    UserOutlined,
} from '@ant-design/icons';
import {
    Button,
    Card,
    Flex,
    Form,
    GetProp,
    GetRef,
    Input,
    message,
    Modal,
    Popover,
    Select,
    Space,
    Spin,
    Statistic,
    Table,
    Tag,
    Typography,
    theme
} from 'antd';
import { createStyles } from 'antd-style';
import dayjs from 'dayjs';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import '@ant-design/x-markdown/themes/light.css';
import { useCollapsed, useSidebarWidth, useApplicationSidebarCollapsed } from '@/store';
import SendIcon from '@/components/common/SendIcon';

const { Option } = Select;

// ==================== 通用样式定义 ====================
const useCopilotStyle = createStyles(({ token, css }) => {
    return {
        copilotChat: css`
            display: flex;
            flex-direction: column;
            background: ${token.colorBgContainer};
            color: ${token.colorText};
            width: 400px;
            height: 100%;
            border-left: 1px solid ${token.colorBorder};
        `,
        chatHeader: css`
            height: 52px;
            box-sizing: border-box;
            border-bottom: 1px solid ${token.colorBorder};
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 10px 0 16px;
        `,
        headerTitle: css`
            font-weight: 600;
            font-size: 15px;
        `,
        headerButton: css`
            font-size: 18px;
        `,
        conversations: css`
            width: 300px;
            .ant-conversations-list {
                padding-inline-start: 0;
            }
        `,
        chatList: css`
            margin-block-start: ${token.margin}px;
            display: flex;
            height: calc(100% - 194px);
            flex-direction: column;
            flex: 1;
            overflow: auto;
        `,
        fullWidthBubble: css`
            width: 100% !important;
            max-width: none !important;

            .ant-bubble-body {
                width: 100% !important;
                max-width: none !important;
                box-sizing: border-box !important;
            }

            .ant-bubble-content {
                width: 100% !important;
                max-width: none !important;
            }
        `,
        chatWelcome: css`
            margin-inline: ${token.margin}px;
            padding: 12px 16px;
            border-radius: 2px 12px 12px 12px;
            background: ${token.colorBgTextHover};
            margin-bottom: ${token.margin}px;
        `,
        loadingMessage: css`
            background-image: linear-gradient(90deg, #ff6b23 0%, #af3cb8 31%, #53b6ff 89%);
            background-size: 100% 2px;
            background-repeat: no-repeat;
            background-position: bottom;
        `,
        chatSend: css`
            padding: ${token.padding}px;
            margin-top: auto;
        `,
        speechButton: css`
            font-size: 18px;
            color: ${token.colorText} !important;
        `,
    };
});

const useWorkareaStyle = createStyles(({ token, css }) => {
    return {
        layout: css`
            height: calc(100vh - 39px);
            display: flex;
            background: ${token.colorBgLayout};
        `,
        header: css`
            height: 39px;
            background: ${token.colorBgContainer};
            border-bottom: 1px solid ${token.colorBorder};
            display: flex;
            align-items: center;
            justify-content: space-between;
            position: fixed;
            top: 0;
            right: 0;
            z-index: 1100;
            padding: 0 24px;
        `,
        innerHeader: css`
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 16px 0 12px 0;
            margin-bottom: 16px;
            border-bottom: 1px solid ${token.colorBorderSecondary};
        `,
        headerLeft: css`
            display: flex;
            align-items: center;
            gap: 24px;
        `,
        logo: css`
            display: flex;
            align-items: center;
            gap: 12px;
            font-size: 18px;
            font-weight: 600;
            color: ${token.colorText};
        `,
        leftPanel: css`
            flex: 1;
            min-width: 0;
            background: ${token.colorBgContainer};
            overflow-y: auto;
            padding: 24px;
            margin-top: 39px;
            height: calc(100vh - 39px);
        `,
        rightPanel: css`
            width: 400px;
            background: ${token.colorBgContainer};
            border-left: 1px solid ${token.colorBorder};
            margin-top: 39px;
            height: calc(100vh - 39px);
        `,
        leftContent: css`
            overflow: auto;
            width: 100%;
        `,
    };
});

// ==================== 通用对话组件 ====================
const ThinkComponent = React.memo((props: ComponentProps) => {
    const [title, setTitle] = React.useState('正在深度思考...');
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        if (props.streamStatus === 'done') {
            setTitle('思考完成');
            setLoading(false);
        }
    }, [props.streamStatus]);

    return (
        <Think title={title} loading={loading}>
            {props.children}
        </Think>
    );
});

/**
 * 🔔 请替换为自己的 API 配置
 */
const providerCaches = new Map<string, DeepSeekChatProvider>();
const providerFactory = (conversationKey: string) => {
    if (!providerCaches.get(conversationKey)) {
        providerCaches.set(
            conversationKey,
            new DeepSeekChatProvider({
                request: XRequest<XModelParams, Partial<Record<SSEFields, XModelResponse>>>(
                    'https://api.x.ant.design/api/big_model_glm-4.5-flash',
                    {
                        manual: true,
                        params: {
                            stream: true,
                            thinking: {
                                type: 'disabled',
                            },
                            model: 'glm-4.5-flash',
                        },
                    },
                ),
            }),
        );
    }
    return providerCaches.get(conversationKey);
};

// ==================== 通用业务组件 ====================
// 模拟业务数据接口
interface OrderData {
    id: string;
    customer: string;
    product: string;
    amount: number;
    status: 'pending' | 'processing' | 'completed' | 'cancelled';
    date: string;
    region: string;
}

interface SalesData {
    name: string;
    value: number;
    color: string;
}

// 自定义业务组件 - 从模型数据获取的销售仪表板
const Salesdashboard = React.memo(({ children, streamStatus }: ComponentProps) => {
    const [salesData, setSalesData] = useState<SalesData[]>([]);
    const [totalSales, setTotalSales] = useState(0);
    const [totalOrders, setTotalOrders] = useState(0);
    const [newCustomers, setNewCustomers] = useState(0);

    useEffect(() => {
        if (children) {
            // 从模型返回的数据中解析销售信息
            try {
                const parsedData = typeof children === 'string' ? JSON.parse(children) : children;

                if (parsedData.sales) {
                    setSalesData(parsedData.sales);
                }
                if (parsedData.totalSales) {
                    setTotalSales(parsedData.totalSales);
                }
                if (parsedData.totalOrders) {
                    setTotalOrders(parsedData.totalOrders);
                }
                if (parsedData.newCustomers) {
                    setNewCustomers(parsedData.newCustomers);
                }
            } catch {
                // 如果解析失败，使用默认数据
                const defaultData = [
                    { name: '电子产品', value: 45000, color: '#3b82f6' },
                    { name: '服装', value: 32000, color: '#8b5cf6' },
                    { name: '家居用品', value: 28000, color: '#10b981' },
                ];
                setSalesData(defaultData);
                setTotalSales(115000);
                setTotalOrders(342);
                setNewCustomers(67);
            }
        } else {
            // 默认数据
            const defaultData = [
                { name: '电子产品', value: 45000, color: '#3b82f6' },
                { name: '服装', value: 32000, color: '#8b5cf6' },
                { name: '家居用品', value: 28000, color: '#10b981' },
            ];
            setSalesData(defaultData);
            setTotalSales(115000);
            setTotalOrders(342);
            setNewCustomers(67);
        }
    }, [children]);

    if (streamStatus === 'loading') return;
    return (
        <div style={{ padding: '20px' }}>
            <Flex vertical gap="large">
                <Flex justify="space-between" align="center">
                    销售仪表板 (从模型数据获取)
                    <Tag color="blue">实时数据</Tag>
                </Flex>

                <Flex gap="middle" wrap>
                    <Card style={{ flex: 1, minWidth: 200 }}>
                        <Statistic
                            title="总销售额"
                            value={totalSales}
                            prefix={<DollarOutlined />}
                            precision={2}
                            styles={{ content: { color: '#3f8600' } }}
                        />
                    </Card>
                    <Card style={{ flex: 1, minWidth: 200 }}>
                        <Statistic
                            title="订单总数"
                            value={totalOrders}
                            prefix={<ShoppingCartOutlined />}
                            styles={{ content: { color: '#1890ff' } }}
                        />
                    </Card>
                    <Card style={{ flex: 1, minWidth: 200 }}>
                        <Statistic
                            title="新增客户"
                            value={newCustomers}
                            prefix={<UserOutlined />}
                            styles={{ content: { color: '#722ed1' } }}
                        />
                    </Card>
                </Flex>

                <Flex gap="large" wrap>
                    <Card title="销售分布" style={{ flex: 1, minWidth: 300 }}>
                        <div style={{ padding: '20px' }}>
                            {salesData.map((item, index) => (
                                <div key={index} style={{ marginBottom: 12 }}>
                                    <Flex justify="space-between" align="center">
                                        <span>{item.name}</span>
                                        <Tag color={item.color}>¥{item.value.toLocaleString()}</Tag>
                                    </Flex>
                                </div>
                            ))}
                        </div>
                    </Card>

                    <Card title="数据说明" style={{ flex: 1, minWidth: 300 }}>
                        <div style={{ padding: '20px' }}>
                            <p>🤖 以上数据由AI模型实时生成</p>
                            <p>📊 数据格式: JSON格式，包含sales、totalSales、totalOrders、newCustomers字段</p>
                            <p>💡 示例格式: sales数组包含name和value字段</p>
                        </div>
                    </Card>
                </Flex>
            </Flex>
        </div>
    );
});

// 自定义业务组件 - 订单管理表格
const OrderManager = React.memo(() => {
    const [orders, setOrders] = useState<OrderData[]>([]);
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [editingOrder, setEditingOrder] = useState<OrderData | null>(null);
    const [form] = Form.useForm();

    const fetchOrders = useCallback(async () => {
        setLoading(true);
        try {
            await new Promise((resolve) => setTimeout(resolve, 1000));

            const mockOrders: OrderData[] = [
                {
                    id: '714',
                    customer: '李先生',
                    product: '亚历士赞歌酒庄西拉干红葡萄酒750ml*2瓶法国罗纳河谷原瓶进口',
                    amount: 139.00,
                    status: 'completed',
                    date: '2024-01-15',
                    region: '北京',
                },
                {
                    id: '713',
                    customer: '王女士',
                    product: '汾酒官方旗舰店山西杏花村酒53度汾酒青花20 500ml白酒送礼清香型',
                    amount: 429.00,
                    status: 'processing',
                    date: '2024-01-16',
                    region: '上海',
                },
                {
                    id: '711',
                    customer: '张先生',
                    product: '老龙口古窖1662文武双全浓香型白酒500ml45度42度升学宴送礼宴会',
                    amount: 299.00,
                    status: 'pending',
                    date: '2024-01-17',
                    region: '广州',
                },
                {
                    id: '710',
                    customer: '刘女士',
                    product: '绝版2021年老酒浓香型固态法纯粮泸州老窖泸州二曲酒仅次头曲满',
                    amount: 59.00,
                    status: 'completed',
                    date: '2024-01-18',
                    region: '深圳',
                },
                {
                    id: '709',
                    customer: '陈先生',
                    product: '泸州老窖 新轻奢40.9度高光酒G3酒500ml商务浓香型白酒',
                    amount: 680.00,
                    status: 'processing',
                    date: '2024-01-19',
                    region: '成都',
                },
                {
                    id: '707',
                    customer: '杨女士',
                    product: '泸州老窖国窖1573 （wow虎藏浓）虎年新春礼酒 52度 浓香型酒 250ml*2瓶',
                    amount: 268.00,
                    status: 'completed',
                    date: '2024-01-20',
                    region: '杭州',
                },
                {
                    id: '706',
                    customer: '赵先生',
                    product: '泸州老窖典藏紫砂陶装08版52度500ml/瓶+52度二峨特曲浓香型白酒',
                    amount: 358.00,
                    status: 'pending',
                    date: '2024-01-21',
                    region: '南京',
                },
                {
                    id: '705',
                    customer: '孙女士',
                    product: '百年泸州老窖窖龄30年双瓶酒具礼盒装 52度500ml*2瓶',
                    amount: 288.00,
                    status: 'completed',
                    date: '2024-01-22',
                    region: '武汉',
                },
                {
                    id: '704',
                    customer: '周先生',
                    product: '郎酒红花郎十（10）53度酱香型白酒双瓶礼盒装送礼袋',
                    amount: 379.00,
                    status: 'processing',
                    date: '2024-01-23',
                    region: '西安',
                },
                {
                    id: '703',
                    customer: '吴女士',
                    product: '剑南春 52度蓝盒珍品绵竹大曲475mL 高度白酒',
                    amount: 439.00,
                    status: 'completed',
                    date: '2024-01-24',
                    region: '重庆',
                },
                {
                    id: '702',
                    customer: '郑先生',
                    product: '五粮液 第八代小酒 浓香型 52° 50ml',
                    amount: 999.00,
                    status: 'pending',
                    date: '2024-01-25',
                    region: '苏州',
                },
                {
                    id: '701',
                    customer: '钱女士',
                    product: '小拉菲红酒拉菲古堡副牌原瓶进口干红酒葡萄酒拉菲珍宝Lafite礼盒',
                    amount: 4580.00,
                    status: 'completed',
                    date: '2024-01-26',
                    region: '天津',
                },
                {
                    id: '699',
                    customer: '冯先生',
                    product: '国窖1573 （wow虎藏浓）虎年新春礼酒 52度 浓香型酒 250ml*2瓶',
                    amount: 800.00,
                    status: 'processing',
                    date: '2024-01-27',
                    region: '郑州',
                },
                {
                    id: '698',
                    customer: '蒋女士',
                    product: '亚历士赞歌酒庄西拉干红葡萄酒750ml*2瓶法国罗纳河谷原瓶进口',
                    amount: 139.00,
                    status: 'completed',
                    date: '2024-01-28',
                    region: '长沙',
                },
                {
                    id: '696',
                    customer: '沈先生',
                    product: '法国勃艮第丘黑皮诺AOC红酒进口干红葡萄酒双支礼盒装',
                    amount: 799.00,
                    status: 'pending',
                    date: '2024-01-29',
                    region: '青岛',
                },
                {
                    id: '695',
                    customer: '韩女士',
                    product: '意大利原瓶进口GANCIA甘嘉酒庄天然型普塞克高泡格雷拉起泡葡萄酒',
                    amount: 180.00,
                    status: 'completed',
                    date: '2024-01-30',
                    region: '大连',
                },
                {
                    id: '694',
                    customer: '杨先生',
                    product: '法国勃艮第丘黑皮诺AOC红酒进口干红葡萄酒双支礼盒装',
                    amount: 148.00,
                    status: 'processing',
                    date: '2024-01-31',
                    region: '宁波',
                },
                {
                    id: '693',
                    customer: '朱女士',
                    product: '12°P泸州老窖百调精酿啤酒整箱礼盒装大容量980ml*4瓶官方正品',
                    amount: 88.00,
                    status: 'completed',
                    date: '2024-02-01',
                    region: '厦门',
                },
                {
                    id: '690',
                    customer: '秦先生',
                    product: '舒富红葡萄酒14度187ml半干型红酒西拉赤霞珠美乐试饮装晚安酒',
                    amount: 29.00,
                    status: 'pending',
                    date: '2024-02-02',
                    region: '福州',
                },
            ];

            setOrders(mockOrders);
        } catch (_error) {
            message.error('获取订单失败');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchOrders();
    }, [fetchOrders]);

    const handleDelete = async (id: string) => {
        try {
            await new Promise((resolve) => setTimeout(resolve, 500));
            setOrders((prev) => prev.filter((order) => order.id !== id));
            message.success('订单已删除');
        } catch (_error) {
            message.error('删除失败');
        }
    };

    const handleEdit = (order: OrderData) => {
        setEditingOrder(order);
        form.setFieldsValue(order);
        setModalVisible(true);
    };

    const handleSubmit = async (values: Partial<OrderData>) => {
        try {
            await new Promise((resolve) => setTimeout(resolve, 800));

            if (editingOrder) {
                setOrders((prev) =>
                    prev.map((order) => (order.id === editingOrder.id ? { ...order, ...values } : order)),
                );
                message.success('订单已更新');
            } else {
                const newOrder: OrderData = {
                    id: `ORD${String(Date.now()).slice(-3)}`,
                    customer: values.customer || '',
                    product: values.product || '',
                    amount: values.amount || 0,
                    status: values.status || 'pending',
                    date: new Date().toISOString().split('T')[0],
                    region: values.region || '',
                };
                setOrders((prev) => [...prev, newOrder]);
                message.success('订单已创建');
            }

            setModalVisible(false);
            form.resetFields();
            setEditingOrder(null);
        } catch (_error) {
            message.error('操作失败');
        }
    };

    const columns = [
        { title: '订单号', dataIndex: 'id', key: 'id', width: '15%' },
        { title: '客户', dataIndex: 'customer', key: 'customer', width: '15%' },
        {
            title: '产品',
            dataIndex: 'product',
            key: 'product',
            width: '25%',
            render: (product: string) => (
                <Typography.Text
                    ellipsis={{ tooltip: product }}
                    style={{ width: '100%' }}
                >
                    {product}
                </Typography.Text>
            )
        },
        { title: '金额', dataIndex: 'amount', key: 'amount', width: '10%', render: (amount: number) => `¥${amount}` },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            width: '10%',
            render: (status: string) => {
                const colors = {
                    pending: 'orange',
                    processing: 'blue',
                    completed: 'green',
                    cancelled: 'red',
                };
                const labels = {
                    pending: '待处理',
                    processing: '处理中',
                    completed: '已完成',
                    cancelled: '已取消',
                };
                return (
                    <Tag color={colors[status as keyof typeof colors]}>
                        {labels[status as keyof typeof labels]}
                    </Tag>
                );
            },
        },
        { title: '日期', dataIndex: 'date', key: 'date', width: '10%' },
        { title: '地区', dataIndex: 'region', key: 'region', width: '10%' },
        {
            title: '操作',
            key: 'action',
            width: '5%',
            render: (_: any, record: OrderData) => (
                <Space>
                    <Button type="link" icon={<EyeOutlined />} onClick={() => handleEdit(record)} />
                    <Button
                        type="link"
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => handleDelete(record.id)}
                    />
                </Space>
            ),
        },
    ];

    return (
        <div style={{ padding: '20px' }}>
            <Flex vertical gap="middle">
                <Flex justify="space-between" align="center">
                    <h2>订单管理</h2>
                    <Button type="primary" icon={<PlusOutlined />} onClick={() => setModalVisible(true)}>
                        新建订单
                    </Button>
                </Flex>

                <Table
                    columns={columns}
                    dataSource={orders}
                    loading={loading}
                    rowKey="id"
                    pagination={{ pageSize: 5 }}
                    tableLayout="auto"
                    scroll={{x: 'max-content'}}
                    style={{ width: '100%' }}
                />

                <Modal
                    title={editingOrder ? '编辑订单' : '新建订单'}
                    open={modalVisible}
                    onCancel={() => {
                        setModalVisible(false);
                        form.resetFields();
                        setEditingOrder(null);
                    }}
                    onOk={() => form.submit()}
                >
                    <Form form={form} onFinish={handleSubmit} layout="vertical">
                        <Form.Item name="customer" label="客户名称" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="product" label="产品名称" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="amount" label="金额" rules={[{ required: true }]}>
                            <Input type="number" />
                        </Form.Item>
                        <Form.Item name="status" label="状态" rules={[{ required: true }]}>
                            <Select>
                                <Option value="pending">待处理</Option>
                                <Option value="processing">处理中</Option>
                                <Option value="completed">已完成</Option>
                                <Option value="cancelled">已取消</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item name="region" label="地区" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                    </Form>
                </Modal>
            </Flex>
        </div>
    );
});

// ==================== 通用ChatPanel组件 ====================
interface ChatPanelProps {
    className?: string;
    conversationsItems: Array<{ key: string; label: string; group: string }>;
    suggestions: Array<{ label: string; value: string; icon?: React.ReactNode; children?: Array<{ label: string; value: string }> }>;
    questions: string[];
    welcomeTitle: string;
    welcomeDescription: string;
    headerTitle?: string;
    actionButtons?: Array<{
        icon: React.ReactNode;
        text: string;
        onClick: () => void;
    }>;
    placeholder?: string;
}

const ChatPanel: React.FC<ChatPanelProps> = ({
    className,
    conversationsItems,
    suggestions,
    questions,
    welcomeTitle,
    welcomeDescription,
    headerTitle = '🤖 AI助手',
    actionButtons = [],
    placeholder = '告诉我你想让我帮你做什么...'
}) => {
    const { styles } = useCopilotStyle();
    const attachmentsRef = useRef<GetRef<typeof Attachments>>(null);

    // ==================== State ====================
    const {
        conversations,
        activeConversationKey,
        setActiveConversationKey,
        addConversation,
        getConversation,
        setConversation,
    } = useXConversations({
        defaultConversations: conversationsItems,
        defaultActiveConversationKey: conversationsItems[0].key,
    });
    const [attachmentsOpen, setAttachmentsOpen] = useState(false);
    const [files, setFiles] = useState<GetProp<AttachmentsProps, 'items'>>([]);

    const [inputValue, setInputValue] = useState('');

    const listRef = useRef<BubbleListRef>(null);

    // ==================== Runtime ====================

    const { onRequest, messages, isRequesting, abort } = useXChat({
        provider: providerFactory(activeConversationKey),
        conversationKey: activeConversationKey,
        requestPlaceholder: () => {
            return {
                content: '暂无数据',
                role: 'assistant',
            };
        },
        requestFallback: (_, { error, errorInfo, messageInfo }) => {
            if (error.name === 'AbortError') {
                return {
                    content: messageInfo?.message?.content || '请求已中止',
                    role: 'assistant',
                };
            }
            return {
                content: errorInfo?.error?.message || '请求失败',
                role: 'assistant',
            };
        },
    });

    // ==================== Event ====================
    const handleUserSubmit = (val: string) => {
        onRequest({
            messages: [{ role: 'user', content: val }],
        });
        listRef.current?.scrollTo({ top: 'bottom' });

        // 会话标题模拟
        const conversation = getConversation(activeConversationKey);
        if (conversation?.label === '新会话') {
            setConversation(activeConversationKey, { ...conversation, label: val?.slice(0, 20) });
        }
    };

    const onPasteFile = (files: FileList) => {
        for (const file of files) {
            attachmentsRef.current?.upload(file);
        }
        setAttachmentsOpen(true);
    };

    // ==================== Nodes ====================
    const chatHeader = (
        <div className={`business-chat-header ${styles.chatHeader}`}>
            <div className={`business-chat-title ${styles.headerTitle}`}>{headerTitle}</div>
            <Space size={0} className="business-chat-actions">
                <Button
                    type="text"
                    icon={<PlusOutlined />}
                    className={`business-chat-new-conversation ${styles.headerButton}`}
                    onClick={() => {
                        if (messages?.length) {
                            const timeNow = dayjs().valueOf().toString();
                            addConversation({ key: timeNow, label: '新会话', group: '今天' });
                            setActiveConversationKey(timeNow);
                        } else {
                            message.error('当前已是新会话');
                        }
                    }}
                />
                <Popover
                    placement="bottom"
                    styles={{ container: { padding: 0, maxHeight: 600 } }}
                    content={
                        <Conversations
                            items={conversations?.map((i) =>
                                i.key === activeConversationKey ? { ...i, label: `[当前] ${i.label}` } : i,
                            )}
                            activeKey={activeConversationKey}
                            groupable
                            onActiveChange={setActiveConversationKey}
                            styles={{ item: { padding: '0 8px' } }}
                            className={`business-chat-conversations ${styles.conversations}`}
                        />
                    }
                >
                    <Button type="text" icon={<CommentOutlined />} className={`business-chat-history ${styles.headerButton}`} />
                </Popover>
            </Space>
        </div>
    );

    const chatList = (
        <div className={`business-chat-list ${styles.chatList}`}>
            {messages?.length ? (
                <Bubble.List
                    ref={listRef}
                    className="business-chat-messages"
                    style={{ paddingInline: 16 }}
                    items={messages?.map((i) => ({
                        ...i.message,
                        key: i.id,
                        status: i.status,
                        loading: i.status === 'loading',
                    }))}
                    role={role}
                />
            ) : (
                <>
                    <Welcome
                        variant="borderless"
                        title={welcomeTitle}
                        description={welcomeDescription}
                        className={`business-chat-welcome ${styles.chatWelcome}`}
                    />

                    <Prompts
                        vertical
                        title="快捷操作"
                        items={questions.map((i) => ({ key: i, description: i }))}
                        className="business-chat-prompts"
                        onItemClick={(info) => handleUserSubmit(info?.data?.description as string)}
                        style={{
                            marginInline: 16,
                        }}
                        styles={{
                            title: { fontSize: 14 },
                        }}
                    />
                </>
            )}
        </div>
    );

    const sendHeader = (
        <Sender.Header
            title="上传文件"
            className="business-chat-attachment-header"
            styles={{ content: { padding: 0 } }}
            open={attachmentsOpen}
            onOpenChange={setAttachmentsOpen}
            forceRender
        >
            <Attachments
                ref={attachmentsRef}
                className="business-chat-attachments"
                beforeUpload={() => false}
                items={files}
                onChange={({ fileList }) => setFiles(fileList)}
                placeholder={(type) =>
                    type === 'drop'
                        ? { title: '拖拽文件到此处' }
                        : {
                              icon: <CloudUploadOutlined />,
                              title: '上传文件',
                              description: '点击或拖拽文件到此区域上传',
                          }
                }
            />
        </Sender.Header>
    );

    const chatSender = (
        <Flex vertical gap={12} className={`business-chat-sender ${styles.chatSend}`}>
            <Flex gap={12} align="center" className="business-chat-action-buttons">
                {actionButtons.map((btn, index) => (
                    <Button key={index} icon={btn.icon} onClick={btn.onClick} className="business-chat-action-button">
                        {btn.text}
                    </Button>
                ))}
                <Button icon={<AppstoreAddOutlined />} className="business-chat-more-button">更多</Button>
            </Flex>
            <Suggestion items={suggestions} onSelect={(itemVal) => setInputValue(`[${itemVal}]:`)}>
                {({ onTrigger, onKeyDown }) => (
                    <Sender
                        loading={isRequesting}
                        value={inputValue}
                        className="business-chat-input"
                        onChange={(v) => {
                            onTrigger(v === '/');
                            setInputValue(v);
                        }}
                        onSubmit={() => {
                            handleUserSubmit(inputValue);
                            setInputValue('');
                        }}
                        onCancel={() => {
                            abort();
                        }}
                        allowSpeech
                        placeholder={placeholder}
                        onKeyDown={onKeyDown}
                        header={sendHeader}
                        prefix={
                            <Button
                                type="text"
                                className="business-chat-attachment-button"
                                icon={<PaperClipOutlined style={{ fontSize: 18 }} />}
                                onClick={() => setAttachmentsOpen(!attachmentsOpen)}
                            />
                        }
                        onPasteFile={onPasteFile}
                        footer={(_, info) => {
                            const { SendButton, LoadingButton } = info.components;
                            return (
                                <Flex justify="end" align="center">
                                    {isRequesting ? (
                                        <LoadingButton
                                            type="default"
                                            variant="filled"
                                            icon={
                                                <Spin
                                                    style={{
                                                        display: 'flex',
                                                    }}
                                                    styles={{
                                                        indicator: {
                                                            color: '#fff',
                                                        },
                                                    }}
                                                    size="small"
                                                />
                                            }
                                            disabled
                                        />
                                    ) : (
                                        <SendButton
                                            type="text"
                                            icon={<SendIcon />}
                                            disabled={false}
                                            className="large-screen-send-btn"
                                        />
                                    )}
                                </Flex>
                            );
                        }}
                    />
                )}
            </Suggestion>
        </Flex>
    );

    return (
        <div className={`business-chat-panel ${styles.copilotChat} ${className || ''}`}>
            {chatHeader}
            {chatList}
            {chatSender}
        </div>
    );
};

const role: BubbleListProps['role'] = {
    assistant: {
        placement: 'start',
        footer: (
            <div style={{ display: 'flex' }}>
                <Button type="text" size="small" icon={<ReloadOutlined />} />
                <Button type="text" size="small" icon={<CopyOutlined />} />
                <Button type="text" size="small" icon={<LikeOutlined />} />
                <Button type="text" size="small" icon={<DislikeOutlined />} />
            </div>
        ),
        contentRender(content: string) {
            const newContent = content.replace(/\n\n/g, '<br/><br/>');
            return (
                <XMarkdown
                    content={newContent}
                    components={{
                        think: ThinkComponent,
                    }}
                />
            );
        },
    },
    user: { placement: 'end' },
};

// ==================== 通用Layout组件 ====================
interface BusinessLayoutProps {
    children: React.ReactNode;
    title: string;
    logoSrc?: string;
    innerHeaderTitle: string;
    showMerchantSelector?: boolean;
    showPlatformSelector?: boolean;
    onEnterSystem?: (selectedMerchant?: string, selectedPlatform?: string) => void;
    customInnerHeader?: React.ReactNode;
}

const BusinessLayout: React.FC<BusinessLayoutProps> = ({
    children,
    title,
    logoSrc = "/src/assets/images/logo.png",
    innerHeaderTitle,
    showMerchantSelector = false,
    showPlatformSelector = false,
    onEnterSystem,
    customInnerHeader,
}) => {
    // 模拟商户数据
    const merchants = [
        { value: '珍酒城旗舰店', label: '珍酒城旗舰店' },
        { value: '珍酒城北京分店', label: '珍酒城北京分店' },
        { value: '珍酒城上海分店', label: '珍酒城上海分店' },
        { value: '珍酒城广州分店', label: '珍酒城广州分店' },
        { value: '珍酒城成都分店', label: '珍酒城成都分店' },
    ];

    // 平台类型数据
    const platforms = [
        { value: 'platform', label: '平台管理' },
        { value: 'merchant', label: '商户管理' },
    ];
    const { styles } = useWorkareaStyle();
    const { token } = theme.useToken();
    const collapsed = useCollapsed();
    const applicationSidebarCollapsed = useApplicationSidebarCollapsed();
    const sidebarWidth = useSidebarWidth();

    // 商户和平台选择状态
    const [selectedMerchant, setSelectedMerchant] = React.useState('珍酒城旗舰店');
    const [selectedPlatform, setSelectedPlatform] = React.useState('merchant');

    // 强制覆盖Bubble样式
    React.useEffect(() => {
        const style = document.createElement('style');
        style.textContent = `
            .ant-bubble .ant-bubble-body {
                width: 100% !important;
                max-width: none !important;
                box-sizing: border-box !important;
            }
            .ant-bubble .ant-bubble-content {
                width: 100% !important;
                max-width: none !important;
            }
            .ant-bubble {
                width: 100% !important;
                max-width: none !important;
            }
        `;
        document.head.appendChild(style);

        return () => {
            document.head.removeChild(style);
        };
    }, []);

    return (
        <>
            <div className={`business-layout-main ${styles.layout}`}>
                {/* 左侧面板 - 业务内容 */}
                <div className={`business-layout-left-panel ${styles.leftPanel}`}>
                    {/* 内部头部 */}
                    <div className={`business-layout-inner-header ${styles.innerHeader}`}>
                        <div className="business-layout-inner-title" style={{ fontSize: '16px', fontWeight: '600', color: token.colorText }}>
                            {innerHeaderTitle}
                        </div>
                        <Space className="business-layout-action-buttons">
                            {showPlatformSelector && (
                                <Select
                                    value={selectedPlatform}
                                    onChange={(value) => {
                                        setSelectedPlatform(value);
                                        // 如果切换到平台模式，清空商户选择
                                        if (value === 'platform') {
                                            setSelectedMerchant('');
                                        } else if (!selectedMerchant) {
                                            setSelectedMerchant('珍酒城旗舰店');
                                        }
                                    }}
                                    style={{ width: 120 }}
                                    placeholder="选择平台"
                                    className="business-layout-platform-selector"
                                    options={platforms}
                                />
                            )}
                            {showMerchantSelector && selectedPlatform === 'merchant' && (
                                <Select
                                    value={selectedMerchant}
                                    onChange={setSelectedMerchant}
                                    style={{ width: 140 }}
                                    placeholder="选择商户"
                                    className="business-layout-merchant-selector"
                                    options={merchants}
                                />
                            )}
                            <Button
                                style={{
                                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                    border: 'none',
                                    color: 'white',
                                    fontWeight: 'bold'
                                }}
                                className="business-layout-enter-button"
                                icon={<LoginOutlined />}
                                onClick={() => {
                                    if (onEnterSystem) {
                                        onEnterSystem(selectedMerchant, selectedPlatform);
                                    } else {
                                        message.info(`正在进入 ${selectedPlatform === 'platform' ? '平台' : selectedMerchant} 系统...`);
                                    }
                                }}
                            >
                                进入系统
                            </Button>
                            <Button
                                icon={<ExportOutlined />}
                                className="business-layout-export-button"
                                onClick={() => message.info('正在导出数据...')}
                            >
                                导出数据
                            </Button>
                            <Button
                                icon={<QuestionCircleOutlined />}
                                className="business-layout-help-button"
                                onClick={() => message.info('查看帮助文档')}
                            >
                                帮助
                            </Button>
                            <Button
                                icon={<ReloadOutlined />}
                                className="business-layout-reload-button"
                                onClick={() => window.location.reload()}
                            >
                                重新渲染
                            </Button>
                        </Space>
                    </div>

                    {customInnerHeader}

                    <Flex vertical gap="small" className={`business-layout-content ${styles.leftContent}`}>
                        {children}
                    </Flex>
                </div>

                {/* 右侧面板占位符 - 由各个业务页面提供 */}
                <div className={`business-layout-right-panel ${styles.rightPanel}`}>
                </div>
            </div>
        </>
    );
};

export { BusinessLayout, ChatPanel, Salesdashboard, OrderManager, ThinkComponent };
export type { BusinessLayoutProps, ChatPanelProps };
