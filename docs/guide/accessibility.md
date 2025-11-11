# Accessibility

Smart-Tagz is designed with accessibility as a first-class feature, built to meet **WCAG 2.1 Level AA** standards.

## Accessibility Features

### ♿ WCAG 2.1 AA Compliance

Smart-Tagz is built to meet Web Content Accessibility Guidelines (WCAG) 2.1 at Level AA, which means:

- ✅ Perceivable: Content is accessible to all senses
- ✅ Operable: Full keyboard navigation without a mouse
- ✅ Understandable: Clear, predictable behavior
- ✅ Robust: Compatible with assistive technologies

### 🔊 Screen Reader Support

All interactions are announced to screen readers:

- Tag additions: "Tag added: JavaScript"
- Tag removals: "Tag removed: TypeScript"
- Suggestions count: "4 results available"
- Error messages: "Maximum 5 tags allowed"
- Current state: "1 of 5 tags"

### ⌨️ Full Keyboard Navigation

Complete keyboard support without requiring a mouse:

- **Arrow Keys:** Navigate through suggestions
- **Home/End:** Jump to first/last suggestion
- **Enter:** Select suggestion or add tag
- **Tab:** Select and move focus
- **Escape:** Close suggestions
- **Delete:** Manage tag deletion

See [Keyboard Navigation](/guide/keyboard) for full details.

### 👁️ Focus Management

- **Visible Focus Indicators:** Clear, high-contrast focus outline
- **Focus Trap Prevention:** Focus naturally follows keyboard navigation
- **Logical Tab Order:** Tab order follows visual layout
- **Focus Restoration:** Focus returns to input after tag operations

### ARIA Implementation

Smart-Tagz uses proper ARIA attributes:

| Attribute | Value | Purpose |
|-----------|-------|---------|
| `role` | `"combobox"` | Identifies the input as a combo box |
| `aria-expanded` | `true/false` | Indicates if dropdown is open |
| `aria-controls` | `"suggestions-listbox"` | Links input to suggestions list |
| `aria-activedescendant` | `"suggestion-ID"` | Announces currently focused suggestion |
| `role` | `"listbox"` | Identifies suggestions container |
| `role` | `"option"` | Identifies individual suggestions |
| `aria-selected` | `true/false` | Indicates selected suggestion |
| `aria-label` | Custom | Describes component purpose |
| `aria-live` | `"polite"` | Announces tag changes |

## Color and Contrast

- **Text Contrast:** All text meets 4.5:1 contrast ratio (AAA standard)
- **Focus Indicator:** 3px solid outline with high contrast color
- **Color Independence:** Information is not conveyed by color alone
- **Don't Rely on Color:** Use text labels and icons alongside color coding

## Mobile Accessibility

### Touch Targets

- **Minimum Size:** 44px × 44px (iOS Human Interface Guidelines)
- **Spacing:** At least 8px between touch targets
- **Large Targets:** Easy to tap without precision

### Mobile Keyboard

- **Keyboard Support:** Full keyboard navigation on mobile keyboards
- **Suggestion Display:** Dropdown adjusts to available space
- **Touch-Friendly:** Larger hit areas, easier to use

## Testing with Screen Readers

### macOS / iOS

**VoiceOver:**
```
1. Enable: Cmd + F5
2. Use: Control + Option + Arrow Keys
3. Disable: Cmd + F5
```

### Windows

**NVDA (Free):**
```
1. Download: https://www.nvaccess.org/
2. Enable: Insert + F5
3. Use: Arrow Keys to navigate
```

**JAWS:**
```
1. Download: https://www.freedomscientific.com/
2. Enable: Insert + F1
3. Use: Arrow Keys to navigate
```

**Narrator (Built-in):**
```
1. Enable: Win + Ctrl + Enter
2. Use: Arrow Keys to navigate
```

### Mobile

**Android - TalkBack:**
```
Settings > Accessibility > TalkBack > Enable
Explore with finger, double-tap to select
```

**iOS - VoiceOver:**
```
Settings > Accessibility > VoiceOver > Enable
Swipe right to focus next, left for previous
```

## What to Listen For

When testing Smart-Tagz with a screen reader, you should hear:

### When Adding a Tag
```
"JavaScript added. 1 of 5 tags"
```

### When Navigating Suggestions
```
"JavaScript, option"
(as you navigate with arrow keys, this updates)
```

### When Max Tags Reached
```
"Maximum 5 tags allowed"
```

### When Adding Duplicate
```
"TypeScript is already added"
```

## Semantic HTML

Smart-Tagz uses semantic HTML:

```html
<!-- Input field with proper ARIA -->
<input
  role="combobox"
  aria-expanded="false"
  aria-controls="suggestions"
  aria-label="Add tags"
/>

<!-- Suggestions list -->
<ul role="listbox" id="suggestions">
  <li role="option" aria-selected="false">
    JavaScript
  </li>
  <li role="option" aria-selected="true">
    TypeScript
  </li>
</ul>

<!-- Live region for announcements -->
<div role="status" aria-live="polite" aria-atomic="true">
  Tag added: JavaScript
</div>
```

## Keyboard-Only Testing Checklist

- [ ] Can reach all interactive elements with Tab
- [ ] Can navigate suggestions with arrow keys
- [ ] Can select with Enter
- [ ] Can delete with Delete key
- [ ] Focus indicator is always visible
- [ ] No keyboard traps
- [ ] All features work without mouse

## Screen Reader Testing Checklist

- [ ] Component is properly labeled
- [ ] Tag additions are announced
- [ ] Tag removals are announced
- [ ] Suggestion count is announced
- [ ] Current suggestion is announced
- [ ] Error messages are announced
- [ ] All buttons have labels

## Accessibility Standards

Smart-Tagz follows:

- **WCAG 2.1 Level AA**: Web Content Accessibility Guidelines
- **ARIA Authoring Practices**: W3C ARIA practices
- **iOS Human Interface Guidelines**: 44px minimum touch targets
- **Material Design**: Accessibility guidelines

## Customizing for Accessibility

### Custom Labels

```vue
<SmartTagz
  input-placeholder="Select programming languages"
  aria-label="Programming languages selector"
/>
```

### Announce Custom Messages

```vue
<SmartTagz
  @on-changed="(tags) => announce(`Selected ${tags.length} tags`)"
/>
```

### Focus Management

```vue
<template>
  <SmartTagz ref="tagsInput" />
  <button @click="$refs.tagsInput.focus()">
    Focus Tag Input
  </button>
</template>
```

## Common Accessibility Mistakes to Avoid

❌ **Wrong:**
```vue
<!-- Don't use divs for interactive elements -->
<div @click="addTag" class="tag-input">
  Click to add tag
</div>
```

✅ **Right:**
```vue
<!-- Use semantic elements -->
<input
  type="text"
  placeholder="Enter tag"
  @keyup.enter="addTag"
  aria-label="Add tag"
/>
```

## Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [WebAIM Keyboard Accessibility](https://webaim.org/articles/keyboard/)
- [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)

## Questions?

- See [Keyboard Navigation](/guide/keyboard) for keyboard details
- Check [Examples](/examples/accessibility) for live demos
- Open an issue on [GitHub](https://github.com/prabhuignoto/smart-tagz/issues)

## Example with Live Demo

Try this interactive example with your screen reader:

<SmartTagz
  autosuggest
  :sources="['HTML', 'CSS', 'JavaScript', 'TypeScript', 'Vue.js']"
  :max-tags="3"
  :allow-duplicates="false"
  input-placeholder="Select web technologies (test with screen reader)..."
/>

**Test with:**
1. Keyboard navigation (arrow keys, Home, End)
2. Screen reader (VoiceOver, NVDA, etc.)
3. Mobile device with TalkBack or VoiceOver
