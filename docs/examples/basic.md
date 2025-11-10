# Basic Usage Example

The simplest way to get started with Smart-Tagz.

## Simple Tag Input

Try this basic example:

<div class="demo-container">
  <SmartTagz
    input-placeholder="Enter tags..."
  />
</div>

**Code:**

```vue
<template>
  <SmartTagz input-placeholder="Enter tags..." />
</template>

<script setup>
import SmartTagz from 'smart-tagz'
import 'smart-tagz/dist/smart-tagz.css'
</script>
```

## With Data Source

Add autocomplete suggestions:

<div class="demo-container">
  <SmartTagz
    autosuggest
    :sources="['JavaScript', 'TypeScript', 'Vue.js', 'React', 'Angular', 'Python']"
    input-placeholder="Select a technology..."
  />
</div>

**Code:**

```vue
<template>
  <SmartTagz
    autosuggest
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
  'Python'
]
</script>
```

## With Default Tags

Start with pre-selected tags:

<div class="demo-container">
  <SmartTagz
    autosuggest
    :sources="['HTML', 'CSS', 'JavaScript', 'Vue.js', 'React']"
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
    input-placeholder="Add more tags..."
  />
</template>

<script setup>
import SmartTagz from 'smart-tagz'
import 'smart-tagz/dist/smart-tagz.css'

const technologies = ['HTML', 'CSS', 'JavaScript', 'Vue.js', 'React']
</script>
```

## With Constraints

Limit tags and prevent duplicates:

<div class="demo-container">
  <SmartTagz
    autosuggest
    :sources="['Red', 'Blue', 'Green', 'Yellow', 'Purple']"
    :max-tags="3"
    :allow-duplicates="false"
    input-placeholder="Max 3 colors (no duplicates)..."
  />
</div>

**Code:**

```vue
<template>
  <SmartTagz
    autosuggest
    :sources="colors"
    :max-tags="3"
    :allow-duplicates="false"
    input-placeholder="Max 3 colors (no duplicates)..."
  />
</template>

<script setup>
import SmartTagz from 'smart-tagz'
import 'smart-tagz/dist/smart-tagz.css'

const colors = ['Red', 'Blue', 'Green', 'Yellow', 'Purple']
</script>
```

## Key Features Demonstrated

- ✅ Simple tag input without configuration
- ✅ Autocomplete with suggestions
- ✅ Default/pre-selected tags
- ✅ Max tags limit
- ✅ Duplicate prevention

## What's Next?

Explore other features:

- [Keyboard Navigation](/examples/keyboard) - Full keyboard control
- [Accessibility](/examples/accessibility) - Screen reader support
- [Fuzzy Search](/examples/fuzzy-search) - Smart matching
- [Error Handling](/examples/error-handling) - Error feedback
