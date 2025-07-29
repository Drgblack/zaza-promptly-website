"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { 
  Share2, 
  Copy, 
  Check, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Mail,
  MessageSquare
} from 'lucide-react'

interface SocialShareProps {
  url?: string
  title?: string
  description?: string
  hashtags?: string[]
  via?: string
  className?: string
  variant?: 'buttons' | 'dropdown' | 'inline' | 'compact'
  onShare?: (platform: string) => void
  showCopy?: boolean
  theme?: string
}

export function SocialShare({
  url,
  title = "Zaza Promptly - AI-Powered Teacher Tools",
  description = "Save hours with AI-powered feedback generation for teachers",
  hashtags = ["EdTech", "Teachers", "AI", "Education"],
  via = "ZazaPromptly",
  className = "",
  variant = "buttons",
  showCopy = true,
  onShare,
  theme
}: SocialShareProps) {
  const [copied, setCopied] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  // Use current URL if not provided
  const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : 'https://zazapromptly.com')
  const encodedUrl = encodeURIComponent(shareUrl)
  const encodedTitle = encodeURIComponent(title)
  const encodedDescription = encodeURIComponent(description)
  const hashtagString = hashtags.map(tag => `%23${tag}`).join('%20')

  const shareLinks = {
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}&title=${encodedTitle}&summary=${encodedDescription}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedDescription}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}&hashtags=${hashtags.join(',')}&via=${via}`,
    email: `mailto:?subject=${encodedTitle}&body=${encodedDescription}%0A%0A${encodedUrl}`,
  }

  const handleShare = async (platform: keyof typeof shareLinks) => {
    // Track the share event
    if ((window as any).zazeAnalytics) {
      (window as any).zazeAnalytics.trackSocialShare(platform, title)
    }

    // Call onShare callback if provided
    if (onShare) {
      onShare(platform)
    }

    // Open share window
    const shareLink = shareLinks[platform]
    if (platform === 'email') {
      window.location.href = shareLink
    } else {
      window.open(shareLink, '_blank', 'width=600,height=400,scrollbars=yes,resizable=yes')
    }

    setIsOpen(false)
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
      
      // Track copy action
      if ((window as any).zazeAnalytics) {
        (window as any).zazeAnalytics.trackCTAClick('Copy Share Link', 'social_share')
      }
    } catch (err) {
      console.error('Failed to copy URL:', err)
    }
  }

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: description,
          url: shareUrl,
        })
        
        // Track native share
        if ((window as any).zazeAnalytics) {
          (window as any).zazeAnalytics.trackSocialShare('native', title)
        }
      } catch (err) {
        console.error('Error sharing:', err)
      }
    }
  }

  if (variant === 'dropdown') {
    return (
      <div className={`relative ${className}`}>
        <Button
          onClick={() => setIsOpen(!isOpen)}
          variant="outline"
          size="sm"
          className="flex items-center space-x-2"
        >
          <Share2 className="w-4 h-4" />
          <span>Share</span>
        </Button>

        {isOpen && (
          <>
            <div 
              className="fixed inset-0 z-40" 
              onClick={() => setIsOpen(false)}
            />
            <Card className="absolute top-full mt-2 right-0 z-50 w-48">
              <CardContent className="p-2">
                <div className="space-y-1">
                  <Button
                    onClick={() => handleShare('linkedin')}
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start"
                  >
                    <Linkedin className="w-4 h-4 mr-2 text-blue-600" />
                    LinkedIn
                  </Button>
                  <Button
                    onClick={() => handleShare('facebook')}
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start"
                  >
                    <Facebook className="w-4 h-4 mr-2 text-blue-700" />
                    Facebook
                  </Button>
                  <Button
                    onClick={() => handleShare('twitter')}
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start"
                  >
                    <Twitter className="w-4 h-4 mr-2 text-sky-500" />
                    Twitter/X
                  </Button>
                  <Button
                    onClick={() => handleShare('email')}
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start"
                  >
                    <Mail className="w-4 h-4 mr-2 text-gray-600" />
                    Email
                  </Button>
                  {showCopy && (
                    <Button
                      onClick={handleCopy}
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start"
                    >
                      {copied ? (
                        <Check className="w-4 h-4 mr-2 text-green-600" />
                      ) : (
                        <Copy className="w-4 h-4 mr-2 text-gray-600" />
                      )}
                      {copied ? 'Copied!' : 'Copy Link'}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    )
  }

  if (variant === 'inline') {
    return (
      <div className={`flex items-center space-x-2 ${className}`}>
        <span className="text-sm text-gray-600">Share:</span>
        <Button
          onClick={() => handleShare('linkedin')}
          variant="ghost"
          size="sm"
          className="p-2 h-8 w-8"
        >
          <Linkedin className="w-4 h-4 text-blue-600" />
        </Button>
        <Button
          onClick={() => handleShare('facebook')}
          variant="ghost"
          size="sm"
          className="p-2 h-8 w-8"
        >
          <Facebook className="w-4 h-4 text-blue-700" />
        </Button>
        <Button
          onClick={() => handleShare('twitter')}
          variant="ghost"
          size="sm"
          className="p-2 h-8 w-8"
        >
          <Twitter className="w-4 h-4 text-sky-500" />
        </Button>
        <Button
          onClick={() => handleShare('email')}
          variant="ghost"
          size="sm"
          className="p-2 h-8 w-8"
        >
          <Mail className="w-4 h-4 text-gray-600" />
        </Button>
        {showCopy && (
          <Button
            onClick={handleCopy}
            variant="ghost"
            size="sm"
            className="p-2 h-8 w-8"
          >
            {copied ? (
              <Check className="w-4 h-4 text-green-600" />
            ) : (
              <Copy className="w-4 h-4 text-gray-600" />
            )}
          </Button>
        )}
      </div>
    )
  }

  // Default: buttons variant
  return (
    <div className={`space-y-3 ${className}`}>
      <div className="text-center">
        <h4 className="text-sm font-medium text-gray-800 mb-3">Share this with fellow teachers:</h4>
      </div>
      
      {/* Native share button for mobile */}
      {typeof navigator !== 'undefined' && navigator.share && (
        <Button
          onClick={handleNativeShare}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
        >
          <Share2 className="w-4 h-4 mr-2" />
          Share
        </Button>
      )}

      <div className="grid grid-cols-2 gap-2">
        <Button
          onClick={() => handleShare('linkedin')}
          variant="outline"
          size="sm"
          className="bg-blue-50 border-blue-200 hover:bg-blue-100 text-blue-700"
        >
          <Linkedin className="w-4 h-4 mr-2" />
          LinkedIn
        </Button>
        <Button
          onClick={() => handleShare('facebook')}
          variant="outline"
          size="sm"
          className="bg-blue-50 border-blue-200 hover:bg-blue-100 text-blue-700"
        >
          <Facebook className="w-4 h-4 mr-2" />
          Facebook
        </Button>
        <Button
          onClick={() => handleShare('twitter')}
          variant="outline"
          size="sm"
          className="bg-sky-50 border-sky-200 hover:bg-sky-100 text-sky-700"
        >
          <Twitter className="w-4 h-4 mr-2" />
          Twitter/X
        </Button>
        <Button
          onClick={() => handleShare('email')}
          variant="outline"
          size="sm"
          className="bg-gray-50 border-gray-200 hover:bg-gray-100 text-gray-700"
        >
          <Mail className="w-4 h-4 mr-2" />
          Email
        </Button>
      </div>

      {showCopy && (
        <Button
          onClick={handleCopy}
          variant="outline"
          size="sm"
          className={`w-full ${copied ? 'bg-green-50 border-green-200 text-green-700' : 'bg-gray-50 border-gray-200'}`}
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 mr-2" />
              Link Copied!
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 mr-2" />
              Copy Link
            </>
          )}
        </Button>
      )}
    </div>
  )
}

// TikTok sharing component (special handling needed)
export function TikTokShare({ url, title }: { url?: string, title?: string }) {
  const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : 'https://zazapromptly.com')
  
  const handleTikTokShare = () => {
    // TikTok doesn't have a direct web share API like other platforms
    // This would typically copy the link and prompt user to share manually
    navigator.clipboard.writeText(`${title}\n\n${shareUrl}\n\n#EdTech #Teachers #AI #ZazaPromptly`)
    
    // Track the TikTok share intent
    if ((window as any).zazeAnalytics) {
      (window as any).zazeAnalytics.trackSocialShare('tiktok', title || 'page_share')
    }
    
    alert('Link copied! Open TikTok and paste to share with your followers.')
  }

  return (
    <Button
      onClick={handleTikTokShare}
      variant="outline"
      size="sm"
      className="bg-gray-900 text-white hover:bg-gray-800 border-gray-900"
    >
      <MessageSquare className="w-4 h-4 mr-2" />
      TikTok
    </Button>
  )
}