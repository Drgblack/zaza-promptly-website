'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import EmailSignupForm from '../forms/EmailSignupForm'

interface CaseStudiesLayoutProps {
  title: string
  description: string
  category?: string
  children: React.ReactNode
  slug?: string
}

export default function CaseStudiesLayout({
  title,
  description,
  category,
  children,
  slug
}: CaseStudiesLayoutProps) {
  return (
    <div className="min-h-screen pt-16 lg:pt-20">
      {/* Back Navigation */}
      <div className="bg-gray-50 py-4 sticky top-16 z-10 border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
          <Link 
            href="/case-studies" 
            className="inline-flex items-center text-purple-600 hover:text-purple-700 transition-colors font-medium"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Case Studies
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Article Header */}
        <header className="py-16">
          {category && (
            <div className="mb-6">
              <span className="inline-block px-4 py-2 bg-purple-100 text-purple-700 text-sm font-medium rounded-full">
                {category}
              </span>
            </div>
          )}

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {title}
          </h1>

          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            {description}
          </p>
        </header>

        {/* Top Email Signup */}
        <div className="mb-12">
          <EmailSignupForm 
            variant="compact"
            source={`case-study-${slug}-top`}
            headline="Get Similar Success Stories"
            subtext="Join thousands of teachers transforming their workload with AI."
            showNameFields={false}
            className="max-w-lg mx-auto"
          />
        </div>

        {/* Article Content */}
        <article className="pb-16">
          <div className="prose prose-lg prose-purple max-w-none">
            {children}
          </div>
        </article>

        {/* Bottom Email Signup */}
        <div className="pb-12">
          <EmailSignupForm 
            variant="compact"
            source={`case-study-${slug}-bottom`}
            headline="Ready for Your Own Success Story?"
            subtext="Start saving hours like these teachers. Join 12,000+ educators using AI tools."
            buttonText="Transform My Teaching →"
            className="max-w-lg mx-auto"
          />
        </div>

        {/* Call to Action */}
        <div className="py-12 border-t">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Transform Your Teaching?
            </h3>
            <p className="text-gray-600 mb-6">
              Join thousands of teachers saving 5+ hours weekly with Zaza Promptly
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}