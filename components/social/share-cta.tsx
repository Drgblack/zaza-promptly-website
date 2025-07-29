"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Share2, 
  Users, 
  Gift, 
  Heart,
  MessageCircle,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Star
} from 'lucide-react'
import { SocialShare } from './social-share'
import { useReferralData } from '@/components/referral/referral-tracker'

interface ShareCTAProps {
  variant?: 'subtle' | 'prominent' | 'inline' | 'floating' | 'celebration'
  title?: string
  description?: string
  shareUrl?: string
  shareTitle?: string
  shareDescription?: string
  incentiveText?: string
  className?: string
  onShare?: (platform: string) => void
}

export function ShareCTA({
  variant = 'subtle',
  title,
  description,
  shareUrl,
  shareTitle,
  shareDescription,
  incentiveText,
  className = '',
  onShare
}: ShareCTAProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [hasShared, setHasShared] = useState(false)
  const { getReferralData } = useReferralData()

  const handleShareClick = (platform: string) => {
    setHasShared(true)
    
    // Track share in analytics
    if ((window as any).zazeAnalytics) {
      (window as any).zazeAnalytics.trackSocialShare(platform, shareUrl || window.location.href)
    }
    
    if (onShare) {
      onShare(platform)
    }
    
    // Auto-collapse after sharing
    setTimeout(() => {
      setIsExpanded(false)
    }, 2000)
  }

  const defaultContent = {
    title: title || "Share with Fellow Teachers",
    description: description || "Help other educators discover these resources and earn bonus content!",
    shareTitle: shareTitle || "Amazing Teaching Resources I Found",
    shareDescription: shareDescription || "Check out these time-saving AI tools for teachers",
    incentiveText: incentiveText || "You'll both get bonus resources when they sign up!"
  }

  // Subtle variant - small share button
  if (variant === 'subtle') {
    return (
      <div className={`${className}`}>
        {!isExpanded ? (
          <Button
            onClick={() => setIsExpanded(true)}
            variant="outline"
            size="sm"
            className="text-purple-600 border-purple-200 hover:bg-purple-50"
            data-tour="share-button"
          >
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
        ) : (
          <div className="bg-white border border-purple-200 rounded-lg p-4 shadow-lg animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <div className="p-1 bg-purple-100 rounded">
                  <Share2 className="w-4 h-4 text-purple-600" />
                </div>
                <h4 className="font-medium text-gray-800">{defaultContent.title}</h4>
              </div>
              <Button
                onClick={() => setIsExpanded(false)}
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0"
              >
                ×
              </Button>
            </div>
            
            <p className="text-sm text-gray-600 mb-3">{defaultContent.description}</p>
            
            <SocialShare
              url={shareUrl}
              title={defaultContent.shareTitle}
              description={defaultContent.shareDescription}
              variant="buttons"
              onShare={handleShareClick}
            />
            
            {hasShared && (
              <div className="mt-3 p-2 bg-green-50 rounded text-sm text-green-700 flex items-center">
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Thanks for sharing! 🎉
              </div>
            )}
          </div>
        )}
      </div>
    )
  }

  // Prominent variant - larger call-to-action
  if (variant === 'prominent') {
    return (
      <Card className={`border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50 ${className}`}>
        <CardContent className="p-6">
          <div className="text-center">
            <div className="mx-auto w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-4">
              <Share2 className="w-6 h-6 text-white" />
            </div>
            
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              {defaultContent.title}
            </h3>
            
            <p className="text-gray-600 mb-4">
              {defaultContent.description}
            </p>
            
            <div className="bg-white p-4 rounded-lg border border-purple-200 mb-4">
              <SocialShare
                url={shareUrl}
                title={defaultContent.shareTitle}
                description={defaultContent.shareDescription}
                variant="buttons"
                onShare={handleShareClick}
              />
            </div>
            
            <div className="flex items-center justify-center space-x-2 text-sm text-purple-700">
              <Gift className="w-4 h-4" />
              <span>{defaultContent.incentiveText}</span>
            </div>
            
            {hasShared && (
              <div className="mt-4 p-3 bg-green-100 rounded-lg text-green-800 flex items-center justify-center">
                <Heart className="w-4 h-4 mr-2" />
                <span className="font-medium">Thank you for spreading the word!</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    )
  }

  // Inline variant - integrated into content
  if (variant === 'inline') {
    return (
      <div className={`border-l-4 border-purple-500 bg-purple-50 p-4 rounded-r-lg ${className}`}>
        <div className="flex items-start space-x-3">
          <div className="p-2 bg-white rounded-lg">
            <Share2 className="w-5 h-5 text-purple-600" />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-gray-800 mb-2">{defaultContent.title}</h4>
            <p className="text-sm text-gray-600 mb-3">{defaultContent.description}</p>
            
            <div className="flex flex-wrap gap-2">
              <SocialShare
                url={shareUrl}
                title={defaultContent.shareTitle}
                description={defaultContent.shareDescription}
                variant="compact"
                onShare={handleShareClick}
              />
            </div>
            
            {hasShared && (
              <div className="mt-2 text-sm text-green-700 flex items-center">
                <CheckCircle2 className="w-4 h-4 mr-1" />
                Shared successfully!
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  // Floating variant - sticky bottom banner
  if (variant === 'floating') {
    return (
      <div className={`fixed bottom-0 left-0 right-0 bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 shadow-lg z-40 ${className}`}>
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-white bg-opacity-20 rounded-lg">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <p className="font-semibold">{defaultContent.title}</p>
              <p className="text-sm opacity-90">{defaultContent.incentiveText}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <SocialShare
              url={shareUrl}
              title={defaultContent.shareTitle}
              description={defaultContent.shareDescription}
              variant="compact"
              theme="dark"
              onShare={handleShareClick}
            />
            
            <Button
              onClick={() => setIsExpanded(false)}
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white hover:bg-opacity-20"
            >
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // Celebration variant - success/completion state
  if (variant === 'celebration') {
    return (
      <Card className={`border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 ${className}`}>
        <CardContent className="p-6">
          <div className="text-center">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mb-4">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Awesome Work! 🎉
            </h3>
            
            <p className="text-gray-600 mb-4">
              You've just saved hours of work. Why not share this with a colleague who could use the same boost?
            </p>
            
            <div className="bg-white p-4 rounded-lg border border-green-200 mb-4">
              <SocialShare
                url={shareUrl}
                title="Just saved hours with these AI teaching tools!"
                description="Check out these amazing resources that every teacher needs"
                variant="buttons"
                onShare={handleShareClick}
              />
            </div>
            
            <div className="flex items-center justify-center space-x-2 text-sm text-green-700">
              <Star className="w-4 h-4 fill-current" />
              <span>Share the love and earn bonus resources!</span>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return null
}

// Resource-specific share CTA
export function ResourceShareCTA({ 
  resourceTitle, 
  resourceType = "resource",
  className = "" 
}: { 
  resourceTitle: string
  resourceType?: string
  className?: string 
}) {
  return (
    <ShareCTA
      variant="inline"
      title="Love this resource?"
      description="Share it with your teaching team and help other educators save time too!"
      shareTitle={`${resourceTitle} - Free AI Teaching Tool`}
      shareDescription={`This ${resourceType} just saved me hours of work! Perfect for any teacher looking to streamline their workflow.`}
      incentiveText="When colleagues sign up through your share, you both get bonus resources!"
      className={className}
    />
  )
}

// Blog post share CTA
export function BlogShareCTA({ 
  articleTitle, 
  articleExcerpt,
  className = "" 
}: { 
  articleTitle: string
  articleExcerpt?: string
  className?: string 
}) {
  return (
    <ShareCTA
      variant="subtle"
      title="Found this helpful?"
      description="Share with fellow teachers who might benefit from these insights."
      shareTitle={`${articleTitle} - Must-read for teachers`}
      shareDescription={articleExcerpt || "Great insights for educators - definitely worth the read!"}
      incentiveText="Help build our teaching community!"
      className={className}
    />
  )
}

// Homepage hero share CTA
export function HeroShareCTA({ className = "" }: { className?: string }) {
  return (
    <div className={`mt-8 ${className}`}>
      <div className="text-center">
        <p className="text-sm text-gray-600 mb-4">
          <Users className="w-4 h-4 inline mr-1" />
          Join 1,200+ teachers already saving time
        </p>
        
        <ShareCTA
          variant="subtle"
          title="Know a teacher who needs this?"
          description="Share Zaza Promptly and you'll both get bonus resources!"
          shareTitle="Free AI Tools Every Teacher Needs"
          shareDescription="Just discovered these amazing time-saving resources for teachers. Thought you'd love them!"
          className="inline-block"
        />
      </div>
    </div>
  )
}

// Success page share CTA
export function SuccessShareCTA({ 
  actionCompleted = "signed up",
  className = "" 
}: { 
  actionCompleted?: string
  className?: string 
}) {
  return (
    <ShareCTA
      variant="celebration"
      title={`You ${actionCompleted}! 🎉`}
      description="Help other teachers discover these time-saving resources too."
      shareTitle="Just found amazing AI tools for teachers!"
      shareDescription="These free resources are game-changers for any educator. Check them out!"
      className={className}
    />
  )
}