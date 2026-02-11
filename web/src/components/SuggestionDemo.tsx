import { Sender, Suggestion, SuggestionProps } from '@ant-design/x';
import { message, Tag, Flex, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import SendIcon from '@/components/common/SendIcon';

type SuggestionItems = Exclude<SuggestionProps['items'], () => void>;

const suggestions: SuggestionItems = [
  { label: '写报告', value: 'report' },
  { label: '画画', value: 'draw' },
  {
    label: '检查知识',
    value: 'knowledge',
    extra: <Tag>额外信息</Tag>,
    other: '其他数据',
  },
];

const SuggestionDemo: React.FC = () => {
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    // 注入自定义CSS样式
    const style = document.createElement('style');
    style.textContent = `
      .custom-sender .ant-sender-input {
        height: 125px !important;
        min-height: 125px !important;
        max-height: 125px !important;
        resize: none !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);
  return (
    <div style={{
      width: '100%',
      minHeight: '80px'  // 设置最小高度，确保与普通输入框一致
    }}>
      <Suggestion
        items={suggestions}
        onSelect={(itemVal) => {
          setValue(`[${itemVal}]:`);
        }}
        style={{
          width: '100%',
          minHeight: '80px'  // 确保Suggestion组件也有最小高度
        }}
      >
      {({ onTrigger, onKeyDown }) => {
        return (
          <>
            {contextHolder}
            <Sender
              loading={loading}
              value={value}
              onSubmit={(value) => {
                messageApi.success(`消息发送成功: ${value}`);
                setValue('');
                setLoading(true);
                setTimeout(() => {
                  setLoading(false);
                }, 3000);
              }}
              onChange={(nextVal) => {
                if (nextVal === '/') {
                  onTrigger();
                } else if (!nextVal) {
                  onTrigger(false);
                }
                setValue(nextVal);
              }}
              onKeyDown={onKeyDown}
              placeholder="输入 / 获取建议"
              className="custom-sender"
              footer={(_, info) => {
                const { SendButton, LoadingButton } = info.components;
                return (
                  <Flex justify="end" align="center">
                    {loading ? (
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
          </>
        );
      }}
    </Suggestion>
    </div>
  );
};

export default SuggestionDemo;
