"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { 
  ThumbsUp, 
  ThumbsDown, 
  X, 
  Send, 
  MessageCircle,
  Star,
  Heart,
  Lightbulb
} from 'lucide-react'

interface FeedbackWidgetProps {
  pageType?: 'blog' | 'resource' | 'homepage' | 'pricing' | 'general'
  pageTitle?: string
  position?: 'bottom-right' | 'bottom-left' | 'inline'
  className?: string
}

export function FeedbackWidget({
  pageType = 'general',
  pageTitle,
  position = 'bottom-right',
  className = ''
}: FeedbackWidgetProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [feedback, setFeedback] = useState('')
  const [rating, setRating] = useState<'positive' | 'negative' | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [showDetailed, setShowDetailed] = useState(false)

  const handleQuickFeedback = async (type: 'positive' | 'negative') => {
    setRating(type)
    
    // For quick feedback, submit immediately
    await submitFeedback(type, '')
    
    // Show thank you briefly
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setIsOpen(false)
      setRating(null)
    }, 2000)
  }

  const handleDetailedFeedback = () => {
    setShowDetailed(true)
  }

  const submitFeedback = async (feedbackType: 'positive' | 'negative', detailedText: string) => {
    setIsSubmitting(true)
    
    try {
      const feedbackData = {
        type: feedbackType,
        message: detailedText,
        pageType,
        pageTitle: pageTitle || document.title,
        pageUrl: window.location.href,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        rating: feedbackType === 'positive' ? 5 : 1
      }

      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(feedbackData)
      })

      if (response.ok) {
        // Track feedback submission in analytics
        if ((window as any).zazeAnalytics) {
          (window as any).zazeAnalytics.trackFeedbackSubmit(feedbackType, pageType)
        }
        
        setSubmitted(true)
        setTimeout(() => {
          setSubmitted(false)
          setIsOpen(false)
          setRating(null)
          setFeedback('')
          setShowDetailed(false)
        }, 3000)
      } else {
        console.error('Failed to submit feedback')
      }
    } catch (error) {
      console.error('Error submitting feedback:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSubmitDetailed = async () => {
    if (rating && feedback.trim()) {
      await submitFeedback(rating, feedback.trim())
    }
  }

  const getPageSpecificQuestion = () => {
    switch (pageType) {
      case 'blog':
        return 'Was this article helpful?'
      case 'resource':
        return 'Was this resource valuable?'
      case 'pricing':
        return 'Is our pricing clear?'
      case 'homepage':
        return 'Is this page helpful?'
      default:
        return 'Was this page helpful?'
    }
  }

  const positionClasses = {
    'bottom-right': 'fixed bottom-6 right-6 z-50',
    'bottom-left': 'fixed bottom-6 left-6 z-50',
    'inline': 'relative'
  }

  if (submitted) {
    return (
      <div className={`${positionClasses[position]} ${className}`}>
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 text-green-800">
              <Heart className="w-5 h-5 text-green-600" />
              <span className="font-medium">Thank you for your feedback!</span>
            </div>
            <p className="text-sm text-green-700 mt-1">
              Your input helps us improve the experience for all teachers.
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!isOpen) {
    return (
      <div className={`${positionClasses[position]} ${className}`}>
        <Button
          onClick={() => setIsOpen(true)}
          className="bg-purple-600 hover:bg-purple-700 text-white shadow-lg rounded-full h-12 w-12 p-0"
          title="Give feedback"
        >
          <MessageCircle className="w-5 h-5" />
        </Button>
      </div>
    )
  }

  return (
    <div className={`${positionClasses[position]} ${className}`}>
      <Card className="w-80 shadow-xl">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-800 flex items-center">
              <MessageCircle className="w-4 h-4 mr-2" />
              Quick Feedback
            </h3>
            <Button
              onClick={() => setIsOpen(false)}
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {!showDetailed ? (
            <div className="space-y-4">
              <p className="text-sm text-gray-600">{getPageSpecificQuestion()}</p>
              
              <div className="flex space-x-3">
                <Button
                  onClick={() => handleQuickFeedback('positive')}
                  variant="outline"
                  size="sm"
                  className="flex-1 bg-green-50 border-green-200 hover:bg-green-100 text-green-700"
                  disabled={isSubmitting}
                >
                  <ThumbsUp className="w-4 h-4 mr-2" />
                  Yes, helpful
                </Button>
                <Button
                  onClick={() => handleQuickFeedback('negative')}
                  variant="outline"
                  size="sm"
                  className="flex-1 bg-red-50 border-red-200 hover:bg-red-100 text-red-700"
                  disabled={isSubmitting}
                >
                  <ThumbsDown className="w-4 h-4 mr-2" />
                  Needs work
                </Button>
              </div>

              <div className="text-center">
                <Button
                  onClick={handleDetailedFeedback}
                  variant="ghost"
                  size="sm"
                  className="text-purple-600 hover:text-purple-700"
                >
                  <Lightbulb className="w-4 h-4 mr-1" />
                  Share detailed feedback
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 mb-3">How would you rate this page?</p>
                <div className="flex space-x-2 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setRating(star >= 4 ? 'positive' : 'negative')}
                      className="p-1"
                    >
                      <Star
                        className={`w-5 h-5 ${
                          (rating === 'positive' && star >= 4) || (rating === 'negative' && star < 4)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <Textarea
                  placeholder="Tell us more about your experience or suggestions for improvement..."
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  className="min-h-20 text-sm"
                />
              </div>

              <div className="flex space-x-2">
                <Button
                  onClick={() => setShowDetailed(false)}
                  variant="outline"
                  size="sm"
                  className="flex-1"
                >
                  Back
                </Button>
                <Button
                  onClick={handleSubmitDetailed}
                  size="sm"
                  className="flex-1 bg-purple-600 hover:bg-purple-700"
                  disabled={!rating || isSubmitting}
                >
                  <Send className="w-4 h-4 mr-1" />
                  {isSubmitting ? 'Sending...' : 'Send'}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

// Inline feedback component for specific sections
export function InlineFeedback({
  question = "Was this section helpful?",
  pageType = "general",
  sectionId
}: {
  question?: string
  pageType?: string
  sectionId?: string
}) {
  const [feedback, setFeedback] = useState<'positive' | 'negative' | null>(null)
  const [submitted, setSubmitted] = useState(false)

  const handleFeedback = async (type: 'positive' | 'negative') => {
    setFeedback(type)
    
    try {
      await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type,
          pageType,
          sectionId,
          pageUrl: window.location.href,
          timestamp: new Date().toISOString()
        })
      })
      
      // Track inline feedback
      if ((window as any).zazeAnalytics) {
        (window as any).zazeAnalytics.trackFeedbackSubmit(`inline_${type}`, pageType)
      }
      
      setSubmitted(true)
    } catch (error) {
      console.error('Error submitting inline feedback:', error)
    }
  }

  if (submitted) {
    return (
      <div className="flex items-center justify-center py-4">
        <div className="text-green-600 text-sm flex items-center">
          <Heart className="w-4 h-4 mr-2" />
          Thanks for your feedback!
        </div>
      </div>
    )
  }

  return (
    <div className="border-t border-gray-200 py-4 mt-8">
      <div className="text-center">
        <p className="text-sm text-gray-600 mb-3">{question}</p>
        <div className="flex justify-center space-x-4">
          <Button
            onClick={() => handleFeedback('positive')}
            variant="outline"
            size="sm"
            className={`${feedback === 'positive' ? 'bg-green-50 border-green-200' : ''}`}
          >
            <ThumbsUp className="w-4 h-4 mr-2" />
            Yes
          </Button>
          <Button
            onClick={() => handleFeedback('negative')}
            variant="outline"
            size="sm"
            className={`${feedback === 'negative' ? 'bg-red-50 border-red-200' : ''}`}
          >
            <ThumbsDown className="w-4 h-4 mr-2" />
            No
          </Button>
        </div>
      </div>
    </div>
  )
}