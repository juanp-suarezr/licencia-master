<template>
  <div v-if="isOpen" class="modal">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps({
  isOpen: Boolean,
})
</script>

<style scoped>
/* Modal styles */
</style>
