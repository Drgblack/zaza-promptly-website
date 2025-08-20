"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { CheckCircle, Mail } from 'lucide-react'
import { useAnalytics } from '@/hooks/useAnalytics'

export function MainEmailCaptureSection() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const { trackEvent } = useAnalytics()

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required'
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required'
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsSubmitting(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Track successful signup
      trackEvent('email_submitted', { 
        source: 'homepage_main_capture',
        form_type: 'newsletter_signup'
      })
      
      setIsSuccess(true)
    } catch (error) {
      console.error('Email signup error:', error)
      setErrors({ submit: 'Something went wrong. Please try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  if (isSuccess) {
    return (
      <section id="email-capture-section" className="py-16 md:py-24 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="rounded-2xl shadow-xl border-2 border-green-200">
            <CardContent className="p-12 text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-green-900 mb-4">
                Welcome to the community!
              </h2>
              <p className="text-lg text-green-700 mb-6">
                Check your email for your first teacher tip and updates about Promptly.
              </p>
              <p className="text-sm text-green-600">
                You can unsubscribe at any time. No spam, just helpful resources for teachers.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    )
  }

  return (
    <section id="email-capture-section" className="py-16 md:py-24 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="rounded-2xl shadow-xl border-2 border-blue-200">
          <CardContent className="p-12">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Join 12,000+ Teachers Saving Hours Each Week
              </h2>
              <p className="text-lg text-slate-600">
                Get early access to Promptly plus free teacher resources. Created by Dr. Greg Blackburn, PhD in Professional Education.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <Label htmlFor="firstName" className="text-sm font-medium text-slate-700 mb-2 block">
                    First Name *
                  </Label>
                  <Input
                    id="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className={`rounded-lg border-2 ${errors.firstName ? 'border-red-300' : 'border-slate-300'} focus:border-blue-500`}
                    aria-invalid={!!errors.firstName}
                    aria-describedby={errors.firstName ? "firstName-error" : undefined}
                  />
                  {errors.firstName && (
                    <p id="firstName-error" className="text-red-500 text-sm mt-1" role="alert">
                      {errors.firstName}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="lastName" className="text-sm font-medium text-slate-700 mb-2 block">
                    Last Name *
                  </Label>
                  <Input
                    id="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className={`rounded-lg border-2 ${errors.lastName ? 'border-red-300' : 'border-slate-300'} focus:border-blue-500`}
                    aria-invalid={!!errors.lastName}
                    aria-describedby={errors.lastName ? "lastName-error" : undefined}
                  />
                  {errors.lastName && (
                    <p id="lastName-error" className="text-red-500 text-sm mt-1" role="alert">
                      {errors.lastName}
                    </p>
                  )}
                </div>
              </div>

              <div className="mb-6">
                <Label htmlFor="email" className="text-sm font-medium text-slate-700 mb-2 block">
                  Email Address *
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`rounded-lg border-2 ${errors.email ? 'border-red-300' : 'border-slate-300'} focus:border-blue-500`}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
                {errors.email && (
                  <p id="email-error" className="text-red-500 text-sm mt-1" role="alert">
                    {errors.email}
                  </p>
                )}
              </div>

              {errors.submit && (
                <p className="text-red-500 text-sm mb-4 text-center" role="alert">
                  {errors.submit}
                </p>
              )}

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-4 text-lg rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200 disabled:transform-none disabled:opacity-70"
              >
                {isSubmitting ? 'Joining community...' : 'Get Early Access + Free Resources'}
              </Button>

              <p className="text-xs text-slate-500 text-center mt-4">
                ✓ No spam, just valuable teacher resources ✓ Designed by PhD educator ✓ Unsubscribe anytime
              </p>
            </form>

            {/* Hidden fields for tracking */}
            <input type="hidden" name="source" value="homepage_main_capture" />
            <input type="hidden" name="pagePath" value="/" />
          </CardContent>
        </Card>
      </div>
    </section>
  )
}