// ReactNode is not used in this file, removing import

/**
 * 模块路由配置接口
 */
export interface ModuleRoute {
  /** 路由路径 */
  path: string;
  /** 路由名称 */
  label: string;
  /** 图标名称（Antd图标） */
  icon: string;
  /** 是否在菜单中显示 */
  inMenu: boolean;
  /** 权限要求 */
  permissions: string[];
  /** 排序权重 */
  order: number;
  /** 路由分组 */
  group?: string;
  /** 是否为AGI模式专用 */
  agiOnly?: boolean;
  /** 是否为传统模式专用 */
  traditionalOnly?: boolean;
  /** 路由描述 */
  description?: string;
}

/**
 * 模块配置接口
 */
export interface ModuleConfig {
  /** 模块ID */
  id: string;
  /** 模块名称 */
  name: string;
  /** 模块描述 */
  description?: string;
  /** 模块路由列表 */
  routes: ModuleRoute[];
  /** 模块是否启用 */
  enabled: boolean;
  /** 模块优先级 */
  priority: number;
}

/**
 * 菜单分组枚举
 */
export enum MenuGroup {
  BASE = 'base',           // 基础功能（智能对话、知识库等）
  BUSINESS = 'business',   // 业务功能（财务、薪资等）
  SYSTEM = 'system',       // 系统功能（管理、工具等）
  TRADITIONAL = 'traditional', // 传统模式
  SPECIAL = 'special'      // 专项应用
}

/**
 * 权限枚举
 */
export enum Permission {
  USER = 'user',
  ADMIN = 'admin',
  MANAGER = 'manager',
  SUPER_ADMIN = 'super_admin'
}

/**
 * 图标样式配置
 */
export interface IconStyle {
  fontSize?: string;
  color?: string;
}

/**
 * 菜单项渲染配置
 */
export interface MenuItemRenderConfig {
  /** 背景渐变 */
  gradient: string;
  /** 阴影颜色 */
  shadowColor: string;
  /** 文字颜色 */
  textColor: string;
  /** 图标样式 */
  iconStyle?: IconStyle;
}
