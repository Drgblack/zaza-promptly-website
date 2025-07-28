"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Copy, Check, Sparkles, Clock, Zap, Shuffle } from "lucide-react"

const toneOptions = [
  { id: "encouraging", label: "Encouraging", color: "bg-green-500" },
  { id: "constructive", label: "Constructive", color: "bg-blue-500" },
  { id: "formal", label: "Formal", color: "bg-purple-500" },
  { id: "warm", label: "Warm", color: "bg-orange-500" },
]

const examplePrompts = [
  "Jamie struggles with fractions but tries hard",
  "Sarah excels in creative writing and shows great imagination",
  "Michael has improved his reading comprehension significantly this term",
  "Emma is a natural leader in group activities",
  "Alex needs support with time management and organization",
  "Jordan demonstrates excellent problem-solving skills in math",
  "Taylor shows enthusiasm for science experiments",
  "Casey has made progress in social interactions with peers"
]

export function DemoSection() {
  const [selectedTone, setSelectedTone] = useState("encouraging")
  const [inputText, setInputText] = useState("Jamie struggles with fractions but tries hard")
  const [isGenerating, setIsGenerating] = useState(false)
  const [feedback, setFeedback] = useState<string>("")
  const [showOutput, setShowOutput] = useState(false)
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)
  const [showTimeCallout, setShowTimeCallout] = useState(false)
  const [sectionVisible, setSectionVisible] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const [responseTime, setResponseTime] = useState<number | null>(null)
  const [animatedTime, setAnimatedTime] = useState<number>(0)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setSectionVisible(true)
          }
        })
      },
      { threshold: 0.2 },
    )

    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const handleGenerate = async () => {
    setIsGenerating(true)
    setShowOutput(false)
    setShowTimeCallout(false)
    setCopiedIndex(null)
    setError(null)
    setFeedback("")
    setResponseTime(null)
    const start = Date.now()
    try {
      console.log("Calling /api/generate with:", { context: inputText, tone: selectedTone });
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          context: inputText,
          tone: selectedTone,
        }),
      })
      let errorMessage = "Sorry, we’re having trouble generating feedback right now. Please try again in a few minutes."
      if (!res.ok) {
        let data = null
        try {
          data = await res.json()
        } catch {}
        setError((data && data.error) || errorMessage)
        setIsGenerating(false)
        return
      }
      const data = await res.json()
      console.log("API Response:", data)
      setIsGenerating(false)
      const finalTime = Math.round((Date.now() - start) / 1000)
      setResponseTime(finalTime)
      setFeedback(data.message || "No response generated.")
      setShowOutput(true)
      
      // Animate the timer counting up
      setAnimatedTime(0)
      const animateTimer = () => {
        setAnimatedTime(prev => {
          if (prev < finalTime) {
            return prev + 1
          }
          return finalTime
        })
      }
      
      const timerInterval = setInterval(() => {
        animateTimer()
      }, 100)
      
      setTimeout(() => {
        clearInterval(timerInterval)
        setShowTimeCallout(true)
      }, 500)
    } catch (err: any) {
      setError("Sorry, we’re having trouble generating feedback right now. Please try again in a few minutes.")
      setIsGenerating(false)
    }
  }

  const handleRandomize = () => {
    const randomPrompt = examplePrompts[Math.floor(Math.random() * examplePrompts.length)]
    setInputText(randomPrompt)
    setShowOutput(false)
    setShowTimeCallout(false)
    setError(null)
  }

  const handleCopy = async (text: string, idx: number) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedIndex(idx)
      setTimeout(() => setCopiedIndex(null), 2000)
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  return (
    <section ref={sectionRef} className="relative py-20 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.1),transparent_50%)]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            sectionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="w-8 h-8 text-indigo-500 mr-3" />
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-800">
              See Your New{" "}
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Superpower
              </span>{" "}
              in Action
            </h2>
            <Sparkles className="w-8 h-8 text-purple-500 ml-3" />
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Watch how AI transforms a simple observation into meaningful, personalized feedback
          </p>
        </div>

        {/* Demo Interface */}
        <div
          className={`bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden transition-all duration-1000 ${
            sectionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          {/* Demo Header */}
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-400 rounded-full" />
              <div className="w-3 h-3 bg-yellow-400 rounded-full" />
              <div className="w-3 h-3 bg-green-400 rounded-full" />
              <span className="text-white font-medium ml-4">Zaza Promptly AI Demo</span>
            </div>
          </div>

          <div className="p-4 sm:p-6 lg:p-8">
            {/* Input Section */}
            <div className="mb-6 sm:mb-8">
              <div className="flex items-center justify-between mb-3">
                <label className="block text-sm font-semibold text-gray-700">Student Observation</label>
                <Button
                  onClick={handleRandomize}
                  variant="outline"
                  size="sm"
                  className="text-xs px-2 py-1 h-auto"
                  title="Try a random example"
                >
                  <Shuffle className="w-3 h-3 mr-1" />
                  Random
                </Button>
              </div>
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="w-full p-3 sm:p-4 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none transition-colors resize-none text-gray-700 text-base"
                rows={3}
                placeholder="Describe what you've observed about the student..."
                title="Enter your observation about a student's performance, behavior, or progress"
              />
              <div className="mt-2 text-xs text-gray-500">
                💡 Tip: Be specific about what you've observed. Include both strengths and areas for growth.
              </div>
            </div>

            {/* Tone Selector */}
            <div className="mb-6 sm:mb-8">
              <label className="block text-sm font-semibold text-gray-700 mb-3">Feedback Tone</label>
              <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2 sm:gap-3">
                {toneOptions.map((tone) => (
                  <button
                    key={tone.id}
                    onClick={() => setSelectedTone(tone.id)}
                    className={`px-3 sm:px-4 py-2 sm:py-2 rounded-full font-medium transition-all duration-200 text-sm sm:text-base min-h-[44px] touch-manipulation relative group ${
                      selectedTone === tone.id
                        ? `${tone.color} text-white shadow-lg scale-105`
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                    title={`Generate ${tone.label.toLowerCase()} feedback`}
                  >
                    {tone.label}
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                      {tone.id === 'encouraging' && 'Motivational and supportive'}
                      {tone.id === 'constructive' && 'Balanced with specific suggestions'}
                      {tone.id === 'formal' && 'Professional and academic'}
                      {tone.id === 'warm' && 'Friendly and approachable'}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Generate Button */}
            <div className="mb-6 sm:mb-8">
              <Button
                onClick={handleGenerate}
                disabled={isGenerating || !inputText.trim()}
                className="w-full min-h-[48px] bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none touch-manipulation text-base sm:text-lg"
              >
                {isGenerating ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Generating Magic...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-2">
                    <Zap className="w-5 h-5" />
                    <span>Generate Feedback</span>
                  </div>
                )}
              </Button>
            </div>

            {/* Output Section - Single Feedback Message */}
            {error && (
              <div className="mb-6 animate-fade-in">
                <div className="bg-red-100 border border-red-300 text-red-700 rounded-xl px-4 py-3 text-base font-medium">
                  {error}
                </div>
              </div>
            )}

            {/* Output Section - Single Feedback Message */}
            {showOutput && (
              <div className="mb-6 animate-fade-in">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-3 space-y-2 sm:space-y-0">
                  <label className="text-sm font-semibold text-gray-700">Generated Feedback</label>
                  <Button
                    onClick={() => {
                      const feedbackText = (() => {
                        if (typeof feedback === 'object' && feedback !== null) {
                          return (feedback as any).message;
                        }
                        if (typeof feedback === 'string') {
                          try {
                            const parsed = JSON.parse(feedback);
                            if (parsed && typeof parsed === 'object' && 'message' in parsed) {
                              return parsed.message;
                            }
                          } catch {}
                          return feedback;
                        }
                        return '';
                      })();
                      handleCopy(feedbackText, 0);
                    }}
                    variant="outline"
                    size="sm"
                    className="text-xs px-3 py-2 h-auto bg-white hover:bg-gray-50 border-indigo-200 text-indigo-600 hover:text-indigo-700"
                    title="Copy feedback to clipboard"
                  >
                    {copiedIndex === 0 ? (
                      <>
                        <Check className="w-3 h-3 mr-1" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3 mr-1" />
                        Copy
                      </>
                    )}
                  </Button>
                </div>
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border-2 border-indigo-200 rounded-xl p-4 sm:p-6">
                  <p className="text-gray-800 leading-relaxed text-base sm:text-lg">
                    {(() => {
                      if (typeof feedback === 'object' && feedback !== null) {
                        return (feedback as any).message;
                      }
                      if (typeof feedback === 'string') {
                        try {
                          const parsed = JSON.parse(feedback);
                          if (parsed && typeof parsed === 'object' && 'message' in parsed) {
                            return parsed.message;
                          }
                        } catch {}
                        return feedback;
                      }
                      return '';
                    })()}
                  </p>
                </div>
              </div>
            )}

            {/* Time Callout - Mobile optimized */}
            {showTimeCallout && (
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-4 sm:p-6 animate-fade-in">
                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-3">
                  <div className="flex-shrink-0 mx-auto sm:mx-0">
                    <Clock className="w-8 h-8 text-green-600" />
                  </div>
                  <div className="text-center sm:text-left">
                    <h4 className="text-lg font-semibold text-green-800 mb-1">This took {animatedTime} seconds.</h4>
                    <p className="text-green-700 text-sm sm:text-base">
                      How long would this have taken you?{" "}
                      <span className="font-semibold">Probably 15-20 minutes of careful thought and revision.</span>
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-1 max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Ready to Save Hours Every Week?</h3>
              <p className="text-gray-600 mb-6">
                Join thousands of teachers who've already discovered their feedback superpower
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold px-8 py-4 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200">
                  Start Free Trial
                </Button>
                <Button
                  variant="outline"
                  className="border-2 border-indigo-500 text-indigo-600 hover:bg-indigo-50 font-semibold px-8 py-4 rounded-full bg-transparent"
                >
                  Watch Full Demo
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
