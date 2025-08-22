'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { Variants, Transition } from 'framer-motion'

// Default animation configuration
export const defaultEasing = [0.25, 0.1, 0.25, 1] as const
export const springEasing = { type: 'spring', stiffness: 100, damping: 15 }

export const durations = {
  fast: 0.15,
  normal: 0.3,
  slow: 0.5,
  slower: 0.75,
} as const

// Default transition configurations
export const defaultTransition: Transition = {
  duration: durations.normal,
  ease: defaultEasing,
}

export const springTransition: Transition = {
  ...springEasing,
  duration: durations.normal,
}

// Common animation variants
export const fadeIn: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
}

export const fadeInUp: Variants = {
  initial: { 
    opacity: 0, 
    y: 20 
  },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: defaultTransition,
  },
  exit: { 
    opacity: 0, 
    y: -20,
    transition: { ...defaultTransition, duration: durations.fast },
  },
}

export const fadeInDown: Variants = {
  initial: { 
    opacity: 0, 
    y: -20 
  },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: defaultTransition,
  },
  exit: { 
    opacity: 0, 
    y: 20,
    transition: { ...defaultTransition, duration: durations.fast },
  },
}

export const slideInLeft: Variants = {
  initial: { 
    opacity: 0, 
    x: -30 
  },
  animate: { 
    opacity: 1, 
    x: 0,
    transition: defaultTransition,
  },
  exit: { 
    opacity: 0, 
    x: 30,
    transition: { ...defaultTransition, duration: durations.fast },
  },
}

export const slideInRight: Variants = {
  initial: { 
    opacity: 0, 
    x: 30 
  },
  animate: { 
    opacity: 1, 
    x: 0,
    transition: defaultTransition,
  },
  exit: { 
    opacity: 0, 
    x: -30,
    transition: { ...defaultTransition, duration: durations.fast },
  },
}

export const scaleIn: Variants = {
  initial: { 
    opacity: 0, 
    scale: 0.9 
  },
  animate: { 
    opacity: 1, 
    scale: 1,
    transition: springTransition,
  },
  exit: { 
    opacity: 0, 
    scale: 0.95,
    transition: { ...defaultTransition, duration: durations.fast },
  },
}

export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
  exit: {
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
}

export const staggerItem: Variants = {
  initial: { 
    opacity: 0, 
    y: 20 
  },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: defaultTransition,
  },
  exit: { 
    opacity: 0, 
    y: -10,
    transition: { ...defaultTransition, duration: durations.fast },
  },
}

// Hover variants for interactive elements
export const hoverLift: Variants = {
  initial: { y: 0 },
  hover: { y: -2, transition: { duration: durations.fast } },
  tap: { y: 0, scale: 0.98, transition: { duration: 0.1 } },
}

export const hoverScale: Variants = {
  initial: { scale: 1 },
  hover: { scale: 1.02, transition: { duration: durations.fast } },
  tap: { scale: 0.98, transition: { duration: 0.1 } },
}

// Motion context for reduced motion preferences
interface MotionContextType {
  shouldReduceMotion: boolean
  setShouldReduceMotion: (reduce: boolean) => void
}

const MotionContext = createContext<MotionContextType | null>(null)

// Hook to detect and manage reduced motion preferences
export function usePrefersReducedMotion(): boolean {
  const context = useContext(MotionContext)
  return context?.shouldReduceMotion ?? false
}

// Hook for getting the full motion context
export function useMotionContext(): MotionContextType {
  const context = useContext(MotionContext)
  if (!context) {
    throw new Error('useMotionContext must be used within a MotionProvider')
  }
  return context
}

// Provider component that manages motion preferences
interface MotionProviderProps {
  children: React.ReactNode
}

export function MotionProvider({ children }: MotionProviderProps) {
  const [shouldReduceMotion, setShouldReduceMotion] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    // Check system preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const systemPreference = mediaQuery.matches
    
    // Check localStorage override - support both new and old formats
    const motionPreference = localStorage.getItem('motion')
    const oldPreference = localStorage.getItem('reduce-motion')
    
    let userPreference = null
    if (motionPreference === 'reduced') {
      userPreference = true
    } else if (motionPreference === null && oldPreference !== null) {
      // Migrate old format
      userPreference = oldPreference === 'true'
    }
    
    // User preference overrides system preference
    const finalPreference = userPreference !== null ? userPreference : systemPreference
    setShouldReduceMotion(finalPreference)
    
    // Listen for system preference changes
    const handleChange = (e: MediaQueryListEvent) => {
      if (userPreference === null) {
        setShouldReduceMotion(e.matches)
      }
    }
    
    // Listen for custom motion preference changes
    const handleMotionChange = (e: CustomEvent) => {
      setShouldReduceMotion(e.detail.reduced)
    }
    
    mediaQuery.addEventListener('change', handleChange)
    window.addEventListener('motionPreferenceChange', handleMotionChange as EventListener)
    
    return () => {
      mediaQuery.removeEventListener('change', handleChange)
      window.removeEventListener('motionPreferenceChange', handleMotionChange as EventListener)
    }
  }, [])

  // Update localStorage when preference changes
  const handleSetShouldReduceMotion = (reduce: boolean) => {
    setShouldReduceMotion(reduce)
    if (reduce) {
      localStorage.setItem('motion', 'reduced')
    } else {
      localStorage.removeItem('motion')
    }
    // Clean up old format
    localStorage.removeItem('reduce-motion')
  }

  // Don't render until mounted to prevent hydration mismatch
  if (!mounted) {
    return <>{children}</>
  }

  return (
    <MotionContext.Provider 
      value={{ 
        shouldReduceMotion, 
        setShouldReduceMotion: handleSetShouldReduceMotion 
      }}
    >
      {children}
    </MotionContext.Provider>
  )
}

// Helper function to get motion-safe variants
export function getMotionVariants(variants: Variants, shouldReduceMotion: boolean): Variants {
  if (shouldReduceMotion) {
    // Return variants with no animation
    return {
      initial: variants.animate || {},
      animate: variants.animate || {},
      exit: variants.animate || {},
    }
  }
  return variants
}

// Helper function to get motion-safe transition
export function getMotionTransition(transition: Transition, shouldReduceMotion: boolean): Transition {
  if (shouldReduceMotion) {
    return { duration: 0.01 }
  }
  return transition
}

// Utility for creating motion-aware components
export function createMotionComponent<T extends Record<string, any>>(
  variants: Variants,
  defaultTransition: Transition = defaultTransition
) {
  return function MotionComponent(props: T & { children: React.ReactNode }) {
    const shouldReduceMotion = usePrefersReducedMotion()
    
    return {
      variants: getMotionVariants(variants, shouldReduceMotion),
      transition: getMotionTransition(defaultTransition, shouldReduceMotion),
      ...props,
    }
  }
}

// Export common motion configurations
export const motionConfig = {
  variants: {
    fadeIn,
    fadeInUp,
    fadeInDown,
    slideInLeft,
    slideInRight,
    scaleIn,
    staggerContainer,
    staggerItem,
    hoverLift,
    hoverScale,
  },
  transitions: {
    default: defaultTransition,
    spring: springTransition,
  },
  durations,
  easing: defaultEasing,
}