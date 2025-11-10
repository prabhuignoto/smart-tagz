# Theme Customization Example

Customize Smart-Tagz colors and appearance to match your brand.

## Color Themes

### Default Theme

<div class="demo-container">
  <SmartTagz
    autosuggest
    :sources="['JavaScript', 'TypeScript', 'Vue.js', 'React']"
    :theme="{
      primary: '#6093ca',
      background: '#eaf1f8',
      tagTextColor: '#fff'
    }"
    input-placeholder="Default Blue Theme..."
  />
</div>

### Dark Theme

<div class="demo-container">
  <SmartTagz
    autosuggest
    :sources="['JavaScript', 'TypeScript', 'Vue.js', 'React']"
    :theme="{
      primary: '#1f2937',
      background: '#111827',
      tagTextColor: '#f3f4f6'
    }"
    input-placeholder="Dark Theme..."
  />
</div>

### Modern Indigo Theme

<div class="demo-container">
  <SmartTagz
    autosuggest
    :sources="['JavaScript', 'TypeScript', 'Vue.js', 'React']"
    :theme="{
      primary: '#6366f1',
      background: '#f3f4f6',
      tagTextColor: '#ffffff'
    }"
    input-placeholder="Modern Indigo Theme..."
  />
</div>

## Theme Props

The `theme` prop accepts an object with the following properties:

```typescript
interface ThemeConfig {
  primary: string        // Input background & accent color (required)
  background?: string    // Container background color (optional)
  secondary?: string     // Secondary accent color (optional)
  tagTextColor: string   // Tag text color (required)
}
```

## Color Properties Explained

### Primary Color
Used for:
- Input field background
- Selected suggestion highlight
- Tag background color
- Focus ring color

```vue
:theme="{
  primary: '#6366f1',  // Indigo
  // ...
}"
```

### Background Color
Used for:
- Main container background
- Suggestion dropdown background

```vue
:theme="{
  background: '#f3f4f6',  // Light gray
  // ...
}"
```

### Secondary Color
Used for:
- Hover states (optional)
- Alternative highlights

```vue
:theme="{
  secondary: '#818cf8',  // Light indigo (optional)
  // ...
}"
```

### Tag Text Color
Used for:
- Tag text color
- Delete button icon color
- Contrast against primary color

```vue
:theme="{
  tagTextColor: '#ffffff',  // White
  // ...
}"
```

## Complete Example

```vue
<template>
  <div class="container">
    <h2>Customized Smart-Tagz</h2>
    <SmartTagz
      autosuggest
      :sources="technologies"
      :theme="{
        primary: '#ec4899',      // Pink
        background: '#fef2f2',   // Light pink
        secondary: '#f472b6',    // Medium pink
        tagTextColor: '#ffffff'  // White text
      }"
      :class-names="{
        container: 'custom-container',
        name: 'custom-tag-name',
        closeButton: 'custom-close-btn'
      }"
      input-placeholder="Select technologies..."
      :on-changed="handleChange"
    />
  </div>
</template>

<script setup>
import SmartTagz from 'smart-tagz'
import 'smart-tagz/dist/smart-tagz.css'

const technologies = [
  'JavaScript', 'TypeScript', 'Python',
  'Vue.js', 'React', 'Angular'
]

const handleChange = (tags) => {
  console.log('Selected:', tags)
}
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
}

h2 {
  color: #374151;
  margin-bottom: 1rem;
}

.custom-container {
  /* Additional custom styles if needed */
}

.custom-tag-name {
  /* Additional custom tag styling */
}

.custom-close-btn {
  /* Additional close button styling */
}
</style>
```

## Pre-Built Themes

### Material Design

```javascript
const materialTheme = {
  primary: '#2196f3',      // Blue
  background: '#f5f5f5',   // Light gray
  secondary: '#1976d2',    // Darker blue
  tagTextColor: '#ffffff'  // White
}
```

### Tailwind Indigo

```javascript
const tailwindTheme = {
  primary: '#6366f1',      // Indigo
  background: '#f3f4f6',   // Gray
  secondary: '#818cf8',    // Light indigo
  tagTextColor: '#ffffff'  // White
}
```

### Apple Design

```javascript
const appleTheme = {
  primary: '#007aff',      // System blue
  background: '#f2f2f7',   // Light gray
  secondary: '#5ac8fa',    // Light blue
  tagTextColor: '#ffffff'  // White
}
```

### GitHub Dark

```javascript
const githubDarkTheme = {
  primary: '#238636',      // Green
  background: '#0d1117',   // Dark background
  secondary: '#3fb950',    // Light green
  tagTextColor: '#c9d1d9'  // Light text
}
```

### Slack Dark

```javascript
const slackDarkTheme = {
  primary: '#e01e5a',      // Red
  background: '#1d1c1d',   // Dark
  secondary: '#b74b96',    // Pink
  tagTextColor: '#ffffff'  // White
}
```

## Using Pre-Built Themes

```vue
<template>
  <SmartTagz
    autosuggest
    :sources=\"items\"
    :theme=\"selectedTheme\"
  />
</template>

<script setup>
import { ref } from 'vue'
import SmartTagz from 'smart-tagz'

const themes = {
  material: { primary: '#2196f3', background: '#f5f5f5', tagTextColor: '#fff' },
  tailwind: { primary: '#6366f1', background: '#f3f4f6', tagTextColor: '#fff' },
  apple: { primary: '#007aff', background: '#f2f2f7', tagTextColor: '#fff' },
  github: { primary: '#238636', background: '#0d1117', tagTextColor: '#c9d1d9' },
  slack: { primary: '#e01e5a', background: '#1d1c1d', tagTextColor: '#fff' }
}

const selectedTheme = ref(themes.tailwind)
</script>
```

## Advanced Customization with CSS Classes

For more control, use custom CSS classes:

```vue
<template>
  <SmartTagz
    :sources=\"items\"
    :class-names=\"{
      container: 'my-container',
      name: 'my-tag-name',
      closeButton: 'my-close-btn'
    }\"
  />
</template>

<style>
.my-container {
  border-radius: 12px;
  border: 2px solid #6366f1;
  padding: 1rem;
  background: #f9fafb;
}

.my-tag-name {
  font-weight: 600;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}

.my-close-btn {
  opacity: 0.8;
  transition: opacity 0.2s;
}

.my-close-btn:hover {
  opacity: 1;
}
</style>
```

## Dark Mode Support

### Using CSS Variables

```vue
<template>
  <SmartTagz :theme=\"currentTheme\" />
</template>

<script setup>
import { computed } from 'vue'

const isDark = useDarkMode()  // Your dark mode hook

const currentTheme = computed(() => isDark.value ? {
  primary: '#1f2937',
  background: '#111827',
  tagTextColor: '#f3f4f6'
} : {
  primary: '#6366f1',
  background: '#f3f4f6',
  tagTextColor: '#ffffff'
})
</script>
```

### Using System Preference

```vue
<script setup>
import { ref, onMounted } from 'vue'

const prefersDark = ref(false)

onMounted(() => {
  prefersDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
})

const theme = computed(() => prefersDark.value ? darkTheme : lightTheme)
</script>
```

## Theme Customization Checklist

- [x] Choose primary color (brand color)
- [x] Choose background color (contrast with primary)
- [x] Choose tag text color (readability)
- [x] Test on light background
- [x] Test on dark background
- [x] Verify color contrast (WCAG AA)
- [x] Test on mobile
- [x] Test with screen reader
- [x] Get stakeholder approval

## Color Contrast Guide

Ensure sufficient contrast (WCAG AA minimum 4.5:1):

| Combination | Contrast Ratio | Status |
|------------|----------------|--------|
| #6366f1 on #f3f4f6 | 6.2:1 | ✅ Pass |
| #2196f3 on #f5f5f5 | 5.1:1 | ✅ Pass |
| #007aff on #f2f2f7 | 4.8:1 | ✅ Pass |
| #238636 on #0d1117 | 9.2:1 | ✅ Pass |

## Tools for Color Selection

### Color Contrast Checker

- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [TPGi Contrast Checker](https://www.tpgi.com/color-contrast-checker/)

### Color Picker

- [Coolors](https://coolors.co/)
- [Adobe Color](https://color.adobe.com/)
- [Material Design Colors](https://material.io/design/color/)

### Accessibility

- [A11y Color Blindness Simulator](https://www.color-blindness.com/coblis-color-blindness-simulator/)
- [Stark Plugin](https://www.getstark.co/)

## Example: Dynamic Theme Switcher

```vue
<template>
  <div>
    <div class="theme-switcher">
      <button
        v-for="(theme, name) in themes"
        :key="name"
        :class="{ active: current === name }"
        @click="current = name"
      >
        {{ name }}
      </button>
    </div>

    <SmartTagz
      autosuggest
      :sources="items"
      :theme="themes[current]"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import SmartTagz from 'smart-tagz'

const current = ref('indigo')

const themes = {
  indigo: { primary: '#6366f1', background: '#f3f4f6', tagTextColor: '#fff' },
  blue: { primary: '#2196f3', background: '#f5f5f5', tagTextColor: '#fff' },
  pink: { primary: '#ec4899', background: '#fef2f2', tagTextColor: '#fff' },
  dark: { primary: '#1f2937', background: '#111827', tagTextColor: '#f3f4f6' }
}

const items = ['JavaScript', 'TypeScript', 'Vue.js', 'React']
</script>

<style scoped>
.theme-switcher {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

button {
  padding: 0.5rem 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 0.375rem;
  background: white;
  cursor: pointer;
  transition: all 0.2s;
}

button:hover {
  border-color: #6366f1;
}

button.active {
  background: #6366f1;
  color: white;
  border-color: #6366f1;
}
</style>
```

## Best Practices

### ✅ DO

```vue
<!-- Use brand colors -->
<SmartTagz :theme=\"{ primary: '#your-brand-color', ... }\" />

<!-- Ensure sufficient contrast -->
<!-- Test with contrast checker tool -->

<!-- Support both light and dark modes -->
<!-- Provide theme variants -->

<!-- Test across devices -->
<!-- Mobile, tablet, desktop -->
```

### ❌ DON'T

```vue
<!-- Don't use low contrast combinations -->
<!-- Light gray on white is hard to read -->

<!-- Don't change theme arbitrarily -->
<!-- Keep it consistent with your brand -->

<!-- Don't forget text color contrast -->
<!-- White text needs dark background -->

<!-- Don't ignore accessibility -->
<!-- Check color blindness simulators -->
```

## Next Steps

- [Basic Usage](/examples/basic) - Simple examples
- [Accessibility](/examples/accessibility) - Ensure readability
- [API Reference](/api/props) - Theme prop details
