/*
 * @Descripttion:
 * @version:
 * @Author: etongP
 * @Date: 2020-08-04 10:06:42
 * @LastEditors: wangqi angelqiqiwang@shjinjia.com.cn
 * @LastEditTime: 2024-03-25 11:26:38
 */
'use strict'
module.exports = {
  NODE_ENV: '"production"',
  ENV_CONFIG: '"sit"',
  VERSION: '"v' + new Date().getTime() + '"', // 版本格式
  BASE_API: '"https://gateuat.shjinjia.com.cn/api/"',
  BASE_CDN_API: '"https://cdn.upyun.mallimg.shjinjia.com.cn/"',
  BASE_Download_API: '"https://gateuat.shjinjia.com.cn/"',
  BASE_OIDC_WEB_URL:'"https://oakuat.shjinjia.com.cn"',
  BASE_OIDC_Server_URL:'"https://gateuat.shjinjia.com.cn/"',
  BASE_OIDC_WEB_SSO_URL:'"https://ssouat.shjinjia.com.cn"',
  BASE_OIDC_WEB_CLIENT_SECRET:'"ef70aaf3e5bd4985a823ff4545fdd16a"',
  ERROE_HTML_URL:'"https://fsloginuat.shjinjia.com.cn/error_authority.html"',
  BASE_CHATGPT3_API:'"https://chat3.shjinjia.com.cn/"', //chatGPT3跳转地址
  BASE_CHATGPT4_API:'"https://chat4.shjinjia.com.cn/"', //chatGPT4跳转地址
  BAIDU_ANALYTICS_ID: '"e03a255965939a14258b00da647dbd3a"', // 测试环境百度统计ID
  BAIDU_SITE_ID: '"2bc3185efb697ac6bc88ca047cb5d6eb"', // UAT环境使用生产环境的百度统计ID
  BASE_HEIGHT:700,
};
