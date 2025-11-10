<template>
  <div class="example">
    <header>
      <h3>🔍 Smart Fuzzy Matching</h3>
    </header>
    <p>
      Smart-Tagz now features intelligent
      <strong>fuzzy matching</strong>
      that finds suggestions even with typos or partial text. Type "many" to find "Germany", or
      "germ" to match the same result. This makes searching more intuitive and forgiving of user
      mistakes.
    </p>
    <CodeBlock
      :code="code"
      lang="html"
    />
    <div class="sample-view">
      <div class="feature-highlight">
        <p class="feature-tip">💡 Try typing these to see fuzzy matching in action:</p>
        <ul class="search-examples">
          <li>
            <code>"ger"</code>
            → finds Germany
          </li>
          <li>
            <code>"many"</code>
            → finds Germany
          </li>
          <li>
            <code>"fra"</code>
            → finds France
          </li>
          <li>
            <code>"uni"</code>
            → finds United Kingdom
          </li>
          <li>
            <code>"bra"</code>
            → finds Brazil
          </li>
        </ul>
      </div>
      <smart-tagz
        input-placeholder="Try typing 'many' or 'ger' ..."
        autosuggest
        :sources="sources"
        :on-changed="logResult"
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
  input-placeholder="Try typing 'many' or 'ger' ..."
  autosuggest
  :sources="countryList"
  :allow-duplicates="false"
/>
<!-- Fuzzy matching examples:
  Type "ger" → finds "Germany"
  Type "many" → finds "Germany"
  Type "fra" → finds "France"
  Type "uni" → finds "United Kingdom"
-->`

export default defineComponent({
  name: 'FuzzySearch',
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

.feature-highlight {
  background: linear-gradient(135deg, #faf5ff 0%, #f0f9ff 100%);
  border-left: 4px solid var(--color-primary);
  padding: var(--spacing-lg);
  margin-bottom: var(--spacing-lg);
  border-radius: var(--border-radius-md);
}

.feature-tip {
  margin: 0 0 var(--spacing-md) 0;
  font-weight: 600;
  color: var(--color-text-primary);
}

.search-examples {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-md);

  li {
    background: var(--color-white);
    padding: var(--spacing-sm) var(--spacing-lg);
    border-radius: var(--border-radius-sm);
    border: 1px solid var(--color-border);
    font-size: var(--font-size-sm);

    code {
      background: #f3f4f6;
      padding: 2px 6px;
      border-radius: 3px;
      font-weight: 600;
      color: var(--color-primary);
    }
  }
}
</style>
