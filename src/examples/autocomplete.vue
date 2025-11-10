<template>
  <div class="example">
    <header>
      <h3>Autocomplete & Suggestions</h3>
    </header>
    <p>
      Enable intelligent autocomplete by using the
      <code>autosuggest</code>
      prop with a
      <code>sources</code>
      array. As users type, Smart-Tagz intelligently filters and displays matching suggestions in a
      dropdown. Great for guided data entry with large datasets like countries, skills, or
      categories.
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
        :on-changed="logResult"
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
/>`

export default defineComponent({
  name: 'Autocomplete',
  components: {
    SmartTagz,
    CodeBlock,
  },
  setup() {
    const logResult = (result: string[]) => console.log(result)

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
