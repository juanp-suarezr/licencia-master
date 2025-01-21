import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import store from './store'
import PrimeVue from 'primevue/config'
import { LoadingPlugin } from 'vue-loading-overlay'
import Lara from '@/presets/lara'
import Traduccion from './lang/en/prime_en.json'
import './plugins/axios'
import './assets/main.css'
import './assets/satoshi.css'
import Tooltip from 'primevue/tooltip'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import VueAwesomePaginate from "vue-awesome-paginate";
import "vue-awesome-paginate/dist/style.css";

const pinia = createPinia()

const app = createApp(App)

pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(LoadingPlugin)
app.use(router)
app.use(store)
app.directive('tooltip', Tooltip)
app.use(VueAwesomePaginate)
app.use(PrimeVue, {
  unstyled: true,
  pt: Lara,
  locale: Traduccion,
})

app.mount('#app')
