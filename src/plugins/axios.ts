import axios from 'axios'
import { useUserStore } from '@/store/auth'
import { useRouter } from 'vue-router'
import { useLoadingStore } from '@/store/loader'
import { useLoading } from 'vue-loading-overlay';
import { showLoader, hideLoader } from '../components/Loader/loader';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/',
})

axiosInstance.interceptors.request.use((config) => {

  const { toggleLoading,isLoading } = useLoadingStore()
    toggleLoading();
    showLoader();
  const token = sessionStorage.getItem('access_token')

  if (token) {


    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, function (error) {

  hideLoader();
    return Promise.reject(error);

});

axiosInstance.interceptors.response.use(function (response) {
    // Cualquier código de estado que este dentro del rango de 2xx causa la ejecución de esta función
    // Haz algo con los datos de la respuesta
    const { toggleLoading,isLoading } = useLoadingStore()
    toggleLoading();
    console.log("loading hide");

    hideLoader();
    return response;
}, function (error) {
    const { toggleLoading } = useLoadingStore();
    hideLoader();
    toggleLoading(); // Asegurarse de ocultar el loader incluso en caso de error
    if (error.response.status == 401) {
        const userStore = useUserStore();
        const router = useRouter()
        userStore.logout()
        router.push('/')
        userStore.$reset()
    }

    // Cualquier código de estado que este fuera del rango de 2xx causa la ejecución de esta función
    // Haz algo con el error
    if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
        // Aquí puedes manejar el error de tiempo de espera
        console.log('Se ha excedido el tiempo de espera en la petición');
    }
    return Promise.reject(error);
});


export default axiosInstance
