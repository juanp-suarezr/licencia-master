<template>
  <div class="w-full">
    <div class="w-full flex justify-start">
      <breadcrumb-default
        pageTitle="Añadir estudiantes masivo"
        pageSubtitle="Estudiantes"
        path="estudiantes"
      ></breadcrumb-default>
    </div>
  </div>
  <div class="mt-4 w-full bg-white dark:bg-boxdark p-2 rounded-md shadow-md">
    <h2 class="text-lg font-bold mb-4">Cargue masivo Estudiantes</h2>
    <p class="sm:text-lg">
      <b>Nota:</b> Para subir masivamente la lista de estudiantes, debe descargar la plantilla, dando
      clic en el siguiente botón.
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
    <!-- seleccionar cliente -->
    <div
      v-if="user.rol == 'Administrador'"
      class="dark:bg-graydark bg-white text-gray-500 p-4 rounded-md shadow-md flex flex-wrap items-center h-full gap-4 mt-6"
    >
      <label for="clientesSelect" class="block text-sm font-medium text-gray-700 mb-1"
        >Seleccione un cliente</label
      >
      <select
        id="clientesSelect"
        v-model="cliente"
        class="text-xs rounded-md bg-gray dark:bg-boxdark justify-end shadow-md p-2 w-[90%]"
      >
        <option value="">Todos los clientes</option>
        <option v-for="item in infoClientes" :key="item.id" :value="item.id">
          {{ item.correo }} - {{ item.institucion }}
        </option>
      </select>
    </div>
    <input
      class="border dark:border-primary/50 border-primary/20 rounded-md p-2 mt-4"
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
import { ref, inject, onMounted } from 'vue'
import Swal from 'sweetalert2'
const swal = inject('$swal') as typeof Swal
import { useUserStore } from '@/store/auth'
import { storeToRefs } from 'pinia';

const userStore = useUserStore()
const { user } = storeToRefs(userStore);

//info clientes
const infoClientes = ref([]);
//selected cliente
const cliente = ref(3);
const getTotales = async () => {
  try {
    const response = await axios.get('/api/totales', {
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
        'X-CSRF-TOKEN': '', // Agrega el token CSRF si es necesario
      },
    });
    console.log('Totales obtenidos:', response.data);
    
    infoClientes.value = response.data.instituciones;


  } catch (error) {
    console.error('Error al obtener totales:', error);
  }
};

const archivo = ref(File)

const onFileChange = (e) => {
  archivo.value = e.target.files[0]
}

const descargarPlantilla = async () => {
  const response = await axios.get('/api/plantilla-estudiantes', { responseType: 'blob' })
  console.log(response)

  const url = window.URL.createObjectURL(new Blob([response.data]))
  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', 'plantilla_estudiantes.xls')
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  window.URL.revokeObjectURL(url)
}

const cargarArchivo = async () => {
  const formData = new FormData()
  formData.append('estudiantes', archivo.value);
  formData.append('id_cliente', cliente.value);

  try {
    const response = await axios.post('/api/cargue-estudiantes', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    console.log(response)
    // Notifica éxito
    swal.fire({
      icon: 'success',
      title: 'Estudiante registrado con éxito',
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
      title: 'Error en la creación del estudiante',
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

onMounted(() => {
  getTotales();
  
});

</script>

<style></style>