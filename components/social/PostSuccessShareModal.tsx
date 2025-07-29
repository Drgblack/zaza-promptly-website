'use client'

import { useState, useEffect } from 'react'
import { X, Copy, Check, Share2, MessageCircle, Users, Heart, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { referralSystem } from '@/lib/referral-system-enhanced'

interface PostSuccessShareModalProps {
  isOpen: boolean
  onClose: () => void
  successType: 'ai_comment' | 'email_generated' | 'report_completed' | 'template_used'
  userEmail?: string
  userName?: string
  timeSaved?: number // in minutes
  className?: string
}

export function PostSuccessShareModal({
  isOpen,
  onClose,
  successType,
  userEmail,
  userName,
  timeSaved = 10,
  className = ''
}: PostSuccessShareModalProps) {
  const [referralLinks, setReferralLinks] = useState<any>(null)
  const [copiedLink, setCopiedLink] = useState<string | null>(null)
  const [hasShared, setHasShared] = useState(false)

  useEffect(() => {
    if (isOpen && userEmail) {
      loadReferralData()
    }
  }, [isOpen, userEmail])

  const loadReferralData = async () => {
    try {
      const data = await referralSystem.getDashboardData(userEmail!)
      setReferralLinks(data.links)
    } catch (error) {
      console.error('Failed to load referral data:', error)
    }
  }

  const copyToClipboard = async (text: string, linkType: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedLink(linkType)
      
      // Track copy event
      if (typeof window !== 'undefined' && (window as any).zazeAnalytics) {
        (window as any).zazeAnalytics.trackFeatureUse(`post_success_share_copied_${linkType}`)
      }
      
      setTimeout(() => setCopiedLink(null), 2000)
    } catch (error) {
      console.error('Failed to copy to clipboard:', error)
    }
  }

  const shareToSocial = (platform: string, url: string) => {
    setHasShared(true)
    
    // Track social share
    if (typeof window !== 'undefined' && (window as any).zazeAnalytics) {
      (window as any).zazeAnalytics.trackFeatureUse(`post_success_share_${platform}`)
    }
    
    window.open(url, '_blank', 'width=600,height=400')
  }

  const handleClose = () => {
    onClose()
    
    // Track modal completion
    if (typeof window !== 'undefined' && (window as any).zazeAnalytics) {
      (window as any).zazeAnalytics.trackFeatureUse(`post_success_modal_closed_${hasShared ? 'shared' : 'no_share'}`)
    }
  }

  if (!isOpen) return null

  // Success messages based on action type
  const successMessages = {
    ai_comment: {
      title: '🎉 AI Comment Generated!',
      subtitle: `Saved you ~${timeSaved} minutes of writing time`,
      shareText: 'Just used this amazing AI tool for parent communication. Saved me hours every week! Perfect for teachers 👩‍🏫'
    },
    email_generated: {
      title: '📧 Email Ready to Send!',
      subtitle: `Professional communication in seconds`,
      shareText: 'This AI tool just wrote the perfect parent email for me! Every teacher needs this time-saver 🙌'
    },
    report_completed: {
      title: '📝 Report Comments Done!',
      subtitle: `Completed in minutes instead of hours`,
      shareText: 'Report writing season just got so much easier with this AI tool! Fellow teachers, you need to see this 📝'
    },
    template_used: {
      title: '✨ Template Applied!',
      subtitle: `Professional formatting applied instantly`,
      shareText: 'Found the perfect email template for parent communication! This AI tool is a game-changer for teachers 🎯'
    }
  }

  const currentMessage = successMessages[successType]
  const shareUrl = referralLinks?.general || 'https://zazapromptly.com'

  // Pre-written messages for different platforms
  const socialMessages = {
    twitter: `${currentMessage.shareText} Check it out 👉 ${shareUrl}`,
    facebook: `${currentMessage.shareText}\n\nThis tool has revolutionized how I communicate with parents. The AI understands education context perfectly!\n\n${shareUrl}`,
    linkedin: `As an educator, I'm always looking for tools that save time while maintaining professionalism. ${currentMessage.shareText}\n\nHighly recommend checking it out: ${shareUrl}`,
    whatsapp: `Hey! ${currentMessage.shareText} Thought you might find this useful too: ${shareUrl}`,
    email: `Subject: Amazing AI tool for teachers!\n\nHi!\n\n${currentMessage.shareText}\n\nI've been using Zaza Promptly for parent communication and it's been incredible. The AI generates professional, contextual responses that save me hours every week.\n\nYou can try it here: ${shareUrl}\n\nHope it helps you too!\n\nBest regards,\n${userName || 'A fellow teacher'}`
  }

  return (
    <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 ${className}`}>
      <Card className="w-full max-w-lg bg-white rounded-2xl shadow-2xl">
        <CardContent className="p-0">
          {/* Header */}
          <div className="relative bg-gradient-to-br from-green-500 to-emerald-600 p-6 rounded-t-2xl text-white">
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold mb-2">{currentMessage.title}</h2>
              <p className="text-green-100">{currentMessage.subtitle}</p>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Success Stats */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-center space-x-6 text-sm">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{timeSaved}min</div>
                  <div className="text-gray-600">Saved</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">2.4k+</div>
                  <div className="text-gray-600">Teachers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">4.9★</div>
                  <div className="text-gray-600">Rating</div>
                </div>
              </div>
            </div>

            {/* Share Prompt */}
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Share this tool with another teacher!
              </h3>
              <p className="text-gray-600 text-sm">
                Help a colleague save time too and earn a free month when they upgrade to Pro
              </p>
            </div>

            {/* Social Share Buttons */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <Button
                onClick={() => shareToSocial('twitter', `https://twitter.com/intent/tweet?text=${encodeURIComponent(socialMessages.twitter)}`)}
                className="bg-blue-500 hover:bg-blue-600 text-white"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Twitter
              </Button>
              
              <Button
                onClick={() => shareToSocial('facebook', `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(socialMessages.facebook)}`)}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Users className="w-4 h-4 mr-2" />
                Facebook
              </Button>
              
              <Button
                onClick={() => shareToSocial('linkedin', `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`)}
                className="bg-blue-700 hover:bg-blue-800 text-white"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                LinkedIn
              </Button>
              
              <Button
                onClick={() => shareToSocial('whatsapp', `https://wa.me/?text=${encodeURIComponent(socialMessages.whatsapp)}`)}
                className="bg-green-500 hover:bg-green-600 text-white"
              >
                <Heart className="w-4 h-4 mr-2" />
                WhatsApp
              </Button>
            </div>

            {/* Copy Link Option */}
            <div className="border-t pt-4">
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Or copy your referral link:
              </label>
              <div className="flex items-center space-x-2">
                <input
                  value={shareUrl}
                  readOnly
                  className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50"
                />
                <Button
                  onClick={() => copyToClipboard(shareUrl, 'modal')}
                  variant="outline"
                  size="sm"
                >
                  {copiedLink === 'modal' ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </div>

            {/* Referral Benefit */}
            <div className="mt-4 p-3 bg-purple-50 border border-purple-200 rounded-lg">
              <div className="flex items-start space-x-2">
                <div className="w-5 h-5 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Sparkles className="w-3 h-3 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-purple-900 mb-1">
                    Earn free months!
                  </p>
                  <p className="text-xs text-purple-700">
                    When a teacher signs up with your link and upgrades to Pro, you both get 1 free month added to your account.
                  </p>
                </div>
              </div>
            </div>

            {/* Skip Option */}
            <div className="text-center mt-6">
              <button
                onClick={handleClose}
                className="text-gray-500 hover:text-gray-700 text-sm underline"
              >
                Maybe later
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Hook to trigger the modal after successful actions
export function usePostSuccessShare() {
  const [showModal, setShowModal] = useState(false)
  const [modalProps, setModalProps] = useState<Partial<PostSuccessShareModalProps>>({})

  const triggerShareModal = (props: {
    successType: PostSuccessShareModalProps['successType']
    userEmail?: string
    userName?: string
    timeSaved?: number
  }) => {
    // Only show every 3rd success to avoid being annoying
    const shareCount = parseInt(localStorage.getItem('zaza_success_count') || '0') + 1
    localStorage.setItem('zaza_success_count', shareCount.toString())

    // Show on 2nd, 5th, 10th, etc. successes
    const shouldShow = shareCount === 2 || shareCount === 5 || shareCount % 10 === 0

    if (shouldShow) {
      setModalProps(props)
      setShowModal(true)
    }

    // Track success event
    if (typeof window !== 'undefined' && (window as any).zazeAnalytics) {
      (window as any).zazeAnalytics.trackFeatureUse(`success_${props.successType}`)
    }
  }

  return {
    showModal,
    setShowModal,
    modalProps,
    triggerShareModal
  }
}