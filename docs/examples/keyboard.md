# Keyboard Navigation Example

Full keyboard control of Smart-Tagz with accessibility support.

## Interactive Demo

<div class="demo-container">
  <SmartTagz
    autosuggest
    :sources="['JavaScript', 'TypeScript', 'Vue.js', 'React', 'Angular', 'Python', 'Go', 'Rust']"
    :allow-paste="{ delimiter: ',' }"
    input-placeholder="Use arrow keys to navigate suggestions..."
  />
</div>

## Keyboard Shortcuts Reference

| Key | Action | Description |
|-----|--------|-------------|
| **↓** | Next suggestion | Move down in autocomplete list |
| **↑** | Previous suggestion | Move up in autocomplete list |
| **Enter** | Add/Select | Add tag or select highlighted suggestion |
| **Delete** / **Backspace** | Remove last tag | Delete the most recently added tag |
| **Home** | Go to first suggestion | Jump to top of suggestion list |
| **End** | Go to last suggestion | Jump to bottom of suggestion list |
| **Tab** | Next suggestion or close | Move to next suggestion or close autocomplete |
| **Escape** | Close suggestions | Close the autocomplete dropdown |
| **Ctrl+A** | Select all tags | Select all tags for bulk deletion (with quickDelete enabled) |

## Common Keyboard Workflows

### Adding Tags with Autocomplete

```
1. Type: "java"
   ↓ Shows suggestions: JavaScript, Java

2. Press ↓ to highlight "Java"

3. Press Enter to add "Java" tag
```

### Multiple Tag Selection

```
1. Add several tags with Enter

2. Use ← and Delete to remove tags one by one

3. Or use Ctrl+A then Delete to remove all (with quickDelete enabled)
```

### Navigating Long Suggestion Lists

```
1. Type a letter to filter suggestions

2. Press Home to jump to first match

3. Press End to jump to last match

4. Use ↓ and ↑ to fine-tune selection
```

## Code Example

```vue
<template>
  <SmartTagz
    autosuggest
    :sources="technologies"
    :quick-delete=\"true\"
    input-placeholder=\"Try keyboard navigation...\"
    :on-changed=\"handleChanges\"
  />
</template>

<script setup>
import SmartTagz from 'smart-tagz'
import 'smart-tagz/dist/smart-tagz.css'

const technologies = [
  'JavaScript',
  'TypeScript',
  'Vue.js',
  'React',
  'Angular',
  'Python',
  'Go',
  'Rust'
]

const handleChanges = (tags) => {
  console.log('Current tags:', tags)
}
</script>
```

## Screen Reader Announcements

Smart-Tagz provides live region announcements for screen reader users:

```
Adding tag:
  "JavaScript added. Total tags: 2."

Removing tag:
  "JavaScript removed. Total tags: 1."

Navigation:
  "Suggestion 1 of 5: TypeScript"
  "Suggestion 5 of 5: React"
```

## Browser Support

| Browser | Keyboard Support | Status |
|---------|------------------|--------|
| Chrome/Edge (90+) | Full | ✅ Tested |
| Firefox (88+) | Full | ✅ Tested |
| Safari (14+) | Full | ✅ Tested |
| Mobile browsers | Partial | ⚠️ See mobile guide |

## Tips

- 🎯 Use Home/End for quick navigation in large lists
- 📋 Enable `quickDelete` for power users who manage many tags
- ♿ Always test with screen readers for accessibility
- 📱 See [Mobile Optimization](/examples/mobile) for touch device support

## Next Steps

- [Accessibility Features](/examples/accessibility) - Deep dive into a11y
- [Fuzzy Search](/examples/fuzzy-search) - Learn about search matching
