<template>
  <div
    class="tag-container"
    :class="{'no-remove': !canShowRemoveBtn}"
    :style="style"
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
    >
    <span
      v-else
      class="tag-name"
      @dblclick="handleDoubleClick"
    >{{ name }}</span>
    <button
      v-if="canShowRemoveBtn"
      @click="handleRemove(id)"
    >
      <CloseIcon />
    </button>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  PropType,
  ref,
  nextTick,
  computed,
  toRef,
} from "vue";
import CloseIcon from "./CloseIcon.vue";

export default defineComponent({
  name: "SmartTag",
  components: {
    CloseIcon,
  },
  props: {
    name: {
      type: String,
      default: "",
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
        foreColor: "",
        backgroundColor: "",
      }),
    },
  },
  setup(props) {
    const editMode = ref(false);
    const input = ref(props.name);
    const inputTextRef = ref<HTMLInputElement>();
    const tagHighlight = toRef(props, "highlight");

    const handleRemove = (id: string) => props.onRemove(id);
    const handleDoubleClick = () => {
      if (!props.editable || props.readOnly) {
        return;
      }
      editMode.value = !editMode.value;

      nextTick(() => {
        (inputTextRef.value as HTMLElement).focus();
      });
    };

    const handleSaveEdit = () => {
      editMode.value = false;
      props.onEdit(props.id, input.value);
    };

    const handleEscape = () => {
      editMode.value = false;
    };

    const canShowInputbox = computed(
      () => props.editable && editMode.value && !props.readOnly
    );

    const canShowRemoveBtn = computed(() => !props.readOnly);

    const style = computed(() => {
      return {
        background: tagHighlight.value
          ? "#b20000"
          : props.tagStyle.backgroundColor,
        color: props.tagStyle.foreColor,
      };
    });

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
    };
  },
});
</script>

<style lang="scss" scoped>
.tag-container {
  align-items: center;
  border-radius: 0.2rem;
  display: flex;
  filter: drop-shadow(2px 2px 4px rgb(26 15 15 / 25%));
  justify-content: center;
  margin: 0.4rem 0.25rem;
  padding: 0.4rem 0.1rem 0.4rem 0.4rem;
  user-select: none;

  &.highlight {
    background-color: #b20000;
  }

  &.no-remove {
    padding-right: 0.5rem;
  }
}

.tag-name {
  font-size: 1rem;
}

.tag-edit-input {
  width: 0;
  min-width: 100px;
  outline: 0;
  border: 0;
  background: rgb(255 255 255 / 40%);
  font-size: 0.85rem;
}

button {
  align-items: center;
  justify-content: center;
  background: #fff;
  border-radius: 50%;
  border: 0;
  display: flex;
  height: 1rem;
  margin-left: 0.5rem;
  margin-right: 0.2rem;
  outline: none;
  width: 1rem;
  padding: 0;
  cursor: pointer;
}
</style>