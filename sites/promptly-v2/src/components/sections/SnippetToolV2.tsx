'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/Button'
import ZaraOrb from '@/components/ui/ZaraOrb'

interface QualityScore {
  score: number
  reasons: string[]
}

interface CommentVariant {
  improvedText: string
  rationaleBullets: string[]
  quality: QualityScore
  warnings: string[]
}

interface ImproveResponse {
  variants?: CommentVariant[]
  // Legacy support
  improvedText?: string
  rationaleBullets?: string[]
  quality?: QualityScore
  warnings?: string[]
}

interface SnippetToolProps {
  userRole?: string
}

export default function SnippetToolV2({ userRole = 'teacher' }: SnippetToolProps) {
  const [draftText, setDraftText] = useState('')
  const [variants, setVariants] = useState<CommentVariant[]>([])
  const [activeVariantIndex, setActiveVariantIndex] = useState(0)
  const [showAlternatives, setShowAlternatives] = useState(false)
  const [selectedStrengths, setSelectedStrengths] = useState<string[]>([])
  const [improvedText, setImprovedText] = useState('')
  const [rationale, setRationale] = useState<string[]>([])
  const [warnings, setWarnings] = useState<string[]>([])
  const [qualityScore, setQualityScore] = useState<QualityScore | null>(null)
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
  const improvedTextRef = useRef<HTMLTextAreaElement>(null)
  const explainButtonRef = useRef<HTMLButtonElement>(null)

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

  // Non-PII strengths that can enhance suggestions
  const strengthOptions = [
    'Persistent',
    'Team player',
    'Curious',
    'Creative',
    'Organised',
    'Helpful',
    'Enthusiastic',
    'Thoughtful',
    'Resilient',
    'Independent',
    'Collaborative',
    'Focused'
  ]

  // Load preferences from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('promptly-snippet-preferences')
        if (saved) {
          const preferences = JSON.parse(saved)
          setSettings(prev => ({
            ...prev,
            tone: preferences.tone || prev.tone,
            readingLevel: preferences.readingLevel || prev.readingLevel,
            length: preferences.length || prev.length,
            language: preferences.language || prev.language
          }))
        }
      } catch (error) {
        console.warn('Failed to load preferences:', error)
      }
    }
  }, [])

  // Save preferences to localStorage when settings change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('promptly-snippet-preferences', JSON.stringify(settings))
      } catch (error) {
        console.warn('Failed to save preferences:', error)
      }
    }
  }, [settings])

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Ctrl+Enter to Improve
      if (event.ctrlKey && event.key === 'Enter') {
        event.preventDefault()
        if (draftText.trim() && !isImproving) {
          handleImprove()
        }
      }
      
      // Alt+E to Explain
      if (event.altKey && event.key === 'e') {
        event.preventDefault()
        if (improvedText && explainButtonRef.current) {
          explainButtonRef.current.click()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [draftText, isImproving, improvedText])

  const handleImprove = async () => {
    if (!draftText.trim()) return

    setIsImproving(true)
    setVariants([])
    setActiveVariantIndex(0)
    setImprovedText('')
    setRationale([])
    setWarnings([])
    setQualityScore(null)
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
          role: userRole,
          alternatives: showAlternatives,
          strengths: selectedStrengths.length > 0 ? selectedStrengths.join(', ') : undefined
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to improve comment')
      }

      const data: ImproveResponse = await response.json()
      
      if (data.variants && data.variants.length > 0) {
        // Sort variants by quality score (highest first)
        const sortedVariants = [...data.variants].sort((a, b) => b.quality.score - a.quality.score)
        setVariants(sortedVariants)
        setActiveVariantIndex(0)
        
        // Set current display to best variant
        const bestVariant = sortedVariants[0]
        setImprovedText(bestVariant.improvedText)
        setRationale(bestVariant.rationaleBullets || [])
        setWarnings(bestVariant.warnings || [])
        setQualityScore(bestVariant.quality || null)
      } else {
        // Legacy single response
        setImprovedText(data.improvedText || '')
        setRationale(data.rationaleBullets || [])
        setWarnings(data.warnings || [])
        setQualityScore(data.quality || null)
        setVariants([])
      }

      // Announce to screen readers
      if (ariaLiveRef.current) {
        ariaLiveRef.current.textContent = 'Comment improved successfully. Check the results panel.'
      }

      // Focus management and scroll to results
      setTimeout(() => {
        if (improvedTextRef.current) {
          // Focus on the improved text area for screen readers
          improvedTextRef.current.focus()
          improvedTextRef.current.select()
        }
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
      setQualityScore(null)
      setVariants([])
      setActiveVariantIndex(0)
      setShowExplanation(false)
    }
  }

  const handleModifierClick = async (modifier: string) => {
    if (!draftText.trim() || isImproving) return
    
    let newSettings = { ...settings }
    
    switch (modifier) {
      case 'Softer tone':
        if (settings.tone !== 'Supportive') {
          newSettings.tone = 'Supportive'
        }
        break
      case 'More specific strategies':
        // This will trigger the explain=true mode in the API
        break
      case 'Shorter':
        if (settings.length !== 'Short') {
          newSettings.length = 'Short'
        }
        break
      case 'Translate':
        // For now, cycle through some common languages
        const currentLang = settings.language
        const langs = ['English (UK)', 'Spanish', 'French', 'German']
        const currentIndex = langs.indexOf(currentLang)
        newSettings.language = langs[(currentIndex + 1) % langs.length]
        break
    }
    
    setSettings(newSettings)
    
    // Trigger improvement with new settings
    setTimeout(async () => {
      await handleImproveWithModifier(modifier === 'More specific strategies')
    }, 100)
  }

  const handleImproveWithModifier = async (explainMode = false) => {
    if (!draftText.trim()) return

    setIsImproving(true)

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
          role: userRole,
          explain: explainMode,
          alternatives: showAlternatives,
          strengths: selectedStrengths.length > 0 ? selectedStrengths.join(', ') : undefined
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to improve comment')
      }

      const data: ImproveResponse = await response.json()
      
      if (data.variants && data.variants.length > 0) {
        // Sort variants by quality score (highest first)
        const sortedVariants = [...data.variants].sort((a, b) => b.quality.score - a.quality.score)
        setVariants(sortedVariants)
        setActiveVariantIndex(0)
        
        // Set current display to best variant
        const bestVariant = sortedVariants[0]
        setImprovedText(bestVariant.improvedText)
        setRationale(bestVariant.rationaleBullets || [])
        setWarnings(bestVariant.warnings || [])
        setQualityScore(bestVariant.quality || null)
      } else {
        // Legacy single response
        setImprovedText(data.improvedText || '')
        setRationale(data.rationaleBullets || [])
        setWarnings(data.warnings || [])
        setQualityScore(data.quality || null)
        setVariants([])
      }
      
      if (explainMode) {
        setShowExplanation(true)
      }

    } catch (error) {
      console.error('Error improving comment:', error)
    } finally {
      setIsImproving(false)
    }
  }

  const handleMakeClearer = async () => {
    if (!draftText.trim() || isImproving) return
    await handleImproveWithModifier(false) // Trigger refinement pass
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
      case 'More specific strategies':
      case 'Shorter':
      case 'Translate':
        handleModifierClick(action)
        break
      default:
        console.log('Context action:', action)
    }
  }

  const getQualityLabel = (score: number) => {
    if (score >= 0.9) return { label: 'Parent-ready', color: 'text-green-400' }
    if (score >= 0.8) return { label: 'Solid', color: 'text-yellow-400' }
    return { label: 'Needs work', color: 'text-red-400' }
  }

  const calculateImprovementPercentage = (original: string, improved: string) => {
    const originalTokens = original.toLowerCase().match(/\b\w+\b/g) || []
    const improvedTokens = improved.toLowerCase().match(/\b\w+\b/g) || []
    
    const originalSet = new Set(originalTokens)
    const improvedSet = new Set(improvedTokens)
    
    const newTokens = Array.from(improvedSet).filter(token => !originalSet.has(token))
    const totalOriginalTokens = originalTokens.length
    
    if (totalOriginalTokens === 0) return 100
    
    const improvementRatio = newTokens.length / totalOriginalTokens
    return Math.min(Math.round(improvementRatio * 100), 100)
  }

  const getCurrentVariant = (): CommentVariant | null => {
    if (variants.length > 0) {
      return variants[activeVariantIndex]
    }
    // Fallback to legacy format
    if (improvedText) {
      return {
        improvedText,
        rationaleBullets: rationale,
        quality: qualityScore || { score: 0, reasons: [] },
        warnings
      }
    }
    return null
  }

  const handleVariantChange = (index: number) => {
    if (variants.length > index) {
      setActiveVariantIndex(index)
      const variant = variants[index]
      setImprovedText(variant.improvedText)
      setRationale(variant.rationaleBullets)
      setWarnings(variant.warnings)
      setQualityScore(variant.quality)
    }
  }

  const handleStrengthToggle = (strength: string) => {
    setSelectedStrengths(prev => 
      prev.includes(strength)
        ? prev.filter(s => s !== strength)
        : [...prev, strength]
    )
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
            <div className="mt-2 p-2 bg-blue-900/20 border border-blue-500/30 rounded-lg">
              <div className="flex items-start">
                <svg className="w-3 h-3 text-blue-400 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-xs text-blue-300">
                  <strong>Tip:</strong> Mention the subject and this week&apos;s goal for sharper suggestions.
                </p>
              </div>
            </div>
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

          {/* Optional Strengths */}
          <div>
            <label className="block text-xs font-medium text-slate-200 mb-2">
              Student Strengths <span className="text-slate-400">(optional - helps tailor suggestions)</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {strengthOptions.map((strength) => (
                <button
                  key={strength}
                  onClick={() => handleStrengthToggle(strength)}
                  className={`px-3 py-1 text-xs rounded-full border transition-colors ${
                    selectedStrengths.includes(strength)
                      ? 'bg-purple-600/30 border-purple-500/50 text-purple-200'
                      : 'bg-slate-800/50 border-slate-600/50 text-slate-300 hover:border-slate-500/50 hover:text-slate-200'
                  }`}
                  type="button"
                  aria-pressed={selectedStrengths.includes(strength)}
                >
                  {strength}
                </button>
              ))}
            </div>
            {selectedStrengths.length > 0 && (
              <p className="text-xs text-slate-400 mt-2">
                Selected: {selectedStrengths.join(', ')}
              </p>
            )}
          </div>

          <Button
            onClick={handleImprove}
            disabled={!draftText.trim() || isImproving}
            className="w-full"
            aria-describedby="improve-button-help"
            title="Improve comment (Ctrl+Enter)"
          >
            {isImproving ? 'Improving...' : 'Improve'}
          </Button>
          <p id="improve-button-help" className="text-xs text-slate-400">
            Enhance your comment with AI suggestions
            <br />
            <span className="text-slate-500">
              Keyboard shortcuts: Ctrl+Enter to improve, Alt+E to explain
            </span>
          </p>
          
          {/* Alternatives toggle */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="show-alternatives"
              checked={showAlternatives}
              onChange={(e) => setShowAlternatives(e.target.checked)}
              className="w-4 h-4 text-brand-600 bg-slate-800 border-slate-600 rounded focus:ring-brand-500 focus:ring-2"
            />
            <label htmlFor="show-alternatives" className="ml-2 text-sm font-medium text-slate-300">
              Show 3 alternatives
            </label>
          </div>
        </div>

        {/* Right: Improved Result */}
        <div className="xl:col-span-2 space-y-4" ref={resultRef} aria-live="polite" aria-label="Improved comment results">
          <div>
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="improved-text" className="block text-sm font-medium text-white">
                Improved by Promptly
              </label>
              <div className="flex items-center gap-3">
                {/* Improvement percentage badge */}
                {improvedText && draftText && (
                  <>
                    {(() => {
                      const improvementPct = calculateImprovementPercentage(draftText, improvedText)
                      return (
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            improvementPct >= 50 ? 'bg-green-900/30 text-green-300' :
                            improvementPct >= 30 ? 'bg-yellow-900/30 text-yellow-300' :
                            'bg-red-900/30 text-red-300'
                          }`}>
                            {improvementPct}% improved
                          </span>
                          {improvementPct < 30 && (
                            <span className="text-xs text-slate-400 italic">
                              Try 'More specific strategies'
                            </span>
                          )}
                        </div>
                      )
                    })()}
                  </>
                )}
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
            </div>

            {/* Variant tabs */}
            {variants.length > 1 && (
              <div className="flex border-b border-slate-600 mb-2">
                {variants.map((variant, index) => (
                  <button
                    key={index}
                    onClick={() => handleVariantChange(index)}
                    className={`px-3 py-2 text-sm font-medium transition-colors ${
                      activeVariantIndex === index
                        ? 'border-b-2 border-brand-500 text-brand-400'
                        : 'text-slate-400 hover:text-slate-300'
                    }`}
                  >
                    Variant {String.fromCharCode(65 + index)} 
                    <span className="ml-1 text-xs opacity-75">
                      ({Math.round(variant.quality.score * 100)}%)
                    </span>
                  </button>
                ))}
              </div>
            )}
            
            <div className="relative">
              <textarea
                ref={improvedTextRef}
                id="improved-text"
                value={improvedText}
                readOnly
                rows={8}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent resize-none"
                placeholder="Click 'Improve' to enhance your comment..."
                aria-live="polite"
                aria-label="Improved comment text"
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

            {/* Quality Bar */}
            {qualityScore && (
              <div className="mt-2 p-3 bg-slate-800/50 border border-slate-600/50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-slate-300">Quality Score</span>
                  <span className={`text-xs font-medium ${getQualityLabel(qualityScore.score).color}`}>
                    {getQualityLabel(qualityScore.score).label}
                  </span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2 mb-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-500 ${
                      qualityScore.score >= 0.9 ? 'bg-green-500' :
                      qualityScore.score >= 0.8 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${Math.max(qualityScore.score * 100, 5)}%` }}
                  ></div>
                </div>
                {qualityScore.score < 0.8 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleMakeClearer}
                    disabled={isImproving}
                    className="w-full mt-2 text-xs"
                  >
                    {isImproving ? 'Improving...' : 'Make it clearer'}
                  </Button>
                )}
              </div>
            )}

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
                ref={explainButtonRef}
                variant="outline"
                onClick={() => setShowExplanation(!showExplanation)}
                className="flex-1 min-w-[120px]"
                aria-expanded={showExplanation}
                title="Explain changes (Alt+E)"
              >
                {showExplanation ? 'Hide Explanation' : 'Explain'}
              </Button>
            </div>
          )}

          {/* Modifier Chips */}
          {improvedText && (
            <div className="flex flex-wrap gap-2">
              {['Softer tone', 'More specific strategies', 'Shorter', 'Translate'].map((modifier) => (
                <button
                  key={modifier}
                  onClick={() => handleModifierClick(modifier)}
                  disabled={isImproving}
                  className="px-3 py-1 text-xs bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 hover:text-purple-200 border border-purple-500/30 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {modifier}
                </button>
              ))}
            </div>
          )}

          {/* Explanation Panel */}
          {showExplanation && rationale.length > 0 && (
            <div className="p-4 bg-slate-800/50 border border-slate-600/50 rounded-lg">
              <h4 className="text-sm font-medium text-white mb-3">Why this is better:</h4>
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