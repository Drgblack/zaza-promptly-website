"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { 
  ChevronDown, 
  ExternalLink, 
  Sparkles, 
  GraduationCap, 
  Palette,
  Zap,
  Menu,
  X,
  Globe
} from 'lucide-react'

interface ZazaApp {
  id: string
  name: string
  fullName: string
  url: string
  description: string
  status: 'live' | 'beta' | 'coming_soon'
  icon: React.ReactNode
  color: string
}

const ZAZA_APPS: ZazaApp[] = [
  {
    id: 'promptly',
    name: 'Promptly',
    fullName: 'Zaza Promptly',
    url: '/',
    description: 'Free AI prompts & teaching resources',
    status: 'live',
    icon: <Sparkles className="w-5 h-5" />,
    color: 'purple'
  },
  {
    id: 'teach',
    name: 'Teach',
    fullName: 'Zaza Teach',
    url: 'https://zazateach.com',
    description: 'Complete lesson planning platform',
    status: 'live',
    icon: <GraduationCap className="w-5 h-5" />,
    color: 'blue'
  },
  {
    id: 'visuals',
    name: 'Visuals',
    fullName: 'Zaza Visuals',
    url: 'https://zazavisuals.com',
    description: 'AI-powered classroom graphics',
    status: 'beta',
    icon: <Palette className="w-5 h-5" />,
    color: 'green'
  },
  {
    id: 'autoplanner',
    name: 'AutoPlanner',
    fullName: 'Zaza AutoPlanner',
    url: '#',
    description: 'Automated weekly lesson planning',
    status: 'coming_soon',
    icon: <Zap className="w-5 h-5" />,
    color: 'orange'
  }
]

interface UnifiedHeaderProps {
  currentApp?: string
  className?: string
}

export function UnifiedHeader({ 
  currentApp = 'promptly', 
  className = '' 
}: UnifiedHeaderProps) {
  const [isAppMenuOpen, setIsAppMenuOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const currentAppData = ZAZA_APPS.find(app => app.id === currentApp) || ZAZA_APPS[0]
  const otherApps = ZAZA_APPS.filter(app => app.id !== currentApp)

  const getStatusBadge = (status: string) => {
    const badges = {
      live: <span className="px-2 py-0.5 text-xs bg-green-100 text-green-700 rounded-full">Live</span>,
      beta: <span className="px-2 py-0.5 text-xs bg-yellow-100 text-yellow-700 rounded-full">Beta</span>,
      coming_soon: <span className="px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded-full">Soon</span>
    }
    return badges[status as keyof typeof badges]
  }

  const getColorClasses = (color: string) => {
    const colors = {
      purple: 'text-purple-600 hover:text-purple-700',
      blue: 'text-blue-600 hover:text-blue-700',
      green: 'text-green-600 hover:text-green-700',
      orange: 'text-orange-600 hover:text-orange-700'
    }
    return colors[color as keyof typeof colors] || colors.purple
  }

  return (
    <header className={`sticky top-0 z-50 bg-white border-b transition-shadow duration-200 ${
      isScrolled ? 'shadow-sm' : ''
    } ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and App Switcher */}
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">Z</span>
              </div>
              <div>
                <div className="font-bold text-gray-900">{currentAppData.fullName}</div>
                <div className="text-xs text-gray-500 -mt-1">by Zaza Technologies</div>
              </div>
            </Link>

            {/* App Suite Indicator */}
            <div className="hidden md:block relative">
              <button
                onClick={() => setIsAppMenuOpen(!isAppMenuOpen)}
                className="flex items-center space-x-1 px-3 py-1 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors text-sm text-gray-600"
              >
                <Globe className="w-4 h-4" />
                <span>Apps</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${isAppMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* App Dropdown Menu */}
              {isAppMenuOpen && (
                <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <h3 className="font-semibold text-gray-900">Zaza App Suite</h3>
                    <p className="text-sm text-gray-600">AI-powered tools for educators</p>
                  </div>
                  
                  <div className="py-2">
                    {ZAZA_APPS.map((app) => (
                      <div key={app.id} className={`px-4 py-3 hover:bg-gray-50 ${
                        app.id === currentApp ? 'bg-purple-50' : ''
                      }`}>
                        {app.url.startsWith('http') ? (
                          <a
                            href={app.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between group"
                          >
                            <div className="flex items-center space-x-3">
                              <div className={`${getColorClasses(app.color)}`}>
                                {app.icon}
                              </div>
                              <div>
                                <div className="font-medium text-gray-900 group-hover:text-gray-700">
                                  {app.fullName}
                                  {app.id === currentApp && <span className="ml-2 text-xs text-purple-600">(current)</span>}
                                </div>
                                <div className="text-sm text-gray-500">{app.description}</div>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              {getStatusBadge(app.status)}
                              {app.status !== 'coming_soon' && (
                                <ExternalLink className="w-4 h-4 text-gray-400" />
                              )}
                            </div>
                          </a>
                        ) : (
                          <Link href={app.url} className="flex items-center justify-between group">
                            <div className="flex items-center space-x-3">
                              <div className={`${getColorClasses(app.color)}`}>
                                {app.icon}
                              </div>
                              <div>
                                <div className="font-medium text-gray-900 group-hover:text-gray-700">
                                  {app.fullName}
                                  {app.id === currentApp && <span className="ml-2 text-xs text-purple-600">(current)</span>}
                                </div>
                                <div className="text-sm text-gray-500">{app.description}</div>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              {getStatusBadge(app.status)}
                            </div>
                          </Link>
                        )}
                      </div>
                    ))}
                  </div>
                  
                  <div className="border-t border-gray-100 px-4 py-2 mt-2">
                    <Link 
                      href="/zaza-ecosystem" 
                      className="text-sm text-purple-600 hover:text-purple-700 font-medium"
                    >
                      Learn about the Zaza ecosystem →
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/free-resources" className="text-gray-600 hover:text-gray-900 transition-colors">
              Free Resources
            </Link>
            <Link href="/blog" className="text-gray-600 hover:text-gray-900 transition-colors">
              Blog
            </Link>
            <Link href="/community" className="text-gray-600 hover:text-gray-900 transition-colors">
              Community
            </Link>
            
            {/* Cross-app CTA */}
            {currentApp === 'promptly' && (
              <a
                href="https://zazateach.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1 text-blue-600 hover:text-blue-700 font-medium transition-colors"
              >
                <GraduationCap className="w-4 h-4" />
                <span>Try Zaza Teach</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-gray-600 hover:text-gray-900"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="space-y-4">
              <Link 
                href="/free-resources" 
                className="block text-gray-600 hover:text-gray-900 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Free Resources
              </Link>
              <Link 
                href="/blog" 
                className="block text-gray-600 hover:text-gray-900 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Blog
              </Link>
              <Link 
                href="/community" 
                className="block text-gray-600 hover:text-gray-900 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Community
              </Link>
              
              <div className="border-t border-gray-200 pt-4">
                <h4 className="font-medium text-gray-900 mb-3">Zaza Apps</h4>
                <div className="space-y-3">
                  {otherApps.map((app) => (
                    <div key={app.id}>
                      {app.url.startsWith('http') ? (
                        <a
                          href={app.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <div className="flex items-center space-x-3">
                            <div className={`${getColorClasses(app.color)}`}>
                              {app.icon}
                            </div>
                            <span className="font-medium text-gray-900">{app.fullName}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            {getStatusBadge(app.status)}
                            {app.status !== 'coming_soon' && (
                              <ExternalLink className="w-4 h-4 text-gray-400" />
                            )}
                          </div>
                        </a>
                      ) : (
                        <Link 
                          href={app.url} 
                          className="flex items-center justify-between"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <div className="flex items-center space-x-3">
                            <div className={`${getColorClasses(app.color)}`}>
                              {app.icon}
                            </div>
                            <span className="font-medium text-gray-900">{app.fullName}</span>
                          </div>
                          {getStatusBadge(app.status)}
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Click outside to close dropdown */}
      {isAppMenuOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsAppMenuOpen(false)}
        />
      )}
    </header>
  )
}

// Hook to detect which Zaza app the user is currently on
export function useCurrentZazaApp(): string {
  const [currentApp, setCurrentApp] = useState('promptly')

  useEffect(() => {
    const hostname = window.location.hostname
    
    if (hostname.includes('zazateach.com')) {
      setCurrentApp('teach')
    } else if (hostname.includes('zazavisuals.com')) {
      setCurrentApp('visuals')
    } else if (hostname.includes('zazapromptly.com') || hostname.includes('localhost')) {
      setCurrentApp('promptly')
    }
  }, [])

  return currentApp
}