<template>
    <div class="w-full">
        <div class="w-full flex justify-start">
            <breadcrumb-default pageTitle="Parámetros"></breadcrumb-default>
        </div>

    </div>

    <!-- tabla usuarios -->
    <div class="w-auto mt-6 bg-white dark:bg-boxdark p-2 rounded-md shadow-md">

        <div class="mt-2 w-full flex flex-wrap justify-between items-center pe-2">
            <h2 class="px-4 text-base">Parámetros</h2>
            <select v-model="perPage" @change="updatePagination" v-if="totalParametros > 6"
                class="p-2 rounded-md bg-gray dark:bg-graydark justify-end shadow-md">
                <option :value="6">6</option>
                <option v-if="totalParametros >= 10" :value="10">10</option>
                <option v-if="totalParametros >= 15" :value="15">15</option>
                <option v-if="totalParametros >= 20" :value="20">20</option>
            </select>

        </div>
        <div class="overflow-x-auto mt-4">
            <table class="table-auto w-full bg-white dark:bg-boxdark text-sm">
                <thead>
                    <tr class="bg-gray-2 text-left dark:bg-meta-4">

                        <th class="py-2 px-2 font-medium text-black dark:text-white text-left">
                            ID
                        </th>
                        <th class="py-2 px-2 font-medium text-black dark:text-white text-left">
                            NOMBRE
                        </th>
                        <th class="py-2 px-2 font-medium text-black dark:text-white text-left">
                            CANTIDAD
                        </th>
                        <th class="py-2 px-2 font-medium text-black dark:text-white text-left flex justify-end">
                            ACCIONES
                        </th>


                    </tr>
                </thead>
                <tbody v-if="paginatedParametros.length != 0">
                    <tr v-for="(item, index) in paginatedParametros" :key="index">
                        <td class="py-3 px-3 whitespace-nowrap text-left">
                            <h5 class="font-medium text-graydark dark:text-gray">
                                {{ index + 1 + (currentPage - 1) * perPage }}
                            </h5>
                        </td>
                        <td class="py-3 px-3 whitespace-nowrap text-left">
                            <h5 class="font-medium text-graydark dark:text-gray">
                                {{ item.table }}
                            </h5>
                        </td>

                        <td class="py-3 px-3 whitespace-nowrap text-left">
                            <h5 class="font-medium text-graydark dark:text-gray">
                                {{ item.count }}
                            </h5>
                        </td>


                        <td class="py-3 px-2 gap-2 whitespace-nowrap text-left flex flex-wrap items-center justify-end">

                            <!-- Boton de desbloquear -->
                            <a v-tooltip.left="'Ver detalles'" :href="'/'+item.path"
                                class="p-2 hover:scale-105 dark:bg-success/20 bg-success/40 dark:text-white rounded-md shadow-md flex flex-wrap items-center gap-2">
                                <EyeIcon class="h-4 w-4 text-gray" /> Ver detalles
                            </a>
                        </td>

                    </tr>
                </tbody>
            </table>

            <!-- Paginador -->
            <div class="w-full flex justify-center mt-4" v-if="paginatedParametros.length != 0 || totalPages > 1">
                <vue-awesome-paginate :total-items="totalParametros" :items-per-page="perPage" :max-pages-shown="5"
                    v-model="currentPage" @click="changePage" />
            </div>


        </div>
    </div>


</template>

<script lang="ts" setup>
import { ref, onMounted, inject, computed } from 'vue';
import { EyeIcon } from '@heroicons/vue/24/solid';
import axios from '../../plugins/axios';
import BreadcrumbDefault from '@/components/Breadcrumbs/BreadcrumbDefault.vue';



// Simulación de datos
const totalParametros = ref(0);

//paginador y search
const parametros = ref([]);
const perPage = ref(6);
const currentPage = ref(1);
const totalPages = ref(1);



const fetchParametros = async () => {
    const response = await axios.get('/api/parametros');
    console.log('Parametros obtenidos:', response.data.data);

    parametros.value = response.data.data;
    totalParametros.value = response.data.data.length;
    updatePagination();
};

const updatePagination = () => {
    totalPages.value = Math.ceil(totalParametros.value / perPage.value);
};

const paginatedParametros = computed(() => {
    const start = (currentPage.value - 1) * perPage.value;
    const end = start + perPage.value;
    return parametros.value.slice(start, end);
});

const changePage = (newPage: number) => {
    currentPage.value = newPage;
    updatePagination();
};


onMounted(() => {
    fetchParametros();
});


</script>

<style></style>