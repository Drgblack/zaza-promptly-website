"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Copy, Sparkles } from 'lucide-react'
import { useAnalytics } from '@/hooks/useAnalytics'

type TabType = 'report' | 'parent' | 'iep' | 'praise'

interface SnippetDemoProps {
  className?: string
}

// Example inputs for each tab
const EXAMPLES = {
  report: {
    input: "Liam, Year 4, improved focus during math lessons, still working on showing his work step-by-step",
    output: "Liam has demonstrated notable improvement in mathematical focus and engagement this term. His participation during whole-class instruction has strengthened considerably, and he approaches problem-solving tasks with increased confidence. Moving forward, we'll continue developing his ability to document his mathematical thinking clearly through step-by-step work recording. This will support his learning consolidation and help him communicate his problem-solving strategies more effectively."
  },
  parent: {
    input: "Emma, excellent creative writing this term, loves storytelling, sometimes rushes through editing",
    output: "I wanted to share some wonderful news about Emma's progress in creative writing! Her storytelling abilities have really flourished this term - she has such a vivid imagination and her stories are genuinely engaging to read. Emma's enthusiasm for writing is evident in every piece she creates. To help her work reach its full potential, we're focusing on developing her editing skills, encouraging her to slow down during the revision process to polish her excellent ideas. Her creative talent combined with stronger editing habits will make her writing truly shine."
  },
  iep: {
    input: "Alex, working on reading comprehension goals, improved phonics skills, needs support with inference questions",
    output: "Alex has made measurable progress toward his reading comprehension goals this quarter. His phonics foundations have strengthened significantly, which is supporting his fluency development. Current focus area: developing inference skills when reading both fiction and non-fiction texts. Recommended strategies include guided questioning techniques and graphic organizers to support thinking about text clues. Next goal milestone: independently answering 3/4 inference questions correctly during supported reading sessions."
  },
  praise: {
    input: "Maya helped a struggling classmate with math, showed excellent leadership during group work",
    output: "Maya, I was so impressed watching you help your classmate understand those fractions today. You explained the concept patiently and celebrated their success when they got it right - that's exactly what good leaders do! Your positive energy during group work makes everyone around you feel supported and confident. Thank you for making our classroom such a welcoming place for everyone to learn and grow. Keep being the encouraging teammate you are!"
  }
}

const TABS = [
  { id: 'report', label: 'Report Comment', description: 'End-of-term student progress reports' },
  { id: 'parent', label: 'Parent Message', description: 'Updates and communications to families' },
  { id: 'iep', label: 'IEP/Goal', description: 'Learning goals and progress tracking' },
  { id: 'praise', label: 'Positive Note', description: 'Encouragement and recognition' }
] as const

export function SnippetDemo({ className = "" }: SnippetDemoProps) {
  const [activeTab, setActiveTab] = useState<TabType>('report')
  const [context, setContext] = useState(EXAMPLES.report.input)
  const [output, setOutput] = useState('')
  const [copySuccess, setCopySuccess] = useState(false)
  const { trackEvent } = useAnalytics()

  const generateSnippet = () => {
    trackEvent('button_click', { button_text: 'snippet_demo_generate', section: 'snippet_demo', tab: activeTab })
    
    if (!context.trim()) {
      setOutput("Please add a brief note about the student to generate a response.")
      return
    }
    
    // Use the deterministic example output for the active tab
    setOutput(EXAMPLES[activeTab].output)
  }

  const fillExample = () => {
    setContext(EXAMPLES[activeTab].input)
    setOutput('')
  }

  const handleTabChange = (tabId: TabType) => {
    setActiveTab(tabId)
    setContext(EXAMPLES[tabId].input)
    setOutput('')
    setCopySuccess(false)
    trackEvent('button_click', { button_text: `snippet_tab_${tabId}`, section: 'snippet_demo' })
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
    <section className={`py-16 md:py-20 ${className}`.trim()} id="demo-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Try a quick snippet
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
                    value={context}
                    onChange={(e) => setContext(e.target.value)}
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
                    Generated text (example)
                  </Label>
                  {output && (
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
                  {output ? (
                    <div className="w-full">
                      <p className="text-slate-800 dark:text-slate-200 leading-relaxed select-text">
                        {output}
                      </p>
                    </div>
                  ) : (
                    <p className="text-slate-400 dark:text-slate-500 text-center text-sm italic">
                      Click "Generate" to see how Promptly would write your {TABS.find(tab => tab.id === activeTab)?.label.toLowerCase()}
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