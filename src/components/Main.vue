<template>
  <div class="tags-main" :style="style" @keyup.ctrl="handleSelectAll($event)">
    <Tags
      :tags="tagsData"
      :onRemove="handleRemoveTag"
      :onEdit="handleEditTag"
      :editable="editable"
      :readOnly="readOnly"
    >
      <div class="input-wrapper">
        <input
          type="text"
          v-model="input"
          ref="textInputRef"
          :placeholder="inputPlaceholder"
          @keyup.enter="handleAddTag($event.target.value)"
          @keyup.delete="handleDelete"
          @keyup.esc="handleEscape"
          @keyup.down="handleKeydown"
          @keydown.ctrl.exact="handleSelectAll($event)"
          @paste="handlePaste"
          @focus="handleFocus"
          v-if="!readOnly"
        />
        <div class="suggestion-wrapper">
          <SuggestionPane
            :show="showSuggestions"
            :items="sources"
            :keyword="input"
            :onSelection="handleSuggestSelection"
            :onPaneEsc="handleSuggestEsc"
            :focus="focusSuggestions"
          />
        </div>
      </div>
    </Tags>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  computed,
  watch,
  PropType,
  nextTick,
  unref,
} from "vue";
import Tags from "./Tags.vue";
import { nanoid } from "nanoid";
import { TagModel } from "../models";
import SuggestionPane from "./SuggestPane.vue";
import MainSetup from "./MainSetup";

export default defineComponent({
  name: "Main",
  components: {
    Tags,
    SuggestionPane,
  },
  props: {
    readOnly: {
      type: Boolean,
      default: false,
    },
    defaultTags: {
      type: Array as PropType<string[]>,
      default: [],
    },
    // container width
    width: {
      type: String,
      default: "100%",
    },
    // sources array for autosuggest
    sources: {
      type: Array as PropType<string[]>,
      default: [],
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
      default: 10,
    },
    // placeholder for the input box
    inputPlaceholder: {
      type: String,
      default: "Enter tag...",
    },
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
  background: #eaf1f8;
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
}
</style>