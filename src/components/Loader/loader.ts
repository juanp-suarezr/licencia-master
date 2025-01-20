// loader.js
import { ActiveLoader, useLoading } from 'vue-loading-overlay' // Asegúrate de tener vue-loading-overlay instalado

const $loading = useLoading({
  // options
})
let loaderInstance: ActiveLoader | null = null

export const showLoader = () => {
  if (!loaderInstance) {
    loaderInstance = $loading.show({
      backgroundColor: '#000',
      color: '#16a34a',
      height: 100,
      width: 100,
      opacity: 0.9,
    })
  }
}

export const hideLoader = () => {
  if (loaderInstance) {
    loaderInstance.hide()
    loaderInstance = null
  }
}
