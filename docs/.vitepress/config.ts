import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Smart-Tagz',
  description: 'A powerful, accessible, and lightweight tag input component for Vue 3',
  base: '/',
  lang: 'en-US',
  ignoreDeadLinks: true,

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    ['meta', { name: 'theme-color', content: '#6366f1' }],
    ['meta', { name: 'og:type', content: 'website' }],
    ['meta', { name: 'og:title', content: 'Smart-Tagz' }],
    ['meta', { name: 'og:image', content: 'https://smart-tagz.dev/og.png' }],
  ],

  themeConfig: {
    logo: '/logo.svg',
    siteTitle: 'Smart-Tagz',

    nav: [
      { text: 'Guide', link: '/guide/getting-started' },
      { text: 'Examples', link: '/examples/basic' },
      { text: 'API', link: '/api/props' },
      {
        text: 'Links',
        items: [
          { text: 'GitHub', link: 'https://github.com/prabhuignoto/smart-tagz' },
          { text: 'NPM', link: 'https://www.npmjs.com/package/smart-tagz' },
          {
            text: 'Changelog',
            link: 'https://github.com/prabhuignoto/smart-tagz/blob/master/CHANGELOG.md',
          },
        ],
      },
    ],

    sidebar: {
      '/guide/': [
        {
          text: 'Guide',
          items: [
            { text: 'Getting Started', link: '/guide/getting-started' },
            { text: 'Installation', link: '/guide/installation' },
            { text: 'Basic Usage', link: '/guide/basic-usage' },
            { text: 'Keyboard Shortcuts', link: '/guide/keyboard' },
            { text: 'Accessibility', link: '/guide/accessibility' },
            { text: 'Migration Guide', link: '/guide/migration' },
          ],
        },
      ],
      '/examples/': [
        {
          text: 'Examples',
          items: [
            { text: 'Basic Usage', link: '/examples/basic' },
            { text: 'Autocomplete', link: '/examples/autocomplete' },
            { text: 'Keyboard Navigation', link: '/examples/keyboard' },
            { text: 'Accessibility Demo', link: '/examples/accessibility' },
            { text: 'Fuzzy Search', link: '/examples/fuzzy-search' },
            { text: 'Error Handling', link: '/examples/error-handling' },
            { text: 'Mobile Optimization', link: '/examples/mobile' },
            { text: 'Theme Customization', link: '/examples/theme' },
          ],
        },
      ],
      '/api/': [
        {
          text: 'API Reference',
          items: [
            { text: 'Props', link: '/api/props' },
            { text: 'Events', link: '/api/events' },
            { text: 'Slots', link: '/api/slots' },
            { text: 'Theming', link: '/api/theming' },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/prabhuignoto/smart-tagz' },
      { icon: 'npm', link: 'https://www.npmjs.com/package/smart-tagz' },
    ],

    search: {
      provider: 'local',
    },

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024 Prabhu Murthy',
    },
  },

  markdown: {
    theme: {
      light: 'github-light',
      dark: 'github-dark',
    },
    lineNumbers: true,
  },

  vite: {
    resolve: {
      alias: {
        '@': new URL('../../src', import.meta.url).pathname,
      },
    },
    ssr: {
      noExternal: ['smart-tagz'],
    },
  },
})
