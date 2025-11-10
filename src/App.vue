<template>
  <div class="demo-wrapper">
    <demo />
  </div>
</template>

<script lang="ts">
import Demo from './components/Demo.vue'

export default {
  name: 'App',
  components: {
    Demo,
  },
}
</script>

<style lang="scss" scoped>
@use '@/styles' as *;

.demo-wrapper {
  @include flex-row(flex-start, center);

  width: 100%;
}
</style>
