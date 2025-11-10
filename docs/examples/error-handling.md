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

## Code Example: Advanced Error Handling

```vue
<template>
  <div class="form-group">
    <label for="tags">Select Technologies (Max 3)</label>
    <SmartTagz
      id="tags"
      :sources="technologies"
      :max-tags="3"
      :allow-duplicates="false"
      :allow-paste="{ delimiter: ',' }"
      input-placeholder="Add technologies..."
      :on-changed="handleTagsChange"
    />

    <!-- Status messages -->
    <div v-if="error" class="error-message" role="alert">
      <span class="icon">⚠️</span>
      {{ error }}
    </div>

    <div v-if="success" class="success-message" role="status">
      <span class="icon">✅</span>
      {{ success }}
    </div>

    <!-- Tag count display -->
    <p class="tag-count">
      Selected: {{ tags.length }}/{{ maxTags }}
    </p>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import SmartTagz from 'smart-tagz'
import 'smart-tagz/dist/smart-tagz.css'

const technologies = [
  'JavaScript', 'TypeScript', 'Python',
  'Vue.js', 'React', 'Angular',
  'Node.js', 'Django', 'FastAPI'
]

const maxTags = 3
const tags = ref([])
const error = ref('')
const success = ref('')

const handleTagsChange = (newTags) => {
  tags.value = newTags
  error.value = ''
  success.value = ''

  // Validate tag count
  if (newTags.length >= maxTags) {
    success.value = 'Maximum tags reached'
  } else if (newTags.length > 0) {
    success.value = `Added ${newTags[newTags.length - 1]}`
  }

  // Custom business logic
  console.log('Tags updated:', newTags)
}

// Computed properties for validation
const isAtMaxCapacity = computed(() => tags.value.length >= maxTags)
const remainingSlots = computed(() => maxTags - tags.value.length)
</script>

<style scoped>
.form-group {
  margin-bottom: 2rem;
}

label {
  display: block;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #374151;
}

.error-message {
  color: #dc2626;
  background-color: #fee2e2;
  border: 1px solid #fecaca;
  border-radius: 0.375rem;
  padding: 0.75rem;
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.success-message {
  color: #059669;
  background-color: #ecfdf5;
  border: 1px solid #a7f3d0;
  border-radius: 0.375rem;
  padding: 0.75rem;
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.icon {
  font-size: 1rem;
}

.tag-count {
  font-size: 0.875rem;
  color: #6b7280;
  margin-top: 0.5rem;
}
</style>
```

## Error Prevention Best Practices

### Set Appropriate Limits

```vue
<!-- ✅ Good: Clear limits -->
<SmartTagz
  :max-tags="5"
  :allow-duplicates="false"
/>

<!-- ❌ Bad: No constraints -->
<SmartTagz />
```

### Provide Clear Feedback

```vue
<!-- ✅ Good: Show count -->
<p>Selected: {{ tags.length }}/5</p>

<!-- ❌ Bad: No feedback -->
<SmartTagz />
```

### Guide Users with Placeholder

```vue
<!-- ✅ Good: Clear instructions -->
<SmartTagz
  input-placeholder="Enter up to 5 tags (no duplicates)..."
/>

<!-- ❌ Bad: Generic placeholder -->
<SmartTagz input-placeholder="Enter tags..." />
```

## Error Handling Checklist

- [x] Validate tag input on addition
- [x] Check max tags limit
- [x] Detect duplicate tags
- [x] Handle empty/whitespace input
- [x] Announce errors to screen readers
- [x] Display clear error messages
- [x] Clear input field after error
- [x] Allow user to retry

## Screen Reader Error Announcements

Smart-Tagz automatically announces errors:

```
User Action: Try to add 6th tag when max is 5
Screen Reader: "Maximum 5 tags allowed"

User Action: Try to add duplicate tag
Screen Reader: "React is already added"

User Action: Successfully add tag
Screen Reader: "React added. Total tags: 1"
```

## Common Error Scenarios

### Scenario 1: User Exceeds Max Tags

```
1. Max tags set to 3
2. User adds: React, Vue, Angular
3. User tries to add: Svelte
   → Error: "Maximum 3 tags allowed"
4. User removes Angular
5. User adds: Svelte ✓
```

### Scenario 2: User Adds Duplicate

```
1. User adds: JavaScript
2. User types: JavaScript
3. User presses Enter
   → Error: "JavaScript is already added"
4. User types: TypeScript
5. User presses Enter ✓
```

### Scenario 3: Paste Multiple with Constraints

```
1. Max tags: 2
2. User pastes: "React, Vue, Angular"
3. System adds: React, Vue
4. System stops: "Maximum 2 tags allowed"
5. User can manually add: Angular if space available
```

## API Response Error Handling

If loading suggestions from an API:

```vue
<script setup>
import { ref } from 'vue'

const sources = ref([])
const error = ref('')

const loadSuggestions = async () => {
  try {
    const response = await fetch('/api/technologies')
    if (!response.ok) throw new Error('Failed to load suggestions')
    sources.value = await response.json()
  } catch (err) {
    error.value = err.message
    console.error('Error loading suggestions:', err)
  }
}

onMounted(loadSuggestions)
</script>
```

## Accessibility for Errors

Always announce errors to screen readers:

```vue
<!-- ✅ Good: Error announced -->
<div v-if="error" role="alert">{{ error }}</div>

<!-- ❌ Bad: Error not announced -->
<div v-if="error" style="color: red">{{ error }}</div>
```

## Next Steps

- [Keyboard Navigation](/examples/keyboard) - Handle keyboard errors
- [Accessibility](/examples/accessibility) - Ensure errors are accessible
- [API Reference](/api/props) - All validation props
