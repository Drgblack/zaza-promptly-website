'use client'

import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { usePrefersReducedMotion } from '@/lib/motion'
import ZaraAssistant from '@/components/snippet/ZaraAssistant'

// Types
interface HistoryEntry {
  id: string
  originalText: string
  improvedText: string
  tone: string
  length: string
  timestamp: Date
  rationale?: string[]
}

interface DiffChange {
  type: 'added' | 'removed' | 'unchanged'
  text: string
}

interface SnippetToolProps {
  onCommentUpdate?: (result: any) => void
}

const SAMPLE_COMMENTS = [
  "Emma struggles with fractions and needs extra support at home.",
  "Jake was talking during quiet reading time and disturbed others.",
  "Alex has shown excellent improvement in writing this term.",
  "Parent meeting requested - concerned about homework completion.",
  "Liam had difficulty focusing during math lesson today.",
  "Sophie's presentation on Ancient Egypt was outstanding - well researched and confident delivery."
]

const TONE_OPTIONS = [
  { value: 'Supportive', label: 'Supportive' },
  { value: 'Professional', label: 'Professional' }, 
  { value: 'Firm-but-kind', label: 'Firm but Kind' }
]

const LENGTH_OPTIONS = [
  { value: 'Short', label: 'Short' },
  { value: 'Medium', label: 'Medium' },
  { value: 'Long', label: 'Full' }
]

export default function SnippetToolV2({ onCommentUpdate }: SnippetToolProps) {
  // Core state
  const [draft, setDraft] = useState('')
  const [improvedText, setImprovedText] = useState('')
  const [rationale, setRationale] = useState<string[]>([])
  const [activeTab, setActiveTab] = useState<'improve' | 'explain' | 'history'>('improve')
  
  // Settings
  const [tone, setTone] = useState('Supportive')
  const [length, setLength] = useState('Medium')
  const [language, setLanguage] = useState('English')
  
  // UI state
  const [isLoading, setIsLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [showResults, setShowResults] = useState(false)
  const [copySuccess, setCopySuccess] = useState(false)
  
  // Zara assistant state
  const [isTextareaFocused, setIsTextareaFocused] = useState(false)
  const [hasFirstResult, setHasFirstResult] = useState(false)
  const [zaraTipsEnabled, setZaraTipsEnabled] = useState(true)
  
  // History
  const [history, setHistory] = useState<HistoryEntry[]>([])
  
  // Refs
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const resultsRef = useRef<HTMLDivElement>(null)
  const ariaLiveRef = useRef<HTMLDivElement>(null)
  
  const shouldReduceMotion = usePrefersReducedMotion()

  // Character/word count
  const wordCount = draft.trim() ? draft.trim().split(/\s+/).length : 0
  const charCount = draft.length

  // Sample comment handlers
  const handleSampleClick = (sample: string) => {
    setDraft(sample)
    if (textareaRef.current) {
      textareaRef.current.focus()
    }
  }

  // Clipboard paste
  const handlePasteFromClipboard = async () => {
    if (!navigator.clipboard) return
    try {
      const text = await navigator.clipboard.readText()
      if (text) {
        setDraft(text)
        if (textareaRef.current) {
          textareaRef.current.focus()
        }
      }
    } catch (error) {
      console.error('Failed to paste from clipboard:', error)
    }
  }

  // Clear draft
  const handleClear = () => {
    setDraft('')
    setShowResults(false)
    setImprovedText('')
    setRationale([])
    if (textareaRef.current) {
      textareaRef.current.focus()
    }
  }

  // Main improvement function
  const handleImprove = async () => {
    if (!draft.trim()) return

    setIsLoading(true)
    setProgress(0)
    setShowResults(false)
    setImprovedText('')
    setRationale([])

    // Update aria-live
    if (ariaLiveRef.current) {
      ariaLiveRef.current.textContent = 'Improving comment, please wait...'
    }

    try {
      // Simulate progress
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) return prev
          return prev + 10
        })
      }, 150)

      const response = await fetch('/api/improve-comment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          draft: draft.trim(),
          tone,
          readingLevel: 'Parent-friendly',
          length,
          language
        })
      })

      clearInterval(progressInterval)
      setProgress(100)

      if (response.ok) {
        const result = await response.json()
        
        setImprovedText(result.improvedText || '')
        setRationale(result.rationaleBullets || ['Comment improved successfully'])
        setShowResults(true)
        
        // Mark that we have first result for Zara tips
        if (!hasFirstResult) {
          setHasFirstResult(true)
        }

        // Add to history
        const historyEntry: HistoryEntry = {
          id: Date.now().toString(),
          originalText: draft,
          improvedText: result.improvedText || '',
          tone,
          length,
          timestamp: new Date(),
          rationale: result.rationaleBullets
        }

        setHistory(prev => {
          const updated = [historyEntry, ...prev].slice(0, 5) // Keep last 5
          return updated
        })

        onCommentUpdate?.(result)

        // Update aria-live
        if (ariaLiveRef.current) {
          ariaLiveRef.current.textContent = 'Comment improvement completed. Results are now available.'
        }

        // Auto-scroll to results
        setTimeout(() => {
          if (resultsRef.current && !shouldReduceMotion) {
            resultsRef.current.scrollIntoView({ 
              behavior: 'smooth',
              block: 'start'
            })
          }
        }, 300)
      } else {
        throw new Error('Improvement failed')
      }
    } catch (error) {
      console.error('Error improving comment:', error)
      if (ariaLiveRef.current) {
        ariaLiveRef.current.textContent = 'Error improving comment. Please try again.'
      }
      // Show fallback improved text
      setImprovedText('Unable to improve comment at this time. Please try again.')
      setRationale(['Service temporarily unavailable'])
      setShowResults(true)
    } finally {
      setIsLoading(false)
      setProgress(0)
    }
  }

  // Copy functionality
  const handleCopy = async () => {
    if (!improvedText) return
    try {
      await navigator.clipboard.writeText(improvedText)
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 2000)
    } catch (error) {
      console.error('Copy failed:', error)
    }
  }

  // Regenerate with same settings
  const handleRegenerate = () => {
    if (draft.trim()) {
      handleImprove()
    }
  }

  // Create diff for explain tab
  const createDiff = (original: string, improved: string): DiffChange[] => {
    const originalWords = original.split(/(\s+)/)
    const improvedWords = improved.split(/(\s+)/)
    
    // Simple word-level diff
    const changes: DiffChange[] = []
    const maxLength = Math.max(originalWords.length, improvedWords.length)
    
    for (let i = 0; i < maxLength; i++) {
      const origWord = originalWords[i]
      const impWord = improvedWords[i]
      
      if (origWord && impWord && origWord === impWord) {
        changes.push({ type: 'unchanged', text: origWord })
      } else if (origWord && !impWord) {
        changes.push({ type: 'removed', text: origWord })
      } else if (!origWord && impWord) {
        changes.push({ type: 'added', text: impWord })
      } else if (origWord && impWord) {
        changes.push({ type: 'removed', text: origWord })
        changes.push({ type: 'added', text: impWord })
      }
    }
    
    return changes
  }

  const diffChanges = improvedText ? createDiff(draft, improvedText) : []

  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 shadow-card">
      {/* Accessibility */}
      <div ref={ariaLiveRef} className="sr-only" aria-live="polite" aria-atomic="true"></div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Panel: Your Draft */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Your draft</h3>
          
          {/* Zara Assistant */}
          <ZaraAssistant
            isTextareaFocused={isTextareaFocused}
            hasResult={hasFirstResult}
            isExplainTabOpen={activeTab === 'explain'}
            onToggleTips={(enabled) => setZaraTipsEnabled(enabled)}
          />
          
          {/* Main textarea */}
          <div className="space-y-2">
            <label htmlFor="draft-input" className="block text-sm font-medium text-slate-300">
              Type or paste your comment
            </label>
            <textarea
              ref={textareaRef}
              id="draft-input"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onFocus={() => setIsTextareaFocused(true)}
              onBlur={() => setIsTextareaFocused(false)}
              rows={10}
              className="w-full rounded-xl border border-white/10 bg-slate-900/40 p-4 text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 whitespace-pre-wrap"
              placeholder="Type or paste the comment you want to improve (e.g., report line, parent message)..."
              aria-label="Your draft"
            />
          </div>

          {/* Helper buttons */}
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePasteFromClipboard}
              className="text-xs"
            >
              Paste from clipboard
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleClear}
              className="text-xs"
            >
              Clear
            </Button>
          </div>

          {/* Word/char count */}
          <div className="text-xs text-slate-400 flex justify-between">
            <span>{wordCount} words, {charCount} characters</span>
            {!draft.trim() && (
              <span className="text-amber-400">Enter some text to improve</span>
            )}
          </div>

          {/* Language selector */}
          <div className="space-y-2">
            <label htmlFor="language-select" className="block text-xs font-medium text-slate-400">
              Language
            </label>
            <select
              id="language-select"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full px-3 py-2 bg-slate-800/50 border border-slate-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
            >
              <option value="English">English</option>
              <option value="German">Deutsch (German)</option>
            </select>
          </div>

          {/* Sample chips */}
          <div className="space-y-2">
            <label className="block text-xs font-medium text-slate-400">
              Quick samples
            </label>
            <div className="flex flex-wrap gap-2">
              {SAMPLE_COMMENTS.map((sample, index) => (
                <button
                  key={index}
                  onClick={() => handleSampleClick(sample)}
                  className="px-3 py-1 text-xs bg-slate-800/50 border border-slate-600 rounded-full text-slate-300 hover:bg-slate-700/50 hover:border-slate-500 transition-colors"
                >
                  {sample.length > 30 ? sample.substring(0, 30) + '...' : sample}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Panel: Tabs */}
        <div className="bg-slate-800/50 rounded-xl border border-slate-700/50">
          {/* Tab Navigation */}
          <div className="relative border-b border-slate-700">
            <div className="flex">
              {[
                { key: 'improve', label: 'Improve', icon: '✨' },
                { key: 'explain', label: 'Explain', icon: '💡' },
                { key: 'history', label: 'History', icon: '📝' }
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as typeof activeTab)}
                  className={`relative px-6 py-4 text-sm font-medium transition-colors flex items-center ${
                    activeTab === tab.key
                      ? 'text-violet-400'
                      : 'text-slate-400 hover:text-slate-300'
                  }`}
                  aria-selected={activeTab === tab.key}
                  role="tab"
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </div>
            
            {/* Animated Tab Underline */}
            {!shouldReduceMotion && (
              <motion.div
                className="absolute bottom-0 left-0 h-0.5 bg-violet-400"
                layoutId="tab-underline"
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                style={{
                  width: '33.333%',
                  left: activeTab === 'improve' ? '0%' : activeTab === 'explain' ? '33.333%' : '66.666%'
                }}
              />
            )}
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'improve' && (
              <div className="space-y-6">
                {/* Improve Button */}
                <div className="flex justify-center">
                  <Button
                    onClick={handleImprove}
                    disabled={!draft.trim() || isLoading}
                    className="px-8 py-3 text-base font-medium"
                    size="lg"
                  >
                    {isLoading ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Improving...
                      </div>
                    ) : (
                      'Improve Comment'
                    )}
                  </Button>
                </div>

                {/* Progress Bar */}
                {isLoading && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-slate-400">
                      <span>Processing...</span>
                      <span>{progress}%</span>
                    </div>
                    
                    <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
                      {shouldReduceMotion ? (
                        <div 
                          className="bg-violet-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${progress}%` }}
                        ></div>
                      ) : (
                        <motion.div
                          className="bg-gradient-to-r from-violet-600 to-purple-600 h-2 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${progress}%` }}
                          transition={{ duration: 0.3, ease: 'easeInOut' }}
                        />
                      )}
                    </div>
                  </div>
                )}

                {/* Results */}
                <AnimatePresence>
                  {showResults && improvedText && (
                    <div ref={resultsRef}>
                      {shouldReduceMotion ? (
                        <div className="space-y-6">
                          {/* Output Display */}
                          <div className="mt-4 rounded-xl border border-white/10 bg-slate-900/40 p-4 text-slate-100">
                            <label className="block text-sm font-medium text-slate-400 mb-2">
                              Improved Comment
                            </label>
                            <div className="whitespace-pre-wrap break-words leading-relaxed">
                              {improvedText}
                            </div>
                          </div>

                          {/* Controls */}
                          <div className="space-y-4">
                            {/* Action buttons */}
                            <div className="flex gap-3">
                              <Button onClick={handleCopy} variant="primary" className="flex-1">
                                {copySuccess ? 'Copied!' : 'Copy'}
                              </Button>
                              <Button onClick={handleRegenerate} variant="outline" className="flex-1">
                                Try again
                              </Button>
                            </div>

                            {/* Tone controls */}
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="block text-xs font-medium text-slate-400 mb-2">
                                  Tone
                                </label>
                                <div className="flex flex-wrap gap-1">
                                  {TONE_OPTIONS.map((option) => (
                                    <button
                                      key={option.value}
                                      onClick={() => setTone(option.value)}
                                      className={`px-2 py-1 text-xs rounded-full border transition-colors ${
                                        tone === option.value
                                          ? 'bg-violet-600/20 border-violet-500 text-violet-300'
                                          : 'bg-slate-800/50 border-slate-600 text-slate-400 hover:border-slate-500'
                                      }`}
                                    >
                                      {option.label}
                                    </button>
                                  ))}
                                </div>
                              </div>

                              <div>
                                <label className="block text-xs font-medium text-slate-400 mb-2">
                                  Length
                                </label>
                                <div className="flex flex-wrap gap-1">
                                  {LENGTH_OPTIONS.map((option) => (
                                    <button
                                      key={option.value}
                                      onClick={() => setLength(option.value)}
                                      className={`px-2 py-1 text-xs rounded-full border transition-colors ${
                                        length === option.value
                                          ? 'bg-violet-600/20 border-violet-500 text-violet-300'
                                          : 'bg-slate-800/50 border-slate-600 text-slate-400 hover:border-slate-500'
                                      }`}
                                    >
                                      {option.label}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            </div>

                            {/* What changed badge */}
                            <div className="text-center">
                              <button
                                onClick={() => setActiveTab('explain')}
                                className="inline-flex items-center px-3 py-1 text-xs bg-blue-600/20 border border-blue-500/50 rounded-full text-blue-300 hover:bg-blue-600/30 transition-colors"
                              >
                                <span className="mr-1">💡</span>
                                What changed
                              </button>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.3 }}
                          className="space-y-6"
                        >
                          {/* Output Display */}
                          <motion.div 
                            className="mt-4 rounded-xl border border-white/10 bg-slate-900/40 p-4 text-slate-100"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.1 }}
                          >
                            <label className="block text-sm font-medium text-slate-400 mb-2">
                              Improved Comment
                            </label>
                            <div className="whitespace-pre-wrap break-words leading-relaxed">
                              {improvedText}
                            </div>
                          </motion.div>

                          {/* Controls */}
                          <motion.div 
                            className="space-y-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                          >
                            {/* Action buttons */}
                            <div className="flex gap-3">
                              <Button onClick={handleCopy} variant="primary" className="flex-1">
                                {copySuccess ? 'Copied!' : 'Copy'}
                              </Button>
                              <Button onClick={handleRegenerate} variant="outline" className="flex-1">
                                Try again
                              </Button>
                            </div>

                            {/* Tone controls */}
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="block text-xs font-medium text-slate-400 mb-2">
                                  Tone
                                </label>
                                <div className="flex flex-wrap gap-1">
                                  {TONE_OPTIONS.map((option) => (
                                    <button
                                      key={option.value}
                                      onClick={() => setTone(option.value)}
                                      className={`px-2 py-1 text-xs rounded-full border transition-colors ${
                                        tone === option.value
                                          ? 'bg-violet-600/20 border-violet-500 text-violet-300'
                                          : 'bg-slate-800/50 border-slate-600 text-slate-400 hover:border-slate-500'
                                      }`}
                                    >
                                      {option.label}
                                    </button>
                                  ))}
                                </div>
                              </div>

                              <div>
                                <label className="block text-xs font-medium text-slate-400 mb-2">
                                  Length
                                </label>
                                <div className="flex flex-wrap gap-1">
                                  {LENGTH_OPTIONS.map((option) => (
                                    <button
                                      key={option.value}
                                      onClick={() => setLength(option.value)}
                                      className={`px-2 py-1 text-xs rounded-full border transition-colors ${
                                        length === option.value
                                          ? 'bg-violet-600/20 border-violet-500 text-violet-300'
                                          : 'bg-slate-800/50 border-slate-600 text-slate-400 hover:border-slate-500'
                                      }`}
                                    >
                                      {option.label}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            </div>

                            {/* What changed badge */}
                            <div className="text-center">
                              <button
                                onClick={() => setActiveTab('explain')}
                                className="inline-flex items-center px-3 py-1 text-xs bg-blue-600/20 border border-blue-500/50 rounded-full text-blue-300 hover:bg-blue-600/30 transition-colors"
                              >
                                <span className="mr-1">💡</span>
                                What changed
                              </button>
                            </div>
                          </motion.div>
                        </motion.div>
                      )}
                    </div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {activeTab === 'explain' && (
              <div className="space-y-4">
                {!improvedText ? (
                  <div className="text-center py-12">
                    <svg className="w-16 h-16 text-slate-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    <h4 className="text-lg font-medium text-slate-300 mb-2">Run an improvement to see what changed</h4>
                    <p className="text-slate-500">Get detailed explanations of comment improvements and suggestions.</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Diff Display */}
                    <div className="space-y-4">
                      <h4 className="text-sm font-medium text-slate-300">Comparison</h4>
                      
                      <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-600">
                        <h5 className="text-xs font-medium text-slate-400 mb-2">Original</h5>
                        <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap">{draft}</p>
                      </div>

                      <div className="bg-green-900/20 rounded-lg p-4 border border-green-500/30">
                        <h5 className="text-xs font-medium text-green-400 mb-2">Improved</h5>
                        <div className="text-slate-200 text-sm leading-relaxed">
                          {diffChanges.map((change, index) => (
                            <span
                              key={index}
                              className={
                                change.type === 'added'
                                  ? 'bg-green-900/40 text-green-300 px-1 rounded'
                                  : change.type === 'removed'
                                  ? 'bg-red-900/40 text-red-300 line-through px-1 rounded'
                                  : ''
                              }
                            >
                              {change.text}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Rationale */}
                    {rationale.length > 0 && (
                      <div className="bg-blue-900/20 rounded-lg p-4 border border-blue-500/30">
                        <h4 className="font-medium text-blue-300 mb-3">What changed</h4>
                        <ul className="text-blue-200 text-sm space-y-2">
                          {rationale.map((reason, index) => (
                            <li key={index} className="flex items-start">
                              <span className="text-blue-400 mr-2">•</span>
                              {reason}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'history' && (
              <div className="space-y-4">
                {history.length === 0 ? (
                  <div className="text-center py-12">
                    <svg className="w-16 h-16 text-slate-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h4 className="text-lg font-medium text-slate-300 mb-2">No improvements yet</h4>
                    <p className="text-slate-500">Your recent improvements will appear here.</p>
                  </div>
                ) : (
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {history.map((entry) => (
                      <div key={entry.id} className="bg-slate-900/50 rounded-lg p-4 border border-slate-600">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-xs text-slate-500">
                            {entry.timestamp.toLocaleDateString()} at {entry.timestamp.toLocaleTimeString()}
                          </span>
                          <div className="flex items-center gap-2 text-xs text-slate-500">
                            <span className="px-2 py-1 bg-slate-800 rounded">{entry.tone}</span>
                            <span className="px-2 py-1 bg-slate-800 rounded">{entry.length}</span>
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          <div>
                            <h6 className="text-xs font-medium text-slate-400 mb-1">Original</h6>
                            <p className="text-slate-300 text-sm whitespace-pre-wrap">{entry.originalText}</p>
                          </div>
                          
                          <div>
                            <h6 className="text-xs font-medium text-slate-400 mb-1">Improved</h6>
                            <p className="text-slate-200 text-sm whitespace-pre-wrap">{entry.improvedText}</p>
                          </div>

                          <div className="flex gap-2 pt-2">
                            <button
                              onClick={() => {
                                setDraft(entry.originalText)
                                setActiveTab('improve')
                              }}
                              className="px-3 py-1 text-xs bg-slate-800/50 border border-slate-600 rounded text-slate-300 hover:bg-slate-700/50 hover:border-slate-500 transition-colors"
                            >
                              Reuse original
                            </button>
                            <button
                              onClick={async () => {
                                try {
                                  await navigator.clipboard.writeText(entry.improvedText)
                                  setCopySuccess(true)
                                  setTimeout(() => setCopySuccess(false), 2000)
                                } catch (error) {
                                  console.error('Copy failed:', error)
                                }
                              }}
                              className="px-3 py-1 text-xs bg-slate-800/50 border border-slate-600 rounded text-slate-300 hover:bg-slate-700/50 hover:border-slate-500 transition-colors"
                            >
                              Copy improved
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <p className="text-xs text-slate-400 mt-4 text-center">
        Outputs are examples only; adjust for your students.
      </p>
    </div>
  )
}