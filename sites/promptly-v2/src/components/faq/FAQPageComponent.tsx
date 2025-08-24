'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Search, ChevronDown, ChevronUp, HelpCircle, BookOpen, ThumbsUp, ThumbsDown, Link as LinkIcon, Check } from 'lucide-react'
import Fuse from 'fuse.js'
import { CompiledFAQ } from '@/lib/faq-loader'
import { faqAnalytics } from '@/lib/analytics'
import { usePrefersReducedMotion } from '@/lib/motion'
import { motion, AnimatePresence } from 'framer-motion'

interface Props {
  faqs: CompiledFAQ[]
  categories: Array<{
    name: string
    slug: string
    description: string
    faqs: CompiledFAQ[]
  }>
}


function slugifyFAQ(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

function highlightMatches(text: string, searchTerm: string): React.ReactNode {
  if (!searchTerm.trim()) return text
  
  const regex = new RegExp(`(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')
  const parts = text.split(regex)
  
  return parts.map((part, index) => 
    regex.test(part) ? (
      <mark key={index} className="bg-yellow-200 dark:bg-yellow-800 px-1 rounded">
        {part}
      </mark>
    ) : part
  )
}

export default function FAQPageComponent({ faqs, categories: propCategories }: Props) {
  const [searchTerm, setSearchTerm] = useState('')
  const [openItems, setOpenItems] = useState<Set<string>>(new Set())
  const [activeCategory, setActiveCategory] = useState('')
  const [searchResults, setSearchResults] = useState<CompiledFAQ[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [helpfulVotes, setHelpfulVotes] = useState<Record<string, 'yes' | 'no'>>({})
  const [copiedLink, setCopiedLink] = useState<string>('')
  
  const shouldReduceMotion = usePrefersReducedMotion()
  
  const searchInputRef = useRef<HTMLInputElement>(null)
  const fuse = useRef<Fuse<CompiledFAQ> | null>(null)

  // Load helpful votes from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('faq-helpful-votes')
        if (stored) {
          setHelpfulVotes(JSON.parse(stored))
        }
      } catch (error) {
        console.error('Error loading helpful votes:', error)
      }
    }
  }, [])

  // Initialize search
  useEffect(() => {
    fuse.current = new Fuse(faqs, {
      keys: [
        { name: 'question', weight: 0.7 },
        { name: 'answer', weight: 0.3 }
      ],
      threshold: 0.3,
      includeMatches: true
    })
  }, [faqs])

  // Handle search
  useEffect(() => {
    if (!searchTerm.trim()) {
      setSearchResults([])
      setIsSearching(false)
      return
    }

    setIsSearching(true)
    if (fuse.current) {
      const results = fuse.current.search(searchTerm).map(result => result.item)
      setSearchResults(results)
      
      // Track search event
      faqAnalytics.search(searchTerm, results.length)
    }
  }, [searchTerm])

  // Handle URL hash for deep linking
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1)
      if (hash) {
        setActiveCategory(hash)
        const element = document.getElementById(hash)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }
    }

    handleHashChange()
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  // Use categories from props
  const categories = propCategories

  const toggleItem = (itemId: string, faq?: CompiledFAQ) => {
    setOpenItems(prev => {
      const newSet = new Set(prev)
      if (newSet.has(itemId)) {
        newSet.delete(itemId)
      } else {
        newSet.add(itemId)
        // Track expand event when opening
        if (faq) {
          faqAnalytics.expand(faq.slug, faq.category)
        }
      }
      return newSet
    })
  }

  const handleHelpfulVote = (slug: string, isHelpful: boolean) => {
    const vote = isHelpful ? 'yes' : 'no'
    
    setHelpfulVotes(prev => {
      const updated = { ...prev, [slug]: vote as 'yes' | 'no' }
      
      // Save to localStorage
      try {
        localStorage.setItem('faq-helpful-votes', JSON.stringify(updated))
      } catch (error) {
        console.error('Error saving helpful vote:', error)
      }
      
      return updated
    })
    
    // Track helpful event
    faqAnalytics.helpful(slug, isHelpful)
  }

  const handleCopyLink = async (slug: string) => {
    const url = `${window.location.origin}${window.location.pathname}#${slug}`
    
    try {
      await navigator.clipboard.writeText(url)
      setCopiedLink(slug)
      setTimeout(() => setCopiedLink(''), 2000)
    } catch (error) {
      // Fallback for browsers without clipboard API
      const textArea = document.createElement('textarea')
      textArea.value = url
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      setCopiedLink(slug)
      setTimeout(() => setCopiedLink(''), 2000)
    }
  }


  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-100 via-white to-slate-50 dark:from-slate-800 dark:via-slate-900 dark:to-slate-900 py-16 border-b border-slate-200 dark:border-slate-800">
        <div className="container max-w-4xl">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              Get answers about AI for teachers, data privacy, school licensing, and how Promptly helps reduce workload while improving student communication.
            </p>
            
            {/* Search Box */}
            <div className="relative max-w-md mx-auto">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-slate-400" />
              </div>
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search FAQs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-colors"
                aria-label="Search frequently asked questions"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="container max-w-6xl py-16">
        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <nav className="sticky top-8 mb-8 lg:mb-0 bg-white dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700/50 p-6 shadow-card" aria-label="FAQ Categories">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Categories</h2>
              <ul className="space-y-1">
                {categories.map((category) => (
                  <li key={category.slug}>
                    <a
                      href={`#${category.slug}`}
                      onClick={(e) => {
                        e.preventDefault()
                        setActiveCategory(category.slug)
                        window.location.hash = category.slug
                        document.getElementById(category.slug)?.scrollIntoView({ 
                          behavior: 'smooth' 
                        })
                      }}
                      className={`block px-3 py-2 rounded-lg text-sm transition-all duration-[120ms] ease-out ${
                        activeCategory === category.slug
                          ? 'bg-brand-600 text-white shadow-sm'
                          : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/50 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      {category.name}
                      <span className={`ml-2 text-xs ${
                        activeCategory === category.slug
                          ? 'text-brand-100'
                          : 'text-slate-500 dark:text-slate-400'
                      }`}>
                        ({category.faqs.length})
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {isSearching && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
                  Search Results ({searchResults.length})
                </h2>
                {searchResults.length === 0 && (
                  <div className="bg-white dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700/50 p-6 shadow-card">
                    <p className="text-slate-700 dark:text-slate-300 mb-3 font-medium">
                      No results found for &quot;{searchTerm}&quot;
                    </p>
                    <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">
                      Try searching for common topics like:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {['privacy', 'pricing', 'school licence', 'GDPR', 'data protection', 'getting started'].map(suggestion => (
                        <button
                          key={suggestion}
                          onClick={() => setSearchTerm(suggestion)}
                          className="px-3 py-1 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 text-sm rounded-full transition-all duration-[120ms] ease-out hover:scale-105"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {isSearching && searchResults.length > 0 && (
              // Search results display
              <div className="space-y-4">
                {searchResults.map((faq) => {
                  const itemId = `search-${slugifyFAQ(faq.question)}`
                  const isOpen = openItems.has(itemId)

                  return (
                    <div
                      key={faq.slug}
                      className="bg-white dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700/50 shadow-card hover:shadow-lg hover:-translate-y-0.5 transition-all duration-[120ms] ease-out"
                    >
                      <button
                        onClick={() => toggleItem(itemId, faq)}
                        className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-700/50 rounded-t-2xl transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-900"
                        aria-expanded={isOpen}
                        aria-controls={`content-${itemId}`}
                      >
                        <div className="flex-1 pr-4">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                              {highlightMatches(faq.question, searchTerm)}
                            </h3>
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                handleCopyLink(faq.slug)
                              }}
                              className="p-1 text-slate-400 hover:text-brand-500 transition-colors rounded focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
                              aria-label="Copy link to this question"
                              title="Copy link"
                            >
                              {copiedLink === faq.slug ? (
                                <Check className="h-4 w-4 text-green-500" />
                              ) : (
                                <LinkIcon className="h-4 w-4" />
                              )}
                            </button>
                            {faq.needsReview && (
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-700">
                                Draft
                              </span>
                            )}
                          </div>
                          <span className="inline-flex items-center px-2.5 py-1 bg-brand-600/10 dark:bg-brand-600/20 text-brand-700 dark:text-brand-300 text-sm font-medium rounded-full border border-brand-200 dark:border-brand-600/30">
                            {faq.category}
                          </span>
                        </div>
                        <div className="flex-shrink-0">
                          {isOpen ? (
                            <ChevronUp className="h-5 w-5 text-slate-400" />
                          ) : (
                            <ChevronDown className="h-5 w-5 text-slate-400" />
                          )}
                        </div>
                      </button>

                      {isOpen && (
                        <div
                          id={`content-${itemId}`}
                          role="region"
                          aria-labelledby={itemId}
                          className="px-6 pb-6 border-t border-slate-700/50"
                        >
                          <div className="pt-4 prose prose-invert prose-slate max-w-none">
                            <div 
                              dangerouslySetInnerHTML={{ 
                                __html: searchTerm.trim() ? 
                                  faq.compiledHTML.replace(
                                    new RegExp(`(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi'),
                                    '<mark class="bg-yellow-200 dark:bg-yellow-800 px-1 rounded">$1</mark>'
                                  ) : faq.compiledHTML
                              }}
                            />
                          </div>
                          {faq.needsReview && (
                            <div className="mt-4 p-3 bg-yellow-900/30 border border-yellow-700 rounded-lg">
                              <p className="text-yellow-300 text-sm">
                                ⚠️ This information is pending legal review and may be subject to change.
                              </p>
                            </div>
                          )}
                          
                          {/* Helpful Vote UI */}
                          <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700/50">
                            <div className="flex items-center gap-3 text-sm">
                              <span className="text-slate-600 dark:text-slate-400 font-medium">Was this helpful?</span>
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => handleHelpfulVote(faq.slug, true)}
                                  disabled={helpfulVotes[faq.slug] !== undefined}
                                  className={`p-2 rounded-lg transition-all duration-[120ms] ease-out focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-900 ${
                                    helpfulVotes[faq.slug] === 'yes'
                                      ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 shadow-sm'
                                      : helpfulVotes[faq.slug] === 'no'
                                      ? 'text-slate-400 dark:text-slate-500 cursor-not-allowed'
                                      : 'text-slate-500 dark:text-slate-400 hover:text-green-600 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 hover:scale-105'
                                  }`}
                                  aria-label="Mark as helpful"
                                >
                                  <ThumbsUp className="h-4 w-4" />
                                </button>
                                <button
                                  onClick={() => handleHelpfulVote(faq.slug, false)}
                                  disabled={helpfulVotes[faq.slug] !== undefined}
                                  className={`p-2 rounded-lg transition-all duration-[120ms] ease-out focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-900 ${
                                    helpfulVotes[faq.slug] === 'no'
                                      ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 shadow-sm'
                                      : helpfulVotes[faq.slug] === 'yes'
                                      ? 'text-slate-400 dark:text-slate-500 cursor-not-allowed'
                                      : 'text-slate-500 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:scale-105'
                                  }`}
                                  aria-label="Mark as not helpful"
                                >
                                  <ThumbsDown className="h-4 w-4" />
                                </button>
                              </div>
                              <AnimatePresence>
                                {helpfulVotes[faq.slug] && (
                                  <motion.span 
                                    className="text-xs text-green-600 dark:text-green-400 font-medium ml-2"
                                    initial={shouldReduceMotion ? {} : { opacity: 0, scale: 0.8 }}
                                    animate={shouldReduceMotion ? {} : { opacity: 1, scale: 1 }}
                                    exit={shouldReduceMotion ? {} : { opacity: 0, scale: 0.8 }}
                                    transition={shouldReduceMotion ? {} : { duration: 0.2 }}
                                  >
                                    Thank you for your feedback!
                                  </motion.span>
                                )}
                              </AnimatePresence>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            )}

            {!isSearching && (
              // Category-based display
              <div className="space-y-12">
                {categories.map((category) => (
                  <section
                    key={category.slug}
                    id={category.slug}
                    className="scroll-mt-8"
                    aria-labelledby={`${category.slug}-heading`}
                  >
                    <div className="border-b border-slate-200 dark:border-slate-700 pb-6 mb-8">
                      <h2
                        id={`${category.slug}-heading`}
                        className="text-2xl font-bold text-slate-900 dark:text-white mb-3"
                      >
                        {category.name}
                      </h2>
                      {category.description && (
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{category.description}</p>
                      )}
                    </div>

                    <div className="space-y-4">
                      {category.faqs.map((faq) => {
                        const itemId = `${category.slug}-${slugifyFAQ(faq.question)}`
                        const isOpen = openItems.has(itemId)

                        return (
                          <motion.div
                            key={faq.slug}
                            id={faq.slug}
                            className="bg-white dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700/50 shadow-card hover:shadow-lg hover:-translate-y-0.5 transition-all duration-[120ms] ease-out"
                            initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
                            animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
                            transition={shouldReduceMotion ? {} : { duration: 0.3, ease: 'easeOut' }}
                          >
                            <button
                              onClick={() => toggleItem(itemId, faq)}
                              className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-700/50 rounded-t-2xl transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-900"
                              aria-expanded={isOpen}
                              aria-controls={`content-${itemId}`}
                            >
                              <div className="flex items-center gap-3 pr-4">
                                <h3 className="text-lg font-semibold text-slate-900 dark:text-white pr-2">
                                  {highlightMatches(faq.question, searchTerm)}
                                </h3>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    handleCopyLink(faq.slug)
                                  }}
                                  className="p-1 text-slate-400 hover:text-brand-500 transition-colors rounded focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
                                  aria-label="Copy link to this question"
                                  title="Copy link"
                                >
                                  {copiedLink === faq.slug ? (
                                    <Check className="h-4 w-4 text-green-500" />
                                  ) : (
                                    <LinkIcon className="h-4 w-4" />
                                  )}
                                </button>
                                {faq.needsReview && (
                                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-700">
                                    Draft
                                  </span>
                                )}
                              </div>
                              <div className="flex-shrink-0">
                                <motion.div
                                  animate={shouldReduceMotion ? {} : { rotate: isOpen ? 180 : 0 }}
                                  transition={shouldReduceMotion ? {} : { duration: 0.2 }}
                                >
                                  <ChevronDown className="h-5 w-5 text-slate-400" />
                                </motion.div>
                              </div>
                            </button>

                            <AnimatePresence>
                              {isOpen && (
                                <motion.div
                                  id={`content-${itemId}`}
                                  role="region"
                                  aria-labelledby={itemId}
                                  className="px-6 pb-6 border-t border-slate-200 dark:border-slate-700/50"
                                  initial={shouldReduceMotion ? {} : { opacity: 0, height: 0 }}
                                  animate={shouldReduceMotion ? {} : { opacity: 1, height: 'auto' }}
                                  exit={shouldReduceMotion ? {} : { opacity: 0, height: 0 }}
                                  transition={shouldReduceMotion ? {} : { duration: 0.2, ease: 'easeOut' }}
                                >
                                  <div className="pt-4 prose prose-slate dark:prose-invert max-w-none">
                                    <div 
                                      dangerouslySetInnerHTML={{ 
                                        __html: faq.compiledHTML
                                      }}
                                    />
                                  </div>
                                  {faq.needsReview && (
                                    <div className="mt-4 p-4 bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-700 rounded-xl">
                                      <p className="text-amber-800 dark:text-amber-300 text-sm font-medium">
                                        ⚠️ This information is pending legal review and may be subject to change.
                                      </p>
                                    </div>
                                  )}
                                
                                {/* Helpful Vote UI */}
                                <div className="mt-4 pt-4 border-t border-slate-700/50">
                                  <div className="flex items-center gap-2 text-sm text-slate-400">
                                    <span>Was this helpful?</span>
                                    <div className="flex items-center gap-1">
                                      <button
                                        onClick={() => handleHelpfulVote(faq.slug, true)}
                                        disabled={helpfulVotes[faq.slug] !== undefined}
                                        className={`p-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500 ${
                                          helpfulVotes[faq.slug] === 'yes'
                                            ? 'bg-green-900/30 text-green-400'
                                            : helpfulVotes[faq.slug] === 'no'
                                            ? 'text-slate-500 cursor-not-allowed'
                                            : 'text-slate-400 hover:text-green-400 hover:bg-green-900/20'
                                        }`}
                                        aria-label="Mark as helpful"
                                      >
                                        <ThumbsUp className="h-4 w-4" />
                                      </button>
                                      <button
                                        onClick={() => handleHelpfulVote(faq.slug, false)}
                                        disabled={helpfulVotes[faq.slug] !== undefined}
                                        className={`p-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500 ${
                                          helpfulVotes[faq.slug] === 'no'
                                            ? 'bg-red-900/30 text-red-400'
                                            : helpfulVotes[faq.slug] === 'yes'
                                            ? 'text-slate-500 cursor-not-allowed'
                                            : 'text-slate-400 hover:text-red-400 hover:bg-red-900/20'
                                        }`}
                                        aria-label="Mark as not helpful"
                                      >
                                        <ThumbsDown className="h-4 w-4" />
                                      </button>
                                    </div>
                                    {helpfulVotes[faq.slug] && (
                                      <span className="text-xs text-slate-500 ml-2">
                                        Thank you for your feedback!
                                      </span>
                                    )}
                                  </div>
                                </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </motion.div>
                        )
                      })}
                    </div>
                  </section>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <section className="bg-slate-100 dark:bg-slate-800/50 py-16 border-t border-slate-200 dark:border-slate-800">
        <div className="container text-center">
          <div className="max-w-2xl mx-auto">
            <HelpCircle className="h-12 w-12 text-brand-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              Still need help?
            </h2>
            <p className="text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
              Can&apos;t find what you&apos;re looking for? Our support team is here to help with any questions about using Promptly in your teaching practice.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link 
                href="/contact"
                className="inline-flex items-center px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white font-semibold rounded-xl shadow-card hover:shadow-lg hover:-translate-y-0.5 hover:scale-[1.02] transition-all duration-[120ms] ease-out focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 focus:ring-offset-slate-100 dark:focus:ring-offset-slate-900"
              >
                <HelpCircle className="w-4 h-4 mr-2" />
                Contact Support
              </Link>
              
              <span className="text-slate-400">or</span>
              
              <Link 
                href="/learning-centre"
                className="inline-flex items-center px-6 py-3 border border-slate-300 dark:border-slate-600 hover:border-brand-500 dark:hover:border-brand-500 text-slate-700 dark:text-slate-300 hover:text-brand-600 dark:hover:text-white font-semibold rounded-xl transition-all duration-[120ms] ease-out hover:-translate-y-0.5 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 focus:ring-offset-slate-100 dark:focus:ring-offset-slate-900"
              >
                <BookOpen className="w-4 h-4 mr-2" />
                Learning Centre
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
