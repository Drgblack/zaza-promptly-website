'use client'

import { useState } from 'react'
import { Download, Copy, Check, Clock, MessageSquare, BookOpen } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const quickWinResources = [
  {
    id: 'parent-templates',
    icon: MessageSquare,
    title: '50 Parent Communication Templates',
    description: 'Ready-to-use email templates for common classroom situations',
    downloadUrl: '/resources/parent-communication-templates.pdf',
    previewText: `"Hi [Parent Name], I wanted to share some exciting progress I've observed with [Student Name] in class..."`
  },
  {
    id: 'lesson-starters',
    icon: BookOpen,
    title: 'Quick Lesson Plan Starters',
    description: 'Turn abstract curriculum goals into structured daily plans',
    downloadUrl: '/resources/lesson-plan-starters.pdf',
    previewText: `Learning Objective: Students will understand... Materials Needed: ... Opening Hook: ...`
  },
  {
    id: 'differentiation-ideas',
    icon: Clock,
    title: 'Differentiation Strategies Cheat Sheet',
    description: 'Simple modifications for different learning styles and abilities',
    downloadUrl: '/resources/differentiation-strategies.pdf',
    previewText: `For Visual Learners: Use graphic organizers... For Kinesthetic: Add movement breaks...`
  }
]

const exampleComments = [
  {
    subject: 'Math Progress',
    before: 'Emma - good at problem solving, struggles with times tables',
    after: 'Emma demonstrates excellent analytical thinking in mathematics and approaches word problems with confidence. While she\'s still building fluency with multiplication facts, her problem-solving strategies are sophisticated. I recommend short, daily practice with times tables using fun activities like math games or flashcards to build automaticity.',
  },
  {
    subject: 'Reading Development', 
    before: 'Jake - reads well but comprehension needs work',
    after: 'Jake is a fluent reader who tackles challenging texts with enthusiasm. To further develop his comprehension skills, I suggest encouraging him to pause and summarize what he\'s read, make predictions, and discuss the characters\' motivations. His decoding skills are strong - now we\'re focusing on deeper understanding.',
  },
  {
    subject: 'Behavior Support',
    before: 'Sarah - easily distracted, needs movement breaks',
    after: 'Sarah learns best when she can incorporate movement into her learning routine. She\'s been successful using fidget tools during instruction and benefits from brief movement breaks between activities. Her participation in class discussions is thoughtful when she\'s able to move around. These strategies are helping her stay focused and engaged.',
  }
]

export function QuickWinsSection() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)
  const [downloadedResource, setDownloadedResource] = useState<string | null>(null)

  const copyToClipboard = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedIndex(index)
      setTimeout(() => setCopiedIndex(null), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  const handleDownload = (resourceId: string, downloadUrl: string) => {
    // In a real implementation, this would trigger an actual download
    // For now, we'll simulate it and potentially capture email for lead generation
    setDownloadedResource(resourceId)
    setTimeout(() => setDownloadedResource(null), 3000)
    
    // You could integrate with your email capture system here
    console.log(`Download requested for ${resourceId}`)
  }

  return (
    <section className="py-20 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 dark:from-green-900/10 dark:via-blue-900/10 dark:to-purple-900/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Clock className="w-4 h-4 mr-2" />
            5-Minute Teacher Wins
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Get Results in Your First 15 Minutes
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Don't wait to see the impact. Start with these free resources and see immediate improvements in your feedback quality and speed.
          </p>
        </div>

        {/* Before/After Examples */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-8">
            See the Transformation: Your Notes → Professional Comments
          </h3>
          <div className="grid gap-6 max-w-4xl mx-auto">
            {exampleComments.map((example, index) => (
              <Card key={index} className="overflow-hidden">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg">{example.subject}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200 dark:border-red-800">
                      <div className="flex items-center mb-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                        <span className="text-sm font-medium text-red-700 dark:text-red-300">Your Quick Notes</span>
                      </div>
                      <p className="text-sm text-gray-700 dark:text-gray-300 font-mono bg-white dark:bg-gray-800 p-2 rounded border">
                        "{example.before}"
                      </p>
                    </div>
                    <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                          <span className="text-sm font-medium text-green-700 dark:text-green-300">Professional Comment</span>
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => copyToClipboard(example.after, index)}
                          className="h-8 px-2"
                        >
                          {copiedIndex === index ? (
                            <Check className="w-3 h-3 text-green-600" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                        </Button>
                      </div>
                      <p className="text-sm text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 p-2 rounded border">
                        {example.after}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Free Resources */}
        <div>
          <h3 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-8">
            Free Resources to Get Started Today
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {quickWinResources.map((resource) => {
              const Icon = resource.icon
              return (
                <Card key={resource.id} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <CardTitle className="text-lg">{resource.title}</CardTitle>
                    <CardDescription>{resource.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded text-xs text-left mb-4 font-mono">
                      {resource.previewText}
                    </div>
                    <Button
                      onClick={() => handleDownload(resource.id, resource.downloadUrl)}
                      className="w-full"
                      disabled={downloadedResource === resource.id}
                    >
                      {downloadedResource === resource.id ? (
                        <>
                          <Check className="w-4 h-4 mr-2" />
                          Downloaded!
                        </>
                      ) : (
                        <>
                          <Download className="w-4 h-4 mr-2" />
                          Download Free
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-gray-700 max-w-2xl mx-auto">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Ready for unlimited feedback generation?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              These samples show just a glimpse. With Promptly, you can generate unlimited professional comments for any situation in seconds.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <a href="/waitlist">Start 14-Day Free Trial</a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="/pricing">View Pricing Plans</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}