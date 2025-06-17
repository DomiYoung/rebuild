'use strict';

var Fs = require('fs');

/**
 * 版本信息生成插件
 */
function VersionPlugin(options) {
  this.options = options || {};
  !this.options.versionDirectory && (this.options.versionDirectory = 'static');
}

// apply方法是必须要有的，因为当我们使用一个插件时（new somePlugins({})），webpack会去寻找插件的apply方法执行
VersionPlugin.prototype.apply = function (compiler) {
  var self = this;
  compiler.plugin('compile', function (params) {
    // 生成版本信息文件路径
    // this.options.path：项目的绝对路径
    var dir_path = self.options.path + '/' + self.options.versionDirectory;
    var version_file = dir_path + '/version.json';
    var content = '{"version":' + self.options.env.VERSION + '}';

    Fs.access(dir_path, Fs.constants.F_OK, (err) => {
      console.log(` ${dir_path}${err ? '不存在' : '存在'} `);
      if (!err) {
        writeVersion(self, version_file, content);
        return;
      }
      // 如果没有dist，先创建dist
      Fs.mkdir(self.options.path, function (err) {
        // if (err) throw err;
        Fs.mkdir(dir_path, function (err) {
          if (err) throw err;
          console.log('\n创建目录[' + dir_path + ']成功');
          writeVersion(self, version_file, content);
        });
      });
    });

  });
  // 编译器对'所有任务已经完成'这个事件的监听
  compiler.plugin('done', function (stats) {
    console.log('应用编译完成！');
  });
};

const writeVersion = (self, versionFile, content) => {
  console.log('\n当前版本号：' + self.options.env.VERSION);
  console.log('开始写入版本信息...');
  // 写入文件
  Fs.writeFile(versionFile, content, function (err) {
    if (err) throw err;
    console.log('版本信息写入成功！');
  });
};

module.exports = VersionPlugin;
