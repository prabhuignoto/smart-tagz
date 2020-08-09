<template>
  <div class="example">
    <header>
      <h3>Autosuggest</h3>
    </header>
    <p>Whe set to true, the autosuggest prop suggests values in a dropdown. You also need to set the sources prop for this to work. The sources prop should be an Array of strings.</p>
    <pre data-line="3-4">
    <code class="lang-html">{{code}}</code>
    </pre>
    <div class="sample-view">
      <SmartTagz
        input-placeholder="Select Countries ..."
        :autosuggest="true"
        :sources="sources"
        :default-tags="['United Kingdom', 'Uruguay', 'Uzbekistan', 'Venezuela', 'Vietnam', 'Virgin Islands (US)', 'Yemen', 'Zambia', 'Zimbabwe']"
        :editable="true"
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
  />`;

export default defineComponent({
  name: "autocomplete",
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