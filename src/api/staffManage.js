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
  }
}
