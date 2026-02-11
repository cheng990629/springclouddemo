import { ModuleConfig, MenuGroup, Permission } from './types';

/**
 * 统一菜单配置
 * 包含所有功能模块的菜单项，按order排序
 */
export const mainModule: ModuleConfig = {
  id: 'main',
  name: '主菜单',
  description: '所有功能模块的统一菜单',
  enabled: true,
  priority: 1,
  routes: [
    // 大屏仪表 - order 1
    {
      path: '/large-screen-dashboard',
      label: '大屏仪表',
      icon: 'MonitorOutlined',
      inMenu: true,
      permissions: [Permission.USER],
      order: 4,
      group: MenuGroup.SYSTEM,
      description: '大屏幕数据展示'
    },

    // 智能对话 - order 2
    {
      path: '/chat',
      label: '智能对话',
      icon: 'MessageOutlined',
      inMenu: true,
      permissions: [Permission.USER],
      order: 5,
      group: MenuGroup.BASE,
      description: '与AI进行智能对话'
    },
    {
        path: '/discover',
        label: '内容发现',
        icon: 'CompassOutlined',
        inMenu: true,
        permissions: [Permission.USER],
        order: 6,
        group: MenuGroup.BASE,
        description: '内容发现与推荐'
      },
         // 珍酒城平台 - order 1
   {
    path: '/zhenjiucheng-platform',
      label: '珍酒城平台',
      icon: 'DesktopOutlined',
      inMenu: true,
      permissions: [Permission.USER],
      order: 1,
      group: MenuGroup.TRADITIONAL,
      agiOnly: true,
      description: '珍酒城管理平台'
    },

    // 产品管理 - order 2
    {
      path: '/product',
      label: '产品管理',
      icon: 'ShoppingCartOutlined',
      inMenu: true,
      permissions: [Permission.USER],
      order: 2,
      group: MenuGroup.BUSINESS,
      description: '产品信息管理'
    },

    // 珍酒城移动 - order 3
    {
      path: '/zhenjiucheng-mobile',
      label: '珍酒城移动',
      icon: 'MobileOutlined',
      inMenu: true,
      permissions: [Permission.USER],
      order: 3,
      group: MenuGroup.TRADITIONAL,
      agiOnly: true,
      description: '珍酒城移动端应用'
    },

    // 珍酒城商户 - order 4
    {
      path: '/zhenjiucheng-merchant',
      label: '珍酒城商户',
      icon: 'ShopOutlined',
      inMenu: true,
      permissions: [Permission.USER],
      order: 4,
      group: MenuGroup.TRADITIONAL,
      agiOnly: true,
      description: '珍酒城商户管理系统'
    },

    // 智慧大棚 (AGI) - order 7
    {
      path: '/zhenjiucheng-merchant',
      label: '珍酒城商户',
      icon: 'ShopOutlined',
      inMenu: true,
      permissions: [Permission.USER],
      order: 3,
      group: MenuGroup.TRADITIONAL,
      agiOnly: true,
      description: '珍酒城商户管理系统'
    },
     // 智慧大棚 (AGI) - order 7
     {
        path: '/smart-greenhouse',
        label: '智慧大棚',
        icon: 'ExperimentOutlined',
        inMenu: true,
        permissions: [Permission.USER],
        order: 7,
        group: MenuGroup.TRADITIONAL,
        agiOnly: true,
        description: '智慧农业大棚管理系统'
      },

      // 科创AI (AGI) - order 8
      {
        path: '/science-ai',
        label: '科创 AI',
        icon: 'RobotOutlined',
        inMenu: true,
        permissions: [Permission.USER],
        order: 8,
        group: MenuGroup.TRADITIONAL,
        agiOnly: true,
        description: '科技创新AI应用'
      },

      // TK店群 (AGI) - order 9
      {
        path: '/tk-store-management',
        label: 'TK店群',
        icon: 'ClusterOutlined',
        inMenu: true,
        permissions: [Permission.USER],
        order: 9,
        group: MenuGroup.TRADITIONAL,
        agiOnly: true,
        description: 'TK连锁店群管理系统'
      },
    // 知识库 - order 3
    {
      path: '/knowledge',
      label: '知识库',
      icon: 'BookOutlined',
      inMenu: true,
      permissions: [Permission.USER],
      order: 11,
      group: MenuGroup.BASE,
      description: '知识库管理与查询'
    },

    // 智能笔记 - order 4
    {
      path: '/notes',
      label: '随手记',
      icon: 'FileTextOutlined',
      inMenu: true,
      permissions: [Permission.USER],
      order: 12,
      group: MenuGroup.BASE,
      description: '智能笔记记录与管理'
    },

    // 内容发现 - order 5
   

    // 财务管理 - order 6
    {
      path: '/accounting',
      label: '财务管理',
      icon: 'CalculatorOutlined',
      inMenu: true,
      permissions: [Permission.USER],
      order: 13,
      group: MenuGroup.BUSINESS,
      description: '财务记账与管理'
    },

    // 薪酬系统 - order 8
    {
      path: '/salary-system',
      label: '薪酬系统',
      icon: 'MoneyCollectOutlined',
      inMenu: true,
      permissions: [Permission.USER],
      order: 14,
      group: MenuGroup.BUSINESS,
      description: '员工薪酬管理'
    },

    // 谈话工作 - order 15
    {
      path: '/interview-work',
      label: '谈话工作',
      icon: 'UserOutlined',
      inMenu: true,
      permissions: [Permission.USER],
      order: 15,
      group: MenuGroup.SPECIAL,
      description: '面试谈话工作台'
    },

    // 合同审查 - order 16
    {
      path: '/contract-review',
      label: '合同审查',
      icon: 'FileProtectOutlined',
      inMenu: true,
      permissions: [Permission.USER],
      order: 16,
      group: MenuGroup.SPECIAL,
      description: '合同审核与管理'
    },

    // 数据仪表板 - order 17
    {
      path: '/dashboard',
      label: '数据仪表板',
      icon: 'DashboardOutlined',
      inMenu: true,
      permissions: [Permission.USER],
      order: 17,
      group: MenuGroup.SYSTEM,
      description: '系统数据展示'
    },

    // 系统管理 - order 18
    {
      path: '/system-management',
      label: '系统管理',
      icon: 'SettingOutlined',
      inMenu: true,
      permissions: [Permission.USER],
      order: 18,
      group: MenuGroup.SYSTEM,
      description: '系统设置与管理'
    },

    // 工作台 - order 19
    {
      path: '/workbench',
      label: '工作台',
      icon: 'WindowsOutlined',
      inMenu: true,
      permissions: [Permission.USER],
      order: 19,
      group: MenuGroup.SYSTEM,
      description: '统一管理工作台'
    },

    // API工具 - order 20
    {
      path: '/api-tools',
      label: 'API工具',
      icon: 'ApiOutlined',
      inMenu: true,
      permissions: [Permission.USER],
      order: 20,
      group: MenuGroup.SYSTEM,
      description: 'API调试与测试工具'
    },

    // 个人中心 - order 21
    {
      path: '/profile',
      label: '个人中心',
      icon: 'UserOutlined',
      inMenu: true,
      permissions: [Permission.USER],
      order: 21,
      group: MenuGroup.SYSTEM,
      description: '用户个人中心'
    },

   

    // 珍酒城平台（传统） - order 21
    {
      path: '/traditional/zhenjiucheng-platform',
      label: '珍酒城平台（传统）',
      icon: 'DesktopOutlined',
      inMenu: true,
      permissions: [Permission.USER],
      order: 24,
      group: MenuGroup.TRADITIONAL,
      traditionalOnly: true,
      description: '珍酒城管理平台（传统模式）'
    },


    // 珍酒城商户（传统） - order 22
    {
      path: '/traditional/zhenjiucheng-merchant',
      label: '珍酒城商户（传统）',
      icon: 'ShopOutlined',
      inMenu: true,
      permissions: [Permission.USER],
      order: 24,
      group: MenuGroup.TRADITIONAL,
      traditionalOnly: true,
      description: '珍酒城商户管理系统（传统模式）'
    },


    // 珍酒城移动（传统） - order 23
    {
      path: '/traditional/zhenjiucheng-mobile',
      label: '珍酒城移动（传统）',
      icon: 'MobileOutlined',
      inMenu: true,
      permissions: [Permission.USER],
      order: 24,
      group: MenuGroup.TRADITIONAL,
      traditionalOnly: true,
      description: '珍酒城移动端应用（传统模式）'
    },

   

    // 智慧大棚（传统） - order 25
    {
      path: '/traditional/smart-greenhouse',
      label: '智慧大棚（传统）',
      icon: 'ExperimentOutlined',
      inMenu: true,
      permissions: [Permission.USER],
      order: 29,
      group: MenuGroup.TRADITIONAL,
      traditionalOnly: true,
      description: '智慧农业大棚管理系统（传统模式）'
    },

    // 科创AI（传统） - order 26
    {
      path: '/traditional/science-ai',
      label: '科创 AI（传统）',
      icon: 'RobotOutlined',
      inMenu: true,
      permissions: [Permission.USER],
      order: 29,
      group: MenuGroup.TRADITIONAL,
      traditionalOnly: true,
      description: '科技创新AI应用（传统模式）'
    },

    // TK店群（传统） - order 27
    {
      path: '/traditional/tk-store-management',
      label: 'TK店群（传统）',
      icon: 'ClusterOutlined',
      inMenu: true,
      permissions: [Permission.USER],
      order: 29,
      group: MenuGroup.TRADITIONAL,
      traditionalOnly: true,
      description: 'TK连锁店群管理系统（传统模式）'
    },

    // 辽博作诗 - order 28
    {
      path: '/liaobo-poetry',
      label: '辽博作诗',
      icon: 'BookOutlined',
      inMenu: true,
      permissions: [Permission.USER],
      order: 29,
      group: MenuGroup.SPECIAL,
      description: '辽博文学创作AI'
    }
  ].sort((a, b) => a.order - b.order) // 确保按order排序
};
