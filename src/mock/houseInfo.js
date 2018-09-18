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
        'idlefishStatus': 2,
        'idlefishfailMessage': '闲鱼失败原因',
        'mailinStatus': 2,
        'mailinfailMessage': '麦邻失败原因',
        'rentPrice': 1700.0,
        'roomArea': 30.0,
        'roomCode': '10003',
        'roomNo': '302',
        'roomStatus': 2,
        'subdistrictName': '花园小区',
        'toiletCount': 1
      },
      {
        'boardCount': 1,
        'chamberCount': 1,
        'fangyuanCode': 'fangyuanCode',
        'idlefishStatus': 0,
        'idlefishfailMessage': '闲鱼发布失败',
        'mailinStatus': 1,
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
        'idlefishStatus': 1,
        'idlefishfailMessage': '闲鱼发布失败',
        'mailinStatus': 0,
        'mailinfailMessage': '麦邻居发布失败',
        'rentPrice': 1700.0,
        'roomArea': 30.0,
        'roomCode': '10000',
        'roomNo': '302',
        'roomStatus': 2,
        'subdistrictName': '米市巷小区',
        'toiletCount': 1
      }]
    }
  }
}

export default {
  list: () => {
    return houseManage_info.list
  }
}
