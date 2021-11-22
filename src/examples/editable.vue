<template>
  <div class="example">
    <header>
      <h3>Editable Tags</h3>
    </header>
    <p>
      The tags are not editable by default, but this setting can be changed with
      the editable prop. Double click the tag to get into edit mode, make your
      changes and hit enter to save.
    </p>
    <pre data-line="4">
      <code class="lang-html">{{ code }}</code>
    </pre>
    <div class="sample-view">
      <smart-tagz
        input-placeholder="Select Countries ..."
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
        :on-changed="handleChange"
        editable
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
    editable
  />`;

export default defineComponent({
  name: "Editable",
  components: {
    SmartTagz,
  },
  data() {
    return {
      code: html,
    };
  },
  methods: {
    handleChange(tags) {
      console.log("tags changed", tags);
    },
  },
});
</script>