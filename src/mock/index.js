import Mock from 'mockjs'
import userApi from './user'
import exampleApi from './example'
import houseAsyncApi from './houseInfo'
import roomDetailApi from './hostingRoomDetail'

// user
const reg_getUserInfo = /\/user\/queryUserDetail/
const reg_login = /\/user\/login/
const reg_logout = /\/user\/logout/

// example
const reg_example = /\/example\/list/

// houseManage
const reg_houseManage = /\/queryHostingHouseInfo/

// entryHouse
const reg_roomDetailManage = /\/queryZoneListByAreaId/

Mock.mock(reg_getUserInfo, 'post', userApi.getUserInfo)
Mock.mock(reg_login, 'post', userApi.login)
Mock.mock(reg_logout, 'post', userApi.logout)
Mock.mock(reg_example, 'post', exampleApi.list)

Mock.mock(reg_houseManage, 'post', houseAsyncApi.list)

Mock.mock(reg_roomDetailManage, 'post', roomDetailApi.zoneList)

export default Mock
