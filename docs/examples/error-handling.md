# Error Handling Example

Learn how Smart-Tagz handles and displays errors gracefully.

## Error Demo

<div class="demo-container">
  <SmartTagz
    autosuggest
    :sources="['React', 'Vue.js', 'Angular', 'Svelte']"
    :max-tags="2"
    :allow-duplicates="false"
    input-placeholder="Max 2 tags allowed (no duplicates)..."
  />
</div>

Try adding 3 tags or duplicates to see error handling in action!

## Error Types

Smart-Tagz handles several error scenarios automatically:

### 1. Maximum Tags Exceeded

When user tries to add more tags than `maxTags`:

```
Error Message:
  "Maximum 2 tags allowed"

Behavior:
  ✓ Tag is not added
  ✓ Error is displayed
  ✓ Input field is cleared
  ✓ Screen reader announces error
  ✓ Suggestion dropdown closes
```

### 2. Duplicate Tag

When user tries to add a tag that already exists and `allowDuplicates` is false:

```
Error Message:
  "React is already added"

Behavior:
  ✓ Tag is not added
  ✓ Error is displayed
  ✓ Input field is cleared
  ✓ Existing tag is highlighted
  ✓ Screen reader announces error
```

### 3. Empty Input

When user tries to add empty or whitespace-only tag:

```
Behavior:
  ✓ Tag is not added (silently ignored)
  ✓ No error message shown
  ✓ Input field cleared
```

## Code Example: Basic Error Handling

```vue
<template>
  <div>
    <SmartTagz
      :sources="frameworks"
      :max-tags="5"
      :allow-duplicates="false"
      input-placeholder="Add frameworks..."
      :on-changed="handleChanges"
    />
    <p v-if="selectedTags.length === 5" class="warning">
      Maximum tags reached
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import SmartTagz from 'smart-tagz'
import 'smart-tagz/dist/smart-tagz.css'

const frameworks = ['React', 'Vue.js', 'Angular', 'Svelte', 'Next.js']
const selectedTags = ref([])

const handleChanges = (tags) => {
  selectedTags.value = tags
  console.log('Current tags:', tags)
}
</script>

<style scoped>
.warning {
  color: #dc2626;
  font-size: 0.875rem;
  margin-top: 0.5rem;
}
</style>
```
