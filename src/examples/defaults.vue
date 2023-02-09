<template>
  <div class="example">
    <header>
      <h3>Default Tags</h3>
    </header>
    <p>
      We can initialize smart-tagz with a set of default tags. This setting will
      can be used along with the readonly prop to create tags for display only
      purposes.
    </p>
    <pre data-line="3-3">
      <code class="lang-html">{{ code }}</code>
    </pre>
    <div class="sample-view">
      <smart-tagz
        input-placeholder="Select Countries ..."
        :class-names="{
          wrapper: 'tags_wrapper_custom',
          tag_name: 'tag_name_custom',
          tag_container: 'tag_container_custom',
          tag_close_btn: 'tag_close_btn_custom',
        }"
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

import { defineComponent } from "vue";
const html = `  <smart-tagz
    input-placeholder="Select Countries ..."
    :default-tags="['United Kingdom', 'Uruguay', 'Uzbekistan', 'Venezuela', 'Vietnam', 'Virgin Islands (US)', 'Yemen', 'Zambia', 'Zimbabwe']"
  />`;

export default defineComponent({
  name: "Defaults",
  components: {
    SmartTagz,
  },
  data() {
    return {
      code: html,
    };
  },
});
</script>
