import axios from 'axios'

const apiCloudinaryInstance = axios.create({
  baseURL: import.meta.env.VITE_API_CLOUDINARY_URL,
})

apiCloudinaryInstance.interceptors.response.use((response) => {
  return response.data
})

export default apiCloudinaryInstance
