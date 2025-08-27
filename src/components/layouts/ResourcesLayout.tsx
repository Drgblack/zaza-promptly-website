'use client'

import React from 'react'
import EmailSignupForm from '../forms/EmailSignupForm'

interface ResourcesLayoutProps {
  title: string
  description: string
  children: React.ReactNode
}

export default function ResourcesLayout({
  title,
  description,
  children
}: ResourcesLayoutProps) {
  return (
    <div className="min-h-screen pt-16 lg:pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="py-16 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {title}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {description}
          </p>
        </header>

        {/* Top Email Signup */}
        <div className="mb-16">
          <EmailSignupForm 
            variant="hero"
            source="free-resources-top"
            headline="Get Exclusive Teaching Resources"
            subtext="Access our complete library of AI prompts, templates, and guides. Join 12,000+ teachers saving hours every week."
            buttonText="Access Free Resources →"
            className="max-w-2xl mx-auto"
          />
        </div>

        {/* Main Content */}
        <main className="pb-16">
          {children}
        </main>

        {/* Bottom Email Signup */}
        <div className="py-16 bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl">
          <EmailSignupForm 
            variant="compact"
            source="free-resources-bottom"
            headline="Want More Teaching Resources?"
            subtext="Get weekly AI prompts, productivity tips, and exclusive downloads delivered to your inbox."
            buttonText="Get Weekly Tips →"
            className="max-w-lg mx-auto"
          />
        </div>
      </div>
    </div>
  )
}