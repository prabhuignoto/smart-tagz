# Keyboard Navigation

Smart-Tagz provides complete keyboard navigation support, making it accessible for power users and users with disabilities.

## Keyboard Shortcuts

All keyboard shortcuts work out of the box without any configuration needed.

| Key | Action | Context |
|-----|--------|---------|
| **↑ / ↓** | Navigate suggestions | When dropdown is open |
| **Home** | Jump to first suggestion | When dropdown is open |
| **End** | Jump to last suggestion | When dropdown is open |
| **Enter** | Select current suggestion or add tag | Any context |
| **Tab** | Select current suggestion and move focus | When dropdown is open |
| **Escape** | Close dropdown | When dropdown is open |
| **Delete** | Delete/highlight last tag (press twice) | When input is empty |
| **Ctrl+A** | Select all tags for deletion | When `quickDelete` enabled |

## Navigation Examples

### Moving Through Suggestions

When autocomplete is enabled and suggestions are visible:

1. **Start typing:** Type a keyword to filter suggestions
2. **Navigate:** Use **↑** and **↓** arrow keys to move through the list
3. **Select:** Press **Enter** to select the highlighted item

```
Type: "S"
↓ Available suggestions:
  → Script
    Sql
    Swift

Press Down Arrow (↓)
↓ Available suggestions:
    Script
  → Sql
    Swift

Press Enter
✓ Added: Sql
```

### Jump to Start/End

Quickly navigate to the first or last suggestion:

```
Suggestions visible:
  [First option]
  [Middle option]
  [Last option] ← Currently here

Press Home
↓
  [First option] ← Jump here
  [Middle option]
  [Last option]

Press End
↓
  [First option]
  [Middle option]
  [Last option] ← Jump here
```

## Tag Management with Keyboard

### Adding Tags

**Method 1: From Input**
```
1. Type tag name or search term
2. Press Enter to add
✓ Tag added
```

**Method 2: From Suggestions**
```
1. Type search term
2. Press ↓ to navigate suggestions
3. Press Enter to select
✓ Tag added from suggestion
```

**Method 3: Using Tab**
```
1. Type search term
2. Press Tab to select first matching suggestion
✓ Suggestion selected and input focus moves
```

### Deleting Tags

**Single Deletion:**
```
1. Move to end of input (input must be empty)
2. Press Delete once to highlight last tag
3. Press Delete again to confirm deletion
✓ Tag deleted
```

**Multiple Deletion with Ctrl+A:**
```
1. Ensure quickDelete prop is enabled
2. With empty input, press Ctrl+A
3. All tags are highlighted
4. Press Delete to remove all
✓ All tags deleted
```

## Screen Reader Announcements

Smart-Tagz announces all keyboard actions to screen readers:

- "Tag added: [tag name]"
- "Tag removed: [tag name]"
- "[Count] results available"
- "Maximum [max] tags allowed"
- "[Tag name] is already added"

## Configuration

### Disable Quick Delete

To prevent accidental multi-deletion:

```vue
<SmartTagz :quick-delete="false" />
```

With `quick-delete="false"`, **Ctrl+A** is ignored.

### Disable Autocomplete

To disable suggestions keyboard navigation:

```vue
<SmartTagz :autosuggest="false" />
```

Without autocomplete, arrow keys won't navigate suggestions.

## Accessibility

All keyboard shortcuts are fully accessible:

- ✅ Keyboard only navigation (no mouse needed)
- ✅ Screen reader announcements
- ✅ Focus indicators (visible and announced)
- ✅ Standard keyboard patterns (follows ARIA practices)

## Best Practices

1. **Provide visual feedback:** Focus indicators help users know where they are
2. **Test with keyboard:** Use Tab to navigate, arrows to move through options
3. **Announce changes:** Wait for screen reader announcements to finish before continuing
4. **Inform users:** Document available shortcuts in your UI or help documentation
5. **Respect browser defaults:** Some browsers reserve certain shortcuts (like Ctrl+L for URL bar)

## Testing Keyboard Navigation

### Manual Testing Checklist

- [ ] Can navigate with arrow keys
- [ ] Home key jumps to first option
- [ ] End key jumps to last option
- [ ] Enter adds the selected suggestion
- [ ] Tab works as expected
- [ ] Escape closes suggestions
- [ ] Delete highlights last tag
- [ ] Second Delete removes it
- [ ] Focus is always visible
- [ ] No keyboard traps

### Screen Reader Testing

Test with your favorite screen reader:

- **macOS:** VoiceOver (Cmd+F5)
- **Windows:** NVDA (free) or JAWS
- **Windows:** Narrator (built-in)
- **Mobile:** TalkBack (Android) or VoiceOver (iOS)

Verify that:
- Tag additions are announced
- Tag removals are announced
- Suggestion count is announced
- Error messages are announced
- Current suggestion is announced

## Examples

Try keyboard navigation with this live example:

<SmartTagz
  autosuggest
  :sources="['JavaScript', 'TypeScript', 'Vue.js', 'React', 'Python']"
  input-placeholder="Type and use arrow keys to navigate..."
/>

**Try this:**
1. Type "Scr"
2. Press Down Arrow to see suggestions
3. Press Home to jump to first
4. Press Enter to select
5. Press Delete twice to remove (after clearing input)

## Need Help?

- See [Accessibility Guide](/guide/accessibility) for screen reader info
- Check [Examples](/examples/keyboard) for live demos
- Open an issue on [GitHub](https://github.com/prabhuignoto/smart-tagz/issues)
