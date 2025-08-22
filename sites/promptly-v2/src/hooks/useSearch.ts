'use client'

import { useState, useEffect, useMemo } from 'react'
import Fuse from 'fuse.js'

export interface SearchItem {
  id: string
  type: 'blog' | 'case-study'
  slug: string
  title: string
  description: string
  excerpt: string
  tags: string[]
  author: string
  date: string
  category: string
  school?: string
  url: string
  searchContent: string
}

export interface SearchResult {
  item: SearchItem
  score?: number
  matches?: Fuse.FuseResultMatch[]
}

const fuseOptions = {
  keys: [
    { name: 'title', weight: 2 },
    { name: 'description', weight: 1.5 },
    { name: 'tags', weight: 1.2 },
    { name: 'author', weight: 0.8 },
    { name: 'category', weight: 0.8 },
    { name: 'school', weight: 0.6 },
    { name: 'searchContent', weight: 0.5 }
  ],
  threshold: 0.4, // Lower = more strict matching
  distance: 100,
  includeScore: true,
  includeMatches: true,
  minMatchCharLength: 2,
  shouldSort: true
}

export function useSearch() {
  const [searchIndex, setSearchIndex] = useState<SearchItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Initialize Fuse instance
  const fuse = useMemo(() => {
    if (searchIndex.length === 0) return null
    return new Fuse(searchIndex, fuseOptions)
  }, [searchIndex])

  // Load search index from static file
  useEffect(() => {
    async function loadSearchIndex() {
      try {
        setIsLoading(true)
        const response = await fetch('/search-index.json')
        if (!response.ok) {
          throw new Error('Failed to load search index')
        }
        const data: SearchItem[] = await response.json()
        setSearchIndex(data)
        setError(null)
      } catch (err) {
        console.error('Failed to load search index:', err)
        setError('Failed to load search functionality')
      } finally {
        setIsLoading(false)
      }
    }

    loadSearchIndex()
  }, [])

  // Perform search
  const search = (query: string): SearchResult[] => {
    if (!fuse || !query.trim()) return []
    
    const results = fuse.search(query.trim())
    return results.map(result => ({
      item: result.item,
      score: result.score,
      matches: result.matches
    }))
  }

  // Get all items (for browsing when no query)
  const getAllItems = (): SearchItem[] => {
    return searchIndex
  }

  // Filter by type
  const getItemsByType = (type: 'blog' | 'case-study'): SearchItem[] => {
    return searchIndex.filter(item => item.type === type)
  }

  // Filter by category
  const getItemsByCategory = (category: string): SearchItem[] => {
    return searchIndex.filter(item => item.category === category)
  }

  return {
    search,
    getAllItems,
    getItemsByType,
    getItemsByCategory,
    isLoading,
    error,
    totalItems: searchIndex.length
  }
}