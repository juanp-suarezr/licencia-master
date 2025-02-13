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
import Login from '../views/auth/Login.vue'

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
      //Licencias
      //Tipo licencias
      //Grupos
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
      //Roles
      { path: 'roles', name: 'roles', title: 'Roles', meta: 'roles', component: Roles },
      { path: 'roles-create', name: 'RolesCreate', title: 'Nuevo Rol', meta: 'roles', component: RolesCreate },
      { path: 'roles-edit/:id', name: 'RolesEdit', title: 'Editar Rol', meta: 'roles', component: RolesEdit },
      


    ],
    meta: { requiresAuth: true },
  },
  {
    path: '/login',
    component: () => import('../layouts/AuthLayout.vue'),
    children: [{ path: '', name: 'Login', component: Login }],
  },
  // Catch-all route to redirect to Dashboard for any undefined paths
  {
    path: '/:pathMatch(.*)*',
    redirect: '/dashboard',
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
