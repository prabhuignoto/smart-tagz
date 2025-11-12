# Default & Pre-populated Tags

Learn how to initialize Smart-Tagz with predefined tags.

## Live Demo

See pre-populated tags in action:

<div class="demo-container">
  <SmartTagz
    :default-tags="['Vue.js', 'TypeScript', 'Tailwind CSS']"
    input-placeholder="Add more tags..."
  />
</div>

## Overview

The `defaultTags` prop allows you to set initial tags when the component mounts. This is useful for:
- Editing existing items (show current tags)
- Pre-selecting frequently used tags
- Loading user preferences
- Displaying previously saved data

## Basic Usage

<div class="demo-container">
  <SmartTagz :default-tags="['Vue.js', 'TypeScript', 'Tailwind']" input-placeholder="Add more tags..." />
</div>

<CodeBlockCollapsible>

```vue
<template>
  <SmartTagz :default-tags="['Vue.js', 'TypeScript', 'Tailwind']" />
</template>

<script setup>
import SmartTagz from 'smart-tagz'
import 'smart-tagz/dist/smart-tagz.css'
</script>
```

</CodeBlockCollapsible>

## Props

### `defaultTags`

- **Type:** `string[]`
- **Default:** `[]`
- **Description:** Array of tag strings to display on component mount

```vue
<SmartTagz :default-tags="initialTags" />
```

## Practical Examples

### Example 1: Loading User Preferences

<div class="demo-container">
  <SmartTagz
    :default-tags="['JavaScript', 'Vue.js', 'Web Development']"
    :sources="['JavaScript', 'TypeScript', 'Python', 'Vue.js', 'React', 'Angular', 'Web Development', 'Machine Learning']"
    autosuggest
    input-placeholder="Manage your preferences..."
  />
</div>

<CodeBlockCollapsible>

```vue
<template>
  <div>
    <SmartTagz
      :default-tags="userPreferences.tags"
      :sources="availableTags"
      autosuggest
      @on-changed="updatePreferences"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import SmartTagz from 'smart-tagz'

const userPreferences = ref({
  tags: ['JavaScript', 'Vue.js', 'Web Development']
})

const availableTags = [
  'JavaScript',
  'TypeScript',
  'Python',
  'Vue.js',
  'React',
  'Angular',
  'Web Development',
  'Machine Learning'
]

const updatePreferences = (tags) => {
  userPreferences.value.tags = tags
  // Save to database or localStorage
}
</script>
```

</CodeBlockCollapsible>

### Example 2: Editing Existing Item

<div class="demo-container">
  <SmartTagz
    :default-tags="['Frontend', 'Vue.js', 'Open Source']"
    :sources="['Frontend', 'Backend', 'Vue.js', 'React', 'Open Source']"
    :editable="true"
    autosuggest
    input-placeholder="Edit item tags..."
  />
</div>

<CodeBlockCollapsible>

```vue
<template>
  <form @submit.prevent="saveItem">
    <div class="form-group">
      <label>Item Tags</label>
      <SmartTagz
        :default-tags="item.tags"
        :sources="availableTags"
        :editable="true"
        autosuggest
        @on-changed="item.tags = $event"
      />
    </div>
    <button type="submit">Save Changes</button>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import SmartTagz from 'smart-tagz'

const item = ref({
  id: 1,
  name: 'My Project',
  tags: ['Frontend', 'Vue.js', 'Open Source']
})

const availableTags = ['Frontend', 'Backend', 'Vue.js', 'React', 'Open Source']

const saveItem = async () => {
  // Save to API
  const response = await fetch(`/api/items/${item.value.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item.value)
  })
  console.log('Item saved:', await response.json())
}
</script>
```

</CodeBlockCollapsible>

### Example 3: Dynamic Tags from API

<div class="demo-container">
  <SmartTagz
    :default-tags="['JavaScript', 'Vue.js']"
    :sources="['JavaScript', 'TypeScript', 'Vue.js', 'React', 'Angular', 'Python', 'Go']"
    :max-tags="10"
    autosuggest
    input-placeholder="Load and manage tags from API..."
  />
</div>

<CodeBlockCollapsible>

```vue
<template>
  <SmartTagz
    :default-tags="loadedTags"
    :sources="availableTags"
    :max-tags="10"
    autosuggest
    @on-changed="handleTagsChanged"
  />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import SmartTagz from 'smart-tagz'

const loadedTags = ref([])
const availableTags = ref([])

onMounted(async () => {
  // Fetch initial tags
  const tagsResponse = await fetch('/api/tags')
  loadedTags.value = await tagsResponse.json()

  // Fetch available options
  const optionsResponse = await fetch('/api/tags/options')
  availableTags.value = await optionsResponse.json()
})

const handleTagsChanged = (tags) => {
  console.log('Tags changed:', tags)
  // Update parent or trigger side effects
}
</script>
```

</CodeBlockCollapsible>

## Combining with Other Props

### With Constraints

<div class="demo-container">
  <SmartTagz
    :default-tags="['Vue.js', 'React']"
    :max-tags="5"
    :allow-duplicates="false"
    :editable="true"
    input-placeholder="Max 5 tags with constraints..."
  />
</div>

<CodeBlockCollapsible>

```vue
<template>
  <SmartTagz
    :default-tags="['Vue.js', 'React']"
    :max-tags="5"
    :allow-duplicates="false"
    :editable="true"
  />
</template>
```

</CodeBlockCollapsible>

### With Suggestions

<div class="demo-container">
  <SmartTagz
    :default-tags="['JavaScript']"
    :sources="['JavaScript', 'TypeScript', 'Python', 'Go', 'Rust', 'Java', 'C#', 'Swift']"
    autosuggest
    input-placeholder="Add more languages..."
  />
</div>

<CodeBlockCollapsible>

```vue
<template>
  <SmartTagz
    :default-tags="['JavaScript']"
    :sources="programmingLanguages"
    autosuggest
    input-placeholder="Add more languages..."
  />
</template>

<script setup>
const programmingLanguages = [
  'JavaScript',
  'TypeScript',
  'Python',
  'Go',
  'Rust',
  'Java',
  'C#',
  'Swift'
]
</script>
```

</CodeBlockCollapsible>

### With Custom Theming

<div class="demo-container">
  <SmartTagz
    :default-tags="['Important', 'Urgent', 'Review']"
    :theme="{
      primary: '#ef4444',
      background: '#fee2e2',
      tagTextColor: '#ffffff'
    }"
    input-placeholder="Custom themed defaults..."
  />
</div>

<CodeBlockCollapsible>

```vue
<template>
  <SmartTagz
    :default-tags="['Important', 'Urgent', 'Review']"
    :theme="{
      primary: '#ef4444',
      background: '#fee2e2',
      tagTextColor: '#ffffff'
    }"
  />
</template>
```

</CodeBlockCollapsible>

## Behavior Notes

### Initial Load
- Tags are set when component mounts
- Tags are limited by `maxTags` property
- Duplicates are handled based on `allowDuplicates` setting
- All initial tags must be valid strings

### Updating Default Tags
If you update the `defaultTags` prop after component mount, the new tags will **not** automatically replace the current tags. Users must remove old tags first.

```vue
<!-- This will NOT update existing tags -->
<SmartTagz :default-tags="newTags" />

<!-- Use a key to force recreation -->
<SmartTagz :key="refreshKey" :default-tags="newTags" />
```

## Accessibility

Default tags are:
- Included in ARIA labels: "Add tags (2 of 10)"
- Announced to screen readers on mount
- Fully keyboard navigable
- Marked as deletable with deletion instructions

## TypeScript Support

<CodeBlockCollapsible>

```typescript
import SmartTagz from 'smart-tagz'

interface TagProps {
  defaultTags: string[]
  sources?: string[]
  maxTags?: number
  editable?: boolean
}

const props: TagProps = {
  defaultTags: ['Vue', 'React'],
  sources: ['Vue', 'React', 'Angular'],
  maxTags: 10,
  editable: true
}
```

</CodeBlockCollapsible>

## See Also

- [Basic Usage](/examples/basic)
- [Editing Tags](/examples/editable)
- [API Reference](/api/props)
