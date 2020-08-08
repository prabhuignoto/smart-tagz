<template>
  <div class="suggest-pane-container" v-if="showPane">
    <ul
      class="suggest-pane"
      ref="paneRef"
      :style="{'background-color': paneStyle.bgColor}"
      @keydown.down="handleKeydown($event)"
      @keydown.up="handleKeyup($event)"
      @keyup.enter="handleEnter"
      @keyup.esc="handleEsc"
      @blur="handleEsc"
      tabindex="0"
    >
      <li
        v-for="(item, index) of filteredItems"
        :key="item"
        @click="handleSelection(item)"
        class="suggest-pane-item"
        :class="{selected: index === activeSelection}"
      >
        <span>{{item}}</span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  PropType,
  watch,
  toRefs,
  computed,
  ref,
  unref,
} from "vue";

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
    onPaneEsc: {
      type: Function as PropType<() => void>,
    },
    keyword: {
      type: String,
      required: true,
    },
    focus: {
      type: Boolean,
      required: true,
    },
    paneStyle: {
      type: Object as PropType<{ bgColor: string }>,
    },
  },
  setup(props) {
    const { onSelection, onPaneEsc } = props;
    const showPane = ref(false);
    const { keyword } = toRefs<{
      keyword: string;
    }>(props);
    const localItems = ref(props.items.slice(0));
    const handleSelection = (name: string) => onSelection(name);
    const activeSelection = ref<number | null>(null);
    const paneRef = ref(null);

    const filteredItems = computed(() => {
      const reg = new RegExp("^" + keyword.value, "i");
      return localItems.value.filter((f) => reg.test(f));
    });

    const handleKeydown = () => {
      const items = unref(filteredItems);
      const actvSelection = unref(activeSelection);

      if (items.length - 1 > actvSelection) {
        activeSelection.value += 1;
      } else {
        activeSelection.value = 0;
      }
    };

    const handleKeyup = (event: KeyboardEvent) => {
      event.preventDefault();
      event.stopImmediatePropagation();

      const items = unref(filteredItems);
      const actvSelection = unref(activeSelection);

      if (actvSelection > 0) {
        activeSelection.value -= 1;
      } else {
        activeSelection.value = items.length - 1;
      }
    };

    const handleEnter = (event: KeyboardEvent) => {
      event.preventDefault();
      event.stopImmediatePropagation();

      const currentSelection = unref(activeSelection);
      const items = unref(filteredItems);
      const item = items[currentSelection];
      activeSelection.value = null;
      handleSelection(item);
    };

    const handleEsc = () => {
      activeSelection.value = null;
      showPane.value = false;
      onPaneEsc();
    };

    watch(
      () => props.focus,
      (newValue) => {
        if (newValue) {
          (paneRef.value as HTMLElement).focus();
          activeSelection.value = 0;
        }
      }
    );

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
      filteredItems,
      showPane,
      paneRef,
      activeSelection,
      handleKeydown,
      handleKeyup,
      handleEnter,
      handleEsc,
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
    background: rgba($color: #fff, $alpha: 0.2);
  }

  &.selected {
    background: #73a0d0;
  }
}
</style>