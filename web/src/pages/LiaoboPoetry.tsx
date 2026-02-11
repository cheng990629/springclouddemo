import React from 'react';
import { Card, Typography } from 'antd';

const { Title, Paragraph } = Typography;

/**
 * 辽博作诗页面
 * 辽博文学创作AI应用
 */
const LiaoboPoetry: React.FC = () => {
  return (
    <div style={{ padding: 24 }}>
      <h1>辽博作诗</h1>
      <Card>
        <Typography>
          <Title level={2}>辽博作诗</Title>
          <Paragraph>
            辽博文学创作AI，为您提供智能诗歌创作服务。
          </Paragraph>
          <Paragraph>
            这里可以集成AI诗歌生成、文学创作辅助等功能。
          </Paragraph>
        </Typography>
        
        {/* TODO: 实现辽博作诗的具体功能 */}
        <div style={{ textAlign: 'center', padding: '50px 0', color: '#999' }}>
          功能开发中...
        </div>
      </Card>
    </div>
  );
};

export default LiaoboPoetry;
