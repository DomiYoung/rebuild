/**
 * 优化的构建脚本
 * @file build-with-progress.js
 * @description 该脚本用于优化 Vue 2 项目的构建过程，提供实时的文件处理进度、模块编译信息、耗时信息和美化输出
 */

var ora = require('ora');
var chalk = require('chalk');
var webpack = require('webpack');
var webpackConfig = require('./webpack.prod.conf');
var figlet = require('figlet');
var gradient = require('gradient-string');
var ProgressPlugin = require('webpack/lib/ProgressPlugin');
var moment = require('moment');

var envConfig = process.env.env_config;
console.log(chalk.blue('当前构建环境：' + envConfig));

// 根据环境配置加载不同的 webpack 配置
if (envConfig === 'dev') {
  webpackConfig = require('./webpack.dev.conf');
}
console.log(chalk.blue('使用的 Webpack 配置文件：' + (envConfig === 'dev' ? 'webpack.dev.conf.js' : 'webpack.prod.conf.js')));

/**
 * 创建 webpack 编译器实例
 * @returns {Object} webpack 编译器实例
 */
function createCompiler() {
  var compiler = webpack(webpackConfig);
  return compiler;
}

/**
 * 格式化文件大小
 * @param {number} bytes - 文件大小（字节）
 * @returns {string} 格式化后的文件大小
 */
function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes';
  var k = 1024;
  var sizes = ['Bytes', 'KB', 'MB', 'GB'];
  var i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * 显示构建结果
 * @param {Object} stats - webpack 构建统计信息
 */
function displayBuildResult(stats) {
  var info = stats.toJson({
    all: false,
    assets: true,
    warnings: true,
    errors: true,
    timings: true
  });

  console.log(chalk.cyan('\n构建完成。\n'));
  console.log(chalk.yellow('Webpack 打包信息：\n'));

  // 显示资源信息
  console.log(chalk.cyan('生成的文件：'));
  info.assets.forEach(function(asset) {
    console.log('  ' + chalk.green(asset.name) + ' - ' + chalk.blue(formatFileSize(asset.size)));
  });

  // 显示警告信息
  if (info.warnings.length > 0) {
    console.log('\n' + chalk.yellow('警告：'));
    info.warnings.forEach(function(warning) {
      console.log('  ' + chalk.yellow(warning));
    });
  }

  // 显示错误信息
  if (info.errors.length > 0) {
    console.log('\n' + chalk.red('错误：'));
    info.errors.forEach(function(error) {
      console.log('  ' + chalk.red(error));
    });
  }

  // 显示时间信息
  console.log('\n' + chalk.cyan('构建时间：') + chalk.green(info.time + 'ms'));
}

/**
 * 运行构建过程
 */
function build() {
  var spinner = ora('正在初始化构建环境...').start();
  var compiler = createCompiler();
  var lastPercentage = 0;
  var startTime = Date.now();
  var moduleCount = 0;
  var currentModule = '';

  new ProgressPlugin(function(percentage, msg, moduleProgress, activeModules, moduleName) {
    spinner.stop();

    var percentageStr = (percentage * 100).toFixed(2) + '%';
    var message = '构建进度：' + percentageStr + ' ' + (msg || '');

    if (moduleName) {
      moduleCount++;
      var now = Date.now();
      var moduleTime = now - startTime;
      console.log(
        chalk.blue('正在处理：') + chalk.cyan(moduleName) + 
        chalk.yellow(' 耗时：') + chalk.green(moduleTime + 'ms') + 
        chalk.yellow(' 总模块数：') + chalk.green(moduleCount)
      );
      currentModule = moduleName;
      startTime = now;
    }

    console.log(chalk.green(message));

    if (moduleProgress) {
      console.log(chalk.gray('  ' + moduleProgress));
    }

    spinner.text = '处理中...';
    spinner.start();
  }).apply(compiler);

  compiler.run(function(err, stats) {
    spinner.stop();

    if (err) {
      console.error(chalk.red('构建遇到错误：\n'));
      console.error(err.stack || err);
      if (err.details) {
        console.error(chalk.red('错误详情：\n'));
        console.error(err.details);
      }
      process.exit(1);
    }

    var info = stats.toJson();

    if (stats.hasErrors()) {
      console.error(chalk.red('构建出现错误：\n'));
      info.errors.forEach(function(error) {
        console.error(chalk.red(error));
      });
      process.exit(1);
    }

    if (stats.hasWarnings()) {
      console.warn(chalk.yellow('构建警告：\n'));
      info.warnings.forEach(function(warning) {
        console.warn(chalk.yellow(warning));
      });
    }

    displayBuildResult(stats);

    var endTime = Date.now();
    var buildTime = moment.duration(endTime - startTime).humanize();
    console.log(chalk.yellow('\n总构建时间：') + chalk.cyan(buildTime));
  });
}

console.log('\n');
console.log(gradient.pastel.multiline(figlet.textSync('ZG-ERP Build', { horizontalLayout: 'full' })));
console.log('\n');

build();