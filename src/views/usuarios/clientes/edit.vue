<template>
  <div class="w-full flex flex-wrap justify-between items-center mb-2">
    <breadcrumb-default class="my-auto" pageTitle="Editar cliente" pageSubtitle="Clientes"
      path="clientes"></breadcrumb-default>
    <div class="justify-end my-auto">
      <button @click="ModalChangeImg = true" class="px-4 py-2 bg-graydark text-white rounded-md shadow-sm">
        {{ institucion.logo ? 'Cambiar imagen' : 'Agregar imagen' }}
      </button>
    </div>
  </div>
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
        <label for="correo" class="block text-sm font-medium text-gray-700">Correo</label>
        <input v-model="cliente.correo" type="email" id="correo"
          class="mt-1 p-2 w-full border border-graydark dark:border-strokedark rounded-md shadow-sm dark:bg-slate-900 dark:text-gray"
          required />
      </div>
      <div class="mb-4">
        <label for="password" class="block text-sm font-medium text-gray-700">Contraseña</label>
        <div class="flex flex-wrap gap-4 w-full mt-2">
          <!-- Input docente -->
          <input v-if="cliente.actu_password" v-model="cliente.password" type="password" id="password"
          class="mt-1 p-2 w-auto border border-graydark dark:border-strokedark rounded-md shadow-sm dark:bg-slate-900 dark:text-gray"
          />
          <!-- Boton -->
          <button type="button" @click="changeStatePaswword"
            class="px-2 py-1 dark:bg-slate-900 dark:text-gray rounded-md shadow-sm">
            {{ cliente.actu_password ? 'Cancelar' : 'Actualizar contraseña' }}
          </button>
        
        </div>
        
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

  <!-- Modal para cambiar o añadir imagen de logo de institución -->
  <Modal :isOpen="ModalChangeImg" @close="ModalChangeImg = false">
      <div class="p-4 bg-white dark:bg-boxdark rounded-md shadow-md">
        <h3 class="text-lg font-bold">Cambiar Logo de Institución</h3>
        <p class="text-sm mt-2">Selecciona una nueva imagen para el logo de la institución.</p>
        <input type="file" @change="onFileChange" class="mt-2 p-2 w-full border border-graydark dark:border-strokedark rounded-md shadow-sm dark:bg-slate-900 dark:text-gray" accept="image/*" />
        <div class="flex justify-end mt-4 gap-2">
          <button @click="submitLogoChange"
            class="p-2 hover:scale-105 bg-primary/20 dark:bg-primary/40 dark:text-white rounded-md shadow-md">
            Guardar
          </button>
          <button @click="ModalChangeImg = false"
            class="p-2 hover:scale-105 bg-gray dark:bg-graydark dark:text-white rounded-md shadow-md">
            Cancelar
          </button>
        </div>
      </div>
    </Modal>

</template>

<script lang="ts" setup>
import { ref, inject, onMounted } from 'vue';
import axios from '../../../plugins/axios';
import { useRoute, useRouter } from 'vue-router';
import { defineProps } from 'vue';
import BreadcrumbDefault from '@/components/Breadcrumbs/BreadcrumbDefault.vue';
import Swal from 'sweetalert2';
import Modal from '@/components/Modal.vue';


const swal = inject('$swal') as typeof Swal;

const route = useRoute();
const router = useRouter();
const ModalChangeImg = ref(false);

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
  actu_password: false,
  password: '',

});

const institucion = ref({
  logo: '',
});

const onFileChange = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    institucion.value.logo = file;
  }
};

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
    actu_password: false,
    password: '123456789',
  };

  institucion.value = {
    logo: data.logo,
  };

};

const changeStatePaswword = () => {
  cliente.value.actu_password = !cliente.value.actu_password;

  if (cliente.value.actu_password) {
    cliente.value.password = '123456789';
  }

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
      customClass: {
        popup: 'dark:bg-slate-900 dark:text-gray bg-white text-graydark',
        title: 'dark:text-gray text-graydark',
        confirmButton: 'bg-blue-800 rounded-md shadow-sm bg-gray dark:bg-primary/20 dark:text-white',
      },
      didClose: () => {
        if (cliente.value.actu_password) {
          cliente.value.actu_password = false;
        }
      },
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
// Función para enviar la imagen del logo de la institución
const submitLogoChange = async () => {
  try {
    const formData = new FormData();
    formData.append('logo', institucion.value.logo);

    const response = await axios.post(`/api/clientesLogo/${cliente.value.id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwMDAvYXBpL2xvZ2luIiwiaWF0IjoxNzM4MjUxMzk1LCJleHAiOjE3Mzg4NTYxOTUsIm5iZiI6MTczODI1MTM5NSwianRpIjoiSUh5dHpvRm5oV3F6NGZiSCIsInN1YiI6IjEiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.ll__ldIucTCmaWZVbPX1KHw0TwtQBkWBAXAYARfC80w',
      },
    });

    console.log('Logo actualizado:', response.data);

    Swal.fire({
      icon: 'success',
      title: 'Logo actualizado con éxito',
      text: response.data.message,
      customClass: {
        popup: 'dark:bg-slate-900 dark:text-gray bg-white text-graydark',
        title: 'dark:text-gray text-graydark',
        confirmButton: 'bg-blue-500 rounded-md shadow-sm bg-gray dark:bg-primary/20 dark:text-white',
      },
    });

    ModalChangeImg.value = false;
  } catch (error) {
    console.error('Error al actualizar el logo:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error al actualizar el logo',
      text: error.response?.data?.message || 'Ocurrió un error inesperado',
      customClass: {
        popup: 'dark:bg-slate-900 dark:text-gray bg-white text-graydark',
        title: 'dark:text-gray text-graydark',
        confirmButton: 'bg-blue-500 rounded-md shadow-sm bg-gray dark:bg-primary/20 dark:text-white',
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
  } else {
    Swal.fire({
      icon: 'error',
      title: 'ID no válido',
      text: 'El ID del cliente no es válido.',
      customClass: {
        popup: 'dark:bg-slate-900 dark:text-gray bg-white text-graydark',
        title: 'dark:text-gray text-graydark',
        confirmButton: 'bg-blue-500 rounded-md shadow-sm bg-gray dark:bg-primary/20 dark:text-white',
      },
    }).then(() => {
      router.push({ name: 'Dashboard' });
    });
  }
});

</script>

<style scoped>
/* Agrega estilos personalizados si es necesario */
</style>
