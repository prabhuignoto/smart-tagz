# Autocomplete Example

Smart autocomplete suggestions powered by fuzzy matching.

## Basic Autocomplete

<div class="demo-container">
  <SmartTagz
    autosuggest
    :sources="['JavaScript', 'TypeScript', 'Java', 'Python', 'PHP', 'Go', 'Rust', 'C++']"
    input-placeholder="Start typing a language..."
  />
</div>

## Autocomplete with Max Tags

<div class="demo-container">
  <SmartTagz
    autosuggest
    :sources="['HTML', 'CSS', 'JavaScript', 'TypeScript', 'Vue.js', 'React']"
    :max-tags="3"
    input-placeholder="Select up to 3 technologies (no duplicates)..."
    :allow-duplicates="false"
  />
</div>

## Code Examples

### Simple Autocomplete

```vue
<template>
  <SmartTagz
    autosuggest
    :sources=\"languages\"
    input-placeholder=\"Type to search...\"
    :on-changed=\"handleChanges\"
  />
</template>

<script setup>
import SmartTagz from 'smart-tagz'
import 'smart-tagz/dist/smart-tagz.css'

const languages = [
  'JavaScript',
  'TypeScript',
  'Python',
  'Java',
  'Go',
  'Rust'
]

const handleChanges = (tags) => {
  console.log('Selected tags:', tags)
}
</script>
```

### Advanced Autocomplete Configuration

```vue
<template>
  <SmartTagz
    autosuggest
    :sources=\"technologies\"
    :max-tags=\"5\"
    :allow-duplicates=\"false\"
    :allow-paste=\"{ delimiter: ',' }\"
    :editable=\"true\"
    input-placeholder=\"Select up to 5 technologies...\"
    :on-changed=\"handleChanges\"
    :theme=\"{
      primary: '#6366f1',
      background: '#f3f4f6',
      tagTextColor: '#ffffff'
    }\"
  />
</template>

<script setup>
import SmartTagz from 'smart-tagz'
import 'smart-tagz/dist/smart-tagz.css'

const technologies = [
  'HTML5',
  'CSS3',
  'JavaScript ES2020+',
  'TypeScript 4.9',
  'Vue 3',
  'React 18',
  'Angular 15',
  'Svelte 3'
]

const handleChanges = (tags) => {
  console.log('Technologies:', tags)
  // Send to server, save to localStorage, etc.
}
</script>
```

## How Autocomplete Works

### Fuzzy Matching Algorithm

Smart-Tagz uses **Fuse.js** for intelligent fuzzy matching:

```
User types: "js"
  ✓ Matches: JavaScript, TypeScript, Vue.js
  ✗ No match: Python, Java

User types: "script"
  ✓ Matches: JavaScript, TypeScript
  ✗ No match: Vue, React

User types: "vue"
  ✓ Matches: Vue.js
  ✗ No match: React, Angular
```

### Threshold-Based Filtering

Results are filtered by relevance score (threshold: 0.3):

```
Input: "ts"
  Score 0.0: TypeScript (perfect match)
  Score 0.2: Jest (contains "ts")
  Score 0.5: Go (no match)
```

## Features

### Real-Time Suggestions

- Suggestions update as user types
- Case-insensitive matching
- Special character support
- Partial word matching

### User Actions

| Action | Behavior |
|--------|----------|
| Type | Filter suggestions |
| Arrow Down | Next suggestion |
| Arrow Up | Previous suggestion |
| Enter | Add selected suggestion |
| Tab | Next suggestion or close |
| Escape | Close suggestions |
| Delete | Remove last tag |

### Smart Behavior

```
✅ Duplicate prevention (if enabled)
✅ Max tags limit (if set)
✅ Auto-selection of first match
✅ Keyboard navigation
✅ Touch support on mobile
✅ Screen reader announcements
```

## Tips & Tricks

### 🎯 Performance

- Keep source list under 1000 items for best performance
- Use memoization for static sources
- Debounce onChanged callback if needed

### 🎨 User Experience

- Sort sources alphabetically for predictable results
- Show source count: `(${sources.length} available)`
- Provide visual feedback for highlighted suggestion
- Add helper text: "Start typing to filter"

### ♿ Accessibility

- Always add input label
- Test with screen readers
- Provide keyboard shortcuts guide
- Announce match count to users

### 📱 Mobile

- Ensure touch targets are 48px minimum
- Show virtual keyboard automatically
- Make suggestions scrollable
- Test on various screen sizes

## API Reference

### Props

```typescript
{
  sources?: string[]           // Available suggestions
  autosuggest?: boolean        // Enable fuzzy search (default: false)
  maxTags?: number            // Limit number of tags (default: 20)
  allowDuplicates?: boolean   // Allow duplicate tags (default: true)
  editable?: boolean          // Allow editing tags (default: false)
  onChanged?: (tags) => void  // Callback on change
}
```

### Example with All Options

```vue
<SmartTagz
  autosuggest
  :sources=\"items\"
  :max-tags=\"10\"
  :allow-duplicates=\"false\"
  :allow-paste=\"{ delimiter: ',' }\"
  :editable=\"true\"
  input-placeholder=\"Search and select...\"
  :on-changed=\"console.log\"
/>
```

## Next Steps

- [Fuzzy Search](/examples/fuzzy-search) - Learn about matching algorithm
- [Error Handling](/examples/error-handling) - Handle user errors
- [Basic Usage](/examples/basic) - Simple examples
