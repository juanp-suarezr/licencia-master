<template>
  <div class="w-full flex justify-start">
    <breadcrumb-default pageTitle="Añadir docente" pageSubtitle="Docentes" path="docentes"></breadcrumb-default>
  </div>
  <div class="w-full p-4 bg-white dark:bg-boxdark rounded-md shadow-md">
    <h2 class="text-lg font-bold mb-4">Crear Nuevo Docente</h2>
    <form @submit.prevent="crearDocentes">
      <div class="mb-4">
        <label for="nombre" class="block text-sm font-medium text-gray-700">Nombre</label>
        <input v-model="docente.name" type="text" id="nombre"
          class="mt-1 p-2 w-full border border-graydark dark:border-strokedark rounded-md shadow-sm dark:bg-slate-900 dark:text-gray"
          required />
      </div>
      <div class="mb-4">
        <label for="apellidos" class="block text-sm font-medium text-gray-700">Apellidos</label>
        <input v-model="docente.apellidos" type="text" id="apellidos"
          class="mt-1 p-2 w-full border border-graydark dark:border-strokedark rounded-md shadow-sm dark:bg-slate-900 dark:text-gray"
          required />
      </div>
      <div class="mb-4">
        <label for="identificacion" class="block text-sm font-medium text-gray-700">Identificación</label>
        <input v-model="docente.identificacion" type="number" id="identificacion"
          class="mt-1 p-2 w-full border border-graydark dark:border-strokedark rounded-md shadow-sm dark:bg-slate-900 dark:text-gray"
          required />
      </div>
      
      <div class="mb-4">
        <label for="telefono" class="block text-sm font-medium text-gray-700">Teléfono</label>
        <input v-model="docente.telefono" type="number" id="telefono"
          class="mt-1 p-2 w-full border border-graydark dark:border-strokedark rounded-md shadow-sm dark:bg-slate-900 dark:text-gray"
          required />
      </div>
      
      <div class="mb-4" v-if="isAuthenticated && user.rol == 'Administrador'">
        <label for="cliente_id" class="block text-sm font-medium text-gray-700 mb-2">Asignar cliente</label>
        <select id="cliente_id" v-model="docente.cliente_id" required
        class="text-xs md:text-base border border-graydark dark:border-strokedark rounded-md shadow-sm dark:bg-slate-900 dark:text-gray justify-end py-4 p-2 w-full whitespace-normal break-words">
        <option class="" value="" disabled>Seleccionar cliente</option>
        <option class="" v-for="item in infoClientes" :key="item.id" :value="item.id">{{ item.correo }} - {{item.institucion}}</option>
        
      </select>
      </div>
      
      
      <div class="mb-4">
        <label for="correo" class="block text-sm font-medium text-gray-700">Correo</label>
        <input v-model="docente.email" type="email" id="correo"
          class="mt-1 p-2 w-full border border-graydark dark:border-strokedark rounded-md shadow-sm dark:bg-slate-900 dark:text-gray"
          required />
      </div>
      <div class="mb-4">
        <label for="password" class="block text-sm font-medium text-gray-700">Contraseña</label>
        <input v-model="docente.password" type="password" id="password"
          class="mt-1 p-2 w-full border border-graydark dark:border-strokedark rounded-md shadow-sm dark:bg-slate-900 dark:text-gray"
          required />
      </div>
      <div class="flex justify-between">
        <button type="button" @click="regresar" class="px-4 py-2 bg-graydark text-white rounded-md shadow-sm">
          Regresar
        </button>
        <button type="submit"
          class="px-4 py-2 bg-blue-500 rounded-md shadow-sm bg-gray dark:bg-primary/20 dark:text-white">
          Crear Docente
        </button>
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { ref, inject, onMounted } from 'vue';
import axios from '../../../plugins/axios';
import BreadcrumbDefault from '@/components/Breadcrumbs/BreadcrumbDefault.vue';
import { useUserStore } from '@/store/auth';
import { storeToRefs } from 'pinia';
import Swal from 'sweetalert2';
const swal = inject('$swal') as typeof Swal;

// Usar el store de usuarios
const userStore = useUserStore();
const { isAuthenticated, user, error_user } = storeToRefs(userStore);

//info clientes
const infoClientes = ref([]);

const docente = ref({
  name: '',
  apellidos: '',
  identificacion: '',
  email: '',
  telefono: '',
  cliente_id: '',
  password: '',
 
});

docente.value.cliente_id = user.value.cliente ?? '';

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


const crearDocentes = async () => {
  try {
    
    const response = await axios.post('/api/docentes', JSON.stringify(docente.value), {
          headers: {
            'Content-Type': 'application/json',
            accept: 'application/json',
            
          },
        })
  
    console.log(response);


    swal.fire({
      icon: 'success',
      title: 'Docente registrado con éxito',
      html: `
        <p>${response.data.message}</p>
        <p><strong>Docente:</strong> ${response.data.data.nombre} ${response.data.data.apellidos}</p>`,
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

    console.error('Error al crear docente:', error);
    swal.fire({
      icon: 'error',
      title: 'Error en la creación del docente',
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
