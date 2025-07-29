'use client'

import { useState, useEffect, useRef } from 'react'
import { Download, Heart, Star, Gift, Coffee, BookOpen, Sparkles, User, Calendar, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

// Inspirational teacher quotes for wallpapers
const TEACHER_WALLPAPER_QUOTES = [
  {
    quote: "Every child you teach is tomorrow's hope. You're shaping the future, one student at a time.",
    author: "Zaza's Heart",
    gradient: "from-purple-400 via-pink-400 to-purple-600"
  },
  {
    quote: "In a world of endless demands, remember: your patience today becomes a child's confidence tomorrow.",
    author: "The Teacher's Wisdom",
    gradient: "from-blue-400 via-cyan-400 to-blue-600"
  },
  {
    quote: "You plant seeds of knowledge that will bloom long after your students leave your classroom.",
    author: "Garden of Learning",
    gradient: "from-green-400 via-emerald-400 to-green-600"
  },
  {
    quote: "Teaching is the profession that creates all other professions. You're the architect of dreams.",
    author: "Dream Builder",
    gradient: "from-amber-400 via-orange-400 to-amber-600"
  },
  {
    quote: "Behind every successful student is a teacher who believed in them when they couldn't believe in themselves.",
    author: "Belief in Action",
    gradient: "from-rose-400 via-pink-400 to-rose-600"
  }
]

interface WelcomeCardProps {
  userName: string
  userEmail?: string
  milestone: 'signup' | 'first-comment' | 'first-week' | 'first-month'
  isVisible: boolean
  onClose?: () => void
  className?: string
}

export function WelcomeCard({ 
  userName, 
  userEmail, 
  milestone,
  isVisible, 
  onClose,
  className = '' 
}: WelcomeCardProps) {
  const [selectedQuote, setSelectedQuote] = useState(() => 
    TEACHER_WALLPAPER_QUOTES[Math.floor(Math.random() * TEACHER_WALLPAPER_QUOTES.length)]
  )
  const [downloadProgress, setDownloadProgress] = useState<'idle' | 'preparing' | 'ready'>('idle')
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const milestoneData = {
    signup: {
      title: `Welcome to Zaza, ${userName}! 🎉`,
      message: "You've just joined a community of amazing educators who are transforming parent communication with AI.",
      emoji: "🌟",
      color: "from-purple-500 to-pink-500",
      downloadText: "Welcome Gift"
    },
    'first-comment': {
      title: `Amazing First Comment, ${userName}! ✨`,
      message: "You just created your first AI-powered parent comment. This is the beginning of saving hours every week!",
      emoji: "🚀",
      color: "from-blue-500 to-cyan-500",
      downloadText: "Achievement Unlocked"
    },
    'first-week': {
      title: `One Week Strong, ${userName}! 💪`,
      message: "You've been using Zaza for a week! Your consistency in creating better parent communication is inspiring.",
      emoji: "⭐",
      color: "from-green-500 to-emerald-500",
      downloadText: "Week Warrior"
    },
    'first-month': {
      title: `Monthly Milestone, ${userName}! 🏆`,
      message: "A whole month of amazing parent communication! You're building stronger relationships one message at a time.",
      emoji: "👑",
      color: "from-amber-500 to-orange-500",
      downloadText: "Monthly Marvel"
    }
  }

  const current = milestoneData[milestone]

  const generateWallpaper = async (format: 'desktop' | 'mobile' | 'quote-card') => {
    setDownloadProgress('preparing')
    
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set dimensions based on format
    const dimensions = {
      desktop: { width: 1920, height: 1080 },
      mobile: { width: 1080, height: 1920 },
      'quote-card': { width: 800, height: 600 }
    }

    const { width, height } = dimensions[format]
    canvas.width = width
    canvas.height = height

    // Create gradient background
    const gradient = ctx.createLinearGradient(0, 0, width, height)
    if (selectedQuote.gradient.includes('purple')) {
      gradient.addColorStop(0, '#9333EA')
      gradient.addColorStop(0.5, '#EC4899')
      gradient.addColorStop(1, '#7C3AED')
    } else if (selectedQuote.gradient.includes('blue')) {
      gradient.addColorStop(0, '#3B82F6')
      gradient.addColorStop(0.5, '#06B6D4')
      gradient.addColorStop(1, '#2563EB')
    } else if (selectedQuote.gradient.includes('green')) {
      gradient.addColorStop(0, '#10B981')
      gradient.addColorStop(0.5, '#059669')
      gradient.addColorStop(1, '#047857')
    } else if (selectedQuote.gradient.includes('amber')) {
      gradient.addColorStop(0, '#F59E0B')
      gradient.addColorStop(0.5, '#F97316')
      gradient.addColorStop(1, '#EA580C')
    } else {
      gradient.addColorStop(0, '#F43F5E')
      gradient.addColorStop(0.5, '#EC4899')
      gradient.addColorStop(1, '#BE185D')
    }

    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, width, height)

    // Add subtle pattern overlay
    ctx.globalAlpha = 0.1
    for (let i = 0; i < width; i += 40) {
      for (let j = 0; j < height; j += 40) {
        ctx.fillStyle = '#FFFFFF'
        ctx.beginPath()
        ctx.arc(i, j, 2, 0, Math.PI * 2)
        ctx.fill()
      }
    }
    ctx.globalAlpha = 1

    // Add quote text
    ctx.fillStyle = '#FFFFFF'
    ctx.textAlign = 'center'
    
    // Adjust font sizes based on format
    const baseFontSize = format === 'mobile' ? 36 : format === 'desktop' ? 48 : 32
    const titleFontSize = format === 'mobile' ? 28 : format === 'desktop' ? 36 : 24
    
    ctx.font = `bold ${baseFontSize}px Inter, system-ui, sans-serif`
    
    // Word wrap for quote
    const words = selectedQuote.quote.split(' ')
    const maxWidth = width * 0.8
    const lineHeight = baseFontSize * 1.4
    let line = ''
    let y = height * 0.4
    
    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' '
      const metrics = ctx.measureText(testLine)
      const testWidth = metrics.width
      
      if (testWidth > maxWidth && n > 0) {
        ctx.fillText(line, width / 2, y)
        line = words[n] + ' '
        y += lineHeight
      } else {
        line = testLine
      }
    }
    ctx.fillText(line, width / 2, y)

    // Add author
    ctx.font = `${titleFontSize}px Inter, system-ui, sans-serif`
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)'
    ctx.fillText(` -  ${selectedQuote.author}`, width / 2, y + lineHeight * 2)

    // Add Zaza branding
    ctx.font = `${titleFontSize * 0.7}px Inter, system-ui, sans-serif`
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)'
    ctx.fillText('Zaza Promptly • AI for Educators', width / 2, height - 60)

    // Add personalization
    if (userName && milestone) {
      ctx.font = `bold ${titleFontSize}px Inter, system-ui, sans-serif`
      ctx.fillStyle = 'rgba(255, 255, 255, 0.95)'
      ctx.fillText(`${current.emoji} ${current.downloadText} • ${userName}`, width / 2, height - 100)
    }

    setDownloadProgress('ready')

    // Download the image
    const link = document.createElement('a')
    link.download = `zaza-${format}-wallpaper-${userName.toLowerCase().replace(/\s+/g, '-')}.png`
    link.href = canvas.toDataURL()
    link.click()

    // Track download
    if (typeof window !== 'undefined' && (window as any).zazeAnalytics) {
      (window as any).zazeAnalytics.trackFeatureUse(`wallpaper_download_${format}_${milestone}`)
    }

    setTimeout(() => setDownloadProgress('idle'), 1000)
  }

  const generateQuotePDF = async () => {
    // In a real app, you'd use a PDF library like jsPDF
    // For now, we'll simulate the download
    setDownloadProgress('preparing')
    
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Track download
    if (typeof window !== 'undefined' && (window as any).zazeAnalytics) {
      (window as any).zazeAnalytics.trackFeatureUse(`quote_pdf_download_${milestone}`)
    }
    
    setDownloadProgress('ready')
    
    // Simulate PDF download
    const pdfContent = `
Teacher Inspiration Collection
From Zaza Promptly

${selectedQuote.quote}
 -  ${selectedQuote.author}

Personal milestone: ${current.title}
${current.message}

Your journey as an educator matters. Every day, you're making a difference in young lives.

Keep shining, ${userName}! ✨

---
Generated with love by Zaza Promptly
AI-powered tools for amazing educators
    `
    
    const blob = new Blob([pdfContent], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `zaza-inspiration-${userName.toLowerCase().replace(/\s+/g, '-')}.txt`
    link.click()
    URL.revokeObjectURL(url)
    
    setTimeout(() => setDownloadProgress('idle'), 1000)
  }

  if (!isVisible) return null

  return (
    <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 ${className}`}>
      <Card className="w-full max-w-2xl bg-white dark:bg-gray-800 shadow-2xl overflow-hidden">
        {/* Header with gradient */}
        <div className={`bg-gradient-to-r ${current.color} p-8 text-white text-center relative overflow-hidden`}>
          {/* Decorative elements */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-4 left-4 w-8 h-8 border-2 border-white rounded-full" />
            <div className="absolute top-8 right-8 w-4 h-4 bg-white rounded-full" />
            <div className="absolute bottom-6 left-8 w-6 h-6 border-2 border-white rounded-full" />
            <div className="absolute bottom-4 right-6 w-3 h-3 bg-white rounded-full" />
          </div>
          
          <div className="relative z-10">
            <div className="text-6xl mb-4">{current.emoji}</div>
            <h1 className="text-3xl font-bold mb-3">{current.title}</h1>
            <p className="text-xl text-white/90 leading-relaxed max-w-lg mx-auto">
              {current.message}
            </p>
          </div>
        </div>

        <CardContent className="p-8">
          {/* Quote Preview */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4 text-center">
              Your Inspirational Quote
            </h2>
            <Card className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 border-0">
              <CardContent className="p-6 text-center">
                <blockquote className="text-lg text-gray-700 dark:text-gray-300 mb-4 italic leading-relaxed">
                  "{selectedQuote.quote}"
                </blockquote>
                <cite className="text-purple-600 dark:text-purple-400 font-medium">
                   -  {selectedQuote.author}
                </cite>
              </CardContent>
            </Card>
          </div>

          {/* Download Options */}
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Take Your Inspiration With You
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Download beautiful wallpapers and quotes to keep you motivated every day
              </p>
            </div>

            {/* Wallpaper Downloads */}
            <div>
              <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-3 flex items-center">
                <Star className="w-4 h-4 mr-2 text-amber-500" />
                Desktop & Mobile Wallpapers
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <Button
                  onClick={() => generateWallpaper('desktop')}
                  disabled={downloadProgress === 'preparing'}
                  variant="outline"
                  className="flex items-center justify-center space-x-2"
                >
                  {downloadProgress === 'preparing' ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-600" />
                  ) : (
                    <Download className="w-4 h-4" />
                  )}
                  <span>Desktop</span>
                </Button>
                
                <Button
                  onClick={() => generateWallpaper('mobile')}
                  disabled={downloadProgress === 'preparing'}
                  variant="outline"
                  className="flex items-center justify-center space-x-2"
                >
                  {downloadProgress === 'preparing' ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-600" />
                  ) : (
                    <Download className="w-4 h-4" />
                  )}
                  <span>Mobile</span>
                </Button>
                
                <Button
                  onClick={() => generateWallpaper('quote-card')}
                  disabled={downloadProgress === 'preparing'}
                  variant="outline"
                  className="flex items-center justify-center space-x-2"
                >
                  {downloadProgress === 'preparing' ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-600" />
                  ) : (
                    <Download className="w-4 h-4" />
                  )}
                  <span>Quote Card</span>
                </Button>
              </div>
            </div>

            {/* PDF Download */}
            <div>
              <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-3 flex items-center">
                <BookOpen className="w-4 h-4 mr-2 text-blue-500" />
                Inspiration Collection
              </h4>
              <Button
                onClick={generateQuotePDF}
                disabled={downloadProgress === 'preparing'}
                variant="outline"
                className="w-full flex items-center justify-center space-x-2"
              >
                {downloadProgress === 'preparing' ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-600" />
                ) : (
                  <Download className="w-4 h-4" />
                )}
                <span>Download Quote Collection (PDF)</span>
              </Button>
            </div>
          </div>

          {/* Personal Message */}
          <div className="mt-8 p-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg border border-purple-200 dark:border-purple-700">
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-purple-900 dark:text-purple-100 mb-2">
                  A Personal Note from Zara
                </h4>
                <p className="text-purple-700 dark:text-purple-300 text-sm leading-relaxed">
                  {userName}, teaching isn't just what you do - it's who you are. Every comment you craft, 
                  every parent you reach out to, every moment you invest in your students matters more than 
                  you know. Thank you for trusting Zaza to be part of your journey. Here's to making 
                  parent communication easier so you can focus on what you do best: inspiring young minds! 💜
                </p>
              </div>
            </div>
          </div>

          {/* Close Button */}
          <div className="mt-8 text-center">
            <Button
              onClick={onClose}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Continue My Teaching Journey
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Hidden canvas for wallpaper generation */}
      <canvas
        ref={canvasRef}
        style={{ display: 'none' }}
        width={1920}
        height={1080}
      />
    </div>
  )
}

// Milestone tracker and trigger
interface MilestoneTrackerProps {
  userName: string
  userEmail?: string
  children: React.ReactNode
  className?: string
}

export function MilestoneTracker({ userName, userEmail, children, className = '' }: MilestoneTrackerProps) {
  const [currentMilestone, setCurrentMilestone] = useState<{
    type: 'signup' | 'first-comment' | 'first-week' | 'first-month' | null
    isVisible: boolean
  }>({ type: null, isVisible: false })

  // Check for milestones on mount
  useEffect(() => {
    checkMilestones()
  }, [])

  const checkMilestones = () => {
    const signupDate = localStorage.getItem('zaza_signup_date')
    const firstCommentDate = localStorage.getItem('zaza_first_comment_date')
    const hasSeenSignupWelcome = localStorage.getItem('zaza_welcome_signup_seen')
    const hasSeenFirstCommentWelcome = localStorage.getItem('zaza_welcome_first_comment_seen')
    const hasSeenWeekWelcome = localStorage.getItem('zaza_welcome_week_seen')
    const hasSeenMonthWelcome = localStorage.getItem('zaza_welcome_month_seen')

    const now = new Date()

    // Check signup milestone
    if (signupDate && !hasSeenSignupWelcome) {
      setCurrentMilestone({ type: 'signup', isVisible: true })
      return
    }

    // Check first comment milestone
    if (firstCommentDate && !hasSeenFirstCommentWelcome) {
      setCurrentMilestone({ type: 'first-comment', isVisible: true })
      return
    }

    // Check week milestone
    if (signupDate && !hasSeenWeekWelcome) {
      const signup = new Date(signupDate)
      const daysSinceSignup = Math.floor((now.getTime() - signup.getTime()) / (1000 * 60 * 60 * 24))
      
      if (daysSinceSignup >= 7) {
        setCurrentMilestone({ type: 'first-week', isVisible: true })
        return
      }
    }

    // Check month milestone
    if (signupDate && !hasSeenMonthWelcome) {
      const signup = new Date(signupDate)
      const daysSinceSignup = Math.floor((now.getTime() - signup.getTime()) / (1000 * 60 * 60 * 24))
      
      if (daysSinceSignup >= 30) {
        setCurrentMilestone({ type: 'first-month', isVisible: true })
        return
      }
    }
  }

  const handleMilestoneClose = () => {
    if (currentMilestone.type) {
      localStorage.setItem(`zaza_welcome_${currentMilestone.type.replace('-', '_')}_seen`, 'true')
      
      // Track milestone completion
      if (typeof window !== 'undefined' && (window as any).zazeAnalytics) {
        (window as any).zazeAnalytics.trackMilestone(currentMilestone.type)
      }
    }
    
    setCurrentMilestone({ type: null, isVisible: false })
  }

  // Expose milestone trigger globally
  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).zazaMilestoneTrigger = {
        signup: () => {
          localStorage.setItem('zaza_signup_date', new Date().toISOString())
          setCurrentMilestone({ type: 'signup', isVisible: true })
        },
        firstComment: () => {
          localStorage.setItem('zaza_first_comment_date', new Date().toISOString())
          setCurrentMilestone({ type: 'first-comment', isVisible: true })
        },
        checkAll: checkMilestones
      }
    }

    return () => {
      if (typeof window !== 'undefined') {
        delete (window as any).zazaMilestoneTrigger
      }
    }
  }, [])

  return (
    <div className={className}>
      {children}
      
      {currentMilestone.type && (
        <WelcomeCard
          userName={userName}
          userEmail={userEmail}
          milestone={currentMilestone.type}
          isVisible={currentMilestone.isVisible}
          onClose={handleMilestoneClose}
        />
      )}
    </div>
  )
}

// Utility functions for triggering milestones
export const milestoneUtils = {
  // Call after successful signup
  onSignup: (userName: string) => {
    if (typeof window !== 'undefined' && (window as any).zazaMilestoneTrigger) {
      (window as any).zazaMilestoneTrigger.signup()
    }
  },

  // Call after first AI comment generation
  onFirstComment: () => {
    if (typeof window !== 'undefined' && (window as any).zazaMilestoneTrigger) {
      (window as any).zazaMilestoneTrigger.firstComment()
    }
  },

  // Check all milestones (call on app load)
  checkMilestones: () => {
    if (typeof window !== 'undefined' && (window as any).zazaMilestoneTrigger) {
      (window as any).zazaMilestoneTrigger.checkAll()
    }
  }
}

// Mini thank you moment for smaller achievements
interface MiniThankYouProps {
  message: string
  emoji?: string
  isVisible: boolean
  onClose?: () => void
  duration?: number
  className?: string
}

export function MiniThankYou({ 
  message, 
  emoji = "✨", 
  isVisible, 
  onClose,
  duration = 3000,
  className = '' 
}: MiniThankYouProps) {
  useEffect(() => {
    if (isVisible && onClose && duration > 0) {
      const timer = setTimeout(onClose, duration)
      return () => clearTimeout(timer)
    }
  }, [isVisible, onClose, duration])

  if (!isVisible) return null

  return (
    <div className={`fixed top-4 right-4 z-50 animate-in slide-in-from-right duration-500 ${className}`}>
      <Card className="shadow-xl bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-700">
        <CardContent className="p-4">
          <div className="flex items-center space-x-3">
            <div className="text-2xl">{emoji}</div>
            <div>
              <p className="font-medium text-green-900 dark:text-green-100 text-sm">
                {message}
              </p>
              <p className="text-xs text-green-600 dark:text-green-400">
                Keep being amazing!
              </p>
            </div>
            {onClose && (
              <button
                onClick={onClose}
                className="text-green-400 hover:text-green-600 dark:text-green-500 dark:hover:text-green-300 ml-2"
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