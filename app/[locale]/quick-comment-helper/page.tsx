import type { Metadata } from 'next'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import SnippetToolV2 from '@/src/components/sections/SnippetToolV2'

export const metadata: Metadata = {
  title: 'Quick Comment Helper - Instant AI Teacher Feedback | Zaza Promptly',
  description: 'Generate professional teacher comments instantly. Try our AI-powered comment generator for students, parents, and reports - free demo available.',
}

export async function generateStaticParams() {
  const locales = ['en','de','fr','es','it']
  return locales.map(locale => ({ locale }))
}

export default function QuickCommentHelperPage() {
  return (
    <div className="min-h-screen pt-16 lg:pt-20">
      {/* Hero Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-800 mb-6">
            Quick Comment{" "}
            <span className="bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
              Helper
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Generate professional teacher comments instantly. Try our AI-powered tool 
            that creates personalized feedback for students, parents, and reports.
          </p>
          
          <Button size="lg" className="bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700">
            Try Free Demo
          </Button>
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="shadow-xl">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-center mb-8">
                AI Comment Generator Demo
              </h2>
              
              <SnippetToolV2 />
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">
            Why Teachers Love Our Comment Helper
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-violet-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-violet-600 font-bold">⚡</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Lightning Fast</h3>
                <p className="text-gray-600">
                  Generate professional comments in seconds, not minutes. 
                  Save hours on report writing.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-violet-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-violet-600 font-bold">🎯</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Personalized</h3>
                <p className="text-gray-600">
                  Each comment is tailored to the individual student, 
                  maintaining authenticity and relevance.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-violet-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-violet-600 font-bold">✅</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Professional</h3>
                <p className="text-gray-600">
                  Appropriate tone and language for all educational contexts. 
                  Parent-ready communication.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-r from-violet-600 to-fuchsia-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Ready to Save Hours on Comments?
          </h2>
          <p className="text-xl text-violet-100 mb-8 max-w-2xl mx-auto">
            Join thousands of teachers using AI to write better comments faster.
          </p>
          
          <Button 
            size="lg" 
            className="bg-white text-violet-600 hover:bg-gray-100"
          >
            Start Free Trial - No Credit Card Required
          </Button>
        </div>
      </section>
    </div>
  )
}