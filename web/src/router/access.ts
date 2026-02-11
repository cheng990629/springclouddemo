import { Permission } from './menus';
import { getRouteMetadata, type RoutePath } from './routes';

/**
 * 权限检查工具类
 */
export class AccessControl {
  /**
   * 检查用户是否有指定权限
   */
  static hasPermission(userPermissions: string[], requiredPermissions: string[]): boolean {
    if (!requiredPermissions || requiredPermissions.length === 0) {
      return true; // 无权限要求，默认允许
    }

    return requiredPermissions.some(permission =>
      userPermissions.includes(permission)
    );
  }

  /**
   * 检查用户是否可以访问指定路由
   */
  static canAccessRoute(path: RoutePath, userPermissions: string[]): boolean {
    const routeMeta = getRouteMetadata(path);
    if (!routeMeta) {
      return false; // 路由不存在
    }

    return this.hasPermission(userPermissions, routeMeta.permissions);
  }

  /**
   * 获取用户有权限访问的路由列表
   */
  static getAccessibleRoutes(_userPermissions: string[]): RoutePath[] {
    // 这里应该从routes中获取所有路由路径并过滤
    // 由于routes的导出方式，我们需要一个更好的方式
    // 暂时返回空数组，实际使用时需要完善
    return [];
  }

  /**
   * 检查用户是否有管理员权限
   */
  static isAdmin(userPermissions: string[]): boolean {
    return userPermissions.includes(Permission.ADMIN) ||
           userPermissions.includes(Permission.SUPER_ADMIN);
  }

  /**
   * 检查用户是否有管理者权限
   */
  static isManager(userPermissions: string[]): boolean {
    return userPermissions.includes(Permission.MANAGER) ||
           this.isAdmin(userPermissions);
  }

  /**
   * 检查用户是否有用户权限
   */
  static isUser(userPermissions: string[]): boolean {
    return userPermissions.includes(Permission.USER) ||
           this.isManager(userPermissions);
  }
}

/**
 * 默认权限配置
 */
export const DEFAULT_PERMISSIONS = {
  // 访客权限
  GUEST: [],
  // 普通用户权限
  USER: [Permission.USER],
  // 管理者权限
  MANAGER: [Permission.USER, Permission.MANAGER],
  // 管理员权限
  ADMIN: [Permission.USER, Permission.MANAGER, Permission.ADMIN],
  // 超级管理员权限
  SUPER_ADMIN: [Permission.USER, Permission.MANAGER, Permission.ADMIN, Permission.SUPER_ADMIN],
} as const;

/**
 * 权限等级定义
 */
export enum PermissionLevel {
  GUEST = 0,
  USER = 1,
  MANAGER = 2,
  ADMIN = 3,
  SUPER_ADMIN = 4,
}

/**
 * 获取权限等级
 */
export function getPermissionLevel(permissions: string[]): PermissionLevel {
  if (permissions.includes(Permission.SUPER_ADMIN)) {
    return PermissionLevel.SUPER_ADMIN;
  }
  if (permissions.includes(Permission.ADMIN)) {
    return PermissionLevel.ADMIN;
  }
  if (permissions.includes(Permission.MANAGER)) {
    return PermissionLevel.MANAGER;
  }
  if (permissions.includes(Permission.USER)) {
    return PermissionLevel.USER;
  }
  return PermissionLevel.GUEST;
}

/**
 * 检查权限等级是否足够
 */
export function hasMinimumLevel(
  userPermissions: string[],
  minimumLevel: PermissionLevel
): boolean {
  const userLevel = getPermissionLevel(userPermissions);
  return userLevel >= minimumLevel;
}
