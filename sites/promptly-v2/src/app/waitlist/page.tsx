import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Join the Waitlist | Promptly - AI Comments for Teachers',
  description: 'Be the first to access Promptly when it launches. Join thousands of educators already on our waitlist.',
}

export default function WaitlistPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center py-12">
      <div className="max-w-md w-full mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Join the Waitlist
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Be the first to know when Promptly launches. Join over 12,000 educators who are already signed up.
          </p>
          
          <form className="space-y-4">
            <div>
              <input 
                type="email" 
                placeholder="Enter your email address"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                required
              />
            </div>
            <div>
              <select className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white">
                <option value="">Select your role</option>
                <option value="teacher">Classroom Teacher</option>
                <option value="head-of-year">Head of Year</option>
                <option value="slt">Senior Leadership</option>
                <option value="senco">SENCO</option>
                <option value="tutor">Form Tutor</option>
                <option value="admin">School Admin</option>
                <option value="other">Other</option>
              </select>
            </div>
            <button 
              type="submit"
              className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors shadow-lg"
            >
              Join Waitlist
            </button>
          </form>

          <div className="mt-6 flex items-center justify-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center">
              <svg className="w-4 h-4 text-green-600 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Free trial
            </div>
            <div className="flex items-center">
              <svg className="w-4 h-4 text-green-600 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              No spam
            </div>
            <div className="flex items-center">
              <svg className="w-4 h-4 text-green-600 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              GDPR compliant
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}