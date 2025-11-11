# Duplicate Prevention

Learn how to prevent or allow duplicate tags.

## Live Demo

Try adding the same tag twice (duplicates are prevented by default):

<div class="demo-container">
  <SmartTagz
    :sources="['JavaScript', 'TypeScript', 'Vue.js', 'React', 'Python']"
    :allow-duplicates="false"
    autosuggest
    input-placeholder="Try adding the same tag twice..."
  />
</div>

## Overview

The `allowDuplicates` prop controls whether the same tag can be added multiple times. This is useful for:
- Ensuring tag uniqueness
- Preventing accidental re-adds
- Enforcing data integrity
- Category/classification systems
- Skill sets and qualifications

## Basic Usage

```vue
<!-- Prevent duplicates (recommended) -->
<template>
  <SmartTagz :allow-duplicates="false" />
</template>

<!-- Allow duplicates (default) -->
<template>
  <SmartTagz :allow-duplicates="true" />
</template>

<script setup>
import SmartTagz from 'smart-tagz'
import 'smart-tagz/dist/smart-tagz.css'
</script>
```

## Props

### `allowDuplicates`

- **Type:** `boolean`
- **Default:** `true`
- **Description:** Allow or prevent adding duplicate tags

```vue
<!-- Prevent duplicates -->
<SmartTagz :allow-duplicates="false" />

<!-- Allow duplicates (default) -->
<SmartTagz :allow-duplicates="true" />
```

## How It Works

### When `allowDuplicates="false"`

**Scenario 1: Manual Input**
```
User types: "Vue"
User presses: Enter
Existing tags: ["Vue", "React"]
Result: Error message shown, tag NOT added
Message: "Vue is already added"
```

**Scenario 2: From Suggestions**
```
User selects: "Vue" from dropdown
Existing tags: ["Vue", "React"]
Result: Error message shown, tag NOT added
```

**Scenario 3: Paste Import**
```
User pastes: "Vue, Vue, React"
Existing tags: []
Result: ["Vue", "React"] - duplicates filtered
```

### When `allowDuplicates="true"` (default)
All duplicate operations are allowed without restriction.

## Practical Examples

### Example 1: Simple Duplicate Prevention

```vue
<template>
  <div>
    <h2>Select Your Skills</h2>
    <SmartTagz
      :allow-duplicates="false"
      :sources="skillOptions"
      autosuggest
      input-placeholder="Add skills (no duplicates allowed)..."
      @on-changed="handleSkillsChanged"
    />
  </div>
</template>

<script setup>
import SmartTagz from 'smart-tagz'

const skillOptions = [
  'JavaScript', 'TypeScript', 'Python', 'Vue.js', 'React',
  'Angular', 'Node.js', 'GraphQL', 'REST API', 'Docker'
]

const handleSkillsChanged = (skills) => {
  console.log('Selected skills:', skills)
}
</script>
```

### Example 2: With User Feedback

```vue
<template>
  <div>
    <div v-if="duplicateAttempt" class="warning">
      ⚠️ "{{ duplicateAttempt }}" is already selected!
    </div>

    <SmartTagz
      :allow-duplicates="false"
      :sources="languages"
      autosuggest
      @on-changed="updateLanguages"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import SmartTagz from 'smart-tagz'

const languages = ['JavaScript', 'TypeScript', 'Python', 'Go', 'Rust']
const duplicateAttempt = ref('')
const selectedLanguages = ref([])

const updateLanguages = (langs) => {
  selectedLanguages.value = langs
  // Error message is shown automatically by component
}
</script>

<style>
.warning {
  color: #f59e0b;
  padding: 0.75rem;
  background-color: #fffbeb;
  border-radius: 0.375rem;
  margin-bottom: 1rem;
}
</style>
```

### Example 3: Email List with Duplicate Check

```vue
<template>
  <div>
    <h3>Add Email Recipients</h3>
    <SmartTagz
      :allow-duplicates="false"
      :allow-paste="{ delimiter: ',' }"
      :editable="true"
      input-placeholder="Type or paste emails..."
      @on-changed="validateEmails"
    />

    <div v-if="invalidEmails.length > 0" class="error-message">
      <h4>Invalid Emails:</h4>
      <ul>
        <li v-for="email in invalidEmails" :key="email">{{ email }}</li>
      </ul>
    </div>

    <div v-if="validEmails.length > 0" class="success-message">
      ✓ {{ validEmails.length }} valid email(s) ready to send
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import SmartTagz from 'smart-tagz'

const selectedEmails = ref([])
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const validEmails = computed(() => {
  return selectedEmails.value.filter(email => emailRegex.test(email))
})

const invalidEmails = computed(() => {
  return selectedEmails.value.filter(email => !emailRegex.test(email))
})

const validateEmails = (emails) => {
  selectedEmails.value = emails
}
</script>

<style>
.error-message {
  color: #dc2626;
  padding: 1rem;
  background-color: #fee2e2;
  border-radius: 0.375rem;
  margin-top: 1rem;
}

.success-message {
  color: #059669;
  padding: 1rem;
  background-color: #ecfdf5;
  border-radius: 0.375rem;
  margin-top: 1rem;
}
</style>
```

### Example 4: Form with Duplicate Categories

```vue
<template>
  <form @submit.prevent="submitForm">
    <div class="form-group">
      <label>Article Categories</label>
      <SmartTagz
        :allow-duplicates="false"
        :sources="categories"
        :max-tags="5"
        autosuggest
        :default-tags="article.categories"
        @on-changed="article.categories = $event"
      />
      <small>Choose up to 5 categories (no duplicates)</small>
    </div>

    <div class="form-group">
      <label>Article Title</label>
      <input v-model="article.title" type="text" required />
    </div>

    <div class="form-group">
      <label>Content</label>
      <textarea v-model="article.content" required></textarea>
    </div>

    <button type="submit" class="btn-submit">Publish Article</button>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import SmartTagz from 'smart-tagz'

const categories = [
  'Technology', 'Business', 'Lifestyle', 'Health',
  'Sports', 'Entertainment', 'Education', 'Travel'
]

const article = ref({
  title: '',
  content: '',
  categories: []
})

const submitForm = async () => {
  if (article.value.categories.length === 0) {
    alert('Please select at least one category')
    return
  }

  const response = await fetch('/api/articles', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(article.value)
  })

  if (response.ok) {
    alert('Article published!')
    article.value = { title: '', content: '', categories: [] }
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

input[type="text"],
textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  font-family: inherit;
}

small {
  display: block;
  margin-top: 0.25rem;
  color: #6b7280;
}

.btn-submit {
  background-color: #3b82f6;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  font-weight: 600;
}

.btn-submit:hover {
  background-color: #2563eb;
}
</style>
```

## Combining with Other Props

### With Max Tags

```vue
<SmartTagz
  :allow-duplicates="false"
  :max-tags="10"
/>
```

### With Paste Import

```vue
<SmartTagz
  :allow-duplicates="false"
  :allow-paste="{ delimiter: ',' }"
/>
```

### With Editing

```vue
<SmartTagz
  :allow-duplicates="false"
  :editable="true"
/>
```

### With Suggestions

```vue
<SmartTagz
  :allow-duplicates="false"
  :sources="options"
  autosuggest
/>
```

## Behavior Notes

### Case Sensitivity
Duplicate detection is **case-insensitive**:
```
Existing: ["Vue"]
Try adding: "VUE" or "vue"
Result: Duplicate error
```

### Whitespace Handling
Whitespace is trimmed before comparison:
```
Existing: ["Vue.js"]
Try adding: "  Vue.js  "
Result: Duplicate error
```

### Paste with Duplicates
When pasting with duplicates and `allowDuplicates="false"`:
```
Paste: "Vue, React, Vue, Angular"
Result: ["Vue", "React", "Angular"]
Duplicates silently removed
```

### Edit Mode Duplicates
When editing a tag to match another:
```
Existing: ["Vue", "React"]
Edit: "Vue" to "React"
Result: Error shown, edit cancelled
```

## Error Messages

### Duplicate Detected
```
"Vue is already added"
```

### Multiple Duplicates from Paste
```
"Vue is already added"
(shows first duplicate only)
```

### In Read-Only Mode
- Duplicate prevention still works
- But messages aren't shown
- All tags display as-is

## Accessibility

- Error messages announced to screen readers
- ARIA labels include duplicate information
- Keyboard navigation works with duplicate prevention
- Error tooltips have proper roles

## TypeScript Support

```typescript
interface SmartTagzProps {
  allowDuplicates?: boolean
  sources?: string[]
  maxTags?: number
}
```

## See Also

- [Basic Usage](/examples/basic)
- [Max Tags Limit](/examples/maxtags)
- [Paste Import](/examples/paste)
- [API Reference](/api/props)
