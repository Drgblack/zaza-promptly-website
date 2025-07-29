'use client'

import { useState, useEffect } from 'react'
import { Loader2, AlertCircle, Coffee, Heart, Sparkles, MessageCircle, Clock, Lightbulb } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

// Empathetic loading messages that rotate
const LOADING_MESSAGES = [
  {
    text: "Hang tight, we're crafting something great for you…",
    icon: <Sparkles className="w-4 h-4 text-purple-500" />,
    subtext: "Your thoughtful communication is worth the wait"
  },
  {
    text: "Brewing the perfect words for your students…",
    icon: <Coffee className="w-4 h-4 text-amber-500" />,
    subtext: "Teaching is an art, and you're the artist"
  },
  {
    text: "Weaving empathy into every word…",
    icon: <Heart className="w-4 h-4 text-pink-500" />,
    subtext: "Because every parent conversation matters"
  },
  {
    text: "Almost ready! Good teaching takes time…",
    icon: <Clock className="w-4 h-4 text-blue-500" />,
    subtext: "Your patience creates magic in classrooms"
  }
]

const ERROR_MESSAGES = [
  {
    text: "Oops! AI can be quirky sometimes. Let's try again? 🤖",
    suggestion: "Try adjusting your prompt or refreshing the page",
    recovery: "Don't worry - even the best teachers have off days!"
  },
  {
    text: "Hmm, that didn't work as expected. No worries though! 💭",
    suggestion: "Perhaps try a different approach or simpler language",
    recovery: "Every great lesson starts with a small hiccup"
  },
  {
    text: "Our AI is having a little brain fog. Happens to the best of us! ☁️",
    suggestion: "Give it another shot - sometimes it just needs a moment",
    recovery: "Even teachers need coffee breaks, right?"
  }
]

const EMPTY_STATE_MESSAGES = [
  {
    text: "No comments yet  -  but your ideas are just moments away ✨",
    subtext: "Every great conversation starts with a single word",
    cta: "Ready to begin your first comment?"
  },
  {
    text: "Your comment canvas awaits your creativity 🎨",
    subtext: "Teaching is art, and you're about to create something beautiful",
    cta: "Let's paint with words together"
  },
  {
    text: "This space is waiting for your teaching magic ⭐",
    subtext: "Great educators like you make ordinary moments extraordinary",
    cta: "Start crafting something amazing"
  }
]

interface EmpathicLoadingProps {
  message?: string
  duration?: number
  className?: string
}

export function EmpathicLoading({ message, duration = 3000, className = '' }: EmpathicLoadingProps) {
  const [currentMessage, setCurrentMessage] = useState(LOADING_MESSAGES[0])
  const [messageIndex, setMessageIndex] = useState(0)

  useEffect(() => {
    if (message) return // Use custom message if provided

    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % LOADING_MESSAGES.length)
    }, duration)

    return () => clearInterval(interval)
  }, [message, duration])

  useEffect(() => {
    if (!message) {
      setCurrentMessage(LOADING_MESSAGES[messageIndex])
    }
  }, [messageIndex, message])

  const displayMessage = message ? 
    { text: message, icon: <Sparkles className="w-4 h-4 text-purple-500" />, subtext: "" } : 
    currentMessage

  return (
    <div className={`flex flex-col items-center justify-center p-8 ${className}`}>
      <div className="relative mb-4">
        <Loader2 className="w-8 h-8 text-purple-500 animate-spin" />
        <div className="absolute -top-1 -right-1 animate-pulse">
          {displayMessage.icon}
        </div>
      </div>
      
      <div className="text-center max-w-sm">
        <p className="text-gray-700 dark:text-gray-300 font-medium mb-2">
          {displayMessage.text}
        </p>
        {displayMessage.subtext && (
          <p className="text-sm text-gray-500 dark:text-gray-400 italic">
            {displayMessage.subtext}
          </p>
        )}
      </div>
      
      {/* Subtle progress indicator */}
      <div className="mt-6 flex space-x-1">
        {LOADING_MESSAGES.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-colors duration-300 ${
              index === messageIndex 
                ? 'bg-purple-500' 
                : 'bg-gray-300 dark:bg-gray-600'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

interface EmpathicErrorProps {
  title?: string
  onRetry?: () => void
  className?: string
}

export function EmpathicError({ title, onRetry, className = '' }: EmpathicErrorProps) {
  const [currentError] = useState(() => 
    ERROR_MESSAGES[Math.floor(Math.random() * ERROR_MESSAGES.length)]
  )

  return (
    <div className={`text-center p-8 ${className}`}>
      <div className="flex justify-center mb-4">
        <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center">
          <AlertCircle className="w-8 h-8 text-orange-500" />
        </div>
      </div>
      
      <div className="max-w-md mx-auto">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
          {title || currentError.text}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-400 mb-2">
          {currentError.suggestion}
        </p>
        
        <p className="text-sm text-gray-500 dark:text-gray-500 italic mb-6">
          {currentError.recovery}
        </p>
        
        {onRetry && (
          <button
            onClick={onRetry}
            className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            <Heart className="w-4 h-4 mr-2" />
            Try Again
          </button>
        )}
      </div>
    </div>
  )
}

interface EmpathicEmptyStateProps {
  title?: string
  onAction?: () => void
  actionText?: string
  type?: 'comments' | 'templates' | 'history' | 'general'
  className?: string
}

export function EmpathicEmptyState({ 
  title, 
  onAction, 
  actionText,
  type = 'general',
  className = '' 
}: EmpathicEmptyStateProps) {
  const [currentMessage] = useState(() => 
    EMPTY_STATE_MESSAGES[Math.floor(Math.random() * EMPTY_STATE_MESSAGES.length)]
  )

  const getIcon = () => {
    switch (type) {
      case 'comments': return <MessageCircle className="w-8 h-8 text-purple-500" />
      case 'templates': return <Lightbulb className="w-8 h-8 text-amber-500" />
      case 'history': return <Clock className="w-8 h-8 text-blue-500" />
      default: return <Sparkles className="w-8 h-8 text-purple-500" />
    }
  }

  return (
    <div className={`text-center p-12 ${className}`}>
      <div className="flex justify-center mb-6">
        <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-full flex items-center justify-center">
          {getIcon()}
        </div>
      </div>
      
      <div className="max-w-md mx-auto">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
          {title || currentMessage.text}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-400 mb-2">
          {currentMessage.subtext}
        </p>
        
        <p className="text-sm text-purple-600 dark:text-purple-400 font-medium mb-8 italic">
          {currentMessage.cta}
        </p>
        
        {onAction && (
          <button
            onClick={onAction}
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            {actionText || "Let's Create Something Beautiful"}
          </button>
        )}
      </div>
      
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-purple-200 dark:bg-purple-800 rounded-full animate-pulse" />
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-pink-200 dark:bg-pink-800 rounded-full animate-pulse delay-1000" />
        <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-blue-200 dark:bg-blue-800 rounded-full animate-pulse delay-2000" />
      </div>
    </div>
  )
}

// Context-aware empathic messages
interface EmpathicMessageProps {
  context: 'generating' | 'translating' | 'saving' | 'loading' | 'processing'
  className?: string
}

export function EmpathicMessage({ context, className = '' }: EmpathicMessageProps) {
  const contextMessages = {
    generating: {
      text: "Crafting the perfect words for your students...",
      icon: <Sparkles className="w-4 h-4 text-purple-500" />,
      subtext: "Teaching moments deserve thoughtful communication"
    },
    translating: {
      text: "Building bridges across languages...",
      icon: <Heart className="w-4 h-4 text-pink-500" />,
      subtext: "Every family deserves to feel understood"
    },
    saving: {
      text: "Safely storing your teaching wisdom...",
      icon: <Coffee className="w-4 h-4 text-amber-500" />,
      subtext: "Your hard work deserves to be preserved"
    },
    loading: {
      text: "Preparing your teaching toolkit...",
      icon: <Lightbulb className="w-4 h-4 text-yellow-500" />,
      subtext: "Great educators deserve great tools"
    },
    processing: {
      text: "Working some educational magic...",
      icon: <Sparkles className="w-4 h-4 text-purple-500" />,
      subtext: "Transforming your ideas into action"
    }
  }

  const message = contextMessages[context]

  return (
    <div className={`flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg ${className}`}>
      <div className="animate-pulse">
        {message.icon}
      </div>
      <div>
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {message.text}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400 italic">
          {message.subtext}
        </p>
      </div>
    </div>
  )
}

// Wrapper component for consistent empathic states
interface EmpathicStateWrapperProps {
  isLoading?: boolean
  error?: string
  isEmpty?: boolean
  emptyStateProps?: Partial<EmpathicEmptyStateProps>
  loadingMessage?: string
  onRetry?: () => void
  children: React.ReactNode
  className?: string
}

export function EmpathicStateWrapper({
  isLoading,
  error,
  isEmpty,
  emptyStateProps,
  loadingMessage,
  onRetry,
  children,
  className = ''
}: EmpathicStateWrapperProps) {
  if (isLoading) {
    return (
      <div className={className}>
        <EmpathicLoading message={loadingMessage} />
      </div>
    )
  }

  if (error) {
    return (
      <div className={className}>
        <EmpathicError title={error} onRetry={onRetry} />
      </div>
    )
  }

  if (isEmpty) {
    return (
      <div className={className}>
        <EmpathicEmptyState {...emptyStateProps} />
      </div>
    )
  }

  return <div className={className}>{children}</div>
}