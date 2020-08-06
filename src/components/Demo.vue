<template>
  <div :style="{width: '600px'}">
    <Main
      :autosuggest="true"
      :sources="sources"
      :allowPaste="{delimiter: ';'}"
      :editable="true"
      :allowDuplicates="true"
      inputPlaceholder="Select Countries ..."
    />
  </div>
</template>

<script lang="ts">
import Main from "./Main.vue";
import { defineComponent } from "vue";
import Countries from "./countries";

export default {
  name: "Demo",
  components: {
    Main,
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
