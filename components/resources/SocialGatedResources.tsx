'use client'

import { useState, useEffect } from 'react'
import { Lock, Unlock, Share2, Download, Star, Users, CheckCircle, Gift, Sparkles, FileText, BookOpen, Video } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { referralSystem } from '@/lib/referral-system-enhanced'

interface BonusResource {
  id: string
  title: string
  description: string
  type: 'template' | 'guide' | 'video' | 'worksheet' | 'checklist'
  sharesRequired: number
  value: string
  icon: React.ReactNode
  downloadUrl?: string
  previewUrl?: string
  tags: string[]
  estimatedTimeValue: string
}

interface SocialGatedResourcesProps {
  userEmail?: string
  userName?: string
  className?: string
}

export function SocialGatedResources({ 
  userEmail, 
  userName,
  className = '' 
}: SocialGatedResourcesProps) {
  const [userShares, setUserShares] = useState(0)
  const [unlockedResources, setUnlockedResources] = useState<string[]>([])
  const [referralLinks, setReferralLinks] = useState<any>(null)
  const [selectedResource, setSelectedResource] = useState<BonusResource | null>(null)
  const [showShareModal, setShowShareModal] = useState(false)

  const bonusResources: BonusResource[] = [
    {
      id: 'premium-templates',
      title: '50+ Premium Email Templates',
      description: 'Professional templates for every parent communication scenario - from praise to concerns to meeting requests.',
      type: 'template',
      sharesRequired: 1,
      value: '$29 value',
      icon: <FileText className="w-5 h-5" />,
      downloadUrl: '/downloads/premium-templates.zip',
      tags: ['Templates', 'Communication', 'Time-Saver'],
      estimatedTimeValue: 'Save 2+ hours weekly'
    },
    {
      id: 'parent-meeting-guide',
      title: 'Parent Conference Mastery Guide',
      description: 'Complete guide with scripts, preparation checklists, and follow-up templates for successful parent meetings.',
      type: 'guide',
      sharesRequired: 2,
      value: '$39 value',
      icon: <BookOpen className="w-5 h-5" />,
      downloadUrl: '/downloads/parent-meeting-guide.pdf',
      tags: ['Guide', 'Meetings', 'Professional'],
      estimatedTimeValue: 'Prep in 15 min vs 45 min'
    },
    {
      id: 'difficult-conversations',
      title: 'Difficult Conversations Toolkit',
      description: 'Scripts and strategies for handling challenging parent conversations with confidence and professionalism.',
      type: 'worksheet',
      sharesRequired: 3,
      value: '$49 value',
      icon: <Users className="w-5 h-5" />,
      downloadUrl: '/downloads/difficult-conversations.pdf',
      tags: ['Toolkit', 'Scripts', 'Confidence'],
      estimatedTimeValue: 'Navigate conflicts smoothly'
    },
    {
      id: 'multilingual-phrases',
      title: 'Multilingual Communication Pack',
      description: 'Common parent communication phrases in 10 languages with pronunciation guides and cultural tips.',
      type: 'guide',
      sharesRequired: 4,
      value: '$59 value',
      icon: <Gift className="w-5 h-5" />,
      downloadUrl: '/downloads/multilingual-pack.zip',
      tags: ['Multilingual', 'Inclusive', 'Global'],
      estimatedTimeValue: 'Connect with all families'
    },
    {
      id: 'report-card-mastery',
      title: 'Report Card Comment Generator',
      description: 'Advanced templates and AI prompts for generating personalized, meaningful report card comments quickly.',
      type: 'template',
      sharesRequired: 5,
      value: '$79 value',
      icon: <Star className="w-5 h-5" />,
      downloadUrl: '/downloads/report-card-templates.zip',
      tags: ['Report Cards', 'Advanced', 'Personalized'],
      estimatedTimeValue: 'Cut report time by 75%'
    },
    {
      id: 'video-masterclass',
      title: 'AI-Powered Teaching Masterclass',
      description: '2-hour video course on maximizing AI tools for teaching efficiency, communication, and work-life balance.',
      type: 'video',
      sharesRequired: 6,
      value: '$97 value',
      icon: <Video className="w-5 h-5" />,
      previewUrl: '/video/masterclass-preview',
      tags: ['Video Course', 'Advanced', 'Comprehensive'],
      estimatedTimeValue: 'Transform your workflow'
    }
  ]

  useEffect(() => {
    loadUserData()
  }, [userEmail])

  const loadUserData = async () => {
    // Load user share count from localStorage
    const shares = parseInt(localStorage.getItem('zaza_share_count') || '0')
    const unlocked = JSON.parse(localStorage.getItem('zaza_unlocked_resources') || '[]')
    
    setUserShares(shares)
    setUnlockedResources(unlocked)

    // Load referral links
    if (userEmail) {
      try {
        const data = await referralSystem.getDashboardData(userEmail)
        setReferralLinks(data.links)
      } catch (error) {
        console.error('Failed to load referral data:', error)
      }
    }
  }

  const handleShare = async (platform: string, resource: BonusResource) => {
    const shareUrl = referralLinks?.general || 'https://zazapromptly.com'
    const message = `🎉 Just unlocked the "${resource.title}" from Zaza Promptly! This AI tool for teachers is incredible - check it out: ${shareUrl}`

    // Track share
    if (typeof window !== 'undefined' && (window as any).zazeAnalytics) {
      (window as any).zazeAnalytics.trackFeatureUse(`gated_resource_share_${platform}_${resource.id}`)
    }

    // Increment share count
    const newShareCount = userShares + 1
    setUserShares(newShareCount)
    localStorage.setItem('zaza_share_count', newShareCount.toString())

    // Check if this unlocks the resource
    if (newShareCount >= resource.sharesRequired && !unlockedResources.includes(resource.id)) {
      const newUnlocked = [...unlockedResources, resource.id]
      setUnlockedResources(newUnlocked)
      localStorage.setItem('zaza_unlocked_resources', JSON.stringify(newUnlocked))
    }

    // Open share dialog
    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(message)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(message)}`,
      email: `mailto:?subject=Amazing AI tool for teachers&body=${encodeURIComponent(message)}`
    }

    window.open(shareUrls[platform as keyof typeof shareUrls], '_blank', 'width=600,height=400')
    setShowShareModal(false)
  }

  const downloadResource = (resource: BonusResource) => {
    // Track download
    if (typeof window !== 'undefined' && (window as any).zazeAnalytics) {
      (window as any).zazeAnalytics.trackFeatureUse(`resource_download_${resource.id}`)
    }

    // In a real app, this would trigger actual download
    alert(`Downloading: ${resource.title}`)
  }

  const getResourceStatus = (resource: BonusResource) => {
    if (unlockedResources.includes(resource.id)) {
      return 'unlocked'
    } else if (userShares >= resource.sharesRequired) {
      return 'ready'
    } else {
      return 'locked'
    }
  }

  const getTotalValue = () => {
    return unlockedResources.length * 39 // Average value
  }

  return (
    <div className={`max-w-6xl mx-auto ${className}`}>
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
            <Gift className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Bonus Teaching Resources</h1>
            <p className="text-gray-600">Unlock premium resources by sharing Zaza Promptly with fellow educators</p>
          </div>
        </div>

        {/* Progress Overview */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-purple-600">{userShares}</div>
              <div className="text-sm text-gray-600">Shares Made</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">{unlockedResources.length}</div>
              <div className="text-sm text-gray-600">Resources Unlocked</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">${getTotalValue()}</div>
              <div className="text-sm text-gray-600">Value Unlocked</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-600">{bonusResources.length - unlockedResources.length}</div>
              <div className="text-sm text-gray-600">Resources Remaining</div>
            </div>
          </div>
        </div>
      </div>

      {/* Resource Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {bonusResources.map((resource) => {
          const status = getResourceStatus(resource)
          const sharesNeeded = Math.max(0, resource.sharesRequired - userShares)
          
          return (
            <Card 
              key={resource.id} 
              className={`relative overflow-hidden transition-all hover:shadow-lg ${
                status === 'unlocked' ? 'border-green-300 bg-green-50' : 
                status === 'ready' ? 'border-yellow-300 bg-yellow-50' : 
                'border-gray-200'
              }`}
            >
              {/* Status Badge */}
              <div className="absolute top-4 right-4">
                {status === 'unlocked' ? (
                  <Badge className="bg-green-500 text-white">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Unlocked
                  </Badge>
                ) : status === 'ready' ? (
                  <Badge className="bg-yellow-500 text-white">
                    <Unlock className="w-3 h-3 mr-1" />
                    Ready
                  </Badge>
                ) : (
                  <Badge variant="secondary">
                    <Lock className="w-3 h-3 mr-1" />
                    Locked
                  </Badge>
                )}
              </div>

              <CardHeader className="pb-3">
                <div className="flex items-start space-x-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    status === 'unlocked' ? 'bg-green-500 text-white' :
                    status === 'ready' ? 'bg-yellow-500 text-white' :
                    'bg-gray-200 text-gray-500'
                  }`}>
                    {resource.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 text-sm leading-tight">
                      {resource.title}
                    </h3>
                    <Badge className="mt-1 text-xs bg-purple-100 text-purple-800">
                      {resource.value}
                    </Badge>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  {resource.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {resource.tags.map((tag, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Time Value */}
                <div className="flex items-center space-x-2 mb-4 text-xs text-gray-500">
                  <Sparkles className="w-3 h-3" />
                  <span>{resource.estimatedTimeValue}</span>
                </div>

                {/* Progress Bar */}
                {status !== 'unlocked' && (
                  <div className="mb-4">
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>Progress</span>
                      <span>{userShares}/{resource.sharesRequired} shares</span>
                    </div>
                    <Progress 
                      value={(userShares / resource.sharesRequired) * 100} 
                      className="h-2"
                    />
                  </div>
                )}

                {/* Action Button */}
                {status === 'unlocked' ? (
                  <Button
                    onClick={() => downloadResource(resource)}
                    className="w-full bg-green-500 hover:bg-green-600 text-white"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download Now
                  </Button>
                ) : status === 'ready' ? (
                  <div className="space-y-2">
                    <div className="text-center text-sm font-medium text-green-600">
                      🎉 Ready to unlock! Share once more:
                    </div>
                    <Button
                      onClick={() => {
                        setSelectedResource(resource)
                        setShowShareModal(true)
                      }}
                      className="w-full bg-yellow-500 hover:bg-yellow-600 text-white"
                    >
                      <Share2 className="w-4 h-4 mr-2" />
                      Share to Unlock
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="text-center text-sm text-gray-500">
                      {sharesNeeded} more share{sharesNeeded !== 1 ? 's' : ''} needed
                    </div>
                    <Button
                      onClick={() => {
                        setSelectedResource(resource)
                        setShowShareModal(true)
                      }}
                      variant="outline"
                      className="w-full"
                    >
                      <Share2 className="w-4 h-4 mr-2" />
                      Share Zaza Promptly
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* How It Works */}
      <Card className="mb-8">
        <CardHeader>
          <h2 className="text-xl font-semibold text-center">How to Unlock Resources</h2>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Share2 className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">1. Share with Colleagues</h3>
              <p className="text-gray-600 text-sm">
                Share Zaza Promptly on social media or with fellow teachers via email
              </p>
            </div>
            <div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Unlock className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">2. Unlock Resources</h3>
              <p className="text-gray-600 text-sm">
                Each share counts toward unlocking valuable teaching resources
              </p>
            </div>
            <div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Download className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2">3. Download & Use</h3>
              <p className="text-gray-600 text-sm">
                Access premium templates, guides, and tools to save even more time
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Share Modal */}
      {showShareModal && selectedResource && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Share to Unlock</h3>
                <button
                  onClick={() => setShowShareModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>
              <p className="text-gray-600 text-sm">
                Share Zaza Promptly to unlock: {selectedResource.title}
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  onClick={() => handleShare('twitter', selectedResource)}
                  className="bg-blue-500 hover:bg-blue-600 text-white"
                >
                  Twitter
                </Button>
                <Button
                  onClick={() => handleShare('facebook', selectedResource)}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Facebook
                </Button>
                <Button
                  onClick={() => handleShare('linkedin', selectedResource)}
                  className="bg-blue-700 hover:bg-blue-800 text-white"
                >
                  LinkedIn
                </Button>
                <Button
                  onClick={() => handleShare('whatsapp', selectedResource)}
                  className="bg-green-500 hover:bg-green-600 text-white"
                >
                  WhatsApp
                </Button>
                <Button
                  onClick={() => handleShare('email', selectedResource)}
                  variant="outline"
                  className="col-span-2"
                >
                  Email to Colleagues
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}