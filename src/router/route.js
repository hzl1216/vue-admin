/**
 * @Project Name: vue-admin
 * @Author: luichooy
 * @Date: 2018-01-17 15:01
 * @Email: luichooy@163.com
 * @Idea: WebStorm
 */

import Layout from 'src/pages/layout/layout';

// 不作为main组件子页面展示的页面单独写，如下
export const loginRouter = {
  path: '/login',
  name: 'login',
  meta: {
    title: 'Login - 登录'
  },
  component: () => import('src/pages/login/login')
};

// 错误页面
export const errorRouter = {
  path: '/error/:code',
  name: 'error',
  meta: {
    title: 'error'
  },
  component: () =>
    import('src/pages/error/index')
};

// 作为main组件子页面展示  但不在左侧菜单显示的路由卸载otherRoter里
export const otherRouter = {
  path: '',
  name: 'homeRouter',
  redirect: '/home',
  meta: {
    requireAuth: true
  },
  component: Layout,
  children: [
    {
      path: 'home',
      name: 'home',
      title: '首页',
      component: () => import('src/pages/home/home')
    }
  ]
};

// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter = [
  {
    path: '/individuals',
    name: 'tables',
    title: '个体管理',
    meta: {
      requireAuth: true
    },
    component: Layout,
    children: [
      {
        path: 'insert',
        name: 'insert',
        title: '添加个体',
        component: () => import('src/pages/individuals/insert')
      },
      {
        path: 'update',
        name: 'update',
        title: '更新个体',
        component: () => import('src/pages/individuals/update')
      },
      {
        path: 'delete',
        name: 'delete',
        title: '删除个体',
        component: () => import('src/pages/individuals//delete')
      }
    ]
  },
  {
    path: '/clinicals',
    name: 'clinicals',
    title: '临床管理',
    meta: {
      requireAuth: true
    },
    component: Layout,
    children: [
      {
        path: 'insert',
        name: 'insert',
        title: '添加临床',
        component: () => import('src/pages/clinicals/insert')
      },
      {
        path: 'update',
        name: 'update',
        title: '更新临床',
        component: () => import('src/pages/clinicals/update')
      },
      {
        path: 'delete',
        name: 'delete',
        title: '删除临床',
        component: () => import('src/pages/clinicals/delete')
      }
    ]
  },
  {
    path: '/tissues',
    name: 'tissues',
    title: '组织管理',
    meta: {
      requireAuth: true
    },
    component: Layout,
    children: [
      {
        path: 'insert',
        name: 'insert',
        title: '添加组织',
        component: () => import('src/pages/tissues/insert')
      },
      {
        path: 'update',
        name: 'update',
        title: '更新组织',
        component: () => import('src/pages/tissues/update')
      },
      {
        path: 'delete',
        name: 'delete',
        title: '删除组织',
        component: () => import('src/pages/tissues/delete')
      }
    ]
  },
  {
    path: '/data',
    name: 'data',
    title: '数据管理',
    meta: {
      requireAuth: true
    },
    component: Layout,
    children: [
      {
        path: 'insert',
        name: 'insert',
        title: '添加数据',
        component: () => import('src/pages/data/insert')
      },
      {
        path: 'delete',
        name: 'delete',
        title: '删除数据',
        component: () => import('src/pages/data/delete')
      }
    ]
  },
  {
    path: '/form',
    name: 'form',
    title: '表单管理',
    meta: {
      requireAuth: true
    },
    component: Layout,
    children: [
      {
        path: 'render',
        name: 'render',
        title: '渲染表单',
        component: () => import('src/pages/form/render/render')
      }
    ]
  },
  {
    path: '/system',
    name: 'system',
    title: '系统管理',
    meta: {
      requireAuth: true
    },
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'system_index',
        title: '系统管理',
        component: () => import('src/pages/system/index/index')
      }
    ]
  },
  {
    path: '/user',
    name: 'user',
    title: '用户管理',
    meta: {
      requireAuth: true
    },
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'user_index',
        title: '用户管理',
        component: () => import('src/pages/user/index')
      }
    ]
  },
  {
    path: '/access',
    name: 'access',
    title: '权限管理',
    meta: {
      requireAuth: true
    },
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'access_index',
        title: '权限管理',
        component: () => import('src/pages/access/index')
      }
    ]
  },
  {
    path: '/log',
    name: 'log',
    title: '日志管理',
    meta: {
      requireAuth: true
    },
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'log_index',
        title: '操作日志',
        component: () => import('src/pages/log/index')

      }
    ]
  },
  {
    path: '/test',
    name: 'test',
    title: '测试',
    meta: {
      requireAuth: true
    },
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'test_index',
        title: '测试',
        component: () => import('src/pages/test/test')
      }
    ]
  }
];

export const routers = [
  loginRouter,
  errorRouter,
  otherRouter,
  ...appRouter
];
