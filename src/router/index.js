/*
 * @Author: FT.FE.Bolin
 * @Date: 2018-04-11 17:07:11
 * @Last Modified by: FT.FE.Bolin
 * @Last Modified time: 2018-09-21 10:25:12
 */

import Vue from 'vue'
import Router from 'vue-router'
import '../icons'
import Layout from '../views/layout/Layout'
const _import = require('./_import_' + process.env.NODE_ENV)

Vue.use(Router)

/**
 * icon : slider图标
 * hidden : 菜单隐藏
 * redirect : ‘noRedirect’ 面包屑链接配置
 * noDropdown : ’noDropdown:true‘ 下拉菜单
 * meta : ‘{ role: ['admin'] }‘ 权限
 */

export const constantRouterMap = [{
  path: '/login',
  component: _import('login/index').default,
  hidden: true
}, {
  path: '/404',
  component: _import('404').default,
  hidden: true
}, {
  path: '',
  component: Layout,
  redirect: 'noRedirect',
  noDropdown: true,
  icon: 'house_manage',
  children: [{
    name: '房源管理',
    path: 'houseManage',
    component: _import('houseManage/houseSync').default,
    meta: {
      isHomePage: true
    }
  }]
}
//, {
//   path: '',
//   component: Layout,
//   redirect: '/dashboard',
//   icon: 'home',
//   noDropdown: true,
//   children: [{
//     name: '首页',
//     path: 'dashboard',
//     component: _import('dashboard/index').default
//   }]
// }
]

export default new Router({
  // https://router.vuejs.org/zh/guide/essentials/history-mode.html#%E5%90%8E%E7%AB%AF%E9%85%8D%E7%BD%AE%E4%BE%8B%E5%AD%90
  mode: 'history',
  // 后退后页面位置
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    path: '/example',
    component: Layout,
    redirect: 'noRedirect',
    name: '示例',
    icon: 'example',
    hidden: true,
    meta: {
      role: ['admin', 'global']
    },
    children: [{
      path: 'image',
      component: _import('example/image').default,
      name: '图片组件'
    }, {
      path: 'grid',
      component: _import('example/tablePagenation').default,
      name: '表格组件'
    }]
  },
  {
    path: '',
    component: Layout,
    redirect: 'noRedirect',
    icon: 'rent_whole',
    noDropdown: true,
    children: [{
      name: '分散整租录入',
      path: 'hostingHoleRentPage',
      component: _import('hostingEntryHouse/holeRent').default
    }]
  },
  {
    path: '',
    component: Layout,
    redirect: 'noRedirect',
    icon: 'rent_join',
    noDropdown: true,
    children: [{
      name: '分散合租录入',
      path: 'hostingJointRentPage',
      component: _import('hostingEntryHouse/jointRent').default
    }]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]
