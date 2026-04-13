import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getProducts, createProduct, deleteProduct, putProduct } from '@/services/api'

export const useProductStore = defineStore('product', () => {
  const products = ref([])
  const loading = ref(false)
  const error = ref(null)

  const fetchProducts = async () => {
    loading.value = true
    try {
      const response = await getProducts()
      products.value = response.data
    } catch (err) {
      error.value = err
    } finally {
      loading.value = false
    }
  }

  const addProduct = async (data) => {
    const res = await createProduct(data)

    const newItem = {
      ...res.data,
      id: Date.now(),
    }
    products.value.unshift(newItem)
  }

  const removeProduct = async (id) => {
    await deleteProduct(id)
    products.value = products.value.filter((item) => item.id !== id)
  }

  const updateProduct = async (id, data) => {
    // const res = await putProduct(id, data)

    const index = products.value.findIndex((item) => item.id === id)
    if (index !== -1) {
      products.value[index] = { ...products.value[index], ...data }
    }
  }
  return {
    products,
    loading,
    error,
    fetchProducts,
    addProduct,
    removeProduct,
    updateProduct,
  }
})
