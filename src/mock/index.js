import Mock from 'mockjs'
import userApi from './user'
import exampleApi from './example'
import houseAsyncApi from './houseInfo'

// user
const reg_getUserInfo = /\/user\/queryUserDetail/
const reg_login = /\/user\/login/
const reg_logout = /\/user\/quit/

// example
const reg_example = /\/example\/list/

// houseManage
const reg_houseManage = /\/fangyuan\/queryHostingList/
const reg_changeRoomStatus = /\/fangyuan\/changeLeaseStatus/
const reg_estateDeleteEstate = /\/fangyuan\/deleteHouse/
const reg_publishHouseApi = /\/rooms\/published/
const reg_unpublishHouseApi = /\/rooms\/offshelf/

Mock.mock(reg_getUserInfo, 'post', userApi.getUserInfo)
Mock.mock(reg_login, 'post', userApi.login)
Mock.mock(reg_logout, 'post', userApi.logout)
Mock.mock(reg_example, 'post', exampleApi.list)

Mock.mock(reg_houseManage, 'post', houseAsyncApi.list)
Mock.mock(reg_changeRoomStatus, 'post', houseAsyncApi.changeRoomStatus)
Mock.mock(reg_estateDeleteEstate, 'post', houseAsyncApi.estateDeleteEstate)
Mock.mock(reg_publishHouseApi, 'post', houseAsyncApi.publishHouse)
Mock.mock(reg_unpublishHouseApi, 'post', houseAsyncApi.unpublishHouse)

export default Mock
