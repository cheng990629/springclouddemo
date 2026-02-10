#!/bin/bash

# LUBASE 一键部署脚本 - 在服务器 192.168.20.164 上执行

set -e

echo "=========================================="
echo "  LUBASE 一键部署脚本"
echo "=========================================="
echo ""

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# 检查 Docker
if ! docker info &>/dev/null; then
    echo -e "${RED}错误: Docker 未运行${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Docker 已运行${NC}"

# 进入项目目录
cd /root/demo

# 停止旧容器
echo ""
echo -e "${YELLOW}停止旧容器...${NC}"
docker compose down 2>/dev/null || true
docker compose -f nginx/docker-compose.nginx.yml down 2>/dev/null || true

# 清理旧镜像，释放空间
echo ""
echo -e "${YELLOW}清理旧镜像...${NC}"
docker rmi lubase-frontend 2>/dev/null || true

# 拉取最新代码
echo ""
echo -e "${YELLOW}拉取最新代码...${NC}"
git pull origin main 2>/dev/null || echo "使用现有代码"

# 打包后端
echo ""
echo -e "${YELLOW}打包后端服务...${NC}"
mvn clean package -DskipTests -q
echo -e "${GREEN}✓ 后端打包完成${NC}"

# 构建前端镜像
echo ""
echo -e "${YELLOW}构建前端镜像...${NC}"
cd web
docker build -t lubase-frontend .
cd ..
echo -e "${GREEN}✓ 前端镜像构建完成${NC}"

# 启动所有服务
echo ""
echo -e "${YELLOW}启动 Docker 服务...${NC}"
docker compose up -d

# 等待服务启动
echo ""
echo -e "${YELLOW}等待服务启动...${NC}"
sleep 30

# 检查服务状态
echo ""
echo "=========================================="
echo -e "${GREEN}✓ 部署完成！${NC}"
echo "=========================================="
echo ""
echo "服务状态:"
docker compose ps
echo ""
echo "访问地址:"
echo "  - 前端: http://192.168.20.164"
echo "  - UAA: http://192.168.20.164:9999"
echo ""
echo "查看日志:"
echo "  docker compose logs -f"