"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { 
  Mail, 
  Download, 
  CheckCircle2, 
  Sparkles, 
  Gift,
  ArrowRight,
  BookOpen,
  Users,
  TrendingUp,
  X
} from 'lucide-react'

interface BlogLeadCaptureProps {
  postTitle: string
  postCategory: string
  tags: string[]
  placement: 'inline' | 'exit_intent' | 'time_based' | 'scroll_based'
  variant?: 'newsletter' | 'resource_download' | 'community' | 'personalized'
  className?: string
}

export function BlogLeadCapture({
  postTitle,
  postCategory,
  tags,
  placement,
  variant = 'newsletter',
  className = ''
}: BlogLeadCaptureProps) {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isVisible, setIsVisible] = useState(placement === 'inline')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (placement === 'inline') return

    let timeoutId: NodeJS.Timeout
    let scrollHandler: () => void

    switch (placement) {
      case 'time_based':
        timeoutId = setTimeout(() => setIsVisible(true), 45000) // 45 seconds
        break
      
      case 'scroll_based':
        scrollHandler = () => {
          const scrolled = window.scrollY
          const winHeight = window.innerHeight
          const docHeight = document.documentElement.scrollHeight
          const scrollPercent = scrolled / (docHeight - winHeight)
          
          if (scrollPercent > 0.6) {
            setIsVisible(true)
            window.removeEventListener('scroll', scrollHandler)
          }
        }
        window.addEventListener('scroll', scrollHandler)
        break
      
      case 'exit_intent':
        const handleMouseLeave = (e: MouseEvent) => {
          if (e.clientY <= 0) {
            setIsVisible(true)
            document.removeEventListener('mouseleave', handleMouseLeave)
          }
        }
        document.addEventListener('mouseleave', handleMouseLeave)
        return () => document.removeEventListener('mouseleave', handleMouseLeave)
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId)
      if (scrollHandler) window.removeEventListener('scroll', scrollHandler)
    }
  }, [placement])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch('/api/brevo-subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          name,
          source: `blog_${placement}_${variant}`,
          tags: [
            `blog_reader`,
            `category_${postCategory.toLowerCase().replace(/\s+/g, '_')}`,
            `placement_${placement}`,
            `variant_${variant}`,
            ...tags.slice(0, 2).map(tag => `tag_${tag.toLowerCase().replace(/\s+/g, '_')}`)
          ]
        })
      })

      if (!response.ok) {
        throw new Error('Failed to subscribe')
      }

      setIsSubmitted(true)
      
      // Analytics tracking
      if ((window as any).zazeAnalytics) {
        (window as any).zazeAnalytics.trackLeadCapture(variant, placement, postTitle)
      }
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isVisible || isSubmitted) {
    return isSubmitted ? (
      <div className={`${placement !== 'inline' ? 'fixed bottom-4 right-4 z-50' : ''} ${className}`}>
        <Card className="border-green-200 bg-green-50 max-w-sm">
          <CardContent className="p-4">
            <div className="flex items-center">
              <CheckCircle2 className="w-5 h-5 text-green-600 mr-2" />
              <span className="text-green-800 font-medium text-sm">Thanks for subscribing!</span>
            </div>
          </CardContent>
        </Card>
      </div>
    ) : null
  }

  const getVariantConfig = () => {
    switch (variant) {
      case 'resource_download':
        return {
          icon: <Download className="w-6 h-6" />,
          iconBg: 'bg-blue-100',
          iconColor: 'text-blue-600',
          title: 'Get Your Free Teaching Resources',
          description: 'Download our complete collection of AI prompts and templates, plus get weekly tips for using AI in your classroom.',
          buttonText: 'Download Free Resources',
          benefit: '50+ Ready-to-Use Templates',
          gradientFrom: 'from-blue-50',
          gradientTo: 'to-indigo-50',
          borderColor: 'border-blue-200'
        }
      
      case 'community':
        return {
          icon: <Users className="w-6 h-6" />,
          iconBg: 'bg-green-100',
          iconColor: 'text-green-600',
          title: 'Join 1,200+ Teachers Using AI',
          description: 'Connect with other educators, share ideas, and get support as you integrate AI into your teaching practice.',
          buttonText: 'Join Our Community',
          benefit: 'Exclusive Teacher Network',
          gradientFrom: 'from-green-50',
          gradientTo: 'to-emerald-50',
          borderColor: 'border-green-200'
        }
      
      case 'personalized':
        const personalizedTitle = postCategory === 'Lesson Planning' ? 
          'Want More Lesson Planning Ideas?' :
          postCategory === 'Parent Communication' ?
          'Master Parent Communication' :
          'Get More AI Teaching Tips'
        
        return {
          icon: <Sparkles className="w-6 h-6" />,
          iconBg: 'bg-purple-100',
          iconColor: 'text-purple-600',
          title: personalizedTitle,
          description: `Since you're reading about ${postCategory.toLowerCase()}, get personalized tips and resources delivered weekly.`,
          buttonText: 'Get Personalized Tips',
          benefit: 'Tailored to Your Interests',
          gradientFrom: 'from-purple-50',
          gradientTo: 'to-pink-50',
          borderColor: 'border-purple-200'
        }
      
      default: // newsletter
        return {
          icon: <Mail className="w-6 h-6" />,
          iconBg: 'bg-purple-100',
          iconColor: 'text-purple-600',
          title: 'Enjoyed This Article?',
          description: 'Get weekly AI teaching tips, free resources, and practical strategies delivered to your inbox.',
          buttonText: 'Subscribe to Newsletter',
          benefit: 'Weekly Teacher AI Tips',
          gradientFrom: 'from-purple-50',
          gradientTo: 'to-pink-50',
          borderColor: 'border-purple-200'
        }
    }
  }

  const config = getVariantConfig()

  const baseClasses = placement !== 'inline' 
    ? 'fixed bottom-4 right-4 z-50 max-w-sm shadow-2xl animate-in slide-in-from-bottom-4'
    : 'my-12'

  return (
    <div className={`${baseClasses} ${className}`}>
      <Card className={`${config.gradientFrom} ${config.gradientTo} bg-gradient-to-br ${config.borderColor} border-2`}>
        {placement !== 'inline' && (
          <button
            onClick={() => setIsVisible(false)}
            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
        
        <CardContent className="p-6">
          <div className="text-center">
            {/* Icon */}
            <div className={`mx-auto w-12 h-12 ${config.iconBg} rounded-xl flex items-center justify-center mb-4`}>
              <div className={config.iconColor}>
                {config.icon}
              </div>
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {config.title}
            </h3>

            {/* Description */}
            <p className="text-gray-600 text-sm mb-4">
              {config.description}
            </p>

            {/* Benefit Badge */}
            <div className="inline-flex items-center px-3 py-1 bg-white bg-opacity-70 rounded-full text-xs font-medium text-gray-700 mb-6">
              <Gift className="w-3 h-3 mr-1" />
              {config.benefit}
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3">
              <Input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full"
                required
              />
              <Input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full"
                required
              />
              
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gray-900 hover:bg-gray-800 text-white"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full" />
                    Subscribing...
                  </>
                ) : (
                  <>
                    {config.icon}
                    <span className="ml-2">{config.buttonText}</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>

              {error && (
                <p className="text-red-600 text-xs text-center">{error}</p>
              )}
            </form>

            {/* Trust indicators */}
            <div className="mt-4 flex items-center justify-center space-x-4 text-xs text-gray-500">
              <div className="flex items-center">
                <CheckCircle2 className="w-3 h-3 mr-1" />
                No spam
              </div>
              <div className="flex items-center">
                <CheckCircle2 className="w-3 h-3 mr-1" />
                Unsubscribe anytime
              </div>
            </div>

            {/* Social proof */}
            <div className="mt-3 text-xs text-gray-500">
              <TrendingUp className="w-3 h-3 inline mr-1" />
              Join 2,400+ teachers already using AI
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Hook for managing lead capture visibility and behavior
export function useLeadCapture(config: {
  postTitle: string
  postCategory: string  
  readingTime: number
}) {
  const [showInline, setShowInline] = useState(false)
  const [showExitIntent, setShowExitIntent] = useState(false)
  const [showTimeBased, setShowTimeBased] = useState(false)
  const [showScrollBased, setShowScrollBased] = useState(false)

  useEffect(() => {
    // Show inline capture after 30% of estimated reading time
    const inlineTimer = setTimeout(() => {
      setShowInline(true)
    }, (config.readingTime * 60 * 1000) * 0.3)

    // Show time-based capture after reading time + 30 seconds
    const timeBasedTimer = setTimeout(() => {
      setShowTimeBased(true)
    }, (config.readingTime * 60 * 1000) + 30000)

    return () => {
      clearTimeout(inlineTimer)
      clearTimeout(timeBasedTimer)
    }
  }, [config.readingTime])

  return {
    showInline,
    showExitIntent,
    showTimeBased,
    showScrollBased,
    setShowExitIntent,
    setShowScrollBased
  }
}