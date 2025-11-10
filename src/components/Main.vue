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
          @keyup.enter="handleAddTag(($event.target as HTMLInputElement).value.trim())"
          @keyup.delete="handleDelete"
          @keyup.esc="handleEscape"
          @keydown.down="handleKeydown"
          @keydown.up="handleKeyUp"
          @keydown.ctrl.exact="handleSelectAll"
          @paste="handlePaste"
          @blur="handleEscape"
        />
        <div
          class="suggestion-wrapper"
          :class="{ 'suggestion-wrapper--hidden': !showSuggestions }"
        >
          <SuggestionPane
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
}

.tags-main__input {
  height: 100%;
  padding: 0;
  border: 0;
  border-bottom: var(--border-width-thin) solid var(--color-black);
  border-radius: 0;
  background: transparent;
  font-size: var(--font-size-base);
  outline: 0;
  position: relative;
}

.input-wrapper {
  position: relative;
  width: 200px;
  height: 100%;
  margin-top: var(--spacing-base);
  margin-left: var(--spacing-base);
  align-self: center;
}

.suggestion-wrapper {
  @include absolute($top: var(--spacing-xl));
  @include drop-shadow(var(--overlay-black-medium), 2px, 2px, 10px);

  width: 100%;
  min-height: 400px;
  max-height: 500px;
  overflow: hidden auto;
  z-index: var(--z-index-dropdown);

  &--hidden {
    visibility: hidden;
  }
}
</style>
