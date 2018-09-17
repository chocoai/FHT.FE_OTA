/*
 * @Author: FT.FE.Bolin
 * @Date: 2018-09-17 14:01:13
 * @Last Modified by: FT.FE.Bolin
 * @Last Modified time: 2018-09-17 14:05:02
 */

const userMap = {
  userInfo: {
    'reqId': null,
    'code': '0',
    'message': 'bolin',
    'data': {
      'userId': 1360,
      'organizationId': 1,
      'userName': null,
      'name': '柏林',
      'roleId': null,
      'jobTitle': null,
      'password': '7c4a8d09ca3762af61e59520943dc26494f8941b',
      'areaName': null,
      'mobile': '15158864844',
      'gender': null,
      'picUrl': null,
      'cardType': null,
      'cardNo': null,
      'cardAddrProvinceId': null,
      'cardAddrCityId': null,
      'cardAddrRegionId': null,
      'cardAddrDetail': null,
      'addrProvinceId': null,
      'addrCityId': null,
      'addrRegionId': null,
      'addrDetail': null,
      'email': null,
      'weixin': null,
      'qq': null,
      'type': 3,
      'status': 1,
      'isAdmin': 0,
      'sessionId': '0',
      'parentId': null,
      'lastDevId': null,
      'lastLoginDate': '2018-09-17 10:28:21',
      'thisLoginDate': '2018-09-17 10:43:34',
      'authentication': 0,
      'authenticationSource': null,
      'manageFinanceHouseType': null,
      'isDelete': 0,
      'gmtCreateId': 61,
      'gmtCreate': '2018-02-09 16:53:43',
      'gmtModifiedId': 61,
      'gmtModified': '2018-09-17 10:43:34',
      'unLookCount': null,
      'serverStatus': null
    }
  }
}

export default {
  loginByUsername: config => {
    const { username } = JSON.parse(config.body)
    return userMap[username]
  },
  getUserInfo: () => {
    if (userMap.userInfo) {
      return userMap.userInfo
    } else {
      return {}
    }
  },
  logout: () => 'success'
}
