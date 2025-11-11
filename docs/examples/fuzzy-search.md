# Fuzzy Search Example

Smart fuzzy matching algorithm for intelligent tag suggestions.

## Live Fuzzy Search Demo

<div class="demo-container">
  <SmartTagz
    autosuggest
    :sources="['JavaScript', 'TypeScript', 'Java', 'Python', 'Go', 'Rust', 'C++', 'C#', 'PHP', 'Ruby', 'Kotlin', 'Swift']"
    input-placeholder="Try: js, ts, py, c++ (fuzzy matching)..."
  />
</div>

**Tip:** Type abbreviations or partial names to see fuzzy matching in action!

## How Fuzzy Matching Works

Smart-Tagz uses **Fuse.js** v7.1.0 for fuzzy matching. It finds items even with typos or incomplete input.

### Match Examples

#### Exact Match
```
Input: "javascript"
  → Matches: JavaScript ✓
```

#### Abbreviation
```
Input: "js"
  → Matches: JavaScript ✓
  → Matches: TypeScript ✓
  → Matches: Vue.js ✓
```

#### Partial Name
```
Input: "script"
  → Matches: JavaScript ✓
  → Matches: TypeScript ✓
```

#### Case Insensitive
```
Input: "PYTHON"
  → Matches: Python ✓

Input: "python"
  → Matches: Python ✓
```

#### Typo Tolerance
```
Input: "javscript" (missing 'a')
  → Matches: JavaScript ✓ (fuzzy match)

Input: "pythno" (letters rearranged)
  → Matches: Python ✓ (fuzzy match)
```

## Algorithm Details

### Threshold Scoring

Fuse.js uses a threshold-based scoring system:

| Score | Match Quality | Example |
|-------|---------------|---------|
| 0.0 | Perfect match | "JavaScript" → JavaScript |
| 0.1 | Excellent | "js" → JavaScript |
| 0.2 | Good | "jst" → JavaScript |
| 0.3 | Acceptable | "jscr" → JavaScript |
| > 0.3 | No match | Filtered out |

### Configuration

```typescript
{
  threshold: 0.3,           // Match sensitivity (0=strict, 1=loose)
  // Only these core options are actively configured
  // Fuse.js has many other options available but Smart-Tagz uses defaults for most
}
```

## Real-World Examples

### Technology Stack Selection

```
Input: "vue"
  ✓ Vue.js
  ✓ Vue Router (if included)

Input: "ract"
  ✓ React

Input: "ng"
  ✓ Angular
```

### Programming Language Search

```
Input: "py"
  ✓ Python
  ✓ PyPy (if included)

Input: "c++"
  ✓ C++

Input: "js"
  ✓ JavaScript
  ✓ TypeScript
```

### Skill Matching

```
Input: "front"
  ✓ Frontend Development

Input: "data"
  ✓ Data Science
  ✓ Database Design

Input: "sec"
  ✓ Security
```

## Code Example

```vue
<template>
  <div>
    <label for=\"skills\">Select your skills:</label>
    <SmartTagz
      id=\"skills\"
      autosuggest
      :sources=\"allSkills\"
      :max-tags=\"10\"
      :allow-duplicates=\"false\"
      input-placeholder=\"Type skill name (e.g., 'front', 'db', 'api')...\"
      :on-changed=\"handleSkillsChange\"
    />
    <p class=\"hint\">Try fuzzy matching: type abbreviations or partial names</p>
  </div>
</template>

<script setup>
import SmartTagz from 'smart-tagz'
import 'smart-tagz/dist/smart-tagz.css'

const allSkills = [
  // Frontend
  'Frontend Development',
  'React',
  'Vue.js',
  'Angular',
  'Svelte',
  'CSS/SASS',
  'HTML5',

  // Backend
  'Backend Development',
  'Node.js',
  'Python',
  'Java',
  'Go',
  'Rust',

  // Databases
  'Database Design',
  'SQL',
  'MongoDB',
  'PostgreSQL',
  'Redis',

  // DevOps
  'DevOps',
  'Docker',
  'Kubernetes',
  'AWS',
  'CI/CD',
]

const handleSkillsChange = (tags) => {
  console.log('Selected skills:', tags)
}
</script>

<style scoped>
label {
  display: block;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.hint {
  font-size: 0.875rem;
  color: #6b7280;
  margin-top: 0.5rem;
}
</style>
```

## Customizing Fuse.js

The fuzzy matching is built-in and automatically configured, but here's what Smart-Tagz uses:

```typescript
// Internal Fuse.js configuration
const searchOptions = {
  threshold: 0.3,           // Strict matching
  minMatchCharLength: 1,    // Single char matches allowed
  ignoreLocation: true,     // 'js' matches anywhere in 'javascript'
  findAllMatches: true,     // Find all matching parts
}
```

## Performance Tips

### For Large Source Lists (100+ items)

```vue
<template>
  <SmartTagz
    autosuggest
    :sources=\"lazyLoadedSources\"
    input-placeholder=\"Start typing to search...\"
  />
</template>

<script setup>
import { ref } from 'vue'

const lazyLoadedSources = ref([])

// Load sources on demand or from API
const loadSources = async () => {
  const response = await fetch('/api/skills')
  lazyLoadedSources.value = await response.json()
}

onMounted(loadSources)
</script>
```

## Matching Behavior

### What Matches

```
✅ "js" matches "JavaScript"
✅ "ts" matches "TypeScript"
✅ "py" matches "Python"
✅ "c++" matches "C++"
✅ "vue" matches "Vue.js"
✅ "react" matches "React"
```

### What Doesn't Match

```
❌ "xyz" doesn't match anything (no matching chars)
❌ "ja" might match "Java" but scores poorly
❌ Empty input shows no suggestions
❌ Spaces are significant
```

## Accessibility

Fuzzy matching works seamlessly with accessibility:

```
Screen Reader Announces:
  "Suggestion 1 of 8: JavaScript"
  "Suggestion 2 of 8: TypeScript"
  "Suggestion 3 of 8: Vue.js"

Keyboard Navigation:
  ↓ Move to next match
  ↑ Move to previous match
  Enter Select suggestion
```

## Comparison: Exact vs Fuzzy

| Feature | Exact Match | Fuzzy Match |
|---------|------------|------------|
| "js" matches "JavaScript" | ❌ | ✅ |
| "js" matches "TypeScript" | ❌ | ✅ |
| Typo tolerance | ❌ | ✅ |
| Faster | ✅ | ❌ |
| More intuitive | ❌ | ✅ |

## Next Steps

- [Autocomplete](/examples/autocomplete) - Learn about suggestions
- [Error Handling](/examples/error-handling) - Handle edge cases
- [API Reference](/api/props) - All available props
