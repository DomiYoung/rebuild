import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'

// 样式文件
import 'element-plus/dist/index.css'
import './styles/index.scss'

const app = createApp(App)

// 状态管理
app.use(createPinia())

// 路由
app.use(router)

// 挂载应用
app.mount('#app') 