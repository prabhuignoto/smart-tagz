<!-- [![NPM Version][npm-image]][npm-url]-->
<!-- [![Downloads Stats][npm-downloads]][npm-url] -->

<div align="center">
  <img src="./social-slide-small.png" />
</div>

<br />

[![Build Status](https://dev.azure.com/prabhummurthy/smart-tagz/_apis/build/status/prabhuignoto.smart-tagz?branchName=master)](https://dev.azure.com/prabhummurthy/smart-tagz/_build/latest?definitionId=4&branchName=master)
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/ece87afeb05c431fa375a8b98223290d)](https://www.codacy.com/manual/prabhuignoto/smart-tagz?utm_source=github.com&utm_medium=referral&utm_content=prabhuignoto/smart-tagz&utm_campaign=Badge_Grade)
[![DeepScan grade](https://deepscan.io/api/teams/10074/projects/13324/branches/220204/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=10074&pid=13324&bid=220204)
[![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/prabhuignoto/smart-tagz.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/prabhuignoto/smart-tagz/context:javascript)
![Snyk Vulnerabilities for GitHub Repo](https://img.shields.io/snyk/vulnerabilities/github/prabhuignoto/smart-tagz)
[![Depfu](https://badges.depfu.com/badges/b07de06e0726ec1cdfec6c7a12967582/overview.svg)](https://depfu.com/github/prabhuignoto/smart-tagz?project_id=18158)

<div align="center">
  <img src="./demo.gif"/>
</div>

[![Edit smart-tagz](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/smart-tagz-pd32g?fontsize=14&hidenavigation=1&theme=dark)

<h2>✨ Features</h2>

- ⚡ [Autosuggest](#auto-suggest) with **fuzzy matching** for smarter suggestions (type "many" to find "Germany")
- ♿ **WCAG 2.1 AA Accessible** - ARIA support, keyboard navigation, screen reader announcements
- ⌨️ **Advanced keyboard navigation** - Arrow keys, Home/End, Tab, Escape fully supported
- ✏️ [Edit](#editable-tags) the tags inline by double clicking them.
- 🏷️ [Paste](#paste) strings with delimiters of your choice and the component will create the tags for you.
- 🗑️ Quickly delete the tags with a visual confirmation before removing a tag.
- 🧹 Quickly clear all tags with `quick-delete` mode.
- 🔒 &nbsp;[Lock the component](#readonly-tags) using the `readonly` mode.
- ✋ &nbsp;[Restrict](#max-tags) the number of tags and Handle duplicates gracefully.
- 🌈&nbsp;[Customize](#theme) the colors.
- 📱 **Mobile optimized** - 44px touch targets, responsive layout, virtual keyboard support
- 🎯 **Intelligent error handling** - Real-time error messages, empty states, result counts

### Table of Contents

- [⚡ Installation](#-installation)
- [🚀 Getting Started](#-getting-started)
- [🍬 Demos](#-demos)
- [Keyboard Shortcuts](#keyboard-shortcuts)
- [Accessibility](#accessibility)
- [Props](#props)
  - [Default Tags](#default-tags)
  - [Duplicates](#duplicates)
  - [Auto Suggest](#auto-suggest)
  - [Max Tags](#max-tags)
  - [Paste](#paste)
  - [Editable Tags](#editable-tags)
  - [Readonly Tags](#readonly-tags)
  - [Theme](#theme)
  - [Custom Class names](#custom-class-names)
- [Migration Guide (v0.5.0+)](#migration-guide-v050)
- [📦 Build Setup](#-build-setup)
- [🔨 Contributing](#-contributing)
- [Notes](#notes)
- [Meta](#meta)

## ⚡ Installation

```jsx
yarn install smart-tagz
```

## 🚀 Getting Started

smart-tagz has some great defaults to get you started quickly. Please check the props list for all options.

```jsx
<template>
  <smart-tagz
    autosuggest
    editable
    inputPlaceholder="Select Countries ..."
    :sources="sources"
    :allowPaste="{delimiter: ','}"
    :allowDuplicates="false"
    :maxTags="20"
    :defaultTags="['United Kingdom', 'Uruguay', 'Uzbekistan']"
  />
</template>

<script>
import { SmartTagz } from "smart-tagz";
import "smart-tagz/dist/smart-tagz.css";

import { defineComponent } from "vue";

export default defineComponent({
  name: "Basic",
  components: {
    SmartTagz,
  }
});
</script>
```

## 🍬 Demos

Head to our demo page for examples showcasing all the features.

[https://smart-tagz.vercel.app/](https://smart-tagz.vercel.app/)

## ⌨️ Keyboard Shortcuts

Smart-Tagz supports full keyboard navigation for accessibility and efficiency:

| Key | Action |
|-----|--------|
| <kbd>↑</kbd> / <kbd>↓</kbd> | Navigate suggestions up/down |
| <kbd>Home</kbd> | Jump to first suggestion |
| <kbd>End</kbd> | Jump to last suggestion |
| <kbd>Enter</kbd> | Select highlighted suggestion or add typed text |
| <kbd>Tab</kbd> | Select highlighted suggestion and move focus |
| <kbd>Escape</kbd> | Close suggestions and clear selection |
| <kbd>Backspace</kbd> | Delete character or last tag when input is empty |
| <kbd>Delete</kbd> | Delete last tag (press again to confirm) |
| <kbd>Ctrl</kbd> + <kbd>A</kbd> | Select all tags for quick deletion (when `quickDelete` enabled) |

## ♿ Accessibility

Smart-Tagz is built with **WCAG 2.1 Level AA** compliance in mind:

### Features
- **ARIA Support**: Proper roles (`combobox`, `listbox`, `option`) and attributes (`aria-expanded`, `aria-selected`, `aria-label`)
- **Screen Reader Announcements**:
  - Tag additions: "France added. 3 of 20 tags"
  - Tag removals: "Germany removed. 2 of 20 tags"
  - Error states: "Maximum 20 tags allowed"
  - Filtered results: Announced via live region
- **Keyboard Navigation**: All interactions possible without mouse
- **Focus Management**: Visible focus indicators on all interactive elements
- **Semantic HTML**: Proper use of `<ul>`, `<li>` for suggestions
- **Color Independence**: Error states use icons and text, not color alone

### Testing with Screen Readers
- **Windows**: NVDA (free), JAWS
- **macOS**: VoiceOver (built-in)
- **iOS**: VoiceOver (built-in)
- **Android**: TalkBack (built-in)

### Example with Screen Reader Announcements
```vue
<smart-tagz
  autosuggest
  :sources="countries"
  :maxTags="20"
  :allowDuplicates="false"
  :onChanged="handleChange"
/>
<!-- Screen reader output:
  "Add tags, 0 of 20"
  Input receives focus with aria-label and description
  User types "fran", suggestions appear
  "5 results" announcement
  User selects "France"
  "France added. 1 of 20 tags" announcement
-->
```

## Props

| Prop             | Type                  | Description                                                                                      | Default          |
| ---------------- | --------------------- | ------------------------------------------------------------------------------------------------ | ---------------- |
| defaultTags      | Array                 | initialize with a `default` set of tags                                                          | []               |
| width            | String                | `width` of the container                                                                         | 100%             |
| autosuggest      | Boolean               | Enables the `autosuggest` feature. you also need to set the sources for the autosuggest to work. | false            |
| sources          | Array                 | Works as the `datasource` for the autosuggest feature                                            | []               |
| allowPaste       | { delimiter: String } | Parses the pasted string based on the passed delimiter and creates tags automatically            | {delimiter: ","} |
| editable         | Boolean               | makes the tags `editable`                                                                        | false            |
| allowDuplicates  | Boolean               | allows/disallows `duplicate` tag entries while pasted or entered manually.                       | true             |
| maxTags          | Number                | sets the `Maximum` number of tags                                                                | 10               |
| inputPlaceholder | String                | `Placeholder` for the input box.                                                                 | "Enter tag..."   |
| readOnly         | Boolean               | Makes the whole component `readOnly`. ideal for display only purposes.                           | false            |
| quick-delete     | Boolean               | When enabled all the tags can be cleared by <kbd>CTRL</kbd> + <kbd>A</kbd>, <kbd>DEL</kbd>       | false            |
| on-changed       | Function              | `callback` that gets called when a new tag is added or an existing tag is deleted                | false            |

### Default Tags

We can initialize smart-tagz with some `default` tags. This setting will mostly be used along with the `readonly` prop to create tags for display only purposes.

```jsx
<smart-tagz :default-tags="['United Kingdom', 'Uruguay', 'Uzbekistan']" />
```

### Duplicates

You can decide how to manage `duplicate` tags by either allowing or disallowing them completely. When set to `false` no duplicate values are allowed.

```jsx
<smart-tagz :allow-duplicates="false" />
```

### Auto Suggest

When set to `true`, the `autosuggest` prop suggests values in a dropdown using **smart fuzzy matching**. You also need to set the `sources` prop for this to work. The `sources` prop can be an Array of strings.

#### Fuzzy Matching
Smart-Tagz uses intelligent fuzzy matching powered by [fuse.js](https://fusejs.io/) to provide flexible searching:

- **Smart matching**: Type "many" to find "Germany", "germ" to find "Germany", etc.
- **Typo tolerance**: Slightly misspelled words still match
- **Partial matching**: Match any part of the word, not just the beginning
- **Real-time results**: Suggestions update as you type with result count

```jsx
<smart-tagz
  autosuggest
  :sources="['India', 'Brazil', 'China', 'United Kingdom']"
  @changed="handleTagsChange"
/>
<!-- Type "ind" → finds "India" -->
<!-- Type "bra" → finds "Brazil" -->
<!-- Type "uni" → finds "United Kingdom" -->
```

#### Visual Feedback
- **Result highlighting**: Matching characters are highlighted in yellow
- **Result count**: Shows "3 results" or "1 result" above suggestions
- **Empty state**: Shows "No matches found for 'xyz'" when nothing matches

### Max Tags

The component can also be configured to accept the `Maximum` number of tags that can be created. Once the threshold is reached, the input will be `hidden` from the user.

Here we restrict the tags to `3`

```jsx
<smart-tagz :max-tags="3" />
```

### Paste

The component can parse strings and automatically create tags for you. The default delimiter is `","` but you can override this setting by manually setting the `delimiter` option.

```jsx
<smart-tagz :allow-paste="{delimiter: ';'}" />
```

### Editable Tags

The Tags are not `editable` by default, but you can change this setting with the `editable` prop. Simply double click a tag, make the changes and hit enter to save.

```jsx
<smart-tagz editable />
```

### Readonly Tags

You can lock the component with `readonly` mode. All interactions are disabled in `read-only` mode.

```jsx
<smart-tagz read-only />
```

### Theme

The components color scheme can be customized by passing a custom theme prop.

```jsx
  <smart-tagz
    :theme="{
      primary: '#545454',
      background: '#bdbdbd',
      tagTextColor: '#fff',
    }"
  />
```

### Custom Class names

If you are looking for more control in terms of customizing the style of the tags, you can make use of the `classNames` prop to apply custom classes to the different elements within the component.

```jsx
<smart-tagz
  input-placeholder="Select Countries ..."
  :class-names="{
    wrapper: 'tags_wrapper_custom',
    tag_name: 'tag_name_custom',
    tag_container: 'tag_container_custom',
    tag_close_btn: 'tag_close_btn_custom',
  }"
  :default-tags="[
    'United Kingdom',
    'Uruguay',
    'Uzbekistan',
    'Venezuela'
  ]"
/>
```

## 🚀 Migration Guide (v0.5.0+)

### Breaking Changes

#### 1. Fuzzy Matching (Default Behavior Change)
**Before (v0.4.x)**: Prefix-only matching
```
Input: "many"  → Suggestions: (no results)
```

**After (v0.5.0+)**: Smart fuzzy matching
```
Input: "many"  → Suggestions: ["Germany", "Myanmar"]
```

**Migration**: Update your tests and documentation to reflect fuzzy matching behavior. No code changes required unless you relied on prefix-only behavior.

#### 2. New Dependency: fuse.js
**Added**: `fuse.js` (~7KB gzipped) for fuzzy search
- Already included in package.json
- No configuration needed
- Improves search quality automatically

#### 3. CSS Class Changes
New utility class added:
```scss
.sr-only  // Screen reader only text (hidden visually, visible to screen readers)
```

Updated styles:
- `.suggest-pane-item`: Font size reduced from `var(--font-size-sm)` to `0.9rem`
- `.suggest-pane-item--selected`: Added left border (3px) indicator
- `.suggest-pane-item`: Added 600 font-weight for better hierarchy

#### 4. Tag Close Button Size
**Before**: ~16px
**After**: **44px** (iOS HIG minimum, better mobile accessibility)

May affect layouts that assumed smaller buttons. Adjust styles if needed:
```scss
.tag-container__button {
  // Now: width: 44px; height: 44px;
  // Override if needed:
  @include size(24px); // your size here
}
```

#### 5. New ARIA Attributes
Added for accessibility. No breaking changes, but updated DOM structure:
```html
<!-- Input now has -->
<input
  role="combobox"
  aria-expanded="true"
  aria-autocomplete="list"
  aria-controls="suggestions-listbox"
  aria-activedescendant="suggestion-0"
  aria-label="Add tags (0 of 20)"
/>

<!-- Suggestions now have -->
<ul role="listbox" aria-label="Tag suggestions" id="suggestions-listbox">
  <li role="option" aria-selected="false" id="suggestion-0">...</li>
</ul>
```

### New Features (Non-Breaking)

✅ Screen reader announcements for tag operations
✅ Live error messages (duplicate/max tags)
✅ Empty state messaging ("No matches found")
✅ Result count indicator
✅ Result highlighting in suggestions
✅ Enhanced keyboard navigation (Home, End, Tab)
✅ Mobile-optimized touch targets
✅ Responsive dropdown height (80vh on desktop, 60vh on mobile)
✅ Better focus indicators with `:focus-visible`

### Upgrade Checklist

- [ ] Review fuzzy matching behavior in your use cases
- [ ] Test with keyboard navigation (arrows, Home, End, Tab)
- [ ] Test with screen readers (optional but recommended)
- [ ] Verify button sizes in your layout
- [ ] Update unit tests for new matching behavior
- [ ] Update documentation for end users

## 📦 Build Setup

```bash
# install dependencies
yarn install

# start dev
yarn run dev

# package lib
npm run rollup

# run css linting
yarn run lint:css
```

## 🔨 Contributing

1. Fork it ( [https://github.com/prabhuignoto/smart-tagz/fork](https://github.com/prabhuignoto/smart-tagz/fork) )
2. Create your feature branch (`git checkout -b new-feature`)
3. Commit your changes (`git commit -am 'Add feature'`)
4. Push to the branch (`git push origin new-feature`)
5. Create a new Pull Request

## Notes

The project uses [vite](vite) instead of @vue/cli. I choose vite for speed and i also believe [vite](vite) will be the future.

## Meta

Prabhu Murthy – [@prabhumurthy2](https://twitter.com/prabhumurthy2) – prabhu.m.murthy@gmail.com

Distributed under the MIT license. See `LICENSE` for more information.

[https://github.com/prabhuingoto/](https://github.com/prabhuingoto/)

<!-- Markdown link & img dfn's -->

[vue]: https://vuejs.org
[typescript]: https://typescriptlang.org
[vite]: https://github.com/vitejs/vite
