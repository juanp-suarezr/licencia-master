<!-- filepath: src/components/PieChart.vue -->
<template>
  <Pie :data="chartData" :options="chartOptions" />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Pie } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels'

ChartJS.register(Title, Tooltip, Legend, ArcElement, ChartDataLabels)

const props = defineProps<{
  labels?: string[]
  values?: number[]
  title?: string
}>()

// Paleta de colores semi dark
const palette = [
  '#3C50E0', // azul base
  '#16A34A', // verde medio
  '#7C3AED', // púrpura medio
  '#1E40AF', // azul oscuro
  '#065F46', // verde oscuro
  '#C4B5FD', // púrpura claro
  '#BBF7D0', // verde claro
  '#93C5FD', // azul
  '#10B981', // verde esmeralda
  '#4C1D95', // púrpura oscuro
]

// Genera un array de colores de la paleta, repitiendo si es necesario
function getColors(length: number) {
  const colors = []
  for (let i = 0; i < length; i++) {
    colors.push(palette[i % palette.length])
  }
  return colors
}

const chartData = computed(() => {
  const chartLabels = props.labels ?? ['Registrados', 'Activos']
  const chartValues = props.values ?? [0, 0]
  return {
    labels: chartLabels,
    datasets: [
      {
        data: chartValues,
        backgroundColor: getColors(chartLabels.length),
      },
    ],
  }
})

const chartOptions = {
  responsive: true,
  plugins: {
    legend: { position: 'bottom' },
    title: props.title ? { display: true, text: props.title } : { display: false },
    datalabels: {
      color: '#fff',
      font: { weight: 'bold', size: 12 },
      formatter: (value: number) => value,
    },
  },
}
</script>