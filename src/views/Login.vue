<template>
  <div class="login-container">
    <div class="login-box">
      <div class="login-header">
        <h1>ZG ERP 管理系统</h1>
        <p>现代化企业资源规划平台</p>
      </div>

      <el-form
        ref="loginFormRef"
        :model="loginForm"
        :rules="loginRules"
        class="login-form"
        @keyup.enter="handleLogin"
      >
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            placeholder="请输入用户名"
            size="large"
            prefix-icon="User"
            clearable
          />
        </el-form-item>

        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            type="password"
            placeholder="请输入密码"
            size="large"
            prefix-icon="Lock"
            show-password
            clearable
          />
        </el-form-item>

        <el-form-item v-if="showCaptcha" prop="captcha">
          <div class="captcha-container">
            <el-input
              v-model="loginForm.captcha"
              placeholder="请输入验证码"
              size="large"
              prefix-icon="Picture"
              clearable
            />
            <div class="captcha-image" @click="refreshCaptcha">
              <img :src="captchaUrl" alt="验证码" />
            </div>
          </div>
        </el-form-item>

        <el-form-item>
          <div class="login-options">
            <el-checkbox v-model="rememberMe">记住密码</el-checkbox>
            <el-link type="primary" @click="handleForgotPassword">
              忘记密码？
            </el-link>
          </div>
        </el-form-item>

        <el-form-item>
          <el-button
            type="primary"
            size="large"
            :loading="loading"
            class="login-button"
            @click="handleLogin"
          >
            {{ loading ? '登录中...' : '登录' }}
          </el-button>
        </el-form-item>
      </el-form>

      <div class="login-footer">
        <p>© 2024 ZG ERP. 基于 Vue 3 + TypeScript + Element Plus</p>
      </div>
    </div>

    <!-- 背景装饰 -->
    <div class="background-decoration">
      <div class="decoration-circle circle-1"></div>
      <div class="decoration-circle circle-2"></div>
      <div class="decoration-circle circle-3"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
import { User, Lock, Picture } from '@element-plus/icons-vue'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const userStore = useUserStore()

// 响应式数据
const loginFormRef = ref<FormInstance>()
const loading = ref(false)
const showCaptcha = ref(false)
const rememberMe = ref(false)
const captchaUrl = ref('')

// 登录表单
const loginForm = reactive({
  username: '',
  password: '',
  captcha: ''
})

// 表单验证规则
const loginRules: FormRules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 2, max: 20, message: '用户名长度在 2 到 20 个字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 20, message: '密码长度在 6 到 20 个字符', trigger: 'blur' }
  ],
  captcha: [
    { required: true, message: '请输入验证码', trigger: 'blur' },
    { len: 4, message: '验证码长度为 4 位', trigger: 'blur' }
  ]
}

// 方法
const handleLogin = async () => {
  if (!loginFormRef.value) return

  try {
    await loginFormRef.value.validate()
    
    loading.value = true
    
    await userStore.login({
      username: loginForm.username,
      password: loginForm.password,
      captcha: showCaptcha.value ? loginForm.captcha : undefined
    })

    // 登录成功，跳转到首页
    router.push('/')
    
  } catch (error) {
    console.error('登录失败:', error)
    
    // 如果需要验证码，显示验证码
    if (!showCaptcha.value) {
      showCaptcha.value = true
      refreshCaptcha()
    } else {
      refreshCaptcha()
    }
  } finally {
    loading.value = false
  }
}

const handleForgotPassword = () => {
  ElMessage.info('请联系管理员重置密码')
}

const refreshCaptcha = () => {
  captchaUrl.value = `/api/auth/captcha?t=${Date.now()}`
}

const initRememberMe = () => {
  const savedUsername = localStorage.getItem('remembered_username')
  const savedPassword = localStorage.getItem('remembered_password')
  
  if (savedUsername && savedPassword) {
    loginForm.username = savedUsername
    loginForm.password = savedPassword
    rememberMe.value = true
  }
}

const saveRememberMe = () => {
  if (rememberMe.value) {
    localStorage.setItem('remembered_username', loginForm.username)
    localStorage.setItem('remembered_password', loginForm.password)
  } else {
    localStorage.removeItem('remembered_username')
    localStorage.removeItem('remembered_password')
  }
}

// 生命周期
onMounted(() => {
  initRememberMe()
  
  // 如果已经登录，直接跳转首页
  if (userStore.isLoggedIn) {
    router.push('/')
  }
})
</script>

<style lang="scss" scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  position: relative;
  overflow: hidden;
}

.login-box {
  width: 400px;
  padding: 40px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  z-index: 10;
}

.login-header {
  text-align: center;
  margin-bottom: 40px;
  
  h1 {
    font-size: 2rem;
    color: #303133;
    margin-bottom: 8px;
    font-weight: 600;
  }
  
  p {
    color: #909399;
    font-size: 0.9rem;
  }
}

.login-form {
  .el-form-item {
    margin-bottom: 24px;
  }
}

.captcha-container {
  display: flex;
  gap: 12px;
  
  .el-input {
    flex: 1;
  }
  
  .captcha-image {
    width: 100px;
    height: 40px;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    cursor: pointer;
    overflow: hidden;
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    
    &:hover {
      border-color: #409eff;
    }
  }
}

.login-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.login-button {
  width: 100%;
  height: 44px;
  font-size: 16px;
  font-weight: 500;
}

.login-footer {
  text-align: center;
  margin-top: 30px;
  
  p {
    color: #909399;
    font-size: 0.8rem;
  }
}

.background-decoration {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.decoration-circle {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  animation: float 6s ease-in-out infinite;
  
  &.circle-1 {
    width: 300px;
    height: 300px;
    top: -150px;
    left: -150px;
    animation-delay: 0s;
  }
  
  &.circle-2 {
    width: 200px;
    height: 200px;
    top: 50%;
    right: -100px;
    animation-delay: 2s;
  }
  
  &.circle-3 {
    width: 150px;
    height: 150px;
    bottom: -75px;
    left: 50%;
    animation-delay: 4s;
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(180deg);
  }
}

@media (max-width: 480px) {
  .login-box {
    width: 90%;
    padding: 30px 20px;
  }
  
  .login-header h1 {
    font-size: 1.5rem;
  }
}
</style> 