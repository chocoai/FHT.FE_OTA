/* OTA 房源管理集 */
export const houseAsyncApi = {
  defaultOptions: {
    requestUrl: '/market/rooms',
    method: 'list'
  },
  list (params) {
    return fetch({
      url: houseAsyncApi.defaultOptions.requestUrl,
      method: 'post',
      data: {
        method: houseAsyncApi.defaultOptions.method,
        params
      }
    })
  }
}
