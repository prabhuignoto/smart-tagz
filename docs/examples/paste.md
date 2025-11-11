# Paste & Bulk Import

Learn how to enable users to add multiple tags at once by pasting delimited text.

## Live Demo

Try pasting a comma-separated list (e.g., `JavaScript, TypeScript, Vue.js`):

<div class="demo-container">
  <SmartTagz
    :allow-paste="true"
    input-placeholder="Paste comma-separated tags here..."
  />
</div>

## Overview

The `allowPaste` prop enables bulk tag creation when users paste delimited text. This is useful for:
- Importing lists of items
- Bulk data entry
- CSV/spreadsheet data
- Quick list creation
- Copy-paste workflows

## Basic Usage

```vue
<template>
  <SmartTagz :allow-paste="{ delimiter: ',' }" />
</template>

<script setup>
import SmartTagz from 'smart-tagz'
import 'smart-tagz/dist/smart-tagz.css'
</script>
```

## How It Works

1. User copies text to clipboard (e.g., "Item1, Item2, Item3")
2. User pastes into the input field (Ctrl+V / Cmd+V)
3. Component splits text by delimiter
4. Creates individual tags for each item
5. Respects max tags limit and duplicate settings

### Example Paste Operations

**Input:** `JavaScript, TypeScript, Python`
**Result:** 3 tags added (JavaScript, TypeScript, Python)

**Input:** `Vue.js;React;Angular` (with `;` delimiter)
**Result:** 3 tags added (Vue.js, React, Angular)

## Props

### `allowPaste`

- **Type:** `{ delimiter: string }`
- **Default:** `null` (paste disabled)
- **Description:** Configuration for paste functionality

```vue
<!-- Enable paste with comma delimiter -->
<SmartTagz :allow-paste="{ delimiter: ',' }" />

<!-- Enable paste with semicolon delimiter -->
<SmartTagz :allow-paste="{ delimiter: ';' }" />

<!-- Enable paste with newline delimiter -->
<SmartTagz :allow-paste="{ delimiter: '\n' }" />

<!-- Paste disabled (default) -->
<SmartTagz :allow-paste="null" />
```

## Practical Examples

### Example 1: CSV Import

```vue
<template>
  <div>
    <h2>Import Emails</h2>
    <p>Paste comma-separated emails below:</p>
    <SmartTagz
      :allow-paste="{ delimiter: ',' }"
      input-placeholder="Paste emails here..."
      @on-changed="handleEmailsChanged"
    />
    <div class="email-count">{{ emails.length }} email(s) added</div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import SmartTagz from 'smart-tagz'

const emails = ref([])

const handleEmailsChanged = (newEmails) => {
  emails.value = newEmails
  console.log('Emails:', newEmails)
}
</script>

<style>
.email-count {
  margin-top: 1rem;
  color: #666;
}
</style>
```

### Example 2: Todo List Bulk Import

<details>
<summary>Click to view code</summary>

```vue
<template>
  <div>
    <div class="import-help">
      <p>Paste multiple todos (one per line):</p>
      <code>Buy groceries
Complete project
Call dentist
Fix bugs</code>
    </div>

    <SmartTagz
      :allow-paste="{ delimiter: '\n' }"
      :max-tags="20"
      :editable="true"
      input-placeholder="Paste todos here..."
      @on-changed="updateTodos"
    />

    <div v-if="todos.length > 0" class="todo-preview">
      <h3>Todo List Preview ({{ todos.length }})</h3>
      <ul>
        <li v-for="todo in todos" :key="todo">{{ todo }}</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import SmartTagz from 'smart-tagz'

const todos = ref([])

const updateTodos = (newTodos) => {
  todos.value = newTodos
}
</script>

<style>
.import-help {
  background-color: #f3f4f6;
  padding: 1rem;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
}

.import-help code {
  display: block;
  margin-top: 0.5rem;
  padding: 0.5rem;
  background-color: #fff;
  border-left: 3px solid #3b82f6;
  font-family: monospace;
  font-size: 0.875rem;
}

.todo-preview {
  margin-top: 2rem;
  padding: 1rem;
  background-color: #f9fafb;
  border-radius: 0.5rem;
}

.todo-preview h3 {
  margin-top: 0;
}

.todo-preview ul {
  list-style-position: inside;
}
</style>
```

</details>

### Example 3: With Validation

<details>
<summary>Click to view code</summary>

```vue
<template>
  <div>
    <SmartTagz
      :allow-paste="{ delimiter: ',' }"
      :allow-duplicates="false"
      input-placeholder="Paste URLs (comma-separated)..."
      @on-changed="validateUrls"
    />
    <div v-if="validationErrors.length > 0" class="error-list">
      <h4>Issues Found:</h4>
      <ul>
        <li v-for="error in validationErrors" :key="error">{{ error }}</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import SmartTagz from 'smart-tagz'

const validationErrors = ref([])

const validateUrls = (urls) => {
  validationErrors.value = []

  urls.forEach(url => {
    try {
      new URL(url)
    } catch {
      validationErrors.value.push(`Invalid URL: "${url}"`)
    }
  })
}
</script>

<style>
.error-list {
  color: #dc2626;
  margin-top: 1rem;
  padding: 1rem;
  background-color: #fee2e2;
  border-radius: 0.375rem;
}

.error-list h4 {
  margin-top: 0;
}

.error-list ul {
  list-style-position: inside;
}
</style>
```

</details>

### Example 4: Spreadsheet Import

<details>
<summary>Click to view code</summary>

```vue
<template>
  <div class="spreadsheet-import">
    <div class="instructions">
      <h3>Import from Spreadsheet</h3>
      <ol>
        <li>Copy column A from your spreadsheet</li>
        <li>Paste below (one item per line)</li>
        <li>Duplicates will be automatically removed</li>
      </ol>
    </div>

    <SmartTagz
      :allow-paste="{ delimiter: '\n' }"
      :allow-duplicates="false"
      :max-tags="100"
      :editable="true"
      input-placeholder="Paste spreadsheet data..."
      @on-changed="handleImport"
    />

    <div v-if="importedData.length > 0" class="import-summary">
      <h3>Import Summary</h3>
      <p><strong>Total items:</strong> {{ importedData.length }}</p>
      <p><strong>Memory usage:</strong> {{ formatBytes(estimatedSize) }}</p>
      <button @click="saveImport" class="btn-save">Save Import</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import SmartTagz from 'smart-tagz'

const importedData = ref([])

const estimatedSize = computed(() => {
  return importedData.value.reduce((sum, item) => sum + item.length, 0)
})

const handleImport = (data) => {
  importedData.value = data
  console.log(`Imported ${data.length} items`)
}

const formatBytes = (bytes) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i]
}

const saveImport = async () => {
  const response = await fetch('/api/import', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ items: importedData.value })
  })

  if (response.ok) {
    alert(`Successfully imported ${importedData.value.length} items!`)
    importedData.value = []
  }
}
</script>

<style>
.spreadsheet-import {
  padding: 1.5rem;
  background-color: #f9fafb;
  border-radius: 0.5rem;
}

.instructions {
  background-color: #eff6ff;
  padding: 1rem;
  border-radius: 0.375rem;
  margin-bottom: 1.5rem;
}

.instructions h3 {
  margin-top: 0;
  color: #0369a1;
}

.instructions ol {
  margin: 0.5rem 0 0 1.5rem;
}

.import-summary {
  margin-top: 2rem;
  padding: 1rem;
  background-color: #ecfdf5;
  border-radius: 0.375rem;
}

.import-summary h3 {
  margin-top: 0;
  color: #047857;
}

.btn-save {
  background-color: #10b981;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  font-weight: 600;
}

.btn-save:hover {
  background-color: #059669;
}
</style>
```

</details>

## Combining with Other Props

### With Constraints

```vue
<SmartTagz
  :allow-paste="{ delimiter: ',' }"
  :max-tags="10"
  :allow-duplicates="false"
/>
```

### With Suggestions

```vue
<SmartTagz
  :allow-paste="{ delimiter: ',' }"
  :sources="suggestedTags"
  autosuggest
/>
```

### With Editing

```vue
<SmartTagz
  :allow-paste="{ delimiter: ',' }"
  :editable="true"
  input-placeholder="Paste or type tags..."
/>
```

## Supported Delimiters

| Delimiter | Use Case | Example |
|-----------|----------|---------|
| `,` | CSV data | `item1, item2, item3` |
| `;` | Semicolon-separated | `item1; item2; item3` |
| `\n` | Line-separated | `item1\nitem2\nitem3` |
| `\t` | Tab-separated | `item1\titem2\titem3` |
| `\|` | Pipe-separated | `item1\|item2\|item3` |

## Behavior Notes

### Whitespace Handling
- Leading/trailing whitespace is automatically trimmed
- Extra spaces between items are removed
- Empty items are skipped

```
Input: "  item1  ,  item2  , , item3  "
Result: ["item1", "item2", "item3"]
```

### Max Tags Limit
When pasting exceeds `maxTags` limit:
- Only tags up to the limit are added
- Error message: "Maximum X tags allowed"
- User can remove tags and paste remaining items

```
maxTags: 5
Paste: "tag1, tag2, tag3, tag4, tag5, tag6, tag7"
Result: First 5 tags added, error shown for tag6, tag7
```

### Duplicate Prevention
When `allowDuplicates="false"`:
- Duplicate items in paste are merged
- Duplicates with existing tags are skipped
- No error is shown, just merged silently

```
Existing: ["Vue"]
Paste: "Vue, React, Angular, React"
Result: ["Vue", "React", "Angular"]
```

### Paste vs. Manual Input
- Manual typing is not affected by paste settings
- Paste only works on `Ctrl+V` / `Cmd+V`
- Manual Enter key creates single tag normally

## Accessibility

- Paste operation is announced to screen readers
- Tag count updated in ARIA label
- All pasted tags are keyboard accessible
- Error messages are announced

## TypeScript Support

```typescript
interface PasteConfig {
  delimiter: string
}

interface SmartTagzProps {
  allowPaste?: PasteConfig
  maxTags?: number
  allowDuplicates?: boolean
}
```

## See Also

- [Basic Usage](/examples/basic)
- [Error Handling](/examples/error-handling)
- [API Reference](/api/props)
