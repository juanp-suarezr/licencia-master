<template>
  <div class="w-full flex justify-start">
    <breadcrumb-default pageTitle="editar estudiante" pageSubtitle="Estudiantes" path="estudiantes"></breadcrumb-default>
  </div>
  <div class="w-full p-4 bg-white dark:bg-boxdark rounded-md shadow-md">
    <h2 class="text-lg font-bold mb-4">Editar Estudiante</h2>
    <form @submit.prevent="editarEstudiantes">
      <div class="mb-4">
        <label for="nombre" class="block text-sm font-medium text-gray-700">Nombre</label>
        <input v-model="estudiante.nombre" type="text" id="nombre"
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
        <label for="grupo_id" class="block text-sm font-medium text-gray-700">{{estudiante.isGrupo ? 'Editar grupo' : 'Asignar grupo (opcional)'}}</label>
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
            {{ estudiante.isGrupo ? 'Cancelar' : estudiante.grupo_id != 0 ? 'Actualizar grupo' :'Asignar grupo' }}
          </button>

        </div>

      </div>
      


      <div class="mb-4">
        <label for="correo" class="block text-sm font-medium text-gray-700">Correo</label>
        <input v-model="estudiante.correo" type="email" id="correo"
          class="mt-1 p-2 w-full border border-graydark dark:border-strokedark rounded-md shadow-sm dark:bg-slate-900 dark:text-gray"
          required />
      </div>
      <div class="mb-4">
        <label for="password" class="block text-sm font-medium text-gray-700">Contraseña</label>
        <div class="flex flex-wrap gap-4 w-full mt-2">
          <!-- Input docente -->
          <input v-if="estudiante.actu_password" v-model="estudiante.password" type="password" id="password"
          class="mt-1 p-2 w-auto border border-graydark dark:border-strokedark rounded-md shadow-sm dark:bg-slate-900 dark:text-gray"
          />
          <!-- Boton -->
          <button type="button" @click="changeStatePaswword"
            class="px-2 py-1 dark:bg-slate-900 dark:text-gray rounded-md shadow-sm">
            {{ estudiante.actu_password ? 'Cancelar' : 'Actualizar contraseña' }}
          </button>
        
        </div>
        
      </div>
      
      <div class="flex justify-between">
        <button type="button" @click="regresar" class="px-4 py-2 bg-graydark text-white rounded-md shadow-sm">
          Regresar
        </button>
        <button type="submit"
          class="px-4 py-2 bg-blue-500 rounded-md shadow-sm bg-gray dark:bg-primary/20 dark:text-white">
          Actualizar estudiante
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

const estudiante = ref({
  id: route.params.id,
  nombre: '',
  apellidos: '',
  correo: '',
  actu_password: false,
  password: '',
  genero: '', 
  grupo_id: 0,
  isGrupo: false,
  id_cliente: 0,
 
});

//info grupos
const infoGrupos = ref([]);
const infoGrupo = ref(0);

const getGrupos = async () => {
  try {
    const response = await axios.get(`/api/infoGruposXAdmin/${estudiante.value.id_cliente}`, {
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

const changeStateGrupo = () => {
  estudiante.value.isGrupo = !estudiante.value.isGrupo;
  if (infoGrupo.value != 0) {
    estudiante.value.grupo_id = infoGrupo.value;
  } else {
    estudiante.value.grupo_id = 0;
  }
  
};

const changeStatePaswword = () => {
  estudiante.value.actu_password = !estudiante.value.actu_password;

  if (estudiante.value.actu_password) {
    estudiante.value.password = '123456789';
  }

};

const fetchestudiante = async (id: number) => {
  try {
    const response = await axios.get(`/api/estudiantes/${id}`);
    console.log('estudiante obtenido:', response.data.data);
    asignarEstudiante(response.data.data);
  } catch (error) {
    console.error('Error al obtener el estudiante:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error al obtener el estudiante',
      text: error.response?.data?.message || 'Ocurrió un error inesperado',
      customClass: {
        popup: 'dark:bg-slate-900 dark:text-gray bg-white text-graydark',
        title: 'dark:text-gray text-graydark',
        confirmButton: 'bg-blue-800 rounded-md shadow-sm bg-gray dark:bg-primary/20 dark:text-white',
      },
      didClose: () => {
        router.push('/');
      },
    });
  }
};

const asignarEstudiante = (data: any) => {
  infoGrupo.value = parseInt(data.grupo_id);
  estudiante.value = {
    id: data.id,
    nombre: data.nombre,
    apellidos: data.apellidos,
    genero: data.user.player.genero,
    correo: data.correo,
    actu_password: false,
    password: '123456789',
    grupo_id: parseInt(data.grupo_id),
    isGrupo: data.grupo_id ? true : false,
    id_cliente: data.id_cliente,
    
  };
  
  console.log('estudiante:', infoGrupo.value);
  
  getGrupos();
};


const editarEstudiantes = async () => {
  try {
    const response = await axios.patch(`/api/estudiantes/${estudiante.value.id}`, JSON.stringify(estudiante.value), {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    console.log('estudiante actualizado:', response.data);

    Swal.fire({
      icon: 'success',
      title: 'estudiante actualizado con éxito',
      text: response.data.message,
      customClass: {
        popup: 'dark:bg-slate-900 dark:text-gray bg-white text-graydark',
        title: 'dark:text-gray text-graydark',
        confirmButton: 'bg-blue-800 rounded-md shadow-sm bg-gray dark:bg-primary/20 dark:text-white',
      },
      didClose: () => {
        if (estudiante.value.actu_password) {
          estudiante.value.actu_password = false;
        }
      },
    });
  } catch (error) {
    console.error('Error al actualizar el estudiante:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error al actualizar el estudiante',
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
  const id = Number(route.params.id);
  if (id) {
    fetchestudiante(id);
  }
});

</script>

<style scoped>
/* Agrega estilos personalizados si es necesario */
</style>
