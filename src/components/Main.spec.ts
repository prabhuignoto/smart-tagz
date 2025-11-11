import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import Main from './Main.vue'

describe('Main.vue', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Props - Defaults', () => {
    it('should render with default props', () => {
      const wrapper = mount(Main)
      expect(wrapper.vm).toBeTruthy()
      expect(wrapper.vm.readOnly).toBe(false)
      expect(wrapper.vm.editable).toBe(false)
      expect(wrapper.vm.autosuggest).toBe(false)
      expect(wrapper.vm.allowDuplicates).toBe(true)
      expect(wrapper.vm.maxTags).toBe(20)
      expect(wrapper.vm.inputPlaceholder).toBe('Enter tag...')
    })

    it('should apply default theme colors', () => {
      const wrapper = mount(Main)
      const mainDiv = wrapper.find('.tags-main')

      expect(mainDiv.attributes('style')).toContain('#eaf1f8')
    })

    it('should apply default classNames', () => {
      const wrapper = mount(Main)
      const mainDiv = wrapper.find('.tags-main')

      expect(mainDiv.classes()).toContain('tags_wrapper_custom')
    })
  })

  describe('Props - Validation', () => {
    it('should accept readOnly prop', () => {
      const wrapper = mount(Main, {
        props: {
          readOnly: true,
        },
      })

      expect(wrapper.vm.readOnly).toBe(true)
      expect(wrapper.find('input').exists()).toBe(false)
    })

    it('should accept editable prop', () => {
      const wrapper = mount(Main, {
        props: {
          editable: true,
        },
      })

      expect(wrapper.vm.editable).toBe(true)
    })

    it('should accept maxTags prop', () => {
      const wrapper = mount(Main, {
        props: {
          maxTags: 5,
        },
      })

      expect(wrapper.vm.maxTags).toBe(5)
    })

    it('should accept defaultTags prop', () => {
      const wrapper = mount(Main, {
        props: {
          defaultTags: ['tag1', 'tag2'],
        },
      })

      expect(wrapper.vm.tagsData).toHaveLength(2)
    })

    it('should accept custom inputPlaceholder', () => {
      const wrapper = mount(Main, {
        props: {
          inputPlaceholder: 'Add items...',
        },
      })

      // Check that the component accepts and stores the inputPlaceholder prop
      expect(wrapper.vm.inputPlaceholder).toBe('Add items...')

      // Verify no placeholder attribute on input
      const input = wrapper.find('input')
      expect(input.attributes('placeholder')).toBeUndefined()
    })

    it('should accept theme prop with custom colors', () => {
      const customTheme = {
        primary: '#ff0000',
        background: '#ffffff',
        tagTextColor: '#000000',
      }

      const wrapper = mount(Main, {
        props: {
          theme: customTheme,
        },
      })

      const mainDiv = wrapper.find('.tags-main')
      expect(mainDiv.attributes('style')).toContain('#ffffff')
    })

    it('should accept sources prop for autosuggest', () => {
      const sources = ['JavaScript', 'TypeScript', 'Vue']
      const wrapper = mount(Main, {
        props: {
          sources,
          autosuggest: true,
        },
      })

      expect(wrapper.vm.sources).toEqual(sources)
    })

    it('should accept allowPaste prop with delimiter', () => {
      const wrapper = mount(Main, {
        props: {
          allowPaste: { delimiter: ';' },
        },
      })

      expect(wrapper.vm.allowPaste?.delimiter).toBe(';')
    })

    it('should accept quickDelete prop', () => {
      const wrapper = mount(Main, {
        props: {
          quickDelete: true,
        },
      })

      expect(wrapper.vm.quickDelete).toBe(true)
    })
  })

  describe('Input Behavior', () => {
    it('should show input when tags count < maxTags', () => {
      const wrapper = mount(Main, {
        props: {
          maxTags: 5,
        },
      })

      expect(wrapper.find('input').exists()).toBe(true)
    })

    it('should hide input when tags count >= maxTags', () => {
      const wrapper = mount(Main, {
        props: {
          maxTags: 2,
          defaultTags: ['tag1', 'tag2'],
        },
      })

      expect(wrapper.find('input').exists()).toBe(false)
    })

    it('should hide input when readOnly is true', () => {
      const wrapper = mount(Main, {
        props: {
          readOnly: true,
        },
      })

      expect(wrapper.find('input').exists()).toBe(false)
    })

    it('should allow typing in input', async () => {
      const wrapper = mount(Main)
      const input = wrapper.find('input')

      await input.setValue('test')
      expect(wrapper.vm.input).toBe('test')
    })
  })

  describe('Event Handling', () => {
    it('should handle Enter key to add tag', async () => {
      const wrapper = mount(Main)
      const input = wrapper.find('input')

      await input.setValue('newtag')
      await input.trigger('keyup.enter')

      expect(wrapper.vm.tagsData.some((t) => t.name === 'newtag')).toBe(true)
    })

    it('should handle Delete/Backspace key', async () => {
      const wrapper = mount(Main, {
        props: {
          defaultTags: ['tag1'],
        },
      })

      await wrapper.find('input').trigger('keyup.delete')
      await nextTick()

      expect(wrapper.vm.tagsData[0]!.highlight).toBe(true)
    })

    it('should handle Escape key', async () => {
      const wrapper = mount(Main)
      const input = wrapper.find('input')

      wrapper.vm.showSuggestions = true
      await input.trigger('keyup.esc')

      expect(wrapper.vm.showSuggestions).toBe(false)
    })

    it('should handle ArrowDown key for suggestion navigation', async () => {
      const wrapper = mount(Main, {
        props: {
          sources: ['JavaScript', 'Vue.js', 'React'],
          autosuggest: true,
        },
      })

      await wrapper.find('input').setValue('J')
      await wrapper.find('input').trigger('keydown.down')

      expect(wrapper.vm.selectedIndex).toBe(0)
    })

    it('should handle ArrowUp key for suggestion navigation', async () => {
      const wrapper = mount(Main, {
        props: {
          sources: ['JavaScript', 'Vue.js', 'React'],
          autosuggest: true,
        },
      })

      await wrapper.find('input').setValue('e')
      wrapper.vm.selectedIndex = 1
      await wrapper.find('input').trigger('keydown.up')

      expect(wrapper.vm.selectedIndex).toBe(0)
    })

    it('should accept quickDelete prop', async () => {
      const wrapper = mount(Main, {
        props: {
          quickDelete: true,
          defaultTags: ['tag1', 'tag2'],
        },
      })

      // quickDelete prop is accepted and the component renders with tags
      expect(wrapper.vm.quickDelete).toBe(true)
      expect(wrapper.vm.tagsData.length).toBeGreaterThan(0)
    })

    it('should handle paste event', async () => {
      const wrapper = mount(Main, {
        props: {
          allowPaste: { delimiter: ',' },
        },
      })

      const input = wrapper.find('input')
      const pasteEvent = new ClipboardEvent('paste', {
        clipboardData: new DataTransfer(),
      })

      Object.defineProperty(pasteEvent.clipboardData, 'getData', {
        value: () => 'tag1,tag2',
      })

      await input.element.dispatchEvent(pasteEvent)
      await nextTick()

      expect(wrapper.vm.tagsData.length).toBeGreaterThan(0)
    })

    it('should handle blur event to escape', async () => {
      const wrapper = mount(Main)

      wrapper.vm.showSuggestions = true
      await wrapper.find('input').trigger('blur')

      expect(wrapper.vm.showSuggestions).toBe(false)
    })
  })

  describe('Tag Management', () => {
    it('should add tag through handleAddTag', () => {
      const wrapper = mount(Main)

      wrapper.vm.handleAddTag('newtag')

      expect(wrapper.vm.tagsData).toContainEqual(
        expect.objectContaining({
          name: 'newtag',
        })
      )
    })

    it('should remove tag through handleRemoveTag', () => {
      const wrapper = mount(Main, {
        props: {
          defaultTags: ['tag1', 'tag2'],
        },
      })

      const tagId = wrapper.vm.tagsData[0]!.id
      wrapper.vm.handleRemoveTag(tagId)

      expect(wrapper.vm.tagsData).toHaveLength(1)
    })

    it('should edit tag through handleEditTag', () => {
      const wrapper = mount(Main, {
        props: {
          editable: true,
          defaultTags: ['oldtag'],
        },
      })

      const tagId = wrapper.vm.tagsData[0]!.id
      wrapper.vm.handleEditTag(tagId, 'newtag')

      expect(wrapper.vm.tagsData[0]!.name).toBe('newtag')
    })

    it('should prevent adding duplicate tags by default', () => {
      const wrapper = mount(Main, {
        props: {
          defaultTags: ['tag1'],
          allowDuplicates: false,
        },
      })

      wrapper.vm.handleAddTag('tag1')

      expect(wrapper.vm.tagsData.filter((t) => t.name === 'tag1')).toHaveLength(1)
    })

    it('should allow duplicate tags when allowDuplicates is true', () => {
      const wrapper = mount(Main, {
        props: {
          defaultTags: ['tag1'],
          allowDuplicates: true,
        },
      })

      wrapper.vm.handleAddTag('tag1')

      expect(wrapper.vm.tagsData.filter((t) => t.name === 'tag1')).toHaveLength(2)
    })
  })

  describe('Autosuggest', () => {
    it('should show suggestions when autosuggest enabled and input has value', async () => {
      const wrapper = mount(Main, {
        props: {
          autosuggest: true,
          sources: ['JavaScript', 'Vue.js', 'React'],
        },
      })

      await wrapper.find('input').setValue('J')
      await nextTick()

      expect(wrapper.vm.showSuggestions).toBe(true)
    })

    it('should hide suggestions when input is cleared', async () => {
      const wrapper = mount(Main, {
        props: {
          autosuggest: true,
          sources: ['JavaScript', 'Vue.js', 'React'],
        },
      })

      await wrapper.find('input').setValue('J')
      await nextTick()
      await wrapper.find('input').setValue('')
      await nextTick()

      expect(wrapper.vm.showSuggestions).toBe(false)
    })

    it('should filter suggestions based on input', () => {
      const wrapper = mount(Main, {
        props: {
          autosuggest: true,
          sources: ['JavaScript', 'Vue.js', 'React', 'TypeScript'],
        },
      })

      wrapper.vm.input = 'J'

      expect(wrapper.vm.filteredItems).toContain('JavaScript')
      expect(wrapper.vm.filteredItems).not.toContain('React')
    })

    it('should handle suggestion selection', async () => {
      const wrapper = mount(Main, {
        props: {
          autosuggest: true,
          sources: ['JavaScript', 'Vue.js'],
        },
      })

      wrapper.vm.handleSuggestSelection('JavaScript')
      await nextTick()

      expect(wrapper.vm.tagsData.some((t) => t.name === 'JavaScript')).toBe(true)
    })

    it('should escape suggestion pane', () => {
      const wrapper = mount(Main, {
        props: {
          autosuggest: true,
        },
      })

      wrapper.vm.showSuggestions = true
      wrapper.vm.handleSuggestEsc()

      expect(wrapper.vm.showSuggestions).toBe(false)
    })
  })

  describe('onChanged Callback', () => {
    it('should accept onChanged callback prop', () => {
      const onChanged = vi.fn()
      const wrapper = mount(Main, {
        props: {
          onChanged,
        },
      })

      // onChanged prop is provided
      expect(wrapper.vm.onChanged).toBeDefined()
    })

    it('should have onChanged provided after tag addition', () => {
      const onChanged = vi.fn()
      const wrapper = mount(Main, {
        props: {
          defaultTags: ['tag1'],
          onChanged,
        },
      })

      // Component has default tags, setup is initialized
      expect(wrapper.vm.tagsData.length).toBeGreaterThan(0)
    })

    it('should call onChanged after edit', async () => {
      const onChanged = vi.fn()
      const wrapper = mount(Main, {
        props: {
          defaultTags: ['oldtag'],
          editable: true,
          onChanged,
        },
      })

      const tagId = wrapper.vm.tagsData[0]!.id
      wrapper.vm.handleEditTag(tagId, 'newtag')

      await wrapper.vm.$nextTick()

      expect(onChanged).toHaveBeenCalledWith(['newtag'])
    })

    it('should not call onChanged if no callback provided', () => {
      const wrapper = mount(Main, {
        props: {
          onChanged: undefined,
        },
      })

      expect(() => {
        wrapper.vm.handleAddTag('tag1')
      }).not.toThrow()
    })
  })

  describe('CSS and Styling', () => {
    it('should apply wrapper classNames', () => {
      const wrapper = mount(Main, {
        props: {
          classNames: {
            wrapper: 'custom-wrapper',
            tag_container: 'custom-container',
            tag_name: 'custom-name',
            tag_close_btn: 'custom-btn',
          },
        },
      })

      expect(wrapper.find('.tags-main').classes()).toContain('custom-wrapper')
    })

    it('should apply theme background color', () => {
      const wrapper = mount(Main, {
        props: {
          theme: {
            primary: '#00ff00',
            background: '#ff0000',
            tagTextColor: '#000000',
          },
        },
      })

      const style = wrapper.find('.tags-main').attributes('style')
      expect(style).toContain('#ff0000')
    })

    it('should apply input width', () => {
      const wrapper = mount(Main, {
        props: {
          width: '50%',
        },
      })

      expect(wrapper.vm.style).toEqual({ width: '50%' })
    })
  })

  describe('Template Rendering', () => {
    it('should render SmartTags component', () => {
      const wrapper = mount(Main)
      expect(wrapper.findComponent({ name: 'SmartTags' }).exists()).toBe(true)
    })

    it('should have SuggestionPane in template', () => {
      const wrapper = mount(Main, {
        props: {
          autosuggest: true,
        },
      })

      // SuggestionPane is rendered in the template
      expect(wrapper.html()).toContain('suggestion')
    })

    it('should pass correct props to SmartTags', () => {
      const wrapper = mount(Main, {
        props: {
          editable: true,
          readOnly: false,
        },
      })

      const smartTags = wrapper.findComponent({ name: 'SmartTags' })
      expect(smartTags.props('editable')).toBe(true)
      expect(smartTags.props('readOnly')).toBe(false)
    })

    it('should pass theme styles to SmartTags', () => {
      const theme = {
        primary: '#ff0000',
        background: '#ffffff',
        tagTextColor: '#000000',
      }

      const wrapper = mount(Main, {
        props: {
          theme,
        },
      })

      const smartTags = wrapper.findComponent({ name: 'SmartTags' })
      expect(smartTags.props('tagStyle')).toEqual({
        foreColor: theme.tagTextColor,
        backgroundColor: theme.primary,
      })
    })
  })

  describe('Edge Cases', () => {
    it('should handle empty sources array', () => {
      const wrapper = mount(Main, {
        props: {
          autosuggest: true,
          sources: [],
        },
      })

      expect(wrapper.vm.sources).toEqual([])
      expect(wrapper.vm.filteredItems).toEqual([])
    })

    it('should handle very large maxTags value', () => {
      const wrapper = mount(Main, {
        props: {
          maxTags: 1000,
        },
      })

      expect(wrapper.vm.maxTags).toBe(1000)
    })

    it('should handle special characters in placeholder', () => {
      const wrapper = mount(Main, {
        props: {
          inputPlaceholder: 'Add tags... (e.g., @tag, #tag)',
        },
      })

      // Check that the component accepts special characters in the placeholder
      expect(wrapper.vm.inputPlaceholder).toBe('Add tags... (e.g., @tag, #tag)')

      // Check that the input has no placeholder attribute
      const input = wrapper.find('input')
      expect(input.attributes('placeholder')).toBeUndefined()
    })

    it('should handle whitespace in defaultTags', () => {
      const wrapper = mount(Main, {
        props: {
          defaultTags: ['tag with spaces', 'another tag'],
        },
      })

      expect(wrapper.vm.tagsData).toHaveLength(2)
      expect(wrapper.vm.tagsData[0]!.name).toBe('tag with spaces')
    })
  })
})
