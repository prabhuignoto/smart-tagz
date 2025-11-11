import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './custom.css'
import SmartTagz from '../../../src/components/Main.vue'
import Tags from '../../../src/components/Tags.vue'
import SuggestPane from '../../../src/components/SuggestPane.vue'
import Tooltip from '../../../src/components/Tooltip.vue'
import '../../../src/styles/index.scss'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {})
  },
  enhanceApp({ app }) {
    app.component('SmartTagz', SmartTagz)
    app.component('SmartTags', Tags)
    app.component('SuggestPane', SuggestPane)
    app.component('SmartTooltip', Tooltip)
  },
} satisfies Theme
