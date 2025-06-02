<template>
  <div class="w-full flex justify-start">
    <breadcrumb-default pageTitle="Juegos" pageSubtitle="Analítica" path="/"></breadcrumb-default>
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
      class="mb-2 w-full col-span-4 bg-white dark:bg-graydark rounded-md shadow-md p-6 flex flex-col items-center"
    >
      <div class="text-xl font-bold mb-2">Entrenamientos completados</div>
      <div class="w-full px-4 flex flex-wrap justify-center gap-4">
        <!-- Libre -->
        <div class="flex items-center justify-center gap-2">
          <!-- cuadro color libre -->
          <div class="w-full rounded-md shadow-xl bg-primary p-2 text-white">
            <p>Libre</p>
          </div>
        </div>
        <!-- Misión -->
        <div class="flex items-center justify-center gap-2">
          <!-- cuadro color misión -->
          <div class="w-full rounded-md shadow-xl bg-success p-2 text-white">
            <p>Misión</p>
          </div>
        </div>
      </div>
    </div>
    <!-- Columna 1 Knob entrenamientos completados modo libre -->
    <div
      class="mb-4 w-full sm:col-span-2 bg-white dark:bg-graydark rounded-md shadow-md p-6 flex flex-col items-center"
    >
      <div class="text-xl font-bold mb-2">Modo libre</div>

      <Knob readonly v-model="juegosLibres" :size="120" :showValue="true" class="my-4" />
      <div class="text-sm text-gray-700 dark:text-gray-300 mt-2" valueColor="#3C50E0">
        Desempeño &ge; 70: <b>{{ parametro.totalJuegosLibresConceptoMayor70 ?? 0 }}</b> de
        <b>{{ parametro.totalJuegosLibres ?? 0 }}</b>
      </div>
    </div>
    <!-- Columna 2 Knob entrenamientos completados modo mision -->
    <div
      class="mb-4 w-full sm:col-span-2 bg-white dark:bg-graydark rounded-md shadow-md p-6 flex flex-col items-center"
    >
      <div class="text-xl font-bold mb-2">Modo misión</div>
      <Knob
        v-model="juegosHistoricos"
        :size="120"
        :showValue="true"
        readonly
        class="my-4"
        valueColor="#219653"
      />
      <div class="text-sm text-gray-700 dark:text-gray-300 mt-2">
        Desempeño &ge; 70: <b>{{ parametro.totalJuegosHistoricosConceptoMayor70 ?? 0 }}</b> de
        <b>{{ parametro.totalJuegosHistoricos ?? 0 }}</b>
      </div>
    </div>
    <!-- Columna 1 Titulo general -->
    <div
      class="mt-4 mb-2 w-full col-span-4 bg-white dark:bg-graydark rounded-md shadow-md p-2 flex flex-col items-center"
    >
      <div class="text-xl font-bold mb-2">Niveles</div>
    </div>
    <!-- Columna 3 barras niveles intentados -->
    <div
      class="mb-4 W-full col-span-2 bg-white dark:bg-graydark rounded-md shadow-md p-6 flex flex-col items-center"
    >
      <div class="text-xl font-bold">Niveles intentados</div>
      <div class="text-sm text-gray-700 dark:text-gray-300 mt-2">Desempeño &ge; 20</div>
      <select
        v-model="nivelSeleccionado"
        @change="changeLevel"
        class="border border-gray-300 rounded-md px-2 py-1 dark:bg-slate-900 dark:text-white my-4"
      >
        <option value="" disabled selected>Selecciona un modo</option>
        <option value="1">Modo Misión</option>
        <option value="2">Modo Libre</option>
        <option value="3">Todos</option>
      </select>

      <BarChart
        :labels="['Básico', 'Intermedio', 'Avanzado', 'Master']"
        :values="nivelesIntentados"
        :title="tituloBarChart"
      />
      Total intentados:
      <b>{{ totalIntentados }}</b>
    </div>
    <!-- Columna 4 niveles completaods -->
    <div
      class="mb-4 W-full col-span-2 bg-white dark:bg-graydark rounded-md shadow-md p-6 flex flex-col items-center"
    >
      <div class="text-xl font-bold">Niveles completados</div>
      <div class="text-sm text-gray-700 dark:text-gray-300 mt-2">Desempeño &ge; 70</div>
      <select
        v-model="nivelSeleccionado1"
        @change="changeLevel1"
        class="border border-gray-300 rounded-md px-2 py-1 dark:bg-slate-900 dark:text-white my-4"
      >
        <option value="" disabled selected>Selecciona un modo</option>
        <option value="1">Modo Misión</option>
        <option value="2">Modo Libre</option>
        <option value="3">Todos</option>
      </select>

      <BarChart
        :labels="['Básico', 'Intermedio', 'Avanzado', 'Master']"
        :values="nivelesCompletados"
        :title="tituloBarChart1"
      />
      Total completados:
      <b>{{ totalCompletados }}</b>
    </div>
    <!-- Columna 5 Tiempo promedio por nivel de juego -->
    <div
      class="w-full col-span-2 bg-white dark:bg-graydark rounded-md shadow-md p-6 flex flex-col items-center"
    >
      <div class="text-xl font-bold">Tiempo promedio de juego exitoso por niveles</div>
      <div class="text-sm text-gray-700 dark:text-gray-300 mt-2">Desempeño &ge; 70</div>
      <select
        v-model="nivelSeleccionado2"
        @change="changeLevel2"
        class="border border-gray-300 rounded-md px-2 py-1 dark:bg-slate-900 dark:text-white my-4"
      >
        <option value="" disabled selected>Selecciona un modo</option>
        <option value="1">Modo Misión</option>
        <option value="2">Modo Libre</option>
        <option value="3">Todos</option>
      </select>

      <LineChart
        :labels="['Básico', 'Intermedio', 'Avanzado', 'Master']"
        :values="nivelesTiempo"
        :title="tituloLineChart"
      />
    </div>
    <!-- Columna 6 Tiempo promedio por area y nivel de juego -->
    <div
      class="W-full col-span-2 bg-white dark:bg-graydark rounded-md shadow-md p-6 flex flex-col items-center"
    >
      <div class="text-xl font-bold">
        Tiempo promedio de juego exitoso por niveles y área de conocimiento
      </div>
      <div class="text-sm text-gray-700 dark:text-gray-300 mt-2">Desempeño &ge; 70</div>
      <select
        v-model="AreaSeleccionado"
        @change="changeLevel3"
        class="border border-gray-300 rounded-md px-2 py-1 dark:bg-slate-900 dark:text-white my-4"
      >
        <option value="" disabled selected>Selecciona un area de conocimiento</option>
        <option value="1">Matemáticas</option>
        <option value="2">Lenguaje</option>
        <option value="3">Ciencias</option>
        <option value="4">Habilidades para la Vida</option>
      </select>

      <LineChart
        :labels="['Básico', 'Intermedio', 'Avanzado', 'Master']"
        :values="nivelesTiempo1"
        :title="tituloLineChart1"
      />
    </div>
    <!-- Columna 7 Tiempo promedio por nivel de juego en tabla -->
    <div
      class="mb-4 w-full col-span-2 bg-white dark:bg-graydark rounded-md shadow-md p-6 flex flex-col items-center"
    >
      <div class="text-xl font-bold mb-2">Leyenda: Tiempo promedio por nivel</div>
      <table class="table-auto w-full text-sm">
        <thead>
          <tr>
            <th class="py-2 px-2 font-medium text-black dark:text-white text-left">Nivel</th>
            <th class="py-2 px-2 font-medium text-black dark:text-white text-right">Minutos</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(label, idx) in ['Básico', 'Intermedio', 'Avanzado', 'Master']" :key="label">
            <td class="py-2 px-2 text-left">{{ label }}</td>
            <td class="py-2 px-2 text-right">
              {{ nivelesTiempo[idx] }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- Columna 8 Tiempo promedio por area y nivel de juego en tabla -->
    <div
      class="mb-4 w-full col-span-2 bg-white dark:bg-graydark rounded-md shadow-md p-6 flex flex-col items-center"
    >
      <div class="text-xl font-bold mb-2">Leyenda: Tiempo promedio por niveles y área</div>
      <table class="table-auto w-full text-sm">
        <thead>
          <tr>
            <th class="py-2 px-2 font-medium text-black dark:text-white text-left">Nivel</th>
            <th class="py-2 px-2 font-medium text-black dark:text-white text-right">Minutos</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(label, idx) in ['Básico', 'Intermedio', 'Avanzado', 'Master']" :key="label">
            <td class="py-2 px-2 text-left">{{ label }}</td>
            <td class="py-2 px-2 text-right">
              {{ nivelesTiempo1[idx] }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, inject, computed } from 'vue'
import axios from '../../plugins/axios'
import BreadcrumbDefault from '@/components/Breadcrumbs/BreadcrumbDefault.vue'
import PieChart from '@/components/PieChart.vue' // Componente pie
import BarChart from '@/components/BarChart.vue' // Componente barchart
import LineChart from '@/components/LineChart.vue' // Componente linechart
import { useUserStore } from '@/store/auth'
import Knob from 'primevue/knob'

const userStore = useUserStore()
const isAdmin = computed(() => userStore.user.rol === 'Administrador')

// Filtro de clientes
const clientes = ref([])
const clienteSeleccionado = ref<number | null>(0)

const parametro = ref<any>({})
const juegosLibres = ref(0)
const juegosHistoricos = ref(0)

// Niveles intentados
const nivelSeleccionado = ref('3') // 3 = Todos
const nivelesIntentados = ref([0, 0, 0, 0])
const tituloBarChart = ref('Modo libre y misión intentados por los estudiantes')
const totalIntentados = ref(0)

// Niveles completados
const nivelSeleccionado1 = ref('3') // 3 = Todos
const nivelesCompletados = ref([0, 0, 0, 0])
const tituloBarChart1 = ref('Modo libre y misión completados por los estudiantes')
const totalCompletados = ref(0)

// Tiempo promedio por nivel de juego
const nivelSeleccionado2 = ref('3') // 3 = Todos
const nivelesTiempo = ref([0, 0, 0, 0])
const tituloLineChart = ref('Tiempo(minutos) promedio por nivel de juego')

// Tiempo promedio por area y nivel de juego
const AreaSeleccionado = ref('1') // 3 = Matematicas
const nivelesTiempo1 = ref([0, 0, 0, 0])
const tituloLineChart1 = ref('Tiempo(minutos) promedio en matemáticas según nivel de juego')

const fetchClientes = async () => {
  const response = await axios.get('/api/analitica/listado-clientes')
  clientes.value = response.data
}

const fetchAnalitica = async () => {
  const params: any = {}
  if (isAdmin.value && clienteSeleccionado.value) {
    params.cliente_id = clienteSeleccionado.value
  }
  const response = await axios.get('/api/analitica/juegos', { params })
  parametro.value = response.data
  console.log('parametro', response.data.libresPorNivel20)

  juegosLibres.value =
    parseFloat(
      (
        (response.data.totalJuegosLibresConceptoMayor70 / response.data.totalJuegosLibres) *
        100
      ).toFixed(1)
    ) || 0
  juegosHistoricos.value =
    parseFloat(
      (
        (response.data.totalJuegosHistoricosConceptoMayor70 / response.data.totalJuegosHistoricos) *
        100
      ).toFixed(1)
    ) || 0

  changeLevel()
  changeLevel1()
  changeLevel2()
  changeLevel3()
}

//Mostrar por modo numero de intentos x nivel
const changeLevel = () => {
  if (nivelSeleccionado.value === '1') {
    tituloBarChart.value = 'Modo Misión intentados por los estudiantes'
    nivelesIntentados.value = [
      parametro.value.historicosPorNivelConcepto20.basico,
      parametro.value.historicosPorNivelConcepto20.intermedio,
      parametro.value.historicosPorNivelConcepto20.avanzado,
      parametro.value.historicosPorNivelConcepto20.master,
    ]
    totalIntentados.value = parametro.value.totalHistoricosConcepto20
  } else if (nivelSeleccionado.value === '2') {
    tituloBarChart.value = 'Modo Libre intentados por los estudiantes'
    nivelesIntentados.value = [
      parametro.value.libresPorNivelConcepto20.basico,
      parametro.value.libresPorNivelConcepto20.intermedio,
      parametro.value.libresPorNivelConcepto20.avanzado,
      parametro.value.libresPorNivelConcepto20.master,
    ]
    totalIntentados.value = parametro.value.totalLibresConcepto20
  } else {
    tituloBarChart.value = 'Modo libre y misión intentados por los estudiantes'
    nivelesIntentados.value = [
      parametro.value.historicosPorNivelConcepto20.basico +
        parametro.value.libresPorNivelConcepto20.basico,
      parametro.value.historicosPorNivelConcepto20.intermedio +
        parametro.value.libresPorNivelConcepto20.intermedio,
      parametro.value.historicosPorNivelConcepto20.avanzado +
        parametro.value.libresPorNivelConcepto20.avanzado,
      parametro.value.historicosPorNivelConcepto20.master +
        parametro.value.libresPorNivelConcepto20.master,
    ]
    totalIntentados.value =
      parametro.value.totalHistoricosConcepto20 + parametro.value.totalLibresConcepto20
  }
}

//Mostrar por modo numero de completados x nivel
const changeLevel1 = () => {
  if (nivelSeleccionado1.value === '1') {
    tituloBarChart1.value = 'Modo Misión completados por los estudiantes'
    nivelesCompletados.value = [
      parametro.value.historicosPorNivelConcepto70.basico,
      parametro.value.historicosPorNivelConcepto70.intermedio,
      parametro.value.historicosPorNivelConcepto70.avanzado,
      parametro.value.historicosPorNivelConcepto70.master,
    ]
    totalCompletados.value = parametro.value.totalHistoricosConcepto70
  } else if (nivelSeleccionado1.value === '2') {
    tituloBarChart1.value = 'Modo Libre completados por los estudiantes'
    nivelesCompletados.value = [
      parametro.value.libresPorNivelConcepto70.basico,
      parametro.value.libresPorNivelConcepto70.intermedio,
      parametro.value.libresPorNivelConcepto70.avanzado,
      parametro.value.libresPorNivelConcepto70.master,
    ]
    totalCompletados.value = parametro.value.totalLibresConcepto70
  } else {
    tituloBarChart1.value = 'Modo libre y misión completados por los estudiantes'
    nivelesCompletados.value = [
      parametro.value.historicosPorNivelConcepto70.basico +
        parametro.value.libresPorNivelConcepto70.basico,
      parametro.value.historicosPorNivelConcepto70.intermedio +
        parametro.value.libresPorNivelConcepto70.intermedio,
      parametro.value.historicosPorNivelConcepto70.avanzado +
        parametro.value.libresPorNivelConcepto70.avanzado,
      parametro.value.historicosPorNivelConcepto70.master +
        parametro.value.libresPorNivelConcepto70.master,
    ]
    totalCompletados.value =
      parametro.value.totalHistoricosConcepto70 + parametro.value.totalLibresConcepto70
  }
}

//Mostrar por modo tiempo promedio x nivel
const changeLevel2 = () => {
  if (nivelSeleccionado2.value === '1') {
    tituloLineChart.value = 'Modo Misión tiempo(minutos) promedio por niveles'
    nivelesTiempo.value = [
      parametro.value.historicosPromedioTiempoPorNivel.basico,
      parametro.value.historicosPromedioTiempoPorNivel.intermedio,
      parametro.value.historicosPromedioTiempoPorNivel.avanzado,
      parametro.value.historicosPromedioTiempoPorNivel.master,
    ]
  } else if (nivelSeleccionado2.value === '2') {
    tituloLineChart.value = 'Modo Libre tiempo(minutos) promedio por niveles'
    nivelesTiempo.value = [
      parametro.value.libresPromedioTiempoPorNivel.basico,
      parametro.value.libresPromedioTiempoPorNivel.intermedio,
      parametro.value.libresPromedioTiempoPorNivel.avanzado,
      parametro.value.libresPromedioTiempoPorNivel.master,
    ]
  } else {
    tituloLineChart.value = 'Modo libre y misión tiempo(minutos) promedio por niveles'
    nivelesTiempo.value = [
      parametro.value.historicosPromedioTiempoPorNivel.basico +
        parametro.value.libresPromedioTiempoPorNivel.basico,
      parametro.value.historicosPromedioTiempoPorNivel.intermedio +
        parametro.value.libresPromedioTiempoPorNivel.intermedio,
      parametro.value.historicosPromedioTiempoPorNivel.avanzado +
        parametro.value.libresPromedioTiempoPorNivel.avanzado,
      parametro.value.historicosPromedioTiempoPorNivel.master +
        parametro.value.libresPromedioTiempoPorNivel.master,
    ]
  }
}

//Mostrar por area de conocimiento tiempo promedio x nivel
const changeLevel3 = () => {
  if (AreaSeleccionado.value === '1') {
    tituloLineChart1.value = 'Tiempo(Minutos) promedio en matemáticas según nivel de juego'
    nivelesTiempo1.value = [
      parametro.value.promedioTiempoPorAreaNivel.matematicas.basico,
      parametro.value.promedioTiempoPorAreaNivel.matematicas.intermedio,
      parametro.value.promedioTiempoPorAreaNivel.matematicas.avanzado,
      parametro.value.promedioTiempoPorAreaNivel.matematicas.master,
    ]
  } else if (AreaSeleccionado.value === '2') {
    tituloLineChart1.value = 'Tiempo(Minutos) promedio en lenguaje según nivel de juego'
    nivelesTiempo1.value = [
      parametro.value.promedioTiempoPorAreaNivel.lenguaje.basico,
      parametro.value.promedioTiempoPorAreaNivel.lenguaje.intermedio,
      parametro.value.promedioTiempoPorAreaNivel.lenguaje.avanzado,
      parametro.value.promedioTiempoPorAreaNivel.lenguaje.master,
    ]
  } else if (AreaSeleccionado.value === '3') {
    tituloLineChart1.value = 'Tiempo(Minutos) promedio en ciencias según nivel de juego'
    nivelesTiempo1.value = [
      parametro.value.promedioTiempoPorAreaNivel.ciencias.basico,
      parametro.value.promedioTiempoPorAreaNivel.ciencias.intermedio,
      parametro.value.promedioTiempoPorAreaNivel.ciencias.avanzado,
      parametro.value.promedioTiempoPorAreaNivel.ciencias.master,
    ]
  } else {
    tituloLineChart1.value =
      'Tiempo(Minutos) promedio en habilidades para la Vida según nivel de juego'
    nivelesTiempo1.value = [
      parametro.value.promedioTiempoPorAreaNivel.habilidades_para_la_vida.basico,
      parametro.value.promedioTiempoPorAreaNivel.habilidades_para_la_vida.intermedio,
      parametro.value.promedioTiempoPorAreaNivel.habilidades_para_la_vida.avanzado,
      parametro.value.promedioTiempoPorAreaNivel.habilidades_para_la_vida.master,
    ]
  }
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