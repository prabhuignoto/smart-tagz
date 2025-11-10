<template>
  <div
    :class="['tags-main', classNames.wrapper]"
    :style="{ background: theme.background }"
    @keyup.ctrl="handleSelectAll"
  >
    <SmartTags
      :tags="tagsData"
      :on-remove="handleRemoveTag"
      :on-edit="handleEditTag"
      :editable="editable"
      :read-only="readOnly"
      :tag-style="{
        foreColor: theme.tagTextColor,
        backgroundColor: theme.primary,
      }"
      :class-names="{
        container: classNames.tag_container ?? '',
        name: classNames.tag_name ?? '',
        closeButton: classNames.tag_close_btn ?? '',
      }"
    >
      <!-- Error message display -->
      <transition name="error-message">
        <div
          v-if="errorMessage"
          class="error-message"
        >
          {{ errorMessage }}
        </div>
      </transition>

      <div
        v-if="tagsData.length < maxTags"
        class="input-wrapper"
      >
        <input
          v-if="!readOnly"
          ref="textInputRef"
          v-model="input"
          type="text"
          class="tags-main__input"
          :placeholder="inputPlaceholder"
          role="combobox"
          :aria-expanded="showSuggestions"
          aria-autocomplete="list"
          aria-controls="suggestions-listbox"
          :aria-activedescendant="selectedIndex >= 0 ? `suggestion-${selectedIndex}` : ''"
          :aria-label="`Add tags${maxTags ? ` (${tagsData.length} of ${maxTags})` : ''}`"
          @keyup.enter="handleAddTag(($event.target as HTMLInputElement).value.trim())"
          @keyup.delete="handleDelete"
          @keyup.esc="handleEscape"
          @keydown.down="handleKeydown"
          @keydown.up="handleKeyUp"
          @keydown.home="handleHome"
          @keydown.end="handleEnd"
          @keydown.tab="handleTab"
          @keydown.ctrl.exact="handleSelectAll"
          @paste="handlePaste"
          @blur="handleEscape"
        />
        <div
          class="suggestion-wrapper"
          :class="{ 'suggestion-wrapper--hidden': !showSuggestions }"
        >
          <SuggestionPane
            id="suggestions-listbox"
            :show="showSuggestions"
            :items="filteredItems"
            :keyword="input"
            :on-selection="handleSuggestSelection"
            :on-pane-esc="handleSuggestEsc"
            :pane-style="{ bgColor: theme.primary }"
            :selected-index="selectedIndex"
            :focus="false"
          />
        </div>
        <!-- Live region for accessibility announcements -->
        <div
          role="status"
          aria-live="polite"
          aria-atomic="true"
          class="sr-only"
        >
          {{ announcement }}
        </div>
      </div>
    </SmartTags>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import SmartTags from './Tags.vue'
import SuggestionPane from './SuggestPane.vue'
import MainSetup from './MainSetup'

export default defineComponent({
  name: 'SmartTagz',
  components: {
    SmartTags,
    SuggestionPane,
  },
  props: {
    readOnly: {
      type: Boolean,
      default: false,
    },
    classNames: {
      type: Object as PropType<{
        main?: string
        wrapper?: string
        tag_container?: string
        tag_name?: string
        tag_close_btn?: string
      }>,
      default: () => ({
        wrapper: 'tags_wrapper_custom',
        tag_name: 'tag_name_custom',
        tag_container: 'tag_container_custom',
        tag_close_btn: 'tag_close_btn_custom',
      }),
    },
    defaultTags: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
    // container width
    width: {
      type: String,
      default: '100%',
    },
    // sources array for autosuggest
    sources: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
    // switch to enable autosuggest
    autosuggest: {
      type: Boolean,
      default: false,
    },
    // prop to enbale text paste
    allowPaste: {
      type: Object as PropType<{ delimiter: string }>,
      default: null,
    },
    // makes the tag editable
    editable: {
      type: Boolean,
      default: false,
    },
    // prop to control duplicates in the list
    allowDuplicates: {
      type: Boolean,
      default: true,
    },
    // maximum number of tags allowed
    maxTags: {
      type: Number,
      default: 20,
    },
    // placeholder for the input box
    inputPlaceholder: {
      type: String,
      default: 'Enter tag...',
    },
    quickDelete: {
      type: Boolean,
      default: false,
    },
    onChanged: {
      type: Function as PropType<(res: string[]) => void>,
      default: null,
    },
    theme: {
      type: Object as PropType<{
        primary: string
        background?: string
        secondary?: string
        tagTextColor: string
      }>,
      default: () => ({
        primary: '#6093ca',
        background: '#eaf1f8',
        tagTextColor: '#fff',
      }),
    },
  },
  setup: MainSetup,
})
</script>

<style lang="scss" scoped>
@use '@/styles' as *;

.tags-main {
  @include flex-row(center, flex-start);

  flex-wrap: wrap;
  padding: var(--spacing-lg);
  border-radius: var(--border-radius-sm);
  gap: var(--spacing-md);

  @media (width <= 768px) {
    flex-direction: column;
    padding: var(--spacing-md);
    gap: var(--spacing-md);
  }
}

.tags-main__input {
  height: 100%;
  padding: 0;
  border: 0;
  border-bottom: var(--border-width-thin) solid var(--color-black);
  border-radius: 0;
  background: transparent;
  font-size: var(--font-size-base);
  position: relative;
  transition: border-color 0.15s ease-in-out;

  &:focus-visible {
    outline: 2px solid var(--color-primary, #6093ca);
    outline-offset: 2px;
    border-bottom-color: var(--color-primary, #6093ca);
  }
}

.input-wrapper {
  position: relative;
  width: 200px;
  height: 100%;
  margin-top: var(--spacing-base);
  margin-left: var(--spacing-base);
  align-self: center;

  @media (width <= 768px) {
    width: 100%;
    min-height: 44px; // Minimum touch target height
    margin-top: var(--spacing-md);
    margin-left: 0;
  }
}

.suggestion-wrapper {
  @include absolute($top: var(--spacing-xl));
  @include drop-shadow(var(--overlay-black-medium), 2px, 2px, 10px);

  width: 100%;
  min-height: auto;
  max-height: min(500px, 80vh);
  overflow: hidden auto;
  z-index: var(--z-index-dropdown);
  transition: max-height 0.2s ease-in-out;

  &--hidden {
    visibility: hidden;
  }

  @media (width <= 768px) {
    max-height: min(300px, 60vh);
  }
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
  border-width: 0;
}

.error-message {
  padding: var(--spacing-base) var(--spacing-lg);
  margin-bottom: var(--spacing-md);
  background-color: #fee2e2;
  color: #991b1b;
  border-left: 4px solid #dc2626;
  border-radius: var(--border-radius-sm);
  font-size: var(--font-size-sm);
  font-weight: 500;
}

.error-message-enter-active,
.error-message-leave-active {
  transition: all 0.3s ease-in-out;
}

.error-message-enter-from,
.error-message-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
