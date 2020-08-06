<template>
  <div class="suggest-pane-container" v-if="show">
    <ul class="suggest-pane">
      <li
        v-for="item of filteredItems"
        :key="item"
        @click="handleSelection(item)"
        class="suggest-pane-item"
      >
        <span>{{item}}</span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, watch, toRefs, computed, ref } from "vue";

export default defineComponent({
  name: "SuggestPane",
  props: {
    items: {
      type: Array as PropType<string[]>,
      default: [],
      required: true,
    },
    show: {
      type: Boolean,
      default: false,
    },
    onSelection: {
      type: Function as PropType<(name: string) => void>,
    },
    keyword: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const { onSelection } = props;
    const { keyword, show } = toRefs<{
      keyword: string;
      show: boolean;
    }>(props);
    const localItems = ref(props.items.slice(0));
    const handleSelection = (name: string) => onSelection(name);

    const filteredItems = computed(() => {
      const reg = new RegExp("^" + keyword.value, "i");
      return localItems.value.filter((f) => reg.test(f));
    });

    return {
      handleSelection,
      filteredItems,
      show,
    };
  },
});
</script>


<style lang="scss" scoped>
.suggest-pane {
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
  background: #eaf1f8;
  border-radius: 0.2rem;
}

.suggest-pane-item {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0.4rem 0;
  color: #000;
  cursor: pointer;

  span {
    padding-left: 0.4rem;
  }

  &:hover {
    background: #d6e3f1;
  }
}
</style>