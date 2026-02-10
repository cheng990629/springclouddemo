# GitHub OAuth2 登录集成指南

## 第一步：创建 GitHub OAuth App

### 1.1 创建 GitHub OAuth App

1. 打开 GitHub，登录你的账号
2. 进入 **Settings** → **Developer settings** → **OAuth Apps** → **New OAuth App**

### 1.2 填写应用信息

| 字段 | 值 |
|------|-----|
| **Application name** | LUBASE - 产品管理系统（自定义） |
| **Homepage URL** | `http://localhost:3000` |
| **Authorization callback URL** | `http://localhost:9999/login/oauth2/code/github` |

### 1.3 获取 Client ID 和 Client Secret

创建成功后，会显示 **Client ID**。

点击 **Generate a new client secret** 生成 **Client Secret**。

> ⚠️ **重要**：`Client Secret` 只显示一次，请立即保存！

---

## 第二步：配置 UAA 服务

在 `lubase-uaa/src/main/resources/application.yml` 中添加 GitHub 配置：

```yaml
spring:
  security:
    oauth2:
      client:
        registration:
          github:
            client-id: YOUR_GITHUB_CLIENT_ID
            client-secret: YOUR_GITHUB_CLIENT_SECRET

# 前端 URL（用于 OAuth2 回调重定向）
frontend:
  url: http://localhost:3000
```

**重启 UAA 服务使配置生效。**

---

## 第三步：前端 GitHub 登录

前端已经内置了 GitHub 登录按钮，点击后会跳转到 UAA 的 GitHub 授权页面。

### 登录流程

```
前端点击 "GitHub" 按钮
    ↓
跳转到 GitHub 授权页面
    ↓
用户授权
    ↓
GitHub 重定向回 UAA (/login/oauth2/code/github)
    ↓
UAA 处理回调，生成 JWT Token
    ↓
重定向到前端 /oauth/callback?token=xxx
    ↓
前端保存 Token，自动登录
```

### 预期效果

- 点击 "GitHub" 按钮跳转到 GitHub 授权页
- 授权成功后，自动登录并进入产品列表页
- 用户角色默认为 `EDITOR`（可按需在 UAA 代码中修改）

---

## 第四步：测试 GitHub 登录

1. 启动 UAA、Product、Gateway 服务
2. 启动前端：`cd web && npm run dev`
3. 访问 `http://localhost:3000`
4. 点击 **GitHub** 按钮
5. 完成 GitHub 授权
6. 验证登录成功并能访问产品列表

---

## 常见问题

### Q1: 回调 URL 应该填什么？

**本地开发**：`http://localhost:9999/login/oauth2/code/github`

**生产环境**（部署到服务器，使用域名 `lubase.frp.zhenjiucheng.net`）：
`http://lubase.frp.zhenjiucheng.net:9999/login/oauth2/code/github`

### Q2: GitHub 登录后没有获取到用户信息？

UAA 会自动从 GitHub 获取用户信息。如果有问题，检查 UAA 日志：

```bash
docker logs lubase-uaa
```

### Q3: 如何修改 GitHub 登录后的默认角色？

在 `lubase-uaa/src/main/java/com/luban/uaa/config/SecurityConfig.java` 中找到 GitHub OAuth2 配置，修改 `authorities` 或 `attributes`：

```java
.oauth2Login(oauth2 -> oauth2
    .userInfoEndpoint(userInfo -> userInfo
        .userAuthoritiesAuthorityExtractor(authoritiesExtractor -> {
            authoritiesExtractor.setAuthoritiesKind("id"); // 可自定义
        })
    )
)
```

具体角色映射逻辑可在 `OAuth2UserService` 实现类中自定义。

---

## 生产环境部署

部署到服务器时（域名 `lubase.frp.zhenjiucheng.net`），需要：

1. 修改 GitHub OAuth App 的 **Authorization callback URL** 为：
   `http://lubase.frp.zhenjiucheng.net:9999/login/oauth2/code/github`
2. 修改 UAA 的 `application.yml` 中的 GitHub Client ID 和 Secret
3. 重启 UAA 容器

```bash
# 登录服务器
ssh root@192.168.20.164

# 修改 UAA 配置（使用 docker exec 或挂载配置文件）
docker exec -it lubase-uaa bash

# 编辑 application.yml，填入真实的 GitHub Client ID 和 Secret
vim /app/config/application.yml

# 重启 UAA
docker restart lubase-uaa
```

---

## 参考链接

- [GitHub OAuth Docs](https://docs.github.com/en/developers/apps/building-oauth-apps)
- [Spring Security OAuth2](https://docs.spring.io/spring-security/reference/servlet/oauth2/login.html)
