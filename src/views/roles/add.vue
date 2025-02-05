<template>
  <div class="w-full flex justify-start">
    <breadcrumb-default pageTitle="Nuevo rol" pageSubtitle="Roles" path="roles"></breadcrumb-default>
  </div>
  <div class="w-full grid md:grid-cols-2 gap-4">

    <div class="w-full p-4 bg-white dark:bg-boxdark rounded-md shadow-md h-full">
      <h2 class="text-lg font-bold mb-4">Crear Nuevo Rol</h2>
      <form @submit.prevent="submit">
        <div class="mb-4">
          <label for="name" class="block text-sm font-medium text-gray-700">Rol</label>
          <input v-model="role.name" type="text" id="name"
            class="mt-1 p-2 w-full border border-graydark dark:border-strokedark rounded-md shadow-sm dark:bg-slate-900 dark:text-gray"
            required />
          <small v-if="errors.name" class="text-red-500">{{ errors.name }}</small>
        </div>
        <!-- Reemplaza el multiselect existente con este código -->
        <div class="mb-4">
          <label for="permisos" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Permisos</label>
          <div class="relative">
            <button @click="toggleDropdown" type="button"
              class="mt-1 p-2 w-full border border-graydark dark:border-strokedark rounded-md shadow-sm dark:bg-slate-900 dark:text-gray flex justify-between items-center">
              <span>{{ selectedPermissions.length ? selectedPermissions.map(id => permission[id].name).join(', ') : 'Selecciona los permisos' }}</span>
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            <div v-if="dropdownOpen" class="absolute mt-1 w-full rounded-md shadow-lg bg-white dark:bg-slate-900 z-10">
              <ul class="max-h-44 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                <li v-for="permiso in Object.values(permission)" :key="permiso.id" @click="togglePermission(permiso.id)"
                  class="cursor-pointer select-none relative py-2 pl-3 pr-9 text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700">
                  <span :class="{'font-semibold': selectedPermissions.includes(permiso.id), 'font-normal': !selectedPermissions.includes(permiso.id)}"
                    class="block truncate">
                    {{ permiso.name }}
                  </span>
                  <span v-if="selectedPermissions.includes(permiso.id)"
                    class="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 dark:text-indigo-400">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="flex justify-between">
          <button type="button" @click="goBack" class="px-4 py-2 bg-graydark text-white rounded-md shadow-sm">
            Regresar
          </button>
          <button type="submit"
            class="px-4 py-2 bg-blue-500 rounded-md shadow-sm bg-gray dark:bg-primary/20 dark:text-white">
            Guardar
          </button>
        </div>
      </form>
    </div>
    <div class="flex flex-col items-center h-full bg-white dark:bg-boxdark shadow-sm rounded-md">
      <div class="p-4 md:p-5 grid grid-cols-2 gap-4">
        <span v-for="(grupoPermisos, modulo) in agruparPorModulo(role.permisos)" :key="modulo"
          class="mt-2 inline-block">
          <fieldset :legend="modulo">
            <span v-for="permiso in grupoPermisos" :key="permiso" :class="colorPorModulo(modulo)"
              class="inline-block mt-1 text-sm font-medium me-2 px-2.5 py-0.5 rounded">
              {{ permiso }}
            </span>
          </fieldset>
        </span>
      </div>
    </div>

  </div>

</template>

<script lang="ts" setup>
import { ref, reactive, onMounted, inject } from 'vue';
import axios from '../../plugins/axios';
import { useRouter } from 'vue-router';
import BreadcrumbDefault from '@/components/Breadcrumbs/BreadcrumbDefault.vue';
import Swal from 'sweetalert2';
import Multiselect from 'vue-multiselect';


const swal = inject('$swal') as typeof Swal;

interface Permission {
  id: number;
  name: string;
}

interface Role {
  name: string;
  permisos: number[];
}

interface Errors {
  name: string;
  permisos: string;
}

const permission = ref<Record<number, Permission>>({}); // Define your permissions object

const router = useRouter();

const role = reactive<Role>({
  name: '',
  permisos: []
});

const errors = reactive<Errors>({
  name: '',
  permisos: ''
});

const dropdownOpen = ref(false);
const selectedPermissions = ref<number[]>([]);

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value;
};

const togglePermission = (id: number) => {
  const index = selectedPermissions.value.indexOf(id);
  if (index > -1) {
    selectedPermissions.value.splice(index, 1);
  } else {
    selectedPermissions.value.push(id);
  }
  role.permisos = selectedPermissions.value;
};

const submit = async () => {
  console.log('role:', role);
  
  try {
    await axios.post('/api/roles', role, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    Swal.fire({
      icon: 'success',
      title: 'Registro Guardado',
      text: 'El rol se ha registrado exitosamente',
      customClass: {
        popup: 'dark:bg-slate-900 dark:text-gray bg-white text-graydark',
        title: 'dark:text-gray text-graydark',
        confirmButton: 'bg-blue-800 rounded-md shadow-sm bg-gray dark:bg-primary/20 dark:text-white',
      },
      didClose: () => {
        router.push('/roles');
      }
    });

    
  } catch (error) {
    console.error('Error al crear rol:', error);
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

const agruparPorModulo = (permisos: number[]) => {
  const grupos: Record<string, string[]> = {};
  permisos.forEach((permisoId) => {
    const permiso = permission.value[permisoId];
    if (permiso) {
      const [modulo] = permiso.name.split("-");
      if (!grupos[modulo]) {
        grupos[modulo] = [];
      }
      grupos[modulo].push(permiso.name);
    }
  });
  return grupos;
};

const colorPorModulo = (modulo: string) => {
  const colores: Record<string, string> = {
    usuarios: "bg-gray dark:bg-primary/20 dark:text-white",
    licencias: "bg-sky-600 text-white",
    docentes: "bg-cyan-400 dark:bg-cyan-800",
    rol: "bg-orange-800  text-white",
    estudiantes: "bg-red-400  text-white",
    clientes: "bg-emerald-400 dark:bg-emerald-800 text-white",
    // Agrega más colores para otros módulos si es necesario
  };
  return colores[modulo] || "bg-gray-200";
};

const goBack = () => {
  router.go(-1);
};

onMounted(async () => {
  try {
    const response = await axios.get('/api/roles/create');
    console.log(response);

    if (response.data.success) {
      const permisos: Permission[] = response.data.data;
      permisos.forEach((permiso) => {
        permission.value[permiso.id] = permiso;
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: response.data.message,
        customClass: {
          popup: 'dark:bg-slate-900 dark:text-gray bg-white text-graydark',
          title: 'dark:text-gray text-graydark',
          confirmButton: 'bg-blue-800 rounded-md shadow-sm bg-gray dark:bg-primary/20 dark:text-white',
        },
      });
    }
  } catch (error) {
    console.error('Error al obtener permisos:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error al obtener permisos',
      text: error.response?.data?.message || 'Ocurrió un error inesperado',
      customClass: {
        popup: 'dark:bg-slate-900 dark:text-gray bg-white text-graydark',
        title: 'dark:text-gray text-graydark',
        confirmButton: 'bg-blue-800 rounded-md shadow-sm bg-gray dark:bg-primary/20 dark:text-white',
      },
    });
  }
});
</script>

<style scoped>
/* Agrega estilos personalizados si es necesario */
</style>
