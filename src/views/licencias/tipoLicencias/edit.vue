<template>
  <div class="w-full flex justify-start">
    <breadcrumb-default pageTitle="Editar licencias" pageSubtitle="Licencias" path="licencias"></breadcrumb-default>
  </div>
  <div class="w-full p-4 bg-white dark:bg-boxdark rounded-md shadow-md">
    <h2 class="text-lg font-bold mb-4">Editar Licencia</h2>
    <form @submit.prevent="editarLicencias">
      
      
      <!-- Tipo de licencia -->
      <div class="mb-4">
        <label for="tipo_licencia" class="block text-sm font-medium text-gray-700 mb-2">Tipo de licencia</label>
        <select id="tipo_licencia" v-model="grupo.tipo_licencia_id" required
          class="text-xs md:text-base border border-graydark dark:border-strokedark rounded-md shadow-sm dark:bg-slate-900 dark:text-gray justify-end py-4 p-2 w-full whitespace-normal break-words">
          <option class="" value="" disabled>Seleccionar tipo de licencia</option>
          <option class="" v-for="item in tiposLicencias" :key="item.id" :value="item.id">{{ item.tipo_licencia }}
          </option>
        </select>
      </div>

      <div class="mb-4 flex flex-wrap gap-2 w-full sm:grid sm:grid-cols-2">
        <!-- Fecha de vencimiento -->
        <div class="mb-4 w-auto">
          <label for="fecha_vencimiento" class="block text-sm font-medium text-gray-700">Fecha de vencimiento</label>
          <input v-model="grupo.fecha_vencimiento" type="date" id="fecha_vencimiento"
            class="mt-1 p-2 w-full border border-graydark dark:border-strokedark rounded-md shadow-sm dark:bg-slate-900 dark:text-gray"
            required />
        </div>

        <!-- Cantidad de usuarios -->
        <div class="mb-4 w-auto">
          <label for="cantidad_usuarios" class="block text-sm font-medium text-gray-700">Cantidad de usuarios</label>
          <input v-model="grupo.cantidad_usuarios" type="number" id="cantidad_usuarios"
            class="mt-1 p-2 w-full border border-graydark dark:border-strokedark rounded-md shadow-sm dark:bg-slate-900 dark:text-gray"
            required />
        </div>
      </div>

      <div class="flex justify-between">
        <button type="button" @click="regresar" class="px-4 py-2 bg-graydark text-white rounded-md shadow-sm">
          Regresar
        </button>
        <button type="submit" loading="loading"
          class="px-4 py-2 bg-blue-500 rounded-md shadow-sm bg-gray dark:bg-primary/20 dark:text-white">
          Actualizar licencia
        </button>
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { ref, inject, onMounted, watch } from 'vue';
import axios from '../../../plugins/axios';
import { useRoute, useRouter } from 'vue-router';
import BreadcrumbDefault from '@/components/Breadcrumbs/BreadcrumbDefault.vue';
import Swal from 'sweetalert2';

const swal = inject('$swal') as typeof Swal;

const route = useRoute();
const router = useRouter();

console.log(route.params.id);


const grupo = ref({
  id_cliente: '',
  tipo_licencia_id: '',
  fecha_vencimiento: '',
  cantidad_usuarios: 0,
});

const tiposLicencias = ref([]);
const loading = ref(false);



const getTiposLicencias = async () => {
  try {
    const response = await axios.get('/api/tipolicencias', {
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
    });
    console.log('Tipos de licencias obtenidos:', response.data);

    tiposLicencias.value = response.data.data;
  } catch (error) {
    console.error('Error al obtener tipos de licencias:', error);
  }
};

const fetchGrupo = async (id: number) => {
  try {
    const response = await axios.get(`/api/licencias/${id}`);
    console.log('Licencia obtenida:', response.data.data);
    asignarGrupo(response.data.data);
  } catch (error) {
    console.error('Error al obtener la licencia:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error al obtener la licencia',
      text: error.response?.data?.message || 'Ocurrió un error inesperado',
      customClass: {
        popup: 'dark:bg-slate-900 dark:text-gray bg-white text-graydark',
        title: 'dark:text-gray text-graydark',
        confirmButton: 'bg-blue-800 rounded-md shadow-sm bg-gray dark:bg-primary/20 dark:text-white',
      },
      didClose: () => {
        router.push('/licencias');
      },
    });
  }
};

const asignarGrupo = (data: any) => {
  grupo.value = {
    id_cliente: data.id_cliente,
    tipo_licencia_id: data.tipo_licencia_id,
    fecha_vencimiento: data.fecha_vencimiento,
    cantidad_usuarios: data.cantidad_usuarios,
  };
};

const editarLicencias = async () => {
  try {
    loading.value = true;
    const response = await axios.patch(`/api/licencias/${route.params.id}`, JSON.stringify(grupo.value), {
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
    });

    console.log('Licencia actualizada:', response.data);

    Swal.fire({
      icon: 'success',
      title: 'Licencia actualizada con éxito',
      text: response.data.message,
      customClass: {
        popup: 'dark:bg-slate-900 dark:text-gray bg-white text-graydark',
        title: 'dark:text-gray text-graydark',
        confirmButton: 'bg-blue-800 rounded-md shadow-sm bg-gray dark:bg-primary/20 dark:text-white',
      },
      didClose: () => {
        router.push('/licencias');
      },
    });
  } catch (error) {
    loading.value = false;
    console.error('Error al actualizar la licencia:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error al actualizar la licencia',
      text: error.response?.data?.message || 'Ocurrió un error inesperado',
      customClass: {
        popup: 'dark:bg-slate-900 dark:text-gray bg-white text-graydark',
        title: 'dark:text-gray text-graydark',
        confirmButton: 'bg-blue-800 rounded-md shadow-sm bg-gray dark:bg-primary/20 dark:text-white',
      },
    });
  }
};

const regresar = () => {
  // Lógica para regresar a la vista anterior
  // Por ejemplo, usar el router para navegar hacia atrás
  window.history.back();
};

onMounted(() => {
  
  getTiposLicencias();
  const id = Number(route.params.id);
  if (id) {
    fetchGrupo(id);
  }
});

</script>

<style scoped>
/* Agrega estilos personalizados si es necesario */
</style>
