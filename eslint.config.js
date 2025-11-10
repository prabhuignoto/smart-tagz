import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'
import prettierConfig from 'eslint-config-prettier'

export default [
  // Ignore patterns
  {
    ignores: [
      'dist/**',
      'dist-demo/**',
      'node_modules/**',
      '*.config.js',
      '*.config.ts',
      'src/prism.js',
      'coverage/**',
      'types/**',
      '*.local',
      'yarn-error.log',
      'pnpm-lock.yaml',
      'package-lock.json',
      'yarn.lock',
      'pnpm-workspace.yaml',
      'pnpm-workspace.yaml.lock',
    ],
  },

  // Base configs
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs['flat/recommended'],
  prettierConfig,

  // Global settings
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        parser: tseslint.parser,
        extraFileExtensions: ['.vue'],
      },
    },
  },

  // Vue-specific rules
  {
    files: ['**/*.vue'],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
      },
    },
    rules: {
      'vue/multi-word-component-names': 'off',
      'vue/require-default-prop': 'warn',
      'vue/require-prop-types': 'error',
      'vue/no-unused-components': 'off',
      'vue/no-unused-vars': 'off',
      'vue/no-v-html': 'off',
    },
  },

  // TypeScript rules
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.vue'],
    rules: {
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
    },
  },
]
