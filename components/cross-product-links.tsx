"use client"

import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowRight, Clock, Users, Zap, CheckCircle } from 'lucide-react'
import { useAnalytics } from '@/hooks/useAnalytics'

interface CrossProductLink {
  id: string
  title: string
  description: string
  benefit: string
  href: string
  ctaText: string
  icon: React.ComponentType<any>
  stats?: string
}

const crossProductLinks: Record<string, CrossProductLink[]> = {
  promptly: [
    {
      id: 'teach',
      title: 'Zaza Teach',
      description: 'Already saving time on parent communication? Now save hours on lesson planning too.',
      benefit: 'Plan engaging lessons 5x faster with curriculum-aligned AI',
      href: '/teach',
      ctaText: 'Try Lesson Planning AI',
      icon: Clock,
      stats: '3-5 hours saved weekly'
    },
    {
      id: 'notably',
      title: 'Zaza Notably',
      description: 'Perfect your written reports? Enhance your visual presentations next.',
      benefit: 'Create stunning visual aids and presentations instantly',
      href: '/notably',
      ctaText: 'Explore Visual Tools',
      icon: Zap,
      stats: 'Used by 12K+ teachers'
    }
  ],
  teach: [
    {
      id: 'promptly',
      title: 'Zaza Promptly',
      description: 'Lesson planning sorted? Streamline your parent communication and reports too.',
      benefit: 'Write professional parent emails and student comments 10x faster',
      href: '/promptly',
      ctaText: 'Try Parent Communication AI',
      icon: Users,
      stats: '12,000+ teachers trust it'
    },
    {
      id: 'spark',
      title: 'Zaza Spark',
      description: 'Teaching workflows optimized? Let AI handle your school HR tasks.',
      benefit: 'Simplify hiring, onboarding, and staff communication',
      href: '/spark',
      ctaText: 'Join HR Waitlist',
      icon: CheckCircle,
      stats: 'Coming soon'
    }
  ],
  notably: [
    {
      id: 'promptly',
      title: 'Zaza Promptly',
      description: 'Great visuals created? Perfect your written communication too.',
      benefit: 'Generate professional parent emails and report comments instantly',
      href: '/promptly',
      ctaText: 'Try Communication AI',
      icon: Users,
      stats: '12,000+ teachers use it'
    },
    {
      id: 'teach',
      title: 'Zaza Teach',
      description: 'Visual presentations ready? Speed up your lesson planning process.',
      benefit: 'Plan engaging, curriculum-aligned lessons in minutes',
      href: '/teach',
      ctaText: 'Try Lesson Planning',
      icon: Clock,
      stats: 'Save 3-5 hours weekly'
    }
  ],
  spark: [
    {
      id: 'promptly',
      title: 'Zaza Promptly',
      description: 'HR processes streamlined? Help your teachers save time on communication too.',
      benefit: 'AI-powered parent emails and student comments for your staff',
      href: '/promptly',
      ctaText: 'Try for Teachers',
      icon: Users,
      stats: '12,000+ teachers worldwide'
    },
    {
      id: 'teach',
      title: 'Zaza Teach',
      description: 'Staff onboarding efficient? Support teachers with lesson planning AI.',
      benefit: 'Curriculum-aligned lesson planning that saves hours weekly',
      href: '/teach',
      ctaText: 'Explore Lesson AI',
      icon: Clock,
      stats: 'Trusted by educators'
    }
  ]
}

interface CrossProductLinksProps {
  currentProduct: string
  className?: string
  layout?: 'horizontal' | 'vertical'
  limit?: number
}

export function CrossProductLinks({ 
  currentProduct, 
  className = "",
  layout = 'horizontal',
  limit = 2
}: CrossProductLinksProps) {
  const { trackEvent } = useAnalytics()
  const links = crossProductLinks[currentProduct]?.slice(0, limit) || []

  if (links.length === 0) return null

  const handleLinkClick = (productId: string, currentProduct: string) => {
    trackEvent('cross_product_click', {
      from_product: currentProduct,
      to_product: productId,
      source: 'cross_product_links'
    })
  }

  if (layout === 'vertical') {
    return (
      <div className={`space-y-4 ${className}`}>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Complete Your Teaching Toolkit
        </h3>
        {links.map((link) => {
          const IconComponent = link.icon
          return (
            <Card key={link.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <IconComponent className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-1">{link.title}</h4>
                    <p className="text-sm text-gray-600 mb-2">{link.description}</p>
                    <p className="text-sm text-purple-600 font-medium mb-3">{link.benefit}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">{link.stats}</span>
                      <Link href={link.href} onClick={() => handleLinkClick(link.id, currentProduct)}>
                        <Button size="sm" variant="outline" className="text-xs">
                          {link.ctaText}
                          <ArrowRight className="w-3 h-3 ml-1" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    )
  }

  return (
    <section className={`py-16 bg-slate-50 ${className}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Complete Your Teaching Workflow
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join thousands of teachers using our complete AI toolkit to save time and improve student outcomes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {links.map((link) => {
            const IconComponent = link.icon
            return (
              <Card key={link.id} className="hover:shadow-lg transition-all duration-200 border-2 hover:border-purple-200">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{link.title}</h3>
                  <p className="text-gray-600 mb-4">{link.description}</p>
                  <p className="text-purple-600 font-medium mb-6">{link.benefit}</p>
                  
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mb-6">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>{link.stats}</span>
                  </div>

                  <Link href={link.href} onClick={() => handleLinkClick(link.id, currentProduct)}>
                    <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white">
                      {link.ctaText}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// Inline cross-product suggestion for embedding in content
export function InlineCrossProductSuggestion({ 
  fromProduct, 
  toProduct, 
  className = "" 
}: {
  fromProduct: string
  toProduct: string
  className?: string
}) {
  const { trackEvent } = useAnalytics()
  const allLinks = Object.values(crossProductLinks).flat()
  const suggestion = allLinks.find(link => link.id === toProduct)

  if (!suggestion) return null

  const handleClick = () => {
    trackEvent('inline_cross_product_click', {
      from_product: fromProduct,
      to_product: toProduct,
      source: 'inline_suggestion'
    })
  }

  return (
    <div className={`bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-4 ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-purple-900 mb-1">
            💡 Teachers who use this also love:
          </p>
          <p className="text-sm text-purple-800">
            {suggestion.description}
          </p>
        </div>
        <Link href={suggestion.href} onClick={handleClick}>
          <Button size="sm" variant="outline" className="border-purple-300 text-purple-700 hover:bg-purple-100 whitespace-nowrap ml-4">
            {suggestion.ctaText}
            <ArrowRight className="w-3 h-3 ml-1" />
          </Button>
        </Link>
      </div>
    </div>
  )
}

// Enhanced CTA section for product pages
export function ProductPageCTA({ 
  productName,
  isAvailable = false,
  waitlistText = "Join Waitlist",
  trialText = "Start Free Trial",
  className = ""
}: {
  productName: string
  isAvailable?: boolean
  waitlistText?: string
  trialText?: string
  className?: string
}) {
  const { trackEvent } = useAnalytics()

  const handleCTAClick = (action: string) => {
    trackEvent('product_page_cta', {
      product: productName,
      action,
      available: isAvailable
    })
  }

  return (
    <div className={`bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl p-8 text-center text-white ${className}`}>
      <h3 className="text-2xl font-bold mb-4">
        Ready to Transform Your {productName === 'Promptly' ? 'Teaching' : 'Workflow'}?
      </h3>
      
      <p className="text-purple-100 mb-6 max-w-2xl mx-auto">
        {isAvailable 
          ? "Join thousands of educators already saving hours every week with our AI-powered tools."
          : "Be among the first to experience the future of educational technology."
        }
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <Link href={isAvailable ? "/promptly" : "/waitlist"}>
          <Button 
            size="lg"
            onClick={() => handleCTAClick(isAvailable ? 'trial' : 'waitlist')}
            className="bg-white text-purple-600 hover:bg-gray-100 font-semibold px-8 py-3"
          >
            {isAvailable ? trialText : waitlistText}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
        
        <Link href="/free-resources">
          <Button 
            size="lg"
            variant="outline"
            onClick={() => handleCTAClick('resources')}
            className="border-white text-white hover:bg-white hover:text-purple-600 px-8 py-3"
          >
            Get Free Resources
          </Button>
        </Link>
      </div>

      <div className="flex items-center justify-center gap-6 mt-6 text-purple-100 text-sm">
        <div className="flex items-center gap-2">
          <CheckCircle className="w-4 h-4" />
          <span>GDPR Compliant</span>
        </div>
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4" />
          <span>12,000+ Teachers</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4" />
          <span>5+ Hours Saved Weekly</span>
        </div>
      </div>
    </div>
  )
}