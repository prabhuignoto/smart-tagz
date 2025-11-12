<template>
  <div class="code-block-collapsible">
    <button
      class="code-block-toggle"
      :class="{ collapsed: isCollapsed }"
      :aria-expanded="!isCollapsed"
      :aria-label="`${isCollapsed ? 'Show' : 'Hide'} code example`"
      @click="isCollapsed = !isCollapsed"
    >
      <span class="code-block-toggle-icon">▼</span>
      <span>{{ isCollapsed ? 'Show Code' : 'Hide Code' }}</span>
    </button>
    <div
      class="code-block-content"
      :class="{ collapsed: isCollapsed }"
    >
      <slot />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isCollapsed = ref(true)
</script>

<style scoped>
.code-block-collapsible {
  margin: 1rem 0;
}

.code-block-toggle {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px 6px 0 0;
  cursor: pointer;
  font-weight: 600;
  color: var(--vp-c-text-1);
  font-size: 0.95rem;
  user-select: none;
  transition: background-color 0.2s ease;
}

.code-block-toggle:hover {
  background: var(--vp-c-bg-mute);
}

.code-block-toggle-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.2rem;
  height: 1.2rem;
  transition: transform 0.2s ease;
}

.code-block-toggle.collapsed .code-block-toggle-icon {
  transform: rotate(-90deg);
}

.code-block-content {
  max-height: 1000px;
  overflow: hidden;
  transition: max-height 0.3s ease;
}

.code-block-content.collapsed {
  max-height: 0;
}

.code-block-content :deep(.vp-code-group) {
  border-radius: 0 0 6px 6px;
  border-top: none;
}

.code-block-content :deep(pre) {
  border-radius: 0 0 6px 6px;
  margin: 0;
}
</style>
