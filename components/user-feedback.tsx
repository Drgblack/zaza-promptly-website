"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Star, ThumbsUp, ThumbsDown, MessageCircle, Send, Check } from "lucide-react"

interface UserFeedbackProps {
  pageId?: string
  userId?: string
  onFeedbackSubmit?: (feedback: FeedbackData) => void
}

interface FeedbackData {
  rating: number
  comment: string
  sentiment: 'positive' | 'negative' | 'neutral'
  category: string
  timestamp: string
  pageId: string
  userId?: string
}

export function UserFeedback({ pageId = 'home', userId, onFeedbackSubmit }: UserFeedbackProps) {
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState("")
  const [sentiment, setSentiment] = useState<'positive' | 'negative' | 'neutral'>('neutral')
  const [category, setCategory] = useState("general")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showForm, setShowForm] = useState(false)

  const categories = [
    { id: "general", label: "General Feedback" },
    { id: "feature", label: "Feature Request" },
    { id: "bug", label: "Bug Report" },
    { id: "improvement", label: "Improvement Suggestion" },
    { id: "pricing", label: "Pricing Question" },
  ]

  const handleRatingChange = (newRating: number) => {
    setRating(newRating)
    // Auto-detect sentiment based on rating
    if (newRating >= 4) {
      setSentiment('positive')
    } else if (newRating <= 2) {
      setSentiment('negative')
    } else {
      setSentiment('neutral')
    }
  }

  const handleSentimentChange = (newSentiment: 'positive' | 'negative' | 'neutral') => {
    setSentiment(newSentiment)
  }

  const handleSubmit = async () => {
    if (rating === 0) return

    setIsSubmitting(true)
    
    const feedbackData: FeedbackData = {
      rating,
      comment,
      sentiment,
      category,
      timestamp: new Date().toISOString(),
      pageId,
      userId,
    }

    try {
      // Send to analytics
      await fetch("/api/analytics/user-feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(feedbackData),
      })

      // Track in Google Analytics
          if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "feedback_submitted", {
          rating,
          sentiment,
          category,
          page_id: pageId,
        })
      }

      // Call custom callback if provided
      if (onFeedbackSubmit) {
        onFeedbackSubmit(feedbackData)
      }

      setIsSubmitted(true)
      setTimeout(() => {
        setShowForm(false)
        setIsSubmitted(false)
        setRating(0)
        setComment("")
        setSentiment('neutral')
        setCategory("general")
      }, 3000)
    } catch (error) {
      console.error("Failed to submit feedback:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="fixed bottom-4 right-4 bg-green-500 text-white p-4 rounded-lg shadow-lg flex items-center space-x-2 z-50">
        <Check className="w-5 h-5" />
        <span>Thank you for your feedback!</span>
      </div>
    )
  }

  if (!showForm) {
    return (
      <Button
        onClick={() => setShowForm(true)}
        className="fixed bottom-4 right-4 bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-full shadow-lg z-50"
        aria-label="Provide feedback"
      >
        <MessageCircle className="w-5 h-5" />
      </Button>
    )
  }

  return (
    <div className="fixed bottom-4 right-4 bg-white border border-gray-200 rounded-lg shadow-xl p-6 w-80 z-50">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">How was your experience?</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowForm(false)}
          className="text-gray-400 hover:text-gray-600"
        >
          ×
        </Button>
      </div>

      {/* Rating */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Rate your experience</label>
        <div className="flex space-x-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => handleRatingChange(star)}
              className={`p-1 transition-colors ${
                star <= rating ? "text-yellow-400" : "text-gray-300"
              } hover:text-yellow-400`}
              aria-label={`Rate ${star} stars`}
            >
              <Star className="w-6 h-6 fill-current" />
            </button>
          ))}
        </div>
      </div>

      {/* Sentiment */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">How do you feel?</label>
        <div className="flex space-x-2">
          <Button
            variant={sentiment === 'positive' ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleSentimentChange('positive')}
            className="flex items-center space-x-1"
          >
            <ThumbsUp className="w-4 h-4" />
            <span>Good</span>
          </Button>
          <Button
            variant={sentiment === 'neutral' ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleSentimentChange('neutral')}
          >
            <span>Okay</span>
          </Button>
          <Button
            variant={sentiment === 'negative' ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleSentimentChange('negative')}
            className="flex items-center space-x-1"
          >
            <ThumbsDown className="w-4 h-4" />
            <span>Bad</span>
          </Button>
        </div>
      </div>

      {/* Category */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          aria-label="Select feedback category"
        >
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.label}
            </option>
          ))}
        </select>
      </div>

      {/* Comment */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Additional comments (optional)
        </label>
        <Textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Tell us more about your experience..."
          rows={3}
          className="w-full"
        />
      </div>

      {/* Submit Button */}
      <Button
        onClick={handleSubmit}
        disabled={rating === 0 || isSubmitting}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
      >
        {isSubmitting ? (
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            <span>Submitting...</span>
          </div>
        ) : (
          <div className="flex items-center space-x-2">
            <Send className="w-4 h-4" />
            <span>Submit Feedback</span>
          </div>
        )}
      </Button>
    </div>
  )
}

// Quick feedback component for simple ratings
export function QuickFeedback({ pageId, onRating }: { pageId?: string; onRating?: (rating: number) => void }) {
  const [rating, setRating] = useState(0)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleRating = async (newRating: number) => {
    setRating(newRating)
    
    try {
      await fetch("/api/analytics/quick-feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          rating: newRating,
          pageId: pageId || 'home',
          timestamp: new Date().toISOString(),
        }),
      })

      if (onRating) {
        onRating(newRating)
      }

      setIsSubmitted(true)
      setTimeout(() => setIsSubmitted(false), 2000)
    } catch (error) {
      console.error("Failed to submit quick feedback:", error)
    }
  }

  if (isSubmitted) {
    return (
      <div className="text-center p-4">
        <div className="text-green-600 font-semibold">Thank you!</div>
      </div>
    )
  }

  return (
    <div className="text-center p-4">
      <p className="text-sm text-gray-600 mb-2">Was this helpful?</p>
      <div className="flex justify-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleRating(1)}
          className="flex items-center space-x-1"
        >
          <ThumbsUp className="w-4 h-4" />
          <span>Yes</span>
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleRating(0)}
          className="flex items-center space-x-1"
        >
          <ThumbsDown className="w-4 h-4" />
          <span>No</span>
        </Button>
      </div>
    </div>
  )
} 