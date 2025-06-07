import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// 引入防复制功能
import './utils/copyProtection.js' // 自动初始化
import { registerCopyDirectives } from './directives/copyAllowed.js'

const app = createApp(App)

app.use(router)

// 注册防复制指令
registerCopyDirectives(app)

app.mount('#app')
