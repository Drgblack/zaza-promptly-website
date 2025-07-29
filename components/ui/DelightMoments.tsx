'use client'

import { useState, useEffect, useRef } from 'react'
import { Sparkles, Star, Award, Trophy, Heart, Coffee, BookOpen, Smile } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

// Zaza's inspiring teacher quotes
const TEACHER_JOY_QUOTES = [
  {
    quote: "Every child you teach is tomorrow's hope. You're not just teaching subjects—you're shaping futures.",
    author: "Zaza's Heart",
    emoji: "💝"
  },
  {
    quote: "In a world of endless demands, remember: your patience today becomes a child's confidence tomorrow.",
    author: "The Teacher's Wisdom",
    emoji: "🌟"
  },
  {
    quote: "You plant seeds of knowledge that will bloom long after your students leave your classroom.",
    author: "Garden of Learning",
    emoji: "🌱"
  },
  {
    quote: "Behind every successful student is a teacher who believed in them—especially when they couldn't believe in themselves.",
    author: "Belief in Action",
    emoji: "✨"
  },
  {
    quote: "Teaching is the profession that creates all other professions. You're the architect of dreams.",
    author: "Dream Builder",
    emoji: "🏗️"
  },
  {
    quote: "Every lesson plan you create, every moment you invest, ripples through generations. You matter infinitely.",
    author: "Ripple Effect",
    emoji: "🌊"
  },
  {
    quote: "When you light the spark of curiosity in a child, you give them a gift that lasts forever.",
    author: "Spark Keeper",
    emoji: "🔥"
  },
  {
    quote: "Your classroom is a sanctuary where minds grow, hearts heal, and futures take shape.",
    author: "Sacred Space",
    emoji: "🏛️"
  },
  {
    quote: "You don't just teach curriculum—you teach children to think, to question, to dream bigger.",
    author: "Beyond Books",
    emoji: "🚀"
  },
  {
    quote: "In moments of doubt, remember: you've already changed more lives than you'll ever know.",
    author: "Hidden Impact",
    emoji: "💫"
  }
]

// Confetti particle component
interface ConfettiParticle {
  id: number
  x: number
  y: number
  color: string
  size: number
  velocity: { x: number; y: number }
  rotation: number
  rotationSpeed: number
}

interface ConfettiAnimationProps {
  isActive: boolean
  onComplete?: () => void
  duration?: number
  particleCount?: number
  className?: string
}

export function ConfettiAnimation({ 
  isActive, 
  onComplete, 
  duration = 3000, 
  particleCount = 50,
  className = '' 
}: ConfettiAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const particlesRef = useRef<ConfettiParticle[]>([])
  const startTimeRef = useRef<number>()

  const colors = ['#8B5CF6', '#EC4899', '#10B981', '#F59E0B', '#EF4444', '#3B82F6']

  useEffect(() => {
    if (!isActive) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    // Create particles
    particlesRef.current = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * canvas.width,
      y: -10,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 8 + 4,
      velocity: {
        x: (Math.random() - 0.5) * 6,
        y: Math.random() * 3 + 2
      },
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 10
    }))

    startTimeRef.current = Date.now()

    const animate = () => {
      if (!ctx || !canvas) return

      const now = Date.now()
      const elapsed = now - (startTimeRef.current || now)

      if (elapsed > duration) {
        onComplete?.()
        return
      }

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      particlesRef.current.forEach(particle => {
        // Update position
        particle.x += particle.velocity.x
        particle.y += particle.velocity.y
        particle.rotation += particle.rotationSpeed

        // Add gravity
        particle.velocity.y += 0.1

        // Draw particle
        ctx.save()
        ctx.translate(particle.x, particle.y)
        ctx.rotate((particle.rotation * Math.PI) / 180)
        ctx.fillStyle = particle.color
        ctx.fillRect(-particle.size / 2, -particle.size / 2, particle.size, particle.size)
        ctx.restore()
      })

      // Remove particles that are off screen
      particlesRef.current = particlesRef.current.filter(
        particle => particle.y < canvas.height + 100 && 
                   particle.x > -100 && 
                   particle.x < canvas.width + 100
      )

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isActive, duration, particleCount, onComplete])

  if (!isActive) return null

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-50 ${className}`}
      style={{ zIndex: 9999 }}
    />
  )
}

// Teacher joy quote component
interface TeacherJoyQuoteProps {
  isVisible: boolean
  onClose?: () => void
  autoHide?: boolean
  duration?: number
  className?: string
}

export function TeacherJoyQuote({ 
  isVisible, 
  onClose, 
  autoHide = true, 
  duration = 5000,
  className = '' 
}: TeacherJoyQuoteProps) {
  const [currentQuote, setCurrentQuote] = useState(() => 
    TEACHER_JOY_QUOTES[Math.floor(Math.random() * TEACHER_JOY_QUOTES.length)]
  )

  useEffect(() => {
    if (isVisible && autoHide) {
      const timer = setTimeout(() => {
        onClose?.()
      }, duration)

      return () => clearTimeout(timer)
    }
  }, [isVisible, autoHide, duration, onClose])

  useEffect(() => {
    if (isVisible) {
      setCurrentQuote(TEACHER_JOY_QUOTES[Math.floor(Math.random() * TEACHER_JOY_QUOTES.length)])
    }
  }, [isVisible])

  if (!isVisible) return null

  return (
    <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-40 ${className}`}>
      <Card className="max-w-lg transform animate-in fade-in zoom-in duration-500 shadow-2xl">
        <CardContent className="p-8 text-center">
          <div className="text-4xl mb-4">{currentQuote.emoji}</div>
          
          <blockquote className="text-lg text-gray-700 dark:text-gray-300 mb-4 italic leading-relaxed">
            "{currentQuote.quote}"
          </blockquote>
          
          <div className="flex items-center justify-center space-x-2 mb-6">
            <Heart className="w-4 h-4 text-pink-500" />
            <cite className="text-sm text-purple-600 dark:text-purple-400 font-medium">
              {currentQuote.author}
            </cite>
          </div>
          
          <div className="flex items-center justify-center space-x-4">
            <Badge className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 border-purple-200">
              <Sparkles className="w-3 h-3 mr-1" />
              You're Amazing
            </Badge>
            
            {onClose && (
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-sm underline"
              >
                Continue Teaching
              </button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Streak badge component
interface StreakBadgeProps {
  days: number
  isVisible: boolean
  onClose?: () => void
  className?: string
}

export function StreakBadge({ days, isVisible, onClose, className = '' }: StreakBadgeProps) {
  const getStreakMessage = (days: number) => {
    if (days === 3) return { message: "3-Day Teaching Streak!", icon: <Star className="w-5 h-5" />, color: "from-yellow-400 to-orange-500" }
    if (days === 7) return { message: "Week-Long Wonder!", icon: <Award className="w-5 h-5" />, color: "from-green-400 to-emerald-500" }
    if (days === 14) return { message: "Fortnight Force!", icon: <Trophy className="w-5 h-5" />, color: "from-blue-400 to-cyan-500" }
    if (days === 30) return { message: "Monthly Marvel!", icon: <Trophy className="w-5 h-5" />, color: "from-purple-400 to-pink-500" }
    return { message: `${days}-Day Streak!`, icon: <Star className="w-5 h-5" />, color: "from-purple-400 to-pink-500" }
  }

  const streak = getStreakMessage(days)

  if (!isVisible) return null

  return (
    <div className={`fixed top-4 right-4 z-50 animate-in slide-in-from-right duration-500 ${className}`}>
      <Card className="shadow-xl border-2 border-yellow-300 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20">
        <CardContent className="p-4">
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 bg-gradient-to-r ${streak.color} rounded-full flex items-center justify-center text-white`}>
              {streak.icon}
            </div>
            <div>
              <h3 className="font-bold text-gray-900 dark:text-gray-100">
                {streak.message}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Your dedication is inspiring! 🌟
              </p>
            </div>
            {onClose && (
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
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

// Success celebration component that combines confetti, quote, and streak
interface SuccessCelebrationProps {
  isActive: boolean
  onComplete?: () => void
  showQuote?: boolean
  streakDays?: number
  celebrationType?: 'comment' | 'email' | 'template' | 'general'
  className?: string
}

export function SuccessCelebration({ 
  isActive, 
  onComplete,
  showQuote = true,
  streakDays,
  celebrationType = 'general',
  className = '' 
}: SuccessCelebrationProps) {
  const [showConfetti, setShowConfetti] = useState(false)
  const [showQuoteModal, setShowQuoteModal] = useState(false)
  const [showStreakBadge, setShowStreakBadge] = useState(false)

  useEffect(() => {
    if (isActive) {
      // Start confetti immediately
      setShowConfetti(true)
      
      // Show quote after confetti starts
      if (showQuote) {
        setTimeout(() => setShowQuoteModal(true), 1000)
      }
      
      // Show streak badge if applicable
      if (streakDays && streakDays >= 3) {
        setTimeout(() => setShowStreakBadge(true), 2000)
      }
    }
  }, [isActive, showQuote, streakDays])

  const handleConfettiComplete = () => {
    setShowConfetti(false)
  }

  const handleQuoteClose = () => {
    setShowQuoteModal(false)
    // Check if we should show streak badge next
    if (!streakDays || streakDays < 3) {
      onComplete?.()
    }
  }

  const handleStreakClose = () => {
    setShowStreakBadge(false)
    onComplete?.()
  }

  if (!isActive) return null

  return (
    <div className={className}>
      <ConfettiAnimation
        isActive={showConfetti}
        onComplete={handleConfettiComplete}
        duration={2500}
        particleCount={60}
      />
      
      <TeacherJoyQuote
        isVisible={showQuoteModal}
        onClose={handleQuoteClose}
        duration={6000}
      />
      
      {streakDays && streakDays >= 3 && (
        <StreakBadge
          days={streakDays}
          isVisible={showStreakBadge}
          onClose={handleStreakClose}
        />
      )}
    </div>
  )
}

// Hook to manage delight moments
export function useDelightMoments() {
  const [isActive, setIsActive] = useState(false)
  const [celebrationProps, setCelebrationProps] = useState<Partial<SuccessCelebrationProps>>({})

  const triggerDelight = (props: Partial<SuccessCelebrationProps> = {}) => {
    setCelebrationProps(props)
    setIsActive(true)
  }

  const completeCelebration = () => {
    setIsActive(false)
    setCelebrationProps({})

    // Track completion
    if (typeof window !== 'undefined' && (window as any).zazeAnalytics) {
      (window as any).zazeAnalytics.trackFeatureUse('delight_moment_completed')
    }
  }

  return {
    isActive,
    celebrationProps,
    triggerDelight,
    completeCelebration
  }
}

// Quick trigger functions for common celebrations
export const delightTriggers = {
  commentGenerated: (streakDays?: number) => {
    if (typeof window !== 'undefined' && (window as any).zazaDelightTrigger) {
      (window as any).zazaDelightTrigger({
        celebrationType: 'comment',
        showQuote: true,
        streakDays
      })
    }
  },

  emailCreated: (streakDays?: number) => {
    if (typeof window !== 'undefined' && (window as any).zazaDelightTrigger) {
      (window as any).zazaDelightTrigger({
        celebrationType: 'email',
        showQuote: Math.random() > 0.5, // 50% chance
        streakDays
      })
    }
  },

  templateUsed: () => {
    if (typeof window !== 'undefined' && (window as any).zazaDelightTrigger) {
      (window as any).zazaDelightTrigger({
        celebrationType: 'template',
        showQuote: false, // Just confetti for templates
      })
    }
  }
}

// Main delight wrapper component
interface DelightWrapperProps {
  children: React.ReactNode
  className?: string
}

export function DelightWrapper({ children, className = '' }: DelightWrapperProps) {
  const { isActive, celebrationProps, triggerDelight, completeCelebration } = useDelightMoments()

  // Expose trigger globally for easy integration
  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).zazaDelightTrigger = triggerDelight
    }

    return () => {
      if (typeof window !== 'undefined') {
        delete (window as any).zazaDelightTrigger
      }
    }
  }, [triggerDelight])

  return (
    <div className={className}>
      {children}
      <SuccessCelebration
        isActive={isActive}
        onComplete={completeCelebration}
        {...celebrationProps}
      />
    </div>
  )
}