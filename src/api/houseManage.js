import { fetch } from '@/utils/fetch'

export const houseAsyncApi = {
  requestPath: 'queryHostingHouseInfo',
  queryMethod: 'list',
  isMock: true,
  queryActivityListByPage (params = {}) {
    return fetch(this.requestPath, {
      // method: this.queryMethod,
      params
    }, {
      isMock: this.isMock
    })
  }
}
/* 发布撤销房源 */
export function publishHouseApi (params, type) {
  return fetch({
    url: '/rooms/published',
    method: 'post',
    data: {
      method: type === 1 ? 'publish' : 'unpublish', // 1.发布 2.撤销
      params
    }
  })
}
