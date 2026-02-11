import { Bubble } from '@ant-design/x';
import { ScheduleOutlined, ProductOutlined } from '@ant-design/icons';
import XMarkdown from '@ant-design/x-markdown';
import React from 'react';
import { BusinessLayout, ChatPanel, Salesdashboard, OrderManager, ThinkComponent } from '@/components/BusinessLayout';

// ==================== Zhenjiuchengagi特有常量 ====================
const DEFAULT_CONVERSATIONS_ITEMS = [
    {
        key: '5',
        label: '新会话',
        group: '今天',
    },
    {
        key: '4',
        label: '珍酒城AGI系统功能',
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
    { label: '查看珍享活动', value: 'view-activity' },
    { label: '上传新商品', value: 'upload-product' },
    { label: '审核商品', value: 'audit-product' },
    {
        label: '运营操作',
        value: 'operation',
        children: [
            { label: '关闭活动', value: 'close-activity' },
            { label: '检查返现', value: 'check-rebate' },
            { label: '库存预警', value: 'stock-alert' },
            { label: '客户服务', value: 'customer-service' },
        ],
    },
];

const MOCK_QUESTIONS = [
    '查看当前正在进行的珍享活动详情和参与情况',
    '帮我审核最近上传的5个新商品是否符合上架标准',
    '检查今天所有订单的返现状态，确保已正确发放',
    '关闭即将到期的限时优惠活动，并生成活动总结报告',
    '上传一款新到货的精品白酒到商品库',
    '分析库存预警商品，生成补货建议清单',
];

const text = `
<think>
根据珍酒城AGI系统最新运营数据分析，2024年第三季度销售业绩整体呈上升趋势，但存在结构性问题需要重点关注：

销售数据分析：
- 白酒类产品销售占比持续提升，高端酒品增长迅猛
- 线上渠道销售额同比增长35%，线下门店销售相对稳定
- 主要增长点集中在40-60岁中高端消费群体
- 新客户获取成本有所上升，需要优化营销策略

运营建议：
1. 加大高端白酒产品库存和陈列，满足市场需求
2. 优化线上线下融合销售模式，提升全渠道体验
3. 加强会员营销，开发高价值客户群体
4. 关注库存周转率，避免积压风险

市场机会：
- 中秋、国庆双节临近，礼品酒市场潜力巨大
- 新兴消费群体对个性化酒品需求增加
- 跨区域销售机会值得重点关注

风险提示：
- 部分产品价格敏感度较高，需谨慎调整
- 竞争对手促销活动可能影响市场份额
- 物流成本上升对毛利率造成一定压力
</think>

### 📊 珍酒城销售业绩总览

<salesdashboard>{"sales":[{"name":"高端白酒","value":285000,"color":"#722ed1"},{"name":"中档白酒","value":168000,"color":"#1890ff"},{"name":"葡萄酒","value":95000,"color":"#52c41a"},{"name":"啤酒","value":42000,"color":"#faad14"}],"totalSales":590000,"totalOrders":1247,"newCustomers":156}</salesdashboard>

### 📋 订单管理中心

<ordermanager />

### 🎯 运营策略建议

**核心业务优化建议：**

1. **产品结构调整**
   - 提升高端白酒产品占比至60%以上
   - 加大新品研发投入，丰富产品线
   - 优化产品定价策略，提升利润空间

2. **渠道拓展策略**
   - 加强线上平台运营，提高数字化水平
   - 拓展企业客户渠道，发展团购业务
   - 优化门店选址和装修，提升品牌形象

3. **营销创新举措**
   - 推出会员积分体系，提升客户忠诚度
   - 开展品酒体验活动，增强品牌互动
   - 利用社交媒体进行口碑营销

4. **库存管理优化**
   - 建立智能库存预警系统
   - 优化供应商合作关系，降低采购成本
   - 实施JIT库存管理，提高资金周转效率

### 📈 市场趋势分析

**行业发展趋势：**
- 消费者对品质和品牌的重视程度持续提升
- 个性化、定制化需求成为主流趋势
- 线上线下融合成为必然发展方向
- 体验式消费将成为核心竞争力

**竞争格局分析：**
- 市场集中度不断提升，头部品牌优势明显
- 新兴品牌通过创新营销快速崛起
- 跨界融合成为行业新趋势
- 国际化视野成为品牌发展新要求

**机遇与挑战：**
- 国家政策对高端白酒消费有利
- 消费升级带动市场扩容
- 国际市场拓展空间广阔
- 供应链稳定性面临挑战
- 人才竞争日益激烈
`;

const Zhenjiuchengagi = () => {
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
            text: '创建活动',
            onClick: () => {
                // ChatPanel会处理这个逻辑
            }
        },
        {
            icon: <ProductOutlined />,
            text: '商品审核',
            onClick: () => {
                // ChatPanel会处理这个逻辑
            }
        }
    ];

    return (
        <BusinessLayout
            title="珍酒城AGI"
            innerHeaderTitle="珍酒城AGI 工作台"
            showMerchantSelector={true}
            showPlatformSelector={true}
        >
            <Bubble
                ref={contentRef}
                content={text.slice(0, index)}
                contentRender={(content) => (
                    <div style={{ width: '100%', maxWidth: 'none' }}>
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
                    </div>
                )}
                variant="outlined"
                style={{
                    width: '100%',
                    maxWidth: 'none'
                }}
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
                    welcomeDescription="我可以直接操作系统帮你完成各种任务 - 行程规划、交通安排、住宿预订、餐饮推荐"
                    headerTitle="🤖 珍酒城AGI"
                    actionButtons={actionButtons}
                    placeholder="告诉我你想让我帮你做什么..."
                />
            </div>
        </BusinessLayout>
    );
};

export default Zhenjiuchengagi;
