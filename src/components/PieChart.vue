<!-- filepath: src/components/PieChart.vue -->
<template>
  <Pie :data="chartData" :options="chartOptions" />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Pie } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, ArcElement)

const props = defineProps<{
  labels?: string[]
  values?: number[]
  title?: string
}>()

// Paleta de colores semi dark
const palette = [
  '#2563eb', // azul
  '#16a34a', // verde
  '#ea580c', // naranja
  '#dc2626', // rojo
  '#6b7280', // gris
  '#111827', // gris oscuro
  '#7c3aed', // purpura
  '#f59e42', // naranja claro
  '#64748b', // slate
  '#a21caf', // violeta oscuro
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
  },
}
</script>