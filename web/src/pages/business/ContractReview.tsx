import { Bubble } from '@ant-design/x';
import { ScheduleOutlined, ProductOutlined } from '@ant-design/icons';
import XMarkdown from '@ant-design/x-markdown';
import React from 'react';
import { BusinessLayout, ChatPanel, Salesdashboard, OrderManager, ThinkComponent } from '@/components/BusinessLayout';

// ==================== ContractReview特有常量 ====================
const DEFAULT_CONVERSATIONS_ITEMS = [
    {
        key: '5',
        label: '新会话',
        group: '今天',
    },
    {
        key: '4',
        label: '合同审查系统功能',
        group: '今天',
    },
    {
        key: '3',
        label: '销售数据分析',
        group: '今天',
    },
    {
        key: '2',
        label: '订单管理最佳实践',
        group: '昨天',
    },
    {
        key: '1',
        label: 'Ant Design X 组件介绍',
        group: '昨天',
    },
];

const MOCK_SUGGESTIONS = [
    { label: '写一份报告', value: 'report' },
    { label: '分析销售数据', value: 'analysis' },
    {
        label: '查询知识库',
        value: 'knowledge',
        children: [
            { label: '关于合同审查', value: 'contract' },
            { label: '关于订单系统', value: 'order' },
        ],
    },
];

const MOCK_QUESTIONS = [
    '帮我审查这份合同条款并识别潜在风险',
    '分析合同中的关键条款和法律要点',
    '查看今天的所有订单统计数据',
];


const text = `
<think>
基于用户提供的业务需求，我们需要创建一个完整的销售管理系统示例，该系统需要展示如何从AI模型返回的数据中动态获取和展示信息。这个示例将展示XMarkdown如何：
1. 从模型返回的JSON数据中解析业务信息
2. 使用小写组件标签（如salesdashboard）
3. 处理动态数据渲染
4. 实现复杂的业务场景和交互需求
通过这种方式，用户可以清楚地看到XMarkdown不仅支持简单的文本渲染，还能处理动态数据驱动的复杂业务场景。
</think>

### 📊 动态销售仪表板

<salesdashboard>{"sales":[{"name":"电子产品","value":52000,"color":"#3b82f6"},{"name":"服装","value":38000,"color":"#8b5cf6"}],"totalSales":141000,"totalOrders":487,"newCustomers":94}</salesdashboard>

### 📋 订单管理系统

<ordermanager />
`;

const ContractReview = () => {
    const [index, setIndex] = React.useState(0);
    const timer = React.useRef<ReturnType<typeof setTimeout> | null>(null);
    const contentRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        if (index >= text.length) return;

        timer.current = setTimeout(() => {
            setIndex(Math.min(index + 5, text.length));
        }, 20);

        return () => {
            if (timer.current) {
                clearTimeout(timer.current);
                timer.current = null;
            }
        };
    }, [index]);

    React.useEffect(() => {
        if (contentRef.current && index > 0 && index < text.length) {
            const { scrollHeight, clientHeight } = contentRef.current;
            if (scrollHeight > clientHeight) {
                contentRef.current.scrollTo({
                    top: scrollHeight,
                    behavior: 'smooth',
                });
            }
        }
    }, [index]);

    const actionButtons = [
        {
            icon: <ScheduleOutlined />,
            text: '创建角色',
            onClick: () => {
                // ChatPanel会处理这个逻辑
            }
        },
        {
            icon: <ProductOutlined />,
            text: '行为分析',
            onClick: () => {
                // ChatPanel会处理这个逻辑
            }
        }
    ];

    return (
        <BusinessLayout
            title="合同审查"
            innerHeaderTitle="合同审查 工作台"
        >
            <Bubble
                ref={contentRef}
                content={text.slice(0, index)}
                contentRender={(content) => (
                    <XMarkdown
                        components={{
                            think: ThinkComponent,
                            salesdashboard: Salesdashboard,
                            ordermanager: OrderManager,
                        }}
                        paragraphTag="div"
                    >
                        {content}
                    </XMarkdown>
                )}
                variant="outlined"
            />

            {/* 右侧面板 - AI对话 */}
            <div style={{
                position: 'fixed',
                right: 0,
                top: 39,
                width: 400,
                height: 'calc(100vh - 39px)',
                borderLeft: '1px solid #d9d9d9',
                background: '#fff'
            }}>
                <ChatPanel
                    conversationsItems={DEFAULT_CONVERSATIONS_ITEMS}
                    suggestions={MOCK_SUGGESTIONS}
                    questions={MOCK_QUESTIONS}
                    welcomeTitle="👋 你好，我是珍酒城AGI"
                    welcomeDescription="一句话就能帮你完成合同审查的所有任务 - 条款分析、风险识别、法律建议"
                    headerTitle="🤖 珍酒城AGI"
                    actionButtons={actionButtons}
                    placeholder="询问合同审查相关问题..."
                />
            </div>
        </BusinessLayout>
    );
};

export default ContractReview;