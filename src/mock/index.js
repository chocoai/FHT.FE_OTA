import Mock from 'mockjs'
import userApi from './user'
import exampleApi from './example'
import houseAsyncApi from './houseInfo'

// user
const reg_getUserInfo = /\/user\/queryUserDetail/
const reg_login = /\/user\/login/
const reg_logout = /\/user\/logout/

// example
const reg_example = /\/example\/list/

// houseManage
const reg_houseManage = /\/queryHostingHouseInfo/
const reg_changeRoomStatus = /\/changeLeaseStatus/
const reg_estateDeleteEstateApi = /\/deleteHouse/

Mock.mock(reg_getUserInfo, 'post', userApi.getUserInfo)
Mock.mock(reg_login, 'post', userApi.login)
Mock.mock(reg_logout, 'post', userApi.logout)
Mock.mock(reg_example, 'post', exampleApi.list)

Mock.mock(reg_houseManage, 'post', houseAsyncApi.list)
Mock.mock(reg_changeRoomStatus, 'post', houseAsyncApi.changeRoomStatus)
Mock.mock(reg_estateDeleteEstateApi, 'post', houseAsyncApi.estateDeleteEstateApi)

export default Mock
