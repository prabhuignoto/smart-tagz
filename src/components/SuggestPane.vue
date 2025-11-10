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
        :class="{ 'suggest-pane-item--selected': index === selectedIndex }"
        @mousedown="handleSelection(item)"
      >
        <span>{{ item }}</span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, watch, ref } from 'vue'

export default defineComponent({
  name: 'SuggestPane',
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
    paneStyle: {
      type: Object as PropType<{ bgColor: string }>,
      default: () => ({
        bgColor: '',
      }),
    },
    selectedIndex: {
      type: Number,
      default: -1,
    },
  },
  setup(props) {
    const showPane = ref(false)
    const handleSelection = (name: string) => props.onSelection && props.onSelection(name)
    const paneRef = ref(null)

    const handleEnter = (event: KeyboardEvent) => {
      event.preventDefault()
      event.stopImmediatePropagation()

      const item = props.items[props.selectedIndex]
      if (item) {
        handleSelection(item)
      }
    }

    watch(
      () => props.show,
      (newValue) => {
        if (newValue) {
          showPane.value = true
        } else {
          showPane.value = false
        }
      }
    )

    return {
      handleSelection,
      showPane,
      paneRef,
      handleEnter,
    }
  },
})
</script>

<style lang="scss" scoped>
@use '@/styles' as *;

.suggest-pane {
  width: 100%;
  padding: 0;
  margin: 0;
  border-radius: var(--border-radius-sm);
  list-style: none;
  outline: none;
}

.suggest-pane-item {
  @include flex-row(center, flex-start);
  @include text-truncate;
  @include transition-fast(background);

  width: 100%;
  padding: var(--spacing-md) 0;
  color: var(--color-white);
  font-size: var(--font-size-sm);
  cursor: pointer;

  span {
    padding-left: var(--spacing-md);
  }

  &:hover,
  &--selected {
    background: var(--overlay-white-subtle);
  }
}
</style>
