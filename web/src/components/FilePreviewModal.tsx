import React, { useState, useEffect } from 'react';
import { Modal, Spin, message, Table, Alert, Button, Space } from 'antd';
// 暂时注释掉PDF查看器，稍后启用
// import { Viewer, Worker } from '@react-pdf-viewer/core';
// import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import { HotTable } from '@handsontable/react';
import { registerAllModules } from 'handsontable/registry';
import { RichTextEditorComponent, Toolbar, Inject, Image, Link, HtmlEditor, QuickToolbar } from '@syncfusion/ej2-react-richtexteditor';
import * as XLSX from 'xlsx';
import mammoth from 'mammoth';

// Import the styles for react-pdf-viewer
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

// Register Handsontable modules
registerAllModules();

interface FilePreviewModalProps {
  visible: boolean;
  fileType: 'PDF' | 'EXCEL' | 'WORD' | 'TXT';
  fileName: string;
  fileUrl?: string; // 实际项目中应该是文件URL
  onClose: () => void;
}

type ViewMode = 'preview' | 'edit';

interface ExcelData {
  [key: string]: any;
}

const FilePreviewModal: React.FC<FilePreviewModalProps> = ({
  visible,
  fileType,
  fileName,
  fileUrl,
  onClose,
}) => {
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('preview');
  const [excelData, setExcelData] = useState<ExcelData[]>([]);
  const [wordContent, setWordContent] = useState<string>('');
  const [textContent, setTextContent] = useState<string>('');

  // 加载Excel文件
  const loadExcelFile = async () => {
    if (!fileUrl) return;

    setLoading(true);
    try {
      // 加载Excel文件
      const response = await fetch(fileUrl);
      const arrayBuffer = await response.arrayBuffer();

      // 使用xlsx解析Excel文件
      const workbook = XLSX.read(arrayBuffer, { type: 'array' });

      // 获取第一个工作表的数据
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];

      // 转换为JSON格式
      const jsonData = XLSX.utils.sheet_to_json(worksheet, {
        header: 1, // 使用第一行作为表头
        defval: '' // 默认值为空字符串
      });

      // 如果有数据，转换为对象数组格式
      if (jsonData.length > 0) {
        const headers = jsonData[0] as string[];
        const rows = jsonData.slice(1) as any[][];

        const formattedData = rows.map((row, index) => {
          const obj: any = {};
          headers.forEach((header, colIndex) => {
            obj[header || `列${colIndex + 1}`] = row[colIndex] || '';
          });
          return obj;
        });

        setExcelData(formattedData);
      } else {
        setExcelData([]);
      }
    } catch (error) {
      console.error('加载Excel文件失败:', error);
      message.error('加载Excel文件失败');
      // 如果解析失败，使用模拟数据
      const mockData = [
        { 错误: '无法解析Excel文件', 原因: '文件格式或网络问题' },
      ];
      setExcelData(mockData);
    } finally {
      setLoading(false);
    }
  };

  // 加载Word文件
  const loadWordFile = async () => {
    if (!fileUrl) return;

    setLoading(true);
    try {
      // 使用mammoth解析Word文档
      const response = await fetch(fileUrl);
      const arrayBuffer = await response.arrayBuffer();

      const result = await mammoth.convertToHtml({ arrayBuffer });
      setWordContent(result.value);

      // 如果有错误消息，也显示出来
      if (result.messages.length > 0) {
        console.warn('Word文档解析警告:', result.messages);
      }
    } catch (error) {
      console.error('加载Word文件失败:', error);
      message.error('加载Word文件失败');
      // 如果解析失败，显示错误信息
      setWordContent(`
        <div style="color: #ff4d4f; text-align: center; padding: 20px;">
          <h3>📄 Word文档加载失败</h3>
          <p>无法解析Word文档内容</p>
          <p>文件名: ${fileName || '未知'}</p>
        </div>
      `);
    } finally {
      setLoading(false);
    }
  };

  // 加载文本文件
  const loadTextFile = async () => {
    if (!fileUrl) return;

    setLoading(true);
    try {
      // 这里应该是实际的文件加载逻辑
      // 由于是演示，我们使用模拟内容
      setTextContent(`这是文本文件的内容示例。

包含多行文本内容。
可以包含各种格式的文本。

- 项目符号1
- 项目符号2
- 项目符号3

结束。`);
    } catch (error) {
      message.error('加载文本文件失败');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (visible && fileType) {
      switch (fileType) {
        case 'EXCEL':
          loadExcelFile();
          break;
        case 'WORD':
          loadWordFile();
          break;
        case 'TXT':
          loadTextFile();
          break;
        default:
          break;
      }
    }
  }, [visible, fileType, fileUrl]);

  const renderContent = () => {
    if (loading) {
      return (
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <Spin size="large" />
          <p style={{ marginTop: 16 }}>正在加载文件...</p>
        </div>
      );
    }

    switch (fileType) {
      case 'PDF':
        return (
          <div>
            <div style={{ marginBottom: 16 }}>
              <Space>
                <Button
                  type={viewMode === 'preview' ? 'primary' : 'default'}
                  onClick={() => setViewMode('preview')}
                >
                  预览模式
                </Button>
                <Alert
                  message="PDF 文档预览"
                  description="使用浏览器内置PDF查看器，支持基本的查看和打印功能"
                  type="info"
                  showIcon
                />
              </Space>
            </div>
            <div style={{ height: '70vh', border: '1px solid #d9d9d9', borderRadius: '6px', overflow: 'hidden' }}>
              <iframe
                src={fileUrl}
                style={{
                  width: '100%',
                  height: '100%',
                  border: 'none',
                }}
                title={`${fileName} - PDF预览`}
              />
            </div>
          </div>
        );

      case 'EXCEL':
        return (
          <div>
            <div style={{ marginBottom: 16 }}>
              <Space>
                <Button
                  type={viewMode === 'preview' ? 'primary' : 'default'}
                  onClick={() => setViewMode('preview')}
                >
                  预览模式
                </Button>
                <Button
                  type={viewMode === 'edit' ? 'primary' : 'default'}
                  onClick={() => setViewMode('edit')}
                >
                  编辑模式
                </Button>
                <Alert
                  message="Excel 表格编辑"
                  description="支持数据的查看和编辑，修改会实时反映"
                  type="info"
                  showIcon
                />
              </Space>
            </div>
            <div style={{ height: '60vh', border: '1px solid #d9d9d9', borderRadius: '6px' }}>
              <HotTable
                data={excelData}
                colHeaders={excelData.length > 0 ? Object.keys(excelData[0]) : []}
                rowHeaders={true}
                width="100%"
                height="100%"
                licenseKey="non-commercial-and-evaluation"
                readOnly={viewMode === 'preview'}
                contextMenu={viewMode === 'edit'}
                filters={true}
                dropdownMenu={true}
                afterChange={(changes) => {
                  if (changes && viewMode === 'edit') {
                    console.log('数据已修改:', changes);
                  }
                }}
              />
            </div>
          </div>
        );

      case 'WORD':
        return (
          <div>
            <div style={{ marginBottom: 16 }}>
              <Space>
                <Button
                  type={viewMode === 'preview' ? 'primary' : 'default'}
                  onClick={() => setViewMode('preview')}
                >
                  预览模式
                </Button>
                <Button
                  type={viewMode === 'edit' ? 'primary' : 'default'}
                  onClick={() => setViewMode('edit')}
                >
                  编辑模式
                </Button>
                <Alert
                  message="Word 文档编辑"
                  description="支持富文本编辑，包括格式、图片、链接等"
                  type="info"
                  showIcon
                />
              </Space>
            </div>
            {viewMode === 'preview' ? (
              <div
                style={{
                  border: '1px solid #d9d9d9',
                  borderRadius: '6px',
                  padding: '16px',
                  maxHeight: '60vh',
                  overflow: 'auto',
                  background: '#fff',
                }}
                dangerouslySetInnerHTML={{ __html: wordContent }}
              />
            ) : (
              <div style={{ border: '1px solid #d9d9d9', borderRadius: '6px', height: '60vh' }}>
                <RichTextEditorComponent
                  value={wordContent}
                  height="100%"
                  saveInterval={1}
                  toolbarSettings={{
                    items: [
                      'Bold', 'Italic', 'Underline', 'StrikeThrough', '|',
                      'FontName', 'FontSize', 'FontColor', 'BackgroundColor', '|',
                      'LowerCase', 'UpperCase', '|',
                      'Formats', 'Alignments', '|', 'OrderedList', 'UnorderedList', '|',
                      'Indent', 'Outdent', '|', 'CreateLink', 'Image', '|',
                      'ClearFormat', 'Print', 'SourceCode', 'FullScreen', '|', 'Undo', 'Redo'
                    ]
                  }}
                >
                  <Inject services={[Toolbar, Image, Link, HtmlEditor, QuickToolbar]} />
                </RichTextEditorComponent>
              </div>
            )}
          </div>
        );

      case 'TXT':
        return (
          <div>
            <Alert
              message="文本文件预览"
              description="以下是文本文件的内容"
              type="info"
              showIcon
              style={{ marginBottom: 16 }}
            />
            <pre
              style={{
                border: '1px solid #d9d9d9',
                borderRadius: '6px',
                padding: '16px',
                maxHeight: '60vh',
                overflow: 'auto',
                background: '#f6f6f6',
                whiteSpace: 'pre-wrap',
                fontFamily: 'monospace',
              }}
            >
              {textContent}
            </pre>
          </div>
        );

      default:
        return (
          <div style={{ textAlign: 'center', padding: '50px' }}>
            <p>不支持的文件类型</p>
          </div>
        );
    }
  };

  return (
    <Modal
      title={`${fileName} - ${fileType}${viewMode === 'edit' ? '编辑' : '预览'}`}
      open={visible}
      onCancel={onClose}
      width={fileType === 'PDF' ? 1200 : 1000}
      footer={null}
      destroyOnClose
    >
      {renderContent()}
    </Modal>
  );
};

export default FilePreviewModal;
