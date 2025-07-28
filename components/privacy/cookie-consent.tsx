"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Settings, Shield, Cookie, Eye, EyeOff } from "lucide-react"

interface CookiePreferences {
  necessary: boolean
  analytics: boolean
  marketing: boolean
  functional: boolean
}

interface CookieConsentProps {
  onPreferencesChange?: (preferences: CookiePreferences) => void
  showSettings?: boolean
  position?: "bottom" | "top" | "modal"
}

const defaultPreferences: CookiePreferences = {
  necessary: true, // Always true, cannot be disabled
  analytics: false,
  marketing: false,
  functional: false,
}

const cookieCategories = {
  necessary: {
    title: "Necessary Cookies",
    description: "These cookies are essential for the website to function properly. They cannot be disabled.",
    examples: ["Session management", "Security", "Basic functionality"],
    icon: Shield,
  },
  analytics: {
    title: "Analytics Cookies",
    description: "These cookies help us understand how visitors interact with our website.",
    examples: ["Page views", "User behavior", "Performance metrics"],
    icon: Eye,
  },
  marketing: {
    title: "Marketing Cookies",
    description: "These cookies are used to deliver personalized advertisements.",
    examples: ["Ad targeting", "Social media integration", "Remarketing"],
    icon: Cookie,
  },
  functional: {
    title: "Functional Cookies",
    description: "These cookies enable enhanced functionality and personalization.",
    examples: ["Language preferences", "User settings", "Enhanced features"],
    icon: Settings,
  },
}

export function CookieConsent({ 
  onPreferencesChange, 
  showSettings = true, 
  position = "bottom" 
}: CookieConsentProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [preferences, setPreferences] = useState<CookiePreferences>(defaultPreferences)
  const [showSettingsModal, setShowSettingsModal] = useState(false)
  const [hasConsented, setHasConsented] = useState(false)

  useEffect(() => {
    // Check if user has already made a choice
    const savedPreferences = localStorage.getItem("cookie-preferences")
    const consentStatus = localStorage.getItem("cookie-consent-status")
    
    if (savedPreferences) {
      setPreferences(JSON.parse(savedPreferences))
    }
    
    if (consentStatus === "accepted") {
      setHasConsented(true)
    } else {
      setIsVisible(true)
    }
  }, [])

  const handleAcceptAll = () => {
    const allAccepted: CookiePreferences = {
      necessary: true,
      analytics: true,
      marketing: true,
      functional: true,
    }
    
    setPreferences(allAccepted)
    savePreferences(allAccepted)
    setHasConsented(true)
    setIsVisible(false)
    
    // Enable all tracking
    enableTracking(allAccepted)
    
    onPreferencesChange?.(allAccepted)
  }

  const handleAcceptNecessary = () => {
    const necessaryOnly: CookiePreferences = {
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false,
    }
    
    setPreferences(necessaryOnly)
    savePreferences(necessaryOnly)
    setHasConsented(true)
    setIsVisible(false)
    
    // Disable non-necessary tracking
    enableTracking(necessaryOnly)
    
    onPreferencesChange?.(necessaryOnly)
  }

  const handleSavePreferences = () => {
    savePreferences(preferences)
    setHasConsented(true)
    setShowSettingsModal(false)
    setIsVisible(false)
    
    // Apply tracking preferences
    enableTracking(preferences)
    
    onPreferencesChange?.(preferences)
  }

  const savePreferences = (prefs: CookiePreferences) => {
    localStorage.setItem("cookie-preferences", JSON.stringify(prefs))
    localStorage.setItem("cookie-consent-status", "accepted")
    localStorage.setItem("cookie-consent-date", new Date().toISOString())
  }

  const enableTracking = (prefs: CookiePreferences) => {
    // Enable/disable Google Analytics
    if (prefs.analytics && typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("consent", "update", {
        analytics_storage: "granted",
      })
    } else if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("consent", "update", {
        analytics_storage: "denied",
      })
    }

    // Enable/disable marketing tracking
    if (prefs.marketing) {
      // Enable marketing pixels
      enableMarketingPixels()
    } else {
      // Disable marketing pixels
      disableMarketingPixels()
    }

    // Enable/disable functional cookies
    if (prefs.functional) {
      // Enable enhanced features
      enableFunctionalFeatures()
    } else {
      // Disable enhanced features
      disableFunctionalFeatures()
    }
  }

  const enableMarketingPixels = () => {
    // Implementation for enabling marketing pixels
    console.log("Marketing pixels enabled")
  }

  const disableMarketingPixels = () => {
    // Implementation for disabling marketing pixels
    console.log("Marketing pixels disabled")
  }

  const enableFunctionalFeatures = () => {
    // Implementation for enabling functional features
    console.log("Functional features enabled")
  }

  const disableFunctionalFeatures = () => {
    // Implementation for disabling functional features
    console.log("Functional features disabled")
  }

  const handlePreferenceChange = (category: keyof CookiePreferences, value: boolean) => {
    if (category === "necessary") return // Cannot disable necessary cookies
    
    setPreferences(prev => ({
      ...prev,
      [category]: value
    }))
  }

  if (!isVisible) return null

  if (position === "modal") {
    return (
      <Dialog open={isVisible} onOpenChange={setIsVisible}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Cookie className="w-5 h-5" />
              Cookie Preferences
            </DialogTitle>
            <DialogDescription>
              We use cookies to enhance your experience. Choose your preferences below.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            {Object.entries(cookieCategories).map(([key, category]) => {
              const IconComponent = category.icon
              const isDisabled = key === "necessary"
              
              return (
                <Card key={key}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <IconComponent className="w-4 h-4" />
                        <CardTitle className="text-base">{category.title}</CardTitle>
                      </div>
                      <Switch
                        checked={preferences[key as keyof CookiePreferences]}
                        onCheckedChange={(checked) => handlePreferenceChange(key as keyof CookiePreferences, checked)}
                        disabled={isDisabled}
                      />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="mb-2">{category.description}</CardDescription>
                    <div className="text-sm text-gray-600">
                      <strong>Examples:</strong> {category.examples.join(", ")}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          <div className="flex gap-2 pt-4">
            <Button onClick={handleAcceptAll} className="flex-1">
              Accept All
            </Button>
            <Button onClick={handleAcceptNecessary} variant="outline" className="flex-1">
              Necessary Only
            </Button>
            <Button onClick={handleSavePreferences} className="flex-1">
              Save Preferences
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <div className={`fixed ${position === "bottom" ? "bottom-0" : "top-0"} left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg`}>
      <div className="max-w-7xl mx-auto p-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-2">We use cookies to enhance your experience</h3>
            <p className="text-sm text-gray-600 mb-2">
              We use cookies to analyze site traffic, personalize content, and provide social media features. 
              By continuing to use our site, you consent to our use of cookies.
            </p>
            <div className="flex flex-wrap gap-2 text-xs text-gray-500">
              <a href="/privacy" className="hover:underline">Privacy Policy</a>
              <span>•</span>
              <a href="/terms" className="hover:underline">Terms of Service</a>
              <span>•</span>
              <a href="/cookies" className="hover:underline">Cookie Policy</a>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            {showSettings && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowSettingsModal(true)}
                className="flex items-center gap-2"
              >
                <Settings className="w-4 h-4" />
                Settings
              </Button>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={handleAcceptNecessary}
            >
              Necessary Only
            </Button>
            <Button
              size="sm"
              onClick={handleAcceptAll}
            >
              Accept All
            </Button>
          </div>
        </div>
      </div>

      {/* Settings Modal */}
      <Dialog open={showSettingsModal} onOpenChange={setShowSettingsModal}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Cookie Settings</DialogTitle>
            <DialogDescription>
              Customize your cookie preferences. You can change these settings at any time.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            {Object.entries(cookieCategories).map(([key, category]) => {
              const IconComponent = category.icon
              const isDisabled = key === "necessary"
              
              return (
                <Card key={key}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <IconComponent className="w-4 h-4" />
                        <CardTitle className="text-base">{category.title}</CardTitle>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch
                          id={`cookie-${key}`}
                          checked={preferences[key as keyof CookiePreferences]}
                          onCheckedChange={(checked) => handlePreferenceChange(key as keyof CookiePreferences, checked)}
                          disabled={isDisabled}
                        />
                        <Label htmlFor={`cookie-${key}`} className="text-sm">
                          {isDisabled ? "Always enabled" : preferences[key as keyof CookiePreferences] ? "Enabled" : "Disabled"}
                        </Label>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="mb-2">{category.description}</CardDescription>
                    <div className="text-sm text-gray-600">
                      <strong>Examples:</strong> {category.examples.join(", ")}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          <div className="flex gap-2 pt-4">
            <Button onClick={handleSavePreferences} className="flex-1">
              Save Preferences
            </Button>
            <Button onClick={() => setShowSettingsModal(false)} variant="outline">
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
