<template>
  <div class="example">
    <header>
      <h3>With Event</h3>
    </header>
    <p>We can initialize smart-tagz with a set of default tags. This setting will can be used along with the readonly prop to create tags for display only purposes.</p>
    <pre data-line="3-3">
      <code class="lang-html">{{ code }}</code>
    </pre>
    <div class="sample-view">
      <smart-tagz
        :default-tags="tags"
        @update:modelValue="tags=$event"
      />
    </div>
    {{ tags }}
  </div>
</template>


<script lang="ts">
import SmartTagz from "../components/Main.vue";

import { defineComponent } from "vue";
const html = `  <smart-tagz
  :default-tags="tags"
  @update:modelValue="tags=$event"
  />`;

export default defineComponent({
  name: "Defaults",
  components: {
    SmartTagz,
  },
  data() {
    return {
      code: html,
      tags: []
    };
  },
});
</script>