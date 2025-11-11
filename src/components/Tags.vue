<template>
  <div class="tags-container">
    <Tooltip
      :show="selectAll && localTags.length > 0"
      message="Press Delete to remove"
      variant="error"
      closeable
      class="select-all-tooltip"
      @close="handleClearSelectAllTooltip"
    />
    <transition-group name="fade-scale">
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
        :is-select-all="selectAll"
        :class-names="{
          container: classNames.container,
          name: classNames.name,
          closeButton: classNames.closeButton,
        }"
        @clear-highlight="handleClearHighlight(tag.id)"
      />
    </transition-group>
    <slot />
  </div>
</template>

<script lang="ts">
import SmartTag from './Tag.vue'
import Tooltip from './Tooltip.vue'
import { defineComponent, PropType, computed } from 'vue'
import { TagModel } from '../models'

export default defineComponent({
  name: 'SmartTags',
  components: {
    SmartTag,
    Tooltip,
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
    classNames: {
      type: Object as PropType<{
        container: string
        name: string
        closeButton: string
      }>,
      default: () => ({}),
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
    onClearHighlight: {
      type: Function as PropType<(id: string) => void>,
      default: () => {},
    },
    selectAll: {
      type: Boolean,
      default: false,
    },
    onClearSelectAllTooltip: {
      type: Function as PropType<() => void>,
      default: () => {},
    },
  },
  setup(props) {
    const localTags = computed(() => {
      if (props.readOnly) {
        return props.tags.map((tag) => ({ ...tag, editable: false }))
      }
      return props.tags
    })

    const handleRemove = (id: string) => props.onRemove(id)
    const handleEdit = (id: string, newValue: string) => props.onEdit(id, newValue)
    const handleClearHighlight = (id: string) => props.onClearHighlight(id)
    const handleClearSelectAllTooltip = () => props.onClearSelectAllTooltip()

    return {
      localTags,
      handleRemove,
      handleEdit,
      handleClearHighlight,
      handleClearSelectAllTooltip,
    }
  },
})
</script>

<style lang="scss" scoped>
@use '@/styles' as *;

.tags-container {
  @include flex-row(center, flex-start);

  flex-wrap: wrap;
  position: relative;
}

.select-all-tooltip {
  position: absolute;
  top: -45px;
  left: var(--spacing-sm);
  pointer-events: auto;
}

// Animation classes imported from @/styles/_animations.scss
// Uses fade-scale animation for subtle tag entrance/exit with scale effect
</style>
