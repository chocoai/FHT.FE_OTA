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

/* 修改出租状态 */
export function changeRoomStatusApi (params = {}) {
  return fetch('changeLeaseStatus', {
    method: '',
    params
  }, {
    isMock: true
  })
}

/* 集中式删除房间 */
export function deleteRoomApi (params) {
  return fetch({
    url: '/market/fangyuan',
    method: 'post',
    data: {
      method: 'deleteRoom',
      params
    }
  })
}

/* 集中式根据区id查询板块列表 */
export function estateZoneListByAreaIdApi (params) {
  return fetch('queryHostingHouseInfo', {
    method: 'queryZoneListByAreaId',
    params
  }, {
    isMock: true
  })
}

/* 集中式模糊查询具体位置 */
export function estateAddressByKeywordsApi (params) {
  return fetch('searchAddressByKeyword', {
    params
  }, {
    isMock: true
  })
}

/* 集中式新增小区 */
export function estateNewSubdistrictApi (params) {
  return fetch('addSubdistrict', {
    params
  }, {
    isMock: true
  })
}
