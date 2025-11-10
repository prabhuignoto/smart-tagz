<template>
  <div class="example">
    <header>
      <h3>Getting Started</h3>
    </header>
    <p>
      Create a simple, functional tags input with just a few lines of code. This example
      demonstrates the basic usage with a custom placeholder message. Perfect for getting started
      quickly with sensible defaults included.
    </p>
    <CodeBlock
      :code="code"
      lang="html"
    />
    <div class="sample-view">
      <smart-tagz
        input-placeholder="Select Countries ..."
        :on-changed="logResult"
      />
    </div>
  </div>
</template>

<script lang="ts">
import SmartTagz from '../components/Main.vue'
import CodeBlock from '../components/CodeBlock.vue'

import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Basic',
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
      code: '<smart-tagz input-placeholder="Select Countries ..." />',
    }
  },
})
</script>
