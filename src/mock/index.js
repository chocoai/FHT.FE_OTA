import Mock from 'mockjs'
import userApi from './user'

// 登录相关
const reg_getUserInfo = /\/user\/bolin/
Mock.mock(reg_getUserInfo, 'post', userApi.getUserInfo)
export default Mock
