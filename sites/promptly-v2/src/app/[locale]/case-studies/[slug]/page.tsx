import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Calendar, Clock, Share2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

// Disable static generation - render pages dynamically to prevent build errors
export const dynamic = 'force-dynamic'
export const revalidate = 0

// Mock case studies data
const caseStudies = {
  'saving-hours-per-week': {
    title: 'Saving 5 Hours Per Week with AI Comments',
    description: 'How Sarah, a Year 6 teacher, cut her evening work from 3 hours to 30 minutes using Zaza Promptly.',
    category: 'Primary Education',
    readTime: '4 min',
    date: '2024-03-15',
    content: `
# The Challenge

Sarah teaches Year 6 at a busy primary school in Manchester. Like many teachers, she was spending 3+ hours every evening writing student comments, parent emails, and report cards.

"I was exhausted. My family barely saw me, and I was questioning whether I could continue teaching," Sarah explains.

# The Solution

After discovering Zaza Promptly, Sarah integrated AI-powered comment generation into her workflow:

- **Student Comments**: Generated in seconds, not hours
- **Parent Communication**: Professional emails crafted instantly  
- **Report Writing**: Comprehensive reports completed 10x faster

# The Results

Within just two weeks:

- **Evening work**: Reduced from 3 hours to 30 minutes
- **Family time**: Reclaimed weekends and evenings
- **Teaching quality**: More energy for actual teaching
- **Job satisfaction**: "I love teaching again"

> "Zaza Promptly didn't just save me time - it saved my career. I can focus on what matters: inspiring my students."

# Implementation Tips

1. Start with comment generation for homework feedback
2. Use parent communication templates for common scenarios  
3. Batch similar tasks together for maximum efficiency
4. Always review and personalize AI suggestions

Sarah now advocates for AI tools among her colleagues and has helped several other teachers implement similar workflows.
    `
  },
  'better-parent-communication': {
    title: 'Better Parent Communication in Minutes',
    description: 'Transform parent emails from stressful to professional with AI-powered templates.',
    category: 'Communication',
    readTime: '3 min',
    date: '2024-03-10',
    content: `
# The Communication Challenge

Parent communication can be one of the most stressful parts of teaching. Finding the right tone, addressing concerns diplomatically, and maintaining professionalism takes significant time and emotional energy.

# AI-Powered Solutions

With Zaza Promptly's communication tools, teachers can:

- Generate professional email responses instantly
- Handle difficult conversations with suggested phrasing
- Maintain consistent, warm communication tone
- Save templates for common scenarios

# Real Results

Teachers report 80% faster email response times and improved parent relationships through clearer, more professional communication.
    `
  },
  'time-savings-primary-teacher': {
    title: 'From Burnout to Balance: A Primary Teacher\'s Story',
    description: 'Emma reclaimed her evenings and weekends using AI for report writing and parent communication.',
    category: 'Work-Life Balance', 
    readTime: '5 min',
    date: '2024-03-05',
    content: `
# The Burnout Crisis

Emma was considering leaving teaching after 8 years. The workload had become unsustainable, with report writing consuming entire weekends.

# The AI Revolution

Discovering Zaza Promptly changed everything:

- **Report cards**: Completed in 1/10th the time
- **Parent emails**: Professional responses in seconds
- **Planning**: More time for creative lesson ideas

# Life Transformation

Emma now enjoys her evenings, takes proper weekends, and has rediscovered her passion for teaching.

"AI didn't replace me - it amplified me. I'm a better teacher because I'm not exhausted all the time."
    `
  }
}

interface CaseStudyPageProps {
  params: Promise<{
    slug: string
    locale: string
  }>
}

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params
  const study = caseStudies[slug as keyof typeof caseStudies]
  
  if (!study) {
    return {
      title: 'Case Study Not Found',
      description: 'The requested case study could not be found.',
    }
  }

  return {
    title: `${study.title} | Zaza Promptly`,
    description: study.description,
  }
}

export async function generateStaticParams() {
  const locales = ['en','de','fr','es','it']
  const slugs = Object.keys(caseStudies)
  
  return locales.flatMap(locale => 
    slugs.map(slug => ({ 
      locale, 
      slug 
    }))
  )
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug, locale } = await params
  const study = caseStudies[slug as keyof typeof caseStudies]

  if (!study) {
    notFound()
  }

  return (
    <div className="min-h-screen pt-16 lg:pt-20">
      {/* Back Navigation */}
      <div className="bg-gray-50 py-4 sticky top-16 z-10 border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link 
            href="/case-studies" 
            className="inline-flex items-center text-purple-600 hover:text-purple-700 transition-colors font-medium"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Case Studies
          </Link>
          
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              {study.readTime} read
            </div>
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              {new Date(study.date).toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric',
                year: 'numeric'
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Article Header */}
        <header className="py-16">
          <div className="mb-6">
            <span className="inline-block px-4 py-2 bg-purple-100 text-purple-700 text-sm font-medium rounded-full">
              {study.category}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {study.title}
          </h1>

          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            {study.description}
          </p>

          {/* Share Buttons */}
          <div className="flex items-center gap-4">
            <span className="text-gray-600 font-medium">Share:</span>
            <Button variant="outline" size="sm">
              <Share2 className="w-4 h-4 mr-2" />
              Share Story
            </Button>
          </div>
        </header>

        {/* Article Content */}
        <article className="pb-16">
          <div className="prose prose-lg prose-purple max-w-none">
            <div dangerouslySetInnerHTML={{ __html: study.content.replace(/\n/g, '<br/>').replace(/# /g, '<h2>').replace(/> /g, '<blockquote>') }} />
          </div>
        </article>

        {/* Call to Action */}
        <div className="py-12 border-t">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Transform Your Teaching?
            </h3>
            <p className="text-gray-600 mb-6">
              Join thousands of teachers saving 5+ hours weekly with Zaza Promptly
            </p>
            <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
              Start Free Trial
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}