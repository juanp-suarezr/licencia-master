<template>
  <div class="w-full flex justify-start">
    <breadcrumb-default pageTitle="Añadir grupo" pageSubtitle="Grupos"
      path="grupos"></breadcrumb-default>
  </div>
  <div class="w-full p-4 bg-white dark:bg-boxdark rounded-md shadow-md">
    <h2 class="text-lg font-bold mb-4">Crear Nuevo Grupo</h2>
    <form @submit.prevent="crearGrupos">
      <!-- nombre -->
      <div class="mb-4">
        <label for="nombre" class="block text-sm font-medium text-gray-700">Nombre</label>
        <input v-model="grupo.nombre_grupo" type="text" id="nombre"
          class="mt-1 p-2 w-full border border-graydark dark:border-strokedark rounded-md shadow-sm dark:bg-slate-900 dark:text-gray"
          required />
      </div>
      
      <!-- Asignar cliente -->
      <div class="mb-4" v-if="isAuthenticated && user.rol == 'Administrador'">
        <label for="id_cliente" class="block text-sm font-medium text-gray-700 mb-2">Asignar cliente</label>
        <select id="id_cliente" v-model="grupo.id_cliente" required
          class="text-xs md:text-base border border-graydark dark:border-strokedark rounded-md shadow-sm dark:bg-slate-900 dark:text-gray justify-end py-4 p-2 w-full whitespace-normal break-words">
          <option class="" value="" disabled>Seleccionar cliente</option>
          <option class="" v-for="item in infoClientes" :key="item.id" :value="item.id">{{ item.correo }} -
            {{ item.institucion }}</option>

        </select>
      </div>
      <!-- Docente -->
      <div class="mb-4">
        <label for="grupo_id" class="block text-sm font-medium text-gray-700">Asignar docente (opcional)</label>
        <div class="flex flex-wrap gap-4 w-full mt-2">
          <!-- Input docente -->
          <select v-if="grupo.isDocente" id="grupo_id" v-model="grupo.id_docente"
            class="text-xs md:text-base border border-graydark dark:border-strokedark rounded-md shadow-sm dark:bg-slate-900 dark:text-gray justify-end py-4 p-2 w-auto whitespace-normal break-words">
            <option class="" value="" disabled>Seleccionar docente</option>
            <option class="" v-if="infoDocentes.length != 0" v-for="item in infoDocentes" :key="item.id"
              :value="item.id">{{ item.nombre_profesor
              }}</option>
            <option class="" v-else disabled>No hay docentes disponibles</option>

          </select>
          <!-- Boton -->
          <button type="button" @click="changeStateDocente"
            class="px-2 py-1 dark:bg-slate-900 dark:text-gray rounded-md shadow-sm">
            {{ grupo.isDocente ? 'Cancelar' : 'Asignar docente' }}
          </button>

        </div>

      </div>
      
      <div class="flex justify-between">
        <button type="button" @click="regresar" class="px-4 py-2 bg-graydark text-white rounded-md shadow-sm">
          Regresar
        </button>
        <button type="submit" loading="loading"
          class="px-4 py-2 bg-blue-500 rounded-md shadow-sm bg-gray dark:bg-primary/20 dark:text-white">
          Crear grupo
        </button>
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { ref, inject, onMounted, watch } from 'vue';
import axios from '../../../plugins/axios';
import BreadcrumbDefault from '@/components/Breadcrumbs/BreadcrumbDefault.vue';
import { useUserStore } from '@/store/auth'
import { storeToRefs } from 'pinia';
import Swal from 'sweetalert2';
const swal = inject('$swal') as typeof Swal;

const userStore = useUserStore()
const { user, isAuthenticated } = storeToRefs(userStore);

//info clientes
const infoClientes = ref([]);
//info grupos
const infoDocentes = ref([]);


const grupo = ref({
  nombre_grupo: '',
  isDocente: false,
  id_docente: '',
  id_cliente: '',
  

});

grupo.value.id_cliente = user.value.cliente ?? '';

const loading = ref(false);

watch(() => grupo.value.id_cliente, (value: string) => {
  if (value) {
    getDocentes(value);
  }
});

const changeStateDocente = () => {
  grupo.value.isDocente = !grupo.value.isDocente;
  grupo.value.id_docente = '';
};

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

const getDocentes = async (value: string) => {
  try {
    const response = await axios.get(`/api/infoDocentesXAdmin/${value}`, {
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
        'X-CSRF-TOKEN': '', // Agrega el token CSRF si es necesario
      },
    });
    console.log('Docentes obtenidos:', response.data);

    infoDocentes.value = response.data.data;
  } catch (error) {
    console.error('Error al obtener grupos:', error);
  }
}

if (user.value.rol == 'Cliente') {
  getDocentes(user.value.cliente);
  
}


const crearGrupos = async () => {
  try {
    loading.value = true;
    const response = await axios.post('/api/grupos', JSON.stringify(grupo.value), {
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',

      },
    })

    console.log(response);

    loading.value = false;
    swal.fire({
      icon: 'success',
      title: 'grupo registrado con éxito',
      html: `
        <p>${response.data.message}</p>
        <p><strong>grupo:</strong> ${response.data.data.nombre_grupo}</p>`,
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
    console.error('Error al crear grupo:', error);
    swal.fire({
      icon: 'error',
      title: 'Error en la creación del grupo',
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
  getTotales();
});

</script>

<style scoped>
/* Agrega estilos personalizados si es necesario */
</style>
