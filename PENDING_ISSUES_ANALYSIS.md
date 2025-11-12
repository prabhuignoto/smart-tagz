# Pending Open Issues Analysis - smart-tagz v1.2.0

## Summary
- **Total Open Issues**: 4
- **Critical Bugs**: 0
- **Feature Requests**: 1
- **Documentation/Usage Questions**: 2
- **Infrastructure Issues**: 1 (to ignore)

---

## Issue #47: Doesn't work on Nuxt 3 ⭐
**Type**: Feature Request / Compatibility Issue
**Priority**: HIGH
**Status**: Open

### Analysis
Nuxt 3 has significant differences from Nuxt 2 and Vue 3 SSR (Server-Side Rendering) requirements are different. This is a legitimate request for framework compatibility.

### Root Causes
1. Missing Nuxt 3 module/plugin configuration
2. Potential SSR hydration mismatch issues
3. Auto-import configuration needed
4. Component registration in Nuxt 3 context

### Implementation Plan

#### Solution 1: Create Nuxt 3 Plugin
Create `src/nuxt/index.ts`:
```typescript
import { defineNuxtPlugin } from '#app'
import Main from '../components/Main.vue'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('SmartTagz', Main)
})
```

#### Solution 2: Update nuxt.config.ts
Users should add to their `nuxt.config.ts`:
```typescript
export default defineNuxtConfig({
  modules: [],
  components: [
    {
      path: '~/node_modules/smart-tagz/dist/components',
      prefix: 'SmartTagz'
    }
  ],
  // Optional: Auto-import the plugin
  plugins: [
    '~/plugins/smart-tagz.ts'
  ]
})
```

#### Solution 3: Create Nuxt 3 Example
Create full working example in `examples/NuxtExample.vue`

### Deliverables
- [ ] Create Nuxt 3 compatibility documentation
- [ ] Add build target for Nuxt 3 module
- [ ] Create example Nuxt 3 project
- [ ] Document installation for Nuxt 3
- [ ] Update README with Nuxt 3 section

### Effort: 🔴 HIGH (2-3 hours)

---

## Issue #29: Depfu Error ⚠️
**Type**: Infrastructure / DevOps
**Priority**: LOW
**Status**: Open
**Action**: IGNORE (per user instructions)

### Analysis
This is a Depfu service error, not a code issue. Depfu couldn't find supported dependency files and auto-deactivated.

### Resolution
As instructed, we will ignore this issue. It's an infrastructure concern, not a product issue.

---

## Issue #23: Trying to update the tags from code
**Type**: Usage Question / Documentation
**Priority**: MEDIUM
**Status**: Open

### Issue Details
User is trying to update tags programmatically:
```vue
<smart-tagz
    input-placeholder="Enter names ..."
    editable
    :default-tags="names_list"
    :on-changed="updateNames"
/>

<button @click.prevent="addNewName">TEST</button>
```

```javascript
methods: {
    addNewName() {
        this.names_list.push("TEST NAME")
    }
}
```

The array updates but smart-tagz doesn't reflect changes.

### Root Cause
The `:default-tags` prop only initializes tags on component mount. It's not reactive to changes. Users need to use the `clearAllTags()` API or directly manipulate the component's internal state via `$refs`.

### Solution

#### Option 1: Use Component Ref (Recommended)
```vue
<template>
  <div>
    <SmartTagz
      ref="tagsComponent"
      input-placeholder="Enter names ..."
      editable
      :on-changed="updateNames"
    />
    <button @click="addNewName">Add Name</button>
  </div>
</template>

<script>
export default {
  methods: {
    addNewName() {
      // Programmatically add tags via component API
      this.$refs.tagsComponent.handleAddTag('TEST NAME')
    },
    updateNames(tags) {
      console.log('Tags changed:', tags)
    }
  }
}
</script>
```

#### Option 2: Clear and Reset
```javascript
// If you need to replace all tags
async addNewName() {
  this.$refs.tagsComponent.clearAllTags()

  // Wait for clear to complete
  await this.$nextTick()

  // Add your tags
  const names = ['Name 1', 'Name 2', 'Name 3']
  names.forEach(name => {
    this.$refs.tagsComponent.handleAddTag(name)
  })
}
```

#### Option 3: Use v-model (Vue 3)
```vue
<script setup>
const tags = ref([])

const updateTags = (newTags) => {
  tags.value = newTags
}
</script>

<template>
  <SmartTagz
    ref="tagsComponent"
    :default-tags="tags"
    :on-changed="updateTags"
  />
</template>
```

### Response to Post
This is a **usage/documentation issue**, not a bug. The component is working as designed.

**Recommended Response**:
```markdown
Thanks for the question! The `:default-tags` prop only initializes tags on component mount and is not reactive to changes. Here are the recommended ways to update tags programmatically:

### Solution 1: Use Component Ref (Recommended)
[Include Option 1 code above]

### Solution 2: Use clearAllTags() API
Available in v1.2.0+, use `ref.value.clearAllTags()` to clear all tags first, then add new ones.

### Why :default-tags isn't Reactive
The prop is designed for initialization only. Once the component is mounted, you should use the component's API methods to update tags.

Would you like more examples or clarification?
```

### Effort: 🟢 LOW (update documentation only)

---

## Issue #16: :source is reactive?
**Type**: Documentation / Usage Question
**Priority**: MEDIUM
**Status**: Open

### Issue Details
User wants to dynamically update the source array and is unsure if `:source` is reactive.

### Analysis
The `:source` prop IS reactive. The issue is likely:
1. User not understanding Vue reactivity
2. Array mutation vs. reassignment
3. Race conditions with async data

### Solution

#### Answer: YES, :source is Reactive
The `:source` prop is fully reactive when properly updated:

```vue
<script setup>
const source = ref(['JavaScript', 'Vue', 'React'])

// ✅ This will update the component
const updateSource = () => {
  source.value = ['Nuxt', 'Next.js', 'Svelte'] // Reactive
}

// ✅ This also works
const addToSource = () => {
  source.value.push('TypeScript') // Reactive array mutation
}

// ❌ This won't work
const wrongWay = () => {
  source = ['Vue', 'React'] // Direct assignment, not reactive
}
</script>

<template>
  <SmartTagz :source="source" />
  <button @click="updateSource">Update Source</button>
</template>
```

#### Common Issues

**Issue**: Using plain arrays instead of `ref()`
```javascript
// ❌ Wrong in Composition API
let source = ['Vue', 'React']

// ✅ Correct
const source = ref(['Vue', 'React'])
```

**Issue**: Async data not updating source
```javascript
// ❌ May not work
const source = ref([])
fetch('/api/tags')
  .then(data => source = data) // Direct assignment

// ✅ Correct
const source = ref([])
fetch('/api/tags')
  .then(data => source.value = data) // Use .value
```

**Issue**: Array mutations in nested components
```javascript
// ❌ This might not trigger updates
source.value[0] = 'NewValue'

// ✅ Better approach
source.value = [...source.value] // Force reactivity
```

### Recommended Response
```markdown
Great question! Yes, `:source` **is fully reactive**. Here are the key things to ensure it works:

### Using Composition API (Recommended)
\`\`\`javascript
const source = ref(['Vue', 'React', 'Svelte'])
\`\`\`

### Using Options API
\`\`\`javascript
data() {
  return {
    source: ['Vue', 'React', 'Svelte']
  }
}
\`\`\`

### Updating Source Dynamically
\`\`\`javascript
// Add item (both approaches work)
this.source.push('TypeScript')
// OR
this.source = [...this.source, 'TypeScript']

// Replace all
this.source = ['Nuxt', 'Next.js']
\`\`\`

### Loading from API
\`\`\`javascript
async loadSource() {
  const response = await fetch('/api/tags')
  this.source = await response.json() // Don't forget to assign to property!
}
\`\`\`

See the [documentation](https://github.com/prabhuignoto/smart-tagz) for more examples. If you're still having issues, please share your code and I can help debug!
```

### Effort: 🟢 LOW (documentation response)

---

## Summary & Action Items

### Priority 1: Issue #47 (Nuxt 3)
- [ ] Create Nuxt 3 compatibility documentation
- [ ] Build Nuxt 3 module/plugin
- [ ] Test with Nuxt 3 project
- **Effort**: 🔴 HIGH (2-3 hours)
- **Impact**: 🔴 HIGH (unlock Nuxt 3 users)

### Priority 2: Issue #23 (Update Tags)
- [ ] Post response with code examples
- [ ] Link to clearAllTags() API docs
- [ ] Close as "not a bug, usage question"
- **Effort**: 🟢 LOW (30 minutes)
- **Impact**: 🟢 Documentation improvement

### Priority 3: Issue #16 (Reactivity)
- [ ] Post response with clear examples
- [ ] Add to FAQ section
- [ ] Close as "resolved via documentation"
- **Effort**: 🟢 LOW (30 minutes)
- **Impact**: 🟢 Documentation improvement

### Priority 4: Issue #29 (Depfu)
- [ ] Ignore (per user instructions)
- **Action**: None

---

## Recommended Next Steps

1. **Immediate** (Today): Post responses to Issues #23 and #16 with code examples
2. **This week**: Start work on Nuxt 3 compatibility (Issue #47)
3. **Document findings** in code examples and add to README

---

## Files to Update
- `README.md` - Add Nuxt 3 section and usage examples
- `CONTRIBUTING.md` - Document how to run with Nuxt 3
- `docs/` - Create Nuxt 3 guide
- `examples/` - Add NuxtExample.vue

---

## Questions for User Review

Before proceeding, should we:
1. Start with Nuxt 3 compatibility (Issue #47)?
2. Post documentation responses to Issues #23 and #16?
3. Both simultaneously?
4. Focus on specific issues first?
