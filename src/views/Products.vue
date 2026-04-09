<template>
  <div>Products Page</div>
  <p v-if="loading">Loading...</p>
  <p v-else-if="error">{{ error }}</p>

  <ul v-else="products" v-for="items in products" :key="items.id">
    <li>title:{{ items.title }}</li>
    <li>body:{{ items.body }}</li>
  </ul>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getProducts } from '@/services/api'

const products = ref([])
const loading = ref(false)
const error = ref(null)

onMounted(async () => {
  loading.value = true
  try {
    const response = await getProducts()
    products.value = response.data
  } catch (err) {
    console.log('錯誤', err)
    error.value = '獲取產品數據失敗'
  } finally {
    loading.value = false
  }
})
</script>

<style scoped></style>
