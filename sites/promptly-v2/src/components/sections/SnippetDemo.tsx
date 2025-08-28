'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'

export default function SnippetDemo() {
  const [formData, setFormData] = useState({
    subject: 'English',
    level: 'Secondary',
    tone: 'Supportive',
    length: 'Short'
  })
  const [generatedText, setGeneratedText] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [copySuccess, setCopySuccess] = useState(false)

  const handleGenerate = async () => {
    setIsGenerating(true)
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      const data = await response.json()
      if (data.ok) {
        setGeneratedText(data.text)
      }
    } catch (error) {
      console.error('Error generating comment:', error)
      setGeneratedText('Error generating comment. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedText)
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 2000)
    } catch (error) {
      console.error('Error copying to clipboard:', error)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear generated text when form changes
    if (generatedText) {
      setGeneratedText('')
    }
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 shadow-card">
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

          <Button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full"
          >
            {isGenerating ? 'Generating...' : 'Generate'}
          </Button>
        </div>

        {/* Output */}
        <div className="space-y-4">
          <div>
            <label htmlFor="output" className="block text-sm font-medium text-white mb-2">
              Generated Comment
            </label>
            <textarea
              id="output"
              value={generatedText}
              readOnly
              rows={12}
              className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent resize-none"
              placeholder="Click 'Generate' to create a sample comment..."
            />
          </div>

          {generatedText && (
            <Button
              variant="secondary"
              onClick={handleCopy}
              className="w-full"
            >
              {copySuccess ? 'Copied!' : 'Copy'}
            </Button>
          )}
        </div>
      </div>

      <p className="text-xs text-slate-400 mt-4 text-center">
        Outputs are examples only; adjust for your students.
      </p>
    </div>
  )
}
