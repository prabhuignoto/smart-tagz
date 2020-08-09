<template>
  <div :style="{width: '600px'}">
    <SmartTagz
      :autosuggest="true"
      :sources="sources"
      :allow-paste="{delimiter: ','}"
      :editable="true"
      :allow-duplicates="true"
      :max-tags="20"
      :default-tags="['United Kingdom', 'Uruguay', 'Uzbekistan', 'Venezuela', 'Vietnam', 'Virgin Islands (US)', 'Yemen', 'Zambia', 'Zimbabwe']"
      input-placeholder="Select Countries ..."
      :read-only="false"
    />
  </div>
</template>

<script lang="ts">
import SmartTagz from "./Main.vue";
import Countries from "../test/countries";

export default {
  name: "Demo",
  components: {
    SmartTagz,
  },
  data() {
    return {
      count: 0,
      sources: Countries,
    };
  },
};
</script>
