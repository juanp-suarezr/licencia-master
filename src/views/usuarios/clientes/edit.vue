<template>
  <div class="w-full p-4 bg-white dark:bg-boxdark rounded-md shadow-md">
    <h2 class="text-lg font-bold mb-4">Editar Cliente</h2>
    <form @submit.prevent="editarCliente">
      <div class="mb-4">
        <label for="nombre" class="block text-sm font-medium text-gray-700">Nombre</label>
        <input v-model="cliente.nombre" type="text" id="nombre"
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
        <input v-model="cliente.identificacion" type="text" id="identificacion"
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
        <input v-model="cliente.telefono" type="text" id="telefono"
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
      <!-- <div class="mb-4">
        <label for="logo" class="block text-sm font-medium text-gray-700">Logo</label>
        <input @change="onFileChange" type="file" id="logo"
          class="mt-1 p-2 w-full border border-graydark dark:border-strokedark rounded-md shadow-sm dark:bg-slate-900 dark:text-gray"
          accept="image/*" />
      </div> -->
      <div class="mb-4">
        <label for="correo" class="block text-sm font-medium text-gray-700">Correo</label>
        <input v-model="cliente.correo" type="email" id="correo"
          class="mt-1 p-2 w-full border border-graydark dark:border-strokedark rounded-md shadow-sm dark:bg-slate-900 dark:text-gray"
          required />
      </div>
      
      <div class="flex justify-between">
        <button type="button" @click="regresar" class="px-4 py-2 bg-graydark text-white rounded-md shadow-sm">
          Regresar
        </button>
        <button type="submit"
          class="px-4 py-2 bg-blue-500 rounded-md shadow-sm bg-gray dark:bg-primary/20 dark:text-white">
          Actualizar Cliente
        </button>
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { ref, inject, onMounted } from 'vue';
import axios from '../../../plugins/axios';
import { useRoute } from 'vue-router';
import { defineProps } from 'vue';
import Swal from 'sweetalert2';

const swal = inject('$swal') as typeof Swal;

const route = useRoute();

console.log(route.params.id);

const cliente = ref({
  id: route.params.id,
  nombre: '',
  apellidos: '',
  identificacion: '',
  direccion: '',
  correo: '',
  telefono: '',
  pais: '',
  ciudad: '',
  institucion: '',
  
 
});

// const onFileChange = (event: Event) => {
//   const file = (event.target as HTMLInputElement).files?.[0];
//   if (file) {
//     cliente.value.logo = file;
//   }
// };

const fetchCliente = async (id: number) => {
  try {
    const response = await axios.get(`/api/clientes/${id}`);
    console.log('Cliente obtenido:', response.data.data);
    asignarCliente(response.data.data);
  } catch (error) {
    console.error('Error al obtener el cliente:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error al obtener el cliente',
      text: error.response?.data?.message || 'Ocurrió un error inesperado',
    });
  }
};

const asignarCliente = (data: any) => {
  cliente.value = {
    id: data.id,
    nombre: data.nombre,
    apellidos: data.apellidos,
    identificacion: data.identificacion,
    direccion: data.direccion,
    correo: data.correo,
    telefono: data.telefono,
    pais: data.pais,
    ciudad: data.ciudad,
    institucion: data.institucion,
    
  };
};

const editarCliente = async () => {
  try {
    const response = await axios.patch(`/api/clientes/${cliente.value.id}`, JSON.stringify(cliente.value), {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    console.log('Cliente actualizado:', response.data);

    Swal.fire({
      icon: 'success',
      title: 'Cliente actualizado con éxito',
      text: response.data.message,
    });
  } catch (error) {
    console.error('Error al actualizar el cliente:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error al actualizar el cliente',
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
    fetchCliente(id);
  }
});

</script>

<style scoped>
/* Agrega estilos personalizados si es necesario */
</style>
