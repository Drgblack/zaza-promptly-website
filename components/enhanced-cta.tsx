"use client"

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Play, Users, Shield, Clock } from 'lucide-react'
import { useAnalytics } from '@/hooks/useAnalytics'
import { InlineEmailCapture } from './inline-email-capture'
import { AnimatedButton } from '@/components/gamification/AnimatedButton'

interface CTAProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'text'
  size?: 'sm' | 'md' | 'lg'
  action?: 'try-promptly' | 'join-waitlist' | 'see-demo' | 'get-resources' | 'start-free'
  text?: string
  subtitle?: string
  className?: string
  showIcon?: boolean
  trackingLabel?: string
  href?: string
}

export function EnhancedCTA({
  variant = 'primary',
  size = 'md',
  action = 'try-promptly',
  text,
  subtitle,
  className = '',
  showIcon = true,
  trackingLabel,
  href
}: CTAProps) {
  const { trackEvent } = useAnalytics()

  const handleClick = () => {
    trackEvent('cta_clicked', {
      action,
      variant,
      size,
      text: text || getDefaultText(action),
      tracking_label: trackingLabel
    })
  }

  const getDefaultText = (action: string) => {
    switch (action) {
      case 'try-promptly': return 'Try Zaza Promptly Free'
      case 'join-waitlist': return 'Join Waitlist'
      case 'see-demo': return 'See It In Action'
      case 'get-resources': return 'Get Free Resources'
      case 'start-free': return 'Start Free Trial'
      default: return 'Get Started'
    }
  }

  const getDefaultHref = (action: string) => {
    switch (action) {
      case 'try-promptly': return '/promptly'
      case 'join-waitlist': return '/waitlist'
      case 'see-demo': return '#demo-section'
      case 'get-resources': return '/free-resources'
      case 'start-free': return '/promptly'
      default: return '/promptly'
    }
  }

  const getIcon = () => {
    switch (action) {
      case 'see-demo': return <Play className="w-4 h-4" />
      case 'join-waitlist': return <Users className="w-4 h-4" />
      case 'get-resources': return <Shield className="w-4 h-4" />
      default: return <ArrowRight className="w-4 h-4" />
    }
  }

  const getSizeClasses = () => {
    switch (size) {
      case 'sm': return 'px-4 py-2 text-sm'
      case 'lg': return 'px-8 py-4 text-lg'
      default: return 'px-6 py-3 text-base'
    }
  }

  const getVariantClasses = () => {
    switch (variant) {
      case 'primary':
        return 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
      case 'secondary':
        return 'bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
      case 'outline':
        return 'border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white'
      case 'text':
        return 'text-purple-600 hover:text-purple-800 underline font-medium'
      default:
        return 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white'
    }
  }

  const displayText = text || getDefaultText(action)
  const targetHref = href || getDefaultHref(action)

  if (action === 'see-demo' && targetHref.startsWith('#')) {
    return (
      <AnimatedButton
        onClick={() => {
          handleClick()
          const element = document.querySelector(targetHref)
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
          }
        }}
        variant={variant === 'primary' ? 'primary' : 'secondary'}
        size={size}
        className={className}
        gamification={{
          bounceOnHover: true,
          showSparkle: true,
          achievementLevel: 2
        }}
        accessibilityProps={{
          'aria-label': `${displayText} - scrolls to demo section`
        }}
      >
        <span className="flex items-center gap-2">
          {displayText}
          {showIcon && getIcon()}
        </span>
      </AnimatedButton>
    )
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <Link href={targetHref} onClick={handleClick}>
        <AnimatedButton
          variant={variant === 'primary' ? 'primary' : 'secondary'}
          size={size}
          className={className}
          gamification={{
            bounceOnHover: true,
            showSparkle: action === 'try-promptly',
            achievementLevel: action === 'try-promptly' ? 3 : 2
          }}
          badge={action === 'try-promptly' ? { text: 'Free', type: 'success' } : undefined}
          accessibilityProps={{
            'aria-label': `${displayText}${subtitle ? ` - ${subtitle}` : ''}`
          }}
        >
          <span className="flex items-center gap-2">
            {displayText}
            {showIcon && getIcon()}
          </span>
        </AnimatedButton>
      </Link>
      {subtitle && (
        <p className="text-sm text-gray-600 text-center max-w-xs">
          {subtitle}
        </p>
      )}
    </div>
  )
}

// Hero CTA Section with multiple options
export function HeroCTASection() {
  const { trackEvent } = useAnalytics()

  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
      <EnhancedCTA
        variant="secondary"
        size="lg"
        action="start-free"
        text="Start Free Trial"
        trackingLabel="hero_primary"
        className="w-full sm:w-auto"
      />
      <EnhancedCTA
        variant="outline"
        size="lg"
        action="see-demo"
        text="Learn More"
        trackingLabel="hero_demo"
        className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-blue-900"
      />
    </div>
  )
}

// Bottom of page CTA section
export function BottomCTASection({ 
  title = "Ready to Save 5+ Hours Every Week?",
  subtitle = "Join 12,000+ teachers who've already reclaimed their evenings",
  className = ""
}: {
  title?: string
  subtitle?: string
  className?: string
}) {
  return (
    <section className={`py-16 bg-gradient-to-r from-purple-600 to-blue-600 ${className}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          {title}
        </h2>
        <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
          {subtitle}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <EnhancedCTA
            variant="secondary"
            size="lg"
            action="try-promptly"
            text="Try Zaza Promptly Free"
            subtitle="No credit card required • 2-minute setup"
            trackingLabel="bottom_cta_primary"
          />
          <EnhancedCTA
            variant="outline"
            size="lg"
            action="get-resources"
            text="Get Free Teaching Resources"
            className="border-white text-white hover:bg-white hover:text-purple-600"
            trackingLabel="bottom_cta_resources"
          />
        </div>

        <div className="flex items-center justify-center gap-6 text-white/80 text-sm">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            <span>GDPR Compliant</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            <span>12,000+ Teachers</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>Save 5+ Hours Weekly</span>
          </div>
        </div>
      </div>
    </section>
  )
}

// Sticky CTA that appears on scroll
export function StickyCTA() {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <>
      {isVisible && (
        <div className="fixed bottom-4 right-4 z-50 animate-slide-up">
          <EnhancedCTA
            variant="primary"
            action="try-promptly"
            text="Try Free"
            size="md"
            trackingLabel="sticky_cta"
            className="shadow-2xl"
          />
        </div>
      )}
    </>
  )
}

// Product page specific CTA
export function ProductCTA({ 
  productName, 
  isAvailable = true,
  features = [],
  className = ""
}: {
  productName: string
  isAvailable?: boolean
  features?: string[]
  className?: string
}) {
  return (
    <div className={`bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 ${className}`}>
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Ready to Try {productName}?
        </h3>
        <p className="text-gray-600">
          {isAvailable 
            ? "Join thousands of teachers already saving hours every week"
            : "Be first to know when we launch"
          }
        </p>
      </div>

      {features.length > 0 && (
        <div className="mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2 text-sm text-gray-700">
                <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <EnhancedCTA
          variant="primary"
          action={isAvailable ? "try-promptly" : "join-waitlist"}
          size="lg"
          trackingLabel={`product_cta_${productName.toLowerCase()}`}
        />
        <EnhancedCTA
          variant="outline"
          action="see-demo"
          text="See Demo"
          size="lg"
          trackingLabel={`product_demo_${productName.toLowerCase()}`}
        />
      </div>
    </div>
  )
}