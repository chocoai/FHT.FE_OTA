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
}
/* 下架房源 */
export function unPublishHouseApi (params) {
  return fetch('/rooms/offshelf', {
    params
  }, {
    isMock: true
  })
}
/* 获取区域 */
export function queryCityAreaPlotApi (params) {
  return fetch('/fangyuan/queryCityAreaPlot', {
    params
  }, {
    isMock: true
  })
}
/* 授权 */
export function authorizeApi (params) {
  return fetch('/account/binding', {
    params
  }, {
    isMock: true
  })
}

export function authorizePictureApi (params) {
  return fetch('/account/picture', {
    params
  }, {
    isMock: true
  })
}

export function authorizeStatusApi (params) {
  return fetch('/account/acquired', {
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
  return fetch('http://localhost:1314/api/fangyuan/queryZoneListByAreaId', {
    params
  })
}

/* 集中式模糊查询具体位置 */
export function estateAddressByKeywordsApi (params) {
  return fetch('http://localhost:1314/api/fangyuan/searchAddressByKeyword', {
    params
  })
}

/* 集中式新增小区 */
export function estateNewSubdistrictApi (params) {
  return fetch('http://localhost:1314/api/fangyuan/addSubdistrict', {
    params
  })
}

/* 分散式查询详情 */
export function hostingHouseInfoApi (params) {
  return fetch('http://localhost:1314/api/fangyuan/queryHostingHouseInfo', {
    params
  })
}
