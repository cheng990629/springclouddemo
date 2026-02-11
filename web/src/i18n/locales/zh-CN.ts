// 中文简体语言包
export default {
  // 通用
  common: {
    confirm: '确定',
    cancel: '取消',
    save: '保存',
    delete: '删除',
    edit: '编辑',
    add: '添加',
    search: '搜索',
    reset: '重置',
    loading: '加载中...',
    noData: '暂无数据',
    success: '成功',
    error: '错误',
    warning: '警告',
    info: '信息',
  },

  // 导航
  navigation: {
    home: '首页',
    dashboard: '仪表板',
    systemManagement: '系统管理',
    userManagement: '用户管理',
    discover: '发现更多',
    apiTools: 'API工具',
    profile: '个人资料',
    settings: '设置',
  },

  // 页面标题
  pageTitles: {
    home: '普通AGI',
    systemManagement: '系统管理',
    userManagement: '用户管理',
    discover: '发现更多',
    largeScreenDashboard: '大屏仪表板',
    apiTools: 'API工具',
    profile: '个人资料',
  },

  // 系统管理
  systemManagement: {
    title: '系统管理',
    services: '系统服务',
    status: {
      normal: '正常',
      warning: '警告',
      error: '错误',
    },
    operations: {
      backup: '系统备份',
      cleanLogs: '日志清理',
      optimize: '性能优化',
      restart: '系统重启',
    },
  },

  // 用户管理
  userManagement: {
    title: '用户管理',
    totalUsers: '总用户数',
    onlineUsers: '在线用户',
    newUsersToday: '今日新增',
    activeUsers: '活跃用户',
    userList: '用户列表',
    addUser: '添加用户',
    batchDelete: '批量删除',
    userInfo: {
      name: '用户名',
      role: '角色',
      status: '状态',
      lastLogin: '最后登录',
      online: '在线',
      offline: '离线',
    },
    roles: {
      admin: '管理员',
      user: '用户',
      auditor: '审核员',
    },
  },

  // 发现更多
  discover: {
    title: '发现更多',
    popularFeatures: '热门功能',
    userRecommendations: '用户推荐',
    featureUpdates: '功能更新',
    activeUsers: '活跃用户',
    tryNow: '立即体验',
  },

  // 大屏仪表板
  largeScreenDashboard: {
    title: '大屏仪表板',
    totalVisits: '总访问量',
    activeUsers: '活跃用户',
    conversionRate: '转化率',
    errorRate: '错误率',
    systemPerformance: '系统性能监控',
    businessMetrics: '业务指标',
    realTimeMonitoring: '实时监控数据',
    onlineUsers: '实时在线用户',
    systemAvailability: '系统可用性',
    avgResponseTime: '平均响应时间',
    cpuUsage: 'CPU使用率',
    memoryUsage: '内存使用率',
    diskUsage: '磁盘使用率',
  },

  // API工具
  apiTools: {
    title: 'API工具',
    description: '统一的API管理平台',
  },

  // 个人资料
  profile: {
    title: '个人资料',
    basicInfo: '基本信息',
    accountSettings: '账户设置',
    securitySettings: '安全设置',
  },

  // 消息提示
  messages: {
    saveSuccess: '保存成功',
    saveFailed: '保存失败',
    deleteSuccess: '删除成功',
    deleteFailed: '删除失败',
    operationSuccess: '操作成功',
    operationFailed: '操作失败',
    networkError: '网络错误，请稍后重试',
    permissionDenied: '权限不足',
  },

  // 验证消息
  validation: {
    required: '{field}不能为空',
    email: '请输入正确的邮箱地址',
    phone: '请输入正确的手机号码',
    password: '密码长度至少为6位',
    passwordConfirm: '两次输入的密码不一致',
  },
}
