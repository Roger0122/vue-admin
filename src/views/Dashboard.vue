<template>
  <div>Dashboard Page</div>
  <button @click="Logout">登出</button>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()

const handleLogout = () => {
  userStore.logout()
  router.push('/Login')
}

const Logout = () => {
  userStore.logout()
  handleLogout()
}
</script>

<style scoped></style>
