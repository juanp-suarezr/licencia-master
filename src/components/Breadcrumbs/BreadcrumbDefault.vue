<script setup lang="ts">

interface Props {
  pageTitle: string;
  pageSubtitle?: string;
  path?: string;
}

const props = defineProps<Props>();
console.log(props);

</script>

<template>
    <div class="mb-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
       
        <nav>
            <ol class="flex items-center gap-2">
                <li>
                    <router-link class="font-medium" to="/"> Dashboard / </router-link>
                    <router-link class="font-medium" :to="'/'+props.path" v-if="props.pageSubtitle"> {{props.pageSubtitle}} / </router-link>
                </li>
                <li class="font-medium text-primary">{{ props.pageTitle }}</li>
            </ol>
        </nav>
    </div>
</template>
