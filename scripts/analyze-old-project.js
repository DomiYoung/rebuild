#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔍 分析原项目结构...\n');

// 分析原package.json
const oldPackageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
console.log('📦 原项目依赖分析:');
console.log(`- Vue版本: ${oldPackageJson.dependencies.vue}`);
console.log(`- 总依赖数: ${Object.keys(oldPackageJson.dependencies).length}`);
console.log(`- 开发依赖数: ${Object.keys(oldPackageJson.devDependencies || {}).length}\n`);

// 扫描src目录结构
function scanDirectory(dir, prefix = '') {
  const items = [];
  if (!fs.existsSync(dir)) return items;
  
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      items.push(`${prefix}📁 ${file}/`);
      items.push(...scanDirectory(filePath, prefix + '  '));
    } else if (file.endsWith('.vue') || file.endsWith('.js')) {
      items.push(`${prefix}📄 ${file}`);
    }
  });
  return items;
}

console.log('📂 源码结构分析:');
const srcStructure = scanDirectory('src');
srcStructure.slice(0, 20).forEach(item => console.log(item));
if (srcStructure.length > 20) {
  console.log(`  ... 还有 ${srcStructure.length - 20} 个项目\n`);
}

// 生成迁移清单
const migrationTasks = [
  '✅ 创建新package.json (已完成)',
  '✅ 配置vite.config.ts (已完成)', 
  '⏳ 迁移路由配置',
  '⏳ 迁移状态管理 (Vuex → Pinia)',
  '⏳ 迁移组件 (Element UI → Element Plus)',
  '⏳ 迁移API调用',
  '⏳ 迁移样式文件',
  '⏳ 更新TypeScript配置'
];

console.log('📋 迁移任务清单:');
migrationTasks.forEach(task => console.log(`  ${task}`));

console.log('\n🎯 下一步建议:');
console.log('1. 运行 npm install 安装新依赖');
console.log('2. 创建新的src目录结构');
console.log('3. 逐步迁移核心模块'); 