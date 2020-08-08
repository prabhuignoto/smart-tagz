<template>
  <div class="tag-container" :class="{'no-remove': !canShowRemoveBtn}" :style="style">
    <input
      type="text"
      class="tag-edit-input"
      ref="inputTextRef"
      v-if="canShowInputbox"
      v-model="input"
      @blur="handleEscape"
      @keyup.enter="handleSaveEdit"
      @keyup.esc="handleEscape"
    />
    <span class="tag-name" @dblclick="handleDoubleClick" v-else>{{tagName}}</span>
    <button @click="handleRemove(id)" v-if="canShowRemoveBtn">
      <CloseIcon />
    </button>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  PropType,
  ref,
  toRefs,
  nextTick,
  computed,
  watch,
  toRef,
} from "vue";
import CloseIcon from "./CloseIcon.vue";

export default defineComponent({
  name: "Tag",
  components: {
    CloseIcon,
  },
  props: {
    name: String,
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
    id: String,
    highlight: Boolean,
    readOnly: {
      type: Boolean,
      default: false,
    },
    tagStyle: {
      type: Object as PropType<{ foreColor: string; backgroundColor: string }>,
    },
  },
  setup(props) {
    const editMode = ref(false);
    const input = ref(props.name);
    const inputTextRef = ref(null);
    const {
      id,
      onEdit,
      onRemove,
      editable,
      readOnly,
      tagStyle,
      name
    } = props;
    // const { name: tagName } = toRefs(props);
    const tagHighlight = toRef(props, "highlight");

    const handleRemove = (id: string) => onRemove(id);
    const handleDoubleClick = () => {
      if (!editable) {
        return;
      }
      editMode.value = !editMode.value;

      nextTick(() => {
        (inputTextRef.value as HTMLElement).focus();
      });
    };

    const handleSaveEdit = () => {
      editMode.value = false;
      onEdit(id, input.value);
    };

    const handleEscape = () => {
      editMode.value = false;
    };

    const canShowInputbox = computed(
      () => editable && editMode.value && !readOnly
    );

    const canShowRemoveBtn = computed(() => !readOnly);

    const style = computed(() => {
      return {
        background: tagHighlight.value ? "#b20000" : tagStyle.backgroundColor,
        color: tagStyle.foreColor,
      };
    });

    return {
      handleRemove,
      handleDoubleClick,
      handleSaveEdit,
      handleEscape,
      editMode,
      input,
      tagName: name,
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
  filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.25));
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
  background: rgba(255, 255, 255, 0.4);
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