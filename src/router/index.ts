import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import Usuarios from '../views/usuarios/usuarios.vue'
import Clientes from '../views/usuarios/clientes/index.vue'
import Login from '../views/auth/Login.vue'

const routes = [
  {
    path: '/',
    component: () => import('../layouts/DefaultLayout.vue'),
    children:
    [
      { path: '', name: 'Dashboard', title: 'Dashboard', component: Dashboard },
      { path: 'usuarios', name: 'Usuarios', title: 'Usuarios', component: Usuarios },
      { path: 'clientes', name: 'Clientes', title: 'Clientes', meta: 'clientes', component: Clientes },
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
