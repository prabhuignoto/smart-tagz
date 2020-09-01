<template>
  <div class="example">
    <header>
      <h3>Readonly Tags</h3>
    </header>
    <p>Use the readonly prop to make the component readonly.</p>
    <pre data-line="7">
      <code class="lang-html">{{ code }}</code>
    </pre>
    <div class="sample-view">
      <smart-tagz
        :sources="sources"
        :default-tags="['United Kingdom', 'Uruguay', 'Uzbekistan', 'Venezuela', 'Vietnam', 'Virgin Islands (US)', 'Yemen', 'Zambia', 'Zimbabwe']"
        input-placeholder="Select Countries ..."
        autosuggest
        editable
        read-only
      />
    </div>
  </div>
</template>


<script lang="ts">
import SmartTagz from "../components/Main.vue";
import Countries from "../test/countries";

import { defineComponent } from "vue";
const html = `<smart-tagz
  :sources="sources"
  :default-tags="['United Kingdom', 'Uruguay', 'Uzbekistan', 'Venezuela', 'Vietnam', 'Virgin Islands (US)', 'Yemen', 'Zambia', 'Zimbabwe']"
  input-placeholder="Select Countries ..."
  autosuggest
  editable
  read-only
/>`;

export default defineComponent({
  name: "Readonly",
  components: {
    SmartTagz,
  },
  data() {
    return {
      code: html,
      sources: Countries,
    };
  },
});
</script>