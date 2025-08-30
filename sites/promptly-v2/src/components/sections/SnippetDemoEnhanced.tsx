'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useAnalytics } from '@/lib/analytics'
import { Copy, Check, RefreshCw, AlertCircle, Wand2 } from 'lucide-react'

// Preset scenarios for quick testing
const DEMO_PRESETS = [
  {
    name: 'Positive Feedback',
    subject: 'Mathematics',
    level: 'Secondary',
    tone: 'Supportive',
    length: 'Medium',
    scenario: 'Student showing excellent progress in algebra'
  },
  {
    name: 'Areas for Improvement',
    subject: 'English',
    level: 'Primary', 
    tone: 'Motivational',
    length: 'Short',
    scenario: 'Student needs support with reading comprehension'
  },
  {
    name: 'Parent Communication',
    subject: 'Science',
    level: 'GCSE',
    tone: 'Formal',
    length: 'Long',
    scenario: 'Report card comment for consistent effort'
  },
  {
    name: 'Behavior Note',
    subject: 'General',
    level: 'Primary',
    tone: 'Supportive',
    length: 'Medium',
    scenario: 'Student showing improvement in classroom behavior'
  }
]

interface FormData {
  subject: string
  level: string
  tone: string
  length: string
  scenario?: string
}

interface SnippetDemoEnhancedProps {
  locale?: string
}

export default function SnippetDemoEnhanced({ locale = 'en' }: SnippetDemoEnhancedProps) {
  const { trackEvent } = useAnalytics()
  
  const [formData, setFormData] = useState<FormData>({
    subject: 'English',
    level: 'Secondary',
    tone: 'Supportive',
    length: 'Short'
  })
  
  const [generatedText, setGeneratedText] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [copySuccess, setCopySuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null)

  const handleGenerate = async () => {
    setIsGenerating(true)
    setError(null)
    setGeneratedText('')
    
    // Track generation attempt
    trackEvent('demo_generate_attempt', { 
      ...formData, 
      preset: selectedPreset,
      locale 
    })
    
    try {
      const response = await fetch('/api/snippet/preview', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          demo: true
        }),
      })
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }
      
      const data = await response.json()
      
      if (data.success && data.text) {
        setGeneratedText(data.text)
        trackEvent('demo_generate_success', { 
          ...formData, 
          preset: selectedPreset,
          textLength: data.text.length,
          locale 
        })
      } else {
        throw new Error(data.error || 'Failed to generate text')
      }
    } catch (error) {
      console.error('Error generating comment:', error)
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
      setError(`Failed to generate: ${errorMessage}`)
      trackEvent('demo_generate_error', { 
        ...formData, 
        error: errorMessage,
        locale 
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const handleCopy = async () => {
    if (!generatedText) return
    
    try {
      await navigator.clipboard.writeText(generatedText)
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 2000)
      
      trackEvent('demo_copy_success', { 
        textLength: generatedText.length,
        preset: selectedPreset,
        locale 
      })
    } catch (error) {
      console.error('Error copying to clipboard:', error)
      trackEvent('demo_copy_error', { error: 'clipboard_failed', locale })
    }
  }

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear generated text when form changes
    if (generatedText) {
      setGeneratedText('')
    }
    // Clear selected preset if manually editing
    if (selectedPreset) {
      setSelectedPreset(null)
    }
    setError(null)
  }

  const handlePresetSelect = (preset: typeof DEMO_PRESETS[0]) => {
    setFormData({
      subject: preset.subject,
      level: preset.level,
      tone: preset.tone,
      length: preset.length,
      scenario: preset.scenario
    })
    setSelectedPreset(preset.name)
    setGeneratedText('')
    setError(null)
    
    trackEvent('demo_preset_selected', { 
      presetName: preset.name,
      locale 
    })
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 shadow-card">
      {/* Preset Chips */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-white mb-3 flex items-center gap-2">
          <Wand2 className="w-4 h-4" />
          Quick Start Presets
        </h4>
        <div className="flex flex-wrap gap-2">
          {DEMO_PRESETS.map((preset) => (
            <button
              key={preset.name}
              onClick={() => handlePresetSelect(preset)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                selectedPreset === preset.name
                  ? 'bg-brand-500 text-white'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              {preset.name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Form */}
        <div className="space-y-4">
          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-white mb-2">
              Subject/Topic
            </label>
            <input
              id="subject"
              type="text"
              value={formData.subject}
              onChange={(e) => handleInputChange('subject', e.target.value)}
              className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
              placeholder="Enter subject or topic"
            />
          </div>

          <div>
            <label htmlFor="level" className="block text-sm font-medium text-white mb-2">
              Level/Year
            </label>
            <select
              id="level"
              value={formData.level}
              onChange={(e) => handleInputChange('level', e.target.value)}
              className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
            >
              <option value="Primary">Primary</option>
              <option value="Secondary">Secondary</option>
              <option value="GCSE">GCSE</option>
              <option value="A-Level">A-Level</option>
            </select>
          </div>

          <div>
            <label htmlFor="tone" className="block text-sm font-medium text-white mb-2">
              Tone
            </label>
            <select
              id="tone"
              value={formData.tone}
              onChange={(e) => handleInputChange('tone', e.target.value)}
              className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
            >
              <option value="Formal">Formal</option>
              <option value="Supportive">Supportive</option>
              <option value="Motivational">Motivational</option>
            </select>
          </div>

          <div>
            <label htmlFor="length" className="block text-sm font-medium text-white mb-2">
              Length
            </label>
            <select
              id="length"
              value={formData.length}
              onChange={(e) => handleInputChange('length', e.target.value)}
              className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
            >
              <option value="Short">Short</option>
              <option value="Medium">Medium</option>
              <option value="Long">Long</option>
            </select>
          </div>

          {formData.scenario && (
            <div>
              <label htmlFor="scenario" className="block text-sm font-medium text-white mb-2">
                Scenario
              </label>
              <textarea
                id="scenario"
                value={formData.scenario}
                onChange={(e) => handleInputChange('scenario', e.target.value)}
                rows={2}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent resize-none"
                placeholder="Describe the specific situation..."
              />
            </div>
          )}

          <Button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full flex items-center gap-2"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Wand2 className="w-4 h-4" />
                Generate Demo
              </>
            )}
          </Button>
        </div>

        {/* Output */}
        <div className="space-y-4">
          <div>
            <label htmlFor="output" className="block text-sm font-medium text-white mb-2">
              Generated Comment
            </label>
            
            <div className="relative">
              <textarea
                id="output"
                value={generatedText}
                readOnly
                rows={12}
                className={`w-full px-3 py-2 border rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent resize-none ${
                  error
                    ? 'bg-red-900/20 border-red-600'
                    : 'bg-slate-800 border-slate-600'
                }`}
                placeholder={
                  isGenerating 
                    ? 'Generating your demo comment...' 
                    : error
                    ? 'Please try again or select a preset above'
                    : 'Click "Generate Demo" or select a preset to see a sample comment'
                }
              />
              
              {/* Loading overlay */}
              {isGenerating && (
                <div className="absolute inset-0 bg-slate-800/50 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <RefreshCw className="w-6 h-6 text-brand-400 animate-spin mx-auto mb-2" />
                    <p className="text-sm text-slate-300">Generating...</p>
                  </div>
                </div>
              )}
            </div>
            
            {/* Error message */}
            {error && (
              <div className="mt-2 flex items-start gap-2 text-red-400 text-sm">
                <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}
          </div>

          {generatedText && !error && (
            <Button
              variant="secondary"
              onClick={handleCopy}
              className="w-full flex items-center gap-2"
            >
              {copySuccess ? (
                <>
                  <Check className="w-4 h-4 text-green-500" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  Copy to Clipboard
                </>
              )}
            </Button>
          )}
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-slate-700">
        <p className="text-xs text-slate-400 text-center">
          This is a demonstration. Generated comments are examples only and should be personalized for your specific students and context.
        </p>
        {selectedPreset && (
          <p className="text-xs text-slate-500 text-center mt-1">
            Using preset: <span className="text-brand-400">{selectedPreset}</span>
          </p>
        )}
      </div>
    </div>
  )
}