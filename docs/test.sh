#!/bin/bash
# SpringCloud Demo 测试脚本
# 用于验证项目的基本功能

echo "=========================================="
echo "SpringCloud 微服务演示项目 - 测试脚本"
echo "=========================================="
echo ""

# 检查Java版本
echo "1. 检查Java版本..."
java -version
echo ""

# 检查Maven版本
echo "2. 检查Maven版本..."
mvn -version
echo ""

# 检查Docker
echo "3. 检查Docker版本..."
docker --version
echo ""

# 检查Docker Compose
echo "4. 检查Docker Compose版本..."
docker-compose --version
echo ""

# 构建项目
echo "5. 构建项目..."
mvn clean package -DskipTests
if [ $? -eq 0 ]; then
    echo "✓ 构建成功"
else
    echo "✗ 构建失败"
    exit 1
fi
echo ""

# 显示可用的JAR文件
echo "6. 构建的JAR文件:"
ls -lh */target/*.jar 2>/dev/null
echo ""

echo "=========================================="
echo "测试完成!"
echo "=========================================="
echo ""
echo "启动服务:"
echo "  docker-compose up -d"
echo ""
echo "验证服务:"
echo "  curl http://localhost:8761          # Eureka注册中心"
echo "  curl http://localhost:7573/actuator/health  # Gateway健康检查"
echo ""

