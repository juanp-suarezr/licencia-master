<template>
  <div class="w-full flex justify-start">
    <breadcrumb-default
      pageTitle="Estudiantes x Juego"
      pageSubtitle="Analítica"
      path="/"
    ></breadcrumb-default>
  </div>

  <!-- Filtro de clientes solo para admin -->
  <div v-if="isAdmin" class="mb-4">
    <label class="block text-sm font-medium text-gray-700 mb-1">Selecciona cliente:</label>
    <select
      v-model="clienteSeleccionado"
      @change="onClienteChange"
      class="border border-gray-300 rounded-md px-2 py-1 dark:bg-slate-900 dark:text-white"
    >
      <option value="" disabled selected>Selecciona un cliente</option>
      <option value="0">Todos</option>
      <option v-for="cli in clientes" :key="cli.id" :value="cli.id">
        {{ cli.institucion }}
      </option>
    </select>
  </div>

  <div class="w-full sm:grid sm:grid grid-cols-4 md:gap-4 sm:gap-2">
    <!-- Columna 1 -->
    <div
      class="mb-4 w-full md:col-span-1 sm:col-span-3 bg-white dark:bg-graydark rounded-md shadow-md p-6 flex flex-col items-center"
    >
      <div class="text-xl font-bold mb-2">Estudiantes Registrados</div>
      <div class="text-4xl text-blue-600 mb-4">
        {{ parametro.estudiantesRegistrados > 0 ? parametro.estudiantesRegistrados : 0 }}
      </div>
      <div class="text-xl font-bold mb-2">Estudiantes Activos</div>
      <div class="text-4xl text-green-600">
        {{ parametro.estudiantesActivos > 0 ? parametro.estudiantesActivos : 0 }}
      </div>
    </div>
    <!-- Columna 2 -->
    <div
      class="mb-4 w-full sm:col-span-1 bg-white dark:bg-graydark rounded-md shadow-md p-6 flex flex-col items-center"
    >
      <div class="text-xl font-bold mb-4">Comparativo</div>
      <PieChart
        :labels="['Registrados', 'Activos']"
        :values="[parametro.estudiantesRegistrados ?? 0, parametro.estudiantesActivos ?? 0]"
      />
    </div>
    <!-- Columna 3 -->
    <div
      class="mb-4 W-full col-span-2 bg-white dark:bg-graydark rounded-md shadow-md p-6 flex flex-col items-center"
    >
      <BarChart
        :labels="['Grado 1', 'Grado 2', 'Grado 3', 'Grado 4', 'Grado 5', 'Grado 6']"
        :values="[
          parametro.estudiantesGrado1 ?? 0,
          parametro.estudiantesGrado2 ?? 0,
          parametro.estudiantesGrado3 ?? 0,
          parametro.estudiantesGrado4 ?? 0,
          parametro.estudiantesGrado5 ?? 0,
          parametro.estudiantesGrado6 ?? 0,
        ]"
        title="Estudiantes por Grado"
      />
    </div>
    <!-- Columna 4 -->
    <div
      class="mb-4 w-full md:col-span-2 bg-white dark:bg-graydark rounded-md shadow-md p-6 flex flex-col items-center"
    >
      <div class="text-xl font-bold">Ranking de juegos</div>
      <p class="text-sm">
        {{ parametro.totalJuegosConceptoMayor70 }} conconcepto mayor o igual a 70
      </p>
      <div
        class="space-y-2 overflow-x-auto w-full mt-2"
        v-if="parametro.topJuegos && parametro.topJuegos.length"
      >
        <table class="table-auto w-full bg-white dark:bg-boxdark text-sm">
          <thead>
            <tr class="bg-gray-2 text-left dark:bg-meta-4 px-4">
              <th class="py-2 px-2 font-medium text-black dark:text-white text-left">#</th>
              <th class="py-2 px-2 font-medium text-black dark:text-white text-left">Juego</th>
              <th class="py-2 px-4 font-medium text-black dark:text-white text-right">
                Jugados y aprobados
              </th>
            </tr>
          </thead>
          <tbody v-if="parametro.topJuegos && parametro.topJuegos.length">
            <tr
              v-for="(item, idx) in parametro.topJuegos"
              :key="item.id || idx"
              class="bg-gray-100 dark:bg-gray-800 px-4 py-2 text-sm"
            >
              <td class="py-3 px-3 whitespace-nowrap text-left align-top">
                <p class="font-bold text-lg text-blue-600">{{ idx + 1 }}</p>
              </td>
              <td class="py-3 px-3 whitespace-nowrap text-left align-top">
                <p class="font-semibold">{{ item.codigo }}</p>
              </td>
              <td class="py-3 px-3 whitespace-nowrap text-right align-top">
                <p class="text-sm text-gray-700 dark:text-gray-300">
                  Jugados y aprobados: <b class="text-blue-600">{{ item.veces_jugado }}</b>
                </p>
                <!-- Barra de progreso dentro del mismo td -->
                <div class="w-full flex items-center gap-2 mt-2" v-if="parametro.totalJuegosConceptoMayor70">
                  <div class="flex-1 bg-gray-300 dark:bg-gray-700 rounded h-4 overflow-hidden">
                    <div
                      class="h-4 rounded bg-blue-600 transition-all duration-300"
                      :style="{
                        width:
                          (item.veces_jugado / (parametro.totalJuegosConceptoMayor70)) * 100 +
                          '%',
                      }"
                    >{{ item.veces_jugado }}</div>
                  </div>
                  <span class="text-xs text-gray-600 dark:text-gray-300 ml-2">
                    
                    {{
                      (
                        (item.veces_jugado / parametro.totalJuegosConceptoMayor70) *
                        100
                      ).toFixed(1)
                    }}%
                  </span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!-- Columna 5 -->
    <div
      class="mb-4 w-full md:col-span-2 bg-white dark:bg-graydark rounded-md shadow-md p-6 flex flex-col items-center"
    >
      <div class="text-xl font-bold mb-4">Ambiente preferido por estudiantes</div>
      <div
        class="space-y-2 overflow-x-auto w-full mt-2"
        v-if="parametro.topJuegos && parametro.topJuegos.length"
      >
        <table class="table-auto w-full bg-white dark:bg-boxdark text-sm">
          <thead>
            <tr class="bg-gray-2 text-left dark:bg-meta-4 px-4">
              <th class="py-2 px-2 font-medium text-black dark:text-white text-left">#</th>
              <th class="py-2 px-2 font-medium text-black dark:text-white text-left">Juego</th>
              <th class="py-2 px-4 font-medium text-black dark:text-white text-right">
                Jugados y aprobados
              </th>
            </tr>
          </thead>
          <tbody v-if="parametro.topAmbientes && parametro.topAmbientes.length">
            <tr
              v-for="(item, idx) in parametro.topAmbientes"
              :key="item.id || idx"
              class="bg-gray-100 dark:bg-gray-800 px-4 py-2 text-sm"
            >
              <td class="py-3 px-3 whitespace-nowrap text-left align-top">
                <p class="font-bold text-lg text-blue-600">{{ idx + 1 }}</p>
              </td>
              <td class="py-3 px-3 whitespace-nowrap text-left align-top">
                <p class="font-semibold">Locación: {{ item.locacion }}</p>
              <p class="font-semibold">ambiente: {{ item.nombre }}</p>
              </td>
              <td class="py-3 px-3 whitespace-nowrap text-right align-top">
                <p class="text-sm text-gray-700 dark:text-gray-300">
                  Jugados y aprobados: <b class="text-blue-600">{{ item.veces_jugado }}</b>
                </p>
                <!-- Barra de progreso dentro del mismo td -->
                <div class="w-full flex items-center gap-2 mt-2" v-if="parametro.totalJuegosConceptoMayor70">
                  <div class="flex-1 bg-gray-300 dark:bg-gray-700 rounded h-4 overflow-hidden">
                    <div
                      class="h-4 rounded bg-blue-600 transition-all duration-300"
                      :style="{
                        width:
                          (item.veces_jugado / (parametro.totalJuegosConceptoMayor70)) * 100 +
                          '%',
                      }"
                    >{{ item.veces_jugado }}</div>
                  </div>
                  <span class="text-xs text-gray-600 dark:text-gray-300 ml-2">
                    
                    {{
                      (
                        (item.veces_jugado / parametro.totalJuegosConceptoMayor70) *
                        100
                      ).toFixed(1)
                    }}%
                  </span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, inject, computed } from 'vue'
import axios from '../../plugins/axios'
import BreadcrumbDefault from '@/components/Breadcrumbs/BreadcrumbDefault.vue'
import PieChart from '@/components/PieChart.vue' // Componente pie
import BarChart from '@/components/BarChart.vue' // Componente barchart
import { useUserStore } from '@/store/auth'

const userStore = useUserStore()
const isAdmin = computed(() => userStore.user.rol === 'Administrador')

// Filtro de clientes
const clientes = ref([])
const clienteSeleccionado = ref<number | null>(0)

const parametro = ref<any>({})

const fetchClientes = async () => {
  const response = await axios.get('/api/analitica/listado-clientes')
  clientes.value = response.data
}

const fetchAnalitica = async () => {
  const params: any = {}
  if (isAdmin.value && clienteSeleccionado.value) {
    params.cliente_id = clienteSeleccionado.value
  }
  const response = await axios.get('/api/analitica/estudiantes', { params })
  parametro.value = response.data
}

const onClienteChange = () => {
  fetchAnalitica()
}

onMounted(async () => {
  if (isAdmin.value) {
    await fetchClientes()
  }
  await fetchAnalitica()
})
</script>

<style></style>