import { Metadata } from 'next'
import Link from 'next/link'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Start Your Free Trial | Promptly - AI Comments for Teachers',
  description: 'Get started with 5 free AI-enhanced comments. No credit card required. Join 12,000+ teachers using hallucination-safe AI.',
  keywords: ['teacher AI trial', 'free AI comments', 'teacher signup', 'AI report writing'],
}

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-slate-900">
      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            
            {/* Progress Indicator */}
            <div className="flex items-center justify-center mb-8">
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">1</div>
                  <span className="ml-2 text-blue-400 font-medium">Sign Up</span>
                </div>
                <div className="w-8 h-0.5 bg-slate-600"></div>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center text-slate-400 text-sm font-bold">2</div>
                  <span className="ml-2 text-slate-400">First Comment</span>
                </div>
                <div className="w-8 h-0.5 bg-slate-600"></div>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center text-slate-400 text-sm font-bold">3</div>
                  <span className="ml-2 text-slate-400">Start Teaching</span>
                </div>
              </div>
            </div>

            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Start Your Free Trial
              </h1>
              <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
                Get 5 free AI-enhanced comments. No credit card required. Join 12,000+ teachers using hallucination-safe AI.
              </p>
              
              {/* Social Proof */}
              <div className="flex items-center justify-center gap-6 mb-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">12,000+</div>
                  <div className="text-xs text-slate-400">Teachers joined</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">4.9/5</div>
                  <div className="text-xs text-slate-400">Teacher rating</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400">8 hrs</div>
                  <div className="text-xs text-slate-400">Saved per week</div>
                </div>
              </div>
            </div>

            {/* Signup Form */}
            <div className="max-w-md mx-auto">
              <div className="bg-slate-800/60 rounded-2xl p-8 border border-slate-700">
                <form className="space-y-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-white mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      required
                      className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Sarah"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="sarah@school.edu"
                    />
                  </div>

                  <div>
                    <label htmlFor="teachingLevel" className="block text-sm font-medium text-white mb-2">
                      I teach...
                    </label>
                    <select
                      id="teachingLevel"
                      name="teachingLevel"
                      required
                      className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select your level</option>
                      <option value="primary">Primary/Elementary (Ages 5-11)</option>
                      <option value="secondary">Secondary/High School (Ages 11-18)</option>
                      <option value="international">International School</option>
                      <option value="special">Special Education</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-white mb-2">
                      Create Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      required
                      minLength={8}
                      className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="At least 8 characters"
                    />
                  </div>

                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      id="terms"
                      name="terms"
                      required
                      className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-600 rounded bg-slate-700"
                    />
                    <label htmlFor="terms" className="ml-3 text-sm text-slate-300">
                      I agree to the{' '}
                      <Link href="/terms" className="text-blue-400 hover:text-blue-300 underline">
                        Terms of Service
                      </Link>{' '}
                      and{' '}
                      <Link href="/privacy" className="text-blue-400 hover:text-blue-300 underline">
                        Privacy Policy
                      </Link>
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-300 text-lg"
                  >
                    Start My Free Trial
                  </button>
                </form>

                {/* Trust Signals */}
                <div className="mt-6 pt-6 border-t border-slate-700">
                  <div className="flex items-center justify-center text-sm text-slate-400">
                    <svg className="w-4 h-4 text-green-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    No credit card required • GDPR compliant • Cancel anytime
                  </div>
                </div>
              </div>

              {/* Already have account */}
              <div className="text-center mt-6">
                <p className="text-slate-400">
                  Already have an account?{' '}
                  <Link href="/login" className="text-blue-400 hover:text-blue-300 font-medium">
                    Sign in here
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What Happens Next */}
      <section className="py-16 bg-slate-800/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-white text-center mb-12">
              What happens after you sign up?
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">1. Email Verification</h3>
                <p className="text-slate-400 text-sm">Check your inbox and verify your email to activate your account</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">2. First Comment</h3>
                <p className="text-slate-400 text-sm">We'll guide you through writing your first AI-enhanced comment</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">3. Start Saving Time</h3>
                <p className="text-slate-400 text-sm">Use your 5 free comments to experience the time savings</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-white text-center mb-8">
              Quick questions
            </h2>
            
            <div className="space-y-6">
              <div className="bg-slate-800/50 rounded-lg p-6">
                <h3 className="text-white font-medium mb-2">Is it really free?</h3>
                <p className="text-slate-400 text-sm">Yes! You get 5 AI-enhanced comments completely free. No credit card required. Perfect for trying Promptly risk-free.</p>
              </div>
              
              <div className="bg-slate-800/50 rounded-lg p-6">
                <h3 className="text-white font-medium mb-2">How is this different from ChatGPT?</h3>
                <p className="text-slate-400 text-sm">Promptly is specifically designed for education with hallucination-safe AI, pedagogy expertise, and teacher-appropriate tone. ChatGPT is general-purpose and can generate inappropriate content for schools.</p>
              </div>
              
              <div className="bg-slate-800/50 rounded-lg p-6">
                <h3 className="text-white font-medium mb-2">Is my student data safe?</h3>
                <p className="text-slate-400 text-sm">Absolutely. We're GDPR compliant, never train on your data, and use enterprise-grade encryption. Your student information stays private.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}