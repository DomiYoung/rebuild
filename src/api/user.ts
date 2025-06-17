import api from './index'

// 用户相关接口类型定义
export interface LoginParams {
  username: string
  password: string
  captcha?: string
}

export interface UserInfo {
  id: string
  username: string
  nickname: string
  email: string
  phone: string
  avatar: string
  roles: string[]
  permissions: string[]
  lastLoginTime: string
}

export interface UserListParams {
  page: number
  size: number
  keyword?: string
  status?: number
  departmentId?: string
}

// 用户API
export const userApi = {
  // 登录
  login(params: LoginParams) {
    return api.post<any, { token: string; userInfo: UserInfo }>('/auth/login', params)
  },

  // 登出
  logout() {
    return api.post('/auth/logout')
  },

  // 获取用户信息
  getUserInfo() {
    return api.get<any, UserInfo>('/user/info')
  },

  // 更新用户信息
  updateUserInfo(data: Partial<UserInfo>) {
    return api.put('/user/info', data)
  },

  // 修改密码
  changePassword(data: { oldPassword: string; newPassword: string }) {
    return api.put('/user/password', data)
  },

  // 获取用户列表
  getUserList(params: UserListParams) {
    return api.get('/user/list', { params })
  },

  // 创建用户
  createUser(data: Partial<UserInfo>) {
    return api.post('/user', data)
  },

  // 更新用户
  updateUser(id: string, data: Partial<UserInfo>) {
    return api.put(`/user/${id}`, data)
  },

  // 删除用户
  deleteUser(id: string) {
    return api.delete(`/user/${id}`)
  },

  // 重置密码
  resetPassword(id: string) {
    return api.put(`/user/${id}/reset-password`)
  },

  // 获取用户权限
  getUserPermissions(userId?: string) {
    return api.get(`/user/${userId || 'current'}/permissions`)
  }
} 