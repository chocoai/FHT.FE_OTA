
/*
 * @Author: FT.FE.Bolin
 * @Date: 2018-04-11 16:33:06
 * @Last Modified by: FT.FE.Bolin
 * @Last Modified time: 2018-09-17 13:52:15
 */

import { fetch } from '@/utils/fetch'

export const loginApi = {
  requestPath: 'user',
  /* 登录获取sessionId */
  login (params = {}) {
    return fetch(this.requestPath, {
      method: 'login',
      params
    })
  },
  /* sessionId获取用户信息 */
  getInfo (params = {}) {
    return fetch(this.requestPath, {
      method: 'queryUserDetail',
      params
    })
  },
  /* 退出系统 */
  logout (params = {}) {
    return fetch(this.requestPath, {
      method: 'logout',
      params
    })
  },
  /* 修改个人信息 */
  saveSelfDetailApi (params = {}) {
    return fetch(this.requestPath, {
      method: 'saveSelfDetail',
      params
    })
  }
}
