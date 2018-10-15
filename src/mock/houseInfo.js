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
        'fangyuanCode': '111111',
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
        'areaId': 14000,
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
  },
  queryDepartment: {
    'reqId': null,
    'code': '0',
    'message': '操作成功',
    'data': {
      'depName': '华东地区', // 组织名
      'depId': 1, // 上级组织
      'children': [{// 组织架构层级
        'depName': '上海分部', // 部门名
        'parentId': 'aaaa', // 上级部门
        'depId': 2, // 部门ID
        'gmtCreate': '2018-08-08 11:11:11', // 创建时间
        'managedHouse': 100, // 管理的房源数量
        'children': [
          {
            'depName': '徐东地区', // 部门名
            'parentId': 'child1', // 上级部门
            'depId': 3, // 部门ID
            'gmt_create': '2018-08-08 11:11:11', // 创建时间
            'managedHouse': 100// 管理的房源数量
          }
        ]
      }]
    }
  },
  getDepartmentInfo: {
    'reqId': null,
    'code': '0',
    'message': '操作成功',
    'data': [{
      'depName': '杭州总部', // 部门名
      'parent': '中国总部', // 上级部门
      'depId': '部门ID2222', // 部门ID
      'cityId': 444, // 市id
      'gmtCreate': '2018-08-08 11:11:11', // 创建时间
      'managedHouse': 100 // 管理的房源数量
    }]
  },
  addDepartment: {
    'reqId': null,
    'code': '0',
    'message': '操作成功',
    'data': {
    }
  },
  queryOneDepartment: {
    'reqId': null,
    'code': '0',
    'message': '操作成功',
    'data': {
      'depId': 1,
      'depName': '上海总部',
      'provinceId': 150000,
      'cityId': 150500,
      'districtId': 150522,
      'parentDepId': 3
    }
  },
  editDepartment: {
    'reqId': null,
    'code': '0',
    'message': '操作成功',
    'data': {
    }
  },
  queryDistributeToDepList: {
    'reqId': null,
    'code': '0',
    'message': '操作成功',
    'data': {
      'record': 1,
      'houseList': [{
        'fangyuanCode': '130000',
        'subdistrictName': '余杭区-xx苑',
        'roomNo': '302',
        'boardCount': 1,
        'chamberCount': 1,
        'toiletCount': 1,
        'roomCount': 99
      }, {
        'fangyuanCode': '14000',
        'subdistrictName': '西湖小区',
        'roomNo': '303',
        'boardCount': 1,
        'chamberCount': 2,
        'toiletCount': 3,
        'roomCount': 1000
      },
      {
        'fangyuanCode': '140010',
        'subdistrictName': '美丽小区',
        'roomNo': '303',
        'boardCount': 1,
        'chamberCount': 2,
        'toiletCount': 3,
        'roomCount': 1000
      }, {
        'fangyuanCode': '140004',
        'subdistrictName': '拱墅区',
        'roomNo': '303',
        'boardCount': 1,
        'chamberCount': 2,
        'toiletCount': 3,
        'roomCount': 1000
      }]
    }
  },
  distributeHouseToDep: {
    'reqId': null,
    'code': '0',
    'message': '操作成功',
    'data': null
  },
  depMembers:
    {
      'reqId': null,
      'code': '0',
      'message': '操作成功',
      'data': [{
        'id': 1,
        'name': '张三',
        'role': '员工',
        'depName': '技术部'
      },
      {
        'id': 2,
        'name': '李四',
        'role': '负责人',
        'depName': '产品部'
      }]

    },
  addAccount: {
    'reqId': null,
    'code': '0',
    'message': '操作成功',
    'data': {
    }
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
  },
  queryDepartment: () => {
    return houseManage_info.queryDepartment
  },
  getDepartmentInfo: () => {
    return houseManage_info.getDepartmentInfo
  },
  addDepartment: () => {
    return houseManage_info.addDepartment
  },
  queryOneDepartment: () => {
    return houseManage_info.queryOneDepartment
  },
  editDepartment: () => {
    return houseManage_info.editDepartment
  },
  queryDistributeToDepList: () => {
    return houseManage_info.queryDistributeToDepList
  },
  distributeHouseToDep: () => {
    return houseManage_info.distributeHouseToDep
  },
  depMembers: () => {
    return houseManage_info.depMembers
  },
  addAccount: () => {
    return houseManage_info.addAccount
  }
}
