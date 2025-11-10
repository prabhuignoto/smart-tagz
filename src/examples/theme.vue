<template>
  <div class="example">
    <header>
      <h3>Custom Theming</h3>
    </header>
    <p>
      Fully customize the component's appearance by passing a
      <code>theme</code>
      object. Control colors for tags, backgrounds, text, and more to match your brand identity
      perfectly.
    </p>
    <ul>
      <li>
        primary - targets the background color of the tag and the background of the autosuggest
        dropdown.
      </li>
      <li>background - targets the background of the main container.</li>
      <li>tagTextColor - targets the forecolor of the tag.</li>
    </ul>
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
        :theme="{
          primary: '#545454',
          background: '#bdbdbd',
          tagTextColor: '#fff',
        }"
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
  :theme="{
    primary: '#545454',
    background: '#bdbdbd',
    tagTextColor: '#fff',
  }"
/>`

export default defineComponent({
  name: 'Theme',
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

<style lang="scss" scoped>
@use '@/styles' as *;

ul {
  @include flex-column(flex-start, flex-start);
}
</style>
