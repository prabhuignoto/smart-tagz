# Props Reference

Complete list of all Smart-Tagz component props.

## Input & Display

### `inputPlaceholder`

- **Type:** `string`
- **Default:** `'Enter tag...'`
- **Description:** Placeholder text shown in the input field

```vue
<SmartTagz input-placeholder="Select tags..." />
```

### `defaultTags`

- **Type:** `string[]`
- **Default:** `[]`
- **Description:** Initial tags to display when component mounts

```vue
<SmartTagz :default-tags="['Vue.js', 'React']" />
```

### `width`

- **Type:** `string`
- **Default:** `'100%'`
- **Description:** Container width (CSS value)

```vue
<SmartTagz width="500px" />
```

## Suggestions

### `sources`

- **Type:** `string[]`
- **Default:** `[]`
- **Description:** Available tags for autocomplete suggestions

```vue
<SmartTagz :sources="['JavaScript', 'TypeScript', 'Python']" />
```

### `autosuggest`

- **Type:** `boolean`
- **Default:** `false`
- **Description:** Enable fuzzy search suggestions as user types

```vue
<SmartTagz autosuggest />
```

## Constraints

### `maxTags`

- **Type:** `number`
- **Default:** `20`
- **Description:** Maximum number of tags that can be added

```vue
<SmartTagz :max-tags="5" />
```

When limit is reached, an error message is shown:
```
"Maximum 5 tags allowed"
```

### `allowDuplicates`

- **Type:** `boolean`
- **Default:** `true`
- **Description:** Allow or prevent adding duplicate tags

```vue
<SmartTagz :allow-duplicates="false" />
```

When duplicate is attempted:
```
"JavaScript is already added"
```

## User Actions

### `allowPaste`

- **Type:** `{ delimiter: string }`
- **Default:** `null`
- **Description:** Enable pasting multiple tags at once

```vue
<SmartTagz :allow-paste="{ delimiter: ',' }" />
```

**Usage:**
- User pastes: `"tag1, tag2, tag3"`
- Result: 3 tags added automatically

### `editable`

- **Type:** `boolean`
- **Default:** `false`
- **Description:** Allow users to edit tags after creation

```vue
<SmartTagz :editable="true" />
```

**Usage:**
- Double-click a tag to edit
- Press Enter to save, Escape to cancel

### `quickDelete`

- **Type:** `boolean`
- **Default:** `false`
- **Description:** Enable quick delete mode (Ctrl+A to select all, Delete to remove)

```vue
<SmartTagz :quick-delete="true" />
```

## Read-Only Mode

### `readOnly`

- **Type:** `boolean`
- **Default:** `false`
- **Description:** Display tags as read-only (no editing/deleting)

```vue
<SmartTagz :read-only="true" :default-tags="['Vue', 'React']" />
```

When `readOnly` is `true`:
- Tags cannot be edited
- Tags cannot be deleted
- Input field is disabled

## Styling

### `theme`

- **Type:** `{ primary: string, background?: string, secondary?: string, tagTextColor: string }`
- **Default:** `{ primary: '#6093ca', background: '#eaf1f8', tagTextColor: '#fff' }`
- **Description:** Customize component colors

```vue
<SmartTagz
  :theme="{
    primary: '#6366f1',
    background: '#f3f4f6',
    tagTextColor: '#ffffff'
  }"
/>
```

**Properties:**
- `primary`: Input background and accent color
- `background`: Main container background
- `secondary`: Reserved for future use (currently unused)
- `tagTextColor`: Text color of tags

### `classNames`

- **Type:** `{ main?: string, wrapper?: string, tag_container?: string, tag_name?: string, tag_close_btn?: string }`
- **Default:** `{ wrapper: 'tags_wrapper_custom', tag_container: 'tag_container_custom', tag_name: 'tag_name_custom', tag_close_btn: 'tag_close_btn_custom' }`
- **Description:** Custom CSS class names for advanced styling. Note: `main` property is available in the type but currently not used by the component.

```vue
<SmartTagz
  :class-names="{
    wrapper: 'my-wrapper',
    tag_container: 'my-custom-container',
    tag_name: 'my-tag-text',
    tag_close_btn: 'my-close-btn'
  }"
/>
```

## Methods

Component methods can be accessed via template refs for programmatic control.

### `handleAddTag(tag: string)`

Add a tag programmatically to the component.

```vue
<template>
  <div>
    <SmartTagz ref="tagsRef" />
    <button @click="addCustomTag">Add Tag</button>
  </div>
</template>

<script setup>
const tagsRef = ref()

const addCustomTag = () => {
  tagsRef.value?.handleAddTag('Custom Tag')
}
</script>
```

### `handleRemoveTag(id: string)`

Remove a specific tag by its ID.

```vue
<script setup>
const tagsRef = ref()

const removeTag = (tagId) => {
  tagsRef.value?.handleRemoveTag(tagId)
}
</script>
```

## Callbacks

### `onChanged`

- **Type:** `(tags: string[]) => void`
- **Default:** `undefined`
- **Description:** Fired when tags are added, removed, or edited

```vue
<SmartTagz :on-changed="handleTagsChanged" />

<script setup>
const handleTagsChanged = (tags) => {
  console.log('Selected tags:', tags)
}
</script>
```

**Fired when:**
- User adds a tag
- User removes a tag
- User edits a tag
- User pastes multiple tags

**Returns:** Array of current tag strings

## Complete Example

```vue
<template>
  <SmartTagz
    autosuggest
    :sources="languages"
    :default-tags="['Vue.js']"
    :max-tags="5"
    :allow-duplicates="false"
    :allow-paste="{ delimiter: ',' }"
    :editable="true"
    :quick-delete="true"
    input-placeholder="Select programming languages..."
    :on-changed="handleChanges"
    :theme="{
      primary: '#6366f1',
      background: '#f3f4f6',
      tagTextColor: '#ffffff'
    }"
    :class-names="{
      container: 'languages-container',
      name: 'language-tag',
      closeButton: 'remove-btn'
    }"
  />
</template>

<script setup>
import SmartTagz from 'smart-tagz'
import 'smart-tagz/dist/smart-tagz.css'

const languages = [
  'JavaScript',
  'TypeScript',
  'Python',
  'Go',
  'Rust',
  'Vue.js',
  'React',
  'Angular'
]

const handleChanges = (tags) => {
  console.log('Updated tags:', tags)
}
</script>
```

## Type Definitions

If using TypeScript:

```typescript
interface SmartTagzProps {
  sources?: string[]
  autosuggest?: boolean
  allowPaste?: { delimiter: string }
  allowDuplicates?: boolean
  maxTags?: number
  defaultTags?: string[]
  editable?: boolean
  readOnly?: boolean
  inputPlaceholder?: string
  quickDelete?: boolean
  width?: string
  theme?: {
    primary: string
    background?: string
    secondary?: string
    tagTextColor: string
  }
  classNames?: {
    wrapper?: string
    tag_container?: string
    tag_name?: string
    tag_close_btn?: string
  }
  onChanged?: (tags: string[]) => void
}
```

## Notes

- All props are **optional**
- Props are **case-sensitive**
- Use `:prop="value"` syntax for non-string values
- Changes to props are **reactive** and update the component immediately

## API Stability

The props API is stable and will not change without a major version bump. Any breaking changes will be documented in the changelog.
