/*
 * @Author: FT.FE.Bolin
 * @Date: 2018-04-11 17:07:11
 * @Last Modified by: chudequan
 * @Last Modified time: 2018-09-17 14:27:47
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
  redirect: '/dashboard',
  icon: 'dashboard',
  noDropdown: true,
  children: [{
    name: '首页',
    path: 'dashboard',
    component: _import('dashboard/index').default
  }]
}]

export default new Router({
  /* mode: 'history', //需要服务器配置路由 */
  scrollBehavior: () => ({
    y: 0
  }), // 后退后页面位置
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    path: '/example',
    component: Layout,
    redirect: 'noredirect',
    name: '示例',
    icon: 'example',
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
    redirect: '/hostingHoleRentPage',
    icon: 'table',
    noDropdown: true,
    children: [{
      name: '分散整租录入',
      path: 'hostingHoleRentPage',
      component: _import('hostingEntryHouse/index').default
    }]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  },
  {
    path: '',
    component: Layout,
    redirect: '/houseManage',
    icon: 'icon_house',
    noDropdown: true,
    children: [{
      name: '房源管理',
      path: 'houseManage',
      component: _import('houseManage/houseSync').default
    }]
  }
]
