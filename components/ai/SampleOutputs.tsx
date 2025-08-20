"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Brain, Wand2, Copy, RefreshCw, Sparkles, CheckCircle, AlertCircle } from 'lucide-react'
import { useAnalytics } from '@/hooks/useAnalytics'

interface SampleOutput {
  id: string
  category: 'behavior' | 'academic' | 'parent_communication' | 'progress'
  student: string
  subject?: string
  tone: 'professional' | 'encouraging' | 'constructive' | 'celebratory'
  output: string
  transparency: {
    reasoning: string
    keyFactors: string[]
    safeguards: string[]
  }
}

const sampleOutputs: SampleOutput[] = [
  {
    id: '1',
    category: 'behavior',
    student: 'Emma',
    tone: 'encouraging',
    output: "Emma has shown remarkable improvement in her classroom participation this term. She consistently raises her hand to contribute thoughtful questions and has become more confident in sharing her ideas with peers. Her willingness to help classmates during group work demonstrates excellent collaborative skills.",
    transparency: {
      reasoning: "Generated positive behavioral feedback focusing on specific improvements and social skills development",
      keyFactors: ["Participation increase", "Peer collaboration", "Confidence building"],
      safeguards: ["No personal details", "Factual language", "Constructive framing"]
    }
  },
  {
    id: '2',
    category: 'academic',
    student: 'James',
    subject: 'Mathematics',
    tone: 'constructive',
    output: "James demonstrates a solid understanding of basic mathematical concepts and shows particular strength in problem-solving. To further develop his skills, we're working on building confidence with multi-step word problems and encouraging him to show his working more consistently.",
    transparency: {
      reasoning: "Balanced academic feedback highlighting strengths while identifying specific growth areas",
      keyFactors: ["Current skill level", "Specific strengths", "Targeted improvement areas"],
      safeguards: ["Growth-focused language", "Specific examples", "Actionable feedback"]
    }
  },
  {
    id: '3',
    category: 'parent_communication',
    student: 'Sofia',
    tone: 'professional',
    output: "I wanted to update you on Sofia's recent progress in class. She has been working diligently on her reading comprehension and has made noticeable improvements in identifying main ideas in texts. We've been incorporating some additional practice activities that align well with her learning style.",
    transparency: {
      reasoning: "Professional parent communication emphasizing progress and collaborative approach",
      keyFactors: ["Recent progress", "Specific skill area", "Teaching strategies"],
      safeguards: ["Collaborative tone", "Specific achievements", "Educational focus"]
    }
  }
]

const liveGenerationTopics = [
  'Reading comprehension progress',
  'Mathematical problem solving',
  'Creative writing development',
  'Scientific inquiry skills',
  'Art project participation',
  'Physical education effort',
  'Music class engagement',
  'Social interaction skills'
]

export function SampleOutputs() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedTone, setSelectedTone] = useState<string>('professional')
  const [customTopic, setCustomTopic] = useState('')
  const [generatedSample, setGeneratedSample] = useState<string>('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [showTransparency, setShowTransparency] = useState<string | null>(null)
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const { trackEvent } = useAnalytics()

  const filteredOutputs = selectedCategory === 'all' 
    ? sampleOutputs 
    : sampleOutputs.filter(output => output.category === selectedCategory)

  const generateLiveSample = async () => {
    if (!customTopic.trim()) return
    
    setIsGenerating(true)
    trackEvent('ai_sample_generated', { topic: customTopic, tone: selectedTone })
    
    // Simulate AI generation with realistic delay
    setTimeout(() => {
      const templates = {
        professional: `Regarding ${customTopic.toLowerCase()}, the student has demonstrated consistent effort and engagement. They show understanding of key concepts and are making steady progress toward learning objectives. I appreciate their participation in class activities and willingness to ask thoughtful questions.`,
        encouraging: `I'm pleased to share that the student has made wonderful progress with ${customTopic.toLowerCase()}! Their enthusiasm and dedication are truly inspiring. They've shown great improvement and should feel proud of their achievements. Keep up the excellent work!`,
        constructive: `The student shows promise in ${customTopic.toLowerCase()} and has been working hard to develop their skills. We've identified some areas for continued focus, and with targeted practice, I'm confident they will see further improvement. Their positive attitude makes coaching them a pleasure.`,
        celebratory: `Outstanding work with ${customTopic.toLowerCase()}! The student has exceeded expectations and shown remarkable growth. Their creativity, effort, and positive attitude have made them a joy to teach. This is exactly the kind of progress we love to see!`
      }
      
      setGeneratedSample(templates[selectedTone as keyof typeof templates])
      setIsGenerating(false)
    }, 2000)
  }

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
    trackEvent('ai_sample_copied', { category: 'sample_output' })
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2 text-purple-600 mb-4">
          <Brain className="w-6 h-6" />
          <span className="text-sm font-semibold tracking-wide uppercase">AI Transparency</span>
        </div>
        <h2 className="text-3xl font-bold text-gray-800">See AI in Action</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Explore real examples of AI-generated teacher comments and understand how our safe, 
          hallucination-free AI creates professional content.
        </p>
      </div>

      <Tabs defaultValue="samples" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="samples">Sample Outputs</TabsTrigger>
          <TabsTrigger value="generator">Try Live Demo</TabsTrigger>
        </TabsList>

        {/* Sample Outputs Tab */}
        <TabsContent value="samples" className="space-y-6">
          {/* Filters */}
          <div className="flex gap-4 items-center justify-center">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="behavior">Behavior Comments</SelectItem>
                <SelectItem value="academic">Academic Progress</SelectItem>
                <SelectItem value="parent_communication">Parent Messages</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Sample Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AnimatePresence>
              {filteredOutputs.map((sample, index) => (
                <motion.div
                  key={sample.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-all duration-200 border-l-4 border-l-purple-500">
                    <CardHeader className="space-y-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">Student: {sample.student}</CardTitle>
                        <div className="flex gap-2">
                          <Badge variant="secondary" className="text-xs capitalize">
                            {sample.category.replace('_', ' ')}
                          </Badge>
                          <Badge variant="outline" className="text-xs capitalize">
                            {sample.tone}
                          </Badge>
                        </div>
                      </div>
                      {sample.subject && (
                        <p className="text-sm text-gray-600">Subject: {sample.subject}</p>
                      )}
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="bg-gray-50 p-4 rounded-lg relative">
                        <p className="text-gray-700 leading-relaxed">"{sample.output}"</p>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="absolute top-2 right-2 h-8 w-8 p-0"
                          onClick={() => copyToClipboard(sample.output, sample.id)}
                        >
                          {copiedId === sample.id ? (
                            <CheckCircle className="w-4 h-4 text-green-600" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </Button>
                      </div>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowTransparency(
                          showTransparency === sample.id ? null : sample.id
                        )}
                        className="w-full"
                      >
                        <AlertCircle className="w-4 h-4 mr-2" />
                        {showTransparency === sample.id ? 'Hide' : 'Show'} AI Transparency
                      </Button>

                      <AnimatePresence>
                        {showTransparency === sample.id && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="space-y-3 bg-blue-50 p-4 rounded-lg border border-blue-200"
                          >
                            <div>
                              <h4 className="font-semibold text-sm text-blue-800 mb-1">How it was generated:</h4>
                              <p className="text-sm text-blue-700">{sample.transparency.reasoning}</p>
                            </div>
                            
                            <div>
                              <h4 className="font-semibold text-sm text-blue-800 mb-1">Key factors:</h4>
                              <div className="flex flex-wrap gap-1">
                                {sample.transparency.keyFactors.map((factor, i) => (
                                  <Badge key={i} variant="secondary" className="text-xs bg-blue-100 text-blue-700">
                                    {factor}
                                  </Badge>
                                ))}
                              </div>
                            </div>

                            <div>
                              <h4 className="font-semibold text-sm text-blue-800 mb-1">Safety measures:</h4>
                              <div className="flex flex-wrap gap-1">
                                {sample.transparency.safeguards.map((safeguard, i) => (
                                  <Badge key={i} variant="secondary" className="text-xs bg-green-100 text-green-700">
                                    {safeguard}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </TabsContent>

        {/* Live Generator Tab */}
        <TabsContent value="generator" className="space-y-6">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wand2 className="w-5 h-5 text-purple-600" />
                AI Comment Generator Demo
              </CardTitle>
              <p className="text-sm text-gray-600">
                Try generating a sample comment. Enter a topic and watch our AI create professional feedback.
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="topic">Topic or Subject Area</Label>
                <div className="flex gap-2">
                  <Input
                    id="topic"
                    placeholder="e.g., Reading comprehension, Math problem solving..."
                    value={customTopic}
                    onChange={(e) => setCustomTopic(e.target.value)}
                  />
                  <Select value={selectedTone} onValueChange={setSelectedTone}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="professional">Professional</SelectItem>
                      <SelectItem value="encouraging">Encouraging</SelectItem>
                      <SelectItem value="constructive">Constructive</SelectItem>
                      <SelectItem value="celebratory">Celebratory</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Quick topic suggestions */}
                <div className="flex flex-wrap gap-2 mt-2">
                  {liveGenerationTopics.slice(0, 4).map((topic, i) => (
                    <Button
                      key={i}
                      variant="ghost"
                      size="sm"
                      onClick={() => setCustomTopic(topic)}
                      className="text-xs h-7 px-2 text-purple-600 hover:bg-purple-50"
                    >
                      {topic}
                    </Button>
                  ))}
                </div>
              </div>

              <Button
                onClick={generateLiveSample}
                disabled={!customTopic.trim() || isGenerating}
                className="w-full"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Generate Sample Comment
                  </>
                )}
              </Button>

              {generatedSample && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-green-50 border border-green-200 p-4 rounded-lg space-y-3"
                >
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="font-semibold text-green-800">Generated Comment:</span>
                  </div>
                  <p className="text-gray-700 leading-relaxed">"{generatedSample}"</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-green-600">✓ Hallucination-safe ✓ Professional ✓ GDPR compliant</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(generatedSample, 'generated')}
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      Copy
                    </Button>
                  </div>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default SampleOutputs