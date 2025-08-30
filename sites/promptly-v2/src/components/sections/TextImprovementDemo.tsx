'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'

interface PreviewResponse {
  success: boolean
  original: string
  improved: string
  explanation: string
  tone: string
  isDemo: boolean
  demoMessage: string
  error?: string
}

export default function TextImprovementDemo() {
  const [inputText, setInputText] = useState('')
  const [tone, setTone] = useState('professional')
  const [result, setResult] = useState<PreviewResponse | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleGenerate = async () => {
    if (!inputText.trim()) {
      setError('Please enter some text to improve')
      return
    }

    setIsLoading(true)
    setError('')
    setResult(null)

    try {
      const response = await fetch('/api/snippet/preview', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: inputText.trim(),
          tone: tone
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to process request')
      }

      setResult(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      // Could add a toast notification here
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const sampleTexts = [
    "Good progress this term. Keep working hard.",
    "Talks too much in class. Needs to focus.", 
    "Struggling with math concepts."
  ]

  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 shadow-2xl">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-4">
          <div>
            <label htmlFor="draft-text" className="block text-sm font-medium text-white mb-2">
              Your Draft Comment
            </label>
            <textarea
              id="draft-text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              rows={6}
              maxLength={500}
              className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
              placeholder="Paste your draft comment here..."
            />
            <div className="text-xs text-slate-400 mt-1">
              {inputText.length}/500 characters
            </div>
          </div>

          <div>
            <label htmlFor="tone-select" className="block text-sm font-medium text-white mb-2">
              Tone
            </label>
            <select
              id="tone-select"
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="professional">Professional</option>
              <option value="supportive">Supportive</option>
              <option value="encouraging">Encouraging</option>
              <option value="constructive">Constructive</option>
            </select>
          </div>

          <Button
            onClick={handleGenerate}
            disabled={isLoading || !inputText.trim()}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Processing...
              </div>
            ) : (
              'Make It Better'
            )}
          </Button>

          {/* Sample texts */}
          <div className="border-t border-slate-700 pt-4">
            <p className="text-xs text-slate-400 mb-2">Try these examples:</p>
            <div className="flex flex-wrap gap-2">
              {sampleTexts.map((sample, idx) => (
                <button
                  key={idx}
                  onClick={() => setInputText(sample)}
                  className="text-xs px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-full border border-slate-600 transition-colors"
                >
                  Example {idx + 1}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Improved Version
            </label>
            
            {error && (
              <div className="p-4 bg-red-900/20 border border-red-500/30 rounded-lg">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            {result && (
              <div className="space-y-4">
                <div className="p-4 bg-green-900/20 border border-green-500/30 rounded-lg">
                  <p className="text-white whitespace-pre-wrap">{result.improved}</p>
                  <button
                    onClick={() => handleCopy(result.improved)}
                    className="mt-2 text-xs text-green-400 hover:text-green-300 flex items-center gap-1"
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Copy
                  </button>
                </div>

                <div className="p-3 bg-slate-800/50 border border-slate-600 rounded-lg">
                  <p className="text-xs text-slate-400 font-medium mb-1">Why this works better:</p>
                  <p className="text-sm text-slate-300">{result.explanation}</p>
                </div>

                {result.isDemo && (
                  <div className="p-3 bg-blue-900/20 border border-blue-500/30 rounded-lg">
                    <p className="text-xs text-blue-300">{result.demoMessage}</p>
                  </div>
                )}
              </div>
            )}

            {!result && !error && !isLoading && (
              <div className="p-4 bg-slate-800 border border-slate-600 rounded-lg min-h-[200px] flex items-center justify-center">
                <p className="text-slate-400 text-center">
                  Enter your draft text and click "Make It Better" to see the improved version
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-slate-700">
        <p className="text-xs text-slate-400 text-center">
          This demo shows sample improvements. The full version provides personalized AI assistance.{' '}
          <a href="/zara" className="text-purple-400 hover:text-purple-300">Learn more about Zara →</a>
        </p>
      </div>
    </div>
  )
}