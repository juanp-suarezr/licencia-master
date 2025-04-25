<template>
  <div class="reset-password">
    <h1>Recuperación de contraseña</h1>
    <form @submit.prevent="submitForm">
      <div>
        <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mt-4"
          >Ingresa el email registrado</label
        >
        <input
          type="email"
          v-model="login.email"
          id="email"
          placeholder="Ingrese la nueva contraseña"
          required
          class="mt-1 block w-full p-2 border-2 border-graydark dark:border-strokedark rounded-md shadow-sm dark:bg-slate-900 dark:text-gray placeholder:text-xs dark:placeholder:text-slate-600"
        />
      </div>
      
      <button
          type="submit"
          class="w-full dark:bg-slate-500 bg-blue-400 hover:!bg-slate-800 text-white font-bold py-2 px-4 rounded mt-4"
        >
        Restablecer Contraseña
        </button>
      
    </form>
  </div>
</template>

<script lang="ts" setup>
import { ref, inject } from 'vue'
import axios from '../../plugins/axios'
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '@/store/auth'
import { useDarkModeStore } from '@/store/darkMode'
import Swal from 'sweetalert2'
const swal = inject('$swal') as typeof Swal

const userStore = useUserStore()
const darkModeStore = useDarkModeStore()

const route = useRoute()

const login = ref({
  email: '',
})
const router = useRouter()
const loading = ref(false)


const submitForm = async () => {
  try {
    loading.value = true
    const response = await axios.post('/api/password-reset', JSON.stringify(login.value), {
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
    })

    console.log(response)

    loading.value = false
    swal.fire({
      icon: 'success',
      title: 'Correo de restablecimiento enviado',
      html: `
        <p>${response.data.message} <br> Ingresa a tu correo electrónico en la bandeja de entrada o en su defecto en spam, y continua con el proceso de restablecimiento.</p>
      `,
      customClass: {
        popup: 'dark:bg-slate-900 dark:text-gray bg-white text-graydark',
        title: 'dark:text-gray text-graydark',
        confirmButton:
          'bg-blue-500 rounded-md shadow-sm bg-gray dark:bg-primary/20 dark:text-white',
      },

      didClose: () => {
        router.push('/login')
      },
    })
    // Puedes agregar una lógica para redirigir o limpiar el formulario
  } catch (error) {
    loading.value = false
    console.error('Error al crear licencia:', error)
    swal.fire({
      icon: 'error',
      title: 'Error al enviar el correo de restablecimiento',
      text: error.response?.data?.message || 'Ocurrió un error inesperado',
      customClass: {
        popup: 'dark:bg-slate-900 dark:text-gray bg-white text-graydark',
        title: 'dark:text-gray text-graydark',
        confirmButton:
          'bg-blue-800 rounded-md shadow-sm bg-gray dark:bg-primary/20 dark:text-white',
      },
    })
  }
}
</script>

<style scoped></style>
