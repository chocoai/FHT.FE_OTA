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
  return fetch({
    url: '/market/fangyuan',
    method: 'post',
    data: {
      method: 'queryZoneListByAreaId',
      params
    }
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
