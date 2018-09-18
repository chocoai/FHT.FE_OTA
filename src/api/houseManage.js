import { fetch } from '@/utils/fetch'

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
/* 修改出租状态 */
export function changeRoomStatusApi (params = {}) {
  return fetch('/fangyuan/changeLeaseStatus', {
    params
  }, {
    isMock: true
  })
}
/* 删除房源 */
export function estateDeleteEstateApi (params = {}) {
  return fetch('/fangyuan/deleteHouse', {
    params
  }, {
    isMock: true
  })
}
/* 发布房源 */
export function publishHouseApi (params) {
  return fetch('/rooms/published', {
    params
  }, {
    isMock: true
  })
  // return fetch({
  //   url: '/rooms/published',
  //   method: 'post',
  //   data: {
  //     method: type === 1 ? 'publish' : 'offshelf', // 1.发布 2.撤销
  //     params
  //   }
  // })
}
/* 下架房源 */
export function unPublishHouseApi (params) {
  return fetch('/rooms/offshelf', {
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
  return fetch('/market/fangyuan', {
    method: 'queryZoneListByAreaId',
    params
  })
}

/* 集中式查询房源组织列表 */
export function estateOrgListApi (params) {
  return fetch({
    url: '/market/fangyuan',
    method: 'post',
    data: {
      method: 'queryOrgListByName',
      params
    }
  })
}

/* 集中式模糊查询具体位置 */
export function estateAddressByKeywordsApi (params) {
  return fetch({
    url: '/market/fangyuan',
    method: 'post',
    data: {
      method: 'searchAddressByKeyword',
      params
    }
  })
}

/* 集中式新增小区 */
export function estateNewSubdistrictApi (params) {
  return fetch({
    url: '/market/fangyuan',
    method: 'post',
    data: {
      method: 'addSubdistrict',
      params
    }
  })
}
