import { mount, VueWrapper } from '@vue/test-utils'
import { ComponentPublicInstance } from 'vue'
import type { ComponentOptions } from 'vue'

/**
 * Helper function to mount Vue components with default options
 */
export function mountComponent<T extends ComponentPublicInstance>(
  component: ComponentOptions,
  options = {}
) {
  return mount(component, {
    global: {
      stubs: {
        transition: false,
        'transition-group': false,
      },
    },
    ...options,
  }) as VueWrapper<T>
}

/**
 * Mock data factories for common test scenarios
 */
export const mockData = {
  sampleTags: () => ['JavaScript', 'Vue.js', 'TypeScript'],
  singleTag: () => ['Component Testing'],
  emptyTags: () => [] as string[],
  duplicateTags: () => ['tag1', 'tag2', 'tag1'],
  specialCharTags: () => ['tag-1', 'tag_2', 'tag.3', 'tag@4'],
  longTags: () => ['a'.repeat(50), 'b'.repeat(100)],
}

/**
 * Default props for Main component testing
 */
export const defaultMainProps = {
  modelValue: [] as string[],
  placeholder: 'Add tags...',
  allowDuplicates: false,
  maxTags: 10,
  minTagLength: 1,
  maxTagLength: 50,
  readOnly: false,
  editable: true,
  delimiters: [',', ' ', 'Enter'],
  suggestionsOffset: 10,
  clearOnFocus: false,
  theme: 'light' as const,
  allowPaste: true,
}

/**
 * Create a keyboard event helper
 */
export function createKeyboardEvent(
  type: 'keydown' | 'keyup' | 'keypress',
  key: string,
  options: Partial<KeyboardEventInit> = {}
): KeyboardEvent {
  const defaultOptions: KeyboardEventInit = {
    key,
    code: key,
    bubbles: true,
    cancelable: true,
    ...options,
  }

  return new KeyboardEvent(type, defaultOptions)
}

/**
 * Helper to simulate keyboard shortcuts
 */
export const keyboard = {
  enter: () => createKeyboardEvent('keydown', 'Enter'),
  escape: () => createKeyboardEvent('keydown', 'Escape'),
  backspace: () => createKeyboardEvent('keydown', 'Backspace'),
  delete: () => createKeyboardEvent('keydown', 'Delete'),
  arrowUp: () => createKeyboardEvent('keydown', 'ArrowUp'),
  arrowDown: () => createKeyboardEvent('keydown', 'ArrowDown'),
  arrowLeft: () => createKeyboardEvent('keydown', 'ArrowLeft'),
  arrowRight: () => createKeyboardEvent('keydown', 'ArrowRight'),
  tab: () => createKeyboardEvent('keydown', 'Tab'),
  ctrlA: () =>
    createKeyboardEvent('keydown', 'a', {
      ctrlKey: true,
    }),
  ctrlC: () =>
    createKeyboardEvent('keydown', 'c', {
      ctrlKey: true,
    }),
  ctrlV: () =>
    createKeyboardEvent('keydown', 'v', {
      ctrlKey: true,
    }),
  ctrlX: () =>
    createKeyboardEvent('keydown', 'x', {
      ctrlKey: true,
    }),
}

/**
 * Helper to create a paste event with data
 */
export function createPasteEvent(data: string): ClipboardEvent {
  const event = new ClipboardEvent('paste', {
    clipboardData: new DataTransfer(),
    bubbles: true,
    cancelable: true,
  })

  Object.defineProperty(event.clipboardData, 'getData', {
    value: () => data,
  })

  return event
}

/**
 * Helper to wait for async operations in tests
 */
export function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * Common test assertions for tag validation
 */
export const assertions = {
  isValidTag: (tag: string): boolean => {
    return typeof tag === 'string' && tag.trim().length > 0
  },

  isUniqueTags: (tags: string[]): boolean => {
    return new Set(tags).size === tags.length
  },

  areTagsEqual: (tagsA: string[], tagsB: string[]): boolean => {
    return tagsA.length === tagsB.length && tagsA.every((tag, index) => tag === tagsB[index])
  },
}

/**
 * Helper to simulate input element interactions
 */
export const inputHelper = {
  type: (element: HTMLInputElement, text: string) => {
    element.value = text
    element.dispatchEvent(new Event('input', { bubbles: true }))
  },

  clear: (element: HTMLInputElement) => {
    element.value = ''
    element.dispatchEvent(new Event('input', { bubbles: true }))
  },

  focus: (element: HTMLInputElement) => {
    element.focus()
    element.dispatchEvent(new Event('focus', { bubbles: true }))
  },

  blur: (element: HTMLInputElement) => {
    element.blur()
    element.dispatchEvent(new Event('blur', { bubbles: true }))
  },
}
