
/*
 * @Author: FT.FE.Bolin
 * @Date: 2018-04-11 16:33:06
 * @Last Modified by: FT.FE.Bolin
 * @Last Modified time: 2018-09-20 14:53:34
 */

import { fetch } from '@/utils/fetch'

export const loginApi = {
  requestPath: 'user',
  /* 登录获取sessionId */
  login (params = {}) {
    return fetch(this.requestPath, {
      method: 'login',
      params
    }, {
      isMock: true
    })
  },
  /* sessionId获取用户信息 */
  getInfo (params = {}) {
    return fetch(this.requestPath, {
      method: 'authInfo',
      params
    }, {
      isMock: true
    })
  },
  /* 退出系统 */
  logout (params = {}) {
    return fetch(this.requestPath, {
      method: 'quit',
      params
    }, {
      isMock: true
    })
  }
}
