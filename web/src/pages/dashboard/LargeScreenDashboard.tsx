import {
    OpenAIOutlined,
    SyncOutlined,
    AntDesignOutlined,
    ApiOutlined,
    CodeOutlined,
    EditOutlined,
    FileImageOutlined,
    PaperClipOutlined,
    PlusOutlined,
    ProfileOutlined,
    SearchOutlined,
    TableOutlined,
    DeleteOutlined,
    DollarOutlined,
    ShoppingCartOutlined,
    UserOutlined,
    LoadingOutlined,
    CheckCircleOutlined,
    SafetyCertificateOutlined,
} from '@ant-design/icons';
import adapterApi from '@/adapter/api';
import {
    Actions,
    Bubble,
    BubbleListProps,
    Sender,
    SenderProps,
    XProvider,
} from '@ant-design/x';
import XMarkdown from '@ant-design/x-markdown';
import {
    DeepSeekChatProvider,
    SSEFields,
    useXChat,
    XModelParams,
    XModelResponse,
    XRequest,
} from '@ant-design/x-sdk';
import {
    Flex,
    GetRef,
    Spin,
    Typography,
    Button,
    message,
    Dropdown,
    MenuProps,
    Divider,
    Card,
    Statistic,
    Tag,
    Table,
    Space,
    Modal,
    Form,
    Input,
    InputNumber,
    Select,
    Popconfirm,
} from 'antd';
import { createStyles } from 'antd-style';
import { clsx } from 'clsx';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import '@ant-design/x-markdown/themes/light.css';
import '@ant-design/x-markdown/themes/dark.css';
import { BubbleListRef } from '@ant-design/x/es/bubble';
import { useMarkdownTheme } from '@/lib/x-markdown/demo/_utils';
import { useLocale, useTheme } from '@/store';
import { useNavigate } from 'react-router-dom';

import SuggestionDemo from '@/components/SuggestionDemo';
import SloganAnimation from '@/components/SloganAnimation';
import SendIcon from '@/components/common/SendIcon';

type SlotConfig = SenderProps['slotConfig'];

const zhenjiuchengSlotConfig: SlotConfig = [
  { type: 'text', value: '请' },
  { type: 'tag', key: 'agent_tag', props: { label: '@工软助手 ', value: 'zhenjiucheng_assistant' } },
  { type: 'text', value: '帮我' },
  {
    type: 'select',
    key: 'main_action',
    props: {
      defaultValue: '生成工软产品列表相关信息',
      options: [
        '生成工软产品列表相关信息',
        '审核最近上传的新商品是否符合上架标准',
        '检查今天所有订单的返现状态，确保已正确发放',
        '关闭即将到期的限时优惠活动，并生成活动总结报告',
        '上传新到货的精品白酒到商品库',
        '分析库存预警商品，生成补货建议清单',
        '查询客户服务记录和反馈',
        '统计今日销售数据和业绩',
        '处理退货申请和售后服务',
        '优化商品推荐算法'
      ],
      placeholder: '选择快捷操作',
    },
  },
  { type: 'text', value: '' },
  {
    type: 'select',
    key: 'priority',
    props: {
      defaultValue: '普通',
      options: ['紧急', '重要', '普通'],
      placeholder: '优先级',
    },
  },
  { type: 'text', value: '，涉及' },
  {
    type: 'input',
    key: 'specific_count',
    props: {
      placeholder: '数量',
      defaultValue: '5',
    },
  },
  { type: 'text', value: '个商品，时间为' },
  {
    type: 'select',
    key: 'time_range',
    props: {
      defaultValue: '今天',
      options: ['今天', '本周', '本月', '最近7天', '最近30天'],
      placeholder: '时间范围',
    },
  },
  { type: 'text', value: '，' },
  {
    type: 'input',
    key: 'product_category',
    props: {
      placeholder: '商品类别（如：白酒、红酒、啤酒）',
    },
  },
  { type: 'text', value: '' },
  {
    type: 'input',
    key: 'additional_requirements',
    props: {
      placeholder: '其他要求或说明',
    },
  },
  { type: 'text', value: '。需要' },
  {
    type: 'select',
    key: 'output_format',
    props: {
      defaultValue: '生成报告',
      options: ['生成报告', '发送通知', '更新系统', '导出数据', '创建任务'],
      placeholder: '输出方式',
    },
  },
  { type: 'text', value: '，并' },
  {
    type: 'select',
    key: 'notification',
    props: {
      defaultValue: '邮件通知',
      options: ['邮件通知', '短信通知', '系统消息', '不通知'],
      placeholder: '通知方式',
    },
  },
  { type: 'text', value: '相关人员。' },
];



const slotConfigs = {
  zhenjiuchengSlotConfig,
};


const zhenjiuchengSkillConfig = {
  value: 'zhenjiuchengId',
  title: '工软助手',
  toolTip: {
    title: '珍酒城管理技能',
  },
  closable: {
    onClose: () => {
      console.log('关闭');
    },
  },
};

const Switch = Sender.Switch;

type AgentInfoType = {
  [key: string]: {
    icon: React.ReactNode;
    label: string;
    zh_label: string;
    skill: SenderProps['skill'];
    zh_skill: SenderProps['skill'];
    slotConfig: SenderProps['slotConfig'];
    zh_slotConfig: SenderProps['slotConfig'];
  };
};

const AgentInfo: AgentInfoType = {
  zhenjiucheng_assistant: {
    icon: <SearchOutlined />,
    label: 'Zhenjiucheng Assistant',
    zh_label: '珍酒城AGI助手',
    skill: zhenjiuchengSkillConfig,
    zh_skill: zhenjiuchengSkillConfig,
    slotConfig: zhenjiuchengSlotConfig,
    zh_slotConfig: zhenjiuchengSlotConfig,
  },
  zhenjiucheng_planner: {
    icon: <SearchOutlined />,
    label: 'Zhenjiucheng Planner',
    zh_label: '珍酒城规划师',
    skill: zhenjiuchengSkillConfig,
    zh_skill: zhenjiuchengSkillConfig,
    slotConfig: zhenjiuchengSlotConfig,
    zh_slotConfig: zhenjiuchengSlotConfig,
  },
  deep_search: {
    icon: <SearchOutlined />,
    label: 'Deep Search',
    zh_label: '深度搜索',
    skill: {
      value: 'deepSearch',
      title: '深度搜索',
      closable: true,
    },
    zh_skill: {
      value: 'deepSearch',
      title: '深度搜索',
      closable: true,
    },
    slotConfig: [
      { type: 'text', value: '请帮我搜索关于' },
      {
        type: 'select',
        key: 'search_type',
        props: {
          options: ['AI', '技术', '娱乐'],
          placeholder: '请选择一个类别',
        },
      },
      { type: 'text', value: '的新闻。' },
    ],
    zh_slotConfig: [
      { type: 'text', value: '请帮我搜索关于' },
      {
        type: 'select',
        key: 'search_type',
        props: {
          options: ['AI', '技术', '娱乐'],
          placeholder: '请选择一个类别',
        },
      },
      { type: 'text', value: '的新闻。' },
    ],
  },
  ai_code: {
    icon: <CodeOutlined />,
    label: 'AI Code',
    zh_label: '写代码',
    skill: {
      value: 'aiCode',
      title: '代码助手',
      closable: true,
    },
    zh_skill: {
      value: 'aiCode',
      title: '代码助手',
      closable: true,
    },
    slotConfig: [
      { type: 'text', value: '请使用' },
      {
        type: 'select',
        key: 'code_lang',
        props: {
          options: ['JS', 'C++', 'Java'],
          placeholder: '请选择一个编程语言',
        },
      },
      { type: 'text', value: '写一个小游戏。' },
    ],
    zh_slotConfig: [
      { type: 'text', value: '请使用' },
      {
        type: 'select',
        key: 'code_lang',
        props: {
          options: ['JS', 'C++', 'Java'],
          placeholder: '请选择一个编程语言',
        },
      },
      { type: 'text', value: '写一个小游戏。' },
    ],
  },
  ai_writing: {
    icon: <EditOutlined />,
    label: 'Writing',
    zh_label: '帮我写作',
    skill: {
      value: 'writing',
      title: '写作助手',
      closable: true,
    },
    zh_skill: {
      value: 'writing',
      title: '写作助手',
      closable: true,
    },
    slotConfig: [
      { type: 'text', value: '请帮我写一篇关于' },
      {
        type: 'select',
        key: 'writing_type',
        props: {
          options: ['校园', '旅行', '阅读'],
          placeholder: '请输入主题',
        },
      },
      { type: 'text', value: '的文章。要求是' },
      {
        type: 'content',
        key: 'writing_num',
        props: {
          defaultValue: '800',
          placeholder: '[请输入字数]',
        },
      },
      { type: 'text', value: '字。' },
    ],
    zh_slotConfig: [
      { type: 'text', value: '请帮我写一篇关于' },
      {
        type: 'select',
        key: 'writing_type',
        props: {
          options: ['校园', '旅行', '阅读'],
          placeholder: '请输入主题',
        },
      },
      { type: 'text', value: '的文章。要求是' },
      {
        type: 'content',
        key: 'writing_num',
        props: {
          defaultValue: '800',
          placeholder: '[请输入字数]',
        },
      },
      { type: 'text', value: '字。' },
    ],
  },
};

const IconStyle = {
  fontSize: 16,
};

const SwitchTextStyle = {
  display: 'inline-flex',
  width: 28,
  justifyContent: 'center',
  alignItems: 'center',
};

type FileInfoType = {
  [key: string]: {
    icon: React.ReactNode;
    label: string;
    zh_label: string;
  };
};

const FileInfo: FileInfoType = {
  file_image: {
    icon: <FileImageOutlined />,
    label: 'x-image',
    zh_label: 'x-图片',
  },
};

const useStyle = createStyles(({ token, css }) => {
    return {
        leopardChatContainer: css`
      width: 100%;
      height: 100vh;
      position: relative;
      overflow: hidden;
    `,
        backgroundVideoWrapper: css`
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
      display: block;

      video {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    `,
        bgVideoMask: css`
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(1px);
      z-index: 1;
    `,
        layout: css`
      width: 100%;
      height: 100vh;
      display: flex;
      position: relative;
      z-index: 1;
      overflow: hidden;
    `,
        chat: css`
      height: 100%;
      width: 100%;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      padding-block: ${token.paddingLG}px;
      padding-inline: ${token.paddingLG}px;
      gap: 16px;
      .ant-bubble-content-updating {
        background-image: linear-gradient(90deg, #ff6b23 0%, #af3cb8 31%, #53b6ff 89%);
        background-size: 100% 2px;
        background-repeat: no-repeat;
        background-position: bottom;
      }
    `,
        startPage: css`
      display: flex;
      width: 100%;
      flex-direction: column;
      align-items: center;
      height: 100%;
    `,
        agentName: css`
      margin-block-start: 25%;
      font-size: 32px;
      margin-block-end: 38px;
      font-weight: 600;
    `,
        chatList: css`
      display: flex;
      width: 100%;
      height: 100%;
      flex-direction: column;
      gap: 16px;
    `,
        messagesContainer: css`
      flex: 1;
      overflow-y: auto;
      min-height: 0;
      width: 100%;
      padding: 0 16px;
      box-sizing: border-box;
    `,
        inputContainer: css`
      flex-shrink: 0;
      width: 100%;
      padding: 0 16px;
      box-sizing: border-box;
    `,
        agentNameCentered: css`
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 32px;
      font-weight: 600;
      z-index: 2;
      text-align: center;
    `,
    };
});
interface ProductData {
    id: string | number;
    productCode?: string;       // 产品编号
    name: string;
    description?: string;       // 产品描述
    category?: string;          // 产品分类
    status?: string;            // 状态：已发布/测试中/开发中
    responsiblePerson?: string; // 负责人
    version?: string;           // 版本号
    releaseDate?: string;       // 发布日期
    featureDescription?: string;// 功能描述
    authorization?: string;     // 授权状态：已授权/未授权
    price: number;
}

const ChatContext = React.createContext<{
    onReload?: ReturnType<typeof useXChat>['onReload'];
    onQueryProducts?: () => void;
    onAddProduct?: () => void;
    onEditProduct?: (product: ProductData) => void;
    onDeleteProduct?: (product: ProductData) => void;
}>({});

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
                            model: 'glm-4.5-flash',
                        },
                    },
                ),
            }),
        );
    }
    return providerCaches.get(conversationKey);
};

// ==================== 自定义业务组件 ====================
// 产品表格组件

interface ProductTableProps {
    children?: React.ReactNode;
    streamStatus?: string;
    refreshKey?: number;
    onQuery?: () => void;
    onAdd?: () => void;
    onEdit?: (product: ProductData) => void;
    onDelete?: (product: ProductData) => void;
}

const ProductTable: React.FC<ProductTableProps> = React.memo(({ children, streamStatus, refreshKey, onQuery, onAdd, onEdit, onDelete }) => {
    const context = React.useContext(ChatContext);
    const [products, setProducts] = useState<ProductData[]>([]);

    // 调试：监控 products 状态变化
    useEffect(() => {
        console.log('[ProductTable] products 状态变化:', products.length, '条数据');
    }, [products]);

    // 使用useRef来保持products的稳定性
    const productsRef = useRef(products);
    productsRef.current = products;

    useEffect(() => {
        // 解析子组件数据
        if (children) {
            try {
                console.log('[ProductTable] children 类型:', typeof children);
                console.log('[ProductTable] children 内容:', children);

                const parsedData = typeof children === 'string' ? JSON.parse(children) : children;

                console.log('[ProductTable] parsedData 类型:', typeof parsedData);
                console.log('[ProductTable] parsedData 内容:', parsedData);

                // 处理对象格式（包含 id、content、status）
                if (parsedData && typeof parsedData === 'object' && !Array.isArray(parsedData)) {
                    console.log('[ProductTable] 检测到对象格式');
                    if (parsedData.content) {
                        console.log('[ProductTable] 存在 content 字段，尝试解析...');
                        // 从 content 中解析 JSON 数据
                        const contentMatch = parsedData.content.match(/<producttable>(.*?)<\/producttable>/);
                        if (contentMatch && contentMatch[1]) {
                            console.log('[ProductTable] 匹配到 producttable 标签');
                            const tableJson = JSON.parse(contentMatch[1]);
                            console.log('[ProductTable] 解析后的表格数据:', tableJson);
                            if (Array.isArray(tableJson) && tableJson.length > 0) {
                                setProducts(tableJson);
                                return;
                            }
                        } else {
                            // content 直接是 JSON 数组
                            const directJson = JSON.parse(parsedData.content);
                            if (Array.isArray(directJson) && directJson.length > 0) {
                                console.log('[ProductTable] content 直接是数组:', directJson);
                                setProducts(directJson);
                                return;
                            }
                        }
                    }
                }

                // 处理数组格式
                if (Array.isArray(parsedData) && parsedData.length > 0) {
                    console.log('[ProductTable] 检测到数组格式:', parsedData);
                    setProducts(parsedData);
                    console.log('[ProductTable] 已设置 products 状态，length:', parsedData.length);
                    return;
                }

                console.log('[ProductTable] 数据格式不符合预期，设置空数组');
            } catch (error) {
                console.error('[ProductTable] 数据解析失败:', error);
                console.error('[ProductTable] children 原始内容:', children);
            }
        }
        // 不再自动设置mockProducts，保持空状态等待真实数据
        console.log('[ProductTable] 设置空数组');
        setProducts([]);
    }, [children, refreshKey]);

    const columns = [
        {
            title: '编号',
            dataIndex: 'productCode',
            key: 'productCode',
            width: 100,
            render: (code: string) => <Typography.Text strong>{code || '-'}</Typography.Text>,
        },
        {
            title: '产品名称',
            dataIndex: 'name',
            key: 'name',
            width: 180,
            render: (name: string) => <Typography.Text strong>{name}</Typography.Text>,
        },
        {
            title: '产品类型',
            dataIndex: 'category',
            key: 'category',
            width: 130,
        },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            width: 100,
            render: (status: string) => {
                const colorMap: Record<string, string> = {
                    '已发布': 'green',
                    '测试中': 'orange',
                    '开发中': 'blue',
                };
                return <Tag color={colorMap[status] || 'default'}>{status || '-'}</Tag>;
            },
        },
        {
            title: '负责人',
            dataIndex: 'responsiblePerson',
            key: 'responsiblePerson',
            width: 120,
        },
        {
            title: '版本',
            dataIndex: 'version',
            key: 'version',
            width: 90,
        },
        {
            title: '发布日期',
            dataIndex: 'releaseDate',
            key: 'releaseDate',
            width: 110,
        },
        {
            title: '授权状态',
            dataIndex: 'authorization',
            key: 'authorization',
            width: 100,
            render: (auth: string) => {
                const color = auth === '已授权' ? 'green' : 'red';
                return <Tag color={color}>{auth || '-'}</Tag>;
            },
        },
        {
            title: '价格',
            dataIndex: 'price',
            key: 'price',
            width: 120,
            render: (price: number) => `¥${(price || 0).toLocaleString()}`,
        },
        {
            title: '操作',
            key: 'action',
            width: 120,
            fixed: 'right' as const,
            render: (_: any, record: ProductData) => (
                <Space size="small">
                    <Button
                        size="small"
                        type="primary"
                        icon={<EditOutlined />}
                        onClick={() => (onEdit || context.onEditProduct)?.(record)}
                    >
                        编辑
                    </Button>
                    <Popconfirm title="确定删除吗?" onConfirm={() => (onDelete || context.onDeleteProduct)?.(record)}>
                        <Button
                            size="small"
                            danger
                            icon={<DeleteOutlined />}
                        >
                            删除
                        </Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    // 计算统计数据
    const totalProducts = products.length;
    const totalRevenue = products.reduce((sum, p) => sum + (p.price || 0), 0);
    const publishedCount = products.filter(p => p.status === '已发布').length;
    const authorizedCount = products.filter(p => p.authorization === '已授权').length;

    if (streamStatus === 'loading') return null;

    return (
        <div style={{ padding: '16px' }}>
            <Flex vertical gap="middle">
                <Flex justify="space-between" align="center">
                    <Typography.Title level={4}>📋 工软产品列表</Typography.Title>
                    <Flex gap="small">
                        <Tag color="blue">实时数据</Tag>
                        {/* 表格工具栏按钮 */}
                        <Button size="small" icon={<SearchOutlined />} onClick={onQuery || context.onQueryProducts}>刷新</Button>
                        <Button size="small" type="primary" icon={<PlusOutlined />} onClick={onAdd || context.onAddProduct}>新增</Button>
                    </Flex>
                </Flex>

                {/* 统计卡片 */}
                <Flex gap="middle" wrap>
                    <Card style={{ flex: 1, minWidth: 150 }}>
                        <Statistic
                            title="产品总数"
                            value={totalProducts}
                            prefix={<ShoppingCartOutlined />}
                            valueStyle={{ color: '#1890ff' }}
                        />
                    </Card>
                    <Card style={{ flex: 1, minWidth: 150 }}>
                        <Statistic
                            title="已发布"
                            value={publishedCount}
                            prefix={<CheckCircleOutlined />}
                            valueStyle={{ color: '#52c41a' }}
                        />
                    </Card>
                    <Card style={{ flex: 1, minWidth: 150 }}>
                        <Statistic
                            title="已授权"
                            value={authorizedCount}
                            prefix={<SafetyCertificateOutlined />}
                            valueStyle={{ color: '#722ed1' }}
                        />
                    </Card>
                    <Card style={{ flex: 1, minWidth: 150 }}>
                        <Statistic
                            title="产品总值"
                            value={totalRevenue}
                            prefix={<DollarOutlined />}
                            precision={2}
                            valueStyle={{ color: '#fa8c16' }}
                        />
                    </Card>
                </Flex>

                {/* 产品表格 */}
                <Card title="产品详情列表">
                    <Table
                        columns={columns}
                        dataSource={products}
                        rowKey="id"
                        pagination={{ pageSize: 10 }}
                        size="small"
                        scroll={{ x: 1400 }}
                    />
                </Card>
            </Flex>
        </div>
    );
});

const Footer: React.FC<{
    id?: string;
    content: string;
    status?: string;
}> = ({ id, content, status }) => {
    const context = React.useContext(ChatContext);
    const currentLocale = useLocale();

    // 国际化文本
    const texts: Record<string, { retry: string }> = {
        'zh-CN': { retry: '重试' },
        'en-US': { retry: 'Retry' }
    };
    const t = texts[currentLocale] || texts['zh-CN'];

    const Items = [
        {
            key: 'retry',
            label: t.retry,
            icon: <SyncOutlined />,
            onItemClick: () => {
                if (id) {
                    context?.onReload?.(id, {
                        userAction: 'retry',
                    });
                }
            },
        },
        {
            key: 'copy',
            actionRender: <Actions.Copy text={content} />,
        },
    ];
    return status !== 'updating' && status !== 'loading' ? (
        <div style={{ display: 'flex' }}>{id && <Actions items={Items} />}</div>
    ) : null;
};

const getRole = (className: string): BubbleListProps['role'] => ({
    assistant: {
        placement: 'start',
        footer: (content, { status, key }) => (
            <Footer content={content} status={status} id={key as string} />
        ),
        contentRender: (content: any, { status }) => {
            const newContent = content.replace(/\n\n/g, '<br/><br/>');
            return (
                <XMarkdown
                    paragraphTag="div"
                    className={className}
                    streaming={{
                        hasNextChunk: status === 'updating',
                        enableAnimation: true,
                    }}
                    components={{
                        producttable: ProductTable,
                    }}
                >
                    {newContent}
                </XMarkdown>
            );
        },
    },
    user: { placement: 'end' },
});

const LargeScreenDashboard: React.FC = () => {
    const [className] = useMarkdownTheme();
    const senderRef = useRef<GetRef<typeof Sender>>(null);
    const curConversation = 'default';
    const currentLocale = useLocale();
    const currentTheme = useTheme();
    const navigate = useNavigate();

    // 国际化文本
    const texts: Record<string, {
        ask: string;
        about: string;
        retry: string;
        noData: string;
        requestAborted: string;
        requestFailed: string;
        placeholder: string;
        deepThink: string;
        agentName: string;
    }> = {
        'zh-CN': {
            ask: '询问',
            about: '关于',
            retry: '重试',
            noData: '暂无数据',
            requestAborted: '请求已取消',
            requestFailed: '请求失败',
            placeholder: '请输入您的问题...',
            deepThink: '深度思考',
            agentName: '工软助手'
        },
        'en-US': {
            ask: 'Ask',
            about: 'about',
            retry: 'Retry',
            noData: 'No data available',
            requestAborted: 'Request aborted',
            requestFailed: 'Request failed',
            placeholder: 'Please enter your question...',
            deepThink: 'Deep Think',
            agentName: 'Dashboard Assistant'
        }
    };

    const t = texts[currentLocale] || texts['zh-CN'];

    // 根据主题选择不同的视频资源
    const videoResources: Record<string, { poster: string; video: string }> = {
        light: {
            poster: '/src/assets/images/video-poster-1.jpg',
            video: '/src/assets/videos/video-1.mp4'
        },
        dark: {
            poster: '/src/assets/images/video-poster-2.jpg',
            video: '/src/assets/videos/video-2.mp4'
        }
    };

    const currentVideoResource = videoResources[currentTheme] || videoResources.light;

    const listRef = useRef<BubbleListRef>(null);
    const messagesContainerRef = useRef<HTMLDivElement>(null);

    // 滚动到底部辅助函数
    const scrollToBottom = useCallback(() => {
        setTimeout(() => {
            if (messagesContainerRef.current) {
                messagesContainerRef.current.scrollTo({
                    top: messagesContainerRef.current.scrollHeight,
                    behavior: 'smooth'
                });
            }
        }, 300);
    }, []);

    // ==================== Runtime ====================

    const { onRequest, messages, isRequesting, abort, onReload } = useXChat({
        provider: providerFactory(curConversation),
        conversationKey: curConversation,
        defaultMessages: [],
        requestPlaceholder: () => {
            return {
                content: t.noData,
                role: 'assistant',
            };
        },
        requestFallback: (_, { error, errorInfo, messageInfo }) => {
            if (error.name === 'AbortError') {
                return {
                    content: messageInfo?.message?.content || t.requestAborted,
                    role: 'assistant',
                };
            }
            return {
                content: errorInfo?.error?.message || t.requestFailed,
                role: 'assistant',
            };
        },
    });

    const { styles } = useStyle();
    const [deepThink, setDeepThink] = useState<boolean>(true);
    const [isRecording, setIsRecording] = useState<boolean>(false);
    const [inputMode, setInputMode] = useState<'sender' | 'suggestion'>('sender');

    // 高级功能状态
    const [slotConfigKey, setSlotConfigKey] = useState<keyof typeof slotConfigs | false>('zhenjiuchengSlotConfig');
    const [skill, setSkill] = useState<SenderProps['skill'] | undefined>(undefined);

    // 新增功能状态
    const [activeAgentKey, setActiveAgentKey] = useState<string>('zhenjiucheng_planner');
    // 思考分析状态
    const [isThinking, setIsThinking] = useState<boolean>(false);
    // 产品列表状态（真实数据）
    const [productList, setProductList] = useState<any[]>([]);
    // 表单弹窗状态
    const [formModalOpen, setFormModalOpen] = useState<boolean>(false);
    const [editingProduct, setEditingProduct] = useState<any>(null);
    const [form] = Form.useForm();
    // 自定义消息列表（用于存储表格等非AI消息）
    const [customMessages, setCustomMessages] = useState<any[]>([]);

    const [messageApi, contextHolder] = message.useMessage();

    // Agent和File菜单项
    const agentItems: MenuProps['items'] = Object.keys(AgentInfo).map((agent) => {
        const { icon, zh_label } = AgentInfo[agent];
        return {
            key: agent,
            icon,
            label: zh_label,
        };
    });

    const fileItems: MenuProps['items'] = Object.keys(FileInfo).map((file) => {
        const { icon, zh_label } = FileInfo[file];
        return {
            key: file,
            icon,
            label: zh_label,
        };
    });

    // Agent选择处理
    const agentItemClick: MenuProps['onClick'] = (item) => {
        setActiveAgentKey(item.key);
        const agentConfig = AgentInfo[item.key];
        if (agentConfig) {
            setSkill(agentConfig.zh_skill);
            setSlotConfigKey(item.key as keyof typeof slotConfigs);
        }
    };

    // 文件选择处理
    const fileItemClick = (item: any) => {
        const { icon, zh_label } = FileInfo[item.key];
        senderRef.current?.insert?.([
            {
                type: 'tag',
                key: `${item.key}_${Date.now()}`,
                props: {
                    label: (
                        <Flex gap="small">
                            {icon}
                            {zh_label}
                        </Flex>
                    ),
                    value: item.key,
                },
            },
        ]);
    };

    // 语音功能处理
    const handleSpeechStart = () => {
        setIsRecording(true);
        // 这里可以添加语音识别开始的逻辑
        console.log('语音识别开始');
    };

    const handleSpeechEnd = () => {
        setIsRecording(false);
        // 这里可以添加语音识别结束的逻辑
        console.log('语音识别结束');
    };

    // 生成产品表格数据 - 完全模拟，不调用真实AI
    const handleGenerateTable = () => {
        const mockProducts = [
            { id: 'P001', name: '工软ERP专业版', category: '企业管理软件', price: 59800, stock: 156, status: '在售', sales: 1234 },
            { id: 'P002', name: '工软CRM标准版', category: '客户关系管理', price: 29800, stock: 89, status: '在售', sales: 856 },
            { id: 'P003', name: '工软OA办公系统', category: '办公自动化', price: 19800, stock: 234, status: '在售', sales: 2134 },
            { id: 'P004', name: '工软MES生产执行', category: '生产管理', price: 89800, stock: 45, status: '在售', sales: 234 },
            { id: 'P005', name: '工软WMS仓储管理', category: '仓储物流', price: 49800, stock: 67, status: '在售', sales: 456 },
            { id: 'P006', name: '工软BI数据分析', category: '商业智能', price: 39800, stock: 123, status: '在售', sales: 789 },
            { id: 'P007', name: '工软SCM供应链', category: '供应链管理', price: 69800, stock: 34, status: '在售', sales: 123 },
            { id: 'P008', name: '工软HRM人力资源', category: '人力资源', price: 25800, stock: 178, status: '在售', sales: 567 },
            { id: 'P009', name: '工软PM项目管理', category: '项目管理', price: 35800, stock: 92, status: '在售', sales: 345 },
            { id: 'P010', name: '工软KM知识管理', category: '知识管理', price: 18800, stock: 256, status: '在售', sales: 678 },
        ];

        // 清除输入框
        senderRef.current?.clear?.();

        // 开始思考分析（完全模拟）
        setIsThinking(true);

        // 思考过程（模拟AI分析）
        setTimeout(() => {
            setIsThinking(false);

            // 添加包含表格的助手消息（模拟AI回复）
            const mockResponseId = `mock_${Date.now()}`;
            const newMessage = {
                id: mockResponseId,
                message: {
                    content: `<producttable>${JSON.stringify(mockProducts)}</producttable>`,
                    role: 'assistant',
                    status: 'done',
                },
                status: 'done',
            };
            setCustomMessages(prev => [...prev, newMessage]);

            // 滚动到底部（延迟执行确保UI更新）
            setTimeout(() => {
                scrollToBottom();
            }, 300);
        }, 2000);
    };

    // 清除表格数据
    const handleClearTable = () => {
        setCustomMessages([]);
        setIsThinking(false);
        messageApi.info('表格已清除');
    };

    // ========== 产品增删改查功能（真实后端接口） ==========
    
    // 查询产品列表（调用真实后端接口 /product）
    const handleQueryProducts = async () => {
        try {
            setIsThinking(true);
            // 模拟思考分析
            await new Promise(resolve => setTimeout(resolve, 800));

            // 调用真实后端接口 /product/list
            const response = await adapterApi.get<any[]>('/product/list');
            const products = response.data?.data || response.data || [];

            // 适配新数据结构
            const enrichedProducts = products.map((p: any) => ({
                id: p.id,
                productCode: p.productCode || `PROD-${String(p.id).padStart(3, '0')}`,
                name: p.name,
                description: p.description,
                category: p.category,
                status: p.status,
                responsiblePerson: p.responsiblePerson,
                version: p.version,
                releaseDate: p.releaseDate ? new Date(p.releaseDate).toLocaleDateString('zh-CN') : '-',
                featureDescription: p.featureDescription,
                authorization: p.authorization,
                price: p.price || 0,
            }));

            setProductList(enrichedProducts);

            // 添加表格到自定义消息列表
            const mockResponseId = `mock_${Date.now()}`;
            const newMessage = {
                id: mockResponseId,
                message: {
                    content: `<producttable key="${mockResponseId}">${JSON.stringify(enrichedProducts)}</producttable>`,
                    role: 'assistant',
                    status: 'done',
                },
                status: 'done',
            };
            setCustomMessages(prev => [...prev, newMessage]);

            setIsThinking(false);
            messageApi.success(`成功查询到 ${products.length} 个产品`);
            // 滚动到底部（延迟执行确保UI更新）
            setTimeout(() => {
                scrollToBottom();
            }, 300);
        } catch (error) {
            setIsThinking(false);
            messageApi.error('查询产品失败，请确保后端服务已启动');
            console.error('查询产品失败:', error);
        }
    };

    // 新增产品 - 打开表单弹窗
    const handleAddProduct = () => {
        setEditingProduct(null);
        form.resetFields();
        setFormModalOpen(true);
    };

    // 提交新增或编辑的产品表单
    const handleSubmitProduct = async (values: any) => {
        try {
            setIsThinking(true);
            setFormModalOpen(false);

            if (editingProduct) {
                // 编辑模式 - 调用更新接口
                await adapterApi.put<any>(`/product/update/${editingProduct.id}`, values);

                const updatedList = productList.map(p =>
                    p.id === editingProduct.id ? {
                        ...p,
                        ...values,
                        productCode: values.productCode || p.productCode,
                        category: values.category || p.category,
                        status: values.status || p.status,
                        responsiblePerson: values.responsiblePerson || p.responsiblePerson,
                        version: values.version || p.version,
                        releaseDate: values.releaseDate || p.releaseDate,
                        featureDescription: values.featureDescription || p.featureDescription,
                        authorization: values.authorization || p.authorization,
                    } : p
                );
                setProductList(updatedList);

                // 添加更新后的表格到自定义消息列表
                const mockResponseId = `mock_${Date.now()}`;
                const newMessage = {
                    id: mockResponseId,
                    message: {
                        content: `<producttable key="${mockResponseId}">${JSON.stringify(updatedList)}</producttable>`,
                        role: 'assistant',
                        status: 'done',
                    },
                    status: 'done',
                };
                setCustomMessages(prev => [...prev, newMessage]);

                messageApi.success('产品修改成功');
            } else {
                // 新增模式 - 调用创建接口
                const response = await adapterApi.post<any>('/product/add', values);
                const createdProduct = response.data?.data || response.data;

                // 为新创建的产品补充字段
                const enrichedProduct = {
                    ...createdProduct,
                    productCode: values.productCode || `PROD-${String(Date.now()).slice(-3)}`,
                    category: values.category,
                    status: values.status || '开发中',
                    responsiblePerson: values.responsiblePerson,
                    version: values.version || 'V1.0.0',
                    releaseDate: values.releaseDate ? new Date(values.releaseDate).toLocaleDateString('zh-CN') : '-',
                    featureDescription: values.featureDescription,
                    authorization: values.authorization || '未授权',
                };

                const newList = [...productList, enrichedProduct];
                setProductList(newList);

                // 添加更新后的表格到自定义消息列表
                const mockResponseId = `mock_${Date.now()}`;
                const newMessage = {
                    id: mockResponseId,
                    message: {
                        content: `<producttable key="${mockResponseId}">${JSON.stringify(newList)}</producttable>`,
                        role: 'assistant',
                        status: 'done',
                    },
                    status: 'done',
                };
                setCustomMessages(prev => [...prev, newMessage]);

                messageApi.success('新增产品成功');
            }

            // 滚动到底部（延迟执行确保UI更新）
            setTimeout(() => {
                scrollToBottom();
            }, 300);
        } catch (error) {
            messageApi.error(editingProduct ? '修改产品失败' : '新增产品失败');
            console.error('操作产品失败:', error);
        } finally {
            setIsThinking(false);
        }
    };

    // 修改产品 - 打开表单弹窗
    const handleEditProduct = (product: any) => {
        if (!product || !product.id) {
            messageApi.warning('请选择要修改的产品');
            return;
        }
        setEditingProduct(product);
        form.setFieldsValue(product);
        setFormModalOpen(true);
    };

    // 删除产品（调用真实后端接口）
    const handleDeleteProduct = async (product: any) => {
        if (!product || !product.id) {
            messageApi.warning('请选择要删除的产品');
            return;
        }

        try {
            setIsThinking(true);
            // 调用真实后端接口删除产品 /product/delete/{id}
            await adapterApi.delete(`/product/delete/${product.id}`);

            const updatedList = productList.filter(p => p.id !== product.id);
            setProductList(updatedList);

            // 添加更新后的表格到自定义消息列表
            const mockResponseId = `mock_${Date.now()}`;
            const newMessage = {
                id: mockResponseId,
                message: {
                    content: `<producttable key="${mockResponseId}">${JSON.stringify(updatedList)}</producttable>`,
                    role: 'assistant',
                    status: 'done',
                },
                status: 'done',
            };
            setCustomMessages(prev => [...prev, newMessage]);

            messageApi.success('删除产品成功');
            // 滚动到底部（延迟执行确保UI更新）
            setTimeout(() => {
                scrollToBottom();
            }, 300);
        } catch (error) {
            messageApi.error('删除产品失败');
            console.error('删除产品失败:', error);
        } finally {
            setIsThinking(false);
        }
    };

    useEffect(() => {
        // 延迟执行 focus，确保组件已经完全渲染
        const timer = setTimeout(() => {
            if (senderRef.current) {
                senderRef.current.focus({
                    cursor: 'end',
                });
            }
        }, 100);

        // 页面加载时自动查询真实产品数据
        const queryTimer = setTimeout(() => {
            handleQueryProducts();
        }, 500);

        return () => {
            clearTimeout(timer);
            clearTimeout(queryTimer);
        };
    }, []); // 空依赖数组，只在组件挂载时执行一次

    return (
        <XProvider>
            <ChatContext.Provider value={{
                onReload,
                onQueryProducts: handleQueryProducts,
                onAddProduct: handleAddProduct,
                onEditProduct: handleEditProduct,
                onDeleteProduct: handleDeleteProduct,
            }}>
                <div className={`${styles.leopardChatContainer} large-screen-dashboard`}>
                    <div className={`${styles.backgroundVideoWrapper} large-screen-video-wrapper`}>
                        <video
                            key={currentTheme}
                            autoPlay
                            loop
                            playsInline
                            muted
                            poster={currentVideoResource.poster}
                        >
                            <source src={currentVideoResource.video} type="video/mp4" />
                        </video>

                    </div>
                    <div className={styles.layout}>
                    <div className={styles.chat}>
                        <div ref={messagesContainerRef} className={`${styles.messagesContainer} message-text`}>
                            {(messages?.length !== 0 || customMessages.length !== 0) && (
                                /* 🌟 消息列表 */
                                <Bubble.List
                                    ref={listRef}
                                    items={[...messages, ...customMessages].map((i) => ({
                                        ...i.message,
                                        key: i.id,
                                        status: i.status,
                                        loading: i.status === 'loading',
                                    }))}
                                    styles={{
                                        root: {
                                            marginBlockEnd: 24,
                                            width: '100%',
                                        },
                                        bubble: {
                                            maxWidth: '100%',
                                            width: '100%',
                                        },
                                    }}
                                    role={getRole(className)}
                                />
                            )}
                        </div>
                        {/* 垂直居中的AGI助手名称 - 仅在没有聊天消息时显示 */}
                        {(messages?.length === 0 && customMessages.length === 0) && (
                            <div className={styles.agentNameCentered}>
                                <SloganAnimation />
                            </div>
                        )}
                        <div className={`${styles.inputContainer} large-screen-input-container`}>
                            {/* 输入模式选择器 */}
                            <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'center', gap: 16 }}>
                                <Flex gap="small">
                                    <button
                                        onClick={() => setInputMode('sender')}
                                        className={`large-screen-input-mode-btn large-screen-ui-text ${inputMode === 'sender' ? 'active' : ''}`}
                                    >
                                        普通输入
                                    </button>
                                    <button
                                        onClick={() => setInputMode('suggestion')}
                                        className={`large-screen-input-mode-btn large-screen-ui-text ${inputMode === 'suggestion' ? 'active' : ''}`}
                                    >
                                        建议输入
                                    </button>
                                </Flex>
                                {/* 生成表格按钮 */}
                                <Button
                                    type="primary"
                                    icon={<TableOutlined />}
                                    onClick={handleGenerateTable}
                                    loading={isThinking}
                                    className="large-screen-generate-table-btn"
                                    style={{
                                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                        border: 'none',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    {isThinking ? '思考分析中...' : '生成产品表格'}
                                </Button>
                                {/* 清除表格按钮 */}
                                {customMessages.length > 0 && (
                                    <Button
                                        danger
                                        icon={<DeleteOutlined />}
                                        onClick={handleClearTable}
                                        className="large-screen-clear-table-btn"
                                    >
                                        清除表格
                                    </Button>
                                )}
                            </div>
                            <div
                                className={clsx({ [styles.startPage]: messages.length === 0 })}
                            >
                                {inputMode === 'suggestion' ? (
                                    <div style={{
                                        width: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: messages.length === 0 ? 'center' : 'stretch'
                                    }}>
                                        <SuggestionDemo />
                                    </div>
                                ) : (
                                    <>

                                        {contextHolder}

                                        {/* 思考分析动画 */}
                                        {isThinking && (
                                            <div style={{ marginBottom: 16, maxWidth: '100%' }}>
                                                <Card size="small" style={{ background: 'linear-gradient(135deg, #667eea20 0%, #764ba220 100%)', border: '1px solid #667eea50' }}>
                                                    <Flex vertical gap="small" align="start">
                                                        <Flex align="center" gap="small">
                                                            <Typography.Text strong style={{ color: '#667eea' }}>
                                                                <LoadingOutlined /> 正在分析产品数据...
                                                            </Typography.Text>
                                                        </Flex>
                                                        <Typography.Text type="secondary" style={{ fontSize: 13 }}>
                                                            📊 正在整理工软产品列表信息：<br />
                                                            • 分析 10 个产品数据<br />
                                                            • 涉及 9 个产品类别（企业管理软件、客户关系管理、办公自动化、生产管理、仓储物流、商业智能、供应链管理、人力资源、项目管理、知识管理）<br />
                                                            • 计算库存总量：1,278 件<br />
                                                            • 统计销量数据：7,676 笔<br />
                                                            • 预估总营收：¥28,620,600<br />
                                                            • 正在生成产品表格...
                                                        </Typography.Text>
                                                    </Flex>
                                                </Card>
                                            </div>
                                        )}

                                        <Sender
                                            ref={senderRef}
                                            key={curConversation}
                                            loading={isRequesting}
                                            suffix={false}
                                            skill={skill || AgentInfo[activeAgentKey]?.zh_skill}
                                            allowSpeech
                                            slotConfig={slotConfigKey ? slotConfigs[slotConfigKey] : AgentInfo[activeAgentKey]?.zh_slotConfig || []}
                                            defaultValue="👋 你好，我是珍酒城AGI助手
我可以直接操作系统帮你完成各种任务 - 商品管理、活动运营、订单处理、客户服务
快捷操作
生成工软产品列表相关信息

帮我审核最近上传的5个新商品是否符合上架标准

检查今天所有订单的返现状态，确保已正确发放

关闭即将到期的限时优惠活动，并生成活动总结报告

上传一款新到货的精品白酒到商品库

分析库存预警商品，生成补货建议清单"
                                            onSubmit={(val) => {
                                                if (!val) return;
                                                onRequest({
                                                    messages: [{ role: 'user', content: val }],
                                                    thinking: {
                                                        type: 'disabled',
                                                    },
                                                });
                                                scrollToBottom();
                                                senderRef.current?.clear?.();
                                                messageApi.success(`消息发送成功: ${val}`);

                                                // 发起对话后跳转到聊天页面
                                                navigate('/chat');
                                            }}
                                            onCancel={() => {
                                                abort();
                                            }}
                                            onChange={(value, event, slotConfig, skill) => {
                                                console.log('Sender onChange:', value, event, slotConfig, skill);
                                                if (!skill) {
                                                    setSkill(undefined);
                                                }
                                            }}
                                            placeholder={t.placeholder}
                                            footer={(_, info) => {
                                                const { SendButton, LoadingButton, ClearButton, SpeechButton } = info.components;
                                                return (
                                                    <Flex justify="space-between" align="center">
                                                        <Flex gap="small" align="center">
                                                            <Button style={IconStyle} type="text" icon={<PaperClipOutlined />} />
                                                            <Switch
                                                                value={deepThink}
                                                                checkedChildren={
                                                                    <>
                                                                        深度搜索：<span style={SwitchTextStyle}>开启</span>
                                                                    </>
                                                                }
                                                                unCheckedChildren={
                                                                    <>
                                                                        深度搜索：<span style={SwitchTextStyle}>关闭</span>
                                                                    </>
                                                                }
                                                                onChange={(checked: boolean) => {
                                                                    setDeepThink(checked);
                                                                }}
                                                                icon={<OpenAIOutlined />}
                                                            />
                                                            <Dropdown
                                                                menu={{
                                                                    selectedKeys: [activeAgentKey],
                                                                    onClick: agentItemClick,
                                                                    items: agentItems,
                                                                }}
                                                            >
                                                                <Switch value={false} icon={<AntDesignOutlined />}>
                                                                    功能应用
                                                                </Switch>
                                                            </Dropdown>
                                                            {fileItems?.length ? (
                                                                <Dropdown menu={{ onClick: fileItemClick, items: fileItems }}>
                                                                    <Switch value={false} icon={<ProfileOutlined />}>
                                                                        文件引用
                                                                    </Switch>
                                                                </Dropdown>
                                                            ) : null}
                                                        </Flex>
                                                        <Flex align="center">
                                                            <Button type="text" style={IconStyle} icon={<ApiOutlined />} />
                                                            <Divider orientation="vertical" />
                                                            <Typography.Text style={{ whiteSpace: 'nowrap' }} type="secondary">
                                                                <small>`Shift + Enter` 发送</small>
                                                            </Typography.Text>
                                                            <ClearButton />
                                                            <SpeechButton
                                                                style={{
                                                                    color: isRecording ? '#ff4d4f' : undefined,
                                                                    backgroundColor: isRecording ? '#fff2f0' : undefined,
                                                                }}
                                                                onClick={() => {
                                                                    if (isRecording) {
                                                                        handleSpeechEnd();
                                                                    } else {
                                                                        handleSpeechStart();
                                                                    }
                                                                }}
                                                            />
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
                                                    </Flex>
                                                );
                                            }}
                                            autoSize={{ minRows: 3, maxRows: 6 }}
                                        />
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </ChatContext.Provider>

            {/* 产品表单弹窗 */}
            <Modal
                title={editingProduct ? '编辑产品' : '新增产品'}
                open={formModalOpen}
                onCancel={() => setFormModalOpen(false)}
                footer={null}
                width={600}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSubmitProduct}
                    initialValues={{ status: '开发中', authorization: '未授权' }}
                >
                    <Form.Item
                        label="产品编号"
                        name="productCode"
                        rules={[{ required: true, message: '请输入产品编号' }]}
                    >
                        <Input placeholder="如：PROD-001" />
                    </Form.Item>

                    <Form.Item
                        label="产品名称"
                        name="name"
                        rules={[{ required: true, message: '请输入产品名称' }]}
                    >
                        <Input placeholder="请输入产品名称" />
                    </Form.Item>

                    <Form.Item
                        label="产品描述"
                        name="description"
                        rules={[{ required: true, message: '请输入产品描述' }]}
                    >
                        <Input.TextArea rows={2} placeholder="请输入产品描述" />
                    </Form.Item>

                    <Form.Item
                        label="产品分类"
                        name="category"
                        rules={[{ required: true, message: '请输入产品分类' }]}
                    >
                        <Input placeholder="如：仿真分析软件、设计辅助工具" />
                    </Form.Item>

                    <Form.Item
                        label="状态"
                        name="status"
                        rules={[{ required: true, message: '请选择状态' }]}
                    >
                        <Select placeholder="请选择状态">
                            <Select.Option value="已发布">已发布</Select.Option>
                            <Select.Option value="测试中">测试中</Select.Option>
                            <Select.Option value="开发中">开发中</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="负责人"
                        name="responsiblePerson"
                    >
                        <Input placeholder="如：张工（adm_1）" />
                    </Form.Item>

                    <Form.Item
                        label="版本号"
                        name="version"
                    >
                        <Input placeholder="如：V3.2.1" />
                    </Form.Item>

                    <Form.Item
                        label="发布日期"
                        name="releaseDate"
                    >
                        <Input placeholder="如：2024-03-15" />
                    </Form.Item>

                    <Form.Item
                        label="功能描述"
                        name="featureDescription"
                    >
                        <Input.TextArea rows={2} placeholder="请输入产品功能描述" />
                    </Form.Item>

                    <Form.Item
                        label="授权状态"
                        name="authorization"
                    >
                        <Select placeholder="请选择授权状态">
                            <Select.Option value="已授权">已授权</Select.Option>
                            <Select.Option value="未授权">未授权</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="价格(元)"
                        name="price"
                        rules={[{ required: true, message: '请输入产品价格' }]}
                    >
                        <InputNumber
                            min={0}
                            style={{ width: '100%' }}
                            formatter={(value: any) => `¥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            parser={(value: any) => (value || '0').replace(/¥\s?|(,*)/g, '')}
                            placeholder="请输入产品价格"
                        />
                    </Form.Item>

                    <Form.Item style={{ marginBottom: 0, textAlign: 'right' }}>
                        <Space>
                            <Button onClick={() => setFormModalOpen(false)}>取消</Button>
                            <Button type="primary" htmlType="submit" loading={isThinking}>
                                {editingProduct ? '保存修改' : '确认新增'}
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Modal>
        </XProvider>
    );
};

export default LargeScreenDashboard;
