"use client"

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface AnimatedWordsProps {
  text: string
  className?: string
  highlightWords?: string[]
}

export function AnimatedWords({ text, className = "", highlightWords = [] }: AnimatedWordsProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(mediaQuery.matches)
    
    const handleChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handleChange)
    
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  const words = text.split(' ')

  if (prefersReducedMotion) {
    return (
      <div className={className}>
        {words.map((word, index) => (
          <span
            key={`word-${index}`}
            className={`inline-block mr-3 ${
              highlightWords.includes(word) 
                ? "bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent" 
                : ""
            }`}
          >
            {word}
          </span>
        ))}
      </div>
    )
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: { staggerChildren: 0.12 }
        }
      }}
    >
      {words.map((word, index) => (
        <motion.span
          key={`word-${index}`}
          className={`inline-block mr-3 ${
            highlightWords.includes(word) 
              ? "bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent" 
              : ""
          }`}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { 
              opacity: 1, 
              y: 0,
              transition: {
                duration: 0.4,
                ease: [0.25, 0.46, 0.45, 0.94] // easeOutQuart for smooth feel
              }
            }
          }}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  )
}