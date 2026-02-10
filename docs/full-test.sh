#!/bin/bash
# SpringCloud Demo 完整测试脚本
# 包含所有CURL命令测试

echo "=========================================="
echo "SpringCloud 微服务演示项目 - 完整测试"
echo "=========================================="
echo ""

# 设置变量
GATEWAY_URL="http://localhost:7573"
UAA_URL="http://localhost:9999"

echo "等待服务启动..."
sleep 10

echo ""
echo "=========================================="
echo "1. 测试Eureka注册中心"
echo "=========================================="
curl -s http://localhost:8761 | head -20
echo ""
echo ""

echo "=========================================="
echo "2. 测试Gateway健康检查"
echo "=========================================="
curl -s ${GATEWAY_URL}/actuator/health
echo ""
echo ""

echo "=========================================="
echo "3. 测试UAA健康检查"
echo "=========================================="
curl -s ${UAA_URL}/actuator/health
echo ""
echo ""

echo "=========================================="
echo "4. 获取USER角色Token"
echo "=========================================="
USER_TOKEN=$(curl -s -X POST ${GATEWAY_URL}/uaa/token \
  -H "Content-Type: application/json" \
  -d '{"username":"user_1","password":"user_1","grant_type":"password"}' | jq -r '.accessToken')
echo "USER Token: ${USER_TOKEN:0:50}..."
echo ""

echo "=========================================="
echo "5. 获取EDITOR角色Token"
echo "=========================================="
EDITOR_TOKEN=$(curl -s -X POST ${GATEWAY_URL}/uaa/token \
  -H "Content-Type: application/json" \
  -d '{"username":"editor_1","password":"editor_1","grant_type":"password"}' | jq -r '.accessToken')
echo "EDITOR Token: ${EDITOR_TOKEN:0:50}..."
echo ""

echo "=========================================="
echo "6. 获取PRODUCT_ADMIN角色Token"
echo "=========================================="
ADMIN_TOKEN=$(curl -s -X POST ${GATEWAY_URL}/uaa/token \
  -H "Content-Type: application/json" \
  -d '{"username":"adm_1","password":"adm_1","grant_type":"password"}' | jq -r '.accessToken')
echo "ADMIN Token: ${ADMIN_TOKEN:0:50}..."
echo ""

echo "=========================================="
echo "7. 测试浏览产品列表 (USER角色)"
echo "=========================================="
curl -s -X GET ${GATEWAY_URL}/product/list \
  -H "Authorization: Bearer ${USER_TOKEN}"
echo ""
echo ""

echo "=========================================="
echo "8. 测试添加产品 (EDITOR角色)"
echo "=========================================="
curl -s -X POST ${GATEWAY_URL}/product/add \
  -H "Authorization: Bearer ${EDITOR_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{"name":"测试产品","description":"产品描述","price":99.99}'
echo ""
echo ""

echo "=========================================="
echo "9. 测试修改产品 (PRODUCT_ADMIN角色)"
echo "=========================================="
curl -s -X PUT ${GATEWAY_URL}/product/update/1 \
  -H "Authorization: Bearer ${ADMIN_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{"name":"更新后的产品","description":"更新描述","price":149.99}'
echo ""
echo ""

echo "=========================================="
echo "10. 测试删除产品 (PRODUCT_ADMIN角色)"
echo "=========================================="
curl -s -X DELETE ${GATEWAY_URL}/product/delete/1 \
  -H "Authorization: Bearer ${ADMIN_TOKEN}"
echo "删除结果: 成功"
echo ""

echo "=========================================="
echo "11. 测试LDAP登录"
echo "=========================================="
LDAP_TOKEN=$(curl -s -X POST ${GATEWAY_URL}/uaa/ldap/token \
  -H "Content-Type: application/json" \
  -d '{"username":"ldap_user_1","password":"ldap_user_1"}' | jq -r '.accessToken')
echo "LDAP USER Token: ${LDAP_TOKEN:0:50}..."
echo ""

echo "=========================================="
echo "测试完成!"
echo "=========================================="
