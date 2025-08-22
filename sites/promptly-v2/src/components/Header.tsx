'use client'

import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePrefersReducedMotion } from '@/lib/motion'
import ThemeToggle from './ui/ThemeToggle'
import SearchInput from './search/SearchInput'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [solutionsOpen, setSolutionsOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const shouldReduceMotion = usePrefersReducedMotion()
  const solutionsRef = useRef<HTMLDivElement>(null)
  const mobileMenuRef = useRef<HTMLDivElement>(null)

  // Handle escape key and click outside for dropdowns
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSolutionsOpen(false)
        setMobileMenuOpen(false)
      }
    }

    const handleClickOutside = (e: MouseEvent) => {
      if (solutionsRef.current && !solutionsRef.current.contains(e.target as Node)) {
        setSolutionsOpen(false)
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target as Node)) {
        setMobileMenuOpen(false)
      }
    }

    document.addEventListener('keydown', handleEscape)
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // Hide on scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const isScrollingDown = currentScrollY > lastScrollY
      const scrollThreshold = 50 // Only start hiding after 50px scroll
      
      // Guard against mobile jank - use requestAnimationFrame for smoother animations
      if (window.innerWidth <= 768) {
        // On mobile, only hide after significant scroll and with debouncing
        if (Math.abs(currentScrollY - lastScrollY) < 10) return
      }
      
      if (currentScrollY < scrollThreshold) {
        setIsVisible(true)
      } else if (isScrollingDown && currentScrollY > lastScrollY + 10) {
        // Hide when scrolling down (with small threshold to avoid jitter)
        setIsVisible(false)
        setSolutionsOpen(false) // Close dropdowns when hiding
        setMobileMenuOpen(false)
      } else if (!isScrollingDown && lastScrollY - currentScrollY > 10) {
        // Show when scrolling up (with small threshold)
        setIsVisible(true)
      }
      
      setLastScrollY(currentScrollY)
    }

    // Use RAF for smoother performance
    let ticking = false
    const scrollListener = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', scrollListener, { passive: true })
    return () => window.removeEventListener('scroll', scrollListener)
  }, [lastScrollY])

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-slate-900/70 border-b border-white/10 transition-transform duration-300 ease-out ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="container">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900 rounded-lg">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="text-xl font-bold text-white">Promptly</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8" role="navigation" aria-label="Main navigation">
            <Link href="/products" className="text-white/80 hover:text-white/90 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900 rounded px-2 py-1">
              Products
            </Link>

            {/* Our Solutions Dropdown */}
            <div className="relative" ref={solutionsRef}>
              <button
                onClick={() => setSolutionsOpen(!solutionsOpen)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    setSolutionsOpen(!solutionsOpen)
                  }
                }}
                className="flex items-center text-white/80 hover:text-white/90 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900 rounded px-2 py-1"
                aria-expanded={solutionsOpen}
                aria-haspopup="true"
                aria-controls="solutions-menu"
              >
                Our Solutions
                <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={solutionsOpen ? "M19 15l-7-7-7 7" : "M19 9l-7 7-7-7"} />
                </svg>
              </button>
              
              {solutionsOpen && (
                <div 
                  id="solutions-menu"
                  className="absolute top-full left-0 mt-2 w-64 bg-slate-800/95 backdrop-blur-sm rounded-lg shadow-xl border border-white/10 py-2"
                  role="menu"
                  aria-labelledby="solutions-button"
                >
                  <div className="px-4 py-2 border-b border-white/10 mb-2">
                    <div className="text-xs text-slate-400 uppercase tracking-wide mb-1">Products</div>
                    <Link href="/products" className="block text-sm text-slate-200 hover:text-brand-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-800 rounded px-2 py-1">
                      Promptly
                    </Link>
                    <a href="https://zazateach.com" target="_blank" rel="noopener noreferrer" className="block text-sm text-slate-200 hover:text-green-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-800 rounded px-2 py-1">
                      Teach
                    </a>
                    <Link href="/products#technologies" className="block text-sm text-slate-200 hover:text-purple-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-800 rounded px-2 py-1">
                      Technologies
                    </Link>
                  </div>
                  <div className="px-4 py-1">
                    <div className="text-xs text-slate-400 uppercase tracking-wide mb-1">By Teaching Context</div>
                    <Link href="/personas/uk-primary" className="block px-2 py-1 text-sm text-slate-300 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-800 rounded">
                      UK Primary Teachers
                    </Link>
                    <Link href="/personas/us-secondary" className="block px-2 py-1 text-sm text-slate-300 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-800 rounded">
                      US Secondary Teachers
                    </Link>
                    <Link href="/personas/special-needs" className="block px-2 py-1 text-sm text-slate-300 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-800 rounded">
                      Special Education
                    </Link>
                    <Link href="/personas/international" className="block px-2 py-1 text-sm text-slate-300 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-800 rounded">
                      International Teachers
                    </Link>
                    <Link href="/personas/edtech-savvy" className="block px-2 py-1 text-sm text-slate-300 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-800 rounded">
                      EdTech-Savvy Teachers
                    </Link>
                    <Link href="/personas/head-teacher" className="block px-2 py-1 text-sm text-slate-300 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-800 rounded">
                      Head Teachers & Leaders
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link href="/#snippet" className="text-white/80 hover:text-white/90 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900 rounded px-2 py-1">
              Quick Comment Helper
            </Link>

            <Link href="/blog" className="text-white/80 hover:text-white/90 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900 rounded px-2 py-1">
              Blog
            </Link>

            <Link href="/case-studies" className="text-white/80 hover:text-white/90 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900 rounded px-2 py-1">
              Case Studies
            </Link>

            <Link href="/learning-centre" className="text-white/80 hover:text-white/90 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900 rounded px-2 py-1">
              Learning Centre
            </Link>
            
            <Link href="/free-resources" className="text-white/80 hover:text-white/90 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900 rounded px-2 py-1">
              Free Resources
            </Link>

            <Link href="/about/founder" className="text-white/80 hover:text-white/90 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900 rounded px-2 py-1">
              Meet Your Fellow Educator
            </Link>

            <Link href="/contact" className="text-white/80 hover:text-white/90 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900 rounded px-2 py-1">
              Contact
            </Link>
          </nav>

          {/* Search & Right-side CTAs */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Search Input */}
            <div className="w-64">
              <SearchInput 
                placeholder="Search..."
                className="w-full"
              />
            </div>
            
            <a 
              href="https://zazateach.com" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/80 hover:text-white/90 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900 rounded px-2 py-1"
            >
              Try Free Classroom Tool
            </a>
            
            <Link 
              href="/pricing"
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-900"
            >
              Try Free for Your Classroom
            </Link>

            {/* Dark Mode Toggle */}
            <ThemeToggle />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-white hover:text-white/80 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            shouldReduceMotion ? (
              <div 
                id="mobile-menu" 
                className="md:hidden py-4 border-t border-white/10" 
                ref={mobileMenuRef}
                role="navigation"
                aria-label="Mobile navigation"
              >
                {/* Mobile menu content will be duplicated in motion version */}
                <div className="flex flex-col space-y-3">
                  {/* Mobile Search */}
                  <div className="pb-3 border-b border-white/10">
                    <SearchInput 
                      placeholder="Search..."
                      className="w-full"
                    />
                  </div>
                  
                  <Link href="/products" className="text-slate-300 font-medium py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900 rounded px-2">
                    Products
                  </Link>
                  <Link href="/personas" className="text-slate-300 font-medium py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900 rounded px-2">
                    Our Solutions
                  </Link>
                  <Link href="/#snippet" className="text-slate-300 font-medium py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900 rounded px-2">
                    Quick Comment Helper
                  </Link>
                  <Link href="/blog" className="text-slate-300 font-medium py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900 rounded px-2">
                    Blog
                  </Link>
                  <Link href="/case-studies" className="text-slate-300 font-medium py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900 rounded px-2">
                    Case Studies
                  </Link>
                  <Link href="/learning-centre" className="text-slate-300 font-medium py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900 rounded px-2">
                    Learning Centre
                  </Link>
                  <Link href="/free-resources" className="text-slate-300 font-medium py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900 rounded px-2">
                    Free Resources
                  </Link>
                  <Link href="/about/founder" className="text-slate-300 font-medium py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900 rounded px-2">
                    Meet Your Fellow Educator
                  </Link>
                  <Link href="/contact" className="text-slate-300 font-medium py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900 rounded px-2">
                    Contact
                  </Link>
                  <a 
                    href="https://zazateach.com" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-300 font-medium py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900 rounded px-2"
                  >
                    Try Free Classroom Tool
                  </a>
                  <Link 
                    href="/pricing"
                    className="inline-flex items-center justify-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-900"
                  >
                    Try Free for Your Classroom
                  </Link>
                  <ThemeToggle variant="mobile" />
                </div>
              </div>
            ) : (
              <motion.div 
                id="mobile-menu" 
                className="md:hidden py-4 border-t border-white/10" 
                ref={mobileMenuRef}
                role="navigation"
                aria-label="Mobile navigation"
                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                transition={{ duration: 0.12, ease: 'easeOut' }}
              >
                <div className="flex flex-col space-y-3">
                  {/* Mobile Search */}
                  <div className="pb-3 border-b border-white/10">
                    <SearchInput 
                      placeholder="Search..."
                      className="w-full"
                    />
                  </div>
                  
                  <Link href="/products" className="text-slate-300 font-medium py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900 rounded px-2">
                    Products
                  </Link>
                  <Link href="/personas" className="text-slate-300 font-medium py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900 rounded px-2">
                    Our Solutions
                  </Link>
                  <Link href="/#snippet" className="text-slate-300 font-medium py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900 rounded px-2">
                    Quick Comment Helper
                  </Link>
                  <Link href="/blog" className="text-slate-300 font-medium py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900 rounded px-2">
                    Blog
                  </Link>
                  <Link href="/case-studies" className="text-slate-300 font-medium py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900 rounded px-2">
                    Case Studies
                  </Link>
                  <Link href="/learning-centre" className="text-slate-300 font-medium py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900 rounded px-2">
                    Learning Centre
                  </Link>
                  <Link href="/free-resources" className="text-slate-300 font-medium py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900 rounded px-2">
                    Free Resources
                  </Link>
                  <Link href="/about/founder" className="text-slate-300 font-medium py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900 rounded px-2">
                    Meet Your Fellow Educator
                  </Link>
                  <Link href="/contact" className="text-slate-300 font-medium py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900 rounded px-2">
                    Contact
                  </Link>
                  <a 
                    href="https://zazateach.com" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-300 font-medium py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900 rounded px-2"
                  >
                    Try Free Classroom Tool
                  </a>
                  <Link 
                    href="/pricing"
                    className="inline-flex items-center justify-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-900"
                  >
                    Try Free for Your Classroom
                  </Link>
                  <ThemeToggle variant="mobile" />
                </div>
              </motion.div>
            )
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}