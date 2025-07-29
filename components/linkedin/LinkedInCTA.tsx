'use client'

import { useState, useRef } from 'react'
import { Download, Share2, Linkedin, Crown, Star, Clock, Users, ExternalLink, Camera } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { referralSystem } from '@/lib/referral-system-enhanced'

interface LinkedInCTAProps {
  userEmail?: string
  userName?: string
  userTitle?: string
  timeSaved?: number
  commentsGenerated?: number
  userTier?: 'free' | 'pro'
  className?: string
}

export function LinkedInCTA({
  userEmail,
  userName = 'Educator',
  userTitle = 'Teacher',
  timeSaved = 0,
  commentsGenerated = 0,
  userTier = 'free',
  className = ''
}: LinkedInCTAProps) {
  const [selectedTemplate, setSelectedTemplate] = useState('achievement')
  const [referralLinks, setReferralLinks] = useState<any>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Load referral links
  const loadReferralData = async () => {
    if (!referralLinks && userEmail) {
      try {
        const data = await referralSystem.getDashboardData(userEmail)
        setReferralLinks(data.links)
      } catch (error) {
        console.error('Failed to load referral data:', error)
      }
    }
  }

  const postTemplates = {
    achievement: {
      title: 'Time-Saving Achievement',
      content: `🎉 Just reached a major milestone with AI-powered teaching tools!

✅ Generated ${commentsGenerated}+ professional parent comments
⏰ Saved ${timeSaved}+ hours this month
📝 Improved communication quality significantly

As educators, we need tools that give us time back for what matters most - teaching! This AI assistant has been a game-changer for my parent communication workflow.

#TeachingLife #EdTech #AIforEducators #TeacherTools #ParentCommunication`,
      hashtags: ['TeachingLife', 'EdTech', 'AIforEducators', 'TeacherTools', 'ParentCommunication']
    },
    recommendation: {
      title: 'Tool Recommendation',
      content: `💡 Fellow educators: Found an incredible time-saver!

If you're spending hours crafting parent emails and report comments, I highly recommend checking out Zaza Promptly. This AI tool:

🔹 Generates professional, personalized comments in seconds  
🔹 Supports multiple languages and tone styles
🔹 Maintains the personal touch parents appreciate
🔹 Has saved me ${timeSaved}+ hours already!

The free version gives you a great taste, and the Pro features are worth every penny. Game-changer for work-life balance!

#EducatorTools #TeachingTips #WorkLifeBalance #EdTech #TeacherSupport`,
      hashtags: ['EducatorTools', 'TeachingTips', 'WorkLifeBalance', 'EdTech', 'TeacherSupport']
    },
    testimonial: {
      title: 'Personal Testimonial',
      content: `🌟 Real talk: Teaching is demanding, and every tool that helps matters.

I started using Zaza Promptly for parent communication, and it's transformed my workflow:

Before: 2-3 hours weekly on parent emails ❌
After: 20-30 minutes weekly ✅

The AI understands education context perfectly and generates comments that sound authentically me. Parents have actually complimented the improved communication!

Sometimes the best investment is in tools that give you time back for actual teaching.

#TeacherLife #ProductivityHacks #EdTech #ParentCommunication #TeachingTips`,
      hashtags: ['TeacherLife', 'ProductivityHacks', 'EdTech', 'ParentCommunication', 'TeachingTips']
    },
    community: {
      title: 'Community Question',
      content: `Question for my fellow educators: What tools have genuinely saved you time this year?

For me, it's been Zaza Promptly for parent communication. I was skeptical about AI writing tools, but this one actually "gets" education context.

Results after ${Math.floor(commentsGenerated/10)} weeks:
📊 ${commentsGenerated} comments generated
⏰ ~${timeSaved} hours saved  
😊 Better parent relationships
🎯 More time for lesson planning

The free version is generous, and Pro unlocks unlimited everything. Worth exploring if parent communication eats up your evenings!

What tools have been game-changers for you?

#TeacherCommunity #EdTech #TeachingTools #WorkLifeBalance #EducatorSupport`,
      hashtags: ['TeacherCommunity', 'EdTech', 'TeachingTools', 'WorkLifeBalance', 'EducatorSupport']
    }
  }

  const currentTemplate = postTemplates[selectedTemplate as keyof typeof postTemplates]

  const generateLinkedInPost = async () => {
    await loadReferralData()
    
    const shareUrl = referralLinks?.general || 'https://zazapromptly.com'
    const fullPost = `${currentTemplate.content}

${userTier === 'pro' ? '✨ Proud Pro user' : '🌱 Growing with the free version'} | Check it out: ${shareUrl}`

    // Track LinkedIn share
    if (typeof window !== 'undefined' && (window as any).zazeAnalytics) {
      (window as any).zazeAnalytics.trackFeatureUse(`linkedin_post_${selectedTemplate}`)
    }

    // Open LinkedIn share dialog
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`
    window.open(linkedInUrl, '_blank', 'width=600,height=400')
    
    // Copy post to clipboard for easy pasting
    try {
      await navigator.clipboard.writeText(fullPost)
    } catch (error) {
      console.error('Failed to copy to clipboard:', error)
    }
  }

  const generateBadgeCanvas = (type: 'achievement' | 'user' | 'stats') => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    canvas.width = 400
    canvas.height = 200

    // Clear canvas
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    if (type === 'achievement') {
      // Achievement badge
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
      gradient.addColorStop(0, '#8B5CF6')
      gradient.addColorStop(1, '#EC4899')
      
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      // White text
      ctx.fillStyle = '#ffffff'
      ctx.font = 'bold 24px Arial'
      ctx.textAlign = 'center'
      ctx.fillText('🎉 AI Teaching Achievement', canvas.width/2, 50)
      
      ctx.font = '18px Arial'
      ctx.fillText(`${commentsGenerated}+ Comments Generated`, canvas.width/2, 90)
      ctx.fillText(`${timeSaved}+ Hours Saved`, canvas.width/2, 120)
      
      ctx.font = 'bold 16px Arial'
      ctx.fillText('Powered by Zaza Promptly', canvas.width/2, 160)
      
    } else if (type === 'user') {
      // User badge
      ctx.fillStyle = '#f8fafc'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      // Border
      ctx.strokeStyle = '#e2e8f0'
      ctx.lineWidth = 2
      ctx.strokeRect(0, 0, canvas.width, canvas.height)
      
      // Content
      ctx.fillStyle = '#1e293b'
      ctx.font = 'bold 20px Arial'
      ctx.textAlign = 'center'
      ctx.fillText(`${userName}`, canvas.width/2, 60)
      
      ctx.font = '16px Arial'
      ctx.fillStyle = '#64748b'
      ctx.fillText(userTitle, canvas.width/2, 85)
      
      ctx.fillStyle = '#8B5CF6'
      ctx.font = 'bold 18px Arial'
      ctx.fillText(`${userTier === 'pro' ? '✨ Pro User' : '🌱 Growing Educator'}`, canvas.width/2, 120)
      
      ctx.fillStyle = '#1e293b'
      ctx.font = '14px Arial'
      ctx.fillText('Uses Zaza Promptly for AI-powered', canvas.width/2, 150)
      ctx.fillText('parent communication', canvas.width/2, 170)
      
    } else if (type === 'stats') {
      // Stats badge
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0)
      gradient.addColorStop(0, '#10b981')
      gradient.addColorStop(1, '#059669')
      
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      ctx.fillStyle = '#ffffff'
      ctx.font = 'bold 20px Arial'
      ctx.textAlign = 'center'
      ctx.fillText('📊 Teaching Impact Stats', canvas.width/2, 40)
      
      ctx.font = 'bold 24px Arial'
      ctx.fillText(`${timeSaved} Hours`, canvas.width/2, 80)
      ctx.font = '16px Arial'
      ctx.fillText('Saved This Month', canvas.width/2, 100)
      
      ctx.font = 'bold 24px Arial'
      ctx.fillText(`${commentsGenerated} Comments`, canvas.width/2, 140)
      ctx.font = '16px Arial'
      ctx.fillText('Generated with AI', canvas.width/2, 160)
    }
  }

  const downloadBadge = (type: 'achievement' | 'user' | 'stats') => {
    generateBadgeCanvas(type)
    
    const canvas = canvasRef.current
    if (!canvas) return

    // Track download
    if (typeof window !== 'undefined' && (window as any).zazeAnalytics) {
      (window as any).zazeAnalytics.trackFeatureUse(`badge_download_${type}`)
    }

    // Download
    const link = document.createElement('a')
    link.download = `zaza-promptly-${type}-badge.png`
    link.href = canvas.toDataURL()
    link.click()
  }

  return (
    <div className={`max-w-4xl mx-auto ${className}`}>
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
              <Linkedin className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">LinkedIn Sharing Hub</h2>
              <p className="text-gray-600">Share your teaching success and help other educators discover Zaza Promptly</p>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <Tabs defaultValue="posts" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="posts">Share Posts</TabsTrigger>
              <TabsTrigger value="badges">Download Badges</TabsTrigger>
            </TabsList>

            {/* Post Templates */}
            <TabsContent value="posts" className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Choose a post template:
                </label>
                <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a post template" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="achievement">🎉 Achievement Post</SelectItem>
                    <SelectItem value="recommendation">💡 Tool Recommendation</SelectItem>
                    <SelectItem value="testimonial">🌟 Personal Testimonial</SelectItem>
                    <SelectItem value="community">❓ Community Question</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Post Preview */}
              <Card className="bg-gray-50">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900">{currentTemplate.title}</h3>
                    <Badge className="bg-blue-100 text-blue-800">
                      <Linkedin className="w-3 h-3 mr-1" />
                      LinkedIn Ready
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="bg-white rounded-lg p-4 border border-gray-200 mb-4">
                    <pre className="whitespace-pre-wrap text-sm text-gray-800 font-sans leading-relaxed">
                      {currentTemplate.content}
                    </pre>
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <div className="flex flex-wrap gap-2">
                        {currentTemplate.hashtags.map((tag, index) => (
                          <span key={index} className="text-blue-600 text-sm">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Button
                      onClick={generateLinkedInPost}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      <Share2 className="w-4 h-4 mr-2" />
                      Share on LinkedIn
                    </Button>
                    <Button
                      variant="outline"
                      onClick={async () => {
                        await loadReferralData()
                        const shareUrl = referralLinks?.general || 'https://zazapromptly.com'
                        const fullPost = `${currentTemplate.content}\n\n${userTier === 'pro' ? '✨ Proud Pro user' : '🌱 Growing with the free version'} | Check it out: ${shareUrl}`
                        
                        try {
                          await navigator.clipboard.writeText(fullPost)
                          // Show success feedback (in real app, use toast)
                          alert('Post copied to clipboard!')
                        } catch (error) {
                          console.error('Failed to copy:', error)
                        }
                      }}
                    >
                      Copy Text
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Stats Overview */}
              <Card>
                <CardContent className="p-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-purple-600">{commentsGenerated}</div>
                      <div className="text-sm text-gray-600">Comments</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-600">{timeSaved}h</div>
                      <div className="text-sm text-gray-600">Time Saved</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-blue-600">{userTier === 'pro' ? '∞' : '5'}</div>
                      <div className="text-sm text-gray-600">Monthly Limit</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-orange-600">
                        {userTier === 'pro' ? '✨' : '🌱'}
                      </div>
                      <div className="text-sm text-gray-600">{userTier === 'pro' ? 'Pro User' : 'Free User'}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Badge Downloads */}
            <TabsContent value="badges" className="space-y-6">
              <div className="text-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Downloadable Achievement Badges
                </h3>
                <p className="text-gray-600">
                  Add these badges to your LinkedIn posts, email signatures, or teaching portfolio
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Achievement Badge */}
                <Card>
                  <CardHeader>
                    <h4 className="font-semibold text-center">Achievement Badge</h4>
                  </CardHeader>
                  <CardContent className="text-center space-y-4">
                    <div className="w-full h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white">
                      <div>
                        <div className="text-lg font-bold">🎉 AI Achievement</div>
                        <div className="text-sm">{commentsGenerated}+ Comments</div>
                      </div>
                    </div>
                    <Button
                      onClick={() => downloadBadge('achievement')}
                      variant="outline"
                      className="w-full"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download PNG
                    </Button>
                  </CardContent>
                </Card>

                {/* User Badge */}
                <Card>
                  <CardHeader>
                    <h4 className="font-semibold text-center">Profile Badge</h4>
                  </CardHeader>
                  <CardContent className="text-center space-y-4">
                    <div className="w-full h-24 bg-gray-50 border-2 border-gray-200 rounded-lg flex items-center justify-center">
                      <div>
                        <div className="text-sm font-bold text-gray-900">{userName}</div>
                        <div className="text-xs text-purple-600">
                          {userTier === 'pro' ? '✨ Pro User' : '🌱 Growing'}
                        </div>
                      </div>
                    </div>
                    <Button
                      onClick={() => downloadBadge('user')}
                      variant="outline"
                      className="w-full"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download PNG
                    </Button>
                  </CardContent>
                </Card>

                {/* Stats Badge */}
                <Card>
                  <CardHeader>
                    <h4 className="font-semibold text-center">Impact Stats</h4>
                  </CardHeader>
                  <CardContent className="text-center space-y-4">
                    <div className="w-full h-24 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center text-white">
                      <div>
                        <div className="text-lg font-bold">{timeSaved}h Saved</div>
                        <div className="text-sm">{commentsGenerated} Generated</div>
                      </div>
                    </div>
                    <Button
                      onClick={() => downloadBadge('stats')}
                      variant="outline"
                      className="w-full"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download PNG
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <Camera className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-900 mb-1">How to use these badges:</h4>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• Add to your LinkedIn profile banner or posts</li>
                      <li>• Include in your email signature</li>
                      <li>• Use in your teaching portfolio or resume</li>
                      <li>• Share in educator Facebook groups</li>
                    </ul>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {/* Hidden canvas for badge generation */}
          <canvas
            ref={canvasRef}
            style={{ display: 'none' }}
            width={400}
            height={200}
          />
        </CardContent>
      </Card>
    </div>
  )
}