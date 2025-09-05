<template>
  <Line :data="chartData" :options="chartOptions" />
</template>

<script setup lang="ts">
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
} from 'chart.js'
import { computed } from 'vue'
import { useDarkModeStore } from '@/store/darkMode'

ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale)

const props = defineProps<{
  labels: string[]
  values: number[]
  title?: string
  titleY?: string
}>()

const darkModeStore = useDarkModeStore()

const chartData = computed(() => ({
  labels: props.labels,
  datasets: [
    {
      label: props.title || 'Datos',
      data: props.values,
      borderColor: '#2563eb',
      backgroundColor: 'rgba(37,99,235,0.2)',
      tension: 0.4,
      fill: true,
      pointBackgroundColor: '#2563eb',
      pointBorderColor: '#fff',
      pointRadius: 5,
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
      color: darkModeStore.darkMode ? '#e5e7eb' : '#1e293b',
      font: { size: 20 },
    },
    datalabels: {
      color: '#fff',
      font: { weight: 'bold', size: 12 },
      formatter: (value: number) => value,
      display: false,
    },
  },
  scales: {
    x: {
      ticks: {
        color: darkModeStore.darkMode ? '#e5e7eb' : '#1e293b',
      },
      grid: {
        color: darkModeStore.darkMode ? '#374151' : '#e5e7eb',
      },
    },
    y: {
      beginAtZero: true,
      ticks: {
        color: darkModeStore.darkMode ? '#e5e7eb' : '#1e293b',
      },
      grid: {
        color: darkModeStore.darkMode ? '#374151' : '#e5e7eb',
      },
      title: {
        display: props.titleY != '' && props.titleY != null , // 👈 habilita el label
        text: props.titleY, // 👈 el texto del eje Y
        color: darkModeStore.darkMode ? '#e5e7eb' : '#1e293b',
        font: { size: 16, weight: 'bold' },
      },
    },
  },
}))
</script>