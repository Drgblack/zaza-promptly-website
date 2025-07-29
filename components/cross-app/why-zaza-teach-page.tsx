"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  GraduationCap,
  Sparkles,
  CheckCircle2,
  X,
  ExternalLink,
  ArrowRight,
  Clock,
  Users,
  BookOpen,
  BarChart3,
  FileText,
  Calendar,
  Target,
  Zap,
  Star,
  Play,
  Download,
  DollarSign,
  Shield,
  Lightbulb
} from 'lucide-react'

interface Feature {
  name: string
  promptly: boolean | string
  teach: boolean | string
  category: 'core' | 'planning' | 'assessment' | 'collaboration'
}

const FEATURE_COMPARISON: Feature[] = [
  // Core Features
  { name: 'AI Prompt Templates', promptly: '50+ templates', teach: '500+ templates', category: 'core' },
  { name: 'Free Resources', promptly: true, teach: true, category: 'core' },
  { name: 'Community Access', promptly: true, teach: true, category: 'core' },
  { name: 'Blog & Guides', promptly: true, teach: true, category: 'core' },
  
  // Planning Features
  { name: 'Lesson Planning', promptly: 'Manual templates', teach: 'AI-powered automation', category: 'planning' },
  { name: 'Curriculum Building', promptly: false, teach: true, category: 'planning' },
  { name: 'Standards Alignment', promptly: 'Basic guidance', teach: 'Automatic alignment', category: 'planning' },
  { name: 'Weekly Planning', promptly: false, teach: true, category: 'planning' },
  { name: 'Unit Planning', promptly: false, teach: true, category: 'planning' },
  { name: 'Differentiation Tools', promptly: 'Templates only', teach: 'AI-generated options', category: 'planning' },
  
  // Assessment Features
  { name: 'Assessment Creation', promptly: 'Basic templates', teach: 'AI-powered generation', category: 'assessment' },
  { name: 'Rubric Builder', promptly: false, teach: true, category: 'assessment' },
  { name: 'Progress Tracking', promptly: false, teach: true, category: 'assessment' },
  { name: 'Data Analytics', promptly: false, teach: true, category: 'assessment' },
  
  // Collaboration Features
  { name: 'Team Collaboration', promptly: false, teach: true, category: 'collaboration' },
  { name: 'Shared Planning', promptly: false, teach: true, category: 'collaboration' },
  { name: 'Admin Dashboard', promptly: false, teach: true, category: 'collaboration' }
]

export function WhyZazaTeachPage() {
  const [activeTab, setActiveTab] = useState<'comparison' | 'use-cases' | 'pricing'>('comparison')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const trackTeachClick = (source: string) => {
    if ((window as any).zazeAnalytics) {
      (window as any).zazeAnalytics.trackCrossAppCTA('zaza_teach', source, 'clicked')
    }
  }

  const filteredFeatures = selectedCategory === 'all' 
    ? FEATURE_COMPARISON 
    : FEATURE_COMPARISON.filter(f => f.category === selectedCategory)

  const renderFeatureValue = (value: boolean | string) => {
    if (value === true) {
      return <CheckCircle2 className="w-5 h-5 text-green-600" />
    } else if (value === false) {
      return <X className="w-5 h-5 text-gray-400" />
    } else {
      return <span className="text-sm text-gray-700">{value}</span>
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Which Zaza Tool Is Right for You?
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Compare our free Promptly resources with the complete Zaza Teach lesson planning platform. 
              Find the perfect fit for your teaching needs.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => {
                  trackTeachClick('hero_cta')
                  window.open('https://zazateach.com', '_blank')
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4"
              >
                <GraduationCap className="w-5 h-5 mr-2" />
                Try Zaza Teach Free
                <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
              
              <Button
                size="lg"
                variant="outline"
                onClick={() => setActiveTab('comparison')}
                className="border-blue-200 text-blue-600 hover:bg-blue-50 px-8 py-4"
              >
                <BarChart3 className="w-5 h-5 mr-2" />
                Compare Features
              </Button>
            </div>
          </div>

          {/* Quick Comparison Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50">
              <CardContent className="p-8">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="p-3 bg-purple-100 rounded-xl">
                    <Sparkles className="w-8 h-8 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Zaza Promptly</h3>
                    <p className="text-gray-600">Free AI Teaching Resources</p>
                    <Badge className="bg-green-100 text-green-800 mt-1">Always Free</Badge>
                  </div>
                </div>

                <ul className="space-y-3 mb-6">
                  <li className="flex items-center space-x-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                    <span>50+ free AI prompt templates</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                    <span>Teaching resource library</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                    <span>Community access</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                    <span>Educational blog content</span>
                  </li>
                </ul>

                <div className="bg-white p-4 rounded-lg border border-purple-200 mb-6">
                  <h4 className="font-semibold text-gray-900 mb-2">Perfect For:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Teachers new to AI</li>
                    <li>• Occasional resource needs</li>
                    <li>• Budget-conscious educators</li>
                    <li>• Getting started with AI prompts</li>
                  </ul>
                </div>

                <Button 
                  variant="outline" 
                  className="w-full border-purple-200 text-purple-600 hover:bg-purple-50"
                  onClick={() => window.open('/', '_blank')}
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Explore Free Resources
                </Button>
              </CardContent>
            </Card>

            <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 relative">
              <div className="absolute -top-3 -right-3">
                <Badge className="bg-blue-600 text-white px-3 py-1">
                  <Star className="w-3 h-3 mr-1" />
                  Recommended
                </Badge>
              </div>
              
              <CardContent className="p-8">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="p-3 bg-blue-100 rounded-xl">
                    <GraduationCap className="w-8 h-8 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Zaza Teach</h3>
                    <p className="text-gray-600">Complete Lesson Planning Platform</p>
                    <Badge className="bg-blue-100 text-blue-800 mt-1">7-Day Free Trial</Badge>
                  </div>
                </div>

                <ul className="space-y-3 mb-6">
                  <li className="flex items-center space-x-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                    <span>Everything in Promptly +</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                    <span>AI-powered lesson planning</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                    <span>Standards-aligned curricula</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                    <span>Assessment & rubric creation</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                    <span>Progress tracking & analytics</span>
                  </li>
                </ul>

                <div className="bg-white p-4 rounded-lg border border-blue-200 mb-6">
                  <h4 className="font-semibold text-gray-900 mb-2">Perfect For:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Complete curriculum planning</li>
                    <li>• Standards-aligned instruction</li>
                    <li>• Data-driven teaching</li>
                    <li>• Saving 10+ hours per week</li>
                  </ul>
                </div>

                <Button 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={() => {
                    trackTeachClick('comparison_card')
                    window.open('https://zazateach.com', '_blank')
                  }}
                >
                  <GraduationCap className="w-4 h-4 mr-2" />
                  Start Free Trial
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Detailed Comparison Tabs */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Tab Navigation */}
          <div className="flex flex-col md:flex-row justify-center mb-12">
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setActiveTab('comparison')}
                className={`px-6 py-3 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'comparison'
                    ? 'bg-white text-blue-600 shadow'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <BarChart3 className="w-4 h-4 mr-2 inline" />
                Feature Comparison
              </button>
              <button
                onClick={() => setActiveTab('use-cases')}
                className={`px-6 py-3 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'use-cases'
                    ? 'bg-white text-blue-600 shadow'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Users className="w-4 h-4 mr-2 inline" />
                Use Cases
              </button>
              <button
                onClick={() => setActiveTab('pricing')}
                className={`px-6 py-3 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'pricing'
                    ? 'bg-white text-blue-600 shadow'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <DollarSign className="w-4 h-4 mr-2 inline" />
                Pricing
              </button>
            </div>
          </div>

          {/* Feature Comparison Tab */}
          {activeTab === 'comparison' && (
            <div>
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Detailed Feature Comparison
                </h2>
                <p className="text-gray-600 mb-6">
                  See exactly what's included in each platform
                </p>
                
                {/* Category Filter */}
                <div className="flex flex-wrap justify-center gap-2">
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedCategory === 'all'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    All Features
                  </button>
                  <button
                    onClick={() => setSelectedCategory('core')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedCategory === 'core'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    Core Features
                  </button>
                  <button
                    onClick={() => setSelectedCategory('planning')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedCategory === 'planning'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    Planning Tools
                  </button>
                  <button
                    onClick={() => setSelectedCategory('assessment')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedCategory === 'assessment'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    Assessment
                  </button>
                  <button
                    onClick={() => setSelectedCategory('collaboration')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedCategory === 'collaboration'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    Collaboration
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="grid grid-cols-3 bg-gray-50 p-4 font-semibold text-gray-900">
                  <div>Feature</div>
                  <div className="text-center">Zaza Promptly</div>
                  <div className="text-center">Zaza Teach</div>
                </div>
                
                {filteredFeatures.map((feature, index) => (
                  <div 
                    key={feature.name}
                    className={`grid grid-cols-3 p-4 border-t border-gray-200 ${
                      index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                    }`}
                  >
                    <div className="font-medium text-gray-900">{feature.name}</div>
                    <div className="text-center">{renderFeatureValue(feature.promptly)}</div>
                    <div className="text-center">{renderFeatureValue(feature.teach)}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Use Cases Tab */}
          {activeTab === 'use-cases' && (
            <div>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Which Tool Fits Your Teaching Style?
                </h2>
                <p className="text-gray-600">
                  Real scenarios to help you choose the right platform
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Promptly Use Cases */}
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-purple-600 mb-6 flex items-center">
                    <Sparkles className="w-6 h-6 mr-2" />
                    Choose Zaza Promptly If:
                  </h3>
                  
                  <Card className="border-purple-200 bg-purple-50">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="p-2 bg-purple-100 rounded-lg">
                          <Lightbulb className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">You're New to AI in Education</h4>
                          <p className="text-gray-600 text-sm">
                            "I want to explore AI tools without commitment. I need practical examples and templates to get started."
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-purple-200 bg-purple-50">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="p-2 bg-purple-100 rounded-lg">
                          <DollarSign className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Budget is a Priority</h4>
                          <p className="text-gray-600 text-sm">
                            "I need high-quality teaching resources but can't invest in premium tools right now."
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-purple-200 bg-purple-50">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="p-2 bg-purple-100 rounded-lg">
                          <Download className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">You Need Occasional Resources</h4>
                          <p className="text-gray-600 text-sm">
                            "I plan lessons manually but want AI-generated prompts and templates for specific situations."
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Teach Use Cases */}
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-blue-600 mb-6 flex items-center">
                    <GraduationCap className="w-6 h-6 mr-2" />
                    Choose Zaza Teach If:
                  </h3>
                  
                  <Card className="border-blue-200 bg-blue-50">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <Calendar className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">You Plan Complete Curricula</h4>
                          <p className="text-gray-600 text-sm">
                            "I need to create comprehensive lesson plans, units, and assessments aligned to standards."
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-blue-200 bg-blue-50">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <Clock className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Time is Your Biggest Challenge</h4>
                          <p className="text-gray-600 text-sm">
                            "I spend too many hours planning. I need automation to reclaim my weekends and evenings."
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-blue-200 bg-blue-50">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <Target className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">You Want Data-Driven Teaching</h4>
                          <p className="text-gray-600 text-sm">
                            "I need to track student progress, create assessments, and use data to improve instruction."
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          )}

          {/* Pricing Tab */}
          {activeTab === 'pricing' && (
            <div>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Simple, Transparent Pricing
                </h2>
                <p className="text-gray-600">
                  Start free, upgrade when you're ready for more power
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Promptly Pricing */}
                <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50">
                  <CardContent className="p-8 text-center">
                    <div className="p-3 bg-purple-100 rounded-xl mx-auto w-fit mb-4">
                      <Sparkles className="w-8 h-8 text-purple-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Zaza Promptly</h3>
                    <div className="text-4xl font-bold text-purple-600 mb-2">Free</div>
                    <p className="text-gray-600 mb-6">Forever</p>
                    
                    <ul className="space-y-3 mb-8 text-left">
                      <li className="flex items-center space-x-3">
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                        <span className="text-sm">50+ AI prompt templates</span>
                      </li>
                      <li className="flex items-center space-x-3">
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                        <span className="text-sm">Free resource library</span>
                      </li>
                      <li className="flex items-center space-x-3">
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                        <span className="text-sm">Community access</span>
                      </li>
                      <li className="flex items-center space-x-3">
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                        <span className="text-sm">Educational blog</span>
                      </li>
                    </ul>

                    <Button 
                      variant="outline" 
                      className="w-full border-purple-200 text-purple-600 hover:bg-purple-50"
                      onClick={() => window.open('/', '_blank')}
                    >
                      Get Started Free
                    </Button>
                  </CardContent>
                </Card>

                {/* Teach Pricing */}
                <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 relative scale-105 shadow-xl">
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-blue-600 text-white px-4 py-1">
                      <Star className="w-3 h-3 mr-1" />
                      Most Popular
                    </Badge>
                  </div>
                  
                  <CardContent className="p-8 text-center">
                    <div className="p-3 bg-blue-100 rounded-xl mx-auto w-fit mb-4">
                      <GraduationCap className="w-8 h-8 text-blue-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Zaza Teach</h3>
                    <div className="text-4xl font-bold text-blue-600 mb-2">$29</div>
                    <p className="text-gray-600 mb-6">per month</p>
                    
                    <ul className="space-y-3 mb-8 text-left">
                      <li className="flex items-center space-x-3">
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                        <span className="text-sm">Everything in Promptly</span>
                      </li>
                      <li className="flex items-center space-x-3">
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                        <span className="text-sm">AI lesson planning</span>
                      </li>
                      <li className="flex items-center space-x-3">
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                        <span className="text-sm">Standards alignment</span>
                      </li>
                      <li className="flex items-center space-x-3">
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                        <span className="text-sm">Assessment creation</span>
                      </li>
                      <li className="flex items-center space-x-3">
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                        <span className="text-sm">Progress tracking</span>
                      </li>
                    </ul>

                    <Button 
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white mb-3"
                      onClick={() => {
                        trackTeachClick('pricing_card')
                        window.open('https://zazateach.com', '_blank')
                      }}
                    >
                      Start 7-Day Free Trial
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </Button>
                    <p className="text-xs text-gray-500">No credit card required</p>
                  </CardContent>
                </Card>

                {/* Team Pricing */}
                <Card className="border-gray-200 bg-gradient-to-br from-gray-50 to-gray-100">
                  <CardContent className="p-8 text-center">
                    <div className="p-3 bg-gray-100 rounded-xl mx-auto w-fit mb-4">
                      <Users className="w-8 h-8 text-gray-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Team Plans</h3>
                    <div className="text-4xl font-bold text-gray-600 mb-2">Custom</div>
                    <p className="text-gray-600 mb-6">For schools & districts</p>
                    
                    <ul className="space-y-3 mb-8 text-left">
                      <li className="flex items-center space-x-3">
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                        <span className="text-sm">Everything in Teach</span>
                      </li>
                      <li className="flex items-center space-x-3">
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                        <span className="text-sm">Team collaboration</span>
                      </li>
                      <li className="flex items-center space-x-3">
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                        <span className="text-sm">Admin dashboard</span>
                      </li>
                      <li className="flex items-center space-x-3">
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                        <span className="text-sm">Priority support</span>
                      </li>
                      <li className="flex items-center space-x-3">
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                        <span className="text-sm">Custom integrations</span>
                      </li>
                    </ul>

                    <Button 
                      variant="outline" 
                      className="w-full border-gray-300 text-gray-600 hover:bg-gray-50"
                      onClick={() => window.open('mailto:team@zazateach.com', '_blank')}
                    >
                      Contact Sales
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Teaching?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of educators who are already saving time and improving outcomes with Zaza tools.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => {
                trackTeachClick('final_cta')
                window.open('https://zazateach.com', '_blank')
              }}
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4"
            >
              <GraduationCap className="w-5 h-5 mr-2" />
              Try Zaza Teach Free for 7 Days
              <ExternalLink className="w-4 h-4 ml-2" />
            </Button>
            
            <Button
              size="lg"
              variant="outline"
              onClick={() => window.open('/', '_blank')}
              className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Start with Free Resources
            </Button>
          </div>
          
          <p className="text-sm mt-6 opacity-75">
            <Shield className="w-4 h-4 inline mr-1" />
            No credit card required • Cancel anytime • 30-day money-back guarantee
          </p>
        </div>
      </section>
    </div>
  )
}