"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { X, Gift, Users, Star, Share2, Copy } from 'lucide-react'
import { ReferralSystem, type ShareableLinks } from '@/lib/referral-system'

interface ReferralPopupProps {
  userEmail?: string
  isOpen: boolean
  onClose: () => void
  type?: 'welcome' | 'share' | 'thank-you'
}

export function ReferralPopup({ userEmail, isOpen, onClose, type = 'share' }: ReferralPopupProps) {
  const [shareLinks, setShareLinks] = useState<ShareableLinks | null>(null)
  const [referralStats, setReferralStats] = useState<any>(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (isOpen && userEmail) {
      setShareLinks(ReferralSystem.generateShareableLinks(userEmail))
      
      // Load referral stats
      ReferralSystem.getReferralStats(userEmail).then(stats => {
        setReferralStats(stats)
      })
    }
  }, [isOpen, userEmail])

  const handleCopyLink = async () => {
    if (shareLinks?.direct) {
      try {
        await navigator.clipboard.writeText(shareLinks.direct)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
        
        // Track copy action
        if ((window as any).zazeAnalytics) {
          (window as any).zazeAnalytics.trackCTAClick('Copy Referral Link', 'referral_popup')
        }
      } catch (err) {
        console.error('Failed to copy link:', err)
      }
    }
  }

  const handleSocialShare = (platform: keyof ShareableLinks) => {
    if (shareLinks && shareLinks[platform]) {
      window.open(shareLinks[platform], '_blank', 'width=600,height=400')
      
      // Track social share
      if ((window as any).zazeAnalytics) {
        (window as any).zazeAnalytics.trackSocialShare(platform, 'referral_link')
      }
    }
  }

  if (!isOpen) return null

  const renderContent = () => {
    switch (type) {
      case 'welcome':
        return (
          <div className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <Gift className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800">
              Welcome to Zaza Promptly! 🎉
            </h3>
            <p className="text-gray-600">
              You were referred by someone who believes in making teaching easier. 
              Join thousands of educators saving time with AI-powered feedback!
            </p>
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              Referred User Bonus: Extra Free Resources!
            </Badge>
          </div>
        )

      case 'thank-you':
        return (
          <div className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center">
              <Star className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800">
              Thank You for Referring! ⭐
            </h3>
            <p className="text-gray-600">
              Your referrals help fellow teachers discover tools that make their lives easier.
            </p>
            {referralStats && (
              <div className="grid grid-cols-3 gap-4 py-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{referralStats.totalReferrals}</div>
                  <div className="text-xs text-gray-500">Total Sent</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{referralStats.successfulReferrals}</div>
                  <div className="text-xs text-gray-500">Joined</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{referralStats.rewardPoints || 0}</div>
                  <div className="text-xs text-gray-500">Points</div>
                </div>
              </div>
            )}
            <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
              🏆 Referral Champion
            </Badge>
          </div>
        )

      default: // 'share'
        return (
          <div className="space-y-4">
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mb-4">
                <Share2 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Share Zaza Promptly with Fellow Teachers
              </h3>
              <p className="text-gray-600 mb-4">
                Help other educators save time and get rewarded for your referrals!
              </p>
            </div>

            {/* Copy Link Section */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Personal Referral Link:
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={shareLinks?.direct || ''}
                  readOnly
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm bg-white"
                />
                <Button
                  onClick={handleCopyLink}
                  variant="outline"
                  size="sm"
                  className={copied ? 'bg-green-50 border-green-200' : ''}
                >
                  <Copy className="w-4 h-4 mr-1" />
                  {copied ? 'Copied!' : 'Copy'}
                </Button>
              </div>
            </div>

            {/* Social Share Buttons */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">
                Or share directly:
              </label>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  onClick={() => handleSocialShare('linkedin')}
                  variant="outline"
                  size="sm"
                  className="bg-blue-50 border-blue-200 hover:bg-blue-100"
                >
                  LinkedIn
                </Button>
                <Button
                  onClick={() => handleSocialShare('facebook')}
                  variant="outline"
                  size="sm"
                  className="bg-blue-50 border-blue-200 hover:bg-blue-100"
                >
                  Facebook
                </Button>
                <Button
                  onClick={() => handleSocialShare('twitter')}
                  variant="outline"
                  size="sm"
                  className="bg-sky-50 border-sky-200 hover:bg-sky-100"
                >
                  Twitter/X
                </Button>
                <Button
                  onClick={() => handleSocialShare('email')}
                  variant="outline"
                  size="sm"
                  className="bg-gray-50 border-gray-200 hover:bg-gray-100"
                >
                  Email
                </Button>
              </div>
            </div>

            {/* Rewards Info */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-3 rounded-lg border border-purple-200">
              <div className="flex items-center space-x-2 mb-1">
                <Users className="w-4 h-4 text-purple-600" />
                <span className="text-sm font-medium text-purple-800">Referral Rewards</span>
              </div>
              <p className="text-xs text-purple-700">
                For every teacher who joins through your link, you both get exclusive resources and priority access to new features!
              </p>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md mx-auto relative">
        <Button
          onClick={onClose}
          variant="ghost"
          size="sm"
          className="absolute top-2 right-2 h-8 w-8 p-0"
        >
          <X className="w-4 h-4" />
        </Button>
        
        <CardContent className="p-6">
          {renderContent()}
          
          <div className="flex justify-center mt-6 space-x-2">
            {type === 'welcome' && (
              <Button onClick={onClose} className="bg-purple-600 hover:bg-purple-700">
                Get Started
              </Button>
            )}
            {type === 'share' && (
              <Button onClick={onClose} variant="outline">
                Close
              </Button>
            )}
            {type === 'thank-you' && (
              <Button onClick={onClose} className="bg-green-600 hover:bg-green-700">
                Continue
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Hook for managing referral popup state
export function useReferralPopup() {
  const [isOpen, setIsOpen] = useState(false)
  const [popupType, setPopupType] = useState<'welcome' | 'share' | 'thank-you'>('share')

  const showWelcomePopup = () => {
    setPopupType('welcome')
    setIsOpen(true)
  }

  const showSharePopup = () => {
    setPopupType('share')
    setIsOpen(true)
  }

  const showThankYouPopup = () => {
    setPopupType('thank-you')
    setIsOpen(true)
  }

  const closePopup = () => {
    setIsOpen(false)
  }

  return {
    isOpen,
    popupType,
    showWelcomePopup,
    showSharePopup,
    showThankYouPopup,
    closePopup
  }
}