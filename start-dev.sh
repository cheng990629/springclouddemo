#!/bin/bash

# LUBASE 开发环境启动脚本
# 用于本地开发，后端服务直接运行在本地

set -e

echo "=========================================="
echo "  LUBASE 开发环境启动脚本"
echo "=========================================="
echo ""

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 检查Docker是否运行
if ! docker info &>/dev/null; then
    echo -e "${RED}错误: Docker 未运行，请先启动 Docker${NC}"
    exit 1
fi

# 1. 启动基础设施 (MySQL, LDAP)
echo -e "${YELLOW}步骤 1/4: 启动基础设施 (MySQL, LDAP)...${NC}"
docker-compose -f docker-compose.dev.yml up -d
echo -e "${GREEN}✓ 基础设施已启动${NC}"

# 2. 等待 MySQL 健康
echo ""
echo -e "${YELLOW}步骤 2/4: 等待 MySQL 启动...${NC}"
for i in {1..30}; do
    if docker exec lubase-mysql-dev mysqladmin ping -h localhost -uroot -proot &>/dev/null; then
        echo -e "${GREEN}✓ MySQL 已就绪${NC}"
        break
    fi
    if [ $i -eq 30 ]; then
        echo -e "${RED}✗ MySQL 启动超时${NC}"
        exit 1
    fi
    sleep 1
done

# 3. 构建后端服务
echo ""
echo -e "${YELLOW}步骤 3/4: 构建后端服务...${NC}"
mvn clean package -DskipTests -q
echo -e "${GREEN}✓ 构建完成${NC}"

# 4. 启动后端服务
echo ""
echo -e "${YELLOW}步骤 4/4: 启动后端服务...${NC}"

# 启动 UAA (认证服务)
echo "启动 UAA 服务..."
java -jar lubase-uaa/target/lubase-uaa-1.0.0.jar --spring.profiles.active=local &
UAA_PID=$!
echo "UAA PID: $UAA_PID"

# 启动 Product (产品服务)
echo "启动 Product 服务..."
java -jar lubase-product/target/lubase-product-1.0.0.jar --spring.profiles.active=local &
PRODUCT_PID=$!
echo "Product PID: $PRODUCT_PID"

# 启动 Gateway (网关)
echo "启动 Gateway 服务..."
java -jar lubase-gateway/target/lubase-gateway-1.0.0.jar --spring.profiles.active=local &
GATEWAY_PID=$!
echo "Gateway PID: $GATEWAY_PID"

echo ""
echo "=========================================="
echo -e "${GREEN}✅ 开发环境启动完成！${NC}"
echo "=========================================="
echo ""
echo "服务访问地址:"
echo "  - Gateway:    http://localhost:7573"
echo "  - UAA:       http://localhost:9999"
echo "  - Product:   http://localhost:8082"
echo "  - MySQL:     localhost:3306 (root/root)"
echo "  - LDAP:      localhost:389 (admin/admin)"
echo ""
echo "API 测试:"
echo "  获取 Token:"
echo "    curl -X POST http://localhost:7573/uaa/token \\"
echo "      -H 'Content-Type: application/json' \\"
echo "      -d '{\"username\":\"editor_1\",\"password\":\"editor_1\",\"grant_type\":\"password\"}'"
echo ""
echo "测试用户:"
echo "  - editor_1/editor_1 (EDITOR 角色)"
echo "  - user_1/user_1 (USER 角色)"
echo "  - adm_1/adm_1 (PRODUCT_ADMIN 角色)"
echo "  - ldap_user_1/ldap_user_1 (LDAP USER 角色)"
echo ""
echo "按 Ctrl+C 停止所有服务"
echo ""

# 等待用户中断
trap "echo '停止服务...'; kill $UAA_PID $PRODUCT_PID $GATEWAY_PID 2>/dev/null; exit" INT
wait
