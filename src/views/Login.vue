<template>
  <AuthLayout>
    <div
      class="flex flex-col"
    >
      <h4 class="mb-4">Bienvenido a licencia master! 👋🏻</h4>
      <h1 class="text-2xl font-semibold mb-6 dark:text-white">Iniciar Sesión</h1>
      <form @submit.prevent="handleLogin" class="w-full max-w-sm">
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-graydark dark:text-gray"
            >Correo Electrónico</label
          >
          <input
            type="email"
            v-model="login.email"
            id="email"
            placeholder="Ingrese correo electrónico registrado"
            required
            class="mt-1 block w-full p-2 border-2 border-graydark dark:border-strokedark rounded-md shadow-sm dark:bg-slate-900 dark:text-gray placeholder:text-xs dark:placeholder:text-slate-600"
          />
        </div>
        <div class="mb-6">
          <label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >Contraseña</label
          >
          <input
            type="password"
            v-model="login.password"
            id="password"
            placeholder="Ingrese contraseña asignada"
            required
            class="mt-1 block w-full p-2 border-2 border-graydark dark:border-strokedark rounded-md shadow-sm dark:bg-slate-900 dark:text-gray placeholder:text-xs dark:placeholder:text-slate-600"
          />
        </div>
        <button
          type="submit"
          class="w-full dark:bg-slate-500 bg-blue-400 hover:!bg-slate-800 text-white font-bold py-2 px-4 rounded"
        >
          Iniciar Sesión
        </button>
      </form>


    </div>
  </AuthLayout>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import axios from '../plugins/axios'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/auth'

const userStore = useUserStore()

const login = ref({
    email: 'AZProyects@gmail.com',
    password: '12345678'
})
const router = useRouter()
const loading = ref(false)

const handleLogin = async () => {

  try {
        // Lógica para enviar las credenciales al almacén de Pinia para autenticación
        await userStore.login(login.value)
        console.log('Login successful');

        router.push('/')
    } catch (error) {
        // Manejo de errores

        console.log(error)
    } finally {
        loading.value = false // Marcar el botón como no cargando
    }
}

</script>

<style scoped></style>
