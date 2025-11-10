import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import SuggestPane from './SuggestPane.vue'

describe('SuggestPane.vue', () => {
  const mockOnSelection = vi.fn()
  const mockOnPaneEsc = vi.fn()
  const sampleItems = ['JavaScript', 'Vue.js', 'React', 'TypeScript']

  beforeEach(() => {
    mockOnSelection.mockClear()
    mockOnPaneEsc.mockClear()
  })

  describe('Props - Defaults', () => {
    it('should render with default props', () => {
      const wrapper = mount(SuggestPane, {
        props: {
          items: sampleItems,
          keyword: 'J',
          onSelection: mockOnSelection,
          onPaneEsc: mockOnPaneEsc,
        },
      })

      expect(wrapper.vm.show).toBe(false)
      expect(wrapper.vm.selectedIndex).toBe(-1)
    })

    it('should apply default paneStyle', () => {
      const wrapper = mount(SuggestPane, {
        props: {
          items: sampleItems,
          keyword: 'J',
          onSelection: mockOnSelection,
          onPaneEsc: mockOnPaneEsc,
        },
      })

      expect(wrapper.vm.paneStyle).toEqual({ bgColor: '' })
    })
  })

  describe('Props - Validation', () => {
    it('should accept items prop', () => {
      const wrapper = mount(SuggestPane, {
        props: {
          items: sampleItems,
          keyword: 'J',
          onSelection: mockOnSelection,
          onPaneEsc: mockOnPaneEsc,
        },
      })

      expect(wrapper.vm.items).toEqual(sampleItems)
    })

    it('should accept show prop', () => {
      const wrapper = mount(SuggestPane, {
        props: {
          items: sampleItems,
          show: true,
          keyword: 'J',
          onSelection: mockOnSelection,
          onPaneEsc: mockOnPaneEsc,
        },
      })

      expect(wrapper.vm.show).toBe(true)
    })

    it('should accept selectedIndex prop', () => {
      const wrapper = mount(SuggestPane, {
        props: {
          items: sampleItems,
          keyword: 'J',
          selectedIndex: 2,
          onSelection: mockOnSelection,
          onPaneEsc: mockOnPaneEsc,
        },
      })

      expect(wrapper.vm.selectedIndex).toBe(2)
    })

    it('should accept custom paneStyle', () => {
      const paneStyle = { bgColor: '#ff0000' }

      const wrapper = mount(SuggestPane, {
        props: {
          items: sampleItems,
          keyword: 'J',
          paneStyle,
          onSelection: mockOnSelection,
          onPaneEsc: mockOnPaneEsc,
        },
      })

      expect(wrapper.vm.paneStyle).toEqual(paneStyle)
    })

    it('should accept keyword prop', () => {
      const wrapper = mount(SuggestPane, {
        props: {
          items: sampleItems,
          keyword: 'Test',
          onSelection: mockOnSelection,
          onPaneEsc: mockOnPaneEsc,
        },
      })

      expect(wrapper.vm.keyword).toBe('Test')
    })
  })

  describe('Rendering', () => {
    it('should not render when show is false', () => {
      const wrapper = mount(SuggestPane, {
        props: {
          items: sampleItems,
          show: false,
          keyword: 'J',
          onSelection: mockOnSelection,
          onPaneEsc: mockOnPaneEsc,
        },
      })

      expect(wrapper.vm.showPane).toBe(false)
    })

    it('should have showPane ref that can be toggled', async () => {
      const wrapper = mount(SuggestPane, {
        props: {
          items: sampleItems,
          show: false,
          keyword: 'J',
          onSelection: mockOnSelection,
          onPaneEsc: mockOnPaneEsc,
        },
      })

      // showPane starts as false
      expect(wrapper.vm.showPane).toBe(false)

      // Can be manually toggled
      wrapper.vm.showPane = true
      expect(wrapper.vm.showPane).toBe(true)
    })

    it('should render list when showPane is true', async () => {
      const wrapper = mount(SuggestPane, {
        props: {
          items: sampleItems,
          show: true,
          keyword: 'J',
          onSelection: mockOnSelection,
          onPaneEsc: mockOnPaneEsc,
        },
      })

      wrapper.vm.showPane = true
      await nextTick()

      const pane = wrapper.find('.suggest-pane')
      expect(pane.exists()).toBe(true)
    })

    it('should have items in the list', () => {
      const wrapper = mount(SuggestPane, {
        props: {
          items: sampleItems,
          show: false,
          keyword: 'J',
          onSelection: mockOnSelection,
          onPaneEsc: mockOnPaneEsc,
        },
      })

      // Items prop should be accessible
      expect(wrapper.vm.items).toEqual(sampleItems)
    })

    it('should render empty list when items array is empty', () => {
      const wrapper = mount(SuggestPane, {
        props: {
          items: [],
          show: true,
          keyword: 'J',
          onSelection: mockOnSelection,
          onPaneEsc: mockOnPaneEsc,
        },
      })

      const items = wrapper.findAll('.suggest-pane-item')
      expect(items).toHaveLength(0)
    })
  })

  describe('Selection', () => {
    it('should have selectedIndex prop', () => {
      const wrapper = mount(SuggestPane, {
        props: {
          items: sampleItems,
          show: true,
          keyword: 'J',
          selectedIndex: 2,
          onSelection: mockOnSelection,
          onPaneEsc: mockOnPaneEsc,
        },
      })

      expect(wrapper.vm.selectedIndex).toBe(2)
    })

    it('should update selectedIndex when prop changes', async () => {
      const wrapper = mount(SuggestPane, {
        props: {
          items: sampleItems,
          show: true,
          keyword: 'J',
          selectedIndex: 0,
          onSelection: mockOnSelection,
          onPaneEsc: mockOnPaneEsc,
        },
      })

      expect(wrapper.vm.selectedIndex).toBe(0)

      await wrapper.setProps({ selectedIndex: 2 })

      expect(wrapper.vm.selectedIndex).toBe(2)
    })

    it('should not highlight any item when selectedIndex is -1', () => {
      const wrapper = mount(SuggestPane, {
        props: {
          items: sampleItems,
          show: true,
          keyword: 'J',
          selectedIndex: -1,
          onSelection: mockOnSelection,
          onPaneEsc: mockOnPaneEsc,
        },
      })

      const items = wrapper.findAll('.suggest-pane-item')
      items.forEach((item) => {
        expect(item.classes()).not.toContain('selected')
      })
    })
  })

  describe('Item Selection Event', () => {
    it('should call handleSelection method', () => {
      const wrapper = mount(SuggestPane, {
        props: {
          items: sampleItems,
          show: true,
          keyword: 'J',
          onSelection: mockOnSelection,
          onPaneEsc: mockOnPaneEsc,
        },
      })

      wrapper.vm.handleSelection('JavaScript')

      expect(mockOnSelection).toHaveBeenCalledWith('JavaScript')
    })

    it('should call onSelection with correct item', () => {
      const wrapper = mount(SuggestPane, {
        props: {
          items: sampleItems,
          show: true,
          keyword: 'J',
          onSelection: mockOnSelection,
          onPaneEsc: mockOnPaneEsc,
        },
      })

      wrapper.vm.handleSelection('React')

      expect(mockOnSelection).toHaveBeenCalledWith('React')
    })

    it('should handle multiple selections', () => {
      const wrapper = mount(SuggestPane, {
        props: {
          items: sampleItems,
          show: true,
          keyword: 'J',
          onSelection: mockOnSelection,
          onPaneEsc: mockOnPaneEsc,
        },
      })

      wrapper.vm.handleSelection('JavaScript')
      wrapper.vm.handleSelection('Vue.js')

      expect(mockOnSelection).toHaveBeenCalledTimes(2)
      expect(mockOnSelection).toHaveBeenNthCalledWith(1, 'JavaScript')
      expect(mockOnSelection).toHaveBeenNthCalledWith(2, 'Vue.js')
    })

    it('should not call onSelection if callback not provided', () => {
      const wrapper = mount(SuggestPane, {
        props: {
          items: sampleItems,
          show: true,
          keyword: 'J',
          onSelection: undefined,
          onPaneEsc: mockOnPaneEsc,
        },
      })

      wrapper.vm.handleSelection('JavaScript')

      expect(mockOnSelection).not.toHaveBeenCalled()
    })
  })

  describe('Visibility Watcher', () => {
    it('should update showPane when show prop becomes true', async () => {
      const wrapper = mount(SuggestPane, {
        props: {
          items: sampleItems,
          show: false,
          keyword: 'J',
          onSelection: mockOnSelection,
          onPaneEsc: mockOnPaneEsc,
        },
      })

      expect(wrapper.vm.showPane).toBe(false)

      await wrapper.setProps({ show: true })

      expect(wrapper.vm.showPane).toBe(true)
    })

    it('should allow managing showPane visibility', async () => {
      const wrapper = mount(SuggestPane, {
        props: {
          items: sampleItems,
          show: false,
          keyword: 'J',
          onSelection: mockOnSelection,
          onPaneEsc: mockOnPaneEsc,
        },
      })

      // Initially false
      expect(wrapper.vm.showPane).toBe(false)

      // Can be set to true
      wrapper.vm.showPane = true
      expect(wrapper.vm.showPane).toBe(true)

      // Can be set back to false
      wrapper.vm.showPane = false
      expect(wrapper.vm.showPane).toBe(false)
    })
  })

  describe('Styling', () => {
    it('should have paneStyle prop', () => {
      const wrapper = mount(SuggestPane, {
        props: {
          items: sampleItems,
          show: true,
          keyword: 'J',
          paneStyle: { bgColor: '#ff0000' },
          onSelection: mockOnSelection,
          onPaneEsc: mockOnPaneEsc,
        },
      })

      expect(wrapper.vm.paneStyle).toEqual({ bgColor: '#ff0000' })
    })

    it('should have default paneStyle', () => {
      const wrapper = mount(SuggestPane, {
        props: {
          items: sampleItems,
          show: true,
          keyword: 'J',
          onSelection: mockOnSelection,
          onPaneEsc: mockOnPaneEsc,
        },
      })

      expect(wrapper.vm.paneStyle).toEqual({ bgColor: '' })
    })
  })

  describe('Keyboard Navigation', () => {
    it('should have handleEnter method', () => {
      const wrapper = mount(SuggestPane, {
        props: {
          items: sampleItems,
          show: true,
          keyword: 'J',
          selectedIndex: 1,
          onSelection: mockOnSelection,
          onPaneEsc: mockOnPaneEsc,
        },
      })

      expect(typeof wrapper.vm.handleEnter).toBe('function')
    })

    it('handleEnter should call onSelection with selected item', () => {
      const wrapper = mount(SuggestPane, {
        props: {
          items: sampleItems,
          show: true,
          keyword: 'J',
          selectedIndex: 1,
          onSelection: mockOnSelection,
          onPaneEsc: mockOnPaneEsc,
        },
      })

      const event = new KeyboardEvent('keydown', { key: 'Enter' })
      wrapper.vm.handleEnter(event)

      expect(mockOnSelection).toHaveBeenCalledWith('Vue.js')
    })

    it('handleEnter should prevent default behavior', () => {
      const wrapper = mount(SuggestPane, {
        props: {
          items: sampleItems,
          show: true,
          keyword: 'J',
          selectedIndex: 0,
          onSelection: mockOnSelection,
          onPaneEsc: mockOnPaneEsc,
        },
      })

      const event = new KeyboardEvent('keydown', { key: 'Enter' })
      const preventDefaultSpy = vi.spyOn(event, 'preventDefault')

      wrapper.vm.handleEnter(event)

      expect(preventDefaultSpy).toHaveBeenCalled()
    })
  })

  describe('Edge Cases', () => {
    it('should accept items with special characters', () => {
      const specialItems = ['tag@123', 'tag#456', 'tag$789']

      const wrapper = mount(SuggestPane, {
        props: {
          items: specialItems,
          show: true,
          keyword: 'tag',
          onSelection: mockOnSelection,
          onPaneEsc: mockOnPaneEsc,
        },
      })

      expect(wrapper.vm.items).toEqual(specialItems)
    })

    it('should accept items with unicode characters', () => {
      const unicodeItems = ['🎉tag', 'tag中文', 'tagあ']

      const wrapper = mount(SuggestPane, {
        props: {
          items: unicodeItems,
          show: true,
          keyword: 'tag',
          onSelection: mockOnSelection,
          onPaneEsc: mockOnPaneEsc,
        },
      })

      expect(wrapper.vm.items).toEqual(unicodeItems)
    })

    it('should accept very long item names', () => {
      const longItems = ['a'.repeat(100), 'b'.repeat(100)]

      const wrapper = mount(SuggestPane, {
        props: {
          items: longItems,
          show: true,
          keyword: 'a',
          onSelection: mockOnSelection,
          onPaneEsc: mockOnPaneEsc,
        },
      })

      expect(wrapper.vm.items).toHaveLength(2)
    })

    it('should handle selectedIndex larger than items length', () => {
      const wrapper = mount(SuggestPane, {
        props: {
          items: sampleItems,
          show: true,
          keyword: 'J',
          selectedIndex: 100,
          onSelection: mockOnSelection,
          onPaneEsc: mockOnPaneEsc,
        },
      })

      expect(wrapper.vm.selectedIndex).toBe(100)
    })

    it('should accept many items', () => {
      const manyItems = Array.from({ length: 1000 }, (_, i) => `item${i}`)

      const wrapper = mount(SuggestPane, {
        props: {
          items: manyItems,
          show: true,
          keyword: 'item',
          onSelection: mockOnSelection,
          onPaneEsc: mockOnPaneEsc,
        },
      })

      expect(wrapper.vm.items).toHaveLength(1000)
    })
  })

  describe('Pane Reference', () => {
    it('should have paneRef', () => {
      const wrapper = mount(SuggestPane, {
        props: {
          items: sampleItems,
          show: true,
          keyword: 'J',
          onSelection: mockOnSelection,
          onPaneEsc: mockOnPaneEsc,
        },
      })

      expect(wrapper.vm.paneRef).toBeDefined()
    })

    it('should have access to pane reference', () => {
      const wrapper = mount(SuggestPane, {
        props: {
          items: sampleItems,
          show: true,
          keyword: 'J',
          onSelection: mockOnSelection,
          onPaneEsc: mockOnPaneEsc,
        },
      })

      // paneRef is accessible and can be used for DOM manipulation
      expect(typeof wrapper.vm.paneRef).toBe('object')
    })
  })
})
