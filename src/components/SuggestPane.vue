<template>
  <div class="suggest-pane-container" v-if="show">
    <ul
      class="suggest-pane"
      ref="paneRef"
      @keyup.down="handleKeydown"
      @keyup.up="handleKeyup"
      @keyup.enter="handleEnter"
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
  nextTick,
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
    keyword: {
      type: String,
      required: true,
    },
    focus: {
      type: Boolean,
      required: true,
    },
  },
  setup(props) {
    const { onSelection } = props;
    const { keyword, show, focus } = toRefs<{
      keyword: string;
      show: boolean;
      focus: boolean;
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

    const handleKeyup = () => {
      const items = unref(filteredItems);
      const actvSelection = unref(activeSelection);

      if (actvSelection > 0) {
        activeSelection.value -= 1;
      } else {
        activeSelection.value = items.length - 1;
      }
    };

    const handleEnter = () => {
      const currentSelection = unref(activeSelection);
      const items = unref(filteredItems);
      const item = items[currentSelection];
      activeSelection.value = null;
      handleSelection(item);
    };

    watch(focus, (newValue) => {
      if (newValue) {
        (paneRef.value as HTMLElement).focus();
        activeSelection.value = 0;
      }
    });

    return {
      handleSelection,
      filteredItems,
      show,
      paneRef,
      activeSelection,
      handleKeydown,
      handleKeyup,
      handleEnter,
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
  outline: none;
}

.suggest-pane-item {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0.4rem 0;
  color: #000;
  cursor: pointer;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 0.85rem;

  span {
    padding-left: 0.4rem;
  }

  &:hover {
    background: #d6e3f1;
  }

  &.selected {
    background: #d6e3f1;
  }
}
</style>