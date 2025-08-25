'use client'

import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import ThemeToggle from './ui/ThemeToggle'
import LanguageSwitcher from './nav/LanguageSwitcher'
import { isExternal } from '@/lib/link-utils'

interface MenuGroup {
  title: string
  description?: string
  items: {
    title: string
    href: string
    description?: string
  }[]
}

const MENU_GROUPS: Record<string, MenuGroup> = {
  products: {
    title: 'Zaza Ecosystem',
    description: 'AI-powered tools for modern educators',
    items: [
      { title: 'Promptly', href: '/', description: 'AI assistant for teacher reports and communications' },
      { title: 'Quick Comment Helper', href: '/quick-comment-helper', description: 'Generate report comments instantly' },
      { title: 'Zaza Teach', href: 'https://zazateach.com', description: 'Comprehensive teaching toolkit and lesson planning' },
      { title: 'Zaza Notably', href: 'https://zazanotably.com', description: 'Smart note-taking for educational professionals' },
      { title: 'Try Free Classroom Tool', href: '/tools/classroom', description: 'Start with our free classroom toolkit' }, // TODO: Create placeholder page
    ]
  },
  solutions: {
    title: 'Solutions',
    description: 'Tailored for every teaching context',
    items: [
      { title: 'UK Primary Teachers', href: '/solutions/uk-primary', description: 'Primary education solutions for the UK curriculum' }, // TODO: Create or link to existing
      { title: 'US Secondary Teachers', href: '/solutions/us-secondary', description: 'Secondary education tools for US schools' }, // TODO: Create or link to existing
      { title: 'Special Education Teachers', href: '/solutions/special-education', description: 'Specialized tools for inclusive education' }, // TODO: Create or link to existing
      { title: 'International Teachers', href: '/solutions/international', description: 'Global solutions for diverse educational systems' }, // TODO: Create or link to existing
      { title: 'EdTech-Savvy Teachers', href: '/solutions/edtech-savvy', description: 'Advanced tools for tech-forward educators' }, // TODO: Create or link to existing
      { title: 'Head Teachers & Leaders', href: '/solutions/head-teachers-leaders', description: 'Leadership tools for school administrators' }, // TODO: Create or link to existing
    ]
  },
  resources: {
    title: 'Resources',
    description: 'Everything you need to succeed',
    items: [
      { title: 'Learning Centre', href: '/learning-centre', description: 'Guides, tutorials, and best practices' },
      { title: 'Free Resources', href: '/resources', description: 'Download free templates and tools' }, // TODO: Check if /resources exists vs /free-resources
      { title: 'Case Studies', href: '/case-studies', description: 'Real teacher success stories' },
      { title: 'Blog', href: '/blog', description: 'Latest insights on AI in education' },
      { title: 'FAQ', href: '/faq', description: 'Frequently asked questions' },
    ]
  },
  company: {
    title: 'Company',
    description: 'About Zaza Technologies',
    items: [
      { title: 'Meet Your Fellow Educator', href: '/about', description: 'Learn about our founder Dr. Greg Blackburn' }, // TODO: Check if /about exists vs /about/founder
      { title: 'Contact', href: '/contact', description: 'Get in touch with our team' },
      { title: 'Reliable AI That Won\'t Make Things Up', href: '/reliable-ai', description: 'Our commitment to hallucination-free AI' }, // TODO: Create placeholder
      { title: 'Student Privacy Protected', href: '/student-privacy', description: 'How we keep student data safe' }, // TODO: Create placeholder
      { title: 'Privacy Policy', href: '/privacy-policy', description: 'Our data protection policies' }, // TODO: Check if exists vs /privacy
    ]
  }
}

export default function Header() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const menuRefs = useRef<Record<string, HTMLDivElement | null>>({})
  const mobileMenuRef = useRef<HTMLDivElement>(null)

  // Handle escape key and click outside for dropdowns
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveMenu(null)
        setMobileMenuOpen(false)
      }
    }

    const handleClickOutside = (e: MouseEvent) => {
      // Check if click is outside any open menu
      if (activeMenu && menuRefs.current[activeMenu] && !menuRefs.current[activeMenu]?.contains(e.target as Node)) {
        setActiveMenu(null)
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
  }, [activeMenu])

  // Hide on scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const isScrollingDown = currentScrollY > lastScrollY
      const scrollThreshold = 50
      
      if (window.innerWidth <= 768) {
        if (Math.abs(currentScrollY - lastScrollY) < 10) return
      }
      
      if (currentScrollY < scrollThreshold) {
        setIsVisible(true)
      } else if (isScrollingDown && currentScrollY > lastScrollY + 10) {
        setIsVisible(false)
        setActiveMenu(null)
        setMobileMenuOpen(false)
      } else if (!isScrollingDown && lastScrollY - currentScrollY > 10) {
        setIsVisible(true)
      }
      
      setLastScrollY(currentScrollY)
    }

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

  const handleMenuToggle = (menuKey: string) => {
    setActiveMenu(activeMenu === menuKey ? null : menuKey)
  }

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-40 backdrop-blur-lg bg-slate-900/70 border-b border-white/10 transition-transform duration-300 ease-out ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="container">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900 rounded-lg p-1">
              <img 
                src="/images/zaza-logo.svg" 
                alt="Zaza Logo" 
                className="h-6 w-auto sm:h-8"
                width={32}
                height={32}
              />
              <span className="text-xl font-bold text-white">Promptly</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1" role="navigation" aria-label="Main navigation">
            {Object.entries(MENU_GROUPS).map(([key, group]) => (
              <div key={key} className="relative" ref={el => { menuRefs.current[key] = el }}>
                <button
                  onClick={() => handleMenuToggle(key)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      handleMenuToggle(key)
                    }
                  }}
                  className="flex items-center px-4 py-2 text-white/80 hover:text-white/90 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900 rounded-lg"
                  aria-expanded={activeMenu === key}
                  aria-haspopup="true"
                  aria-controls={activeMenu === key ? `${key}-menu` : undefined}
                >
                  {group.title}
                  <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={activeMenu === key ? "M19 15l-7-7-7 7" : "M19 9l-7 7-7-7"} />
                  </svg>
                </button>
                
                {activeMenu === key && (
                  <div 
                    id={`${key}-menu`}
                    className="absolute top-full left-0 mt-1 w-80 bg-slate-800/95 backdrop-blur-sm rounded-lg shadow-xl border border-white/10 py-4 z-50"
                    role="menu"
                  >
                    {group.description && (
                      <div className="px-4 pb-3 border-b border-white/10 mb-3">
                        <p className="text-xs text-slate-400 font-medium">{group.description}</p>
                      </div>
                    )}
                    <div className="space-y-1">
                      {group.items.map((item) => {
                        const external = isExternal(item.href)
                        return external ? (
                          <a
                            key={item.href}
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block px-4 py-3 hover:bg-slate-700/50 transition-colors focus:outline-none focus:bg-slate-700/50 rounded-none group"
                            role="menuitem"
                            onClick={() => setActiveMenu(null)}
                          >
                            <div className="text-sm font-medium text-white group-hover:text-blue-300 transition-colors flex items-center">
                              {item.title}
                              <svg className="w-3 h-3 ml-1 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                            </div>
                            {item.description && (
                              <div className="text-xs text-slate-400 mt-1 leading-relaxed">
                                {item.description}
                              </div>
                            )}
                          </a>
                        ) : (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="block px-4 py-3 hover:bg-slate-700/50 transition-colors focus:outline-none focus:bg-slate-700/50 rounded-none group"
                            role="menuitem"
                            onClick={() => setActiveMenu(null)}
                          >
                            <div className="text-sm font-medium text-white group-hover:text-blue-300 transition-colors">
                              {item.title}
                            </div>
                            {item.description && (
                              <div className="text-xs text-slate-400 mt-1 leading-relaxed">
                                {item.description}
                              </div>
                            )}
                          </Link>
                        )
                      })}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right side items */}
          <div className="hidden lg:flex items-center space-x-4">
            <LanguageSwitcher />
            
            <Link 
              href="/pricing"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900"
            >
              Start Free
            </Link>

            <ThemeToggle />
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
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
        {mobileMenuOpen && (
          <div 
            id="mobile-menu" 
            className="lg:hidden fixed inset-0 top-[73px] bg-slate-900/95 backdrop-blur-lg z-50 overflow-y-auto" 
            ref={mobileMenuRef}
          >
            <div className="p-4 space-y-1">
              {/* Language selector at top */}
              <LanguageSwitcher variant="mobile" />
              
              {/* Menu groups as accordions */}
              {Object.entries(MENU_GROUPS).map(([key, group]) => {
                const isExpanded = activeMenu === key
                return (
                  <div key={key} className="border-b border-white/10 last:border-b-0">
                    <button
                      onClick={() => handleMenuToggle(key)}
                      className="w-full flex items-center justify-between py-4 text-left text-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
                      aria-expanded={isExpanded}
                    >
                      <span>{group.title}</span>
                      <svg className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {isExpanded && (
                      <div className="pb-4 space-y-2">
                        {group.items.map((item) => {
                          const external = isExternal(item.href)
                          return external ? (
                            <a
                              key={item.href}
                              href={item.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block pl-4 py-2 text-slate-300 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              <div className="font-medium flex items-center">
                                {item.title}
                                <svg className="w-3 h-3 ml-1 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                              </div>
                              {item.description && (
                                <div className="text-xs text-slate-400 mt-1">{item.description}</div>
                              )}
                            </a>
                          ) : (
                            <Link
                              key={item.href}
                              href={item.href}
                              className="block pl-4 py-2 text-slate-300 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              <div className="font-medium">{item.title}</div>
                              {item.description && (
                                <div className="text-xs text-slate-400 mt-1">{item.description}</div>
                              )}
                            </Link>
                          )
                        })}
                      </div>
                    )}
                  </div>
                )
              })}
              
              {/* CTA at bottom */}
              <div className="pt-6 border-t border-white/10">
                <Link 
                  href="/pricing"
                  className="block w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg text-center transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Start Free
                </Link>
                <div className="mt-4 flex justify-center">
                  <ThemeToggle variant="mobile" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}