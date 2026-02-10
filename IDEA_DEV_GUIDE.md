# IntelliJ IDEA 本地开发配置指南

## 🚀 第一步：启动基础设施（Docker）

先在终端启动 MySQL 和 LDAP：

```bash
# 在项目根目录执行
docker-compose -f docker-compose.dev.yml up -d

# 验证启动成功
docker ps | grep -E "mysql|ldap"
```

## 🚀 第二步：IDEA 中启动后端服务

在 IDEA 中**按以下顺序**启动服务（每个服务点绿色运行按钮）：

| 顺序 | 服务 | 启动类 | Profile | 端口 |
|------|------|--------|---------|------|
| 1 | Discovery | `com.luban.discovery.DiscoveryApplication` | 无需设置 | 8761 |
| 2 | UAA | `com.luban.uaa.UaaApplication` | `local` | 9999 |
| 3 | Product | `com.luban.product.ProductApplication` | `local` | 8082 |
| 4 | Gateway | `com.luban.gateway.GatewayApplication` | `local` | 7573 |

## 🔧 IDEA 运行配置详解

### 1. Discovery（注册中心）无需修改

```
Name: lubase-discovery
Module: lubase-discovery
Main class: com.luban.discovery.DiscoveryApplication
Profile: 留空
```

### 2. UAA 配置

```
Name: lubase-uaa-local
Module: lubase-uaa
Main class: com.luban.uaa.UaaApplication
VM options: -Dspring.profiles.active=local
Working directory: $MODULE_DIR$
```

### 3. Product 配置

```
Name: lubase-product-local
Module: lubase-product
Main class: com.luban.product.ProductApplication
VM options: -Dspring.profiles.active=local
Working directory: $MODULE_DIR$
```

### 4. Gateway 配置

```
Name: lubase-gateway-local
Module: lubase-gateway
Main class: com.luban.gateway.GatewayApplication
VM options: -Dspring.profiles.active=local
Working directory: $MODULE_DIR$
```

## 🚀 第三步：启动前端（可选）

```bash
cd web
npm install  # 首次运行
npm run dev  # 启动开发服务器
```

访问 http://localhost:3000

## ✅ 启动后验证

```bash
# 1. 检查 Eureka 控制台
# 浏览器打开: http://localhost:8761

# 2. 获取 Token
curl -X POST http://localhost:7573/uaa/token \
  -H "Content-Type: application/json" \
  -d '{"username":"editor_1","password":"editor_1","grant_type":"password"}'

# 3. 查看产品列表
curl http://localhost:7573/product/list
```

## 📋 测试账号

| 用户名 | 密码 | 角色 |
|--------|------|------|
| user_1 | user_1 | USER |
| editor_1 | editor_1 | EDITOR |
| adm_1 | adm_1 | PRODUCT_ADMIN |
| ldap_user_1 | ldap_user_1 | USER (LDAP) |

## ⚠️ 注意事项

1. **必须先启动 Docker** - MySQL 和 LDAP 需要 Docker 运行环境
2. **启动顺序** - Discovery → UAA → Product → Gateway
3. **Profile 设置** - 一定要加 `-Dspring.profiles.active=local`
4. **端口占用** - 确保 3306, 389, 8761, 7573, 8082, 9999 端口未被占用

## 🔍 常见问题

### 端口被占用
```bash
lsof -i :7573
```

### 数据库连接失败
```bash
# 检查 MySQL 状态
docker exec lubase-mysql-dev mysqladmin ping -h localhost -uroot -proot
```

### LDAP 连接失败
```bash
# 检查 LDAP 日志
docker logs lubase-ldap-dev
```
