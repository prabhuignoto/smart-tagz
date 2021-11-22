<template>
  <div class="tags-container">
    <transition-group name="tags-list">
      <SmartTag
        v-for="tag of localTags"
        :id="tag.id"
        :key="tag.id"
        :highlight="tag.highlight"
        :name="tag.name"
        :value="tag.value"
        :on-remove="handleRemove"
        :on-edit="handleEdit"
        :editable="editable"
        :read-only="readOnly"
        :tag-style="tagStyle"
      />
    </transition-group>
    <slot />
  </div>
</template>

<script lang="ts">
import SmartTag from "./Tag.vue";
import { defineComponent, ref, PropType, watch } from "vue";
import { TagModel } from "../models";

export default defineComponent({
  name: "SmartTags",
  components: {
    SmartTag,
  },
  props: {
    readOnly: {
      type: Boolean,
      default: false,
    },
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
    tagStyle: {
      type: Object as PropType<{ foreColor: string; backgroundColor: string }>,
      default: () => ({}),
    },
  },
  setup(props) {
    const tags = props.readOnly
      ? props.tags.map((tag) => Object.assign({}, tag, { editable: false }))
      : props.tags;

    const localTags = ref<TagModel[]>(tags);

    const handleRemove = (id: string) => props.onRemove(id);
    const handleEdit = (id: string, newValue: string) =>
      props.onEdit(id, newValue);

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

.tags-list-enter-active,
.tags-list-leave-active {
  transition: all 0.2s;
}

.tags-list-enter,
.tags-list-leave-to {
  opacity: 0;
}
</style>