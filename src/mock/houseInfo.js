/*
 * @Author: FT.FE.Bolin
 * @Date: 2018-09-17 17:03:04
 * @Last Modified by: FT.FE.Bolin
 * @Last Modified time: 2018-09-17 17:05:50
 */
const houseManage_info = {
  list: {
    'reqId': '1',
    'code': '0',
    'message': '操作成功',

    'data': [
      {
        'roomCode': '200061909',
        'fangyuanCode': null,
        'roomName': '房间A',
        'roomArea': 22,
        'roomDirection': 1,
        'roomAttributes': '',
        'payOfPayment': 1,
        'depositOfPayment': 1,
        'rent': 1700.0,
        'deposit': 1700.0,
        'facilityItems': '',
        'pictures': [
          {
            'imageName': '1.png',
            'src': 'src',
            'isBase64': 0
          }
        ]
      },
      {
        'roomCode': '200061910',
        'fangyuanCode': null,
        'roomName': '房间B',
        'roomArea': 22,
        'roomDirection': 1,
        'roomAttributes': '',
        'facilityItems': '',
        'pictures': null
      },
      {
        'roomCode': '200061911',
        'fangyuanCode': null,
        'roomName': '房间C',
        'roomArea': 22,
        'roomDirection': 1,
        'roomAttributes': '',
        'facilityItems': '',
        'pictures': null
      },
      {
        'roomCode': '200061912',
        'fangyuanCode': null,
        'roomName': '房间D',
        'roomArea': 22,
        'roomDirection': 1,
        'roomAttributes': '',
        'facilityItems': '',
        'pictures': null
      },
      {
        'roomCode': '200061913',
        'fangyuanCode': null,
        'roomName': '房间E',
        'roomArea': 22,
        'roomDirection': 1,
        'roomAttributes': '',
        'facilityItems': '',
        'pictures': null
      }
    ]
  }
}

export default {
  list: () => {
    return houseManage_info.list
  }
}
