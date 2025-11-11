# Read-Only Display Mode

Learn how to display tags in a read-only, non-editable mode.

## Live Demo

Tags are displayed but cannot be edited or deleted:

<div class="demo-container">
  <SmartTagz
    :read-only="true"
    :default-tags="['Vue.js', 'TypeScript', 'Tailwind CSS']"
    input-placeholder="This is read-only"
  />
</div>

## Overview

The `readOnly` prop disables all editing and deletion capabilities, perfect for:
- Displaying user selections
- Showing read-only information
- Profile display without edit
- Submitted forms
- Archived data
- Information-only views

## Basic Usage

```vue
<template>
  <SmartTagz
    :read-only="true"
    :default-tags="['Vue.js', 'TypeScript', 'Tailwind']"
  />
</template>

<script setup>
import SmartTagz from 'smart-tagz'
import 'smart-tagz/dist/smart-tagz.css'
</script>
```

## Props

### `readOnly`

- **Type:** `boolean`
- **Default:** `false`
- **Description:** Disable all editing and deletion

```vue
<!-- Enable read-only mode -->
<SmartTagz :read-only="true" />

<!-- Normal editable mode -->
<SmartTagz :read-only="false" />
```

## What's Disabled in Read-Only Mode

| Feature | Normal | Read-Only |
|---------|--------|-----------|
| Input field | ✅ Visible | ❌ Hidden |
| Add new tags | ✅ Enabled | ❌ Disabled |
| Delete tags | ✅ Enabled | ❌ Disabled |
| Edit tags | ✅ Enabled | ❌ Disabled |
| Tag close button | ✅ Visible | ❌ Hidden |
| Suggestions | ✅ Enabled | ❌ Disabled |
| Paste import | ✅ Enabled | ❌ Disabled |
| Keyboard input | ✅ Works | ❌ Disabled |

## Practical Examples

### Example 1: User Profile Display

```vue
<template>
  <div class="user-profile">
    <div class="profile-header">
      <img :src="user.avatar" :alt="user.name" class="avatar" />
      <div>
        <h1>{{ user.name }}</h1>
        <p>@{{ user.handle }}</p>
      </div>
    </div>

    <div class="profile-section">
      <h3>Skills</h3>
      <SmartTagz
        :read-only="true"
        :default-tags="user.skills"
        :theme="{
          primary: '#3b82f6',
          background: '#eff6ff',
          tagTextColor: '#ffffff'
        }"
      />
    </div>

    <div class="profile-section">
      <h3>Interests</h3>
      <SmartTagz
        :read-only="true"
        :default-tags="user.interests"
        :theme="{
          primary: '#10b981',
          background: '#ecfdf5',
          tagTextColor: '#ffffff'
        }"
      />
    </div>
  </div>
</template>

<script setup>
import SmartTagz from 'smart-tagz'

const user = {
  name: 'Jane Developer',
  handle: 'janedeveloper',
  avatar: '/avatars/jane.jpg',
  skills: ['Vue.js', 'TypeScript', 'Node.js', 'PostgreSQL'],
  interests: ['Open Source', 'Web Performance', 'Accessibility']
}
</script>

<style>
.user-profile {
  max-width: 600px;
  margin: 0 auto;
}

.profile-header {
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid #e5e7eb;
}

.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
}

.profile-section {
  margin-bottom: 2rem;
}

.profile-section h3 {
  margin-bottom: 1rem;
}
</style>
```

### Example 2: Order Summary

```vue
<template>
  <div class="order-summary">
    <h2>Order #{{ order.id }}</h2>
    <p class="order-status" :class="order.status">{{ order.status }}</p>

    <div class="order-items">
      <h3>Items Tagged As:</h3>
      <SmartTagz
        :read-only="true"
        :default-tags="order.categories"
        :theme="{
          primary: '#8b5cf6',
          background: '#f5f3ff',
          tagTextColor: '#ffffff'
        }"
      />
    </div>

    <div class="order-details">
      <p><strong>Ordered:</strong> {{ formatDate(order.date) }}</p>
      <p><strong>Total:</strong> ${{ order.total }}</p>
    </div>
  </div>
</template>

<script setup>
import SmartTagz from 'smart-tagz'

const order = {
  id: '12345',
  status: 'Delivered',
  date: new Date('2024-11-01'),
  total: 99.99,
  categories: ['Electronics', 'Premium', 'Seasonal Sale']
}

const formatDate = (date) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date)
}
</script>

<style>
.order-summary {
  max-width: 400px;
  padding: 2rem;
  background-color: #f9fafb;
  border-radius: 0.5rem;
}

.order-status {
  font-weight: 600;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  display: inline-block;
}

.order-status.Delivered {
  background-color: #d1fae5;
  color: #065f46;
}

.order-items {
  margin: 2rem 0;
}

.order-details {
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e5e7eb;
}

.order-details p {
  margin: 0.5rem 0;
}
</style>
```

### Example 3: Conditional Edit Mode

```vue
<template>
  <div>
    <div class="toolbar">
      <button @click="toggleEdit" class="btn-edit">
        {{ isEditing ? 'Done Editing' : 'Edit Tags' }}
      </button>
    </div>

    <SmartTagz
      :read-only="!isEditing"
      :default-tags="tags"
      :editable="isEditing"
      :allow-paste="isEditing ? { delimiter: ',' } : null"
      @on-changed="updateTags"
    />

    <div v-if="isEditing" class="edit-hints">
      <p>💡 Double-click tags to edit, paste comma-separated values</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import SmartTagz from 'smart-tagz'

const isEditing = ref(false)
const tags = ref(['Python', 'Machine Learning', 'Data Science'])

const toggleEdit = () => {
  isEditing.value = !isEditing.value
}

const updateTags = (newTags) => {
  tags.value = newTags
}
</script>

<style>
.toolbar {
  margin-bottom: 1rem;
}

.btn-edit {
  padding: 0.5rem 1rem;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  font-weight: 600;
}

.btn-edit:hover {
  background-color: #2563eb;
}

.edit-hints {
  margin-top: 1rem;
  padding: 0.75rem;
  background-color: #fef3c7;
  border-left: 4px solid #f59e0b;
  border-radius: 0.375rem;
}

.edit-hints p {
  margin: 0;
  color: #92400e;
}
</style>
```

### Example 4: View-Only Article Display

```vue
<template>
  <article class="article">
    <header class="article-header">
      <h1>{{ article.title }}</h1>
      <p class="byline">
        By <strong>{{ article.author }}</strong> on {{ formatDate(article.publishedAt) }}
      </p>
    </header>

    <div class="article-metadata">
      <div class="metadata-group">
        <label>Categories</label>
        <SmartTagz
          :read-only="true"
          :default-tags="article.categories"
          :theme="{
            primary: '#ef4444',
            background: '#fee2e2',
            tagTextColor: '#ffffff'
          }"
        />
      </div>

      <div class="metadata-group">
        <label>Tags</label>
        <SmartTagz
          :read-only="true"
          :default-tags="article.tags"
          :theme="{
            primary: '#06b6d4',
            background: '#ecf0f1',
            tagTextColor: '#ffffff'
          }"
        />
      </div>
    </div>

    <div class="article-content">
      {{ article.content }}
    </div>
  </article>
</template>

<script setup>
import SmartTagz from 'smart-tagz'

const article = {
  title: 'Getting Started with Vue 3',
  author: 'Sarah Chen',
  publishedAt: new Date('2024-11-01'),
  categories: ['Technology', 'Web Development'],
  tags: ['Vue.js', 'Tutorial', 'Beginner-friendly'],
  content: 'Lorem ipsum dolor sit amet...'
}

const formatDate = (date) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date)
}
</script>

<style>
.article {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.article-header {
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 2px solid #e5e7eb;
}

.article-header h1 {
  margin: 0 0 0.5rem 0;
  font-size: 2.5rem;
}

.byline {
  margin: 0;
  color: #666;
}

.article-metadata {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 2rem;
  padding: 1.5rem;
  background-color: #f9fafb;
  border-radius: 0.5rem;
}

.metadata-group label {
  display: block;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.article-content {
  line-height: 1.8;
  color: #333;
}
</style>
```

## Combining with Other Props

### With Default Tags

```vue
<SmartTagz
  :read-only="true"
  :default-tags="['Vue', 'React', 'Angular']"
/>
```

### With Custom Theme

```vue
<SmartTagz
  :read-only="true"
  :default-tags="tags"
  :theme="{
    primary: '#6366f1',
    background: '#f3f4f6',
    tagTextColor: '#ffffff'
  }"
/>
```

### With Class Names

```vue
<SmartTagz
  :read-only="true"
  :default-tags="tags"
  :class-names="{
    container: 'readonly-container',
    name: 'readonly-tag'
  }"
/>
```

## Styling Read-Only Tags

You can customize the appearance of read-only tags with custom classes:

```css
/* Custom styling for read-only tags */
.readonly-container {
  background-color: #f3f4f6;
  padding: 1rem;
  border-radius: 0.5rem;
  border: 1px solid #e5e7eb;
}

.readonly-tag {
  font-size: 1rem;
  font-weight: 500;
}
```

## Accessibility

Read-only tags:
- Remain keyboard accessible
- Are announced to screen readers
- Include proper ARIA labels
- Can be focused but not modified

## Behavior Notes

### Tags Cannot Be Modified
- No input field visible
- No delete buttons
- No edit capability
- Double-click has no effect

### Information Display Only
- Perfect for showing selections
- Clean, minimal UI
- No distracting controls
- Focus on content

### Responsive Design
- Tags still wrap responsively
- Mobile-friendly display
- Touch-friendly (no need for delete buttons)

## TypeScript Support

```typescript
interface ReadOnlyProps {
  readOnly: boolean
  defaultTags: string[]
  theme?: ThemeConfig
  classNames?: ClassNamesConfig
}
```

## See Also

- [Basic Usage](/examples/basic)
- [Editing Tags](/examples/editable)
- [API Reference](/api/props)
