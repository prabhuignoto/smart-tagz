import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import Tag from './Tag.vue'

describe('Tag.vue', () => {
  const mockOnRemove = vi.fn()
  const mockOnEdit = vi.fn()

  beforeEach(() => {
    mockOnRemove.mockClear()
    mockOnEdit.mockClear()
  })

  describe('Props - Defaults', () => {
    it('should render with default props', () => {
      const wrapper = mount(Tag, {
        props: {
          name: 'TestTag',
          onRemove: mockOnRemove,
          onEdit: mockOnEdit,
        },
      })

      expect(wrapper.vm.editable).toBe(false)
      expect(wrapper.vm.readOnly).toBe(false)
      // highlight prop defaults to undefined
      expect(wrapper.exists()).toBe(true)
    })

    it('should apply default classNames', () => {
      const wrapper = mount(Tag, {
        props: {
          name: 'TestTag',
          onRemove: mockOnRemove,
          onEdit: mockOnEdit,
        },
      })

      expect(wrapper.find('.tag-container').classes()).toContain(
        'tag_container'
      )
      expect(wrapper.find('.tag-name').classes()).toContain('tag_name')
    })

    it('should apply default tag style', () => {
      const wrapper = mount(Tag, {
        props: {
          name: 'TestTag',
          onRemove: mockOnRemove,
          onEdit: mockOnEdit,
        },
      })

      expect(wrapper.vm.style).toEqual({
        background: '',
        color: '',
      })
    })
  })

  describe('Props - Validation', () => {
    it('should accept name prop and display it', () => {
      const wrapper = mount(Tag, {
        props: {
          name: 'MyTag',
          onRemove: mockOnRemove,
          onEdit: mockOnEdit,
        },
      })

      expect(wrapper.find('.tag-name').text()).toBe('MyTag')
    })

    it('should accept id prop', () => {
      const wrapper = mount(Tag, {
        props: {
          name: 'TestTag',
          id: 'tag-123',
          onRemove: mockOnRemove,
          onEdit: mockOnEdit,
        },
      })

      expect(wrapper.vm.id).toBe('tag-123')
    })

    it('should accept editable prop', () => {
      const wrapper = mount(Tag, {
        props: {
          name: 'TestTag',
          editable: true,
          onRemove: mockOnRemove,
          onEdit: mockOnEdit,
        },
      })

      expect(wrapper.vm.editable).toBe(true)
    })

    it('should accept readOnly prop', () => {
      const wrapper = mount(Tag, {
        props: {
          name: 'TestTag',
          readOnly: true,
          onRemove: mockOnRemove,
          onEdit: mockOnEdit,
        },
      })

      expect(wrapper.vm.readOnly).toBe(true)
    })

    it('should accept highlight prop', () => {
      const wrapper = mount(Tag, {
        props: {
          name: 'TestTag',
          highlight: true,
          onRemove: mockOnRemove,
          onEdit: mockOnEdit,
        },
      })

      // highlight prop is provided
      expect(wrapper.exists()).toBe(true)
    })

    it('should accept custom classNames', () => {
      const classNames = {
        container: 'my-container',
        name: 'my-name',
        closeButton: 'my-button',
      }

      const wrapper = mount(Tag, {
        props: {
          name: 'TestTag',
          classNames,
          onRemove: mockOnRemove,
          onEdit: mockOnEdit,
        },
      })

      expect(wrapper.find('.tag-container').classes()).toContain('my-container')
      expect(wrapper.find('.tag-name').classes()).toContain('my-name')
      expect(wrapper.find('button').classes()).toContain('my-button')
    })

    it('should accept custom tagStyle', () => {
      const tagStyle = {
        foreColor: '#ffffff',
        backgroundColor: '#ff0000',
      }

      const wrapper = mount(Tag, {
        props: {
          name: 'TestTag',
          tagStyle,
          onRemove: mockOnRemove,
          onEdit: mockOnEdit,
        },
      })

      expect(wrapper.vm.style).toEqual({
        background: '#ff0000',
        color: '#ffffff',
      })
    })
  })

  describe('Tag Rendering', () => {
    it('should render tag name by default', () => {
      const wrapper = mount(Tag, {
        props: {
          name: 'TestTag',
          onRemove: mockOnRemove,
          onEdit: mockOnEdit,
        },
      })

      expect(wrapper.find('.tag-name').exists()).toBe(true)
      expect(wrapper.find('.tag-name').text()).toBe('TestTag')
    })

    it('should render remove button when not readOnly', () => {
      const wrapper = mount(Tag, {
        props: {
          name: 'TestTag',
          readOnly: false,
          onRemove: mockOnRemove,
          onEdit: mockOnEdit,
        },
      })

      expect(wrapper.find('button').exists()).toBe(true)
    })

    it('should not render remove button when readOnly', () => {
      const wrapper = mount(Tag, {
        props: {
          name: 'TestTag',
          readOnly: true,
          onRemove: mockOnRemove,
          onEdit: mockOnEdit,
        },
      })

      expect(wrapper.find('button').exists()).toBe(false)
    })

    it('should handle readOnly mode correctly', () => {
      const wrapper = mount(Tag, {
        props: {
          name: 'TestTag',
          readOnly: true,
          onRemove: mockOnRemove,
          onEdit: mockOnEdit,
        },
      })

      // In readOnly mode, the button should not be shown
      expect(wrapper.find('button').exists()).toBe(false)
    })
  })

  describe('Edit Mode', () => {
    it('should toggle edit mode on double click when editable', async () => {
      const wrapper = mount(Tag, {
        props: {
          name: 'TestTag',
          editable: true,
          onRemove: mockOnRemove,
          onEdit: mockOnEdit,
        },
      })

      await wrapper.find('.tag-name').trigger('dblclick')

      expect(wrapper.vm.editMode).toBe(true)
      expect(wrapper.find('input').exists()).toBe(true)
    })

    it('should not enter edit mode when not editable', async () => {
      const wrapper = mount(Tag, {
        props: {
          name: 'TestTag',
          editable: false,
          onRemove: mockOnRemove,
          onEdit: mockOnEdit,
        },
      })

      await wrapper.find('.tag-name').trigger('dblclick')

      expect(wrapper.vm.editMode).toBe(false)
    })

    it('should not enter edit mode when readOnly', async () => {
      const wrapper = mount(Tag, {
        props: {
          name: 'TestTag',
          editable: true,
          readOnly: true,
          onRemove: mockOnRemove,
          onEdit: mockOnEdit,
        },
      })

      await wrapper.find('.tag-name').trigger('dblclick')

      expect(wrapper.vm.editMode).toBe(false)
    })

    it('should show input when entering edit mode', async () => {
      const wrapper = mount(Tag, {
        props: {
          name: 'TestTag',
          editable: true,
          id: 'tag-1',
          onRemove: mockOnRemove,
          onEdit: mockOnEdit,
        },
      })

      await wrapper.find('.tag-name').trigger('dblclick')
      await nextTick()

      // Input should be visible in edit mode
      expect(wrapper.find('input').exists()).toBe(true)
    })

    it('should preserve current value in edit input', async () => {
      const wrapper = mount(Tag, {
        props: {
          name: 'TestTag',
          editable: true,
          onRemove: mockOnRemove,
          onEdit: mockOnEdit,
        },
      })

      await wrapper.find('.tag-name').trigger('dblclick')

      expect(wrapper.vm.input).toBe('TestTag')
      expect(wrapper.find('input').element.value).toBe('TestTag')
    })
  })

  describe('Edit Save', () => {
    it('should call onEdit when saving edit with Enter key', async () => {
      const wrapper = mount(Tag, {
        props: {
          name: 'TestTag',
          id: 'tag-1',
          editable: true,
          onRemove: mockOnRemove,
          onEdit: mockOnEdit,
        },
      })

      await wrapper.find('.tag-name').trigger('dblclick')
      wrapper.vm.input = 'UpdatedTag'
      await wrapper.find('input').trigger('keyup.enter')

      expect(mockOnEdit).toHaveBeenCalledWith('tag-1', 'UpdatedTag')
    })

    it('should exit edit mode after saving', async () => {
      const wrapper = mount(Tag, {
        props: {
          name: 'TestTag',
          id: 'tag-1',
          editable: true,
          onRemove: mockOnRemove,
          onEdit: mockOnEdit,
        },
      })

      await wrapper.find('.tag-name').trigger('dblclick')
      await wrapper.find('input').trigger('keyup.enter')

      expect(wrapper.vm.editMode).toBe(false)
    })

    it('should show tag name again after save', async () => {
      const wrapper = mount(Tag, {
        props: {
          name: 'TestTag',
          id: 'tag-1',
          editable: true,
          onRemove: mockOnRemove,
          onEdit: mockOnEdit,
        },
      })

      await wrapper.find('.tag-name').trigger('dblclick')
      await wrapper.find('input').trigger('keyup.enter')
      await nextTick()

      expect(wrapper.find('.tag-name').exists()).toBe(true)
      expect(wrapper.find('input').exists()).toBe(false)
    })
  })

  describe('Edit Escape', () => {
    it('should exit edit mode on Escape key', async () => {
      const wrapper = mount(Tag, {
        props: {
          name: 'TestTag',
          editable: true,
          onRemove: mockOnRemove,
          onEdit: mockOnEdit,
        },
      })

      await wrapper.find('.tag-name').trigger('dblclick')
      await wrapper.find('input').trigger('keyup.esc')

      expect(wrapper.vm.editMode).toBe(false)
    })

    it('should exit edit mode on blur', async () => {
      const wrapper = mount(Tag, {
        props: {
          name: 'TestTag',
          editable: true,
          onRemove: mockOnRemove,
          onEdit: mockOnEdit,
        },
      })

      await wrapper.find('.tag-name').trigger('dblclick')
      await wrapper.find('input').trigger('blur')

      expect(wrapper.vm.editMode).toBe(false)
    })

    it('should not call onEdit when escaping edit mode', async () => {
      const wrapper = mount(Tag, {
        props: {
          name: 'TestTag',
          id: 'tag-1',
          editable: true,
          onRemove: mockOnRemove,
          onEdit: mockOnEdit,
        },
      })

      await wrapper.find('.tag-name').trigger('dblclick')
      wrapper.vm.input = 'UpdatedTag'
      await wrapper.find('input').trigger('keyup.esc')

      expect(mockOnEdit).not.toHaveBeenCalled()
    })

    it('should discard edit changes on escape', async () => {
      const wrapper = mount(Tag, {
        props: {
          name: 'OriginalTag',
          id: 'tag-1',
          editable: true,
          onRemove: mockOnRemove,
          onEdit: mockOnEdit,
        },
      })

      await wrapper.find('.tag-name').trigger('dblclick')
      wrapper.vm.input = 'ChangedTag'
      await wrapper.find('input').trigger('keyup.esc')
      await nextTick()

      expect(wrapper.find('.tag-name').text()).toBe('OriginalTag')
    })
  })

  describe('Remove Button', () => {
    it('should call onRemove when remove button clicked', async () => {
      const wrapper = mount(Tag, {
        props: {
          name: 'TestTag',
          id: 'tag-1',
          onRemove: mockOnRemove,
          onEdit: mockOnEdit,
        },
      })

      await wrapper.find('button').trigger('click')

      expect(mockOnRemove).toHaveBeenCalledWith('tag-1')
    })

    it('should handle multiple remove clicks', async () => {
      const wrapper = mount(Tag, {
        props: {
          name: 'TestTag',
          id: 'tag-1',
          onRemove: mockOnRemove,
          onEdit: mockOnEdit,
        },
      })

      await wrapper.find('button').trigger('click')
      await wrapper.find('button').trigger('click')

      expect(mockOnRemove).toHaveBeenCalledTimes(2)
    })
  })

  describe('Highlight State', () => {
    it('should apply red background when highlighted', () => {
      const wrapper = mount(Tag, {
        props: {
          name: 'TestTag',
          highlight: true,
          onRemove: mockOnRemove,
          onEdit: mockOnEdit,
        },
      })

      expect(wrapper.vm.style.background).toBe('#b20000')
    })

    it('should use custom backgroundColor when not highlighted', () => {
      const tagStyle = {
        foreColor: '#ffffff',
        backgroundColor: '#0000ff',
      }

      const wrapper = mount(Tag, {
        props: {
          name: 'TestTag',
          highlight: false,
          tagStyle,
          onRemove: mockOnRemove,
          onEdit: mockOnEdit,
        },
      })

      expect(wrapper.vm.style.background).toBe('#0000ff')
    })

    it('should update highlight dynamically', async () => {
      const wrapper = mount(Tag, {
        props: {
          name: 'TestTag',
          highlight: false,
          onRemove: mockOnRemove,
          onEdit: mockOnEdit,
        },
      })

      expect(wrapper.vm.style.background).toBe('')

      await wrapper.setProps({ highlight: true })

      expect(wrapper.vm.style.background).toBe('#b20000')
    })
  })

  describe('Styling', () => {
    it('should apply custom foreColor to text', () => {
      const tagStyle = {
        foreColor: '#ff0000',
        backgroundColor: '#ffffff',
      }

      const wrapper = mount(Tag, {
        props: {
          name: 'TestTag',
          tagStyle,
          onRemove: mockOnRemove,
          onEdit: mockOnEdit,
        },
      })

      expect(wrapper.vm.style.color).toBe('#ff0000')
    })

    it('should apply custom backgroundColor to container', () => {
      const tagStyle = {
        foreColor: '#000000',
        backgroundColor: '#ffff00',
      }

      const wrapper = mount(Tag, {
        props: {
          name: 'TestTag',
          tagStyle,
          onRemove: mockOnRemove,
          onEdit: mockOnEdit,
        },
      })

      expect(wrapper.vm.style.background).toBe('#ffff00')
    })
  })

  describe('Edit Input Behavior', () => {
    it('should allow typing in edit input', async () => {
      const wrapper = mount(Tag, {
        props: {
          name: 'TestTag',
          id: 'tag-1',
          editable: true,
          onRemove: mockOnRemove,
          onEdit: mockOnEdit,
        },
      })

      await wrapper.find('.tag-name').trigger('dblclick')
      await wrapper.find('input').setValue('NewValue')

      expect(wrapper.vm.input).toBe('NewValue')
    })

    it('should save tag with empty value', async () => {
      const wrapper = mount(Tag, {
        props: {
          name: 'TestTag',
          id: 'tag-1',
          editable: true,
          onRemove: mockOnRemove,
          onEdit: mockOnEdit,
        },
      })

      await wrapper.find('.tag-name').trigger('dblclick')
      await wrapper.find('input').setValue('')
      await wrapper.find('input').trigger('keyup.enter')

      expect(mockOnEdit).toHaveBeenCalledWith('tag-1', '')
    })

    it('should save tag with special characters', async () => {
      const wrapper = mount(Tag, {
        props: {
          name: 'TestTag',
          id: 'tag-1',
          editable: true,
          onRemove: mockOnRemove,
          onEdit: mockOnEdit,
        },
      })

      await wrapper.find('.tag-name').trigger('dblclick')
      await wrapper.find('input').setValue('tag@#$%')
      await wrapper.find('input').trigger('keyup.enter')

      expect(mockOnEdit).toHaveBeenCalledWith('tag-1', 'tag@#$%')
    })
  })

  describe('Computed Properties', () => {
    it('canShowInputbox should be true when editable and in edit mode and not readOnly', async () => {
      const wrapper = mount(Tag, {
        props: {
          name: 'TestTag',
          editable: true,
          readOnly: false,
          onRemove: mockOnRemove,
          onEdit: mockOnEdit,
        },
      })

      await wrapper.find('.tag-name').trigger('dblclick')

      expect(wrapper.vm.canShowInputbox).toBe(true)
    })

    it('canShowInputbox should be false when not editable', () => {
      const wrapper = mount(Tag, {
        props: {
          name: 'TestTag',
          editable: false,
          onRemove: mockOnRemove,
          onEdit: mockOnEdit,
        },
      })

      expect(wrapper.vm.canShowInputbox).toBe(false)
    })

    it('canShowRemoveBtn should be false when readOnly', () => {
      const wrapper = mount(Tag, {
        props: {
          name: 'TestTag',
          readOnly: true,
          onRemove: mockOnRemove,
          onEdit: mockOnEdit,
        },
      })

      expect(wrapper.vm.canShowRemoveBtn).toBe(false)
    })

    it('canShowRemoveBtn should be true when not readOnly', () => {
      const wrapper = mount(Tag, {
        props: {
          name: 'TestTag',
          readOnly: false,
          onRemove: mockOnRemove,
          onEdit: mockOnEdit,
        },
      })

      expect(wrapper.vm.canShowRemoveBtn).toBe(true)
    })
  })

  describe('Edge Cases', () => {
    it('should handle tag name with whitespace', () => {
      const wrapper = mount(Tag, {
        props: {
          name: '  tag with spaces  ',
          onRemove: mockOnRemove,
          onEdit: mockOnEdit,
        },
      })

      expect(wrapper.find('.tag-name').text()).toContain('tag with spaces')
    })

    it('should handle very long tag names', () => {
      const longName = 'a'.repeat(100)
      const wrapper = mount(Tag, {
        props: {
          name: longName,
          onRemove: mockOnRemove,
          onEdit: mockOnEdit,
        },
      })

      expect(wrapper.find('.tag-name').text()).toBe(longName)
    })

    it('should handle unicode characters in tag name', () => {
      const wrapper = mount(Tag, {
        props: {
          name: '🎉tag中文',
          onRemove: mockOnRemove,
          onEdit: mockOnEdit,
        },
      })

      expect(wrapper.find('.tag-name').text()).toBe('🎉tag中文')
    })

    it('should handle empty id gracefully', () => {
      const wrapper = mount(Tag, {
        props: {
          name: 'TestTag',
          id: '',
          onRemove: mockOnRemove,
          onEdit: mockOnEdit,
        },
      })

      expect(wrapper.vm.id).toBe('')
    })

    it('should handle all props being read-only together', () => {
      const wrapper = mount(Tag, {
        props: {
          name: 'TestTag',
          readOnly: true,
          editable: true,
          onRemove: mockOnRemove,
          onEdit: mockOnEdit,
        },
      })

      expect(wrapper.find('button').exists()).toBe(false)
      expect(wrapper.vm.canShowRemoveBtn).toBe(false)
    })
  })
})
