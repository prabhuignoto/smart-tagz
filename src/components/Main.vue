<template>
  <div
    class="tags-main"
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
          :maxlength="maxlengthInput"
          :placeholder="inputPlaceholder"
          @keyup.enter="handleAddTag($event.target.value.trim())"
          @keyup.delete="handleDelete"
          @keyup.esc="handleEscape"
          @keydown.down="handleKeydown"
          @keydown.up="handleKeyUp"
          @keydown.ctrl.exact="handleSelectAll"
          @paste="handlePaste"
          @blur="handleEscape"
        >
        <div
          class="suggestion-wrapper"
          :class="{ hidden: !showSuggestions }"
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
import { defineComponent, PropType } from "vue";
import SmartTags from "./Tags.vue";
import SuggestionPane from "./SuggestPane.vue";
import MainSetup from "./MainSetup";

export default defineComponent({
  name: "SmartTagz",
  components: {
    SmartTags,
    SuggestionPane,
  },
  props: {
    readOnly: {
      type: Boolean,
      default: false,
    },
    defaultTags: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
    // container width
    width: {
      type: String,
      default: "100%",
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
      default: "Enter tag...",
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
        primary: string;
        secondary: string;
        tagTextColor: string;
      }>,
      default: () => ({
        primary: "#6093ca",
        background: "#eaf1f8",
        tagTextColor: "#fff",
      }),
    },
    maxlengthInput:{
      type: Number,
      default: -1,
    }
  },
  setup: MainSetup,
});
</script>

<style lang="scss" scoped>
.tags-main {
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding: 1rem;
  border-radius: 0.2rem;
}

input[type="text"] {
  border-radius: 0;
  border: 0;
  border-bottom: 1px solid #000;
  font-size: 1rem;
  height: 100%;
  outline: 0;
  position: relative;
  background: transparent;
}

.input-wrapper {
  align-self: center;
  height: 100%;
  margin-left: 0.5rem;
  margin-top: 0.5rem;
  position: relative;
  width: 200px;
}

.suggestion-wrapper {
  max-height: 500px;
  min-height: 400px;
  overflow-x: hidden;
  overflow-y: auto;
  position: absolute;
  top: 2rem;
  width: 100%;
  z-index: 100;
  filter: drop-shadow(2px 2px 10px rgb(0 0 0 / 40%));

  &.hidden {
    visibility: hidden;
  }
}
</style>