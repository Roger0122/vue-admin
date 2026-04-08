import { createRouter, createWebHistory } from 'vue-router'

import Login from '@/views/Login.vue'
import Dashboard from '@/views/Dashboard.vue'
import Products from '@/views/Products.vue'
import { useUserStore } from '@/stores/user'

const routers = [
  { path: '/', redirect: '/Login' },
  { path: '/Login', name: 'Login', component: Login },
  { path: '/Dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/Products', name: 'Products', component: Products },
]

const router = createRouter({
  history: createWebHistory(),
  routes: routers,
})

router.beforeEach((to, from, next) => {
  const store = useUserStore()

  if (!store.isAuthenticated && to.name !== 'Login') {
    next({ name: 'Login' })
  } else if (store.isAuthenticated && to.name === 'Login') {
    next({ name: 'Dashboard' })
  } else {
    next()
  }
})
export default router
