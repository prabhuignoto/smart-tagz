# Installation

## Prerequisites

- Vue 3.0 or higher
- Node.js 14.0 or higher
- npm, yarn, or pnpm

## Installation Methods

### npm

```bash
npm install smart-tagz
```

### yarn

```bash
yarn add smart-tagz
```

### pnpm

```bash
pnpm add smart-tagz
```

## Peer Dependencies

Smart-Tagz requires the following peer dependency to be installed in your project:

```bash
npm install vue-feather-icons
# or
yarn add vue-feather-icons
# or
pnpm add vue-feather-icons
```

This dependency is used for icon components in the tag interface. Most projects will have this already installed, but if you get warnings about missing peer dependencies, install it using the command above.

## Setup in Your Project

### Step 1: Import Component

```vue
<script setup>
import SmartTagz from 'smart-tagz'
import 'smart-tagz/dist/smart-tagz.css'
</script>

<template>
  <SmartTagz />
</template>
```

### Step 2: Global Registration (Optional)

If you want to use Smart-Tagz in multiple files without importing it every time:

```js
// main.js
import { createApp } from 'vue'
import SmartTagz from 'smart-tagz'
import 'smart-tagz/dist/smart-tagz.css'
import App from './App.vue'

const app = createApp(App)
app.component('SmartTagz', SmartTagz)
app.mount('#app')
```

Then use it anywhere:

```vue
<template>
  <SmartTagz input-placeholder="Enter tags..." />
</template>
```

## Bundle Size

Smart-Tagz is designed to be lightweight:

- **CSS**: ~2.5 kB (gzipped)
- **JS (ESM)**: ~15 kB (gzipped)
- **JS (UMD)**: ~12 kB (gzipped)

## Supported Module Formats

Smart-Tagz is published in multiple formats to support different build tools:

- **ESM**: `dist/smart-tagz.esm.js` (for modern bundlers)
- **UMD**: `dist/smart-tagz.umd.js` (for browser scripts)
- **CSS**: `dist/smart-tagz.css`

## CSS Framework Integration

### With Tailwind CSS

Smart-Tagz works great with Tailwind CSS. You can customize it using CSS custom properties:

```css
:root {
  --color-primary: rgb(99 102 241); /* Indigo */
  --color-accent: rgb(245 158 11);  /* Amber */
}
```

### With Bootstrap

Simply import both Bootstrap and Smart-Tagz CSS:

```vue
<script setup>
import 'bootstrap/dist/css/bootstrap.css'
import SmartTagz from 'smart-tagz'
import 'smart-tagz/dist/smart-tagz.css'
</script>
```

## TypeScript Support

Smart-Tagz is fully typed with TypeScript. Type definitions are included automatically.

```typescript
interface SmartTagzProps {
  sources?: string[]
  autosuggest?: boolean
  allowPaste?: { delimiter: string }
  allowDuplicates?: boolean
  maxTags?: number
  defaultTags?: string[]
  editable?: boolean
  readOnly?: boolean
  inputPlaceholder?: string
  quickDelete?: boolean
  width?: string
  theme?: {
    primary: string
    background?: string
    secondary?: string
    tagTextColor: string
  }
  onChanged?: (tags: string[]) => void
}
```

## Browser Support

Smart-Tagz supports all modern browsers that support Vue 3:

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Troubleshooting

### Component Not Rendering

Make sure you've imported both the component and the CSS:

```vue
import SmartTagz from 'smart-tagz'
import 'smart-tagz/dist/smart-tagz.css'
```

### CSS Not Applied

Check that the CSS file is imported in the correct order:

```vue
<script setup>
import SmartTagz from 'smart-tagz'
import 'smart-tagz/dist/smart-tagz.css'
// Import custom styles after Smart-Tagz CSS
import './custom-styles.css'
</script>
```

### TypeScript Errors

If you're using TypeScript and getting errors, make sure you have Vue 3 types installed:

```bash
npm install --save-dev @types/vue
```

## Next Steps

- Read the [Getting Started](/guide/getting-started) guide
- Explore [Keyboard Shortcuts](/guide/keyboard)
- Check [Accessibility Features](/guide/accessibility)
- View [Examples](/examples/basic)
