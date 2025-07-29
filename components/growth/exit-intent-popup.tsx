"use client"

import { useState, useEffect, useCallback } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { X, Gift, Download, Star, CheckCircle2, Users } from 'lucide-react'
import { useReferralData } from '@/components/referral/referral-tracker'

interface ExitIntentPopupProps {
  isEnabled?: boolean
  delay?: number
  className?: string
}

export function ExitIntentPopup({ 
  isEnabled = true, 
  delay = 3000,
  className = '' 
}: ExitIntentPopupProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [hasTriggered, setHasTriggered] = useState(false)
  const [timeOnPage, setTimeOnPage] = useState(0)
  
  const { getReferrerEmail, trackConversion } = useReferralData()

  // Track time on page
  useEffect(() => {
    if (!isEnabled) return

    const startTime = Date.now()
    const interval = setInterval(() => {
      setTimeOnPage(Date.now() - startTime)
    }, 1000)

    return () => clearInterval(interval)
  }, [isEnabled])

  // Exit intent detection
  const handleMouseLeave = useCallback((e: MouseEvent) => {
    if (!isEnabled || hasTriggered || submitted) return

    // Only trigger if cursor leaves from the top of the viewport
    if (e.clientY <= 0 && timeOnPage > delay) {
      setIsVisible(true)
      setHasTriggered(true)
      
      // Track exit intent event
      if ((window as any).zazeAnalytics) {
        (window as any).zazeAnalytics.trackCTAClick('Exit Intent Popup', 'exit_intent_trigger')
      }
    }
  }, [isEnabled, hasTriggered, submitted, timeOnPage, delay])

  // Scroll detection for mobile
  const handleScroll = useCallback(() => {
    if (!isEnabled || hasTriggered || submitted) return

    const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
    
    // Trigger if user has scrolled 80% and been on page for minimum time
    if (scrollPercent > 80 && timeOnPage > delay) {
      setIsVisible(true)
      setHasTriggered(true)
      
      // Track scroll-based trigger
      if ((window as any).zazeAnalytics) {
        (window as any).zazeAnalytics.trackCTAClick('Exit Intent Popup', 'scroll_trigger')
      }
    }
  }, [isEnabled, hasTriggered, submitted, timeOnPage, delay])

  useEffect(() => {
    if (!isEnabled) return

    document.addEventListener('mouseleave', handleMouseLeave)
    window.addEventListener('scroll', handleScroll)

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [handleMouseLeave, handleScroll, isEnabled])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim() || isSubmitting) return

    setIsSubmitting(true)

    try {
      // Submit to Brevo
      const response = await fetch('/api/brevo-subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.trim(),
          name: '',
          source: 'exit_intent_popup',
          tags: ['exit_intent', 'resource_bundle', 'high_intent']
        })
      })

      if (response.ok) {
        setSubmitted(true)
        
        // Track conversion
        const referrerEmail = getReferrerEmail()
        if (referrerEmail) {
          trackConversion(email.trim())
        }
        
        // Track exit intent conversion
        if ((window as any).zazeAnalytics) {
          (window as any).zazeAnalytics.trackBrevoSubscribe('exit_intent', 'exit_intent_popup')
        }

        // Auto-close after showing success
        setTimeout(() => {
          setIsVisible(false)
        }, 4000)
      } else {
        console.error('Failed to subscribe')
      }
    } catch (error) {
      console.error('Error submitting email:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    setIsVisible(false)
    
    // Track popup dismissal
    if ((window as any).zazeAnalytics) {
      (window as any).zazeAnalytics.trackCTAClick('Close Exit Intent', 'popup_dismissed')
    }
  }

  if (!isVisible || !isEnabled) return null

  return (
    <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 ${className}`}>
      <Card className="w-full max-w-lg mx-auto relative animate-in zoom-in-95 duration-300">
        <Button
          onClick={handleClose}
          variant="ghost"
          size="sm"
          className="absolute top-2 right-2 h-8 w-8 p-0 z-10"
        >
          <X className="w-4 h-4" />
        </Button>
        
        <CardContent className="p-8">
          {submitted ? (
            // Success state
            <div className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">
                You're All Set! 🎉
              </h3>
              <p className="text-gray-600">
                Check your email for the <strong>Complete Teacher Resource Bundle</strong> with:
              </p>
              <div className="bg-green-50 p-4 rounded-lg text-left">
                <ul className="space-y-2 text-sm text-green-800">
                  <li className="flex items-center">
                    <CheckCircle2 className="w-4 h-4 mr-2 text-green-600" />
                    50+ AI Prompt Templates for Teachers
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="w-4 h-4 mr-2 text-green-600" />
                    Time-Saving Lesson Planning Guide
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="w-4 h-4 mr-2 text-green-600" />
                    Parent Communication Templates
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="w-4 h-4 mr-2 text-green-600" />
                    Exclusive Access to Teacher Community
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            // Main offer state
            <div className="space-y-6">
              {/* Header */}
              <div className="text-center">
                <div className="mx-auto w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-4">
                  <Gift className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  Wait! Don't Leave Empty-Handed
                </h3>
                <p className="text-gray-600">
                  Get our <strong>Complete Teacher Resource Bundle</strong> absolutely free
                </p>
              </div>

              {/* Value proposition */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-lg border border-purple-200">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">50+</div>
                    <div className="text-xs text-purple-700">AI Templates</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-pink-600">$97</div>
                    <div className="text-xs text-pink-700">Value - FREE</div>
                  </div>
                </div>
                
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-center">
                    <Star className="w-4 h-4 mr-2 text-yellow-500 fill-current" />
                    AI prompt templates for every teaching situation
                  </li>
                  <li className="flex items-center">
                    <Download className="w-4 h-4 mr-2 text-blue-500" />
                    Downloadable resources you can use immediately
                  </li>
                  <li className="flex items-center">
                    <Users className="w-4 h-4 mr-2 text-green-500" />
                    Join 1,200+ teachers saving 5+ hours per week
                  </li>
                </ul>
              </div>

              {/* Email form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Input
                    type="email"
                    placeholder="Enter your teacher email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="text-center text-lg py-3"
                  />
                </div>
                
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 text-lg font-semibold"
                >
                  {isSubmitting ? (
                    'Sending Your Resources...'
                  ) : (
                    <>
                      <Gift className="w-5 h-5 mr-2" />
                      Get My Free Bundle Now
                    </>
                  )}
                </Button>
              </form>

              {/* Trust indicators */}
              <div className="text-center">
                <p className="text-xs text-gray-500">
                  ✓ No spam, ever ✓ Unsubscribe anytime ✓ Trusted by educators worldwide
                </p>
              </div>

              {/* Social proof */}
              <div className="bg-gray-50 p-3 rounded-lg text-center">
                <p className="text-sm text-gray-600 mb-1">
                  <strong>23 teachers</strong> joined in the last week
                </p>
                <div className="flex items-center justify-center space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-3 h-3 text-yellow-400 fill-current" />
                  ))}
                  <span className="text-xs text-gray-500 ml-1">(4.9/5 from teachers)</span>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

// Hook for managing exit intent popup
export function useExitIntentPopup() {
  const [isEnabled, setIsEnabled] = useState(true)
  const [hasShown, setHasShown] = useState(false)

  // Check if user has already seen the popup recently
  useEffect(() => {
    const lastShown = localStorage.getItem('exit_intent_shown')
    if (lastShown) {
      const lastShownDate = new Date(lastShown)
      const daysSince = (Date.now() - lastShownDate.getTime()) / (1000 * 60 * 60 * 24)
      
      // Don't show again for 7 days
      if (daysSince < 7) {
        setIsEnabled(false)
      }
    }
  }, [])

  const markAsShown = () => {
    setHasShown(true)
    localStorage.setItem('exit_intent_shown', new Date().toISOString())
  }

  return {
    isEnabled,
    hasShown,
    markAsShown,
    disable: () => setIsEnabled(false)
  }
}