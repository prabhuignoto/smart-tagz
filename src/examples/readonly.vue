<template>
  <div class="example">
    <header>
      <h3>Readonly Tags</h3>
    </header>
    <p>You can turn the component into readonly mode by setting the readonly prop to true.</p>
    <pre data-line="6">
      <code class="lang-html">{{ code }}</code>
    </pre>
    <div class="sample-view">
      <SmartTagz
        input-placeholder="Select Countries ..."
        :autosuggest="true"
        :sources="sources"
        :default-tags="['United Kingdom', 'Uruguay', 'Uzbekistan', 'Venezuela', 'Vietnam', 'Virgin Islands (US)', 'Yemen', 'Zambia', 'Zimbabwe']"
        :editable="true"
        :read-only="true"
      />
    </div>
  </div>
</template>


<script lang="ts">
import SmartTagz from "../components/Main.vue";
import Countries from "../test/countries";

import { defineComponent } from "vue";
const html = `  <SmartTagz
    input-placeholder="Select Countries ..."
    :autosuggest="true"
    :sources="sources"
    :default-tags="['United Kingdom', 'Uruguay', 'Uzbekistan', 'Venezuela', 'Vietnam', 'Virgin Islands (US)', 'Yemen', 'Zambia', 'Zimbabwe']"
    :editable="true"
    :read-only="true"
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