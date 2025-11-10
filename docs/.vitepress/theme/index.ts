import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import SmartTagz from '../../../src/components/Main.vue'
import '../../../src/styles/_tokens.scss'
import './style.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // Register Smart-Tagz component globally
    app.component('SmartTagz', SmartTagz)
  },
} satisfies Theme
