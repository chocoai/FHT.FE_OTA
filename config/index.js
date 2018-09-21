/*
 * @Author: FT.FE.Bolin
 * @Date: 2018-04-11 16:31:28
 * @Last Modified by: FT.FE.Bolin
 * @Last Modified time: 2018-09-21 16:43:18
 */

let path = require('path')
/* 本地联调后端IP地址 */
let proxyIPs = {
  WANLI: 'http://192.168.1.121:1234/', // 万里小哥哥
  HONGDENG: 'http://192.168.5.241:1234/' // 水滴灯小哥哥
}
module.exports = {
  dev: {
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/api': {
        // target: proxyIPs.WANLI,
        target: 'http://192.168.5.143:3000',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    },
    // host: '0.0.0.0',
    host: 'localhost',
    port: 1314,
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: false,
    poll: false,
    devtool: 'eval-source-map',
    cssSourceMap: false,
    useEslint: true,
    showEslintErrorsInOverlay: false
  },
  build: {
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    // history路由打包到根路径
    assetsPublicPath: '/',
    productionSourceMap: false,
    devtool: '#source-map',
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
