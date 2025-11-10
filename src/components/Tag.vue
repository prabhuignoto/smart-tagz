<template>
  <div
    class="tag-container"
    :class="[
      !canShowRemoveBtn ? 'tag-container--no-remove' : '',
      classNames.container,
      { 'tag-container--highlight': highlight },
    ]"
    :style="style"
    :aria-label="highlight ? `${name} - Press Delete again to remove` : name"
  >
    <input
      v-if="canShowInputbox"
      ref="inputTextRef"
      v-model="input"
      type="text"
      class="tag-edit-input"
      @blur="handleEscape"
      @keyup.enter="handleSaveEdit"
      @keyup.esc="handleEscape"
    />
    <span
      v-else
      :class="['tag-name', classNames.name]"
      @dblclick="handleDoubleClick"
    >
      {{ name }}
      <span
        v-if="highlight"
        class="tag-name__delete-hint"
      >
        (Press Delete to remove)
      </span>
    </span>
    <button
      v-if="canShowRemoveBtn"
      type="button"
      class="tag-container__button"
      :class="classNames.closeButton"
      @click="handleRemove(id)"
    >
      <CloseIcon />
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, nextTick, computed, toRef } from 'vue'
import CloseIcon from './CloseIcon.vue'
import { TagClass } from '../models'

export default defineComponent({
  name: 'SmartTag',
  components: {
    CloseIcon,
  },
  props: {
    name: {
      type: String,
      default: '',
    },
    classNames: {
      type: Object as PropType<TagClass>,
      default: () => ({
        container: 'tag_container',
        name: 'tag_name',
        closeButton: 'tag_close_btn',
      }),
    },
    onRemove: {
      type: Function as PropType<(id: string) => void>,
      required: true,
    },
    onEdit: {
      type: Function as PropType<(id: string, newValue: string) => void>,
      required: true,
    },
    editable: {
      type: Boolean,
      default: false,
    },
    id: {
      type: String,
      default: null,
    },
    highlight: Boolean,
    readOnly: {
      type: Boolean,
      default: false,
    },
    tagStyle: {
      type: Object as PropType<{ foreColor: string; backgroundColor: string }>,
      default: () => ({
        foreColor: '',
        backgroundColor: '',
      }),
    },
  },
  setup(props) {
    const editMode = ref(false)
    const input = ref(props.name)
    const inputTextRef = ref<HTMLInputElement>()
    const tagHighlight = toRef(props, 'highlight')

    const handleRemove = (id: string) => props.onRemove(id)
    const handleDoubleClick = () => {
      if (!props.editable || props.readOnly) {
        return
      }
      editMode.value = !editMode.value

      nextTick(() => {
        inputTextRef.value?.focus()
      })
    }

    const handleSaveEdit = () => {
      editMode.value = false
      props.onEdit(props.id, input.value)
    }

    const handleEscape = () => {
      editMode.value = false
    }

    const canShowInputbox = computed(() => props.editable && editMode.value && !props.readOnly)

    const canShowRemoveBtn = computed(() => !props.readOnly)

    const style = computed(() => {
      return {
        background: tagHighlight.value ? '#b20000' : props.tagStyle.backgroundColor,
        color: props.tagStyle.foreColor,
      }
    })

    return {
      handleRemove,
      handleDoubleClick,
      handleSaveEdit,
      handleEscape,
      editMode,
      input,
      inputTextRef,
      canShowInputbox,
      canShowRemoveBtn,
      style,
    }
  },
})
</script>

<style lang="scss" scoped>
@use '@/styles' as *;

.tag-container {
  @include flex-center;
  @include drop-shadow(var(--shadow-tag));

  border-radius: var(--border-radius-sm);
  margin: var(--spacing-md) var(--spacing-sm);
  padding: var(--spacing-md) var(--spacing-2xs) var(--spacing-md) var(--spacing-md);
  user-select: none;
  transition: all 0.2s ease-in-out;

  &--no-remove {
    padding-right: var(--spacing-base);
  }

  &--highlight {
    border: 2px solid rgb(255 255 255 / 60%);
    box-shadow: 0 0 0 2px rgb(255 255 255 / 30%);
  }
}

.tag-name {
  font-size: var(--font-size-base);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--spacing-sm);

  &__delete-hint {
    font-size: 0.75rem;
    font-weight: 600;
    opacity: 0.9;
    font-style: italic;
  }
}

.tag-edit-input {
  width: 0;
  min-width: 100px;
  padding: 0;
  border: 0;
  background: var(--overlay-white-medium);
  font-size: var(--font-size-sm);
  transition: box-shadow 0.15s ease-in-out;

  &:focus-visible {
    outline: 2px solid rgb(255 255 255 / 80%);
    outline-offset: 2px;
  }
}

.tag-container__button {
  @include flex-center;

  width: 24px;
  height: 24px;
  padding: 10px; // Creates 44px touch target: 24px + (10px * 2)
  margin-right: var(--spacing-xs);
  margin-left: var(--spacing-base);
  background: var(--color-white);
  border: 0;
  border-radius: 50%;
  cursor: pointer;
  transition: all var(--transition-fast);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  &:hover {
    opacity: 0.8;
  }

  &:focus-visible {
    outline: 2px solid rgb(0 0 0 / 30%);
    outline-offset: 2px;
  }

  &:active {
    transform: scale(0.95);
  }

  @media (width <= 768px) {
    width: 28px;
    height: 28px;
    padding: 8px; // Creates 44px touch target: 28px + (8px * 2)
  }

  /* Scale the icon inside to maintain visual consistency */
  :deep(svg) {
    width: 16px;
    height: 16px;
  }
}
</style>
