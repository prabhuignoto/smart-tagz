<template>
  <div
    v-if="showPane"
    class="suggest-pane-container"
  >
    <ul
      ref="paneRef"
      class="suggest-pane"
      :style="{ background: paneStyle.bgColor }"
      tabindex="0"
    >
      <li
        v-for="(item, index) of items"
        :key="item"
        class="suggest-pane-item"
        :class="{ selected: index === selectedIndex }"
        @mousedown="handleSelection(item)"
      >
        <span>{{ item }}</span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, watch, ref } from "vue";

export default defineComponent({
  name: "SuggestPane",
  props: {
    items: {
      type: Array as PropType<string[]>,
      default: () => [],
      required: true,
    },
    show: {
      type: Boolean,
      default: false,
    },
    // eslint-disable-next-line vue/require-default-prop
    onSelection: {
      type: Function as PropType<(name: string) => void>,
    },
    // eslint-disable-next-line vue/require-default-prop
    onPaneEsc: {
      type: Function as PropType<() => void>,
    },
    keyword: {
      type: String,
      required: true,
    },
    // eslint-disable-next-line vue/require-default-prop
    paneStyle: {
      type: Object as PropType<{ bgColor: string }>,
      default: () => ({
        bgColor: "",
      }),
    },
    selectedIndex: {
      type: Number,
      default: -1,
    },
  },
  setup(props) {
    const showPane = ref(false);
    const handleSelection = (name: string) =>
      props.onSelection && props.onSelection(name);
    const paneRef = ref(null);

    const handleEnter = (event: KeyboardEvent) => {
      event.preventDefault();
      event.stopImmediatePropagation();

      const item = props.items[props.selectedIndex];
      handleSelection(item);
    };

    watch(
      () => props.show,
      (newValue) => {
        if (newValue) {
          showPane.value = true;
        } else {
          showPane.value = false;
        }
      }
    );

    return {
      handleSelection,
      showPane,
      paneRef,
      handleEnter,
    };
  },
});
</script>


<style lang="scss" scoped>
.suggest-pane {
  border-radius: 0.2rem;
  list-style: none;
  margin: 0;
  outline: none;
  padding: 0;
  width: 100%;
}

.suggest-pane-item {
  align-items: center;
  color: #fff;
  cursor: pointer;
  display: flex;
  font-size: 0.85rem;
  justify-content: flex-start;
  overflow: hidden;
  padding: 0.4rem 0;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;

  span {
    padding-left: 0.4rem;
  }

  &:hover {
    background: rgba(#fff, 20%);
  }

  &.selected {
    background: rgba(#fff, 20%);
  }
}
</style>