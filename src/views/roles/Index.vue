<template>
    <div class="w-full">
        <div class="w-full flex justify-start">
            <breadcrumb-default pageTitle="Roles"></breadcrumb-default>
        </div>
        <!-- total roles -->
        <div class="dark:bg-graydark bg-white text-gray-500 p-4 rounded-md shadow-md flex items-center">
            <!-- info -->
            <div class="w-full">
                <h3 class="text-sm font-bold">Total de Roles</h3>
                <p class="text-lg">{{ totalRoles }}</p>
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
        <h2 class="mt-2 px-4 text-base">Roles</h2>
        <div class="mt-4 px-4 w-full flex flex-wrap justify-between items-center">
            <div class="flex flex-wrap gap-2 mb-2">

                <input v-model="search" @keyup.enter="fetchRoles" type="text"
                    class="p-2 rounded-md bg-gray dark:bg-graydark placeholder:text-xs shadow-md"
                    placeholder="Buscar usuarios..." />
                <button @click="fetchRoles" class="p-2 hover:bg-blue-800 bg-boxdark text-white rounded-md shadow-md">
                    Buscar
                </button>
                <button @click="limpiar"
                    class="p-2 hover:scale-105 dark:bg-primary/20 dark:text-white rounded-md shadow-md">
                    Limpiar
                </button>
            </div>
            <a href="/roles-create"
                class="p-2 hover:scale-105 bg-gray dark:bg-primary/20 dark:text-white rounded-md shadow-md">
                Nuevo Rol
            </a>
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
                        <th class="py-2 px-2 font-medium text-black dark:text-white text-left flex justify-end">
                            ACCIONES
                        </th>


                    </tr>
                </thead>
                <tbody v-if="roles.length != 0">
                    <tr v-for="(item, index) in roles" :key="index">
                        <td class="py-3 px-3 whitespace-nowrap text-left">
                            <h5 class="font-medium text-graydark dark:text-gray">
                                {{ index + 1 }}
                            </h5>
                        </td>
                        <td class="py-3 px-3 whitespace-nowrap text-left">
                            <h5 class="font-medium text-graydark dark:text-gray">
                                {{ item.name }}
                            </h5>
                        </td>

                        <td class="py-3 px-2 gap-2 whitespace-nowrap text-left flex flex-wrap items-center justify-end">
                            <a v-tooltip.bottom="'editar'" :href="'/roles-edit/' + item.id"
                                class="p-2 hover:scale-105 dark:bg-primary/20 bg-primary/40 dark:text-white rounded-md shadow-md flex flex-wrap items-center gap-2">
                                <PencilSquareIcon class="h-4 w-4 text-gray" /> Editar
                            </a>
                            <button v-tooltip.bottom="'eliminar'" @click="eliminarRol(item.id)"
                                class="p-2 hover:scale-105 dark:bg-danger/20 bg-danger/40 dark:text-white rounded-md shadow-md flex flex-wrap items-center gap-2">
                                <ArchiveBoxIcon class="h-4 w-4 text-gray" /> Eliminar
                            </button>
                        </td>

                    </tr>
                </tbody>
            </table>

            <!-- Paginador -->
            <div class="w-full flex justify-center mt-4" v-if="roles.length != 0 || totalPages > 1">
                <vue-awesome-paginate :total-items="perPage * totalPages" :items-per-page="perPage" :max-pages-shown="5"
                    v-model="currentPage" @click="changePage" />
            </div>


        </div>
    </div>

    <!-- Modal -->
    <Modal :isOpen="ModalEliminar" @close="closeModal">
        <div class="p-4 bg-white dark:bg-boxdark rounded-md shadow-md">
            <h3 class="text-lg font-bold">Eliminar Rol</h3>
            <p class="text-sm mt-2">¿Estás seguro de eliminar este rol? Por favor, ingrese su contraseña para confirmar.
            </p>
            <div class="mb-4">
                <label for="password"
                    class="block text-sm font-medium text-gray-700 dark:text-gray-300">Contraseña</label>
                <input v-model="password" type="password" id="password"
                    class="mt-1 p-2 w-full border border-graydark dark:border-strokedark rounded-md shadow-sm dark:bg-slate-900 dark:text-gray"
                    required />
                <small v-if="errors.password" class="text-red-500">{{ errors.password }}</small>
            </div>
            <div class="flex justify-end mt-4 gap-2">
                <button @click="submitEliminar"
                    class="p-2 hover:scale-105 bg-danger/20 dark:bg-danger/40 dark:text-white rounded-md shadow-md">
                    Eliminar
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
import { RocketLaunchIcon, PencilSquareIcon, ArchiveBoxIcon } from '@heroicons/vue/24/solid';
import axios from '../../plugins/axios';
import BreadcrumbDefault from '@/components/Breadcrumbs/BreadcrumbDefault.vue';
import Modal from '@/components/Modal.vue';
import Swal from 'sweetalert2';

const swal = inject('$swal') as typeof Swal;


// Simulación de datos
const totalRoles = ref(0);

//pagiandor y search
const roles = ref([]);
const search = ref('');
const perPage = ref(5);
const page = ref(1);
const totalPages = ref(1);
const currentPage = ref(1);

//Modal
const ModalEliminar = ref(false);
const password = ref('');
const errors = ref({ password: '' });

//idEliminar
const idEliminar = ref(0);


const fetchRoles = async () => {
    const response = await axios.get('/api/roles', {
        params: {
            search: search.value,
            per_page: perPage.value,
            page: page.value,
        },
    });
    console.log('roles obtenidos:', response.data.data);
    console.log('Total de páginas:', response.data.data.last_page);

    roles.value = response.data.data.data;
    totalPages.value = response.data.data.last_page;
    totalRoles.value = response.data.data.total;
};

const changePage = (newPage: number) => {
    page.value = newPage;
    fetchRoles();
};

const limpiar = () => {
    search.value = '';
    fetchRoles();
};

const eliminarRol = (id: number) => {
    console.log('Eliminar rol:', id);
    idEliminar.value = id;
    ModalEliminar.value = true;
};

const submitEliminar = async () => {
    const deletePassword = { password: password.value };
    try {
        const response = await axios.delete(`/api/roles/${idEliminar.value}`, {
            data: deletePassword,
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log('rol eliminado:', response.data);
        swal.fire({
            icon: 'success',
            title: 'Rol eliminado con éxito',
            text: 'Recurso eliminado correctamente',
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
        console.error('Error al eliminar rol:', error);
        swal.fire({
            icon: 'error',
            title: 'Error al eliminar rol',
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
    password.value = '';
    errors.value.password = '';
};

onMounted(() => {
    fetchRoles();
});


</script>

<style></style>