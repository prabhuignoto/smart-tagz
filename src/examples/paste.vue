<template>
  <div class="example">
    <header>
      <h3>Paste</h3>
    </header>
    <p>
      The component can parse strings and automatically create tags for you. The default delimiter is "," but you can change this setting by manually setting the delimiter option.
      Try pasting the following delimited string into the input box.
    </p>
    <code class="lang-html">France;Germany;Poland</code>
    <pre data-line="7">
      <code class="lang-html">{{ code }}</code>
    </pre>
    <div class="sample-view">
      <SmartTagz
        input-placeholder="Select Countries ..."
        :autosuggest="true"
        :sources="sources"
        :default-tags="['United Kingdom', 'Uruguay', 'Uzbekistan', 'Venezuela']"
        :editable="true"
        :allow-paste="{delimiter: ';'}"
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
    :default-tags="['United Kingdom', 'Uruguay', 'Uzbekistan', 'Venezuela']"
    :editable="true"
    :allow-paste="{delimiter: ';'}"
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
});
</script>