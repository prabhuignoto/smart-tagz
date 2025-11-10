<template>
  <div class="example">
    <header>
      <h3>♿ Accessibility (WCAG 2.1 AA)</h3>
    </header>
    <p>
      Smart-Tagz is built with accessibility as a first-class feature. It includes ARIA labels,
      semantic HTML, screen reader announcements, keyboard navigation, and focus indicators. Test
      with your screen reader to hear real-time announcements.
    </p>
    <CodeBlock
      :code="code"
      lang="html"
    />
    <div class="sample-view">
      <div class="a11y-features">
        <h4>Accessibility Features</h4>
        <ul class="features-list">
          <li>
            <span class="icon">🔊</span>
            <span>Screen reader announcements for tags added/removed</span>
          </li>
          <li>
            <span class="icon">📋</span>
            <span>ARIA roles (combobox, listbox, option)</span>
          </li>
          <li>
            <span class="icon">⌨️</span>
            <span>Full keyboard navigation</span>
          </li>
          <li>
            <span class="icon">👁️</span>
            <span>Visible focus indicators</span>
          </li>
          <li>
            <span class="icon">📊</span>
            <span>Result count announcements</span>
          </li>
          <li>
            <span class="icon">⚠️</span>
            <span>Error messages for max tags/duplicates</span>
          </li>
        </ul>
      </div>
      <p class="accessibility-note">
        <strong>Try it with a screen reader:</strong>
        Enable NVDA (Windows), JAWS, VoiceOver (Mac), or TalkBack (Android) to hear announcements as
        you add/remove tags.
      </p>
      <smart-tagz
        input-placeholder="Add tags (screen reader announces additions)..."
        autosuggest
        :sources="sources"
        :on-changed="logResult"
        :max-tags="5"
        :allow-duplicates="false"
      />
    </div>
  </div>
</template>

<script lang="ts">
import SmartTagz from '../components/Main.vue'
import CodeBlock from '../components/CodeBlock.vue'
import Countries from '../test/countries'
import { defineComponent } from 'vue'

const html = `<smart-tagz
  input-placeholder="Add tags..."
  autosuggest
  :sources="countryList"
  :max-tags="5"
  :allow-duplicates="false"
/>
<!-- Features:
  - ARIA roles: combobox, listbox, option
  - Screen reader announcements on tag add/remove
  - Full keyboard navigation
  - Result count announcements
  - Error messages for max tags and duplicates
  - Semantic HTML structure
  - High contrast focus indicators
-->`

export default defineComponent({
  name: 'Accessibility',
  components: {
    SmartTagz,
    CodeBlock,
  },
  setup() {
    const logResult = (result: string[]) => console.log('Selected tags:', result)

    return {
      logResult,
    }
  },
  data() {
    return {
      code: html,
      sources: Countries,
    }
  },
})
</script>

<style lang="scss" scoped>
@use '@/styles' as *;

.a11y-features {
  background: linear-gradient(135deg, #dbeafe 0%, #e0f2fe 100%);
  border-left: 4px solid var(--color-primary);
  padding: var(--spacing-lg);
  margin-bottom: var(--spacing-lg);
  border-radius: var(--border-radius-md);

  h4 {
    margin: 0 0 var(--spacing-md) 0;
    font-size: var(--font-size-base);
    font-weight: 600;
    color: var(--color-text-primary);
  }
}

.features-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: var(--spacing-md);

  li {
    display: flex;
    align-items: flex-start;
    gap: var(--spacing-sm);
    padding: var(--spacing-sm);
    background: rgb(255 255 255 / 7%);
    border-radius: var(--border-radius-sm);
    font-size: var(--font-size-sm);
    line-height: 1.4;

    .icon {
      font-size: 1.25rem;
      flex-shrink: 0;
    }
  }
}

.accessibility-note {
  background: #fff7ed;
  border-left: 4px solid var(--color-accent);
  padding: var(--spacing-md) var(--spacing-lg);
  border-radius: var(--border-radius-sm);
  font-size: var(--font-size-sm);
  margin-bottom: var(--spacing-lg);

  strong {
    color: var(--color-accent);
  }
}
</style>
