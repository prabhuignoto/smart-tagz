<template>
  <div
    v-if="showPane"
    class="suggest-pane-container"
  >
    <div
      v-if="items.length > 0"
      class="suggest-pane-wrapper"
    >
      <div class="suggest-pane-header">
        {{ items.length }} {{ items.length === 1 ? 'result' : 'results' }}
      </div>
      <ul
        ref="paneRef"
        class="suggest-pane"
        :style="{ background: paneStyle.bgColor }"
        role="listbox"
        aria-label="Tag suggestions"
        tabindex="0"
      >
        <li
          v-for="(item, index) of items"
          :id="`suggestion-${index}`"
          :key="item"
          class="suggest-pane-item"
          :class="{ 'suggest-pane-item--selected': index === selectedIndex }"
          role="option"
          :aria-selected="index === selectedIndex"
          :title="item"
          @mousedown="handleSelection(item)"
        >
          <span
            class="suggest-match"
            v-html="highlightMatch(item, keyword)"
          />
        </li>
      </ul>
    </div>
    <!-- Empty state when no results found -->
    <div
      v-else
      class="suggest-pane-empty"
      :style="{ background: paneStyle.bgColor }"
    >
      <div class="suggest-pane-empty__text">No matches found for "{{ keyword }}"</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from 'vue'

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

    // Watch for show prop changes
    watch(
      () => props.show,
      (newValue) => {
        showPane.value = newValue
      }
    )

    // Handle Enter key to select item
    const handleEnter = (event: KeyboardEvent) => {
      event.preventDefault()
      const selectedItem = props.items[props.selectedIndex]
      if (selectedItem) {
        handleSelection(selectedItem)
      }
    }

    // Highlight matching text in search results
    const highlightMatch = (text: string, query: string): string => {
      if (!query) return text

      // Escape special regex characters and create case-insensitive pattern
      const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
      const regex = new RegExp(`(${escapedQuery})`, 'gi')

      return text.replace(regex, '<mark>$1</mark>')
    }

    return {
      handleSelection,
      handleEnter,
      showPane,
      paneRef,
      highlightMatch,
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
  transition: box-shadow 0.15s ease-in-out;

  &:focus-visible {
    outline: 2px solid rgb(255 255 255 / 50%);
    outline-offset: -2px;
  }
}

.suggest-pane-wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.suggest-pane-header {
  padding: var(--spacing-base) var(--spacing-lg);
  color: var(--color-white);
  font-size: 0.85rem;
  font-weight: 600;
  opacity: 0.8;
  border-bottom: 1px solid rgb(255 255 255 / 20%);
}

.suggest-pane-empty {
  width: 100%;
  padding: var(--spacing-lg);
  margin: 0;
  border-radius: var(--border-radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100px;
}

.suggest-pane-empty__text {
  color: var(--color-white);
  font-size: var(--font-size-sm);
  opacity: 0.7;
  text-align: center;
  font-style: italic;
}

.suggest-pane-item {
  @include flex-row(center, flex-start);
  @include text-truncate;
  @include transition-fast(background);

  width: 100%;
  padding: var(--spacing-md) 0;
  padding-left: var(--spacing-md);
  color: var(--color-white);
  font-size: 0.9rem;
  cursor: pointer;
  border-left: 3px solid transparent;
  transition: all 0.15s ease-in-out;

  span {
    padding-left: var(--spacing-md);
  }

  &:hover {
    background: var(--overlay-white-subtle);
  }

  &--selected {
    background: var(--overlay-white-subtle);
    border-left-color: rgb(255 255 255 / 80%);
    font-weight: 600;
  }

  mark {
    background-color: rgb(255 255 100 / 40%);
    color: inherit;
    font-weight: 700;
    padding: 0 2px;
    border-radius: 2px;
  }
}
</style>
