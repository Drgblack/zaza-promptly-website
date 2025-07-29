'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { LinkedInCTA } from './LinkedInCTA'
import { Linkedin, TrendingUp, Clock, MessageSquare, Users, ChevronRight } from 'lucide-react'

export function LinkedInIntegration() {
  const [showLinkedInHub, setShowLinkedInHub] = useState(false)
  const [userStats, setUserStats] = useState({
    commentsGenerated: 0,
    timeSaved: 0,
    userTier: 'free' as 'free' | 'pro'
  })

  // Mock user data
  const userEmail = 'teacher@school.edu'
  const userName = 'Sarah Chen'
  const userTitle = '5th Grade Teacher'

  useEffect(() => {
    // Load user stats from localStorage
    const comments = parseInt(localStorage.getItem('zaza_generation_count') || '0')
    const saved = Math.round(comments * 12 / 60) // 12 minutes per comment
    const tier = localStorage.getItem('zaza_user_tier') || 'free'
    
    setUserStats({
      commentsGenerated: comments,
      timeSaved: saved,
      userTier: tier as 'free' | 'pro'
    })
  }, [])

  const generateMockData = () => {
    const newComments = Math.floor(Math.random() * 50) + 10
    const newTimeSaved = Math.round(newComments * 12 / 60)
    const newTier = Math.random() > 0.5 ? 'pro' : 'free'
    
    setUserStats({
      commentsGenerated: newComments,
      timeSaved: newTimeSaved,
      userTier: newTier
    })
    
    localStorage.setItem('zaza_generation_count', newComments.toString())
    localStorage.setItem('zaza_user_tier', newTier)
  }

  const triggerLinkedInShare = () => {
    setShowLinkedInHub(true)
    
    // Track LinkedIn CTA click
    if (typeof window !== 'undefined' && (window as any).zazeAnalytics) {
      (window as any).zazeAnalytics.trackFeatureUse('linkedin_cta_opened')
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {!showLinkedInHub ? (
        <>
          {/* Demo Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              LinkedIn Integration Demo
            </h1>
            <p className="text-gray-600 mb-4">
              See how teachers can share their AI success stories on LinkedIn
            </p>
            <Button onClick={generateMockData} variant="outline">
              Generate Mock User Data
            </Button>
          </div>

          {/* User Stats Dashboard */}
          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                <h2 className="text-xl font-semibold">Your Teaching Impact</h2>
                <Badge className={userStats.userTier === 'pro' ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'}>
                  {userStats.userTier === 'pro' ? '✨ Pro User' : '🌱 Free User'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <MessageSquare className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{userStats.commentsGenerated}</div>
                  <div className="text-sm text-gray-600">Comments Generated</div>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Clock className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{userStats.timeSaved}h</div>
                  <div className="text-sm text-gray-600">Time Saved</div>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">
                    {userStats.userTier === 'pro' ? '∞' : '5'}
                  </div>
                  <div className="text-sm text-gray-600">Monthly Limit</div>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Linkedin className="w-6 h-6 text-orange-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">Ready</div>
                  <div className="text-sm text-gray-600">to Share</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* LinkedIn CTA Card */}
          <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-linkedin-50">
            <CardContent className="p-8">
              <div className="flex items-center justify-between">
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center">
                    <Linkedin className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      Share Your Teaching Success
                    </h3>
                    <p className="text-gray-700 mb-4 max-w-lg">
                      Inspire other educators by sharing how AI has transformed your parent communication. 
                      Help build a community of efficient, empowered teachers!
                    </p>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <MessageSquare className="w-4 h-4" />
                        <span>4 post templates</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <TrendingUp className="w-4 h-4" />
                        <span>Achievement badges</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>Referral tracking</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <Button
                    onClick={triggerLinkedInShare}
                    size="lg"
                    className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
                  >
                    Open LinkedIn Hub
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </Button>
                  <p className="text-xs text-gray-500 mt-2">
                    Pre-written posts ready to share
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Benefits Preview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <MessageSquare className="w-4 h-4 text-purple-600" />
                  </div>
                  <h3 className="font-semibold">Pre-written Posts</h3>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">
                  Choose from 4 professionally crafted LinkedIn post templates that highlight your teaching achievements.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                  </div>
                  <h3 className="font-semibold">Achievement Badges</h3>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">
                  Download personalized badges showing your time savings and AI usage stats to add to posts.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <Users className="w-4 h-4 text-blue-600" />
                  </div>
                  <h3 className="font-semibold">Referral Rewards</h3>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">
                  Automatic referral links help other teachers discover the tool while earning you free months.
                </p>
              </CardContent>
            </Card>
          </div>
        </>
      ) : (
        <div>
          <div className="mb-6">
            <Button 
              onClick={() => setShowLinkedInHub(false)}
              variant="outline"
              className="mb-4"
            >
              ← Back to Demo
            </Button>
          </div>
          
          <LinkedInCTA
            userEmail={userEmail}
            userName={userName}
            userTitle={userTitle}
            timeSaved={userStats.timeSaved}
            commentsGenerated={userStats.commentsGenerated}
            userTier={userStats.userTier}
          />
        </div>
      )}
    </div>
  )
}

// Integration instructions
export function LinkedInIntegrationInstructions() {
  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <h2 className="text-xl font-bold">LinkedIn Integration Instructions</h2>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-semibold mb-2">1. Add LinkedIn CTA to your app</h3>
          <div className="bg-gray-100 rounded p-3 text-sm font-mono">
            {`import { LinkedInCTA } from '@/components/linkedin/LinkedInCTA'

<LinkedInCTA
  userEmail="user@example.com"
  userName="Sarah Chen"
  userTitle="5th Grade Teacher"
  timeSaved={45}
  commentsGenerated={150}
  userTier="pro"
/>`}
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-2">2. Features included</h3>
          <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
            <li>4 pre-written LinkedIn post templates (achievement, recommendation, testimonial, community)</li>
            <li>Downloadable achievement badges (achievement, profile, stats)</li>
            <li>Automatic referral link integration</li>
            <li>Canvas-based badge generation with personalized stats</li>
            <li>One-click LinkedIn sharing with clipboard copy</li>
            <li>Analytics tracking for all interactions</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-2">3. When to show LinkedIn CTA</h3>
          <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
            <li>After user reaches significant milestones (20+ comments, 5+ hours saved)</li>
            <li>In user dashboard or profile section</li>
            <li>After upgrade to Pro plan</li>
            <li>Periodically in email campaigns</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-2">4. Badge customization</h3>
          <p className="text-sm text-gray-600">
            Badges are generated using HTML5 Canvas with user-specific data. Easy to customize colors, 
            text, and layouts by modifying the generateBadgeCanvas function.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}