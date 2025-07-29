'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { SocialGatedResources } from './SocialGatedResources'
import { Gift, Users, Download, Share2, TrendingUp, Target } from 'lucide-react'

export function ResourcesIntegration() {
  const [showResources, setShowResources] = useState(false)
  const [mockShares, setMockShares] = useState(0)

  // Mock user data
  const userEmail = 'teacher@school.edu'
  const userName = 'Sarah Chen'

  useEffect(() => {
    // Load mock data
    const shares = parseInt(localStorage.getItem('zaza_share_count') || '0')
    setMockShares(shares)
  }, [showResources])

  const generateMockShares = () => {
    const newShares = Math.floor(Math.random() * 8) + 1
    setMockShares(newShares)
    localStorage.setItem('zaza_share_count', newShares.toString())
    
    // Clear unlocked resources for demo
    localStorage.removeItem('zaza_unlocked_resources')
  }

  const clearData = () => {
    localStorage.removeItem('zaza_share_count')
    localStorage.removeItem('zaza_unlocked_resources')
    setMockShares(0)
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {!showResources ? (
        <>
          {/* Demo Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Social-Gated Resources Demo
            </h1>
            <p className="text-gray-600 mb-6">
              See how bonus resources create viral loops by requiring social shares to unlock premium content
            </p>
            <div className="flex justify-center space-x-4">
              <Button onClick={generateMockShares} variant="outline">
                Generate Mock Shares ({mockShares})
              </Button>
              <Button onClick={clearData} variant="outline">
                Clear Demo Data
              </Button>
            </div>
          </div>

          {/* Strategy Overview */}
          <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50 mb-8">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                  <Target className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Viral Growth Strategy</h2>
                  <p className="text-gray-600">Gate premium resources behind social shares to create organic growth</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Gift className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Valuable Resources</h3>
                  <p className="text-gray-600 text-sm">
                    $300+ worth of premium templates, guides, and courses that teachers actually want
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Share2 className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Social Sharing</h3>
                  <p className="text-gray-600 text-sm">
                    Each share unlocks resources progressively, encouraging multiple shares per user
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <TrendingUp className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Viral Growth</h3>
                  <p className="text-gray-600 text-sm">
                    Users become advocates, sharing authentic testimonials with their networks
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Resource Preview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">50+ Premium Templates</h3>
                  <Badge className="bg-red-100 text-red-800">1 Share</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm mb-3">
                  Professional email templates for every parent communication scenario
                </p>
                <div className="text-purple-600 font-medium text-sm">$29 value</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Parent Meeting Guide</h3>
                  <Badge className="bg-orange-100 text-orange-800">2 Shares</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm mb-3">
                  Complete guide with scripts and checklists for successful parent conferences
                </p>
                <div className="text-purple-600 font-medium text-sm">$39 value</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">AI Teaching Masterclass</h3>
                  <Badge className="bg-purple-100 text-purple-800">6 Shares</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm mb-3">
                  2-hour video course on maximizing AI tools for teaching efficiency
                </p>
                <div className="text-purple-600 font-medium text-sm">$97 value</div>
              </CardContent>
            </Card>
          </div>

          {/* Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-blue-600" />
                  <h3 className="font-semibold">User Benefits</h3>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Access $300+ worth of premium teaching resources</li>
                  <li>• Progressive unlocking creates sustained engagement</li>
                  <li>• Resources are immediately valuable and usable</li>
                  <li>• Builds community around the product</li>
                  <li>• Referral links embedded in shares earn rewards</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  <h3 className="font-semibold">Business Benefits</h3>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Organic viral growth through social sharing</li>
                  <li>• Users become authentic advocates</li>
                  <li>• Higher lifetime value through engagement</li>
                  <li>• Reduced customer acquisition costs</li>
                  <li>• Data on user networks and sharing behavior</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* CTA */}
          <div className="text-center">
            <Button
              onClick={() => setShowResources(true)}
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg px-8 py-4"
            >
              <Gift className="w-5 h-5 mr-2" />
              View Gated Resources Demo
            </Button>
          </div>
        </>
      ) : (
        <div>
          <div className="mb-6">
            <Button 
              onClick={() => setShowResources(false)}
              variant="outline"
              className="mb-4"
            >
              ← Back to Overview
            </Button>
          </div>
          
          <SocialGatedResources
            userEmail={userEmail}
            userName={userName}
          />
        </div>
      )}
    </div>
  )
}

// Integration instructions component
export function GatedResourcesInstructions() {
  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <h2 className="text-xl font-bold">Social-Gated Resources Integration</h2>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-semibold mb-2">1. Add to your app</h3>
          <div className="bg-gray-100 rounded p-3 text-sm font-mono">
            {`import { SocialGatedResources } from '@/components/resources/SocialGatedResources'

<SocialGatedResources
  userEmail="user@example.com"
  userName="Teacher Name"
/>`}
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-2">2. Resource configuration</h3>
          <p className="text-sm text-gray-600 mb-2">
            Each resource has configurable properties:
          </p>
          <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
            <li><code>sharesRequired</code> - Number of shares needed to unlock</li>
            <li><code>value</code> - Perceived value of the resource</li>
            <li><code>downloadUrl</code> - Where to download the resource</li>
            <li><code>type</code> - Template, guide, video, worksheet, checklist</li>
            <li><code>estimatedTimeValue</code> - Time savings promise</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-2">3. Viral mechanics</h3>
          <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
            <li>Progressive unlocking (1 share → 2 shares → 3 shares...)</li>
            <li>Visible progress bars create urgency</li>
            <li>High-value resources ($29-$97 perceived value)</li>
            <li>Pre-written share messages with referral links</li>
            <li>Multiple sharing platforms (Twitter, Facebook, LinkedIn, WhatsApp, Email)</li>
            <li>Analytics tracking for all shares and downloads</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-2">4. Best practices</h3>
          <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
            <li>Start with highly valuable, immediately useful first resource</li>
            <li>Create clear progression: easy → medium → premium resources</li>
            <li>Include actual monetary values to increase perceived worth</li>
            <li>Use authentic testimonials and social proof</li>
            <li>Make sharing easy with pre-written messages</li>
            <li>Track and optimize based on sharing and conversion data</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-2">5. Expected results</h3>
          <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
            <li>15-25% of users will share to unlock first resource</li>
            <li>5-10% will continue sharing for additional resources</li>
            <li>Each share reaches 100-500 people on average</li>
            <li>Viral coefficient of 0.3-0.8 depending on resource quality</li>
            <li>Significantly reduced customer acquisition costs</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}