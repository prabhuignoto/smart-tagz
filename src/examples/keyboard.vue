<template>
  <div class="example">
    <header>
      <h3>⌨️ Keyboard Navigation</h3>
    </header>
    <p>
      Smart-Tagz is fully keyboard accessible. Navigate suggestions with arrow keys, jump to
      first/last with Home/End, select with Enter, and manage tags entirely without a mouse. All
      keyboard shortcuts are built-in and intuitive.
    </p>
    <CodeBlock
      :code="code"
      lang="html"
    />
    <div class="sample-view">
      <div class="keyboard-guide">
        <h4>Keyboard Shortcuts</h4>
        <div class="shortcuts-grid">
          <div class="shortcut">
            <kbd>↑</kbd>
            /
            <kbd>↓</kbd>
            <span>Navigate suggestions</span>
          </div>
          <div class="shortcut">
            <kbd>Home</kbd>
            /
            <kbd>End</kbd>
            <span>Jump to first/last</span>
          </div>
          <div class="shortcut">
            <kbd>Enter</kbd>
            <span>Select or add</span>
          </div>
          <div class="shortcut">
            <kbd>Tab</kbd>
            <span>Select and move</span>
          </div>
          <div class="shortcut">
            <kbd>Escape</kbd>
            <span>Close dropdown</span>
          </div>
          <div class="shortcut">
            <kbd>Delete</kbd>
            <span>Delete tag (2x)</span>
          </div>
        </div>
      </div>
      <smart-tagz
        input-placeholder="Type to search, use keyboard to navigate..."
        autosuggest
        editable
        :sources="sources"
        :on-changed="logResult"
        :default-tags="['France', 'Spain']"
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
  input-placeholder="Type to search, use keyboard to navigate..."
  autosuggest
  editable
  :sources="countryList"
/>
<!-- Keyboard shortcuts:
  ↑/↓ = Navigate suggestions
  Home/End = Jump to first/last
  Enter = Select or add tag
  Tab = Select and move focus
  Escape = Close dropdown
  Delete = Delete last tag (press twice)
  Ctrl+A = Select all tags (with quickDelete prop)
-->`

export default defineComponent({
  name: 'KeyboardNavigation',
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

.keyboard-guide {
  background: linear-gradient(135deg, #fef3c7 0%, #fef9e7 100%);
  border-left: 4px solid var(--color-accent);
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

.shortcuts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: var(--spacing-md);
}

.shortcut {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);

  kbd {
    background: var(--color-white);
    border: 1px solid #d1d5db;
    border-radius: 4px;
    padding: 4px 8px;
    font-family: monospace;
    font-size: var(--font-size-sm);
    font-weight: 600;
    display: inline-block;
    box-shadow: 0 2px 4px rgb(0 0 0 / 10%);
  }

  span {
    font-size: var(--font-size-sm);
    color: var(--color-text-secondary);
    font-weight: 500;
  }
}
</style>
