<template>
  <div class="flex items-center justify-center h-screen w-screen overflow-x-hidden py-12">
    <div class="flex flex-col justify-center items-center w-3/4 md:flex-row md:gap-6 px-6 md:px-12 shadow-md dark:bg-boxdark bg-gray-200 h-full border-12 border-stroke dark:border-strokedark">
      <!-- Logo Section -->
      <div class="flex items-center justify-center md:w-1/2 md:border-r-2 border-stroke dark:border-strokedark h-full">
        <img src="../assets/logo/aplacetolearn.png" alt="Logo" class="w-40 h-40 object-contain dark:block hidden" />
        <img src="../assets/logo/aplacetolearn.png" alt="Logo" class="w-40 h-40 object-contain dark:hidden" />
      </div>
      <!-- Login Section -->
      <div class="md:w-1/2">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script lang="ts">

</script>

<style scoped>
/* Add any additional custom styles here */
</style>
