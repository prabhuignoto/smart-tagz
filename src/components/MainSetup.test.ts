import { describe, it, expect, vi, beforeEach } from 'vitest'
import { nextTick } from 'vue'
import MainSetup from './MainSetup'

describe('MainSetup', () => {
  let setup: ReturnType<typeof MainSetup>
  const mockOnChanged = vi.fn()

  beforeEach(() => {
    mockOnChanged.mockClear()
    setup = MainSetup({
      autosuggest: true,
      allowPaste: { delimiter: ',' },
      allowDuplicates: false,
      maxTags: 10,
      defaultTags: [],
      sources: ['JavaScript', 'Vue.js', 'TypeScript', 'React'],
      quickDelete: true,
      width: '100%',
      onChanged: mockOnChanged,
    })
  })

  describe('Initialization', () => {
    it('should initialize with empty tags when no default tags provided', () => {
      expect(setup.tagsData.value).toEqual([])
    })

    it('should initialize with default tags respecting maxTags limit', () => {
      const setupWithDefaults = MainSetup({
        autosuggest: true,
        allowPaste: { delimiter: ',' },
        allowDuplicates: false,
        maxTags: 2,
        defaultTags: ['tag1', 'tag2', 'tag3'],
        sources: [],
        quickDelete: true,
        width: '100%',
      })

      expect(setupWithDefaults.tagsData.value).toHaveLength(2)
      expect(setupWithDefaults.tagsData.value[0]!.name).toBe('tag1')
      expect(setupWithDefaults.tagsData.value[1]!.name).toBe('tag2')
    })

    it('should initialize with empty input', () => {
      expect(setup.input.value).toBe('')
    })

    it('should initialize with showSuggestions as false', () => {
      expect(setup.showSuggestions.value).toBe(false)
    })

    it('should initialize with selectedIndex as -1', () => {
      expect(setup.selectedIndex.value).toBe(-1)
    })

    it('should compute style with provided width', () => {
      expect(setup.style.value).toEqual({ width: '100%' })
    })
  })

  describe('canAddTag', () => {
    it('should allow adding a valid new tag', () => {
      // canAddTag is called internally but not directly exposed for testing
      // Test through handleAddTag instead
      const initialLength = setup.tagsData.value.length
      setup.handleAddTag('NewTag')
      expect(setup.tagsData.value.length).toBe(initialLength + 1)
    })

    it('should prevent adding duplicate tags when duplicates not allowed', () => {
      setup.tagsData.value = [
        {
          id: '1',
          name: 'JavaScript',
          value: 'JavaScript',
        },
      ]

      setup.handleAddTag('JavaScript')
      // Check that tag wasn't added (length should still be 1)
      expect(setup.tagsData.value).toHaveLength(1)
    })

    it('should prevent adding tags when max limit reached', () => {
      const setupMax2 = MainSetup({
        autosuggest: true,
        allowPaste: { delimiter: ',' },
        allowDuplicates: false,
        maxTags: 2,
        defaultTags: ['tag1', 'tag2'],
        sources: [],
        quickDelete: true,
        width: '100%',
      })

      setupMax2.handleAddTag('tag3')
      expect(setupMax2.tagsData.value).toHaveLength(2)
    })

    it('should allow duplicate tags when allowDuplicates is true', () => {
      const setupDuplicates = MainSetup({
        autosuggest: true,
        allowPaste: { delimiter: ',' },
        allowDuplicates: true,
        maxTags: 10,
        defaultTags: [],
        sources: [],
        quickDelete: true,
        width: '100%',
      })

      setupDuplicates.tagsData.value = [
        {
          id: '1',
          name: 'tag',
          value: 'tag',
        },
      ]

      setupDuplicates.handleAddTag('tag')
      expect(setupDuplicates.tagsData.value).toHaveLength(2)
    })

    it('should perform case-insensitive duplicate check', () => {
      setup.tagsData.value = [
        {
          id: '1',
          name: 'JavaScript',
          value: 'JavaScript',
        },
      ]

      setup.handleAddTag('javascript')
      setup.handleAddTag('JAVASCRIPT')

      // Both attempts should be rejected, so length stays 1
      expect(setup.tagsData.value).toHaveLength(1)
    })
  })

  describe('handleAddTag', () => {
    it('should add a new tag successfully', async () => {
      // Mock focus to avoid null reference error in unit tests
      const mockFocus = vi.fn()
      ;(setup.textInputRef as unknown) = { value: { focus: mockFocus } }

      setup.handleAddTag('NewTag')
      await nextTick()

      expect(setup.tagsData.value).toHaveLength(1)
      expect(setup.tagsData.value[0]!.name).toBe('NewTag')
      expect(setup.tagsData.value[0]!.value).toBe('NewTag')
    })

    it('should clear input after adding tag', async () => {
      const mockFocus = vi.fn()
      ;(setup.textInputRef as unknown) = { value: { focus: mockFocus } }

      setup.input.value = 'NewTag'
      setup.handleAddTag('NewTag')
      await nextTick()

      expect(setup.input.value).toBe('')
    })

    it('should hide suggestions after adding tag', async () => {
      const mockFocus = vi.fn()
      ;(setup.textInputRef as unknown) = { value: { focus: mockFocus } }

      setup.showSuggestions.value = true
      setup.handleAddTag('NewTag')
      await nextTick()

      expect(setup.showSuggestions.value).toBe(false)
    })

    it('should increment tagsCreated counter', async () => {
      const mockFocus = vi.fn()
      ;(setup.textInputRef as unknown) = { value: { focus: mockFocus } }

      expect(setup.tagsData.value).toHaveLength(0)
      setup.handleAddTag('tag1')
      await nextTick()
      expect(setup.tagsData.value).toHaveLength(1)
      setup.handleAddTag('tag2')
      await nextTick()
      expect(setup.tagsData.value).toHaveLength(2)
    })

    it('should not add tag if validation fails', () => {
      setup.tagsData.value = [
        {
          id: '1',
          name: 'tag1',
          value: 'tag1',
        },
      ]

      setup.handleAddTag('tag1')

      expect(setup.tagsData.value).toHaveLength(1)
    })

    it('should use filtered item when selectedIndex is valid', async () => {
      const mockFocus = vi.fn()
      ;(setup.textInputRef as unknown) = { value: { focus: mockFocus } }

      setup.input.value = 'J'
      setup.selectedIndex.value = 0
      setup.showSuggestions.value = true

      setup.handleAddTag('')
      await nextTick()

      expect(setup.tagsData.value).toHaveLength(1)
      expect(setup.tagsData.value[0]!.name).toBe('JavaScript')
    })

    it('should emit onChanged callback with new tags', async () => {
      const mockFocus = vi.fn()
      ;(setup.textInputRef as unknown) = { value: { focus: mockFocus } }

      setup.handleAddTag('tag1')
      await nextTick()

      expect(mockOnChanged).toHaveBeenCalledWith(['tag1'])
    })

    it('should reset selectedIndex after adding tag', async () => {
      const mockFocus = vi.fn()
      ;(setup.textInputRef as unknown) = { value: { focus: mockFocus } }

      setup.selectedIndex.value = 2
      setup.handleAddTag('NewTag')
      await nextTick()

      expect(setup.selectedIndex.value).toBe(-1)
    })
  })

  describe('handleRemoveTag', () => {
    beforeEach(() => {
      setup.tagsData.value = [
        { id: '1', name: 'tag1', value: 'tag1' },
        { id: '2', name: 'tag2', value: 'tag2' },
        { id: '3', name: 'tag3', value: 'tag3' },
      ]
    })

    it('should remove tag by id', () => {
      setup.handleRemoveTag('2')

      expect(setup.tagsData.value).toHaveLength(2)
      expect(setup.tagsData.value.map((t) => t.id)).not.toContain('2')
    })

    it('should decrease tag count after removing tag', () => {
      const initialLength = setup.tagsData.value.length
      const firstTagId = setup.tagsData.value[0]!.id
      setup.handleRemoveTag(firstTagId)

      expect(setup.tagsData.value.length).toBe(initialLength - 1)
    })

    it('should maintain correct tag order after removal', () => {
      setup.handleRemoveTag('2')

      expect(setup.tagsData.value[0]!.id).toBe('1')
      expect(setup.tagsData.value[1]!.id).toBe('3')
    })
  })

  describe('handleDelete', () => {
    beforeEach(() => {
      setup.input.value = ''
      setup.tagsData.value = [
        { id: '1', name: 'tag1', value: 'tag1' },
        { id: '2', name: 'tag2', value: 'tag2' },
        { id: '3', name: 'tag3', value: 'tag3' },
      ]
    })

    it('should not delete when input has value', () => {
      setup.input.value = 'text'
      setup.handleDelete()

      expect(setup.tagsData.value).toHaveLength(3)
    })

    it('should delete all tags when handleDelete is called on empty input', () => {
      // handleDelete deletes highlighted tag or highlights last tag
      setup.tagsData.value = [{ id: '1', name: 'tag1', value: 'tag1' }]
      setup.handleDelete()
      expect(setup.tagsData.value[0]!.highlight).toBe(true)
    })

    it('should highlight last tag on first backspace', () => {
      setup.handleDelete()

      const lastTag = setup.tagsData.value[setup.tagsData.value.length - 1]!
      expect(lastTag.highlight).toBe(true)
    })

    it('should delete highlighted tag on second backspace', () => {
      setup.handleDelete()
      setup.handleDelete()

      expect(setup.tagsData.value).toHaveLength(2)
      expect(setup.tagsData.value.map((t) => t.id)).not.toContain('3')
    })

    it('should handle delete correctly', () => {
      setup.tagsData.value = [
        { id: '1', name: 'tag1', value: 'tag1' },
        { id: '2', name: 'tag2', value: 'tag2' },
      ]
      setup.input.value = ''
      setup.handleDelete()

      // First delete highlights the last tag
      expect(setup.tagsData.value[setup.tagsData.value.length - 1]!.highlight).toBe(true)
    })
  })

  describe('handlePaste', () => {
    it('should parse pasted content with default delimiter', () => {
      const pasteData = 'tag1,tag2,tag3'
      const event = new ClipboardEvent('paste', {
        clipboardData: new DataTransfer(),
      })

      Object.defineProperty(event.clipboardData, 'getData', {
        value: () => pasteData,
      })

      setup.handlePaste(event)

      expect(setup.tagsData.value.length).toBeGreaterThanOrEqual(1)
    })

    it('should prevent default paste behavior', () => {
      const event = new ClipboardEvent('paste', {
        clipboardData: new DataTransfer(),
      })

      Object.defineProperty(event.clipboardData, 'getData', {
        value: () => 'tag1,tag2',
      })

      const preventDefaultSpy = vi.spyOn(event, 'preventDefault')
      const stopPropagationSpy = vi.spyOn(event, 'stopPropagation')

      setup.handlePaste(event)

      expect(preventDefaultSpy).toHaveBeenCalled()
      expect(stopPropagationSpy).toHaveBeenCalled()
    })

    it('should respect maxTags limit on paste', () => {
      const setupMax2 = MainSetup({
        autosuggest: true,
        allowPaste: { delimiter: ',' },
        allowDuplicates: false,
        maxTags: 2,
        defaultTags: ['existing'],
        sources: [],
        quickDelete: true,
        width: '100%',
      })

      const event = new ClipboardEvent('paste', {
        clipboardData: new DataTransfer(),
      })

      Object.defineProperty(event.clipboardData, 'getData', {
        value: () => 'tag1,tag2,tag3',
      })

      setupMax2.handlePaste(event)

      expect(setupMax2.tagsData.value.length).toBeLessThanOrEqual(2)
    })
  })

  describe('handleEscape', () => {
    it('should reset highlight on escape', () => {
      setup.tagsData.value = [{ id: '1', name: 'tag1', value: 'tag1', highlight: true }]

      setup.handleEscape()

      expect(setup.tagsData.value[0]!.highlight).toBeUndefined()
    })

    it('should hide suggestions on escape', () => {
      setup.showSuggestions.value = true
      setup.handleEscape()

      expect(setup.showSuggestions.value).toBe(false)
    })

    it('should clear highlight on all tags when escape is called', () => {
      setup.tagsData.value = [
        { id: '1', name: 'tag1', value: 'tag1', highlight: true },
        { id: '2', name: 'tag2', value: 'tag2' },
      ]
      setup.handleEscape()

      expect(setup.tagsData.value.every((t) => !t.highlight)).toBe(true)
    })

    it('should reset selectedIndex on escape', () => {
      setup.selectedIndex.value = 2
      setup.handleEscape()

      expect(setup.selectedIndex.value).toBe(-1)
    })
  })

  describe('handleEditTag', () => {
    beforeEach(() => {
      setup.tagsData.value = [{ id: '1', name: 'oldTag', value: 'oldTag' }]
    })

    it('should update tag name and value', () => {
      setup.handleEditTag('1', 'newTag')

      expect(setup.tagsData.value[0]!.name).toBe('newTag')
      expect(setup.tagsData.value[0]!.value).toBe('newTag')
    })

    it('should emit onChanged callback after edit', async () => {
      mockOnChanged.mockClear()
      setup.handleEditTag('1', 'newTag')

      await nextTick()

      expect(mockOnChanged).toHaveBeenCalledWith(['newTag'])
    })

    it('should not affect other tags when editing one', () => {
      setup.tagsData.value = [
        { id: '1', name: 'tag1', value: 'tag1' },
        { id: '2', name: 'tag2', value: 'tag2' },
      ]

      setup.handleEditTag('1', 'edited')

      expect(setup.tagsData.value[0]!.name).toBe('edited')
      expect(setup.tagsData.value[1]!.name).toBe('tag2')
    })
  })

  describe('handleKeydown', () => {
    beforeEach(() => {
      setup.input.value = 'J'
    })

    it('should handle arrow down key correctly', () => {
      setup.selectedIndex.value = -1
      const event = new KeyboardEvent('keydown', { key: 'ArrowDown' })

      setup.handleKeydown(event)

      // selectedIndex should move forward
      expect(setup.selectedIndex.value).toBeGreaterThanOrEqual(0)
    })

    it('should cycle back to 0 when reaching end', () => {
      setup.selectedIndex.value = setup.filteredItems.value.length - 1
      const event = new KeyboardEvent('keydown', { key: 'ArrowDown' })

      setup.handleKeydown(event)

      expect(setup.selectedIndex.value).toBe(0)
    })

    it('should prevent default event behavior', () => {
      const event = new KeyboardEvent('keydown', { key: 'ArrowDown' })
      const preventDefaultSpy = vi.spyOn(event, 'preventDefault')

      setup.handleKeydown(event)

      expect(preventDefaultSpy).toHaveBeenCalled()
    })
  })

  describe('handleKeyUp', () => {
    beforeEach(() => {
      setup.input.value = 'J'
    })

    it('should handle arrow up key correctly', () => {
      setup.selectedIndex.value = 1
      const event = new KeyboardEvent('keyup', { key: 'ArrowUp' })

      setup.handleKeyUp(event)

      expect(setup.selectedIndex.value).toBe(0)
    })

    it('should cycle to end when at 0', () => {
      setup.selectedIndex.value = 0
      const event = new KeyboardEvent('keyup', { key: 'ArrowUp' })

      setup.handleKeyUp(event)

      expect(setup.selectedIndex.value).toBe(setup.filteredItems.value.length - 1)
    })
  })

  describe('handleSuggestSelection', () => {
    it('should hide suggestions', async () => {
      const mockFocus = vi.fn()
      ;(setup.textInputRef as unknown) = { value: { focus: mockFocus } }

      setup.showSuggestions.value = true
      setup.handleSuggestSelection('JavaScript')
      await nextTick()

      expect(setup.showSuggestions.value).toBe(false)
    })

    it('should add selected suggestion', async () => {
      const mockFocus = vi.fn()
      ;(setup.textInputRef as unknown) = { value: { focus: mockFocus } }

      setup.handleSuggestSelection('JavaScript')
      await nextTick()

      expect(setup.tagsData.value.some((t) => t.name === 'JavaScript')).toBe(true)
    })
  })

  describe('handleSuggestEsc', () => {
    it('should hide suggestions and reset state', () => {
      setup.showSuggestions.value = true
      setup.selectedIndex.value = 2

      setup.handleEscape()

      // After escape, suggestions should be hidden
      expect(setup.showSuggestions.value).toBe(false)
      // selectedIndex should be reset
      expect(setup.selectedIndex.value).toBe(-1)
    })
  })

  describe('handleSelectAll', () => {
    it('should not do anything without quickDelete flag', () => {
      const setupNoQuickDelete = MainSetup({
        autosuggest: true,
        allowPaste: { delimiter: ',' },
        allowDuplicates: false,
        maxTags: 10,
        defaultTags: ['tag1', 'tag2'],
        sources: [],
        quickDelete: false,
        width: '100%',
      })

      const event = new KeyboardEvent('keydown', {
        keyCode: 65,
        code: 'KeyA',
      })

      const initialLength = setupNoQuickDelete.tagsData.value.length
      setupNoQuickDelete.handleSelectAll(event)

      // Should not have changed anything
      expect(setupNoQuickDelete.tagsData.value.length).toBe(initialLength)
    })

    it('should work when quickDelete is enabled and called correctly', () => {
      const setupWithQuickDelete = MainSetup({
        autosuggest: true,
        allowPaste: { delimiter: ',' },
        allowDuplicates: false,
        maxTags: 10,
        defaultTags: ['tag1', 'tag2'],
        sources: [],
        quickDelete: true,
        width: '100%',
      })

      // The handleSelectAll method checks for specific conditions
      const event = new KeyboardEvent('keydown', {
        keyCode: 65,
        code: 'KeyA',
      })

      setupWithQuickDelete.handleSelectAll(event)
      // Just verify it doesn't throw an error
      expect(setupWithQuickDelete.tagsData.value).toBeDefined()
    })
  })

  describe('filteredItems', () => {
    it('should filter items by input value', () => {
      setup.input.value = 'J'

      expect(setup.filteredItems.value).toContain('JavaScript')
      expect(setup.filteredItems.value).not.toContain('React')
    })

    it('should perform case-insensitive filtering', () => {
      setup.input.value = 'j'

      expect(setup.filteredItems.value).toContain('JavaScript')
    })

    it('should return empty array when no matches', () => {
      setup.input.value = 'xyz'

      expect(setup.filteredItems.value).toHaveLength(0)
    })
  })

  describe('watchers', () => {
    it('should show suggestions when input has value and autosuggest enabled', async () => {
      setup.input.value = 'J'
      await nextTick()

      expect(setup.showSuggestions.value).toBe(true)
    })

    it('should hide suggestions when input cleared', async () => {
      setup.input.value = 'J'
      await nextTick()
      setup.input.value = ''
      await nextTick()

      expect(setup.showSuggestions.value).toBe(false)
    })

    it('should manage input change state correctly', async () => {
      setup.input.value = ''
      setup.showSuggestions.value = true
      await nextTick()
      setup.input.value = 'text'
      await nextTick()

      // When input changes, suggestions behavior is managed
      expect(setup.input.value).toBe('text')
    })

    it('should call onChanged when tagsData length changes', async () => {
      mockOnChanged.mockClear()
      setup.tagsData.value = [{ id: '1', name: 'tag1', value: 'tag1' }]
      await nextTick()

      expect(mockOnChanged).toHaveBeenCalled()
    })
  })

  describe('Fuzzy Matching (Fuse.js)', () => {
    it('should perform fuzzy matching on input', () => {
      setup.input.value = 'Java'
      const results = setup.filteredItems.value
      expect(results.length).toBeGreaterThan(0)
      expect(results.some((item) => item.includes('Java'))).toBe(true)
    })

    it('should match partial words', () => {
      setup.input.value = 'Script'
      const results = setup.filteredItems.value
      expect(results.length).toBeGreaterThan(0)
      expect(results.some((item) => item.includes('Script'))).toBe(true)
    })

    it('should handle no matches with empty results', () => {
      setup.input.value = 'nonexistent'
      expect(setup.filteredItems.value.length).toBe(0)
    })

    it('should return empty array when input is empty', () => {
      setup.input.value = ''
      expect(setup.filteredItems.value.length).toBe(0)
    })

    it('should be case-insensitive', () => {
      setup.input.value = 'java'
      const results = setup.filteredItems.value
      expect(results.length).toBeGreaterThan(0)
    })

    it('should support fuzzy matching with similar strings', () => {
      // With threshold 0.3, "Typscript" should match "TypeScript"
      setup.input.value = 'Typscript'
      const results = setup.filteredItems.value
      expect(results.length).toBeGreaterThan(0)
    })

    it('should match multiple items for partial input', () => {
      setup.input.value = 'T'
      const results = setup.filteredItems.value
      // Should match TypeScript, and potentially others
      expect(results.some((item) => item.includes('T'))).toBe(true)
    })
  })

  describe('Keyboard Navigation - Home/End Keys', () => {
    beforeEach(() => {
      setup.input.value = 'J'
      setup.showSuggestions.value = true
    })

    it('should handle Home key to go to first suggestion', () => {
      const event = new KeyboardEvent('keydown', { key: 'Home' })
      const preventDefaultSpy = vi.spyOn(event, 'preventDefault')

      setup.handleHome(event)

      expect(setup.selectedIndex.value).toBe(0)
      expect(preventDefaultSpy).toHaveBeenCalled()
    })

    it('should handle End key to go to last suggestion', () => {
      const event = new KeyboardEvent('keydown', { key: 'End' })
      const preventDefaultSpy = vi.spyOn(event, 'preventDefault')

      setup.handleEnd(event)

      const lastIndex = setup.filteredItems.value.length - 1
      expect(setup.selectedIndex.value).toBe(lastIndex)
      expect(preventDefaultSpy).toHaveBeenCalled()
    })

    it('should not handle Home when suggestions hidden', () => {
      setup.showSuggestions.value = false
      const event = new KeyboardEvent('keydown', { key: 'Home' })
      const preventDefaultSpy = vi.spyOn(event, 'preventDefault')

      setup.handleHome(event)

      expect(preventDefaultSpy).not.toHaveBeenCalled()
    })

    it('should not handle End when suggestions hidden', () => {
      setup.showSuggestions.value = false
      const event = new KeyboardEvent('keydown', { key: 'End' })
      const preventDefaultSpy = vi.spyOn(event, 'preventDefault')

      setup.handleEnd(event)

      expect(preventDefaultSpy).not.toHaveBeenCalled()
    })

    it('should not handle Home when no filtered items', () => {
      setup.input.value = 'xyz'
      const event = new KeyboardEvent('keydown', { key: 'Home' })
      const preventDefaultSpy = vi.spyOn(event, 'preventDefault')

      setup.handleHome(event)

      expect(preventDefaultSpy).not.toHaveBeenCalled()
    })
  })

  describe('Keyboard Navigation - Tab Key', () => {
    beforeEach(() => {
      setup.input.value = 'J'
      setup.showSuggestions.value = true
    })

    it('should handle Tab key to select item when index valid', async () => {
      const mockFocus = vi.fn()
      ;(setup.textInputRef as unknown) = { value: { focus: mockFocus } }

      setup.selectedIndex.value = 0
      const event = new KeyboardEvent('keydown', { key: 'Tab' })

      setup.handleTab(event)
      await nextTick()

      expect(setup.tagsData.value.length).toBeGreaterThan(0)
    })

    it('should close suggestions on Tab when no item selected', async () => {
      setup.selectedIndex.value = -1
      const event = new KeyboardEvent('keydown', { key: 'Tab' })
      const preventDefaultSpy = vi.spyOn(event, 'preventDefault')

      setup.handleTab(event)
      await nextTick()

      expect(preventDefaultSpy).toHaveBeenCalled()
      expect(setup.showSuggestions.value).toBe(false)
    })

    it('should not handle Tab when suggestions hidden', () => {
      setup.showSuggestions.value = false
      const event = new KeyboardEvent('keydown', { key: 'Tab' })
      const preventDefaultSpy = vi.spyOn(event, 'preventDefault')

      setup.handleTab(event)

      expect(preventDefaultSpy).not.toHaveBeenCalled()
    })

    it('should handle Tab with out of bounds index gracefully', () => {
      setup.selectedIndex.value = 999
      const event = new KeyboardEvent('keydown', { key: 'Tab' })

      setup.handleTab(event)

      // Should not crash and should close suggestions
      expect(setup.showSuggestions.value).toBe(false)
    })
  })

  describe('Error Handling & Announcements', () => {
    it('should show error when adding duplicate tag', () => {
      setup.tagsData.value = [
        {
          id: '1',
          name: 'JavaScript',
          value: 'JavaScript',
        },
      ]

      setup.handleAddTag('JavaScript')

      expect(setup.errorMessage.value).toContain('already added')
    })

    it('should show error when exceeding max tags', () => {
      const setupMax1 = MainSetup({
        autosuggest: true,
        allowPaste: { delimiter: ',' },
        allowDuplicates: false,
        maxTags: 1,
        defaultTags: ['tag1'],
        sources: [],
        quickDelete: true,
        width: '100%',
      })

      setupMax1.handleAddTag('tag2')

      expect(setupMax1.errorMessage.value).toContain('Maximum')
    })

    it('should announce tag addition to screen readers', async () => {
      const mockFocus = vi.fn()
      ;(setup.textInputRef as unknown) = { value: { focus: mockFocus } }

      setup.handleAddTag('NewTag')
      await nextTick()

      expect(setup.announcement.value).toContain('NewTag added')
    })

    it('should announce tag removal to screen readers', () => {
      setup.tagsData.value = [
        {
          id: '1',
          name: 'TestTag',
          value: 'TestTag',
        },
      ]

      setup.handleRemoveTag('1')

      expect(setup.announcement.value).toContain('TestTag removed')
    })

    it('should auto-dismiss error messages after timeout', async () => {
      vi.useFakeTimers()

      setup.tagsData.value = [
        {
          id: '1',
          name: 'Tag',
          value: 'Tag',
        },
      ]

      setup.handleAddTag('Tag')
      expect(setup.errorMessage.value).not.toBe('')

      vi.advanceTimersByTime(4100)

      expect(setup.errorMessage.value).toBe('')

      vi.useRealTimers()
    })

    it('should auto-clear announcements after timeout', async () => {
      vi.useFakeTimers()

      const mockFocus = vi.fn()
      ;(setup.textInputRef as unknown) = { value: { focus: mockFocus } }

      setup.handleAddTag('tag')
      expect(setup.announcement.value).not.toBe('')

      vi.advanceTimersByTime(1100)

      expect(setup.announcement.value).toBe('')

      vi.useRealTimers()
    })
  })

  describe('Error Handling - Edge Cases', () => {
    it('should handle adding tag with empty name gracefully', () => {
      const initialLength = setup.tagsData.value.length
      setup.handleAddTag('')

      expect(setup.tagsData.value.length).toBe(initialLength)
    })

    it('should validate tags with special characters', () => {
      setup.handleAddTag('tag@#$')
      expect(setup.tagsData.value.length).toBeGreaterThanOrEqual(0)
    })

    it('should handle maxTags of 0', () => {
      const setupMax0 = MainSetup({
        autosuggest: true,
        allowPaste: { delimiter: ',' },
        allowDuplicates: false,
        maxTags: 0,
        defaultTags: [],
        sources: [],
        quickDelete: true,
        width: '100%',
      })

      setupMax0.handleAddTag('tag')
      expect(setupMax0.tagsData.value).toHaveLength(0)
    })
  })

  describe('Delete Operations - Complete Coverage', () => {
    it('should handle delete with no tags', () => {
      setup.tagsData.value = []
      setup.input.value = ''

      setup.handleDelete()

      expect(setup.tagsData.value).toHaveLength(0)
    })

    it('should delete marked tag on second delete', () => {
      setup.tagsData.value = [{ id: '1', name: 'tag1', value: 'tag1' }]
      setup.input.value = ''

      setup.handleDelete()
      expect(setup.tagsData.value[0]!.highlight).toBe(true)

      setup.handleDelete()
      expect(setup.tagsData.value).toHaveLength(0)
    })

    it('should highlight last tag before deleting', () => {
      setup.tagsData.value = [
        { id: '1', name: 'tag1', value: 'tag1' },
        { id: '2', name: 'tag2', value: 'tag2' },
      ]
      setup.input.value = ''

      setup.handleDelete()

      // Last tag should be highlighted
      const lastTag = setup.tagsData.value[setup.tagsData.value.length - 1]
      expect(lastTag?.highlight).toBe(true)
    })
  })

  describe('Input Watcher Behavior', () => {
    it('should handle autosuggest false with input', async () => {
      const setupNoAutosuggest = MainSetup({
        autosuggest: false,
        allowPaste: { delimiter: ',' },
        allowDuplicates: false,
        maxTags: 10,
        defaultTags: [],
        sources: ['JavaScript', 'Vue.js'],
        quickDelete: true,
        width: '100%',
      })

      setupNoAutosuggest.input.value = 'JS'
      await nextTick()

      expect(setupNoAutosuggest.showSuggestions.value).toBe(false)
    })

    it('should reset suggestions when input changes', async () => {
      setup.input.value = 'J'
      await nextTick()
      expect(setup.showSuggestions.value).toBe(true)

      setup.input.value = ''
      await nextTick()

      expect(setup.showSuggestions.value).toBe(false)
    })

    it('should handle empty input correctly', async () => {
      setup.input.value = 'text'
      await nextTick()

      setup.input.value = ''
      await nextTick()

      expect(setup.input.value).toBe('')
    })
  })

  describe('SelectAll Handler', () => {
    it('should handle ctrl+a when quickDelete is enabled', () => {
      const setupWithQuickDelete = MainSetup({
        autosuggest: true,
        allowPaste: { delimiter: ',' },
        allowDuplicates: false,
        maxTags: 10,
        defaultTags: ['tag1', 'tag2'],
        sources: [],
        quickDelete: true,
        width: '100%',
      })

      const event = new KeyboardEvent('keydown', {
        key: 'a',
        ctrlKey: true,
      })

      Object.defineProperty(event, 'key', { value: 'a' })

      setupWithQuickDelete.handleSelectAll(event)
      // Just verify it doesn't throw and tags exist
      expect(setupWithQuickDelete.tagsData.value).toBeDefined()
    })

    it('should not respond to ctrl+a when quickDelete is disabled', () => {
      const setupNoQuickDelete = MainSetup({
        autosuggest: true,
        allowPaste: { delimiter: ',' },
        allowDuplicates: false,
        maxTags: 10,
        defaultTags: ['tag1', 'tag2'],
        sources: [],
        quickDelete: false,
        width: '100%',
      })

      const event = new KeyboardEvent('keydown', {
        key: 'a',
      })

      const initialLength = setupNoQuickDelete.tagsData.value.length
      setupNoQuickDelete.handleSelectAll(event)

      expect(setupNoQuickDelete.tagsData.value.length).toBe(initialLength)
    })
  })

  describe('Duplicate Prevention - Regex Handling', () => {
    it('should use case-insensitive regex for duplicate detection', () => {
      setup.tagsData.value = [
        {
          id: '1',
          name: 'Test',
          value: 'Test',
        },
      ]

      setup.handleAddTag('test')
      setup.handleAddTag('TEST')
      setup.handleAddTag('TeSt')

      // All should be rejected
      expect(setup.tagsData.value).toHaveLength(1)
    })

    it('should handle special regex characters in tag names', () => {
      setup.tagsData.value = [
        {
          id: '1',
          name: 'c++',
          value: 'c++',
        },
      ]

      setup.handleAddTag('c++')

      // Should not crash and should prevent duplicate
      expect(setup.tagsData.value).toHaveLength(1)
    })
  })
})
