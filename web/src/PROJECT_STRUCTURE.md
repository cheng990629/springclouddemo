# 项目目录结构说明

## 📁 目录结构

```
src/
├── adapter/                 # 适配器层（原有结构保持）
│   ├── locales/            # 语言包
│   └── store/              # 原有store（已迁移到新store）
├── components/             # 组件
│   ├── agent/              # Agent相关组件
│   ├── layout/             # 布局组件
│   └── ...
├── constants/              # 常量定义
│   ├── index.ts           # 导出文件
│   ├── routes.ts          # 路由常量
│   ├── theme.ts           # 主题常量
│   └── validation.ts      # 验证规则常量
├── hooks/                  # 自定义Hooks
│   ├── index.ts           # 导出文件
│   ├── useAsync.ts        # 异步操作Hook
│   ├── useDebounce.ts     # 防抖Hook
│   ├── useLocalStorage.ts # 本地存储Hook
│   ├── useThrottle.ts     # 节流Hook
│   └── useToggle.ts       # 切换状态Hook
├── i18n/                   # 国际化
│   ├── index.ts           # 国际化配置
│   └── locales/           # 语言包
│       ├── zh-CN.ts       # 中文语言包
│       └── en-US.ts       # 英文语言包
├── pages/                  # 页面组件
├── router/                 # 路由配置
│   ├── index.ts           # 导出文件
│   └── routes.tsx         # 路由定义（使用懒加载）
├── store/                  # 状态管理
│   ├── index.ts           # store入口
│   └── slices/            # store切片
│       ├── appSlice.ts    # 应用设置slice
│       └── userSlice.ts   # 用户相关slice
├── theme/                  # 主题配置
│   └── index.ts           # 主题定义和工具函数
├── types/                  # 类型定义
│   ├── index.ts           # 导出文件
│   ├── api.ts             # API相关类型
│   ├── common.ts          # 通用类型
│   └── user.ts            # 用户相关类型
├── utils/                  # 工具函数
│   ├── index.ts           # 导出文件
│   ├── format.ts          # 格式化工具
│   ├── request.ts         # HTTP请求工具
│   ├── storage.ts         # 本地存储工具
│   └── validation.ts      # 验证工具
├── App.tsx                 # 主应用组件
├── index.css               # 全局样式
└── main.tsx               # 应用入口
```

## 🔧 核心功能模块

### 1. **路由管理 (router/)**
- 集中式路由配置
- 支持懒加载优化
- 路由权限控制
- 路由常量定义

### 2. **状态管理 (store/)**
- 使用Zustand进行状态管理
- 按功能模块划分slice
- 支持持久化存储
- 类型安全的store定义

### 3. **主题系统 (theme/)**
- 亮色/暗色主题支持
- 统一的颜色系统
- 响应式设计支持
- 主题常量定义

### 4. **国际化 (i18n/)**
- 多语言支持
- 结构化的语言包组织
- 运行时语言切换
- 类型安全

### 5. **工具函数 (utils/)**
- HTTP请求封装
- 本地存储管理
- 数据格式化
- 表单验证

### 6. **自定义Hooks (hooks/)**
- 常用逻辑复用
- 性能优化Hooks
- 状态管理Hooks

### 7. **类型定义 (types/)**
- 全局TypeScript类型
- API接口定义
- 组件Props类型
- 业务逻辑类型

### 8. **常量管理 (constants/)**
- 应用级常量
- 配置常量
- 枚举值定义

## 🎯 设计原则

### 1. **模块化**
- 按功能划分目录
- 单一职责原则
- 依赖注入

### 2. **类型安全**
- 全面的TypeScript支持
- 严格的类型检查
- 类型定义规范化

### 3. **可维护性**
- 清晰的目录结构
- 统一的命名规范
- 完善的文档

### 4. **可扩展性**
- 插件化架构
- 配置化管理
- 约定优于配置

## 🚀 使用指南

### 添加新路由
1. 在 `router/routes.tsx` 中添加路由配置
2. 在 `constants/routes.ts` 中添加路由常量
3. 如需要权限控制，在 `constants/routes.ts` 中配置权限

### 添加新状态
1. 在 `store/slices/` 中创建新的slice
2. 在 `store/index.ts` 中组合slice
3. 在 `types/` 中定义相关类型

### 添加新工具函数
1. 在 `utils/` 中添加工具函数
2. 在 `utils/index.ts` 中导出
3. 添加相应的类型定义

### 添加新主题
1. 在 `theme/index.ts` 中定义主题配置
2. 在 `constants/theme.ts` 中添加相关常量
3. 使用 `useAppStore` 进行主题切换

## 📝 开发规范

### 命名规范
- 文件名：驼峰命名
- 组件名：帕斯卡命名
- 函数名：驼峰命名
- 常量名：全大写+下划线
- 类型名：帕斯卡命名

### 导入顺序
1. React相关
2. 第三方库
3. 项目内部模块
4. 类型定义
5. 样式文件

### 注释规范
- 复杂逻辑必须有注释
- 导出的函数/组件要有JSDoc注释
- TODO和FIXME要及时处理
