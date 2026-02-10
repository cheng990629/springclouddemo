# Lubase - 鲁班 Cloud Demo(笔试demo)

## 项目概述

**Lubase** 是一个完整的SpringCloud微服务架构实践演示项目。

### 项目信息

- **项目名称**: Lubase（鲁班笔试Demo）
- **版本**: 1.0.0
- **创建时间**: 2026-02-09

### 联系方式

- **联系人**: 高成
- **电话**: 18941959525
- **邮箱**: cheng990629@gmail.com

### 服务列表

本项目包含以下微服务：
- **UAA认证服务** (端口9999) - 用户认证（用户名密码、LDAP）
- **Gateway网关** (端口7573) - API网关
- **Discovery注册中心** (端口8761) - 服务注册与发现
- **Configure配置中心** (端口8888) - 配置管理
- **Product产品服务** (端口8082) - 产品CRUD API
- **Frontend前端** (端口3000) - React + Tailwind CSS UI

## 技术栈

### 后端技术栈

- **JDK版本**: 17
- **Spring Boot版本**: 3.2.0
- **Spring Cloud版本**: 2023.0.0
- **构建工具**: Maven 3.9.x
- **数据库**: MySQL 8.0
- **认证服务**: LDAP (OpenLDAP)
- **容器化**: Docker + Docker Compose

### 前端技术栈

- **React 18** - 前端框架
- **Tailwind CSS 3** - 样式框架
- **Vite 5** - 构建工具
- **React Router 6** - 路由管理
- **Axios** - HTTP客户端

## 快速启动

### 前提条件

1. JDK 17+
2. Maven 3.9+
3. Docker & Docker Compose

### 构建和启动

```bash
# 1. 构建所有服务
mvn clean package -DskipTests

# 2. 启动所有服务
docker-compose up -d
```

### 服务端口说明

| 服务 | 端口 | 描述 |
|------|------|------|
| Frontend | 3000 | 前端UI界面 |
| Gateway | 7573 | API网关入口 |
| Discovery | 8761 | Eureka控制台 |
| UAA | 9999 | 认证服务 |
| Product | 8082 | 产品服务 |
| MySQL | 3306 | 数据库 |
| LDAP | 389 | LDAP服务 |

## 默认用户

### 数据库用户 (MySQL)

| 用户名 | 密码 | 角色 |
|--------|------|------|
| user_1 | user_1 | USER |
| editor_1 | editor_1 | EDITOR |
| adm_1 | adm_1 | PRODUCT_ADMIN |

### LDAP用户

| 用户名 | 密码 | 角色 |
|--------|------|------|
| ldap_user_1 | ldap_user_1 | USER |
| ldap_editor_1 | ldap_editor_1 | EDITOR |
| ldap_adm_1 | ldap_adm_1 | PRODUCT_ADMIN |

## API测试

> **服务器地址**: 192.168.20.164
> **Gateway端口**: 7573

### 1. 获取ACCESS TOKEN (用户名密码)

```bash
# 普通用户 (USER角色)
TOKEN=$(curl -s -X POST http://192.168.20.164:7573/uaa/token \
  -H "Content-Type: application/json" \
  -d '{"username":"user_1","password":"user_1","grant_type":"password"}' | grep -o '"accessToken":"[^"]*"' | cut -d'"' -f4)
echo "USER Token: $TOKEN"
```

### 2. LDAP登录

```bash
# LDAP用户登录
TOKEN=$(curl -s -X POST http://192.168.20.164:7573/uaa/ldap/token \
  -H "Content-Type: application/json" \
  -d '{"username":"ldap_user_1","password":"ldap_user_1"}' | grep -o '"accessToken":"[^"]*"' | cut -d'"' -f4)
echo "LDAP Token: $TOKEN"
```

### 3. 浏览产品列表 (需要USER角色)

```bash
TOKEN=$(curl -s -X POST http://192.168.20.164:7573/uaa/token \
  -H "Content-Type: application/json" \
  -d '{"username":"user_1","password":"user_1","grant_type":"password"}' | grep -o '"accessToken":"[^"]*"' | cut -d'"' -f4)
curl -X GET http://192.168.20.164:7573/product/list \
  -H "Authorization: Bearer $TOKEN"
```

### 4. 添加产品 (需要EDITOR或PRODUCT_ADMIN角色)

```bash
TOKEN=$(curl -s -X POST http://192.168.20.164:7573/uaa/token \
  -H "Content-Type: application/json" \
  -d '{"username":"editor_1","password":"editor_1","grant_type":"password"}' | grep -o '"accessToken":"[^"]*"' | cut -d'"' -f4)
curl -X POST http://192.168.20.164:7573/product/add \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name":"新产品","description":"新产品描述","price":299.99}'
```

### 5. 修改产品 (需要EDITOR或PRODUCT_ADMIN角色)

```bash
TOKEN=$(curl -s -X POST http://192.168.20.164:7573/uaa/token \
  -H "Content-Type: application/json" \
  -d '{"username":"editor_1","password":"editor_1","grant_type":"password"}' | grep -o '"accessToken":"[^"]*"' | cut -d'"' -f4)
curl -X PUT http://192.168.20.164:7573/product/update/1 \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name":"更新产品","description":"更新后的描述","price":159.99}'
```

### 6. 删除产品 (需要EDITOR或PRODUCT_ADMIN角色)

```bash
TOKEN=$(curl -s -X POST http://192.168.20.164:7573/uaa/token \
  -H "Content-Type: application/json" \
  -d '{"username":"editor_1","password":"editor_1","grant_type":"password"}' | grep -o '"accessToken":"[^"]*"' | cut -d'"' -f4)
curl -X DELETE http://192.168.20.164:7573/product/delete/3 \
  -H "Authorization: Bearer $TOKEN"
```

## 角色权限说明

| 角色 | 权限 |
|------|------|
| USER | 浏览产品列表 |
| EDITOR | 浏览、添加、修改、删除产品 |
| PRODUCT_ADMIN | 所有权限 |

## 前端

前端使用 React + Tailwind CSS 构建，提供现代化的用户界面。

### 前端功能

1. **登录页面**
   - 支持用户名密码登录
   - 支持LDAP登录
   - 快速测试账号按钮

2. **仪表板**
   - 产品列表展示
   - 添加/编辑/删除产品（需要对应权限）
   - 角色徽章显示

### 访问前端

- **URL**: http://192.168.20.164:3000
- **API代理**: http://192.168.20.164:3000/uaa 和 http://192.168.20.164:3000/product

## 目录结构

```
├── docker-compose.yml          # Docker Compose配置
├── pom.xml                     # 父POM
├── lubase-uaa/                # UAA认证服务
├── lubase-gateway/           # Gateway网关
├── lubase-discovery/         # Eureka注册中心
├── lubase-configure/         # 配置中心
├── lubase-product/           # 产品服务
├── web/                      # 前端UI
├── sql/                      # MySQL初始化脚本
├── ldap/                     # LDAP初始化数据
└── README.md                  # 本文档
```

## 故障排除

### 问题: 端口被占用

```bash
# 查看占用端口的进程
lsof -i :7573
# 或使用docker-compose修改端口映射
```

### 问题: 服务无法启动

```bash
# 查看日志
docker-compose logs uaa
docker-compose logs product

# 重新构建
docker-compose build --no-cache
docker-compose up -d
```

### 问题: 无法连接到数据库

```bash
# 检查MySQL状态
docker-compose exec mysql mysql -uroot -proot

# 检查网络
docker network inspect lubase lubase-network
```

## 注意事项

1. **JWT Secret**: 当前使用硬编码的密钥，生产环境请使用环境变量
2. **GitHub OAuth2**: 需要配置client-id和client-secret
3. **健康检查**: 部分服务健康检查状态可能不是UP，但服务本身正常工作
4. **LDAP**: LDAP服务已配置，用户可以直接登录

## 版权声明

- **项目名称**: Lubase（鲁班笔试Demo）
- **联系人**: 高成
- **电话**: 18941959525
- **邮箱**: cheng990629@gmail.com
