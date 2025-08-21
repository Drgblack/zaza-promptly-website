'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [solutionsOpen, setSolutionsOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(false)

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle('dark')
  }

  return (
    <header className="sticky top-0 z-50 backdrop-blur-lg bg-slate-900/70 border-b border-white/10">
      <div className="container">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="text-xl font-bold text-white">Promptly</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/products" className="text-white/80 hover:text-white/90 font-medium transition-colors">
              Products
            </Link>

            {/* Our Solutions Dropdown */}
            <div className="relative">
              <button
                onClick={() => setSolutionsOpen(!solutionsOpen)}
                className="flex items-center text-white/80 hover:text-white/90 font-medium transition-colors"
              >
                Our Solutions
                <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {solutionsOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-slate-800/95 backdrop-blur-sm rounded-lg shadow-xl border border-white/10 py-2">
                  <div className="px-4 py-2 border-b border-white/10 mb-2">
                    <div className="text-xs text-slate-400 uppercase tracking-wide mb-1">Products</div>
                    <Link href="/products" className="block text-sm text-slate-200 hover:text-brand-400 transition-colors">
                      Promptly
                    </Link>
                    <a href="https://zazateach.com" target="_blank" rel="noopener noreferrer" className="block text-sm text-slate-200 hover:text-green-400 transition-colors">
                      Teach
                    </a>
                    <Link href="/products#technologies" className="block text-sm text-slate-200 hover:text-purple-400 transition-colors">
                      Technologies
                    </Link>
                  </div>
                  <div className="px-4 py-1">
                    <div className="text-xs text-slate-400 uppercase tracking-wide mb-1">By Role</div>
                    <Link href="/personas/teacher" className="block px-0 py-1 text-sm text-slate-300 hover:text-white transition-colors">
                      Classroom Teacher
                    </Link>
                    <Link href="/personas/head-of-year" className="block px-0 py-1 text-sm text-slate-300 hover:text-white transition-colors">
                      Head of Year
                    </Link>
                    <Link href="/personas/slt" className="block px-0 py-1 text-sm text-slate-300 hover:text-white transition-colors">
                      Senior Leadership
                    </Link>
                    <Link href="/personas/senco" className="block px-0 py-1 text-sm text-slate-300 hover:text-white transition-colors">
                      SENCO
                    </Link>
                    <Link href="/personas/tutor" className="block px-0 py-1 text-sm text-slate-300 hover:text-white transition-colors">
                      Form Tutor
                    </Link>
                    <Link href="/personas/admin" className="block px-0 py-1 text-sm text-slate-300 hover:text-white transition-colors">
                      School Admin
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link href="/#snippet" className="text-white/80 hover:text-white/90 font-medium transition-colors">
              Snippet Tool
            </Link>

            <Link href="/blog" className="text-white/80 hover:text-white/90 font-medium transition-colors">
              Blog
            </Link>

            <Link href="/learning-centre" className="text-white/80 hover:text-white/90 font-medium transition-colors">
              Learning Centre
            </Link>
            
            <Link href="/free-resources" className="text-white/80 hover:text-white/90 font-medium transition-colors">
              Free Resources
            </Link>

            <Link href="/about/founder" className="text-white/80 hover:text-white/90 font-medium transition-colors">
              Founder
            </Link>

            <Link href="/contact" className="text-white/80 hover:text-white/90 font-medium transition-colors">
              Contact
            </Link>
          </nav>

          {/* Right-side CTAs */}
          <div className="hidden md:flex items-center space-x-4">
            <a 
              href="https://zazateach.com" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/80 hover:text-white/90 font-medium transition-colors"
            >
              Try Zaza Teach
            </a>
            
            <Link 
              href="/waitlist"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
            >
              Join Waitlist
            </Link>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-gray-700 dark:text-gray-300"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/10">
            <div className="flex flex-col space-y-3">
              <Link href="/products" className="text-slate-300 font-medium py-2">
                Products
              </Link>
              <Link href="/personas" className="text-slate-300 font-medium py-2">
                Our Solutions
              </Link>
              <Link href="/#snippet" className="text-slate-300 font-medium py-2">
                Snippet Tool
              </Link>
              <Link href="/blog" className="text-slate-300 font-medium py-2">
                Blog
              </Link>
              <Link href="/learning-centre" className="text-slate-300 font-medium py-2">
                Learning Centre
              </Link>
              <Link href="/free-resources" className="text-slate-300 font-medium py-2">
                Free Resources
              </Link>
              <Link href="/about/founder" className="text-slate-300 font-medium py-2">
                Founder
              </Link>
              <Link href="/contact" className="text-slate-300 font-medium py-2">
                Contact
              </Link>
              <a 
                href="https://zazateach.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-300 font-medium py-2"
              >
                Try Zaza Teach
              </a>
              <Link 
                href="/waitlist"
                className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg"
              >
                Join Waitlist
              </Link>
              <button
                onClick={toggleDarkMode}
                className="flex items-center text-slate-300 font-medium py-2"
              >
                {darkMode ? '☀️' : '🌙'} Toggle theme
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}