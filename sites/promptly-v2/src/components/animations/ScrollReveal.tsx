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
  const [isVisible, setIsVisible] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (!isMounted) return
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (once && ref.current) {
            observer.unobserve(ref.current)
          }
        } else if (!once) {
          setIsVisible(false)
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [isMounted, once])

  // For LCP elements, don't animate until after hydration
  const shouldAnimate = isMounted && (!isLCPElement || isVisible)

  const styles = shouldAnimate
    ? {
        transform: isVisible ? 'translateY(0px)' : `translateY(${y}px)`,
        opacity: isVisible ? 1 : 0,
        transition: `all ${duration}s cubic-bezier(0.4, 0, 0.2, 1) ${delay}s`,
      }
    : {
        transform: 'translateY(0px)',
        opacity: 1,
      }

  return (
    <div ref={ref} className={className} style={styles}>
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
  const [isVisible, setIsVisible] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (!isMounted) return
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (once && ref.current) {
            observer.unobserve(ref.current)
          }
        } else if (!once) {
          setIsVisible(false)
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [isMounted, once])

  // For LCP elements, don't animate until after hydration
  const shouldAnimate = isMounted && (!isLCPElement || isVisible)

  const containerStyles = shouldAnimate
    ? {
        transition: `opacity ${duration}s cubic-bezier(0.4, 0, 0.2, 1) ${childDelay}s`,
        opacity: isVisible ? 1 : 0,
      }
    : {
        opacity: 1,
      }

  return (
    <div ref={ref} className={className} style={containerStyles}>
      {shouldAnimate && Array.isArray(children)
        ? children.map((child, index) => (
            <div
              key={index}
              style={{
                transform: isVisible ? 'translateY(0px)' : 'translateY(20px)',
                opacity: isVisible ? 1 : 0,
                transition: `all ${duration}s cubic-bezier(0.4, 0, 0.2, 1) ${
                  childDelay + index * staggerDelay
                }s`,
              }}
            >
              {child}
            </div>
          ))
        : children}
    </div>
  )
}
