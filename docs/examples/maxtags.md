# Maximum Tag Limit

Learn how to set and enforce a maximum number of tags.

## Live Demo

Try adding more than 3 tags (the input will be disabled):

<div class="demo-container">
  <SmartTagz
    :sources="['JavaScript', 'TypeScript', 'Vue.js', 'React', 'Python', 'Go']"
    :max-tags="3"
    autosuggest
    input-placeholder="Max 3 tags allowed..."
  />
</div>

## Overview

The `maxTags` prop limits the number of tags users can add. This is useful for:
- Form field constraints
- API limitations
- UX simplification
- Data validation
- Preventing data overload

## Basic Usage

```vue
<!-- Limit to 5 tags -->
<template>
  <SmartTagz :max-tags="5" />
</template>

<!-- Limit to 10 tags (default) -->
<template>
  <SmartTagz :max-tags="10" />
</template>

<script setup>
import SmartTagz from 'smart-tagz'
import 'smart-tagz/dist/smart-tagz.css'
</script>
```

## Props

### `maxTags`

- **Type:** `number`
- **Default:** `20`
- **Description:** Maximum number of tags that can be added

```vue
<SmartTagz :max-tags="5" />
```

## How It Works

### Before Limit Reached
- Input field is visible
- Users can add tags normally
- ARIA label shows progress: "Add tags (2 of 5)"

### At Limit
- Input field automatically hides
- No more tags can be added
- Error message shown if user tries: "Maximum 5 tags allowed"
- Input field reappears when tags are removed

### Exceeding Limit with Paste
- Paste only adds tags up to the limit
- Excess tags are ignored
- Error message shown for overflow

## Practical Examples

### Example 1: Survey with Tag Limit

```vue
<template>
  <div class="survey">
    <h2>What are your top skills?</h2>
    <p>Select up to 5 skills</p>

    <SmartTagz
      :max-tags="5"
      :sources="availableSkills"
      autosuggest
      input-placeholder="Select skills..."
      @on-changed="handleSkillsChange"
    />

    <div class="progress">
      <span>{{ selectedSkills.length }} / 5 skills selected</span>
      <div class="progress-bar">
        <div class="progress-fill" :style="{ width: progressPercent }"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import SmartTagz from 'smart-tagz'

const availableSkills = [
  'JavaScript', 'Python', 'Vue.js', 'React', 'TypeScript',
  'Node.js', 'Docker', 'AWS', 'PostgreSQL', 'GraphQL'
]

const selectedSkills = ref([])

const progressPercent = computed(() => {
  return (selectedSkills.value.length / 5) * 100 + '%'
})

const handleSkillsChange = (skills) => {
  selectedSkills.value = skills
}
</script>

<style>
.survey {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
}

.progress {
  margin-top: 1.5rem;
}

.progress-bar {
  width: 100%;
  height: 8px;
  background-color: #e5e7eb;
  border-radius: 4px;
  overflow: hidden;
  margin-top: 0.5rem;
}

.progress-fill {
  height: 100%;
  background-color: #3b82f6;
  transition: width 0.3s ease;
}
</style>
```

### Example 2: Shopping Cart Tags (Wishlist)

```vue
<template>
  <div class="wishlist">
    <h2>My Wishlist</h2>

    <SmartTagz
      :max-tags="10"
      :editable="true"
      :allow-duplicates="false"
      input-placeholder="Add item to wishlist..."
      @on-changed="updateWishlist"
    />

    <div v-if="wishlistItems.length >= 10" class="full-notice">
      <p>⚠️ Your wishlist is full. Remove items to add more.</p>
    </div>

    <div class="wishlist-actions">
      <button @click="shareWishlist" :disabled="wishlistItems.length === 0">
        Share Wishlist
      </button>
      <button @click="clearWishlist">Clear All</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import SmartTagz from 'smart-tagz'

const wishlistItems = ref([])

const updateWishlist = (items) => {
  wishlistItems.value = items
}

const shareWishlist = () => {
  const url = `https://example.com/wishlist/${encodeURIComponent(wishlistItems.value.join(','))}`
  console.log('Share URL:', url)
}

const clearWishlist = () => {
  if (confirm('Clear entire wishlist?')) {
    wishlistItems.value = []
  }
}
</script>

<style>
.wishlist {
  max-width: 500px;
}

.full-notice {
  color: #ea580c;
  padding: 1rem;
  background-color: #fed7aa;
  border-radius: 0.375rem;
  margin-top: 1rem;
}

.wishlist-actions {
  margin-top: 1.5rem;
  display: flex;
  gap: 1rem;
}

button {
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  font-weight: 600;
  flex: 1;
}

button:not(:disabled) {
  background-color: #3b82f6;
  color: white;
}

button:disabled {
  background-color: #e5e7eb;
  color: #9ca3af;
  cursor: not-allowed;
}
</style>
```

### Example 3: Image Tagging with Limit

```vue
<template>
  <div class="image-tagger">
    <img :src="imageUrl" :alt="imageName" class="preview" />

    <div class="tagger-section">
      <h3>Tag This Image</h3>
      <SmartTagz
        :max-tags="8"
        :sources="suggestedTags"
        :allow-duplicates="false"
        autosuggest
        input-placeholder="Add tags..."
        @on-changed="updateTags"
      />

      <div class="tag-counter">
        {{ imageTags.length }}/8 tags
      </div>
    </div>

    <button @click="saveTags" :disabled="imageTags.length === 0" class="btn-save">
      Save Tags
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import SmartTagz from 'smart-tagz'

const imageUrl = 'https://via.placeholder.com/300'
const imageName = 'Sample Image'

const suggestedTags = [
  'Nature', 'Outdoor', 'Landscape', 'Sky', 'Mountains',
  'Beach', 'Forest', 'Water', 'Sunset', 'Wildlife'
]

const imageTags = ref([])

const updateTags = (tags) => {
  imageTags.value = tags
}

const saveTags = () => {
  console.log('Saving tags:', imageTags.value)
  // Save to API
}
</script>

<style>
.image-tagger {
  max-width: 500px;
}

.preview {
  width: 100%;
  border-radius: 0.5rem;
  margin-bottom: 1.5rem;
}

.tagger-section {
  margin: 1.5rem 0;
}

.tagger-section h3 {
  margin-bottom: 1rem;
}

.tag-counter {
  margin-top: 0.75rem;
  font-size: 0.875rem;
  color: #6b7280;
}

.btn-save {
  width: 100%;
  padding: 0.75rem;
  background-color: #10b981;
  color: white;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  font-weight: 600;
}

.btn-save:disabled {
  background-color: #e5e7eb;
  color: #9ca3af;
  cursor: not-allowed;
}
</style>
```

### Example 4: API Request with Tag Limits

```vue
<template>
  <form @submit.prevent="submitRequest">
    <div class="form-group">
      <label>Request Tags (max 5)</label>
      <SmartTagz
        :max-tags="5"
        :sources="tagCategories"
        :editable="true"
        autosuggest
        @on-changed="formData.tags = $event"
      />
    </div>

    <div class="form-group">
      <label>Description</label>
      <textarea v-model="formData.description" required></textarea>
    </div>

    <div class="form-actions">
      <button type="submit" class="btn-submit">Submit Request</button>
      <span v-if="!canSubmit" class="error-note">
        Add at least 1 tag to submit
      </span>
    </div>
  </form>
</template>

<script setup>
import { ref, computed } from 'vue'
import SmartTagz from 'smart-tagz'

const tagCategories = [
  'Bug Report', 'Feature Request', 'Documentation',
  'Performance', 'Security', 'Accessibility'
]

const formData = ref({
  tags: [],
  description: ''
})

const canSubmit = computed(() => {
  return formData.value.tags.length > 0 && formData.value.description.trim() !== ''
})

const submitRequest = async () => {
  const response = await fetch('/api/requests', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData.value)
  })

  if (response.ok) {
    alert('Request submitted successfully!')
    formData.value = { tags: [], description: '' }
  }
}
</script>

<style>
.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  font-family: inherit;
  min-height: 100px;
  resize: vertical;
}

.form-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 2rem;
}

.btn-submit {
  padding: 0.75rem 1.5rem;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  font-weight: 600;
}

.btn-submit:disabled {
  background-color: #e5e7eb;
  color: #9ca3af;
  cursor: not-allowed;
}

.error-note {
  color: #dc2626;
  font-size: 0.875rem;
}
</style>
```

## Combining with Other Props

### With Default Tags

```vue
<SmartTagz
  :max-tags="10"
  :default-tags="['Vue', 'React']"
/>
```

### With Paste Import

```vue
<SmartTagz
  :max-tags="5"
  :allow-paste="{ delimiter: ',' }"
/>
```

### With Duplicate Prevention

```vue
<SmartTagz
  :max-tags="10"
  :allow-duplicates="false"
/>
```

### With Suggestions

```vue
<SmartTagz
  :max-tags="8"
  :sources="options"
  autosuggest
/>
```

## Behavior Notes

### Input Field Visibility
- **Hidden when**: Tag count >= maxTags
- **Visible when**: Tag count < maxTags
- **Reappears**: When tags are removed below limit

### Error Message
When user tries to exceed limit:
```
"Maximum X tags allowed"
Auto-dismisses after 4 seconds
```

### Paste Operation
When pasting exceeds limit:
- Only tags up to limit are added
- Excess tags ignored
- Error message shown for overflow
- User can paste remaining items after removing tags

### ARIA Label
Input field ARIA label updates:
```
"Add tags (2 of 5)"  <- 2 tags added, max is 5
"Add tags (5 of 5)"  <- at limit
"Add tags (0 of 5)"  <- cleared
```

## Accessibility

- ARIA labels show progress: "X of Y"
- Tag limit shown in label
- Input hidden at limit, announced to screen readers
- Error messages announced to screen readers

## TypeScript Support

```typescript
interface SmartTagzProps {
  maxTags?: number
  allowDuplicates?: boolean
  allowPaste?: { delimiter: string }
}
```

## See Also

- [Basic Usage](/examples/basic)
- [Duplicate Prevention](/examples/duplicates)
- [Paste Import](/examples/paste)
- [API Reference](/api/props)
