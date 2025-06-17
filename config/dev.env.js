/*
 * @Descripttion:
 * @version:
 * @Author: etong
 * @Date: 2020-08-03 11:22:31
 * @LastEditors: wangqi angelqiqiwang@shjinjia.com.cn
 * @LastEditTime: 2024-03-25 11:32:01
 */

'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  ENV_CONFIG: '"dev"',
  VERSION: '"v' + new Date().getTime() + '"', // 版本格式
  BASE_Download_API:'"https://gateuat.shjinjia.com.cn/"',
  BASE_SOCKET_API: '"ws://10.10.18.57:4649/NotifyMessage?token="', // SOCKET URL
  BASE_CDN_API:'"http://cdn.upyun.mallimg.shjinjia.com.cn/"',
  BASE_API: '"https://gateuat.shjinjia.com.cn/api/"',
  BASE_OIDC_WEB_URL:'"http://srrdev.shjinjia.com.cn:10032"',
  // BASE_OIDC_WEB_URL:'"http://10.10.32.58:9528"',
  BASE_OIDC_Server_URL:'"https://gatedev.shjinjia.com.cn/"',
  BASE_OIDC_WEB_SSO_URL:'"http://ssodev.shjinjia.com.cn:11111"',
  BASE_OIDC_WEB_CLIENT_SECRET: '"secret"',
  BASE_CHATGPT3_API:'"https://chattest3.shjinjia.com.cn:1003/"', //chatGPT3跳转地址
  BASE_CHATGPT4_API:'"https://chattest4.shjinjia.com.cn:1004/"', //chatGPT4跳转地址
  BASE_HEIGHT:700,
})
