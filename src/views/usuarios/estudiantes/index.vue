<template>
  <div class="w-full flex justify-start">
    <breadcrumb-default pageTitle="Estudiantes"></breadcrumb-default>
  </div>
  <div class="w-full flex flex-wrap items-center sm:grid grid-cols-2 gap-2">
    <!-- seleccionar cliente (solo admin) -->
    <div
      v-if="user.rol == 'Administrador'"
      class="dark:bg-graydark bg-white text-gray-500 p-4 rounded-md shadow-md flex flex-wrap items-center h-full gap-4"
    >
      <label for="clientesSelect" class="block text-sm font-medium text-gray-700 mb-1"
        >Seleccione un cliente</label
      >
      <select
        id="clientesSelect"
        v-model="cliente"
        @change="actuBycliente"
        class="text-xs rounded-md bg-gray dark:bg-boxdark justify-end shadow-md p-2 w-[90%]"
      >
        <option value="">Todos los clientes</option>
        <option v-for="item in infoClientes" :key="item.id" :value="item.id">
          {{ item.correo }} - {{ item.institucion }}
        </option>
      </select>
    </div>
    <!-- filtro por grupo (todos los roles) -->
    <div class="dark:bg-graydark bg-white text-gray-500 p-4 rounded-md shadow-md flex flex-wrap items-center h-full gap-4">
      <label for="gruposSelect" class="block text-sm font-medium text-gray-700 mb-1">Seleccione un grupo</label>
      <select
        id="gruposSelect"
        v-model="grupo_id"
        @change="actuByGrupo"
        class="text-xs rounded-md bg-gray dark:bg-boxdark justify-end shadow-md p-2 w-[90%]"
      >
        <option value="">Todos los grupos</option>
        <option v-for="grupo in infoGrupos" :key="grupo.id" :value="grupo.id">
          {{ grupo.nombre_grupo }}
        </option>
      </select>
    </div>
    <!-- total clientes -->
    <div
      class="dark:bg-graydark bg-white text-gray-500 p-4 rounded-md shadow-md flex items-center gap-2 h-full"
    >
      <!-- info -->
      <div class="w-full">
        <h3 class="text-sm font-bold">Total de estudiantes</h3>
        <p class="text-lg">{{ totalEstudiantes }}</p>
      </div>
      <!-- icono -->
      <div class="w-auto flex items-center justify-end">
        <span class="bg-warning/20 shadow-lg p-2 rounded-md">
          <AcademicCapIcon class="h-6 w-6 text-warning/40" />
        </span>
      </div>
    </div>
  </div>

  <!-- tabla usuarios -->
  <div class="w-full mt-6 bg-white dark:bg-boxdark p-2 rounded-md shadow-md">
    <div class="flex flex-wrap justify-between items-center">
      <h2 class="mt-2 px-4 text-base">Estudiantes</h2>
      <div class="w-auto gap-4">
        <a
          href="/estudiantes-create"
          class="p-2 hover:scale-105 bg-gray dark:bg-primary/20 dark:text-white rounded-md shadow-md mr-2"
        >
          Nuevo estudiante
        </a>
        <a
          href="/estudiantes-masivo"
          class="p-2 hover:scale-105 bg-gray dark:bg-primary/20 dark:text-white rounded-md shadow-md"
        >
          Importar estudiantes
        </a>
      </div>
    </div>
    <div class="mt-4 px-4 w-full flex flex-wrap justify-between items-center">
      <div class="flex flex-wrap gap-2 mb-2">
        <input
          v-model="search"
          @keyup.enter="fetchUsuarios"
          class="p-2 rounded-md bg-gray dark:bg-graydark placeholder:text-xs shadow-md"
          placeholder="Buscar usuarios..."
        />
        <button
          @click="fetchUsuarios"
          class="p-2 hover:bg-blue-800 bg-boxdark text-white rounded-md shadow-md"
        >
          Buscar
        </button>
        <button
          @click="limpiar"
          class="p-2 hover:scale-105 dark:bg-primary/20 dark:text-white rounded-md shadow-md"
        >
          Limpiar
        </button>
      </div>
      <select
        v-model="perPage"
        @change="fetchUsuarios"
        v-if="totalEstudiantes > 5"
        class="p-2 rounded-md bg-gray dark:bg-graydark justify-end shadow-md"
      >
        <option :value="5">5</option>
        <option v-if="totalEstudiantes >= 6" :value="10">10</option>
        <option v-if="totalEstudiantes >= 11" :value="15">15</option>
        <option v-if="totalEstudiantes >= 16" :value="20">20</option>
      </select>
    </div>
    
    <!-- Barra de acciones masivas -->
    <div v-if="seleccionados.length > 0" class="flex flex-wrap gap-3 items-center bg-blue-100 dark:bg-blue-900/40 border-l-4 border-blue-500 p-3 rounded-md mb-2 mt-4 mx-4 shadow-sm">
      <span class="font-semibold text-sm text-blue-800 dark:text-blue-200">
        {{ seleccionados.length }} estudiante(s) seleccionado(s)
      </span>
      <div class="flex gap-2 flex-wrap">
        <button 
          @click="mostrarModalEdicion = true" 
          class="bg-green-600 text-white px-3 py-1.5 rounded text-sm font-medium hover:bg-green-700 transition-colors shadow-sm flex items-center gap-1"
        >
          <PencilSquareIcon class="h-4 w-4" />
          Editar
        </button>
        <button 
          @click="mostrarConfirmacionEliminar = true" 
          class="bg-red-600 text-white px-3 py-1.5 rounded text-sm font-medium hover:bg-red-700 transition-colors shadow-sm flex items-center gap-1"
        >
          <ArchiveBoxIcon class="h-4 w-4" />
          Eliminar
        </button>
        <button 
          @click="limpiarSeleccion" 
          class="bg-graydark text-white px-3 py-1.5 rounded text-sm font-medium hover:bg-gray-600 transition-colors shadow-sm"
        >
          Cancelar
        </button>
      </div>
    </div>
    
    <div class="overflow-x-auto mt-4">
      <table class="table-auto w-full bg-white dark:bg-boxdark text-sm">
        <thead>
          <tr class="bg-gray-2 text-left dark:bg-meta-4">
            <th class="py-2 px-2 font-medium text-black dark:text-white text-center w-12">
              <input
                type="checkbox"
                :checked="seleccionados.length === usuarios.length && usuarios.length > 0"
                @change="toggleSeleccionarTodos"
                class="h-4 w-4 cursor-pointer"
                aria-label="Seleccionar todos los estudiantes"
              />
            </th>
            <th class="py-2 px-2 font-medium text-black dark:text-white text-left">ID</th>
            <th class="py-2 px-2 font-medium text-black dark:text-white text-left">NOMBRE</th>

            <th class="py-2 px-2 font-medium text-black dark:text-white text-left">CORREO</th>
            <th class="py-2 px-2 font-medium text-black dark:text-white text-left">GRUPO</th>
            <th class="py-2 px-2 font-medium text-black dark:text-white text-left">INSTITUCIÓN</th>
            <th class="py-2 px-2 font-medium text-black dark:text-white text-left">ACCIONES</th>
          </tr>
        </thead>
        <tbody v-if="usuarios.length != 0">
          <tr v-for="(item, index) in usuarios" :key="index" class="text-sm">
            <td class="py-3 px-3 whitespace-nowrap text-center">
              <input
                type="checkbox"
                :value="item.id"
                v-model="seleccionados"
                class="h-4 w-4 cursor-pointer"
                aria-label="Seleccionar estudiante"
              />
            </td>
            <td class="py-3 px-3 whitespace-nowrap text-left">
              <h5 class="font-medium text-graydark dark:text-gray text-sm">
                {{ index + 1 }}
              </h5>
            </td>
            <td class="py-3 px-3 whitespace-normal break-words text-left">
              <h5 class="font-medium text-graydark dark:text-gray text-xs">
                {{ item.nombre }} {{ item.apellidos }}
              </h5>
            </td>
            <td class="py-3 px-3 whitespace-normal break-words text-left">
              <h5 class="font-medium text-graydark dark:text-gray text-xs">
                {{ item.correo }}
              </h5>
            </td>
            <td class="py-3 px-3 whitespace-normal break-words text-left">
              <h5 class="font-medium text-graydark dark:text-gray text-xs">
                {{ item.grupos ? item.grupos.nombre_grupo : 'No vinculado' }}
              </h5>
            </td>

            <td class="py-3 px-3 whitespace-normal break-words text-left">
              <h5 class="font-medium text-graydark dark:text-gray text-xs">
                {{ item.clientes.institucion }}
              </h5>
            </td>

            <td class="py-3 px-2 gap-2 whitespace-nowrap text-left flex flex-wrap items-center">
              <a
                v-tooltip.bottom="'editar'"
                :href="'/estudiantes-edit/' + item.id"
                class="p-2 hover:scale-105 dark:bg-warning/20 bg-warning dark:text-white rounded-md shadow-md"
              >
                <PencilSquareIcon class="h-4 w-4 text-gray" />
              </a>
              <!-- generar pdf modo mision -->
              <button
                v-tooltip.bottom="'generar PDF modo misión'"
                @click="GenerarReporte(item.id)"
                class="p-2 hover:scale-105 dark:bg-primary/20 bg-primary dark:text-white rounded-md shadow-md"
              >
                <DocumentCheckIcon class="h-4 w-4 text-gray" />
              </button>
              <!-- generar pdf modo libre -->
              <button
                v-tooltip.bottom="'generar PDF modo libre'"
                @click="GenerarReporte1(item.id)"
                class="p-2 hover:scale-105 dark:bg-secondary/20 bg-secondary dark:text-white rounded-md shadow-md"
              >
                <DocumentCheckIcon class="h-4 w-4 text-gray" />
              </button>

              <button
                v-tooltip.bottom="'eliminar'"
                @click="eliminarDocente(item.id)"
                class="p-2 hover:scale-105 dark:bg-danger/20 bg-danger dark:text-white rounded-md shadow-md"
              >
                <ArchiveBoxIcon class="h-4 w-4 text-gray" />
              </button>
            </td>
          </tr>
        </tbody>
        <tbody v-else class="w-full">
          <tr>
            <td class="w-auto"></td>
            <td class="w-auto"></td>
            <td class="w-auto"></td>
            <td class="w-auto"></td>
            <td class="w-auto flex justify-start items-center py-5">
              <em class="sm:text-xl">No hay registros</em>
            </td>
            <td class="w-auto"></td>
            <td class="w-auto"></td>
          </tr>
        </tbody>
      </table>

      <!-- Paginador -->
      <div class="w-full flex justify-center mt-4" v-if="usuarios.length != 0 || totalPages > 1">
        <vue-awesome-paginate
          :total-items="perPage * totalPages"
          :items-per-page="perPage"
          :max-pages-shown="5"
          v-model="currentPage"
          @click="changePage"
        />
      </div>
    </div>
  </div>

  <!-- Modal -->
  <Modal :isOpen="ModalEliminar" @close="closeModal">
    <div class="p-4 bg-white dark:bg-boxdark rounded-md shadow-md">
      <h3 class="text-lg font-bold">Eliminar estudiante</h3>
      <p class="text-sm mt-2">¿Estás seguro de eliminar este estudiante?</p>
      <div class="flex justify-end mt-4 gap-2">
        <button
          @click="submitEliminar"
          class="p-2 hover:scale-105 bg-danger/20 dark:bg-danger/40 dark:text-white rounded-md shadow-md"
        >
          Eliminar
        </button>
        <button
          @click="ModalEliminar = false"
          class="p-2 hover:scale-105 bg-graydark text-white rounded-md shadow-md"
        >
          Cancelar
        </button>
      </div>
    </div>
  </Modal>

  <!-- Modal de Edición Masiva -->
  <Modal :isOpen="mostrarModalEdicion" @close="cerrarModalEdicion">
    <div class="p-6 bg-white dark:bg-boxdark rounded-md shadow-md w-full max-w-lg">
      <h3 class="text-xl font-bold mb-4">Editar {{ seleccionados.length }} estudiante(s)</h3>
      <form @submit.prevent="actualizarMasivo">
        <div class="mb-4">
          <label class="block text-sm font-medium mb-2">Grado (opcional)</label>
          <select v-model="formData.grado" class="w-full p-2 rounded border dark:bg-graydark dark:border-gray-600">
            <option value="">No cambiar</option>
            <option v-for="n in 12" :key="n" :value="n">Grado {{ n }}</option>
          </select>
        </div>
        <div class="mb-4">
          <label class="block text-sm font-medium mb-2">Grupo (opcional)</label>
          <select v-model="formData.grupo_id" class="w-full p-2 rounded border dark:bg-graydark dark:border-gray-600">
            <option value="">No cambiar</option>
            <option v-for="grupo in infoGrupos" :key="grupo.id" :value="grupo.id">
              {{ grupo.nombre_grupo }}
            </option>
          </select>
        </div>
        <div class="mb-4">
          <label class="block text-sm font-medium mb-2">Edad (opcional)</label>
          <input
            type="number"
            v-model="formData.edad"
            min="3"
            max="20"
            placeholder="Entre 3 y 20 años"
            class="w-full p-2 rounded border dark:bg-graydark dark:border-gray-600"
          />
        </div>
        <div class="mb-4">
          <label class="block text-sm font-medium mb-2">Nueva contraseña (opcional)</label>
          <input
            type="password"
            v-model="formData.password"
            minlength="8"
            placeholder="Mínimo 8 caracteres"
            class="w-full p-2 rounded border dark:bg-graydark dark:border-gray-600"
          />
        </div>
        <div class="flex gap-2 mt-6">
          <button
            type="submit"
            class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors font-medium"
            :disabled="loading"
          >
            {{ loading ? 'Guardando...' : 'Guardar cambios' }}
          </button>
          <button
            type="button"
            @click="cerrarModalEdicion"
            class="bg-graydark text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors font-medium"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  </Modal>

  <!-- Modal de Confirmación de Eliminación Masiva -->
  <Modal :isOpen="mostrarConfirmacionEliminar" @close="cancelarEliminacion">
    <div class="p-6 bg-white dark:bg-boxdark rounded-md shadow-md w-full max-w-md">
      <h3 class="text-xl font-bold mb-3">⚠️ Confirmar Eliminación</h3>
      <p class="text-base mb-2">¿Está seguro de eliminar <strong>{{ seleccionados.length }}</strong> estudiante(s)?</p>
      <div class="bg-red-50 dark:bg-red-900/20 p-3 rounded border border-red-200 dark:border-red-800 mt-3">
        <p class="text-red-700 dark:text-red-300 text-sm font-semibold mb-2">
          ⚠️ Esta acción es <strong>PERMANENTE</strong> y eliminará:
        </p>
        <ul class="text-red-600 dark:text-red-400 text-sm list-disc list-inside space-y-1">
          <li>Datos del estudiante</li>
          <li>Usuario asociado</li>
          <li>Información de juego</li>
          <li>Resultados de juegos</li>
        </ul>
      </div>
      <div class="flex gap-2 mt-6">
        <button
          @click="confirmarEliminacion"
          class="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors font-medium"
          :disabled="loading"
        >
          {{ loading ? 'Eliminando...' : 'Sí, eliminar' }}
        </button>
        <button
          @click="cancelarEliminacion"
          class="bg-graydark text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors font-medium"
        >
          Cancelar
        </button>
      </div>
    </div>
  </Modal>
</template>

<script lang="ts" setup>
import { ref, onMounted, inject, onBeforeUnmount } from 'vue'
import {
  AcademicCapIcon,
  ArchiveBoxIcon,
  PencilSquareIcon,
  DocumentCheckIcon,
} from '@heroicons/vue/24/solid'
import axios from '../../../plugins/axios'
import { useUserStore } from '@/store/auth'
import { storeToRefs } from 'pinia'
import Modal from '@/components/Modal.vue'
import Swal from 'sweetalert2'
import BreadcrumbDefault from '@/components/Breadcrumbs/BreadcrumbDefault.vue'

const swal = inject('$swal') as typeof Swal

//polling y notificaciones
const notificacion = ref<string | null>(null)
let polling: ReturnType<typeof setInterval> | null = null

const userStore = useUserStore()
const { user } = storeToRefs(userStore)

// Simulación de datos

const totalEstudiantes = ref(0)
//info clientes
const infoClientes = ref([])
//info grupos
const infoGrupos = ref([])
// Modal
const ModalEliminar = ref(false)
//id a eliminar
const idEliminar = ref(0)

//pagiandor y search
const usuarios = ref([])
const search = ref('')
const cliente = ref(null)
const grupo_id = ref('')
const perPage = ref(5)
const page = ref(1)
const totalPages = ref(1)
const currentPage = ref(1)

// Estados para edición y eliminación masiva
const seleccionados = ref<number[]>([])
const mostrarModalEdicion = ref(false)
const mostrarConfirmacionEliminar = ref(false)
const loading = ref(false)
const formData = ref({
  grado: '',
  grupo_id: '',
  edad: '',
  password: ''
})

const getTotales = async () => {
  try {
    const response = await axios.get('/api/totales', {
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
        'X-CSRF-TOKEN': '', // Agrega el token CSRF si es necesario
      },
    })
    console.log('Totales obtenidos:', response.data)

    infoClientes.value = response.data.instituciones
    // No llenamos infoGrupos aquí, se llena dinámicamente según el cliente
  } catch (error) {
    console.error('Error al obtener totales:', error)
  }
}

const cargarGruposPorCliente = async (clienteId: number | null) => {
  try {
    let response;
    if (user.value && user.value.rol === 'Administrador') {
      if (!clienteId) {
        infoGrupos.value = [];
        return;
      }
      response = await axios.get(`/api/grupos/cliente/admin/${clienteId}`);
    } else {
      response = await axios.get('/api/grupos/cliente');
    }
    infoGrupos.value = response.data.data || [];
  } catch (error) {
    infoGrupos.value = [];
  }
}

const fetchUsuarios = async () => {
  const response = await axios.get('/api/estudiantes', {
    params: {
      search: search.value,
      cliente: cliente.value,
      grupo_id: grupo_id.value,
      per_page: perPage.value,
      page: page.value,
    },
  })
  console.log('cliente seleccionado:', cliente.value)
  console.log('Usuarios obtenidos:', response.data.data)
  console.log('Total de páginas:', response.data.data.last_page)

  usuarios.value = response.data.data.data
  totalPages.value = response.data.data.last_page
  totalEstudiantes.value = response.data.data.total
}

const changePage = (newPage: number) => {
  page.value = newPage
  fetchUsuarios()
}

const limpiar = () => {
  page.value = 0
  search.value = ''
  grupo_id.value = ''
  fetchUsuarios()
}

const actuBycliente = () => {
  page.value = 0
  fetchUsuarios()
  cargarGruposPorCliente(cliente.value)
}

const actuByGrupo = () => {
  page.value = 0
  fetchUsuarios()
}

const eliminarDocente = (id: number) => {
  console.log('Eliminar cliente:', id)
  idEliminar.value = id
  ModalEliminar.value = true
}

//generar reporte PDF modo misión
const GenerarReporte = async (id: number) => {
  try {
    const response = await axios.get(`/api/analitica/reporte-individual/${id}`, {
      responseType: 'blob', // <-- Esto es clave para archivos
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/pdf',
      },
    })

    // Crear un enlace temporal para descargar el PDF
    const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', `reporte_estudiante_${id}_modo_mision.pdf`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
  } catch (error) {
    console.error('Error al generar el reporte:', error)
    swal.fire({
      icon: 'error',
      title: 'Error al generar el reporte',
      text: 'Ocurrió un error al intentar generar el reporte. Por favor, inténtalo de nuevo más tarde.',
      customClass: {
        popup: 'dark:bg-slate-900 dark:text-gray bg-white text-graydark',
        title: 'dark:text-gray text-graydark',
        confirmButton:
          'bg-blue-800 rounded-md shadow-sm bg-gray dark:bg-primary/20 dark:text-white',
      },
    })
  }
}

//generar reporte PDF modo libre
const GenerarReporte1 = async (id: number) => {
  try {
    const response = await axios.get(`/api/analitica/individual-libre/${id}`, {
      responseType: 'blob', // <-- Esto es clave para archivos
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/pdf',
      },
    })

    // Crear un enlace temporal para descargar el PDF
    const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', `reporte_estudiante_${id}_modo_libre.pdf`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
  } catch (error) {
    console.error('Error al generar el reporte:', error)
    swal.fire({
      icon: 'error',
      title: 'Error al generar el reporte',
      text: 'Ocurrió un error al intentar generar el reporte. Por favor, inténtalo de nuevo más tarde.',
      customClass: {
        popup: 'dark:bg-slate-900 dark:text-gray bg-white text-graydark',
        title: 'dark:text-gray text-graydark',
        confirmButton:
          'bg-blue-800 rounded-md shadow-sm bg-gray dark:bg-primary/20 dark:text-white',
      },
    })
  }
}
const submitEliminar = async () => {
  try {
    const response = await axios.delete(`/api/estudiantes/${idEliminar.value}`, {
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
        'X-CSRF-TOKEN': '', // Agrega el token CSRF si es necesario
      },
    })
    swal.fire({
      icon: 'success',
      title: 'Cliente eliminado con éxito',
      html: `
        <p>${response.data.message}</p>
        <p><strong>Estudiante:</strong> ${response.data.data.nombre} ${response.data.data.apellidos}</p>`,
      customClass: {
        popup: 'dark:bg-slate-900 dark:text-gray bg-white text-graydark',
        title: 'dark:text-gray text-graydark',
        confirmButton:
          'bg-blue-800 rounded-md shadow-sm bg-gray dark:bg-primary/20 dark:text-white',
      },
      didClose: () => {
        ModalEliminar.value = false
        idEliminar.value = 0
        window.location.reload()
      },
    })
  } catch (error) {
    console.error('Error al eliminar cliente:', error)
    swal.fire({
      icon: 'error',
      title: 'Error al eliminar cliente',
      html: `
        <p>Ocurrió un error inesperado, vuelva a intentar más tarde</p>`,
      customClass: {
        popup: 'dark:bg-slate-900 dark:text-gray bg-white text-graydark',
        title: 'dark:text-gray text-graydark',
        confirmButton:
          'bg-blue-800 rounded-md shadow-sm bg-gray dark:bg-primary/20 dark:text-white',
      },
      didClose: () => {
        ModalEliminar.value = false
        idEliminar.value = 0
      },
    })
  }
}

const closeModal = () => {
  ModalEliminar.value = false
  idEliminar.value = 0
}

// Funciones de selección masiva
const toggleSeleccionarTodos = () => {
  if (seleccionados.value.length === usuarios.value.length) {
    seleccionados.value = []
  } else {
    seleccionados.value = usuarios.value.map((e: any) => e.id)
  }
}

const limpiarSeleccion = () => {
  seleccionados.value = []
}

const cerrarModalEdicion = () => {
  mostrarModalEdicion.value = false
  formData.value = { grado: '', grupo_id: '', edad: '', password: '' }
}

const cancelarEliminacion = () => {
  mostrarConfirmacionEliminar.value = false
}

// Validación de formulario
const validarFormulario = () => {
  if (seleccionados.value.length === 0) {
    swal.fire({
      icon: 'warning',
      title: 'Sin selección',
      text: 'Debe seleccionar al menos un estudiante',
      customClass: {
        popup: 'dark:bg-slate-900 dark:text-gray bg-white text-graydark',
        title: 'dark:text-gray text-graydark',
        confirmButton: 'bg-blue-800 rounded-md shadow-sm bg-gray dark:bg-primary/20 dark:text-white',
      },
    })
    return false
  }
  
  if (formData.value.grado && (Number(formData.value.grado) < 1 || Number(formData.value.grado) > 12)) {
    swal.fire({
      icon: 'warning',
      title: 'Grado inválido',
      text: 'El grado debe estar entre 1 y 12',
      customClass: {
        popup: 'dark:bg-slate-900 dark:text-gray bg-white text-graydark',
        title: 'dark:text-gray text-graydark',
        confirmButton: 'bg-blue-800 rounded-md shadow-sm bg-gray dark:bg-primary/20 dark:text-white',
      },
    })
    return false
  }
  
  if (formData.value.edad && (Number(formData.value.edad) < 3 || Number(formData.value.edad) > 20)) {
    swal.fire({
      icon: 'warning',
      title: 'Edad inválida',
      text: 'La edad debe estar entre 3 y 20 años',
      customClass: {
        popup: 'dark:bg-slate-900 dark:text-gray bg-white text-graydark',
        title: 'dark:text-gray text-graydark',
        confirmButton: 'bg-blue-800 rounded-md shadow-sm bg-gray dark:bg-primary/20 dark:text-white',
      },
    })
    return false
  }
  
  if (formData.value.password && formData.value.password.length < 8) {
    swal.fire({
      icon: 'warning',
      title: 'Contraseña inválida',
      text: 'La contraseña debe tener al menos 8 caracteres',
      customClass: {
        popup: 'dark:bg-slate-900 dark:text-gray bg-white text-graydark',
        title: 'dark:text-gray text-graydark',
        confirmButton: 'bg-blue-800 rounded-md shadow-sm bg-gray dark:bg-primary/20 dark:text-white',
      },
    })
    return false
  }
  
  const hayDatos = formData.value.grado || formData.value.grupo_id || formData.value.edad || formData.value.password
  if (!hayDatos) {
    swal.fire({
      icon: 'warning',
      title: 'Sin datos',
      text: 'Debe ingresar al menos un campo para actualizar',
      customClass: {
        popup: 'dark:bg-slate-900 dark:text-gray bg-white text-graydark',
        title: 'dark:text-gray text-graydark',
        confirmButton: 'bg-blue-800 rounded-md shadow-sm bg-gray dark:bg-primary/20 dark:text-white',
      },
    })
    return false
  }
  
  return true
}

// Actualización masiva
const actualizarMasivo = async () => {
  if (!validarFormulario()) return
  
  loading.value = true
  try {
    // Preparar datos solo con campos que tienen valor
    const datos: any = {
      estudiantes_ids: seleccionados.value
    }
    
    if (formData.value.grado) datos.grado = Number(formData.value.grado)
    if (formData.value.grupo_id) datos.grupo_id = Number(formData.value.grupo_id)
    if (formData.value.edad) datos.edad = Number(formData.value.edad)
    if (formData.value.password) datos.password = formData.value.password
    
    const response = await axios.post('/api/estudiantes/update-masivo', datos)
    
    // Construir mensaje de resultado
    let mensaje = `${response.data.data.actualizados} estudiante(s) actualizado(s) correctamente`
    
    // Si hay errores parciales
    if (response.data.data.errores && response.data.data.errores.length > 0) {
      mensaje += `\n\n⚠️ ${response.data.data.fallidos} estudiante(s) no se pudo actualizar:\n`
      mensaje += response.data.data.errores.join('\n')
    }
    
    swal.fire({
      icon: response.data.data.errores && response.data.data.errores.length > 0 ? 'warning' : 'success',
      title: 'Actualización masiva',
      text: mensaje,
      customClass: {
        popup: 'dark:bg-slate-900 dark:text-gray bg-white text-graydark',
        title: 'dark:text-gray text-graydark',
        confirmButton: 'bg-blue-800 rounded-md shadow-sm bg-gray dark:bg-primary/20 dark:text-white',
      },
    })
    
    await fetchUsuarios()
    limpiarSeleccion()
    cerrarModalEdicion()
  } catch (error: any) {
    swal.fire({
      icon: 'error',
      title: 'Error al actualizar',
      text: error.response?.data?.message || 'Error inesperado al actualizar estudiantes',
      customClass: {
        popup: 'dark:bg-slate-900 dark:text-gray bg-white text-graydark',
        title: 'dark:text-gray text-graydark',
        confirmButton: 'bg-blue-800 rounded-md shadow-sm bg-gray dark:bg-primary/20 dark:text-white',
      },
    })
  } finally {
    loading.value = false
  }
}

// Eliminación masiva
const confirmarEliminacion = async () => {
  loading.value = true
  try {
    const response = await axios.post('/api/estudiantes/delete-masivo', {
      estudiantes_ids: seleccionados.value
    })
    
    // Construir mensaje de resultado
    let mensaje = `${response.data.data.eliminados} estudiante(s) eliminado(s) correctamente`
    
    // Si hay errores parciales
    if (response.data.data.errores && response.data.data.errores.length > 0) {
      mensaje += `\n\n⚠️ ${response.data.data.fallidos} estudiante(s) no se pudo eliminar:\n`
      mensaje += response.data.data.errores.join('\n')
    }
    
    swal.fire({
      icon: response.data.data.errores && response.data.data.errores.length > 0 ? 'warning' : 'success',
      title: 'Eliminación masiva',
      text: mensaje,
      customClass: {
        popup: 'dark:bg-slate-900 dark:text-gray bg-white text-graydark',
        title: 'dark:text-gray text-graydark',
        confirmButton: 'bg-blue-800 rounded-md shadow-sm bg-gray dark:bg-primary/20 dark:text-white',
      },
    })
    
    await fetchUsuarios()
    limpiarSeleccion()
    cancelarEliminacion()
  } catch (error: any) {
    swal.fire({
      icon: 'error',
      title: 'Error al eliminar',
      text: error.response?.data?.message || 'Error inesperado al eliminar estudiantes',
      customClass: {
        popup: 'dark:bg-slate-900 dark:text-gray bg-white text-graydark',
        title: 'dark:text-gray text-graydark',
        confirmButton: 'bg-blue-800 rounded-md shadow-sm bg-gray dark:bg-primary/20 dark:text-white',
      },
    })
  } finally {
    loading.value = false
  }
}

//check carga masiva
const checkCargaMasiva = async () => {
  try {
    const res = await axios.get('/api/notificacion-carga-estudiantes')
    if (res.data.completado) {
      if (polling) clearInterval(polling)
      localStorage.removeItem('cargaMasivaEnviada2') // Limpiar el estado de carga masiva

      // Construir HTML detallado
      let html = `<p><strong>Mensaje:</strong> ${res.data.mensaje}</p>`;
      html += `<p><strong>Insertados:</strong> ${res.data.insertados}</p>`;
      html += `<p><strong>Actualizados:</strong> ${res.data.actualizados}</p>`;
      html += `<p><strong>Exitosos:</strong> ${res.data.exitosos}</p>`;
  
      if (Array.isArray(res.data.errores) && res.data.errores.length > 0) {
        html += `<div style=\"margin-top:1em;\"><strong>Errores encontrados:</strong>`;
        html += `<div style=\"overflow-x:auto; max-height:300px;\">`;
        html += `<table style=\"width:100%; border-collapse:collapse; font-size:14px; background:#fff; border-radius:8px; overflow:hidden; box-shadow:0 2px 8px rgba(0,0,0,0.05);\">`;
        html += `<thead style=\"background:#f3f4f6;\"><tr>`;
        html += `<th style=\"padding:8px 12px; border-bottom:2px solid #e5e7eb; text-align:left;\">Fila</th>`;
        html += `<th style=\"padding:8px 12px; border-bottom:2px solid #e5e7eb; text-align:left;\">Datos</th>`;
        html += `<th style=\"padding:8px 12px; border-bottom:2px solid #e5e7eb; text-align:left;\">Errores</th>`;
        html += `</tr></thead><tbody>`;
        res.data.errores.forEach((err, idx) => {
          html += `<tr style=\"background:${idx%2===0?'#f9fafb':'#fff'};\">`;
          html += `<td style=\"padding:8px 12px; border-bottom:1px solid #e5e7eb; color:#1e293b; font-weight:600;\">${err.fila}</td>`;
          html += `<td style="padding:8px 12px; border-bottom:1px solid #e5e7eb; color:#334155;">${(err.datos as string[]).map((d: string) => `<span>${d}</span>`).join(' <span style=\'color:#cbd5e1;\'>|</span> ')}</td>`;
          html += `<td style="padding:8px 12px; border-bottom:1px solid #e5e7eb;">`;
          html += `<ul style=\"margin:0; padding-left:18px;\">`;
          err.errores.forEach(e => {
            html += `<li style=\"color:#dc2626; margin-bottom:2px;\">${e}</li>`;
          });
          html += `</ul></td>`;
          html += `</tr>`;
        });
        html += `</tbody></table></div></div>`;
      }

      swal.fire({
        icon: res.data.errores && res.data.errores.length > 0 ? 'warning' : 'success',
        title: 'Carga masiva completada',
        html,
        width: 1200,
        customClass: {
          popup: 'dark:bg-slate-900 dark:text-gray bg-white text-graydark',
          title: 'dark:text-gray text-graydark',
          confirmButton:
            'bg-blue-800 rounded-md shadow-sm bg-gray dark:bg-primary/20 dark:text-white',
        },
      })
    }
  } catch (e) {
    localStorage.removeItem('cargaMasivaEnviada2') // Limpiar el estado de carga masiva
    // Manejo de error opcional
    swal.fire({
      icon: 'error',
      title: 'Error al verificar carga masiva',
      text: 'Ocurrió un error al verificar el estado de la carga masiva.',
      customClass: {
        popup: 'dark:bg-slate-900 dark:text-gray bg-white text-graydark',
        title: 'dark:text-gray text-graydark',
        confirmButton:
          'bg-blue-800 rounded-md shadow-sm bg-gray dark:bg-primary/20 dark:text-white',
      },
    })
  }
}

const iniciarPolling = () => {
  // Solo inicia el polling si se ha enviado el archivo (ajusta la condición)
  if (localStorage.getItem('cargaMasivaEnviada2') === 'true') {
    polling = setInterval(checkCargaMasiva, 3000)
  }
}

onMounted(() => {
  getTotales()
  fetchUsuarios()
  // Cargar grupos según el rol y cliente seleccionado
  if (user.value && user.value.rol === 'Administrador' && cliente.value) {
    cargarGruposPorCliente(cliente.value)
  } else {
    cargarGruposPorCliente(null)
  }
  iniciarPolling()
})

onBeforeUnmount(() => {
  if (polling) clearInterval(polling)
})
</script>

<style></style>
