"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Copy, RotateCcw } from 'lucide-react'
import { useAnalytics } from '@/hooks/useAnalytics'

type Template = 'parent-message' | 'report-comment' | 'teacher-feedback'
type Tone = 'warm' | 'formal'

interface SnippetDemoProps {
  className?: string
}

// Quick insert chips for common contexts
const quickInserts = [
  { label: "Reading progress", text: "showing improvement in reading fluency and comprehension" },
  { label: "Organisation", text: "working on organisation and time management skills" },
  { label: "Behaviour and kindness", text: "demonstrates positive classroom behaviour and kindness to peers" }
]

// Actions for next steps (deterministic rotation)
const actions = [
  "summarising main ideas in your own words",
  "editing for punctuation and paragraphing",
  "showing evidence for your claims",
  "reading aloud to check fluency",
  "planning before writing"
]

// Template patterns with placeholders
const templates = {
  'parent-message': {
    warm: "Thanks for your support at home. {name} has shown steady progress in {context}. We're seeing more confidence and consistent effort. A helpful next step is {action}. I'm proud of their growth.",
    formal: "I'm writing to share that {name} has shown sustained improvement in {context}. Work is increasingly accurate and focused. The next priority is {action}. Please contact me if you'd like to discuss."
  },
  'report-comment': {
    warm: "{name} made clear gains in {context}. Class participation is stronger and work shows care. Next, we'll target {action} to keep momentum. Keep encouraging reading at home where possible.",
    formal: "{name} demonstrated measurable progress in {context}. Work quality and attention to instructions improved. The next focus is {action}. Continued practice will support further growth."
  },
  'teacher-feedback': {
    warm: "Great to see your effort in {context}. Your ideas are clearer and you're sticking with challenges. Try {action} next to push your learning further—keep it up.",
    formal: "Your progress in {context} is evident. Work now meets expectations more consistently. As a next step, attempt {action} to extend your understanding."
  }
}

// Context mapping from user input to teacher-appropriate terms
function extractContext(input: string): string {
  const lower = input.toLowerCase()
  
  if (lower.includes('read') || lower.includes('phonics') || lower.includes('fluency')) {
    return 'reading fluency'
  }
  if (lower.includes('write') || lower.includes('writing') || lower.includes('paragraph') || lower.includes('grammar') || lower.includes('punct')) {
    return 'extended writing'
  }
  if (lower.includes('organis') || lower.includes('time') || lower.includes('manage')) {
    return 'organisation and time management'
  }
  if (lower.includes('behaviour') || lower.includes('kind') || lower.includes('helping') || lower.includes('social')) {
    return 'positive classroom behaviour'
  }
  if (lower.includes('math') || lower.includes('number') || lower.includes('calculation')) {
    return 'mathematical thinking'
  }
  
  return 'class participation'
}

// Deterministic action selection based on context
function selectAction(context: string, template: Template): string {
  const hash = (context + template).split('').reduce((a, b) => {
    a = ((a << 5) - a) + b.charCodeAt(0)
    return a & a
  }, 0)
  return actions[Math.abs(hash) % actions.length]
}

// Extract name from input or use pronoun
function extractName(input: string): string {
  // Simple name detection - look for capitalized words that might be names
  const words = input.split(/\s+/)
  for (const word of words) {
    if (/^[A-Z][a-z]{2,}$/.test(word) && !['Year', 'Term', 'Class'].includes(word)) {
      return word
    }
  }
  return 'They' // Default to pronoun
}

export function SnippetDemo({ className = "" }: SnippetDemoProps) {
  const [context, setContext] = useState("Year 6 student; improved participation this term; trying hard with reading.")
  const [template, setTemplate] = useState<Template>('parent-message')
  const [tone, setTone] = useState<Tone>('warm')
  const [output, setOutput] = useState('')
  const [copySuccess, setCopySuccess] = useState(false)
  const { trackEvent } = useAnalytics()

  const generateSnippet = () => {
    trackEvent('button_click', { button_text: 'snippet_demo_generate', section: 'snippet_demo' })
    
    // Extract meaningful context from user input
    const extractedContext = extractContext(context)
    const name = extractName(context)
    const action = selectAction(extractedContext, template)
    
    // Get the template pattern
    const pattern = templates[template][tone]
    
    // Replace placeholders
    let generated = pattern
      .replace('{name}', name)
      .replace('{context}', extractedContext)
      .replace('{action}', action)
    
    // Ensure it doesn't exceed ~85 words
    const words = generated.split(/\s+/)
    if (words.length > 85) {
      generated = words.slice(0, 85).join(' ') + '...'
    }
    
    setOutput(generated)
  }

  const resetForm = () => {
    setContext("Year 6 student; improved participation this term; trying hard with reading.")
    setTemplate('parent-message')
    setTone('warm')
    setOutput('')
    setCopySuccess(false)
  }

  const addQuickInsert = (text: string) => {
    const newContext = context.trim()
    const separator = newContext && !newContext.endsWith(';') && !newContext.endsWith('.') ? '; ' : ' '
    setContext(newContext + separator + text)
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(output)
      trackEvent('button_click', { button_text: 'snippet_demo_copy', section: 'snippet_demo' })
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <section className={`py-16 md:py-20 ${className}`.trim()}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Try a quick snippet
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Type a detail, pick a template, and see how Promptly writes it.
          </p>
        </div>

        <Card className="rounded-2xl bg-white shadow-sm border border-slate-200 p-6 dark:bg-slate-900 dark:border-white/10">
          <CardContent className="p-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Input Panel (LEFT) */}
              <div className="space-y-6">
                <div>
                  <Label htmlFor="student-context" className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">
                    Student context
                  </Label>
                  <Textarea
                    id="student-context"
                    value={context}
                    onChange={(e) => setContext(e.target.value)}
                    placeholder="Year 6 student; improved participation this term; trying hard with reading."
                    className="min-h-[120px] resize-none rounded-lg border-slate-300 focus:border-blue-500 dark:border-slate-600 dark:bg-slate-800"
                    maxLength={180}
                  />
                  
                  {/* Quick Insert Chips */}
                  <div className="flex flex-wrap gap-2 mt-3">
                    {quickInserts.map((chip) => (
                      <button
                        key={chip.label}
                        onClick={() => addQuickInsert(chip.text)}
                        className="px-3 py-1 text-xs bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 rounded-full text-slate-700 dark:text-slate-300 transition-colors"
                      >
                        {chip.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="template-select" className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">
                      Template
                    </Label>
                    <Select value={template} onValueChange={(value: Template) => setTemplate(value)}>
                      <SelectTrigger id="template-select" className="rounded-lg border-slate-300 focus:border-blue-500 dark:border-slate-600">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="parent-message">Parent message</SelectItem>
                        <SelectItem value="report-comment">Report comment</SelectItem>
                        <SelectItem value="teacher-feedback">Teacher feedback</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="tone-select" className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">
                      Tone
                    </Label>
                    <Select value={tone} onValueChange={(value: Tone) => setTone(value)}>
                      <SelectTrigger id="tone-select" className="rounded-lg border-slate-300 focus:border-blue-500 dark:border-slate-600">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="warm">Warm</SelectItem>
                        <SelectItem value="formal">Formal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    onClick={generateSnippet}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:scale-105 transition-all duration-200"
                    data-analytics="snippet_demo_generate"
                  >
                    Generate
                  </Button>
                  
                  <Button
                    onClick={resetForm}
                    variant="outline"
                    className="px-4 py-3 rounded-lg border-slate-300 hover:bg-slate-50 dark:border-slate-600 dark:hover:bg-slate-800"
                    aria-label="Reset form"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Output Panel (RIGHT) */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Generated preview (example)
                  </Label>
                  {output && (
                    <Button
                      onClick={copyToClipboard}
                      variant="outline"
                      size="sm"
                      className="text-xs"
                      data-analytics="snippet_demo_copy"
                      aria-label="Copy generated text"
                    >
                      <Copy className="w-3 h-3 mr-1" />
                      {copySuccess ? 'Copied!' : 'Copy'}
                    </Button>
                  )}
                </div>
                
                <div 
                  className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-white/10 rounded-lg p-4 min-h-[200px] flex items-center justify-center"
                  aria-live="polite"
                  aria-label="Generated text output"
                >
                  {output ? (
                    <div className="w-full">
                      <p className="text-slate-800 dark:text-slate-200 leading-relaxed select-text">
                        {output}
                      </p>
                    </div>
                  ) : (
                    <p className="text-slate-400 dark:text-slate-500 text-center text-sm italic">
                      Click "Generate" to see how Promptly would write your message
                    </p>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}