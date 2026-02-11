AGI大宝藏，站稳脚跟

下一代产品UI原型设计

炸开传统组件，AGI作为主导核心入口

AGI大语言模型练手必备

偏办公，运营类



AGI往前站，传统应用往后稍一稍

不要主动理解，AGI引导去理解

没有落地参考，瞎折腾

# 礁岛AGI设计UI

望见未来一隅，明日服务范式，当以自然语言为核心载体 —— 依托 AGI 通用语义理解与意图拆解能力，打通人机交互终极壁垒；以 AGI 为核心主轴 —— 非"AI+"赋能既有软件与系统，而是从根源重构服务底层逻辑。软件即服务、系统即服务、平台即服务，终将在不远的将来悄然退出主场，完成历史使命，转为底层兜底承接，聚焦支撑 AGI 无法覆盖的刚性合规、极致性能类需求，筑牢服务底线；而 AGI 贯穿服务全流程，成为驱动所有服务的核心引擎，短期内形成 AGI 主导、传统服务兜底的协同格局，长远则构筑起以人机自然协作为核心的全新产业服务生态。

## 🧠 AGI为核心的设计理念

本项目以**AGI (Artificial General Intelligence) 为核心主轴**，重新架构了人机交互体验：

- **🎯 AGI驱动** - 将AGI能力贯穿服务全流程，成为驱动所有服务的核心引擎
- **🔄 全屏沉浸** - 摒弃传统弹窗模式，采用全屏沉浸式交互体验
- **🌟 生态集成** - 将传统功能无缝集成到AGI生态中，形成协同格局
- **🚀 未来导向** - 为人机自然协作的全新产业服务生态奠定基础

## 🚀 技术栈

- **React 19** - 最新React版本，享受最新特性
- **TypeScript 5.9** - 最新的类型安全支持
- **Vite 7.3** - 最快的构建工具
- **Ant Design 6.x** - 最新企业级UI组件库
- **@ant-design/x 2.1** - Ant Design X最新版本
- **Zustand** - 轻量级状态管理
- **React Query** - 数据获取和缓存
- **Tailwind CSS** - 实用优先的CSS框架

## 🛠️ 环境要求

- **Node.js**: 18.0.0+ (推荐 20.0.0+)
- **pnpm**: 8.0.0+ (必需)
- **操作系统**: Linux/macOS/Windows

📋 **详细环境信息**: [查看环境配置](docs/environment.md)

## 📦 核心特性

### 🧠 AGI生态导航

统一的AGI生态导航系统，集成多功能模块：

- **💬 智能对话** - 基于Ant Design X的对话界面
- **📚 智能知识库** - AGI驱动的知识管理和检索
- **📝 智能笔记** - AI辅助的笔记记录和提炼
- **🔍 内容发现** - 探索AGI生态的无限可能
- **📊 数据仪表板** - 可视化数据展示和分析
- **🔧 API工具箱** - 强大的API数据级联选择组件
- **👤 个人中心** - 用户配置和偏好设置

## 🏗️ 架构设计

### 双模式架构系统

#### 🎨 全屏AGI生态界面（默认）
- **Overlay作为主UI** - 摒弃传统弹窗，采用全屏沉浸式设计
- **🔄 单页应用架构** - 基于React Router的SPA体验
- **📱 响应式布局** - 自适应不同屏幕尺寸
- **🎯 AGI为中心** - 所有功能围绕AGI能力展开

#### 🏢 传统系统模式
- **经典布局** - 侧边栏 + 头部 + 内容区域的传统布局
- **兼容性** - 保持现有系统的所有功能
- **渐进升级** - 为用户提供熟悉的过渡体验

#### 🔄 模式切换
- **右下角按钮** - 一键切换两种体验模式
- **状态保持** - 切换模式时保持当前页面状态
- **无缝体验** - 两种模式间平滑切换

#### 📱 底部导航栏
- **窗口视图** - 切换窗口显示模式
- **快速添加** - 一键创建新内容
- **折叠视图** - 切换紧凑显示模式

### 组件架构

```
OverlayShell (主容器)
├── AgentTbox (AGI智能体)
│   ├── 导航菜单 (AGI生态导航)
│   ├── 会话管理 (仅对话页面)
│   ├── 聊天界面 (对话功能)
│   └── 页面内容 (各功能模块)
├── Dashboard (仪表板)
├── ApiCascaderDemo (API工具)
└── Profile (个人中心)
```

### 🎯 API级联选择器 (ApiCascader)

强大的API数据级联选择组件，支持：

- 🔄 动态数据加载
- 🏷️ 自定义字段映射
- 🔧 数据转换函数
- ⚡ 内置加载状态
- 🛡️ 错误处理机制
- 🎨 完全兼容Ant Design Cascader

### 🏗️ Adapter架构

模块化的适配器设计：

- **API Adapter** - 统一的API调用接口
- **Layout Adapter** - 响应式布局系统
- **Locale Adapter** - 国际化支持
- **Router Adapter** - 路由管理
- **Store Adapter** - 状态管理
- **View Adapter** - 视图组件

### 🎨 现代化UI

- 📱 响应式设计
- 🌙 深色模式支持
- 🌍 国际化(i18n)
- ⚡ 高性能渲染
- 🎯 无障碍访问

## 🛠️ 快速开始

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

### 构建生产版本

```bash
npm run build
```

### 预览构建结果

```bash
npm run preview
```

### 类型检查

```bash
npm run type-check
```

### 代码检查

```bash
npm run lint
```

## 📁 项目结构

```
src/
├── adapter/                 # 适配器层
│   ├── api/                # API适配器
│   ├── layouts/            # 布局适配器
│   ├── locales/            # 国际化适配器
│   ├── router/             # 路由适配器
│   ├── store/              # 状态管理适配器
│   ├── views/              # 视图适配器
│   └── components/         # 组件适配器
├── components/             # 通用组件
│   ├── layout/            # 布局组件
│   └── pages/             # 页面组件
├── pages/                  # 页面
├── hooks/                  # 自定义hooks
├── utils/                  # 工具函数
├── App.tsx                # 主应用组件
└── main.tsx              # 应用入口
```

## 🔧 配置说明

### 环境变量

创建 `.env` 文件配置环境变量：

```env
# 应用配置
VITE_APP_TITLE=礁岛AGI设计UI
VITE_APP_ENV=development

# API配置
VITE_API_BASE_URL=http://localhost:8080/api
VITE_API_TIMEOUT=10000

# AI服务配置
VITE_AI_API_KEY=your_openai_api_key_here
VITE_AI_MODEL=gpt-4
VITE_AI_BASE_URL=https://api.openai.com/v1

# 或者使用本地mock服务（开发环境，避免外部依赖）
# VITE_AI_BASE_URL=http://localhost:3001/api

# Ant Design X API配置（用于演示功能）
# 如果需要本地化，可以设置为本地mock服务
# VITE_X_API_BASE_URL=http://localhost:3001/api/x

# 其他配置
VITE_ENABLE_MOCK=false
VITE_ROUTER_HISTORY=hash
```

### 国际化配置

在 `src/adapter/locales/index.ts` 中配置多语言：

```typescript
export const locales = {
  'zh-CN': {
    antd: zhCN,
    messages: {
      'app.title': '礁岛AGI设计UI',
      // ... 更多翻译
    },
  },
  'en-US': {
    antd: enUS,
    messages: {
      'app.title': 'CAYDE AGI Design UI',
      // ... 更多翻译
    },
  },
}
```

## 🎛️ API适配器使用

```typescript
import { apiAdapter } from '@/adapter/api'

// GET请求
const response = await apiAdapter.get('/users')

// POST请求
const response = await apiAdapter.post('/users', { name: 'John' })

// 自定义配置
const response = await apiAdapter.get('/users', {
  params: { page: 1, limit: 10 }
})
```

## 🔗 ApiCascader使用示例

```tsx
import { ApiCascader } from '@/adapter/components'

<ApiCascader
  apiUrl="/api/regions"
  placeholder="请选择地区"
  fieldName="data"
  valueField="code"
  labelField="name"
  childrenField="children"
  onChange={(value, selectedOptions) => {
    console.log('Selected:', value, selectedOptions)
  }}
/>
```

## 🤝 贡献指南

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🙏 致谢

- [Ant Design](https://ant.design/) - 企业级UI设计语言
- [Ant Design X](https://x.ant.design/) - Ant Design X组件库
- [React](https://reactjs.org/) - 用于构建用户界面的JavaScript库
- [Vite](https://vitejs.dev/) - 下一代前端构建工具
