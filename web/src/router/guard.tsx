import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AccessControl, getPermissionLevel, PermissionLevel } from './access';
import { getRouteMetadata, type RoutePath } from './routes';

/**
 * 路由守卫组件
 */
export interface RouteGuardProps {
  children: React.ReactNode;
  userPermissions?: string[];
  requireAuth?: boolean;
  requiredPermissions?: string[];
  fallbackPath?: string;
}

/**
 * 权限路由守卫
 * 检查用户是否有访问当前路由的权限
 */
export const PermissionGuard: React.FC<RouteGuardProps> = ({
  children,
  userPermissions = [],
  requireAuth = true,
  requiredPermissions = [],
  fallbackPath = '/login'
}) => {
  const location = useLocation();
  const currentPath = location.pathname as RoutePath;

  // 检查是否需要认证
  if (requireAuth && userPermissions.length === 0) {
    return <Navigate to={fallbackPath} state={{ from: location }} replace />;
  }

  // 检查路由权限
  if (requiredPermissions.length > 0) {
    if (!AccessControl.hasPermission(userPermissions, requiredPermissions)) {
      return <Navigate to="/unauthorized" state={{ from: location }} replace />;
    }
  }

  // 检查当前路由的权限要求
  const routeMeta = getRouteMetadata(currentPath);
  if (routeMeta && !AccessControl.canAccessRoute(currentPath, userPermissions)) {
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

/**
 * 登录状态守卫
 * 检查用户是否已登录
 */
export const AuthGuard: React.FC<{
  children: React.ReactNode;
  userPermissions?: string[];
  fallbackPath?: string;
}> = ({
  children,
  userPermissions = [],
  fallbackPath = '/login'
}) => {
  const location = useLocation();

  // 检查用户是否已登录（这里简化为检查是否有权限）
  const isLoggedIn = userPermissions.length > 0;

  if (!isLoggedIn) {
    return <Navigate to={fallbackPath} state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

/**
 * 角色守卫
 * 检查用户是否具有指定的角色权限
 */
export const RoleGuard: React.FC<{
  children: React.ReactNode;
  userPermissions?: string[];
  allowedRoles: PermissionLevel[];
  fallbackPath?: string;
}> = ({
  children,
  userPermissions = [],
  allowedRoles,
  fallbackPath = '/unauthorized'
}) => {
  const location = useLocation();
  const userLevel = getPermissionLevel(userPermissions);

  if (!allowedRoles.includes(userLevel)) {
    return <Navigate to={fallbackPath} state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

/**
 * 路由守卫工具函数
 */
export const RouteGuards = {
  /**
   * 检查路由访问权限
   */
  checkRouteAccess: (path: RoutePath, userPermissions: string[]): boolean => {
    return AccessControl.canAccessRoute(path, userPermissions);
  },

  /**
   * 检查是否需要登录
   */
  requiresAuth: (path: RoutePath): boolean => {
    const routeMeta = getRouteMetadata(path);
    return routeMeta ? routeMeta.permissions.length > 0 : false;
  },

  /**
   * 获取路由的权限要求
   */
  getRoutePermissions: (path: RoutePath): string[] => {
    const routeMeta = getRouteMetadata(path);
    return routeMeta ? routeMeta.permissions : [];
  },

  /**
   * 检查用户是否有足够权限访问路由
   */
  hasRouteAccess: (path: RoutePath, userPermissions: string[]): boolean => {
    return AccessControl.canAccessRoute(path, userPermissions);
  }
};

/**
 * 守卫配置类型
 */
export interface GuardConfig {
  requireAuth?: boolean;
  permissions?: string[];
  roles?: PermissionLevel[];
  fallbackPath?: string;
}

/**
 * 创建路由守卫的工具函数
 */
export const createRouteGuard = (config: GuardConfig) => {
  return (props: { children: React.ReactNode; userPermissions?: string[] }) => {
    const { children, userPermissions = [] } = props;

    return (
      <PermissionGuard
        userPermissions={userPermissions}
        requireAuth={config.requireAuth}
        requiredPermissions={config.permissions}
        fallbackPath={config.fallbackPath}
      >
        {config.roles ? (
          <RoleGuard
            userPermissions={userPermissions}
            allowedRoles={config.roles}
            fallbackPath={config.fallbackPath}
          >
            {children}
          </RoleGuard>
        ) : (
          children
        )}
      </PermissionGuard>
    );
  };
};

/**
 * 预定义的守卫配置
 */
export const CommonGuards = {
  // 需要登录
  RequireAuth: createRouteGuard({ requireAuth: true }),

  // 需要用户权限
  RequireUser: createRouteGuard({
    requireAuth: true,
    permissions: ['user']
  }),

  // 需要管理员权限
  RequireAdmin: createRouteGuard({
    requireAuth: true,
    permissions: ['admin']
  }),

  // 需要管理者或以上权限
  RequireManager: createRouteGuard({
    requireAuth: true,
    roles: [PermissionLevel.MANAGER, PermissionLevel.ADMIN, PermissionLevel.SUPER_ADMIN]
  }),

  // 公开路由（不需要登录）
  Public: createRouteGuard({ requireAuth: false }),
};
