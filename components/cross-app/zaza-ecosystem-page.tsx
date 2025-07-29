"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Sparkles,
  GraduationCap,
  Palette,
  Zap,
  BarChart3,
  Calendar,
  ExternalLink,
  CheckCircle2,
  ArrowRight,
  Clock,
  Users,
  Star,
  Play,
  DollarSign,
  Shield,
  Lightbulb,
  Target,
  BookOpen,
  FileText,
  MessageCircle,
  Globe,
  Rocket,
  TrendingUp,
  Award
} from 'lucide-react'

interface ZazaApp {
  id: string
  name: string
  fullName: string
  url: string
  description: string
  longDescription: string
  icon: React.ReactNode
  color: string
  status: 'live' | 'beta' | 'coming_soon'
  pricing: {
    free?: boolean
    trial?: string
    starting?: string
  }
  features: string[]
  benefits: string[]
  userCount?: string
  rating?: number
  category: 'resources' | 'planning' | 'creation' | 'automation'
  timeToValue: string
  idealFor: string[]
}

const ZAZA_APPS: ZazaApp[] = [
  {
    id: 'promptly',
    name: 'Promptly',
    fullName: 'Zaza Promptly',
    url: '/',
    description: 'Free AI prompts & teaching resources',
    longDescription: 'Your gateway to AI-powered teaching. Access 50+ free prompt templates, educational resources, and join a community of innovative educators.',
    icon: <Sparkles className="w-8 h-8" />,
    color: 'purple',
    status: 'live',
    pricing: {
      free: true
    },
    features: [
      '50+ AI prompt templates',
      'Free resource library',
      'Teaching blog & guides',
      'Community access',
      'Weekly resource updates'
    ],
    benefits: [
      'Zero cost to get started',
      'Proven teaching strategies',
      'Community support',
      'Regular content updates'
    ],
    userCount: '1,200+',
    rating: 4.9,
    category: 'resources',
    timeToValue: 'Immediate',
    idealFor: [
      'Teachers new to AI',
      'Budget-conscious educators',
      'Anyone exploring AI tools',
      'Community-focused teachers'
    ]
  },
  {
    id: 'teach',
    name: 'Teach',
    fullName: 'Zaza Teach',
    url: 'https://zazateach.com',
    description: 'Complete lesson planning platform',
    longDescription: 'The most comprehensive AI-powered lesson planning platform. Create standards-aligned curricula, assessments, and track student progress - all automated.',
    icon: <GraduationCap className="w-8 h-8" />,
    color: 'blue',
    status: 'live',
    pricing: {
      trial: '7-day free trial',
      starting: '$29/month'
    },
    features: [
      'AI lesson planning',
      'Standards alignment',
      'Assessment creation',
      'Progress tracking',
      'Curriculum building',
      'Team collaboration',
      'Data analytics'
    ],
    benefits: [
      'Save 10+ hours per week',
      'Standards-compliant lessons',
      'Data-driven insights',
      'Scalable for teams'
    ],
    userCount: '850+',
    rating: 4.8,
    category: 'planning',
    timeToValue: '1 week',
    idealFor: [
      'Curriculum coordinators',
      'Full-time teachers',
      'Department heads',
      'Schools & districts'
    ]
  },
  {
    id: 'visuals',
    name: 'Visuals',
    fullName: 'Zaza Visuals',
    url: 'https://zazavisuals.com',
    description: 'AI-powered classroom graphics',
    longDescription: 'Transform your classroom with professional, AI-generated visual materials. Create posters, worksheets, infographics, and branded content in minutes.',
    icon: <Palette className="w-8 h-8" />,
    color: 'green',
    status: 'beta',
    pricing: {
      trial: '14-day free trial',
      starting: '$19/month'
    },
    features: [
      'Custom poster generation',
      'Interactive visual aids',
      'Branded materials',
      'Print-ready designs',
      'Template library',
      'Brand guidelines'
    ],
    benefits: [
      'Professional appearance',
      'Save design time',
      'Visual engagement',
      'Brand consistency'
    ],
    userCount: '200+',
    rating: 4.7,
    category: 'creation',
    timeToValue: '30 minutes',
    idealFor: [
      'Visual learners',
      'Creative teachers',
      'Brand-conscious schools',
      'Art & design educators'
    ]
  },
  {
    id: 'autoplanner',
    name: 'AutoPlanner',
    fullName: 'Zaza AutoPlanner',
    url: '#',
    description: 'Automated weekly lesson planning',
    longDescription: 'The future of teaching preparation. AutoPlanner completely automates your weekly lesson planning using AI, your curriculum, and teaching preferences.',
    icon: <Zap className="w-8 h-8" />,
    color: 'orange',
    status: 'coming_soon',
    pricing: {
      starting: 'Coming 2025'
    },
    features: [
      'Fully automated planning',
      'Smart resource integration',
      'Adaptive pacing',
      'Personalized to your style',
      'Zero manual input',
      'Calendar integration'
    ],
    benefits: [
      'Zero planning time',
      'Perfect scheduling',
      'Adaptive to your needs',
      'Integrated workflow'
    ],
    userCount: '500+',
    category: 'automation',
    timeToValue: 'Set-and-forget',
    idealFor: [
      'Overwhelmed teachers',
      'Consistency seekers',
      'Tech-forward educators',
      'Time-conscious teachers'
    ]
  },
  {
    id: 'analytics',
    name: 'Analytics',
    fullName: 'Zaza Analytics',
    url: '#',
    description: 'Teaching performance insights',
    longDescription: 'Comprehensive analytics across all your teaching activities. Track student engagement, curriculum effectiveness, and your professional growth.',
    icon: <BarChart3 className="w-8 h-8" />,
    color: 'indigo',
    status: 'coming_soon',
    pricing: {
      starting: 'Q2 2025'
    },
    features: [
      'Cross-platform analytics',
      'Student engagement metrics',
      'Curriculum effectiveness',
      'Professional growth tracking',
      'Predictive insights',
      'Custom dashboards'
    ],
    benefits: [
      'Data-driven decisions',
      'Identify improvement areas',
      'Track professional growth',
      'Predict student needs'
    ],
    userCount: 'In development',
    category: 'planning',
    timeToValue: '2 weeks',
    idealFor: [
      'Data-driven educators',
      'Administrators',
      'Research-focused teachers',
      'Performance optimizers'
    ]
  }
]

const CATEGORIES = [
  { id: 'all', name: 'All Apps', icon: <Globe className="w-4 h-4" /> },
  { id: 'resources', name: 'Resources', icon: <BookOpen className="w-4 h-4" /> },
  { id: 'planning', name: 'Planning', icon: <Calendar className="w-4 h-4" /> },
  { id: 'creation', name: 'Creation', icon: <Palette className="w-4 h-4" /> },
  { id: 'automation', name: 'Automation', icon: <Zap className="w-4 h-4" /> }
]

export function ZazaEcosystemPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedApp, setSelectedApp] = useState<string | null>(null)

  const filteredApps = selectedCategory === 'all' 
    ? ZAZA_APPS 
    : ZAZA_APPS.filter(app => app.category === selectedCategory)

  const trackAppClick = (appId: string, source: string) => {
    if ((window as any).zazeAnalytics) {
      (window as any).zazeAnalytics.trackCrossAppCTA(appId, source, 'clicked')
    }
  }

  const getStatusBadge = (status: string) => {
    const badges = {
      live: <Badge className="bg-green-100 text-green-800">Live</Badge>,
      beta: <Badge className="bg-yellow-100 text-yellow-800">Beta</Badge>,
      coming_soon: <Badge className="bg-gray-100 text-gray-600">Coming Soon</Badge>
    }
    return badges[status as keyof typeof badges]
  }

  const getColorClasses = (color: string) => {
    const colors = {
      purple: 'from-purple-500 to-pink-500',
      blue: 'from-blue-500 to-indigo-500',
      green: 'from-green-500 to-emerald-500',
      orange: 'from-orange-500 to-amber-500',
      indigo: 'from-indigo-500 to-purple-500'
    }
    return colors[color as keyof typeof colors] || colors.blue
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-6">
              <div className="p-4 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl">
                <Globe className="w-12 h-12 text-white" />
              </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              The Complete Zaza Ecosystem
            </h1>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              From free teaching resources to complete automation - discover our comprehensive suite of 
              AI-powered tools designed to transform education at every level.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button
                size="lg"
                onClick={() => {
                  trackAppClick('teach', 'hero_primary')
                  window.open('https://zazateach.com', '_blank')
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4"
              >
                <GraduationCap className="w-5 h-5 mr-2" />
                Start with Zaza Teach
                <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
              
              <Button
                size="lg"
                variant="outline"
                onClick={() => window.scrollTo({ top: 600, behavior: 'smooth' })}
                className="border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-4"
              >
                <Rocket className="w-5 h-5 mr-2" />
                Explore All Apps
              </Button>
            </div>

            {/* Key Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">2,000+</div>
                <div className="text-sm text-gray-600">Active Teachers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">5</div>
                <div className="text-sm text-gray-600">Specialized Apps</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">15hrs</div>
                <div className="text-sm text-gray-600">Average Time Saved</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 mb-2">4.8</div>
                <div className="text-sm text-gray-600">Average Rating</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {CATEGORIES.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-blue-100 text-blue-800 shadow-sm'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {category.icon}
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Apps Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredApps.map(app => (
              <Card 
                key={app.id} 
                className="group hover:shadow-xl transition-all duration-300 border-gray-200 overflow-hidden"
              >
                <CardContent className="p-8">
                  {/* App Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 bg-gradient-to-br ${getColorClasses(app.color)} rounded-xl shadow-lg`}>
                        <div className="text-white">
                          {app.icon}
                        </div>
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">{app.fullName}</h3>
                        <p className="text-gray-600">{app.description}</p>
                      </div>
                    </div>
                    {getStatusBadge(app.status)}
                  </div>

                  {/* Stats */}
                  <div className="flex items-center space-x-6 mb-6">
                    {app.userCount && (
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600">{app.userCount} users</span>
                      </div>
                    )}
                    {app.rating && (
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm text-gray-600">{app.rating}/5</span>
                      </div>
                    )}
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">{app.timeToValue}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    {app.longDescription}
                  </p>

                  {/* Features */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Key Features:</h4>
                    <ul className="space-y-2">
                      {app.features.slice(0, 4).map((feature, index) => (
                        <li key={index} className="flex items-center space-x-2">
                          <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{feature}</span>
                        </li>
                      ))}
                      {app.features.length > 4 && (
                        <li className="text-sm text-gray-500 ml-6">
                          +{app.features.length - 4} more features
                        </li>
                      )}
                    </ul>
                  </div>

                  {/* Pricing */}
                  <div className="bg-gray-50 p-4 rounded-lg mb-6">
                    <div className="flex items-center justify-between">
                      <div>
                        {app.pricing.free && (
                          <div className="text-2xl font-bold text-green-600">Free</div>
                        )}
                        {app.pricing.starting && !app.pricing.free && (
                          <div className="text-2xl font-bold text-gray-900">{app.pricing.starting}</div>
                        )}
                        {app.pricing.trial && (
                          <div className="text-sm text-gray-600">{app.pricing.trial}</div>
                        )}
                      </div>
                      <div className="text-right">
                        {app.pricing.free && (
                          <Badge className="bg-green-100 text-green-800">Always Free</Badge>
                        )}
                        {app.pricing.trial && !app.pricing.free && (
                          <Badge className="bg-blue-100 text-blue-800">Free Trial</Badge>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* CTA Buttons */}
                  <div className="space-y-3">
                    <Button
                      onClick={() => {
                        trackAppClick(app.id, 'ecosystem_card')
                        if (app.status === 'coming_soon') {
                          window.open(`/waitlist?product=${app.id}`, '_blank')
                        } else {
                          window.open(app.url, '_blank')
                        }
                      }}
                      className={`w-full bg-gradient-to-r ${getColorClasses(app.color)} text-white hover:shadow-lg transition-all`}
                    >
                      {app.status === 'coming_soon' ? (
                        <>
                          <MessageCircle className="w-4 h-4 mr-2" />
                          Join Waitlist
                        </>
                      ) : app.pricing.free ? (
                        <>
                          <Sparkles className="w-4 h-4 mr-2" />
                          Get Started Free
                          <ExternalLink className="w-4 h-4 ml-2" />
                        </>
                      ) : (
                        <>
                          {app.icon}
                          <span className="ml-2">
                            {app.pricing.trial ? 'Start Free Trial' : 'Learn More'}
                          </span>
                          <ExternalLink className="w-4 h-4 ml-2" />
                        </>
                      )}
                    </Button>

                    <Button
                      variant="outline"
                      onClick={() => setSelectedApp(selectedApp === app.id ? null : app.id)}
                      className="w-full"
                    >
                      {selectedApp === app.id ? 'Hide Details' : 'View Details'}
                    </Button>
                  </div>

                  {/* Expanded Details */}
                  {selectedApp === app.id && (
                    <div className="mt-6 pt-6 border-t border-gray-200 space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Perfect For:</h4>
                        <ul className="space-y-1">
                          {app.idealFor.map((item, index) => (
                            <li key={index} className="text-sm text-gray-600 flex items-center space-x-2">
                              <Target className="w-3 h-3 text-blue-500" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Key Benefits:</h4>
                        <ul className="space-y-1">
                          {app.benefits.map((benefit, index) => (
                            <li key={index} className="text-sm text-gray-600 flex items-center space-x-2">
                              <TrendingUp className="w-3 h-3 text-green-500" />
                              <span>{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Integration & Roadmap */}
      <section className="py-16 bg-gradient-to-r from-gray-900 to-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Built to Work Together
            </h2>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              All Zaza apps are designed as an integrated ecosystem. Your data, preferences, 
              and workflows seamlessly connect across every platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <Card className="bg-white bg-opacity-10 border-white border-opacity-20">
              <CardContent className="p-8 text-center">
                <div className="p-3 bg-white bg-opacity-20 rounded-xl mx-auto w-fit mb-4">
                  <Shield className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-3">Single Sign-On</h3>
                <p className="opacity-90">
                  One account across all Zaza apps. No multiple logins or password management needed.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white bg-opacity-10 border-white border-opacity-20">
              <CardContent className="p-8 text-center">
                <div className="p-3 bg-white bg-opacity-20 rounded-xl mx-auto w-fit mb-4">
                  <ArrowRight className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-3">Data Sync</h3>
                <p className="opacity-90">
                  Your resources, preferences, and progress automatically sync between all apps.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white bg-opacity-10 border-white border-opacity-20">
              <CardContent className="p-8 text-center">
                <div className="p-3 bg-white bg-opacity-20 rounded-xl mx-auto w-fit mb-4">
                  <Award className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-3">Unified Billing</h3>
                <p className="opacity-90">
                  Simple pricing across the ecosystem. Upgrade individual apps or get everything with a suite plan.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <Button
              size="lg"
              onClick={() => {
                trackAppClick('ecosystem', 'integration_cta')
                window.open('https://zazateach.com', '_blank')
              }}
              className="bg-white text-blue-900 hover:bg-gray-100 px-8 py-4"
            >
              <Rocket className="w-5 h-5 mr-2" />
              Start Your Journey Today
              <ExternalLink className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600">
              Everything you need to know about the Zaza ecosystem
            </p>
          </div>

          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Which app should I start with?
                </h3>
                <p className="text-gray-600">
                  Start with Zaza Promptly (free) to explore AI in teaching. If you need comprehensive 
                  lesson planning, upgrade to Zaza Teach. For visual materials, try Zaza Visuals.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Do I need separate accounts for each app?
                </h3>
                <p className="text-gray-600">
                  No! One Zaza account works across all our apps. Your data, preferences, and 
                  subscriptions are automatically synchronized.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibent text-gray-900 mb-2">
                  Is there a discount for multiple apps?
                </h3>
                <p className="text-gray-600">
                  Yes! We offer ecosystem bundles that provide significant savings when you use 
                  multiple Zaza apps. Contact our team for custom pricing.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-2">
                  When will AutoPlanner and Analytics be available?
                </h3>
                <p className="text-gray-600">
                  AutoPlanner is coming in early 2025, and Analytics in Q2 2025. Join our waitlist 
                  to be the first to know when they launch.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}