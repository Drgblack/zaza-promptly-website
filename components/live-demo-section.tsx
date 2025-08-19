"use client"

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, Sparkles } from 'lucide-react'
import { useAnalytics } from '@/hooks/useAnalytics'

export function LiveDemoSection() {
  const [isGenerating, setIsGenerating] = useState(false)
  const { trackEvent } = useAnalytics()

  const handleCTAClick = (label: string) => {
    trackEvent('button_click', { button_text: label, section: 'demo' })
  }

  const simulateGeneration = () => {
    setIsGenerating(true)
    setTimeout(() => setIsGenerating(false), 2000)
  }

  return (
    <section id="demo-section" className="py-16 md:py-24 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            See it in action
          </h2>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="rounded-2xl shadow-2xl border-2 border-slate-200 overflow-hidden">
            <CardContent className="p-0">
              {/* Demo interface mockup */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Input side */}
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-4">
                      Tell Promptly about your student:
                    </h3>
                    <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
                      <div className="space-y-3 text-sm">
                        <div><strong>Student:</strong> Emma, Year 7</div>
                        <div><strong>Subject:</strong> English</div>
                        <div><strong>Context:</strong> Creative writing assignment - showed improvement in character development but still working on paragraph structure</div>
                        <div><strong>Tone:</strong> Encouraging, specific feedback</div>
                      </div>
                    </div>
                  </div>

                  {/* Output side */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-slate-900">
                        Generated parent message:
                      </h3>
                      {isGenerating && (
                        <div className="flex items-center text-indigo-600">
                          <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                          <span className="text-sm">Generating...</span>
                        </div>
                      )}
                    </div>
                    <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
                      <div className={`transition-opacity duration-500 ${isGenerating ? 'opacity-50' : 'opacity-100'}`}>
                        <p className="text-sm text-slate-800 leading-relaxed">
                          Hi there! Emma has been working really hard on her creative writing this term. I was impressed by how she's developed her characters - she's showing real creativity in bringing them to life on the page.
                        </p>
                        <p className="text-sm text-slate-800 leading-relaxed mt-3">
                          We're now focusing on organizing her ideas into clear paragraphs. Emma understands the concept and just needs practice putting it all together. She's making steady progress and should feel proud of her improvement!
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Generate button */}
                <div className="text-center mt-8">
                  <Button 
                    onClick={simulateGeneration}
                    className="bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 text-white px-8 py-3 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200"
                    disabled={isGenerating}
                  >
                    {isGenerating ? 'Generating...' : 'Generate Message'}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12">
            <Button
              size="lg"
              onClick={() => {
                handleCTAClick('demo_try')
                // Scroll to email capture or redirect to signup
                const emailSection = document.getElementById('email-capture-section')
                if (emailSection) {
                  emailSection.scrollIntoView({ behavior: 'smooth' })
                }
              }}
              className="w-full sm:w-auto bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold px-8 py-4 text-lg rounded-full shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              Try Promptly Free
            </Button>
            
            <Link href="/free-resources">
              <Button
                size="lg"
                variant="outline"
                onClick={() => handleCTAClick('demo_examples')}
                className="w-full sm:w-auto border-2 border-slate-300 text-slate-700 hover:bg-slate-50 font-semibold px-8 py-4 text-lg rounded-full transition-all duration-200"
              >
                See Resources
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}