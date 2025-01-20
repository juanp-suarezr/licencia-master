<template>
  <div :class="['md:relative z-100 flex flex-col w-64 h-full bg-dark-2 dark:bg-boxdark shadow-lg gap-2 px-6 py-2', { 'hidden': !sidebarOpen, 'translate-x-0': sidebarOpen, 'md:block': true }]">
    <div class="flex items-center justify-center h-16">
      <router-link to="/" class="flex items-center">
        <img src="../assets/logo/iconoAZWhite.png" alt="Logo" class="w-1/4 me-2" />
        <h3 class="text-white text-title-sm">Licencia Master</h3>
      </router-link>
    </div>
    <nav class="flex-1 overflow-y-auto mt-6">
      <h3 class="mb-4 ml-4 text-sm font-medium text-bodydark2 uppercase">
        Menu
      </h3>
      <ul class="space-y-2">
        <li>
          <router-link to="/" class="block px-4 py-2 text-white hover:!bg-slate-600" :class="{ '!bg-slate-600': isActive('/') }">
            Dashboard
          </router-link>
        </li>
        <li>
          <router-link to="/some-other-route" class="block px-4 py-2 text-white hover:!bg-slate-600" :class="{ '!bg-slate-600': isActive('/some-other-route') }">
            Otra Ruta
          </router-link>
        </li>
        <li>
          <router-link to="/settings" class="block px-4 py-2 text-white hover:!bg-slate-600" :class="{ '!bg-slate-600': isActive('/settings') }">
            Configuración
          </router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'Sidebar',
  props: {
    sidebarOpen: {
      type: Boolean,
      required: true,
    },
  },
  setup() {
    const route = useRoute();

    const isActive = (path: string) => route.path === path;

    return {
      isActive,
    };
  },
});
</script>

<style scoped></style>
