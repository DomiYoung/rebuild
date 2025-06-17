<template>
  <div class="home-container">
    <el-card class="welcome-card">
      <div class="welcome-content">
        <h1>🎉 ZG ERP Vue 3 版本</h1>
        <p class="subtitle">现代化企业管理系统 - 迁移成功!</p>
        
        <div class="stats-grid">
          <div class="stat-item">
            <el-icon><TrendCharts /></el-icon>
            <div>
              <div class="stat-value">Vue 3.4+</div>
              <div class="stat-label">框架版本</div>
            </div>
          </div>
          
          <div class="stat-item">
            <el-icon><Lightning /></el-icon>
            <div>
              <div class="stat-value">Vite 5.0</div>
              <div class="stat-label">构建工具</div>
            </div>
          </div>
          
          <div class="stat-item">
            <el-icon><Cpu /></el-icon>
            <div>
              <div class="stat-value">TypeScript</div>
              <div class="stat-label">类型安全</div>
            </div>
          </div>
          
          <div class="stat-item">
            <el-icon><Trophy /></el-icon>
            <div>
              <div class="stat-value">Element Plus</div>
              <div class="stat-label">UI框架</div>
            </div>
          </div>
        </div>

        <div class="action-buttons">
          <el-button type="primary" size="large" @click="startMigration">
            开始业务模块迁移
          </el-button>
          <el-button size="large" @click="viewDocs">
            查看迁移文档
          </el-button>
        </div>
      </div>
    </el-card>

    <el-card class="migration-status">
      <h3>迁移进度</h3>
      <el-progress 
        :percentage="migrationProgress" 
        :color="progressColor"
        :stroke-width="8"
      />
      <p class="progress-text">基础架构已完成，可以开始业务模块迁移</p>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { TrendCharts, Lightning, Cpu, Trophy } from '@element-plus/icons-vue'

// 响应式数据
const migrationProgress = ref(25)
const progressColor = ref('#67c23a')

// 方法
const startMigration = () => {
  ElMessage.success('准备开始业务模块迁移！')
}

const viewDocs = () => {
  ElMessage.info('迁移文档功能待实现')
}
</script>

<style lang="scss" scoped>
.home-container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.welcome-card {
  margin-bottom: 20px;
  
  .welcome-content {
    text-align: center;
    padding: 40px 20px;
    
    h1 {
      font-size: 2.5rem;
      color: #409eff;
      margin-bottom: 10px;
    }
    
    .subtitle {
      font-size: 1.1rem;
      color: #606266;
      margin-bottom: 40px;
    }
  }
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
  
  .el-icon {
    font-size: 2rem;
    color: #409eff;
  }
  
  .stat-value {
    font-size: 1.2rem;
    font-weight: bold;
    color: #303133;
  }
  
  .stat-label {
    font-size: 0.9rem;
    color: #909399;
  }
}

.action-buttons {
  display: flex;
  gap: 15px;
  justify-content: center;
  flex-wrap: wrap;
}

.migration-status {
  h3 {
    margin-bottom: 20px;
    color: #303133;
  }
  
  .progress-text {
    margin-top: 10px;
    color: #606266;
    text-align: center;
  }
}

@media (max-width: 768px) {
  .welcome-content h1 {
    font-size: 2rem;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .action-buttons {
    flex-direction: column;
    align-items: center;
  }
}
</style> 