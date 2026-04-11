import axios from 'axios'

const BaseUrl = 'https://jsonplaceholder.typicode.com/posts'

export const getProducts = () => {
  return axios.get(`${BaseUrl}`)
}

export const createProduct = (data) => {
  return axios.post(`${BaseUrl}`, data)
}

export const deleteProduct = (id) => {
  return axios.delete(`${BaseUrl}/${id}`)
}
