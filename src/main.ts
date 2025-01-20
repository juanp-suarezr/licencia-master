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
import Tooltip from 'primevue/tooltip';



const app = createApp(App)

app.use(createPinia())
app.use(LoadingPlugin)
app.use(router)
app.use(store)
app.directive('tooltip', Tooltip);
app.use(PrimeVue, {
  unstyled: true,
  pt: Lara,
  locale: Traduccion,
})

app.mount('#app')
