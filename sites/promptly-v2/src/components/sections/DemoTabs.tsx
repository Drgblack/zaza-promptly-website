'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'

interface DemoTab {
  id: string
  label: string
  isActive: boolean
}

interface DemoStats {
  generationsUsed: number
  lastGeneration: number
}

export default function DemoTabs() {
  const [activeTab, setActiveTab] = useState('parent-comms')
  const [showUpsellModal, setShowUpsellModal] = useState(false)
  const [upsellTab, setUpsellTab] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [demoStats, setDemoStats] = useState<DemoStats>({ generationsUsed: 0, lastGeneration: 0 })
  const [inputText, setInputText] = useState("Hi, your child has been disruptive in class today and needs to focus more on their work instead of talking to friends.")
  const [tone, setTone] = useState('professional')
  const [result, setResult] = useState('')

  // Get current locale for GA4 events
  const locale = typeof window !== 'undefined' ? 
    (window.location.pathname.startsWith('/de') ? 'de' : 'en') : 'en'

  // Check rate limit on mount
  useEffect(() => {
    const stored = localStorage.getItem('draft-demo-stats')
    if (stored) {
      const stats = JSON.parse(stored)
      setDemoStats(stats)
    }
  }, [])

  const checkRateLimit = (): boolean => {
    const now = Date.now()
    const oneHour = 60 * 60 * 1000
    
    // Reset if more than an hour has passed
    if (now - demoStats.lastGeneration > oneHour) {
      const newStats = { generationsUsed: 0, lastGeneration: now }
      setDemoStats(newStats)
      localStorage.setItem('draft-demo-stats', JSON.stringify(newStats))
      return true
    }
    
    return demoStats.generationsUsed < 3
  }

  const updateRateLimit = () => {
    const now = Date.now()
    const newStats = {
      generationsUsed: demoStats.generationsUsed + 1,
      lastGeneration: now
    }
    setDemoStats(newStats)
    localStorage.setItem('draft-demo-stats', JSON.stringify(newStats))
  }

  const trackGA4Event = (eventName: string, parameters: Record<string, any>) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', eventName, {
        ...parameters,
        locale
      })
    }
  }

  const handleTabClick = (tabId: string) => {
    if (tabId === 'parent-comms') {
      setActiveTab(tabId)
    } else {
      // Show upsell modal for non-active tabs
      setUpsellTab(tabId)
      setShowUpsellModal(true)
      trackGA4Event('demo_upsell_opened', {
        tab: tabId,
        source: 'tab_click'
      })
    }
  }

  const handleGenerateDemo = async () => {
    if (!checkRateLimit()) {
      alert('Rate limit reached. Please try again in an hour.')
      return
    }

    if (!inputText.trim()) {
      alert('Please enter some text to improve.')
      return
    }

    setIsGenerating(true)
    
    try {
      // Track demo generation
      trackGA4Event('draft_demo_generated', {
        tab: activeTab,
        tone,
        length: inputText.length
      })

      // Simulate API call with improved text
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      const improvedText = "I wanted to touch base about [Child's name]'s social engagement in class. While their enthusiasm for connecting with peers shows wonderful social skills, I'd love to work with you on channeling this energy during learning time. Could we schedule a brief chat to discuss some strategies that might help?"
      
      setResult(improvedText)
      updateRateLimit()
      
      // Show upsell modal after successful generation
      setTimeout(() => {
        setShowUpsellModal(true)
        setUpsellTab('conversion')
        trackGA4Event('demo_upsell_opened', {
          tab: activeTab,
          source: 'post_generation'
        })
      }, 2000)
      
    } catch (error) {
      console.error('Demo generation error:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleCopyResult = () => {
    if (result) {
      navigator.clipboard.writeText(result)
      trackGA4Event('demo_copy_clicked', {
        tab: activeTab
      })
    }
  }

  const handleCTAClick = (location: string) => {
    trackGA4Event('cta_click', {
      location,
      source: 'demo_section'
    })
  }

  const tabs: DemoTab[] = [
    { id: 'parent-comms', label: 'Parent Comms', isActive: true },
    { id: 'reports', label: 'Report Comments', isActive: false },
    { id: 'staff', label: 'Staff Notes', isActive: false }
  ]

  const getUpsellContent = () => {
    const tabLabels = {
      'reports': 'Report Comments',
      'staff': 'Staff Communications', 
      'docs': 'Documentation',
      'conversion': 'Full Access'
    }

    return {
      title: upsellTab === 'conversion' ? 'Love what you see?' : `Unlock ${tabLabels[upsellTab as keyof typeof tabLabels]}`,
      description: upsellTab === 'conversion' 
        ? 'This was just a taste! Get unlimited AI-powered writing help for all your teaching needs.'
        : `Get access to ${tabLabels[upsellTab as keyof typeof tabLabels]} and unlock the full power of Draft for your classroom.`
    }
  }

  return (
    <>
      <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 shadow-2xl">
        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mb-6 p-1 bg-slate-800/50 rounded-lg">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors relative ${
                tab.id === activeTab
                  ? 'bg-purple-600 text-white'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700'
              }`}
            >
              {tab.label}
              {!tab.isActive && (
                <span className="absolute -top-1 -right-1 bg-yellow-500 text-black text-xs px-1 rounded">
                  PRO
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Active Tab Content - Only Parent Comms */}
        <div className="min-h-[400px]">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Draft Parent Email
              </label>
              <textarea
                rows={4}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter your draft communication..."
                maxLength={500}
              />
              <div className="text-xs text-slate-400 mt-1">
                {inputText.length}/500 characters
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Tone
              </label>
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="professional">Professional</option>
                <option value="supportive">Supportive</option>
                <option value="encouraging">Encouraging</option>
                <option value="constructive">Constructive</option>
              </select>
            </div>

            <Button
              onClick={handleGenerateDemo}
              disabled={isGenerating || !inputText.trim()}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold disabled:opacity-50"
            >
              {isGenerating ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Transforming...
                </div>
              ) : (
                'Transform with AI →'
              )}
            </Button>

            {result && (
              <div className="p-4 bg-green-900/20 border border-green-500/30 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <p className="text-white text-sm font-medium">Improved Version:</p>
                  <button
                    onClick={handleCopyResult}
                    className="text-green-400 hover:text-green-300 text-xs flex items-center gap-1"
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Copy
                  </button>
                </div>
                <p className="text-slate-300 mb-3">{result}</p>
                <div className="text-xs text-blue-300 bg-blue-900/30 px-2 py-1 rounded">
                  ✨ This shows the power of Draft's AI. Get unlimited generations with a free trial.
                </div>
              </div>
            )}

            {/* Privacy Note - EN/DE */}
            <div className="text-xs text-amber-300 bg-amber-900/20 border border-amber-500/30 rounded-lg p-3">
              <div className="flex items-start gap-2">
                <svg className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.664-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <div>
                  {locale === 'de' ? (
                    <>
                      <strong>Datenschutzhinweis:</strong> Bitte geben Sie keine sensiblen oder schüleridentifizierenden Daten ein.
                    </>
                  ) : (
                    <>
                      <strong>Privacy Note:</strong> Please don't enter sensitive or student-identifying data.
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Rate Limit Info */}
            <div className="text-xs text-slate-400 text-center">
              Demo uses: {demoStats.generationsUsed}/3 per hour
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-700">
          <p className="text-xs text-slate-400 text-center">
            This demo shows sample improvements. The full Draft includes 25+ languages, GDPR compliance, and unlimited generations.{' '}
            <button 
              onClick={() => {
                handleCTAClick('demo_footer')
                window.location.href = '/pricing'
              }}
              className="text-purple-400 hover:text-purple-300"
            >
              Start your free trial →
            </button>
          </p>
        </div>
      </div>

      {/* Upsell Modal */}
      {showUpsellModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-8 max-w-md w-full">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-4">
                {getUpsellContent().title}
              </h3>
              
              <p className="text-slate-300 mb-6">
                {getUpsellContent().description}
              </p>
              
              <div className="space-y-3">
                <Button
                  onClick={() => {
                    trackGA4Event('demo_upsell_clicked', {
                      tab: upsellTab,
                      cta_type: 'start_free'
                    })
                    handleCTAClick('upsell_modal')
                    window.location.href = '/pricing#free'
                  }}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold"
                >
                  Start Free Trial →
                </Button>
                
                <button
                  onClick={() => setShowUpsellModal(false)}
                  className="w-full text-slate-400 hover:text-white py-2 text-sm"
                >
                  Maybe later
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}