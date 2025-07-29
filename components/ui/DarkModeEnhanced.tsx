'use client'

import React, { useState, useEffect } from 'react'
import { Moon, Sun, Sparkles, Palette, Eye } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

// Enhanced dark mode context and provider
interface DarkModeContextType {
  isDark: boolean
  toggle: () => void
  setMode: (mode: 'light' | 'dark' | 'auto') => void
  mode: 'light' | 'dark' | 'auto'
  isReduced: boolean // For reduced motion/effects
}

const DarkModeContext = React.createContext<DarkModeContextType | undefined>(undefined)

export function DarkModeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setModeState] = useState<'light' | 'dark' | 'auto'>('auto')
  const [isDark, setIsDark] = useState(false)
  const [isReduced, setIsReduced] = useState(false)

  useEffect(() => {
    // Check for saved preference
    const savedMode = localStorage.getItem('zaza-theme') as 'light' | 'dark' | 'auto' || 'auto'
    setModeState(savedMode)

    // Check for reduced motion preference
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    setIsReduced(prefersReduced)

    // Determine initial dark mode state
    const updateDarkMode = () => {
      if (savedMode === 'auto') {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        setIsDark(prefersDark)
      } else {
        setIsDark(savedMode === 'dark')
      }
    }

    updateDarkMode()

    // Listen for system preference changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    mediaQuery.addEventListener('change', updateDarkMode)

    return () => mediaQuery.removeEventListener('change', updateDarkMode)
  }, [])

  useEffect(() => {
    // Apply dark mode class to document
    if (isDark) {
      document.documentElement.classList.add('dark')
      document.documentElement.style.colorScheme = 'dark'
    } else {
      document.documentElement.classList.remove('dark')
      document.documentElement.style.colorScheme = 'light'
    }

    // Add calming transition
    if (!isReduced) {
      document.documentElement.style.transition = 'background-color 0.3s ease, color 0.3s ease'
    }
  }, [isDark, isReduced])

  const setMode = (newMode: 'light' | 'dark' | 'auto') => {
    setModeState(newMode)
    localStorage.setItem('zaza-theme', newMode)
    
    if (newMode === 'auto') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      setIsDark(prefersDark)
    } else {
      setIsDark(newMode === 'dark')
    }

    // Track theme change
    if (typeof window !== 'undefined' && (window as any).zazeAnalytics) {
      (window as any).zazeAnalytics.trackFeatureUse(`theme_${newMode}`)
    }
  }

  const toggle = () => {
    const newMode = isDark ? 'light' : 'dark'
    setMode(newMode)
  }

  return (
    <DarkModeContext.Provider value={{ isDark, toggle, setMode, mode, isReduced }}>
      {children}
    </DarkModeContext.Provider>
  )
}

export function useDarkMode() {
  const context = React.useContext(DarkModeContext)
  if (context === undefined) {
    throw new Error('useDarkMode must be used within a DarkModeProvider')
  }
  return context
}

// Enhanced theme toggle with visual soothing
interface ThemeToggleProps {
  size?: 'sm' | 'md' | 'lg'
  showLabel?: boolean
  variant?: 'button' | 'icon' | 'card'
  className?: string
}

export function ThemeToggle({ 
  size = 'md', 
  showLabel = false, 
  variant = 'button',
  className = '' 
}: ThemeToggleProps) {
  const { isDark, toggle, mode, setMode } = useDarkMode()
  const [isToggling, setIsToggling] = useState(false)

  const handleToggle = () => {
    setIsToggling(true)
    toggle()
    
    // Add brief animation state
    setTimeout(() => setIsToggling(false), 300)
  }

  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  }

  const buttonSizeClasses = {
    sm: 'p-1',
    md: 'p-2',
    lg: 'p-3'
  }

  if (variant === 'card') {
    return (
      <Card className={`${className} cursor-pointer transition-all hover:shadow-lg ${isDark ? 'hover:shadow-purple-500/20' : 'hover:shadow-purple-500/10'}`}>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                isDark 
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg shadow-purple-500/30' 
                  : 'bg-gradient-to-r from-amber-400 to-orange-500 shadow-lg shadow-amber-500/30'
              }`}>
                {isDark ? (
                  <Moon className="w-5 h-5 text-white" />
                ) : (
                  <Sun className="w-5 h-5 text-white" />
                )}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                  {isDark ? 'Dark Mode' : 'Light Mode'}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {isDark ? 'Easy on the eyes' : 'Bright and clear'}
                </p>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <button
                onClick={() => setMode('light')}
                className={`p-2 rounded-full transition-all ${
                  mode === 'light' 
                    ? 'bg-amber-100 text-amber-600 shadow-inner' 
                    : 'text-gray-400 hover:text-amber-500'
                }`}
              >
                <Sun className="w-4 h-4" />
              </button>
              <button
                onClick={() => setMode('auto')}
                className={`p-2 rounded-full transition-all ${
                  mode === 'auto' 
                    ? 'bg-purple-100 text-purple-600 shadow-inner' 
                    : 'text-gray-400 hover:text-purple-500'
                }`}
              >
                <Eye className="w-4 h-4" />
              </button>
              <button
                onClick={() => setMode('dark')}
                className={`p-2 rounded-full transition-all ${
                  mode === 'dark' 
                    ? 'bg-gray-700 text-gray-200 shadow-inner' 
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <Moon className="w-4 h-4" />
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (variant === 'icon') {
    return (
      <button
        onClick={handleToggle}
        className={`${buttonSizeClasses[size]} rounded-full transition-all duration-300 ${
          isDark 
            ? 'text-purple-400 hover:text-purple-300 hover:bg-purple-900/30' 
            : 'text-amber-600 hover:text-amber-500 hover:bg-amber-100'
        } ${isToggling ? 'scale-110' : ''} ${className}`}
        aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      >
        <div className={`transition-transform duration-300 ${isToggling ? 'rotate-180' : ''}`}>
          {isDark ? (
            <Moon className={sizeClasses[size]} />
          ) : (
            <Sun className={sizeClasses[size]} />
          )}
        </div>
      </button>
    )
  }

  return (
    <Button
      onClick={handleToggle}
      variant="outline"
      size={size === 'md' ? 'default' : size as 'sm' | 'lg'}
      className={`transition-all duration-300 ${
        isDark 
          ? 'border-purple-300 hover:border-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/30' 
          : 'border-amber-300 hover:border-amber-400 hover:bg-amber-50'
      } ${isToggling ? 'scale-105' : ''} ${className}`}
    >
      <div className={`transition-transform duration-300 ${isToggling ? 'rotate-180' : ''}`}>
        {isDark ? (
          <Moon className={sizeClasses[size]} />
        ) : (
          <Sun className={sizeClasses[size]} />
        )}
      </div>
      {showLabel && (
        <span className="ml-2">
          {isDark ? 'Dark' : 'Light'}
        </span>
      )}
    </Button>
  )
}

// Soft glow button for key actions in dark mode
interface SoftGlowButtonProps {
  children: React.ReactNode
  onClick?: () => void
  disabled?: boolean
  variant?: 'primary' | 'secondary' | 'success' | 'warning'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function SoftGlowButton({ 
  children, 
  onClick, 
  disabled = false,
  variant = 'primary',
  size = 'md',
  className = '' 
}: SoftGlowButtonProps) {
  const { isDark, isReduced } = useDarkMode()
  const [isHovered, setIsHovered] = useState(false)
  const [isPressed, setIsPressed] = useState(false)

  const variants = {
    primary: {
      base: 'bg-gradient-to-r from-purple-600 to-pink-600 text-white',
      hover: 'hover:from-purple-700 hover:to-pink-700',
      glow: isDark && !isReduced ? 'shadow-lg shadow-purple-500/50' : 'shadow-lg',
      hoverGlow: isDark && !isReduced ? 'hover:shadow-xl hover:shadow-purple-500/60' : 'hover:shadow-xl'
    },
    secondary: {
      base: 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white',
      hover: 'hover:from-blue-700 hover:to-cyan-700',
      glow: isDark && !isReduced ? 'shadow-lg shadow-blue-500/50' : 'shadow-lg',
      hoverGlow: isDark && !isReduced ? 'hover:shadow-xl hover:shadow-blue-500/60' : 'hover:shadow-xl'
    },
    success: {
      base: 'bg-gradient-to-r from-green-600 to-emerald-600 text-white',
      hover: 'hover:from-green-700 hover:to-emerald-700',
      glow: isDark && !isReduced ? 'shadow-lg shadow-green-500/50' : 'shadow-lg',
      hoverGlow: isDark && !isReduced ? 'hover:shadow-xl hover:shadow-green-500/60' : 'hover:shadow-xl'
    },
    warning: {
      base: 'bg-gradient-to-r from-amber-600 to-orange-600 text-white',
      hover: 'hover:from-amber-700 hover:to-orange-700',
      glow: isDark && !isReduced ? 'shadow-lg shadow-amber-500/50' : 'shadow-lg',
      hoverGlow: isDark && !isReduced ? 'hover:shadow-xl hover:shadow-amber-500/60' : 'hover:shadow-xl'
    }
  }

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg'
  }

  const variantClasses = variants[variant]

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      className={`
        ${variantClasses.base}
        ${variantClasses.hover}
        ${variantClasses.glow}
        ${variantClasses.hoverGlow}
        ${sizes[size]}
        rounded-lg font-medium
        transition-all duration-300
        transform
        ${isHovered && !disabled ? 'scale-105' : ''}
        ${isPressed && !disabled ? 'scale-95' : ''}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
    >
      <div className="flex items-center justify-center space-x-2">
        {children}
        {isHovered && isDark && !isReduced && (
          <Sparkles className="w-4 h-4 animate-pulse" />
        )}
      </div>
    </button>
  )
}

// Calming background patterns for dark mode
export function CalmingBackground({ 
  pattern = 'dots',
  intensity = 'subtle',
  className = '' 
}: {
  pattern?: 'dots' | 'waves' | 'grain' | 'gradient'
  intensity?: 'subtle' | 'medium' | 'strong'
  className?: string
}) {
  const { isDark, isReduced } = useDarkMode()

  if (isReduced) return null

  const patterns = {
    dots: {
      subtle: isDark 
        ? 'bg-[radial-gradient(circle_at_1px_1px,rgba(139,92,246,0.1)_1px,transparent_0)]' 
        : 'bg-[radial-gradient(circle_at_1px_1px,rgba(139,92,246,0.05)_1px,transparent_0)]',
      medium: isDark 
        ? 'bg-[radial-gradient(circle_at_2px_2px,rgba(139,92,246,0.15)_1px,transparent_0)]' 
        : 'bg-[radial-gradient(circle_at_2px_2px,rgba(139,92,246,0.08)_1px,transparent_0)]',
      strong: isDark 
        ? 'bg-[radial-gradient(circle_at_2px_2px,rgba(139,92,246,0.2)_1px,transparent_0)]' 
        : 'bg-[radial-gradient(circle_at_2px_2px,rgba(139,92,246,0.12)_1px,transparent_0)]'
    },
    gradient: {
      subtle: isDark 
        ? 'bg-gradient-to-br from-purple-900/5 via-transparent to-pink-900/5' 
        : 'bg-gradient-to-br from-purple-50/50 via-transparent to-pink-50/50',
      medium: isDark 
        ? 'bg-gradient-to-br from-purple-900/10 via-transparent to-pink-900/10' 
        : 'bg-gradient-to-br from-purple-50 via-transparent to-pink-50',
      strong: isDark 
        ? 'bg-gradient-to-br from-purple-900/20 via-transparent to-pink-900/20' 
        : 'bg-gradient-to-br from-purple-100 via-transparent to-pink-100'
    }
  }

  return (
    <div 
      className={`fixed inset-0 pointer-events-none ${patterns[pattern]?.[intensity] || patterns.gradient.subtle} ${className}`}
      style={{ 
        backgroundSize: pattern === 'dots' ? '20px 20px' : 'auto',
        zIndex: -1 
      }}
    />
  )
}

// Dark mode aware card with enhanced styling
interface CalmingCardProps {
  children: React.ReactNode
  variant?: 'default' | 'elevated' | 'glass'
  glow?: boolean
  className?: string
}

export function CalmingCard({ 
  children, 
  variant = 'default',
  glow = false,
  className = '' 
}: CalmingCardProps) {
  const { isDark, isReduced } = useDarkMode()

  const variants = {
    default: isDark 
      ? 'bg-gray-800/80 border-gray-700' 
      : 'bg-white border-gray-200',
    elevated: isDark 
      ? 'bg-gray-800/90 border-gray-600 shadow-xl shadow-black/20' 
      : 'bg-white border-gray-100 shadow-xl shadow-gray-900/10',
    glass: isDark 
      ? 'bg-gray-900/40 border-gray-700/50 backdrop-blur-xl' 
      : 'bg-white/80 border-gray-200/50 backdrop-blur-xl'
  }

  const glowEffect = glow && isDark && !isReduced 
    ? 'shadow-2xl shadow-purple-500/20 hover:shadow-purple-500/30 transition-shadow duration-300'
    : ''

  return (
    <Card className={`${variants[variant]} ${glowEffect} transition-all duration-300 ${className}`}>
      {children}
    </Card>
  )
}

// Example usage component
export function DarkModeShowcase() {
  const { isDark } = useDarkMode()

  return (
    <div className="space-y-6 p-6">
      <CalmingBackground pattern="gradient" intensity="subtle" />
      
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
          Dark Mode Showcase
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Experience the calming, teacher-friendly interface in both light and dark modes
        </p>
        
        <ThemeToggle variant="card" className="max-w-sm mx-auto" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CalmingCard variant="elevated" glow={true}>
          <CardContent className="p-6">
            <h3 className="font-semibold mb-3 text-gray-900 dark:text-gray-100">
              Soft Glow Buttons
            </h3>
            <div className="space-y-3">
              <SoftGlowButton variant="primary">
                Generate Comment
              </SoftGlowButton>
              <SoftGlowButton variant="success">
                Save Template
              </SoftGlowButton>
              <SoftGlowButton variant="secondary">
                Translate
              </SoftGlowButton>
            </div>
          </CardContent>
        </CalmingCard>

        <CalmingCard variant="glass">
          <CardContent className="p-6">
            <h3 className="font-semibold mb-3 text-gray-900 dark:text-gray-100">
              Visual Soothing
            </h3>
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-purple-500 rounded-full shadow-lg shadow-purple-500/50" />
                <span>Soft glows in dark mode</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />
                <span>Calming gradients</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-gray-200 dark:bg-gray-700 rounded-full" />
                <span>Reduced contrast for comfort</span>
              </div>
            </div>
          </CardContent>
        </CalmingCard>
      </div>

      <div className="text-center">
        <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300">
          <Sparkles className="w-3 h-3 mr-1" />
          {isDark ? 'Dark mode activated' : 'Light mode activated'}
        </Badge>
      </div>
    </div>
  )
}