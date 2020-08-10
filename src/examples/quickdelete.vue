<template>
  <div class="example">
    <header>
      <h3>Quick Delete</h3>
    </header>
    <p>The quick delete function allows to select all the tags and delete them in one go. From the input box, try pressing CTR + A to select all the tags and press DEL or BACKSPACE to delete all the Tags.</p>
    <pre data-line="10">
      <code class="lang-html">{{ code }}</code>
    </pre>
    <div class="sample-view">
      <SmartTagz
        input-placeholder="Select Countries ..."
        :autosuggest="true"
        :sources="sources"
        :default-tags="['United Kingdom', 'Uruguay', 'Uzbekistan', 'Venezuela', 'Vietnam', 'Virgin Islands (US)', 'Yemen', 'Zambia', 'Zimbabwe']"
        :editable="true"
        :allow-duplicates="false"
        :allow-paste="{delimiter: ','}"
        :quick-delete="true"
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
    :quick-delete="true"
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