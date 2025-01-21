<template>
  <div class="flex w-full h-screen bg-slate-800">
    <Sidebar :sidebarOpen="sidebarOpen" class="z-100" />

    <div class="relative flex flex-1 flex-col overflow-hidden">
      <Header :sidebarOpen="sidebarOpen" @toggleSidebar="toggleSidebar" />

      <div class="flex-1 overflow-x-hidden dark:bg-black bg-slate-200 z-2">

        <div class="px-6">

          <main class="flex-grow p-4">
            <router-view></router-view>
          </main>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Sidebar from '@/components/Sidebar.vue';
import Header from '@/components/Header.vue';
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const pageTitle = ref(route.meta.title);
const sidebarOpen = ref(false);

watch(route, (newRoute) => {
  pageTitle.value = newRoute.meta.title;
});

const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value;
};

</script>
