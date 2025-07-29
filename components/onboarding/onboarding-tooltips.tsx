"use client"

import { useState, useEffect, useRef } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  X, 
  ArrowRight, 
  ArrowLeft, 
  Lightbulb,
  Download,
  Share2,
  MessageCircle,
  Users,
  Gift,
  CheckCircle2,
  Sparkles
} from 'lucide-react'

interface TooltipStep {
  id: string
  title: string
  description: string
  targetSelector: string
  position: 'top' | 'bottom' | 'left' | 'right' | 'center'
  icon?: React.ReactNode
  ctaText?: string
  ctaAction?: () => void
  showProgress?: boolean
}

interface OnboardingTooltipsProps {
  steps: TooltipStep[]
  isEnabled?: boolean
  autoStart?: boolean
  onComplete?: () => void
  className?: string
}

export function OnboardingTooltips({
  steps,
  isEnabled = true,
  autoStart = true,
  onComplete,
  className = ''
}: OnboardingTooltipsProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [isActive, setIsActive] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)
  const [targetElement, setTargetElement] = useState<HTMLElement | null>(null)
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 })
  const tooltipRef = useRef<HTMLDivElement>(null)

  // Check if user has completed onboarding
  useEffect(() => {
    if (!isEnabled) return

    const hasCompletedOnboarding = localStorage.getItem('onboarding_completed')
    const lastCompletedDate = localStorage.getItem('onboarding_last_completed')
    
    if (hasCompletedOnboarding && lastCompletedDate) {
      const lastCompleted = new Date(lastCompletedDate)
      const daysSince = (Date.now() - lastCompleted.getTime()) / (1000 * 60 * 60 * 24)
      
      // Reset onboarding after 30 days for returning users
      if (daysSince > 30) {
        localStorage.removeItem('onboarding_completed')
        localStorage.removeItem('onboarding_last_completed')
      } else {
        return // Skip onboarding if completed recently
      }
    }

    if (autoStart) {
      // Delay start to ensure page is fully loaded
      setTimeout(() => {
        startOnboarding()
      }, 1500)
    }
  }, [isEnabled, autoStart])

  // Update tooltip position when current step changes
  useEffect(() => {
    if (!isActive || !steps[currentStep]) return

    const updatePosition = () => {
      const step = steps[currentStep]
      const element = document.querySelector(step.targetSelector) as HTMLElement
      
      if (element) {
        setTargetElement(element)
        
        const rect = element.getBoundingClientRect()
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop
        const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft
        
        let top = 0
        let left = 0
        
        switch (step.position) {
          case 'top':
            top = rect.top + scrollTop - 10
            left = rect.left + scrollLeft + rect.width / 2
            break
          case 'bottom':
            top = rect.bottom + scrollTop + 10
            left = rect.left + scrollLeft + rect.width / 2
            break
          case 'left':
            top = rect.top + scrollTop + rect.height / 2
            left = rect.left + scrollLeft - 10
            break
          case 'right':
            top = rect.top + scrollTop + rect.height / 2
            left = rect.right + scrollLeft + 10
            break
          case 'center':
            top = window.innerHeight / 2 + scrollTop
            left = window.innerWidth / 2 + scrollLeft
            break
        }
        
        setTooltipPosition({ top, left })
        
        // Highlight target element
        element.style.position = 'relative'
        element.style.zIndex = '1000'
        element.style.outline = '2px solid #8b5cf6'
        element.style.outlineOffset = '4px'
        element.style.borderRadius = '8px'
        
        // Smooth scroll to element
        element.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center',
          inline: 'center'
        })
      }
    }

    updatePosition()
    
    // Update position on resize
    window.addEventListener('resize', updatePosition)
    window.addEventListener('scroll', updatePosition)
    
    return () => {
      window.removeEventListener('resize', updatePosition)
      window.removeEventListener('scroll', updatePosition)
      
      // Remove highlight from previous element
      if (targetElement) {
        targetElement.style.position = ''
        targetElement.style.zIndex = ''
        targetElement.style.outline = ''
        targetElement.style.outlineOffset = ''
        targetElement.style.borderRadius = ''
      }
    }
  }, [currentStep, isActive, steps])

  const startOnboarding = () => {
    setIsActive(true)
    setHasStarted(true)
    setCurrentStep(0)
    
    // Track onboarding start
    if ((window as any).zazeAnalytics) {
      (window as any).zazeAnalytics.trackCustomEvent('onboarding_started', {
        steps_count: steps.length,
        user_type: 'first_time'
      })
    }
  }

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
      
      // Track step completion
      if ((window as any).zazeAnalytics) {
        (window as any).zazeAnalytics.trackCustomEvent('onboarding_step_completed', {
          step_number: currentStep + 1,
          step_id: steps[currentStep].id
        })
      }
    } else {
      completeOnboarding()
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const skipOnboarding = () => {
    setIsActive(false)
    setHasStarted(false)
    
    // Clear any highlights
    if (targetElement) {
      targetElement.style.position = ''
      targetElement.style.zIndex = ''
      targetElement.style.outline = ''
      targetElement.style.outlineOffset = ''
      targetElement.style.borderRadius = ''
    }
    
    // Track skip
    if ((window as any).zazeAnalytics) {
      (window as any).zazeAnalytics.trackCustomEvent('onboarding_skipped', {
        completed_steps: currentStep + 1,
        total_steps: steps.length
      })
    }
    
    // Mark as completed (but skipped)
    localStorage.setItem('onboarding_completed', 'skipped')
    localStorage.setItem('onboarding_last_completed', new Date().toISOString())
  }

  const completeOnboarding = () => {
    setIsActive(false)
    setHasStarted(false)
    
    // Clear any highlights
    if (targetElement) {
      targetElement.style.position = ''
      targetElement.style.zIndex = ''
      targetElement.style.outline = ''
      targetElement.style.outlineOffset = ''
      targetElement.style.borderRadius = ''
    }
    
    // Track completion
    if ((window as any).zazeAnalytics) {
      (window as any).zazeAnalytics.trackCustomEvent('onboarding_completed', {
        completed_steps: steps.length,
        completion_rate: 100
      })
    }
    
    // Mark as completed
    localStorage.setItem('onboarding_completed', 'true')
    localStorage.setItem('onboarding_last_completed', new Date().toISOString())
    
    if (onComplete) {
      onComplete()
    }
  }

  const executeStepAction = () => {
    const step = steps[currentStep]
    if (step.ctaAction) {
      step.ctaAction()
    }
    nextStep()
  }

  if (!isActive || !isEnabled || !steps[currentStep]) {
    return null
  }

  const currentStepData = steps[currentStep]
  const isLastStep = currentStep === steps.length - 1

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-[999]" />
      
      {/* Tooltip */}
      <div
        ref={tooltipRef}
        className={`fixed z-[1000] ${className}`}
        style={{
          top: tooltipPosition.top,
          left: tooltipPosition.left,
          transform: currentStepData.position === 'center' 
            ? 'translate(-50%, -50%)' 
            : currentStepData.position === 'top' 
            ? 'translate(-50%, -100%)' 
            : currentStepData.position === 'bottom'
            ? 'translate(-50%, 0)'
            : currentStepData.position === 'left'
            ? 'translate(-100%, -50%)'
            : 'translate(0, -50%)'
        }}
      >
        <Card className="w-80 shadow-2xl animate-in zoom-in-95 duration-300">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-2">
                {currentStepData.icon && (
                  <div className="p-2 bg-purple-100 rounded-lg">
                    {currentStepData.icon}
                  </div>
                )}
                <div>
                  <h3 className="font-semibold text-gray-800">
                    {currentStepData.title}
                  </h3>
                  {currentStepData.showProgress !== false && (
                    <p className="text-xs text-gray-500">
                      Step {currentStep + 1} of {steps.length}
                    </p>
                  )}
                </div>
              </div>
              <Button
                onClick={skipOnboarding}
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            <p className="text-gray-600 text-sm mb-6">
              {currentStepData.description}
            </p>

            {/* Progress bar */}
            {currentStepData.showProgress !== false && (
              <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
                <div 
                  className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                />
              </div>
            )}

            <div className="flex items-center justify-between">
              <div>
                {currentStep > 0 && (
                  <Button
                    onClick={prevStep}
                    variant="outline"
                    size="sm"
                    className="mr-2"
                  >
                    <ArrowLeft className="w-4 h-4 mr-1" />
                    Back
                  </Button>
                )}
              </div>

              <div className="flex space-x-2">
                <Button
                  onClick={skipOnboarding}
                  variant="ghost"
                  size="sm"
                  className="text-gray-500"
                >
                  Skip Tour
                </Button>
                
                {currentStepData.ctaAction ? (
                  <Button
                    onClick={executeStepAction}
                    className="bg-purple-600 hover:bg-purple-700"
                    size="sm"
                  >
                    {currentStepData.ctaText || 'Try It'}
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                ) : (
                  <Button
                    onClick={nextStep}
                    className="bg-purple-600 hover:bg-purple-700"
                    size="sm"
                  >
                    {isLastStep ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 mr-1" />
                        Complete
                      </>
                    ) : (
                      <>
                        Next
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </>
                    )}
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

// Pre-defined onboarding tours
export const DEFAULT_HOMEPAGE_TOUR: TooltipStep[] = [
  {
    id: 'welcome',
    title: 'Welcome to Zaza Promptly! 👋',
    description: 'Let us show you around and help you discover how to save hours each week with AI-powered teaching tools.',
    targetSelector: 'header',
    position: 'center',
    icon: <Sparkles className="w-5 h-5 text-purple-600" />,
    showProgress: false
  },
  {
    id: 'free_resources',
    title: 'Free Resources',
    description: 'Start here! Browse our collection of free AI prompt templates, lesson plans, and teaching tools.',
    targetSelector: '[data-tour="free-resources"]',
    position: 'bottom',
    icon: <Download className="w-5 h-5 text-green-600" />,
    ctaText: 'Explore Resources',
    ctaAction: () => {
      const element = document.querySelector('[data-tour="free-resources"]') as HTMLElement
      if (element) element.click()
    }
  },
  {
    id: 'social_sharing',
    title: 'Share with Colleagues',
    description: 'Found something useful? Share it with your teaching colleagues and earn bonus resources!',
    targetSelector: '[data-tour="share-button"]',
    position: 'left',
    icon: <Share2 className="w-5 h-5 text-blue-600" />
  },
  {
    id: 'feedback',
    title: 'Give Feedback',
    description: 'Help us improve! Use this feedback button to tell us what you think or suggest new features.',
    targetSelector: '[data-tour="feedback"]',
    position: 'left',
    icon: <MessageCircle className="w-5 h-5 text-purple-600" />
  },
  {
    id: 'community',
    title: 'Join the Community',
    description: 'Connect with other teachers, share experiences, and get support from our growing educator community.',
    targetSelector: '[data-tour="community"]',
    position: 'top',
    icon: <Users className="w-5 h-5 text-orange-600" />
  },
  {
    id: 'complete',
    title: 'You\'re All Set! 🎉',
    description: 'That\'s the tour! Start exploring and remember - you can always reach out if you need help.',
    targetSelector: 'main',
    position: 'center',
    icon: <Gift className="w-5 h-5 text-green-600" />,
    showProgress: false
  }
]

export const BLOG_TOUR: TooltipStep[] = [
  {
    id: 'blog_welcome',
    title: 'Teacher-Focused Content',
    description: 'All our articles are written by teachers, for teachers. Find practical tips you can use immediately.',
    targetSelector: '.blog-header',
    position: 'bottom',
    icon: <Lightbulb className="w-5 h-5 text-blue-600" />
  },
  {
    id: 'blog_share',
    title: 'Share Articles',
    description: 'Found a helpful article? Share it with your teaching team or on social media.',
    targetSelector: '[data-tour="article-share"]',
    position: 'left',
    icon: <Share2 className="w-5 h-5 text-green-600" />
  },
  {
    id: 'blog_feedback',
    title: 'Article Feedback',
    description: 'Let us know if articles are helpful or suggest topics you\'d like us to cover.',
    targetSelector: '[data-tour="article-feedback"]',
    position: 'top',
    icon: <MessageCircle className="w-5 h-5 text-purple-600" />
  }
]

// Hook for managing onboarding
export function useOnboarding() {
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false)
  
  useEffect(() => {
    const completed = localStorage.getItem('onboarding_completed')
    setHasCompletedOnboarding(!!completed)
  }, [])
  
  const resetOnboarding = () => {
    localStorage.removeItem('onboarding_completed')
    localStorage.removeItem('onboarding_last_completed')
    setHasCompletedOnboarding(false)
  }
  
  const markCompleted = () => {
    localStorage.setItem('onboarding_completed', 'true')
    localStorage.setItem('onboarding_last_completed', new Date().toISOString())
    setHasCompletedOnboarding(true)
  }
  
  return {
    hasCompletedOnboarding,
    resetOnboarding,
    markCompleted
  }
}