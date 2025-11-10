<template>
  <div class="example">
    <header>
      <h3>Read-Only Mode</h3>
    </header>
    <p>
      Display tags in read-only mode where users cannot modify, add, or remove tags. Use the
      <code>read-only</code>
      prop for displaying tag collections that are locked or for informational displays. Perfect for
      approval workflows or audit trails.
    </p>
    <CodeBlock
      :code="code"
      lang="html"
    />
    <div class="sample-view">
      <smart-tagz
        :sources="sources"
        :default-tags="[
          'United Kingdom',
          'Uruguay',
          'Uzbekistan',
          'Venezuela',
          'Vietnam',
          'Virgin Islands (US)',
          'Yemen',
          'Zambia',
          'Zimbabwe',
        ]"
        input-placeholder="Select Countries ..."
        autosuggest
        editable
        read-only
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
  :sources="sources"
  :default-tags="['United Kingdom', 'Uruguay', 'Uzbekistan', 'Venezuela', 'Vietnam', 'Virgin Islands (US)', 'Yemen', 'Zambia', 'Zimbabwe']"
  input-placeholder="Select Countries ..."
  autosuggest
  editable
  read-only
/>`

export default defineComponent({
  name: 'Readonly',
  components: {
    SmartTagz,
    CodeBlock,
  },
  data() {
    return {
      code: html,
      sources: Countries,
    }
  },
})
</script>
