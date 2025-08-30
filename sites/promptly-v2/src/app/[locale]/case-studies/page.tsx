import type { Metadata } from 'next'
import { Card, CardContent } from '@/components/ui/card'
import Link from 'next/link'
import { Calendar, Clock, ArrowRight } from 'lucide-react'

// Disable static generation - render pages dynamically to prevent build errors
export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata: Metadata = {
  title: 'Case Studies - Real Teacher Success Stories | Zaza Promptly',
  description: 'See how teachers are saving 5+ hours weekly with Zaza Promptly. Real case studies from primary, secondary, and special education teachers.',
}

// Mock case studies data - in real app this would come from CMS/files
const caseStudies = [
  {
    slug: 'saving-hours-per-week',
    title: 'Saving 5 Hours Per Week with AI Comments',
    excerpt: 'How Sarah, a Year 6 teacher, cut her evening work from 3 hours to 30 minutes using Zaza Promptly.',
    category: 'Primary Education',
    readTime: '4 min',
    date: '2024-03-15',
    featured: true
  },
  {
    slug: 'better-parent-communication', 
    title: 'Better Parent Communication in Minutes',
    excerpt: 'Transform parent emails from stressful to professional with AI-powered templates.',
    category: 'Communication',
    readTime: '3 min', 
    date: '2024-03-10'
  },
  {
    slug: 'time-savings-primary-teacher',
    title: 'From Burnout to Balance: A Primary Teacher\'s Story',
    excerpt: 'Emma reclaimed her evenings and weekends using AI for report writing and parent communication.',
    category: 'Work-Life Balance',
    readTime: '5 min',
    date: '2024-03-05'
  }
]

export async function generateStaticParams() {
  const locales = ['en','de','fr','es','it']
  return locales.map(locale => ({ locale }))
}

export default function CaseStudiesPage() {
  return (
    <div className="min-h-screen pt-16 lg:pt-20">
      {/* Hero Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-800 mb-6">
            Teacher Success{" "}
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Stories
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Real stories from teachers who've transformed their workflow and reclaimed their time with Zaza Promptly.
          </p>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="py-16 lg:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {caseStudies.map((study, index) => (
              <Card key={study.slug} className={`group hover:shadow-xl transition-all duration-300 ${
                study.featured ? 'lg:col-span-2 lg:row-span-1' : ''
              }`}>
                <CardContent className="p-8">
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                      {study.category}
                    </span>
                    <span className="mx-3">•</span>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {study.readTime}
                    </div>
                    <span className="mx-3">•</span>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(study.date).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">
                    {study.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {study.excerpt}
                  </p>
                  
                  <Link 
                    href={`/case-studies/${study.slug}`}
                    className="inline-flex items-center text-purple-600 hover:text-purple-700 font-medium group-hover:translate-x-1 transition-all duration-200"
                  >
                    Read Story
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}