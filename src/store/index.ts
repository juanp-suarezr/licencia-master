import { createStore } from 'vuex'

const store = createStore({
  state: {
    isAuthenticated: false,
    authToken: null as string | null,
  },
  mutations: {
    setAuthentication(state, token) {
      state.isAuthenticated = !!token
      state.authToken = token
      if (token) {
        sessionStorage.setItem('authToken', token)
      } else {
        sessionStorage.removeItem('authToken')
      }
    },
    initializeStore(state) {
      const token = sessionStorage.getItem('authToken')
      if (token) {
        state.isAuthenticated = true
        state.authToken = token
      }
    },
  },
  actions: {
    login({ commit }, token) {
      commit('setAuthentication', token)
    },
    logout({ commit }) {
      commit('setAuthentication', null)
    },
  },
  getters: {
    isAuthenticated: (state) => state.isAuthenticated,
    authToken: (state) => state.authToken,
  },
})

export default store
