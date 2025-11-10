# Getting Started

Welcome to Smart-Tagz! This guide will help you get up and running in minutes.

## What is Smart-Tagz?

Smart-Tagz is a powerful, accessible input component for Vue 3 that allows users to create and manage tags with:
- **Fuzzy search** for intelligent tag suggestions
- **Full keyboard navigation** for power users
- **Complete accessibility** (WCAG 2.1 AA)
- **Mobile optimization** with touch-friendly UI
- **Customizable styling** to match your brand

## Installation

### Via NPM

```bash
npm install smart-tagz
```

### Via Yarn

```bash
yarn add smart-tagz
```

### Via PNPM

```bash
pnpm add smart-tagz
```

## Basic Usage

### 1. Import the Component

```vue
<script setup>
import SmartTagz from 'smart-tagz'
import 'smart-tagz/dist/smart-tagz.css'
</script>

<template>
  <SmartTagz />
</template>
```

### 2. Add Data Source

Provide a list of suggested tags:

```vue
<script setup>
import SmartTagz from 'smart-tagz'
import 'smart-tagz/dist/smart-tagz.css'

const languages = [
  'JavaScript',
  'TypeScript',
  'Vue.js',
  'React',
  'Angular',
  'Python',
  'Go',
  'Rust'
]
</script>

<template>
  <SmartTagz
    :sources="languages"
    input-placeholder="Enter programming language..."
  />
</template>
```

### 3. Handle Tag Changes

Listen to tag changes with the `onChanged` event:

```vue
<script setup>
import { ref } from 'vue'
import SmartTagz from 'smart-tagz'
import 'smart-tagz/dist/smart-tagz.css'

const selectedTags = ref([])
const languages = ['JavaScript', 'TypeScript', 'Vue.js', 'React']

const handleTagsChanged = (tags) => {
  selectedTags.value = tags
  console.log('Selected tags:', tags)
}
</script>

<template>
  <div>
    <SmartTagz
      :sources="languages"
      :on-changed="handleTagsChanged"
      input-placeholder="Enter tags..."
    />
    <p v-if="selectedTags.length > 0">
      You selected: {{ selectedTags.join(', ') }}
    </p>
  </div>
</template>
```

## Enable Autocomplete

Enable fuzzy search suggestions as users type:

```vue
<SmartTagz
  autosuggest
  :sources="['JavaScript', 'TypeScript', 'Vue.js']"
  input-placeholder="Type to search..."
/>
```

## Common Examples

### Example 1: Simple Tag Input

```vue
<SmartTagz
  input-placeholder="Add tags..."
/>
```

### Example 2: With Autocomplete

```vue
<SmartTagz
  autosuggest
  :sources="['HTML', 'CSS', 'JavaScript']"
  input-placeholder="Select technologies..."
/>
```

### Example 3: With Limits

```vue
<SmartTagz
  autosuggest
  :sources="['Tag1', 'Tag2', 'Tag3']"
  :max-tags="5"
  :allow-duplicates="false"
/>
```

### Example 4: With Paste Support

```vue
<SmartTagz
  autosuggest
  :sources="['Email1', 'Email2']"
  :allow-paste="{ delimiter: ',' }"
  input-placeholder="Paste emails separated by comma..."
/>
```

## Next Steps

- Explore [keyboard shortcuts](/guide/keyboard) for power users
- Learn about [accessibility features](/guide/accessibility)
- Check out [examples](/examples/basic)
- Review the [API reference](/api/props)

## Need Help?

- Check the [FAQ](#faq) section
- View [interactive examples](/examples/basic)
- Open an issue on [GitHub](https://github.com/prabhuignoto/smart-tagz/issues)

## FAQ

### Q: Does it work with TypeScript?
**A:** Yes! Smart-Tagz is built with TypeScript and fully typed.

### Q: Can I customize the styling?
**A:** Yes, you can customize via CSS variables and custom class names.

### Q: Is it accessible?
**A:** Absolutely! It meets WCAG 2.1 AA standards with full keyboard navigation and screen reader support.

### Q: What about mobile?
**A:** Mobile-optimized with 44px touch targets and responsive layout.

### Q: Can I disable certain features?
**A:** Yes, all features are configurable via props. See [props reference](/api/props).
