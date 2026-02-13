<template>
  <div class="w-full flex justify-start">
    <breadcrumb-default pageTitle="editar docente" pageSubtitle="Docentes" path="docentes"></breadcrumb-default>
  </div>
  <div class="w-full p-4 bg-white dark:bg-boxdark rounded-md shadow-md">
    <h2 class="text-lg font-bold mb-4">Editar Docente</h2>
    <form @submit.prevent="editarDocentes">
      <div class="mb-4">
        <label for="nombre" class="block text-sm font-medium text-gray-700">Nombre</label>
        <input v-model="docente.nombre" type="text" id="nombre"
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
      
    
      <div class="mb-4">
        <label for="correo" class="block text-sm font-medium text-gray-700">Correo</label>
        <input v-model="docente.correo" type="email" id="correo"
          class="mt-1 p-2 w-full border border-graydark dark:border-strokedark rounded-md shadow-sm dark:bg-slate-900 dark:text-gray"
          required />
      </div>

      <div class="mb-4">
        <label for="password" class="block text-sm font-medium text-gray-700">Contraseña</label>
        <div class="flex flex-wrap gap-4 w-full mt-2">
          <!-- Input docente -->
          <input v-if="docente.actu_password" v-model="docente.password" type="password" id="password"
          class="mt-1 p-2 w-auto border border-graydark dark:border-strokedark rounded-md shadow-sm dark:bg-slate-900 dark:text-gray"
          />
          <!-- Boton -->
          <button type="button" @click="changeStatePaswword"
            class="px-2 py-1 dark:bg-slate-900 dark:text-gray rounded-md shadow-sm">
            {{ docente.actu_password ? 'Cancelar' : 'Actualizar contraseña' }}
          </button>
        
        </div>
        
      </div>
      
      <div class="flex justify-between">
        <button type="button" @click="regresar" class="px-4 py-2 bg-graydark text-white rounded-md shadow-sm">
          Regresar
        </button>
        <button type="submit"
          class="px-4 py-2 bg-blue-500 rounded-md shadow-sm bg-gray dark:bg-primary/20 dark:text-white">
          Actualizar docente
        </button>
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { ref, inject, onMounted } from 'vue';
import axios from '../../../plugins/axios';
import { useRoute, useRouter } from 'vue-router';
import { defineProps } from 'vue';
import BreadcrumbDefault from '@/components/Breadcrumbs/BreadcrumbDefault.vue';
import Swal from 'sweetalert2';
import Password from 'primevue/password';
import { watch } from 'vue';

const swal = inject('$swal') as typeof Swal;

const route = useRoute();
const router = useRouter();

console.log(route.params.id);

const docente = ref({
  id: route.params.id,
  nombre: '',
  apellidos: '',
  identificacion: '',
  correo: '',
  telefono: '',
  actu_password: false,
  password: '',
  
 
});

const changeStatePaswword = () => {
  docente.value.actu_password = !docente.value.actu_password;

  if (docente.value.actu_password) {
    docente.value.password = '123456789';
  }

};

const fetchdocente = async (id: number) => {
  try {
    const response = await axios.get(`/api/docentes/${id}`);
    
    asignardocente(response.data.data);
  } catch (error) {
    console.error('Error al obtener el docente:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error al obtener el docente',
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

const asignardocente = (data: any) => {
  docente.value = {
    id: data.id,
    nombre: data.nombre,
    apellidos: data.apellidos,
    identificacion: data.identificacion,
    correo: data.correo,
    telefono: data.telefono,
    actu_password: false,
    password: '123456789',
    
    
  };
};



const editarDocentes = async () => {
  try {
    const response = await axios.patch(`/api/docentes/${docente.value.id}`, JSON.stringify(docente.value), {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    console.log('docente actualizado:', response.data);

    Swal.fire({
      icon: 'success',
      title: 'docente actualizado con éxito',
      text: response.data.message,
      customClass: {
        popup: 'dark:bg-slate-900 dark:text-gray bg-white text-graydark',
        title: 'dark:text-gray text-graydark',
        confirmButton: 'bg-blue-800 rounded-md shadow-sm bg-gray dark:bg-primary/20 dark:text-white',
      },
      didClose: () => {
        if (docente.value.actu_password) {
          docente.value.actu_password = false;
        }
      },
    });
  } catch (error) {
    console.error('Error al actualizar el docente:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error al actualizar el docente',
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
    fetchdocente(id);
  }
});

</script>

<style scoped>
/* Agrega estilos personalizados si es necesario */
</style>
