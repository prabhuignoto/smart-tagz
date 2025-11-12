<template>
  <form
    class="api-request-demo"
    @submit.prevent="submitRequest"
  >
    <div class="form-group">
      <label>Request Tags (max 5)</label>
      <SmartTagz
        :max-tags="5"
        :sources="tagCategories"
        :editable="true"
        autosuggest
        input-placeholder="Select request tags..."
        :on-changed="handleTagsChange"
      />
    </div>

    <div class="form-group">
      <label>Description</label>
      <textarea
        v-model="description"
        placeholder="Describe your request..."
        required
      ></textarea>
    </div>

    <div class="form-actions">
      <button
        type="submit"
        class="btn-submit"
        :disabled="!canSubmit || isSubmitting"
      >
        {{ isSubmitting ? 'Submitting...' : 'Submit Request' }}
      </button>
      <span
        v-if="!canSubmit && tags.length === 0"
        class="error-note"
      >
        Add at least 1 tag to submit
      </span>
    </div>

    <div
      v-if="submitMessage"
      :class="['submit-message', submitStatus]"
    >
      {{ submitMessage }}
    </div>
  </form>
</template>

<script setup>
import { ref, computed } from 'vue'
import SmartTagz from '../../../src/components/Main.vue'

const tagCategories = [
  'Bug Report',
  'Feature Request',
  'Documentation',
  'Performance',
  'Security',
  'Accessibility',
]

const tags = ref([])
const description = ref('')

const isSubmitting = ref(false)
const submitMessage = ref('')
const submitStatus = ref('')

const canSubmit = computed(() => {
  return tags.value.length > 0 && description.value.trim() !== ''
})

const handleTagsChange = (newTags) => {
  console.log('Tags changed:', newTags)
  tags.value = [...newTags]
}

// Fake API simulation
const mockApiCall = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const success = Math.random() > 0.1 // 90% success rate
      resolve(success)
    }, 1500)
  })
}

const submitRequest = async () => {
  if (!canSubmit.value) return

  isSubmitting.value = true
  submitMessage.value = ''

  try {
    const success = await mockApiCall()

    if (success) {
      submitMessage.value = `✅ Request submitted with tags: ${tags.value.join(', ')}`
      submitStatus.value = 'success'
      tags.value = []
      description.value = ''
    } else {
      submitMessage.value = '❌ Failed to submit request. Please try again.'
      submitStatus.value = 'error'
    }
  } catch (error) {
    submitMessage.value = '❌ Network error. Please try again.'
    submitStatus.value = 'error'
  } finally {
    isSubmitting.value = false
    setTimeout(() => {
      submitMessage.value = ''
    }, 4000)
  }
}
</script>

<style scoped>
.api-request-demo {
  max-width: 600px;
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #1f2937;
}

textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  font-family: inherit;
  font-size: 0.95rem;
  min-height: 100px;
  resize: vertical;
  transition: border-color 0.2s;
}

textarea:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgb(59 130 246 / 10%);
}

.form-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 2rem;
}

.btn-submit {
  padding: 0.75rem 1.5rem;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  font-weight: 600;
  font-size: 1rem;
  transition: background-color 0.2s;
}

.btn-submit:disabled {
  background-color: #e5e7eb;
  color: #9ca3af;
  cursor: not-allowed;
}

.btn-submit:not(:disabled):hover {
  background-color: #2563eb;
}

.error-note {
  color: #dc2626;
  font-size: 0.875rem;
  white-space: nowrap;
}

.submit-message {
  margin-top: 1rem;
  padding: 0.75rem 1rem;
  border-radius: 0.375rem;
  font-weight: 500;
  animation: slideIn 0.3s ease-out;
}

.submit-message.success {
  background-color: #d1fae5;
  color: #065f46;
  border: 1px solid #6ee7b7;
}

.submit-message.error {
  background-color: #fee2e2;
  color: #991b1b;
  border: 1px solid #fecaca;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-0.5rem);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
