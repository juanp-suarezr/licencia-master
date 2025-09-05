// userStore.js
import { defineStore } from 'pinia'
import axios from '../plugins/axios'

export const useUserStore = defineStore('user_auth', {
  persist: true,
    state: () => ({
        isAuthenticated: false,
        user: null,
        error_user: null,

    }),
  actions: {
    async login(credentials) {
      try {
        const response = await axios.post('/api/login', credentials, {
          headers: {
            'Content-Type': 'application/json',
            accept: 'application/json',
            'X-CSRF-TOKEN': '', // Agrega el token CSRF si es necesario
          },
        })
        const accessToken = response.data.access_token
        const id_user = response.data.id_user

        console.log(response.data);
        

        sessionStorage.setItem('access_token', accessToken)
        sessionStorage.setItem('id_user', id_user)
        
        
        this.user = response.data.user_info
        this.isAuthenticated = true
      } catch (error) {
        throw error
      }
    },
    async logout() {
      // Lógica para cerrar sesión

      try {
        await axios.post('/api/logout', {
          headers: {
            'Content-Type': 'application/json',
            accept: 'application/json',
            'X-CSRF-TOKEN': '', // Agrega el token CSRF si es necesario
          },
        })
        this.user = null
        this.error_user = null
        this.isAuthenticated = false
        sessionStorage.removeItem('access_token');
      } catch (error) {
        throw error
      }
    },
  },
})
