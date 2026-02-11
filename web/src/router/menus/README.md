# 模块化路由管理系统

## 概述

本项目采用模块化的方式统一管理路由和菜单配置，将原本分散在多个文件中的路由和菜单逻辑集中到 `src/router/menus` 目录下管理。

## 目录结构

```
src/router/menus/
├── types.ts          # 类型定义和接口
├── index.ts          # 模块管理器和导出
├── menuRenderer.ts   # 菜单渲染配置
├── base.ts           # 基础功能模块
├── business.ts       # 业务功能模块
├── system.ts         # 系统功能模块
├── traditional.ts    # 传统模式模块
├── special.ts        # 专项应用模块
└── README.md         # 文档
```

## 核心概念

### 1. 模块配置 (ModuleConfig)
每个模块包含：
- `id`: 模块唯一标识
- `name`: 模块名称
- `description`: 模块描述
- `routes`: 路由配置数组
- `enabled`: 是否启用
- `priority`: 优先级

### 2. 路由配置 (ModuleRoute)
每个路由包含：
- `path`: 路由路径
- `label`: 显示名称
- `icon`: 图标名称
- `inMenu`: 是否在菜单中显示
- `permissions`: 权限要求
- `order`: 排序权重
- `group`: 所属分组

### 3. 菜单分组 (MenuGroup)
- `BASE`: 基础功能（智能对话、知识库等）
- `BUSINESS`: 业务功能（财务、薪资等）
- `SYSTEM`: 系统功能（管理、工具等）
- `TRADITIONAL`: 传统模式
- `SPECIAL`: 专项应用

## 使用方式

### 1. 添加新模块
在对应分组的文件中添加新的路由配置：

```typescript
// src/router/menus/business.ts
{
  path: '/new-feature',
  label: '新功能',
  icon: 'SomeIcon',
  inMenu: true,
  permissions: [Permission.USER],
  order: 99,
  group: MenuGroup.BUSINESS,
}
```

### 2. 更新菜单样式
在 `menuRenderer.ts` 中添加对应的渲染配置：

```typescript
'/new-feature': {
  gradient: 'linear-gradient(135deg, rgba(100, 100, 100, 0.8) 0%, rgba(150, 150, 150, 0.8) 100%)',
  shadowColor: 'rgba(100, 100, 100, 0.3)',
  textColor: 'white',
}
```

### 3. 添加组件映射
在 `routes.tsx` 中添加组件映射：

```typescript
const componentMap: Record<string, React.ComponentType<any>> = {
  '/new-feature': lazy(() => import('@/pages/new-feature/NewFeature')),
  // ... 其他映射
}
```

## 相关文件

本模块系统是更大路由架构的一部分：

```
src/router/
├── index.ts          # 主入口，导出所有路由相关功能
├── routes.tsx        # 路由配置和组件映射
├── access.ts         # 访问控制和权限管理
├── guard.tsx         # 路由守卫组件
└── menus/           # 菜单配置目录（当前目录）
    ├── index.ts      # 菜单模块导出
    ├── types.ts      # 类型定义
    └── ...           # 各功能模块配置
```

### 使用权限控制

```typescript
import { AccessControl, DEFAULT_PERMISSIONS } from '@/router/access';

// 检查用户权限
const hasAdminAccess = AccessControl.isAdmin(userPermissions);
const canAccessRoute = AccessControl.canAccessRoute('/admin', userPermissions);
```

### 使用路由守卫

```typescript
import { PermissionGuard, RoleGuard, CommonGuards } from '@/router/guard';

// 在组件中使用
<PermissionGuard
  userPermissions={userPermissions}
  requiredPermissions={['admin']}
>
  <AdminContent />
</PermissionGuard>

// 使用预定义守卫
<CommonGuards.RequireAdmin userPermissions={userPermissions}>
  <AdminContent />
</CommonGuards.RequireAdmin>
```

## 注意事项

1. 路由 `order` 值应避免冲突
2. 图标名称必须与 Antd 图标组件名称一致
3. 组件懒加载需要在 `routes.tsx` 中配置
4. 权限检查需要在组件内部实现
5. 路由守卫需要在路由配置中正确使用