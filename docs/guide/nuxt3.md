# Smart-Tagz with Nuxt 3 Guide

Complete guide for integrating Smart-Tagz with Nuxt 3.

## Installation

### Option 1: As a Nuxt Module (Recommended)

The easiest way to use Smart-Tagz in Nuxt 3 is through the official module.

```bash
npm install smart-tagz
# or
pnpm add smart-tagz
# or
yarn add smart-tagz
```

Add to your `nuxt.config.ts`:

```typescript
export default defineNuxtConfig({
  modules: [
    'smart-tagz/nuxt'
  ]
})
```

### Option 2: Manual Installation

If you prefer manual setup:

```bash
npm install smart-tagz
```

Create a plugin file `plugins/smart-tagz.ts`:

```typescript
import { defineNuxtPlugin } from '#app'
import SmartTagz from 'smart-tagz'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('SmartTagz', SmartTagz)
})
```

Add to `nuxt.config.ts`:

```typescript
export default defineNuxtConfig({
  plugins: ['~/plugins/smart-tagz.ts']
})
```

---

## Basic Usage

Once installed, use the component anywhere in your Nuxt 3 app:

```vue
<template>
  <div>
    <SmartTagz
      input-placeholder="Enter programming languages..."
      :sources="languages"
      :on-changed="handleChanged"
    />
    <p>Selected: {{ selectedTags }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const languages = ref(['JavaScript', 'TypeScript', 'Python', 'Go'])
const selectedTags = ref<string[]>([])

const handleChanged = (tags: string[]) => {
  selectedTags.value = tags
  console.log('Tags changed:', tags)
}
</script>
```

---

## Common Patterns

### 1. Programmatic Tag Management

Access the component instance to add/clear tags programmatically:

```vue
<template>
  <div>
    <SmartTagz
      ref="tagsRef"
      :default-tags="tags"
      editable
    />

    <button @click="addTag">Add Tag</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const tagsRef = ref()
const tags = ref(['Vue', 'Nuxt'])

const addTag = () => {
  tagsRef.value?.handleAddTag('New Tag')
}
</script>
```

### 2. Dynamic Source Updates

Update the source array reactively:

```vue
<template>
  <div>
    <button @click="toggleSource">Switch Source</button>

    <SmartTagz
      :sources="currentSource"
      :on-changed="handleChanged"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const frontendFrameworks = ref(['Vue', 'React', 'Angular'])
const backendFrameworks = ref(['Node.js', 'Django', 'Rails'])

const currentSource = ref(frontendFrameworks.value)
const selectedTags = ref<string[]>([])

const toggleSource = () => {
  currentSource.value =
    currentSource.value === frontendFrameworks.value
      ? backendFrameworks.value
      : frontendFrameworks.value
}

const handleChanged = (tags: string[]) => {
  selectedTags.value = tags
}
</script>
```

### 3. Async Data Loading

Load tags from an API:

```vue
<template>
  <div>
    <SmartTagz
      v-if="!loading"
      :sources="availableTags"
      :default-tags="userTags"
      :on-changed="handleChanged"
    />
    <div v-else>Loading...</div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const loading = ref(true)
const availableTags = ref<string[]>([])
const userTags = ref<string[]>([])

onMounted(async () => {
  try {
    // Fetch available tags
    const tagResponse = await $fetch('/api/tags')
    availableTags.value = tagResponse

    // Fetch user's current tags
    const userResponse = await $fetch('/api/user/tags')
    userTags.value = userResponse
  } catch (error) {
    console.error('Failed to load tags:', error)
  } finally {
    loading.value = false
  }
})

const handleChanged = (tags: string[]) => {
  // Save to database, emit event, etc.
  console.log('Tags updated:', tags)
}
</script>
```

### 4. Form Integration

Use with Nuxt form validation:

```vue
<template>
  <form @submit.prevent="submitForm">
    <div>
      <label>Select Tags:</label>
      <SmartTagz
        ref="tagsRef"
        :sources="availableTags"
        :on-changed="updateFormData"
      />
      <span v-if="errors.tags" class="error">{{ errors.tags }}</span>
    </div>

    <button type="submit">Submit</button>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const tagsRef = ref()
const availableTags = ref(['JavaScript', 'TypeScript', 'Python'])
const formData = ref({
  tags: [] as string[],
})
const errors = ref({
  tags: '',
})

const updateFormData = (tags: string[]) => {
  formData.value.tags = tags
  // Clear error when user selects tags
  if (tags.length > 0) {
    errors.value.tags = ''
  }
}

const submitForm = async () => {
  // Validate
  if (formData.value.tags.length === 0) {
    errors.value.tags = 'Please select at least one tag'
    return
  }

  try {
    // Submit form
    await $fetch('/api/submit', {
      method: 'POST',
      body: formData.value,
    })

    alert('Form submitted successfully!')
  } catch (error) {
    console.error('Form submission failed:', error)
  }
}
</script>

<style scoped>
.error {
  color: red;
  font-size: 0.9rem;
  margin-top: 0.25rem;
}
</style>
```

---

## Props Reference

Here are the main props you'll use in Nuxt 3:

```typescript
interface SmartTagzProps {
  // Display
  inputPlaceholder?: string // Default: 'Enter tag...'
  maxTags?: number // Maximum tags allowed

  // Data
  defaultTags?: string[] // Initial tags
  sources?: string[] // Autocomplete options

  // Behavior
  editable?: boolean // Allow editing existing tags
  allowDuplicates?: boolean // Allow duplicate tags
  autosuggest?: boolean // Show suggestions
  allowPaste?: { delimiter: string } // Allow pasting with delimiter
  quickDelete?: boolean // Allow quick delete with keyboard

  // Events
  onChanged?: (tags: string[]) => void // Fired when tags change
}
```

---

## Events and Methods

### Using the `onChanged` Event

```vue
<SmartTagz
  :on-changed="(tags) => console.log('Tags:', tags)"
/>
```

### Accessing Component Methods

Via template ref:

```typescript
const tagsRef = ref()

// Add a tag programmatically
tagsRef.value.handleAddTag('new-tag')

// Remove a tag
tagsRef.value.handleRemoveTag('tag-id')
```

---

## Styling in Nuxt 3

Smart-Tagz comes with default styles. Customize them in your app:

### Global Overrides

In your main layout or app component:

```vue
<style lang="scss">
:deep(.tags_wrapper) {
  // Customize component styles
  border-color: #007bff;
}

:deep(.tags_input) {
  // Style input
  padding: 0.75rem;
}

:deep(.tag) {
  // Style individual tags
  background-color: #007bff;
}
</style>
```

### Component-Level Styles

```vue
<template>
  <div class="my-tags">
    <SmartTagz ref="tagsRef" />
  </div>
</template>

<style scoped lang="scss">
.my-tags :deep(.tags_wrapper) {
  border: 2px solid #007bff;
  border-radius: 8px;
}
</style>
```

---

## TypeScript Support

Smart-Tagz is fully typed for Nuxt 3:

```vue
<script setup lang="ts">
import { ref, Ref } from 'vue'

const tagsRef: Ref = ref()
const selectedTags: Ref<string[]> = ref([])

const handleChanged = (tags: string[]): void => {
  selectedTags.value = tags
}

// Component methods are typed
const addTag = (): void => {
  tagsRef.value?.handleAddTag('new-tag')
}
</script>
```

---

## Troubleshooting

### Issue: Component not found

**Solution**: Ensure the module is added to `nuxt.config.ts`:

```typescript
export default defineNuxtConfig({
  modules: ['smart-tagz/nuxt']
})
```

### Issue: Styles not loading

**Solution**: Make sure SCSS is configured:

```typescript
export default defineNuxtConfig({
  modules: ['smart-tagz/nuxt'],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {},
      },
    },
  },
})
```

### Issue: SSR Hydration Mismatch

**Solution**: Wrap component with `<ClientOnly>`:

```vue
<ClientOnly>
  <SmartTagz :source="tags" />
</ClientOnly>
```

---

## Complete Example

See `/examples/Nuxt3Example.vue` for a complete working example with:
- Basic usage
- Editable tags
- Dynamic sources
- Programmatic control
- All available features

---

## Performance Tips

1. **Memoize large source arrays**:
   ```typescript
   const largeSource = computed(() =>
     expensiveFunction(sourceData)
   )
   ```

2. **Use lazy loading for async sources**:
   ```typescript
   const tags = await $fetch('/api/tags')
   ```

3. **Limit suggestions with max-tags**:
   ```vue
   <SmartTagz :max-tags="10" />
   ```

---

## Support

For issues or questions:
- [GitHub Issues](https://github.com/prabhuignoto/smart-tagz/issues)
- [Documentation](https://github.com/prabhuignoto/smart-tagz)

---

## Next Steps

- Check out the [main documentation](../README.md)
- Review [API reference](../docs)
- Explore [examples](../examples)
