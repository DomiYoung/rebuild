<template>
  <div class="layout-container">
    <!-- 侧边栏 -->
    <div 
      class="sidebar-container"
      :class="{ collapsed: isCollapsed }"
    >
      <div class="sidebar-header">
        <div class="logo">
          <img src="/favicon.ico" alt="Logo" />
          <span v-show="!isCollapsed" class="logo-text">ZG ERP</span>
        </div>
      </div>
      
      <el-scrollbar class="sidebar-menu">
        <el-menu
          :default-active="activeMenu"
          :collapse="isCollapsed"
          :unique-opened="true"
          background-color="#304156"
          text-color="#bfcbd9"
          active-text-color="#409eff"
          @select="handleMenuSelect"
        >
          <menu-item
            v-for="route in menuRoutes"
            :key="route.path"
            :item="route"
            :base-path="route.path"
          />
        </el-menu>
      </el-scrollbar>
    </div>

    <!-- 主内容区 -->
    <div class="main-container">
      <!-- 头部 -->
      <div class="navbar">
        <div class="navbar-left">
          <el-button
            type="text"
            size="large"
            @click="toggleSidebar"
          >
            <el-icon>
              <Expand v-if="isCollapsed" />
              <Fold v-else />
            </el-icon>
          </el-button>
          
          <breadcrumb />
        </div>

        <div class="navbar-right">
          <!-- 全屏按钮 -->
          <el-tooltip content="全屏">
            <el-button
              type="text"
              size="large"
              @click="toggleFullscreen"
            >
              <el-icon>
                <FullScreen />
              </el-icon>
            </el-button>
          </el-tooltip>

          <!-- 用户下拉菜单 -->
          <el-dropdown @command="handleUserCommand">
            <div class="user-avatar">
              <el-avatar :src="userAvatar" :size="32">
                {{ userName.charAt(0) }}
              </el-avatar>
              <span class="user-name">{{ userName }}</span>
              <el-icon class="dropdown-icon">
                <ArrowDown />
              </el-icon>
            </div>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="profile">
                  <el-icon><User /></el-icon>
                  个人中心
                </el-dropdown-item>
                <el-dropdown-item command="settings">
                  <el-icon><Setting /></el-icon>
                  系统设置
                </el-dropdown-item>
                <el-dropdown-item divided command="logout">
                  <el-icon><SwitchButton /></el-icon>
                  退出登录
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>

      <!-- 标签页 -->
      <div class="tags-view" v-if="showTags">
        <el-scrollbar>
          <div class="tags-container">
            <el-tag
              v-for="tag in visitedViews"
              :key="tag.path"
              :type="isActive(tag) ? '' : 'info'"
              :closable="!tag.meta.affix"
              @click="visitTag(tag)"
              @close="closeTag(tag)"
              class="tag-item"
            >
              {{ tag.meta.title }}
            </el-tag>
          </div>
        </el-scrollbar>
      </div>

      <!-- 内容区域 -->
      <div class="app-main">
        <router-view v-slot="{ Component, route }">
          <transition name="fade-transform" mode="out-in">
            <keep-alive :include="cachedViews">
              <component :is="Component" :key="route.path" />
            </keep-alive>
          </transition>
        </router-view>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { useAppStore } from '@/stores/app'
import { useTagsViewStore } from '@/stores/tagsView'
import MenuItem from './MenuItem.vue'
import Breadcrumb from './Breadcrumb.vue'
import { ElMessageBox } from 'element-plus'
import {
  Expand, Fold, FullScreen, ArrowDown, User, Setting, SwitchButton
} from '@element-plus/icons-vue'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const appStore = useAppStore()
const tagsViewStore = useTagsViewStore()

// 响应式数据
const isCollapsed = computed(() => appStore.sidebarCollapsed)
const showTags = computed(() => appStore.showTagsView)
const activeMenu = computed(() => route.path)
const userName = computed(() => userStore.userName)
const userAvatar = computed(() => userStore.userAvatar)
const visitedViews = computed(() => tagsViewStore.visitedViews)
const cachedViews = computed(() => tagsViewStore.cachedViews)

// 菜单路由过滤
const menuRoutes = computed(() => {
  return router.getRoutes().filter(route => {
    return route.meta && !route.meta.hideInMenu && hasRoutePermission(route)
  })
})

// 权限检查
const hasRoutePermission = (route: any) => {
  if (!route.meta.permissions) return true
  return userStore.hasAnyPermission(route.meta.permissions)
}

// 方法
const toggleSidebar = () => {
  appStore.toggleSidebar()
}

const toggleFullscreen = () => {
  if (document.fullscreenElement) {
    document.exitFullscreen()
  } else {
    document.documentElement.requestFullscreen()
  }
}

const handleMenuSelect = (path: string) => {
  router.push(path)
}

const handleUserCommand = async (command: string) => {
  switch (command) {
    case 'profile':
      router.push('/profile')
      break
    case 'settings':
      router.push('/settings')
      break
    case 'logout':
      try {
        await ElMessageBox.confirm('确定要退出登录吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        await userStore.logout()
        router.push('/login')
      } catch {
        // 用户取消
      }
      break
  }
}

const isActive = (tag: any) => {
  return tag.path === route.path
}

const visitTag = (tag: any) => {
  router.push(tag.path)
}

const closeTag = (tag: any) => {
  tagsViewStore.delView(tag)
  if (isActive(tag)) {
    const lastView = visitedViews.value[visitedViews.value.length - 1]
    if (lastView) {
      router.push(lastView.path)
    } else {
      router.push('/')
    }
  }
}

// 监听路由变化，添加标签
watch(route, (newRoute) => {
  if (newRoute.name && !newRoute.meta.hideInMenu) {
    tagsViewStore.addView(newRoute)
  }
}, { immediate: true })

onMounted(() => {
  // 初始化用户状态
  userStore.initUserFromStorage()
})
</script>

<style lang="scss" scoped>
.layout-container {
  display: flex;
  height: 100vh;
}

.sidebar-container {
  width: 210px;
  background-color: #304156;
  transition: width 0.3s;
  overflow: hidden;
  
  &.collapsed {
    width: 64px;
  }
}

.sidebar-header {
  height: 60px;
  display: flex;
  align-items: center;
  padding: 0 20px;
  border-bottom: 1px solid #3a4a5c;
  
  .logo {
    display: flex;
    align-items: center;
    color: #fff;
    font-size: 18px;
    font-weight: bold;
    
    img {
      width: 32px;
      height: 32px;
      margin-right: 10px;
    }
    
    .logo-text {
      transition: opacity 0.3s;
    }
  }
}

.sidebar-menu {
  height: calc(100vh - 60px);
  
  :deep(.el-menu) {
    border: none;
  }
}

.main-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.navbar {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  background-color: #fff;
  border-bottom: 1px solid #e4e7ed;
  
  .navbar-left {
    display: flex;
    align-items: center;
    gap: 15px;
  }
  
  .navbar-right {
    display: flex;
    align-items: center;
    gap: 15px;
  }
}

.user-avatar {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  padding: 5px 10px;
  border-radius: 4px;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: #f5f7fa;
  }
  
  .user-name {
    font-size: 14px;
    color: #303133;
  }
  
  .dropdown-icon {
    color: #c0c4cc;
    transition: transform 0.3s;
  }
}

.tags-view {
  height: 40px;
  background-color: #fff;
  border-bottom: 1px solid #e4e7ed;
  padding: 0 15px;
  
  .tags-container {
    display: flex;
    align-items: center;
    height: 100%;
    gap: 8px;
    
    .tag-item {
      cursor: pointer;
      border-radius: 3px;
      
      &:hover {
        opacity: 0.8;
      }
    }
  }
}

.app-main {
  flex: 1;
  padding: 20px;
  background-color: #f5f7fa;
  overflow: auto;
}

// 过渡动画
.fade-transform-enter-active,
.fade-transform-leave-active {
  transition: all 0.3s;
}

.fade-transform-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

@media (max-width: 768px) {
  .sidebar-container {
    position: fixed;
    z-index: 1000;
    height: 100vh;
    
    &.collapsed {
      transform: translateX(-100%);
    }
  }
  
  .main-container {
    margin-left: 0;
  }
  
  .navbar {
    padding: 0 10px;
  }
  
  .app-main {
    padding: 10px;
  }
}
</style> 