'use client'

/**
 * ZaraAssistant - Contextual tips assistant for the Snippet Demo
 * 
 * Provides timed, dismissible tips during the snippet improvement flow:
 * - On textarea focus: Encourages pasting real drafts
 * - After first result: Suggests trying different tones/lengths  
 * - On explain tab: Explains highlighted changes
 * 
 * Features:
 * - localStorage persistence for "Hide tips" toggle
 * - Respects prefers-reduced-motion
 * - Fully accessible with aria-live announcements
 * - No focus stealing, keyboard dismissible
 */
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePrefersReducedMotion } from '@/lib/motion'

interface ZaraAssistantProps {
  isTextareaFocused: boolean
  hasResult: boolean
  isExplainTabOpen: boolean
  onToggleTips: (enabled: boolean) => void
}

interface Tip {
  id: string
  text: string
  trigger: 'textarea-focus' | 'first-result' | 'explain-open'
  duration: number
  delay?: number
}

const TIPS: Tip[] = [
  {
    id: 'textarea-focus',
    text: "Paste a real draft. I'll tidy tone, length and clarity.",
    trigger: 'textarea-focus',
    duration: 4000,
    delay: 500
  },
  {
    id: 'first-result', 
    text: "Try a different tone or length—then compare in 'What changed'.",
    trigger: 'first-result',
    duration: 5000,
    delay: 1000
  },
  {
    id: 'explain-open',
    text: "I highlight wording we softened or clarified.",
    trigger: 'explain-open', 
    duration: 4000,
    delay: 300
  }
]

export default function ZaraAssistant({ 
  isTextareaFocused, 
  hasResult, 
  isExplainTabOpen,
  onToggleTips 
}: ZaraAssistantProps) {
  const [tipsEnabled, setTipsEnabled] = useState(true)
  const [currentTip, setCurrentTip] = useState<Tip | null>(null)
  const [shownTips, setShownTips] = useState<Set<string>>(new Set())
  
  const shouldReduceMotion = usePrefersReducedMotion()
  const timeoutRef = useRef<NodeJS.Timeout>()
  const ariaLiveRef = useRef<HTMLDivElement>(null)

  // Load preferences from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('zara-tips-enabled')
      if (saved !== null) {
        const enabled = JSON.parse(saved)
        setTipsEnabled(enabled)
        onToggleTips(enabled)
      }
    } catch (error) {
      console.log('Failed to load Zara tip preferences:', error)
    }
  }, [onToggleTips])

  // Save preferences to localStorage
  const saveTipPreference = (enabled: boolean) => {
    try {
      localStorage.setItem('zara-tips-enabled', JSON.stringify(enabled))
    } catch (error) {
      console.log('Failed to save Zara tip preferences:', error)
    }
  }

  // Handle tip toggling
  const handleToggleTips = () => {
    const newEnabled = !tipsEnabled
    setTipsEnabled(newEnabled)
    saveTipPreference(newEnabled)
    onToggleTips(newEnabled)
    
    if (!newEnabled) {
      setCurrentTip(null)
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }

  // Show tip logic
  const showTip = (tip: Tip) => {
    if (!tipsEnabled || shouldReduceMotion) return
    
    // Don't show same tip twice
    if (shownTips.has(tip.id)) return
    
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    // Show tip after delay
    timeoutRef.current = setTimeout(() => {
      setCurrentTip(tip)
      setShownTips(prev => new Set(prev).add(tip.id))
      
      // Update aria-live for screen readers
      if (ariaLiveRef.current) {
        ariaLiveRef.current.textContent = `Zara tip: ${tip.text}`
      }

      // Auto-hide after duration
      timeoutRef.current = setTimeout(() => {
        setCurrentTip(null)
        if (ariaLiveRef.current) {
          ariaLiveRef.current.textContent = ''
        }
      }, tip.duration)
    }, tip.delay || 0)
  }

  // Trigger tips based on props
  useEffect(() => {
    if (isTextareaFocused) {
      const tip = TIPS.find(t => t.trigger === 'textarea-focus')
      if (tip) showTip(tip)
    }
  }, [isTextareaFocused, tipsEnabled, shouldReduceMotion])

  useEffect(() => {
    if (hasResult) {
      const tip = TIPS.find(t => t.trigger === 'first-result')
      if (tip) showTip(tip)
    }
  }, [hasResult, tipsEnabled, shouldReduceMotion])

  useEffect(() => {
    if (isExplainTabOpen) {
      const tip = TIPS.find(t => t.trigger === 'explain-open')
      if (tip) showTip(tip)
    }
  }, [isExplainTabOpen, tipsEnabled, shouldReduceMotion])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  if (!tipsEnabled) {
    return (
      <div className="flex items-center gap-3 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-purple-600/20 border border-purple-500/30 flex items-center justify-center">
            <span className="text-purple-400 text-sm">Z</span>
          </div>
          <span className="text-sm text-slate-400">Zara (demo)</span>
        </div>
        <button
          onClick={handleToggleTips}
          className="text-xs px-2 py-1 rounded-full bg-slate-800/50 border border-slate-600 text-slate-400 hover:text-slate-300 hover:border-slate-500 transition-colors"
          aria-label="Show Zara tips"
        >
          Show tips
        </button>
      </div>
    )
  }

  return (
    <>
      {/* Screen reader announcements */}
      <div ref={ariaLiveRef} className="sr-only" aria-live="polite" aria-atomic="true"></div>

      <div className="relative">
        {/* Assistant Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-purple-600/20 border border-purple-500/30 flex items-center justify-center">
              <span className="text-purple-400 text-sm font-medium">Z</span>
            </div>
            <span className="text-sm text-slate-300 font-medium">Zara (demo)</span>
          </div>
          
          <button
            onClick={handleToggleTips}
            className="text-xs px-2 py-1 rounded-full bg-slate-800/50 border border-slate-600 text-slate-400 hover:text-slate-300 hover:border-slate-500 transition-colors"
            aria-label="Hide Zara tips"
          >
            Hide tips
          </button>
        </div>

        {/* Tooltip */}
        <AnimatePresence>
          {currentTip && (
            <motion.div
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 10 }}
              animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
              exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="absolute top-full left-0 right-0 z-50 mt-2"
            >
              <div className="bg-purple-900/90 backdrop-blur-sm border border-purple-500/30 rounded-lg p-3 shadow-xl">
                <div className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-purple-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-purple-300 text-xs">💡</span>
                  </div>
                  <p className="text-sm text-purple-100 leading-relaxed">
                    {currentTip.text}
                  </p>
                  <button
                    onClick={() => setCurrentTip(null)}
                    className="text-purple-300/70 hover:text-purple-300 transition-colors flex-shrink-0"
                    aria-label="Dismiss tip"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
              
              {/* Arrow pointer */}
              <div className="absolute -top-1 left-6 w-2 h-2 bg-purple-900/90 border-l border-t border-purple-500/30 transform rotate-45"></div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}