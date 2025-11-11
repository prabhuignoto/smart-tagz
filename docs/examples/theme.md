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
