<template>
  <div class="w-full flex justify-start">
    <breadcrumb-default pageTitle="Añadir cliente" pageSubtitle="Clientes" path="clientes"></breadcrumb-default>
  </div>
  <div class="w-full p-4 bg-white dark:bg-boxdark rounded-md shadow-md">
    <h2 class="text-lg font-bold mb-4">Crear Nuevo Cliente</h2>
    <form @submit.prevent="crearCliente">
      <div class="mb-4">
        <label for="nombre" class="block text-sm font-medium text-gray-700">Nombre (opcional)</label>
        <input v-model="cliente.name" type="text" id="nombre"
          class="mt-1 p-2 w-full border border-graydark dark:border-strokedark rounded-md shadow-sm dark:bg-slate-900 dark:text-gray"
          />
      </div>
      <div class="mb-4">
        <label for="apellidos" class="block text-sm font-medium text-gray-700">Apellidos (opcional)</label>
        <input v-model="cliente.apellidos" type="text" id="apellidos"
          class="mt-1 p-2 w-full border border-graydark dark:border-strokedark rounded-md shadow-sm dark:bg-slate-900 dark:text-gray"
          />
      </div>
      <div class="mb-4">
        <label for="identificacion" class="block text-sm font-medium text-gray-700">Identificación (opcional)</label>
        <input v-model="cliente.identificacion" type="number" id="identificacion"
          class="mt-1 p-2 w-full border border-graydark dark:border-strokedark rounded-md shadow-sm dark:bg-slate-900 dark:text-gray"
          />
      </div>
      <div class="mb-4">
        <label for="direccion" class="block text-sm font-medium text-gray-700">Dirección (opcional)</label>
        <input v-model="cliente.direccion" type="text" id="direccion"
          class="mt-1 p-2 w-full border border-graydark dark:border-strokedark rounded-md shadow-sm dark:bg-slate-900 dark:text-gray"
        />
      </div>

      <div class="mb-4">
        <label for="telefono" class="block text-sm font-medium text-gray-700">Teléfono (opcional)</label>
        <input v-model="cliente.telefono" type="number" id="telefono"
          class="mt-1 p-2 w-full border border-graydark dark:border-strokedark rounded-md shadow-sm dark:bg-slate-900 dark:text-gray"
          />
      </div>
      <div class="mb-4">
        <label for="pais" class="block text-sm font-medium text-gray-700">País</label>
        <input v-model="cliente.pais" type="text" id="pais"
          class="mt-1 p-2 w-full border border-graydark dark:border-strokedark rounded-md shadow-sm dark:bg-slate-900 dark:text-gray"
          required />
      </div>
      <div class="mb-4">
        <label for="ciudad" class="block text-sm font-medium text-gray-700">Ciudad (opcional)</label>
        <input v-model="cliente.ciudad" type="text" id="ciudad"
          class="mt-1 p-2 w-full border border-graydark dark:border-strokedark rounded-md shadow-sm dark:bg-slate-900 dark:text-gray"
          />
      </div>
      <div class="mb-4">
        <label for="institucion" class="block text-sm font-medium text-gray-700">Institución</label>
        <input v-model="cliente.institucion" type="text" id="institucion"
          class="mt-1 p-2 w-full border border-graydark dark:border-strokedark rounded-md shadow-sm dark:bg-slate-900 dark:text-gray"
          required />
      </div>
      <div class="mb-4">
        <label for="logo" class="block text-sm font-medium text-gray-700">Logo (opcional)</label>
        <input @change="onFileChange" type="file" id="logo"
          class="mt-1 p-2 w-full border border-graydark dark:border-strokedark rounded-md shadow-sm dark:bg-slate-900 dark:text-gray"
          accept="image/*" />
      </div>
      <div class="mb-4">
        <label for="correo" class="block text-sm font-medium text-gray-700">Correo</label>
        <input v-model="cliente.email" type="email" id="correo"
          class="mt-1 p-2 w-full border border-graydark dark:border-strokedark rounded-md shadow-sm dark:bg-slate-900 dark:text-gray"
          required />
      </div>
      <div class="mb-4">
        <label for="password" class="block text-sm font-medium text-gray-700">Contraseña</label>
         <div class="relative">
          <input
            :type="showPassword ? 'text' : 'password'"
            id="password"
            v-model="cliente.password"
            class="mt-1 p-2 pr-10 w-full border border-graydark dark:border-strokedark rounded-md shadow-sm dark:bg-slate-900 dark:text-gray"
            required
          />

          <!-- botón/ícono dentro del input -->
          <button
            type="button"
            @click="showPassword = !showPassword"
            :aria-label="showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'"
            class="absolute inset-y-0 right-0 flex items-center pr-3 pt-1 text-gray-500 hover:text-gray-700 dark:text-gray"
            tabindex="-1"
          >
            <svg v-if="!showPassword" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 5c-7 0-10 7-10 7s3 7 10 7 10-7 10-7-3-7-10-7zm0 12a5 5 0 1 1 0-10 5 5 0 0 1 0 10z"/><circle cx="12" cy="12" r="3"/>
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M2 5.27 3.28 4l17.45 17.45-1.27 1.27-2.3-2.3A12.9 12.9 0 0 1 12 19c-7 0-10-7-10-7a22.28 22.28 0 0 1 5.12-6.43L2 5.27zm7.73 7.73a3 3 0 0 0 4.2 4.2l-4.2-4.2zM12 7a5 5 0 0 1 5 5c0 .58-.1 1.14-.28 1.66l-1.57-1.57A3 3 0 0 0 10.9 9.9L8.34 7.34C9.15 7.12 10.05 7 12 7z"/>
            </svg>
          </button>
        </div>
      </div>
      <div class="flex justify-between">
        <button type="button" @click="regresar" class="px-4 py-2 bg-graydark text-white rounded-md shadow-sm">
          Regresar
        </button>
        <button type="submit"
          class="px-4 py-2 bg-blue-500 rounded-md shadow-sm bg-gray dark:bg-primary/20 dark:text-white">
          Crear Cliente
        </button>
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { ref, inject } from 'vue';
import axios from '../../../plugins/axios';
import BreadcrumbDefault from '@/components/Breadcrumbs/BreadcrumbDefault.vue';

import Swal from 'sweetalert2';
const swal = inject('$swal') as typeof Swal;

const cliente = ref({
  name: '',
  apellidos: '',
  identificacion: '',
  direccion: '',
  email: '',
  telefono: '',
  pais: '',
  ciudad: '',
  institucion: '',
  password: '',
  logo: null,

});

const showPassword = ref(false);

const onFileChange = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    cliente.value.logo = file;
    console.log(cliente.value.logo);
    
  }
};

const crearCliente = async () => {


  try {

    const formData = new FormData();
    formData.append('name', cliente.value.name);
    formData.append('apellidos', cliente.value.apellidos);
    formData.append('identificacion', cliente.value.identificacion);
    formData.append('direccion', cliente.value.direccion);
    formData.append('email', cliente.value.email);
    formData.append('password', cliente.value.password);
    formData.append('telefono', cliente.value.telefono);
    formData.append('pais', cliente.value.pais);
    formData.append('ciudad', cliente.value.ciudad);
    formData.append('institucion', cliente.value.institucion);


    if (cliente.value.logo) {
      formData.append('logo', cliente.value.logo);
      
      
    }

    const response = await axios.post('/api/clientes', formData, {
      
    });

    console.log(response);


    swal.fire({
      icon: 'success',
      title: 'Cliente registrado con éxito',
      html: `
        <p>${response.data.message}</p>
        <p><strong>Cliente:</strong> ${response.data.data.nombre}</p>
        <p><strong>Institución:</strong> ${response.data.data.institucion}</p>`,
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

    console.error('Error al crear cliente:', error);
    swal.fire({
      icon: 'error',
      title: 'Error en la creación del cliente',
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
</script>

<style scoped>
/* Agrega estilos personalizados si es necesario */
</style>
