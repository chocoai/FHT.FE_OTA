/*
 * @Author: dengdongming
 * @Date: 2018-10-10 13:40
 * @Last Modified by:dengdongming
 * @Last Modified time: 2018-10-11 13:40
 */
import { fetch } from '@/utils/fetch'
// 组织架构
export function queryDepartmentApi (params) {
  return fetch('/fangyuan/queryHostingList', {
    params
  }, {
    isMock: true
  })
}
// 表格数据
export const houseAsyncApi = {
  requestPath: '/fangyuan/queryHostingList',
  isMock: true,
  queryActivityListByPage (params = {}) {
    return fetch(this.requestPath, {
      params
    }, {
      isMock: this.isMock
    })
  }
}
