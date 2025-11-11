# Quick Delete (Bulk Clear)

Learn how to enable rapid bulk tag deletion with a single keyboard shortcut.

## Live Demo

Try it out: Press **Ctrl+A** (or **Cmd+A** on Mac) to select all tags, then press **Delete** to clear them.

<div class="demo-container">
  <SmartTagz
    :quick-delete="true"
    :default-tags="['Vue.js', 'JavaScript', 'TypeScript', 'React']"
    input-placeholder="Press Ctrl+A to select all tags..."
  />
</div>

## Overview

The `quickDelete` prop enables fast removal of all tags at once using Ctrl+A (select all) followed by Delete/Backspace. This is useful for:
- Rapid clearing of selections
- Quick resets
- Form clearing
- Batch operations
- Power user workflows

## Basic Usage

```vue
<!-- Enable quick delete -->
<template>
  <SmartTagz :quick-delete="true" />
</template>

<!-- Disable quick delete (default) -->
<template>
  <SmartTagz :quick-delete="false" />
</template>

<script setup>
import SmartTagz from 'smart-tagz'
import 'smart-tagz/dist/smart-tagz.css'
</script>
```

## Props

### `quickDelete`

- **Type:** `boolean`
- **Default:** `false`
- **Description:** Enable Ctrl+A + Delete to remove all tags at once

```vue
<SmartTagz :quick-delete="true" />
```

## How It Works

### Step 1: Press Ctrl+A (or Cmd+A on Mac)
- All tags highlight in red
- Tags get selection visual indicator
- Ready for deletion

### Step 2: Press Delete or Backspace
- All highlighted tags are removed instantly
- Input field clears
- Component returns to empty state

### Visual Feedback
- **Before Ctrl+A**: Tags look normal
- **After Ctrl+A**: All tags show red background with white outline (highlighted)
- **After Delete**: All tags vanish with smooth animation

### Canceling Selection
- **Press Escape**: Deselects all tags
- **Start typing**: Automatically deselects and focuses input
- **Click elsewhere**: Deselects tags

## Practical Examples

### Example 1: Simple Quick Delete

```vue
<template>
  <div>
    <h2>Quick Delete Demo</h2>
    <p class="hint">Try Ctrl+A then Delete to clear all tags</p>

    <SmartTagz
      :quick-delete="true"
      :default-tags="['Tag1', 'Tag2', 'Tag3']"
      input-placeholder="Press Ctrl+A to select all..."
    />
  </div>
</template>

<script setup>
import SmartTagz from 'smart-tagz'
import 'smart-tagz/dist/smart-tagz.css'
</script>

<style>
.hint {
  color: #6b7280;
  font-size: 0.875rem;
  margin-bottom: 1rem;
}
</style>
```

### Example 2: Shopping Cart with Quick Clear

<details>
<summary>Click to view code</summary>

```vue
<template>
  <div class="shopping-cart">
    <div class="cart-header">
      <h2>Shopping Cart</h2>
      <span v-if="cartItems.length > 0" class="item-count">
        {{ cartItems.length }} item(s)
      </span>
    </div>

    <div v-if="cartItems.length === 0" class="empty-state">
      Your cart is empty
    </div>

    <div v-else>
      <SmartTagz
        :quick-delete="true"
        :editable="true"
        :default-tags="cartItems"
        @on-changed="updateCart"
      />

      <div class="cart-actions">
        <button @click="checkout" class="btn-checkout">Proceed to Checkout</button>
        <span class="hint">Tip: Use Ctrl+A then Delete to clear cart</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import SmartTagz from 'smart-tagz'

const cartItems = ref(['Laptop', 'Mouse', 'Keyboard'])

const updateCart = (items) => {
  cartItems.value = items
}

const checkout = () => {
  alert(`Checking out with ${cartItems.value.length} items`)
}
</script>

<style>
.shopping-cart {
  max-width: 500px;
  padding: 2rem;
}

.cart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #e5e7eb;
}

.item-count {
  background-color: #3b82f6;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 600;
}

.empty-state {
  text-align: center;
  padding: 2rem;
  color: #9ca3af;
  background-color: #f9fafb;
  border-radius: 0.5rem;
}

.cart-actions {
  margin-top: 1.5rem;
}

.btn-checkout {
  width: 100%;
  padding: 1rem;
  background-color: #10b981;
  color: white;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  font-weight: 600;
  font-size: 1rem;
}

.btn-checkout:hover {
  background-color: #059669;
}

.hint {
  display: block;
  text-align: center;
  margin-top: 0.5rem;
  color: #6b7280;
  font-size: 0.75rem;
}
</style>
```

</details>

### Example 3: Filter Tags with Quick Clear

<details>
<summary>Click to view code</summary>

```vue
<template>
  <div class="filter-panel">
    <div class="filter-header">
      <h3>Apply Filters</h3>
      <button v-if="activeFilters.length > 0" @click="clearAll" class="btn-clear">
        Clear All
      </button>
    </div>

    <SmartTagz
      :quick-delete="true"
      :sources="availableFilters"
      :default-tags="activeFilters"
      autosuggest
      input-placeholder="Add filter..."
      @on-changed="applyFilters"
    />

    <div v-if="activeFilters.length > 0" class="filter-summary">
      <h4>Active Filters ({{ activeFilters.length }})</h4>
      <p>Showing results for: {{ activeFilters.join(', ') }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import SmartTagz from 'smart-tagz'

const availableFilters = [
  'On Sale', 'In Stock', 'Recently Added',
  'Top Rated', 'New Arrivals', 'Bestsellers'
]

const activeFilters = ref(['In Stock'])

const applyFilters = (filters) => {
  activeFilters.value = filters
  console.log('Filters applied:', filters)
}

const clearAll = () => {
  activeFilters.value = []
}
</script>

<style>
.filter-panel {
  padding: 1.5rem;
  background-color: #f9fafb;
  border-radius: 0.5rem;
}

.filter-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.filter-header h3 {
  margin: 0;
}

.btn-clear {
  padding: 0.5rem 1rem;
  background-color: #ef4444;
  color: white;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 600;
}

.btn-clear:hover {
  background-color: #dc2626;
}

.filter-summary {
  margin-top: 1.5rem;
  padding: 1rem;
  background-color: #eff6ff;
  border-radius: 0.375rem;
  border-left: 4px solid #3b82f6;
}

.filter-summary h4 {
  margin: 0 0 0.5rem 0;
  color: #0369a1;
}

.filter-summary p {
  margin: 0;
  color: #0c4a6e;
}
</style>
```

</details>

### Example 4: Search Tags with Quick Clear

<details>
<summary>Click to view code</summary>

```vue
<template>
  <div class="search-tags">
    <div class="search-header">
      <h3>Search by Tags</h3>
      <div class="search-actions">
        <span v-if="selectedTags.length > 0" class="tag-count">
          {{ selectedTags.length }} selected
        </span>
        <button v-if="selectedTags.length > 0" @click="resetSearch" class="btn-reset">
          Reset (Ctrl+A → Delete)
        </button>
      </div>
    </div>

    <SmartTagz
      :quick-delete="true"
      :sources="availableTags"
      :allow-duplicates="false"
      autosuggest
      input-placeholder="Add search tag..."
      @on-changed="performSearch"
    />

    <div v-if="searchResults.length > 0" class="results">
      <h4>Found {{ searchResults.length }} result(s)</h4>
      <ul>
        <li v-for="result in searchResults" :key="result">{{ result }}</li>
      </ul>
    </div>

    <div v-else-if="selectedTags.length > 0" class="no-results">
      No results found for selected tags
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import SmartTagz from 'smart-tagz'

const availableTags = [
  'JavaScript', 'Python', 'Vue.js', 'React', 'TypeScript',
  'Node.js', 'MongoDB', 'PostgreSQL', 'Docker', 'AWS'
]

const selectedTags = ref([])
const searchResults = ref([])

const performSearch = (tags) => {
  selectedTags.value = tags

  // Simulate search
  if (tags.length === 0) {
    searchResults.value = []
    return
  }

  // Mock: return results matching selected tags
  const mockResults = [
    'Article: Getting Started with ' + tags[0],
    'Tutorial: Advanced ' + tags[0],
    'Guide: Best Practices in ' + (tags[1] || tags[0])
  ]

  searchResults.value = mockResults
}

const resetSearch = () => {
  selectedTags.value = []
  searchResults.value = []
}
</script>

<style>
.search-tags {
  max-width: 600px;
}

.search-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e5e7eb;
}

.search-header h3 {
  margin: 0;
}

.search-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.tag-count {
  font-size: 0.875rem;
  color: #6b7280;
  background-color: #f3f4f6;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
}

.btn-reset {
  padding: 0.5rem 1rem;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  font-size: 0.75rem;
  font-weight: 600;
}

.btn-reset:hover {
  background-color: #2563eb;
}

.results {
  margin-top: 2rem;
  padding: 1rem;
  background-color: #f0fdf4;
  border-radius: 0.375rem;
}

.results h4 {
  margin: 0 0 1rem 0;
  color: #166534;
}

.results ul {
  list-style-position: inside;
  margin: 0;
  padding-left: 0;
}

.results li {
  color: #15803d;
  margin: 0.5rem 0;
}

.no-results {
  margin-top: 2rem;
  padding: 1rem;
  background-color: #fee2e2;
  color: #991b1b;
  border-radius: 0.375rem;
  text-align: center;
}
</style>
```

</details>

## Combining with Other Props

### With Editing

```vue
<SmartTagz
  :quick-delete="true"
  :editable="true"
/>
```

### With Max Tags

```vue
<SmartTagz
  :quick-delete="true"
  :max-tags="10"
/>
```

### With Suggestions

```vue
<SmartTagz
  :quick-delete="true"
  :sources="options"
  autosuggest
/>
```

### With Default Tags

```vue
<SmartTagz
  :quick-delete="true"
  :default-tags="['Tag1', 'Tag2']"
/>
```
