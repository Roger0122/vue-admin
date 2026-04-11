<template>
  <div>Products Page</div>
  <p v-if="creating">creating...</p>
  <input type="text" placeholder="請輸入標題" v-model="title" />
  <input type="text" placeholder="請輸入內容" v-model="body" />
  <button @click="handleCreateProduct">新增產品</button>

  <p v-if="loading">Loading...</p>
  <p v-else-if="error">{{ error }}</p>

  <ul v-else="products">
    <li v-for="items in products" :key="items.id">
      <p>title:{{ items.title }}</p>
      <p>body:{{ items.body }}</p>
      <button :disabled="deletingId === items.id" @click="handleDeleteProduct(items.id)">
        {{ deletingId === items.id ? '刪除中...' : '刪除' }}
      </button>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getProducts, createProduct, deleteProduct } from '@/services/api'

const products = ref([])
const loading = ref(false)
const error = ref(null)

const creating = ref(false)

const title = ref('')
const body = ref('')

const deletingId = ref(null)

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

const handleCreateProduct = async () => {
  creating.value = true

  if (!title.value || !body.value) {
    alert('請輸入完整資料')
    creating.value = false
    return
  }

  try {
    const res = await createProduct({
      title: title.value,
      body: body.value,
    })

    if (res.data) {
      products.value.unshift(res.data)
    }
  } catch (err) {
    console.log('錯誤', err)
  } finally {
    title.value = ''
    body.value = ''

    creating.value = false
  }
}

const handleDeleteProduct = async (id) => {
  if (!confirm(`確定要刪除id:${id}嗎?`)) return

  deletingId.value = id
  try {
    await deleteProduct(id)
    products.value = products.value.filter((item) => item.id !== id)
  } catch (err) {
    console.log('錯誤', err)
  } finally {
    deletingId.value = null
  }
}
</script>

<style scoped></style>
