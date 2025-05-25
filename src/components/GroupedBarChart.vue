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
  labels: string[] // Etiquetas del eje X
  datasets: Array<{
    label: string
    data: number[]
    color?: string // color opcional para cada grupo
  }>
  title?: string
}>()

const darkModeStore = useDarkModeStore()

// Paleta de colores por defecto
const palette = [
  '#2563eb', // azul
  '#16a34a', // verde
  '#ea580c', // naranja
  '#dc2626', // rojo
  '#6b7280', // gris
  '#111827', // gris oscuro
  '#7c3aed', // purpura
]

// Genera colores para los datasets si no se especifica
function getDatasetColors(index: number) {
  return palette[index % palette.length]
}

const chartData = computed(() => ({
  labels: props.labels,
  datasets: props.datasets.map((ds, idx) => ({
    label: ds.label,
    data: ds.data,
    backgroundColor: ds.color || getDatasetColors(idx),
  })),
}))

const chartOptions = computed(() => ({
  responsive: true,
  plugins: {
    legend: { display: true,
      labels: {
        color: darkModeStore.darkMode ? '#e5e7eb' : '#1e293b',
        font: { size: 14 },
      },
    },
    title: {
      display: !!props.title,
      text: props.title,
      color: darkModeStore.darkMode ? '#e5e7eb' : '#1e293b',
      font: { size: 20 },
    },
  },
  scales: {
    x: {
      stacked: false,
      ticks: {
        color: darkModeStore.darkMode ? '#e5e7eb' : '#1e293b',
      },
      grid: {
        color: darkModeStore.darkMode ? '#374151' : '#e5e7eb',
      },
    },
    y: {
      beginAtZero: true,
      stacked: false,
      ticks: {
        color: darkModeStore.darkMode ? '#e5e7eb' : '#1e293b',
      },
      grid: {
        color: darkModeStore.darkMode ? '#374151' : '#e5e7eb',
      },
    },
  },
}))
</script>