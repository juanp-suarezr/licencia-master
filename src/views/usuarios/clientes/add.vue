<template>
  <div class="w-full p-4 bg-white rounded-md shadow-md">
    <h2 class="text-lg font-bold mb-4">Crear Nuevo Cliente</h2>
    <form @submit.prevent="crearCliente">
      <div class="mb-4">
        <label for="nombre" class="block text-sm font-medium text-gray-700">Nombre</label>
        <input v-model="cliente.nombre" type="text" id="nombre" class="mt-1 p-2 w-full border rounded-md shadow-sm" required />
      </div>
      <div class="mb-4">
        <label for="apellidos" class="block text-sm font-medium text-gray-700">Apellidos</label>
        <input v-model="cliente.apellidos" type="text" id="apellidos" class="mt-1 p-2 w-full border rounded-md shadow-sm" required />
      </div>
      <div class="mb-4">
        <label for="identificacion" class="block text-sm font-medium text-gray-700">Identificación</label>
        <input v-model="cliente.identificacion" type="text" id="identificacion" class="mt-1 p-2 w-full border rounded-md shadow-sm" required />
      </div>
      <div class="mb-4">
        <label for="direccion" class="block text-sm font-medium text-gray-700">Dirección</label>
        <input v-model="cliente.direccion" type="text" id="direccion" class="mt-1 p-2 w-full border rounded-md shadow-sm" required />
      </div>
      <div class="mb-4">
        <label for="correo" class="block text-sm font-medium text-gray-700">Correo</label>
        <input v-model="cliente.correo" type="email" id="correo" class="mt-1 p-2 w-full border rounded-md shadow-sm" required />
      </div>
      <div class="mb-4">
        <label for="telefono" class="block text-sm font-medium text-gray-700">Teléfono</label>
        <input v-model="cliente.telefono" type="text" id="telefono" class="mt-1 p-2 w-full border rounded-md shadow-sm" required />
      </div>
      <div class="mb-4">
        <label for="pais" class="block text-sm font-medium text-gray-700">País</label>
        <input v-model="cliente.pais" type="text" id="pais" class="mt-1 p-2 w-full border rounded-md shadow-sm" required />
      </div>
      <div class="mb-4">
        <label for="ciudad" class="block text-sm font-medium text-gray-700">Ciudad</label>
        <input v-model="cliente.ciudad" type="text" id="ciudad" class="mt-1 p-2 w-full border rounded-md shadow-sm" required />
      </div>
      <div class="mb-4">
        <label for="institucion" class="block text-sm font-medium text-gray-700">Institución</label>
        <input v-model="cliente.institucion" type="text" id="institucion" class="mt-1 p-2 w-full border rounded-md shadow-sm" required />
      </div>
      <div class="mb-4">
        <label for="logo" class="block text-sm font-medium text-gray-700">Logo</label>
        <input @change="onFileChange" type="file" id="logo" class="mt-1 p-2 w-full border rounded-md shadow-sm" accept="image/*" />
      </div>
      <div class="mb-4">
        <label for="password" class="block text-sm font-medium text-gray-700">Contraseña</label>
        <input v-model="cliente.password" type="password" id="password" class="mt-1 p-2 w-full border rounded-md shadow-sm" required />
      </div>
      <div class="flex justify-between">
        <button type="button" @click="regresar" class="px-4 py-2 bg-gray-500 text-white rounded-md shadow-sm">
          Regresar
        </button>
        <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded-md shadow-sm">
          Crear Cliente
        </button>
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import axios from '../../../plugins/axios';

const cliente = ref({
  nombre: '',
  apellidos: '',
  identificacion: '',
  direccion: '',
  correo: '',
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
  }
};

const crearCliente = async () => {
  try {
    const formData = new FormData();
    Object.keys(cliente.value).forEach(key => {
      formData.append(key, cliente.value[key as keyof typeof cliente.value] || '');
    });
    if (cliente.value.logo) {
      formData.append('logo', cliente.value.logo);
    }

    await axios.post('/api/clientes', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    alert('Cliente creado exitosamente');
    // Puedes agregar una lógica para redirigir o limpiar el formulario
  } catch (error) {
    console.error('Error al crear cliente:', error);
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
