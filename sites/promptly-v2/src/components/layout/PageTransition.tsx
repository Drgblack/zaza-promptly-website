'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { usePrefersReducedMotion } from '@/lib/motion'

interface PageTransitionProps {
  children: React.ReactNode
}

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname()
  const shouldReduceMotion = usePrefersReducedMotion()

  // Skip animations if user prefers reduced motion
  if (shouldReduceMotion) {
    return <main id="main-content" className="flex-1">{children}</main>
  }

  return (
    <AnimatePresence mode="wait">
      <motion.main
        key={pathname}
        id="main-content"
        className="flex-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          duration: 0.12, // 120ms - subtle and fast
          ease: [0.25, 0.1, 0.25, 1], // Smooth easing
        }}
      >
        {children}
      </motion.main>
    </AnimatePresence>
  )
}
