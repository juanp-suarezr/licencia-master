<template>
  <div class="w-full">

    <div class="w-full flex justify-start">
      <breadcrumb-default pageTitle="Clientes"></breadcrumb-default>
    </div>
    <!-- total clientes -->
    <div class="dark:bg-graydark bg-white text-gray-500 p-4 rounded-md shadow-md flex items-center">
      <!-- info -->
      <div class="w-full">
        <h3 class="text-sm font-bold">Total de Clientes</h3>
        <p class="text-lg">{{ totalClientes }}</p>
      </div>
      <!-- icono -->
      <div class="w-auto flex items-center justify-end">
        <span class="bg-danger/20 shadow-lg p-2 rounded-md">
          <UserIcon class="h-6 w-6 text-danger/40" />
        </span>
      </div>
    </div>


  </div>

  <!-- tabla usuarios -->
  <div class="w-full mt-6 bg-white dark:bg-boxdark p-2 rounded-md shadow-md">
    <div class="flex flex-wrap justify-between items-center">
      <h2 class="mt-2 px-4 text-base">Clientes</h2>
      <a href="/clientes-create"
        class="p-2 hover:scale-105 bg-gray dark:bg-primary/20 dark:text-white rounded-md shadow-md">
        Nuevo cliente
      </a>
    </div>
    <div class="mt-4 px-4 w-full flex flex-wrap justify-between items-center">
      <div class="flex flex-wrap gap-2 mb-2">

        <input v-model="search" @keyup.enter="fetchUsuarios"
          class="p-2 rounded-md bg-gray dark:bg-graydark placeholder:text-xs shadow-md"
          placeholder="Buscar usuarios..." />
        <button @click="fetchUsuarios" class="p-2 hover:bg-blue-800 bg-boxdark text-white rounded-md shadow-md">
          Buscar
        </button>
        <button @click="limpiar" class="p-2 hover:scale-105 dark:bg-primary/20 dark:text-white rounded-md shadow-md">
          Limpiar
        </button>
      </div>
      <select v-model="perPage" @change="fetchUsuarios" v-if="totalClientes > 5"
        class="p-2 rounded-md bg-gray dark:bg-graydark justify-end shadow-md">
        <option :value="5">5</option>
        <option v-if="totalClientes >= 6" :value="10">10</option>
        <option v-if="totalClientes >= 11" :value="15">15</option>
        <option v-if="totalClientes >= 16" :value="20">20</option>
      </select>
    </div>
    <div class="overflow-x-auto mt-4">
      <table class="table-auto w-full bg-white dark:bg-boxdark text-sm">
        <thead>
          <tr class="bg-gray-2 text-left dark:bg-meta-4">

            <th class="py-2 px-2 font-medium text-black dark:text-white text-left">
              ID
            </th>
            <th class="py-2 px-2 font-medium text-black dark:text-white text-left">
              NOMBRE
            </th>
            <th class="py-2 px-2 font-medium text-black dark:text-white text-left">
              CORREO
            </th>
            <th class="py-2 px-2 font-medium text-black dark:text-white text-left">
              DIRECCIÓN
            </th>
            <th class="py-2 px-2 font-medium text-black dark:text-white text-left">
              IDENTIFICACIÓN
            </th>
            <th class="py-2 px-2 font-medium text-black dark:text-white text-left">
              TELEFONO
            </th>
            <th class="py-2 px-2 font-medium text-black dark:text-white text-left">
              INSTITUCIÓN
            </th>
            <th class="py-2 px-2 font-medium text-black dark:text-white text-left">
              ACCIONES
            </th>

          </tr>
        </thead>
        <tbody v-if="usuarios.length != 0">
          <tr v-for="(item, index) in usuarios" :key="index" class="text-sm">
            <td class="py-3 px-3 whitespace-nowrap text-left">
              <h5 class="font-medium text-graydark dark:text-gray text-sm">
                {{ index + 1 }}
              </h5>
            </td>
            <td class="py-3 px-3 whitespace-normal break-words text-left">
              <h5 class="font-medium text-graydark dark:text-gray text-xs">
                {{ item.nombre }} {{ item.apellidos }}
              </h5>
            </td>
            <td class="py-3 px-3 whitespace-nowrap text-left">
              <h5 class="font-medium text-graydark dark:text-gray text-xs">
                {{ item.correo }}
              </h5>
            </td>
            <td class="py-3 px-3 whitespace-normal break-words text-left">
              <h5 class="font-medium text-graydark dark:text-gray text-xs">
                {{ item.direccion }}
              </h5>
            </td>
            <td class="py-3 px-3 whitespace-nowrap text-left">
              <h5 class="font-medium text-graydark dark:text-gray text-xs">
                {{ item.identificacion }}
              </h5>
            </td>
            <td class="py-3 px-3 whitespace-nowrap text-left">
              <h5 class="font-medium text-graydark dark:text-gray text-xs">
                {{ item.telefono }}
              </h5>
            </td>
            <td class="py-3 px-3 whitespace-normal break-words text-left">
              <h5 class="font-medium text-graydark dark:text-gray text-xs">
                {{ item.institucion }}
              </h5>
            </td>
            <td class="py-3 px-2 gap-2 whitespace-nowrap text-left flex flex-wrap items-center">
              <a v-tooltip.bottom="'editar'" :href="'/clientes-edit/' + item.id"
                class="p-2 hover:scale-105 dark:bg-primary/20 bg-primary/40 dark:text-white rounded-md shadow-md">
                <PencilSquareIcon class="h-4 w-4 text-gray" />
              </a>
              <button v-tooltip.bottom="'eliminar'" @click="eliminarCliente(item.id)"
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
            <td class="w-auto"></td>
            <td class="w-auto"></td>
            <td class="w-auto flex justify-center items-center py-5 "><em class="sm:text-xl">No hay registros</em></td>
            <td class="w-auto"></td>
            <td class="w-auto"></td>
          </tr>

        </tbody>
      </table>

      <!-- Paginador -->
      <div class="w-full flex justify-center mt-4" v-if="usuarios.length != 0 || totalPages > 1">
        <vue-awesome-paginate :total-items="perPage * totalPages" :items-per-page="perPage" :max-pages-shown="5"
          v-model="currentPage" @click="changePage" />
      </div>


    </div>
  </div>

  <!-- Modal -->
  <Modal :isOpen="ModalEliminar" @close="closeModal">
    <div class="p-4 bg-white dark:bg-boxdark rounded-md shadow-md">
      <h3 class="text-lg font-bold">Eliminar cliente</h3>
      <p class="text-sm mt-2">¿Estás seguro de eliminar este cliente?</p>
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
import { UserIcon, ArchiveBoxIcon, PencilSquareIcon } from '@heroicons/vue/24/solid';
import axios from '../../../plugins/axios';
import BreadcrumbDefault from '@/components/Breadcrumbs/BreadcrumbDefault.vue';
import Modal from '@/components/Modal.vue';
import Swal from 'sweetalert2';

const swal = inject('$swal') as typeof Swal;



// Simulación de datos

const totalClientes = ref(0);
// Modal
const ModalEliminar = ref(false);
//id a eliminar
const idEliminar = ref(0);

//pagiandor y search
const usuarios = ref([]);
const search = ref('');
const perPage = ref(5);
const page = ref(1);
const totalPages = ref(1);
const currentPage = ref(1);


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
    totalClientes.value = response.data.Clientes;

  } catch (error) {
    console.error('Error al obtener totales:', error);
  }
};

const fetchUsuarios = async () => {
  const response = await axios.get('/api/clientes', {
    params: {
      search: search.value,
      per_page: perPage.value,
      page: page.value,
    },
  });
  console.log('Usuarios obtenidos:', response.data.data);
  console.log('Total de páginas:', response.data.data.last_page);

  usuarios.value = response.data.data.data;
  totalPages.value = response.data.data.last_page;
};

const changePage = (newPage: number) => {
  page.value = newPage;
  fetchUsuarios();
};

const limpiar = () => {
  search.value = '';
  fetchUsuarios();
};

const eliminarCliente = (id: number) => {
  console.log('Eliminar cliente:', id);
  idEliminar.value = id;
  ModalEliminar.value = true;
};

const submitEliminar = async () => {
  try {
    const response = await axios.delete(`/api/clientes/${idEliminar.value}`, {
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
        'X-CSRF-TOKEN': '', // Agrega el token CSRF si es necesario
      },
    });
    console.log('Cliente eliminado:', response.data);
    swal.fire({
      icon: 'success',
      title: 'Cliente eliminado con éxito',
      html: `
        <p>${response.data.message}</p>
        <p><strong>Cliente:</strong> ${response.data.data.nombre}</p>
        <p><strong>Institución:</strong> ${response.data.data.institucion}</p>`,
      customClass: {
        popup: 'dark:bg-slate-900 dark:text-gray bg-white text-graydark',
        title: 'dark:text-gray text-graydark',
        confirmButton: 'bg-blue-800 rounded-md shadow-sm bg-gray dark:bg-primary/20 dark:text-white',
      },
      didClose: () => {
        ModalEliminar.value = false;
        idEliminar.value = 0;
        window.location.reload();
      }

    });

  } catch (error) {
    console.error('Error al eliminar cliente:', error);
    swal.fire({
      icon: 'error',
      title: 'Error al eliminar cliente',
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
  getTotales();
  fetchUsuarios();
});


</script>

<style></style>
