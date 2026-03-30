import axios from 'axios'
import { tokenStorage } from '../storage/tokenStorage'

export const httpClient = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
})

httpClient.interceptors.request.use((config) => {
  const token = tokenStorage.getToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

