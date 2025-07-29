'use client'

import { useState, useEffect, useRef } from 'react'
import { HelpCircle, MessageCircle, Sparkles, Heart, Coffee, BookOpen, Lightbulb, User, Volume2 } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

// Zara's personality and guidance database
const ZARA_GUIDANCE = {
  tone: {
    gentle: {
      text: "Gentle is perfect for sharing sensitive news or addressing concerns. It shows you care while keeping things calm.",
      personality: "Think of it as your 'warm hug' tone - supportive but professional. Parents really appreciate this approach! 💙"
    },
    encouraging: {
      text: "Encouraging tone celebrates progress and builds confidence. Great for highlighting improvements and positive moments.",
      personality: "This is your 'cheerleader' voice! It helps students feel proud of their growth and motivates them to keep trying. ✨"
    },
    professional: {
      text: "Professional tone is ideal for formal communications, meetings, or administrative matters. Clear and respectful.",
      personality: "Your 'business suit' voice - polished and confident. Perfect when you need that extra touch of authority. 📋"
    },
    friendly: {
      text: "Friendly tone creates warm connections and builds rapport. Perfect for general updates and positive news.",
      personality: "This is your 'coffee chat' voice - approachable and warm. It makes parents feel like they're talking to a trusted friend! ☕"
    },
    concerned: {
      text: "Concerned tone addresses issues while maintaining care and support. Use when discussing challenges or areas for improvement.",
      personality: "Your 'caring mentor' voice - honest but supportive. It shows you're invested in the student's success. 🤝"
    }
  },
  
  features: {
    translation: {
      text: "Translation helps you connect with all families in their native language. Click to choose from 50+ languages.",
      personality: "Language barriers shouldn't stop meaningful connections! I love helping you reach every family's heart. 🌍"
    },
    save: {
      text: "Save your comments to reuse and modify later. Build your personal library of go-to phrases and responses.",
      personality: "Think of this as your teaching toolkit! Save the gems for next time - your future self will thank you. 💎"
    },
    export: {
      text: "Export comments to PDF or Word for reports, portfolios, or your records. Keep professional documentation organized.",
      personality: "Documentation made easy! Whether it's for portfolios or just keeping track, I've got your back. 📄"
    },
    length: {
      text: "Adjust comment length from brief notes to detailed explanations. Match your school's requirements perfectly.",
      personality: "Some days you need a novel, some days a haiku! I adapt to whatever your situation needs. 📏"
    }
  },

  encouragement: {
    firstTime: [
      "Welcome to your AI teaching buddy! I'm here to make parent communication feel less overwhelming. You've got this! 🌟",
      "New to AI? No worries! I'm designed specifically for educators like you. Let's create something amazing together! ✨",
      "Taking the leap into AI assistance? You're already ahead of the curve! Let me help you save time and stress. 💪"
    ],
    
    struggling: [
      "Having trouble finding the right words? That's totally normal! Teaching is complex, and I'm here to help you express it beautifully. 💙",
      "Feeling stuck? Even the best teachers have those moments! Let's work through this together - you know your students best. 🤝",
      "Writer's block happens to everyone! Give me some context about your student, and I'll help you find the perfect words. ✍️"
    ],
    
    celebration: [
      "Look at you, making parent communication look effortless! Your students are lucky to have such a dedicated teacher. 🎉",
      "Another thoughtful comment created! You're building bridges between home and school, one message at a time. 🌉",
      "Your commitment to clear communication shows in everything you do. Keep being the amazing educator you are! ⭐"
    ]
  }
}

interface ZaraTooltipProps {
  content: keyof typeof ZARA_GUIDANCE
  subcontent?: string
  trigger: React.ReactNode
  position?: 'top' | 'bottom' | 'left' | 'right'
  showPersonality?: boolean
  className?: string
}

export function ZaraTooltip({ 
  content, 
  subcontent, 
  trigger, 
  position = 'top',
  showPersonality = true,
  className = '' 
}: ZaraTooltipProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout>()

  const guidance = subcontent 
    ? ZARA_GUIDANCE[content]?.[subcontent as keyof typeof ZARA_GUIDANCE[typeof content]]
    : ZARA_GUIDANCE[content]

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setIsHovered(true)
    timeoutRef.current = setTimeout(() => setIsVisible(true), 500)
  }

  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setIsHovered(false)
    timeoutRef.current = setTimeout(() => setIsVisible(false), 300)
  }

  const positionClasses = {
    top: 'bottom-full left-1/2 transform -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 transform -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 transform -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 transform -translate-y-1/2 ml-2'
  }

  const arrowClasses = {
    top: 'top-full left-1/2 transform -translate-x-1/2 border-t-gray-800 border-t-8 border-x-8 border-x-transparent',
    bottom: 'bottom-full left-1/2 transform -translate-x-1/2 border-b-gray-800 border-b-8 border-x-8 border-x-transparent',
    left: 'left-full top-1/2 transform -translate-y-1/2 border-l-gray-800 border-l-8 border-y-8 border-y-transparent',
    right: 'right-full top-1/2 transform -translate-y-1/2 border-r-gray-800 border-r-8 border-y-8 border-y-transparent'
  }

  if (!guidance) return <>{trigger}</>

  return (
    <div 
      className={`relative inline-block ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={`flex items-center ${isHovered ? 'text-purple-600' : ''} transition-colors cursor-help`}>
        {trigger}
        <HelpCircle className={`w-3 h-3 ml-1 opacity-60 ${isHovered ? 'opacity-100' : ''} transition-opacity`} />
      </div>
      
      {isVisible && (
        <div className={`absolute z-50 ${positionClasses[position]} animate-in fade-in zoom-in duration-200`}>
          <Card className="max-w-xs shadow-xl border-purple-200 bg-gray-800 text-white">
            <CardContent className="p-4">
              {/* Zara's avatar */}
              <div className="flex items-center space-x-2 mb-3">
                <div className="w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                  <User className="w-3 h-3 text-white" />
                </div>
                <Badge className="text-xs bg-purple-100 text-purple-800">
                  Ask Zara
                </Badge>
              </div>
              
              {/* Main guidance */}
              <p className="text-sm text-gray-200 mb-3 leading-relaxed">
                {(guidance as any)?.text}
              </p>
              
              {/* Personality touch */}
              {showPersonality && (guidance as any)?.personality && (
                <div className="border-t border-gray-600 pt-3">
                  <div className="flex items-start space-x-2">
                    <Heart className="w-3 h-3 text-pink-400 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-pink-200 italic leading-relaxed">
                      {(guidance as any)?.personality}
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
          
          {/* Tooltip arrow */}
          <div className={`absolute w-0 h-0 ${arrowClasses[position]}`} />
        </div>
      )}
    </div>
  )
}

interface ZaraEncouragementProps {
  type: 'firstTime' | 'struggling' | 'celebration'
  isVisible: boolean
  onClose?: () => void
  autoHide?: boolean
  duration?: number
  className?: string
}

export function ZaraEncouragement({ 
  type, 
  isVisible, 
  onClose,
  autoHide = true,
  duration = 4000,
  className = '' 
}: ZaraEncouragementProps) {
  const [currentMessage, setCurrentMessage] = useState('')

  useEffect(() => {
    if (isVisible) {
      const messages = ZARA_GUIDANCE.encouragement[type]
      setCurrentMessage(messages[Math.floor(Math.random() * messages.length)])
      
      if (autoHide) {
        const timer = setTimeout(() => {
          onClose?.()
        }, duration)
        
        return () => clearTimeout(timer)
      }
    }
  }, [isVisible, type, autoHide, duration, onClose])

  if (!isVisible) return null

  const getIcon = () => {
    switch (type) {
      case 'firstTime': return <Sparkles className="w-5 h-5 text-purple-500" />
      case 'struggling': return <Heart className="w-5 h-5 text-pink-500" />
      case 'celebration': return <Coffee className="w-5 h-5 text-amber-500" />
    }
  }

  const getColor = () => {
    switch (type) {
      case 'firstTime': return 'from-purple-50 to-blue-50 border-purple-200'
      case 'struggling': return 'from-pink-50 to-rose-50 border-pink-200'
      case 'celebration': return 'from-amber-50 to-yellow-50 border-amber-200'
    }
  }

  return (
    <div className={`fixed bottom-4 right-4 z-50 animate-in slide-in-from-bottom duration-500 ${className}`}>
      <Card className={`max-w-sm shadow-xl bg-gradient-to-r ${getColor()}`}>
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center flex-shrink-0">
              <User className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <span className="font-medium text-gray-900">Zara</span>
                {getIcon()}
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">
                {currentMessage}
              </p>
            </div>
            {onClose && (
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 flex-shrink-0"
              >
                ×
              </button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

interface ZaraChatBubbleProps {
  message: string
  isVisible: boolean
  onClose?: () => void
  className?: string
}

export function ZaraChatBubble({ message, isVisible, onClose, className = '' }: ZaraChatBubbleProps) {
  if (!isVisible) return null

  return (
    <div className={`fixed bottom-20 right-4 z-50 animate-in slide-in-from-right duration-300 ${className}`}>
      <div className="max-w-xs">
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl rounded-br-sm p-4 shadow-lg">
          <div className="flex items-start space-x-2">
            <div className="w-6 h-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center flex-shrink-0">
              <User className="w-3 h-3" />
            </div>
            <div className="flex-1">
              <p className="text-sm leading-relaxed">
                {message}
              </p>
            </div>
            {onClose && (
              <button
                onClick={onClose}
                className="text-white text-opacity-70 hover:text-opacity-100 flex-shrink-0 text-lg leading-none"
              >
                ×
              </button>
            )}
          </div>
        </div>
        {/* Chat bubble tail */}
        <div className="absolute -bottom-2 right-4 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-pink-600" />
      </div>
    </div>
  )
}

// Contextual helper component that appears based on user behavior
interface ZaraContextHelperProps {
  context: 'tone-selection' | 'first-generation' | 'error-occurred' | 'empty-input'
  isVisible: boolean
  onClose?: () => void
  className?: string
}

export function ZaraContextHelper({ context, isVisible, onClose, className = '' }: ZaraContextHelperProps) {
  const contextMessages = {
    'tone-selection': "Not sure which tone to pick? Gentle works great for sensitive topics, while Encouraging is perfect for celebrating progress! 🎯",
    'first-generation': "First time generating a comment? I'll create something thoughtful based on what you tell me about your student. Just be yourself! ✨",
    'error-occurred': "Oops! Even AI has hiccups sometimes. Try rephrasing your request or checking your internet connection. I'm here to help! 💙",
    'empty-input': "I'd love to help, but I need a bit more context! Tell me about your student - their progress, challenges, or what you want to communicate. 📝"
  }

  return (
    <ZaraChatBubble
      message={contextMessages[context]}
      isVisible={isVisible}
      onClose={onClose}
      className={className}
    />
  )
}

// Main Zara assistant manager
interface ZaraAssistantProps {
  children: React.ReactNode
  className?: string
}

export function ZaraAssistant({ children, className = '' }: ZaraAssistantProps) {
  const [encouragementState, setEncouragementState] = useState<{
    type: 'firstTime' | 'struggling' | 'celebration' | null
    isVisible: boolean
  }>({ type: null, isVisible: false })

  const [contextHelper, setContextHelper] = useState<{
    context: ZaraContextHelperProps['context'] | null
    isVisible: boolean
  }>({ context: null, isVisible: false })

  // Expose Zara functions globally
  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).zaraAssistant = {
        showEncouragement: (type: 'firstTime' | 'struggling' | 'celebration') => {
          setEncouragementState({ type, isVisible: true })
        },
        showContextHelp: (context: ZaraContextHelperProps['context']) => {
          setContextHelper({ context, isVisible: true })
        },
        hideAll: () => {
          setEncouragementState({ type: null, isVisible: false })
          setContextHelper({ context: null, isVisible: false })
        }
      }
    }

    return () => {
      if (typeof window !== 'undefined') {
        delete (window as any).zaraAssistant
      }
    }
  }, [])

  return (
    <div className={className}>
      {children}
      
      {encouragementState.type && (
        <ZaraEncouragement
          type={encouragementState.type}
          isVisible={encouragementState.isVisible}
          onClose={() => setEncouragementState({ type: null, isVisible: false })}
        />
      )}
      
      {contextHelper.context && (
        <ZaraContextHelper
          context={contextHelper.context}
          isVisible={contextHelper.isVisible}
          onClose={() => setContextHelper({ context: null, isVisible: false })}
        />
      )}
    </div>
  )
}

// Utility functions for triggering Zara assistance
export const zaraHelpers = {
  // Show encouragement
  celebrate: () => {
    if (typeof window !== 'undefined' && (window as any).zaraAssistant) {
      (window as any).zaraAssistant.showEncouragement('celebration')
    }
  },
  
  welcomeNewUser: () => {
    if (typeof window !== 'undefined' && (window as any).zaraAssistant) {
      (window as any).zaraAssistant.showEncouragement('firstTime')
    }
  },
  
  helpStruggling: () => {
    if (typeof window !== 'undefined' && (window as any).zaraAssistant) {
      (window as any).zaraAssistant.showEncouragement('struggling')
    }
  },
  
  // Show contextual help
  helpWithTone: () => {
    if (typeof window !== 'undefined' && (window as any).zaraAssistant) {
      (window as any).zaraAssistant.showContextHelp('tone-selection')
    }
  },
  
  helpFirstTime: () => {
    if (typeof window !== 'undefined' && (window as any).zaraAssistant) {
      (window as any).zaraAssistant.showContextHelp('first-generation')
    }
  },
  
  helpWithError: () => {
    if (typeof window !== 'undefined' && (window as any).zaraAssistant) {
      (window as any).zaraAssistant.showContextHelp('error-occurred')
    }
  },
  
  helpEmptyInput: () => {
    if (typeof window !== 'undefined' && (window as any).zaraAssistant) {
      (window as any).zaraAssistant.showContextHelp('empty-input')
    }
  }
}