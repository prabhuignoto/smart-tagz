<template>
  <div class="nuxt3-example">
    <h1>Smart-Tagz in Nuxt 3</h1>

    <div class="example-container">
      <h2>Basic Usage</h2>
      <SmartTagz
        input-placeholder="Add programming languages..."
        :source="languages"
        :on-changed="handleLanguagesChanged"
      />
      <p class="info">Selected: {{ selectedLanguages.join(', ') || 'None' }}</p>
    </div>

    <div class="example-container">
      <h2>With Editable Tags</h2>
      <SmartTagz
        ref="editableTagsRef"
        input-placeholder="Add names..."
        editable
        :default-tags="['Alice', 'Bob']"
        :on-changed="handleNamesChanged"
      />
      <p class="info">Names: {{ selectedNames.join(', ') || 'None' }}</p>
      <button
        class="btn"
        @click="clearAllNames"
      >
        Clear All
      </button>
      <button
        class="btn"
        @click="addProgrammaticName"
      >
        Add 'Charlie'
      </button>
    </div>

    <div class="example-container">
      <h2>Dynamic Source</h2>
      <div class="controls">
        <button
          class="btn"
          @click="updateLanguageSource"
        >
          Toggle Languages
        </button>
      </div>
      <SmartTagz
        input-placeholder="Select from dynamic source..."
        :source="dynamicSource"
        :on-changed="handleDynamicChanged"
      />
      <p class="info">Dynamic selection: {{ dynamicSelection.join(', ') || 'None' }}</p>
    </div>

    <div class="example-container">
      <h2>With All Features</h2>
      <SmartTagz
        input-placeholder="Tags with all features..."
        editable
        :allow-duplicates="false"
        :max-tags="5"
        autosuggest
        :default-tags="['Vue', 'Nuxt']"
        :source="frameworks"
        :on-changed="handleFrameworksChanged"
        allow-paste
        quick-delete
      />
      <p class="info">Frameworks: {{ selectedFrameworks.join(', ') || 'None' }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// Refs for tag data
const selectedLanguages = ref<string[]>(['JavaScript', 'TypeScript'])
const selectedNames = ref<string[]>(['Alice', 'Bob'])
const selectedFrameworks = ref<string[]>(['Vue', 'Nuxt'])
const dynamicSelection = ref<string[]>([])

// Refs for component instances
const editableTagsRef = ref()

// Data sources
const languages = ref(['JavaScript', 'TypeScript', 'Python', 'Java', 'Go', 'Rust', 'C++'])

const frameworks = ref(['Vue', 'React', 'Angular', 'Svelte', 'Nuxt', 'Next.js', 'Astro'])

const dynamicSource = ref(['Frontend', 'Backend', 'DevOps', 'Mobile'])

// Handlers
const handleLanguagesChanged = (tags: string[]) => {
  selectedLanguages.value = tags
  console.log('Languages changed:', tags)
}

const handleNamesChanged = (tags: string[]) => {
  selectedNames.value = tags
  console.log('Names changed:', tags)
}

const handleFrameworksChanged = (tags: string[]) => {
  selectedFrameworks.value = tags
  console.log('Frameworks changed:', tags)
}

const handleDynamicChanged = (tags: string[]) => {
  dynamicSelection.value = tags
  console.log('Dynamic selection changed:', tags)
}

// Methods
const clearAllNames = () => {
  if (editableTagsRef.value?.clearAllTags) {
    editableTagsRef.value.clearAllTags()
    selectedNames.value = []
    console.log('All names cleared')
  }
}

const addProgrammaticName = () => {
  if (editableTagsRef.value?.handleAddTag) {
    editableTagsRef.value.handleAddTag('Charlie')
    console.log('Charlie added programmatically')
  }
}

const updateLanguageSource = () => {
  // Toggle between different language sources
  if (dynamicSource.value[0] === 'Frontend') {
    dynamicSource.value = ['Machine Learning', 'Data Science', 'Cloud', 'Security']
  } else {
    dynamicSource.value = ['Frontend', 'Backend', 'DevOps', 'Mobile']
  }
  console.log('Source updated:', dynamicSource.value)
}
</script>

<style scoped lang="scss">
.nuxt3-example {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;

  h1 {
    color: #333;
    margin-bottom: 2rem;
    text-align: center;
  }

  .example-container {
    background: #f9f9f9;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    padding: 1.5rem;
    margin-bottom: 2rem;

    h2 {
      color: #555;
      font-size: 1.2rem;
      margin-top: 0;
      margin-bottom: 1rem;
    }

    .info {
      color: #666;
      font-size: 0.9rem;
      margin-top: 1rem;
      padding: 0.5rem;
      background: #fff;
      border-left: 3px solid #007bff;
      padding-left: 1rem;
    }

    .controls {
      margin-bottom: 1rem;
    }
  }

  .btn {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.9rem;
    margin-right: 0.5rem;
    margin-top: 0.5rem;

    &:hover {
      background-color: #0056b3;
    }

    &:active {
      transform: scale(0.98);
    }
  }
}
</style>
