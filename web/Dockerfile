# 多阶段构建前端应用
FROM node:20-alpine AS builder

# 使用阿里云镜像源加速
RUN npm config set registry https://registry.npmmirror.com && \
    npm install -g pnpm

# 设置工作目录
WORKDIR /app

# 复制 package 文件
COPY package*.json pnpm-lock.yaml ./

# 安装依赖
RUN pnpm install

# 复制源代码
COPY . .

# 构建应用
RUN pnpm build

# 生产阶段
FROM nginx:alpine

# 复制构建产物
COPY --from=builder /app/dist /usr/share/nginx/html

# 复制 nginx 配置
COPY nginx.conf /etc/nginx/nginx.conf

# 暴露端口
EXPOSE 80

# 启动 nginx
CMD ["nginx", "-g", "daemon off;"]
