import { createApp } from 'vue'
import './assests/index.css'
import App from './App.vue'
import router from '@/router/index.js'
import { createPinia } from 'pinia'
import { useUserStore } from '@/stores/user'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

const userStore = useUserStore()
userStore.initAuth()

app.mount('#app')
