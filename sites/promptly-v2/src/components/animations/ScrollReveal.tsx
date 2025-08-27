'use client'

import { useEffect, useRef, useState } from 'react'

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
  delay = 0,
  duration = 0.6,
  y = 20,
  once = true,
  isLCPElement = false,
}: ScrollRevealProps) {
  // Temporarily disable all animations to fix hydration issues
  // Just render children without any animation logic
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
  staggerDelay = 0.1,
  childDelay = 0,
  duration = 0.6,
  once = true,
  isLCPElement = false,
}: ScrollRevealStaggerProps) {
  // Temporarily disable all animations to fix hydration issues
  // Just render children without any animation logic
  return (
    <div className={className}>
      {children}
    </div>
  )
}
