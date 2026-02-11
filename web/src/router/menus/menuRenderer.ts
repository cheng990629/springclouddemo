import { ModuleRoute, MenuGroup, MenuItemRenderConfig } from './types';
import { getRoutesByGroup, getAllRoutes } from './index';

/**
 * 菜单项渲染配置映射
 * 为不同类型的菜单项定义渲染样式
 */
const menuItemRenderConfigs: Record<string, MenuItemRenderConfig> = {
  // 基础功能
  '/chat': {
    gradient: 'linear-gradient(135deg, rgba(33, 150, 243, 0.8) 0%, rgba(3, 169, 244, 0.8) 100%)',
    shadowColor: 'rgba(33, 150, 243, 0.3)',
    textColor: 'white',
  },
  '/knowledge': {
    gradient: 'linear-gradient(135deg, rgba(76, 175, 80, 0.8) 0%, rgba(139, 195, 74, 0.8) 100%)',
    shadowColor: 'rgba(76, 175, 80, 0.3)',
    textColor: 'white',
  },
  '/notes': {
    gradient: 'linear-gradient(135deg, rgba(255, 152, 0, 0.8) 0%, rgba(255, 193, 7, 0.8) 100%)',
    shadowColor: 'rgba(255, 152, 0, 0.3)',
    textColor: 'white',
  },
  '/discover': {
    gradient: 'linear-gradient(135deg, rgba(79, 172, 254, 0.8) 0%, rgba(0, 242, 254, 0.8) 100%)',
    shadowColor: 'rgba(79, 172, 254, 0.3)',
    textColor: 'white',
  },

  // 系统功能
  '/large-screen-dashboard': {
    gradient: 'linear-gradient(135deg, rgba(250, 112, 154, 0.8) 0%, rgba(254, 225, 64, 0.8) 100%)',
    shadowColor: 'rgba(250, 112, 154, 0.3)',
    textColor: 'white',
  },

  // 传统模式
  '/zhenjiucheng-platform': {
    gradient: 'linear-gradient(135deg, rgba(63, 81, 181, 0.8) 0%, rgba(92, 107, 192, 0.8) 100%)',
    shadowColor: 'rgba(63, 81, 181, 0.3)',
    textColor: 'white',
  },
  '/traditional/zhenjiucheng-platform': {
    gradient: 'linear-gradient(135deg, rgba(63, 81, 181, 0.8) 0%, rgba(92, 107, 192, 0.8) 100%)',
    shadowColor: 'rgba(63, 81, 181, 0.3)',
    textColor: 'white',
  },
  '/zhenjiucheng-merchant': {
    gradient: 'linear-gradient(135deg, rgba(76, 175, 80, 0.8) 0%, rgba(139, 195, 74, 0.8) 100%)',
    shadowColor: 'rgba(76, 175, 80, 0.3)',
    textColor: 'white',
  },
  '/traditional/zhenjiucheng-merchant': {
    gradient: 'linear-gradient(135deg, rgba(76, 175, 80, 0.8) 0%, rgba(139, 195, 74, 0.8) 100%)',
    shadowColor: 'rgba(76, 175, 80, 0.3)',
    textColor: 'white',
  },
  '/zhenjiucheng-mobile': {
    gradient: 'linear-gradient(135deg, rgba(255, 152, 0, 0.8) 0%, rgba(255, 193, 7, 0.8) 100%)',
    shadowColor: 'rgba(255, 152, 0, 0.3)',
    textColor: 'white',
  },
  '/traditional/zhenjiucheng-mobile': {
    gradient: 'linear-gradient(135deg, rgba(255, 152, 0, 0.8) 0%, rgba(255, 193, 7, 0.8) 100%)',
    shadowColor: 'rgba(255, 152, 0, 0.3)',
    textColor: 'white',
  },
  '/smart-greenhouse': {
    gradient: 'linear-gradient(135deg, rgba(76, 175, 80, 0.8) 0%, rgba(129, 199, 132, 0.8) 100%)',
    shadowColor: 'rgba(76, 175, 80, 0.3)',
    textColor: 'white',
  },
  '/science-ai': {
    gradient: 'linear-gradient(135deg, rgba(255, 87, 34, 0.8) 0%, rgba(255, 138, 101, 0.8) 100%)',
    shadowColor: 'rgba(255, 87, 34, 0.3)',
    textColor: 'white',
  },
  '/tk-store-management': {
    gradient: 'linear-gradient(135deg, rgba(156, 39, 176, 0.8) 0%, rgba(206, 147, 216, 0.8) 100%)',
    shadowColor: 'rgba(156, 39, 176, 0.3)',
    textColor: 'white',
  },

  // 业务功能
  '/accounting': {
    gradient: 'linear-gradient(135deg, rgba(255, 152, 0, 0.8) 0%, rgba(255, 87, 34, 0.8) 100%)',
    shadowColor: 'rgba(255, 152, 0, 0.3)',
    textColor: 'white',
  },
  '/salary-system': {
    gradient: 'linear-gradient(135deg, rgba(255, 193, 7, 0.8) 0%, rgba(255, 87, 34, 0.8) 100%)',
    shadowColor: 'rgba(255, 193, 7, 0.3)',
    textColor: 'white',
  },
  '/system-management': {
    gradient: 'linear-gradient(135deg, rgba(240, 147, 251, 0.8) 0%, rgba(245, 87, 108, 0.8) 100%)',
    shadowColor: 'rgba(245, 87, 108, 0.3)',
    textColor: 'white',
  },

  // 工具
  '/api-tools': {
    gradient: 'linear-gradient(135deg, rgba(168, 237, 234, 0.8) 0%, rgba(254, 214, 227, 0.8) 100%)',
    shadowColor: 'rgba(168, 237, 234, 0.3)',
    textColor: '#333',
    iconStyle: { color: '#333' },
  },
  '/profile': {
    gradient: 'linear-gradient(135deg, rgba(121, 85, 72, 0.8) 0%, rgba(141, 110, 99, 0.8) 100%)',
    shadowColor: 'rgba(121, 85, 72, 0.3)',
    textColor: 'white',
  },
  '/dashboard': {
    gradient: 'linear-gradient(135deg, rgba(96, 125, 139, 0.8) 0%, rgba(120, 144, 156, 0.8) 100%)',
    shadowColor: 'rgba(96, 125, 139, 0.3)',
    textColor: 'white',
  },

  // 专项应用
  '/contract-review': {
    gradient: 'linear-gradient(135deg, rgba(76, 175, 80, 0.8) 0%, rgba(0, 150, 136, 0.8) 100%)',
    shadowColor: 'rgba(76, 175, 80, 0.3)',
    textColor: 'white',
  },
  '/interview-work': {
    gradient: 'linear-gradient(135deg, rgba(156, 39, 176, 0.8) 0%, rgba(233, 30, 99, 0.8) 100%)',
    shadowColor: 'rgba(156, 39, 176, 0.3)',
    textColor: 'white',
  },
  '/liaobo-poetry': {
    gradient: 'linear-gradient(135deg, rgba(103, 58, 183, 0.8) 0%, rgba(81, 45, 168, 0.8) 100%)',
    shadowColor: 'rgba(103, 58, 183, 0.3)',
    textColor: 'white',
  },
};

/**
 * 获取菜单项的渲染配置
 */
export const getMenuItemRenderConfig = (path: string): MenuItemRenderConfig => {
  return menuItemRenderConfigs[path] || {
    gradient: 'linear-gradient(135deg, rgba(158, 158, 158, 0.8) 0%, rgba(96, 96, 96, 0.8) 100%)',
    shadowColor: 'rgba(158, 158, 158, 0.3)',
    textColor: 'white',
  };
};

/**
 * 获取指定分组的菜单项（包含渲染配置）
 */
export interface MenuItemWithConfig extends ModuleRoute {
  renderConfig: MenuItemRenderConfig;
}

export const getMenuItemsByGroup = (group: MenuGroup): MenuItemWithConfig[] => {
  const routes = getRoutesByGroup(group);
  return routes
    .filter(route => route.inMenu)
    .map(route => ({
      ...route,
      renderConfig: getMenuItemRenderConfig(route.path),
    }));
};

/**
 * 获取所有菜单项（包含渲染配置）
 */
export const getAllMenuItems = (): MenuItemWithConfig[] => {
  const allRoutes = getAllRoutes().filter(route => route.inMenu);
  return allRoutes.map(route => ({
    ...route,
    renderConfig: getMenuItemRenderConfig(route.path),
  }));
};
