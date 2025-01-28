<template>
  <div class="w-full flex flex-wrap items-center sm:grid grid-cols-2 gap-2">
    <!-- seleccionar cliente -->
    <div v-if="user.rol == 'Administrador'"
      class="dark:bg-graydark bg-white text-gray-500 p-4 rounded-md shadow-md flex flex-wrap items-center h-full gap-4">
      <label for="clientesSelect" class="block text-sm font-medium text-gray-700 mb-1">Seleccione un cliente</label>
      <select id="clientesSelect" v-model="cliente" @change="fetchUsuarios"
        class="text-xs rounded-md bg-gray dark:bg-boxdark justify-end shadow-md p-2 w-[90%]">
        <option value="">Todos los clientes</option>
        <option v-for="item in infoClientes" :key="item.id" :value="item.id">{{ item.correo }} - {{item.institucion}}</option>
        
      </select>
    </div>
    <!-- total clientes -->
    <div class="dark:bg-graydark bg-white text-gray-500 p-4 rounded-md shadow-md flex items-center gap-2 h-full">
      <!-- info -->
      <div class="w-full">
        <h3 class="text-sm font-bold">Total de docentes</h3>
        <p class="text-lg">{{ totalDocentes }}</p>
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
      <h2 class="mt-2 px-4 text-base">Docentes</h2>
      <a href="/docentes-create"
        class="p-2 hover:scale-105 bg-gray dark:bg-primary/20 dark:text-white rounded-md shadow-md">
        Nuevo docente
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
      <select v-model="perPage" @change="fetchUsuarios" v-if="totalDocentes > 5"
        class="p-2 rounded-md bg-gray dark:bg-graydark justify-end shadow-md">
        <option :value="5">5</option>
        <option v-if="totalDocentes >= 10" :value="10">10</option>
        <option v-if="totalDocentes >= 15" :value="15">15</option>
        <option v-if="totalDocentes >= 20" :value="20">20</option>
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
              IDENTIFICACIÓN
            </th>
            <th class="py-2 px-2 font-medium text-black dark:text-white text-left">
              CORREO
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
                {{ item.identificacion }}
              </h5>
            </td>
            <td class="py-3 px-3 whitespace-normal break-words text-left">
              <h5 class="font-medium text-graydark dark:text-gray text-xs">
                {{ item.correo }}
              </h5>
            </td>
            <td class="py-3 px-3 whitespace-nowrap text-left">
              <h5 class="font-medium text-graydark dark:text-gray text-xs">
                {{ item.telefono }}
              </h5>
            </td>
            <td class="py-3 px-3 whitespace-normal break-words text-left">
              <h5 class="font-medium text-graydark dark:text-gray text-xs">
                {{ item.cliente.institucion }}
              </h5>
            </td>

            <td class="py-3 px-2 gap-2 whitespace-nowrap text-left flex flex-wrap items-center">
              <a v-tooltip.bottom="'editar'" :href="'/docentes-edit/' + item.id"
                class="p-2 hover:scale-105 dark:bg-primary/20 bg-primary/40 dark:text-white rounded-md shadow-md">
                <PencilSquareIcon class="h-4 w-4 text-gray" />
              </a>
              <button v-tooltip.bottom="'eliminar'" @click="eliminarDocente(item.id)"
                class="p-2 hover:scale-105 dark:bg-danger/20 bg-danger/40 dark:text-white rounded-md shadow-md">
                <ArchiveBoxIcon class="h-4 w-4 text-gray" />
              </button>
            </td>
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
      <h3 class="text-lg font-bold">Eliminar docente</h3>
      <p class="text-sm mt-2">¿Estás seguro de eliminar este docente?</p>
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
import { useUserStore } from '@/store/auth'
import { storeToRefs } from 'pinia';
import Modal from '@/components/Modal.vue';
import Swal from 'sweetalert2';

const swal = inject('$swal') as typeof Swal;

const userStore = useUserStore()
const { user } = storeToRefs(userStore);



// Simulación de datos

const totalDocentes = ref(0);
//info clientes
const infoClientes = ref([]);
// Modal
const ModalEliminar = ref(false);
//id a eliminar
const idEliminar = ref(0);

//pagiandor y search
const usuarios = ref([]);
const search = ref('');
const cliente = ref(null);
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
    totalDocentes.value = response.data.Docentes;
    infoClientes.value = response.data.instituciones;
    

  } catch (error) {
    console.error('Error al obtener totales:', error);
  }
};

const fetchUsuarios = async () => {
  const response = await axios.get('/api/docentes', {
    params: {
      search: search.value,
      cliente: cliente.value,
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

const eliminarDocente = (id: number) => {
  console.log('Eliminar cliente:', id);
  idEliminar.value = id;
  ModalEliminar.value = true;
};

const submitEliminar = async () => {
  try {
    const response = await axios.delete(`/api/docentes/${idEliminar.value}`, {
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
        'X-CSRF-TOKEN': '', // Agrega el token CSRF si es necesario
      },
    });
    console.log('Cliente eliminado:', response.data);
    ModalEliminar.value = false;
    idEliminar.value = 0;

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
