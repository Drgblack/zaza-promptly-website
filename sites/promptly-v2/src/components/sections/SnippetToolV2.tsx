'use client'

import { useState, Fragment } from 'react'
import { Button } from '@/components/ui/button'
import { useAnalytics } from '@/lib/analytics'
import { Copy, Check, RefreshCw, AlertCircle, Wand2, Settings, Sparkles } from 'lucide-react'
import { Listbox, Transition } from '@headlessui/react'
import { ChevronUpDownIcon, CheckIcon } from '@heroicons/react/20/solid'

// Portal component for fixing dropdown clipping
interface PortalSelectProps {
  value: string
  onChange: (value: string) => void
  options: { value: string; label: string }[]
  label: string
  className?: string
}

function PortalSelect({ value, onChange, options, label, className = '' }: PortalSelectProps) {
  const selectedOption = options.find(opt => opt.value === value) || options[0]

  return (
    <div className={className}>
      <Listbox value={value} onChange={onChange}>
        <div className="relative">
          <Listbox.Button className="relative w-full cursor-default rounded-lg bg-slate-800 border border-slate-600 py-2 pl-3 pr-10 text-left text-white focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent">
            <span className="block truncate">{selectedOption.label}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon className="h-5 w-5 text-slate-400" aria-hidden="true" />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-slate-800 border border-slate-600 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              {options.map((option) => (
                <Listbox.Option
                  key={option.value}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? 'bg-brand-500 text-white' : 'text-slate-300'
                    }`
                  }
                  value={option.value}
                >
                  {({ selected }) => (
                    <>
                      <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                        {option.label}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-brand-400">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  )
}

// Simple mode presets with improve draft functionality
const SIMPLE_PRESETS = [
  {
    name: 'Positive Comment',
    description: 'Generate encouraging feedback',
    icon: '✨',
    data: {
      subject: 'General',
      level: 'Primary',
      tone: 'Supportive',
      length: 'Medium',
      scenario: 'Student showing good progress'
    }
  },
  {
    name: 'Areas to Improve',
    description: 'Constructive development feedback',
    icon: '🎯',
    data: {
      subject: 'Mathematics',
      level: 'Secondary',
      tone: 'Supportive',
      length: 'Medium',
      scenario: 'Student needs support with concepts'
    }
  },
  {
    name: 'Report Comment',
    description: 'Formal report card feedback',
    icon: '📝',
    data: {
      subject: 'English',
      level: 'Secondary',
      tone: 'Professional',
      length: 'Long',
      scenario: 'Comprehensive term progress review'
    }
  }
]

interface FormData {
  subject: string
  level: string
  tone: string
  length: string
  scenario?: string
}

interface SnippetToolV2Props {
  locale?: string
}

export default function SnippetToolV2({ locale = 'en' }: SnippetToolV2Props) {
  const { trackEvent } = useAnalytics()
  
  // Feature flag for new version
  const useV2 = process.env.NEXT_PUBLIC_SNIPPET_V2 === 'true'
  
  const [isSimpleMode, setIsSimpleMode] = useState(true)
  const [formData, setFormData] = useState<FormData>({
    subject: 'General',
    level: 'Primary',
    tone: 'Supportive',
    length: 'Medium'
  })
  
  const [draftText, setDraftText] = useState('')
  const [generatedText, setGeneratedText] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [copySuccess, setCopySuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null)
  const [improveDraftMode, setImproveDraftMode] = useState(false)

  // Options for portal selects
  const subjectOptions = [
    { value: 'General', label: 'General' },
    { value: 'English', label: 'English' },
    { value: 'Mathematics', label: 'Mathematics' },
    { value: 'Science', label: 'Science' },
    { value: 'History', label: 'History' },
    { value: 'Geography', label: 'Geography' },
    { value: 'Art', label: 'Art' },
    { value: 'PE', label: 'Physical Education' }
  ]

  const levelOptions = [
    { value: 'Primary', label: 'Primary' },
    { value: 'Secondary', label: 'Secondary' },
    { value: 'GCSE', label: 'GCSE' },
    { value: 'A-Level', label: 'A-Level' }
  ]

  const toneOptions = [
    { value: 'Supportive', label: 'Supportive' },
    { value: 'Professional', label: 'Professional' },
    { value: 'Firm-but-kind', label: 'Firm but Kind' }
  ]

  const lengthOptions = [
    { value: 'Short', label: 'Short' },
    { value: 'Medium', label: 'Medium' },
    { value: 'Long', label: 'Long' }
  ]

  const handleGenerate = async () => {
    setIsGenerating(true)
    setError(null)
    setGeneratedText('')
    
    trackEvent('snippet_generate_attempt', { 
      ...formData, 
      preset: selectedPreset,
      mode: isSimpleMode ? 'simple' : 'advanced',
      improveDraft: improveDraftMode,
      locale 
    })
    
    try {
      if (improveDraftMode && draftText.trim()) {
        // Use improve comment API
        const response = await fetch('/api/improve-comment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            draft: draftText,
            tone: formData.tone,
            readingLevel: 'Standard',
            length: formData.length,
            language: 'Auto-detect',
            subject: formData.subject
          }),
        })
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`)
        }
        
        const data = await response.json()
        
        if (data.improvedText) {
          setGeneratedText(data.improvedText)
          trackEvent('snippet_improve_success', { 
            originalLength: draftText.length,
            improvedLength: data.improvedText.length,
            locale 
          })
        } else {
          throw new Error('No improved text returned')
        }
      } else {
        // Use snippet preview API
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
          trackEvent('snippet_generate_success', { 
            ...formData, 
            preset: selectedPreset,
            textLength: data.text.length,
            locale 
          })
        } else {
          throw new Error(data.error || 'Failed to generate text')
        }
      }
    } catch (error) {
      console.error('Error generating comment:', error)
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
      setError(`Failed to generate: ${errorMessage}`)
      trackEvent('snippet_generate_error', { 
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
      
      trackEvent('snippet_copy_success', { 
        textLength: generatedText.length,
        preset: selectedPreset,
        locale 
      })
    } catch (error) {
      console.error('Error copying to clipboard:', error)
      trackEvent('snippet_copy_error', { error: 'clipboard_failed', locale })
    }
  }

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (generatedText) {
      setGeneratedText('')
    }
    if (selectedPreset) {
      setSelectedPreset(null)
    }
    setError(null)
  }

  const handlePresetSelect = (preset: typeof SIMPLE_PRESETS[0]) => {
    setFormData({
      subject: preset.data.subject,
      level: preset.data.level,
      tone: preset.data.tone,
      length: preset.data.length,
      scenario: preset.data.scenario
    })
    setSelectedPreset(preset.name)
    setGeneratedText('')
    setError(null)
    setImproveDraftMode(false)
    
    trackEvent('snippet_preset_selected', { 
      presetName: preset.name,
      locale 
    })
  }

  const handleImproveDraft = () => {
    setImproveDraftMode(true)
    setSelectedPreset(null)
    setGeneratedText('')
    setError(null)
    
    trackEvent('snippet_improve_mode_enabled', { locale })
  }

  // Return fallback for non-V2
  if (!useV2) {
    return (
      <div className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl font-bold text-center mb-6">AI Snippet Tool</h3>
          <div className="max-w-2xl mx-auto">
            <p className="text-gray-600 text-center">
              Generate personalized comments and feedback with our AI-powered tool.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 shadow-card">
      {/* Mode Toggle */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-white mb-1">
            {improveDraftMode ? 'Improve My Draft' : 'AI Comment Generator'}
          </h3>
          <p className="text-sm text-slate-300">
            {improveDraftMode ? 'Paste your draft below and we\'ll enhance it' : 'Generate professional teacher comments in seconds'}
          </p>
        </div>
        <button
          onClick={() => setIsSimpleMode(!isSimpleMode)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-700 text-slate-300 hover:bg-slate-600 transition-colors text-sm"
        >
          <Settings className="w-4 h-4" />
          {isSimpleMode ? 'Advanced' : 'Simple'}
        </button>
      </div>

      {/* Simple Mode Presets */}
      {isSimpleMode && !improveDraftMode && (
        <div className="mb-6">
          <h4 className="text-sm font-medium text-white mb-3 flex items-center gap-2">
            <Wand2 className="w-4 h-4" />
            Quick Start Options
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {SIMPLE_PRESETS.map((preset) => (
              <button
                key={preset.name}
                onClick={() => handlePresetSelect(preset)}
                className={`p-4 rounded-lg text-left transition-colors border ${
                  selectedPreset === preset.name
                    ? 'bg-brand-500/20 border-brand-500 text-white'
                    : 'bg-slate-800 border-slate-600 text-slate-300 hover:bg-slate-700 hover:border-slate-500'
                }`}
              >
                <div className="text-2xl mb-2">{preset.icon}</div>
                <div className="font-medium text-sm mb-1">{preset.name}</div>
                <div className="text-xs opacity-80">{preset.description}</div>
              </button>
            ))}
          </div>
          
          <div className="mt-4 pt-4 border-t border-slate-700">
            <button
              onClick={handleImproveDraft}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white transition-colors text-sm font-medium"
            >
              <Sparkles className="w-4 h-4" />
              Improve My Draft
            </button>
            <p className="text-xs text-slate-400 mt-2">
              Already have a comment? Let AI make it better.
            </p>
          </div>
        </div>
      )}

      {/* Advanced Mode or Improve Draft Mode */}
      {(!isSimpleMode || improveDraftMode) && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Form */}
          <div className="space-y-4">
            {improveDraftMode && (
              <div>
                <label htmlFor="draft" className="block text-sm font-medium text-white mb-2">
                  Your Draft Comment
                </label>
                <textarea
                  id="draft"
                  value={draftText}
                  onChange={(e) => setDraftText(e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent resize-none"
                  placeholder="Paste your draft comment here and we'll improve it..."
                />
              </div>
            )}

            {!improveDraftMode && (
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-white mb-2">
                  Subject/Topic
                </label>
                <PortalSelect
                  value={formData.subject}
                  onChange={(value) => handleInputChange('subject', value)}
                  options={subjectOptions}
                  label="Subject/Topic"
                />
              </div>
            )}

            <div>
              <label htmlFor="level" className="block text-sm font-medium text-white mb-2">
                Level/Year
              </label>
              <PortalSelect
                value={formData.level}
                onChange={(value) => handleInputChange('level', value)}
                options={levelOptions}
                label="Level/Year"
              />
            </div>

            <div>
              <label htmlFor="tone" className="block text-sm font-medium text-white mb-2">
                Tone
              </label>
              <PortalSelect
                value={formData.tone}
                onChange={(value) => handleInputChange('tone', value)}
                options={toneOptions}
                label="Tone"
              />
            </div>

            <div>
              <label htmlFor="length" className="block text-sm font-medium text-white mb-2">
                Length
              </label>
              <PortalSelect
                value={formData.length}
                onChange={(value) => handleInputChange('length', value)}
                options={lengthOptions}
                label="Length"
              />
            </div>

            {!improveDraftMode && formData.scenario && (
              <div>
                <label htmlFor="scenario" className="block text-sm font-medium text-white mb-2">
                  Scenario (Optional)
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
              disabled={isGenerating || (improveDraftMode && !draftText.trim())}
              className="w-full flex items-center gap-2"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  {improveDraftMode ? 'Improving...' : 'Generating...'}
                </>
              ) : (
                <>
                  {improveDraftMode ? <Sparkles className="w-4 h-4" /> : <Wand2 className="w-4 h-4" />}
                  {improveDraftMode ? 'Improve Draft' : 'Generate Comment'}
                </>
              )}
            </Button>
            
            {improveDraftMode && (
              <button
                onClick={() => {
                  setImproveDraftMode(false)
                  setDraftText('')
                  setGeneratedText('')
                }}
                className="w-full text-sm text-slate-400 hover:text-slate-300 transition-colors"
              >
                ← Back to generator
              </button>
            )}
          </div>

          {/* Output */}
          <div className="space-y-4">
            <div>
              <label htmlFor="output" className="block text-sm font-medium text-white mb-2">
                {improveDraftMode ? 'Improved Comment' : 'Generated Comment'}
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
                      ? (improveDraftMode ? 'Improving your draft...' : 'Generating your comment...') 
                      : error
                      ? 'Please try again'
                      : improveDraftMode
                      ? 'Your improved comment will appear here'
                      : isSimpleMode
                      ? 'Select an option above or click "Advanced" for custom settings'
                      : 'Click "Generate Comment" to create your feedback'
                  }
                />
                
                {/* Loading overlay */}
                {isGenerating && (
                  <div className="absolute inset-0 bg-slate-800/50 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <RefreshCw className="w-6 h-6 text-brand-400 animate-spin mx-auto mb-2" />
                      <p className="text-sm text-slate-300">
                        {improveDraftMode ? 'Improving...' : 'Generating...'}
                      </p>
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
      )}

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
