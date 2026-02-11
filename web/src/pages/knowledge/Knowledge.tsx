import React, { useRef, useState } from 'react';
import { Card, Tag, Flex, Button, message, GetRef, Checkbox, Dropdown, Modal, Input, Form } from 'antd';
import { FolderOpenOutlined, FileTextOutlined } from '@ant-design/icons';
import { Sender } from '@ant-design/x';
import FilePreviewModal from '@/components/FilePreviewModal';
import '@/styles/knowledge.css';

const mockItems = [
  {
    id: '1',
    title: '收藏',
    type: '收藏夹',
    date: '25/12/30',
  },
  {
    id: '2',
    title: '研发部2026年工作导则',
    type: 'EXCEL',
    date: '25/12/30',
    fileUrl: '/研发部2026年工作导则 Working Guidelines.xlsx',
  },
  {
    id: '3',
    title: '智慧农业示范园建设方案',
    type: 'WORD',
    date: '25/12/30',
    fileUrl: '/智慧农业示范园建设方案0506.docx',
  },
  {
    id: '4',
    title: '自动皮带纠偏装置论文',
    type: 'PDF',
    date: '25/12/30',
    fileUrl: '/1+论文+自动皮带纠偏装置的设计与应用分析 (1).pdf',
  },
  {
    id: '5',
    title: '账号密码',
    type: '笔记',
    date: '25/12/30',
  },
];

const Knowledge: React.FC = () => {
  const senderRef = useRef<GetRef<typeof Sender>>(null);
  const [inputMode, setInputMode] = useState<'sender' | 'suggestion'>('sender');
  const [messageApi, contextHolder] = message.useMessage();
  const [selectedCards, setSelectedCards] = useState<string[]>([]);

  // 文件预览相关状态
  const [previewModalVisible, setPreviewModalVisible] = useState(false);
  const [previewFile, setPreviewFile] = useState<{
    name: string;
    type: 'PDF' | 'EXCEL' | 'WORD' | 'TXT';
    url?: string;
  } | null>(null);

  // 新建文件夹/知识库相关状态
  const [folderModalVisible, setFolderModalVisible] = useState(false);
  const [knowledgeModalVisible, setKnowledgeModalVisible] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [newKnowledgeName, setNewKnowledgeName] = useState('');

  // 处理卡片选择
  const handleCardSelect = (cardId: string, checked: boolean) => {
    if (checked) {
      setSelectedCards(prev => [...prev, cardId]);
    } else {
      setSelectedCards(prev => prev.filter(id => id !== cardId));
    }
  };

  // 批量提问功能
  const handleBatchQuestion = () => {
    if (selectedCards.length === 0) return;

    const selectedItems = mockItems.filter(item => selectedCards.includes(item.id));
    const questionText = `请基于以下知识库内容回答问题：${selectedItems.map(item => item.title).join('、')}`;

    // 将问题填入输入框
    senderRef.current?.insert?.([{
      type: 'text',
      value: questionText
    }]);

    messageApi.success(`已选择 ${selectedCards.length} 个知识库项目进行提问`);
  };

  // 处理卡片点击 - 打开文件预览
  const handleCardClick = (item: typeof mockItems[0]) => {
    // 只有文件类型的项目才支持预览，文件夹不预览
    if (item.type === '收藏夹') return;

    const fileTypeMap: { [key: string]: 'PDF' | 'EXCEL' | 'WORD' | 'TXT' } = {
      'PDF': 'PDF',
      'EXCEL': 'EXCEL',
      'WORD': 'WORD',
      'TXT': 'TXT',
      '笔记': 'TXT', // 笔记类型也作为文本处理
    };

    const fileType = fileTypeMap[item.type];
    if (fileType) {
      setPreviewFile({
        name: item.title,
        type: fileType,
        url: item.fileUrl || `/mock-files/${item.title}.${fileType.toLowerCase()}`,
      });
      setPreviewModalVisible(true);
    }
  };

  // 处理新建文件夹
  const handleCreateFolder = () => {
    if (!newFolderName.trim()) {
      message.error('请输入文件夹名称');
      return;
    }
    // 这里可以添加实际的创建文件夹逻辑
    message.success(`文件夹 "${newFolderName}" 创建成功`);
    setNewFolderName('');
    setFolderModalVisible(false);
  };

  // 处理新建知识库
  const handleCreateKnowledge = () => {
    if (!newKnowledgeName.trim()) {
      message.error('请输入知识库名称');
      return;
    }
    // 这里可以添加实际的创建知识库逻辑
    message.success(`知识库 "${newKnowledgeName}" 创建成功`);
    setNewKnowledgeName('');
    setKnowledgeModalVisible(false);
  };

  // 右键菜单项配置
  const contextMenuItems = [
    {
      key: 'create-folder',
      icon: <FolderOpenOutlined />,
      label: '新建文件夹',
      onClick: () => setFolderModalVisible(true),
    },
    {
      key: 'create-knowledge',
      icon: <FileTextOutlined />,
      label: '新建知识库',
      onClick: () => setKnowledgeModalVisible(true),
    },
  ];

  // 右键菜单处理函数
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    // 这里可以根据点击的位置显示不同的菜单项
  };

  return (
    <Dropdown
      menu={{ items: contextMenuItems }}
      trigger={['contextMenu']}
    >
      <div className="knowledge-page" onContextMenu={handleContextMenu}>
        <aside className="knowledge-sidebar">
        <div className="kb-left-title">个人知识库</div>
        <div className="kb-folder-list">
          <div className="kb-folder-item active">
            <FolderOpenOutlined style={{ fontSize: 20, marginRight: 8 }} />
            收藏
          </div>
          <div className="kb-folder-item">共享知识库</div>
          <div className="kb-folder-item">DeepSeek — 公司</div>
        </div>
      </aside>

      <main className="knowledge-main">
        {/* 批量操作栏 */}
        {selectedCards.length > 0 && (
          <div className="kb-batch-toolbar">
            <Flex justify="space-between" align="center">
              <div>
                <span style={{ color: '#666' }}>
                  已选择 {selectedCards.length} 个项目
                </span>
              </div>
              <Button type="primary" onClick={handleBatchQuestion}>
                批量提问 ({selectedCards.length})
              </Button>
            </Flex>
          </div>
        )}

        <div className={`kb-cards-row ${selectedCards.length > 0 ? 'has-selection' : ''}`}>
          {mockItems
            .filter(item => item.type !== '收藏夹')
            .map(item => (
              <div key={item.id} className="kb-card-wrapper">
                <Card
                  className={`kb-card ${selectedCards.includes(item.id) ? 'kb-card-selected' : ''}`}
                  hoverable
                  onClick={() => handleCardClick(item)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="kb-card-thumb" />
                  <div className="kb-card-meta">
                    <div className="kb-card-title">{item.title}</div>
                    <div className="kb-card-info">
                      <Tag>{item.type}</Tag>
                      <span className="kb-card-date">{item.date}</span>
                    </div>
                  </div>
                </Card>
                <div className="kb-card-checkbox">
                  <Checkbox
                    checked={selectedCards.includes(item.id)}
                    onChange={(e) => handleCardSelect(item.id, e.target.checked)}
                  />
                </div>
              </div>
            ))}
          {mockItems
            .filter(item => item.type === '收藏夹')
            .map(item => (
              <div key={item.id} className="kb-card-wrapper">
                <Card
                  className={`kb-card kb-card-favorite ${selectedCards.includes(item.id) ? 'kb-card-selected' : ''}`}
                  hoverable
                  onClick={() => handleCardClick(item)}
                  style={{ cursor: item.type === '收藏夹' ? 'pointer' : 'pointer' }}
                >
                  <div className="kb-card-thumb kb-card-thumb-folder">
                    <FolderOpenOutlined style={{ fontSize: 48, color: '#1890ff' }} />
                  </div>
                  <div className="kb-card-meta">
                    <div className="kb-card-title">{item.title}</div>
                    <div className="kb-card-info">
                      <Tag>{item.type}</Tag>
                      <span className="kb-card-date">{item.date}</span>
                    </div>
                  </div>
                </Card>
                <div className="kb-card-checkbox">
                  <Checkbox
                    checked={selectedCards.includes(item.id)}
                    onChange={(e) => handleCardSelect(item.id, e.target.checked)}
                  />
                </div>
              </div>
            ))}
        </div>

        <div className="kb-empty-area" />

        <div className="kb-search-bar">
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

          {contextHolder}
          <Sender
            ref={senderRef}
            key="knowledge"
            loading={false}
            suffix={false}
            allowSpeech
            defaultValue=""
            onSubmit={(val) => {
              if (!val) return;
              messageApi.success(`消息发送成功: ${val}`);
              senderRef.current?.clear?.();
            }}
            onCancel={() => {
              console.log('Cancel');
            }}
            onChange={(value, event, slotConfig, skill) => {
              console.log('Sender onChange:', value, event, slotConfig, skill);
            }}
            placeholder="基于知识库提问"
            footer={(_, info) => {
              const { SendButton, ClearButton, SpeechButton } = info.components;
              return (
                <Flex justify="space-between" align="center">
                  <Flex gap="small" align="center">
                    <Button type="text" icon={<FolderOpenOutlined />} />
                  </Flex>
                  <Flex align="center">
                    <ClearButton />
                    <SpeechButton />
                    <SendButton
                      type="text"
                      icon={<span>发送</span>}
                      disabled={false}
                      className="large-screen-send-btn"
                    />
                  </Flex>
                </Flex>
              );
            }}
            autoSize={{ minRows: 3, maxRows: 6 }}
            style={{ width: 815 }}
          />
        </div>
      </main>

      {/* 新建文件夹模态框 */}
      <Modal
        title="新建文件夹"
        open={folderModalVisible}
        onOk={handleCreateFolder}
        onCancel={() => {
          setFolderModalVisible(false);
          setNewFolderName('');
        }}
        okText="创建"
        cancelText="取消"
      >
        <Form layout="vertical">
          <Form.Item label="文件夹名称" required>
            <Input
              placeholder="请输入文件夹名称"
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
              onPressEnter={handleCreateFolder}
            />
          </Form.Item>
        </Form>
      </Modal>

      {/* 新建知识库模态框 */}
      <Modal
        title="新建知识库"
        open={knowledgeModalVisible}
        onOk={handleCreateKnowledge}
        onCancel={() => {
          setKnowledgeModalVisible(false);
          setNewKnowledgeName('');
        }}
        okText="创建"
        cancelText="取消"
      >
        <Form layout="vertical">
          <Form.Item label="知识库名称" required>
            <Input
              placeholder="请输入知识库名称"
              value={newKnowledgeName}
              onChange={(e) => setNewKnowledgeName(e.target.value)}
              onPressEnter={handleCreateKnowledge}
            />
          </Form.Item>
        </Form>
      </Modal>

      {/* 文件预览模态框 */}
      <FilePreviewModal
        visible={previewModalVisible}
        fileType={previewFile?.type || 'PDF'}
        fileName={previewFile?.name || ''}
        fileUrl={previewFile?.url}
        onClose={() => {
          setPreviewModalVisible(false);
          setPreviewFile(null);
        }}
      />
    </div>
    </Dropdown>
  );
};

export default Knowledge;


