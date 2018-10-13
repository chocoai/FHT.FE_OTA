/*
 * @Author: dengdongming
 * @Date: 2018-10-10 13:40
 * @Last Modified by:dengdongming
 * @Last Modified time: 2018-10-11 13:40
 */
import { fetch } from '@/utils/fetch'
// 组织架构下的表格数据
export const getDepartmentInfo = {
  requestPath: 'department',
  queryMethod: 'getDepartmentInfo',
  isMock: true,
  queryDepartmentApi (params) { // 组织结构
    return fetch(this.requestPath, {
      method: 'getDepartments',
      params
    }, {
      isMock: true
    })
  },
  createDepartmentApi (params) { // 创建部门
    return fetch(this.requestPath, {
      method: 'addDepartment',
      params
    }, {
      isMock: true
    })
  },
  queryOneDepartmentApi (params) { // 查询一个部门
    return fetch(this.requestPath, {
      method: 'queryOneDepartment',
      params
    }, {
      isMock: true
    })
  },
  editDepartmentApi (params) { // 编辑部门
    return fetch(this.requestPath, {
      method: 'editDepartment',
      params
    }, {
      isMock: true
    })
  }
}
// 获取分配部门房源
export const queryDistributeToDepListApi = { // 编辑部门
  requestPath: '/fangyuanDistribute/queryDistributeToDepList',
  isMock: true,
  queryDistributeToDep (params = {}) {
    return fetch(this.requestPath, {
      params
    }, {
      isMock: this.isMock
    })
  }
}
// 分配房源
export function distributeHouseToDepApi (params = {}) {
  return fetch('/fangyuanDistribute/distributeHouseToDep', {
    params
  }, {
    isMock: true
  })
}
