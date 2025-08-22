'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { usePrefersReducedMotion } from '@/lib/motion'

interface ScrollRevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
  duration?: number
  y?: number
  threshold?: number
  once?: boolean
  isLCPElement?: boolean // Skip animation until after hydration for LCP elements
}

const defaultVariants = {
  hidden: { 
    opacity: 0, 
    y: 30 
  },
  visible: { 
    opacity: 1, 
    y: 0 
  },
}

export default function ScrollReveal({
  children,
  className = '',
  delay = 0,
  duration = 0.25, // 250ms default (between 220-280ms range)
  y = 30,
  threshold = 0.2,
  once = true,
  isLCPElement = false,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isHydrated, setIsHydrated] = useState(false)
  const isInView = useInView(ref, { 
    threshold,
    once 
  })
  const shouldReduceMotion = usePrefersReducedMotion()
  
  // LCP-safe hydration check
  useEffect(() => {
    if (isLCPElement) {
      // Delay animation for LCP elements until after initial paint
      const timer = setTimeout(() => setIsHydrated(true), 100)
      return () => clearTimeout(timer)
    } else {
      setIsHydrated(true)
    }
  }, [isLCPElement])

  // Skip animations if user prefers reduced motion or LCP element isn't hydrated
  if (shouldReduceMotion || (isLCPElement && !isHydrated)) {
    return (
      <div className={className} ref={ref}>
        {children}
      </div>
    )
  }

  const variants = {
    hidden: { 
      opacity: 0, 
      y 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1], // Smooth easing
      },
    },
  }

  return (
    <motion.div
      ref={ref}
      className={`${className} animate-transform-opacity gpu-accelerate`}
      variants={variants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      onAnimationComplete={() => {
        // Remove will-change after animation completes for performance
        const element = ref.current
        if (element) {
          element.classList.remove('animate-transform-opacity')
          element.classList.add('animation-complete')
        }
      }}
    >
      {children}
    </motion.div>
  )
}

// Staggered variant for multiple items
interface ScrollRevealStaggerProps {
  children: React.ReactNode
  className?: string
  staggerDelay?: number
  childDelay?: number
  duration?: number
  threshold?: number
  once?: boolean
  isLCPElement?: boolean
}

export function ScrollRevealStagger({
  children,
  className = '',
  staggerDelay = 0.1, // 100ms between children
  childDelay = 0,
  duration = 0.25,
  threshold = 0.2,
  once = true,
  isLCPElement = false,
}: ScrollRevealStaggerProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isHydrated, setIsHydrated] = useState(false)
  const isInView = useInView(ref, { 
    threshold,
    once 
  })
  const shouldReduceMotion = usePrefersReducedMotion()
  
  // LCP-safe hydration check
  useEffect(() => {
    if (isLCPElement) {
      const timer = setTimeout(() => setIsHydrated(true), 100)
      return () => clearTimeout(timer)
    } else {
      setIsHydrated(true)
    }
  }, [isLCPElement])

  // Skip animations if user prefers reduced motion or LCP element isn't hydrated
  if (shouldReduceMotion || (isLCPElement && !isHydrated)) {
    return (
      <div className={className} ref={ref}>
        {children}
      </div>
    )
  }

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: childDelay,
      },
    },
  }

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 30 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  }

  return (
    <motion.div
      ref={ref}
      className={`${className} gpu-accelerate`}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {Array.isArray(children) 
        ? children.map((child, index) => (
            <motion.div 
              key={index} 
              variants={itemVariants}
              className="animate-transform-opacity"
              onAnimationComplete={() => {
                // Clean up will-change after animation
                const element = document.querySelectorAll('.animate-transform-opacity')[index]
                if (element) {
                  element.classList.remove('animate-transform-opacity')
                  element.classList.add('animation-complete')
                }
              }}
            >
              {child}
            </motion.div>
          ))
        : <motion.div 
            variants={itemVariants}
            className="animate-transform-opacity"
            onAnimationComplete={(definition) => {
              // Clean up will-change
              const element = ref.current?.querySelector('.animate-transform-opacity')
              if (element) {
                element.classList.remove('animate-transform-opacity')
                element.classList.add('animation-complete')
              }
            }}
          >
            {children}
          </motion.div>
      }
    </motion.div>
  )
}