"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Copy, Sparkles } from 'lucide-react'
import { useAnalytics } from '@/hooks/useAnalytics'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { generateFromNotes, type TemplateType } from '@/lib/snippetRules'

interface SnippetDemoProps {
  className?: string
}

// Example inputs for each tab - only used when clicking "Fill example"
const EXAMPLES = {
  report: "Liam, Year 4, improved focus during math lessons, still working on showing his work step-by-step",
  parent: "Emma, excellent creative writing this term, loves storytelling, sometimes rushes through editing",
  iep: "Alex, working on reading comprehension goals, improved phonics skills, needs support with inference questions",
  praise: "Maya helped a struggling classmate with math, showed excellent leadership during group work"
} as const

const TABS = [
  { id: 'report' as const, label: 'Report Comment', description: 'End-of-term student progress reports' },
  { id: 'parent' as const, label: 'Parent Message', description: 'Updates and communications to families' },
  { id: 'iep' as const, label: 'IEP/Goal', description: 'Learning goals and progress tracking' },
  { id: 'praise' as const, label: 'Positive Note', description: 'Encouragement and recognition' }
] as const

export function SnippetDemo({ className = "" }: SnippetDemoProps) {
  const [activeTab, setActiveTab] = useState<TemplateType>('report')
  // Use localStorage to persist user notes across sessions
  const [userNotes, setUserNotes] = useLocalStorage<string>('snippet-demo-notes', '')
  // Store generated output per tab so users can compare
  const [generatedOutputs, setGeneratedOutputs] = useState<Record<TemplateType, string>>({
    report: '',
    parent: '',
    iep: '',
    praise: ''
  })
  const [copySuccess, setCopySuccess] = useState(false)
  const { trackEvent } = useAnalytics()

  const generateSnippet = () => {
    trackEvent('button_click', { button_text: 'snippet_demo_generate', section: 'snippet_demo', tab: activeTab })
    
    // Generate using rule-based system
    const output = generateFromNotes(userNotes, activeTab)
    
    // Store the output for this tab
    setGeneratedOutputs(prev => ({
      ...prev,
      [activeTab]: output
    }))
  }

  const fillExample = () => {
    // Only place where we overwrite user input - when explicitly requested
    setUserNotes(EXAMPLES[activeTab])
    // Clear output when filling example
    setGeneratedOutputs(prev => ({
      ...prev,
      [activeTab]: ''
    }))
    trackEvent('button_click', { button_text: 'snippet_demo_fill_example', section: 'snippet_demo', tab: activeTab })
  }

  const handleTabChange = (tabId: TemplateType) => {
    setActiveTab(tabId)
    setCopySuccess(false)
    // NEVER overwrite userNotes on tab change - this preserves user input
    trackEvent('button_click', { button_text: `snippet_tab_${tabId}`, section: 'snippet_demo' })
  }

  const copyToClipboard = async () => {
    const currentOutput = generatedOutputs[activeTab]
    if (!currentOutput) return
    
    try {
      await navigator.clipboard.writeText(currentOutput)
      trackEvent('button_click', { button_text: 'snippet_demo_copy', section: 'snippet_demo', tab: activeTab })
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const currentOutput = generatedOutputs[activeTab]

  return (
    <div className={`py-20 md:py-28 ${className}`.trim()} id="demo-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            See it in action
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Pick a template, add your notes, and see how Promptly writes it.
          </p>
        </div>

        <Card className="rounded-xl bg-white/70 dark:bg-white/[0.06] backdrop-blur shadow-sm border border-slate-200 dark:border-white/10">
          <CardContent className="p-8">
            {/* Tab Pills */}
            <div className="flex flex-wrap gap-2 mb-8 justify-center">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md transform scale-105'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                  aria-pressed={activeTab === tab.id}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Active Tab Description */}
            <div className="text-center mb-8">
              <p className="text-slate-600 dark:text-slate-400">
                {TABS.find(tab => tab.id === activeTab)?.description}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Input Panel (LEFT) */}
              <div className="space-y-6">
                <div>
                  <Label htmlFor="student-context" className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">
                    Student notes
                  </Label>
                  <Textarea
                    id="student-context"
                    value={userNotes}
                    onChange={(e) => setUserNotes(e.target.value)}
                    placeholder="Add a brief note about the student..."
                    className="min-h-[140px] resize-none rounded-lg border-slate-300 focus:border-blue-500 dark:border-slate-600 dark:bg-slate-800/50"
                    maxLength={200}
                  />
                  
                  {/* Fill Example Chip */}
                  <div className="mt-3">
                    <button
                      onClick={fillExample}
                      className="px-3 py-1.5 text-xs bg-amber-100 hover:bg-amber-200 dark:bg-amber-900/20 dark:hover:bg-amber-900/30 rounded-full text-amber-700 dark:text-amber-300 transition-colors border border-amber-200 dark:border-amber-700/30"
                    >
                      <Sparkles className="w-3 h-3 inline mr-1" />
                      Fill example
                    </button>
                  </div>
                </div>

                <Button
                  onClick={generateSnippet}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:scale-105 transition-all duration-200"
                  size="lg"
                >
                  Generate {TABS.find(tab => tab.id === activeTab)?.label}
                </Button>
              </div>

              {/* Output Panel (RIGHT) */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Generated text
                  </Label>
                  {currentOutput && (
                    <Button
                      onClick={copyToClipboard}
                      variant="outline"
                      size="sm"
                      className="text-xs"
                      aria-label="Copy generated text"
                    >
                      <Copy className="w-3 h-3 mr-1" />
                      {copySuccess ? 'Copied!' : 'Copy'}
                    </Button>
                  )}
                </div>
                
                <div 
                  className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-white/10 rounded-lg p-4 min-h-[220px] flex items-center justify-center"
                  aria-live="polite"
                  aria-label="Generated text output"
                >
                  {currentOutput ? (
                    <div className="w-full space-y-4">
                      <p className="text-slate-800 dark:text-slate-200 leading-relaxed select-text">
                        {currentOutput}
                      </p>
                      
                      {/* Zara Assistant Persona */}
                      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mt-4">
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-white text-sm font-semibold">Z</span>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-purple-900 mb-1">Zara (Your AI Assistant)</p>
                            <p className="text-sm text-purple-800">
                              "This is just a simple demo – the full version gives you multiple tone options, learns your writing style, and includes safeguards to ensure every comment is appropriate for your students and families."
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center space-y-4">
                      <p className="text-slate-400 dark:text-slate-500 text-sm italic">
                        Click "Generate" to see how Promptly would write your {TABS.find(tab => tab.id === activeTab)?.label.toLowerCase()}
                      </p>
                      
                      {/* Zara Assistant Intro */}
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-white text-sm font-semibold">Z</span>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-blue-900 mb-1">Meet Zara, Your AI Teaching Assistant</p>
                            <p className="text-sm text-blue-800">
                              "Hi! I'm here to help you write professional, caring comments for students and parents. Just add your notes above and I'll craft something appropriate and engaging."
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}