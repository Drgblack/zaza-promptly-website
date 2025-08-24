'use client'

import { useState, useEffect } from 'react'
import { getCurrentLanguage } from '@/lib/lang'
import Link from 'next/link'

interface UniversalEmailCaptureProps {
  source: string
  className?: string
}

// Bilingual content configuration
const content = {
  en: {
    title: 'This page is coming soon',
    subtitle: 'Leave your email to be notified when it\'s ready',
    firstName: 'First name',
    lastName: 'Last name', 
    email: 'Email address',
    submit: 'Notify me',
    submitting: 'Submitting...',
    backHome: 'Back to Home',
    successTitle: 'Thanks for your interest! 🎉',
    successMessage: 'You\'ll be the first to know when this feature is ready.',
    noSpam: 'No spam, unsubscribe at any time.',
    errors: {
      firstName: 'First name is required',
      lastName: 'Last name is required',
      email: 'Email address is required',
      emailInvalid: 'Please enter a valid email address',
      network: 'Network error. Please check your connection and try again.',
      general: 'Something went wrong. Please try again.'
    }
  },
  de: {
    title: 'Diese Seite wird bald verfügbar sein',
    subtitle: 'Geben Sie Ihre E-Mail ein, um benachrichtigt zu werden',
    firstName: 'Vorname',
    lastName: 'Nachname',
    email: 'E-Mail-Adresse',
    submit: 'Benachrichtigen',
    submitting: 'Wird gesendet...',
    backHome: 'Zurück zur Startseite',
    successTitle: 'Vielen Dank für Ihr Interesse! 🎉',
    successMessage: 'Sie sind die erste Person, die erfährt, wenn diese Funktion bereit ist.',
    noSpam: 'Kein Spam, jederzeit abmeldbar.',
    errors: {
      firstName: 'Vorname ist erforderlich',
      lastName: 'Nachname ist erforderlich',
      email: 'E-Mail-Adresse ist erforderlich',
      emailInvalid: 'Bitte geben Sie eine gültige E-Mail-Adresse ein',
      network: 'Netzwerkfehler. Bitte überprüfen Sie Ihre Verbindung und versuchen Sie es erneut.',
      general: 'Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut.'
    }
  }
}

interface FormData {
  firstName: string
  lastName: string
  email: string
}

interface FormErrors {
  firstName?: string
  lastName?: string
  email?: string
}

export default function UniversalEmailCapture({ source, className = '' }: UniversalEmailCaptureProps) {
  const [currentLanguage, setCurrentLanguage] = useState('en')
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: ''
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  
  // Get content for current language
  const copy = content[currentLanguage as keyof typeof content] || content.en

  // Track language changes
  useEffect(() => {
    setCurrentLanguage(getCurrentLanguage())
    
    const handleLanguageChange = (event: CustomEvent) => {
      setCurrentLanguage(event.detail)
    }
    
    window.addEventListener('languageChange', handleLanguageChange as EventListener)
    return () => window.removeEventListener('languageChange', handleLanguageChange as EventListener)
  }, [])

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    // First name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = copy.errors.firstName
    }

    // Last name validation  
    if (!formData.lastName.trim()) {
      newErrors.lastName = copy.errors.lastName
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = copy.errors.email
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(formData.email)) {
        newErrors.email = copy.errors.emailInvalid
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
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
          firstName: formData.firstName.trim(),
          lastName: formData.lastName.trim(),
          role: 'teacher', // Default role for these captures
          source,
          honeypot: '' // Empty honeypot field
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        if (result.details) {
          setErrors(result.details)
        } else {
          setErrors({ email: result.error || copy.errors.general })
        }
      } else {
        setIsSubmitted(true)
      }
    } catch (error) {
      console.error('Form submission error:', error)
      setErrors({ email: copy.errors.network })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className={`min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center py-12 px-4 ${className}`}>
        <div className="max-w-md w-full mx-auto bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {copy.successTitle}
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              {copy.successMessage}
            </p>
            
            <Link 
              href="/"
              className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-800"
            >
              {copy.backHome}
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center py-12 px-4 ${className}`}>
      <div className="max-w-md w-full mx-auto bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {copy.title}
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            {copy.subtitle}
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* First Name Field */}
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {copy.firstName}
            </label>
            <input 
              type="text" 
              id="firstName"
              name="firstName"
              placeholder={copy.firstName}
              value={formData.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:text-white transition-colors ${
                errors.firstName 
                  ? 'border-red-500 dark:border-red-400 focus:ring-red-500 focus:border-red-500' 
                  : 'border-gray-300 dark:border-gray-600'
              }`}
              required
              aria-describedby={errors.firstName ? 'firstName-error' : undefined}
            />
            {errors.firstName && (
              <p id="firstName-error" className="mt-1 text-sm text-red-600 dark:text-red-400" role="alert">
                {errors.firstName}
              </p>
            )}
          </div>

          {/* Last Name Field */}
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {copy.lastName}
            </label>
            <input 
              type="text" 
              id="lastName"
              name="lastName"
              placeholder={copy.lastName}
              value={formData.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:text-white transition-colors ${
                errors.lastName 
                  ? 'border-red-500 dark:border-red-400 focus:ring-red-500 focus:border-red-500' 
                  : 'border-gray-300 dark:border-gray-600'
              }`}
              required
              aria-describedby={errors.lastName ? 'lastName-error' : undefined}
            />
            {errors.lastName && (
              <p id="lastName-error" className="mt-1 text-sm text-red-600 dark:text-red-400" role="alert">
                {errors.lastName}
              </p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {copy.email}
            </label>
            <input 
              type="email" 
              id="email"
              name="email"
              placeholder={copy.email}
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:text-white transition-colors ${
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

          {/* Hidden honeypot field for bot detection */}
          <input
            type="text"
            name="honeypot"
            style={{ display: 'none' }}
            tabIndex={-1}
            autoComplete="off"
          />

          <button 
            type="submit"
            disabled={isSubmitting}
            className={`w-full px-6 py-3 text-white font-semibold rounded-lg shadow-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-800 ${
              isSubmitting
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                {copy.submitting}
              </div>
            ) : (
              copy.submit
            )}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          {copy.noSpam}
        </p>

        <div className="mt-6 text-center">
          <Link 
            href="/"
            className="inline-flex items-center text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-800 rounded-lg px-2 py-1"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {copy.backHome}
          </Link>
        </div>
      </div>
    </div>
  )
}