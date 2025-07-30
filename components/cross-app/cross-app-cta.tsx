"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  GraduationCap,
  Palette,
  Zap,
  ExternalLink,
  ArrowRight,
  CheckCircle2,
  Clock,
  Sparkles,
  Play,
  Star,
  BookOpen,
  Download,
  Users,
  Target,
  Heart,
  Calendar
} from 'lucide-react'

interface CrossAppCTAProps {
  targetApp: 'teach' | 'visuals' | 'autoplanner'
  variant?: 'blog_footer' | 'resource_footer' | 'sidebar' | 'inline' | 'modal'
  context?: 'blog_post' | 'resource_download' | 'homepage' | 'community'
  contentTitle?: string
  contentType?: 'lesson_planning' | 'visual_design' | 'automation' | 'general'
  className?: string
  onDismiss?: () => void
}

const APP_CONFIG = {
  teach: {
    name: 'Zaza Teach',
    fullName: 'Zaza Teach',
    url: 'https://zazateach.com',
    description: 'Complete lesson planning platform',
    icon: <GraduationCap className="w-5 h-5" />,
    color: 'blue',
    features: [
      'AI-powered lesson planning',
      'Standards alignment',
      'Assessment creation',
      'Progress tracking'
    ],
    benefits: [
      'Save 10+ hours per week',
      'Create aligned curricula',
      'Track student progress',
      'Collaborate with team'
    ],
    cta: 'Get Evenings Back',
    trial: true
  },
  visuals: {
    name: 'Zaza Visuals',
    fullName: 'Zaza Visuals',
    url: 'https://zazavisuals.com',
    description: 'AI-powered classroom graphics',
    icon: <Palette className="w-5 h-5" />,
    color: 'green',
    features: [
      'Custom classroom posters',
      'Interactive visual aids',
      'Branded materials',
      'Print-ready designs'
    ],
    benefits: [
      'Professional-looking materials',
      'Save design time',
      'Engage students visually',
      'Brand consistency'
    ],
    cta: 'Join Beta',
    trial: false
  },
  autoplanner: {
    name: 'AutoPlanner',
    fullName: 'Zaza AutoPlanner',
    url: '#',
    description: 'Automated weekly lesson planning',
    icon: <Zap className="w-5 h-5" />,
    color: 'orange',
    features: [
      'Automated planning',
      'Smart scheduling',
      'Resource integration',
      'Adaptive pacing'
    ],
    benefits: [
      'Zero planning time',
      'Perfect scheduling',
      'Integrated resources',
      'Adaptive to your style'
    ],
    cta: 'Join Waitlist',
    trial: false
  }
}

export function CrossAppCTA({
  targetApp,
  variant = 'blog_footer',
  context = 'blog_post',
  contentTitle,
  contentType = 'general',
  className = '',
  onDismiss
}: CrossAppCTAProps) {
  const [isDismissed, setIsDismissed] = useState(false)
  const appConfig = APP_CONFIG[targetApp]

  const trackCTAClick = (source: string) => {
    if ((window as any).zazeAnalytics) {
      (window as any).zazeAnalytics.trackCrossAppCTA(targetApp, source, 'clicked')
    }
  }

  const handleDismiss = () => {
    setIsDismissed(true)
    if (onDismiss) {
      onDismiss()
    }
  }

  const getContextualMessage = () => {
    const messages = {
      teach: {
        blog_post: `Loved this ${contentType === 'lesson_planning' ? 'lesson planning' : 'teaching'} advice?`,
        resource_download: `Want to take your ${contentType === 'lesson_planning' ? 'lesson planning' : 'teaching'} further?`,
        homepage: 'Ready for complete lesson planning?',
        community: 'Join teachers using our full platform'
      },
      visuals: {
        blog_post: 'Need professional classroom visuals?',
        resource_download: 'Want custom graphics for your materials?',
        homepage: 'Create stunning classroom materials',
        community: 'Design beautiful teaching resources'
      },
      autoplanner: {
        blog_post: 'Tired of manual planning?',
        resource_download: 'Want completely automated planning?',
        homepage: 'The future of lesson planning',
        community: 'Zero-effort weekly planning'
      }
    }
    
    return messages[targetApp][context as keyof typeof messages[typeof targetApp]] || `Discover ${appConfig.name}`
  }

  const getColorClasses = (color: string) => {
    const colors = {
      blue: {
        bg: 'from-blue-50 to-indigo-50',
        border: 'border-blue-200',
        button: 'bg-blue-600 hover:bg-blue-700',
        text: 'text-blue-600',
        badge: 'bg-blue-100 text-blue-800'
      },
      green: {
        bg: 'from-green-50 to-emerald-50',
        border: 'border-green-200',
        button: 'bg-green-600 hover:bg-green-700',
        text: 'text-green-600',
        badge: 'bg-green-100 text-green-800'
      },
      orange: {
        bg: 'from-orange-50 to-amber-50',
        border: 'border-orange-200',
        button: 'bg-orange-600 hover:bg-orange-700',
        text: 'text-orange-600',
        badge: 'bg-orange-100 text-orange-800'
      }
    }
    return colors[color as keyof typeof colors] || colors.blue
  }

  if (isDismissed) return null

  const colorClasses = getColorClasses(appConfig.color)

  // Blog footer variant
  if (variant === 'blog_footer') {
    return (
      <div className={`border-t border-gray-200 mt-12 pt-8 ${className}`}>
        <Card className={`${colorClasses.border} bg-gradient-to-br ${colorClasses.bg}`}>
          <CardContent className="p-8">
            <div className="flex flex-col lg:flex-row items-center space-y-6 lg:space-y-0 lg:space-x-8">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-4">
                  <div className={`p-2 ${colorClasses.badge} rounded-lg`}>
                    {appConfig.icon}
                  </div>
                  <Badge className={colorClasses.badge}>
                    {targetApp === 'autoplanner' ? 'Coming Soon' : 'Available Now'}
                  </Badge>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {getContextualMessage()}
                </h3>
                
                <p className="text-gray-600 mb-6">
                  {targetApp === 'teach' && (
                    <>Take your teaching to the next level with {appConfig.name} - our complete lesson planning platform with AI-powered curriculum building.</>
                  )}
                  {targetApp === 'visuals' && (
                    <>Create professional classroom materials with {appConfig.name} - AI-generated posters, worksheets, and visual aids.</>
                  )}
                  {targetApp === 'autoplanner' && (
                    <>Imagine never planning lessons again. {appConfig.name} will automatically create your entire weekly schedule.</>
                  )}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                  {appConfig.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>

                <div className="flex space-x-4">
                  <Button
                    onClick={() => {
                      trackCTAClick('blog_footer')
                      if (targetApp === 'autoplanner') {
                        window.open('/waitlist?product=autoplanner', '_blank')
                      } else {
                        window.open(appConfig.url, '_blank')
                      }
                    }}
                    className={`${colorClasses.button} text-white px-6 py-3`}
                  >
                    {appConfig.icon}
                    <span className="ml-2">{appConfig.cta}</span>
                    {targetApp !== 'autoplanner' && <ExternalLink className="w-4 h-4 ml-2" />}
                  </Button>
                  
                  {targetApp === 'teach' && (
                    <Button
                      variant="outline"
                      onClick={() => window.open('/why-zaza-teach', '_blank')}
                      className={`${colorClasses.border} ${colorClasses.text} hover:bg-blue-50`}
                    >
                      Compare Features
                    </Button>
                  )}
                </div>
              </div>

              <div className="flex-shrink-0">
                <div className="relative">
                  <div className={`w-32 h-32 bg-gradient-to-br ${colorClasses.bg} ${colorClasses.border} border-2 rounded-2xl flex items-center justify-center`}>
                    <div className={`${colorClasses.text} text-6xl`}>
                      {appConfig.icon}
                    </div>
                  </div>
                  {appConfig.trial && (
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <Star className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Resource footer variant
  if (variant === 'resource_footer') {
    return (
      <div className={`mt-8 p-6 ${colorClasses.bg} bg-gradient-to-br border ${colorClasses.border} rounded-lg ${className}`}>
        <div className="flex items-start space-x-4">
          <div className={`p-3 bg-white rounded-lg shadow-sm`}>
            <div className={colorClasses.text}>
              {appConfig.icon}
            </div>
          </div>
          <div className="flex-1">
            <h4 className="font-bold text-gray-900 mb-2">
              {getContextualMessage()}
            </h4>
            <p className="text-gray-700 mb-4 text-sm">
              This resource is just the beginning. Get access to {appConfig.description.toLowerCase()} 
              with hundreds of templates and AI-powered tools.
            </p>
            
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
              <Button
                onClick={() => {
                  trackCTAClick('resource_footer')
                  if (targetApp === 'autoplanner') {
                    window.open('/waitlist?product=autoplanner', '_blank')
                  } else {
                    window.open(appConfig.url, '_blank')
                  }
                }}
                className={`${colorClasses.button} text-white`}
                size="sm"
              >
                {appConfig.icon}
                <span className="ml-2">{appConfig.cta}</span>
                {targetApp !== 'autoplanner' && <ExternalLink className="w-4 h-4 ml-2" />}
              </Button>
              
              {targetApp === 'teach' && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open('/why-zaza-teach', '_blank')}
                  className={`${colorClasses.border} ${colorClasses.text} hover:bg-blue-50`}
                >
                  Learn More
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Sidebar variant
  if (variant === 'sidebar') {
    return (
      <Card className={`${colorClasses.border} bg-gradient-to-br ${colorClasses.bg} ${className}`}>
        <CardContent className="p-6">
          <div className="text-center">
            <div className={`w-16 h-16 bg-white rounded-xl flex items-center justify-center mx-auto mb-4 shadow-sm`}>
              <div className={`${colorClasses.text} text-2xl`}>
                {appConfig.icon}
              </div>
            </div>
            
            <h3 className="font-bold text-gray-900 mb-2">
              {appConfig.name}
            </h3>
            
            <p className="text-sm text-gray-600 mb-4">
              {appConfig.description}
            </p>

            <ul className="space-y-2 mb-4 text-xs text-left">
              {appConfig.features.slice(0, 3).map((feature, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3 h-3 text-green-600" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <Button
              onClick={() => {
                trackCTAClick('sidebar')
                if (targetApp === 'autoplanner') {
                  window.open('/waitlist?product=autoplanner', '_blank')
                } else {
                  window.open(appConfig.url, '_blank')
                }
              }}
              className={`w-full ${colorClasses.button} text-white text-sm`}
            >
              {appConfig.cta}
              {targetApp !== 'autoplanner' && <ArrowRight className="w-4 h-4 ml-2" />}
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Inline variant
  if (variant === 'inline') {
    return (
      <div className={`border-l-4 ${colorClasses.border} ${colorClasses.bg} bg-gradient-to-r p-4 rounded-r-lg my-6 ${className}`}>
        <div className="flex items-center space-x-4">
          <div className={`p-2 bg-white rounded-lg ${colorClasses.text}`}>
            {appConfig.icon}
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-gray-900 mb-1">
              Upgrade to {appConfig.name}
            </h4>
            <p className="text-sm text-gray-600 mb-2">
              {appConfig.description} - {appConfig.benefits[0].toLowerCase()}
            </p>
            <Button
              onClick={() => {
                trackCTAClick('inline')
                if (targetApp === 'autoplanner') {
                  window.open('/waitlist?product=autoplanner', '_blank')
                } else {
                  window.open(appConfig.url, '_blank')
                }
              }}
              size="sm"
              className={`${colorClasses.button} text-white`}
            >
              {appConfig.cta}
              {targetApp !== 'autoplanner' && <ExternalLink className="w-4 h-4 ml-2" />}
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return null
}

// Smart CTA that chooses the best app to promote based on content context
export function SmartCrossAppCTA({
  variant = 'blog_footer',
  context = 'blog_post',
  contentTitle,
  contentType = 'general',
  className = ''
}: {
  variant?: 'blog_footer' | 'resource_footer' | 'sidebar' | 'inline'
  context?: 'blog_post' | 'resource_download' | 'homepage' | 'community'
  contentTitle?: string
  contentType?: 'lesson_planning' | 'visual_design' | 'automation' | 'general'
  className?: string
}) {
  const [targetApp, setTargetApp] = useState<'teach' | 'visuals' | 'autoplanner'>('teach')

  useEffect(() => {
    // Smart app selection based on content type and context
    if (contentType === 'lesson_planning' || context === 'resource_download') {
      setTargetApp('teach')
    } else if (contentType === 'visual_design') {
      setTargetApp('visuals')
    } else if (contentTitle?.toLowerCase().includes('automation') || contentTitle?.toLowerCase().includes('planning')) {
      // Check if they might be interested in automation
      const userEngagement = localStorage.getItem('user_engagement_level')
      if (userEngagement === 'high') {
        setTargetApp('autoplanner')
      } else {
        setTargetApp('teach')
      }
    } else {
      // Default to Teach for general content
      setTargetApp('teach')
    }
  }, [contentType, context, contentTitle])

  return (
    <CrossAppCTA
      targetApp={targetApp}
      variant={variant}
      context={context}
      contentTitle={contentTitle}
      contentType={contentType}
      className={className}
    />
  )
}

// Multi-app promotion component
export function ZazaEcosystemPromotion({ className = '' }: { className?: string }) {
  return (
    <div className={`space-y-6 ${className}`}>
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Explore the Complete Zaza Ecosystem
        </h3>
        <p className="text-gray-600">
          From free resources to complete automation - find the perfect tool for your teaching needs
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <CrossAppCTA
          targetApp="teach"
          variant="sidebar"
          context="homepage"
        />
        
        <CrossAppCTA
          targetApp="visuals"
          variant="sidebar"
          context="homepage"
        />
        
        <CrossAppCTA
          targetApp="autoplanner"
          variant="sidebar"
          context="homepage"
        />
      </div>
    </div>
  )
}