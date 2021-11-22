<template>
  <div class="example">
    <header>
      <h3>Paste</h3>
    </header>
    <p>
      The component can parse delimited input strings and automatically create
      tags for you. The default delimiter is "," but you can change this by
      manually setting the delimiter option. Try pasting the following delimited
      string into the input box.
    </p>
    <code class="lang-html">France;Germany;Poland</code>
    <pre data-line="4">
      <code class="lang-html">{{ code }}</code>
    </pre>
    <div class="sample-view">
      <smart-tagz
        :sources="sources"
        :default-tags="['United Kingdom', 'Uruguay', 'Uzbekistan', 'Venezuela']"
        :allow-paste="{ delimiter: ';' }"
        input-placeholder="Select Countries ..."
        autosuggest
        editable
        :on-changed="onChanged"
      />
    </div>
  </div>
</template>


<script lang="ts">
import SmartTagz from "../components/Main.vue";
import Countries from "../test/countries";

import { defineComponent } from "vue";

const html = `  <smart-tagz
    :sources="sources"
    :default-tags="['United Kingdom', 'Uruguay', 'Uzbekistan', 'Venezuela']"
    :allow-paste="{delimiter: ';'}"
    input-placeholder="Select Countries ..."
    autosuggest
    editable
  />`;

export default defineComponent({
  name: "Paste",
  components: {
    SmartTagz,
  },
  data() {
    return {
      code: html,
      sources: Countries,
    };
  },
  methods: {
    onChanged(tags: string[]) {
      console.log("tags changed", tags);
    },
  },
});
</script>