<template>
  <div class="w-full flex justify-start">
    <breadcrumb-default pageTitle="Añadir cliente" pageSubtitle="Clientes" path="clientes"></breadcrumb-default>
  </div>
  <div class="w-full p-4 bg-white dark:bg-boxdark rounded-md shadow-md">
    <h2 class="text-lg font-bold mb-4">Crear Nuevo Cliente</h2>
    <form @submit.prevent="crearCliente">
      <div class="mb-4">
        <label for="nombre" class="block text-sm font-medium text-gray-700">Nombre</label>
        <input v-model="cliente.name" type="text" id="nombre"
          class="mt-1 p-2 w-full border border-graydark dark:border-strokedark rounded-md shadow-sm dark:bg-slate-900 dark:text-gray"
          required />
      </div>
      <div class="mb-4">
        <label for="apellidos" class="block text-sm font-medium text-gray-700">Apellidos</label>
        <input v-model="cliente.apellidos" type="text" id="apellidos"
          class="mt-1 p-2 w-full border border-graydark dark:border-strokedark rounded-md shadow-sm dark:bg-slate-900 dark:text-gray"
          required />
      </div>
      <div class="mb-4">
        <label for="identificacion" class="block text-sm font-medium text-gray-700">Identificación</label>
        <input v-model="cliente.identificacion" type="number" id="identificacion"
          class="mt-1 p-2 w-full border border-graydark dark:border-strokedark rounded-md shadow-sm dark:bg-slate-900 dark:text-gray"
          required />
      </div>
      <div class="mb-4">
        <label for="direccion" class="block text-sm font-medium text-gray-700">Dirección</label>
        <input v-model="cliente.direccion" type="text" id="direccion"
          class="mt-1 p-2 w-full border border-graydark dark:border-strokedark rounded-md shadow-sm dark:bg-slate-900 dark:text-gray"
          required />
      </div>

      <div class="mb-4">
        <label for="telefono" class="block text-sm font-medium text-gray-700">Teléfono</label>
        <input v-model="cliente.telefono" type="number" id="telefono"
          class="mt-1 p-2 w-full border border-graydark dark:border-strokedark rounded-md shadow-sm dark:bg-slate-900 dark:text-gray"
          required />
      </div>
      <div class="mb-4">
        <label for="pais" class="block text-sm font-medium text-gray-700">País</label>
        <input v-model="cliente.pais" type="text" id="pais"
          class="mt-1 p-2 w-full border border-graydark dark:border-strokedark rounded-md shadow-sm dark:bg-slate-900 dark:text-gray"
          required />
      </div>
      <div class="mb-4">
        <label for="ciudad" class="block text-sm font-medium text-gray-700">Ciudad</label>
        <input v-model="cliente.ciudad" type="text" id="ciudad"
          class="mt-1 p-2 w-full border border-graydark dark:border-strokedark rounded-md shadow-sm dark:bg-slate-900 dark:text-gray"
          required />
      </div>
      <div class="mb-4">
        <label for="institucion" class="block text-sm font-medium text-gray-700">Institución</label>
        <input v-model="cliente.institucion" type="text" id="institucion"
          class="mt-1 p-2 w-full border border-graydark dark:border-strokedark rounded-md shadow-sm dark:bg-slate-900 dark:text-gray"
          required />
      </div>
      <div class="mb-4">
        <label for="logo" class="block text-sm font-medium text-gray-700">Logo</label>
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
        <input v-model="cliente.password" type="password" id="password"
          class="mt-1 p-2 w-full border border-graydark dark:border-strokedark rounded-md shadow-sm dark:bg-slate-900 dark:text-gray"
          required />
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
