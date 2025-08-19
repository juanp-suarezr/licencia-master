<template>
  <div class="w-full">
    <div class="w-full flex justify-start">
      <breadcrumb-default
        pageTitle="Añadir cliente masivo"
        pageSubtitle="Clientes"
        path="clientes"
      ></breadcrumb-default>
    </div>
  </div>
  <div class="mt-4 w-full bg-white dark:bg-boxdark p-2 rounded-md shadow-md">
    <h2 class="text-lg font-bold mb-4">Cargue masivo Clientes</h2>
    <p class="sm:text-lg">
      <b>Nota:</b> Para subir masivamente la lista de clientes, debe descargar la
      plantilla, dando clic en el siguiente botón.
    </p>
    <button
      class="mt-4 p-2 hover:scale-105 bg-gray dark:bg-primary/20 dark:text-white rounded-md shadow-md"
      @click="descargarPlantilla"
    >
      Descargar plantilla
    </button>
    <p class="mt-6 sm:text-lg">
      Luego de descargar la plantilla y cargar los datos, subir el mismo archivo excel en el
      apartado de abajo.
    </p>
    <input
      class="border dark:border-primary/50 border-primary/20 rounded-md p-2"
      type="file"
      @change="onFileChange"
      accept=".xlsx,.xls"
    />
    <div class="w-full mt-2">
      <button
        class="my-2 p-2 hover:scale-105 bg-gray dark:bg-primary/20 dark:text-white rounded-md shadow-md"
        @click="cargarArchivo"
        :disabled="!archivo"
      >
        Cargar archivo
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import axios from '../../../plugins/axios'
import BreadcrumbDefault from '@/components/Breadcrumbs/BreadcrumbDefault.vue'
import { ref, inject } from 'vue'
import Swal from 'sweetalert2'
const swal = inject('$swal') as typeof Swal
const archivo = ref(File)

const onFileChange = (e) => {
  archivo.value = e.target.files[0]
}

const descargarPlantilla = async () => {
  const response = await axios.get('/api/plantilla-clientes', { responseType: 'blob' })
  console.log(response);
  
  const url = window.URL.createObjectURL(new Blob([response.data]))
  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', 'plantilla_clientes.xls')
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  window.URL.revokeObjectURL(url)
}

const cargarArchivo = async () => {
  const formData = new FormData()
  formData.append('clientes', archivo.value)

  try {
    const response = await axios.post('/api/cargue-clientes', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    console.log(response)
    localStorage.setItem('cargaMasivaEnviada', 'true');
    // Notifica éxito
    swal.fire({
      icon: 'success',
      title: 'Cliente registrado con éxito',
      html: `
        <p>${response.data.message}</p>`,
      customClass: {
        popup: 'dark:bg-slate-900 dark:text-gray bg-white text-graydark',
        title: 'dark:text-gray text-graydark',
        confirmButton:
          'bg-blue-500 rounded-md shadow-sm bg-gray dark:bg-primary/20 dark:text-white',
      },

      didClose: () => {
        window.history.back()
      },
    })
  } catch (error) {
    // Maneja error
    swal.fire({
      icon: 'error',
      title: 'Error en la creación del cliente',
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

<style></style>