import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { userApi, type UserInfo, type LoginParams } from '@/api/user'
import { ElMessage } from 'element-plus'

export const useUserStore = defineStore('user', () => {
  // 状态
  const userInfo = ref<UserInfo | null>(null)
  const token = ref<string>('')
  const permissions = ref<string[]>([])
  const roles = ref<string[]>([])

  // 计算属性
  const isLoggedIn = computed(() => !!token.value && !!userInfo.value)
  const userName = computed(() => userInfo.value?.nickname || userInfo.value?.username || '')
  const userAvatar = computed(() => userInfo.value?.avatar || '')

  // 权限检查
  const hasPermission = computed(() => (permission: string) => {
    return permissions.value.includes(permission) || roles.value.includes('admin')
  })

  const hasRole = computed(() => (role: string) => {
    return roles.value.includes(role)
  })

  const hasAnyPermission = computed(() => (permissionList: string[]) => {
    return permissionList.some(permission => hasPermission.value(permission))
  })

  // Actions
  const login = async (loginParams: LoginParams) => {
    try {
      const response = await userApi.login(loginParams)
      
      // 保存token和用户信息
      token.value = response.token
      userInfo.value = response.userInfo
      permissions.value = response.userInfo.permissions || []
      roles.value = response.userInfo.roles || []
      
      // 持久化存储
      localStorage.setItem('access_token', response.token)
      localStorage.setItem('user_info', JSON.stringify(response.userInfo))
      
      ElMessage.success('登录成功')
      return response
    } catch (error) {
      console.error('登录失败:', error)
      throw error
    }
  }

  const logout = async () => {
    try {
      await userApi.logout()
    } catch (error) {
      console.error('登出失败:', error)
    } finally {
      // 清除状态
      resetUserState()
      ElMessage.success('已退出登录')
    }
  }

  const getUserInfo = async () => {
    try {
      const response = await userApi.getUserInfo()
      userInfo.value = response
      permissions.value = response.permissions || []
      roles.value = response.roles || []
      
      // 更新本地存储
      localStorage.setItem('user_info', JSON.stringify(response))
      
      return response
    } catch (error) {
      console.error('获取用户信息失败:', error)
      throw error
    }
  }

  const updateUserInfo = async (data: Partial<UserInfo>) => {
    try {
      const response = await userApi.updateUserInfo(data)
      
      // 更新本地状态
      if (userInfo.value) {
        Object.assign(userInfo.value, data)
        localStorage.setItem('user_info', JSON.stringify(userInfo.value))
      }
      
      ElMessage.success('更新成功')
      return response
    } catch (error) {
      console.error('更新用户信息失败:', error)
      throw error
    }
  }

  const changePassword = async (data: { oldPassword: string; newPassword: string }) => {
    try {
      await userApi.changePassword(data)
      ElMessage.success('密码修改成功，请重新登录')
      await logout()
    } catch (error) {
      console.error('修改密码失败:', error)
      throw error
    }
  }

  const resetUserState = () => {
    userInfo.value = null
    token.value = ''
    permissions.value = []
    roles.value = []
    
    // 清除本地存储
    localStorage.removeItem('access_token')
    localStorage.removeItem('user_info')
  }

  const initUserFromStorage = () => {
    const storedToken = localStorage.getItem('access_token')
    const storedUserInfo = localStorage.getItem('user_info')
    
    if (storedToken && storedUserInfo) {
      try {
        token.value = storedToken
        const parsedUserInfo = JSON.parse(storedUserInfo)
        userInfo.value = parsedUserInfo
        permissions.value = parsedUserInfo.permissions || []
        roles.value = parsedUserInfo.roles || []
      } catch (error) {
        console.error('恢复用户状态失败:', error)
        resetUserState()
      }
    }
  }

  return {
    // 状态
    userInfo,
    token,
    permissions,
    roles,
    
    // 计算属性
    isLoggedIn,
    userName,
    userAvatar,
    hasPermission,
    hasRole,
    hasAnyPermission,
    
    // 方法
    login,
    logout,
    getUserInfo,
    updateUserInfo,
    changePassword,
    resetUserState,
    initUserFromStorage
  }
}) 