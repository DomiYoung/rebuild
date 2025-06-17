import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { ElMessage } from 'element-plus'
import Layout from '@/components/Layout/index.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue'),
    meta: {
      title: '登录',
      hideInMenu: true,
      noAuth: true
    }
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/Dashboard/index.vue'),
        meta: {
          title: '仪表盘',
          icon: 'HomeFilled',
          affix: true
        }
      }
    ]
  },
  {
    path: '/system',
    component: Layout,
    redirect: '/system/user',
    meta: {
      title: '系统管理',
      icon: 'Setting',
      permissions: ['system:view']
    },
    children: [
      {
        path: 'user',
        name: 'SystemUser',
        component: () => import('@/views/System/User/index.vue'),
        meta: {
          title: '用户管理',
          icon: 'User',
          permissions: ['system:user:view']
        }
      },
      {
        path: 'role',
        name: 'SystemRole',
        component: () => import('@/views/System/Role/index.vue'),
        meta: {
          title: '角色管理',
          icon: 'Avatar',
          permissions: ['system:role:view']
        }
      },
      {
        path: 'menu',
        name: 'SystemMenu',
        component: () => import('@/views/System/Menu/index.vue'),
        meta: {
          title: '菜单管理',
          icon: 'Menu',
          permissions: ['system:menu:view']
        }
      }
    ]
  },
  {
    path: '/order',
    component: Layout,
    redirect: '/order/list',
    meta: {
      title: '订单管理',
      icon: 'Document',
      permissions: ['order:view']
    },
    children: [
      {
        path: 'list',
        name: 'OrderList',
        component: () => import('@/views/Order/List/index.vue'),
        meta: {
          title: '订单列表',
          icon: 'List',
          permissions: ['order:list:view']
        }
      },
      {
        path: 'create',
        name: 'OrderCreate',
        component: () => import('@/views/Order/Create/index.vue'),
        meta: {
          title: '创建订单',
          icon: 'Plus',
          permissions: ['order:create']
        }
      }
    ]
  },
  {
    path: '/inventory',
    component: Layout,
    redirect: '/inventory/goods',
    meta: {
      title: '库存管理',
      icon: 'Box',
      permissions: ['inventory:view']
    },
    children: [
      {
        path: 'goods',
        name: 'InventoryGoods',
        component: () => import('@/views/Inventory/Goods/index.vue'),
        meta: {
          title: '商品管理',
          icon: 'Goods',
          permissions: ['inventory:goods:view']
        }
      },
      {
        path: 'warehouse',
        name: 'InventoryWarehouse',
        component: () => import('@/views/Inventory/Warehouse/index.vue'),
        meta: {
          title: '仓库管理',
          icon: 'House',
          permissions: ['inventory:warehouse:view']
        }
      }
    ]
  },
  {
    path: '/finance',
    component: Layout,
    redirect: '/finance/report',
    meta: {
      title: '财务管理',
      icon: 'Money',
      permissions: ['finance:view']
    },
    children: [
      {
        path: 'report',
        name: 'FinanceReport',
        component: () => import('@/views/Finance/Report/index.vue'),
        meta: {
          title: '财务报表',
          icon: 'DataAnalysis',
          permissions: ['finance:report:view']
        }
      }
    ]
  },
  {
    path: '/404',
    name: 'NotFound',
    component: () => import('@/views/Error/404.vue'),
    meta: {
      title: '页面不存在',
      hideInMenu: true
    }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({ top: 0 })
})

// 免登录白名单
const whiteList = ['/login', '/404']

// 路由守卫
router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore()
  
  // 设置页面标题
  if (to.meta.title) {
    document.title = `${to.meta.title} - ZG ERP`
  }

  // 如果是免登录页面，直接通过
  if (to.meta.noAuth || whiteList.includes(to.path)) {
    next()
    return
  }

  // 检查是否已登录
  if (!userStore.isLoggedIn) {
    // 从本地存储恢复用户状态
    userStore.initUserFromStorage()
    
    if (!userStore.isLoggedIn) {
      ElMessage.warning('请先登录')
      next(`/login?redirect=${to.fullPath}`)
      return
    }
  }

  // 检查权限
  if (to.meta.permissions && Array.isArray(to.meta.permissions)) {
    const hasPermission = userStore.hasAnyPermission(to.meta.permissions)
    if (!hasPermission) {
      ElMessage.error('没有访问权限')
      next('/404')
      return
    }
  }

  next()
})

export default router 