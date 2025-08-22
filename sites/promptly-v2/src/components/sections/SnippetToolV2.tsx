'use client'

import { useState, useRef } from 'react'
import { Button } from '@/components/ui/Button'
import ZaraOrb from '@/components/ui/ZaraOrb'

interface ImproveResponse {
  improvedText: string
  rationaleBullets: string[]
  warnings: string[]
}

interface SnippetToolProps {
  userRole?: string
}

export default function SnippetToolV2({ userRole = 'teacher' }: SnippetToolProps) {
  const [draftText, setDraftText] = useState('')
  const [improvedText, setImprovedText] = useState('')
  const [rationale, setRationale] = useState<string[]>([])
  const [warnings, setWarnings] = useState<string[]>([])
  const [settings, setSettings] = useState({
    tone: 'Supportive',
    readingLevel: 'Parent-friendly',
    length: 'Medium',
    language: 'auto-detect'
  })
  const [isImproving, setIsImproving] = useState(false)
  const [copySuccess, setCopySuccess] = useState(false)
  const [showDiff, setShowDiff] = useState(false)
  const [showExplanation, setShowExplanation] = useState(false)
  
  const resultRef = useRef<HTMLDivElement>(null)
  const ariaLiveRef = useRef<HTMLDivElement>(null)

  const toneOptions = [
    'Supportive',
    'Professional', 
    'Firm-but-kind'
  ]

  const readingLevelOptions = [
    'Parent-friendly',
    'Year 7 level',
    'Year 8 level',
    'Year 9 level',
    'Year 10 level',
    'Year 11 level',
    'A-Level',
    'Professional'
  ]

  const lengthOptions = [
    'Short',
    'Medium',
    'Long'
  ]

  const languageOptions = [
    'auto-detect',
    'English (UK)',
    'English (US)',
    'Spanish',
    'French',
    'German',
    'Italian'
  ]

  const handleImprove = async () => {
    if (!draftText.trim()) return

    setIsImproving(true)
    setImprovedText('')
    setRationale([])
    setWarnings([])
    setShowExplanation(false)

    // Fire telemetry event if analytics consent given
    try {
      const consent = localStorage.getItem('promptly-cookie-consent')
      const consentData = consent ? JSON.parse(consent) : null
      
      if (consentData?.analytics && typeof window !== 'undefined' && window.plausible) {
        window.plausible('snippet_improve', {
          props: {
            tone: settings.tone,
            reading_level: settings.readingLevel,
            length: settings.length,
            language: settings.language,
            draft_length: draftText.length,
            user_role: userRole
          }
        })
      }
    } catch (error) {
      console.log('Telemetry failed:', error)
    }

    try {
      const response = await fetch('/api/improve-comment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          draft: draftText,
          tone: settings.tone,
          readingLevel: settings.readingLevel,
          length: settings.length,
          language: settings.language,
          role: userRole
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to improve comment')
      }

      const data: ImproveResponse = await response.json()
      setImprovedText(data.improvedText)
      setRationale(data.rationaleBullets || [])
      setWarnings(data.warnings || [])

      // Announce to screen readers
      if (ariaLiveRef.current) {
        ariaLiveRef.current.textContent = 'Comment improved successfully. Check the results panel.'
      }

      // Scroll to results if needed
      setTimeout(() => {
        if (resultRef.current) {
          resultRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
        }
      }, 100)

    } catch (error) {
      console.error('Error improving comment:', error)
      setImprovedText('Error improving comment. Please try again.')
      if (ariaLiveRef.current) {
        ariaLiveRef.current.textContent = 'Error improving comment. Please try again.'
      }
    } finally {
      setIsImproving(false)
    }
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(improvedText)
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 2000)
      
      if (ariaLiveRef.current) {
        ariaLiveRef.current.textContent = 'Improved comment copied to clipboard.'
      }
    } catch (error) {
      console.error('Error copying to clipboard:', error)
    }
  }

  const handleSettingChange = (field: keyof typeof settings, value: string) => {
    setSettings(prev => ({ ...prev, [field]: value }))
    // Clear results when settings change
    if (improvedText) {
      setImprovedText('')
      setRationale([])
      setWarnings([])
      setShowExplanation(false)
    }
  }

  const handleContextAction = (action: string) => {
    switch (action) {
      case 'Why these edits?':
        setShowExplanation(true)
        if (resultRef.current) {
          resultRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
        }
        break
      case 'Softer tone':
        if (settings.tone !== 'Supportive') {
          handleSettingChange('tone', 'Supportive')
          if (draftText.trim()) {
            setTimeout(() => handleImprove(), 500)
          }
        }
        break
      case 'Shorter':
        if (settings.length !== 'Short') {
          handleSettingChange('length', 'Short')
          if (draftText.trim()) {
            setTimeout(() => handleImprove(), 500)
          }
        }
        break
      default:
        console.log('Context action:', action)
    }
  }

  // Simple word-level diff highlighting
  const renderDiff = (original: string, improved: string) => {
    const originalWords = original.split(/(\s+)/)
    const improvedWords = improved.split(/(\s+)/)
    
    // Basic word-level comparison
    const result = []
    const maxLength = Math.max(originalWords.length, improvedWords.length)
    
    for (let i = 0; i < maxLength; i++) {
      const origWord = originalWords[i] || ''
      const impWord = improvedWords[i] || ''
      
      if (origWord !== impWord) {
        if (origWord && !impWord) {
          // Word removed
          result.push(
            <span key={`removed-${i}`} className="bg-red-900/40 text-red-300 line-through">
              {origWord}
            </span>
          )
        } else if (!origWord && impWord) {
          // Word added
          result.push(
            <span key={`added-${i}`} className="bg-green-900/40 text-green-300">
              {impWord}
            </span>
          )
        } else {
          // Word changed
          result.push(
            <span key={`changed-${i}`} className="bg-blue-900/40 text-blue-300">
              {impWord}
            </span>
          )
        }
      } else if (origWord) {
        result.push(<span key={`same-${i}`}>{origWord}</span>)
      }
    }
    
    return result
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 shadow-card">
      {/* Accessibility */}
      <div ref={ariaLiveRef} className="sr-only" aria-live="polite" aria-atomic="true"></div>
      
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left: Draft Input */}
        <div className="xl:col-span-1 space-y-4">
          <div>
            <label htmlFor="draft-text" className="block text-sm font-medium text-white mb-2">
              Your Draft Comment
            </label>
            <textarea
              id="draft-text"
              value={draftText}
              onChange={(e) => setDraftText(e.target.value)}
              rows={8}
              className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent resize-none"
              placeholder="Write your draft comment here..."
              aria-describedby="draft-text-help"
            />
            <p id="draft-text-help" className="text-xs text-slate-400 mt-1">
              Enter your draft comment and we&apos;ll improve it based on your preferences.
            </p>
          </div>

          {/* Controls */}
          <div className="space-y-3">
            <div>
              <label htmlFor="tone-select" className="block text-xs font-medium text-slate-200 mb-1">
                Tone
              </label>
              <select
                id="tone-select"
                value={settings.tone}
                onChange={(e) => handleSettingChange('tone', e.target.value)}
                className="w-full px-3 py-2 text-sm bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
              >
                {toneOptions.map((tone) => (
                  <option key={tone} value={tone}>{tone}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="reading-level-select" className="block text-xs font-medium text-slate-200 mb-1">
                Reading Level
              </label>
              <select
                id="reading-level-select"
                value={settings.readingLevel}
                onChange={(e) => handleSettingChange('readingLevel', e.target.value)}
                className="w-full px-3 py-2 text-sm bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
              >
                {readingLevelOptions.map((level) => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label htmlFor="length-select" className="block text-xs font-medium text-slate-200 mb-1">
                  Length
                </label>
                <select
                  id="length-select"
                  value={settings.length}
                  onChange={(e) => handleSettingChange('length', e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                >
                  {lengthOptions.map((length) => (
                    <option key={length} value={length}>{length}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="language-select" className="block text-xs font-medium text-slate-200 mb-1">
                  Language
                </label>
                <select
                  id="language-select"
                  value={settings.language}
                  onChange={(e) => handleSettingChange('language', e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                >
                  {languageOptions.map((lang) => (
                    <option key={lang} value={lang}>
                      {lang === 'auto-detect' ? 'Auto-detect' : lang}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <Button
            onClick={handleImprove}
            disabled={!draftText.trim() || isImproving}
            className="w-full"
            aria-describedby="improve-button-help"
          >
            {isImproving ? 'Improving...' : 'Improve'}
          </Button>
          <p id="improve-button-help" className="text-xs text-slate-400">
            Enhance your comment with AI suggestions
          </p>
        </div>

        {/* Right: Improved Result */}
        <div className="xl:col-span-2 space-y-4" ref={resultRef}>
          <div>
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="improved-text" className="block text-sm font-medium text-white">
                Improved by Promptly
              </label>
              {improvedText && draftText && (
                <button
                  onClick={() => setShowDiff(!showDiff)}
                  className="text-xs text-purple-400 hover:text-purple-300 underline decoration-purple-400/50 hover:decoration-purple-300/50 transition-colors"
                  aria-pressed={showDiff}
                >
                  {showDiff ? 'Hide Changes' : 'Show Changes'}
                </button>
              )}
            </div>
            
            <div className="relative">
              <textarea
                id="improved-text"
                value={improvedText}
                readOnly
                rows={8}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent resize-none"
                placeholder="Click 'Improve' to enhance your comment..."
              />
              
              {showDiff && improvedText && draftText && (
                <div className="absolute inset-0 px-3 py-2 bg-slate-800/95 rounded-lg overflow-y-auto">
                  <div className="text-white text-sm leading-relaxed">
                    <div className="text-xs text-slate-400 mb-2 font-medium">Changes highlighted:</div>
                    <div className="space-y-2">
                      {renderDiff(draftText, improvedText)}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Warnings */}
            {warnings.length > 0 && (
              <div className="mt-2 p-3 bg-yellow-900/20 border border-yellow-500/30 rounded-lg">
                <div className="flex items-start">
                  <svg className="w-4 h-4 text-yellow-400 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  <div className="text-sm">
                    <div className="font-medium text-yellow-300 mb-1">Consider:</div>
                    <ul className="list-disc list-inside space-y-1 text-yellow-200">
                      {warnings.map((warning, index) => (
                        <li key={index}>{warning}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          {improvedText && (
            <div className="flex flex-wrap gap-3">
              <Button
                variant="secondary"
                onClick={handleCopy}
                className="flex-1 min-w-[120px]"
              >
                {copySuccess ? 'Copied!' : 'Copy'}
              </Button>
              
              <Button
                variant="outline"
                onClick={() => setShowExplanation(!showExplanation)}
                className="flex-1 min-w-[120px]"
                aria-expanded={showExplanation}
              >
                {showExplanation ? 'Hide Explanation' : 'Explain'}
              </Button>
            </div>
          )}

          {/* Explanation Panel */}
          {showExplanation && rationale.length > 0 && (
            <div className="p-4 bg-slate-800/50 border border-slate-600/50 rounded-lg">
              <h4 className="text-sm font-medium text-white mb-3">Why These Changes:</h4>
              <ul className="space-y-2">
                {rationale.map((point, index) => (
                  <li key={index} className="flex items-start text-sm text-slate-300">
                    <span className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <p className="text-xs text-slate-400 mt-6 text-center">
        AI suggestions are starting points - always review and personalize for your specific context.
      </p>

      {/* ZaraOrb with context-aware functionality */}
      <ZaraOrb 
        isInSnippetTool={true} 
        onContextAction={handleContextAction}
      />
    </div>
  )
}