import { defineNuxtModule, createResolver, addPlugin, addComponent } from '@nuxt/kit'

export interface ModuleOptions {
  /**
   * Register the component globally
   * @default true
   */
  global: boolean
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'smart-tagz',
    configKey: 'smartTagz',
    compatibility: {
      nuxt: '^3.0.0',
    },
  },
  defaults: {
    global: true,
  },
  async setup(options: ModuleOptions) {
    const { resolve } = createResolver(import.meta.url)

    // Auto-import the plugin to register the component globally
    if (options.global) {
      addPlugin(resolve('./plugin'))
    }

    // Alternative: Add component for explicit import
    // Users can then use <SmartTagz /> in templates
    addComponent({
      name: 'SmartTagz',
      export: 'default',
      filePath: resolve('../../components/Main.vue'),
    })
  },
})
