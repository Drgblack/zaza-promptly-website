'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { usePrefersReducedMotion } from '@/lib/motion'
import ZaraOrb from '@/components/ui/ZaraOrb'

interface Comment {
  id: string
  text: string
  author: string
  timestamp: Date
  isEdited?: boolean
  editHistory?: Array<{
    version: string
    timestamp: Date
    changes: string[]
  }>
}

interface SnippetToolProps {
  initialComments?: Comment[]
  onCommentUpdate?: (comments: Comment[]) => void
}

export default function SnippetToolV2({ 
  initialComments = [], 
  onCommentUpdate 
}: SnippetToolProps) {
  const [comments, setComments] = useState<Comment[]>(initialComments)
  const [activeTab, setActiveTab] = useState<'improve' | 'explain' | 'history'>('improve')
  const [isLoading, setIsLoading] = useState(false)
  const [selectedComment, setSelectedComment] = useState<string>('')
  const [improvedComment, setImprovedComment] = useState<string>('')
  const [explanation, setExplanation] = useState<string>('')
  const [showResults, setShowResults] = useState(false)
  const [progress, setProgress] = useState(0)
  const [showExplainDrawer, setShowExplainDrawer] = useState(false)
  const shouldReduceMotion = usePrefersReducedMotion()
  
  // Refs for accessibility and scroll management
  const resultsRef = useRef<HTMLDivElement>(null)
  const ariaLiveRef = useRef<HTMLDivElement>(null)

  // Sample comments for demonstration
  useEffect(() => {
    if (comments.length === 0) {
      setComments([
        {
          id: '1',
          text: 'Johnny needs to work harder on his math.',
          author: 'Ms. Smith',
          timestamp: new Date('2024-03-15T10:00:00Z')
        },
        {
          id: '2', 
          text: 'Sarah was disruptive in class today.',
          author: 'Mr. Johnson',
          timestamp: new Date('2024-03-15T14:30:00Z')
        },
        {
          id: '3',
          text: 'Great progress this week!',
          author: 'Ms. Davis',
          timestamp: new Date('2024-03-16T09:15:00Z')
        }
      ])
    }
  }, [comments.length])

  // Handle comment selection
  const handleCommentSelect = (commentId: string) => {
    setSelectedComment(commentId)
    setShowResults(false)
    setImprovedComment('')
    setExplanation('')
  }

  // Simulate AI improvement process
  const handleImprove = async () => {
    if (!selectedComment) return
    
    const comment = comments.find(c => c.id === selectedComment)
    if (!comment) return

    setIsLoading(true)
    setProgress(0)
    setShowResults(false)

    // Update aria-live region
    if (ariaLiveRef.current) {
      ariaLiveRef.current.textContent = 'Improving comment, please wait...'
    }

    try {
      // Simulate progress
      for (let i = 0; i <= 100; i += 10) {
        setProgress(i)
        await new Promise(resolve => setTimeout(resolve, 150))
      }

      // Simulate different improvement types based on original comment content
      let improved = comment.text
      let explanationText = ''

      if (comment.text.toLowerCase().includes('needs to work harder')) {
        improved = 'Johnny would benefit from additional practice and support in mathematics. I recommend extra exercises and one-on-one assistance to help build his confidence and skills.'
        explanationText = 'Replaced harsh language with constructive feedback that focuses on support rather than criticism.'
      } else if (comment.text.toLowerCase().includes('disruptive')) {
        improved = 'Sarah had difficulty staying focused during today\'s lesson and would benefit from strategies to help her engage more effectively with the material.'
        explanationText = 'Reframed negative behavior as a learning opportunity and suggested solutions.'
      } else if (comment.text.toLowerCase().includes('great progress')) {
        improved = 'Excellent work this week! Your consistent effort and positive attitude are really paying off, and I can see significant improvement in your understanding.'
        explanationText = 'Enhanced positive feedback with specific observations and encouragement.'
      } else {
        // Generic improvement
        improved = comment.text.replace(/\\b(bad|terrible|awful)\\b/gi, 'challenging')
                             .replace(/\\b(lazy|stupid|dumb)\\b/gi, 'needing support')
                             .replace(/\\b(always|never)\\b/gi, 'often')
        explanationText = 'Made language more professional and constructive.'
      }

      setImprovedComment(improved)
      setExplanation(explanationText)
      setShowResults(true)

      // Update aria-live region
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

    } catch (error) {
      console.error('Error improving comment:', error)
      if (ariaLiveRef.current) {
        ariaLiveRef.current.textContent = 'Error improving comment. Please try again.'
      }
    } finally {
      setIsLoading(false)
      setProgress(0)
    }
  }

  // Handle saving improved comment
  const handleSave = () => {
    if (!selectedComment || !improvedComment) return

    const updatedComments = comments.map(comment => {
      if (comment.id === selectedComment) {
        return {
          ...comment,
          text: improvedComment,
          isEdited: true,
          editHistory: [
            ...(comment.editHistory || []),
            {
              version: comment.text,
              timestamp: new Date(),
              changes: [explanation]
            }
          ]
        }
      }
      return comment
    })

    setComments(updatedComments)
    onCommentUpdate?.(updatedComments)
    
    // Clear selection and results
    setSelectedComment('')
    setImprovedComment('')
    setExplanation('')
    setShowResults(false)

    // Update aria-live region
    if (ariaLiveRef.current) {
      ariaLiveRef.current.textContent = 'Comment saved successfully.'
    }
  }

  // Handle tab changes with smooth underline animation
  const handleTabChange = (tab: typeof activeTab) => {
    setActiveTab(tab)
    if (tab !== 'improve') {
      setShowResults(false)
      setSelectedComment('')
    }
  }

  // Format timestamp for display
  const formatTimestamp = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    }).format(date)
  }

  // Get selected comment object
  const getSelectedComment = () => {
    return comments.find(c => c.id === selectedComment)
  }

  // Render word-by-word comparison with animations
  const renderComparison = () => {
    if (!selectedComment || !improvedComment) return null

    const original = comments.find(c => c.id === selectedComment)?.text || ''
    const improved = improvedComment

    const originalWords = original.split(' ')
    const improvedWords = improved.split(' ')
    const maxLength = Math.max(originalWords.length, improvedWords.length)

    const result = []
    for (let i = 0; i < maxLength; i++) {
      const origWord = originalWords[i]
      const impWord = improvedWords[i]
      
      if (origWord && impWord && origWord !== impWord) {
        // Word changed
        if (shouldReduceMotion) {
          result.push(
            <span key={`changed-${i}`} className="bg-blue-900/40 text-blue-300">
              {impWord}
            </span>
          )
        } else {
          result.push(
            <motion.span 
              key={`changed-${i}`} 
              className="bg-blue-900/40 text-blue-300"
              initial={{ backgroundColor: 'rgba(59, 130, 246, 0.8)' }}
              animate={{ backgroundColor: 'rgba(59, 130, 246, 0.25)' }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              {impWord}
            </motion.span>
          )
        }
      } else if (origWord) {
        result.push(<span key={`same-${i}`}>{origWord}</span>)
      }
    }
    
    return result
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 shadow-card">
      {/* Accessibility */}
      <div ref={ariaLiveRef} className="sr-only" aria-live="polite" aria-atomic="true"></div>
      
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left Column: Comment Selection */}
        <div className="xl:col-span-1">
          <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700/50">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <svg className="w-5 h-5 text-blue-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              Comments
            </h3>
            
            <div className="space-y-3">
              {comments.map((comment) => (
                <div
                  key={comment.id}
                  className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                    selectedComment === comment.id
                      ? 'border-blue-500 bg-blue-900/20'
                      : 'border-slate-600 bg-slate-800/30 hover:border-slate-500 hover:bg-slate-800/50'
                  }`}
                  onClick={() => handleCommentSelect(comment.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      handleCommentSelect(comment.id)
                    }
                  }}
                  aria-label={`Select comment: ${comment.text}`}
                >
                  <p className="text-slate-300 text-sm mb-2 line-clamp-3">{comment.text}</p>
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>{comment.author}</span>
                    <span>{formatTimestamp(comment.timestamp)}</span>
                  </div>
                  {comment.isEdited && (
                    <div className="mt-2 flex items-center text-xs text-blue-400">
                      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Edited
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Center Column: Tool Interface */}
        <div className="xl:col-span-2">
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
                    onClick={() => handleTabChange(tab.key as typeof activeTab)}
                    className={`relative px-6 py-4 text-sm font-medium transition-colors flex items-center ${
                      activeTab === tab.key
                        ? 'text-blue-400'
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
                  className="absolute bottom-0 left-0 h-0.5 bg-blue-400"
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
                  {!selectedComment ? (
                    <div className="text-center py-12">
                      <svg className="w-16 h-16 text-slate-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-1.586l-4-4z" />
                      </svg>
                      <h4 className="text-lg font-medium text-slate-300 mb-2">Select a Comment</h4>
                      <p className="text-slate-500">Choose a comment from the left to start improving it.</p>
                    </div>
                  ) : (
                    <>
                      {/* Selected Comment Display */}
                      <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-600">
                        <h4 className="text-sm font-medium text-slate-400 mb-2">Selected Comment</h4>
                        <p className="text-slate-200">{getSelectedComment()?.text}</p>
                        <div className="flex items-center justify-between mt-3 text-xs text-slate-500">
                          <span>{getSelectedComment()?.author}</span>
                          <span>{getSelectedComment() && formatTimestamp(getSelectedComment()!.timestamp)}</span>
                        </div>
                      </div>

                      {/* Improve Button */}
                      <div className="flex justify-center">
                        <Button
                          onClick={handleImprove}
                          disabled={isLoading}
                          className="px-8 py-3 text-base font-medium"
                          size="lg"
                        >
                          {isLoading ? (
                            <div className="flex items-center">
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                              Improving...
                            </div>
                          ) : (
                            <div className="flex items-center">
                              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                              </svg>
                              Improve Comment
                            </div>
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
                          
                          {shouldReduceMotion ? (
                            <div className="w-full bg-slate-700 rounded-full h-2">
                              <div 
                                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${progress}%` }}
                              ></div>
                            </div>
                          ) : (
                            <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
                              <motion.div
                                className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full"
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                                transition={{ duration: 0.3, ease: 'easeInOut' }}
                              />
                            </div>
                          )}
                        </div>
                      )}

                      {/* Results */}
                      <AnimatePresence>
                        {showResults && improvedComment && (
                          <div ref={resultsRef}>
                            {shouldReduceMotion ? (
                              <div className="space-y-6 bg-slate-900/70 rounded-xl p-6 border border-green-500/30">
                                <div className="flex items-center text-green-400">
                                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  </svg>
                                  <h4 className="font-semibold">Improved Comment</h4>
                                </div>

                                <div className="space-y-4">
                                  <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-600">
                                    <h5 className="text-sm font-medium text-slate-400 mb-2">Before</h5>
                                    <p className="text-slate-300">{getSelectedComment()?.text}</p>
                                  </div>

                                  <div className="bg-green-900/20 rounded-lg p-4 border border-green-500/30">
                                    <h5 className="text-sm font-medium text-green-400 mb-2">After</h5>
                                    <p className="text-slate-200 leading-relaxed">
                                      {renderComparison()}
                                    </p>
                                  </div>
                                </div>

                                <div className="flex gap-3">
                                  <Button onClick={handleSave} variant="primary" className="flex-1">
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3-3m0 0l-3 3m3-3v12" />
                                    </svg>
                                    Save Comment
                                  </Button>
                                  <Button 
                                    onClick={() => setShowExplainDrawer(true)} 
                                    variant="outline"
                                    className="flex-1"
                                  >
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Explain Changes
                                  </Button>
                                </div>
                              </div>
                            ) : (
                              <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                                className="space-y-6 bg-slate-900/70 rounded-xl p-6 border border-green-500/30"
                              >
                                <motion.div 
                                  className="flex items-center text-green-400"
                                  initial={{ scale: 0.9 }}
                                  animate={{ scale: 1 }}
                                  transition={{ delay: 0.1 }}
                                >
                                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  </svg>
                                  <h4 className="font-semibold">Improved Comment</h4>
                                </motion.div>

                                <div className="space-y-4">
                                  <motion.div 
                                    className="bg-slate-800/50 rounded-lg p-4 border border-slate-600"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                  >
                                    <h5 className="text-sm font-medium text-slate-400 mb-2">Before</h5>
                                    <p className="text-slate-300">{getSelectedComment()?.text}</p>
                                  </motion.div>

                                  <motion.div 
                                    className="bg-green-900/20 rounded-lg p-4 border border-green-500/30"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.3 }}
                                  >
                                    <h5 className="text-sm font-medium text-green-400 mb-2">After</h5>
                                    <p className="text-slate-200 leading-relaxed">
                                      {renderComparison()}
                                    </p>
                                  </motion.div>
                                </div>

                                <motion.div 
                                  className="flex gap-3"
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{ delay: 0.4 }}
                                >
                                  <Button onClick={handleSave} variant="primary" className="flex-1">
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3-3m0 0l-3 3m3-3v12" />
                                    </svg>
                                    Save Comment
                                  </Button>
                                  <Button 
                                    onClick={() => setShowExplainDrawer(true)} 
                                    variant="outline"
                                    className="flex-1"
                                  >
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Explain Changes
                                  </Button>
                                </motion.div>
                              </motion.div>
                            )}
                          </div>
                        )}
                      </AnimatePresence>
                    </>
                  )}
                </div>
              )}

              {activeTab === 'explain' && (
                <div className="text-center py-12">
                  <svg className="w-16 h-16 text-slate-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  <h4 className="text-lg font-medium text-slate-300 mb-2">AI Explanations</h4>
                  <p className="text-slate-500">Get detailed explanations of comment improvements and suggestions.</p>
                </div>
              )}

              {activeTab === 'history' && (
                <div className="space-y-4">
                  {comments.filter(c => c.isEdited).length === 0 ? (
                    <div className="text-center py-12">
                      <svg className="w-16 h-16 text-slate-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <h4 className="text-lg font-medium text-slate-300 mb-2">No Edit History</h4>
                      <p className="text-slate-500">Comments you edit will appear here with their revision history.</p>
                    </div>
                  ) : (
                    comments
                      .filter(c => c.isEdited)
                      .map((comment) => (
                        <div key={comment.id} className="bg-slate-900/50 rounded-lg p-4 border border-slate-600">
                          <div className="flex items-center justify-between mb-3">
                            <h5 className="font-medium text-slate-200">Comment by {comment.author}</h5>
                            <span className="text-xs text-slate-500">{formatTimestamp(comment.timestamp)}</span>
                          </div>
                          <p className="text-slate-300 mb-3">{comment.text}</p>
                          {comment.editHistory && (
                            <div className="space-y-2">
                              {comment.editHistory.map((edit, index) => (
                                <div key={index} className="text-sm text-slate-500 bg-slate-800/50 rounded p-2">
                                  <div className="flex justify-between mb-1">
                                    <span className="font-medium">Edit {index + 1}</span>
                                    <span>{formatTimestamp(edit.timestamp)}</span>
                                  </div>
                                  <p className="text-xs">{edit.changes.join(', ')}</p>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Explanation Drawer */}
      <AnimatePresence>
        {showExplainDrawer && (
          <>
            {/* Backdrop */}
            {shouldReduceMotion ? (
              <div 
                className="fixed inset-0 bg-black/50 z-44"
                onClick={() => setShowExplainDrawer(false)}
              />
            ) : (
              <motion.div 
                className="fixed inset-0 bg-black/50 z-44"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowExplainDrawer(false)}
              />
            )}
            
            {/* Drawer */}
            {shouldReduceMotion ? (
              <div className="fixed right-0 top-0 bottom-0 w-96 bg-slate-800 border-l border-slate-700 z-45 flex flex-col">
                <div className="flex items-center justify-between p-4 border-b border-slate-700">
                  <h3 className="text-lg font-semibold text-white">Change Explanation</h3>
                  <button
                    onClick={() => setShowExplainDrawer(false)}
                    className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-700 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <div className="flex-1 p-4 overflow-y-auto">
                  <div className="space-y-4">
                    <div className="bg-slate-900/50 rounded-lg p-4">
                      <h4 className="font-medium text-slate-300 mb-2">What Changed</h4>
                      <p className="text-slate-400 text-sm">{explanation}</p>
                    </div>
                    
                    <div className="bg-blue-900/20 rounded-lg p-4 border border-blue-500/30">
                      <h4 className="font-medium text-blue-300 mb-2">Why This Improves Communication</h4>
                      <ul className="text-blue-200 text-sm space-y-2">
                        <li>• Uses constructive language that focuses on growth</li>
                        <li>• Maintains professional tone appropriate for education</li>
                        <li>• Provides actionable feedback rather than criticism</li>
                        <li>• Builds positive relationships with students and parents</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <motion.div 
                className="fixed right-0 top-0 bottom-0 w-96 bg-slate-800 border-l border-slate-700 z-45 flex flex-col"
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'tween', duration: 0.3 }}
              >
                <div className="flex items-center justify-between p-4 border-b border-slate-700">
                  <h3 className="text-lg font-semibold text-white">Change Explanation</h3>
                  <button
                    onClick={() => setShowExplainDrawer(false)}
                    className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-700 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <div className="flex-1 p-4 overflow-y-auto">
                  <motion.div 
                    className="space-y-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <div className="bg-slate-900/50 rounded-lg p-4">
                      <h4 className="font-medium text-slate-300 mb-2">What Changed</h4>
                      <p className="text-slate-400 text-sm">{explanation}</p>
                    </div>
                    
                    <div className="bg-blue-900/20 rounded-lg p-4 border border-blue-500/30">
                      <h4 className="font-medium text-blue-300 mb-2">Why This Improves Communication</h4>
                      <ul className="text-blue-200 text-sm space-y-2">
                        <li>• Uses constructive language that focuses on growth</li>
                        <li>• Maintains professional tone appropriate for education</li>
                        <li>• Provides actionable feedback rather than criticism</li>
                        <li>• Builds positive relationships with students and parents</li>
                      </ul>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </>
        )}
      </AnimatePresence>

      {/* Zara Orb Integration */}
      <ZaraOrb 
        isInSnippetTool={true}
        onContextAction={(action) => {
          // Handle context actions from Zara
          if (action === 'Explain changes' && improvedComment) {
            setShowExplainDrawer(true)
          }
        }}
      />
    </div>
  )
}
