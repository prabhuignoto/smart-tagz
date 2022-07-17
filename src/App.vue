<template>
  <div class="demo-wrapper">
    <demo />
  </div>
</template>

<script lang="ts">
import Demo from "./components/Demo.vue";

export default {
  name: "App",
  components: {
    Demo,
  },
};
</script>

<style lang="scss" scoped>
.demo-wrapper {
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
}
</style>
