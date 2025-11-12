import { computed, nextTick, onMounted, onUnmounted, ref, unref, watch } from 'vue'
import escapeStringRegexp from 'escape-string-regexp'
import Fuse from 'fuse.js'
import { TagModel } from '../models'
import HandlePaste from './HandlePaste'

interface PropModel {
  autosuggest: boolean
  allowPaste: {
    delimiter: string
  }
  allowDuplicates: boolean
  maxTags: number
  width: string
  defaultTags?: string[]
  sources: string[]
  quickDelete?: boolean
  onChanged?: (result: string[]) => void
}

export default function ({
  autosuggest,
  allowPaste = { delimiter: ',' },
  allowDuplicates,
  maxTags,
  defaultTags = [],
  sources,
  quickDelete,
  width,
  onChanged,
}: PropModel) {
  const delTagRef = ref<{ id: string } | null>(null)
  // ref to store the tags data. init with default tags
  const tagsData = ref<TagModel[]>(
    defaultTags.slice(0, maxTags).map((name) => ({
      id: Math.random().toString(16).slice(2),
      name,
      value: name,
    }))
  )
  const textInputRef = ref(null)
  const inputWrapperRef = ref<HTMLElement | null>(null)
  // ref for the input box
  const input = ref('')
  // ref to track the tags created by te user
  const tagsCreated = ref<number>(defaultTags.length ? Math.min(defaultTags.length, maxTags) : 0)
  // ref to display the suggestion pane
  const showSuggestions = ref(false)
  // ref to track ctrl+a selection
  const selectAllRef = ref(false)
  const selectedIndex = ref(-1)
  // ref to show placeholder tooltip when input is focused and placeholder is long
  const showPlaceholderTooltip = ref(false)
  // ref to track if user manually dismissed the placeholder tooltip
  const dismissPlaceholderTooltip = ref(false)
  const announcement = ref('')
  const errorMessage = ref('')

  // Function to announce messages to screen readers
  const announce = (message: string) => {
    announcement.value = message
    // Clear announcement after 1 second to allow screen readers to re-announce if needed
    setTimeout(() => {
      announcement.value = ''
    }, 1000)
  }

  // Function to display error messages
  const showError = (message: string) => {
    errorMessage.value = message
    announce(message) // Also announce to screen readers
    // Auto-dismiss error after 4 seconds
    setTimeout(() => {
      errorMessage.value = ''
    }, 4000)
  }

  const style = computed(() => ({
    width,
  }))

  const filteredItems = computed(() => {
    if (!input.value) {
      return []
    }

    // Use fuzzy matching with fuse.js instead of prefix-only matching
    const fuse = new Fuse(sources, {
      threshold: 0.3, // Balance between accuracy and flexibility
      includeScore: false,
    })

    const results = fuse.search(input.value)
    return results.map((result) => result.item)
  })

  const tagValues = computed(() => tagsData.value.map((item) => item.value))

  // Computed property for dropdown positioning
  const dropdownPosition = ref({
    top: '0px',
    left: '0px',
    width: '200px',
  })

  // Function to calculate dropdown position
  const updateDropdownPosition = () => {
    if (!inputWrapperRef.value) return

    const rect = inputWrapperRef.value.getBoundingClientRect()
    dropdownPosition.value = {
      top: `${rect.bottom + 8}px`, // 8px gap below input
      left: `${rect.left}px`,
      width: `${rect.width}px`,
    }
  }

  // Watch showSuggestions to update position when dropdown appears
  watch(showSuggestions, (isShown) => {
    if (isShown) {
      // Use nextTick to ensure DOM is updated
      nextTick(() => {
        updateDropdownPosition()
      })
    }
  })

  // Setup event listeners for scroll and resize
  onMounted(() => {
    window.addEventListener('scroll', updateDropdownPosition, true)
    window.addEventListener('resize', updateDropdownPosition)
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', updateDropdownPosition, true)
    window.removeEventListener('resize', updateDropdownPosition)
  })

  const focus = () => {
    if (textInputRef.value) {
      ;(textInputRef.value as unknown as HTMLElement).focus()
    }
  }

  // Handle input focus - show placeholder tooltip if not dismissed and no delete active
  const handleInputFocus = () => {
    if (!input.value && !dismissPlaceholderTooltip.value && !delTagRef.value) {
      showPlaceholderTooltip.value = true
    }
  }

  // Handle input blur - hide placeholder tooltip and reset dismiss state
  const handleInputBlur = () => {
    showPlaceholderTooltip.value = false
    dismissPlaceholderTooltip.value = false
    reset()
  }

  // Handle placeholder tooltip close
  const handleClosePlaceholderTooltip = () => {
    showPlaceholderTooltip.value = false
    dismissPlaceholderTooltip.value = true
  }

  // Handle clear highlight from tag tooltip close button
  const handleClearHighlight = (id: string) => {
    delTagRef.value = null
    tagsData.value = tagsData.value.map((tag) => {
      if (tag.id === id) {
        const { highlight, ...rest } = tag
        return rest
      }
      return tag
    })
  }

  const reset: () => void = () => {
    // remove highlight from all tags
    tagsData.value = tagsData.value.map(({ highlight, ...rest }) => rest)
    // disable autosuggest
    showSuggestions.value = false
    selectAllRef.value = false
    selectedIndex.value = -1
  }

  watch(tagValues, (newValues) => {
    onChanged?.(newValues)
  })

  watch(input, (newValue) => {
    if (delTagRef.value) {
      delTagRef.value = null
      tagsData.value = tagsData.value.map(({ highlight, ...rest }) => rest)
    }

    // Hide placeholder tooltip when user starts typing
    if (newValue && showPlaceholderTooltip.value) {
      showPlaceholderTooltip.value = false
    }

    if (newValue) {
      selectAllRef.value = false

      if (autosuggest && newValue.length > 0) {
        showSuggestions.value = true
      } else if (autosuggest && newValue.length < 1) {
        showSuggestions.value = false
      }
    } else {
      showSuggestions.value = false
    }
  })

  watch(selectAllRef, (newValue) => {
    tagsData.value = tagsData.value.map((tag) =>
      Object.assign({}, tag, {
        highlight: newValue,
      })
    )
  })

  // checks if a new tag can be added
  const canAddTag = (name: string) => {
    // Validate that name is not empty or just whitespace
    if (!name || name.trim().length === 0) {
      return false
    }

    const tester = new RegExp(`^${escapeStringRegexp(name)}$`, 'ig')
    const duplicatesCheck = !allowDuplicates
      ? !tagsData.value.some((tag) => tag.name === name || tester.test(tag.name))
      : allowDuplicates
    const maxAllowed = tagsCreated.value < maxTags
    return duplicatesCheck && maxAllowed
  }

  // handler to add a new tag
  const handleAddTag: (name: string) => void = (name) => {
    let nameToUse = ''
    const selIndex = unref(selectedIndex)

    if (selIndex > -1) {
      nameToUse = filteredItems.value[selIndex] || ''
    } else {
      nameToUse = name
    }

    if (!canAddTag(nameToUse)) {
      const isDuplicate = tagsData.value.some(
        (tag) => tag.name.toLowerCase() === nameToUse.toLowerCase()
      )
      if (isDuplicate && !allowDuplicates) {
        showError(`${nameToUse} is already added`)
      } else if (tagsCreated.value >= maxTags) {
        showError(`Maximum ${maxTags} tags allowed`)
      }
      // Reset state before returning
      input.value = ''
      showSuggestions.value = false
      selectedIndex.value = -1
      return
    }

    let newTag = null

    if (showSuggestions.value && selectedIndex.value > -1) {
      newTag = filteredItems.value[selectedIndex.value]
    } else {
      newTag = nameToUse
    }

    if (newTag) {
      tagsData.value = tagsData.value.concat({
        name: newTag,
        id: Math.random().toString(16).slice(2),
        value: newTag,
      })
      // Increment counter only when tag is actually added
      tagsCreated.value = +tagsCreated.value + 1
      // Announce tag addition to screen readers
      announce(`${newTag} added. ${tagsCreated.value} of ${maxTags} tags`)
    }

    input.value = ''
    showSuggestions.value = false
    selectedIndex.value = -1

    nextTick(() => focus())
  }

  // handler to remove a tag
  const handleRemoveTag: (id: string) => void = (id) => {
    const removedTag = tagsData.value.find((t) => t.id === id)
    tagsData.value = tagsData.value.filter((t) => t.id !== id)
    tagsCreated.value = +tagsCreated.value - 1
    // Announce tag removal to screen readers
    if (removedTag) {
      const remainingTags = tagsCreated.value
      announce(`${removedTag.name} removed. ${remainingTags} of ${maxTags} tags`)
    }
  }

  // Programmatic API to clear all tags
  const clearAllTags: () => void = () => {
    const tagCount = tagsData.value.length
    tagsData.value = []
    tagsCreated.value = 0
    selectAllRef.value = false
    input.value = ''
    showSuggestions.value = false
    selectedIndex.value = -1
    // Announce to screen readers
    if (tagCount > 0) {
      announce(`All ${tagCount} tags cleared`)
    }
  }

  const handleDelete: () => void = () => {
    if (input.value) {
      return
    }

    if (selectAllRef.value) {
      tagsData.value = []
      selectAllRef.value = false
      tagsCreated.value = 0
      return
    }

    if (delTagRef.value) {
      const tag = delTagRef.value
      tagsData.value = tagsData.value.filter((t) => t.id !== tag.id)
      delTagRef.value = null
      tagsCreated.value = +tagsCreated.value - 1
    } else if (tagsData.value.length > 0) {
      const tag = tagsData.value[tagsData.value.length - 1]
      if (tag) {
        delTagRef.value = {
          id: tag.id,
        }
        tagsData.value = tagsData.value.map((t) => {
          if (t.id === tag.id) {
            return Object.assign({}, t, {
              highlight: true,
            })
          } else {
            return t
          }
        })
      }
    }
  }

  // handle to manage paste
  const handlePaste: (event: ClipboardEvent) => void = (event) => {
    // Only handle paste if allowPaste prop is configured
    if (!allowPaste || !allowPaste.delimiter) {
      return // Let default paste behavior happen
    }

    // cancel the default operation
    event.stopPropagation()
    event.preventDefault()

    // get the clipboard data
    const data = event.clipboardData?.getData('text')

    if (data) {
      const pasteResult = HandlePaste(
        unref(tagsData),
        data,
        maxTags,
        +unref(tagsCreated),
        allowPaste.delimiter,
        allowDuplicates
      )

      if (pasteResult?.newData) {
        tagsData.value = pasteResult.newData
        tagsCreated.value = pasteResult.tagsCreated
      }
    }
  }

  const handleEscape = () => reset()

  const handleEditTag: (id: string, newValue: string) => void = (id, newValue) => {
    tagsData.value = tagsData.value.map((tag) => {
      if (tag.id === id) {
        return Object.assign({}, tag, {
          name: newValue,
          value: newValue,
        })
      } else {
        return tag
      }
    })
  }

  const handleSuggestSelection: (name: string) => void = (name) => {
    showSuggestions.value = false
    nextTick(() => {
      handleAddTag(name)
    })
  }

  const handleKeydown: (event: KeyboardEvent) => void = (event) => {
    event.preventDefault()

    const curSelIndex = unref(selectedIndex)

    if (curSelIndex < unref(filteredItems).length - 1) {
      selectedIndex.value = +selectedIndex.value + 1
    } else {
      selectedIndex.value = 0
    }
  }

  const handleKeyUp: (event: KeyboardEvent) => void = (event) => {
    event.preventDefault()

    const curSelIndex = unref(selectedIndex)

    if (curSelIndex > 0) {
      selectedIndex.value = selectedIndex.value - 1
    } else {
      selectedIndex.value = unref(filteredItems).length - 1
    }
  }

  const handleSuggestEsc: () => void = () => {
    focus()
    showSuggestions.value = false
  }

  const handleSelectAll: (event: KeyboardEvent) => void = (event) => {
    if (!quickDelete) {
      return
    }
    if (event.key === 'a' && !input.value) {
      selectAllRef.value = true
      delTagRef.value = null
    }
  }

  // Handle Home key - go to first suggestion
  const handleHome: (event: KeyboardEvent) => void = (event) => {
    if (showSuggestions.value && filteredItems.value.length > 0) {
      event.preventDefault()
      selectedIndex.value = 0
    }
  }

  // Handle End key - go to last suggestion
  const handleEnd: (event: KeyboardEvent) => void = (event) => {
    if (showSuggestions.value && filteredItems.value.length > 0) {
      event.preventDefault()
      selectedIndex.value = filteredItems.value.length - 1
    }
  }

  // Handle Tab key - close suggestions and move focus to next element
  const handleTab: (event: KeyboardEvent) => void = (event) => {
    if (showSuggestions.value) {
      event.preventDefault()
      const selectedItem = filteredItems.value[selectedIndex.value]
      if (
        selectedIndex.value >= 0 &&
        selectedIndex.value < filteredItems.value.length &&
        selectedItem !== undefined
      ) {
        // If a suggestion is selected, select it
        handleAddTag(selectedItem)
      } else {
        // Otherwise just close suggestions and move focus
        showSuggestions.value = false
      }
      // Tab behavior will naturally move to next focusable element after this
      setTimeout(() => {
        const nextElement = document.querySelector('[tabindex="0"]') as HTMLElement
        nextElement?.focus()
      }, 0)
    }
  }

  const handleClearSelectAllTooltip: () => void = () => {
    selectAllRef.value = false
  }

  return {
    tagsData,
    input,
    style,
    textInputRef,
    inputWrapperRef,
    dropdownPosition,
    showSuggestions,
    selectedIndex,
    filteredItems,
    announcement,
    errorMessage,
    showPlaceholderTooltip,
    delTagRef,
    selectAllRef,
    handleKeyUp,
    handleKeydown,
    handleHome,
    handleEnd,
    handleTab,
    handleAddTag,
    handleRemoveTag,
    clearAllTags,
    handleDelete,
    handleEscape,
    handlePaste,
    handleEditTag,
    handleSuggestSelection,
    handleSuggestEsc,
    handleSelectAll,
    handleInputFocus,
    handleInputBlur,
    handleClosePlaceholderTooltip,
    handleClearHighlight,
    handleClearSelectAllTooltip,
  }
}
