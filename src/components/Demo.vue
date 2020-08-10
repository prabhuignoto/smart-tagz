<template>
  <div class="main-container">
    <header>
      <img src="../assets/logo.png">
      <a
        href="https://github.com/prabhuignoto/smart-tagz"
        class="github"
        target="_new"
      >
        <span>
          <img src="../assets/github.svg">
        </span>
      </a>
    </header>
    <section>
      <p>
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
    </div>
    <footer>
      <a
        href="https://www.prabhumurthy.com"
        class="github"
        target="_new"
      >www.prabhumurthy.com</a>
    </footer>
  </div>
</template>

<script lang="ts">
import Countries from "../test/countries";
import Basic from "../examples/basic.vue";
import Defaults from "../examples/defaults.vue";
import Editable from "../examples/editable.vue";
import Autocomplete from "../examples/autocomplete.vue";
import Paste from "../examples/paste.vue";
import ReadOnly from "../examples/readonly.vue";
import Duplicates from "../examples/duplicates.vue";
import Maxtags from "../examples/maxtags.vue";
import Theme from "../examples/theme.vue";

export default {
  name: "Demo",
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
  },
  data() {
    return {
      count: 0,
      sources: Countries,
    };
  },
};
</script>

<style lang="scss">
.example {
  width: 100%;

  header {
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }

  pre {
    display: flex;
    font-size: 0.85rem;
  }

  p {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    text-align: left;
  }
}

.example-block {
  margin-bottom: 3rem;
}

.sample-view {
  width: 750px;
}

header {
  display: flex;
  align-items: center;

  h1 {
    color: #6093ca;
  }

  a {
    width: 2rem;
    height: 2rem;
    margin-left: auto;
  }
}

section {
  display: flex;
  align-items: center;
}

.main-container {
  width: 90%;
}

@media (min-width: 576px) {
  .main-container {
    width: 550px;
  }
}

// Medium devices (tablets, 768px and up)
@media (min-width: 768px) {
  .main-container {
    width: 750px;
  }
}

// Large devices (desktops, 992px and up)
@media (min-width: 992px) {
  .main-container {
    width: 900px;
  }
}

// Extra large devices (large desktops, 1200px and up)
@media (min-width: 1200px) {
  .main-container {
    width: 1000px;
  }
}

@media (min-width: 1440px) {
  .main-container {
    width: 1250px;
  }
}

@media (min-width: 2560px) {
  .main-container {
    width: 1500px;
  }
}

footer {
  margin: 4rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
