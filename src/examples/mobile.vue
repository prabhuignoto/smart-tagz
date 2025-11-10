<template>
  <div class="example">
    <header>
      <h3>📱 Mobile Optimization</h3>
    </header>
    <p>
      Smart-Tagz is fully optimized for mobile devices. Touch targets are 44px minimum, responsive
      dropdown adapts to screen size, and the layout automatically adjusts for smaller screens.
      Perfect for mobile-first applications.
    </p>
    <CodeBlock
      :code="code"
      lang="html"
    />
    <div class="sample-view">
      <div class="mobile-features">
        <h4>Mobile Features</h4>
        <div class="features-grid">
          <div class="feature">
            <span class="icon">👆</span>
            <span class="title">44px Touch Targets</span>
            <span class="description">Easy to tap on small screens</span>
          </div>
          <div class="feature">
            <span class="icon">📐</span>
            <span class="title">Responsive Layout</span>
            <span class="description">Adapts to any screen size</span>
          </div>
          <div class="feature">
            <span class="icon">⌨️</span>
            <span class="title">Keyboard Support</span>
            <span class="description">Works with mobile keyboards</span>
          </div>
          <div class="feature">
            <span class="icon">🔄</span>
            <span class="title">Viewport Aware</span>
            <span class="description">Dropdown height adjusts</span>
          </div>
        </div>
      </div>
      <smart-tagz
        input-placeholder="Mobile-optimized tag input..."
        autosuggest
        editable
        :sources="sources"
        :on-changed="logResult"
        :allow-paste="{ delimiter: ',' }"
      />
      <div class="mobile-note">
        <p>
          <strong>Test on mobile:</strong>
          This example works great on phones and tablets. Try using it on your mobile device to see
          how the touch targets and responsive layout adapt.
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import SmartTagz from '../components/Main.vue'
import CodeBlock from '../components/CodeBlock.vue'
import Countries from '../test/countries'
import { defineComponent } from 'vue'

const html = `<smart-tagz
  input-placeholder="Mobile-optimized..."
  autosuggest
  editable
  :sources="countryList"
  :allow-paste="{ delimiter: ',' }"
/>
<!-- Mobile features:
  - 44px minimum touch targets (iOS HIG)
  - 36px on mobile for better usability
  - Responsive dropdown (60vh on mobile, 80vh on desktop)
  - Full width input on mobile
  - Responsive spacing and text sizes
  - Keyboard accessibility
  - Touch-friendly interactions
-->`

export default defineComponent({
  name: 'MobileOptimization',
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

.mobile-features {
  background: linear-gradient(135deg, #e0e7ff 0%, #f0f4ff 100%);
  border-left: 4px solid #6366f1;
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

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: var(--spacing-md);
}

.feature {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background: rgb(255 255 255 / 8%);
  padding: var(--spacing-lg);
  border-radius: var(--border-radius-sm);

  .icon {
    font-size: 2rem;
    margin-bottom: var(--spacing-sm);
  }

  .title {
    display: block;
    font-size: var(--font-size-sm);
    font-weight: 600;
    color: var(--color-text-primary);
    margin-bottom: var(--spacing-xs);
  }

  .description {
    display: block;
    font-size: 11px;
    color: var(--color-text-secondary);
    line-height: 1.4;
  }
}

.mobile-note {
  background: #fef9e7;
  border-left: 4px solid #fbbf24;
  padding: var(--spacing-md) var(--spacing-lg);
  border-radius: var(--border-radius-sm);
  margin-top: var(--spacing-lg);

  p {
    margin: 0;
    font-size: var(--font-size-sm);
    line-height: 1.5;

    strong {
      color: #b45309;
    }
  }
}
</style>
