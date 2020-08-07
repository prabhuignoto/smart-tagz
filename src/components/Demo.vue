<template>
  <div :style="{width: '600px'}">
    <SmartTagz
      :autosuggest="true"
      :sources="sources"
      :allowPaste="{delimiter: ','}"
      :editable="true"
      :allowDuplicates="false"
      :maxTags="20"
      :defaultTags="['United Kingdom', 'Uruguay', 'Uzbekistan', 'Venezuela', 'Vietnam', 'Virgin Islands (US)', 'Yemen', 'Zambia', 'Zimbabwe']"
      inputPlaceholder="Select Countries ..."
    />
  </div>
</template>

<script lang="ts">
import SmartTagz from "./Main.vue";
import { defineComponent } from "vue";
import Countries from "./countries";

export default {
  name: "Demo",
  components: {
    SmartTagz,
  },
  props: {
    msg: String,
  },
  data() {
    return {
      count: 0,
      sources: Countries,
    };
  },
};
</script>
