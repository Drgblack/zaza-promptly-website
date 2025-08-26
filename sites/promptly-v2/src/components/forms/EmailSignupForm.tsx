'use client'

import { useState } from 'react'

interface EmailSignupFormProps {
  variant?: 'hero' | 'compact'
  headline?: string
  subtext?: string
  showNameFields?: boolean
  buttonText?: string
  className?: string
}

interface FormState {
  email: string
  firstName: string
  lastName: string
}

interface SubmissionState {
  status: 'idle' | 'loading' | 'success' | 'error'
  message: string
}

export default function EmailSignupForm({ 
  variant = 'hero',
  headline = "Take back your evenings — join thousands of teachers already saving hours.",
  subtext = "Sign up free today. No spam, just time-saving tools for teachers.",
  showNameFields = true,
  buttonText = "Join Free Today →",
  className = ""
}: EmailSignupFormProps) {
  const [form, setForm] = useState<FormState>({
    email: '',
    firstName: '',
    lastName: ''
  })
  
  const [submission, setSubmission] = useState<SubmissionState>({
    status: 'idle',
    message: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!form.email.trim()) {
      setSubmission({
        status: 'error',
        message: 'Please enter your email address'
      })
      return
    }

    setSubmission({ status: 'loading', message: '' })

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: form.email.trim(),
          firstName: form.firstName.trim() || undefined,
          lastName: form.lastName.trim() || undefined
        }),
      })

      const data = await response.json()

      if (data.success) {
        setSubmission({
          status: 'success',
          message: data.message || 'Thanks, you\'re on the list!'
        })
        // Reset form on success
        setForm({ email: '', firstName: '', lastName: '' })
      } else {
        setSubmission({
          status: 'error',
          message: data.error || 'Something went wrong — please try again.'
        })
      }
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmission({
        status: 'error',
        message: 'Something went wrong — please try again.'
      })
    }
  }

  const handleChange = (field: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, [field]: e.target.value }))
    // Clear any error messages when user starts typing
    if (submission.status === 'error') {
      setSubmission({ status: 'idle', message: '' })
    }
  }

  // Success state - show confirmation
  if (submission.status === 'success') {
    return (
      <div className={`${className} ${variant === 'hero' ? 'max-w-2xl mx-auto' : 'max-w-md'}`}>
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
          <div className="text-4xl mb-3">🎉</div>
          <h3 className="text-lg font-semibold text-green-800 mb-2">
            {submission.message}
          </h3>
          <p className="text-green-600 text-sm">
            We'll send you practical tips and updates to help save your time.
          </p>
        </div>
      </div>
    )
  }

  const isHero = variant === 'hero'
  const cardClasses = isHero 
    ? "bg-white rounded-2xl shadow-lg border border-gray-200 p-8 max-w-2xl mx-auto"
    : "bg-white rounded-lg shadow-sm border border-gray-200 p-6 max-w-md"

  return (
    <div className={`${className} ${isHero ? 'max-w-2xl mx-auto' : 'max-w-md'}`}>
      <div className={cardClasses}>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Header */}
          <div className="text-center mb-6">
            <h3 className={`font-bold text-slate-900 mb-3 ${isHero ? 'text-2xl' : 'text-lg'}`}>
              {headline}
            </h3>
            <p className={`text-slate-600 ${isHero ? 'text-base' : 'text-sm'}`}>
              {subtext}
            </p>
          </div>

          {/* Name Fields */}
          {showNameFields && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <input
                  type="text"
                  value={form.firstName}
                  onChange={handleChange('firstName')}
                  placeholder="First name (optional)"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  aria-label="First name"
                />
              </div>
              <div>
                <input
                  type="text"
                  value={form.lastName}
                  onChange={handleChange('lastName')}
                  placeholder="Last name (optional)"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  aria-label="Last name"
                />
              </div>
            </div>
          )}

          {/* Email Field */}
          <div>
            <input
              type="email"
              value={form.email}
              onChange={handleChange('email')}
              placeholder={isHero ? "Your school email" : "Enter your email"}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
              aria-label="Email address"
            />
          </div>

          {/* Error Message */}
          {submission.status === 'error' && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
              <div className="text-red-600 text-sm flex items-center justify-center gap-2">
                <span>❌</span>
                <span>{submission.message}</span>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={submission.status === 'loading'}
            className={`w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-semibold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
              isHero ? 'py-4 px-6 text-lg' : 'py-3 px-4 text-base'
            }`}
            aria-label={buttonText}
          >
            {submission.status === 'loading' ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing up...
              </span>
            ) : (
              buttonText
            )}
          </button>
        </form>
        
        {/* Trust Signal */}
        <div className="text-center mt-4">
          <p className="text-xs text-slate-500">
            Join 12,000+ educators. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </div>
  )
}