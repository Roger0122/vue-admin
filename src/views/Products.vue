<template>
  <div>Products Page</div>
  <p v-if="creating">creating...</p>
  <h2>{{ editingId ? '編輯商品' : '新增商品' }}</h2>
  <p v-if="editingId">目前編輯中 ID: {{ editingId }}</p>
  <button v-if="editingId" @click="cancelEdit">取消編輯</button>
  <input v-model="title" placeholder="title" />
  <input v-model="body" placeholder="body" />

  <button :disabled="updating" @click="editingId ? handleUpdateProduct() : handleCreateProduct()">
    {{ updating ? '更新中...' : editingId ? '更新' : '新增' }}
  </button>
  <p v-if="loading">Loading...</p>
  <p v-else-if="error">{{ error }}</p>

  <ul v-else>
    <li v-for="item in products" :key="item.id">
      <p>title:{{ item.title }}</p>
      <p>body:{{ item.body }}</p>
      <button :disabled="deletingId === item.id" @click="handleDeleteProduct(item.id)">
        {{ deletingId === item.id ? '刪除中...' : '刪除' }}
      </button>
      <button @click="handleEditProduct(item)">編輯</button>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getProducts, createProduct, deleteProduct, putProduct } from '@/services/api'

const products = ref([])
const loading = ref(false)
const error = ref(null)

const creating = ref(false)
const editingId = ref(null)
const updating = ref(false)
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

const handleUpdateProduct = async () => {
  if (!editingId.value) return

  if (!title.value || !body.value) {
    alert('請輸入完整資料')
    return
  }
  updating.value = true

  try {
    const res = await putProduct(editingId.value, {
      title: title.value,
      body: body.value,
    })

    const index = products.value.findIndex((item) => item.id === editingId.value)

    if (index !== -1) {
      products.value[index] = res.data
    }
    editingId.value = null
    title.value = ''
    body.value = ''
  } catch (err) {
    console.log('錯誤', err)
  } finally {
    updating.value = false
  }
}

const handleEditProduct = (item) => {
  editingId.value = item.id
  title.value = item.title
  body.value = item.body
}

const cancelEdit = () => {
  editingId.value = null
  title.value = ''
  body.value = ''
}
</script>

<style scoped></style>
