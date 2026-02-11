# 🔧 环境配置信息

## 📅 记录时间
- **记录日期**: 2026年1月7日
- **环境验证**: ✅ 所有工具正常工作

## 💻 系统环境

### 操作系统
```bash
PRETTY_NAME="Ubuntu 24.04.2 LTS"
NAME="Ubuntu"
VERSION_ID="24.04"
VERSION="24.04.2 LTS (Noble Numbat)"
VERSION_CODENAME=noble
ID=ubuntu
ID_LIKE=debian
```

### 系统详情
- **内核**: Linux 6.6.87.1-microsoft-standard-WSL2
- **架构**: x86_64 GNU/Linux
- **运行环境**: WSL2 (Windows Subsystem for Linux 2)
- **CPU**: 13th Gen Intel(R) Core(TM) i7-13700KF (24核)

## 🛠️ 开发工具版本

### Node.js 生态
- **Node.js**: `v22.20.0` ✅
- **npm**: `10.9.3` ✅
- **pnpm**: `10.24.0` ✅

### 项目依赖版本
```json
{
  "typescript": "^5.9.3",
  "react": "^19.2.1",
  "react-dom": "^19.2.1",
  "vite": "^7.3.0",
  "@ant-design/x": "^2.1.2",
  "antd": "^6.1.1",
  "eslint": "^9.39.2"
}
```

## 📦 包管理器配置

### 当前配置
- **主要包管理器**: pnpm
- **锁定文件**: `pnpm-lock.yaml`
- **安装策略**: 硬链接 (pnpm 特性)

### 命令对照
```bash
# npm → pnpm
npm install          → pnpm install
npm run dev          → pnpm run dev
npm run build        → pnpm run build
npm run lint         → pnpm run lint
npm add <pkg>        → pnpm add <pkg>
npm add -D <pkg>     → pnpm add -D <pkg>
npm update           → pnpm update
npm ci               → pnpm install --frozen-lockfile
```

## 🔍 兼容性验证

### Node.js 特性支持
- ✅ ES2022+ 特性
- ✅ React 19 支持
- ✅ TypeScript 5.x 支持
- ✅ Vite 7.x 支持

### 构建验证
```bash
pnpm install    # ✅ 成功
pnpm run build  # ✅ 成功
pnpm run lint   # ✅ 成功
```

## 📊 性能基准

### 安装性能
- **冷安装时间**: ~30秒 (pnpm 优化)
- **热安装时间**: ~5秒 (pnpm 缓存)
- **磁盘占用**: ~500MB (pnpm 硬链接节省空间)

### 构建性能
- **开发服务器启动**: ~3秒
- **生产构建**: ~45秒
- **HMR 更新**: ~200ms

## 🚨 注意事项

### 版本要求
- **最低 Node.js**: 18.0.0 (项目 package.json)
- **推荐 Node.js**: 20.0.0+ (最佳兼容性)
- **pnpm**: 8.0.0+ (工作空间支持)

### 已知问题
- 无特定环境问题
- WSL2 下文件权限正常
- Git 操作正常

## 🔄 更新记录

| 日期 | 更新内容 | 验证状态 |
|------|----------|----------|
| 2026-01-07 | 初始环境配置记录 | ✅ 全部验证通过 |
| 2026-01-07 | 统一使用 pnpm | ✅ 配置完成 |

## 📞 环境恢复

如果需要在新环境中恢复：
```bash
# 1. 安装 Node.js (推荐使用 nvm)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install 22.20.0
nvm use 22.20.0

# 2. 安装 pnpm
npm install -g pnpm

# 3. 验证版本
node --version  # v22.20.0
pnpm --version  # 10.24.0

# 4. 安装项目依赖
pnpm install

# 5. 启动开发
pnpm run dev
```
