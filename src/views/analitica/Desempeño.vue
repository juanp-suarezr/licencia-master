<template>
  <div class="w-full flex justify-start">
    <breadcrumb-default
      pageTitle="Desempeño x Juego"
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

  <div class="w-full">
    <!-- Columna 1 -->
    <div
      class="mb-4 w-full bg-white dark:bg-graydark rounded-md shadow-md p-6 flex flex-col items-center"
    >
      <div class="text-xl font-bold mb-2">Desempeño promedio en habilidades cognitivas</div>
      <GroupedBarChart
        :labels="['Matemáticas', 'Lenguaje', 'Ciencias', 'Hab. para la vida']"
        :datasets="[
          { label: 'Concepto', data: conceptoPromedio, color: '#2563eb' },
          { label: 'Carga mental', data: cargaMentalPromedio, color: '#16a34a' },
        ]"
        title="Promedio de desempeño por area (banda conectada)"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, inject, computed } from 'vue'
import axios from '../../plugins/axios'
import BreadcrumbDefault from '@/components/Breadcrumbs/BreadcrumbDefault.vue'

import { useUserStore } from '@/store/auth'
import GroupedBarChart from '@/components/GroupedBarChart.vue' // Componente de gráfico de barras agrupadas
const userStore = useUserStore()
const isAdmin = computed(() => userStore.user.rol === 'Administrador')

// Filtro de clientes
const clientes = ref([])
const clienteSeleccionado = ref<number | null>(0)

const parametro = ref<any>({})

const conceptoPromedio = ref<number[]>([])
const cargaMentalPromedio = ref<number[]>([])

const fetchClientes = async () => {
  const response = await axios.get('/api/analitica/listado-clientes')
  clientes.value = response.data
}

const fetchAnalitica = async () => {
  const params: any = {}
  if (isAdmin.value && clienteSeleccionado.value) {
    params.cliente_id = clienteSeleccionado.value
  }
  const response = await axios.get('/api/analitica/desempeno', { params })
  parametro.value = response.data
  conceptoPromedio.value = [
    response.data.promedioConceptoPorArea.matematicas || 0,
    response.data.promedioConceptoPorArea.lenguaje || 0,
    response.data.promedioConceptoPorArea.ciencias || 0,
    response.data.promedioConceptoPorArea.habilidades_para_la_vida || 0
  ]
  cargaMentalPromedio.value = [
    response.data.promedioCerebralPorArea.matematicas || 0,
    response.data.promedioCerebralPorArea.lenguaje || 0,
    response.data.promedioCerebralPorArea.ciencias || 0,
    response.data.promedioCerebralPorArea.habilidades_para_la_vida || 0
  ]
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