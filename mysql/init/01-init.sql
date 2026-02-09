# MySQL初始化脚本
# 创建产品数据库
CREATE DATABASE IF NOT EXISTS product DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

# 创建数据库用户（可选）
-- CREATE USER IF NOT EXISTS 'luban'@'%' IDENTIFIED BY 'luban';
-- GRANT ALL PRIVILEGES ON *.* TO 'luban'@'%';
-- FLUSH PRIVILEGES;
