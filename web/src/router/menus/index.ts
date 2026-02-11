import { ModuleConfig, ModuleRoute, MenuGroup } from './types';
import { mainModule } from './main';

/**
 * 所有模块配置列表
 */
export const modules: ModuleConfig[] = [
  mainModule
];

/**
 * 按分组获取路由配置
 */
export const getRoutesByGroup = (group: MenuGroup): ModuleRoute[] => {
  return modules
    .filter(module => module.enabled)
    .flatMap(module => module.routes)
    .filter(route => route.group === group)
    .sort((a, b) => a.order - b.order);
};

/**
 * 获取所有路由配置
 */
export const getAllRoutes = (): ModuleRoute[] => {
  return modules
    .filter(module => module.enabled)
    .flatMap(module => module.routes)
    .sort((a, b) => a.order - b.order);
};

/**
 * 获取菜单路由（inMenu = true）
 */
export const getMenuRoutes = (): ModuleRoute[] => {
  return getAllRoutes().filter(route => route.inMenu);
};

/**
 * 获取AGI模式路由
 */
export const getAGIRoutes = (): ModuleRoute[] => {
  return getAllRoutes().filter(route => !route.traditionalOnly);
};

/**
 * 获取传统模式路由
 */
export const getTraditionalRoutes = (): ModuleRoute[] => {
  return getAllRoutes().filter(route => !route.agiOnly);
};

/**
 * 根据路径获取路由配置
 */
export const getRouteByPath = (path: string): ModuleRoute | undefined => {
  return getAllRoutes().find(route => route.path === path);
};

/**
 * 检查路由是否存在
 */
export const hasRoute = (path: string): boolean => {
  return getRouteByPath(path) !== undefined;
};

/**
 * 获取模块配置
 */
export const getModuleById = (id: string): ModuleConfig | undefined => {
  return modules.find(module => module.id === id);
};

/**
 * 获取启用的模块
 */
export const getEnabledModules = (): ModuleConfig[] => {
  return modules.filter(module => module.enabled);
};

/**
 * 按优先级排序的模块列表
 */
export const getModulesByPriority = (): ModuleConfig[] => {
  return [...modules].sort((a, b) => a.priority - b.priority);
};

// 导出类型和渲染器
export * from './types';
export * from './menuRenderer';
