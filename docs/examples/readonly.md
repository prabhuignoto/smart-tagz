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

<div class="demo-container">
  <SmartTagz
    :read-only="true"
    :default-tags="['Vue.js', 'TypeScript', 'Tailwind']"
    input-placeholder="This is read-only"
  />
</div>

<CodeBlockCollapsible>

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

</CodeBlockCollapsible>

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

## Styling Read-Only Tags

You can customize the appearance of read-only tags with custom classes:

<CodeBlockCollapsible>

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

</CodeBlockCollapsible>

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

<CodeBlockCollapsible>

```typescript
interface ReadOnlyProps {
  readOnly: boolean
  defaultTags: string[]
  theme?: ThemeConfig
  classNames?: ClassNamesConfig
}
```

</CodeBlockCollapsible>

## See Also

- [Basic Usage](/examples/basic)
- [Editing Tags](/examples/editable)
- [API Reference](/api/props)
