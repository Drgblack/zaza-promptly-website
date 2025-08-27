'use client'

// Disabled to fix hydration issues - just render children without animation

interface ScrollRevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
  duration?: number
  y?: number
  once?: boolean
  isLCPElement?: boolean // Skip animation until after hydration for LCP elements
}


export default function ScrollReveal({
  children,
  className = '',
}: ScrollRevealProps) {
  // Temporarily disabled to fix hydration issues - just render children without animation
  return (
    <div className={className}>
      {children}
    </div>
  )
}

// Staggered variant for multiple items
interface ScrollRevealStaggerProps {
  children: React.ReactNode
  className?: string
  staggerDelay?: number
  childDelay?: number
  duration?: number
  once?: boolean
  isLCPElement?: boolean
}

export function ScrollRevealStagger({
  children,
  className = '',
}: ScrollRevealStaggerProps) {
  // Temporarily disabled to fix hydration issues - just render children without animation
  return (
    <div className={className}>
      {children}
    </div>
  )
}
