<template>
  <div class="example">
    <header>
      <h3>Allow / Disallow Duplicate Tags</h3>
    </header>
    <p>You can decide how to manage duplicate tags by either allowing or disallowing them completely. When set to false no duplicate values are allowed.</p>
    <pre data-line="7">
      <code class="lang-html">{{ code }}</code>
    </pre>
    <div class="sample-view">
      <smart-tagz
        input-placeholder="Select Countries ..."
        autosuggest
        editable
        :sources="sources"
        :default-tags="['United Kingdom', 'Uruguay', 'Uzbekistan', 'Venezuela', 'Vietnam', 'Virgin Islands (US)', 'Yemen', 'Zambia', 'Zimbabwe']"
        :allow-duplicates="false"
        :allow-paste="{delimiter: ','}"
      />
    </div>
  </div>
</template>


<script lang="ts">
import SmartTagz from "../components/Main.vue";
import Countries from "../test/countries";

import { defineComponent } from "vue";
const html = `<smart-tagz
  input-placeholder="Select Countries ..."
  autosuggest
  editable
  :sources="sources"
  :default-tags="['United Kingdom', 'Uruguay', 'Uzbekistan', 'Venezuela', 'Vietnam', 'Virgin Islands (US)', 'Yemen', 'Zambia', 'Zimbabwe']"
  :allow-duplicates="false"
  :allow-paste="{delimiter: ','}"
/>`;

export default defineComponent({
  name: "Dplicates",
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