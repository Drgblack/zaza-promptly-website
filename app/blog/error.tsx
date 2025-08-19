'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { AlertTriangle, RefreshCw, Home, BookOpen } from 'lucide-react'

export default function BlogError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to monitoring service
    console.error('Blog error:', error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-indigo-100">
      <div className="max-w-md w-full text-center px-6">
        {/* Logo/Icon */}
        <div className="mb-8">
          <div className="mx-auto w-20 h-20 bg-gradient-to-br from-red-500 to-orange-600 rounded-2xl flex items-center justify-center">
            <AlertTriangle className="w-10 h-10 text-white" />
          </div>
        </div>

        {/* Error Message */}
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">
          Something went wrong
        </h1>
        <p className="text-gray-600 mb-8 leading-relaxed">
          We're having trouble loading this blog post. This might be a temporary issue.
        </p>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Button 
            onClick={reset}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Try Again
          </Button>
          
          <div className="flex gap-3">
            <Button asChild variant="outline" className="flex-1">
              <Link href="/blog">
                <BookOpen className="w-4 h-4 mr-2" />
                All Posts
              </Link>
            </Button>
            
            <Button asChild variant="outline" className="flex-1">
              <Link href="/">
                <Home className="w-4 h-4 mr-2" />
                Home
              </Link>
            </Button>
          </div>
          
          <Button asChild className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold">
            <Link href="/promptly">
              Try Promptly
            </Link>
          </Button>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-xs text-gray-400">
            If this problem persists, please{' '}
            <Link href="/contact" className="text-purple-600 hover:underline">
              contact our support team
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}