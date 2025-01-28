import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import Usuarios from '../views/usuarios/usuarios.vue'
import Clientes from '../views/usuarios/clientes/index.vue'
import ClientesCreate from '../views/usuarios/clientes/add.vue'
import ClientesEdit from '../views/usuarios/clientes/edit.vue'
import Docentes from '../views/usuarios/docentes/index.vue'
import DocentesCreate from '../views/usuarios/docentes/add.vue'
import DocentesEdit from '../views/usuarios/docentes/edit.vue'
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
      { path: 'clientes-edit/:id', name: 'ClientesEdit', title: 'Editar Cliente', meta: 'clientes', props: true, component: ClientesEdit },
      //docentes
      { path: 'docentes', name: 'Docentes', title: 'Docentes', meta: 'docentes', component: Docentes },
      { path: 'docentes-create', name: 'DocentesCreate', title: 'Nuevo Docente', meta: 'docentes', component: DocentesCreate },
      { path: 'docentes-edit/:id', name: 'DocentesEdit', title: 'Editar Docente', meta: 'docentes', props: true, component: DocentesEdit },

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
