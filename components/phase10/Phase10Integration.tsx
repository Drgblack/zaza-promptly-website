'use client'

import { useState, useEffect } from 'react'
import { Wand2, Palette, Heart, HelpCircle, Gift, Moon, Sun } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'

// Import all Phase 10 components
import { EmpathicLoading, EmpathicError, EmpathicEmptyState, EmpathicStateWrapper } from '../ui/EmpathicStates'
import { DelightWrapper, delightTriggers } from '../ui/DelightMoments'
import { ZaraAssistant, ZaraTooltip, zaraHelpers } from '../ui/ZaraAssistant'
import { DarkModeProvider, useDarkMode, ThemeToggle, SoftGlowButton, CalmingBackground } from '../ui/DarkModeEnhanced'
import { FloatingHelpButton, supportTriggers } from '../support/SupportEscalation'
import { MilestoneTracker, milestoneUtils } from '../welcome/ThankYouMoments'
import { ZazaFooterLogo, AboutZazaLink, ZazaTooltipEasterEgg } from '../about/ZazaOriginStory'

// Main Phase 10 showcase component
function Phase10ShowcaseInner() {
  const [comment, setComment] = useState('')
  const [generatedContent, setGeneratedContent] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [isEmpty, setIsEmpty] = useState(true)
  const [selectedTone, setSelectedTone] = useState('')
  const [usageCount, setUsageCount] = useState(0)
  const { isDark } = useDarkMode()

  // Mock user data
  const userName = 'Sarah Chen'
  const userEmail = 'sarah.chen@school.edu'

  useEffect(() => {
    // Check if this is truly empty state
    setIsEmpty(!generatedContent && !isGenerating && !hasError)
  }, [generatedContent, isGenerating, hasError])

  const handleGenerateComment = async () => {
    if (!comment.trim()) {
      zaraHelpers.helpEmptyInput()
      return
    }

    setIsGenerating(true)
    setHasError(false)

    try {
      // Simulate API call with potential error
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          if (Math.random() > 0.8) { // 20% chance of error for demo
            reject(new Error('AI service temporarily unavailable'))
          } else {
            resolve(null)
          }
        }, 3000)
      })

      // Generate mock content
      const mockContent = `Dear Parent,

I wanted to reach out regarding ${comment.includes('progress') ? 'your child\'s wonderful progress' : 'your child\'s recent work'} in our classroom.

${comment.includes('math') ? 'In mathematics, they have shown great improvement in problem-solving skills and consistently demonstrates a positive attitude toward challenging concepts.' : 'They have been showing excellent engagement with our current curriculum and consistently participates in class discussions.'}

${comment.includes('concern') ? 'I\'d like to discuss some strategies we can implement together to support their continued growth.' : 'I\'ve been impressed by their dedication and enthusiasm for learning.'}

Please feel free to reach out if you have any questions or would like to discuss this further.

Best regards,
${userName}`

      setGeneratedContent(mockContent)
      
      // Increment usage for streak tracking
      const newCount = usageCount + 1
      setUsageCount(newCount)
      localStorage.setItem('zaza_usage_count', newCount.toString())

      // Trigger delight moments
      delightTriggers.commentGenerated(newCount >= 3 ? newCount : undefined)
      
      // Trigger milestones
      if (newCount === 1) {
        milestoneUtils.onFirstComment()
      }

      // Show celebration
      zaraHelpers.celebrate()

    } catch (error) {
      setHasError(true)
      zaraHelpers.helpWithError()
      supportTriggers.onError(
        'AI generation failed',
        'comment_generation',
        '/demo'
      )
    } finally {
      setIsGenerating(false)
    }
  }

  const handleRetry = () => {
    setHasError(false)
    handleGenerateComment()
  }

  const toneOptions = [
    { value: 'gentle', label: 'Gentle', description: 'Perfect for sensitive topics' },
    { value: 'encouraging', label: 'Encouraging', description: 'Celebrates progress and builds confidence' },
    { value: 'professional', label: 'Professional', description: 'Clear and respectful communication' },
    { value: 'friendly', label: 'Friendly', description: 'Warm and approachable tone' },
    { value: 'concerned', label: 'Concerned', description: 'Addresses issues with care' }
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      <CalmingBackground pattern="gradient" intensity="subtle" />
      
      <div className="max-w-4xl mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-4">
            <ZazaFooterLogo />
            <ThemeToggle variant="icon" size="lg" />
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
            Phase 10: Human-First Design
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Experience Zaza's emotional resonance, stress-reduction features, and delightful interactions 
            that make teachers feel truly supported.
          </p>
          
          <div className="flex flex-wrap justify-center gap-2">
            <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300">
              Empathetic Microcopy
            </Badge>
            <Badge className="bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300">
              Delight Moments
            </Badge>
            <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
              Zara Assistant
            </Badge>
            <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
              Dark Mode
            </Badge>
          </div>
        </div>

        {/* AI Comment Generator */}
        <Card className="shadow-xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  isDark 
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg shadow-purple-500/50' 
                    : 'bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg'
                }`}>
                  <Wand2 className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                    AI Comment Generator
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Create thoughtful parent communication with AI assistance
                  </p>
                </div>
              </div>
              
              <ZazaTooltipEasterEgg>
                <HelpCircle className="w-5 h-5 text-gray-400" />
              </ZazaTooltipEasterEgg>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Tone Selection with Zara tooltips */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Choose Your Tone
              </label>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                {toneOptions.map((tone) => (
                  <ZaraTooltip
                    key={tone.value}
                    content="tone"
                    subcontent={tone.value}
                    trigger={
                      <button
                        onClick={() => setSelectedTone(tone.value)}
                        className={`p-3 rounded-lg border-2 text-sm font-medium transition-all ${
                          selectedTone === tone.value
                            ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300'
                            : 'border-gray-200 dark:border-gray-600 hover:border-purple-300 dark:hover:border-purple-500'
                        }`}
                      >
                        {tone.label}
                      </button>
                    }
                  />
                ))}
              </div>
            </div>

            {/* Input with empathic states */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Describe the situation or what you want to communicate:
              </label>
              <Textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Example: Student has made great progress in math but needs to work on showing their work. They're enthusiastic but sometimes rushes through problems."
                rows={4}
                className="w-full"
              />
            </div>

            {/* Generate Button */}
            <SoftGlowButton
              onClick={handleGenerateComment}
              disabled={isGenerating}
              variant="primary"
              size="lg"
              className="w-full"
            >
              {isGenerating ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                  Crafting your perfect comment...
                </>
              ) : (
                <>
                  <Wand2 className="w-5 h-5 mr-2" />
                  Generate Thoughtful Comment
                </>
              )}
            </SoftGlowButton>
          </CardContent>
        </Card>

        {/* Generated Content with Empathic States */}
        <EmpathicStateWrapper
          isLoading={isGenerating}
          error={hasError ? 'Oops! AI can be quirky sometimes. Let\'s try again?' : undefined}
          isEmpty={isEmpty}
          emptyStateProps={{
            title: 'No comments yet  -  but your ideas are just moments away ✨',
            actionText: 'Ready to Create Something Beautiful',
            onAction: () => document.querySelector('textarea')?.focus(),
            type: 'comments'
          }}
          onRetry={handleRetry}
          className="min-h-[200px]"
        >
          {generatedContent && (
            <Card className="shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    Your Generated Comment
                  </h3>
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                    ✨ Ready to Use
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 border">
                  <pre className="whitespace-pre-wrap text-sm text-gray-800 dark:text-gray-200 font-sans leading-relaxed">
                    {generatedContent}
                  </pre>
                </div>
                
                <div className="flex items-center justify-between mt-4">
                  <div className="flex space-x-2">
                    <SoftGlowButton variant="secondary" size="sm">
                      Copy
                    </SoftGlowButton>
                    <SoftGlowButton variant="success" size="sm">
                      Save Template
                    </SoftGlowButton>
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Generated with care by Zara ✨
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </EmpathicStateWrapper>

        {/* Usage Stats */}
        {usageCount > 0 && (
          <Card className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-purple-200 dark:border-purple-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-purple-900 dark:text-purple-100">
                    Your Teaching Impact
                  </h4>
                  <p className="text-sm text-purple-700 dark:text-purple-300">
                    {usageCount} comment{usageCount !== 1 ? 's' : ''} generated • 
                    ~{usageCount * 12} minutes saved
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Heart className="w-5 h-5 text-pink-500" />
                  {usageCount >= 3 && (
                    <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300">
                      🔥 {usageCount}-day streak!
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Features Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                🎯 Empathetic Microcopy
              </h3>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div>
                <strong>Loading:</strong> "Hang tight, we're crafting something great for you..."
              </div>
              <div>
                <strong>Error:</strong> "Oops! AI can be quirky. Try again or adjust your prompt."
              </div>
              <div>
                <strong>Empty:</strong> "No comments yet  -  but your ideas are just moments away."
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                ✨ Mini Delights
              </h3>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div>
                <strong>Success:</strong> Confetti animation + teacher joy quote
              </div>
              <div>
                <strong>Streaks:</strong> Special badges for consecutive usage
              </div>
              <div>
                <strong>Milestones:</strong> Welcome cards with downloadables
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                💜 Zara Assistant
              </h3>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div>
                <strong>Tooltips:</strong> Hover over tone options for guidance
              </div>
              <div>
                <strong>Encouragement:</strong> Context-aware supportive messages
              </div>
              <div>
                <strong>Help:</strong> Smart assistance when you're stuck
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                🌙 Visual Soothing
              </h3>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div>
                <strong>Dark Mode:</strong> Easy on the eyes with soft glows
              </div>
              <div>
                <strong>Transitions:</strong> Smooth, calming animations
              </div>
              <div>
                <strong>Colors:</strong> Reduced contrast for comfort
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer with Easter Eggs */}
        <div className="text-center pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-center space-x-6 mb-4">
            <AboutZazaLink />
            <span className="text-gray-300 dark:text-gray-600">•</span>
            <button
              onClick={() => zaraHelpers.welcomeNewUser()}
              className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 text-sm"
            >
              Meet Zara
            </button>
            <span className="text-gray-300 dark:text-gray-600">•</span>
            <button
              onClick={() => milestoneUtils.onSignup(userName)}
              className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 text-sm"
            >
              Welcome Experience
            </button>
          </div>
          
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Made with 💜 for amazing educators everywhere
          </p>
          
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
            🥚 Tip: Try clicking the Zaza logo 5 times for a special surprise!
          </p>
        </div>
      </div>

      {/* Floating Help Button */}
      <FloatingHelpButton
        userEmail={userEmail}
        userName={userName}
      />
    </div>
  )
}

// Main component with all providers
export function Phase10Integration() {
  return (
    <DarkModeProvider>
      <MilestoneTracker userName="Sarah Chen" userEmail="sarah.chen@school.edu">
        <ZaraAssistant>
          <DelightWrapper>
            <Phase10ShowcaseInner />
          </DelightWrapper>
        </ZaraAssistant>
      </MilestoneTracker>
    </DarkModeProvider>
  )
}

// Instructions component
export function Phase10Instructions() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Phase 10 Integration Guide
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          How to implement human-first design across your application
        </p>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <h2 className="text-xl font-bold">1. Empathetic Microcopy</h2>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="bg-gray-100 dark:bg-gray-800 rounded p-3 font-mono">
              {`import { EmpathicStateWrapper } from '@/components/ui/EmpathicStates'

<EmpathicStateWrapper
  isLoading={loading}
  error={error}
  isEmpty={!data}
  onRetry={handleRetry}
>
  {/* Your content */}
</EmpathicStateWrapper>`}
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Replace generic loading/error states with empathetic, teacher-focused messaging.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h2 className="text-xl font-bold">2. Delight Moments</h2>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="bg-gray-100 dark:bg-gray-800 rounded p-3 font-mono">
              {`import { DelightWrapper, delightTriggers } from '@/components/ui/DelightMoments'

// Wrap your app
<DelightWrapper>{children}</DelightWrapper>

// Trigger celebrations
delightTriggers.commentGenerated(streakDays)
delightTriggers.emailCreated()`}
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Add confetti, quotes, and streak badges to celebrate user achievements.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h2 className="text-xl font-bold">3. Zara Assistant</h2>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="bg-gray-100 dark:bg-gray-800 rounded p-3 font-mono">
              {`import { ZaraAssistant, ZaraTooltip } from '@/components/ui/ZaraAssistant'

<ZaraAssistant>{children}</ZaraAssistant>

<ZaraTooltip content="tone" subcontent="gentle" trigger={<button>Gentle</button>} />`}
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Add contextual help and encouraging guidance throughout the interface.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h2 className="text-xl font-bold">4. Dark Mode & Visual Soothing</h2>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="bg-gray-100 dark:bg-gray-800 rounded p-3 font-mono">
              {`import { DarkModeProvider, SoftGlowButton } from '@/components/ui/DarkModeEnhanced'

<DarkModeProvider>{children}</DarkModeProvider>

<SoftGlowButton variant="primary">Generate</SoftGlowButton>`}
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Implement calming dark mode with soft glows and smooth transitions.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h2 className="text-xl font-bold">Expected Impact</h2>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h3 className="font-semibold text-green-700 dark:text-green-400 mb-2">Emotional Benefits</h3>
                <ul className="space-y-1 text-gray-600 dark:text-gray-400">
                  <li>• Teachers feel seen and supported</li>
                  <li>• Reduced stress during interactions</li>
                  <li>• Increased emotional connection to brand</li>
                  <li>• Enhanced trust and loyalty</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Business Benefits</h3>
                <ul className="space-y-1 text-gray-600 dark:text-gray-400">
                  <li>• Higher retention rates</li>
                  <li>• Increased share-worthiness</li>
                  <li>• Stronger word-of-mouth marketing</li>
                  <li>• Premium brand positioning</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}