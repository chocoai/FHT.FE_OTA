/*
 * @Author: FT.FE.Bolin
 * @Date: 2018-04-11 17:08:35
 * @Last Modified by: FT.FE.Bolin
 * @Last Modified time: 2018-09-20 15:19:02
 */

const getters = {
  sidebar: state => state.app.sidebar,
  sessionId: state => state.user.sessionId,
  avatar: state => state.user.avatar,
  name: state => state.user.userInfo.authed ? state.user.userInfo.authInfo.name : '昵称',
  roles: state => state.user.roles,
  permission_routers: state => state.permission.routers,
  addRouters: state => state.permission.addRouters,
  authed: state => state.user.userInfo.authed,
  idlefished: state => state.user.userInfo.idlefished
}
export default getters
