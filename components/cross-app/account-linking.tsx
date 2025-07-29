"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Users,
  ExternalLink,
  X,
  CheckCircle2,
  ArrowRight,
  GraduationCap,
  Link,
  Sparkles,
  Shield,
  Clock
} from 'lucide-react'

interface CrossAppUser {
  email?: string
  name?: string
  lastApp?: string
  lastSeen?: string
  hasZazaTeachAccount?: boolean
  hasZazaVisualsAccount?: boolean
  linkedApps?: string[]
}

interface AccountLinkingPromptProps {
  variant?: 'banner' | 'modal' | 'card' | 'sidebar'
  currentApp?: string
  onDismiss?: () => void
  className?: string
}

export function AccountLinkingPrompt({
  variant = 'banner',
  currentApp = 'promptly',
  onDismiss,
  className = ''
}: AccountLinkingPromptProps) {
  const [crossAppUser, setCrossAppUser] = useState<CrossAppUser | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)

  useEffect(() => {
    detectCrossAppUser()
  }, [currentApp])

  const detectCrossAppUser = () => {
    // Check for cross-app cookies and localStorage
    const detectedUser = {
      email: getCrossAppUserEmail(),
      name: getCrossAppUserName(),
      lastApp: getLastUsedApp(),
      lastSeen: getLastSeenTimestamp(),
      hasZazaTeachAccount: hasCrossAppCookie('zaza_teach_user'),
      hasZazaVisualsAccount: hasCrossAppCookie('zaza_visuals_user'),
      linkedApps: getLinkedApps()
    }

    // Only show if we detect they have accounts in other Zaza apps
    if (detectedUser.hasZazaTeachAccount || detectedUser.hasZazaVisualsAccount || detectedUser.lastApp) {
      setCrossAppUser(detectedUser)
      
      // Check if they've already dismissed this prompt recently
      const dismissedKey = `account_linking_dismissed_${currentApp}`
      const lastDismissed = localStorage.getItem(dismissedKey)
      
      if (!lastDismissed || isMoreThanDaysAgo(lastDismissed, 7)) {
        setIsVisible(true)
      }
    }
  }

  const getCrossAppUserEmail = (): string | undefined => {
    // Check various storage locations for user email
    const sources = [
      localStorage.getItem('user_email'),
      localStorage.getItem('zaza_user_email'),
      getCookieValue('zaza_email'),
      getCookieValue('user_email')
    ]
    
    return sources.find(email => email && isValidEmail(email)) || undefined
  }

  const getCrossAppUserName = (): string | undefined => {
    const sources = [
      localStorage.getItem('user_name'),
      localStorage.getItem('zaza_user_name'),
      getCookieValue('zaza_name'),
      getCookieValue('user_name')
    ]
    
    return sources.find(name => name && name.length > 0) || undefined
  }

  const getLastUsedApp = (): string | undefined => {
    const lastApp = localStorage.getItem('zaza_last_app') || getCookieValue('zaza_last_app')
    return lastApp && lastApp !== currentApp ? lastApp : undefined
  }

  const getLastSeenTimestamp = (): string | undefined => {
    return localStorage.getItem('zaza_last_seen') || getCookieValue('zaza_last_seen')
  }

  const hasCrossAppCookie = (cookieName: string): boolean => {
    return !!getCookieValue(cookieName)
  }

  const getLinkedApps = (): string[] => {
    const linkedAppsStr = localStorage.getItem('zaza_linked_apps') || getCookieValue('zaza_linked_apps')
    return linkedAppsStr ? JSON.parse(linkedAppsStr) : []
  }

  const getCookieValue = (name: string): string | undefined => {
    if (typeof document === 'undefined') return undefined
    
    const value = `; ${document.cookie}`
    const parts = value.split(`; ${name}=`)
    if (parts.length === 2) {
      return parts.pop()?.split(';').shift()
    }
    return undefined
  }

  const isValidEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const isMoreThanDaysAgo = (timestamp: string, days: number): boolean => {
    const then = new Date(timestamp)
    const now = new Date()
    const diffDays = (now.getTime() - then.getTime()) / (1000 * 60 * 60 * 24)
    return diffDays > days
  }

  const handleLinkAccounts = () => {
    // Track the linking attempt
    if ((window as any).zazeAnalytics) {
      (window as any).zazeAnalytics.trackCrossAppAction('account_linking_started', {
        from_app: currentApp,
        detected_apps: crossAppUser?.linkedApps || []
      })
    }

    // Open account linking flow
    const linkingUrl = `https://zazateach.com/link-account?source=${currentApp}&email=${encodeURIComponent(crossAppUser?.email || '')}`
    window.open(linkingUrl, '_blank')
    
    handleDismiss()
  }

  const handleDismiss = () => {
    setIsVisible(false)
    setIsDismissed(true)
    
    // Remember dismissal for 7 days
    const dismissedKey = `account_linking_dismissed_${currentApp}`
    localStorage.setItem(dismissedKey, new Date().toISOString())
    
    if (onDismiss) {
      onDismiss()
    }
  }

  if (!isVisible || !crossAppUser || isDismissed) return null

  const getDetectedAppInfo = () => {
    const apps = []
    if (crossAppUser.hasZazaTeachAccount) apps.push('Zaza Teach')
    if (crossAppUser.hasZazaVisualsAccount) apps.push('Zaza Visuals')
    if (crossAppUser.lastApp && crossAppUser.lastApp !== currentApp) {
      const appNames: { [key: string]: string } = {
        'teach': 'Zaza Teach',
        'visuals': 'Zaza Visuals',
        'promptly': 'Zaza Promptly'
      }
      const appName = appNames[crossAppUser.lastApp] || crossAppUser.lastApp
      if (!apps.includes(appName)) apps.push(appName)
    }
    return apps
  }

  const detectedApps = getDetectedAppInfo()

  // Banner variant
  if (variant === 'banner') {
    return (
      <div className={`bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 ${className}`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-white bg-opacity-20 rounded-lg">
              <Link className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold">
                Hey{crossAppUser.name ? ` ${crossAppUser.name}` : ''}! 👋
              </h4>
              <p className="text-sm opacity-90">
                We noticed you use {detectedApps.join(' and ')}. Link your accounts for a seamless experience!
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button
              onClick={handleLinkAccounts}
              variant="secondary"
              size="sm"
              className="bg-white text-blue-600 hover:bg-gray-100"
            >
              <Link className="w-4 h-4 mr-2" />
              Link Accounts
              <ExternalLink className="w-3 h-3 ml-2" />
            </Button>
            <button
              onClick={handleDismiss}
              className="text-white hover:text-gray-200 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Modal variant
  if (variant === 'modal') {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <Card className="w-full max-w-lg">
          <CardContent className="p-8">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-blue-100 rounded-xl">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Link Your Zaza Accounts</h3>
                  <p className="text-gray-600">Seamless experience across all apps</p>
                </div>
              </div>
              <button
                onClick={handleDismiss}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mb-6">
              <p className="text-gray-700 mb-4">
                We detected you have accounts with {detectedApps.join(' and ')}. 
                Linking your accounts will give you:
              </p>
              
              <ul className="space-y-2">
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  <span className="text-sm">Single sign-on across all Zaza apps</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  <span className="text-sm">Synchronized preferences and settings</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  <span className="text-sm">Cross-app resource sharing</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  <span className="text-sm">Unified billing and subscriptions</span>
                </li>
              </ul>
            </div>

            <div className="flex space-x-3">
              <Button
                onClick={handleLinkAccounts}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Link className="w-4 h-4 mr-2" />
                Link My Accounts
                <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
              <Button
                onClick={handleDismiss}
                variant="outline"
                className="flex-1"
              >
                Maybe Later
              </Button>
            </div>

            <p className="text-xs text-gray-500 mt-4 text-center">
              <Shield className="w-3 h-3 inline mr-1" />
              Your data is secure. We only link accounts you explicitly authorize.
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Card variant
  if (variant === 'card') {
    return (
      <Card className={`border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 ${className}`}>
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Link Your Accounts</h4>
                <p className="text-sm text-gray-600">Seamless Zaza experience</p>
              </div>
            </div>
            <button
              onClick={handleDismiss}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-sm text-gray-700 mb-4">
            We see you use {detectedApps.join(' and ')}. Link for single sign-on and synchronized preferences.
          </p>

          <div className="flex space-x-2">
            <Button
              onClick={handleLinkAccounts}
              size="sm"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
            >
              Link Now
              <ArrowRight className="w-3 h-3 ml-1" />
            </Button>
            <Button
              onClick={handleDismiss}
              size="sm"
              variant="ghost"
              className="text-gray-500"
            >
              Later
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Sidebar variant
  if (variant === 'sidebar') {
    return (
      <div className={`bg-blue-50 border border-blue-200 rounded-lg p-4 ${className}`}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <div className="p-1 bg-blue-100 rounded">
              <Link className="w-4 h-4 text-blue-600" />
            </div>
            <span className="font-medium text-gray-900 text-sm">Account Linking</span>
          </div>
          <button
            onClick={handleDismiss}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
        
        <p className="text-xs text-gray-600 mb-3">
          Connect your {detectedApps.join(' & ')} accounts for a unified experience.
        </p>
        
        <Button
          onClick={handleLinkAccounts}
          size="sm"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs"
        >
          Link Accounts
          <ExternalLink className="w-3 h-3 ml-1" />
        </Button>
      </div>
    )
  }

  return null
}

// Hook for managing cross-app user detection
export function useCrossAppUser() {
  const [user, setUser] = useState<CrossAppUser | null>(null)
  
  useEffect(() => {
    const detectUser = () => {
      // Simplified detection logic
      const email = localStorage.getItem('user_email') || getCookieValue('zaza_email')
      const name = localStorage.getItem('user_name') || getCookieValue('zaza_name')
      
      if (email || name) {
        setUser({
          email: email || undefined,
          name: name || undefined,
          hasZazaTeachAccount: !!getCookieValue('zaza_teach_user'),
          hasZazaVisualsAccount: !!getCookieValue('zaza_visuals_user')
        })
      }
    }
    
    detectUser()
  }, [])
  
  return user
}

// Component for setting cross-app tracking cookies
export function CrossAppTracker({ currentApp }: { currentApp: string }) {
  useEffect(() => {
    // Set tracking cookies for cross-app detection
    const now = new Date().toISOString()
    
    // Set last app visited
    localStorage.setItem('zaza_last_app', currentApp)
    setCookie('zaza_last_app', currentApp, 30)
    
    // Set last seen timestamp
    localStorage.setItem('zaza_last_seen', now)
    setCookie('zaza_last_seen', now, 30)
    
    // Set app-specific tracking
    const appCookieKey = `zaza_${currentApp}_user`
    setCookie(appCookieKey, 'true', 365)
    
  }, [currentApp])
  
  return null // This component doesn't render anything
}

// Utility functions
function getCookieValue(name: string): string | undefined {
  if (typeof document === 'undefined') return undefined
  
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) {
    return parts.pop()?.split(';').shift()
  }
  return undefined
}

function setCookie(name: string, value: string, days: number) {
  if (typeof document === 'undefined') return
  
  const expires = new Date()
  expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000))
  const expiresStr = expires.toUTCString()
  
  document.cookie = `${name}=${value}; expires=${expiresStr}; path=/; domain=.zazapromptly.com; SameSite=Lax`
}

// Smart component that shows account linking prompts based on detection
export function SmartAccountLinking({ currentApp = 'promptly' }: { currentApp?: string }) {
  const [showPrompt, setShowPrompt] = useState(false)
  const [promptVariant, setPromptVariant] = useState<'banner' | 'modal' | 'card'>('banner')
  
  useEffect(() => {
    // Detect if user has cross-app accounts and should see linking prompt
    const hasZazaTeachCookie = !!getCookieValue('zaza_teach_user')
    const hasZazaVisualsCookie = !!getCookieValue('zaza_visuals_user')
    const lastApp = localStorage.getItem('zaza_last_app')
    
    if (hasZazaTeachCookie || hasZazaVisualsCookie || (lastApp && lastApp !== currentApp)) {
      // Check if they've dismissed recently
      const dismissedKey = `account_linking_dismissed_${currentApp}`
      const lastDismissed = localStorage.getItem(dismissedKey)
      
      if (!lastDismissed || isMoreThanDaysAgo(lastDismissed, 7)) {
        setShowPrompt(true)
        
        // Choose variant based on user engagement
        const pageViews = parseInt(localStorage.getItem('page_views') || '0')
        if (pageViews > 5) {
          setPromptVariant('modal')
        } else if (pageViews > 2) {
          setPromptVariant('card')
        } else {
          setPromptVariant('banner')
        }
      }
    }
  }, [currentApp])
  
  const isMoreThanDaysAgo = (timestamp: string, days: number): boolean => {
    const then = new Date(timestamp)
    const now = new Date()
    const diffDays = (now.getTime() - then.getTime()) / (1000 * 60 * 60 * 24)
    return diffDays > days
  }
  
  if (!showPrompt) return null
  
  return (
    <>
      <CrossAppTracker currentApp={currentApp} />
      <AccountLinkingPrompt
        variant={promptVariant}
        currentApp={currentApp}
        onDismiss={() => setShowPrompt(false)}
      />
    </>
  )
}