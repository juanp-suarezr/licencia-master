<template>
  <div class="w-full flex justify-start">
    <breadcrumb-default pageTitle="Tipos de Licencia"></breadcrumb-default>
  </div>
  <!-- total tipo licencias -->
  <div class="dark:bg-graydark bg-white text-gray-500 p-4 rounded-md shadow-md flex items-center">
      <!-- info -->
      <div class="w-full">
        <h3 class="text-sm font-bold">Total de tipo licencias</h3>
        <p class="text-lg">{{ totalLicencias }}</p>
      </div>
      <!-- icono -->
      <div class="w-auto flex items-center justify-end">
        <span class="bg-warning/20 shadow-lg p-2 rounded-md">
          <RectangleGroupIcon class="h-6 w-6 text-warning/40" />
        </span>
      </div>
    </div>

  <!-- tabla tipos de licencia -->
  <div class="w-full mt-6 bg-white dark:bg-boxdark p-2 rounded-md shadow-md">
    <div class="flex flex-wrap justify-between items-center">
      <h2 class="mt-2 px-4 text-base">Tipos de Licencia</h2>
      <a href="/tipo-licencias-create"
        class="p-2 hover:scale-105 bg-gray dark:bg-primary/20 dark:text-white rounded-md shadow-md">
        Nuevo tipo de licencia
      </a>
    </div>
    <div class="mt-4 px-4 w-full flex flex-wrap justify-between items-center">
      
      <select v-model="perPage" @change="fetchTiposLicencias" v-if="totalLicencias > 5"
        class="p-2 rounded-md bg-gray dark:bg-graydark justify-end shadow-md">
        <option :value="5">5</option>
        <option v-if="totalLicencias >= 6" :value="10">10</option>
        <option v-if="totalLicencias >= 11" :value="15">15</option>
        <option v-if="totalLicencias >= 16" :value="20">20</option>
      </select>
    </div>
    <div class="overflow-x-auto mt-4">
      <table class="table-auto w-full bg-white dark:bg-boxdark text-sm">
        <thead>
          <tr class="bg-gray-2 text-left dark:bg-meta-4">
            <th class="py-2 px-2 font-medium text-black dark:text-white text-left">ID</th>
            <th class="py-2 px-2 font-medium text-black dark:text-white text-left">TIPO LICENCIA</th>
            <th class="py-2 px-2 font-medium text-black dark:text-white text-left">DESCRIPCIÓN</th>
            <th class="py-2 px-2 font-medium text-black dark:text-white text-left">ACCIONES</th>
          </tr>
        </thead>
        <tbody v-if="tiposLicencias.length != 0">
          <tr v-for="(item, index) in tiposLicencias" :key="index" class="text-sm">
            <td class="py-3 px-3 whitespace-nowrap text-left">
              <h5 class="font-medium text-graydark dark:text-gray text-sm">{{ item.id }}</h5>
            </td>
            <td class="py-3 px-3 whitespace-normal break-words text-left">
              <h5 class="font-medium text-graydark dark:text-gray text-xs">{{ item.tipo_licencia }}</h5>
            </td>
            <td class="py-3 px-3 whitespace-normal break-words text-left">
              <h5 class="font-medium text-graydark dark:text-gray text-xs">{{ item.descripcion }}</h5>
            </td>
            <td class="py-3 px-2 gap-2 whitespace-nowrap text-left flex flex-wrap items-center">
              <a v-tooltip.bottom="'editar'" :href="'/tipo-licencias-edit/' + item.id"
                class="p-2 hover:scale-105 dark:bg-primary/20 bg-primary/40 dark:text-white rounded-md shadow-md">
                <PencilSquareIcon class="h-4 w-4 text-gray" />
              </a>
              <button v-tooltip.bottom="'eliminar'" @click="eliminarTipoLicencia(item.id)"
                class="p-2 hover:scale-105 dark:bg-danger/20 bg-danger/40 dark:text-white rounded-md shadow-md">
                <ArchiveBoxIcon class="h-4 w-4 text-gray" />
              </button>
            </td>
          </tr>
        </tbody>
        <tbody v-else class="w-full">
          <tr>
            <td class="w-auto"></td>
            <td class="w-auto"></td>
            <td class="w-auto flex justify-start items-center py-5 "><em class="sm:text-xl">No hay registros</em></td>
            <td class="w-auto"></td>
          </tr>
        </tbody>
      </table>

      <!-- Paginador -->
      <div class="w-full flex justify-center mt-4" v-if="tiposLicencias.length != 0 || totalPages > 1">
        <vue-awesome-paginate :total-items="perPage * totalPages" :items-per-page="perPage" :max-pages-shown="5"
          v-model="currentPage" @click="changePage" />
      </div>
    </div>
  </div>

  <!-- Modal -->
  <Modal :isOpen="ModalEliminar" @close="closeModal">
    <div class="p-4 bg-white dark:bg-boxdark rounded-md shadow-md">
      <h3 class="text-lg font-bold">Eliminar tipo de licencia</h3>
      <p class="text-sm mt-2">¿Estás seguro de eliminar este tipo de licencia?</p>
      <div class="flex justify-end mt-4 gap-2">
        <button @click="submitEliminar"
          class="p-2 hover:scale-105 bg-danger/20 dark:bg-danger/40 dark:text-white rounded-md shadow-md">
          Eliminar
        </button>
        <button @click="ModalEliminar = false"
          class="p-2 hover:scale-105 bg-gray dark:bg-graydark dark:text-white rounded-md shadow-md">
          Cancelar
        </button>
      </div>
    </div>
  </Modal>
</template>

<script lang="ts" setup>
import { ref, onMounted, inject } from 'vue';
import { RectangleGroupIcon, ArchiveBoxIcon, PencilSquareIcon } from '@heroicons/vue/24/solid';
import axios from '../../../plugins/axios';
import Modal from '@/components/Modal.vue';
import Swal from 'sweetalert2';
import BreadcrumbDefault from '@/components/Breadcrumbs/BreadcrumbDefault.vue';

const swal = inject('$swal') as typeof Swal;

// Simulación de datos
const totalLicencias = ref(0);
// Modal
const ModalEliminar = ref(false);
//id a eliminar
const idEliminar = ref(0);

//paginador y search
const tiposLicencias = ref([]);
const perPage = ref(5);
const page = ref(1);
const totalPages = ref(1);
const currentPage = ref(1);

const fetchTiposLicencias = async () => {
  const response = await axios.get('/api/tipolicencias', {
    params: {
      per_page: perPage.value,
      page: page.value,
    },
  });
  console.log('Tipos de licencias obtenidos:', response.data.data);

  tiposLicencias.value = response.data.data.data;
  totalPages.value = response.data.data.last_page;
  totalLicencias.value = response.data.data.total;
};

const changePage = (newPage: number) => {
  page.value = newPage;
  fetchTiposLicencias();
};


const eliminarTipoLicencia = (id: number) => {
  console.log('Eliminar tipo de licencia:', id);
  idEliminar.value = id;
  ModalEliminar.value = true;
};

const submitEliminar = async () => {
  try {
    const response = await axios.delete(`/api/tipolicencias/${idEliminar.value}`, {
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
    });
    swal.fire({
      icon: 'success',
      title: 'Tipo de licencia eliminado con éxito',
      html: `
        <p>${response.data.message}</p>
      `,
      customClass: {
        popup: 'dark:bg-slate-900 dark:text-gray bg-white text-graydark',
        title: 'dark:text-gray text-graydark',
        confirmButton: 'bg-blue-800 rounded-md shadow-sm bg-gray dark:bg-primary/20 dark:text-white',
      },
      didClose: () => {
        ModalEliminar.value = false;
        idEliminar.value = 0;
        fetchTiposLicencias();
      }
    });
  } catch (error) {
    console.error('Error al eliminar tipo de licencia:', error);
    swal.fire({
      icon: 'error',
      title: 'Error al eliminar tipo de licencia',
      html: `
        <p>Ocurrió un error inesperado, vuelva a intentar más tarde</p>`,
      customClass: {
        popup: 'dark:bg-slate-900 dark:text-gray bg-white text-graydark',
        title: 'dark:text-gray text-graydark',
        confirmButton: 'bg-blue-800 rounded-md shadow-sm bg-gray dark:bg-primary/20 dark:text-white',
      },
      didClose: () => {
        ModalEliminar.value = false;
        idEliminar.value = 0;
      }
    });
  }
};

const closeModal = () => {
  ModalEliminar.value = false;
  idEliminar.value = 0;
};

onMounted(() => {
  fetchTiposLicencias();
});
</script>

<style></style>
