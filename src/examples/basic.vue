<template>
  <div class="example">
    <header>
      <h3>Getting started</h3>
    </header>
    <p>smart-tags comes with some great defaults to get you started quickly. Following is a very basic variant that takes a custom placeholder message.</p>
    <pre>
      <code class="lang-html">{{code}}</code>
    </pre>
    <div class="sample-view">
      <SmartTagz input-placeholder="Select Countries ..." />
    </div>
  </div>
</template>


<script lang="ts">
import SmartTagz from "../components/Main.vue";

import { defineComponent } from "vue";

export default defineComponent({
  name: "basic",
  components: {
    SmartTagz,
  },
  data() {
    return {
      code: '<SmartTagz input-placeholder="Select Countries ..." />',
    };
  },
});
</script>