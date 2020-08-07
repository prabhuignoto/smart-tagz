<template>
  <div class="tags-container">
    <Tag
      v-for="tag of localTags"
      :key="tag.id"
      :name="tag.name"
      :value="tag.value"
      :highlight="tag.highlight"
      :id="tag.id"
      :onRemove="handleRemove"
      :onEdit="handleEdit"
      :editable="editable"
    />
    <slot></slot>
  </div>
</template>

<script lang="ts">
import Tag from "./Tag.vue";
import { defineComponent, ref, PropType, watch, toRefs } from "vue";
import { TagModel, TagsPropModel } from "../models";

export default defineComponent({
  name: "Tags",
  components: {
    Tag,
  },
  props: {
    tags: {
      type: Array as PropType<TagModel[]>,
      required: true,
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
  },
  setup(props) {
    // const { tags } = toRefs(props);
    const { onRemove, onEdit } = props;

    const localTags = ref<TagModel[]>(props.tags);

    const handleRemove = (id) => onRemove(id);
    const handleEdit = (id: string, newValue: string) => onEdit(id, newValue);

    watch(
      () => props.tags,
      (newValue) => {
        localTags.value = newValue;
      }
    );

    return {
      localTags,
      handleRemove,
      handleEdit,
    };
  },
});
</script>

<style lang="scss" scoped>
.tags-container {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-wrap: wrap;
}
</style>