# Accessibility Features Example

Smart-Tagz is built with WCAG 2.1 AA accessibility standards in mind.

## Accessible Demo

<div class="demo-container">
  <SmartTagz
    autosuggest
    :sources="['HTML', 'CSS', 'JavaScript', 'TypeScript', 'Vue.js', 'React', 'Accessibility']"
    input-placeholder="Fully accessible with screen reader support"
    :allow-duplicates="false"
  />
</div>

## Accessibility Features

### Screen Reader Support

Smart-Tagz provides full screen reader announcements:

```
✅ Live region updates (aria-live="polite")
✅ ARIA attributes (aria-label, aria-describedby)
✅ Semantic HTML (button, input, list)
✅ Tag announcements ("JavaScript added")
✅ Suggestion navigation ("1 of 5")
✅ Error announcements ("Maximum 3 tags allowed")
```

### Keyboard Navigation

```
✅ Full keyboard control (arrow keys, Enter, Delete)
✅ Tab order management
✅ Focus indicators (visible focus ring)
✅ Logical focus flow
✅ Escape key support
```

### Visual Accessibility

```
✅ Sufficient color contrast (WCAG AA)
✅ Visible focus indicators
✅ No color-only information
✅ Responsive font sizes
✅ Touch targets (48px minimum)
```

### Semantic HTML

Smart-Tagz uses semantic HTML elements:

- `<input type="text">` for input field
- `<button>` for delete buttons
- `<ul>` and `<li>` for tag lists
- `<div role="listbox">` for suggestions
- ARIA attributes for labels and descriptions

## Code Example

```vue
<template>
  <div>
    <label for=\"tag-input\">Select Technologies</label>
    <SmartTagz
      id=\"tag-input\"
      autosuggest
      :sources=\"technologies\"
      :max-tags=\"5\"
      :allow-duplicates=\"false\"
      input-placeholder=\"Type to search technologies\"
      :on-changed=\"handleTagsChanged\"
    />
    <p class=\"help-text\">
      Use arrow keys to navigate suggestions, Enter to add, Delete to remove
    </p>
  </div>
</template>

<script setup>
import SmartTagz from 'smart-tagz'
import 'smart-tagz/dist/smart-tagz.css'

const technologies = [
  'HTML',
  'CSS',
  'JavaScript',
  'TypeScript',
  'Vue.js',
  'React',
  'Angular'
]

const handleTagsChanged = (tags) => {
  console.log('Tags changed:', tags)
}
</script>

<style scoped>
label {
  display: block;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #374151;
}

.help-text {
  font-size: 0.875rem;
  color: #6b7280;
  margin-top: 0.5rem;
}
</style>
```

## WCAG Compliance Checklist

### Level A (Basic)

- [x] 1.3.1 Info and Relationships (Level A)
- [x] 2.1.1 Keyboard (Level A)
- [x] 2.4.1 Bypass Blocks (Level A)
- [x] 4.1.2 Name, Role, Value (Level A)

### Level AA (Enhanced)

- [x] 1.4.3 Contrast (Minimum) - Ratio 4.5:1 for text
- [x] 2.4.3 Focus Order (Level A)
- [x] 2.4.7 Focus Visible (Level AA)
- [x] 2.5.5 Target Size (Level AAA) - 48px minimum

## Accessibility Best Practices

### DO ✅

```vue
<!-- Provide labels -->
<label for=\"tags\">Select tags:</label>
<SmartTagz id=\"tags\" />

<!-- Use aria-describedby for help text -->
<SmartTagz aria-describedby=\"help\" />
<p id=\"help\">Use arrow keys to navigate</p>

<!-- Announce errors clearly -->
<!-- SmartTagz handles this automatically -->

<!-- Test with keyboard only -->
<!-- Tab through without mouse -->

<!-- Test with screen readers -->
<!-- Verify all announcements are clear -->
```

### DON'T ❌

```vue
<!-- Don't rely on color alone -->
<!-- ✗ Error shown only by color change -->

<!-- Don't have hidden focus indicators -->
<!-- ✗ .focus { outline: none } -->

<!-- Don't skip semantic HTML -->
<!-- ✗ Using divs instead of buttons -->

<!-- Don't forget mobile accessibility -->
<!-- ✗ Only testing on desktop -->
```

## Testing Checklist

### Keyboard Testing

- [ ] Tab key focuses component
- [ ] Arrow keys navigate suggestions
- [ ] Enter adds selected suggestion
- [ ] Delete removes last tag
- [ ] Escape closes suggestions
- [ ] Home/End navigate to first/last
- [ ] All features work without mouse

### Screen Reader Testing

- [ ] Input label is announced
- [ ] Placeholder text is announced
- [ ] Suggestions are announced
- [ ] Tag additions are announced
- [ ] Tag removals are announced
- [ ] Errors are announced
- [ ] No unexpected pauses

### Mobile Testing

- [ ] Touch targets are 48px minimum
- [ ] Keyboard support works on mobile
- [ ] Screen reader works on mobile
- [ ] Orientation changes work
- [ ] No horizontal scrolling
- [ ] Zoom works to 200%

## Browser & Assistive Technology Support

| Technology | Windows | Mac | iOS | Android |
|-----------|---------|-----|-----|---------|
| NVDA | ✅ | - | - | - |
| JAWS | ✅ | - | - | - |
| VoiceOver | - | ✅ | ✅ | - |
| TalkBack | - | - | - | ✅ |
| Chrome VoxML | ✅ | ✅ | ✅ | ✅ |

## Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [WebAIM Testing Tools](https://webaim.org/articles/)
- [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)

## Next Steps

- [Keyboard Navigation](/examples/keyboard) - Detailed keyboard guide
- [Basic Usage](/examples/basic) - Get started with the component
