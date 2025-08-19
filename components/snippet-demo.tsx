"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Copy, Sparkles } from 'lucide-react'
import { useAnalytics } from '@/hooks/useAnalytics'

type Template = 'parent-message' | 'report-comment' | 'feedback'
type Tone = 'warm' | 'formal'

// Canned outputs for reliable demo (no API calls)
const cannedOutputs: Record<Template, Record<Tone, string[]>> = {
  'parent-message': {
    warm: [
      "Hi there! I wanted to let you know that Emma has been doing really well this term. Her participation in class discussions has improved significantly, and I can see her confidence growing each week. She's been working particularly hard on her reading, and her effort is definitely paying off. Keep encouraging her at home - she's on a great path!",
      "Hello! I'm pleased to share that James has made wonderful progress this term. His willingness to participate in class activities has really improved, and it's been lovely to see him more engaged. He's putting in excellent effort with his reading skills, and I can see him gaining confidence. Please continue the great support you're giving him at home!",
      "Hi! I hope you're doing well. I wanted to update you on Sarah's progress this term. She's become much more confident in participating during our class discussions, which has been fantastic to see. Her dedication to improving her reading skills is really showing, and she should be proud of her hard work. Thanks for all your support at home!"
    ],
    formal: [
      "Dear Parent/Guardian, I am writing to update you on Emma's academic progress this term. She has demonstrated notable improvement in classroom participation and has shown increased confidence in contributing to discussions. Her commitment to developing her reading skills has been commendable, and her efforts are yielding positive results. I encourage you to continue supporting her learning journey at home.",
      "Dear Parent/Guardian, I would like to provide you with an update regarding James's performance this term. He has shown significant improvement in his classroom engagement and participation levels. His dedicated approach to reading development has been particularly noteworthy, and his progress reflects his consistent effort. Please continue to encourage his learning endeavors.",
      "Dear Parent/Guardian, I am pleased to report on Sarah's academic development this term. She has exhibited enhanced confidence in classroom participation and has become more actively engaged in learning activities. Her focused efforts on reading improvement have been exemplary, and her progress demonstrates her commitment to learning."
    ]
  },
  'report-comment': {
    warm: [
      "Emma has made excellent progress this term! Her confidence in class discussions has grown tremendously, and she consistently contributes thoughtful ideas. She's working hard on her reading skills with great determination, and it's wonderful to see her improvement week by week. Emma should be very proud of her efforts and positive attitude toward learning.",
      "James has shown fantastic growth this term. His participation in class activities has improved significantly, and he's becoming more confident in sharing his thoughts. He's dedicated considerable effort to developing his reading skills, and his progress is clearly evident. James approaches his learning with enthusiasm and should feel proud of his achievements.",
      "Sarah has had a wonderful term of growth and development. Her willingness to participate in discussions has increased dramatically, showing greater confidence each day. She's put tremendous effort into improving her reading abilities, and her hard work is definitely paying off. Sarah's positive approach to challenges makes her a joy to teach."
    ],
    formal: [
      "Emma has demonstrated considerable academic progress throughout this term. Her classroom participation has improved substantially, with increased confidence evident in her contributions to discussions. She has applied consistent effort to developing her reading competencies, resulting in measurable improvement. Emma approaches her learning responsibilities with a positive and determined attitude.",
      "James has achieved notable progress across multiple areas this term. His engagement in classroom activities has increased significantly, demonstrating enhanced confidence in academic settings. His commitment to reading development has been particularly commendable, with clear evidence of skill improvement. James maintains a focused and diligent approach to his studies.",
      "Sarah has made substantial academic gains throughout this reporting period. Her participation in classroom discussions has improved markedly, reflecting increased confidence in her abilities. She has demonstrated dedicated effort in developing her reading skills, with consistent progress evident in her work. Sarah maintains an exemplary attitude toward her learning objectives."
    ]
  },
  'feedback': {
    warm: [
      "Great effort on your work this week, Emma! I can really see how hard you've been trying, especially with your reading. Your participation in our discussions has been wonderful - keep speaking up and sharing your ideas! You're making excellent progress, and I'm excited to see what you accomplish next.",
      "Well done this term, James! Your improved participation has been fantastic to see, and I love how you're becoming more confident in our activities. You're putting in great effort with your reading, and it's really showing in your progress. Keep up the excellent work - you should be proud of yourself!",
      "Excellent work this term, Sarah! I've been so impressed with how much more you're participating in our class discussions. Your hard work on reading is definitely paying off, and your confidence is growing every day. You're doing an amazing job, and I can't wait to see your continued progress!"
    ],
    formal: [
      "Emma has demonstrated commendable effort in her academic work this term. Her increased participation in classroom discussions reflects growing confidence and engagement. Her dedicated approach to reading development has resulted in measurable progress. She should be recognized for her consistent effort and positive attitude toward learning challenges.",
      "James has shown excellent commitment to his studies throughout this period. His enhanced participation in classroom activities demonstrates developing confidence and academic engagement. His focused efforts on reading improvement have yielded positive results. He merits recognition for his diligent approach to learning objectives.",
      "Sarah has exhibited exemplary dedication to her academic development this term. Her increased participation in discussions reflects enhanced confidence and classroom engagement. Her systematic approach to reading skill development has produced notable improvement. She deserves acknowledgment for her consistent effort and positive learning attitude."
    ]
  }
}

export function SnippetDemo() {
  const [context, setContext] = useState("Year 6 student, improved participation this term, trying hard with reading.")
  const [template, setTemplate] = useState<Template>('parent-message')
  const [tone, setTone] = useState<Tone>('warm')
  const [output, setOutput] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [copySuccess, setCopySuccess] = useState(false)
  const { trackEvent } = useAnalytics()

  const generateSnippet = () => {
    setIsGenerating(true)
    trackEvent('button_click', { button_text: 'snippet_demo_generate', section: 'demo' })
    
    // Simulate brief generation delay for realism
    setTimeout(() => {
      const options = cannedOutputs[template][tone]
      const randomOutput = options[Math.floor(Math.random() * options.length)]
      setOutput(randomOutput)
      setIsGenerating(false)
    }, 800)
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(output)
      trackEvent('button_click', { button_text: 'snippet_demo_copy', section: 'demo' })
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <section className="py-16 md:py-20 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Try a quick snippet
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Type a detail, pick a template, and see how Promptly writes it.
          </p>
        </div>

        <Card className="rounded-2xl bg-white shadow-sm border border-slate-200 dark:bg-slate-900 dark:border-white/10">
          <CardContent className="p-6 md:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Input Panel */}
              <div className="space-y-6">
                <div>
                  <Label htmlFor="student-context" className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">
                    Student context
                  </Label>
                  <Textarea
                    id="student-context"
                    value={context}
                    onChange={(e) => setContext(e.target.value)}
                    placeholder="Tell Promptly about your student (optional)"
                    className="min-h-[100px] resize-none rounded-lg border-slate-300 focus:border-blue-500 dark:border-slate-600 dark:bg-slate-800"
                    maxLength={200}
                  />
                  <p className="text-xs text-slate-500 mt-1">{context.length}/200 characters</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                        <SelectItem value="feedback">Feedback</SelectItem>
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

                <Button
                  onClick={generateSnippet}
                  disabled={isGenerating}
                  className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200 disabled:transform-none disabled:opacity-70"
                  data-analytics="snippet_demo_generate"
                >
                  {isGenerating ? (
                    <>
                      <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    'Generate'
                  )}
                </Button>
              </div>

              {/* Output Panel */}
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
                    >
                      <Copy className="w-3 h-3 mr-1" />
                      {copySuccess ? 'Copied!' : 'Copy'}
                    </Button>
                  )}
                </div>
                
                <div 
                  className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg border border-slate-200 dark:border-white/10 min-h-[200px] flex items-center justify-center"
                  aria-live="polite"
                  aria-label="Generated text output"
                >
                  {isGenerating ? (
                    <div className="flex flex-col items-center text-slate-500">
                      <Sparkles className="w-6 h-6 mb-2 animate-spin" />
                      <p className="text-sm">Generating your snippet...</p>
                    </div>
                  ) : output ? (
                    <div className="w-full">
                      <p className="text-slate-800 dark:text-slate-200 leading-relaxed whitespace-pre-wrap select-text">
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

            {/* Disclaimer */}
            <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
              <p className="text-xs text-slate-500 text-center">
                This is a preview with sample outputs. The full Promptly tool offers personalized generation based on your teaching style and student details.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}