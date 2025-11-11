import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import autoprefixer from 'autoprefixer'
import cssnano from 'cssnano'
import postcssPresetEnv from 'postcss-preset-env'

export default defineConfig({
  plugins: [vue()],

  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.js'),
      name: 'SmartTagz',
      formats: ['es', 'cjs', 'umd'],
      fileName: (format) => {
        if (format === 'es') return 'smart-tagz.esm.js'
        if (format === 'cjs') return 'smart-tagz.js'
        if (format === 'umd') return 'smart-tagz.umd.js'
        return `smart-tagz.${format}.js`
      },
    },

    rollupOptions: {
      external: ['vue', 'vue-feather-icons'],
      output: {
        globals: {
          vue: 'Vue',
          'vue-feather-icons': 'VueFeatherIcons',
        },
        banner: `/*
 * smart-tagz
 * A Smart input tags component for Vue 3
 * v0.4.1
 * MIT License
 */`,
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') return 'smart-tagz.css'
          return assetInfo.name || ''
        },
      },
    },

    cssCodeSplit: false,
    sourcemap: true,
    minify: 'esbuild',
    target: 'es2015',
  },

  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
      },
    },
    postcss: {
      plugins: [
        postcssPresetEnv({
          stage: 2,
          features: {
            'nesting-rules': true,
          },
        }),
        autoprefixer(),
        cssnano({
          preset: [
            'default',
            {
              discardComments: { removeAll: true },
            },
          ],
        }),
      ],
    },
  },

  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
})
