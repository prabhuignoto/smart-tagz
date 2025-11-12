import { defineNuxtPlugin } from '#app'
import Main from '../components/Main.vue'

/**
 * Nuxt 3 Plugin for smart-tagz
 * Registers the Main component globally as 'SmartTagz'
 */
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('SmartTagz', Main)

  // Also provide it as a named export for explicit imports
  return {
    provide: {
      SmartTagz: Main,
    },
  }
})
