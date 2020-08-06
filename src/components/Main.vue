<template>
  <div class="tags-main" :style="style" @keyup.ctrl="handleSelectAll($event)">
    <Tags :tags="tagsData" :onRemove="handleRemoveTag" :onEdit="handleEditTag" :editable="editable">
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
          @paste="handlePaste"
        />
        <div class="suggestion-wrapper">
          <SuggestionPane
            :show="showSuggestions"
            :items="sources"
            :keyword="input"
            :onSelection="handleSuggestSelection"
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
    width: {
      type: String,
      default: "100%",
    },
    sources: {
      type: Array as PropType<string[]>,
      default: [],
    },
    autosuggest: {
      type: Boolean,
      default: false,
    },
    allowPaste: {
      type: Object as PropType<{ delimiter: string }>,
      default: null,
    },
    editable: {
      type: Boolean,
      default: false,
    },
    allowDuplicates: {
      type: Boolean,
      default: true,
    },
    maxTags: {
      type: Number,
      default: 10,
    },
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
}

input[type="text"] {
  border: 0;
  border-bottom: 1px solid #000;
  border-radius: 0;
  position: relative;
  outline: 0;
  font-size: 1rem;
  height: 100%;
}

.input-wrapper {
  margin-left: 0.5rem;
  position: relative;
  align-self: center;
  margin-top: 0.5rem;
  height: 100%;
  width: 200px;
}

.suggestion-wrapper {
  position: absolute;
  top: 2rem;
  width: 100%;
  z-index: 100;
  min-height: 400px;
  max-height: 500px;
  overflow-y: auto;
  overflow-x: hidden;
}
</style>