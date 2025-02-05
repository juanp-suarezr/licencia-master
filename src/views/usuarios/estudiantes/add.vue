<template>
  <div class="w-full flex justify-start">
    <breadcrumb-default pageTitle="Añadir estudiante" pageSubtitle="Estudiantes"
      path="estudiantes"></breadcrumb-default>
  </div>
  <div class="w-full p-4 bg-white dark:bg-boxdark rounded-md shadow-md">
    <h2 class="text-lg font-bold mb-4">Crear Nuevo Estudante</h2>
    <form @submit.prevent="crearEstudiante">
      <div class="mb-4">
        <label for="nombre" class="block text-sm font-medium text-gray-700">Nombre</label>
        <input v-model="estudiante.name" type="text" id="nombre"
          class="mt-1 p-2 w-full border border-graydark dark:border-strokedark rounded-md shadow-sm dark:bg-slate-900 dark:text-gray"
          required />
      </div>
      <div class="mb-4">
        <label for="apellidos" class="block text-sm font-medium text-gray-700">Apellidos</label>
        <input v-model="estudiante.apellidos" type="text" id="apellidos"
          class="mt-1 p-2 w-full border border-graydark dark:border-strokedark rounded-md shadow-sm dark:bg-slate-900 dark:text-gray"
          required />
      </div>
      <div class="mb-4">
        <label for="genero" class="block text-sm font-medium text-gray-700">Genero</label>
        <div class="flex items-center mt-2 gap-2">
          <input v-model="estudiante.genero" type="radio" id="masculino" name="genero" value="0"
            class="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300">
          <label for="masculino" class="ml-2 block text-sm text-gray-900">Masculino</label>
          <input v-model="estudiante.genero" type="radio" id="femenino" name="genero" value="1"
            class="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300">
          <label for="femenino" class="ml-2 block text-sm text-gray-900">Femenino</label>

        </div>
      </div>

      <div class="mb-4">
        <label for="id_cliente" class="block text-sm font-medium text-gray-700 mb-2">Asignar cliente</label>
        <select id="id_cliente" v-model="estudiante.id_cliente" required
          class="text-xs md:text-base border border-graydark dark:border-strokedark rounded-md shadow-sm dark:bg-slate-900 dark:text-gray justify-end py-4 p-2 w-full whitespace-normal break-words">
          <option class="" value="" disabled>Seleccionar cliente</option>
          <option class="" v-for="item in infoClientes" :key="item.id" :value="item.id">{{ item.correo }} -
            {{ item.institucion }}</option>

        </select>
      </div>

      <div class="mb-4">
        <label for="grupo_id" class="block text-sm font-medium text-gray-700">Seleccionar grupo (opcional)</label>
        <div class="flex flex-wrap gap-4 w-full mt-2">
          <!-- Input docente -->
          <select v-if="estudiante.isGrupo" id="grupo_id" v-model="estudiante.grupo_id"
            class="text-xs md:text-base border border-graydark dark:border-strokedark rounded-md shadow-sm dark:bg-slate-900 dark:text-gray justify-end py-4 p-2 w-auto whitespace-normal break-words">
            <option class="" value="" disabled>Seleccionar grupo</option>
            <option class="" v-if="infoGrupos.length != 0" v-for="item in infoGrupos" :key="item.id_grupo"
              :value="item.id_grupo">{{ item.nombre_grupo
              }}</option>
            <option class="" v-else disabled>No hay grupos disponibles</option>

          </select>
          <!-- Boton -->
          <button type="button" @click="changeStateGrupo"
            class="px-2 py-1 dark:bg-slate-900 dark:text-gray rounded-md shadow-sm">
            {{ estudiante.isGrupo ? 'Cancelar' : 'Asignar grupo' }}
          </button>

        </div>

      </div>


      <div class="mb-4">
        <label for="correo" class="block text-sm font-medium text-gray-700">Correo</label>
        <input v-model="estudiante.email" type="email" id="correo"
          class="mt-1 p-2 w-full border border-graydark dark:border-strokedark rounded-md shadow-sm dark:bg-slate-900 dark:text-gray"
          required />
      </div>
      <div class="mb-4">
        <label for="password" class="block text-sm font-medium text-gray-700">Contraseña</label>
        <input v-model="estudiante.password" type="password" id="password"
          class="mt-1 p-2 w-full border border-graydark dark:border-strokedark rounded-md shadow-sm dark:bg-slate-900 dark:text-gray"
          required />
      </div>
      <div class="flex justify-between">
        <button type="button" @click="regresar" class="px-4 py-2 bg-graydark text-white rounded-md shadow-sm">
          Regresar
        </button>
        <button type="submit"
          class="px-4 py-2 bg-blue-500 rounded-md shadow-sm bg-gray dark:bg-primary/20 dark:text-white">
          Crear estudiante
        </button>
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { ref, inject, onMounted, watch } from 'vue';
import axios from '../../../plugins/axios';
import BreadcrumbDefault from '@/components/Breadcrumbs/BreadcrumbDefault.vue';
import Swal from 'sweetalert2';
const swal = inject('$swal') as typeof Swal;

//info clientes
const infoClientes = ref([]);
//info grupos
const infoGrupos = ref([]);

const estudiante = ref({
  name: '',
  apellidos: '',
  email: '',
  isGrupo: false,
  grupo_id: '',
  id_cliente: '',
  password: '',
  genero: '',

});

watch(() => estudiante.value.id_cliente, (value: string) => {
  if (value) {
    getGrupos(value);
  }
});

const changeStateGrupo = () => {
  estudiante.value.isGrupo = !estudiante.value.isGrupo;
  estudiante.value.grupo_id = '';
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

const getGrupos = async (value: string) => {
  try {
    const response = await axios.get(`/api/infoGruposXAdmin/${value}`, {
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
        'X-CSRF-TOKEN': '', // Agrega el token CSRF si es necesario
      },
    });
    console.log('Grupos obtenidos:', response.data);

    infoGrupos.value = response.data.data;
  } catch (error) {
    console.error('Error al obtener grupos:', error);
  }
}


const crearEstudiante = async () => {
  try {

    const response = await axios.post('/api/estudiantes', JSON.stringify(estudiante.value), {
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',

      },
    })

    console.log(response);


    swal.fire({
      icon: 'success',
      title: 'Estudiante registrado con éxito',
      html: `
        <p>${response.data.message}</p>
        <p><strong>Estudiante:</strong> ${response.data.data.nombre} ${response.data.data.apellidos}</p>`,
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

    console.error('Error al crear estudiante:', error);
    swal.fire({
      icon: 'error',
      title: 'Error en la creación del estudiante',
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
