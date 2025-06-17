/*
 * @Descripttion: 
 * @version: 
 * @Author: etong
 * @Date: 2020-07-22 13:48:03
 * @LastEditors: wangqi angelqiqiwang@shjinjia.com.cn
 * @LastEditTime: 2024-03-25 11:30:41
 */
'use strict'
module.exports = {
  NODE_ENV: '"production"',
  ENV_CONFIG: '"prod"',
  VERSION: '"v' + new Date().getTime() + '"', // 版本格式
  BASE_Download_API:'"https://gate.shjinjia.com.cn/"',
  BASE_API: '"https://gate.shjinjia.com.cn/api/"',
  BASE_CDN_API:'"https://cdn.upyun.mallimg.shjinjia.com.cn/"',
  BASE_SOCKET_API: '"ws://47.96.237.222:4649/NotifyMessage?token="', // SOCKET URL
  BASE_OIDC_WEB_URL:'"https://oak.shjinjia.com.cn"',
  BASE_OIDC_Server_URL:'"https://gate.shjinjia.com.cn/"',
  BASE_OIDC_WEB_SSO_URL:'"https://sso.shjinjia.com.cn"',
  BASE_OIDC_WEB_CLIENT_SECRET:'"e6483a5940f045bea8df198fe82504c8"',
  ERROE_HTML_URL:'"https://fslogin.shjinjia.com.cn/error_authority.html"',
  BASE_CHATGPT3_API:'"https://chat3.shjinjia.com.cn/"', //chatGPT3跳转地址
  BASE_CHATGPT4_API:'"https://chat4.shjinjia.com.cn/"', //chatGPT4跳转地址
  BAIDU_ANALYTICS_ID: '"2bc3185efb697ac6bc88ca047cb5d6eb"', // 正式环境百度统计ID
  BAIDU_SITE_ID: '"2bc3185efb697ac6bc88ca047cb5d6eb"', // 生产环境的百度统计ID
  BASE_HEIGHT:700,
}
