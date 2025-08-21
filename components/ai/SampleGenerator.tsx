'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Sparkles, Copy, RefreshCw, CheckCircle } from 'lucide-react'

interface SampleOutput {
  topic: string
  output: string
  type: 'comment' | 'email' | 'report'
}

const sampleOutputs: SampleOutput[] = [
  {
    topic: "Student showing improvement in math",
    output: "Jamie has shown remarkable progress in mathematics this term. Their understanding of fractions has grown significantly, and they now approach problem-solving with increased confidence. I'm particularly impressed by their willingness to ask questions and seek help when needed. Keep up the excellent work!",
    type: 'comment'
  },
  {
    topic: "Student needs support with reading comprehension",
    output: "While Alex demonstrates strong decoding skills, we're focusing on developing their reading comprehension strategies. They would benefit from additional practice with inferencing and making text-to-self connections. I recommend continuing with guided reading at home and celebrating their progress in phonics.",
    type: 'comment'
  },
  {
    topic: "Parent communication about behavior",
    output: "I wanted to reach out regarding Sarah's recent behavior in class. While she's academically capable, she's been having difficulty staying focused during independent work time. I'd love to collaborate with you on strategies that work well at home. Could we schedule a brief chat this week?",
    type: 'email'
  },
  {
    topic: "End of term progress summary",
    output: "This term has been filled with growth and achievement for Marcus. In literacy, they've advanced two reading levels and show particular strength in creative writing. In mathematics, they've mastered multiplication tables and are beginning to explore division concepts. Their collaborative skills continue to shine during group work.",
    type: 'report'
  }
]

export default function SampleGenerator() {
  const [selectedTopic, setSelectedTopic] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [currentSample, setCurrentSample] = useState<SampleOutput | null>(null)
  const [copied, setCopied] = useState(false)

  const handleGenerate = () => {
    if (!selectedTopic.trim()) return

    setIsGenerating(true)
    
    // Find a relevant sample or use a random one
    const relevantSample = sampleOutputs.find(sample => 
      sample.topic.toLowerCase().includes(selectedTopic.toLowerCase()) ||
      selectedTopic.toLowerCase().includes('math') && sample.topic.includes('math') ||
      selectedTopic.toLowerCase().includes('read') && sample.topic.includes('reading') ||
      selectedTopic.toLowerCase().includes('behavior') && sample.topic.includes('behavior')
    ) || sampleOutputs[Math.floor(Math.random() * sampleOutputs.length)]

    // Simulate AI generation delay for realism
    setTimeout(() => {
      setCurrentSample(relevantSample)
      setIsGenerating(false)
    }, 1500)
  }

  const handleCopy = async () => {
    if (currentSample) {
      await navigator.clipboard.writeText(currentSample.output)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleReset = () => {
    setSelectedTopic('')
    setCurrentSample(null)
    setCopied(false)
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          AI Sample Generator
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          See how Promptly creates professional, personalized feedback in seconds
        </p>
      </div>

      {/* Input Section */}
      <div className="mb-8">
        <label htmlFor="topic" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          Describe what you need feedback about:
        </label>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            id="topic"
            type="text"
            value={selectedTopic}
            onChange={(e) => setSelectedTopic(e.target.value)}
            placeholder="e.g., 'Student improving in reading' or 'Need to discuss behavior with parents'"
            className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            onKeyPress={(e) => e.key === 'Enter' && handleGenerate()}
          />
          <button
            onClick={handleGenerate}
            disabled={!selectedTopic.trim() || isGenerating}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg font-medium transition-colors transform hover:scale-105 duration-200 flex items-center justify-center gap-2 min-w-[120px]"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Generate
              </>
            )}
          </button>
        </div>
      </div>

      {/* Sample Suggestions */}
      {!currentSample && (
        <div className="mb-8">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Try these examples:</p>
          <div className="flex flex-wrap gap-2">
            {sampleOutputs.map((sample, index) => (
              <button
                key={index}
                onClick={() => setSelectedTopic(sample.topic)}
                className="px-3 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg text-sm transition-colors"
              >
                {sample.topic}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Output Section */}
      {currentSample && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Generated Output:</span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                currentSample.type === 'comment' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                currentSample.type === 'email' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
              }`}>
                {currentSample.type}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                title="Copy to clipboard"
              >
                {copied ? <CheckCircle className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
              </button>
              <button
                onClick={handleReset}
                className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                title="Try another"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border-l-4 border-blue-500">
            <p className="text-gray-800 dark:text-gray-200 leading-relaxed">
              {currentSample.output}
            </p>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-xs font-bold">i</span>
              </div>
              <div>
                <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-1">
                  How this was generated:
                </h4>
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  Our AI analyzed your topic and created professional, empathetic feedback using pedagogical best practices. 
                  In the full version, you can customize tone, length, and specific details for each student.
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-center pt-4">
            <Link 
              href="/waitlist" 
              className="inline-block px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-all duration-200 transform hover:scale-105"
            >
              Try Promptly Free for 7 Days
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}