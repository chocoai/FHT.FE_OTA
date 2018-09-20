import Mock from 'mockjs'
import userApi from './user'
import exampleApi from './example'
import houseAsyncApi from './houseInfo'
import roomDetailApi from './hostingRoomDetail'

// user
const reg_getUserInfo = /\/user\/info/
const reg_login = /\/user\/login/
const reg_logout = /\/user\/quit/

// example
const reg_example = /\/example\/list/

// houseManage
const reg_houseManage = /\/fangyuan\/queryHostingList\/isMock/
const reg_changeRoomStatus = /\/fangyuan\/changeLeaseStatus\/isMock/
const reg_estateDeleteEstate = /\/fangyuan\/deleteHouse\/isMock/
const reg_queryCityAreaPlot = /\/fangyuan\/queryCityAreaPlot\/isMock/
// 发布 下架
const reg_publishHouseApi = /\/rooms\/published\/isMock/
const reg_unpublishHouseApi = /\/rooms\/offshelf\/isMock/
// 授权
const reg_authorize = /\/account\/binding\/isMock/
const reg_authorizePicture = /\/account\/picture\/isMock/
const reg_authorizeStatus = /\/account\/acquired\/isMock/
// 实名认证
const reg_certificationFrom = /\/user\/auth/

// entryHouse
const reg_roomDetailManage = /\/queryZoneListByAreaId/

Mock.mock(reg_getUserInfo, 'post', userApi.getUserInfo)
Mock.mock(reg_login, 'post', userApi.login)
Mock.mock(reg_logout, 'post', userApi.logout)
Mock.mock(reg_example, 'post', exampleApi.list)

Mock.mock(reg_houseManage, 'post', houseAsyncApi.list)
Mock.mock(reg_changeRoomStatus, 'post', houseAsyncApi.changeRoomStatus)
Mock.mock(reg_estateDeleteEstate, 'post', houseAsyncApi.estateDeleteEstate)
Mock.mock(reg_publishHouseApi, 'post', houseAsyncApi.publishHouse)
Mock.mock(reg_unpublishHouseApi, 'post', houseAsyncApi.unpublishHouse)

Mock.mock(reg_roomDetailManage, 'post', roomDetailApi.zoneList)

Mock.mock(reg_queryCityAreaPlot, 'post', houseAsyncApi.queryCityAreaPlot)
Mock.mock(reg_authorize, 'post', houseAsyncApi.authorize)
Mock.mock(reg_authorizePicture, 'post', houseAsyncApi.authorizePicture)
Mock.mock(reg_authorizeStatus, 'post', houseAsyncApi.authorizeStatus)
Mock.mock(reg_certificationFrom, 'post', houseAsyncApi.certificationFrom)
export default Mock
