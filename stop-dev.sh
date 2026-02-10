#!/bin/bash

# LUBASE 开发环境停止脚本

echo "=========================================="
echo "  LUBASE 开发环境停止脚本"
echo "=========================================="
echo ""

# 停止基础设施
echo "停止基础设施 (MySQL, LDAP)..."
docker-compose -f docker-compose.dev.yml down -v

echo ""
echo "✅ 已停止所有开发环境服务"
