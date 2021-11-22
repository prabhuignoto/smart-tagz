<template>
  <div class="example">
    <header>
      <h3>Autosuggest</h3>
    </header>
    <p>
      When set to true, the autosuggest prop suggests values in the dropdown as
      you type. You also need to set the sources prop for this to work. The
      sources prop should be an Array of strings.
    </p>
    <pre data-line="3-3">
    <code class="lang-html">{{ code }}</code>
    </pre>
    <div class="sample-view">
      <smart-tagz
        input-placeholder="Select Countries ..."
        autosuggest
        editable
        :sources="sources"
        :on-changed="logResult"
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
import SmartTagz from "../components/Main.vue";
import Countries from "../test/countries";
import { defineComponent } from "vue";

const html = `  <smart-tagz
  input-placeholder="Select Countries ..."
  autosuggest
  editable
  :sources="sources"
  :default-tags="['United Kingdom', 'Uruguay', 'Uzbekistan', 'Venezuela', 'Vietnam', 'Virgin Islands (US)', 'Yemen', 'Zambia', 'Zimbabwe']"
/>`;

export default defineComponent({
  name: "Autocomplete",
  components: {
    SmartTagz,
  },
  setup() {
    const logResult = (result: string[]) => console.log(result);

    return {
      logResult,
    };
  },
  data() {
    return {
      code: html,
      sources: Countries,
    };
  },
});
</script>