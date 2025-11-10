<template>
  <div class="example">
    <header>
      <h3>🎯 Smart Error Handling & Feedback</h3>
    </header>
    <p>
      Smart-Tagz provides intelligent error handling with real-time feedback. When you hit the
      maximum number of tags or try to add a duplicate, you'll get clear, friendly error messages
      and screen reader announcements.
    </p>
    <CodeBlock
      :code="code"
      lang="html"
    />
    <div class="sample-view">
      <div class="error-scenarios">
        <h4>Error Handling Scenarios</h4>
        <div class="scenario">
          <div class="scenario-title">
            <span class="badge badge-error">Max Tags</span>
          </div>
          <p>Try adding more than 3 tags - you'll see a clear error message.</p>
        </div>
        <div class="scenario">
          <div class="scenario-title">
            <span class="badge badge-warning">Duplicates</span>
          </div>
          <p>Try adding the same tag twice - it will be rejected with a message.</p>
        </div>
        <div class="scenario">
          <div class="scenario-title">
            <span class="badge badge-info">Empty State</span>
          </div>
          <p>Type something that doesn't match - see "No matches found" message.</p>
        </div>
      </div>
      <smart-tagz
        input-placeholder="Try adding duplicates or exceeding limit..."
        autosuggest
        :sources="sources"
        :on-changed="logResult"
        :max-tags="3"
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
  :max-tags="3"
  :allow-duplicates="false"
/>
<!-- Error handling:
  - Max tags reached: Shows error message
  - Duplicate detected: Shows error message
  - No matches found: Shows "No matches found" empty state
  - All messages announced to screen readers
  - Real-time feedback with auto-dismiss
-->`

export default defineComponent({
  name: 'ErrorHandling',
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

.error-scenarios {
  background: linear-gradient(135deg, #f5e6ff 0%, #ede9fe 100%);
  border-left: 4px solid #a78bfa;
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

.scenario {
  background: rgb(255 255 255 / 7%);
  padding: var(--spacing-md);
  border-radius: var(--border-radius-sm);
  margin-bottom: var(--spacing-sm);

  &:last-child {
    margin-bottom: 0;
  }

  .scenario-title {
    display: flex;
    align-items: center;
    margin-bottom: var(--spacing-sm);
    gap: var(--spacing-sm);
  }

  p {
    margin: 0;
    font-size: var(--font-size-sm);
    color: var(--color-text-secondary);
  }
}

.badge {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  &.badge-error {
    background: #fee2e2;
    color: #991b1b;
  }

  &.badge-warning {
    background: #fef3c7;
    color: #92400e;
  }

  &.badge-info {
    background: #dbeafe;
    color: #0c4a6e;
  }
}
</style>
