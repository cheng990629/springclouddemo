import {
    OpenAIOutlined,
    SyncOutlined,
    AntDesignOutlined,
    ApiOutlined,
    CodeOutlined,
    EditOutlined,
    FileImageOutlined,
    PaperClipOutlined,
    ProfileOutlined,
    SearchOutlined,
} from '@ant-design/icons';
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
    Divider
} from 'antd';
import { createStyles } from 'antd-style';
import { clsx } from 'clsx';
import React, { useEffect, useRef, useState } from 'react';
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
  { type: 'tag', key: 'agent_tag', props: { label: '@珍酒城AGI助手 ', value: 'zhenjiucheng_assistant' } },
  { type: 'text', value: '帮我' },
  {
    type: 'select',
    key: 'main_action',
    props: {
      defaultValue: '查看当前正在进行的珍享活动详情和参与情况',
      options: [
        '查看当前正在进行的珍享活动详情和参与情况',
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
  title: '珍酒城AGI助手',
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
      max-width: 840px;
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
      min-height: 0; /* 允许flex子项缩小 */
    `,
        inputContainer: css`
      flex-shrink: 0;
      width: 100%;
      max-width: 840px;
      margin: 0 auto;
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

// ==================== Context ====================
const ChatContext = React.createContext<{
    onReload?: ReturnType<typeof useXChat>['onReload'];
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
const Footer: React.FC<{
    id?: string;
    content: string;
    status?: string;
}> = ({ id, content, status }) => {
    const context = React.useContext(ChatContext);
    const currentLocale = useLocale();

    // 国际化文本
    const texts = {
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
                >
                    {newContent}
                </XMarkdown>
            );
        },
    },
    user: { placement: 'end' },
});

const AgentTbox: React.FC = () => {
    const [className] = useMarkdownTheme();
    const senderRef = useRef<GetRef<typeof Sender>>(null);
    const curConversation = 'default';
    const currentLocale = useLocale();
    const currentTheme = useTheme();

    // 国际化文本
    const texts = {
        'zh-CN': {
            ask: '询问',
            about: '关于',
            retry: '重试',
            noData: '暂无数据',
            requestAborted: '请求已取消',
            requestFailed: '请求失败',
            placeholder: '请输入您的问题...',
            deepThink: '深度思考',
            agentName: '珍酒城AGI助手'
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
    const videoResources = {
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
    const [currentSkillValue, setCurrentSkillValue] = useState<string>('');
    const [currentValue, setCurrentValue] = useState<string>('');
    const [currentSlotValue, setCurrentSlotValue] = useState<string>('');

    // 新增功能状态
    const [activeAgentKey, setActiveAgentKey] = useState<string>('zhenjiucheng_planner');

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



    useEffect(() => {
        // 延迟执行 focus，确保组件已经完全渲染
        const timer = setTimeout(() => {
            if (senderRef.current) {
                senderRef.current.focus({
                    cursor: 'end',
                });
            }
        }, 100);

        return () => clearTimeout(timer);
    }, []); // 空依赖数组，只在组件挂载时执行一次

    return (
        <XProvider>
            <ChatContext.Provider value={{ onReload }}>
                <div className={`${styles.leopardChatContainer} large-screen-dashboard`}>
                    {messages.length === 0 && (
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
                    )}
                    <div className={styles.layout}>
                    <div className={styles.chat}>
                        <div className={`${styles.messagesContainer} message-text`}>
                            {messages?.length !== 0 && (
                                /* 🌟 消息列表 */
                                <Bubble.List
                                    ref={listRef}
                                    items={messages?.map((i) => ({
                                        ...i.message,
                                        key: i.id,
                                        status: i.status,
                                        loading: i.status === 'loading',
                                        extraInfo: i.message.extraInfo,
                                    }))}
                                    styles={{
                                        root: {
                                            marginBlockEnd: 24,
                                        },
                                        bubble: { maxWidth: 840 },
                                    }}
                                    role={getRole(className)}
                                />
                            )}
                        </div>
                        {/* 垂直居中的AGI助手名称 - 引导语和打字机动画 */}
                        {messages.length === 0 && (
                            <div className={styles.agentNameCentered}>
                                <SloganAnimation />
                            </div>
                        )}
                        <div className={`${styles.inputContainer} large-screen-input-container`}>
                            {/* 输入模式选择器 */}
                            <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'center' }}>
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
                            </div>
                            <div
                                className={clsx({ [styles.startPage]: messages.length === 0 })}
                            >
                                {inputMode === 'suggestion' ? (
                                    <div style={{
                                        width: '100%',
                                        maxWidth: '840px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: messages.length === 0 ? 'center' : 'stretch'
                                    }}>
                                        <SuggestionDemo />
                                    </div>
                                ) : (
                                    <>
                                        {/* 值显示区域 */}
                                        {(currentSkillValue || currentValue || currentSlotValue) && (
                                            <div className="large-screen-value-display">
                                                <div>{currentSkillValue ? `技能: ${currentSkillValue}` : null}</div>
                                                <div>{currentValue ? `值: ${currentValue}` : null}</div>
                                                <div>{currentSlotValue ? `词槽: ${currentSlotValue}` : null}</div>
                                            </div>
                                        )}

                                        {contextHolder}
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
查看当前正在进行的珍享活动详情和参与情况

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
                                                listRef.current?.scrollTo({ top: 'bottom' });
                                                senderRef.current?.clear?.();
                                                messageApi.success(`消息发送成功: ${val}`);
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
        </XProvider>
    );
};

export default AgentTbox;