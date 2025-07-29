'use client'

import { useState, useEffect } from 'react'
import { Copy, Share2, Gift, Users, TrendingUp, ExternalLink, Check, Crown, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { referralSystem, type ReferralCode, type ReferralStats, type ReferralReward } from '@/lib/referral-system-enhanced'

interface ReferralDashboardProps {
  userEmail: string
  userName?: string
  className?: string
}

export function ReferralDashboard({ userEmail, userName, className = '' }: ReferralDashboardProps) {
  const [referralData, setReferralData] = useState<{
    referralCode: ReferralCode | null
    stats: ReferralStats
    rewards: ReferralReward[]
    links: ReturnType<typeof referralSystem.generateReferralLinks>
  } | null>(null)
  
  const [copiedLink, setCopiedLink] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadReferralData()
  }, [userEmail])

  const loadReferralData = async () => {
    try {
      const data = await referralSystem.getDashboardData(userEmail)
      setReferralData(data)
    } catch (error) {
      console.error('Failed to load referral data:', error)
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = async (text: string, linkType: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedLink(linkType)
      
      // Track copy event
      if (typeof window !== 'undefined' && (window as any).zazeAnalytics) {
        (window as any).zazeAnalytics.trackFeatureUse(`referral_link_copied_${linkType}`)
      }
      
      setTimeout(() => setCopiedLink(null), 2000)
    } catch (error) {
      console.error('Failed to copy to clipboard:', error)
    }
  }

  const shareToSocial = (platform: string, url: string) => {
    // Track social share
    if (typeof window !== 'undefined' && (window as any).zazeAnalytics) {
      (window as any).zazeAnalytics.trackFeatureUse(`referral_social_share_${platform}`)
    }
    
    window.open(url, '_blank', 'width=600,height=400')
  }

  if (loading) {
    return (
      <div className={`p-6 ${className}`}>
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (!referralData) {
    return (
      <div className={`p-6 text-center ${className}`}>
        <p className="text-gray-500">Failed to load referral data. Please try again.</p>
        <Button onClick={loadReferralData} className="mt-4">
          Retry
        </Button>
      </div>
    )
  }

  const { referralCode, stats, rewards, links } = referralData

  return (
    <div className={`p-6 ${className}`}>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
            <Gift className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Referral Program</h2>
            <p className="text-gray-600">Share Zaza Promptly and earn free months!</p>
          </div>
        </div>
        
        {/* Reward Explanation */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Crown className="w-5 h-5 text-green-600 mt-0.5" />
            <div>
              <h3 className="font-medium text-green-900 mb-1">How it works</h3>
              <p className="text-green-700 text-sm">
                For every teacher that signs up using your referral link and subscribes to Pro, 
                you both get <strong>1 free month</strong> added to your account!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-4 text-center">
            <Users className="w-8 h-8 text-blue-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{stats.totalRefers}</div>
            <div className="text-sm text-gray-600">Total Referrals</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <TrendingUp className="w-8 h-8 text-green-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{stats.successfulConversions}</div>
            <div className="text-sm text-gray-600">Conversions</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <Gift className="w-8 h-8 text-purple-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{stats.totalRewards}</div>
            <div className="text-sm text-gray-600">Free Months Earned</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <Star className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">
              {Math.round(stats.conversionRate * 100)}%
            </div>
            <div className="text-sm text-gray-600">Conversion Rate</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="share" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="share">Share Links</TabsTrigger>
          <TabsTrigger value="rewards">My Rewards</TabsTrigger>
          <TabsTrigger value="stats">Statistics</TabsTrigger>
        </TabsList>
        
        {/* Share Links Tab */}
        <TabsContent value="share" className="space-y-6">
          {/* Your Referral Code */}
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Your Referral Code</h3>
              <p className="text-sm text-gray-600">Share this code with other teachers</p>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <Input
                  value={referralCode?.code || ''}
                  readOnly
                  className="font-mono text-lg"
                />
                <Button
                  onClick={() => copyToClipboard(referralCode?.code || '', 'code')}
                  variant="outline"
                >
                  {copiedLink === 'code' ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Shareable Links */}
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Shareable Links</h3>
              <p className="text-sm text-gray-600">Different links for different contexts</p>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* General Link */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  General Link
                </label>
                <div className="flex items-center space-x-2">
                  <Input
                    value={links.general}
                    readOnly
                    className="text-sm"
                  />
                  <Button
                    onClick={() => copyToClipboard(links.general, 'general')}
                    variant="outline"
                    size="sm"
                  >
                    {copiedLink === 'general' ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </div>

              {/* Pricing Link */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Pricing Page Link
                </label>
                <div className="flex items-center space-x-2">
                  <Input
                    value={links.pricing}
                    readOnly
                    className="text-sm"
                  />
                  <Button
                    onClick={() => copyToClipboard(links.pricing, 'pricing')}
                    variant="outline"
                    size="sm"
                  >
                    {copiedLink === 'pricing' ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </div>

              {/* Free Resources Link */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Free Resources Link
                </label>
                <div className="flex items-center space-x-2">
                  <Input
                    value={links.freeResources}
                    readOnly
                    className="text-sm"
                  />
                  <Button
                    onClick={() => copyToClipboard(links.freeResources, 'resources')}
                    variant="outline"
                    size="sm"
                  >
                    {copiedLink === 'resources' ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Social Sharing */}
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Share on Social Media</h3>
              <p className="text-sm text-gray-600">Pre-written messages for easy sharing</p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                <Button
                  onClick={() => shareToSocial('twitter', links.social.twitter)}
                  className="bg-blue-500 hover:bg-blue-600 text-white"
                >
                  Twitter
                </Button>
                <Button
                  onClick={() => shareToSocial('linkedin', links.social.linkedin)}
                  className="bg-blue-700 hover:bg-blue-800 text-white"
                >
                  LinkedIn
                </Button>
                <Button
                  onClick={() => shareToSocial('facebook', links.social.facebook)}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Facebook
                </Button>
                <Button
                  onClick={() => shareToSocial('whatsapp', links.social.whatsapp)}
                  className="bg-green-500 hover:bg-green-600 text-white"
                >
                  WhatsApp
                </Button>
                <Button
                  onClick={() => shareToSocial('email', links.social.email)}
                  className="bg-gray-600 hover:bg-gray-700 text-white"
                >
                  Email
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Rewards Tab */}
        <TabsContent value="rewards" className="space-y-4">
          {rewards.length > 0 ? (
            rewards.map((reward) => (
              <Card key={reward.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <Gift className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">
                          {reward.rewardValue} Free Month{reward.rewardValue > 1 ? 's' : ''}
                        </h4>
                        <p className="text-sm text-gray-600">
                          From referral: {reward.newUserEmail}
                        </p>
                        <p className="text-xs text-gray-500">
                          {reward.createdAt.toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <Badge variant={reward.isRedeemed ? 'secondary' : 'default'}>
                      {reward.isRedeemed ? 'Redeemed' : 'Active'}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <Gift className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No rewards yet</h3>
                <p className="text-gray-600 mb-4">
                  Start sharing your referral link to earn free months!
                </p>
                <Button onClick={() => (document.querySelector('[data-state="active"][value="share"]') as HTMLElement)?.click()}>
                  Share Now
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Statistics Tab */}
        <TabsContent value="stats" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">Performance</h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Clicks</span>
                    <span className="font-medium">{stats.totalRefers}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Conversions</span>
                    <span className="font-medium">{stats.successfulConversions}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Conversion Rate</span>
                    <span className="font-medium">{Math.round(stats.conversionRate * 100)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Rewards</span>
                    <span className="font-medium">{stats.totalRewards} months</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">Tips for Success</h3>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start space-x-2">
                    <span className="text-green-500 mt-1">•</span>
                    <span>Share with teachers who struggle with parent communication</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-green-500 mt-1">•</span>
                    <span>Post in educator Facebook groups and forums</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-green-500 mt-1">•</span>
                    <span>Share your success story with the tool</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-green-500 mt-1">•</span>
                    <span>Use the free resources link to build trust first</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}