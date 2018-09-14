/*
 * @Author: FT.FE.Bolin
 * @Date: 2018-09-14 10:29:35
 * @Last Modified by: FT.FE.Bolin
 * @Last Modified time: 2018-09-14 10:31:53
 */

import { fetch } from '@/utils/fetch'

export const exampleApi = {
  requestPath: 'market/activity',
  queryMethod: 'queryActivityListByPage',
  queryActivityListByPage (params = {}) {
    return fetch(this.requestPath, {
      method: this.queryMethod,
      params
    })
  }
}
