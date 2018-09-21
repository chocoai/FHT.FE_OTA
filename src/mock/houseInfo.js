/*
 * @Author: FT.FE.Bolin
 * @Date: 2018-09-17 17:03:04
 * @Last Modified by: FT.FE.Bolin
 * @Last Modified time: 2018-09-17 17:05:50
 */
const houseManage_info = {
  list: {
    'reqId': null,
    'code': '0',
    'message': '操作成功',
    'data': {
      'record': 1,
      'houseList': [{
        'boardCount': 1,
        'chamberCount': 1,
        'fangyuanCode': 'fangyuanCode',
        'idlefishStatus': 1,
        'idlefishfailMessage': '闲鱼失败原因',
        'mailinStatus': 1,
        'mailinfailMessage': '麦邻失败原因',
        'rentPrice': 1700.0,
        'roomArea': 30.0,
        'roomCode': '10003',
        'roomNo': '1幢1单元501',
        'roomStatus': 2,
        'subdistrictName': '花园小区',
        'toiletCount': 1
      },
      {
        'boardCount': 1,
        'chamberCount': 1,
        'fangyuanCode': 'fangyuanCode',
        'idlefishStatus': 2,
        'idlefishfailMessage': '闲鱼发布失败',
        'mailinStatus': 2,
        'mailinfailMessage': '麦邻居发布失败',
        'rentPrice': 1700.0,
        'roomArea': 30.0,
        'roomCode': '10000',
        'roomNo': '302',
        'roomStatus': 9,
        'subdistrictName': '米市巷小区',
        'toiletCount': 1
      },
      {
        'boardCount': 1,
        'chamberCount': 1,
        'fangyuanCode': 'fangyuanCode',
        'idlefishStatus': 5,
        'idlefishfailMessage': '闲鱼发布失败',
        'mailinStatus': 5,
        'mailinfailMessage': '麦邻居发布失败',
        'rentPrice': 1700.0,
        'roomArea': 30.0,
        'roomCode': '1002',
        'roomNo': '302',
        'roomStatus': 2,
        'subdistrictName': '米市巷小区',
        'toiletCount': 1
      },
      {
        'boardCount': 1,
        'chamberCount': 1,
        'fangyuanCode': 'fangyuanCode',
        'idlefishStatus': 5,
        'idlefishfailMessage': '闲鱼发布失败',
        'mailinStatus': 1,
        'mailinfailMessage': '麦邻居发布失败',
        'rentPrice': 1700.0,
        'roomArea': 30.0,
        'roomCode': '1002',
        'roomNo': '302',
        'roomStatus': 2,
        'subdistrictName': '米市巷小区',
        'toiletCount': 1
      },
      {
        'boardCount': 1,
        'chamberCount': 1,
        'fangyuanCode': 'fangyuanCode',
        'idlefishStatus': 9,
        'idlefishfailMessage': '闲鱼发布失败',
        'mailinStatus': 5,
        'mailinfailMessage': '麦邻居发布失败',
        'rentPrice': 1700.0,
        'roomArea': 30.0,
        'roomCode': '1002',
        'roomNo': '302',
        'roomStatus': 2,
        'subdistrictName': '米市巷小区',
        'toiletCount': 1
      }]
    }
  },
  changeRoomStatus: {
    'reqId': null,
    'code': '0',
    'message': '操作成功',
    'data': {}
  },
  estateDeleteEstate: {
    'reqId': null,
    'code': '0',
    'message': '操作成功',
    'data': null
  },
  publishHouse: {
    'reqId': null,
    'code': '0',
    'message': '操作成功',
    'data': null
  },
  unpublishHouse: {
    'reqId': null,
    'code': '0',
    'message': '操作成功',
    'data': null
  },
  queryCityAreaPlot: {
    'reqId': null,
    'code': '0',
    'message': '操作成功',
    'data': {
      'cityList': [{
        'cityId': 111,
        'cityName': '杭州市',
        'regionList': [{
          'areaId': 222,
          'areaName': '西湖区'
        },
        {
          'areaId': 333,
          'areaName': '拱墅区'
        }]
      },
      {
        'cityId': 444,
        'cityName': '北京市',
        'regionList': [{
          'areaId': 555,
          'areaName': '东城区'
        },
        {
          'areaId': 666,
          'areaName': '西城区'
        }]
      }],
      'subdistrictList': [{
        'regionAddressId': 333,
        'areaId': 222,
        'cityId': 111,
        'name': '花园小区'
      }, {
        'regionAddressId': 23132,
        'areaId': 222,
        'cityId': 111,
        'name': ' 西湖小区'
      },
      {
        'regionAddressId': 3567,
        'areaId': 555,
        'cityId': 444,
        'name': '北京高档小区'
      }, {
        'regionAddressId': 6789,
        'areaId': 666,
        'cityId': 444,
        'name': '北京抵挡小区'
      }
      ]
    }
  },
  authorize: {
    'reqId': null,
    'code': '0',
    'message': '操作成功',
    'data': null
  },
  authorizePicture: {
    'reqId': null,
    'code': '0',
    'message': '操作成功',
    'data': {
      'picUrl': 'https://fh-online.oss-cn-hangzhou.aliyuncs.com/20180717103426865909'
    }
  },
  authorizeStatus: {
    'reqId': null,
    'code': '0',
    'message': '操作成功',
    'data': null
  },
  certificationFrom: {
    'reqId': null,
    'code': '0',
    'message': '操作成功',
    'data': null
  }
}

export default {
  list: () => {
    return houseManage_info.list
  },
  changeRoomStatus: () => {
    return houseManage_info.changeRoomStatus
  },
  estateDeleteEstate: () => {
    return houseManage_info.estateDeleteEstate
  },
  publishHouse: () => {
    return houseManage_info.publishHouse
  },
  unpublishHouse: () => {
    return houseManage_info.unpublishHouse
  },
  queryCityAreaPlot: () => {
    return houseManage_info.queryCityAreaPlot
  },
  authorize: () => {
    return houseManage_info.authorize
  },
  authorizePicture: () => {
    return houseManage_info.authorizePicture
  },
  authorizeStatus: () => {
    return houseManage_info.authorizeStatus
  },
  certificationFrom: () => {
    return houseManage_info.certificationFrom
  }

}
