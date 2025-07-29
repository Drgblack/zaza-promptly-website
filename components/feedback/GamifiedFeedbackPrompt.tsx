'use client'

import { useState, useEffect } from 'react'
import { X, Heart, Sparkles, Star, ThumbsUp, Zap, Crown, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface EmojiReaction {
  emoji: string
  label: string
  description: string
  points: number
  color: string
  icon: React.ReactNode
}

interface GamifiedFeedbackPromptProps {
  isOpen: boolean
  onClose: () => void
  onFeedback: (reaction: EmojiReaction, message?: string) => void
  userEmail?: string
  userName?: string
  generatedContent?: string
  className?: string
}

export function GamifiedFeedbackPrompt({
  isOpen,
  onClose,
  onFeedback,
  userEmail,
  userName,
  generatedContent,
  className = ''
}: GamifiedFeedbackPromptProps) {
  const [selectedReaction, setSelectedReaction] = useState<EmojiReaction | null>(null)
  const [additionalFeedback, setAdditionalFeedback] = useState('')
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [currentPoints, setCurrentPoints] = useState(0)

  const reactions: EmojiReaction[] = [
    {
      emoji: '🤩',
      label: 'Amazing!',
      description: 'This is exactly what I needed!',
      points: 50,
      color: 'from-purple-500 to-pink-500',
      icon: <Sparkles className="w-4 h-4" />
    },
    {
      emoji: '😊',
      label: 'Great!',
      description: 'Really helpful and well-written',
      points: 40,
      color: 'from-green-500 to-emerald-500',
      icon: <ThumbsUp className="w-4 h-4" />
    },
    {
      emoji: '👍',
      label: 'Good',
      description: 'Does the job, saves me time',
      points: 30,
      color: 'from-blue-500 to-cyan-500',
      icon: <Heart className="w-4 h-4" />
    },
    {
      emoji: '😐',
      label: 'Okay',
      description: 'It\'s fine, needs some editing',
      points: 20,
      color: 'from-yellow-500 to-orange-500',
      icon: <Star className="w-4 h-4" />
    },
    {
      emoji: '😕',
      label: 'Needs work',
      description: 'Not quite what I was looking for',
      points: 10,
      color: 'from-gray-500 to-slate-500',
      icon: <TrendingUp className="w-4 h-4" />
    }
  ]

  useEffect(() => {
    if (isOpen) {
      // Load current points from storage
      const points = parseInt(localStorage.getItem('zaza_feedback_points') || '0')
      setCurrentPoints(points)
    }
  }, [isOpen])

  const handleReactionSelect = (reaction: EmojiReaction) => {
    setSelectedReaction(reaction)
  }

  const handleSubmit = () => {
    if (!selectedReaction) return

    // Add points
    const newPoints = currentPoints + selectedReaction.points
    setCurrentPoints(newPoints)
    localStorage.setItem('zaza_feedback_points', newPoints.toString())

    // Track feedback
    if (typeof window !== 'undefined' && (window as any).zazeAnalytics) {
      (window as any).zazeAnalytics.trackFeedback({
        reaction: selectedReaction.label,
        points: selectedReaction.points,
        userEmail,
        additionalFeedback,
        hasAdditionalFeedback: additionalFeedback.length > 0
      })
    }

    onFeedback(selectedReaction, additionalFeedback)
    setHasSubmitted(true)

    // Auto-close after showing success
    setTimeout(() => {
      onClose()
    }, 2500)
  }

  const getTierInfo = (points: number) => {
    if (points >= 500) return { tier: 'Master Teacher', icon: '👑', color: 'text-purple-600' }
    if (points >= 200) return { tier: 'Pro Educator', icon: '⭐', color: 'text-yellow-600' }
    if (points >= 100) return { tier: 'Rising Star', icon: '🌟', color: 'text-blue-600' }
    if (points >= 50) return { tier: 'Explorer', icon: '🚀', color: 'text-green-600' }
    return { tier: 'Newcomer', icon: '🌱', color: 'text-gray-600' }
  }

  if (!isOpen) return null

  const tierInfo = getTierInfo(currentPoints)

  return (
    <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 ${className}`}>
      <Card className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
        <CardContent className="p-0">
          {!hasSubmitted ? (
            <>
              {/* Header */}
              <div className="relative bg-gradient-to-br from-blue-500 to-purple-600 p-6 text-white">
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Zap className="w-6 h-6" />
                  </div>
                  <h2 className="text-xl font-bold mb-1">How did we do?</h2>
                  <p className="text-blue-100 text-sm">Your feedback helps us improve!</p>
                </div>
              </div>

              {/* Current Status */}
              <div className="px-6 py-4 bg-gray-50 border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">{tierInfo.icon}</span>
                    <div>
                      <div className={`text-sm font-medium ${tierInfo.color}`}>
                        {tierInfo.tier}
                      </div>
                      <div className="text-xs text-gray-500">
                        {currentPoints} points
                      </div>
                    </div>
                  </div>
                  <Badge className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 border-purple-200">
                    <Star className="w-3 h-3 mr-1" />
                    Feedback Rewards
                  </Badge>
                </div>
              </div>

              {/* Reaction Selection */}
              <div className="p-6">
                <h3 className="font-semibold text-gray-900 mb-4 text-center">
                  Rate your AI-generated content:
                </h3>
                
                <div className="space-y-3 mb-6">
                  {reactions.map((reaction, index) => (
                    <button
                      key={index}
                      onClick={() => handleReactionSelect(reaction)}
                      className={`w-full p-4 rounded-xl border-2 transition-all hover:scale-105 ${
                        selectedReaction?.emoji === reaction.emoji
                          ? `border-transparent bg-gradient-to-r ${reaction.color} text-white shadow-lg`
                          : 'border-gray-200 hover:border-gray-300 bg-white'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{reaction.emoji}</span>
                        <div className="flex-1 text-left">
                          <div className="font-medium">{reaction.label}</div>
                          <div className={`text-sm ${
                            selectedReaction?.emoji === reaction.emoji 
                              ? 'text-white opacity-90' 
                              : 'text-gray-600'
                          }`}>
                            {reaction.description}
                          </div>
                        </div>
                        <div className="flex items-center space-x-1">
                          {selectedReaction?.emoji === reaction.emoji ? (
                            <div className="text-white">
                              {reaction.icon}
                            </div>
                          ) : (
                            <div className="text-gray-400">
                              {reaction.icon}
                            </div>
                          )}
                          <span className={`text-xs font-medium ${
                            selectedReaction?.emoji === reaction.emoji 
                              ? 'text-white' 
                              : 'text-gray-500'
                          }`}>
                            +{reaction.points}
                          </span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Optional Additional Feedback */}
                {selectedReaction && (
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Any additional thoughts? (optional)
                    </label>
                    <textarea
                      value={additionalFeedback}
                      onChange={(e) => setAdditionalFeedback(e.target.value)}
                      placeholder="Help us understand what worked well or could be improved..."
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                    />
                  </div>
                )}

                {/* Submit Button */}
                <Button
                  onClick={handleSubmit}
                  disabled={!selectedReaction}
                  className={`w-full ${
                    selectedReaction
                      ? `bg-gradient-to-r ${selectedReaction.color} hover:opacity-90 text-white shadow-lg`
                      : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {selectedReaction ? (
                    <>
                      Submit & Earn {selectedReaction.points} Points
                      <Sparkles className="w-4 h-4 ml-2" />
                    </>
                  ) : (
                    'Choose a rating to continue'
                  )}
                </Button>
              </div>
            </>
          ) : (
            // Success State
            <div className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">{selectedReaction?.emoji}</span>
              </div>
              
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                Thanks for your feedback!
              </h2>
              
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-4 mb-4">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <Crown className="w-5 h-5 text-purple-600" />
                  <span className="font-medium text-purple-900">
                    +{selectedReaction?.points} Points Earned!
                  </span>
                </div>
                <div className="text-sm text-purple-700">
                  Total: {currentPoints} points • {tierInfo.tier} {tierInfo.icon}
                </div>
              </div>
              
              <p className="text-gray-600 text-sm">
                Your input helps us create better AI responses for all teachers!
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

// Hook to manage feedback prompts
export function useFeedbackPrompt() {
  const [showPrompt, setShowPrompt] = useState(false)
  const [promptProps, setPromptProps] = useState<Partial<GamifiedFeedbackPromptProps>>({})

  const triggerFeedbackPrompt = (props: {
    userEmail?: string
    userName?: string
    generatedContent?: string
  }) => {
    // Only show on first AI comment generation
    const hasSeenFeedback = localStorage.getItem('zaza_feedback_shown')
    
    if (!hasSeenFeedback) {
      localStorage.setItem('zaza_feedback_shown', 'true')
      setPromptProps(props)
      setShowPrompt(true)
    }
  }

  const handleFeedback = (reaction: EmojiReaction, message?: string) => {
    // Store feedback locally (in real app, send to backend)
    const feedback = {
      reaction: reaction.label,
      emoji: reaction.emoji,
      points: reaction.points,
      message,
      timestamp: new Date().toISOString(),
      userEmail: promptProps.userEmail
    }
    
    const existingFeedback = JSON.parse(localStorage.getItem('zaza_feedback_history') || '[]')
    existingFeedback.push(feedback)
    localStorage.setItem('zaza_feedback_history', JSON.stringify(existingFeedback))

    // Track in analytics
    if (typeof window !== 'undefined' && (window as any).zazeAnalytics) {
      (window as any).zazeAnalytics.trackFeatureUse(`feedback_${reaction.label.toLowerCase()}`)
    }
  }

  return {
    showPrompt,
    setShowPrompt,
    promptProps,
    triggerFeedbackPrompt,
    handleFeedback
  }
}

// Utility function for easy integration
export const feedbackUtils = {
  // Call this after first AI comment generation
  triggerFirstCommentFeedback: (userEmail?: string, userName?: string, content?: string) => {
    if (typeof window !== 'undefined' && (window as any).zazaFeedbackTrigger) {
      (window as any).zazaFeedbackTrigger.triggerFeedbackPrompt({
        userEmail,
        userName,
        generatedContent: content
      })
    }
  }
}