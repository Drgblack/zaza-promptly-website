"use client"

import React from 'react'
import { CheckCircle, XCircle, AlertCircle, Loader2, Info } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'

export type FeedbackType = 'success' | 'error' | 'warning' | 'info' | 'loading'

export interface FormFeedbackProps {
  type: FeedbackType
  message: string
  details?: string
  onRetry?: () => void
  onDismiss?: () => void
  className?: string
}

const feedbackConfig = {
  success: {
    icon: CheckCircle,
    className: 'border-green-200 bg-green-50 text-green-800',
    iconClassName: 'text-green-600',
  },
  error: {
    icon: XCircle,
    className: 'border-red-200 bg-red-50 text-red-800',
    iconClassName: 'text-red-600',
  },
  warning: {
    icon: AlertCircle,
    className: 'border-yellow-200 bg-yellow-50 text-yellow-800',
    iconClassName: 'text-yellow-600',
  },
  info: {
    icon: Info,
    className: 'border-blue-200 bg-blue-50 text-blue-800',
    iconClassName: 'text-blue-600',
  },
  loading: {
    icon: Loader2,
    className: 'border-gray-200 bg-gray-50 text-gray-800',
    iconClassName: 'text-gray-600 animate-spin',
  },
}

export function FormFeedback({ 
  type, 
  message, 
  details, 
  onRetry, 
  onDismiss, 
  className = '' 
}: FormFeedbackProps) {
  const config = feedbackConfig[type]
  const Icon = config.icon

  return (
    <Alert className={`${config.className} ${className}`}>
      <Icon className={`h-4 w-4 ${config.iconClassName}`} />
      <AlertDescription className="flex-1">
        <div className="font-medium mb-1">{message}</div>
        {details && (
          <div className="text-sm opacity-90 mb-2">{details}</div>
        )}
        {(onRetry || onDismiss) && (
          <div className="flex gap-2 mt-3">
            {onRetry && type === 'error' && (
              <Button
                variant="outline"
                size="sm"
                onClick={onRetry}
                className="h-8 px-3 text-xs"
              >
                Try Again
              </Button>
            )}
            {onDismiss && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onDismiss}
                className="h-8 px-3 text-xs"
              >
                Dismiss
              </Button>
            )}
          </div>
        )}
      </AlertDescription>
    </Alert>
  )
}

// Hook for managing form feedback state
export function useFormFeedback() {
  const [feedback, setFeedback] = React.useState<{
    type: FeedbackType
    message: string
    details?: string
  } | null>(null)

  const showSuccess = React.useCallback((message: string, details?: string) => {
    setFeedback({ type: 'success', message, details })
  }, [])

  const showError = React.useCallback((message: string, details?: string) => {
    setFeedback({ type: 'error', message, details })
  }, [])

  const showWarning = React.useCallback((message: string, details?: string) => {
    setFeedback({ type: 'warning', message, details })
  }, [])

  const showInfo = React.useCallback((message: string, details?: string) => {
    setFeedback({ type: 'info', message, details })
  }, [])

  const showLoading = React.useCallback((message: string = 'Processing...') => {
    setFeedback({ type: 'loading', message })
  }, [])

  const clearFeedback = React.useCallback(() => {
    setFeedback(null)
  }, [])

  const handleRetry = React.useCallback((retryFn: () => void) => {
    clearFeedback()
    retryFn()
  }, [clearFeedback])

  return {
    feedback,
    showSuccess,
    showError,
    showWarning,
    showInfo,
    showLoading,
    clearFeedback,
    handleRetry,
  }
}

// Specific feedback components for common scenarios
export function StripePaymentFeedback({ 
  isProcessing, 
  error, 
  onRetry 
}: { 
  isProcessing: boolean
  error?: string
  onRetry?: () => void 
}) {
  if (isProcessing) {
    return (
      <FormFeedback
        type="loading"
        message="Processing your payment..."
        details="Please don't close this window or navigate away."
      />
    )
  }

  if (error) {
    return (
      <FormFeedback
        type="error"
        message="Payment Failed"
        details={error}
        onRetry={onRetry}
      />
    )
  }

  return null
}

export function EmailSubscriptionFeedback({ 
  isSubscribing, 
  isSuccess, 
  error, 
  onRetry 
}: { 
  isSubscribing: boolean
  isSuccess: boolean
  error?: string
  onRetry?: () => void 
}) {
  if (isSubscribing) {
    return (
      <FormFeedback
        type="loading"
        message="Subscribing you to our newsletter..."
      />
    )
  }

  if (isSuccess) {
    return (
      <FormFeedback
        type="success"
        message="Welcome to the Zaza Promptly community!"
        details="Check your email for a confirmation link and your first time-saving tip."
      />
    )
  }

  if (error) {
    return (
      <FormFeedback
        type="error"
        message="Subscription Failed"
        details={error}
        onRetry={onRetry}
      />
    )
  }

  return null
}

export function ContactFormFeedback({ 
  isSubmitting, 
  isSuccess, 
  error, 
  onRetry 
}: { 
  isSubmitting: boolean
  isSuccess: boolean
  error?: string
  onRetry?: () => void 
}) {
  if (isSubmitting) {
    return (
      <FormFeedback
        type="loading"
        message="Sending your message..."
      />
    )
  }

  if (isSuccess) {
    return (
      <FormFeedback
        type="success"
        message="Message sent successfully!"
        details="We'll get back to you within 24 hours."
      />
    )
  }

  if (error) {
    return (
      <FormFeedback
        type="error"
        message="Failed to send message"
        details={error}
        onRetry={onRetry}
      />
    )
  }

  return null
}

// Global error handler for API requests
export function handleApiError(error: any): string {
  if (error?.response?.data?.message) {
    return error.response.data.message
  }
  
  if (error?.message) {
    return error.message
  }
  
  if (typeof error === 'string') {
    return error
  }
  
  return 'An unexpected error occurred. Please try again.'
}

// Validation feedback component
export function ValidationFeedback({ 
  errors, 
  touched, 
  field 
}: { 
  errors?: Record<string, string>
  touched?: Record<string, boolean>
  field: string 
}) {
  const error = errors?.[field]
  const isTouched = touched?.[field]

  if (!error || !isTouched) {
    return null
  }

  return (
    <div className="mt-1 text-sm text-red-600 flex items-center gap-1">
      <XCircle className="w-3 h-3 flex-shrink-0" />
      {error}
    </div>
  )
}