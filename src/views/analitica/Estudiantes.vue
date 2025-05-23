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