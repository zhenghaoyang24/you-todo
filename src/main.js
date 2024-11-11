import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persistedstate'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

// element-plus变量
import 'element-plus/theme-chalk/dark/css-vars.css'
import './assets/main.css' //基础样式
import  './assets/theme.css';  //主题样式值

import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(createPinia().use(piniaPersist))
app.use(ElementPlus, {
    locale: zhCn,
})
app.use(router)
app.mount('#app')
