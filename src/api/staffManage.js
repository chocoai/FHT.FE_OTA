/*
 * @Author: dengdongming
 * @Date: 2018-10-15 13:40
 * @Last Modified by:dengdongming
 * @Last Modified time: 2018-10-15 10:40
 */
import { fetch } from '@/utils/fetch'
export const staffManageInfo = {
  requestPath: 'user',
  queryMethod: '',
  isMock: true,
  addAccountAPi (params) { // 组织结构
    return fetch(this.requestPath, {
      method: 'add',
      params
    }, {
      isMock: true
    })
  },
  editAccountApi (params) {
    return fetch(this.requestPath, {
      method: 'edit',
      params
    }, {
      isMock: true
    })
  },
  changeAccountStatusApi (params) {
    return fetch(this.requestPath, {
      method: 'changeAccountStatus',
      params
    }, {
      isMock: true
    })
  }

}
// 员工分配房源
export function distributeHouseToUserApi (params = {}) {
  return fetch('/fangyuanDistribute/distributeHouseToUser', {
    params
  }, {
    isMock: true
  })
}
// 部门分配房源
export function distributeHouseToDepApi (params = {}) {
  return fetch('/fangyuanDistribute/distributeHouseToDep', {
    params
  }, {
    isMock: true
  })
}
// 取消给部门分配房源
export function cancleHouseToDepApi (params = {}) {
  return fetch('/fangyuanDistribute/cancleHouseToDep', {
    params
  }, {
    isMock: true
  })
}
// 取消给员工分配房源
export function cancleHouseToUserApi (params = {}) {
  return fetch('/fangyuanDistribute/cancleHouseToUser', {
    params
  }, {
    isMock: true
  })
}
