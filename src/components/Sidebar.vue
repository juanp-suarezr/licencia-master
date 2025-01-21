<template>
  <div
    :class="['md:relative z-100 flex flex-col w-64 h-full bg-dark-2 dark:bg-boxdark shadow-lg gap-2 px-6 py-2', { 'hidden': !sidebarOpen, 'translate-x-0': sidebarOpen, 'md:block': true }]">
    <div class="flex items-center justify-center h-16">
      <router-link to="/" class="flex items-center">
        <img src="../assets/logo/iconoAZWhite.png" alt="Logo" class="w-1/4 me-2" />
        <h3 class="text-white text-title-sm">Licencia Master</h3>
      </router-link>
    </div>
    <nav class="flex-1 overflow-y-auto mt-6">
      <h3 class="mb-2 ml-4 text-sm font-medium text-bodydark2 uppercase">
        Menu
      </h3>
      <ul class="space-y-2">
        <li>
          <router-link to="/" class="block px-4 py-2 text-white hover:!bg-slate-600"
            :class="{ '!bg-slate-600': isActiveDashboard('/') }">
            Dashboard
          </router-link>
        </li>
        <li v-if="isAuthenticated && user.rol == 'Administrador'">
          <router-link to="/usuarios" class="block px-4 py-2 text-white hover:!bg-slate-600"
            :class="{ '!bg-slate-600': isActive('/usuarios') }">
            Usuarios
          </router-link>
        </li>
      </ul>
      <h3 class="mt-4 mb-2 ml-4 text-sm font-medium text-bodydark2 uppercase">
        Gestion de registros
      </h3>
      <ul>
      <li>
        <router-link to="/clientes" class="block px-4 py-2 text-white hover:!bg-slate-600"
          :class="{ '!bg-slate-600': isActive('/clientes')  }">
          Clientes
        </router-link>
      </li>
      </ul>
    </nav>
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router';
import { useUserStore } from '@/store/auth';
import { storeToRefs } from 'pinia';
import { UserGroupIcon, UserIcon } from '@heroicons/vue/24/solid';

// Usar el store de usuarios
const userStore = useUserStore();
const { isAuthenticated, user, error_user } = storeToRefs(userStore);

// Acceder a la ruta actual
const route = useRoute();

//funcion dashboard
const isActiveDashboard = (path: string) => route.path === path;

// Función para verificar si la ruta es activa o pertenece a un grupo de rutas
const isActive = (path: string) => route.path.startsWith(path)

// Props definidas directamente en script setup
defineProps<{
  sidebarOpen: boolean;
}>();
</script>


<style scoped></style>
