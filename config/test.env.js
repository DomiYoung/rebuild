/*
 * @Author: wangqi angelqiqiwang@shjinjia.com.cn
 * @Date: 2024-03-25 11:22:24
 * @LastEditors: wangqi angelqiqiwang@shjinjia.com.cn
 * @LastEditTime: 2024-03-25 12:17:33
 * @FilePath: \oak\config\test.env.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
'use strict'
module.exports = {
  NODE_ENV: '"production"',
  ENV_CONFIG: '"test"',
  VERSION: '"v' + new Date().getTime() + '"', // 版本格式
  BASE_API: '"https://gatetest.shjinjia.com.cn/api/"',
  // BASE_API: '"http://10.10.220.114:8000/test/api/"',
  BASE_Download_API: '"http://apiuat.shjinjia.com.cn:8089/"',
  BASE_CDN_API:'"https://cdn.upyun.mallimg.shjinjia.com.cn/"',
  BASE_OIDC_WEB_URL:'"https://oaktest.shjinjia.com.cn:10112"',
  BASE_OIDC_Server_URL:'"https://gatetest.shjinjia.com.cn/"',
  BASE_OIDC_WEB_SSO_URL:'"https://ssotest.shjinjia.com.cn:11112"',
  BASE_OIDC_WEB_CLIENT_SECRET:'"57908038-e12c-4f2d-8b4c-6f580cca71b6"',
  ERROE_HTML_URL:'"https://fslogintest.shjinjia.com.cn:5678/error_authority.html"',
  BASE_CHATGPT3_API:'"https://chattest3.shjinjia.com.cn:1003/"', //chatGPT3跳转地址
  BASE_CHATGPT4_API:'"https://chattest4.shjinjia.com.cn:1004/"', //chatGPT4跳转地址
  BAIDU_SITE_ID: '"e03a255965939a14258b00da647dbd3a"', // 测试环境的百度统计ID
  BASE_HEIGHT:700,
};
