<template>
  <div
    :class="['md:relative z-100 flex flex-col w-64 h-full overflow-y-auto bg-dark-2 dark:bg-boxdark shadow-lg gap-2 px-6 py-2', { 'hidden': !sidebarOpen, 'translate-x-0': sidebarOpen, 'md:block': true }]">
    <div class="flex items-center justify-center h-16">
      <router-link to="/" class="flex items-center">
        <img src="../assets/logo/iconoAZWhite.png" alt="Logo" class="w-1/4 me-2" />
        <h3 class="text-white text-title-sm">Licencia Master</h3>
      </router-link>
    </div>
    <nav class="flex-1 mt-2 text-[14px]">
      <!-- MENU -->
      <h3 class="mb-1 ml-4 text-xs font-medium text-bodydark2 uppercase">
        Menu
      </h3>
      <!-- Dsshboard y usuarios -->
      <ul class="">
        <!-- dashboard -->
        <li>
          <router-link to="/" class="flex items-center gap-2 ps-4 py-1 text-white hover:!bg-slate-600"
            :class="{ '!bg-slate-600': isActiveDashboard('/') }">
            <HomeModernIcon class="h-4 w-4" /> Dashboard
          </router-link>
        </li>
        <!-- usuarios -->
        <li v-if="isAuthenticated && user.rol == 'Administrador'">
          <router-link to="/usuarios" class="flex items-center gap-2 ps-4 px-4 py-1 text-white hover:!bg-slate-600"
            :class="{ '!bg-slate-600': isActive('/usuarios') }">
            <UsersIcon class="h-4 w-4" /> Usuarios
          </router-link>
        </li>
      </ul>
      <!-- GESTION REGISTROS -->
      <h3 v-if="isAuthenticated && user.rol != 'Estudiante'"
        class="mt-2 mb-1 ml-4 text-xs font-medium text-bodydark2 uppercase">
        Gestion de registros
      </h3>
      <!-- Clientes, docentes, estudiantes -->
      <ul class="">
        <!-- clientes -->
        <li v-if="isAuthenticated && user.rol == 'Administrador'">
          <router-link to="/clientes" class="flex items-center gap-2 ps-4 px-4 py-1 text-white hover:!bg-slate-600"
            :class="{ '!bg-slate-600': isActive('/clientes') }">
            <BuildingLibraryIcon class="h-4 w-4" /> Clientes
          </router-link>
        </li>
        <!-- docentes -->
        <li v-if="isAuthenticated && user.rol == 'Administrador' || user.rol == 'Docente'">
          <router-link to="/docentes" class="flex items-center gap-2 ps-4 px-4 py-1 text-white hover:!bg-slate-600"
            :class="{ '!bg-slate-600': isActive('/docentes') }">
            <BriefcaseIcon class="h-4 w-4" /> Docentes
          </router-link>
        </li>
        <!--  estudiantes -->
        <li v-if="isAuthenticated && user.rol != 'Estudiante'">
          <router-link to="/estudiantes" class="flex items-center gap-2 ps-4 px-4 py-1 text-white hover:!bg-slate-600"
            :class="{ '!bg-slate-600': isActive('/estudiantes') }">
            <AcademicCapIcon class="h-4 w-4" /> Estudiantes
          </router-link>
        </li>
      </ul>
      <!-- GESTION GRUPOS -->
      <h3 v-if="isAuthenticated && user.rol != 'Estudiante'"
        class="mt-2 mb-1 ml-4 text-xs font-medium text-bodydark2 uppercase">
        Gestion de grupos
      </h3>
      <!-- grupos -->
      <ul class="">
        <!-- grupos -->
        <li v-if="isAuthenticated && user.rol != 'Estudiante'">
          <router-link to="/grupos" class="flex items-center gap-2 ps-4 px-4 py-1 text-white hover:!bg-slate-600"
            :class="{ '!bg-slate-600': isActive('/grupos') }">
            <UserGroupIcon class="h-4 w-4" /> Grupos
          </router-link>
        </li>
        
      </ul>
      <!-- GESTION DE LICENCIAS -->
      <h3 v-if="isAuthenticated && user.rol == 'Administrador'"
        class="mt-2 mb-1 ml-4 text-xs font-medium text-bodydark2 uppercase">
        Gestión de licencias
      </h3>
      <!-- Clientes, docentes, estudiantes -->
      <ul class="">
        <!-- licencias -->
        <li v-if="isAuthenticated && user.rol == 'Administrador'">
          <router-link to="/licencias" class="flex items-center gap-2 ps-4 px-4 py-1 text-white hover:!bg-slate-600"
            :class="{ '!bg-slate-600': isActive('/licencias') }">
            <CreditCardIcon class="h-4 w-4" /> Licencias
          </router-link>
        </li>
        <!-- tipo licencias -->
        <li v-if="isAuthenticated && user.rol == 'Administrador'">
          <router-link to="/tipo-licencias" class="flex items-center gap-2 ps-4 px-4 py-1 text-white hover:!bg-slate-600"
            :class="{ '!bg-slate-600': isActive('/tipo-licencias') }">
            <RectangleGroupIcon class="h-4 w-4" /> Tipo licencias
          </router-link>
        </li>
      </ul>
      
      <!-- GESTION JUEGOS -->
      <h3 v-if="isAuthenticated && user.rol == 'Administrador'"
        class="mt-2 mb-1 ml-4 text-xs font-medium text-bodydark2 uppercase">
        Gestion de juegos
      </h3>
      <!-- Clientes, docentes, estudiantes -->
      <ul class="">
        <!-- juegos -->
        <li v-if="isAuthenticated && user.rol == 'Administrador'">
          <router-link to="/juegos" class="flex items-center gap-2 ps-4 px-4 py-1 text-white hover:!bg-slate-600"
            :class="{ '!bg-slate-600': isActive('/juegos') }">
            <RocketLaunchIcon class="h-4 w-4" /> Cod juegos
          </router-link>
        </li>
        <!-- parametros -->
        <li v-if="isAuthenticated && user.rol == 'Administrador'">
          <router-link to="/parametros" class="flex items-center gap-2 ps-4 px-4 py-1 text-white hover:!bg-slate-600"
            :class="{ '!bg-slate-600': isActive('/parametros') }">
            <AdjustmentsHorizontalIcon class="h-4 w-4" /> Parámetros
          </router-link>
        </li>

      </ul>
      <!-- GESTION ROLES -->
      <h3 v-if="isAuthenticated && user.rol == 'Administrador'"
        class="mt-2 mb-1 ml-4 text-xs font-medium text-bodydark2 uppercase">
        Gestion de roles
      </h3>
      <!-- Clientes, docentes, estudiantes -->
      <ul class="">
        <!-- Roles -->
        <li v-if="isAuthenticated && user.rol == 'Administrador'">
          <router-link to="/roles" class="flex items-center gap-2 ps-4 px-4 py-1 text-white hover:!bg-slate-600"
            :class="{ '!bg-slate-600': isActive('/roles') }">
            <CubeTransparentIcon class="h-4 w-4" /> Roles
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
import { HomeModernIcon, UsersIcon, BuildingLibraryIcon, BriefcaseIcon, AcademicCapIcon, UserGroupIcon, CubeTransparentIcon, RocketLaunchIcon, AdjustmentsHorizontalIcon, CreditCardIcon, RectangleGroupIcon } from '@heroicons/vue/24/solid';

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
