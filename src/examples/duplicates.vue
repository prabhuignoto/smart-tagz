<template>
  <div class="example">
    <header>
      <h3>Duplicate Prevention</h3>
    </header>
    <p>
      Control duplicate tag handling with the
      <code>allow-duplicates</code>
      prop. Set it to
      <code>false</code>
      to prevent users from adding duplicate tags—ideal for unique identifiers, email addresses, or
      SKUs. The component automatically prevents duplicate entries and provides visual feedback.
    </p>
    <CodeBlock
      :code="code"
      lang="html"
    />
    <div class="sample-view">
      <smart-tagz
        input-placeholder="Select Countries ..."
        autosuggest
        editable
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
        :allow-duplicates="false"
        :allow-paste="{ delimiter: ',' }"
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
  input-placeholder="Select Countries ..."
  autosuggest
  editable
  :sources="sources"
  :default-tags="['United Kingdom', 'Uruguay', 'Uzbekistan', 'Venezuela', 'Vietnam', 'Virgin Islands (US)', 'Yemen', 'Zambia', 'Zimbabwe']"
  :allow-duplicates="false"
  :allow-paste="{delimiter: ','}"
/>`

export default defineComponent({
  name: 'Duplicates',
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
