import { fetch } from '@/utils/fetch'

export const houseAsyncApi = {
  requestPath: 'queryHostingHouseInfo',
  isMock: true,
  queryActivityListByPage (params = {}) {
    return fetch(this.requestPath, {
      params
    }, {
      isMock: this.isMock
    })
  }
}
/* 修改出租状态 */
export function changeRoomStatusApi (params = {}) {
  return fetch('changeLeaseStatus', {
    method: '',
    params
  }, {
    isMock: true
  })
}
