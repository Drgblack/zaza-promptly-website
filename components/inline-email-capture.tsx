"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { CheckCircle, Mail, ArrowRight } from 'lucide-react'
import { useAnalytics } from '@/hooks/useAnalytics'

interface InlineEmailCaptureProps {
  variant?: 'default' | 'compact' | 'sidebar'
  source?: string
  title?: string
  description?: string
  className?: string
}

export function InlineEmailCapture({ 
  variant = 'default',
  source = 'inline_capture',
  title = "Join 12,000+ Teachers Saving Time",
  description = "Get free AI prompts and teaching resources",
  className = ""
}: InlineEmailCaptureProps) {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState('')
  const { trackEvent } = useAnalytics()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email.trim()) {
      setError('Email is required')
      return
    }
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address')
      return
    }
    
    setIsSubmitting(true)
    setError('')
    
    try {
      const response = await fetch('/api/brevo-subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email: email.trim(),
          source,
          listIds: [2] // Newsletter list
        })
      })
      
      if (response.ok) {
        trackEvent('email_submitted', { 
          source,
          form_type: 'inline_capture',
          variant
        })
        setIsSuccess(true)
      } else {
        throw new Error('Subscription failed')
      }
    } catch (error) {
      console.error('Email signup error:', error)
      setError('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <div className={`bg-green-50 border border-green-200 rounded-lg p-4 ${className}`}>
        <div className="flex items-center text-green-800">
          <CheckCircle className="w-5 h-5 mr-2 flex-shrink-0" />
          <div>
            <p className="font-medium">Thanks for joining!</p>
            <p className="text-sm text-green-600">Check your email for free resources.</p>
          </div>
        </div>
      </div>
    )
  }

  if (variant === 'compact') {
    return (
      <div className={`bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-4 ${className}`}>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
          <div className="flex-1">
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="w-full"
              disabled={isSubmitting}
            />
          </div>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 whitespace-nowrap"
          >
            {isSubmitting ? 'Joining...' : 'Get Resources'}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </form>
        {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
        <p className="text-xs text-slate-600 mt-2">Free teacher resources, no spam</p>
      </div>
    )
  }

  if (variant === 'sidebar') {
    return (
      <div className={`bg-white border border-gray-200 rounded-lg p-6 shadow-sm ${className}`}>
        <div className="text-center mb-4">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
            <Mail className="w-6 h-6 text-white" />
          </div>
          <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-3">
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full"
            disabled={isSubmitting}
          />
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white"
          >
            {isSubmitting ? 'Joining...' : 'Join Now'}
          </Button>
          {error && <p className="text-red-600 text-xs">{error}</p>}
        </form>
        
        <p className="text-xs text-gray-500 text-center mt-3">
          ✓ Free resources ✓ No spam ✓ Unsubscribe anytime
        </p>
      </div>
    )
  }

  // Default variant
  return (
    <div className={`bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6 ${className}`}>
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
      
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="flex gap-3">
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="flex-1 rounded-lg border-2 border-gray-300 focus:border-blue-500"
            disabled={isSubmitting}
          />
          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-6 rounded-lg"
          >
            {isSubmitting ? 'Joining...' : 'Join'}
          </Button>
        </div>
        {error && <p className="text-red-600 text-sm mt-2 text-center">{error}</p>}
      </form>
      
      <p className="text-xs text-gray-500 text-center mt-4">
        Join thousands of teachers • Free resources • Unsubscribe anytime
      </p>
    </div>
  )
}