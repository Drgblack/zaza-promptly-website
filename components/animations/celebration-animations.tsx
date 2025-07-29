"use client"

import { useState, useEffect, useRef } from 'react'
import { 
  CheckCircle2, 
  Sparkles, 
  Gift, 
  Download,
  Share2,
  Users,
  Heart,
  Star,
  Trophy,
  Zap
} from 'lucide-react'

interface CelebrationAnimationProps {
  trigger: boolean
  type?: 'download' | 'signup' | 'share' | 'feedback' | 'referral' | 'success'
  message?: string
  duration?: number
  intensity?: 'subtle' | 'moderate' | 'intense'
  onComplete?: () => void
  className?: string
}

export function CelebrationAnimation({
  trigger,
  type = 'success',
  message,
  duration = 3000,
  intensity = 'moderate',
  onComplete,
  className = ''
}: CelebrationAnimationProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [particles, setParticles] = useState<Array<{
    id: number
    x: number
    y: number
    vx: number
    vy: number
    color: string
    size: number
    rotation: number
    rotationSpeed: number
    opacity: number
  }>>([])
  const animationRef = useRef<HTMLDivElement>(null)
  const particlesRef = useRef<number[]>([])

  useEffect(() => {
    if (trigger) {
      startCelebration()
    }
  }, [trigger])

  const startCelebration = () => {
    setIsVisible(true)
    
    // Create particles based on intensity
    const particleCount = intensity === 'subtle' ? 15 : intensity === 'moderate' ? 25 : 40
    createParticles(particleCount)

    // Auto-hide after duration
    setTimeout(() => {
      setIsVisible(false)
      setParticles([])
      if (onComplete) {
        onComplete()
      }
    }, duration)
  }

  const createParticles = (count: number) => {
    const newParticles = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: window.innerHeight,
      vx: (Math.random() - 0.5) * 10,
      vy: -Math.random() * 15 - 5,
      color: getRandomColor(type),
      size: Math.random() * 8 + 4,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 10,
      opacity: 1
    }))
    
    setParticles(newParticles)
    animateParticles(newParticles)
  }

  const animateParticles = (initialParticles: typeof particles) => {
    let animationFrame: number
    let startTime = Date.now()
    
    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = elapsed / duration
      
      if (progress >= 1) {
        return
      }
      
      setParticles(prev => prev.map(particle => ({
        ...particle,
        x: particle.x + particle.vx,
        y: particle.y + particle.vy,
        vy: particle.vy + 0.5, // gravity
        rotation: particle.rotation + particle.rotationSpeed,
        opacity: Math.max(0, 1 - progress)
      })))
      
      animationFrame = requestAnimationFrame(animate)
    }
    
    animationFrame = requestAnimationFrame(animate)
    
    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }

  const getRandomColor = (animationType: string): string => {
    const colorSets = {
      download: ['#3b82f6', '#1d4ed8', '#60a5fa'],
      signup: ['#10b981', '#059669', '#34d399'],
      share: ['#8b5cf6', '#7c3aed', '#a78bfa'],
      feedback: ['#f59e0b', '#d97706', '#fbbf24'],
      referral: ['#ef4444', '#dc2626', '#f87171'],
      success: ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b']
    }
    
    const colors = colorSets[animationType as keyof typeof colorSets] || colorSets.success
    return colors[Math.floor(Math.random() * colors.length)]
  }

  const getIcon = () => {
    const icons = {
      download: Download,
      signup: Users,
      share: Share2,
      feedback: Heart,
      referral: Gift,
      success: CheckCircle2
    }
    
    const IconComponent = icons[type] || CheckCircle2
    return <IconComponent className="w-8 h-8" />
  }

  const getMessage = () => {
    if (message) return message
    
    const messages = {
      download: "Resource Downloaded! 🎉",
      signup: "Welcome to the Community! 👋",
      share: "Thanks for Sharing! 💙",
      feedback: "Feedback Received! 🙏",
      referral: "Referral Successful! 🎁",
      success: "Success! ✨"
    }
    
    return messages[type] || "Success! ✨"
  }

  if (!isVisible) return null

  return (
    <div 
      ref={animationRef}
      className={`fixed inset-0 pointer-events-none z-50 ${className}`}
    >
      {/* Particles */}
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute w-2 h-2 pointer-events-none"
          style={{
            left: particle.x,
            top: particle.y,
            backgroundColor: particle.color,
            width: particle.size,
            height: particle.size,
            borderRadius: '50%',
            transform: `rotate(${particle.rotation}deg)`,
            opacity: particle.opacity,
            transition: 'opacity 0.1s ease-out'
          }}
        />
      ))}
      
      {/* Central celebration message */}
      <div className="flex items-center justify-center h-full">
        <div className="bg-white rounded-lg shadow-2xl p-8 max-w-sm mx-4 text-center animate-in zoom-in-95 duration-500">
          <div className="mb-4">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white animate-bounce">
              {getIcon()}
            </div>
          </div>
          
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            {getMessage()}
          </h3>
          
          <div className="flex justify-center">
            <Sparkles className="w-6 h-6 text-yellow-500 animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  )
}

// Confetti animation component
export function ConfettiCelebration({
  trigger,
  duration = 4000,
  intensity = 'moderate',
  colors = ['#3b82f6', '#10b981', '#8b5cf6', '#f59e0b', '#ef4444'],
  onComplete
}: {
  trigger: boolean
  duration?: number
  intensity?: 'subtle' | 'moderate' | 'intense'
  colors?: string[]
  onComplete?: () => void
}) {
  const [confetti, setConfetti] = useState<Array<{
    id: number
    x: number
    y: number
    vx: number
    vy: number
    color: string
    width: number
    height: number
    rotation: number
    rotationSpeed: number
    opacity: number
  }>>([])
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    if (trigger) {
      startConfetti()
    }
  }, [trigger])

  const startConfetti = () => {
    setIsActive(true)
    
    const confettiCount = intensity === 'subtle' ? 30 : intensity === 'moderate' ? 60 : 100
    const newConfetti = Array.from({ length: confettiCount }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: -10,
      vx: (Math.random() - 0.5) * 8,
      vy: Math.random() * 5 + 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      width: Math.random() * 8 + 4,
      height: Math.random() * 4 + 2,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 15,
      opacity: 1
    }))
    
    setConfetti(newConfetti)
    animateConfetti(newConfetti)
    
    setTimeout(() => {
      setIsActive(false)
      setConfetti([])
      if (onComplete) {
        onComplete()
      }
    }, duration)
  }

  const animateConfetti = (initialConfetti: typeof confetti) => {
    let animationFrame: number
    let startTime = Date.now()
    
    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = elapsed / duration
      
      if (progress >= 1) {
        return
      }
      
      setConfetti(prev => prev.map(piece => ({
        ...piece,
        x: piece.x + piece.vx,
        y: piece.y + piece.vy,
        vy: piece.vy + 0.3, // gravity
        vx: piece.vx * 0.99, // air resistance
        rotation: piece.rotation + piece.rotationSpeed,
        opacity: Math.max(0, 1 - Math.max(0, progress - 0.7) / 0.3)
      })))
      
      animationFrame = requestAnimationFrame(animate)
    }
    
    animationFrame = requestAnimationFrame(animate)
  }

  if (!isActive) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-40">
      {confetti.map(piece => (
        <div
          key={piece.id}
          className="absolute"
          style={{
            left: piece.x,
            top: piece.y,
            width: piece.width,
            height: piece.height,
            backgroundColor: piece.color,
            transform: `rotate(${piece.rotation}deg)`,
            opacity: piece.opacity
          }}
        />
      ))}
    </div>
  )
}

// Success pulse animation
export function SuccessPulse({
  trigger,
  message = "Success!",
  icon,
  color = "green",
  duration = 2000,
  onComplete
}: {
  trigger: boolean
  message?: string
  icon?: React.ReactNode
  color?: string
  duration?: number
  onComplete?: () => void
}) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (trigger) {
      setIsVisible(true)
      setTimeout(() => {
        setIsVisible(false)
        if (onComplete) {
          onComplete()
        }
      }, duration)
    }
  }, [trigger, duration, onComplete])

  if (!isVisible) return null

  const colorClasses = {
    green: 'from-green-400 to-green-600',
    blue: 'from-blue-400 to-blue-600',
    purple: 'from-purple-400 to-purple-600',
    yellow: 'from-yellow-400 to-yellow-600',
    red: 'from-red-400 to-red-600'
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-50">
      <div className="relative">
        {/* Pulse rings */}
        <div className={`absolute inset-0 bg-gradient-to-r ${colorClasses[color as keyof typeof colorClasses]} rounded-full animate-ping opacity-75`} />
        <div className={`absolute inset-0 bg-gradient-to-r ${colorClasses[color as keyof typeof colorClasses]} rounded-full animate-ping opacity-50 animation-delay-200`} />
        
        {/* Main content */}
        <div className={`relative bg-gradient-to-r ${colorClasses[color as keyof typeof colorClasses]} text-white rounded-full p-6 shadow-2xl animate-in zoom-in-95 duration-300`}>
          <div className="flex flex-col items-center">
            {icon || <CheckCircle2 className="w-12 h-12 mb-2" />}
            <span className="font-bold text-lg">{message}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// Achievement unlock animation
export function AchievementUnlock({
  trigger,
  title,
  description,
  icon,
  duration = 4000,
  onComplete
}: {
  trigger: boolean
  title: string
  description?: string
  icon?: React.ReactNode
  duration?: number
  onComplete?: () => void
}) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (trigger) {
      setIsVisible(true)
      setTimeout(() => {
        setIsVisible(false)
        if (onComplete) {
          onComplete()
        }
      }, duration)
    }
  }, [trigger, duration, onComplete])

  if (!isVisible) return null

  return (
    <>
      <ConfettiCelebration 
        trigger={isVisible} 
        duration={duration}
        intensity="moderate"
      />
      
      <div className="fixed top-8 right-8 pointer-events-none z-50 animate-in slide-in-from-right duration-500">
        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-lg shadow-2xl p-6 max-w-sm">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                {icon || <Trophy className="w-6 h-6" />}
              </div>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-1">🎉 Achievement Unlocked!</h3>
              <h4 className="font-semibold mb-1">{title}</h4>
              {description && (
                <p className="text-sm opacity-90">{description}</p>
              )}
            </div>
          </div>
          
          <div className="flex justify-center mt-4">
            <div className="flex space-x-1">
              {[1, 2, 3].map(i => (
                <Star key={i} className={`w-4 h-4 animate-pulse`} style={{ animationDelay: `${i * 200}ms` }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

// Floating hearts animation
export function FloatingHearts({
  trigger,
  count = 8,
  duration = 3000,
  color = "#ef4444"
}: {
  trigger: boolean
  count?: number
  duration?: number
  color?: string
}) {
  const [hearts, setHearts] = useState<Array<{
    id: number
    x: number
    y: number
    delay: number
  }>>([])
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    if (trigger) {
      setIsActive(true)
      
      const newHearts = Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * window.innerWidth,
        y: window.innerHeight + 50,
        delay: i * 200
      }))
      
      setHearts(newHearts)
      
      setTimeout(() => {
        setIsActive(false)
        setHearts([])
      }, duration)
    }
  }, [trigger, count, duration])

  if (!isActive) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-30">
      {hearts.map(heart => (
        <div
          key={heart.id}
          className="absolute animate-float-up"
          style={{
            left: heart.x,
            top: heart.y,
            animationDelay: `${heart.delay}ms`,
            animationDuration: '3s',
            animationTimingFunction: 'ease-out'
          }}
        >
          <Heart 
            className="w-6 h-6" 
            style={{ color }} 
            fill="currentColor"
          />
        </div>
      ))}
    </div>
  )
}

// Custom CSS for animations (add to globals.css)
export const celebrationStyles = `
@keyframes float-up {
  0% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
  50% {
    opacity: 1;
    transform: translateY(-100px) scale(1.2);
  }
  100% {
    opacity: 0;
    transform: translateY(-200px) scale(0.8);
  }
}

.animate-float-up {
  animation: float-up 3s ease-out forwards;
}

.animation-delay-200 {
  animation-delay: 200ms;
}
`