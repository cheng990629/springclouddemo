#!/bin/bash
# SpringCloud Demo 远程部署脚本
# 部署到 192.168.20.164

set -e

# 配置变量
REMOTE_HOST="192.168.20.164"
REMOTE_USER="root"
REMOTE_DIR="/root/springcloud-demo"
PROJECT_DIR="/root/IdeaProjects/demo"

echo "=========================================="
echo "SpringCloud 微服务远程部署脚本"
echo "目标服务器: ${REMOTE_HOST}"
echo "=========================================="
echo ""

# 1. 检查本地环境
echo "1. 检查本地环境..."
echo "   - 检查Maven..."
if ! command -v mvn &> /dev/null; then
    echo "   ✗ Maven未安装"
    exit 1
fi
echo "   ✓ Maven已安装"

echo "   - 检查Docker..."
if ! command -v docker &> /dev/null; then
    echo "   ✗ Docker未安装"
    exit 1
fi
echo "   ✓ Docker已安装"

echo "   - 检查SSH..."
if ! command -v ssh &> /dev/null; then
    echo "   ✗ SSH未安装"
    exit 1
fi
echo "   ✓ SSH已安装"
echo ""

# 2. 构建项目
echo "2. 构建项目..."
cd ${PROJECT_DIR}
mvn clean package -DskipTests -f ${PROJECT_DIR}/pom.xml
echo "   ✓ 项目构建成功"
echo ""

# 3. 压缩项目文件
echo "3. 压缩项目文件..."
cd ${PROJECT_DIR}
tar -czvf springcloud-demo.tar.gz \
    --exclude='target' \
    --exclude='.git' \
    --exclude='.idea' \
    --exclude='*.tar.gz' \
    .
echo "   ✓ 文件压缩完成: springcloud-demo.tar.gz"
echo ""

# 4. 传输文件到远程服务器
echo "4. 传输文件到远程服务器..."
echo "   传输中，请稍候..."
scp springcloud-demo.tar.gz ${REMOTE_USER}@${REMOTE_HOST}:~/
echo "   ✓ 文件传输成功"
echo ""

# 5. 在远程服务器上执行部署
echo "5. 在远程服务器上执行部署..."
ssh ${REMOTE_USER}@${REMOTE_HOST} << 'REMOTE_EOF'
set -e

PROJECT_DIR="/root/springcloud-demo"
cd ~

# 解压文件
echo "   - 解压文件..."
tar -xzvf springcloud-demo.tar.gz
rm -f springcloud-demo.tar.gz

# 进入项目目录
cd ${PROJECT_DIR}

# 给脚本添加执行权限
chmod +x test.sh full-test.sh

# 构建Docker镜像
echo "   - 构建Docker镜像..."
docker-compose build

# 启动服务
echo "   - 启动服务..."
docker-compose up -d

# 等待服务启动
echo "   - 等待服务启动 (30秒)..."
sleep 30

# 检查服务状态
echo ""
echo "   - 检查服务状态..."
docker-compose ps

# 检查健康状态
echo ""
echo "   - 检查服务健康状态..."
echo "Eureka: $(curl -s http://localhost:8761/actuator/health | head -1 || echo '未就绪')"
echo "Gateway: $(curl -s http://localhost:7573/actuator/health | head -1 || echo '未就绪')"
echo "UAA: $(curl -s http://localhost:9999/actuator/health | head -1 || echo '未就绪')"

echo ""
echo "=========================================="
echo "部署完成!"
echo "=========================================="
echo ""
echo "访问地址:"
echo "  - Eureka注册中心: http://192.168.20.164:8761"
echo "  - Gateway网关: http://192.168.20.164:7573"
echo ""
echo "测试命令:"
echo "  获取TOKEN: curl -X POST http://192.168.20.164:7573/uaa/token -H 'Content-Type: application/json' -d '{\"username\":\"user_1\",\"password\":\"user_1\",\"grant_type\":\"password\"}'"
echo ""
echo "查看日志: docker-compose logs -f"
echo "停止服务: docker-compose down"
echo ""
REMOTE_EOF

echo ""
echo "=========================================="
echo "远程部署完成!"
echo "=========================================="
