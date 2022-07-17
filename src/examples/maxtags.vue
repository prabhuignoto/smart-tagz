<template>
  <div class="example">
    <header>
      <h3>MaxTags</h3>
    </header>
    <p>
      The component can be configured to accept the maximum tags that can be
      created. Once the threshold is reached, the textbox input will be hidden
      from the user.
    </p>
    <pre data-line="3">
      <code class="lang-html">{{ code }}</code>
    </pre>
    <div class="sample-view">
      <smart-tagz
        :allow-paste="{ delimiter: ',' }"
        :max-tags="3"
        :sources="sources"
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
        input-placeholder="Select Countries ..."
        autosuggest
        editable
        allow-duplicates
      />
    </div>
  </div>
</template>

<script lang="ts">
import SmartTagz from "../components/Main.vue";
import Countries from "../test/countries";

import { defineComponent } from "vue";
const html = `  <smart-tagz
    :allow-paste="{delimiter: ','}"
    :max-tags="3"
    :sources="sources"
    :default-tags="['United Kingdom', 'Uruguay', 'Uzbekistan', 'Venezuela', 'Vietnam', 'Virgin Islands (US)', 'Yemen', 'Zambia', 'Zimbabwe']"
    input-placeholder="Select Countries ..."
    autosuggest
    editable
    allow-duplicates
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
