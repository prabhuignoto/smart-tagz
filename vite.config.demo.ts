import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import autoprefixer from 'autoprefixer'
import cssnano from 'cssnano'
import postcssPresetEnv from 'postcss-preset-env'

export default defineConfig({
  plugins: [vue()],

  build: {
    outDir: 'dist-demo',
    sourcemap: true,
    minify: 'esbuild',
    target: 'es2015',
  },

  css: {
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
