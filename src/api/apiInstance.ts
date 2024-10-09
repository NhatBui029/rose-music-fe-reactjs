import axios from 'axios'
import useAppStore from '../stores/app.store'
import { ROUTE_PATHS } from '../routes/route-paths.constant'

const apiInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
})

apiInstance.interceptors.request.use(function (config) {
  const token = useAppStore.getState().currentUser?.token?.accessToken

  if (token) config.headers.Authorization = `Bearer ${token}`

  return config
})

apiInstance.interceptors.response.use(
  (response) => {
    return response.data
  },
  // (error) => {
  //   if (error.response.status === 401) {
  //     // signOut()
  //   }
  //   if ([500, 501, 502].includes(error.response.status)) {
  //     window.location.href = ROUTE_PATHS.SYSTEM_ERROR
  //   }

  //   return Promise.reject(error)
  // },
)

export default apiInstance
