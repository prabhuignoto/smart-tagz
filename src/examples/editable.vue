<template>
  <div class="example">
    <header>
      <h3>Editable Tags</h3>
    </header>
    <p>The Tags are not editable by default, but you can change this setting with the editable prop. Simply double click a tag, make the changes and hit enter to save.</p>
    <pre data-line="4">
      <code class="lang-html">{{ code }}</code>
    </pre>
    <div class="sample-view">
      <smart-tagz
        input-placeholder="Select Countries ..."
        :default-tags="['United Kingdom', 'Uruguay', 'Uzbekistan', 'Venezuela', 'Vietnam', 'Virgin Islands (US)', 'Yemen', 'Zambia', 'Zimbabwe']"
        :editable="true"
      />
    </div>
  </div>
</template>


<script lang="ts">
import SmartTagz from "../components/Main.vue";

import { defineComponent } from "vue";
const html = `  <smart-tagz
    input-placeholder="Select Countries ..."
    :default-tags="['United Kingdom', 'Uruguay', 'Uzbekistan', 'Venezuela', 'Vietnam', 'Virgin Islands (US)', 'Yemen', 'Zambia', 'Zimbabwe']"
    :editable="true"
  />`;

export default defineComponent({
  name: "Editable",
  components: {
    SmartTagz,
  },
  data() {
    return {
      code:html,
    };
  },
});
</script>