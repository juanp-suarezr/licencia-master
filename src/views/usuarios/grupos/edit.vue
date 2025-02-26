<template>
  <div class="w-full flex justify-start">
    <breadcrumb-default pageTitle="editar grupo" pageSubtitle="Grupos" path="grupos"></breadcrumb-default>
  </div>
  <div class="w-full p-4 bg-white dark:bg-boxdark rounded-md shadow-md">
    <h2 class="text-lg font-bold mb-4">Editar Grupo</h2>
    <form @submit.prevent="editarGrupos">
      <!-- nombre -->
      <div class="mb-4">
        <label for="nombre" class="block text-sm font-medium text-gray-700">Nombre grupo</label>
        <input v-model="grupos.nombre_grupo" type="text" id="nombre"
          class="mt-1 p-2 w-full border border-graydark dark:border-strokedark rounded-md shadow-sm dark:bg-slate-900 dark:text-gray"
          required />
      </div>
      
      <!-- grupo -->
      <div class="mb-4">
        <label for="grupo_id" class="block text-sm font-medium text-gray-700">{{grupos.isDocente ? 'Editar docente' : 'Asignar docente (opcional)'}}</label>
        <div class="flex flex-wrap gap-4 w-full mt-2">
          <!-- Input docente -->
          <select v-if="grupos.isDocente" id="grupo_id" v-model="grupos.id_docente"
            class="text-xs md:text-base border border-graydark dark:border-strokedark rounded-md shadow-sm dark:bg-slate-900 dark:text-gray justify-end py-4 p-2 w-auto whitespace-normal break-words">
            <option class="" value="" disabled>Seleccionar docente</option>
            <option class="" v-if="infoDocentes.length != 0" v-for="item in infoDocentes" :key="item.id"
              :value="item.id">{{ item.nombre_profesor }}</option>
            <option class="" v-else disabled>No hay docentes disponibles</option>

          </select>
          <!-- Boton -->
          <button type="button" @click="changeStateGrupo"
            class="px-2 py-1 dark:bg-slate-900 dark:text-gray rounded-md shadow-sm">
            {{ grupos.isDocente ? 'Cancelar' : grupos.idDocente != 0 ? 'Actualizar docente' :'Asignar docente' }}
          </button>

        </div>

      </div>
      
      
      <div class="flex justify-between">
        <button type="button" @click="regresar" class="px-4 py-2 bg-graydark text-white rounded-md shadow-sm">
          Regresar
        </button>
        <button type="submit"
          class="px-4 py-2 bg-blue-500 rounded-md shadow-sm bg-gray dark:bg-primary/20 dark:text-white">
          Actualizar grupos
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

const grupos = ref({
  id: route.params.id,
  nombre_grupo: '',
  id_cliente: 0,
  isDocente: false,
  id_docente: 0,
 
});

//info grupos
const infoDocentes = ref([]);
const infoDocente = ref(0);

const getDocentes = async () => {
  try {
    const response = await axios.get(`/api/infoDocentesXAdmin/${grupos.value.id_cliente}`, {
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
        'X-CSRF-TOKEN': '', // Agrega el token CSRF si es necesario
      },
    });
    console.log('Docentes obtenidos:', response.data);

    infoDocentes.value = response.data.data;
  } catch (error) {
    console.error('Error al obtener docentes:', error);
  }
}

const changeStateGrupo = () => {
  grupos.value.isDocente = !grupos.value.isDocente;
  if (infoDocente.value != 0) {
    grupos.value.id_docente = infoDocente.value;
  } else {
    grupos.value.id_docente = 0;
  }
  
};



const fetchgrupos = async (id: number) => {
  try {
    const response = await axios.get(`/api/grupos/${id}`);
    console.log('grupos obtenido:', response.data.data);
    asignargrupos(response.data.data);
  } catch (error) {
    console.error('Error al obtener el grupos:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error al obtener el grupos',
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

const asignargrupos = (data: any) => {
  infoDocente.value = parseInt(data.id_docente || 0);
  grupos.value = {
    id: data.id,
    nombre_grupo: data.nombre_grupo,
    
    id_cliente: parseInt(data.id_cliente),
    isDocente: data.id_docente ? true : false,
    
  };
  
  console.log('grupos:', infoDocente.value);
  
  getDocentes();
};


const editarGrupos = async () => {
  try {
    const response = await axios.patch(`/api/grupos/${grupos.value.id}`, JSON.stringify(grupos.value), {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    console.log('grupos actualizado:', response.data);

    Swal.fire({
      icon: 'success',
      title: 'grupos actualizado con éxito',
      text: response.data.message,
      customClass: {
        popup: 'dark:bg-slate-900 dark:text-gray bg-white text-graydark',
        title: 'dark:text-gray text-graydark',
        confirmButton: 'bg-blue-800 rounded-md shadow-sm bg-gray dark:bg-primary/20 dark:text-white',
      },
      didClose: () => {
        if (grupos.value.actu_password) {
          grupos.value.actu_password = false;
        }
      },
    });
  } catch (error) {
    console.error('Error al actualizar el grupos:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error al actualizar el grupos',
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
    fetchgrupos(id);
  }
});

</script>

<style scoped>
/* Agrega estilos personalizados si es necesario */
</style>
