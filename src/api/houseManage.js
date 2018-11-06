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
/* 实名认证 */
export function certificationFromApi (params) {
  return fetch('/user', {
    method: 'auth',
    params
  }, {
    isMock: true
  })
}

/* 集中式删除房间 */
export function deleteRoomApi (params) {
  return fetch('/fangyuan/deleteRoom', {
    params
  })
}

/* 集中式根据区id查询板块列表 */
export function estateZoneListByAreaIdApi (params) {
  return fetch('/fangyuan/queryZoneListByAreaId', {
    params
  })
}

/* 集中式模糊查询具体位置 */
export function estateAddressByKeywordsApi (params) {
  return fetch('/fangyuan/searchAddressByKeyword', {
    params
  })
}

/* 集中式新增小区 */
export function estateNewSubdistrictApi (params) {
  return fetch('/fangyuan/addSubdistrict', {
    params
  })
}

/* 分散式查询详情 */
export function hostingHouseInfoApi (params) {
  return fetch('/fangyuan/queryHostingHouseInfo', {
    params
  })
}

/* 分散式新增房屋保存 */
export function hostingSaveHouseInfoApi (params) {
  return fetch('/fangyuan/saveHostingHouseInfo', {
    params
  })
}

/* 分散式编辑房屋保存 */
export function hostingEditHouseInfoApi (params) {
  return fetch('/fangyuan/editHostingHouseInfo', {
    params
  })
}
/* 外部编码 */
export function queryHostingHouseByOuterHouseUuidApi (params) {
  return fetch('/fangyuan/queryHostingHouseByOuterHouseUuid', {
    params
  }, {
    isMock: true
  })
}

/* 集中式 */

/* 集中式房间列表 */
export const queryEstateListApi = {
  requestPath: '/fangyuan/queryEstateList',
  isMock: true,
  queryActivityListByPage (params = {}) {
    return fetch(this.requestPath, {
      params
    }, {
      isMock: this.isMock
    })
  }
}
/* 集中式查询单个房间 */
export function queryOneEstateRoomApi (params) {
  return fetch('/fangyuan/queryOneEstateRoomApi', {
    params
  }, {
    isMock: true
  })
}
/* 集中式删除房间 */
export function estateDeleteRoomApi (params) {
  return fetch('/fangyuan/deleteRoom', {
    params
  }, {
    isMock: true
  })
}
/* 集中式录入 获取房型房间号 */
export function allRoomByFangyuanCodeApi (params) {
  return fetch('/fangyuan/allRoomByFangyuanCode', {
    params
  }, {
    isMock: true
  })
}
/* 集中式编辑房间 */
export function editEstateRoomInfoApi (params) {
  return fetch('/fangyuan/editEstateRoomInfo', {
    params
  }, {
    isMock: true
  })
}
/* 集中式录入保存公寓 */
export function saveEstateInfoApi (params) {
  return fetch('/fangyuan/saveEstateInfo', {
    params
  }, {
    isMock: true
  })
}
