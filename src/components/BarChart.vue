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

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const props = defineProps<{
  labels: string[]
  values: number[]
  title?: string
}>()

const darkModeStore = useDarkModeStore()

const palette = [
  '#2563eb', // azul
  '#16a34a', // verde
  '#ea580c', // naranja
  '#dc2626', // rojo
  '#6b7280', // gris
  '#111827', // gris oscuro
  '#7c3aed', // purpura
]

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
      backgroundColor: getRandomColors(props.values.length),
      data: props.values,
    },
  ],
}))

const chartOptions = computed(() => ({
  responsive: true,
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
  },
}))
</script>