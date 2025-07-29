"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  GraduationCap,
  ExternalLink,
  ArrowRight,
  CheckCircle2,
  Clock,
  Users,
  Sparkles,
  Play,
  X,
  Calendar,
  FileText,
  BarChart3
} from 'lucide-react'

interface ZazaTeachCTAProps {
  variant?: 'homepage' | 'sidebar' | 'blog' | 'modal' | 'floating' | 'comparison'
  placement?: 'top' | 'middle' | 'bottom'
  className?: string
  onDismiss?: () => void
}

export function ZazaTeachCTA({ 
  variant = 'homepage', 
  placement = 'middle',
  className = '',
  onDismiss 
}: ZazaTeachCTAProps) {
  const [isVideoOpen, setIsVideoOpen] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)

  const handleDismiss = () => {
    setIsDismissed(true)
    if (onDismiss) {
      onDismiss()
    }
  }

  const trackTeachClick = (source: string) => {
    if ((window as any).zazeAnalytics) {
      (window as any).zazeAnalytics.trackCrossAppCTA('zaza_teach', source, 'clicked')
    }
  }

  if (isDismissed) return null

  // Homepage hero variant
  if (variant === 'homepage') {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50">
          <CardContent className="p-8">
            <div className="flex flex-col lg:flex-row items-center space-y-6 lg:space-y-0 lg:space-x-8">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <GraduationCap className="w-6 h-6 text-blue-600" />
                  </div>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    Full Lesson Planning
                  </Badge>
                </div>
                
                <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">
                  Ready for Complete Lesson Planning?
                </h3>
                
                <p className="text-gray-600 mb-6 text-lg">
                  Love these free resources? Take your teaching to the next level with Zaza Teach - 
                  our complete lesson planning platform with AI-powered curriculum building.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                    <span className="text-sm">Full curriculum planning</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                    <span className="text-sm">Standards alignment</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                    <span className="text-sm">Assessment creation</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                  <Button
                    onClick={() => {
                      trackTeachClick('homepage_hero')
                      window.open('https://zazateach.com', '_blank')
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3"
                  >
                    <GraduationCap className="w-5 h-5 mr-2" />
                    Try Zaza Teach Free
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                  
                  <Button
                    variant="outline"
                    onClick={() => setIsVideoOpen(true)}
                    className="border-blue-200 text-blue-600 hover:bg-blue-50"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Watch Demo (2 min)
                  </Button>
                </div>
              </div>

              <div className="flex-shrink-0">
                <div className="relative">
                  <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center">
                    <GraduationCap className="w-16 h-16 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Sidebar variant for blog/resource pages
  if (variant === 'sidebar') {
    return (
      <Card className={`border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100 ${className}`}>
        <CardContent className="p-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            
            <h3 className="font-bold text-gray-900 mb-2">
              Want More Power?
            </h3>
            
            <p className="text-sm text-gray-600 mb-4">
              Upgrade to Zaza Teach for complete lesson planning with AI-powered curriculum building.
            </p>

            <div className="space-y-2 mb-4 text-xs">
              <div className="flex items-center justify-center space-x-1">
                <Calendar className="w-3 h-3 text-blue-600" />
                <span>Weekly planning</span>
              </div>
              <div className="flex items-center justify-center space-x-1">
                <FileText className="w-3 h-3 text-blue-600" />
                <span>Standards alignment</span>
              </div>
              <div className="flex items-center justify-center space-x-1">
                <BarChart3 className="w-3 h-3 text-blue-600" />
                <span>Progress tracking</span>
              </div>
            </div>

            <Button
              onClick={() => {
                trackTeachClick('sidebar')
                window.open('https://zazateach.com', '_blank')
              }}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm"
            >
              Try Free for 7 Days
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Blog inline variant
  if (variant === 'blog') {
    return (
      <div className={`border-l-4 border-blue-500 bg-blue-50 p-6 rounded-r-lg my-8 ${className}`}>
        <div className="flex items-start space-x-4">
          <div className="p-3 bg-white rounded-lg shadow-sm">
            <GraduationCap className="w-6 h-6 text-blue-600" />
          </div>
          <div className="flex-1">
            <h4 className="font-bold text-gray-900 mb-2">
              Take Your Teaching Further
            </h4>
            <p className="text-gray-700 mb-4">
              This free resource is just the beginning. Get access to complete lesson planning, 
              curriculum building, and assessment creation with Zaza Teach.
            </p>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
              <Button
                onClick={() => {
                  trackTeachClick('blog_inline')
                  window.open('https://zazateach.com', '_blank')
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <GraduationCap className="w-4 h-4 mr-2" />
                Explore Zaza Teach
                <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
              <Button
                variant="outline"
                onClick={() => window.open('/why-zaza-teach', '_blank')}
                className="border-blue-200 text-blue-600 hover:bg-blue-50"
              >
                Compare Features
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Floating notification variant
  if (variant === 'floating') {
    return (
      <div className={`fixed bottom-6 right-6 z-40 max-w-sm ${className}`}>
        <Card className="border-blue-200 bg-white shadow-2xl">
          <CardContent className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-2">
                <div className="p-1 bg-blue-100 rounded">
                  <GraduationCap className="w-4 h-4 text-blue-600" />
                </div>
                <span className="font-semibold text-gray-900 text-sm">Zaza Teach</span>
              </div>
              <button
                onClick={handleDismiss}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <p className="text-sm text-gray-600 mb-3">
              Ready for complete lesson planning? Try our full platform.
            </p>
            
            <div className="flex space-x-2">
              <Button
                size="sm"
                onClick={() => {
                  trackTeachClick('floating')
                  window.open('https://zazateach.com', '_blank')
                }}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-xs"
              >
                Try Free
                <ExternalLink className="w-3 h-3 ml-1" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={handleDismiss}
                className="text-gray-500 text-xs"
              >
                Maybe Later
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Modal variant
  if (variant === 'modal') {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <Card className="w-full max-w-2xl">
          <CardContent className="p-8">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-blue-100 rounded-xl">
                  <GraduationCap className="w-8 h-8 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Zaza Teach</h2>
                  <p className="text-gray-600">Complete lesson planning platform</p>
                </div>
              </div>
              <button
                onClick={handleDismiss}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">What You Get:</h3>
                <ul className="space-y-2">
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    <span className="text-sm">AI-powered lesson planning</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    <span className="text-sm">Standards-aligned curriculum</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    <span className="text-sm">Assessment creation tools</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    <span className="text-sm">Progress tracking</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Perfect For:</h3>
                <ul className="space-y-2">
                  <li className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-blue-600" />
                    <span className="text-sm">Teachers planning full curricula</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-blue-600" />
                    <span className="text-sm">Educators who want to save 10+ hours/week</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <BarChart3 className="w-4 h-4 text-blue-600" />
                    <span className="text-sm">Schools needing consistent planning</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
              <Button
                onClick={() => {
                  trackTeachClick('modal')
                  window.open('https://zazateach.com', '_blank')
                }}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
              >
                <GraduationCap className="w-5 h-5 mr-2" />
                Start Free Trial
                <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
              
              <Button
                variant="outline"
                onClick={() => window.open('/why-zaza-teach', '_blank')}
                className="flex-1 border-blue-200 text-blue-600 hover:bg-blue-50"
              >
                Compare Features
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return null
}

// Smart CTA that shows different variants based on user behavior
export function SmartZazaTeachCTA() {
  const [userEngagement, setUserEngagement] = useState<'low' | 'medium' | 'high'>('low')
  const [showModal, setShowModal] = useState(false)

  // Track user engagement (simplified)
  useState(() => {
    const timeOnSite = Date.now() - (parseInt(localStorage.getItem('site_entry_time') || '0') || Date.now())
    const pagesViewed = parseInt(localStorage.getItem('pages_viewed') || '0')
    
    if (timeOnSite > 300000 || pagesViewed > 3) { // 5+ minutes or 3+ pages
      setUserEngagement('high')
    } else if (timeOnSite > 120000 || pagesViewed > 1) { // 2+ minutes or 1+ page
      setUserEngagement('medium')
    }
  })

  if (userEngagement === 'high') {
    return showModal ? (
      <ZazaTeachCTA variant="modal" onDismiss={() => setShowModal(false)} />
    ) : (
      <ZazaTeachCTA variant="floating" />
    )
  }

  if (userEngagement === 'medium') {
    return <ZazaTeachCTA variant="sidebar" />
  }

  return <ZazaTeachCTA variant="homepage" />
}

// Comparison widget for feature differences
export function PromptlyVsTeachComparison({ className = '' }: { className?: string }) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${className}`}>
      <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50">
        <CardContent className="p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Sparkles className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900">Zaza Promptly</h3>
              <p className="text-sm text-gray-600">Free AI Resources</p>
            </div>
          </div>
          
          <ul className="space-y-2 text-sm">
            <li className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-green-600" />
              <span>50+ free AI prompt templates</span>
            </li>
            <li className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-green-600" />
              <span>Teaching resource library</span>
            </li>
            <li className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-green-600" />
              <span>Community access</span>
            </li>
            <li className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-green-600" />
              <span>Blog and guides</span>
            </li>
          </ul>
          
          <div className="mt-4 pt-4 border-t border-purple-200">
            <p className="text-sm text-gray-600">Perfect for getting started with AI in teaching</p>
          </div>
        </CardContent>
      </Card>

      <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <GraduationCap className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Zaza Teach</h3>
                <p className="text-sm text-gray-600">Complete Planning Platform</p>
              </div>
            </div>
            <Badge className="bg-blue-100 text-blue-800">Recommended</Badge>
          </div>
          
          <ul className="space-y-2 text-sm">
            <li className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-green-600" />
              <span>Everything in Promptly +</span>
            </li>
            <li className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-green-600" />
              <span>AI-powered lesson planning</span>
            </li>
            <li className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-green-600" />
              <span>Standards alignment</span>
            </li>
            <li className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-green-600" />
              <span>Assessment creation</span>
            </li>
            <li className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-green-600" />
              <span>Progress tracking</span>
            </li>
          </ul>
          
          <div className="mt-4 pt-4 border-t border-blue-200">
            <p className="text-sm text-gray-600 mb-3">For serious lesson planning and curriculum building</p>
            <Button
              onClick={() => {
                if ((window as any).zazeAnalytics) {
                  (window as any).zazeAnalytics.trackCrossAppCTA('zaza_teach', 'comparison_widget', 'clicked')
                }
                window.open('https://zazateach.com', '_blank')
              }}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              Try Free for 7 Days
              <ExternalLink className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}