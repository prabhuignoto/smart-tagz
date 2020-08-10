<template>
  <div class="example">
    <header>
      <h3>MaxTags</h3>
    </header>
    <p>The component can also be configured to accept the Maximum number of tags that can be created. Once the threshold is reached, the textbox input will be hidden from the user.</p>
    <pre data-line="3">
      <code class="lang-html">{{ code }}</code>
    </pre>
    <div class="sample-view">
      <SmartTagz
        input-placeholder="Select Countries ..."
        :max-tags="3"
        :autosuggest="true"
        :sources="sources"
        :default-tags="['United Kingdom', 'Uruguay', 'Uzbekistan', 'Venezuela', 'Vietnam', 'Virgin Islands (US)', 'Yemen', 'Zambia', 'Zimbabwe']"
        :editable="true"
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
const html = `  <SmartTagz
    input-placeholder="Select Countries ..."
    :max-tags="3"
    :autosuggest="true"
    :sources="sources"
    :default-tags="['United Kingdom', 'Uruguay', 'Uzbekistan', 'Venezuela', 'Vietnam', 'Virgin Islands (US)', 'Yemen', 'Zambia', 'Zimbabwe']"
    :editable="true"
    :allow-duplicates="false"
    :allow-paste="{delimiter: ','}"
  />`;

export default defineComponent({
  name: "Maxtags",
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