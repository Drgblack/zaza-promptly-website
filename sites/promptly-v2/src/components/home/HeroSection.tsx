'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { usePrefersReducedMotion } from '@/lib/motion'

const heroVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08, // 80ms stagger between children
      delayChildren: 0.1, // Small initial delay
    },
  },
}

const slideInLeft = {
  hidden: { 
    opacity: 0, 
    x: -12 
  },
  visible: { 
    opacity: 1, 
    x: 0
  },
}

const slideTransition = {
  duration: 0.3,
  ease: [0.25, 0.1, 0.25, 1] as const,
}

const fadeInUp = {
  hidden: { 
    opacity: 0, 
    y: 20 
  },
  visible: { 
    opacity: 1, 
    y: 0
  },
}

const fadeTransition = {
  duration: 0.3,
  ease: [0.25, 0.1, 0.25, 1] as const,
}

export default function HeroSection() {
  const [showHeroImage, setShowHeroImage] = useState(false)
  const [isHydrated, setIsHydrated] = useState(false)
  const shouldReduceMotion = usePrefersReducedMotion()
  
  // LCP-safe hydration - delay animations for critical content
  useEffect(() => {
    // Allow time for LCP paint before starting animations
    const timer = setTimeout(() => setIsHydrated(true), 150)
    return () => clearTimeout(timer)
  }, [])

  // Gate hero image reveal after LCP to avoid blocking critical content
  useEffect(() => {
    // Wait for LCP + small buffer before showing any hero image
    const timer = setTimeout(() => {
      setShowHeroImage(true)
    }, 500) // 500ms should be well after LCP for most pages

    return () => clearTimeout(timer)
  }, [])

  // Skip animations if user prefers reduced motion or waiting for LCP
  if (shouldReduceMotion || !isHydrated) {
    return (
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container py-20 md:py-32">
          <div className="text-center">
            {/* Main headline */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 dark:text-white mb-6 leading-tight max-w-[720px] mx-auto">
              Get Your Evenings Back:{' '}
              <span className="text-blue-600 dark:text-blue-400 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                AI That Writes Like Teachers
              </span>
            </h1>
            
            {/* Subheading */}
            <p className="text-xl md:text-[22px] text-slate-300 leading-relaxed mb-8 max-w-3xl mx-auto">
              Stop spending your personal time writing reports, parent emails, and IEP comments. 
              AI that understands classroom life and writes in your professional voice.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link 
                href="/pricing" 
                className="group inline-flex items-center justify-center h-12 px-8 bg-purple-600 hover:bg-purple-700 text-white text-lg font-semibold rounded-lg transition-all duration-[120ms] ease-out shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-900 active:scale-[0.98] animate-focus-ring"
              >
                <span className="mr-2">Try Free for Your Classroom</span>
                <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
              </Link>
              <Link 
                href="/#snippet"
                className="inline-flex items-center justify-center h-12 px-8 border border-slate-600/60 hover:border-slate-400/60 bg-transparent text-slate-300 hover:text-white text-lg font-semibold rounded-lg transition-all duration-[120ms] ease-out focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:ring-offset-slate-900 active:scale-[0.98] animate-focus-ring"
              >
                Try Quick Comment Helper
              </Link>
            </div>

            {/* Trust Indicators & Authority Signals */}
            <div className="mt-8 flex flex-col items-center justify-center gap-6">
              <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  7-day free trial
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  No credit card required
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  12,000+ teachers save hours weekly
                </div>
              </div>
              
              {/* Authority Badges */}
              <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-gray-500 dark:text-gray-500">
                <div className="flex items-center bg-slate-800/60 px-3 py-2 rounded-full border border-green-600/20">
                  <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Student Privacy Protected
                </div>
                <div className="flex items-center bg-slate-800/60 px-3 py-2 rounded-full border border-blue-600/20">
                  <svg className="w-4 h-4 text-blue-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.84L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" clipRule="evenodd" />
                  </svg>
                  Built by Educators, for Educators
                </div>
                <div className="flex items-center bg-slate-800/60 px-3 py-2 rounded-full border border-purple-600/20">
                  <svg className="w-4 h-4 text-purple-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  Reliable AI That Won&apos;t Make Things Up
                </div>
                <div className="flex items-center bg-slate-800/60 px-3 py-2 rounded-full border border-yellow-600/20">
                  <svg className="w-4 h-4 text-yellow-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  4.9/5 Stars from Teachers Like You
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            className="relative block w-full h-16 md:h-24 -mt-8"
            viewBox="0 0 1200 80"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="M0,40 C300,10 600,70 900,40 C1000,25 1100,55 1200,40 L1200,80 L0,80 Z"
              className="fill-slate-800 stroke-white/10"
              strokeWidth="1"
            />
          </svg>
        </div>
      </section>
    )
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container py-20 md:py-32">
        <motion.div 
          className="text-center gpu-accelerate"
          variants={heroVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Main headline */}
          <motion.h1 
            variants={slideInLeft}
            transition={slideTransition}
            className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 dark:text-white mb-6 leading-tight max-w-[720px] mx-auto animate-transform-opacity"
            onAnimationComplete={() => {
              // Clean up will-change after critical content animates
              const element = document.querySelector('h1.animate-transform-opacity')
              if (element) {
                element.classList.remove('animate-transform-opacity')
                element.classList.add('animation-complete')
              }
            }}
          >
            Get Your Evenings Back:{' '}
            <span className="text-blue-600 dark:text-blue-400 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              AI That Writes Like Teachers
            </span>
          </motion.h1>
          
          {/* Subheading */}
          <motion.p 
            variants={fadeInUp}
            transition={fadeTransition}
            className="text-xl md:text-[22px] text-slate-300 leading-relaxed mb-8 max-w-3xl mx-auto animate-transform-opacity"
          >
            Stop spending your personal time writing reports, parent emails, and IEP comments. 
            AI that understands classroom life and writes in your professional voice.
          </motion.p>
          
          {/* CTA Buttons */}
          <motion.div 
            variants={fadeInUp}
            transition={fadeTransition}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-transform-opacity"
          >
            <Link 
              href="/pricing" 
              className="group inline-flex items-center justify-center h-12 px-8 bg-purple-600 hover:bg-purple-700 text-white text-lg font-semibold rounded-lg transition-colors shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            >
              <span className="mr-2">Start Free</span>
              <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
            </Link>
            <Link 
              href="/#snippet"
              className="inline-flex items-center justify-center h-12 px-8 border border-slate-600/60 hover:border-slate-400/60 bg-transparent text-slate-300 hover:text-white text-lg font-semibold rounded-lg transition-colors"
            >
              Try Quick Comment Helper
            </Link>
          </motion.div>

          {/* Trust Indicators & Authority Signals */}
          <motion.div 
            variants={fadeInUp}
            transition={fadeTransition}
            className="mt-8 flex flex-col items-center justify-center gap-6 animate-transform-opacity"
          >
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                7-day free trial
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                No credit card required
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                12,000+ teachers trust us
              </div>
            </div>
            
            {/* Authority Badges */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-gray-500 dark:text-gray-500">
              <div className="flex items-center bg-slate-800/60 px-3 py-2 rounded-full border border-green-600/20">
                <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                GDPR Compliant
              </div>
              <div className="flex items-center bg-slate-800/60 px-3 py-2 rounded-full border border-blue-600/20">
                <svg className="w-4 h-4 text-blue-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.84L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" clipRule="evenodd" />
                </svg>
                PhD-Designed Pedagogy
              </div>
              <div className="flex items-center bg-slate-800/60 px-3 py-2 rounded-full border border-purple-600/20">
                <svg className="w-4 h-4 text-purple-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                Hallucination-Safe AI
              </div>
              <div className="flex items-center bg-slate-800/60 px-3 py-2 rounded-full border border-yellow-600/20">
                <svg className="w-4 h-4 text-yellow-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                4.9/5 Teacher Rating
              </div>
            </div>
          </motion.div>

          {/* Hero Image - Gated behind LCP */}
          {showHeroImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ 
                duration: 0.2, // 200ms as requested
                ease: [0.25, 0.1, 0.25, 1]
              }}
              className="mt-12"
            >
              {/* Placeholder for hero image - add actual image here when available */}
              <div className="w-full max-w-4xl mx-auto h-64 bg-gradient-to-r from-purple-600/10 to-blue-600/10 rounded-2xl border border-purple-500/20 flex items-center justify-center">
                <div className="text-center text-slate-400">
                  <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="text-sm">Hero image placeholder</p>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
      
      {/* Wave Divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          className="relative block w-full h-16 md:h-24 -mt-8"
          viewBox="0 0 1200 80"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M0,40 C300,10 600,70 900,40 C1000,25 1100,55 1200,40 L1200,80 L0,80 Z"
            className="fill-slate-800 stroke-white/10"
            strokeWidth="1"
          />
        </svg>
      </div>
    </section>
  )
}
