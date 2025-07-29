'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { FeedbackTrigger, feedbackUtils } from './FeedbackTrigger'
import { ShareTrigger, shareUtils } from '../social/ShareTrigger'
import { Wand2, Clock, Star, Crown, Sparkles, TrendingUp } from 'lucide-react'

export function ExampleWithFeedback() {
  const [prompt, setPrompt] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedContent, setGeneratedContent] = useState('')
  const [isFirstComment, setIsFirstComment] = useState(true)
  const [generatedCount, setGeneratedCount] = useState(0)
  const [userPoints, setUserPoints] = useState(0)

  // Mock user data
  const userEmail = 'teacher@school.edu'
  const userName = 'Sarah Chen'

  useEffect(() => {
    // Load user points and generation count
    const points = parseInt(localStorage.getItem('zaza_feedback_points') || '0')
    const count = parseInt(localStorage.getItem('zaza_generation_count') || '0')
    setUserPoints(points)
    setGeneratedCount(count)
    setIsFirstComment(count === 0)
  }, [])

  const handleGenerateComment = async () => {
    setIsGenerating(true)
    setGeneratedCount(prev => prev + 1)
    localStorage.setItem('zaza_generation_count', (generatedCount + 1).toString())
    
    // Simulate AI generation
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const mockComment = `Dear Parent,

I wanted to update you on your child's recent progress in our mathematics unit. They have shown remarkable improvement in problem-solving skills and consistently demonstrates a positive attitude toward challenging concepts.

I've observed that they work particularly well when given visual aids and hands-on manipulatives. To continue supporting their growth, I recommend practicing math facts at home for 10-15 minutes daily.

Please don't hesitate to reach out if you have any questions about their progress.

Best regards,
${userName}`

    setGeneratedContent(mockComment)
    setIsGenerating(false)
    
    // If this is the first comment, trigger feedback prompt
    if (isFirstComment) {
      // Small delay to let user read the content first
      setTimeout(() => {
        feedbackUtils.onFirstAIComment(mockComment)
        setIsFirstComment(false)
      }, 1500)
    } else {
      // For subsequent comments, trigger share modal
      shareUtils.onAICommentSuccess(userEmail, userName, 12)
    }
  }

  const getTierInfo = (points: number) => {
    if (points >= 500) return { tier: 'Master Teacher', icon: '👑', color: 'text-purple-600', bgColor: 'bg-purple-100' }
    if (points >= 200) return { tier: 'Pro Educator', icon: '⭐', color: 'text-yellow-600', bgColor: 'bg-yellow-100' }
    if (points >= 100) return { tier: 'Rising Star', icon: '🌟', color: 'text-blue-600', bgColor: 'bg-blue-100' }
    if (points >= 50) return { tier: 'Explorer', icon: '🚀', color: 'text-green-600', bgColor: 'bg-green-100' }
    return { tier: 'Newcomer', icon: '🌱', color: 'text-gray-600', bgColor: 'bg-gray-100' }
  }

  const tierInfo = getTierInfo(userPoints)

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header with User Status */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          AI Comment Generator
        </h2>
        <p className="text-gray-600 mb-4">
          Generate professional parent communication with AI assistance
        </p>
        
        {/* User Stats */}
        <div className="flex items-center justify-center space-x-6 text-sm">
          <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${tierInfo.bgColor}`}>
            <span className="text-lg">{tierInfo.icon}</span>
            <span className={`font-medium ${tierInfo.color}`}>
              {tierInfo.tier}
            </span>
          </div>
          <div className="flex items-center space-x-1 text-gray-600">
            <Star className="w-4 h-4" />
            <span>{userPoints} points</span>
          </div>
          <div className="flex items-center space-x-1 text-gray-600">
            <Wand2 className="w-4 h-4" />
            <span>{generatedCount} generated</span>
          </div>
        </div>
      </div>

      {/* Generator Interface */}
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Wand2 className="w-5 h-5 text-purple-600" />
            <h2 className="text-xl font-semibold">Generate Parent Comment</h2>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Describe the student's situation or what you want to communicate:
            </label>
            <Textarea
              placeholder="Example: Student has improved in math but needs to work on showing their work. They're enthusiastic but sometimes rushes through problems."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={4}
              className="w-full"
            />
          </div>
          
          <Button
            onClick={handleGenerateComment}
            disabled={isGenerating || !prompt.trim()}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg py-3"
            size="lg"
          >
            {isGenerating ? (
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Generating your comment...</span>
              </div>
            ) : (
              <>
                <Wand2 className="w-5 h-5 mr-2" />
                Generate Professional Comment
              </>
            )}
          </Button>

          {/* First-time user hint */}
          {isFirstComment && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <div className="flex items-start space-x-2">
                <Sparkles className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-blue-900 mb-1">
                    First time using AI comments?
                  </p>
                  <p className="text-sm text-blue-700">
                    After generation, you'll be asked to rate the quality. Your feedback helps us improve and earns you points!
                  </p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Generated Content */}
      {generatedContent && (
        <Card className="shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-green-600" />
                <h3 className="text-lg font-semibold">Generated Comment</h3>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <TrendingUp className="w-4 h-4" />
                <span>~12 minutes saved</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-50 rounded-lg p-4 border">
              <pre className="whitespace-pre-wrap text-sm text-gray-800 font-sans leading-relaxed">
                {generatedContent}
              </pre>
            </div>
            
            {/* Action Buttons */}
            <div className="flex items-center justify-between mt-4">
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  Copy
                </Button>
                <Button variant="outline" size="sm">
                  Edit
                </Button>
                <Button variant="outline" size="sm">
                  Regenerate
                </Button>
              </div>
              <div className="text-xs text-gray-500">
                Generated in 2.3 seconds
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Progress Tracker */}
      {generatedCount > 0 && (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900">Your Progress</h4>
                <p className="text-sm text-gray-600">
                  {generatedCount} comments generated • {Math.round(generatedCount * 12)} minutes saved
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <div className={`text-lg font-bold ${tierInfo.color}`}>
                    {tierInfo.icon} {tierInfo.tier}
                  </div>
                  <div className="text-sm text-gray-500">
                    {userPoints} points
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Trigger Components */}
      <FeedbackTrigger 
        userEmail={userEmail}
        userName={userName}
      />
      <ShareTrigger 
        userEmail={userEmail}
        userName={userName}
      />
    </div>
  )
}

// Integration instructions component
export function FeedbackIntegrationInstructions() {
  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <h2 className="text-xl font-bold">Feedback System Integration</h2>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-semibold mb-2">1. Add FeedbackTrigger to your app</h3>
          <div className="bg-gray-100 rounded p-3 text-sm font-mono">
            {`import { FeedbackTrigger } from '@/components/feedback/FeedbackTrigger'

function App() {
  return (
    <div>
      {/* Your app content */}
      <FeedbackTrigger userEmail="user@example.com" userName="User Name" />
    </div>
  )
}`}
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-2">2. Trigger feedback after first AI comment</h3>
          <div className="bg-gray-100 rounded p-3 text-sm font-mono">
            {`import { feedbackUtils } from '@/components/feedback/FeedbackTrigger'

// After first AI comment generation
feedbackUtils.onFirstAIComment(generatedContent)`}
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-2">3. Gamification features</h3>
          <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
            <li>5 emoji reactions with different point values (10-50 points)</li>
            <li>User tier system (Newcomer → Explorer → Rising Star → Pro Educator → Master Teacher)</li>
            <li>Points persistence in localStorage</li>
            <li>Only shows on first AI comment generation</li>
            <li>Optional additional text feedback</li>
            <li>Success animation with points earned</li>
            <li>Analytics tracking for all interactions</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-2">4. Works with Share System</h3>
          <p className="text-sm text-gray-600">
            The feedback prompt shows on first use, then the share modal takes over for subsequent successes, 
            creating a complete engagement flow.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}