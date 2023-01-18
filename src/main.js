import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import './assets/base.css'
import router from './router'
import store from './store/index.js'
import 'vant/es/toast/style';
import 'vant/es/dialog/style';
import './store/index.js'

import './api/mock.js'

const app=createApp(App)

app.use(router)
app.use(store)
app.mount('#app')
