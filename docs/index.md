---
layout: home

hero:
  name: Smart-Tagz
  text: Smart Input Tags for Vue 3
  tagline: A powerful, accessible, and lightweight tag input component with fuzzy search, keyboard navigation, and WCAG 2.1 AA compliance
  # image:
  #   src: /logo.png
  #   alt: Smart-Tagz
  actions:
    - theme: brand
      text: Get Started
      link: /guide/getting-started
    - theme: alt
      text: View Examples
      link: /examples/basic

features:
  - icon: ⚡
    title: Smart Fuzzy Matching
    details: Intelligent search with real-time suggestions powered by fuse.js. Handle typos, match partial words, and provide intuitive search results automatically.

  - icon: ♿
    title: Fully Accessible
    details: WCAG 2.1 AA compliant with ARIA labels, screen reader support, complete keyboard navigation (arrows, Home/End, Tab, Delete), and semantic HTML.

  - icon: 📱
    title: Mobile First Design
    details: 44px touch targets for accessibility, responsive layout, viewport-aware dropdown positioning, and native mobile keyboard support.

  - icon: 🎨
    title: Highly Customizable
    details: Full control over colors, sizes, behavior, and styling. Seamless integration with Tailwind CSS, Vue 3 components, and custom themes.

  - icon: 🛡️
    title: Robust & Reliable
    details: Inline tag editing, paste support with custom delimiters, read-only mode, duplicate prevention, and error handling with auto-dismiss.

  - icon: 📦
    title: Production Ready
    details: Full TypeScript support, small bundle size (~10KB), minimal dependencies (Vue 3, fuse.js), and comprehensive documentation.
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
- **Tested**: Comprehensive test suite with 87%+ coverage
- **Well Documented**: Interactive examples and comprehensive guides

## Features at a Glance

✨ **v1.0.0** includes:
- Intelligent fuzzy matching (fuse.js)
- Full keyboard navigation (arrows, Home/End, Tab)
- Screen reader announcements
- Real-time error handling
- Mobile-first design
- Error feedback with auto-dismiss
- Tag editing and deletion
- Paste support with custom delimiters

## Community

- 📖 [Documentation](https://github.com/prabhuignoto/smart-tagz)
- 🐛 [Report Issues](https://github.com/prabhuignoto/smart-tagz/issues)
- 💬 [Discussions](https://github.com/prabhuignoto/smart-tagz/discussions)
- ⭐ [GitHub](https://github.com/prabhuignoto/smart-tagz)

## License

<script setup>
const currentYear = new Date().getFullYear()
</script>

MIT © {{ currentYear }} [Prabhu Murthy](https://prabhumurthy.com)
