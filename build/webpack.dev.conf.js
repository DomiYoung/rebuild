'use strict'
const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const smp = new SpeedMeasurePlugin();
// const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

// 移除 ora 导入，因为我们不再需要它
// const ora = require('ora')

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

// 将startTime移到这里，确保它在每次编译开始时都被重置
let startTime

const devWebpackConfig = merge(baseWebpackConfig, {
  mode: 'development',
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.dev.cssSourceMap,
      usePostCSS: true
    })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: 'cheap-module-eval-source-map' || config.dev.devtool,

  // these devServer options should be customized in /config/index.js
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: true,
    hot: true,
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll
    },
    disableHostCheck:true
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
    new webpack.HotModuleReplacementPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true,
      favicon: resolve('favicon.ico'),
      title: 'vue-element-admin',
      templateParameters: {
        BASE_URL: config.dev.assetsPublicPath + config.dev.assetsSubDirectory,
      },
    }),
    // 添加 ProgressPlugin
    new webpack.ProgressPlugin((percentage, message, ...args) => {
      if (percentage === 0) {
        startTime = Date.now()
      } else if (percentage === 1) {
        const endTime = Date.now()
        const totalTime = (endTime - startTime) / 1000
        console.log(`\n编译成功，总耗时: ${totalTime.toFixed(2)}秒\n`)
      }
    })
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(
        new FriendlyErrorsPlugin({
          compilationSuccessInfo: {
            messages: [
              `项目运行地址: http://${devWebpackConfig.devServer.host}:${port}`,
              `网络地址: http://${require('ip').address()}:${port}`,
            ]
          },
          onErrors: config.dev.notifyOnErrors
            ? utils.createNotifierCallback()
            : undefined,
          // 自定义编译状态
          onCompileStart: () => {
            startTime = Date.now()
          },
          onCompileSuccess: () => {
            const endTime = Date.now()
            const totalTime = (endTime - startTime) / 1000
            console.log(`编译成功，总耗时: ${totalTime.toFixed(2)}秒`)
          },
          onCompileError: () => {
            console.log('编译失败')
          }
        })
      )

      resolve(devWebpackConfig);
    }
  })
})



