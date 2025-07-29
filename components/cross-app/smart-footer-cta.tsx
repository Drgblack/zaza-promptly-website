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
  Sparkles,
  BookOpen,
  Users,
  Clock,
  Star,
  Gift,
  Lightbulb
} from 'lucide-react'
import { CrossAppCTA } from './cross-app-cta'

interface SmartFooterCTAProps {
  contentType?: 'blog_post' | 'resource' | 'guide' | 'template'
  contentTitle?: string
  contentCategory?: 'lesson_planning' | 'classroom_management' | 'ai_tools' | 'productivity' | 'general'
  tags?: string[]
  readingTime?: number
  className?: string
}

export function SmartFooterCTA({
  contentType = 'blog_post',
  contentTitle = '',
  contentCategory = 'general',
  tags = [],
  readingTime = 0,
  className = ''
}: SmartFooterCTAProps) {
  const [userEngagement, setUserEngagement] = useState<'low' | 'medium' | 'high'>('low')
  const [showCTA, setShowCTA] = useState(false)
  const [selectedApp, setSelectedApp] = useState<'teach' | 'visuals' | 'autoplanner'>('teach')

  useEffect(() => {
    // Calculate user engagement based on behavior
    calculateUserEngagement()
    
    // Determine best app to promote
    determineBestApp()
    
    // Show CTA after analyzing content
    setShowCTA(true)
  }, [contentTitle, contentCategory, tags])

  const calculateUserEngagement = () => {
    const timeOnSite = Date.now() - (parseInt(localStorage.getItem('site_entry_time') || '0') || Date.now())
    const pagesViewed = parseInt(localStorage.getItem('pages_viewed') || '0')
    const hasScrolledFar = window.scrollY > document.documentElement.scrollHeight * 0.7
    
    let engagementScore = 0
    
    // Time-based scoring
    if (timeOnSite > 300000) engagementScore += 3 // 5+ minutes
    else if (timeOnSite > 120000) engagementScore += 2 // 2+ minutes
    else if (timeOnSite > 60000) engagementScore += 1 // 1+ minute
    
    // Page view scoring
    if (pagesViewed > 3) engagementScore += 2
    else if (pagesViewed > 1) engagementScore += 1
    
    // Scroll depth scoring
    if (hasScrolledFar) engagementScore += 1
    
    // Reading time consideration
    if (readingTime > 0) {
      const estimatedReadTime = readingTime * 60 * 1000 // Convert to ms
      if (timeOnSite > estimatedReadTime * 0.8) engagementScore += 2
    }
    
    if (engagementScore >= 5) setUserEngagement('high')
    else if (engagementScore >= 3) setUserEngagement('medium')
    else setUserEngagement('low')
  }

  const determineBestApp = () => {
    // Priority scoring for each app based on content
    const scores = {
      teach: 0,
      visuals: 0,
      autoplanner: 0
    }

    // Content category scoring
    if (contentCategory === 'lesson_planning') {
      scores.teach += 3
      scores.autoplanner += 2
    } else if (contentCategory === 'classroom_management') {
      scores.teach += 2
      scores.visuals += 1
    } else if (contentCategory === 'ai_tools') {
      scores.teach += 2
      scores.autoplanner += 3
    } else if (contentCategory === 'productivity') {
      scores.autoplanner += 3
      scores.teach += 1
    }

    // Tag-based scoring
    tags.forEach(tag => {
      const lowerTag = tag.toLowerCase()
      
      if (lowerTag.includes('lesson') || lowerTag.includes('curriculum') || lowerTag.includes('assessment')) {
        scores.teach += 2
      }
      
      if (lowerTag.includes('visual') || lowerTag.includes('design') || lowerTag.includes('poster')) {
        scores.visuals += 2
      }
      
      if (lowerTag.includes('automation') || lowerTag.includes('time-saving') || lowerTag.includes('efficiency')) {
        scores.autoplanner += 2
      }
    })

    // Title-based scoring
    const lowerTitle = contentTitle.toLowerCase()
    if (lowerTitle.includes('lesson plan') || lowerTitle.includes('curriculum')) {
      scores.teach += 2
    }
    if (lowerTitle.includes('visual') || lowerTitle.includes('design')) {
      scores.visuals += 2
    }
    if (lowerTitle.includes('automat') || lowerTitle.includes('save time')) {
      scores.autoplanner += 2
    }

    // User engagement modifier
    if (userEngagement === 'high') {
      scores.autoplanner += 1 // High-engagement users might want automation
    }

    // Determine winner
    const maxScore = Math.max(scores.teach, scores.visuals, scores.autoplanner)
    if (scores.teach === maxScore) setSelectedApp('teach')
    else if (scores.visuals === maxScore) setSelectedApp('visuals')
    else setSelectedApp('autoplanner')
  }

  if (!showCTA) return null

  return (
    <div className={`mt-12 ${className}`}>
      {/* Main CTA based on engagement level */}
      {userEngagement === 'high' ? (
        <HighEngagementCTA
          app={selectedApp}
          contentType={contentType}
          contentTitle={contentTitle}
          contentCategory={contentCategory}
        />
      ) : userEngagement === 'medium' ? (
        <MediumEngagementCTA
          app={selectedApp}
          contentType={contentType}
          contentCategory={contentCategory}
        />
      ) : (
        <LowEngagementCTA
          app={selectedApp}
          contentType={contentType}
        />
      )}

      {/* Secondary CTAs */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <RelatedContentCTA contentCategory={contentCategory} />
        <CommunityJoinCTA />
      </div>
    </div>
  )
}

// High engagement users get premium options
function HighEngagementCTA({ 
  app, 
  contentType, 
  contentTitle, 
  contentCategory 
}: {
  app: string
  contentType: string
  contentTitle: string
  contentCategory: string
}) {
  const trackClick = (source: string) => {
    if ((window as any).zazeAnalytics) {
      (window as any).zazeAnalytics.trackCrossAppCTA(app, source, 'clicked')
    }
  }

  return (
    <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 overflow-hidden">
      <CardContent className="p-8">
        <div className="flex flex-col lg:flex-row items-center space-y-6 lg:space-y-0 lg:space-x-8">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-3 bg-blue-100 rounded-xl">
                <GraduationCap className="w-6 h-6 text-blue-600" />
              </div>
              <Badge className="bg-blue-100 text-blue-800 flex items-center">
                <Star className="w-3 h-3 mr-1" />
                Recommended for You
              </Badge>
            </div>
            
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Ready to Transform Your Teaching?
            </h3>
            
            <p className="text-gray-600 mb-6">
              Based on your interest in {contentCategory.replace('_', ' ')}, you'd love our complete 
              {app === 'teach' ? ' lesson planning platform' : 
               app === 'visuals' ? ' visual design tools' : 
               ' automated planning system'}. Join {app === 'teach' ? '850+' : '200+'} teachers already saving hours each week.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
              {app === 'teach' && (
                <>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    <span className="text-sm">AI-powered lesson planning</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    <span className="text-sm">Standards alignment</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    <span className="text-sm">Assessment creation</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    <span className="text-sm">Save 10+ hours per week</span>
                  </div>
                </>
              )}
              {app === 'visuals' && (
                <>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    <span className="text-sm">AI-generated posters</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    <span className="text-sm">Custom worksheets</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    <span className="text-sm">Brand consistency</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    <span className="text-sm">Professional designs</span>
                  </div>
                </>
              )}
              {app === 'autoplanner' && (
                <>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    <span className="text-sm">Fully automated planning</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    <span className="text-sm">Smart scheduling</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    <span className="text-sm">Zero manual input</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    <span className="text-sm">Perfect pacing</span>
                  </div>
                </>
              )}
            </div>

            <div className="flex space-x-4">
              <Button
                onClick={() => {
                  trackClick('high_engagement_primary')
                  if (app === 'autoplanner') {
                    window.open('/waitlist?product=autoplanner', '_blank')
                  } else {
                    window.open(app === 'teach' ? 'https://zazateach.com' : 'https://zazavisuals.com', '_blank')
                  }
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3"
              >
                <GraduationCap className="w-5 h-5 mr-2" />
                {app === 'autoplanner' ? 'Join Waitlist' : 'Start Free Trial'}
                {app !== 'autoplanner' && <ExternalLink className="w-4 h-4 ml-2" />}
              </Button>
              
              <Button
                variant="outline"
                onClick={() => {
                  trackClick('high_engagement_secondary')
                  window.open('/why-zaza-teach', '_blank')
                }}
                className="border-blue-200 text-blue-600 hover:bg-blue-50"
              >
                Compare Tools
              </Button>
            </div>
          </div>

          <div className="flex-shrink-0">
            <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center relative">
              <GraduationCap className="w-16 h-16 text-white" />
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Medium engagement gets educational approach
function MediumEngagementCTA({ 
  app, 
  contentType, 
  contentCategory 
}: {
  app: string
  contentType: string
  contentCategory: string
}) {
  return (
    <div className="border-l-4 border-blue-500 bg-blue-50 p-6 rounded-r-lg">
      <div className="flex items-start space-x-4">
        <div className="p-3 bg-white rounded-lg shadow-sm">
          <Lightbulb className="w-6 h-6 text-blue-600" />
        </div>
        <div className="flex-1">
          <h4 className="font-bold text-gray-900 mb-2">
            Want to Take This Further?
          </h4>
          <p className="text-gray-700 mb-4">
            This {contentType.replace('_', ' ')} is just the beginning. See how our complete platform 
            can transform your entire teaching workflow with AI-powered automation.
          </p>
          <div className="flex space-x-3">
            <Button
              onClick={() => {
                if ((window as any).zazeAnalytics) {
                  (window as any).zazeAnalytics.trackCrossAppCTA(app, 'medium_engagement', 'clicked')
                }
                window.open(app === 'teach' ? 'https://zazateach.com' : 'https://zazavisuals.com', '_blank')
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <GraduationCap className="w-4 h-4 mr-2" />
              Explore {app === 'teach' ? 'Zaza Teach' : 'Zaza Visuals'}
              <ExternalLink className="w-4 h-4 ml-2" />
            </Button>
            <Button
              variant="outline"
              onClick={() => window.open('/zaza-ecosystem', '_blank')}
              className="border-blue-200 text-blue-600 hover:bg-blue-50"
            >
              See All Tools
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Low engagement gets simple, focused CTA
function LowEngagementCTA({ app, contentType }: { app: string, contentType: string }) {
  return (
    <Card className="border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50">
      <CardContent className="p-6">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-3">
            <Gift className="w-5 h-5 text-purple-600" />
            <h4 className="font-semibold text-gray-900">Loved this {contentType.replace('_', ' ')}?</h4>
          </div>
          <p className="text-gray-600 mb-4">
            Get more free teaching resources and AI prompts delivered to your inbox weekly.
          </p>
          <Button
            onClick={() => {
              if ((window as any).zazeAnalytics) {
                (window as any).zazeAnalytics.trackCrossAppCTA('promptly', 'low_engagement', 'clicked')
              }
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            className="bg-purple-600 hover:bg-purple-700 text-white"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Get Free Resources
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

// Related content suggestions
function RelatedContentCTA({ contentCategory }: { contentCategory: string }) {
  const getRelatedContent = () => {
    const content = {
      lesson_planning: {
        title: 'Master Lesson Planning',
        description: 'Discover advanced strategies',
        icon: <BookOpen className="w-5 h-5" />,
        link: '/blog/category/lesson-planning'
      },
      classroom_management: {
        title: 'Classroom Management Tips',
        description: 'Expert techniques for success',
        icon: <Users className="w-5 h-5" />,
        link: '/blog/category/classroom-management'
      },
      ai_tools: {
        title: 'More AI Tools for Teachers',
        description: 'Expand your AI toolkit',
        icon: <Sparkles className="w-5 h-5" />,
        link: '/blog/category/ai-tools'
      },
      productivity: {
        title: 'Teacher Productivity Hacks',
        description: 'Save more time teaching',
        icon: <Clock className="w-5 h-5" />,
        link: '/blog/category/productivity'
      }
    }
    return content[contentCategory as keyof typeof content] || content.lesson_planning
  }

  const related = getRelatedContent()

  return (
    <Card className="border-gray-200 hover:border-purple-200 transition-colors">
      <CardContent className="p-6">
        <div className="flex items-center space-x-3 mb-3">
          <div className="p-2 bg-purple-100 rounded-lg">
            {related.icon}
          </div>
          <div>
            <h4 className="font-semibold text-gray-900">{related.title}</h4>
            <p className="text-sm text-gray-600">{related.description}</p>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => window.open(related.link, '_blank')}
          className="w-full border-purple-200 text-purple-600 hover:bg-purple-50"
        >
          Explore Articles
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </CardContent>
    </Card>
  )
}

// Community join CTA
function CommunityJoinCTA() {
  return (
    <Card className="border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
      <CardContent className="p-6">
        <div className="flex items-center space-x-3 mb-3">
          <div className="p-2 bg-green-100 rounded-lg">
            <Users className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <h4 className="font-semibold text-gray-900">Join Our Community</h4>
            <p className="text-sm text-gray-600">1,200+ teachers sharing ideas</p>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            if ((window as any).zazeAnalytics) {
              (window as any).zazeAnalytics.trackCommunityJoin('footer_cta')
            }
            window.open('/community', '_blank')
          }}
          className="w-full border-green-200 text-green-600 hover:bg-green-50"
        >
          Join Community
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </CardContent>
    </Card>
  )
}