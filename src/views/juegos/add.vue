<template>
  <div class="w-full flex justify-start">
    <breadcrumb-default pageTitle="Nuevo Juego" pageSubtitle="Juegos" path="juegos"></breadcrumb-default>
  </div>
  <div class="w-full grid md:grid-cols-3 gap-4">
    <div class="md:col-span-2 w-full p-4 bg-white dark:bg-boxdark rounded-md shadow-md h-full">
      <h2 class="text-lg font-bold mb-4">Crear Nuevo Juego</h2>
      <form @submit.prevent="submit" class="sm:grid sm:grid-cols-2 gap-4">
        <!-- locacion -->
        <div class="mb-4">
          <label for="locacion" class="block text-sm font-medium text-gray-700 mb-2">Asignar Locación</label>
          <select id="locacion" v-model="juegosInfo.locacion" required
            class="text-xs md:text-sm border border-graydark dark:border-strokedark rounded-md shadow-sm dark:bg-slate-900 dark:text-gray justify-end p-2 w-full whitespace-normal break-words">
            <option class="" value="" disabled>Seleccionar locación</option>
            <option class="" v-for="item in parametros.locacion" :key="item.id" :value="item.codigo">{{ item.nombre }}
            </option>
          </select>
        </div>
        <!-- ambiente -->
        <div class="mb-4 relative">
          <label for="ambiente" class="block text-sm font-medium text-gray-700 mb-2">Asignar Ambiente</label>
          <select id="ambiente" v-model="juegosInfo.ambiente" :disabled="!juegosInfo.locacion"
            class="text-xs md:text-sm border border-graydark dark:border-strokedark rounded-md shadow-sm dark:bg-slate-900 dark:text-gray justify-end p-2 w-full whitespace-normal break-words">
            <option class="" value="" disabled>Seleccionar ambiente</option>
            <option class="" v-for="item in filteredAmbientes" :key="item.id" :value="item.codigo">{{ item.nombre }}
            </option>
          </select>
        </div>
        <!-- mision -->
        <div class="mb-4 relative">
          <label for="mision" class="block text-sm font-medium text-gray-700 mb-2">Asignar Misión</label>
          <div @click="toggleDropdownMision"
            class="cursor-pointer text-xs md:text-sm border border-graydark dark:border-strokedark rounded-md shadow-sm dark:bg-slate-900 dark:text-gray justify-end p-2 w-full whitespace-normal break-words">
            {{ selectedMision ? selectedMision.nombre : 'Seleccionar misión' }}
          </div>
          <div v-if="dropdownOpenMision"
            class="absolute z-10 mt-1 w-full bg-white dark:bg-slate-900 border border-graydark dark:border-strokedark rounded-md shadow-lg max-h-40 overflow-auto">
            <input type="text" v-model="searchMision" placeholder="Buscar misión..."
              class="p-2 w-full border-b border-graydark dark:border-strokedark dark:bg-slate-900 dark:text-gray">
            <div v-for="item in filteredMisiones" :key="item.id" @click="selectMision(item)"
              class="cursor-pointer p-2 hover:bg-gray-200 dark:hover:bg-gray-700">
              {{ item.nombre }}
            </div>
          </div>
        </div>
        <!-- juego -->
        <div class="mb-4 relative">
          <label for="juego" class="block text-sm font-medium text-gray-700 mb-2">Asignar Juego</label>
          <div @click="toggleDropdownJuego"
            class="cursor-pointer text-xs md:text-sm border border-graydark dark:border-strokedark rounded-md shadow-sm dark:bg-slate-900 dark:text-gray justify-end p-2 w-full whitespace-normal break-words">
            {{ selectedJuego ? selectedJuego.nombre : 'Seleccionar juego' }}
          </div>
          <div v-if="dropdownOpenJuego"
            class="absolute z-10 mt-1 w-full bg-white dark:bg-slate-900 border border-graydark dark:border-strokedark rounded-md shadow-lg max-h-40 overflow-auto">
            <input type="text" v-model="searchJuego" placeholder="Buscar juego..."
              class="p-2 w-full border-b border-graydark dark:border-strokedark dark:bg-slate-900 dark:text-gray">
            <div v-for="item in filteredJuegos" :key="item.id" @click="selectJuego(item)"
              class="cursor-pointer p-2 hover:bg-gray-200 dark:hover:bg-gray-700">
              {{ item.nombre }}
            </div>
          </div>
        </div>
        <!-- grado -->
        <div class="mb-4">
          <label for="grado" class="block text-sm font-medium text-gray-700 mb-2">Asignar Grado</label>
          <select id="grado" v-model="juegosInfo.grado" required
            class="text-xs md:text-sm border border-graydark dark:border-strokedark rounded-md shadow-sm dark:bg-slate-900 dark:text-gray justify-end p-2 w-full whitespace-normal break-words">
            <option class="" value="" disabled>Seleccionar grado</option>
            <option class="" v-for="item in parametros.grado" :key="item.id" :value="item.codigo">{{ item.nombre }}
            </option>
          </select>
        </div>
        <!-- area -->
        <div class="mb-4">
          <label for="area" class="block text-sm font-medium text-gray-700 mb-2">Asignar Area</label>
          <select id="area" v-model="juegosInfo.area" required
            class="text-xs md:text-sm border border-graydark dark:border-strokedark rounded-md shadow-sm dark:bg-slate-900 dark:text-gray justify-end p-2 w-full whitespace-normal break-words">
            <option class="" value="" disabled>Seleccionar area</option>
            <option class="" v-for="item in parametros.area" :key="item.id" :value="item.codigo">{{ item.nombre }}
            </option>
          </select>
        </div>
        <div class="flex justify-between col-span-2">
          <button type="button" @click="goBack" class="px-4 py-2 bg-graydark text-white rounded-md shadow-sm">
            Regresar
          </button>
          <button type="submit" :disabled="isExisting"
            class="px-4 py-2 bg-blue-500 rounded-md shadow-sm bg-gray dark:bg-primary/20 dark:text-white disabled:!bg-slate-900/40 disabled:cursor-not-allowed">
            Guardar
          </button>
        </div>
      </form>
    </div>
    <div class="md:col-span-1 flex flex-col items-center h-full p-5 bg-white dark:bg-boxdark shadow-sm rounded-md">
      <div class="p-4 md:p-5 w-full border dark:border-graydark border-gray rounded-md shadow-sm">
        <!-- Contenido adicional -->
        <!-- nombre juego -->
        <div class="mb-6">
          <h3 class="pb-4">
            <span
              class="dark:font-bold font-semibold dark:bg-slate-900 bg-gray dark:text-gray px-2 py-1 rounded-md shadow-md">
              Juego
            </span>
          </h3>
          <p>{{ getNameJuegos(juegosInfo.juego) }}</p>
        </div>
        <!-- codigo -->
        <div class="mb-8">
          <h3 class="mb-3">
            <span
              class="dark:font-bold font-semibold dark:bg-slate-900 bg-gray dark:text-gray px-2 py-1 rounded-md shadow-md">
              Código
            </span>
          </h3>
          <p>{{ juegosInfo.grado }}-{{ juegosInfo.area }}-{{ juegosInfo.locacion }}-{{ juegosInfo.ambiente }}-{{
            juegosInfo.mision }}-{{ juegosInfo.juego }}</p>
        </div>
        <!-- error menssage -->
        <div class="" v-if="isExisting">
          <em class="bg-danger font-bold text-white p-2">
            {{ validationCode }}
          </em>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted, inject, computed, watch } from 'vue';
import axios from '../../plugins/axios';
import { useRouter } from 'vue-router';
import BreadcrumbDefault from '@/components/Breadcrumbs/BreadcrumbDefault.vue';
import Swal from 'sweetalert2';

const swal = inject('$swal') as typeof Swal;

const parametros = ref([]);
//validacion si el codigo exite
const validationCode = ref();
const isExisting = ref(false);

const juegosInfo = ref({
  grado: '',
  area: '',
  locacion: '',
  ambiente: '',
  mision: '',
  juego: '',
});

//mision
const dropdownOpenMision = ref(false);
const selectedMision = ref(null);
const searchMision = ref('');
//juego
const dropdownOpenJuego = ref(false);
const selectedJuego = ref(null);
const searchJuego = ref('');



const filteredAmbientes = computed(() => {

  
  
  if (!juegosInfo.value.locacion) {
    
    return [];
  }

  const idLocacion = parametros.value.locacion.find(item => item.codigo == juegosInfo.value.locacion).id;
  
  return parametros.value.ambiente.filter((item) => {
    return item.id_padre === idLocacion;
  });

});

//select mision
const toggleDropdownMision = () => {
  dropdownOpenMision.value = !dropdownOpenMision.value;
};

const selectMision = (item) => {
  juegosInfo.value.mision = item.codigo;
  selectedMision.value = item;
  dropdownOpenMision.value = false;
};

const filteredMisiones = computed(() => {
  return parametros.value.mision.filter((item) => {
    return item.nombre.toLowerCase().includes(searchMision.value.toLowerCase());
  });
});

//select juego
const toggleDropdownJuego = () => {
  dropdownOpenJuego.value = !dropdownOpenJuego.value;
};

const selectJuego = (item) => {
  juegosInfo.value.juego = item.codigo;
  selectedJuego.value = item;
  dropdownOpenJuego.value = false;
};

const filteredJuegos = computed(() => {
  return parametros.value.juegos.filter((item) => {
    return item.nombre.toLowerCase().includes(searchJuego.value.toLowerCase());
  });
});

//obtener nombre de juegos segun codigo
const getNameJuegos = id => {
  if (id) {

    const name = parametros.value.juegos.find(item => item.codigo == id).nombre;

    return name;
  }

  return;
}

// Función para validar el código
const validateCode = () => {
  isExisting.value = false;
  const currentCode = `${juegosInfo.value.grado}-${juegosInfo.value.area}-${juegosInfo.value.locacion}-${juegosInfo.value.ambiente}-${juegosInfo.value.mision}-${juegosInfo.value.juego}`;
  const existingCode = parametros.value.codigo_juegos.find(item => item.cod_juegos === currentCode);
  
  
  if (existingCode) {
    validationCode.value = 'El código ya existe.';
    isExisting.value = true;
  } else {
    validationCode.value = '';
    isExisting.value = false;
  }
};

// Watch para observar cambios en juegosInfo
watch(juegosInfo, (newVal, oldVal) => {
  if (newVal.grado && newVal.area && newVal.locacion && newVal.ambiente && newVal.mision && newVal.juego) {
    validateCode();
  }
}, { deep: true });

const submit = async () => {
  

  if (isExisting.value) {
    return swal.fire({
      icon: 'error',
      title: 'Error en la creación del juego',
      text: 'El código de juego ya existe.',
      customClass: {
        popup: 'dark:bg-slate-900 dark:text-gray bg-white text-graydark',
        title: 'dark:text-gray text-graydark',
        confirmButton: 'bg-blue-800 rounded-md shadow-sm bg-gray dark:bg-primary/20 dark:text-white',
      },
    });
  }

  try {
    await axios.post('/api/juegos', juegosInfo.value, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    Swal.fire({
      icon: 'success',
      title: 'Registro Guardado',
      text: 'El juego se ha registrado exitosamente',
      customClass: {
        popup: 'dark:bg-slate-900 dark:text-gray bg-white text-graydark',
        title: 'dark:text-gray text-graydark',
        confirmButton: 'bg-blue-800 rounded-md shadow-sm bg-gray dark:bg-primary/20 dark:text-white',
      },
      didClose: () => {
        window.history.back();
      }
    });

  } catch (error) {
    console.error('Error al crear juego:', error);
    swal.fire({
      icon: 'error',
      title: 'Error en la creación del juego',
      text: error.response?.data?.message || 'Ocurrió un error inesperado',
      customClass: {
        popup: 'dark:bg-slate-900 dark:text-gray bg-white text-graydark',
        title: 'dark:text-gray text-graydark',
        confirmButton: 'bg-blue-800 rounded-md shadow-sm bg-gray dark:bg-primary/20 dark:text-white',
      },
    });
  }
};

const goBack = () => {
  window.history.back();
};

onMounted(async () => {
  try {
    const response = await axios.get('/api/juegos/create');
    

    if (response.data.success) {
      parametros.value = response.data.data;
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: response.data.message,
        customClass: {
          popup: 'dark:bg-slate-900 dark:text-gray bg-white text-graydark',
          title: 'dark:text-gray text-graydark',
          confirmButton: 'bg-blue-800 rounded-md shadow-sm bg-gray dark:bg-primary/20 dark:text-white',
        },
      });
    }
  } catch (error) {
    console.error('Error al obtener permisos:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error al obtener permisos',
      text: error.response?.data?.message || 'Ocurrió un error inesperado',
      customClass: {
        popup: 'dark:bg-slate-900 dark:text-gray bg-white text-graydark',
        title: 'dark:text-gray text-graydark',
        confirmButton: 'bg-blue-800 rounded-md shadow-sm bg-gray dark:bg-primary/20 dark:text-white',
      },
    });
  }
});
</script>

<style scoped>
/* Agrega estilos personalizados si es necesario */
</style>
