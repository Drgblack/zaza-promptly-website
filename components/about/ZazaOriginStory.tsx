'use client'

import { useState, useEffect } from 'react'
import { Heart, Star, Coffee, BookOpen, Users, Sparkles, X, ChevronRight, Clock, Gift } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface ZazaOriginModalProps {
  isOpen: boolean
  onClose: () => void
  className?: string
}

export function ZazaOriginModal({ isOpen, onClose, className = '' }: ZazaOriginModalProps) {
  const [currentChapter, setCurrentChapter] = useState(0)
  const [autoAdvance, setAutoAdvance] = useState(true)

  const storyChapters = [
    {
      title: "The Spark",
      emoji: "💡",
      content: `It was 11:47 PM on a Tuesday. Sarah, a 3rd-grade teacher, sat at her kitchen table surrounded by report cards, coffee cups, and the weight of trying to find the right words for 28 different parent conversations.

"There has to be a better way," she whispered, rubbing her tired eyes.

That's when the idea for Zaza was born - not in a boardroom or tech lab, but in the quiet desperation of a teacher who cared too much to settle for generic communication.`,
      image: "🌙"
    },
    {
      title: "The Mission",
      emoji: "🎯",
      content: `Zaza isn't just another AI tool. It's the digital companion every teacher deserves - one that understands the delicate art of parent communication, the weight of each word, and the love behind every concern.

We named it Zaza because it means "movement" in Hebrew - the movement from overwhelm to empowerment, from hours of struggle to moments of clarity.`,
      image: "🚀"
    },
    {
      title: "The Heart",
      emoji: "💝",
      content: `Every feature in Zaza comes from real teacher stories:

• The gentle tone option? From Maria, who needed help addressing a sensitive behavioral issue.
• The multilingual support? From Ahmed, whose diverse classroom deserved communications every parent could understand.
• The save feature? From Jennifer, who spent hours recreating the same types of comments.

We didn't build an AI. We built a bridge between teachers' hearts and parents' understanding.`,
      image: "🌉"
    },
    {
      title: "The Promise",
      emoji: "🤝",
      content: `Every late night you spend crafting the perfect parent email, every moment you worry about how your words will be received, every time you wish you had more time for actual teaching - we see you.

Zaza's promise is simple: Give you back your evenings. Strengthen your parent relationships. Let you focus on why you became a teacher in the first place.

You're not just using an AI tool. You're joining a movement of educators who refuse to let technology replace the human touch - but are smart enough to let it amplify it.`,
      image: "✨"
    },
    {
      title: "The Community",
      emoji: "👥",
      content: `Today, thousands of teachers across the globe trust Zaza with their most important communications. From a kindergarten teacher in rural Iowa to a high school counselor in Singapore, we're united by one truth:

Great teaching deserves great tools.

You're not alone in this journey. Every time you use Zaza, you're part of a community that believes education can be both high-tech and high-touch, efficient and empathetic.

Welcome to the family. 💜`,
      image: "🌍"
    }
  ]

  const currentStory = storyChapters[currentChapter]

  // Auto-advance through chapters
  useEffect(() => {
    if (!isOpen || !autoAdvance) return

    const timer = setTimeout(() => {
      if (currentChapter < storyChapters.length - 1) {
        setCurrentChapter(prev => prev + 1)
      } else {
        setAutoAdvance(false)
      }
    }, 8000) // 8 seconds per chapter

    return () => clearTimeout(timer)
  }, [currentChapter, isOpen, autoAdvance])

  // Reset when modal opens
  useEffect(() => {
    if (isOpen) {
      setCurrentChapter(0)
      setAutoAdvance(true)
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className={`fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 ${className}`}>
      <Card className="w-full max-w-3xl bg-white dark:bg-gray-800 shadow-2xl overflow-hidden">
        {/* Header */}
        <CardHeader className="bg-gradient-to-r from-purple-600 via-pink-500 to-purple-700 text-white p-8 relative overflow-hidden">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Decorative background */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-8 left-12 w-16 h-16 border-2 border-white rounded-full animate-pulse" />
            <div className="absolute bottom-12 right-16 w-8 h-8 bg-white rounded-full animate-bounce" />
            <div className="absolute top-1/2 left-8 w-4 h-4 bg-white rounded-full" />
            <div className="absolute top-16 right-8 w-12 h-12 border border-white rounded-full" />
          </div>

          <div className="relative z-10 text-center">
            <div className="text-6xl mb-4">💜</div>
            <h1 className="text-3xl font-bold mb-2">The Story of Zaza</h1>
            <p className="text-purple-100 text-lg">
              How a teacher's late-night struggle became a movement
            </p>
          </div>
        </CardHeader>

        {/* Story Content */}
        <CardContent className="p-8">
          {/* Chapter Navigation */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-2">
              <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300">
                Chapter {currentChapter + 1} of {storyChapters.length}
              </Badge>
              <div className="flex space-x-1">
                {storyChapters.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-colors cursor-pointer ${
                      index === currentChapter 
                        ? 'bg-purple-500' 
                        : index < currentChapter 
                          ? 'bg-purple-300' 
                          : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                    onClick={() => {
                      setCurrentChapter(index)
                      setAutoAdvance(false)
                    }}
                  />
                ))}
              </div>
            </div>
            
            <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
              <Clock className="w-3 h-3" />
              <span>{autoAdvance ? 'Auto-advancing' : 'Manual mode'}</span>
              <button
                onClick={() => setAutoAdvance(!autoAdvance)}
                className="text-purple-600 hover:text-purple-700 dark:text-purple-400"
              >
                {autoAdvance ? 'Pause' : 'Resume'}
              </button>
            </div>
          </div>

          {/* Current Chapter */}
          <div className="text-center mb-8 animate-in fade-in duration-500" key={currentChapter}>
            <div className="text-8xl mb-6 animate-bounce">{currentStory.image}</div>
            
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <span className="text-white text-lg">{currentStory.emoji}</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {currentStory.title}
              </h2>
            </div>
            
            <div className="prose prose-lg dark:prose-invert mx-auto max-w-2xl">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                {currentStory.content}
              </p>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between">
            <Button
              onClick={() => {
                if (currentChapter > 0) {
                  setCurrentChapter(prev => prev - 1)
                  setAutoAdvance(false)
                }
              }}
              disabled={currentChapter === 0}
              variant="outline"
              className="flex items-center space-x-2"
            >
              <ChevronRight className="w-4 h-4 rotate-180" />
              <span>Previous</span>
            </Button>

            <div className="flex items-center space-x-4">
              {currentChapter === storyChapters.length - 1 ? (
                <Button
                  onClick={onClose}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8"
                >
                  <Heart className="w-4 h-4 mr-2" />
                  Welcome to the Family
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    setCurrentChapter(prev => prev + 1)
                    setAutoAdvance(false)
                  }}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white flex items-center space-x-2"
                >
                  <span>Next Chapter</span>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>

          {/* Easter Egg Stats */}
          {currentChapter === storyChapters.length - 1 && (
            <div className="mt-8 p-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg border border-purple-200 dark:border-purple-700">
              <h3 className="font-semibold text-center text-gray-900 dark:text-gray-100 mb-4">
                🎉 You Found Our Easter Egg!
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-purple-600">2,400+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Teachers Helped</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-pink-600">50,000+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Comments Generated</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-600">15,000+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Hours Saved</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">25</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Languages Supported</div>
                </div>
              </div>
              <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-4 italic">
                Every number represents a teacher who can now spend more time doing what they love: teaching.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

// Hidden trigger component for the Easter egg
interface ZazaOriginTriggerProps {
  trigger: React.ReactNode
  className?: string
}

export function ZazaOriginTrigger({ trigger, className = '' }: ZazaOriginTriggerProps) {
  const [showModal, setShowModal] = useState(false)
  const [clickCount, setClickCount] = useState(0)
  const [lastClickTime, setLastClickTime] = useState(0)

  const handleClick = () => {
    const now = Date.now()
    
    // Reset counter if more than 3 seconds between clicks
    if (now - lastClickTime > 3000) {
      setClickCount(1)
    } else {
      setClickCount(prev => prev + 1)
    }
    
    setLastClickTime(now)

    // Trigger Easter egg after 5 clicks within 3 seconds each
    if (clickCount >= 4) {
      setShowModal(true)
      setClickCount(0)
      
      // Track Easter egg discovery
      if (typeof window !== 'undefined' && (window as any).zazeAnalytics) {
        (window as any).zazeAnalytics.trackEasterEgg('zaza_origin_story')
      }
    }
  }

  return (
    <div className={className}>
      <div onClick={handleClick} className="cursor-pointer">
        {trigger}
      </div>
      
      <ZazaOriginModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
    </div>
  )
}

// Footer logo with Easter egg
export function ZazaFooterLogo({ className = '' }: { className?: string }) {
  return (
    <ZazaOriginTrigger
      trigger={
        <div className={`flex items-center space-x-2 ${className}`}>
          <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
            <Heart className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-gray-900 dark:text-gray-100">
            Zaza Promptly
          </span>
          <Badge className="text-xs bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300">
            Made with 💜
          </Badge>
        </div>
      }
    />
  )
}

// About link with Easter egg
export function AboutZazaLink({ className = '' }: { className?: string }) {
  return (
    <ZazaOriginTrigger
      trigger={
        <button className={`flex items-center space-x-1 text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors ${className}`}>
          <BookOpen className="w-4 h-4" />
          <span className="text-sm">About Zaza</span>
        </button>
      }
    />
  )
}

// Tooltip Easter egg for help sections
export function ZazaTooltipEasterEgg({ children, className = '' }: { children: React.ReactNode, className?: string }) {
  return (
    <ZazaOriginTrigger
      trigger={
        <div className={`inline-flex items-center space-x-1 ${className}`}>
          {children}
          <div className="w-2 h-2 bg-purple-400 rounded-full opacity-50 animate-pulse" />
        </div>
      }
    />
  )
}

// Random Easter egg messages for the modal
const EASTER_EGG_MESSAGES = [
  "🎉 You found our hidden story! Most people never discover this.",
  "👀 Curious minds make the best teachers - like you!",
  "💝 Five clicks? You're definitely teacher-level persistent!",
  "🕵️ Detective skills: activated. Teacher skills: always on.",
  "✨ This Easter egg is almost as rare as a quiet classroom!",
]

// Hook for programmatic Easter egg triggering
export function useZazaEasterEgg() {
  const [showModal, setShowModal] = useState(false)
  const [message] = useState(() => 
    EASTER_EGG_MESSAGES[Math.floor(Math.random() * EASTER_EGG_MESSAGES.length)]
  )

  const triggerEasterEgg = () => {
    setShowModal(true)
    
    // Track Easter egg
    if (typeof window !== 'undefined' && (window as any).zazeAnalytics) {
      (window as any).zazeAnalytics.trackEasterEgg('programmatic_trigger')
    }
  }

  return {
    showModal,
    setShowModal,
    triggerEasterEgg,
    message,
    EasterEggModal: () => (
      <ZazaOriginModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
    )
  }
}

// Integration example component
export function ZazaEasterEggShowcase() {
  const { showModal, setShowModal, triggerEasterEgg, EasterEggModal } = useZazaEasterEgg()

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Zaza Easter Eggs
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Hidden throughout the app are special ways to discover Zaza's heartfelt origin story
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <h3 className="font-semibold">Footer Logo (5 clicks)</h3>
          </CardHeader>
          <CardContent>
            <ZazaFooterLogo />
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Click the Zaza logo 5 times quickly to unlock the story
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h3 className="font-semibold">About Link</h3>
          </CardHeader>
          <CardContent>
            <AboutZazaLink />
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              The "About Zaza" link is also a secret trigger
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h3 className="font-semibold">Tooltip Hints</h3>
          </CardHeader>
          <CardContent>
            <ZazaTooltipEasterEgg>
              <span>Look for tiny purple dots</span>
            </ZazaTooltipEasterEgg>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Small purple dots appear near help elements
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h3 className="font-semibold">Direct Trigger</h3>
          </CardHeader>
          <CardContent>
            <Button onClick={triggerEasterEgg} variant="outline">
              <Gift className="w-4 h-4 mr-2" />
              Show Origin Story
            </Button>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              For testing purposes
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-6 border border-purple-200 dark:border-purple-700">
        <div className="flex items-start space-x-3">
          <Sparkles className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-purple-900 dark:text-purple-100 mb-2">
              Why Easter Eggs Matter
            </h3>
            <p className="text-purple-700 dark:text-purple-300 text-sm leading-relaxed">
              Teachers are naturally curious and love discovering hidden gems. These Easter eggs create 
              moments of delight and help users feel more connected to Zaza's mission. They transform 
              a simple AI tool into a brand with heart and personality.
            </p>
          </div>
        </div>
      </div>

      <EasterEggModal />
    </div>
  )
}