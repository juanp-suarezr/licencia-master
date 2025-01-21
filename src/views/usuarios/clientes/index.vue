<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    <!-- total usuarios -->
    <div class="dark:bg-graydark bg-white text-gray-500 p-4 rounded-md shadow-md flex items-center">
      <!-- info -->
      <div class="w-full">
        <h3 class="text-sm font-bold">Total de Usuarios</h3>
        <p class="text-lg">{{ totalUsuarios }}</p>
      </div>
      <!-- icono -->
      <div class="w-auto flex items-center justify-end">
        <span class="bg-primary/20 shadow-lg p-2 rounded-md">
          <UserGroupIcon class="h-6 w-6 text-primary/40" />
        </span>
      </div>
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
    <!-- total docentes -->
    <div class="dark:bg-graydark bg-white text-gray-500 p-4 rounded-md shadow-md flex items-center">
      <!-- info -->
      <div class="w-full">
        <h3 class="text-sm font-bold">Total de Docentes</h3>
        <p class="text-lg">{{ totalDocentes }}</p>
      </div>
      <!-- icono -->
      <div class="w-auto flex items-center justify-end">
        <span class="bg-success/20 shadow-lg p-2 rounded-md">
          <UserIcon class="h-6 w-6 text-success/40" />
        </span>
      </div>
    </div>
    <!-- total estudiantes -->
    <div class="dark:bg-graydark bg-white text-gray-500 p-4 rounded-md shadow-md flex items-center">
      <!-- info -->
      <div class="w-full">
        <h3 class="text-sm font-bold">Total de Estudiantes</h3>
        <p class="text-lg">{{ totalEstudiantes }}</p>
      </div>
      <!-- icono -->
      <div class="w-auto flex items-center justify-end">
        <span class="bg-warning/20 shadow-lg p-2 rounded-md">
          <UserIcon class="h-6 w-6 text-warning/40" />
        </span>
      </div>
    </div>
  </div>

  <!-- tabla usuarios -->
  <div class="w-full mt-6 bg-white dark:bg-boxdark p-2 rounded-md shadow-md">
    <h2 class="mt-2 px-4 text-base">Usuarios</h2>
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
      <select v-model="perPage" @change="fetchUsuarios"
        class="p-2 rounded-md bg-gray dark:bg-graydark justify-end shadow-md">
        <option v-if="totalUsuarios >= 5" :value="5">5</option>
        <option v-if="totalUsuarios >= 10" :value="10">10</option>
        <option v-if="totalUsuarios >= 15" :value="15">15</option>
        <option v-if="totalUsuarios >= 20" :value="20">20</option>
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
              ROL
            </th>

          </tr>
        </thead>
        <tbody v-if="usuarios.length != 0">
          <tr v-for="(item, index) in usuarios" :key="index">
            <td class="py-3 px-3 whitespace-nowrap text-left">
              <h5 class="font-medium text-graydark dark:text-gray">
                {{ index + 1 }}
              </h5>
            </td>
            <td class="py-3 px-3 whitespace-nowrap text-left">
              <h5 class="font-medium text-graydark dark:text-gray">
                {{ item.name }}
              </h5>
            </td>
            <td class="py-3 px-3 whitespace-nowrap text-left">
              <h5 class="font-medium text-graydark dark:text-gray">
                {{ item.email }}
              </h5>
            </td>
            <td class="py-3 px-3 whitespace-nowrap text-left">
              <h5 class="font-medium text-graydark dark:text-gray">
                {{ item.rol }}
              </h5>
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

</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { UserGroupIcon, UserIcon } from '@heroicons/vue/24/solid';
import axios from '../../../plugins/axios';


// Simulación de datos
const totalUsuarios = ref(0);
const totalClientes = ref(0);
const totalDocentes = ref(0);
const totalEstudiantes = ref(0);

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
    totalDocentes.value = response.data.Docentes;
    totalEstudiantes.value = response.data.Estudiantes;
    totalUsuarios.value = totalClientes.value + totalDocentes.value + totalEstudiantes.value;
  } catch (error) {
    console.error('Error al obtener totales:', error);
  }
};

const fetchUsuarios = async () => {
  const response = await axios.get('/api/info-user', {
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

onMounted(() => {
  getTotales();
  fetchUsuarios();
});


</script>

<style></style>
