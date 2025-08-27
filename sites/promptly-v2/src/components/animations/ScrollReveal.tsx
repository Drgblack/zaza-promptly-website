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
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  // Handle hydration
  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (!isMounted) return
    
    const element = ref.current
    if (!element) return

    // For LCP elements, don't animate initially to prevent layout shift
    if (isLCPElement) {
      setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (once) {
            observer.unobserve(element)
          }
        } else if (!once) {
          setIsVisible(false)
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [isMounted, once, isLCPElement])

  // Prevent hydration mismatch by not animating during SSR
  if (!isMounted) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    )
  }

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transform: isVisible ? 'translateY(0)' : `translateY(${y}px)`,
        opacity: isVisible ? 1 : 0,
        transition: `all ${duration}s ease-out ${delay}s`,
      }}
    >
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
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (!isMounted) return
    
    const element = ref.current
    if (!element) return

    if (isLCPElement) {
      setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (once) {
            observer.unobserve(element)
          }
        } else if (!once) {
          setIsVisible(false)
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [isMounted, once, isLCPElement])

  if (!isMounted) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    )
  }

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transform: isVisible ? 'translateY(0)' : `translateY(20px)`,
        opacity: isVisible ? 1 : 0,
        transition: `all ${duration}s ease-out ${childDelay}s`,
      }}
    >
      {children}
    </div>
  )
}
