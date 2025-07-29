"use client"

// Force edge runtime to prevent prerendering completely
export const runtime = 'edge'
export const dynamic = 'force-dynamic'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Sparkles, Wand2, FileText, Clock, CheckCircle2, ExternalLink, ArrowRight } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'

interface BlogPreview {
  title: string
  description: string
  category: string
  tags: string[]
  wordCount: number
}

export default function GenerateBlogPage() {
  const [formData, setFormData] = useState({
    topic: '',
    tone: 'helpful',
    category: 'AI in Education',
    tags: '',
    referenceUrls: '',
    author: {
      name: 'AI Assistant',
      bio: 'AI-powered content creation for educators'
    }
  })

  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedSlug, setGeneratedSlug] = useState<string | null>(null)
  const [preview, setPreview] = useState<BlogPreview | null>(null)
  const [error, setError] = useState<string | null>(null)

  const categories = [
    'Lesson Planning',
    'Parent Communication',
    'AI in Education',
    'Classroom Management',
    'Productivity',
    'AI Tools',
    'Teacher Wellness',
    'Educational Technology'
  ]

  const tones = [
    { value: 'helpful', label: 'Helpful & Supportive' },
    { value: 'inspiring', label: 'Inspiring & Motivational' },
    { value: 'professional', label: 'Professional & Authoritative' },
    { value: 'friendly', label: 'Friendly & Conversational' },
    { value: 'practical', label: 'Practical & Action-Oriented' }
  ]

  const handleGenerate = async () => {
    if (!formData.topic.trim()) {
      setError('Please enter a topic for your blog post')
      return
    }

    setIsGenerating(true)
    setError(null)
    setGeneratedSlug(null)
    setPreview(null)

    try {
      const response = await fetch('/api/generate-blog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          topic: formData.topic,
          tone: formData.tone,
          category: formData.category,
          tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
          referenceUrls: formData.referenceUrls.split('\n').map(url => url.trim()).filter(Boolean),
          author: formData.author
        })
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to generate blog post')
      }

      setGeneratedSlug(result.slug)
      setPreview(result.preview)
    } catch (err: any) {
      setError(err.message || 'An error occurred while generating the blog post')
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <>
      <Header />
      
      <main className="min-h-screen pt-16 lg:pt-20 bg-gray-50">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-purple-50 to-pink-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="p-3 bg-purple-100 rounded-xl mr-4">
                <Sparkles className="w-8 h-8 text-purple-600" />
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900">
                AI Blog Writer
              </h1>
            </div>
            
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Generate comprehensive, engaging blog posts for teachers in minutes. 
              Simply provide a topic and let AI create professional content with interactive elements.
            </p>

            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
              <div className="flex items-center">
                <FileText className="w-4 h-4 mr-2 text-purple-600" />
                2500+ words
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2 text-purple-600" />
                Generated in 30 seconds
              </div>
              <div className="flex items-center">
                <CheckCircle2 className="w-4 h-4 mr-2 text-purple-600" />
                SEO optimized
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Form */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Wand2 className="w-5 h-5 mr-2 text-purple-600" />
                    Blog Generation Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Topic */}
                  <div>
                    <Label htmlFor="topic" className="text-sm font-medium text-gray-700 mb-2 block">
                      Blog Topic *
                    </Label>
                    <Input
                      id="topic"
                      placeholder="e.g., AI-powered lesson planning for elementary teachers"
                      value={formData.topic}
                      onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                      className="w-full"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Be specific for better results
                    </p>
                  </div>

                  {/* Tone */}
                  <div>
                    <Label className="text-sm font-medium text-gray-700 mb-2 block">
                      Tone & Style
                    </Label>
                    <Select value={formData.tone} onValueChange={(value) => setFormData({ ...formData, tone: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {tones.map((tone) => (
                          <SelectItem key={tone.value} value={tone.value}>
                            {tone.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Category */}
                  <div>
                    <Label className="text-sm font-medium text-gray-700 mb-2 block">
                      Category
                    </Label>
                    <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Tags */}
                  <div>
                    <Label htmlFor="tags" className="text-sm font-medium text-gray-700 mb-2 block">
                      Tags (comma-separated)
                    </Label>
                    <Input
                      id="tags"
                      placeholder="AI Tools, Lesson Planning, Productivity"
                      value={formData.tags}
                      onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                    />
                  </div>

                  {/* Reference URLs */}
                  <div>
                    <Label htmlFor="references" className="text-sm font-medium text-gray-700 mb-2 block">
                      Reference URLs (optional)
                    </Label>
                    <Textarea
                      id="references"
                      placeholder="https://example.com/research&#10;https://another-source.com"
                      value={formData.referenceUrls}
                      onChange={(e) => setFormData({ ...formData, referenceUrls: e.target.value })}
                      rows={3}
                      className="resize-none"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      One URL per line for additional context
                    </p>
                  </div>

                  {/* Author Info */}
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <Label htmlFor="authorName" className="text-sm font-medium text-gray-700 mb-2 block">
                        Author Name
                      </Label>
                      <Input
                        id="authorName"
                        value={formData.author.name}
                        onChange={(e) => setFormData({ 
                          ...formData, 
                          author: { ...formData.author, name: e.target.value }
                        })}
                      />
                    </div>
                  </div>

                  {/* Generate Button */}
                  <Button
                    onClick={handleGenerate}
                    disabled={isGenerating || !formData.topic.trim()}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3"
                  >
                    {isGenerating ? (
                      <>
                        <div className="animate-spin w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full" />
                        Generating Blog Post...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 mr-2" />
                        Generate Blog Post
                      </>
                    )}
                  </Button>

                  {error && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-red-800 text-sm">{error}</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Preview/Results */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="w-5 h-5 mr-2 text-green-600" />
                    {preview ? 'Generated Successfully!' : 'Preview & Results'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {!preview && !isGenerating && (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FileText className="w-8 h-8 text-gray-400" />
                      </div>
                      <p className="text-gray-600">
                        Fill out the form and click "Generate Blog Post" to see your content preview here.
                      </p>
                    </div>
                  )}

                  {isGenerating && (
                    <div className="text-center py-12">
                      <div className="animate-spin w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full mx-auto mb-4"></div>
                      <p className="text-gray-600 mb-2">Creating your blog post...</p>
                      <div className="text-sm text-gray-500 space-y-1">
                        <p>• Analyzing topic and generating outline</p>
                        <p>• Writing comprehensive content</p>
                        <p>• Adding interactive components</p>
                        <p>• Optimizing for SEO</p>
                      </div>
                    </div>
                  )}

                  {preview && (
                    <div className="space-y-6">
                      <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex items-center mb-2">
                          <CheckCircle2 className="w-5 h-5 text-green-600 mr-2" />
                          <span className="font-medium text-green-800">Blog post generated successfully!</span>
                        </div>
                        <p className="text-green-700 text-sm">
                          Your blog post has been created and saved to the content library.
                        </p>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <Label className="text-sm font-medium text-gray-700 mb-1 block">Title</Label>
                          <p className="text-gray-900 font-medium">{preview.title}</p>
                        </div>

                        <div>
                          <Label className="text-sm font-medium text-gray-700 mb-1 block">Description</Label>
                          <p className="text-gray-600 text-sm">{preview.description}</p>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <Label className="text-sm font-medium text-gray-700 mb-1 block">Category</Label>
                            <Badge variant="secondary">{preview.category}</Badge>
                          </div>
                          <div className="text-right">
                            <Label className="text-sm font-medium text-gray-700 mb-1 block">Word Count</Label>
                            <p className="text-2xl font-bold text-purple-600">{preview.wordCount.toLocaleString()}</p>
                          </div>
                        </div>

                        <div>
                          <Label className="text-sm font-medium text-gray-700 mb-2 block">Tags</Label>
                          <div className="flex flex-wrap gap-2">
                            {preview.tags.map((tag, index) => (
                              <Badge key={index} variant="outline">{tag}</Badge>
                            ))}
                          </div>
                        </div>

                        <div className="pt-4 border-t">
                          <div className="flex gap-3">
                            <Button asChild className="flex-1">
                              <Link href={`/blog/${generatedSlug}`}>
                                <ExternalLink className="w-4 h-4 mr-2" />
                                View Post
                              </Link>
                            </Button>
                            <Button 
                              variant="outline" 
                              onClick={() => {
                                setPreview(null)
                                setGeneratedSlug(null)
                                setFormData({
                                  ...formData,
                                  topic: ''
                                })
                              }}
                            >
                              Generate Another
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                What Makes Our AI Blog Writer Special?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Designed specifically for educators, with features that make content creation effortless and effective.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card>
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                    <Sparkles className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">Interactive Components</h3>
                  <p className="text-gray-600 text-sm">
                    Automatically includes callout boxes, prompt templates, and interactive elements to engage readers.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">SEO Optimized</h3>
                  <p className="text-gray-600 text-sm">
                    Every post includes optimized titles, meta descriptions, keywords, and structured data for better search visibility.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                    <FileText className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">Education-Focused</h3>
                  <p className="text-gray-600 text-sm">
                    Content is specifically tailored for K-12 educators with practical strategies and classroom applications.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-purple-600 to-pink-600">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Scale Your Content Creation?
            </h2>
            <p className="text-xl text-purple-100 mb-8">
              Generate high-quality blog posts in minutes, not hours. Perfect for busy educators and content creators.
            </p>
            <Button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              <ArrowRight className="w-4 h-4 mr-2" />
              Start Generating Content
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}