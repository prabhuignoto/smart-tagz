<template>
  <div class="example">
    <header>
      <h3>Limit Maximum Tags</h3>
    </header>
    <p>
      Enforce a maximum tag limit using the
      <code>max-tags</code>
      prop. Once the limit is reached, the input field automatically hides to prevent additional
      entries. Perfect for forms with strict requirements like "select up to 5 tags" or category
      limits. This example shows a limit of 3 tags.
    </p>
    <CodeBlock
      :code="code"
      lang="html"
    />
    <div class="sample-view">
      <smart-tagz
        :allow-paste="{ delimiter: ',' }"
        :max-tags="3"
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
        allow-duplicates
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
  :allow-paste="{delimiter: ','}"
  :max-tags="3"
  :sources="sources"
  :default-tags="['United Kingdom', 'Uruguay', 'Uzbekistan', 'Venezuela', 'Vietnam', 'Virgin Islands (US)', 'Yemen', 'Zambia', 'Zimbabwe']"
  input-placeholder="Select Countries ..."
  autosuggest
  editable
  allow-duplicates
/>`

export default defineComponent({
  name: 'Maxtags',
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
