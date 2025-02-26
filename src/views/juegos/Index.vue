<template>
    <div class="w-full">
        <div class="w-full flex justify-start">
            <breadcrumb-default pageTitle="Juegos"></breadcrumb-default>
        </div>
        <!-- total juegos -->
        <div class="dark:bg-graydark bg-white text-gray-500 p-4 rounded-md shadow-md flex items-center">
            <!-- info -->
            <div class="w-full">
                <h3 class="text-sm font-bold">Total de Código de Juegos Creados</h3>
                <p class="text-lg">{{ totalJuegos }}</p>
            </div>
            <!-- icono -->
            <div class="w-auto flex items-center justify-end">
                <span class="bg-primary/20 shadow-lg p-2 rounded-md">
                    <RocketLaunchIcon class="h-6 w-6 text-primary/40" />
                </span>
            </div>
        </div>

    </div>

    <!-- tabla usuarios -->
    <div class="w-auto mt-6 bg-white dark:bg-boxdark p-2 rounded-md shadow-md">
        <div class="flex flex-wrap justify-between items-center">
            <h2 class="mt-2 px-4 text-base">Código Juegos</h2>
            <a href="/juegos-create"
                class="p-2 hover:scale-105 bg-gray dark:bg-primary/20 dark:text-white rounded-md shadow-md">
                Crear Código de Juego
            </a>
        </div>
        

        <div class="mt-4 px-4 w-full flex flex-wrap justify-between items-center">
            <div class="flex flex-wrap gap-2 mb-2">

                <input v-model="search" @keyup.enter="fetchJuegos" type="text"
                    class="p-2 rounded-md bg-gray dark:bg-graydark placeholder:text-xs shadow-md"
                    placeholder="Buscar por codigo..." />
                <button @click="fetchJuegos" class="p-2 hover:bg-blue-800 bg-boxdark text-white rounded-md shadow-md">
                    Buscar
                </button>
                <button @click="limpiar"
                    class="p-2 hover:scale-105 dark:bg-primary/20 dark:text-white rounded-md shadow-md">
                    Limpiar
                </button>
            </div>

            <select v-model="perPage" @change="fetchJuegos" v-if="totalJuegos > 5"
                class="p-2 rounded-md bg-gray dark:bg-graydark justify-end shadow-md">
                <option :value="5">5</option>
                <option v-if="totalJuegos >= 6" :value="10">10</option>
                <option v-if="totalJuegos >= 11" :value="15">15</option>
                <option v-if="totalJuegos >= 16" :value="20">20</option>
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
                            CÓDIGO
                        </th>
                        <th class="py-2 px-2 font-medium text-black dark:text-white text-left">
                            ESTADO
                        </th>
                        <th class="py-2 px-2 font-medium text-black dark:text-white text-left flex justify-end">
                            ACCIONES
                        </th>


                    </tr>
                </thead>
                <tbody v-if="juegos.length != 0">
                    <tr v-for="(item, index) in juegos" :key="index">
                        <td class="py-3 px-3 whitespace-nowrap text-left">
                            <h5 class="font-medium text-graydark dark:text-gray">
                                {{ index + 1 }}
                            </h5>
                        </td>
                        <td class="py-3 px-3 whitespace-nowrap text-left">
                            <h5 class="font-medium text-graydark dark:text-gray">
                                {{ item.nombre_juego }}
                            </h5>
                        </td>

                        <td class="py-3 px-3 whitespace-nowrap text-left">
                            <h5 class="font-medium text-graydark dark:text-gray">
                                {{ item.cod_juegos }}
                            </h5>
                        </td>

                        <td class="py-3 px-3 whitespace-nowrap text-left">
                            <h5 class="font-medium text-graydark dark:text-gray">
                                <span :class="[
                                    item.estado == 1 ? 'bg-success/40' : 'bg-danger/40',
                                    'px-2 py-1 rounded-md shadow-md'
                                ]">
                                    {{ item.estado ? 'Activo' : 'Bloqueado' }}
                                </span>
                            </h5>
                        </td>

                        <td class="py-3 px-2 gap-2 whitespace-nowrap text-left flex flex-wrap items-center justify-end">
                            <!-- Boton de bloqueado -->
                            <button v-if="item.estado" v-tooltip.bottom="'bloquear'" @click="eliminarRol(item.id)"
                                class="p-2 hover:scale-105 dark:bg-danger/20 bg-danger/40 dark:text-white rounded-md shadow-md flex flex-wrap items-center gap-2">
                                <ArchiveBoxIcon class="h-4 w-4 text-gray" /> Bloquear
                            </button>
                            <!-- Boton de desbloquear -->
                            <button v-if="!item.estado" v-tooltip.bottom="'desbloquear'" @click="aprobarJuego(item.id)"
                                class="p-2 hover:scale-105 dark:bg-success/20 bg-success/40 dark:text-white rounded-md shadow-md flex flex-wrap items-center gap-2">
                                <CheckIcon class="h-4 w-4 text-gray" /> Desbloquear
                            </button>
                        </td>

                    </tr>
                </tbody>
            </table>

            <!-- Paginador -->
            <div class="w-full flex justify-center mt-4" v-if="juegos.length != 0 || totalPages > 1">
                <vue-awesome-paginate :total-items="perPage * totalPages" :items-per-page="perPage" :max-pages-shown="5"
                    v-model="currentPage" @click="changePage" />
            </div>


        </div>
    </div>

    <!-- Modal -->
    <Modal :isOpen="ModalEliminar" @close="closeModal">
        <div class="p-4 bg-white dark:bg-boxdark rounded-md shadow-md">
            <h3 class="text-lg font-bold">Bloquear Juego</h3>
            <p class="text-sm mt-2">¿Estás seguro de eliminar este juego?
            </p>
            <div class="mb-4">
                <p>Al bloquear el juego no podrá usarse como código para presentar el juego al estudiante.</p>
            </div>
            <div class="flex justify-end mt-4 gap-2">
                <button @click="submitEliminar"
                    class="p-2 hover:scale-105 bg-danger/20 dark:bg-danger/40 dark:text-white rounded-md shadow-md">
                    Bloquear
                </button>
                <button @click="ModalEliminar = false"
                    class="p-2 hover:scale-105 bg-gray dark:bg-graydark dark:text-white rounded-md shadow-md">
                    Cancelar
                </button>
            </div>
        </div>
    </Modal>

</template>

<script lang="ts" setup>
import { ref, onMounted, inject } from 'vue';
import { RocketLaunchIcon, ArchiveBoxIcon, CheckIcon } from '@heroicons/vue/24/solid';
import axios from '../../plugins/axios';
import BreadcrumbDefault from '@/components/Breadcrumbs/BreadcrumbDefault.vue';
import Modal from '@/components/Modal.vue';
import Swal from 'sweetalert2';

const swal = inject('$swal') as typeof Swal;


// Simulación de datos
const totalJuegos = ref(0);

//pagiandor y search
const juegos = ref([]);
const search = ref('');
const perPage = ref(5);
const page = ref(1);
const totalPages = ref(1);
const currentPage = ref(1);

//Modal
const ModalEliminar = ref(false);


//idEliminar
const idEliminar = ref(0);


const fetchJuegos = async () => {
    const response = await axios.get('/api/juegos', {
        params: {
            search: search.value,
            per_page: perPage.value,
            page: page.value,
        },
    });
    console.log('juegos obtenidos:', response.data.data);
    console.log('Total de páginas:', response.data.data.last_page);

    juegos.value = response.data.data.data;
    totalPages.value = response.data.data.last_page;
    totalJuegos.value = response.data.data.total;
};

const changePage = (newPage: number) => {
    page.value = newPage;
    fetchJuegos();
};

const limpiar = () => {
    search.value = '';
    fetchJuegos();
};

const eliminarRol = (id: number) => {
    console.log('Eliminar rol:', id);
    idEliminar.value = id;
    ModalEliminar.value = true;
};

const submitEliminar = async () => {

    try {
        const response = await axios.delete(`/api/juegos/${idEliminar.value}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log('rol bloqueado:', response.data);
        swal.fire({
            icon: 'success',
            title: 'Juego bloqueado con éxito',
            text: 'Recurso bloqueado correctamente',
            customClass: {
                popup: 'dark:bg-slate-900 dark:text-gray bg-white text-graydark',
                title: 'dark:text-gray text-graydark',
                confirmButton: 'bg-blue-800 rounded-md shadow-sm bg-gray dark:bg-primary/20 dark:text-white',
            },
            didClose: () => {
                closeModal();
                window.location.reload();
            }

        });

    } catch (error) {
        console.error('Error al bloquear juego:', error);
        swal.fire({
            icon: 'error',
            title: 'Error al bloquear juego',
            html: `
        <p>Ocurrió un error inesperado, vuelva a intentar más tarde</p>`,
            customClass: {
                popup: 'dark:bg-slate-900 dark:text-gray bg-white text-graydark',
                title: 'dark:text-gray text-graydark',
                confirmButton: 'bg-blue-800 rounded-md shadow-sm bg-gray dark:bg-primary/20 dark:text-white',
            },
            didClose: () => {
                closeModal();
            }

        });
    }
};

//aprobar o desbloquear juego
const aprobarJuego = async (idAprobar) => {

    try {
        const response = await axios.patch(`/api/juegos/${idAprobar}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log('rol Desbloqueado:', response.data);
        swal.fire({
            icon: 'success',
            title: 'Juego Desbloqueado con éxito',
            text: 'Recurso Desbloqueado correctamente',
            customClass: {
                popup: 'dark:bg-slate-900 dark:text-gray bg-white text-graydark',
                title: 'dark:text-gray text-graydark',
                confirmButton: 'bg-blue-800 rounded-md shadow-sm bg-gray dark:bg-primary/20 dark:text-white',
            },
            didClose: () => {
                closeModal();
                window.location.reload();
            }

        });

    } catch (error) {
        console.error('Error al Desbloquear juego:', error);
        swal.fire({
            icon: 'error',
            title: 'Error al Desbloquear juego',
            html: `
    <p>Ocurrió un error inesperado, vuelva a intentar más tarde</p>`,
            customClass: {
                popup: 'dark:bg-slate-900 dark:text-gray bg-white text-graydark',
                title: 'dark:text-gray text-graydark',
                confirmButton: 'bg-blue-800 rounded-md shadow-sm bg-gray dark:bg-primary/20 dark:text-white',
            },
            didClose: () => {
                closeModal();
            }

        });
    }
};

const closeModal = () => {
    ModalEliminar.value = false;
    idEliminar.value = 0;

};

onMounted(() => {
    fetchJuegos();
});


</script>

<style></style>