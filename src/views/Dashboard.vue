<template>
  <DefaultLayout>
    <div class="flex flex-col h-full">
      <div class="flex-1">
        <div v-if="isAuthenticated && user.rol == 'Administrador'" class="md:grid gap-6 md:grid-cols-2">
          <div class="p-6 bg-white dark:bg-graydark rounded-lg shadow-md mb-4">

            <!-- Carrusel -->
            <div class="relative overflow-hidden">
              <div class="flex transition-transform duration-500 ease-in-out"
                :style="{ transform: `translateX(-${currentSlide * 100}%)` }">
                <!-- info 1 -->
                <div class="w-full px-10 flex-shrink-0">
                  <h2 class="text-xl font-bold">Cantidad de registros</h2>
                  <p class="mt-2">Unidades</p>

                  <div class="w-full grid grid-cols-4 items-center">
                    <div class="col-span-2 w-auto">
                      <p v-if="totalesInfo" class="text-lg text-gray-500">
                        Total licencias: <b>{{ totalesInfo.TotalesLicencias[0].total +
                          totalesInfo.TotalesLicencias[1].total }}</b>
                      </p>
                      <div class="flex flex-wrap gap-2">
                        <p v-if="totalesInfo" class="text-base text-gray-800 mt-2">
                          <span class="dark:bg-black py-2 px-3 rounded-md shadow-md">{{
                            totalesInfo.TotalesLicencias[0].total }}</span> Básica
                        </p>
                        <p v-if="totalesInfo" class="text-base text-gray-800 mt-2">
                          <span class="dark:bg-black py-2 px-3 rounded-md shadow-md">{{
                            totalesInfo.TotalesLicencias[1].total }}</span> Avanzada
                        </p>
                      </div>

                    </div>
                    <div class="col-span-2 flex justify-center w-auto">
                      <img class="w-auto h-44 object-contain dark:hidden" src="../assets/general/img1.png"
                        alt="licencias">
                      <img class="w-auto h-44 object-contain dark:block hidden" src="../assets/general/img1Dark.png"
                        alt="licencias">
                    </div>
                  </div>
                </div>

                <!-- info 2 -->
                <div class="w-full px-10 flex-shrink-0">
                  <h2 class="text-xl font-bold">Cantidad de registros</h2>
                  <p class="mt-2">Unidades</p>

                  <div class="w-full grid grid-cols-4 items-center">
                    <div class="col-span-2 w-auto">
                      <p v-if="totalesInfo" class="text-lg text-gray-500">
                        Total Usuarios: <b>{{ totalesInfo.Estudiantes + totalesInfo.Docentes + totalesInfo.Clientes
                          }}</b>
                      </p>
                      <div class="flex flex-wrap gap-2">
                        <p v-if="totalesInfo" class="text-base text-gray-800 mt-2">
                          <span class="dark:bg-black py-2 px-3 rounded-md shadow-md">{{ totalesInfo.Clientes }}</span>
                          Clientes
                        </p>
                        <p v-if="totalesInfo" class="text-base text-gray-800 mt-2">
                          <span class="dark:bg-black py-2 px-3 rounded-md shadow-md">{{ totalesInfo.Docentes }}</span>
                          Docentes
                        </p>
                        <p v-if="totalesInfo" class="text-base text-gray-800 mt-2">
                          <span class="dark:bg-black py-2 px-3 rounded-md shadow-md">{{ totalesInfo.Estudiantes
                            }}</span> Estudiantes
                        </p>
                      </div>

                    </div>
                    <div class="col-span-2 flex justify-center w-auto">
                      <img class="w-auto h-44 object-contain" src="../assets/general/img2.png" alt="usuarios">

                    </div>
                  </div>
                </div>

              </div>

              <!-- Controles -->
              <button @click="prevSlide"
                class="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75">
                ❮
              </button>
              <button @click="nextSlide"
                class="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75">
                ❯
              </button>
            </div>

          </div>

          <!-- info admin -->
          <div class="p-6 bg-white dark:bg-graydark rounded-lg shadow-md mb-4">
            <h2 class="text-xl font-bold">Información usuario</h2>
            <div class="w-full grid grid-cols-4 items-center">
              <div class="col-span-2 w-auto">
                <p v-if="isAuthenticated" class="text-lg text-gray-500">
                  nombre: <b>{{ user.name }}</b>
                </p>
                <p v-if="isAuthenticated" class="text-lg text-gray-500">
                  rol: <b>{{ user.rol }}</b>
                </p>
                <p v-if="isAuthenticated" class="text-sm text-gray-500">
                  email: <b>{{ user.email }}</b>
                </p>

              </div>
              <div class="col-span-2 flex justify-center w-auto">
                <img class="w-auto h-44 object-contain" src="../assets/general/adminInfo.png" alt="usuarios">

              </div>
            </div>
          </div>

          <!-- numero licencias -->
          <div class="p-6 bg-white dark:bg-graydark rounded-lg shadow-md col-span-2">
            <h2 class="text-xl font-bold">Instituciones registradas</h2>
            <div class="overflow-x-auto mt-4">
              <table class="table-auto w-full bg-white dark:bg-boxdark text-sm">
                <thead>
                  <tr class="bg-gray-2 text-left dark:bg-meta-4">
                    <th></th>
                    <th class="py-2 px-2 font-medium text-black dark:text-white text-left">
                      Institución
                    </th>
                    <th class="py-2 px-2 font-medium text-black dark:text-white text-left">
                      usuarios registrados
                    </th>

                  </tr>
                </thead>
                <tbody v-if="totalesInfo">
                  <tr v-for="(item, index) in totalesInfo.instituciones" :key="index">
                    <td class="py-3 pl-3" v-tooltip.left="item.nombre + ' ' + item.apellidos">

                      <Avatar v-if="item.logo != null" class="w-16 h-16 dark:!bg-grarkayd !bg-transparent shadow-md p-1"
                        :image="getInitials(item.nombre)" shape="circle" />
                      <Avatar v-else
                        class="w-16 h-16 flex items-center justify-center shadow-md dark:!bg-graydark !bg-transparent p-1"
                        :label="getInitials(item.nombre)" shape="circle" />
                    </td>
                    <td class="py-3 px-3 whitespace-nowrap text-left">
                      <h5 class="font-medium text-black dark:text-white">
                        {{ item.institucion }}
                      </h5>
                    </td>
                    <td class="py-3 px-3 whitespace-nowrap text-left">
                      <h5 class="font-medium text-black dark:text-white">
                        {{ item.docentes_count + item.estudiantes_count }}
                      </h5>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

          </div>

        </div>
      </div>
    </div>
  </DefaultLayout>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue';
import axios from '../plugins/axios';
import Avatar from 'primevue/avatar';
import { useUserStore } from '@/store/auth'
import { storeToRefs } from 'pinia';


const userStore = useUserStore()
const { isAuthenticated, user, error_user } = storeToRefs(userStore);

const totalesInfo = ref(0);
const currentSlide = ref<number>(0);
let interval: ReturnType<typeof setInterval>;

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % 2;
};

const prevSlide = () => {
  currentSlide.value = (currentSlide.value - 1 + 2) % 2;
};

const getTotales = async () => {
  try {
    const response = await axios.get('/api/totales', {
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
        'X-CSRF-TOKEN': '', // Agrega el token CSRF si es necesario
      },
    });
    console.log('Totales obtenidos:', response.data);
    totalesInfo.value = response.data;
  } catch (error) {
    console.error('Error al obtener totales:', error);
  }
};

const getInitials = function (name: string) {
  const parts = name.split(' ');
  let initials = '';
  let count = 0;

  for (let i = 0; i < parts.length && count < 2; i++) {
    if (parts[i].length > 0 && parts[i] !== '') {
      initials += parts[i][0];
      count++;
    }
  }
  return initials;
};

onMounted(() => {
  getTotales();
  interval = setInterval(nextSlide, 5000); // Cambiar cada 3 segundos
});

onUnmounted(() => {
  clearInterval(interval);
});
</script>

<style scoped>
/* Eliminar estilos específicos en favor de Tailwind CSS */
</style>
