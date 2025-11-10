<template>
  <div class="example">
    <header>
      <h3>Inline Editing</h3>
    </header>
    <p>
      Allow users to edit existing tags inline by double-clicking them. Enable the
      <code>editable</code>
      prop to activate edit mode. Users can modify tag text directly and press Enter to save
      changes. Perfect for refining selections without removing and re-adding tags.
    </p>
    <CodeBlock
      :code="code"
      lang="html"
    />
    <div class="sample-view">
      <smart-tagz
        input-placeholder="Select Countries ..."
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
        :on-changed="handleChange"
        editable
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
  editable
/>`

export default defineComponent({
  name: 'Editable',
  components: {
    SmartTagz,
    CodeBlock,
  },
  data() {
    return {
      code: html,
    }
  },
  methods: {
    handleChange(tags: string[]) {
      console.log('tags changed', tags)
    },
  },
})
</script>
