import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Home, BookOpen, MessageCircle } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-indigo-100">
      <div className="max-w-md w-full text-center px-6">
        {/* Logo/Icon */}
        <div className="mb-8">
          <div className="mx-auto w-20 h-20 bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl flex items-center justify-center">
            <span className="text-white text-3xl font-bold">Z</span>
          </div>
        </div>

        {/* Error Message */}
        <h1 className="text-8xl font-bold text-purple-600 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Page Not Found
        </h2>
        <p className="text-gray-600 mb-8 leading-relaxed">
          Oops! It looks like this page has gone on a field trip. 
          Don't worry - even the best teachers sometimes lose track of things.
        </p>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Button asChild className="w-full bg-purple-600 hover:bg-purple-700">
            <Link href="/">
              <Home className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </Button>
          
          <div className="flex gap-3">
            <Button asChild variant="outline" className="flex-1">
              <Link href="/blog">
                <BookOpen className="w-4 h-4 mr-2" />
                Blog
              </Link>
            </Button>
            
            <Button asChild variant="outline" className="flex-1">
              <Link href="/contact">
                <MessageCircle className="w-4 h-4 mr-2" />
                Contact
              </Link>
            </Button>
          </div>
        </div>

        {/* Helpful Links */}
        <div className="mt-12 text-sm text-gray-500">
          <p className="mb-4">Looking for something specific?</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/free-resources" className="hover:text-purple-600 transition-colors">
              Free Resources
            </Link>
            <Link href="/promptly-pricing" className="hover:text-purple-600 transition-colors">
              Pricing
            </Link>
            <Link href="/faqs" className="hover:text-purple-600 transition-colors">
              FAQs
            </Link>
            <Link href="/support" className="hover:text-purple-600 transition-colors">
              Support
            </Link>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-xs text-gray-400">
            If you think this is a mistake, please{' '}
            <Link href="/contact" className="text-purple-600 hover:underline">
              let us know
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}