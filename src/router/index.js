/*
 * @Author: FT.FE.Bolin
 * @Date: 2018-04-11 17:07:11
 * @Last Modified by: FT.FE.Bolin
 * @Last Modified time: 2018-10-18 16:26:38
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
  name: '登录',
  component: _import('login/index'),
  hidden: true
}, {
  path: '/404',
  name: '404',
  component: _import('404'),
  hidden: true
}, {
  path: '/house',
  name: '主页',
  component: Layout,
  redirect: '/houseManage',
  noDropdown: true,
  icon: 'house_manage',
  children: [{
    name: '房源管理',
    path: 'houseManage',
    component: _import('houseManage/houseSync'),
    meta: {
      isHomePage: true
    }
  }]
}]

export default new Router({
  // https://router.vuejs.org/zh/guide/essentials/history-mode.html#%E5%90%8E%E7%AB%AF%E9%85%8D%E7%BD%AE%E4%BE%8B%E5%AD%90
  mode: 'history',
  // 线上部署路径
  base: __dirname,
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
    meta: {},
    children: [{
      path: 'image',
      component: _import('example/image'),
      name: '图片组件'
    }, {
      path: 'grid',
      component: _import('example/tablePagenation'),
      name: '表格组件'
    }]
  },
  {
    path: '/addHouse',
    name: '整租录入',
    component: Layout,
    redirect: 'noRedirect',
    icon: 'rent_whole',
    noDropdown: true,
    children: [{
      name: '分散整租录入',
      path: 'hostingHoleRentPage',
      component: _import('hostingEntryHouse/holeRent')
    }]
  },
  {
    path: '/addHouse',
    name: '合租录入',
    component: Layout,
    redirect: 'noRedirect',
    icon: 'rent_join',
    noDropdown: true,
    children: [{
      name: '分散合租录入',
      path: 'hostingJointRentPage',
      component: _import('hostingEntryHouse/jointRent')
    }]
  },
  {
    path: '/organization',
    name: '组织',
    component: Layout,
    redirect: '/framework',
    noDropdown: true,
    icon: 'org_structure',
    meta: {
      role: [1, 3]
    },
    children: [{
      name: '组织架构',
      path: 'framework',
      component: _import('organization/framework')
    }, {
      path: 'allotroom',
      name: '部门分配房源',
      component: _import('organization/allotroom'),
      meta: {
        noTags: true,
        parentPath: '/organization/framework',
        parentName: '组织架构',
        meta: {
          role: [1, 3]
        }
      }
    }]
  },
  {
    path: '/staffManages',
    name: '人员',
    component: Layout,
    noDropdown: true,
    icon: 'personal_mange',
    meta: {
      role: [1, 3]
    },
    children: [{
      name: '人员管理',
      path: 'staffManage',
      component: _import('staffManages/staffManage')
    }]
  },
  {
    path: '/',
    redirect: '/house/houseManage',
    hidden: true
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]
