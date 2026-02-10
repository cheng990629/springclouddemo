#!/bin/bash
# SpringCloud Demo 纯Docker部署脚本
# 适用于服务器上没有Java/Maven环境的情况

set -e

REMOTE_HOST="192.168.20.164"
REMOTE_USER="root"
REMOTE_DIR="/root/IdeaProjects/demo"
PROJECT_DIR="/root/IdeaProjects/demo"

echo "=========================================="
echo "SpringCloud 微服务 Docker部署"
echo "目标服务器: ${REMOTE_HOST}"
echo "=========================================="
echo ""

# 1. 检查本地环境
echo "1. 检查本地环境..."
echo "   - 检查Docker..."
if ! command -v docker &> /dev/null; then
    echo "   ✗ Docker未安装"
    exit 1
fi
echo "   ✓ Docker已安装"
echo ""

# 2. 传输项目文件
echo "2. 传输项目文件到远程服务器..."
echo "   传输中，请稍候..."

# 创建临时排除列表
cat > /tmp/rsync-exclude.txt << 'EOF'
target
.git
.idea
*.tar.gz
*.log
EOF

# 使用rsync传输（如果没有rsync，使用scp）
if command -v rsync &> /dev/null; then
    rsync -avz --exclude-from=/tmp/rsync-exclude.txt \
        ${PROJECT_DIR}/ \
        ${REMOTE_USER}@${REMOTE_HOST}:${REMOTE_DIR}/
else
    # 使用scp传输（排除大文件）
    cd ${PROJECT_DIR}
    find . -type f -name "*.jar" -exec rm -f {} \; 2>/dev/null || true
    find . -type d -name "target" -exec rm -rf {} \; 2>/dev/null || true
    scp -r $(ls -A | grep -v -E '^\.|target|*.tar.gz') \
        ${REMOTE_USER}@${REMOTE_HOST}:${REMOTE_DIR}/ 2>/dev/null || true
    
    # 逐个传输大文件
    for dir in uaa-service gateway-service discovery-service configure-service product-service; do
        if [ -d "$dir" ]; then
            echo "   传输 $dir..."
            scp -r $dir ${REMOTE_USER}@${REMOTE_HOST}:${REMOTE_DIR}/ 2>/dev/null || true
        fi
    done
fi

echo "   ✓ 文件传输完成"
echo ""

# 3. 在远程服务器上执行Docker部署
echo "3. 在远程服务器上执行部署..."
ssh ${REMOTE_USER}@${REMOTE_HOST} << 'REMOTE_EOF'
set -e

cd /root/IdeaProjects/demo

# 给脚本添加执行权限
chmod +x test.sh full-test.sh deploy.sh 2>/dev/null || true

# 检查并停止旧容器
echo "   - 停止旧容器..."
docker-compose down 2>/dev/null || true
docker-compose ps 2>/dev/null || true

# 构建所有Docker镜像
echo "   - 构建Docker镜像 (这可能需要几分钟)..."
echo "     正在构建 uaa-service..."
docker build -t uaa-service ./uaa-service/src/main/docker/ 2>&1 || true

echo "     正在构建 gateway-service..."
docker build -t gateway-service ./gateway-service/src/main/docker/ 2>&1 || true

echo "     正在构建 discovery-service..."
docker build -t discovery-service ./discovery-service/src/main/docker/ 2>&1 || true

echo "     正在构建 configure-service..."
docker build -t configure-service ./configure-service/src/main/docker/ 2>&1 || true

echo "     正在构建 product-service..."
docker build -t product-service ./product-service/src/main/docker/ 2>&1 || true

echo "   ✓ Docker镜像构建完成"

# 启动服务
echo "   - 启动服务..."
docker-compose up -d

# 等待服务启动
echo "   - 等待服务启动 (60秒)..."
sleep 60

# 检查服务状态
echo ""
echo "   - 服务状态:"
docker-compose ps

# 检查健康状态
echo ""
echo "   - 健康检查:"
echo "     Eureka: $(curl -s http://localhost:8761/actuator/health 2>/dev/null | head -c 100 || echo '未就绪')"
echo "     Gateway: $(curl -s http://localhost:7573/actuator/health 2>/dev/null | head -c 100 || echo '未就绪')"
echo "     UAA: $(curl -s http://localhost:9999/actuator/health 2>/dev/null | head -c 100 || echo '未就绪')"

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
echo "常用命令:"
echo "  查看日志: docker-compose logs -f"
echo "  停止服务: docker-compose down"
echo "  重启服务: docker-compose restart"
REMOTE_EOF

echo ""
echo "=========================================="
echo "部署命令已发送!"
echo "=========================================="
