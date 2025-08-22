'use client'

import { useState, useEffect, useRef } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useSearch, SearchResult } from '@/hooks/useSearch'
import SearchInput from '@/components/search/SearchInput'

export default function SearchPage() {
  const searchParams = useSearchParams()
  const { search, getAllItems, getItemsByType, isLoading, error } = useSearch()
  
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'blog' | 'case-study'>('all')
  const [announceText, setAnnounceText] = useState('')
  
  const searchInputRef = useRef<HTMLDivElement>(null)
  const resultsRef = useRef<HTMLElement>(null)

  // Get query from URL params
  useEffect(() => {
    const urlQuery = searchParams?.get('q') || ''
    setQuery(urlQuery)
  }, [searchParams])

  // Perform search when query or filter changes
  useEffect(() => {
    if (query.trim()) {
      const searchResults = search(query)
      let filteredResults = searchResults

      // Apply type filter
      if (selectedFilter !== 'all') {
        filteredResults = searchResults.filter(result => result.item.type === selectedFilter)
      }

      setResults(filteredResults)
      
      // Announce results to screen readers
      const resultCount = filteredResults.length
      if (resultCount === 0) {
        setAnnounceText(`No results found for "${query}"`)
      } else {
        setAnnounceText(`Found ${resultCount} result${resultCount !== 1 ? 's' : ''} for "${query}"`)
      }
    } else {
      // Show all items when no query
      const allItems = getAllItems().map(item => ({ item, score: 0 }))
      let filteredResults = allItems

      if (selectedFilter !== 'all') {
        filteredResults = allItems.filter(result => result.item.type === selectedFilter)
      }

      setResults(filteredResults)
      setAnnounceText('')
    }
  }, [query, selectedFilter, search, getAllItems])

  // Focus management
  useEffect(() => {
    // Focus search input on mount
    if (searchInputRef.current) {
      const input = searchInputRef.current.querySelector('input')
      input?.focus()
    }
  }, [])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getTypeIcon = (type: string) => {
    if (type === 'blog') {
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
        </svg>
      )
    } else {
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    }
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-900 py-12">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl font-semibold text-white mb-4">Search</h1>
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-6">
              <p className="text-red-400">Search functionality is currently unavailable. Please try again later.</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <section className="bg-gradient-to-br from-slate-800 to-slate-900 py-12">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-semibold text-white mb-8 text-center">
              Search
            </h1>
            
            {/* Search Input */}
            <div ref={searchInputRef} className="mb-8">
              <SearchInput
                placeholder="Search blog posts, case studies..."
                className="w-full"
                showDropdown={false}
                autoFocus={!query}
              />
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2 justify-center" role="tablist" aria-label="Filter search results">
              {[
                { key: 'all', label: 'All Results' },
                { key: 'blog', label: 'Blog Posts' },
                { key: 'case-study', label: 'Case Studies' }
              ].map((filter) => (
                <button
                  key={filter.key}
                  onClick={() => setSelectedFilter(filter.key as any)}
                  role="tab"
                  aria-selected={selectedFilter === filter.key}
                  aria-controls="search-results"
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 focus:ring-offset-slate-900 ${
                    selectedFilter === filter.key
                      ? 'bg-brand-600 text-white'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-12" id="search-results" role="tabpanel">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            {/* Results Header */}
            {query && (
              <div className="mb-8">
                <h2 className="text-xl text-white mb-2">
                  Search results for "{query}"
                </h2>
                <p className="text-slate-400">
                  {isLoading ? 'Searching...' : `${results.length} result${results.length !== 1 ? 's' : ''} found`}
                </p>
              </div>
            )}

            {/* Loading State */}
            {isLoading && (
              <div className="flex items-center justify-center py-12">
                <div className="flex items-center gap-3">
                  <div className="animate-spin rounded-full h-6 w-6 border-2 border-slate-400 border-t-transparent"></div>
                  <span className="text-slate-400">Loading search results...</span>
                </div>
              </div>
            )}

            {/* Results */}
            {!isLoading && results.length > 0 && (
              <div ref={resultsRef} className="space-y-6">
                {results.map((result) => (
                  <article
                    key={result.item.id}
                    className="bg-slate-900/60 border border-white/10 rounded-2xl p-6 hover:bg-slate-900/80 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0 flex-1">
                        {/* Type Badge & Title */}
                        <div className="flex items-center gap-3 mb-3">
                          <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${
                            result.item.type === 'blog'
                              ? 'bg-blue-500/20 text-blue-400'
                              : 'bg-green-500/20 text-green-400'
                          }`}>
                            {getTypeIcon(result.item.type)}
                            {result.item.type === 'blog' ? 'Blog Post' : 'Case Study'}
                          </div>
                          {result.item.category && (
                            <span className="px-2 py-1 bg-slate-700/50 text-slate-300 text-xs rounded">
                              {result.item.category}
                            </span>
                          )}
                        </div>

                        <h3 className="text-xl font-semibold text-white mb-3">
                          <Link 
                            href={result.item.url}
                            className="hover:text-brand-400 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 focus:ring-offset-slate-900 rounded"
                          >
                            {result.item.title}
                          </Link>
                        </h3>

                        {result.item.description && (
                          <p className="text-slate-300 mb-4 line-clamp-3">
                            {result.item.description}
                          </p>
                        )}

                        {/* Metadata */}
                        <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400">
                          <div className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            {result.item.author}
                          </div>
                          <div className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a4 4 0 118 0v4m-4 8a4 4 0 11-8 0V11a4 4 0 018 0v4zm6 4a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            {formatDate(result.item.date)}
                          </div>
                          {result.item.school && (
                            <div className="flex items-center gap-1">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5m0 0H9m6 0a2 2 0 002-2V9a2 2 0 00-2-2H9a2 2 0 00-2 2v10a2 2 0 002 2zm6-18a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2h6a2 2 0 002-2V3z" />
                              </svg>
                              {result.item.school}
                            </div>
                          )}
                        </div>

                        {/* Tags */}
                        {result.item.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-3">
                            {result.item.tags.map((tag) => (
                              <span
                                key={tag}
                                className="px-2 py-1 bg-slate-800/60 text-slate-400 text-xs rounded"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}

            {/* No Results */}
            {!isLoading && results.length === 0 && query && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-white mb-2">No results found</h3>
                <p className="text-slate-400 mb-6">
                  We couldn't find any results for "{query}". Try adjusting your search terms.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link 
                    href="/blog"
                    className="px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white font-semibold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 focus:ring-offset-slate-900"
                  >
                    Browse Blog Posts
                  </Link>
                  <Link 
                    href="/case-studies"
                    className="px-6 py-3 border border-brand-600 text-brand-400 hover:bg-brand-600/10 font-semibold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 focus:ring-offset-slate-900"
                  >
                    View Case Studies
                  </Link>
                </div>
              </div>
            )}

            {/* Browse All Content */}
            {!query && !isLoading && (
              <div className="text-center py-8">
                <h3 className="text-lg font-medium text-white mb-4">
                  Browse All Content
                </h3>
                <p className="text-slate-400 mb-8">
                  Enter a search term above or browse our latest content below.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Aria live region for search announcements */}
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