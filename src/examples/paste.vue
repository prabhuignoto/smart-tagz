<template>
  <div class="example">
    <header>
      <h3>Bulk Paste & Parse</h3>
    </header>
    <p>
      Paste delimited strings and automatically convert them into tags using the
      <code>allow-paste</code>
      prop. Customize the delimiter (default is comma) to match your data format. Dramatically
      speeds up data entry for bulk tag creation. Try pasting the example below:
    </p>
    <code class="lang-html">France;Germany;Poland</code>
    <CodeBlock
      :code="code"
      lang="html"
    />
    <div class="sample-view">
      <smart-tagz
        :sources="sources"
        :default-tags="['United Kingdom', 'Uruguay', 'Uzbekistan', 'Venezuela']"
        :allow-paste="{ delimiter: ';' }"
        input-placeholder="Select Countries ..."
        autosuggest
        editable
        :on-changed="onChanged"
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
  :default-tags="['United Kingdom', 'Uruguay', 'Uzbekistan', 'Venezuela']"
  :allow-paste="{delimiter: ';'}"
  input-placeholder="Select Countries ..."
  autosuggest
  editable
/>`

export default defineComponent({
  name: 'Paste',
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
  methods: {
    onChanged(tags: string[]) {
      console.log('tags changed', tags)
    },
  },
})
</script>
