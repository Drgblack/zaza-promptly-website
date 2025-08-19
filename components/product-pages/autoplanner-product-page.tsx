'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Zap, Brain, Target, Users, Sparkles, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { TrustBadges } from '@/components/trust-badges';

export function AutoPlannerProductPage() {
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
          source: 'zaza_autoplanner_product_page',
          tags: ['autoplanner_interest', 'early_access'],
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
            event_label: 'Zaza AutoPlanner',
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Back to Home Button */}
        <div className="mb-8">
          <Link 
            href="/" 
            className="inline-flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back to Home</span>
          </Link>
        </div>

        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Zaza AutoPlanner
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            The future of teaching: AI that adapts to your classroom in real time.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Left Column - Content */}
          <div className="space-y-8">
            
            {/* Problem */}
            <Card className="border-l-4 border-red-500 bg-red-900/20 border-red-400/50">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-white mb-4">Teaching Is Getting More Complex</h2>
                <p className="text-gray-300 leading-relaxed">
                  Every student learns differently. Curriculum requirements keep changing. Resources are scattered. You're trying to personalise learning for 30+ students while managing behaviour, assessment, and admin. It's overwhelming.
                </p>
              </CardContent>
            </Card>

            {/* Solution */}
            <Card className="border-l-4 border-green-500 bg-green-900/20 border-green-400/50">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-white mb-4">Meet Your AI Teaching Partner</h2>
                <p className="text-gray-300 leading-relaxed">
                  Zaza AutoPlanner is our flagship multimodal AI agent that knows your classroom. It adapts lessons in real time, suggests interventions, and keeps everything aligned with curriculum standards — automatically.
                </p>
              </CardContent>
            </Card>

            {/* Benefits */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-white mb-6">What AutoPlanner Brings to Your Classroom:</h2>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Zap className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-white">Real-time adaptation to student needs and learning pace</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Target className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-white">Seamless curriculum alignment across all subjects and standards</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Brain className="w-6 h-6 text-purple-400 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-white">Intelligent resource suggestions based on your teaching context</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Users className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-white">Personalised learning pathways for every student</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Settings className="w-6 h-6 text-gray-400 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-white">Reduced cognitive load — let AI handle the complexity while you teach</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Sparkles className="w-6 h-6 text-indigo-400 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-white">Future-ready teaching with cutting-edge educational technology</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Testimonial */}
            <Card className="bg-gradient-to-r from-blue-900/50 to-indigo-900/50 border-blue-400/30">
              <CardContent className="p-6">
                <blockquote className="text-lg italic text-gray-300 mb-4">
                  "It's like having a master teacher whispering perfect suggestions in my ear all day. AutoPlanner helps me be the teacher I always wanted to be."
                </blockquote>
                <cite className="text-sm text-gray-400">— Marcus L., Secondary Science</cite>
              </CardContent>
            </Card>

            {/* Credibility */}
            <Card className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 border-purple-400/30">
              <CardContent className="p-6">
                <p className="text-gray-300 leading-relaxed">
                  <strong className="text-white">Developed by Dr. Greg Blackburn</strong>, combining a PhD in Professional Education with advanced AI to create truly intelligent teaching support.
                </p>
              </CardContent>
            </Card>

            {/* Trust Badges */}
            <div className="mt-8">
              <TrustBadges layout="grid" showDescriptions={false} className="opacity-80" />
            </div>
          </div>

          {/* Right Column - CTA */}
          <div className="lg:sticky lg:top-8">
            <Card className="shadow-2xl bg-slate-800/80 border-slate-600">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Be part of the teaching revolution.
                  </h3>
                  <p className="text-gray-300">
                    Join our exclusive early access program and help shape the future of education.
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
                      className="px-4 py-3 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-slate-700 text-white placeholder-gray-400 disabled:opacity-50 transition-colors duration-200"
                    />
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Last Name"
                      required
                      disabled={isSubmitting}
                      className="px-4 py-3 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-slate-700 text-white placeholder-gray-400 disabled:opacity-50 transition-colors duration-200"
                    />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email Address"
                    required
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-slate-700 text-white placeholder-gray-400 disabled:opacity-50 transition-colors duration-200"
                  />
                  <Button
                    type="submit"
                    disabled={isSubmitting || !firstName || !lastName || !email}
                    className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none transition-all duration-200"
                    size="lg"
                  >
                    {isSubmitting ? 'Joining Program...' : 'Join Early Access'}
                  </Button>
                  {message && (
                    <p className={`text-sm text-center ${message.includes('Successfully') ? 'text-green-400' : 'text-red-400'}`}>
                      {message}
                    </p>
                  )}
                </form>

                <div className="mt-6 pt-6 border-t border-slate-600">
                  <div className="flex items-center justify-center space-x-4 text-sm text-gray-400">
                    <span>🚀 Exclusive access</span>
                    <span>🔮 Shape the future</span>
                    <span>⚡ First to try</span>
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