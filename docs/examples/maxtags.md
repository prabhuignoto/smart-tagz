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

<CodeBlockCollapsible>

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

</CodeBlockCollapsible>

## Props

### `maxTags`

- **Type:** `number`
- **Default:** `20`
- **Description:** Maximum number of tags that can be added

<CodeBlockCollapsible>

```vue
<SmartTagz :max-tags="5" />
```

</CodeBlockCollapsible>

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

<CodeBlockCollapsible>

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

</CodeBlockCollapsible>

**Live Demo - Try selecting up to 5 skills:**

<div class="demo-container">
  <h3 style="margin: 0 0 0.5rem 0;">What are your top skills?</h3>
  <p style="margin: 0 0 1rem 0; color: #666;">Select up to 5 skills</p>

  <SmartTagz
    :max-tags="5"
    :sources="['JavaScript', 'Python', 'Vue.js', 'React', 'TypeScript', 'Node.js', 'Docker', 'AWS', 'PostgreSQL', 'GraphQL']"
    autosuggest
    input-placeholder="Select skills..."
  />
</div>

### Example 2: Shopping Cart Tags (Wishlist)

<CodeBlockCollapsible>

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

</CodeBlockCollapsible>

**Live Demo - Build your wishlist (max 10 items):**

<div class="demo-container">
  <h3 style="margin: 0 0 1rem 0;">My Wishlist</h3>

  <SmartTagz
    :max-tags="10"
    :editable="true"
    :allow-duplicates="false"
    input-placeholder="Add item to wishlist..."
  />

  <p style="margin-top: 1rem; font-size: 0.9rem; color: #666;">
    Your wishlist can hold up to 10 items. Try adding items and editing them!
  </p>
</div>

### Example 3: Image Tagging with Limit

<CodeBlockCollapsible>

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

const imageUrl = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=400&fit=crop'
const imageName = 'Mountain Landscape'

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

</CodeBlockCollapsible>

**Live Demo - Tag an image (max 8 tags):**

<div class="demo-container">
  <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=400&fit=crop" alt="Mountain Landscape" style="width: 100%; border-radius: 0.5rem; margin-bottom: 1.5rem;" />

  <h3 style="margin: 0 0 1rem 0;">Tag This Image</h3>
  <SmartTagz
    :max-tags="8"
    :sources="['Nature', 'Outdoor', 'Landscape', 'Sky', 'Mountains', 'Beach', 'Forest', 'Water', 'Sunset', 'Wildlife']"
    :allow-duplicates="false"
    autosuggest
    input-placeholder="Add tags..."
  />

  <p style="margin-top: 1rem; font-size: 0.9rem; color: #666;">
    Add up to 8 tags to describe this image
  </p>
</div>

### Example 4: API Request with Tag Limits

<CodeBlockCollapsible>

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
      <button type="submit" class="btn-submit" :disabled="!canSubmit">
        {{ isSubmitting ? 'Submitting...' : 'Submit Request' }}
      </button>
      <span v-if="!canSubmit" class="error-note">
        Add at least 1 tag to submit
      </span>
    </div>

    <div v-if="submitMessage" :class="['submit-message', submitStatus]">
      {{ submitMessage }}
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

const isSubmitting = ref(false)
const submitMessage = ref('')
const submitStatus = ref('')

const canSubmit = computed(() => {
  return formData.value.tags.length > 0 && formData.value.description.trim() !== ''
})

// Fake API simulation
const mockApiCall = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const success = Math.random() > 0.1 // 90% success rate
      resolve(success)
    }, 1500)
  })
}

const submitRequest = async () => {
  isSubmitting.value = true
  submitMessage.value = ''

  try {
    const success = await mockApiCall()

    if (success) {
      submitMessage.value = `✅ Request submitted with tags: ${formData.value.tags.join(', ')}`
      submitStatus.value = 'success'
      formData.value = { tags: [], description: '' }
    } else {
      submitMessage.value = '❌ Failed to submit request. Please try again.'
      submitStatus.value = 'error'
    }
  } catch (error) {
    submitMessage.value = '❌ Network error. Please try again.'
    submitStatus.value = 'error'
  } finally {
    isSubmitting.value = false
    setTimeout(() => {
      submitMessage.value = ''
    }, 4000)
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

.submit-message {
  margin-top: 1rem;
  padding: 0.75rem 1rem;
  border-radius: 0.375rem;
  font-weight: 500;
}

.submit-message.success {
  background-color: #d1fae5;
  color: #065f46;
  border: 1px solid #6ee7b7;
}

.submit-message.error {
  background-color: #fee2e2;
  color: #991b1b;
  border: 1px solid #fecaca;
}
</style>
```

</CodeBlockCollapsible>

**Live Demo - Submit a request with tags:**

<div class="demo-container">
  <ApiRequestDemo />
</div>

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
