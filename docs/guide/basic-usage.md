# Basic Usage

Learn how to use Smart-Tagz in your Vue 3 applications.

## Simple Example

The simplest way to use Smart-Tagz:

<div class="demo-container">
  <SmartTagz input-placeholder="Enter tags..." />
</div>

**Code:**

```vue
<template>
  <SmartTagz />
</template>

<script setup>
import SmartTagz from 'smart-tagz'
import 'smart-tagz/dist/smart-tagz.css'
</script>
```

This creates a basic tag input without suggestions.

## With Suggestions

Add a data source to enable tag suggestions:

<div class="demo-container">
  <SmartTagz
    :sources="['JavaScript', 'TypeScript', 'Vue.js', 'React', 'Angular', 'Python', 'Go', 'Rust']"
    input-placeholder="Select a technology..."
  />
</div>

**Code:**

```vue
<template>
  <SmartTagz
    :sources="technologies"
    input-placeholder="Select a technology..."
  />
</template>

<script setup>
import SmartTagz from 'smart-tagz'
import 'smart-tagz/dist/smart-tagz.css'

const technologies = [
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
```

## Enable Autocomplete

Enable fuzzy search to filter suggestions as users type:

<div class="demo-container">
  <SmartTagz
    autosuggest
    :sources="['JavaScript', 'TypeScript', 'Vue.js', 'React', 'Angular']"
    input-placeholder="Start typing..."
  />
</div>

**Code:**

```vue
<template>
  <SmartTagz
    autosuggest
    :sources="technologies"
    input-placeholder="Start typing..."
  />
</template>

<script setup>
import SmartTagz from 'smart-tagz'
import 'smart-tagz/dist/smart-tagz.css'

const technologies = [
  'JavaScript',
  'TypeScript',
  'Vue.js',
  'React',
  'Angular'
]
</script>
```

## Listen to Changes

React to tag changes using the `onChanged` event:

<div class="demo-container">
  <SmartTagz
    autosuggest
    :sources="['JavaScript', 'TypeScript', 'Vue.js', 'React']"
    input-placeholder="Select technologies..."
  />
</div>

**Code:**

```vue
<template>
  <div>
    <SmartTagz
      autosuggest
      :sources="technologies"
      :on-changed="handleTagsChanged"
    />

    <div v-if="selectedTags.length > 0">
      <h3>Selected Tags:</h3>
      <ul>
        <li v-for="tag in selectedTags" :key="tag">
          {{ tag }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import SmartTagz from 'smart-tagz'
import 'smart-tagz/dist/smart-tagz.css'

const selectedTags = ref([])
const technologies = ['JavaScript', 'TypeScript', 'Vue.js']

const handleTagsChanged = (tags) => {
  selectedTags.value = tags
}
</script>
```

## Limit Number of Tags

Use `maxTags` to limit how many tags can be added:

<div class="demo-container">
  <SmartTagz
    autosuggest
    :sources="['JavaScript', 'TypeScript', 'Vue.js', 'React', 'Angular', 'Python']"
    :max-tags="5"
    input-placeholder="Max 5 tags"
  />
</div>

**Code:**

```vue
<SmartTagz
  autosuggest
  :sources="technologies"
  :max-tags="5"
  input-placeholder="Max 5 tags"
/>
```

## Prevent Duplicates

Use `allowDuplicates` to prevent adding the same tag twice:

<div class="demo-container">
  <SmartTagz
    autosuggest
    :sources="['JavaScript', 'TypeScript', 'Vue.js', 'React']"
    :allow-duplicates="false"
    input-placeholder="No duplicates allowed"
  />
</div>

**Code:**

```vue
<SmartTagz
  autosuggest
  :sources="technologies"
  :allow-duplicates="false"
  input-placeholder="No duplicates allowed"
/>
```

## Default Tags

Pre-populate with default tags:

<div class="demo-container">
  <SmartTagz
    autosuggest
    :sources="['JavaScript', 'TypeScript', 'Vue.js', 'React']"
    :default-tags="['Vue.js', 'JavaScript']"
    input-placeholder="Add more tags..."
  />
</div>

**Code:**

```vue
<template>
  <SmartTagz
    autosuggest
    :sources="technologies"
    :default-tags="['Vue.js', 'JavaScript']"
  />
</template>

<script setup>
import SmartTagz from 'smart-tagz'
import 'smart-tagz/dist/smart-tagz.css'

const technologies = ['JavaScript', 'TypeScript', 'Vue.js']
</script>
```

## Paste Support

Allow users to paste multiple tags at once:

<div class="demo-container">
  <SmartTagz
    :sources="['user1@example.com', 'user2@example.com', 'user3@example.com', 'user4@example.com']"
    :allow-paste="{ delimiter: ',' }"
    input-placeholder="Paste emails separated by comma..."
  />
</div>

**Code:**

```vue
<template>
  <SmartTagz
    :sources="emails"
    :allow-paste="{ delimiter: ',' }"
    input-placeholder="Paste emails separated by comma..."
  />
</template>

<script setup>
import SmartTagz from 'smart-tagz'
import 'smart-tagz/dist/smart-tagz.css'

const emails = [
  'user1@example.com',
  'user2@example.com',
  'user3@example.com'
]
</script>
```

**Usage:**
```
Paste: "user1@example.com, user2@example.com, user3@example.com"
Result: 3 tags added automatically
```

## Editable Tags

Allow users to edit tags after creation:

<div class="demo-container">
  <SmartTagz
    :sources="['JavaScript', 'TypeScript', 'Vue.js', 'React']"
    :editable="true"
    :default-tags="['Vue.js']"
    input-placeholder="Double-click tags to edit..."
  />
</div>

**Code:**

```vue
<SmartTagz
  :sources="technologies"
  :editable="true"
  input-placeholder="Double-click tags to edit..."
/>
```

**Usage:**
1. Double-click a tag to edit it
2. Type the new value
3. Press Enter to save or Escape to cancel

## Read-Only Mode

Display tags without allowing edits:

<div class="demo-container">
  <SmartTagz
    :default-tags="['JavaScript', 'Vue.js', 'React']"
    :read-only="true"
  />
</div>

**Code:**

```vue
<SmartTagz
  :default-tags="['JavaScript', 'Vue.js']"
  :read-only="true"
/>
```

## Custom Styling

Customize the theme with color properties:

<div class="demo-container">
  <SmartTagz
    autosuggest
    :sources="['JavaScript', 'TypeScript', 'Vue.js', 'React']"
    :theme="{ primary: '#3b82f6', background: '#f3f4f6', tagTextColor: '#ffffff' }"
    input-placeholder="Custom styled..."
  />
</div>

**Code:**

```vue
<template>
  <SmartTagz
    autosuggest
    :sources="technologies"
    :theme="customTheme"
  />
</template>

<script setup>
import SmartTagz from 'smart-tagz'
import 'smart-tagz/dist/smart-tagz.css'

const customTheme = {
  primary: '#3b82f6',      // Input background
  background: '#f3f4f6',   // Container background
  tagTextColor: '#ffffff'  // Tag text color
}

const technologies = ['JavaScript', 'TypeScript', 'Vue.js']
</script>
```

## Combination Example

A complete example combining multiple features:

<div class="demo-container">
  <SmartTagz
    autosuggest
    :sources="['JavaScript', 'TypeScript', 'Vue.js', 'React', 'Angular', 'Python', 'Go', 'Rust']"
    :default-tags="['Vue.js']"
    :max-tags="5"
    :allow-duplicates="false"
    :allow-paste="{ delimiter: ',' }"
    :editable="true"
    input-placeholder="Type or paste technologies..."
    :theme="{ primary: '#6366f1', background: '#f8f9fa', tagTextColor: '#ffffff' }"
  />
</div>

**Code:**

```vue
<template>
  <div class="tag-editor">
    <h2>Select Technologies</h2>

    <SmartTagz
      autosuggest
      :sources="technologies"
      :default-tags="['Vue.js']"
      :max-tags="5"
      :allow-duplicates="false"
      :allow-paste="{ delimiter: ',' }"
      :editable="true"
      input-placeholder="Type or paste technologies..."
      :on-changed="handleTagsChanged"
      :theme="customTheme"
    />

    <div v-if="selectedTags.length > 0" class="summary">
      <p>
        You selected {{ selectedTags.length }} of {{ maxTags }} technologies:
      </p>
      <ul>
        <li v-for="tag in selectedTags" :key="tag">{{ tag }}</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import SmartTagz from 'smart-tagz'
import 'smart-tagz/dist/smart-tagz.css'

const selectedTags = ref(['Vue.js'])
const maxTags = 5

const technologies = [
  'JavaScript',
  'TypeScript',
  'Vue.js',
  'React',
  'Angular',
  'Python',
  'Go',
  'Rust'
]

const customTheme = {
  primary: '#6366f1',
  background: '#f8f9fa',
  tagTextColor: '#ffffff'
}

const handleTagsChanged = (tags) => {
  selectedTags.value = tags
}
</script>

<style scoped>
.tag-editor {
  max-width: 600px;
  margin: 0 auto;
}

.summary {
  margin-top: 2rem;
  padding: 1rem;
  background: #f0f9ff;
  border-radius: 8px;
}

.summary ul {
  list-style: none;
  padding: 0;
  margin-top: 0.5rem;
}

.summary li {
  padding: 0.25rem 0;
}
</style>
```

## Best Practices

1. **Always Import CSS:** Don't forget the CSS import
2. **Use Autocomplete:** Enable `autosuggest` for better UX
3. **Provide Sources:** Give users good suggestions to choose from
4. **Handle Changes:** Listen to `onChanged` to respond to updates
5. **Set Limits:** Use `maxTags` to prevent excessive input
6. **Validate Input:** Check selected tags before submitting forms
7. **Give Feedback:** Show error messages when limits are reached
8. **Test Accessibility:** Test with keyboard and screen readers

## Next Steps

- Learn [Keyboard Navigation](/guide/keyboard)
- Explore [Accessibility Features](/guide/accessibility)
- View [Interactive Examples](/examples/basic)
- Check [API Reference](/api/props)
