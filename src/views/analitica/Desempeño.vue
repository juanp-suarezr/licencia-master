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

  <div class="w-full sm:grid sm:grid grid-cols-4 md:gap-4 sm:gap-2">
    <!-- Columna 1 Titulo general -->
    <div
      class="mb-4 w-full col-span-4 bg-white dark:bg-graydark rounded-md shadow-md p-6 flex flex-col items-center"
    >
      <div class="text-xl font-bold mb-2">Desempeño promedio en juegos con banda conectada</div>
      Total de juegos jugados con banda conectada:
      <span class="font-bold">{{ parametro.totalJuegosConBandaConectada }}</span>
    </div>
    <!-- Columna 1 Titulo desempeño por areas -->
    <div
      class="mb-2 w-full col-span-4 bg-white dark:bg-graydark rounded-md shadow-md p-6 flex flex-col items-center"
    >
      <div class="text-xl font-bold mb-2">Desempeño promedio por área</div>
      <div class="w-full px-4 flex flex-wrap justify-center gap-4">
        <!-- Libre -->
        <div class="flex items-center justify-center gap-2">
          <!-- cuadro color libre -->
          <div class="w-full rounded-md shadow-xl bg-primary p-2 text-white">
            <p>Concepto</p>
          </div>
        </div>
        <!-- Misión -->
        <div class="flex items-center justify-center gap-2">
          <!-- cuadro color misión -->
          <div class="w-full rounded-md shadow-xl bg-success p-2 text-white">
            <p>Carga Mental</p>
          </div>
        </div>
      </div>
    </div>
    <!-- Columna 1 concepto promedio -->
    <div
      class="mb-4 col-span-2 w-full bg-white dark:bg-graydark rounded-md shadow-md p-6 flex flex-col items-center"
    >
      <BarChart
        :labels="['Matemáticas', 'Lenguaje', 'Ciencias', 'Hab. para la vida']"
        :values="conceptoPromedio"
        title="Concepto promedio por área"
        :color="['#2563eb', '#1E40AF', '#3C50E0', '#1E80AE']"
      />
    </div>
    <!-- Columna 2 carga mental promedio -->
    <div
      class="mb-4 col-span-2 w-full bg-white dark:bg-graydark rounded-md shadow-md p-6 flex flex-col items-center"
    >
      <BarChart
        :labels="['Matemáticas', 'Lenguaje', 'Ciencias', 'Hab. para la vida']"
        :values="cargaMentalPromedio"
        title="Carga Mental promedio por área"
        :color="['#16A34A', '#065F46', '#10B981', '#80B950']"
      />
    </div>
    <!-- Columna 3 Titulo desempeño por habilidades -->
    <div
      class="mb-2 w-full col-span-4 bg-white dark:bg-graydark rounded-md shadow-md p-6 flex flex-col items-center"
    >
      <div class="text-xl font-bold mb-2">Desempeño promedio en habilidades cognitivas</div>

      Total de juegos con desempeño superior a 70% en habilidades cognitivas
      <span class="font-bold">{{ parametro.totalJuegosHabilidad }}</span>
    </div>
    <!-- Columna 1 tabla  -->
    <div
      class="mb-4 col-span-2 w-full bg-white dark:bg-graydark rounded-md shadow-md p-6 flex flex-col items-center"
    >
      <table class="table-auto w-full text-sm">
        <thead>
          <tr>
            <th class="py-2 px-2 font-medium text-black dark:text-white text-left">
              Habilidades cognitiva
            </th>
            <th class="py-2 px-2 font-medium text-black dark:text-white text-right">
              Numero de juegos superados
            </th>
          </tr>
        </thead>
        <tbody>
          <!-- atencion -->
          <tr>
            <td class="py-2 px-2 text-left">Atención</td>
            <td class="py-2 px-2 text-right">
              {{
                parametro.juegosHabilidadConteo ? parametro.juegosHabilidadConteo.atencion || 0 : 0
              }}
            </td>
          </tr>
          <!-- flexibilidad cognitiva -->
          <tr>
            <td class="py-2 px-2 text-left">Flexibilidad cognitiva</td>
            <td class="py-2 px-2 text-right">
              {{
                parametro.juegosHabilidadConteo
                  ? parametro.juegosHabilidadConteo.flex_cognitiva || 0
                  : 0
              }}
            </td>
          </tr>
          <!-- habilidad espacial -->
          <tr>
            <td class="py-2 px-2 text-left">Habilidad espacial</td>
            <td class="py-2 px-2 text-right">
              {{
                parametro.juegosHabilidadConteo
                  ? parametro.juegosHabilidadConteo.habilidad_espacial || 0
                  : 0
              }}
            </td>
          </tr>
          <!-- Memoria -->
          <tr>
            <td class="py-2 px-2 text-left">Memoria</td>
            <td class="py-2 px-2 text-right">
              {{
                parametro.juegosHabilidadConteo ? parametro.juegosHabilidadConteo.memoria || 0 : 0
              }}
            </td>
          </tr>
          <!-- Toma de desiciones -->
          <tr>
            <td class="py-2 px-2 text-left">Toma de desiciones</td>
            <td class="py-2 px-2 text-right">
              {{
                parametro.juegosHabilidadConteo
                  ? parametro.juegosHabilidadConteo.toma_decisiones || 0
                  : 0
              }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- Columna 2 carga mental promedio -->
    <div
      class="mb-4 col-span-2 w-full bg-white dark:bg-graydark rounded-md shadow-md p-6 flex flex-col items-center"
    >
      <BarChart
        :horizontal="true"
        :labels="['Atención', 'Memoria', 'Habilidad Espacial', 'Toma de decisiones',  'Flexibilidad cognitiva']"
        :values="habilidadCognitivaPromedio"
        
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
import BarChart from '@/components/BarChart.vue' // Componente barchart
const userStore = useUserStore()
const isAdmin = computed(() => userStore.user.rol === 'Administrador')

// Filtro de clientes
const clientes = ref([])
const clienteSeleccionado = ref<number | null>(0)

const parametro = ref<any>({})

const conceptoPromedio = ref<number[]>([])
const cargaMentalPromedio = ref<number[]>([])
// Habilidad cognitiva promedio
const habilidadCognitivaPromedio = ref<number[]>([])

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
    response.data.promedioConceptoPorArea.habilidades_para_la_vida || 0,
  ]
  cargaMentalPromedio.value = [
    response.data.promedioCerebralPorArea.matematicas || 0,
    response.data.promedioCerebralPorArea.lenguaje || 0,
    response.data.promedioCerebralPorArea.ciencias || 0,
    response.data.promedioCerebralPorArea.habilidades_para_la_vida || 0,
  ]
  habilidadCognitivaPromedio.value = [
    response.data.promedioHabilidad.atencion || 0,
    response.data.promedioHabilidad.flex_cognitiva || 0,
    response.data.promedioHabilidad.habilidad_espacial || 0,
    response.data.promedioHabilidad.memoria || 0,
    response.data.promedioHabilidad.toma_decisiones || 0,
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