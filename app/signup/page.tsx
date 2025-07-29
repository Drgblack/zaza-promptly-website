import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Sign Up - Zaza Promptly',
  description: 'Create your account to get started with Zaza Promptly.',
}

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign up for Zaza Promptly
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Join thousands of teachers who save time with AI-powered feedback generation
          </p>
        </div>
        <div className="bg-white shadow rounded-lg p-6">
          <p className="text-center text-gray-600 mb-4">
            Sign up functionality is coming soon!
          </p>
          <div className="text-center">
            <Link 
              href="/promptly-pricing" 
              className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              View Pricing Plans
            </Link>
          </div>
          <div className="mt-4 text-center">
            <Link 
              href="/" 
              className="text-indigo-600 hover:text-indigo-500"
            >
              Back to Homepage
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}