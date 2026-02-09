# SpringCloud微服务演示项目

## 项目概述

本项目是一个完整的SpringCloud微服务演示系统，包括：
- **UAA认证服务** - 支持用户名密码、GitHub OAuth2、LDAP登录
- **Gateway网关** - 统一API入口 (端口: 7573)
- **Discovery服务注册中心** - Eureka Server (端口: 8761)
- **Configure配置中心** - Spring Cloud Config (端口: 8888)
- **Product产品服务** - 产品CRUD API

## 技术栈

- Java 17
- Spring Boot 3.2.0
- Spring Cloud 2023.0.0
- Maven 3.9.x
- MySQL 8.0
- LDAP (osixia/openldap)
- Docker & Docker Compose

## 快速开始

### 环境要求

- JDK 17+
- Maven 3.9+
- Docker & Docker Compose

### 1. 构建项目

```bash
mvn clean install
```

### 2. 启动服务

```bash
docker-compose up -d
```

### 3. 验证服务状态

```bash
# 检查Eureka注册中心
curl http://localhost:8761

# 检查Gateway健康状态
curl http://localhost:7573/actuator/health

# 检查UAA服务健康状态
curl http://localhost:9999/actuator/health
```

## 用户账号

### 数据库用户

| 角色 | 用户名 | 密码 |
|------|--------|------|
| 普通用户 | user_1 | user_1 |
| EDITOR | editor_1 | editor_1 |
| PRODUCT_ADMIN | adm_1 | adm_1 |

### LDAP用户

| 角色 | 用户名 | 密码 |
|------|--------|------|
| 普通用户 | ldap_user_1 | ldap_user_1 |
| EDITOR | ldap_editor_1 | ldap_editor_1 |
| PRODUCT_ADMIN | ldap_adm_1 | ldap_adm_1 |

## API接口

### 获取Access Token (用户名密码登录)

```bash
curl -X POST http://localhost:7573/uaa/token \
  -H "Content-Type: application/json" \
  -d '{
    "username": "user_1",
    "password": "user_1",
    "grant_type": "password"
  }'
```

### 获取Access Token (LDAP登录)

```bash
curl -X POST http://localhost:7573/uaa/ldap/token \
  -H "Content-Type: application/json" \
  -d '{
    "username": "ldap_user_1",
    "password": "ldap_user_1"
  }'
```

### 浏览产品列表 (需要角色: USER, EDITOR, PRODUCT_ADMIN)

```bash
curl -X GET http://localhost:7573/product/list \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

### 添加产品 (需要角色: EDITOR, PRODUCT_ADMIN)

```bash
curl -X POST http://localhost:7573/product/add \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "产品A",
    "description": "产品描述",
    "price": 99.99
  }'
```

### 修改产品 (需要角色: EDITOR, PRODUCT_ADMIN)

```bash
curl -X PUT http://localhost:7573/product/update/1 \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "产品A-更新",
    "description": "更新后的描述",
    "price": 149.99
  }'
```

### 删除产品 (需要角色: EDITOR, PRODUCT_ADMIN)

```bash
curl -X DELETE http://localhost:7573/product/delete/1 \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

## 角色权限说明

- **USER**: 可以浏览产品列表
- **EDITOR**: 拥有USER所有权限，可以添加、修改、删除产品
- **PRODUCT_ADMIN**: 拥有EDITOR和USER所有权限

## 服务端口

| 服务 | 端口 | 说明 |
|------|------|------|
| Gateway | 7573 | API网关，对外暴露 |
| Discovery | 8761 | Eureka注册中心 |
| Configure | 8888 | 配置中心 |
| UAA | 9999 | 认证服务 |
| Product | 8082 | 产品服务 |
| MySQL | 3306 | 数据库 |
| LDAP | 389 | LDAP服务 |

## Docker Compose服务说明

```yaml
services:
  mysql:      # MySQL数据库
  ldap:       # LDAP服务
  discovery:  # Eureka服务注册中心
  configure:  # 配置中心
  uaa:        # UAA认证服务
  gateway:    # API网关
  product:    # 产品服务
```

## GitHub OAuth2配置

1. 在GitHub创建OAuth App
2. 获取Client ID和Client Secret
3. 配置到uaa-service的application.yml中:

```yaml
spring.security.oauth2.client.registration.github.client-id=YOUR_CLIENT_ID
spring.security.oauth2.client.registration.github.client-secret=YOUR_CLIENT_SECRET
```

回调URL: `http://localhost:9999/login/oauth2/code/github`

## 测试步骤

### 1. 获取token

```bash
# 获取USER角色的token
TOKEN=$(curl -s -X POST http://localhost:7573/uaa/token \
  -H "Content-Type: application/json" \
  -d '{"username":"user_1","password":"user_1","grant_type":"password"}' | jq -r '.accessToken')
echo "Token: $TOKEN"
```

### 2. 访问产品列表

```bash
curl -X GET http://localhost:7573/product/list \
  -H "Authorization: Bearer $TOKEN"
```

### 3. 测试添加产品（需要EDITOR权限）

```bash
# 获取EDITOR角色的token
EDITOR_TOKEN=$(curl -s -X POST http://localhost:7573/uaa/token \
  -H "Content-Type: application/json" \
  -d '{"username":"editor_1","password":"editor_1","grant_type":"password"}' | jq -r '.accessToken')

# 添加产品
curl -X POST http://localhost:7573/product/add \
  -H "Authorization: Bearer $EDITOR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name":"测试产品","description":"描述","price":100}'
```

## 注意事项

1. 确保Docker和Docker Compose已安装
2. 首次启动时，MySQL和LDAP需要一些时间初始化
3. 确保端口7573、8761、8888、9999、3306、389未被占用
4. 如果遇到权限问题，请确保Docker有足够的权限

## 常见问题

### 1. 服务无法启动
检查端口是否被占用：
```bash
lsof -i :7573
lsof -i :8761
```

### 2. MySQL连接失败
等待MySQL完全启动后再启动其他服务

### 3. LDAP初始化失败
检查LDAP容器日志：
```bash
docker-compose logs ldap
```

## 项目结构

```
springcloud-demo/
├── pom.xml                    # 父POM
├── docker-compose.yml         # Docker Compose配置
├── README.md                  # 项目说明
├── uaa-service/              # UAA认证服务
│   ├── src/main/java/
│   ├── src/main/resources/
│   └── src/main/docker/
├── gateway-service/           # 网关服务
├── discovery-service/        # 服务注册中心
├── configure-service/        # 配置中心
├── product-service/          # 产品服务
├── mysql/
│   └── init/                # MySQL初始化脚本
└── ldap/
    └── init/                # LDAP初始化脚本
```

## 作者

lizhijiang@luban-cae.com

## 许可证

MIT License
