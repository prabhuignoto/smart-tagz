<template>
  <!-- eslint-disable-next-line vue/no-v-html -->
  <div v-html="highlightedCode"></div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { codeToHtml } from 'shiki'

export default defineComponent({
  name: 'CodeBlock',
  props: {
    code: {
      type: String as PropType<string>,
      required: true,
    },
    lang: {
      type: String,
      default: 'html',
    },
  },
  data() {
    return {
      highlightedCode: '',
    }
  },
  /**
   * Security Note: v-html XSS Considerations
   *
   * This component uses v-html to render syntax-highlighted code, which is generally
   * risky for XSS attacks. However, the following measures mitigate these risks:
   *
   * 1. The 'shiki' library's codeToHtml() sanitizes the input and returns safe HTML
   *    with proper escaping of user content while preserving syntax highlighting.
   *
   * 2. In case of errors, we fall back to escapeHtml() which manually escapes all
   *    HTML special characters (&, <, >, ", ').
   *
   * 3. This component should ONLY be used for displaying trusted code snippets
   *    (e.g., documentation, examples) and NOT for user-generated content without
   *    proper validation.
   *
   * WARNING: Do not pass untrusted user input directly to this component without
   * additional validation or sanitization at the application level.
   */
  async mounted() {
    try {
      this.highlightedCode = await codeToHtml(this.code, {
        lang: this.lang,
        theme: 'github-dark',
      })
    } catch (error) {
      console.error('Error highlighting code:', error)
      this.highlightedCode = `<span>${this.escapeHtml(this.code)}</span>`
    }
  },
  methods: {
    escapeHtml(text: string): string {
      const map: Record<string, string> = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;',
      }
      return text.replace(/[&<>"']/g, (m) => map[m] || '')
    },
  },
})
</script>

<style lang="scss" scoped>
:deep(pre.shiki) {
  background: #0d1117 !important;
  border-radius: var(--border-radius-md);
  padding: var(--spacing-lg);
  margin: var(--spacing-md) 0;
  border: 1px solid var(--color-border);
  box-shadow: inset 0 2px 4px rgb(0 0 0 / 6%);
  max-width: 100%;
  overflow-x: auto;
  font-size: 0.875rem;
  line-height: 1.6;
  font-family: var(--font-family-mono);
  white-space: pre-wrap !important;
  overflow-wrap: break-word !important;
  text-align: left !important;

  code {
    font-family: var(--font-family-mono);
    color: #c9d1d9;
    background: transparent;
    padding: 0;
    border-radius: 0;
    white-space: inherit;
    overflow-wrap: inherit;
  }

  .line {
    white-space: pre-wrap;
    overflow-wrap: break-word;
  }

  span {
    word-break: break-all;
    overflow-wrap: break-word;
  }
}
</style>
