<template>
  <div class="example">
    <header>
      <h3>Pre-populated Tags</h3>
    </header>
    <p>
      Initialize the component with pre-filled tags using the
      <code>default-tags</code>
      prop. This is ideal for editing existing tag collections, showing initial selections, or
      displaying read-only tag lists. Combine with the
      <code>readonly</code>
      prop for display-only scenarios.
    </p>
    <CodeBlock
      :code="code"
      lang="html"
    />
    <div class="sample-view">
      <smart-tagz
        input-placeholder="Select Countries ..."
        :class-names="{
          wrapper: 'tags_wrapper_custom',
          tag_name: 'tag_name_custom',
          tag_container: 'tag_container_custom',
          tag_close_btn: 'tag_close_btn_custom',
        }"
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

import { defineComponent } from 'vue'
const html = `<smart-tagz
  input-placeholder="Select Countries ..."
  :default-tags="['United Kingdom', 'Uruguay', 'Uzbekistan', 'Venezuela', 'Vietnam', 'Virgin Islands (US)', 'Yemen', 'Zambia', 'Zimbabwe']"
/>`

export default defineComponent({
  name: 'Defaults',
  components: {
    SmartTagz,
    CodeBlock,
  },
  data() {
    return {
      code: html,
    }
  },
})
</script>
