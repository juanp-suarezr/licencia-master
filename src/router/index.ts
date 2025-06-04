import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import Usuarios from '../views/usuarios/usuarios.vue'
import Clientes from '../views/usuarios/clientes/index.vue'
import ClientesCreate from '../views/usuarios/clientes/add.vue'
import ClientesEdit from '../views/usuarios/clientes/edit.vue'
import Docentes from '../views/usuarios/docentes/index.vue'
import DocentesCreate from '../views/usuarios/docentes/add.vue'
import DocentesEdit from '../views/usuarios/docentes/edit.vue'
import Estudiantes from '../views/usuarios/estudiantes/index.vue'
import EstudiantesCreate from '../views/usuarios/estudiantes/add.vue'
import EstudiantesEdit from '../views/usuarios/estudiantes/edit.vue'
import Grupos from '../views/usuarios/grupos/index.vue'
import GruposCreate from '../views/usuarios/grupos/add.vue'
import GruposEdit from '../views/usuarios/grupos/edit.vue'
import Licencias from '../views/licencias/licencias/index.vue'
import LicenciasCreate from '../views/licencias/licencias/add.vue'
import LicenciasEdit from '../views/licencias/licencias/edit.vue'
import TipoLicencias from '../views/licencias/tipoLicencias/index.vue'
import TipoLicenciasCreate from '../views/licencias/tipoLicencias/add.vue'
import TipoLicenciasEdit from '../views/licencias/tipoLicencias/edit.vue'  

import Roles from '../views/roles/Index.vue'
import RolesCreate from '../views/roles/add.vue'
import RolesEdit from '../views/roles/edit.vue'

import juegos from '../views/juegos/Index.vue'
import juegosCreate from '../views/juegos/add.vue'
import Parametros from '../views/parametros/Index.vue'
import ParametrosAreaJuegos from '../views/parametros/area_juegos/Index.vue'
import ParametrosGradoJuegos from '../views/parametros/grado_juegos/Index.vue'
import ParametrosJuegos from '../views/parametros/juegos/Index.vue'
import ParametrosLocacionJuegos from '../views/parametros/locacion_juegos/Index.vue'
import ParametrosMisionJuegos from '../views/parametros/mision_juegos/Index.vue'
import ParametrosSubambiente from '../views/parametros/subambiente_juegos/Index.vue'
import ParametrosNivelJuegos from '../views/parametros/nivel_juegos/Index.vue'
import ParametrosHabilidadesCognitivas from '../views/parametros/habilidades_cognitivas_juegos/Index.vue'
import ParametrosMetaCurricular from '../views/parametros/meta_curricular_juegos/Index.vue'
import ParametrosObjetoTienda from '../views/parametros/objetos_tienda/Index.vue'
import Login from '../views/auth/Login.vue';
import ResetPassword from '../views/auth/ResetPassword.vue';

//ANALITICA DATOS
import AnaliticaEstudiantes from '../views/analitica/Estudiantes.vue'
import AnaliticaJuegos from '../views/analitica/Juegos.vue'
import AnaliticaDesempeño from '../views/analitica/Desempeño.vue'

const routes = [
  {
    path: '/',
    component: () => import('../layouts/DefaultLayout.vue'),
    children:
    [
      { path: '', name: 'Dashboard', title: 'Dashboard', component: Dashboard },
      { path: 'usuarios', name: 'Usuarios', title: 'Usuarios', component: Usuarios },
      //clientes
      { path: 'clientes', name: 'Clientes', title: 'Clientes', meta: 'clientes', component: Clientes },
      { path: 'clientes-create', name: 'ClientesCreate', title: 'Nuevo Cliente', meta: 'clientes', component: ClientesCreate },
      { path: 'clientes-edit/:id', name: 'ClientesEdit', title: 'Editar Cliente', meta: 'clientes', component: ClientesEdit },
      //docentes
      { path: 'docentes', name: 'Docentes', title: 'Docentes', meta: 'docentes', component: Docentes },
      { path: 'docentes-create', name: 'DocentesCreate', title: 'Nuevo Docente', meta: 'docentes', component: DocentesCreate },
      { path: 'docentes-edit/:id', name: 'DocentesEdit', title: 'Editar Docente', meta: 'docentes', component: DocentesEdit },
      //estudiantes
      { path: 'estudiantes', name: 'estudiantes', title: 'Estudiantes', meta: 'estudiantes', component: Estudiantes },
      { path: 'estudiantes-create', name: 'EstudiantesCreate', title: 'Nuevo Estudiante', meta: 'estudiantes', component: EstudiantesCreate },
      { path: 'estudiantes-edit/:id', name: 'EstudiantesEdit', title: 'Editar Estudiante', meta: 'estudiantes', component: EstudiantesEdit },
      //Grupos
      { path: 'grupos', name: 'Grupos', title: 'Grupos', meta: 'grupos', component: Grupos },
      { path: 'grupos-create', name: 'GruposCreate', title: 'Nuevo Grupo', meta: 'grupos', component: GruposCreate },
      { path: 'grupos-edit/:id', name: 'GruposEdit', title: 'Editar Grupo', meta: 'grupos', component: GruposEdit },
      //Licencias
      { path: 'licencias', name: 'Licencias', title: 'Licencias', meta: 'licencias', component: Licencias },
      { path: 'licencias-create', name: 'LicenciasCreate', title: 'Nueva Licencia', meta: 'licencias', component: LicenciasCreate },
      { path: 'licencias-edit/:id', name: 'LicenciasEdit', title: 'Editar Licencia', meta: 'licencias', component: LicenciasEdit },

      //Tipo licencias
      { path: 'tipo-licencias', name: 'TipoLicencias', title: 'Tipo Licencias', meta: 'tipo-licencias', component: TipoLicencias },
      { path: 'tipo-licencias-create', name: 'TipoLicenciasCreate', title: 'Nuevo Tipo Licencia', meta: 'tipo-licencias', component: TipoLicenciasCreate },
      { path: 'tipo-licencias-edit/:id', name: 'TipoLicenciasEdit', title: 'Editar Tipo Licencia', meta: 'tipo-licencias', component: TipoLicenciasEdit },
      
      //juegos
      { path: 'juegos', name: 'juegos', title: 'Juegos', meta: 'juegos', component: juegos },
      { path: 'juegos-create', name: 'JuegosCreate', title: 'Nuevo Juego', meta: 'juegos', component: juegosCreate },
      //Parametros
      { path: 'parametros', name: 'parametros', title: 'Parámetros', meta: 'parametros', component: Parametros },
      //area juegos
      { path: 'parametros-area-juegos', name: 'ParametrosAreaJuegos', title: 'Parámetros Area Juegos', meta: 'parametros', component: ParametrosAreaJuegos },
      //grado juegos
      { path: 'parametros-grado-juegos', name: 'ParametrosGradoJuegos', title: 'Parámetros Grado Juegos', meta: 'parametros', component: ParametrosGradoJuegos },
      //juegos
      { path: 'parametros-juegos', name: 'ParametrosJuegos', title: 'Parámetros Juegos', meta: 'parametros', component: ParametrosJuegos },
      //locación juegos
      { path: 'parametros-locacion-juegos', name: 'ParametrosLocacionJuegos', title: 'Parámetros Locación Juegos', meta: 'parametros', component: ParametrosLocacionJuegos },
      //mision juegos
      { path: 'parametros-mision-juegos', name: 'ParametrosMisionJuegos', title: 'Parámetros Misión Juegos', meta: 'parametros', component: ParametrosMisionJuegos },
      //subambiente juegos
      { path: 'parametros-subambiente', name: 'ParametrosSubambiente', title: 'Parámetros Sub-ambiente Juegos', meta: 'parametros', component: ParametrosSubambiente },
      //nivel juegos
      { path: 'parametros-nivel-juegos', name: 'ParametrosNivelJuegos', title: 'Parámetros Nivel Juegos', meta: 'parametros', component: ParametrosNivelJuegos },
      //habilidades cognitivas
      { path: 'parametros-habilidades-cognitivas', name: 'ParametrosHabilidadesCognitivas', title: 'Parámetros Habilidades Cognitivas', meta: 'parametros', component: ParametrosHabilidadesCognitivas },
      //meta curricular
      { path: 'parametros-meta-curricular', name: 'ParametrosMetaCurricular', title: 'Parámetros Meta Curricular', meta: 'parametros', component: ParametrosMetaCurricular },
      //objetos tienda
      {path: 'parametros-objetos-tienda', name: 'ParametrosObjetosTienda', title: 'Parámetros Objetos Tienda', meta: 'parametros', component: ParametrosObjetoTienda },
      //Roles
      { path: 'roles', name: 'roles', title: 'Roles', meta: 'roles', component: Roles },
      { path: 'roles-create', name: 'RolesCreate', title: 'Nuevo Rol', meta: 'roles', component: RolesCreate },
      { path: 'roles-edit/:id', name: 'RolesEdit', title: 'Editar Rol', meta: 'roles', component: RolesEdit },
      

      //ANALITICA DATOS
      { path: 'analitica/estudiantes', name: 'AnaliticaEstudiantes', title: 'Analítica estudiantes', meta: 'analitica', component: AnaliticaEstudiantes },
      { path: 'analitica/juegos', name: 'AnaliticaJuegos', title: 'Analítica juegos', meta: 'analitica', component: AnaliticaJuegos },
      { path: 'analitica/desempeno', name: 'AnaliticaDesempeno', title: 'Analítica Desempeño', meta: 'analitica', component: AnaliticaDesempeño },

    ],
    meta: { requiresAuth: true },
  },
  {
    path: '/login',
    component: () => import('../layouts/AuthLayout.vue'),
    children: [
      { path: '', name: 'Login', component: Login },
      { path: '/password-reset-form', name: 'ResetPassword', component: ResetPassword, },
    ],
  },
  // Catch-all route to redirect to Dashboard for any undefined paths
  {
    path: '/:pathMatch(.*)*',
    redirect: '/login',
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!sessionStorage.getItem('access_token')
  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: 'Login' })
  } else {
    next()
  }
})

export default router
