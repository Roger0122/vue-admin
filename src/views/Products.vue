<template>
  <!-- 表單 -->

  <div class="max-w-3xl mx-auto p-6">
    <h1 class="text-2xl font-bold mb-6">商品管理系統</h1>
    <div class="mb-6 p-4 border rounded-xl shadow">
      <p v-if="creating">creating...</p>
      <h2 class="text-xl font-bold mb-4">{{ editingId ? '編輯商品' : '新增商品' }}</h2>
      <!-- <p v-if="editingId">目前編輯中 ID: {{ editingId }}</p> -->

      <input
        class="border p-2 w-full mb-2 focus:outline-none focus:ring-2 focus:ring-green-400"
        v-model="title"
        placeholder="標題"
      />
      <input
        class="border p-2 w-full mb-2 focus:outline-none focus:ring-2 focus:ring-green-400"
        v-model="body"
        placeholder="描述"
      />
      <div class="flex gap-2 mt-3">
        <button
          class="bg-green-500 text-white px-4 py-2 rounded"
          :disabled="updating"
          @click="editingId ? handleUpdateProduct() : handleCreateProduct()"
        >
          {{ updating ? '更新中...' : editingId ? '更新' : '新增' }}
        </button>
        <button
          class="bg-gray-500 text-white px-3 py-1 rounded"
          v-if="editingId"
          @click="cancelEdit"
        >
          取消編輯
        </button>
      </div>
    </div>
  </div>
  <!-- 商品列表 -->
  <div>
    <div class="max-w-3xl mx-auto p-6">
      <p v-if="productStore.loading" class="text-center text-gray-500">資料載入中...</p>
      <p v-if="!productStore.products.length" class="text-center text-gray-400 mt-6">
        目前沒有商品，請新增一筆資料
      </p>
      <p v-else-if="productStore.error">{{ productStore.error }}</p>

      <div v-else>
        <div
          class="p-4 border rounded-xl shadow hover:shadow-lg transition mb-6"
          v-for="item in productStore.products"
          :key="item.id"
        >
          <h3 class="font-bold text-2xl">{{ item.title }}</h3>
          <p class="text-gray-600">{{ item.body }}</p>
          <div class="flex gap-2 mt-3">
            <button
              class="bg-red-500 text-white px-3 py-1 rounded"
              :disabled="deletingId === item.id"
              @click="handleDeleteProduct(item.id)"
            >
              {{ deletingId === item.id ? '刪除中...' : '刪除' }}
            </button>
            <button
              class="bg-blue-500 text-white px-3 py-1 rounded"
              @click="handleEditProduct(item)"
            >
              編輯
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useProductStore } from '@/stores/product'

const productStore = useProductStore()

const creating = ref(false)
const editingId = ref(null)
const updating = ref(false)
const title = ref('')
const body = ref('')

const deletingId = ref(null)

onMounted(async () => {
  productStore.fetchProducts()
})

const handleCreateProduct = async () => {
  creating.value = true

  if (!title.value || !body.value) {
    alert('請輸入完整資料')
    creating.value = false
    return
  }

  try {
    const res = {
      title: title.value,
      body: body.value,
    }

    if (res) {
      productStore.addProduct(res)
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
    await productStore.removeProduct(id)
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
    await productStore.updateProduct(editingId.value, {
      title: title.value,
      body: body.value,
    })

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
