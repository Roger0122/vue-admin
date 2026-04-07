import { createRouter, createWebHistory } from 'vue-router'

import Login from '@/views/Login.vue'
import Dashboard from '@/views/Dashboard.vue'
import Products from '@/views/Products.vue'

const routers = [
  { path: '/Login', component: Login },
  { path: '/Dashboard', component: Dashboard },
  { path: '/Products', component: Products },
]

const router = createRouter({
  history: createWebHistory(),
  routes: routers,
})

export default router
