import axios from 'axios'

const BaseUrl = 'https://jsonplaceholder.typicode.com/posts'

export const getProducts = () => {
  return axios.get(`${BaseUrl}`)
}
