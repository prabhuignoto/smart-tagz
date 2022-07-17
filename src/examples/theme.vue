<template>
  <div class="example">
    <header>
      <h3>Custom Color Scheme</h3>
    </header>
    <p>
      The components color scheme can be customized by passing a custom theme
      prop.
    </p>
    <ul>
      <li>
        primary - targets the background color of the tag and the background of
        the autosuggest dropdown.
      </li>
      <li>background - targets the background of the main container.</li>
      <li>tagTextColor - targets the forecolor of the tag.</li>
    </ul>
    <pre data-line="9-13">
      <code class="lang-html">{{ code }}</code>
    </pre>
    <div class="sample-view">
      <smart-tagz
        input-placeholder="Select Countries ..."
        autosuggest
        editable
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
        :allow-duplicates="false"
        :allow-paste="{ delimiter: ',' }"
        :theme="{
          primary: '#545454',
          background: '#bdbdbd',
          tagTextColor: '#fff',
        }"
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
  :theme="{
    primary: '#545454',
    background: '#bdbdbd',
    tagTextColor: '#fff',
  }"
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

<style lang="scss" scoped>
ul {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
</style>
