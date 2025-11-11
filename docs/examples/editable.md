# Inline Tag Editing

Learn how to enable users to edit existing tags after creation.

## Live Demo

Double-click any tag to edit it:

<div class="demo-container">
  <SmartTagz
    :editable="true"
    :default-tags="['Vue.js', 'JavaScript', 'TypeScript']"
    input-placeholder="Add or edit tags..."
  />
</div>

## Overview

The `editable` prop allows users to modify tag text after adding them. This is useful for:
- Fixing typos in tags
- Updating tag names
- Renaming categories
- Correcting user input
- Dynamic content management

## Basic Usage

```vue
<template>
  <SmartTagz :editable="true" />
</template>

<script setup>
import SmartTagz from 'smart-tagz'
import 'smart-tagz/dist/smart-tagz.css'
</script>
```

## How It Works

### Entering Edit Mode
1. **Double-click** on any tag to enter edit mode
2. An input field replaces the tag text
3. User can modify the text
4. The tag is highlighted to show it's editable

### Saving Changes
- **Press Enter**: Save the changes
- **Press Escape** or **Blur (click outside)**: Cancel editing

### Visual Feedback
- Input field appears in place of tag text
- Text is selected and ready to edit
- Auto-focus on edit input for immediate typing

## Props

### `editable`

- **Type:** `boolean`
- **Default:** `false`
- **Description:** Enable inline tag editing

```vue
<!-- Enable editing -->
<SmartTagz :editable="true" />

<!-- Disable editing (default) -->
<SmartTagz :editable="false" />
```

## Practical Examples

### Example 1: Simple Editable Tags

```vue
<template>
  <div>
    <h2>Edit Your Tags</h2>
    <SmartTagz
      :editable="true"
      :default-tags="['JavaScript', 'Vue.js', 'TypeScript']"
      input-placeholder="Add new tag..."
      @on-changed="handleTagsChanged"
    />
  </div>
</template>

<script setup>
import SmartTagz from 'smart-tagz'

const handleTagsChanged = (tags) => {
  console.log('Updated tags:', tags)
}
</script>
```

### Example 2: Editable Tags with Validation

```vue
<template>
  <div>
    <SmartTagz
      ref="tagzRef"
      :editable="true"
      :sources="allowedTags"
      autosuggest
      @on-changed="validateTags"
    />
    <div v-if="validationError" class="error-message">
      {{ validationError }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import SmartTagz from 'smart-tagz'

const tagzRef = ref(null)
const validationError = ref('')
const allowedTags = ['JavaScript', 'TypeScript', 'Python', 'Vue.js', 'React']

const validateTags = (tags) => {
  validationError.value = ''

  // Check if tags are in allowed list
  const invalidTags = tags.filter(tag => !allowedTags.includes(tag))

  if (invalidTags.length > 0) {
    validationError.value = `Invalid tags: ${invalidTags.join(', ')}`
  }
}
</script>

<style>
.error-message {
  color: #ef4444;
  margin-top: 0.5rem;
  font-size: 0.875rem;
}
</style>
```

### Example 3: Content Management System

```vue
<template>
  <form @submit.prevent="publishArticle">
    <div class="form-group">
      <label>Article Title</label>
      <input v-model="article.title" type="text" required />
    </div>

    <div class="form-group">
      <label>Article Categories (editable)</label>
      <SmartTagz
        :editable="true"
        :default-tags="article.categories"
        :sources="categoryOptions"
        :max-tags="5"
        autosuggest
        @on-changed="article.categories = $event"
      />
    </div>

    <div class="form-group">
      <label>Article Content</label>
      <textarea v-model="article.content" required></textarea>
    </div>

    <button type="submit" class="btn-primary">Publish Article</button>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import SmartTagz from 'smart-tagz'

const article = ref({
  title: '',
  categories: ['Technology', 'Web Development'],
  content: ''
})

const categoryOptions = [
  'Technology',
  'Web Development',
  'Mobile Apps',
  'DevOps',
  'Security',
  'Cloud',
  'Frontend',
  'Backend'
]

const publishArticle = async () => {
  const response = await fetch('/api/articles', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(article.value)
  })

  if (response.ok) {
    alert('Article published!')
    // Reset form
    article.value = { title: '', categories: [], content: '' }
  }
}
</script>

<style>
.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

input[type="text"],
textarea {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  font-family: inherit;
}

.btn-primary {
  background-color: #6366f1;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  font-weight: 600;
}

.btn-primary:hover {
  background-color: #4f46e5;
}
</style>
```

### Example 4: Real-time Editing with Save Confirmation

```vue
<template>
  <div>
    <div class="controls">
      <button @click="saveChanges" :disabled="!hasChanges">Save Changes</button>
      <button @click="discardChanges" :disabled="!hasChanges">Discard</button>
    </div>

    <SmartTagz
      :editable="true"
      :default-tags="originalTags"
      input-placeholder="Add tag..."
      @on-changed="updateTags"
    />

    <div v-if="hasChanges" class="warning-message">
      You have unsaved changes
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import SmartTagz from 'smart-tagz'

const originalTags = ref(['Saved Tag 1', 'Saved Tag 2'])
const currentTags = ref([...originalTags.value])

const hasChanges = computed(() => {
  return JSON.stringify(originalTags.value) !== JSON.stringify(currentTags.value)
})

const updateTags = (tags) => {
  currentTags.value = tags
}

const saveChanges = async () => {
  // Save to API
  const response = await fetch('/api/my-tags', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ tags: currentTags.value })
  })

  if (response.ok) {
    originalTags.value = [...currentTags.value]
    alert('Changes saved!')
  }
}

const discardChanges = () => {
  currentTags.value = [...originalTags.value]
}
</script>

<style>
.controls {
  margin-bottom: 1rem;
}

button {
  padding: 0.5rem 1rem;
  margin-right: 0.5rem;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  font-weight: 600;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.warning-message {
  color: #f59e0b;
  margin-top: 1rem;
  padding: 0.75rem;
  background-color: #fffbeb;
  border-radius: 0.375rem;
}
</style>
```

## Keyboard Shortcuts (Edit Mode)

| Key | Action |
|-----|--------|
| **Enter** | Save tag changes |
| **Escape** | Cancel editing (discard changes) |
| **Tab** | Save and move focus to next element |

## Combining with Other Props

### With Default Tags

```vue
<SmartTagz
  :editable="true"
  :default-tags="['Vue', 'React']"
/>
```

### With Suggestions

```vue
<SmartTagz
  :editable="true"
  :sources="languages"
  autosuggest
/>
```

### With Constraints

```vue
<SmartTagz
  :editable="true"
  :allow-duplicates="false"
  :max-tags="10"
/>
```

### Read-Only After Save

```vue
<!-- Allow editing until saved -->
<SmartTagz
  :editable="!isSaved"
  :default-tags="tags"
/>
```

## Accessibility

When editing:
- Input field receives focus automatically
- ARIA labels remain current
- Tab key navigates away and saves
- Escape key clearly cancels
- Screen readers announce "editing tag X"

## Behavior Notes

### Text Selection
- When entering edit mode, all tag text is automatically selected
- User can immediately start typing to replace it
- Or press Arrow keys to position cursor

### Tag Validation
- No validation is built-in for edit mode
- Implement custom validation in `onChanged` callback
- Show validation errors via tooltips or messages

### Duplicate Handling
- If `allowDuplicates="false"`, editing to a duplicate name will show error
- Error persists until user fixes the tag name
- Original tag is preserved until valid name is entered

### Read-Only Mode
- Editing is automatically disabled when `readOnly="true"`
- Double-click has no effect in read-only mode
- All edit features are unavailable

## TypeScript Support

```typescript
interface EditableTagsProps {
  editable: boolean
  defaultTags?: string[]
  sources?: string[]
  onChanged?: (tags: string[]) => void
}
```

## See Also

- [Basic Usage](/examples/basic)
- [Default Tags](/examples/defaults)
- [API Reference](/api/props)
- [Error Handling](/examples/error-handling)
