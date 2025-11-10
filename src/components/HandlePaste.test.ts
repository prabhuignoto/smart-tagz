import { describe, it, expect, beforeEach } from 'vitest'
import HandlePaste from './HandlePaste'
import type { TagModel } from '../models'

describe('HandlePaste', () => {
  let mockTags: TagModel[]

  beforeEach(() => {
    mockTags = [{ id: '1', name: 'existing', value: 'existing' }]
  })

  describe('Delimiter Parsing', () => {
    it('should split paste data by delimiter', () => {
      const result = HandlePaste(mockTags, 'tag1,tag2,tag3', 10, 1, ',', false)

      expect(result?.newData).toHaveLength(4)
      expect(result?.newData[1]!.name).toBe('tag1')
      expect(result?.newData[2]!.name).toBe('tag2')
      expect(result?.newData[3]!.name).toBe('tag3')
    })

    it('should handle space delimiter', () => {
      const result = HandlePaste(mockTags, 'tag1 tag2 tag3', 10, 1, ' ', false)

      expect(result?.newData).toHaveLength(4)
    })

    it('should handle custom delimiter', () => {
      const result = HandlePaste(mockTags, 'tag1;tag2;tag3', 10, 1, ';', false)

      expect(result?.newData).toHaveLength(4)
    })

    it('should handle single item without delimiter match', () => {
      const result = HandlePaste(mockTags, 'singletag', 10, 1, ',', false)

      expect(result?.newData).toHaveLength(2)
      expect(result?.newData[1]!.name).toBe('singletag')
    })

    it('should return undefined when paste data is empty', () => {
      const result = HandlePaste(mockTags, '', 10, 1, ',', false)

      expect(result).toBeUndefined()
    })

    it('should not process single item as delimiter split', () => {
      const result = HandlePaste(mockTags, 'no-delimiter-here', 10, 1, ',', false)

      expect(result?.newData).toHaveLength(2)
      expect(result?.newData[1]!.name).toBe('no-delimiter-here')
    })
  })

  describe('Duplicate Detection', () => {
    it('should filter duplicates when allowDuplicates is false', () => {
      const result = HandlePaste(mockTags, 'tag1,existing,tag2', 10, 1, ',', false)

      // existing tag is filtered out, so we get 1 (existing) + 2 (tag1, tag2)
      expect(result?.newData).toHaveLength(3)
      // The new tags should be tag1 and tag2, not existing (which was already there)
      const newTagNames = result?.newData.slice(1).map((t) => t.name) || []
      expect(newTagNames).toContain('tag1')
      expect(newTagNames).toContain('tag2')
      expect(newTagNames).not.toContain('existing')
    })

    it('should allow duplicates when allowDuplicates is true', () => {
      const result = HandlePaste(mockTags, 'tag1,existing,tag2', 10, 1, ',', true)

      expect(result?.newData).toHaveLength(4)
      expect(result?.newData.some((t) => t.name === 'existing')).toBe(true)
    })

    it('should remove duplicate entries within pasted items', () => {
      const result = HandlePaste(mockTags, 'tag1,tag1,tag2', 10, 1, ',', false)

      expect(result?.newData).toHaveLength(3)
      const tagNames = result?.newData.map((t) => t.name) || []
      const tag1Count = tagNames.filter((t) => t === 'tag1').length
      expect(tag1Count).toBe(1)
    })

    it('should handle multiple duplicates with existing tags', () => {
      mockTags = [
        { id: '1', name: 'tag1', value: 'tag1' },
        { id: '2', name: 'tag2', value: 'tag2' },
      ]

      const result = HandlePaste(mockTags, 'tag1,tag2,tag3,tag4', 10, 2, ',', false)

      expect(result?.newData).toHaveLength(4)
      expect(result?.newData[2]!.name).toBe('tag3')
      expect(result?.newData[3]!.name).toBe('tag4')
    })
  })

  describe('Max Tags Limit', () => {
    it('should respect maxTags limit', () => {
      const result = HandlePaste(mockTags, 'tag1,tag2,tag3,tag4,tag5', 3, 1, ',', false)

      expect(result?.newData).toHaveLength(3)
    })

    it('should calculate available slots correctly', () => {
      mockTags = [
        { id: '1', name: 'existing1', value: 'existing1' },
        { id: '2', name: 'existing2', value: 'existing2' },
      ]

      const result = HandlePaste(mockTags, 'tag1,tag2,tag3,tag4,tag5', 5, 2, ',', false)

      expect(result?.newData).toHaveLength(5)
    })

    it('should not exceed maxTags even with duplicates removal', () => {
      mockTags = [{ id: '1', name: 'existing', value: 'existing' }]

      const result = HandlePaste(mockTags, 'existing,tag1,tag2,tag3', 4, 1, ',', false)

      expect(result?.newData.length).toBeLessThanOrEqual(4)
    })

    it('should handle maxTags reached scenario', () => {
      mockTags = [
        { id: '1', name: 'tag1', value: 'tag1' },
        { id: '2', name: 'tag2', value: 'tag2' },
      ]

      const result = HandlePaste(mockTags, 'tag3,tag4', 2, 2, ',', false)

      expect(result).toBeUndefined()
    })
  })

  describe('Tags Created Counter', () => {
    it('should increment tagsCreated with correct count for multiple items', () => {
      const result = HandlePaste(mockTags, 'tag1,tag2,tag3', 10, 1, ',', false)

      expect(result?.tagsCreated).toBe(4)
    })

    it('should increment tagsCreated by 1 for single item', () => {
      const result = HandlePaste(mockTags, 'singletag', 10, 1, ',', false)

      expect(result?.tagsCreated).toBe(2)
    })

    it('should account for duplicates in tagsCreated', () => {
      const result = HandlePaste(mockTags, 'tag1,existing,tag2', 10, 1, ',', false)

      expect(result?.tagsCreated).toBe(3)
    })
  })

  describe('Tag Object Structure', () => {
    it('should create tag objects with required properties', () => {
      const result = HandlePaste(mockTags, 'newtag', 10, 1, ',', false)

      const newTag = result?.newData[1]
      expect(newTag).toHaveProperty('id')
      expect(newTag).toHaveProperty('name')
      expect(newTag).toHaveProperty('value')
      expect(newTag?.id).toBeTruthy()
    })

    it('should set name and value to same string', () => {
      const result = HandlePaste(mockTags, 'mytag', 10, 1, ',', false)

      const newTag = result?.newData[1]
      expect(newTag?.name).toBe(newTag?.value)
      expect(newTag?.name).toBe('mytag')
    })

    it('should generate unique ids for each tag', () => {
      const result = HandlePaste(mockTags, 'tag1,tag2,tag3', 10, 1, ',', false)

      const ids = result?.newData.map((t) => t.id) || []
      const uniqueIds = new Set(ids)
      expect(uniqueIds.size).toBe(ids.length)
    })

    it('should preserve existing tags in result', () => {
      const result = HandlePaste(mockTags, 'newtag', 10, 1, ',', false)

      expect(result?.newData[0]).toEqual(mockTags[0])
    })
  })

  describe('Edge Cases', () => {
    it('should handle paste with trailing delimiter', () => {
      const result = HandlePaste(mockTags, 'tag1,tag2,', 10, 1, ',', false)

      expect(result?.newData).toBeDefined()
      expect(result?.newData.length).toBeGreaterThan(1)
    })

    it('should handle paste with leading delimiter', () => {
      const result = HandlePaste(mockTags, ',tag1,tag2', 10, 1, ',', false)

      expect(result?.newData).toBeDefined()
    })

    it('should handle paste with consecutive delimiters', () => {
      const result = HandlePaste(mockTags, 'tag1,,tag2', 10, 1, ',', false)

      expect(result?.newData).toBeDefined()
    })

    it('should handle whitespace in tag names', () => {
      const result = HandlePaste(mockTags, 'tag with space,tag-with-dash', 10, 1, ',', false)

      expect(result?.newData).toContainEqual(
        expect.objectContaining({
          name: 'tag with space',
        })
      )
    })

    it('should handle special characters in tags', () => {
      const result = HandlePaste(mockTags, 'tag@123,tag#456', 10, 1, ',', false)

      expect(result?.newData).toBeDefined()
      expect(result?.newData.length).toBeGreaterThan(1)
    })

    it('should handle unicode characters', () => {
      const result = HandlePaste(mockTags, 'tag🎉,tagあ,tag中文', 10, 1, ',', false)

      expect(result?.newData).toBeDefined()
      expect(result?.newData.length).toBeGreaterThan(1)
    })

    it('should handle very long tags', () => {
      const longTag = 'a'.repeat(100)
      const result = HandlePaste(mockTags, longTag, 10, 1, ',', false)

      expect(result?.newData[1]!.name).toBe(longTag)
    })

    it('should handle newline delimiter', () => {
      const result = HandlePaste(mockTags, 'tag1\ntag2\ntag3', 10, 1, '\n', false)

      expect(result?.newData.length).toBeGreaterThan(1)
    })

    it('should handle tab delimiter', () => {
      const result = HandlePaste(mockTags, 'tag1\ttag2\ttag3', 10, 1, '\t', false)

      expect(result?.newData.length).toBeGreaterThan(1)
    })
  })

  describe('Return Value', () => {
    it('should return object with newData and tagsCreated', () => {
      const result = HandlePaste(mockTags, 'tag1,tag2', 10, 1, ',', false)

      expect(result).toHaveProperty('newData')
      expect(result).toHaveProperty('tagsCreated')
    })

    it('should handle paste with duplicate when no other new items', () => {
      // If pasting only duplicates, the function still returns the data with filtered items
      const result = HandlePaste(mockTags, 'existing', 10, 1, ',', false)

      // Single item without delimiter is treated differently
      // It will create a new tag even if it matches
      expect(result).toBeDefined()
    })

    it('should return undefined for empty paste', () => {
      const result = HandlePaste(mockTags, '', 10, 1, ',', false)

      expect(result).toBeUndefined()
    })

    it('newData should be array of TagModel', () => {
      const result = HandlePaste(mockTags, 'tag1,tag2', 10, 1, ',', false)

      expect(Array.isArray(result?.newData)).toBe(true)
      result?.newData.forEach((tag) => {
        expect(tag).toHaveProperty('id')
        expect(tag).toHaveProperty('name')
        expect(tag).toHaveProperty('value')
      })
    })
  })
})
