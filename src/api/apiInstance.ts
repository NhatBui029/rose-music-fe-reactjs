import axios from 'axios'
import useAppStore from '../stores/app.store'

const apiInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
})

apiInstance.interceptors.request.use(function (config) {
  const token = useAppStore.getState().currentUser?.token?.accessToken

  if (token) config.headers.Authorization = `Bearer ${token}`

  return config
})

apiInstance.interceptors.response.use((response) => {
  return response.data
})

export default apiInstance
