'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Clock, Lightbulb, CheckCircle, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { TrustBadges } from '@/components/trust-badges';

export function TeachProductPage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !lastName || !email) return;

    setIsSubmitting(true);
    setMessage('');

    try {
      const response = await fetch('/api/brevo-subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          firstName,
          lastName,
          source: 'zaza_teach_product_page',
          tags: ['zaza_teach_interest', 'early_access'],
          listId: 1
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage('Successfully subscribed! Check your email.');
        setFirstName('');
        setLastName('');
        setEmail('');
        
        // Track successful subscription
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'product_interest', {
            event_category: 'engagement',
            event_label: 'Zaza Teach',
            value: 1
          });
        }
      } else {
        setMessage(result.error || 'Subscription failed. Please try again.');
      }
    } catch (error) {
      setMessage('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Back to Home Button */}
        <div className="mb-8">
          <Link 
            href="/" 
            className="inline-flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back to Home</span>
          </Link>
        </div>

        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Zaza Teach
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            AI-powered lesson planning that gets your Sunday nights back.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Left Column - Content */}
          <div className="space-y-8">
            
            {/* Problem */}
            <Card className="border-l-4 border-red-500 bg-red-50">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">The Problem You Know Too Well</h2>
                <p className="text-gray-700 leading-relaxed">
                  Hours spent on lesson plans. Staring at blank templates. Racing against deadlines while juggling everything else. Sound familiar?
                </p>
              </CardContent>
            </Card>

            {/* Solution */}
            <Card className="border-l-4 border-green-500 bg-green-50">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Solution Is Here</h2>
                <p className="text-gray-700 leading-relaxed">
                  Zaza Teach builds curriculum-aligned lesson plans in minutes, not hours. Just tell us your topic and year group, and get structured lessons with activities, assessments, and differentiation — all ready to adapt to your style.
                </p>
              </CardContent>
            </Card>

            {/* Benefits */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Why Teachers Love Zaza Teach:</h2>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Clock className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-gray-900">Save 3-5 hours per week on planning</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Lightbulb className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-gray-900">Boost creativity with fresh activity ideas you hadn't considered</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-gray-900">Maintain quality with curriculum-aligned, pedagogically sound lessons</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Users className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-gray-900">Stay flexible — every plan is fully editable and personalised</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-gray-900">Build confidence knowing your lessons have strong educational foundations</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Testimonial */}
            <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
              <CardContent className="p-6">
                <blockquote className="text-lg italic text-gray-700 mb-4">
                  "This gave me my Sunday evenings back. The lesson structures are solid, and I can focus on making them uniquely mine instead of starting from scratch every time."
                </blockquote>
                <cite className="text-sm text-gray-600">— Rachel T., Year 6 Teacher</cite>
              </CardContent>
            </Card>

            {/* Credibility */}
            <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
              <CardContent className="p-6">
                <p className="text-gray-700 leading-relaxed">
                  <strong>Built by Dr. Greg Blackburn</strong>, an educator with a PhD in Professional Education and 20+ years of teaching experience. Zaza Teach combines AI efficiency with genuine pedagogical expertise.
                </p>
              </CardContent>
            </Card>

            {/* Trust Badges */}
            <TrustBadges layout="grid" showDescriptions={false} className="mt-8" />
          </div>

          {/* Right Column - CTA */}
          <div className="lg:sticky lg:top-8">
            <Card className="shadow-xl">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Ready to transform your planning?
                  </h3>
                  <p className="text-gray-600">
                    Join the waitlist for early access and be among the first teachers to experience smarter lesson planning.
                  </p>
                </div>

                {/* Email Capture Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="First Name"
                      required
                      disabled={isSubmitting}
                      className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white text-gray-900 placeholder-gray-500 disabled:opacity-50 transition-colors duration-200"
                    />
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Last Name"
                      required
                      disabled={isSubmitting}
                      className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white text-gray-900 placeholder-gray-500 disabled:opacity-50 transition-colors duration-200"
                    />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email Address"
                    required
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white text-gray-900 placeholder-gray-500 disabled:opacity-50 transition-colors duration-200"
                  />
                  <Button
                    type="submit"
                    disabled={isSubmitting || !firstName || !lastName || !email}
                    className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none transition-all duration-200"
                    size="lg"
                  >
                    {isSubmitting ? 'Joining Waitlist...' : 'Join the Waitlist'}
                  </Button>
                  {message && (
                    <p className={`text-sm text-center ${message.includes('Successfully') ? 'text-green-600' : 'text-red-600'}`}>
                      {message}
                    </p>
                  )}
                </form>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
                    <span>🔒 Secure</span>
                    <span>📧 No spam</span>
                    <span>⚡ Early access</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}