<template>
  <header
    class="z-100 bg-gray dark:bg-boxdark shadow-md border-b-2 border-slate-600 dark:border-graydark dark:text-white text-graydark p-4 flex justify-between md:justify-end items-center w-full md:w-auto md:gap-4">
    <button @click="toggleSidebar" class="dark:text-white text-graydark focus:outline-none md:hidden">
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
      </svg>
    </button>
    <DarkModeSwitcher />
    <div class="relative my-auto items-center">

      <button @click="toggleDropdown" class="dark:text-white text-graydark focus:outline-none">

        <Avatar class="w-16 h-16 bg-[#025db2] p-1 dark:hidden" :image="userWhite" shape="circle" />
        <Avatar class="w-16 h-16 dark:bg-gray p-1 hidden dark:block" :image="userIcon" shape="circle" />
      </button>
      <div v-if="dropdownOpen"
        class="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-md shadow-lg py-1 z-100">
        <div class="flex gap-2 px-4 py-2 items-center border-b-2 dark:border-slate-600 border-gray">
          <Avatar class="w-16 h-16 bg-[#025db2] p-1 dark:hidden" :image="userWhite" shape="circle" />
          <Avatar class="w-16 h-16 dark:bg-gray p-1 hidden dark:block" :image="userIcon" shape="circle" />
          <div class="dark:text-white text-graydark flex flex-col items-center">
            <p v-if="isAuthenticated">{{ user?.name }}</p>
            <p class="text-xs" v-if="isAuthenticated">{{ user?.rol }}</p>
          </div>
        </div>
        <a href="#" @click="logout"
          class="block px-4 py-2 text-sm dark:text-white text-graydark hover:bg-gray-100 hover:text-gray-800">Cerrar
          sesión</a>
      </div>
    </div>
  </header>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { defineProps, defineEmits } from 'vue';
import Avatar from 'primevue/avatar';
import userIcon from '@/assets/users/user.png';
import userWhite from '@/assets/users/userWhite.png';
import DarkModeSwitcher from '../components/Header/DarkModeSwitcher.vue'

import { useUserStore } from '@/store/auth'
import { storeToRefs } from 'pinia';

const userStore = useUserStore()
const { isAuthenticated, user, error_user } = storeToRefs(userStore);
console.log(user.value);


const props = defineProps({
  sidebarOpen: Boolean,
});

const emit = defineEmits(['toggleSidebar']);

const toggleSidebar = () => {
  emit('toggleSidebar');
};

const dropdownOpen = ref(false);

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value;
};

const logout = async () => {
  try {
    // Lógica para enviar las credenciales al almacén de Pinia para autenticación
    await userStore.logout()
    console.log('Logout successful');

    window.location.href = '/login';
  } catch (error) {
    // Manejo de errores

    console.log(error)
  } finally {

  }


};
</script>

<style scoped>
/* Asegúrate de que el dropdown tenga un fondo sólido */
</style>
