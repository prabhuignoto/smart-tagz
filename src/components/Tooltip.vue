<template>
  <Transition name="fade-slide-up">
    <div
      v-if="show"
      class="tooltip"
      :class="`tooltip--${variant}`"
      role="tooltip"
      :aria-live="variant === 'error' ? 'assertive' : 'polite'"
    >
      <span class="tooltip__content">{{ message }}</span>
      <button
        v-if="closeable"
        class="tooltip__close"
        aria-label="Close tooltip"
        @click="emit('close')"
      >
        ✕
      </button>
      <div class="tooltip__arrow" />
    </div>
  </Transition>
</template>

<script lang="ts">
export default {
  name: 'Tooltip',
}
</script>

<script setup lang="ts">
export interface TooltipProps {
  show: boolean
  message: string
  variant?: 'default' | 'error' | 'info'
  closeable?: boolean
}

defineProps<TooltipProps>()

const emit = defineEmits<{
  close: []
}>()
</script>

<style scoped lang="scss">
@use '@/styles' as *;

.tooltip {
  position: absolute;
  bottom: calc(100% + var(--spacing-lg)); // 8px above parent
  left: 0%;
  z-index: var(--z-index-tooltip);
  padding: var(--spacing-md) var(--spacing-lg);
  border-radius: var(--border-radius-sm);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  line-height: var(--line-height-tight);
  box-shadow: var(--shadow-md);
  pointer-events: auto; // Allow close button interaction
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  min-width: 180px;
  max-width: 300px;
  overflow-wrap: break-word;
  white-space: nowrap;

  // Default variant - fixed indigo color (doesn't inherit theme)
  &--default {
    background: #6366f1;
    color: #fff;
  }

  // Error variant - fixed red color (for delete confirmation)
  &--error {
    background: #ef4444;
    color: #fff;
  }

  // Info variant - fixed amber color (for visual distinction)
  &--info {
    background: #f59e0b;
    color: #fff;
  }

  // Arrow pointing down to parent element
  &__arrow {
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
  }

  &--default &__arrow {
    border-top: 6px solid #6366f1;
  }

  &--error &__arrow {
    border-top: 6px solid #ef4444;
  }

  &--info &__arrow {
    border-top: 6px solid #f59e0b;
  }
}

.tooltip__content {
  flex: 1;
  min-width: 0;
  overflow-wrap: break-word;
}

.tooltip__close {
  flex-shrink: 0;
  background: none;
  border: none;
  color: currentcolor;
  font-size: 16px;
  padding: 0;
  margin-left: var(--spacing-xs);
  cursor: pointer;
  opacity: 0.9;
  transition: opacity var(--transition-base);
  line-height: 1;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    opacity: 1;
  }

  &:focus-visible {
    outline: 2px solid currentcolor;
    outline-offset: 2px;
  }
}

// Animation classes imported from @/styles/_animations.scss
// Uses fade-slide-up animation for subtle entrance/exit
</style>
