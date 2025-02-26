<template>
    <div class="w-full flex justify-start">
        <breadcrumb-default pageTitle="Meta Curricular juegos" pageSubtitle="Parámetros" path="parametros"></breadcrumb-default>
    </div>
    <div class="w-full flex flex-wrap items-center">
        <!-- total clientes -->
        <div class="w-full dark:bg-graydark bg-white text-gray-500 p-4 rounded-md shadow-md flex items-center h-full">
            <!-- info -->
            <div class="w-full">
                <h3 class="text-sm font-bold">Total de parámetros</h3>
                <p class="text-lg">{{ totalParametros }}</p>
            </div>
            <!-- icono -->
            <div class="w-auto flex items-center justify-end">
                <span class="bg-danger/20 shadow-lg p-2 rounded-md">
                    <AdjustmentsHorizontalIcon class="h-6 w-6 text-danger/40" />
                </span>
            </div>
        </div>
    </div>

    <!-- tabla parametro -->
    <div class="w-full mt-6 bg-white dark:bg-boxdark p-2 rounded-md shadow-md">
        <div class="flex flex-wrap justify-between items-center pe-2">
            <h2 class="mt-2 px-4 text-base">Meta Curricular juegos</h2>
            <button @click="openAddModal"
                class="p-2 hover:scale-105 bg-gray dark:bg-primary/20 dark:text-white rounded-md shadow-md">
                + Añadir
            </button>
        </div>
        <div class="mt-4 px-4 w-full flex flex-wrap justify-between items-center">
            <div class="flex flex-wrap gap-2 mb-2">
                <input v-model="search" @keyup.enter="resetPagination"
                    class="p-2 rounded-md bg-gray dark:bg-graydark placeholder:text-xs shadow-md"
                    placeholder="Buscar por nombre o código..." />
                <button @click="resetPagination"
                    class="p-2 hover:bg-blue-800 bg-boxdark text-white rounded-md shadow-md">
                    Buscar
                </button>
                <button @click="limpiar"
                    class="p-2 hover:scale-105 dark:bg-primary/20 dark:text-white rounded-md shadow-md">
                    Limpiar
                </button>
            </div>
            <div class="flex flex-wrap gap-4">
                <select v-model="estado" @change="resetPagination"
                    class="p-2 rounded-md bg-gray dark:bg-graydark justify-end shadow-md">
                    <option value="">Todos</option>
                    <option :value="1">Activo</option>
                    <option :value="0">Bloqueado</option>

                </select>

                <select v-model="perPage" @change="resetPagination"
                    class="p-2 rounded-md bg-gray dark:bg-graydark justify-end shadow-md">
                    <option :value="5">5</option>
                    <option v-if="totalParametros >= 6" :value="10">10</option>
                    <option v-if="totalParametros >= 11" :value="15">15</option>
                    <option v-if="totalParametros >= 16" :value="20">20</option>
                </select>
            </div>
        </div>
        <div class="overflow-x-auto mt-4">
            <table class="table-auto w-full bg-white dark:bg-boxdark text-sm">
                <thead>
                    <tr class="bg-gray-2 text-left dark:bg-meta-4">
                        <th class="py-2 px-2 font-medium text-black dark:text-white text-left">ID</th>
                        <th class="py-2 px-2 font-medium text-black dark:text-white text-left">NOMBRE</th>
                        <th class="py-2 px-2 font-medium text-black dark:text-white text-left">CODIGO</th>
                        <th class="py-2 px-2 font-medium text-black dark:text-white text-left">ESTADO</th>
                        <th class="py-2 px-2 font-medium text-black dark:text-white text-left">ACCIONES</th>
                    </tr>
                </thead>
                <tbody v-if="parametro.length != 0">
                    <tr v-for="(item, index) in parametro" :key="index" class="text-sm">
                        <td class="py-3 px-3 whitespace-nowrap text-left">
                            <h5 class="font-medium text-graydark dark:text-gray text-sm">{{ index + 1 }}</h5>
                        </td>
                        <td class="py-3 px-3 whitespace-normal break-words text-left">
                            <h5 class="font-medium text-graydark dark:text-gray text-xs">{{ item.nombre }}</h5>
                        </td>
                        <td class="py-3 px-3 whitespace-nowrap text-left">
                            <h5 class="font-medium text-graydark dark:text-gray text-xs">{{ item.codigo }}</h5>
                        </td>
                        <td class="py-3 px-3 whitespace-normal break-words text-left">
                            <h5 class="font-medium text-graydark dark:text-gray text-xs">
                                <span
                                    :class="[item.estado == 1 ? 'bg-success/40' : 'bg-danger/40', 'px-2 py-1 rounded-md shadow-md']">
                                    {{ item.estado ? 'Activo' : 'Bloqueado' }}
                                </span>
                            </h5>
                        </td>
                        <td class="py-3 px-2 gap-2 whitespace-nowrap text-left flex flex-wrap items-center">
                            <button v-if="item.estado" v-tooltip.left="'Bloquear'" @click="eliminarParametro(item.id)"
                                class="p-2 hover:scale-105 dark:bg-danger/20 bg-danger/40 dark:text-white rounded-md shadow-md flex flex-wrap items-center gap-2">
                                <ArchiveBoxIcon class="h-4 w-4 text-gray" /> Bloquear
                            </button>
                            <button v-else v-tooltip.left="'Desbloquear'" @click="DesbloquearParametro(item.id)"
                                class="p-2 hover:scale-105 dark:bg-success/20 bg-success/40 dark:text-white rounded-md shadow-md flex flex-wrap items-center gap-2">
                                <CheckIcon class="h-4 w-4 text-gray" /> Desbloquear
                            </button>
                        </td>
                    </tr>
                </tbody>
                <tbody v-else class="w-full">
                    
                    <tr>
                        <td class="w-auto"></td>
                        <td class="w-auto"></td>
                        <td class="w-auto flex justify-center items-center py-5 "><em class="sm:text-xl">No hay registros</em></td>
                        <td class="w-auto"></td>
                        <td class="w-auto"></td>
                    </tr>
                    
                </tbody>
            </table>

            <!-- Paginador -->
            <div class="w-full flex justify-center mt-4" v-if="parametro.length != 0 || totalPages > 1">
                <vue-awesome-paginate :total-items="perPage * totalPages" :items-per-page="perPage" :max-pages-shown="5"
                    v-model="currentPage" @click="changePage" />
            </div>
        </div>
    </div>

    <!-- Modal para añadir nuevo parámetro -->
    <Modal :isOpen="addModalOpen" @close="closeAddModal">
        <div class="p-4 bg-white dark:bg-boxdark rounded-md shadow-md">
            <h3 class="text-lg font-bold">Añadir nuevo parámetro</h3>
            <div class="mt-4">
                <label for="nombre" class="block text-sm font-medium text-gray-700 mb-2">Nombre</label>
                <input id="nombre" v-model="newParametro.nombre" type="text"
                    class="p-2 rounded-md bg-gray dark:bg-graydark placeholder:text-xs shadow-md w-full" />
            </div>
            <div class="mt-4">
                <label for="codigo" class="block text-sm font-medium text-gray-700 mb-2">Código</label>
                <input id="codigo" v-model="newParametro.codigo" type="text"
                    class="p-2 rounded-md bg-gray dark:bg-graydark placeholder:text-xs shadow-md w-full" />
            </div>
            <div class="flex justify-end mt-4 gap-2">
                <button @click="submitAddParametro"
                    class="p-2 hover:scale-105 bg-success/20 dark:bg-success/40 dark:text-white rounded-md shadow-md">
                    Añadir
                </button>
                <button @click="closeAddModal"
                    class="p-2 hover:scale-105 bg-gray dark:bg-graydark dark:text-white rounded-md shadow-md">
                    Cancelar
                </button>
            </div>
            <div v-if="validationMessage" class="mt-4 text-red-500">
                {{ validationMessage }}
            </div>
        </div>
    </Modal>

    <!-- Modal para eliminar -->
    <Modal :isOpen="ModalEliminar" @close="closeModal">
        <div class="p-4 bg-white dark:bg-boxdark rounded-md shadow-md">
            <h3 class="text-lg font-bold">Bloquear parámetro</h3>
            <p class="text-sm mt-2">¿Estás seguro de bloquear este parámetro?</p>
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
import { ArchiveBoxIcon, CheckIcon, AdjustmentsHorizontalIcon } from '@heroicons/vue/24/solid';
import axios from '../../../plugins/axios';
import Modal from '@/components/Modal.vue';
import Swal from 'sweetalert2';
import BreadcrumbDefault from '@/components/Breadcrumbs/BreadcrumbDefault.vue';

const swal = inject('$swal') as typeof Swal;

// Simulación de datos
const totalParametros = ref(0);

// Modal
const ModalEliminar = ref(false);
const addModalOpen = ref(false);
//id a eliminar
const idEliminar = ref(0);

//paginador y search
const parametro = ref([]);
const search = ref('');
const estado = ref('');
const perPage = ref(5);
const page = ref(1);
const totalPages = ref(1);
const currentPage = ref(1);

// Nuevo parámetro
const newParametro = ref({
    nombre: '',
    codigo: ''
});
const validationMessage = ref('');

// Función para abrir el modal de añadir
const openAddModal = () => {
    addModalOpen.value = true;
};

// Función para cerrar el modal de añadir
const closeAddModal = () => {
    addModalOpen.value = false;
    newParametro.value = { nombre: '', codigo: '' };
    validationMessage.value = '';
};

const fetchParametro = async () => {
    
    const response = await axios.get('/api/parametros/metas-curriculares-juegos', {
        params: {
            search: search.value,
            estado: estado.value,
            per_page: perPage.value,
            page: page.value,
        },
    });
    console.log('parametro obtenidos:', response.data.data);
    console.log('Total de páginas:', response.data.data.last_page);

    parametro.value = response.data.data.data;
    totalParametros.value = response.data.data.total;
    totalPages.value = response.data.data.last_page;
};

const changePage = (newPage: number) => {
    page.value = newPage;
    fetchParametro();
};

const resetPagination = () => {
  page.value = 1;
  currentPage.value = 1;
  fetchParametro();
};

const limpiar = () => {
    
    search.value = '';
    estado.value = '';
    resetPagination();
};

const eliminarParametro = (id: number) => {
    console.log('Eliminar cliente:', id);
    idEliminar.value = id;
    ModalEliminar.value = true;
};

const submitEliminar = async () => {
    try {
        const response = await axios.delete(`/api/parametros/metas-curriculares-juegos/${idEliminar.value}`);
        console.log('Parámetro eliminado:', response.data);
        swal.fire({
            icon: 'success',
            title: 'Parámetro bloqueado con éxito',
            html: `
        <p>${response.data.message}</p>
        <p><strong>Parámetro:</strong> ${response.data.data.nombre} - ${response.data.data.codigo}</p>`,
            customClass: {
                popup: 'dark:bg-slate-900 dark:text-gray bg-white text-graydark',
                title: 'dark:text-gray text-graydark',
                confirmButton: 'bg-blue-800 rounded-md shadow-sm bg-gray dark:bg-primary/20 dark:text-white',
            },
            didClose: () => {
                ModalEliminar.value = false;
                idEliminar.value = 0;
                window.location.reload();
            }
        });
    } catch (error) {
        console.error('Error al eliminar parámetro:', error);
        swal.fire({
            icon: 'error',
            title: 'Error al eliminar parámetro',
            html: `
        <p>Ocurrió un error inesperado, vuelva a intentar más tarde</p>`,
            customClass: {
                popup: 'dark:bg-slate-900 dark:text-gray bg-white text-graydark',
                title: 'dark:text-gray text-graydark',
                confirmButton: 'bg-blue-800 rounded-md shadow-sm bg-gray dark:bg-primary/20 dark:text-white',
            },
            didClose: () => {
                ModalEliminar.value = false;
                idEliminar.value = 0;
            }
        });
    }
};

const DesbloquearParametro = async (idDesbloq) => {
    try {
        const response = await axios.put(`/api/parametros/metas-curriculares-juegos/unlock/${idDesbloq}`);
        console.log('Parámetro recuperado:', response.data);
        swal.fire({
            icon: 'success',
            title: 'Parámetro Desbloqueado con éxito',
            html: `
        <p>${response.data.message}</p>
        <p><strong>Parámetro:</strong> ${response.data.data.nombre} - ${response.data.data.codigo}</p>`,
            customClass: {
                popup: 'dark:bg-slate-900 dark:text-gray bg-white text-graydark',
                title: 'dark:text-gray text-graydark',
                confirmButton: 'bg-blue-800 rounded-md shadow-sm bg-gray dark:bg-primary/20 dark:text-white',
            },
            didClose: () => {
                ModalEliminar.value = false;
                idEliminar.value = 0;
                window.location.reload();
            }
        });
    } catch (error) {
        console.error('Error al desbloquear parámetro:', error);
        swal.fire({
            icon: 'error',
            title: 'Error al desbloquear parámetro',
            html: `
        <p>Ocurrió un error inesperado, vuelva a intentar más tarde</p>`,
            customClass: {
                popup: 'dark:bg-slate-900 dark:text-gray bg-white text-graydark',
                title: 'dark:text-gray text-graydark',
                confirmButton: 'bg-blue-800 rounded-md shadow-sm bg-gray dark:bg-primary/20 dark:text-white',
            },
            didClose: () => {
                ModalEliminar.value = false;
                idEliminar.value = 0;
            }
        });
    }
};

const submitAddParametro = async () => {
    // Validar que el código no se repita
    const existingParametro = parametro.value.find(item => item.codigo === newParametro.value.codigo);
    if (existingParametro) {
        validationMessage.value = 'El código ya existe.';
        return;
    }

    try {
        const response = await axios.post('/api/parametros/metas-curriculares-juegos', newParametro.value, {
            headers: {
                'Content-Type': 'application/json',
                accept: 'application/json',
            },
        });
        console.log('Parámetro añadido:', response.data);
        swal.fire({
            icon: 'success',
            title: 'Parámetro añadido con éxito',
            html: `
        <p>${response.data.message}</p>
        <p><strong>Parámetro:</strong> ${response.data.data.nombre}</p>`,
            customClass: {
                popup: 'dark:bg-slate-900 dark:text-gray bg-white text-graydark',
                title: 'dark:text-gray text-graydark',
                confirmButton: 'bg-blue-800 rounded-md shadow-sm bg-gray dark:bg-primary/20 dark:text-white',
            },
            didClose: () => {
                closeAddModal();
                fetchParametro();
            }
        });
    } catch (error) {
        console.error('Error al añadir parámetro:', error);
        swal.fire({
            icon: 'error',
            title: 'Error al añadir parámetro',
            html: `
        <p>Ocurrió un error inesperado, vuelva a intentar más tarde</p>`,
            customClass: {
                popup: 'dark:bg-slate-900 dark:text-gray bg-white text-graydark',
                title: 'dark:text-gray text-graydark',
                confirmButton: 'bg-blue-800 rounded-md shadow-sm bg-gray dark:bg-primary/20 dark:text-white',
            },
            didClose: () => {
                closeAddModal();
            }
        });
    }
};

const closeModal = () => {
    ModalEliminar.value = false;
    idEliminar.value = 0;
};

onMounted(() => {
    fetchParametro();
});
</script>

<style></style>