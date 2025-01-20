import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/',
})

axiosInstance.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('access_token')

  if (token) {


    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      sessionStorage.removeItem('authToken')
      window.location.href = '/login'
      console.log('Error 401');

    }
    return Promise.reject(error)
  },
)

export default axiosInstance
