<template>
  <div class="example">
    <header>
      <h3>Bulk Delete All Tags</h3>
    </header>
    <p>
      Enable fast bulk deletion with the
      <code>quick-delete</code>
      prop. Users can select all tags with
      <strong>Ctrl+A</strong>
      (or
      <strong>Cmd+A</strong>
      on Mac) and delete them instantly by pressing
      <strong>Delete</strong>
      or
      <strong>Backspace</strong>
      . Great for quick data clearing or reset workflows.
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
        :allow-duplicates="false"
        :allow-paste="{ delimiter: ',' }"
        input-placeholder="Select Countries ..."
        editable
        autosuggest
        quick-delete
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
  :allow-duplicates="false"
  :allow-paste="{delimiter: ','}"
  input-placeholder="Select Countries ..."
  editable
  autosuggest
  quick-delete
/>`

export default defineComponent({
  name: 'QuickDelete',
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
