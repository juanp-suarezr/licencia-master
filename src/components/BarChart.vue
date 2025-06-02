<!-- filepath: src/components/BarChart.vue -->
<template>
  <Bar :data="chartData" :options="chartOptions" />
</template>

<script setup lang="ts">
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js'
import { computed } from 'vue'
import { useDarkModeStore } from '@/store/darkMode'
import ChartDataLabels from 'chartjs-plugin-datalabels'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ChartDataLabels)

const props = defineProps<{
  labels: string[]
  values: number[]
  title?: string,
  color?: string[] // prop opcional para colores personalizados
  horizontal?: boolean
}>()

const darkModeStore = useDarkModeStore()

const palette = [
  '#3C50E0', // azul base
  '#1E40AF', // azul oscuro
  '#1E80AE', // azul medio-oscuro
  '#7C3AED', // púrpura medio
  '#4C1D95', // púrpura oscuro
  '#16A34A', // verde medio
  '#065F46', // verde oscuro
  '#10B981', // verde esmeralda
];

function getRandomColors(length: number) {
  const colors = []
  const usedIndexes = new Set()
  for (let i = 0; i < length; i++) {
    let idx
    do {
      idx = Math.floor(Math.random() * palette.length)
    } while (usedIndexes.has(idx) && usedIndexes.size < palette.length)
    usedIndexes.add(idx)
    colors.push(palette[idx])
    if (usedIndexes.size === palette.length) usedIndexes.clear()
  }
  return colors
}

const chartData = computed(() => ({
  labels: props.labels,
  datasets: [
    {
      label: props.title || 'Datos',
      backgroundColor: props.color && props.color.length
        ? props.color
        : getRandomColors(props.values.length),
      data: props.values,
    },
  ],
}))

const chartOptions = computed(() => ({
  responsive: true,
  indexAxis: props.horizontal ? 'y' : 'x', // <-- Orientación dinámica
  plugins: {
    legend: { display: false },
    title: {
      display: !!props.title,
      text: props.title,
      color: darkModeStore.darkMode ? '#e5e7eb' : '#64748b', // Reactivo según Pinia
      font: {
        size: 18,
      },
    },
    datalabels: {
      color: '#fff',
      font: { weight: 'normal', size: 12 },
      formatter: (value: number) => value,
    },
    
  },
}))
</script>