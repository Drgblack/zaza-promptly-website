'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSearch, SearchResult } from '@/hooks/useSearch'

interface SearchInputProps {
  placeholder?: string
  className?: string
  showDropdown?: boolean
  onResultSelect?: (result: SearchResult) => void
  autoFocus?: boolean
}

// Custom debounce hook
function useDebounce(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

export default function SearchInput({
  placeholder = 'Search blog posts, case studies...',
  className = '',
  showDropdown = true,
  onResultSelect,
  autoFocus = false
}: SearchInputProps) {
  const router = useRouter()
  const { search, isLoading } = useSearch()
  
  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const [results, setResults] = useState<SearchResult[]>([])
  const [announceText, setAnnounceText] = useState('')

  const inputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const resultRefs = useRef<(HTMLAnchorElement | null)[]>([])

  // Debounce search query
  const debouncedQuery = useDebounce(query, 300)

  // Perform search when debounced query changes
  useEffect(() => {
    if (debouncedQuery.trim()) {
      const searchResults = search(debouncedQuery)
      setResults(searchResults.slice(0, 5)) // Limit to 5 results for dropdown
      setSelectedIndex(-1)
      
      // Announce results to screen readers
      const resultCount = searchResults.length
      if (resultCount === 0) {
        setAnnounceText('No results found')
      } else {
        setAnnounceText(`${resultCount} result${resultCount !== 1 ? 's' : ''} found`)
      }
    } else {
      setResults([])
      setSelectedIndex(-1)
      setAnnounceText('')
    }
  }, [debouncedQuery, search])

  // Handle input change
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value
    setQuery(newQuery)
    setIsOpen(newQuery.trim().length > 0 && showDropdown)
  }, [showDropdown])

  // Handle result selection
  const handleResultSelect = useCallback((result: SearchResult) => {
    if (onResultSelect) {
      onResultSelect(result)
    } else {
      router.push(result.item.url)
    }
    setIsOpen(false)
    setQuery('')
    inputRef.current?.blur()
  }, [onResultSelect, router])

  // Handle keyboard navigation
  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen || results.length === 0) {
      // Handle search submission
      if (e.key === 'Enter' && query.trim()) {
        e.preventDefault()
        router.push(`/search?q=${encodeURIComponent(query.trim())}`)
        setIsOpen(false)
        inputRef.current?.blur()
      }
      return
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setSelectedIndex(prev => 
          prev < results.length - 1 ? prev + 1 : 0
        )
        break
      
      case 'ArrowUp':
        e.preventDefault()
        setSelectedIndex(prev => 
          prev > 0 ? prev - 1 : results.length - 1
        )
        break
      
      case 'Enter':
        e.preventDefault()
        if (selectedIndex >= 0 && selectedIndex < results.length) {
          const selected = results[selectedIndex]
          handleResultSelect(selected)
        } else if (query.trim()) {
          router.push(`/search?q=${encodeURIComponent(query.trim())}`)
          setIsOpen(false)
          inputRef.current?.blur()
        }
        break
      
      case 'Escape':
        setIsOpen(false)
        setSelectedIndex(-1)
        inputRef.current?.blur()
        break
      
      default:
        break
    }
  }, [isOpen, results, selectedIndex, query, router, handleResultSelect])

  // Handle click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !inputRef.current?.contains(event.target as Node)
      ) {
        setIsOpen(false)
        setSelectedIndex(-1)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Focus management for keyboard navigation
  useEffect(() => {
    if (selectedIndex >= 0 && resultRefs.current[selectedIndex]) {
      resultRefs.current[selectedIndex]?.focus()
    } else if (selectedIndex === -1 && inputRef.current) {
      inputRef.current.focus()
    }
  }, [selectedIndex])

  // Auto focus if requested
  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus()
    }
  }, [autoFocus])

  return (
    <div className={`relative ${className}`}>
      {/* Search Input */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg
            className="h-5 w-5 text-slate-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </div>
        
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsOpen(query.trim().length > 0 && showDropdown)}
          placeholder={placeholder}
          className="w-full pl-10 pr-4 py-2 bg-slate-800/60 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-colors"
          role="combobox"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-controls={isOpen ? 'search-results' : undefined}
          aria-owns={isOpen ? 'search-results' : undefined}
          aria-activedescendant={
            selectedIndex >= 0 ? `search-result-${selectedIndex}` : undefined
          }
          aria-label="Search blog posts and case studies"
          disabled={isLoading}
        />

        {isLoading && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-slate-400 border-t-transparent"></div>
          </div>
        )}
      </div>

      {/* Search Results Dropdown */}
      {isOpen && showDropdown && results.length > 0 && (
        <div
          ref={dropdownRef}
          id="search-results"
          role="listbox"
          className="absolute z-50 mt-1 w-full bg-slate-800 border border-white/20 rounded-lg shadow-xl max-h-80 overflow-y-auto"
        >
          {results.map((result, index) => (
            <a
              key={result.item.id}
              ref={el => { resultRefs.current[index] = el }}
              href={result.item.url}
              onClick={(e) => {
                e.preventDefault()
                handleResultSelect(result)
              }}
              id={`search-result-${index}`}
              role="option"
              aria-selected={index === selectedIndex}
              className={`block px-4 py-3 hover:bg-slate-700/50 border-b border-white/10 last:border-b-0 focus:outline-none focus:bg-slate-700/50 transition-colors ${
                index === selectedIndex ? 'bg-slate-700/50' : ''
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-medium text-white truncate">
                    {result.item.title}
                  </div>
                  {result.item.description && (
                    <div className="text-xs text-slate-400 mt-1 line-clamp-2">
                      {result.item.description}
                    </div>
                  )}
                  <div className="flex items-center gap-2 mt-2">
                    <span className={`px-2 py-0.5 text-xs rounded-full ${
                      result.item.type === 'blog' 
                        ? 'bg-blue-500/20 text-blue-400' 
                        : 'bg-green-500/20 text-green-400'
                    }`}>
                      {result.item.type === 'blog' ? 'Blog' : 'Case Study'}
                    </span>
                    {result.item.tags.length > 0 && (
                      <span className="text-xs text-slate-500">
                        {result.item.tags.slice(0, 2).join(', ')}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </a>
          ))}
          
          {/* Show all results link */}
          <div className="px-4 py-2 bg-slate-700/30 border-t border-white/10">
            <button
              onClick={(e) => {
                e.preventDefault()
                router.push(`/search?q=${encodeURIComponent(query.trim())}`)
                setIsOpen(false)
                inputRef.current?.blur()
              }}
              className="text-sm text-brand-400 hover:text-brand-300 transition-colors"
            >
              View all results for &ldquo;{query}&rdquo;
            </button>
          </div>
        </div>
      )}

      {/* Aria live region for announcements */}
      <div 
        className="sr-only" 
        aria-live="polite" 
        aria-atomic="true"
      >
        {announceText}
      </div>
    </div>
  )
}