<template>
  <div>Login Page</div>
  <div>
    <div>帳號: <input type="text" v-model="userAccount" placeholder="請輸入帳號" /></div>

    <div>密碼: <input type="number" v-model="userPassword" placeholder="請輸入密碼" /></div>
    <button type="submit" @click="handleLogin">登入</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'

const router = useRouter()
const store = useUserStore()

const userAccount = ref('')
const userPassword = ref('')

const handleLogin = () => {
  if (userAccount.value && userPassword.value) {
    store.login({
      username: userAccount.value,
      password: userPassword.value,
    })

    router.push('/Dashboard')
  }
}
</script>

<style scoped></style>
