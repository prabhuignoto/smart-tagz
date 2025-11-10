<template>
  <div class="main-container">
    <header class="demo__header">
      <img src="../assets/logo.png" alt="logo" />
      <a
        href="https://github.com/prabhuignoto/smart-tagz"
        class="github"
        target="_new"
      >
        <span>
          <img src="../assets/github.svg" alt="github" />
        </span>
      </a>
    </header>
    <section class="demo__section">
      <p class="intro">
        A Smart input tags component built for
        <a href="https://v3.vuejs.org/guide/introduction.html">Vue 3</a>.
      </p>
    </section>
    <div>
      <div class="example-block">
        <Basic />
      </div>
      <div class="example-block">
        <Defaults />
      </div>
      <div class="example-block">
        <Editable />
      </div>
      <div class="example-block">
        <Autocomplete />
      </div>
      <div class="example-block">
        <Paste />
      </div>
      <div class="example-block">
        <ReadOnly />
      </div>
      <div class="example-block">
        <Duplicates />
      </div>
      <div class="example-block">
        <Maxtags />
      </div>
      <div class="example-block">
        <Theme />
      </div>
      <div class="example-block">
        <QuickDelete />
      </div>
    </div>
    <footer class="demo__footer">
      <a href="https://www.prabhumurthy.com" class="github" target="_new"
        >www.prabhumurthy.com</a
      >
    </footer>
  </div>
</template>

<script lang="ts">
import Countries from '../test/countries'
import Basic from '../examples/basic.vue'
import Defaults from '../examples/defaults.vue'
import Editable from '../examples/editable.vue'
import Autocomplete from '../examples/autocomplete.vue'
import Paste from '../examples/paste.vue'
import ReadOnly from '../examples/readonly.vue'
import Duplicates from '../examples/duplicates.vue'
import Maxtags from '../examples/maxtags.vue'
import Theme from '../examples/theme.vue'
import QuickDelete from '../examples/quickdelete.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Demo',
  components: {
    Basic,
    Defaults,
    Editable,
    Autocomplete,
    Paste,
    ReadOnly,
    Duplicates,
    Maxtags,
    Theme,
    QuickDelete,
  },
  data() {
    return {
      count: 0,
      sources: Countries,
    }
  },
})
</script>

<style lang="scss" scoped>
@use '@/styles' as *;

.demo__header {
  @include flex-row(center, flex-start);

  height: var(--spacing-2xl);

  h1 {
    color: var(--color-primary);
  }

  a {
    @include size(var(--spacing-xl));

    margin-left: auto;
  }
}

.example {
  width: 100%;

  &__header {
    @include flex-row(center, flex-start);

    font-weight: var(--font-weight-normal);
    font-size: var(--font-size-sm);
    text-transform: uppercase;
  }

  pre {
    display: flex;
    font-size: var(--font-size-sm);
  }

  p {
    @include flex-row(center, flex-start);

    font-weight: var(--font-weight-normal);
    text-align: left;
  }
}

.example-block {
  margin-bottom: var(--spacing-2xl);
}

.sample-view {
  width: 750px;
}

.intro {
  font-weight: var(--font-weight-medium);
}

.demo__section {
  @include flex-row(center, flex-start);
}

.main-container {
  width: 90%;

  @include respond-to('sm') {
    width: 550px;
  }

  @include respond-to('md') {
    width: 750px;
  }

  @include respond-to('lg') {
    width: 900px;
  }

  @include respond-to('xl') {
    width: 1000px;
  }

  @include respond-to('2xl') {
    width: 1250px;
  }

  @include respond-to('4k') {
    width: 1500px;
  }
}

.demo__footer {
  @include flex-center;

  margin: var(--spacing-3xl) 0;
}
</style>
