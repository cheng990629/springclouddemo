import React from 'react';
import { Card, Row, Col, Input, Tag, Avatar } from 'antd';
import { SearchOutlined, ReloadOutlined } from '@ant-design/icons';
import '@/styles/discover.css';

const { Search } = Input;

const highlights = [
  { id: 'h1', title: '音乐欣赏', desc: '不权威但有趣的音乐专栏推荐', meta: '281人加入 · 91个内容' },
  { id: 'h2', title: 'LHYY-检验报告管理', desc: '基于标准的检验报告体系', meta: '42人加入 · 85个内容' },
  { id: 'h3', title: '大学外语课程建设', desc: '高校外语课程资源整理', meta: '191人加入 · 128个内容' },
];

const recommends = Array.from({ length: 18 }).map((_, i) => ({
  id: `${i + 1}`,
  title: `推荐专栏 ${i + 1}`,
  desc: '精选内容，持续更新，适合关注与学习',
  meta: `${100 + i * 10}人已加入 · ${5 + i}个内容`,
}));

const Discover: React.FC = () => {
  return (
    <div className="discover-page">
      <div className="discover-inner">
        <div className="discover-header">
          <div />
          <div className="discover-search">
            <Search placeholder="搜索共享知识库" enterButton={<SearchOutlined />} />
          </div>
        </div>

        <section className="discover-highlights">
          <Row gutter={[16, 16]}>
            {highlights.map(item => (
              <Col key={item.id} xs={24} sm={12} md={8}>
                <Card className="dh-card" hoverable>
                  <div className="dh-left">
                    <Avatar size={48} style={{ background: '#fde68a' }}>{item.title[0]}</Avatar>
                  </div>
                  <div className="dh-right">
                    <div className="dh-title">{item.title}</div>
                    <div className="dh-desc">{item.desc}</div>
                    <div className="dh-meta">{item.meta}</div>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </section>

        <div className="discover-tabs">
          <div className="dt-left">
            <div className="dt-labels">
              <Tag>推荐</Tag>
              <Tag>科技</Tag>
              <Tag>教育</Tag>
              <Tag>阅读</Tag>
              <Tag>商业</Tag>
              <Tag>产业</Tag>
            </div>
          </div>
        </div>

        <section className="discover-list">
          <Row gutter={[12, 12]}>
            {recommends.map(item => (
              <Col key={item.id} xs={24} sm={12}>
                <Card className="dl-card" hoverable>
                  <div className="dl-left">
                    <Avatar size={40} style={{ background: '#c7f9cc' }}>{item.title[0]}</Avatar>
                  </div>
                  <div className="dl-right">
                    <div className="dl-title">{item.title}</div>
                    <div className="dl-desc">{item.desc}</div>
                    <div className="dl-meta">{item.meta}</div>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </section>
      </div>
    </div>
  );
};

export default Discover;


