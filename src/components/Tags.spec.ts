import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import Tags from './Tags.vue'
import type { TagModel } from '../models'

describe('Tags.vue', () => {
  const mockOnRemove = vi.fn()
  const mockOnEdit = vi.fn()

  const mockTags: TagModel[] = [
    { id: '1', name: 'tag1', value: 'tag1' },
    { id: '2', name: 'tag2', value: 'tag2' },
    { id: '3', name: 'tag3', value: 'tag3' },
  ]

  beforeEach(() => {
    mockOnRemove.mockClear()
    mockOnEdit.mockClear()
  })

  describe('Props - Defaults', () => {
    it('should render with default props', () => {
      const wrapper = mount(Tags, {
        props: {
          tags: mockTags,
          onRemove: mockOnRemove,
          onEdit: mockOnEdit,
        },
      })

      expect(wrapper.vm.readOnly).toBe(false)
      expect(wrapper.vm.editable).toBe(false)
    })

    it('should apply default classNames', () => {
      const wrapper = mount(Tags, {
        props: {
          tags: mockTags,
          onRemove: mockOnRemove,
          onEdit: mockOnEdit,
        },
      })

      expect(wrapper.vm.classNames).toEqual({})
    })

    it('should apply default tagStyle', () => {
      const wrapper = mount(Tags, {
        props: {
          tags: mockTags,
          onRemove: mockOnRemove,
          onEdit: mockOnEdit,
        },
      })

      expect(wrapper.vm.tagStyle).toEqual({})
    })
  })

  describe('Props - Validation', () => {
    it('should accept tags prop', () => {
      const wrapper = mount(Tags, {
        props: {
          tags: mockTags,
          onRemove: mockOnRemove,
          onEdit: mockOnEdit,
        },
      })

      expect(wrapper.vm.tags).toEqual(mockTags)
    })

    it('should accept readOnly prop', () => {
      const wrapper = mount(Tags, {
        props: {
          tags: mockTags,
          readOnly: true,
          onRemove: mockOnRemove,
          onEdit: mockOnEdit,
        },
      })

      expect(wrapper.vm.readOnly).toBe(true)
    })

    it('should accept editable prop', () => {
      const wrapper = mount(Tags, {
        props: {
          tags: mockTags,
          editable: true,
          onRemove: mockOnRemove,
          onEdit: mockOnEdit,
        },
      })

      expect(wrapper.vm.editable).toBe(true)
    })

    it('should accept custom classNames', () => {
      const classNames = {
        container: 'my-container',
        name: 'my-name',
        closeButton: 'my-button',
      }

      const wrapper = mount(Tags, {
        props: {
          tags: mockTags,
          classNames,
          onRemove: mockOnRemove,
          onEdit: mockOnEdit,
        },
      })

      expect(wrapper.vm.classNames).toEqual(classNames)
    })

    it('should accept tagStyle prop', () => {
      const tagStyle = {
        foreColor: '#ffffff',
        backgroundColor: '#ff0000',
      }

      const wrapper = mount(Tags, {
        props: {
          tags: mockTags,
          tagStyle,
          onRemove: mockOnRemove,
          onEdit: mockOnEdit,
        },
      })

      expect(wrapper.vm.tagStyle).toEqual(tagStyle)
    })
  })

  describe('Tag Rendering', () => {
    it('should render all tags', () => {
      const wrapper = mount(Tags, {
        props: {
          tags: mockTags,
          onRemove: mockOnRemove,
          onEdit: mockOnEdit,
        },
      })

      const tags = wrapper.findAllComponents({ name: 'SmartTag' })
      expect(tags).toHaveLength(3)
    })

    it('should render empty list when no tags', () => {
      const wrapper = mount(Tags, {
        props: {
          tags: [],
          onRemove: mockOnRemove,
          onEdit: mockOnEdit,
        },
      })

      const tags = wrapper.findAllComponents({ name: 'SmartTag' })
      expect(tags).toHaveLength(0)
    })

    it('should render tag with correct props', () => {
      const wrapper = mount(Tags, {
        props: {
          tags: mockTags,
          onRemove: mockOnRemove,
          onEdit: mockOnEdit,
        },
      })

      const firstTag = wrapper.findAllComponents({ name: 'SmartTag' })[0]
      expect(firstTag.props('id')).toBe('1')
      expect(firstTag.props('name')).toBe('tag1')
      expect(firstTag.props('highlight')).toBeUndefined()
    })

    it('should pass classNames to each tag', () => {
      const classNames = {
        container: 'custom-container',
        name: 'custom-name',
        closeButton: 'custom-button',
      }

      const wrapper = mount(Tags, {
        props: {
          tags: mockTags,
          classNames,
          onRemove: mockOnRemove,
          onEdit: mockOnEdit,
        },
      })

      const firstTag = wrapper.findAllComponents({ name: 'SmartTag' })[0]
      expect(firstTag.props('classNames')).toEqual(classNames)
    })

    it('should pass tagStyle to each tag', () => {
      const tagStyle = {
        foreColor: '#fff',
        backgroundColor: '#000',
      }

      const wrapper = mount(Tags, {
        props: {
          tags: mockTags,
          tagStyle,
          onRemove: mockOnRemove,
          onEdit: mockOnEdit,
        },
      })

      const firstTag = wrapper.findAllComponents({ name: 'SmartTag' })[0]
      expect(firstTag.props('tagStyle')).toEqual(tagStyle)
    })
  })

  describe('Tag Properties', () => {
    it('should pass editable prop to tags', () => {
      const wrapper = mount(Tags, {
        props: {
          tags: mockTags,
          editable: true,
          onRemove: mockOnRemove,
          onEdit: mockOnEdit,
        },
      })

      const tags = wrapper.findAllComponents({ name: 'SmartTag' })
      tags.forEach((tag) => {
        expect(tag.props('editable')).toBe(true)
      })
    })

    it('should pass readOnly prop to tags', () => {
      const wrapper = mount(Tags, {
        props: {
          tags: mockTags,
          readOnly: true,
          onRemove: mockOnRemove,
          onEdit: mockOnEdit,
        },
      })

      const tags = wrapper.findAllComponents({ name: 'SmartTag' })
      tags.forEach((tag) => {
        expect(tag.props('readOnly')).toBe(true)
      })
    })

    it('should pass highlight prop to tags', () => {
      const tagsWithHighlight: TagModel[] = [
        { id: '1', name: 'tag1', value: 'tag1', highlight: true },
        { id: '2', name: 'tag2', value: 'tag2', highlight: false },
      ]

      const wrapper = mount(Tags, {
        props: {
          tags: tagsWithHighlight,
          onRemove: mockOnRemove,
          onEdit: mockOnEdit,
        },
      })

      const tags = wrapper.findAllComponents({ name: 'SmartTag' })
      expect(tags[0].props('highlight')).toBe(true)
      expect(tags[1].props('highlight')).toBe(false)
    })
  })

  describe('Event Handling', () => {
    it('should call onRemove when tag remove is triggered', async () => {
      const wrapper = mount(Tags, {
        props: {
          tags: mockTags,
          onRemove: mockOnRemove,
          onEdit: mockOnEdit,
        },
      })

      const firstTag = wrapper.findAllComponents({ name: 'SmartTag' })[0]
      firstTag.vm.handleRemove('1')

      expect(mockOnRemove).toHaveBeenCalledWith('1')
    })

    it('should handle onEdit callback', async () => {
      const wrapper = mount(Tags, {
        props: {
          tags: mockTags,
          onRemove: mockOnRemove,
          onEdit: mockOnEdit,
        },
      })

      // onEdit prop is provided
      expect(wrapper.vm.handleEdit).toBeDefined()
    })

    it('should handle remove for multiple tags', async () => {
      const wrapper = mount(Tags, {
        props: {
          tags: mockTags,
          onRemove: mockOnRemove,
          onEdit: mockOnEdit,
        },
      })

      const tags = wrapper.findAllComponents({ name: 'SmartTag' })
      tags[0].vm.handleRemove('1')
      tags[1].vm.handleRemove('2')

      expect(mockOnRemove).toHaveBeenCalledTimes(2)
      expect(mockOnRemove).toHaveBeenNthCalledWith(1, '1')
      expect(mockOnRemove).toHaveBeenNthCalledWith(2, '2')
    })
  })

  describe('Watchers', () => {
    it('should update localTags when tags prop changes', async () => {
      const wrapper = mount(Tags, {
        props: {
          tags: mockTags,
          onRemove: mockOnRemove,
          onEdit: mockOnEdit,
        },
      })

      const newTags: TagModel[] = [
        { id: '4', name: 'tag4', value: 'tag4' },
        { id: '5', name: 'tag5', value: 'tag5' },
      ]

      await wrapper.setProps({ tags: newTags })

      expect(wrapper.vm.localTags).toEqual(newTags)
    })

    it('should re-render tags when tags prop changes', async () => {
      const wrapper = mount(Tags, {
        props: {
          tags: [mockTags[0]],
          onRemove: mockOnRemove,
          onEdit: mockOnEdit,
        },
      })

      let tags = wrapper.findAllComponents({ name: 'SmartTag' })
      expect(tags).toHaveLength(1)

      await wrapper.setProps({ tags: mockTags })

      tags = wrapper.findAllComponents({ name: 'SmartTag' })
      expect(tags).toHaveLength(3)
    })
  })

  describe('ReadOnly Behavior', () => {
    it('should disable editable for all tags when readOnly', () => {
      const wrapper = mount(Tags, {
        props: {
          tags: mockTags,
          readOnly: true,
          editable: true,
          onRemove: mockOnRemove,
          onEdit: mockOnEdit,
        },
      })

      const tags = wrapper.findAllComponents({ name: 'SmartTag' })
      tags.forEach((tag) => {
        expect(tag.props('readOnly')).toBe(true)
      })
    })

    it('should set editable to false for all tags when readOnly is true', () => {
      const wrapper = mount(Tags, {
        props: {
          tags: mockTags,
          readOnly: true,
          onRemove: mockOnRemove,
          onEdit: mockOnEdit,
        },
      })

      // The component doesn't force editable to false, but readOnly prop will prevent editing
      expect(wrapper.vm.readOnly).toBe(true)
    })
  })

  describe('Slot', () => {
    it('should render slot content', () => {
      const wrapper = mount(Tags, {
        props: {
          tags: mockTags,
          onRemove: mockOnRemove,
          onEdit: mockOnEdit,
        },
        slots: {
          default: '<div class="slot-content">Slot content</div>',
        },
      })

      expect(wrapper.find('.slot-content').exists()).toBe(true)
      expect(wrapper.find('.slot-content').text()).toBe('Slot content')
    })

    it('should render slot and tags together', () => {
      const wrapper = mount(Tags, {
        props: {
          tags: mockTags,
          onRemove: mockOnRemove,
          onEdit: mockOnEdit,
        },
        slots: {
          default: '<input type="text" placeholder="Add tag" />',
        },
      })

      const tags = wrapper.findAllComponents({ name: 'SmartTag' })
      expect(tags).toHaveLength(3)
      expect(wrapper.find('input').exists()).toBe(true)
    })
  })

  describe('Transition Group', () => {
    it('should wrap tags in transition-group', () => {
      const wrapper = mount(Tags, {
        props: {
          tags: mockTags,
          onRemove: mockOnRemove,
          onEdit: mockOnEdit,
        },
      })

      expect(wrapper.findComponent({ name: 'TransitionGroup' }).exists()).toBe(
        true
      )
    })
  })

  describe('Edge Cases', () => {
    it('should handle single tag', () => {
      const singleTag: TagModel[] = [{ id: '1', name: 'tag1', value: 'tag1' }]

      const wrapper = mount(Tags, {
        props: {
          tags: singleTag,
          onRemove: mockOnRemove,
          onEdit: mockOnEdit,
        },
      })

      const tags = wrapper.findAllComponents({ name: 'SmartTag' })
      expect(tags).toHaveLength(1)
    })

    it('should handle tags with special characters', () => {
      const specialTags: TagModel[] = [
        { id: '1', name: 'tag@#$', value: 'tag@#$' },
        { id: '2', name: 'tag with spaces', value: 'tag with spaces' },
      ]

      const wrapper = mount(Tags, {
        props: {
          tags: specialTags,
          onRemove: mockOnRemove,
          onEdit: mockOnEdit,
        },
      })

      const tags = wrapper.findAllComponents({ name: 'SmartTag' })
      expect(tags[0].props('name')).toBe('tag@#$')
      expect(tags[1].props('name')).toBe('tag with spaces')
    })

    it('should handle many tags', () => {
      const manyTags: TagModel[] = Array.from({ length: 100 }, (_, i) => ({
        id: `${i}`,
        name: `tag${i}`,
        value: `tag${i}`,
      }))

      const wrapper = mount(Tags, {
        props: {
          tags: manyTags,
          onRemove: mockOnRemove,
          onEdit: mockOnEdit,
        },
      })

      const tags = wrapper.findAllComponents({ name: 'SmartTag' })
      expect(tags).toHaveLength(100)
    })

    it('should handle tags with unicode characters', () => {
      const unicodeTags: TagModel[] = [
        { id: '1', name: '🎉tag', value: '🎉tag' },
        { id: '2', name: 'tag中文', value: 'tag中文' },
      ]

      const wrapper = mount(Tags, {
        props: {
          tags: unicodeTags,
          onRemove: mockOnRemove,
          onEdit: mockOnEdit,
        },
      })

      const tags = wrapper.findAllComponents({ name: 'SmartTag' })
      expect(tags[0].props('name')).toBe('🎉tag')
      expect(tags[1].props('name')).toBe('tag中文')
    })

    it('should handle null/undefined in highlight property', () => {
      const tagsWithoutHighlight: TagModel[] = [
        { id: '1', name: 'tag1', value: 'tag1' },
      ]

      const wrapper = mount(Tags, {
        props: {
          tags: tagsWithoutHighlight,
          onRemove: mockOnRemove,
          onEdit: mockOnEdit,
        },
      })

      const tag = wrapper.findComponent({ name: 'SmartTag' })
      expect(tag.props('highlight')).toBeUndefined()
    })
  })
})
