<template>
  <div class="page">
    <!-- Examples Section -->
    <section class="examples-section">
      <div class="examples-container">
        <div class="section-header">
          <h1>Component Examples</h1>
        </div>

        <div class="examples-grid">
          <!-- Basic Examples -->
          <div class="example-card">
            <Basic />
          </div>
          <div class="example-card">
            <Defaults />
          </div>
          <div class="example-card">
            <Editable />
          </div>

          <!-- Core Features -->
          <div class="example-card">
            <Autocomplete />
          </div>
          <div class="example-card">
            <Paste />
          </div>
          <div class="example-card">
            <ReadOnly />
          </div>

          <!-- Advanced Configuration -->
          <div class="example-card">
            <Duplicates />
          </div>
          <div class="example-card">
            <Maxtags />
          </div>
          <div class="example-card">
            <Theme />
          </div>
          <div class="example-card">
            <QuickDelete />
          </div>

          <!-- Extended Features -->
          <div class="example-card featured">
            <FuzzySearch />
          </div>
          <div class="example-card featured">
            <Keyboard />
          </div>
          <div class="example-card featured">
            <Accessibility />
          </div>
          <div class="example-card featured">
            <ErrorHandling />
          </div>
          <div class="example-card featured">
            <Mobile />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import Basic from '../examples/basic.vue'
import Defaults from '../examples/defaults.vue'
import Editable from '../examples/editable.vue'
import Autocomplete from '../examples/autocomplete.vue'
import Paste from '../examples/paste.vue'
import ReadOnly from '../examples/readonly.vue'
import Duplicates from '../examples/duplicates.vue'
import Maxtags from '../examples/maxtags.vue'
import Theme from '../examples/theme.vue'
import QuickDelete from '../examples/quickdelete.vue'
import FuzzySearch from '../examples/fuzzysearch.vue'
import Keyboard from '../examples/keyboard.vue'
import Accessibility from '../examples/accessibility.vue'
import ErrorHandling from '../examples/errorhandling.vue'
import Mobile from '../examples/mobile.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Demo',
  components: {
    Basic,
    Defaults,
    Editable,
    Autocomplete,
    Paste,
    ReadOnly,
    Duplicates,
    Maxtags,
    Theme,
    QuickDelete,
    FuzzySearch,
    Keyboard,
    Accessibility,
    ErrorHandling,
    Mobile,
  },
})
</script>

<style lang="scss" scoped>
@use '@/styles' as *;

// ============ Page Layout ============
.page {
  width: 100%;
  min-height: 100vh;
  background: var(--color-bg-secondary);
  display: flex;
  flex-direction: column;
}

// ============ Examples Section ============
.examples-section {
  flex: 1;
  width: 100%;
  padding: var(--spacing-3xl) var(--spacing-lg) var(--spacing-2xl);

  @include respond-to('sm') {
    padding: var(--spacing-2xl) var(--spacing-md);
  }
}

.examples-container {
  max-width: 900px;
  margin: 0 auto;
  width: 100%;

  @include respond-to('lg') {
    max-width: 1000px;
  }

  @include respond-to('xl') {
    max-width: 1100px;
  }
}

.section-header {
  margin-bottom: var(--spacing-3xl);

  h1 {
    font-size: 1.75rem;
    font-weight: var(--font-weight-bold);
    color: var(--color-text-primary);
    margin: 0;

    @include respond-to('sm') {
      font-size: 1.5rem;
    }
  }
}

.examples-grid {
  margin-bottom: 2rem;
}

.example-card {
  width: 100%;
  background: var(--color-white);
  border-radius: var(--border-radius-lg);
  padding: var(--spacing-xl);
  box-shadow: 0 4px 12px rgb(0 0 0 / 8%);
  border: 1px solid var(--color-border);
  position: relative;
  box-sizing: border-box;
  margin-bottom: 2rem;
  transition: all var(--transition-base);

  &.featured {
    border: 2px solid var(--color-primary);
    background: linear-gradient(135deg, rgb(99 102 241 / 02%) 0%, rgb(99 102 241 / 04%) 100%);
    box-shadow:
      0 4px 12px rgb(0 0 0 / 8%),
      0 0 0 1px rgb(99 102 241 / 1%);

    &::before {
      content: '✨ NEW';
      position: absolute;
      top: -12px;
      left: 16px;
      background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%);
      color: var(--color-white);
      padding: 4px 12px;
      border-radius: var(--border-radius-full);
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.5px;
      box-shadow: 0 2px 8px rgb(99 102 241 / 3%);
    }
  }

  // Override example styles within cards
  :deep(.example) {
    width: 100%;
    max-width: 100%;
    overflow: hidden;

    * {
      box-sizing: border-box;
    }

    header {
      h3 {
        font-size: 1.25rem;
        font-weight: var(--font-weight-semi-bold);
        color: var(--color-text-primary);
        margin: 0 0 var(--spacing-md) 0;
        position: relative;

        /* stylelint-disable-next-line no-descending-specificity */
        &::after {
          content: '';
          position: absolute;
          bottom: -6px;
          left: 0;
          width: 50px;
          height: 3px;
          background: linear-gradient(90deg, var(--color-primary), var(--color-accent));
          border-radius: var(--border-radius-full);
        }
      }
    }

    /* stylelint-disable-next-line no-descending-specificity */
    p {
      font-size: var(--font-size-sm);
      color: var(--color-text-secondary);
      line-height: 1.7;
      margin-bottom: var(--spacing-lg);
      margin-top: var(--spacing-lg);
      text-align: left;
    }

    .sample-view {
      width: 100%;
      max-width: 100%;
      padding: var(--spacing-lg);
      background: linear-gradient(135deg, #faf5ff 0%, #f0f9ff 100%);
      border-radius: var(--border-radius-md);
      border: 2px solid var(--color-border);
      margin-top: var(--spacing-lg);
      box-shadow: inset 0 2px 8px rgb(99 102 241 / 08%);
    }
  }
}
</style>
