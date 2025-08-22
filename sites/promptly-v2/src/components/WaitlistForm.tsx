'use client'

import { useState, useEffect } from 'react'

interface FormErrors {
  email?: string
  role?: string
}

interface FormData {
  email: string
  role: string
  source: string
}

export default function WaitlistForm() {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    role: '',
    source: 'direct'
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  // Detect source from URL parameters or referrer
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search)
      const utmSource = urlParams.get('utm_source')
      const ref = urlParams.get('ref')
      const referrer = document.referrer
      
      let source = 'direct'
      
      if (utmSource) {
        source = `utm_${utmSource}`
      } else if (ref) {
        source = `ref_${ref}`
      } else if (referrer) {
        try {
          const referrerDomain = new URL(referrer).hostname
          if (referrerDomain !== window.location.hostname) {
            source = `referrer_${referrerDomain}`
          }
        } catch {
          source = 'referrer_unknown'
        }
      }
      
      setFormData(prev => ({ ...prev, source }))
    }
  }, [])

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required'
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address'
      }
    }

    // Role validation
    if (!formData.role) {
      newErrors.role = 'Please select your role'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email.trim(),
          role: formData.role,
          source: formData.source,
          honeypot: '' // Empty honeypot field
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        if (result.details) {
          setErrors(result.details)
        } else {
          setErrors({ email: result.error || 'Something went wrong. Please try again.' })
        }
      } else {
        setIsSubmitted(true)
      }
    } catch (error) {
      console.error('Form submission error:', error)
      setErrors({ email: 'Network error. Please check your connection and try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    
    // Clear error when user starts typing
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  if (isSubmitted) {
    return (
      <div className="max-w-md w-full mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            You&apos;re on the waitlist! 🎉
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Thanks for joining over 12,000 educators who are excited about Promptly.
          </p>
          
          <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              What happens next?
            </h3>
            <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1 text-left">
              <li className="flex items-start">
                <span className="text-blue-600 dark:text-blue-400 mr-2">1.</span>
                You&apos;ll receive a confirmation email shortly
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 dark:text-blue-400 mr-2">2.</span>
                We&apos;ll send early access when available
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 dark:text-blue-400 mr-2">3.</span>
                Get exclusive educator resources and updates
              </li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => {
                setIsSubmitted(false)
                setFormData({ email: '', role: '', source: formData.source })
                setErrors({})
              }}
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Add Another
            </button>
            <a
              href="/blog"
              className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-center"
            >
              Read Our Blog
            </a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-md w-full mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
      <div className="text-center">
        <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Join the Waitlist
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          Be the first to know when Promptly launches. Join over 12,000 educators who are already signed up.
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Field */}
          <div>
            <input 
              type="email" 
              placeholder="Enter your email address"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-colors ${
                errors.email 
                  ? 'border-red-500 dark:border-red-400 focus:ring-red-500 focus:border-red-500' 
                  : 'border-gray-300 dark:border-gray-600'
              }`}
              required
              aria-describedby={errors.email ? 'email-error' : undefined}
            />
            {errors.email && (
              <p id="email-error" className="mt-1 text-sm text-red-600 dark:text-red-400" role="alert">
                {errors.email}
              </p>
            )}
          </div>

          {/* Role Field */}
          <div>
            <select 
              value={formData.role}
              onChange={(e) => handleInputChange('role', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-colors ${
                errors.role 
                  ? 'border-red-500 dark:border-red-400 focus:ring-red-500 focus:border-red-500' 
                  : 'border-gray-300 dark:border-gray-600'
              }`}
              required
              aria-describedby={errors.role ? 'role-error' : undefined}
            >
              <option value="">Select your role *</option>
              <option value="teacher">Classroom Teacher</option>
              <option value="head-of-year">Head of Year</option>
              <option value="slt">Senior Leadership</option>
              <option value="senco">SENCO</option>
              <option value="tutor">Form Tutor</option>
              <option value="admin">School Admin</option>
              <option value="other">Other</option>
            </select>
            {errors.role && (
              <p id="role-error" className="mt-1 text-sm text-red-600 dark:text-red-400" role="alert">
                {errors.role}
              </p>
            )}
          </div>

          {/* Hidden honeypot field for bot detection */}
          <input
            type="text"
            name="honeypot"
            style={{ display: 'none' }}
            tabIndex={-1}
            autoComplete="off"
          />

          {/* Hidden source field */}
          <input
            type="hidden"
            name="source"
            value={formData.source}
          />

          <button 
            type="submit"
            disabled={isSubmitting}
            className={`w-full px-6 py-3 text-white font-semibold rounded-lg shadow-lg transition-colors ${
              isSubmitting
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Joining...
              </div>
            ) : (
              'Join Waitlist'
            )}
          </button>
        </form>

        <div className="mt-6 flex items-center justify-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center">
            <svg className="w-4 h-4 text-green-600 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Free trial
          </div>
          <div className="flex items-center">
            <svg className="w-4 h-4 text-green-600 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            No spam
          </div>
          <div className="flex items-center">
            <svg className="w-4 h-4 text-green-600 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            GDPR compliant
          </div>
        </div>
      </div>
    </div>
  )
}