# LUBASE 生产环境部署指南

## 服务器信息
- **服务器地址**: 192.168.20.164
- **域名**: lubase.frp.zhenjiucheng.net (可选)

## 1. 前置条件

```bash
# 安装 Docker 和 Docker Compose
sudo apt update
sudo apt install docker.io docker-compose

# 启动 Docker
sudo systemctl start docker
sudo systemctl enable docker

# 添加当前用户到 docker 组（免 sudo 执行 docker）
sudo usermod -aG docker $USER
```

## 2. 部署步骤

### 2.1 上传代码到服务器

```bash
# 在本地打包
cd /root/IdeaProjects/demo

# 打包后端
mvn clean package -DskipTests -q

# 构建前端镜像
cd web
docker build -t lubase-frontend .
cd ..

# 上传整个项目到服务器
scp -r /root/IdeaProjects/demo root@192.168.20.164:/root/
```

### 2.2 在服务器上部署

```bash
# SSH 连接到服务器
ssh root@192.168.20.164

# 进入项目目录
cd /root/demo

# 启动所有服务（包含 nginx）
docker-compose -f docker-compose.yml up -d

# 启动 nginx（可选，作为统一入口）
docker-compose -f nginx/docker-compose.nginx.yml up -d
```

## 3. 服务访问

| 服务 | 地址 | 说明 |
|------|------|------|
| 前端 | http://192.168.20.164 | 通过 nginx 统一入口 |
| Gateway API | http://192.168.20.164/uaa | 认证服务 |
| 产品 API | http://192.168.20.164/product | 产品服务 |
| GitHub 回调 | http://192.168.20.164/login/oauth2/code/github | OAuth2 回调 |

## 4. GitHub OAuth 配置

### 4.1 更新 GitHub OAuth App

修改 GitHub OAuth App 的回调 URL：

```
http://192.168.20.164/login/oauth2/code/github
```

### 4.2 更新 UAA 配置

修改 `lubase-uaa/src/main/resources/application.yml`：

```yaml
spring:
  security:
    oauth2:
      client:
        registration:
          github:
            client-id: YOUR_GITHUB_CLIENT_ID
            client-secret: YOUR_GITHUB_CLIENT_SECRET

frontend:
  url: http://192.168.20.164
```

然后重新构建并部署 UAA。

## 5. HTTPS 配置（生产环境推荐）

使用 Let's Encrypt 免费证书：

```bash
# 安装 certbot
sudo apt install certbot python3-certbot-nginx

# 获取证书（替换域名）
sudo certbot --nginx -d lubase.frp.zhenjiucheng.net

# 自动续期
sudo certbot renew --dry-run
```

修改 `nginx/nginx.conf`，取消 HTTPS 部分的注释。

## 6. 常用命令

```bash
# 查看服务状态
docker-compose ps

# 查看日志
docker-compose logs -f

# 重启所有服务
docker-compose restart

# 重启单个服务
docker-compose restart uaa

# 停止所有服务
docker-compose down

# 清理数据（谨慎使用！）
docker-compose down -v
```

## 7. 健康检查

```bash
# 检查所有容器健康状态
docker-compose ps

# Nginx 健康检查
curl http://192.168.20.164/health

# Gateway 健康检查
curl http://192.168.20.164/gateway/actuator/health
```

## 8. 故障排查

### 8.1 检查服务日志
```bash
# 查看 UAA 日志
docker logs lubase-uaa

# 实时查看日志
docker-compose logs -f uaa
```

### 8.2 检查网络
```bash
# 检查 docker 网络
docker network ls
docker network inspect demo_lubase-network

# 测试容器间连通性
docker exec lubase-nginx ping lubase-gateway
```

### 8.3 常见问题

**Q: GitHub 登录回调失败**
- 检查 GitHub OAuth App 的回调 URL
- 检查 UAA 的 `frontend.url` 配置
- 查看 UAA 日志确认 GitHub OAuth 配置是否正确

**Q: 前端无法连接 API**
- 检查 nginx 配置是否正确转发
- 检查 gateway 服务是否正常运行
- 检查防火墙是否开放端口

**Q: Docker 容器启动失败**
- 检查端口是否被占用
- 检查磁盘空间
- 查看详细错误日志
