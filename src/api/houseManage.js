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
