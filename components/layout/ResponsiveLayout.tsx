'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

// Breakpoint detection hook
export function useBreakpoint() {
  const [breakpoint, setBreakpoint] = useState<'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'>('lg')

  useEffect(() => {
    function updateBreakpoint() {
      const width = window.innerWidth
      if (width < 475) setBreakpoint('xs')
      else if (width < 640) setBreakpoint('sm') 
      else if (width < 768) setBreakpoint('md')
      else if (width < 1024) setBreakpoint('lg')
      else if (width < 1280) setBreakpoint('xl')
      else setBreakpoint('2xl')
    }

    updateBreakpoint()
    window.addEventListener('resize', updateBreakpoint)
    return () => window.removeEventListener('resize', updateBreakpoint)
  }, [])

  return breakpoint
}

// Responsive navigation header
interface ResponsiveHeaderProps {
  logo: React.ReactNode
  navigation: Array<{
    label: string
    href: string
    dropdown?: Array<{ label: string; href: string }>
  }>
  actions?: React.ReactNode
  className?: string
}

export function ResponsiveHeader({ logo, navigation, actions, className = '' }: ResponsiveHeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const breakpoint = useBreakpoint()

  const isMobile = breakpoint === 'xs' || breakpoint === 'sm'

  return (
    <header className={cn('sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 dark:bg-gray-900/95 dark:border-gray-700', className)}>
      <div className="container-mobile">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            {logo}
          </div>

          {/* Desktop Navigation */}
          {!isMobile && (
            <nav className="hidden md:flex md:items-center md:space-x-8">
              {navigation.map((item) => (
                <div key={item.label} className="relative">
                  {item.dropdown ? (
                    <div className="relative">
                      <button
                        onClick={() => setOpenDropdown(openDropdown === item.label ? null : item.label)}
                        className="flex items-center space-x-1 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 px-3 py-2 text-sm font-medium transition-colors"
                      >
                        <span>{item.label}</span>
                        <ChevronDown className="w-4 h-4" />
                      </button>
                      
                      {openDropdown === item.label && (
                        <div className="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 py-1">
                          {item.dropdown.map((subItem) => (
                            <a
                              key={subItem.label}
                              href={subItem.href}
                              className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                            >
                              {subItem.label}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <a
                      href={item.href}
                      className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 px-3 py-2 text-sm font-medium transition-colors"
                    >
                      {item.label}
                    </a>
                  )}
                </div>
              ))}
            </nav>
          )}

          {/* Desktop Actions */}
          {!isMobile && actions && (
            <div className="hidden md:flex md:items-center md:space-x-4">
              {actions}
            </div>
          )}

          {/* Mobile Menu Button */}
          {isMobile && (
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          )}
        </div>

        {/* Mobile Navigation Menu */}
        {isMobile && isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <div key={item.label}>
                  {item.dropdown ? (
                    <div>
                      <button
                        onClick={() => setOpenDropdown(openDropdown === item.label ? null : item.label)}
                        className="flex items-center justify-between w-full px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 transition-colors"
                      >
                        <span>{item.label}</span>
                        <ChevronDown className={cn('w-4 h-4 transition-transform', openDropdown === item.label && 'rotate-180')} />
                      </button>
                      
                      {openDropdown === item.label && (
                        <div className="pl-4 space-y-1">
                          {item.dropdown.map((subItem) => (
                            <a
                              key={subItem.label}
                              href={subItem.href}
                            className="block px-3 py-2 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              {subItem.label}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <a
                      href={item.href}
                      className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                    </a>
                  )}
                </div>
              ))}
              
              {/* Mobile Actions */}
              {actions && (
                <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="space-y-2">
                    {actions}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

// Responsive hero section
interface ResponsiveHeroProps {
  title: string
  subtitle?: string
  description?: string
  actions?: React.ReactNode
  image?: React.ReactNode
  background?: 'gradient' | 'solid' | 'image'
  className?: string
}

export function ResponsiveHero({ 
  title, 
  subtitle, 
  description, 
  actions, 
  image, 
  background = 'gradient',
  className = '' 
}: ResponsiveHeroProps) {
  const breakpoint = useBreakpoint()
  const isMobile = breakpoint === 'xs' || breakpoint === 'sm'

  const backgroundClasses = {
    gradient: 'bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-purple-900/20 dark:via-gray-900 dark:to-pink-900/20',
    solid: 'bg-white dark:bg-gray-900',
    image: 'bg-cover bg-center bg-no-repeat'
  }

  return (
    <section className={cn(
      'relative overflow-hidden',
      backgroundClasses[background],
      isMobile ? 'py-12' : 'py-16 lg:py-24',
      className
    )}>
      <div className="container-mobile">
        <div className={cn(
          'grid items-center gap-8',
          image ? 'lg:grid-cols-2' : 'max-w-4xl mx-auto text-center'
        )}>
          {/* Content */}
          <div className={cn(
            'space-y-4',
            image && !isMobile ? 'lg:space-y-6' : 'space-y-6'
          )}>
            {subtitle && (
              <div className="text-sm font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-wide">
                {subtitle}
              </div>
            )}
            
            <h1 className={cn(
              'font-bold text-gray-900 dark:text-gray-100 leading-tight',
              isMobile ? 'text-3xl' : 'text-4xl lg:text-5xl xl:text-6xl'
            )}>
              {title}
            </h1>
            
            {description && (
              <p className={cn(
                'text-gray-600 dark:text-gray-300 leading-relaxed',
                isMobile ? 'text-base' : 'text-lg lg:text-xl',
                image ? 'max-w-none' : 'max-w-3xl mx-auto'
              )}>
                {description}
              </p>
            )}
            
            {actions && (
              <div className={cn(
                'flex gap-4',
                isMobile ? 'flex-col' : image ? 'flex-row' : 'flex-row justify-center'
              )}>
                {actions}
              </div>
            )}
          </div>

          {/* Image */}
          {image && (
            <div className={cn(
              'relative',
              isMobile ? 'order-first' : 'lg:order-last'
            )}>
              {image}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

// Responsive card grid
interface ResponsiveCardGridProps {
  children: React.ReactNode
  cols?: {
    xs?: number
    sm?: number
    md?: number
    lg?: number
    xl?: number
  }
  gap?: 'sm' | 'md' | 'lg'
  className?: string
}

export function ResponsiveCardGrid({ 
  children, 
  cols = { xs: 1, sm: 2, lg: 3 },
  gap = 'md',
  className = '' 
}: ResponsiveCardGridProps) {
  const gapClasses = {
    sm: 'gap-4',
    md: 'gap-6', 
    lg: 'gap-8'
  }

  const colClasses = [
    cols.xs && `grid-cols-${cols.xs}`,
    cols.sm && `sm:grid-cols-${cols.sm}`,
    cols.md && `md:grid-cols-${cols.md}`,
    cols.lg && `lg:grid-cols-${cols.lg}`,
    cols.xl && `xl:grid-cols-${cols.xl}`
  ].filter(Boolean).join(' ')

  return (
    <div className={cn(
      'grid',
      colClasses,
      gapClasses[gap],
      className
    )}>
      {children}
    </div>
  )
}

// Responsive footer
interface ResponsiveFooterProps {
  logo: React.ReactNode
  sections: Array<{
    title: string
    links: Array<{ label: string; href: string }>
  }>
  bottom?: React.ReactNode
  className?: string
}

export function ResponsiveFooter({ logo, sections, bottom, className = '' }: ResponsiveFooterProps) {
  const breakpoint = useBreakpoint()
  const isMobile = breakpoint === 'xs' || breakpoint === 'sm'

  return (
    <footer className={cn('bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700', className)}>
      <div className="container-mobile">
        <div className={cn(
          'grid gap-8',
          isMobile ? 'py-12' : 'py-16',
          isMobile ? 'grid-cols-1' : 'lg:grid-cols-4'
        )}>
          {/* Logo and description */}
          <div className={cn(isMobile ? 'text-center' : 'lg:col-span-1')}>
            {logo}
          </div>

          {/* Footer sections */}
          <div className={cn(
            'grid gap-8',
            isMobile ? 'grid-cols-1 text-center' : 'sm:grid-cols-2 lg:grid-cols-3 lg:col-span-3'
          )}>
            {sections.map((section) => (
              <div key={section.title}>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  {section.title}
                </h3>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors text-sm"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom section */}
        {bottom && (
          <div className={cn(
            'border-t border-gray-200 dark:border-gray-700 pt-8 pb-8',
            isMobile ? 'text-center' : 'flex items-center justify-between'
          )}>
            {bottom}
          </div>
        )}
      </div>
    </footer>
  )
}

// Screen size testing component
export function ResponsiveTestGrid() {
  const breakpoint = useBreakpoint()
  
  return (
    <div className="fixed bottom-4 left-4 z-50 bg-black text-white px-3 py-2 rounded text-xs font-mono">
      Screen: {breakpoint} ({window.innerWidth}px)
    </div>
  )
}

// Component for testing responsive behavior
export function ResponsiveShowcase() {
  const breakpoint = useBreakpoint()

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <ResponsiveHeader
        logo={
          <div className="font-bold text-xl text-purple-600">
            Zaza Promptly
          </div>
        }
        navigation={[
          { label: 'Home', href: '/' },
          { 
            label: 'Features', 
            href: '/features',
            dropdown: [
              { label: 'AI Comments', href: '/features/ai-comments' },
              { label: 'Templates', href: '/features/templates' },
              { label: 'Analytics', href: '/features/analytics' }
            ]
          },
          { label: 'Pricing', href: '/pricing' },
          { label: 'About', href: '/about' }
        ]}
        actions={
          <>
            <button className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 px-3 py-2 text-sm font-medium">
              Sign In
            </button>
            <button className="bg-purple-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-purple-700 transition-colors">
              Get Started
            </button>
          </>
        }
      />

      <ResponsiveHero
        subtitle="AI-Powered Teaching Assistant"
        title="Transform Your Parent Communication"
        description="Generate thoughtful, professional parent communications in seconds. Save hours every week with AI that understands education."
        actions={
          <>
            <button className="bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors">
              Start Free Trial
            </button>
            <button className="border border-gray-300 text-gray-700 dark:text-gray-300 dark:border-gray-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              Watch Demo
            </button>
          </>
        }
        image={
          <div className="bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg aspect-video flex items-center justify-center text-white font-semibold">
            Demo Video/Image
          </div>
        }
      />

      <section className="py-16">
        <div className="container-mobile">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-gray-100 mb-12">
            Responsive Card Grid
          </h2>
          <ResponsiveCardGrid cols={{ xs: 1, sm: 2, lg: 3 }}>
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  Feature {i}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  This card adapts to different screen sizes using responsive grid columns.
                </p>
              </div>
            ))}
          </ResponsiveCardGrid>
        </div>
      </section>

      <ResponsiveFooter
        logo={
          <div>
            <div className="font-bold text-xl text-purple-600 mb-2">
              Zaza Promptly
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              AI-powered tools for amazing educators
            </p>
          </div>
        }
        sections={[
          {
            title: 'Product',
            links: [
              { label: 'Features', href: '/features' },
              { label: 'Pricing', href: '/pricing' },
              { label: 'Templates', href: '/templates' }
            ]
          },
          {
            title: 'Support',
            links: [
              { label: 'Help Center', href: '/help' },
              { label: 'Contact', href: '/contact' },
              { label: 'Status', href: '/status' }
            ]
          },
          {
            title: 'Company',
            links: [
              { label: 'About', href: '/about' },
              { label: 'Blog', href: '/blog' },
              { label: 'Careers', href: '/careers' }
            ]
          }
        ]}
        bottom={
          <>
            <div className="text-gray-600 dark:text-gray-300 text-sm">
              © 2024 Zaza Promptly. All rights reserved.
            </div>
            <div className="flex space-x-4 text-sm">
              <Link href="/privacy" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
                Terms
              </Link>
            </div>
          </>
        }
      />

      <ResponsiveTestGrid />
    </div>
  )
}