# Mobile Optimization Example

Smart-Tagz is fully responsive and optimized for mobile devices.

## Responsive Demo

<div class="demo-container">
  <SmartTagz
    autosuggest
    :sources="['React', 'Vue.js', 'Angular', 'Svelte', 'Next.js', 'Nuxt', 'Gatsby', 'Remix']"
    :allow-paste="{ delimiter: ',' }"
    input-placeholder="Works great on mobile..."
  />
</div>

Try resizing your browser window to see responsive behavior!

## Mobile Features

### Touch-Friendly

```
✅ 48px minimum touch targets
✅ Adequate spacing between elements
✅ Large, easy-to-tap buttons
✅ Swipe-friendly suggestion list
✅ Bottom sheet style on mobile
```

### Keyboard Support

```
✅ Virtual keyboard shows automatically
✅ Arrow keys work on mobile keyboards
✅ Numeric and special character keyboards supported
✅ Auto-capitalization can be controlled
✅ Return/Done button adds tag
```

### Screen Reader Support

```
✅ VoiceOver on iOS
✅ TalkBack on Android
✅ Full keyboard navigation
✅ Touch exploration with announcements
```

## Responsive Breakpoints

| Device | Width | Status |
|--------|-------|--------|
| Phone | 320px - 480px | ✅ Optimized |
| Small Tablet | 480px - 768px | ✅ Optimized |
| Large Tablet | 768px - 1024px | ✅ Optimized |
| Desktop | 1024px+ | ✅ Optimized |

## Code Example: Mobile-Optimized

```vue
<template>
  <div class="tag-container">
    <label for="mobile-tags">Select Tags</label>
    <SmartTagz
      id="mobile-tags"
      autosuggest
      :sources="tags"
      :allow-paste="{ delimiter: ',' }"
      :max-tags="10"
      :quick-delete="true"
      input-placeholder="Add tags..."
      :on-changed="handleChange"
      :class-names="{
        container: 'mobile-tag-container',
        name: 'mobile-tag-name',
        closeButton: 'mobile-close-btn'
      }"
      :theme="{
        primary: '#6366f1',
        background: '#f3f4f6',
        tagTextColor: '#ffffff'
      }"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import SmartTagz from 'smart-tagz'
import 'smart-tagz/dist/smart-tagz.css'

const tags = [
  'JavaScript', 'TypeScript', 'React', 'Vue.js',
  'Angular', 'Node.js', 'Python', 'Go'
]

const selectedTags = ref([])

const handleChange = (newTags) => {
  selectedTags.value = newTags
}
</script>

<style scoped>
.tag-container {
  max-width: 100%;
  padding: 1rem;
  margin: 0 auto;
}

label {
  display: block;
  font-weight: 600;
  margin-bottom: 0.75rem;
  font-size: 1rem;
}

/* Mobile-specific styling */
@media (width <= 768px) {
  .tag-container {
    padding: 0.75rem;
  }

  label {
    font-size: 0.95rem;
  }
}
</style>
```
