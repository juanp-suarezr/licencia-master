<template>
  <div class="w-full flex justify-start">
    <breadcrumb-default pageTitle="Añadir Tipo de Licencia" pageSubtitle="Tipos de Licencia"
      path="tipo-licencias"></breadcrumb-default>
  </div>
  <div class="w-full p-4 bg-white dark:bg-boxdark rounded-md shadow-md">
    <h2 class="text-lg font-bold mb-4">Crear Nuevo Tipo de Licencia</h2>
    <form @submit.prevent="crearTipoLicencia">
      <!-- Nombre de la licencia -->
      <div class="mb-4">
        <label for="nombre_licencia" class="block text-sm font-medium text-gray-700 mb-2">Nombre de tipo
          licencia</label>
        <input v-model="tipoLicencia.tipo_licencia" type="text" id="nombre_licencia"
          class="mt-1 p-2 w-full border border-graydark dark:border-strokedark rounded-md shadow-sm dark:bg-slate-900 dark:text-gray"
          required />
      </div>

      <!-- Descripción -->
      <div class="mb-4">
        <label for="descripcion" class="block text-sm font-medium text-gray-700 mb-2">Descripción</label>
        <textarea v-model="tipoLicencia.descripcion" id="descripcion"
          class="mt-1 p-2 w-full border border-graydark dark:border-strokedark rounded-md shadow-sm dark:bg-slate-900 dark:text-gray"
          required></textarea>
        <p class="text-gray-500 text-sm mt-2" :class="{ 'text-red-500': isMaxPalabras1 }">
          {{ palabrasEnDescripcion }} caracteres <span v-if="isMaxPalabras1">Limite de caracteres
            superado</span>
        </p>
      </div>

      <div class="flex justify-between">
        <button type="button" @click="regresar" class="px-4 py-2 bg-graydark text-white rounded-md shadow-sm">
          Regresar
        </button>
        <button type="submit" loading="loading"
          class="px-4 py-2 bg-blue-500 rounded-md shadow-sm bg-gray dark:bg-primary/20 dark:text-white">
          Crear tipo de licencia
        </button>
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { ref, inject, onMounted, computed, watch } from 'vue';
import axios from '../../../plugins/axios';
import BreadcrumbDefault from '@/components/Breadcrumbs/BreadcrumbDefault.vue';
import Swal from 'sweetalert2';
const swal = inject('$swal') as typeof Swal;



const tipoLicencia = ref({
  tipo_licencia: '',
  descripcion: '',
});

const loading = ref(false);

const isMaxPalabras1 = ref(false);

const crearTipoLicencia = async () => {
  try {
    loading.value = true;
    const response = await axios.post('/api/tipolicencias', JSON.stringify(tipoLicencia.value), {
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
    });

    console.log(response);

    loading.value = false;
    swal.fire({
      icon: 'success',
      title: 'Tipo de licencia registrado con éxito',
      html: `
        <p>${response.data.message}</p>
      `,
      customClass: {
        popup: 'dark:bg-slate-900 dark:text-gray bg-white text-graydark',
        title: 'dark:text-gray text-graydark',
        confirmButton: 'bg-blue-500 rounded-md shadow-sm bg-gray dark:bg-primary/20 dark:text-white',
      },
      didClose: () => {
        window.history.back();
      }
    });
    // Puedes agregar una lógica para redirigir o limpiar el formulario
  } catch (error) {
    loading.value = false;
    console.error('Error al crear tipo de licencia:', error);
    swal.fire({
      icon: 'error',
      title: 'Error en la creación del tipo de licencia',
      text: error.response?.data?.message || 'Ocurrió un error inesperado',
      customClass: {
        popup: 'dark:bg-slate-900 dark:text-gray bg-white text-graydark',
        title: 'dark:text-gray text-graydark',
        confirmButton: 'bg-blue-800 rounded-md shadow-sm bg-gray dark:bg-primary/20 dark:text-white',
      },
    });
  }
};

// Limite palabras
const palabrasEnDescripcion = computed(() => {
    const palabras = tipoLicencia.value.descripcion.trim();
    const result = palabras.length;

    if (result >= 100) {
        isMaxPalabras1.value = true;
    } else {
        isMaxPalabras1.value = false;
    }

    return result;
});

watch(palabrasEnDescripcion, () => {
    tipoLicencia.value.descripcion = tipoLicencia.value.descripcion.trim(); // Asegúrate de que no haya espacios al principio o al final
});

const regresar = () => {
  // Lógica para regresar a la vista anterior
  // Por ejemplo, usar el router para navegar hacia atrás
  window.history.back();
};

onMounted(() => {


});
</script>

<style scoped>
/* Agrega estilos personalizados si es necesario */
</style>
