---
layout: home

hero:
  name: Smart-Tagz
  text: Smart Input Tags for Vue 3
  tagline: A powerful, accessible, and lightweight tag input component with fuzzy search, keyboard navigation, and WCAG 2.1 AA compliance
  image:
    src: /logo.svg
    alt: Smart-Tagz
  actions:
    - theme: brand
      text: Get Started
      link: /guide/getting-started
    - theme: alt
      text: View Examples
      link: /examples/basic

features:
  - icon: ⚡
    title: Fuzzy Matching
    details: Intelligent search with smart matching using fuse.js. Match partial words, handle typos, and provide better search results.

  - icon: ♿
    title: Fully Accessible
    details: WCAG 2.1 AA compliant with ARIA labels, screen reader support, full keyboard navigation, and semantic HTML.

  - icon: ⌨️
    title: Keyboard Shortcuts
    details: Complete keyboard navigation support including arrow keys, Home/End, Tab, Delete, and more for power users.

  - icon: 📱
    title: Mobile Optimized
    details: 44px touch targets, responsive layout, viewport-aware dropdown, and full mobile keyboard support.

  - icon: 🎨
    title: Fully Customizable
    details: Customize colors, sizes, behavior, and styling. Works with Tailwind CSS, Vue 3 components, and more.

  - icon: 📦
    title: Production Ready
    details: TypeScript support, small bundle size, zero dependencies beyond Vue 3, and comprehensive documentation.
---

## Quick Start

Install via npm:

```bash
npm install smart-tagz
```

Use in your Vue 3 application:

```vue
<template>
  <smart-tagz
    input-placeholder="Enter tags..."
    autosuggest
    :sources="languages"
    @on-changed="handleTagsChanged"
  />
</template>

<script setup>
import SmartTagz from 'smart-tagz'
import 'smart-tagz/dist/smart-tagz.css'

const languages = ['JavaScript', 'Vue.js', 'TypeScript', 'React', 'Python']

const handleTagsChanged = (tags) => {
  console.log('Selected tags:', tags)
}
</script>
```

## Why Smart-Tagz?

- **Smart Matching**: Fuzzy search with threshold-based matching finds what you're looking for
- **Accessible**: Built from the ground up for accessibility with full keyboard support
- **Modern**: Built with Vue 3 Composition API and TypeScript
- **Lightweight**: Minimal dependencies, fast performance
- **Tested**: 314+ unit tests with 87%+ coverage
- **Well Documented**: Interactive examples and comprehensive guides

## Features at a Glance

✨ **v0.5.0** includes:
- Intelligent fuzzy matching (fuse.js)
- Full keyboard navigation (arrows, Home/End, Tab)
- Screen reader announcements
- Real-time error handling
- Mobile-first design
- Error feedback with auto-dismiss
- Tag editing and deletion
- Paste support with custom delimiters

## Interactive Demo

Try Smart-Tagz right here:

<SmartTagz
  input-placeholder="Type to search (try 'Script', 'java', 'type'...)..."
  autosuggest
  :sources="['JavaScript', 'Vue.js', 'TypeScript', 'React', 'Python', 'Go', 'Rust', 'Ruby']"
  :max-tags="5"
/>

## Community

- 📖 [Documentation](https://github.com/prabhuignoto/smart-tagz)
- 🐛 [Report Issues](https://github.com/prabhuignoto/smart-tagz/issues)
- 💬 [Discussions](https://github.com/prabhuignoto/smart-tagz/discussions)
- ⭐ [GitHub](https://github.com/prabhuignoto/smart-tagz)

## License

MIT © 2024 [Prabhu Murthy](https://prabhumurthy.com)
