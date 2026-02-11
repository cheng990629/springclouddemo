/**
 * 认证相关类型定义
 */

export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  roles: string[];
  permissions: string[];
  profile?: UserProfile;
}

export interface UserProfile {
  nickname?: string;
  phone?: string;
  department?: string;
  position?: string;
  bio?: string;
}

export interface LoginRequest {
  username: string;
  password: string;
  remember?: boolean;
}

export interface LoginResponse {
  user: User;
  token: string;
  refreshToken?: string;
  expiresIn: number;
}

export interface OAuthConfig {
  provider: 'github' | 'google' | 'wechat' | 'dingtalk';
  clientId: string;
  clientSecret: string;
  redirectUri: string;
  scope?: string[];
}

export interface AuthAdapter {
  login(credentials: LoginRequest): Promise<LoginResponse>;
  logout(): Promise<void>;
  refreshToken(refreshToken: string): Promise<LoginResponse>;
  validateToken(token: string): Promise<User>;
  getOAuthUrl(config: OAuthConfig): string;
  handleOAuthCallback(code: string, config: OAuthConfig): Promise<LoginResponse>;
}

export interface TokenStorage {
  getToken(): string | null;
  setToken(token: string): void;
  removeToken(): void;
  getRefreshToken(): string | null;
  setRefreshToken(token: string): void;
  removeRefreshToken(): void;
}

