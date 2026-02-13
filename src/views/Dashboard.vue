<template>
  <div>
    <div class="flex flex-col h-full">
      <div class="flex-1">
        <!-- rol admin -->
        <div
          v-if="isAuthenticated && user.rol == 'Administrador'"
          class="md:grid gap-6 md:grid-cols-2"
        >
          <div class="sm:p-6 p-4 bg-white dark:bg-graydark rounded-lg shadow-md mb-4">
            <!-- Carrusel -->
            <div class="relative overflow-hidden">
              <div
                class="flex transition-transform duration-500 ease-in-out"
                :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
              >
                <!-- info 1 -->
                <div class="w-full sm:px-10 px-4 flex-shrink-0">
                  <h2 class="text-xl font-bold">Cantidad de registros</h2>
                  <p class="mt-2">Unidades</p>

                  <div class="w-full sm:grid grid-cols-4 items-center">
                    <div class="col-span-2 w-auto mb-4 sm:mb-0">
                      <p v-if="totalesInfo" class="text-lg text-gray-500">
                        Total licencias:
                        <b>{{
                          totalesInfo.TotalesLicencias[0].total +
                          totalesInfo.TotalesLicencias[1].total
                        }}</b>
                      </p>
                      <div class="flex flex-wrap gap-2">
                        <p v-if="totalesInfo" class="text-base text-gray-800 mt-2">
                          <span class="dark:bg-black py-2 px-3 rounded-md shadow-md">{{
                            totalesInfo.TotalesLicencias[0].total
                          }}</span>
                          Básica
                        </p>
                        <p v-if="totalesInfo" class="text-base text-gray-800 mt-2">
                          <span class="dark:bg-black py-2 px-3 rounded-md shadow-md">{{
                            totalesInfo.TotalesLicencias[1].total
                          }}</span>
                          Avanzada
                        </p>
                      </div>
                    </div>
                    <div class="col-span-2 flex justify-center w-auto">
                      <img
                        class="w-auto h-44 object-contain dark:hidden"
                        src="../assets/general/img1.png"
                        alt="licencias"
                      />
                      <img
                        class="w-auto h-44 object-contain dark:block hidden"
                        src="../assets/general/img1Dark.png"
                        alt="licencias"
                      />
                    </div>
                  </div>
                </div>

                <!-- info 2 -->
                <div class="w-full sm:px-10 px-4 flex-shrink-0">
                  <h2 class="text-xl font-bold">Cantidad de registros</h2>
                  <p class="mt-2">Unidades</p>

                  <div class="w-full sm:grid grid-cols-4 items-center">
                    <div class="col-span-2 w-auto mb-4 sm:mb-0">
                      <p v-if="totalesInfo" class="text-lg text-gray-500">
                        Total Usuarios:
                        <b>{{
                          totalesInfo.Estudiantes + totalesInfo.Docentes + totalesInfo.Clientes
                        }}</b>
                      </p>
                      <div class="flex flex-wrap gap-2">
                        <p v-if="totalesInfo" class="text-base text-gray-800 mt-2">
                          <span class="dark:bg-black py-2 px-3 rounded-md shadow-md">{{
                            totalesInfo.Clientes
                          }}</span>
                          Clientes
                        </p>
                        <p v-if="totalesInfo" class="text-base text-gray-800 mt-2">
                          <span class="dark:bg-black py-2 px-3 rounded-md shadow-md">{{
                            totalesInfo.Docentes
                          }}</span>
                          Docentes
                        </p>
                        <p v-if="totalesInfo" class="text-base text-gray-800 mt-2">
                          <span class="dark:bg-black py-2 px-3 rounded-md shadow-md">{{
                            totalesInfo.Estudiantes
                          }}</span>
                          Estudiantes
                        </p>
                      </div>
                    </div>
                    <div class="col-span-2 flex justify-center w-auto">
                      <img
                        class="w-auto h-44 object-contain"
                        src="../assets/general/img2.png"
                        alt="usuarios"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <!-- Controles -->
              <button
                @click="prevSlide"
                class="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
              >
                ❮
              </button>
              <button
                @click="nextSlide"
                class="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
              >
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
                <img
                  class="w-auto h-44 object-contain"
                  src="../assets/general/adminInfo.png"
                  alt="usuarios"
                />
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
                <tbody v-if="totalesInfo && paginatedInstituciones.length != 0">
                  <tr v-for="(item, index) in paginatedInstituciones" :key="index">
                    <td class="py-3 pl-3" v-tooltip.left="item.nombre + ' ' + item.apellidos">
                      <Avatar
                        v-if="item.logo != null"
                        class="w-16 h-16 dark:!bg-graydark !bg-transparent avatar-image dark:avatar-image-dark shadow-md p-1"
                        :image="getImage(item.logo)"
                        shape="circle"
                      />
                      <Avatar
                        v-else
                        class="w-16 h-16 flex items-center justify-center shadow-md dark:!bg-graydark !bg-transparent p-1"
                        :label="getInitials(item.nombre)"
                        shape="circle"
                      />
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
              <!-- Paginador -->
              <div
                class="w-full flex justify-center mt-4"
                v-if="totalesInfo && (paginatedInstituciones.length != 0 || totalPages > 1)"
              >
                <vue-awesome-paginate
                  :total-items="totalInstituciones"
                  :items-per-page="itemsPerPageInstituciones"
                  :max-pages-shown="5"
                  v-model="currentPageInstituciones"
                  @click="changePageInstituciones"
                />
              </div>
            </div>
          </div>
        </div>
        <!-- rol cliente -->
        <div v-if="isAuthenticated && user.rol == 'Cliente'" class="md:grid gap-6 md:grid-cols-2">
          <!-- info cliente -->
          <div class="col-span-2 px-6 bg-white dark:bg-graydark rounded-lg shadow-md mb-4 sm:mb-0">
            <div class="w-full grid grid-cols-5 items-center">
              <div class="col-span-4 w-full items-center">
                <h2 class="text-xl font-bold">Bienvenido {{ user.name }}</h2>

                <p v-if="isAuthenticated" class="block sm:text-sm text-[11px] text-gray-500">
                  {{ user.email }}
                </p>
              </div>
              <div class="col-span-1 flex justify-end w-auto h-full py-4">
                <img
                  class="w-auto h-24 object-contain"
                  src="../assets/general/img3.png"
                  alt="usuarios"
                />
              </div>
            </div>
          </div>

          <!-- info registros cliente -->
          <div class="p-6 bg-white dark:bg-graydark rounded-lg shadow-md mb-4">
            <!-- info 2 -->
            <div class="w-full px-10 flex-shrink-0">
              <h2 class="text-xl font-bold">Cantidad de registros</h2>
              <p class="mt-2">Unidades</p>

              <div class="w-full grid grid-cols-4 items-center">
                <div class="col-span-2 w-auto">
                  <p v-if="InfoTotalCliente.length > 0" class="text-lg text-gray-500">
                    Total Usuarios:
                    <b>{{
                      InfoTotalCliente[0].total_estudiantes + InfoTotalCliente[0].total_docentes + 1
                    }}</b>
                  </p>
                  <div class="flex flex-wrap gap-2">
                    <p v-if="InfoTotalCliente.length > 0" class="text-base text-gray-800 mt-2">
                      <span class="dark:bg-black py-2 px-3 rounded-md shadow-md">{{
                        InfoTotalCliente[0].total_docentes
                      }}</span>
                      Docentes
                    </p>
                    <p v-if="InfoTotalCliente.length > 0" class="text-base text-gray-800 mt-2">
                      <span class="dark:bg-black py-2 px-3 rounded-md shadow-md">{{
                        InfoTotalCliente[0].total_estudiantes
                      }}</span>
                      Estudiantes
                    </p>
                    <p v-if="InfoTotalCliente.length > 0" class="text-base text-gray-800 mt-2">
                      <span class="dark:bg-black py-2 px-3 rounded-md shadow-md">{{
                        InfoTotalCliente[0].total_grupos
                      }}</span>
                      Grupos
                    </p>
                  </div>
                </div>
                <div class="col-span-2 flex justify-center w-auto">
                  <img
                    class="w-auto h-44 object-contain"
                    src="../assets/general/img2.png"
                    alt="usuarios"
                  />
                </div>
              </div>
            </div>
          </div>
          <!-- info licencias -->
          <div class="p-6 bg-white dark:bg-graydark rounded-lg shadow-md mb-4">
            <div class="w-full px-2 mt-2">
              <p
                v-if="isAuthenticated && InfoTotalCliente.length > 0"
                class="text-lg text-gray-500"
              >
                <b>Institución: </b> {{ InfoTotalCliente ? InfoTotalCliente[0].institucion : '' }}
              </p>

              <p
                v-if="isAuthenticated && InfoTotalCliente.length > 0"
                class="text-base text-gray-500"
              >
                {{ InfoTotalCliente ? InfoTotalCliente[0].descripcion : '' }}
              </p>
              <p
                v-if="isAuthenticated && InfoTotalCliente.length > 0"
                class="text-sm text-gray-500"
              >
                Fecha de vencimiento:
                {{ InfoTotalCliente ? InfoTotalCliente[0].fecha_vencimiento : '' }}
              </p>
              <div class="w-full flex justify-end mt-6">
                <img
                  class="w-auto h-36 object-contain"
                  src="../assets/general/img4.png"
                  alt="licencia cliente"
                />
              </div>
            </div>
          </div>
        </div>
        <!-- rol docente -->
        <div v-if="isAuthenticated && user.rol == 'Docente'" class="md:grid gap-6 md:grid-cols-5">
          <!-- info docente -->
          <div
            class="md:col-span-2 px-4 h-full bg-white dark:bg-graydark rounded-lg shadow-md mb-4 sm:mb-0"
          >
            <div class="w-full h-full grid grid-cols-5">
              <div class="col-span-4 w-full items-center mt-2">
                <h2 class="text-xl font-bold">Bienvenido {{ InfoTotalDocente.nombre_profesor }}</h2>

                <p v-if="isAuthenticated" class="block sm:text-sm text-[11px] text-gray-500">
                  {{ user.email }}
                </p>
                <p v-if="isAuthenticated" class="block sm:text-sm text-[11px] text-gray-500">
                  <b>Institución:</b> {{ InfoTotalDocente.cliente }}
                </p>
              </div>
              <div class="col-span-1 flex justify-end items-end pb-0">
                <img
                  class="w-auto h-24 object-contain"
                  src="../assets/general/img3.png"
                  alt="usuarios"
                />
              </div>
            </div>
          </div>

          <!-- info registros cliente -->
          <div
            class="md:col-span-3 px-2 py-2 bg-white dark:bg-graydark rounded-lg shadow-md mb-4 sm:mb-0"
          >
            <!-- info 2 -->
            <div class="w-full px-2 flex-shrink-0">
              <h2 class="text-xl font-bold">Cantidad de registros</h2>
              <p class="">Unidades</p>

              <div class="w-full grid grid-cols-4 items-center">
                <div class="col-span-3 w-auto">
                  <p v-if="InfoTotalDocente.length != 0" class="text-lg text-gray-500">
                    Total Registros:
                    <b>{{
                      InfoTotalDocente.cantidad_estudiantes + InfoTotalDocente.grupos.length
                    }}</b>
                  </p>
                  <div class="flex flex-wrap gap-2">
                    <p v-if="InfoTotalDocente.length != 0" class="text-base text-gray-800 mt-2">
                      <span class="dark:bg-black py-2 px-3 rounded-md shadow-md">{{
                        InfoTotalDocente.grupos.length
                      }}</span>
                      Grupos asignados
                    </p>
                    <p v-if="InfoTotalDocente.length != 0" class="text-base text-gray-800 mt-2">
                      <span class="dark:bg-black py-2 px-3 rounded-md shadow-md">{{
                        InfoTotalDocente.cantidad_estudiantes
                      }}</span>
                      Estudiantes asignados
                    </p>
                  </div>
                </div>
                <div class="col-span-1 flex justify-center w-auto h-full">
                  <img
                    class="w-auto h-24 object-contain"
                    src="../assets/general/img6.png"
                    alt="usuarios"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- info registros estudiantes -->
          <div class="md:col-span-1 py-2 bg-white dark:bg-graydark rounded-lg shadow-md mb-4">
            <!-- info 2 -->
            <div class="w-full px-2 flex flex-col items-center flex-shrink-0">
              <h2 class="text-xl font-bold">Estudiantes</h2>
              <Knob
                class="mt-4"
                v-if="InfoTotalDocente.length != 0"
                v-model="cantidadXgrupo"
                readonly
              />
            </div>
          </div>
          <!-- info estudiantes -->
          <div
            v-if="InfoTotalDocente.length != 0"
            class="col-span-4 p-6 bg-white dark:bg-graydark rounded-lg shadow-md mb-4"
          >
            <label for="grupo" class="block text-sm font-medium text-gray-700"
              >Seleccionar grupo</label
            >
            <select
              id="grupo"
              v-model="selectedGroup"
              required
              class="text-xs md:text-base border border-graydark dark:border-strokedark rounded-md shadow-sm dark:bg-slate-900 dark:text-gray justify-end py-1 w-auto whitespace-normal break-words"
            >
              <option class="" value="" disabled>Seleccionar grupo</option>
              <option
                class=""
                v-for="(item, index) in InfoTotalDocente.grupos"
                :key="item.id"
                :value="index"
              >
                {{ item.nombre_grupo }}
              </option>
            </select>
            <div class="overflow-x-auto mt-4">
              <table class="table-auto w-full bg-white dark:bg-boxdark text-sm">
                <thead>
                  <tr class="bg-gray-2 text-left dark:bg-meta-4">
                    <th class="py-2 px-2 font-medium text-black dark:text-white text-left">
                      Nombre
                    </th>
                    <th class="py-2 px-2 font-medium text-black dark:text-white text-left">
                      correo
                    </th>
                    <th class="py-2 px-2 font-medium text-black dark:text-white text-left">
                      Grupo
                    </th>
                  </tr>
                </thead>
                <tbody v-if="paginatedEstudiantes.length != 0">
                  <tr v-for="(item, index) in paginatedEstudiantes" :key="index">
                    <td class="py-3 px-3 whitespace-nowrap text-left">
                      <h5 class="font-medium text-black dark:text-white">
                        {{ item.nombre_estudiante }} {{ item.apellidos_estudiante }}
                      </h5>
                    </td>
                    <td class="py-3 px-3 whitespace-nowrap text-left">
                      <h5 class="font-medium text-black dark:text-white">
                        {{ item.correo_estudiante }}
                      </h5>
                    </td>
                    <td class="py-3 px-3 whitespace-nowrap text-left">
                      <h5 class="font-medium text-black dark:text-white">
                        {{ InfoTotalDocente.grupos[selectedGroup].nombre_grupo }}
                      </h5>
                    </td>
                  </tr>
                </tbody>
              </table>
              <!-- Paginador -->
              <div
                class="w-full flex justify-center mt-4"
                v-if="paginatedEstudiantes.length != 0 || totalPagesEstudiantes > 1"
              >
                <vue-awesome-paginate
                  :total-items="totalEstudiantes"
                  :items-per-page="itemsPerPageEstudiantes"
                  :max-pages-shown="5"
                  v-model="currentPageEstudiantes"
                  @click="changePageEstudiantes"
                />
              </div>
            </div>
          </div>
        </div>
        <!-- estudiantes activos -->
        <div class="w-full mt-4" v-if="isAuthenticated">
          <!-- numero estudiantes activos -->
          <div class="p-6 bg-white dark:bg-graydark rounded-lg shadow-md col-span-2">
            <h2 class="text-xl font-bold">
              Estudiantes activos (último juego - hace 1 mes o menos)

            </h2>
            <div class="overflow-x-auto mt-4 flex flex-col gap-4">
              <!-- Selector solo para admin -->
              <div v-if="isAuthenticated && user.rol == 'Administrador'" class="mb-2">
                <label class="block text-sm font-medium text-gray-700 mb-1"
                  >Selecciona institución:</label
                >

                <select
                  v-if="Instituciones && Instituciones.length"
                  v-model="institucionSeleccionada"
                  @change="onInstitucionChange"
                  class="border border-gray-300 rounded-md px-2 py-1 dark:bg-slate-900 dark:text-white"
                >
                  <option v-for="inst in Instituciones" :key="inst.id" :value="inst.id">
                    {{ inst.institucion }}
                  </option>
                </select>
              </div>
              <div class="text-lg text-gray-700 dark:text-white">
                Total estudiantes activos: <b>{{ estudiantesActivos }}</b>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref, watch, computed } from 'vue'
import axios from '../plugins/axios'
import Avatar from 'primevue/avatar'
import { useUserStore } from '@/store/auth'
import { storeToRefs } from 'pinia'
import Knob from 'primevue/knob'

const userStore = useUserStore()
const { isAuthenticated, user, error_user } = storeToRefs(userStore)

const InfoTotalCliente = ref([])
const InfoTotalDocente = ref([])

//estudiantes activos
const estudiantesActivos = ref(0)
const Instituciones = ref([])
const institucionSeleccionada = ref<number | null>(null)

//grupo select
const selectedGroup = ref<number>(0)
const cantidadXgrupo = ref<number>(0)

watch(selectedGroup, (value) => {
  cantidadXgrupo.value = InfoTotalDocente.value.grupos[value].cantidad_estudiantes
})

const totalesInfo = ref(0)
const currentSlide = ref<number>(0)
let interval: ReturnType<typeof setInterval>

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % 2
}

const prevSlide = () => {
  currentSlide.value = (currentSlide.value - 1 + 2) % 2
}

const getTotales = async () => {
  try {
    const response = await axios.get('/api/totales', {
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
        'X-CSRF-TOKEN': '', // Agrega el token CSRF si es necesario
      },
    })
    console.log('Totales obtenidos:', response.data)
    totalesInfo.value = response.data
    Instituciones.value = response.data.instituciones
    console.log('Instituciones obtenidas:', Instituciones.value)
  } catch (error) {
    console.error('Error al obtener totales:', error)
  }
}

const getInfoTotalCliente = async (id: number) => {
  try {
    const response = await axios.get(`/api/infoTotalesCliente/${id}`)
    console.log('Licencias del usuario obtenidas:', response.data.data)
    InfoTotalCliente.value = response.data.data
  } catch (error) {
    console.error('Error al obtener las licencias del usuario:', error)
  }
}

const getInfoTotalDocente = async (id: number) => {
  try {
    const response = await axios.get(`/api/infoGruposXdoc/${id}`)
    console.log('Licencias del usuario obtenidas:', response.data.data)
    InfoTotalDocente.value = response.data.data
    cantidadXgrupo.value = InfoTotalDocente.value.grupos[0].cantidad_estudiantes
  } catch (error) {
    console.error('Error al obtener las licencias del usuario:', error)
  }
}

const getEstudiantesActivos = async (id: number) => {
  try {
    const response = await axios.get('/api/analitica/estudiantes-activos', {
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
        'X-CSRF-TOKEN': '', // Agrega el token CSRF si es necesario
      },
      params: { cliente_id: id },
      
    })
    console.log('estudiantes activos obtenidos:', response.data)
    estudiantesActivos.value = response.data
  } catch (error) {
    estudiantesActivos.value = 0
    console.error('Error al obtener totales:', error)
  }
}

const onInstitucionChange = () => {
  if (institucionSeleccionada.value) {
    getEstudiantesActivos(institucionSeleccionada.value)
  }
}

const getInitials = function (name: string) {
  const parts = name.split(' ')
  let initials = ''
  let count = 0

  for (let i = 0; i < parts.length && count < 2; i++) {
    if (parts[i].length > 0 && parts[i] !== '') {
      initials += parts[i][0]
      count++
    }
  }
  return initials
}

const getImage = function (name: string) {
  return `https://api-licencias.azproyectoseducativos.com/uploads/instituciones/${name}`
}

const currentPageInstituciones = ref(1)
const totalInstituciones = ref(0)
const itemsPerPageInstituciones = ref(5)

const currentPageEstudiantes = ref(1)
const totalEstudiantes = ref(0)
const itemsPerPageEstudiantes = ref(5)

const updatePaginationInstituciones = () => {
  totalPagesInstituciones.value = Math.ceil(
    totalInstituciones.value / itemsPerPageInstituciones.value
  )
}

const updatePaginationEstudiantes = () => {
  totalPagesEstudiantes.value = Math.ceil(totalEstudiantes.value / itemsPerPageEstudiantes.value)
}

const paginatedInstituciones = computed(() => {
  const start = (currentPageInstituciones.value - 1) * itemsPerPageInstituciones.value
  const end = start + itemsPerPageInstituciones.value
  return totalesInfo.value.instituciones.slice(start, end)
})

const paginatedEstudiantes = computed(() => {
  const start = (currentPageEstudiantes.value - 1) * itemsPerPageEstudiantes.value
  const end = start + itemsPerPageEstudiantes.value
  return InfoTotalDocente.value.grupos[selectedGroup.value].estudiantes.slice(start, end)
})

const totalPagesInstituciones = computed(() => {
  return Math.ceil(totalesInfo.value.instituciones.length / itemsPerPageInstituciones.value)
})

const totalPagesEstudiantes = computed(() => {
  return Math.ceil(
    InfoTotalDocente.value.grupos[selectedGroup.value].estudiantes.length /
      itemsPerPageEstudiantes.value
  )
})

const nextPageInstituciones = () => {
  if (currentPageInstituciones.value < totalPagesInstituciones.value) {
    currentPageInstituciones.value++
  }
}

const prevPageInstituciones = () => {
  if (currentPageInstituciones.value > 1) {
    currentPageInstituciones.value--
  }
}

const nextPageEstudiantes = () => {
  if (currentPageEstudiantes.value < totalPagesEstudiantes.value) {
    currentPageEstudiantes.value++
  }
}

const prevPageEstudiantes = () => {
  if (currentPageEstudiantes.value > 1) {
    currentPageEstudiantes.value--
  }
}

const changePageInstituciones = (newPage: number) => {
  currentPageInstituciones.value = newPage
  updatePaginationInstituciones()
}

const changePageEstudiantes = (newPage: number) => {
  currentPageEstudiantes.value = newPage
  updatePaginationEstudiantes()
}

onMounted(() => {
  getTotales().then(() => {
    totalInstituciones.value = totalesInfo.value.instituciones.length
    institucionSeleccionada.value = totalesInfo.value.instituciones[0].id
    getEstudiantesActivos(totalesInfo.value.instituciones[0].id)
    updatePaginationInstituciones()
  })

  
  if (isAuthenticated.value && user.value.rol == 'Cliente') {
    getInfoTotalCliente(user.value.id)
  } else if (isAuthenticated.value && user.value.rol == 'Docente') {
    getInfoTotalDocente(user.value.id).then(() => {
      totalEstudiantes.value = InfoTotalDocente.value.grupos[selectedGroup.value].estudiantes.length
      updatePaginationEstudiantes()
    })
  }
  interval = setInterval(nextSlide, 5000) // Cambiar cada 5 segundos
})

onUnmounted(() => {
  clearInterval(interval)
})
</script>

<style scoped>
.avatar-image {
  filter: brightness(0.7);
}

.dark .avatar-image {
  filter: brightness(1);
}
</style>
