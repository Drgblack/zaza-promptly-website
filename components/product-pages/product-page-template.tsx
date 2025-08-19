'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { TrustBadges } from '@/components/trust-badges';

interface Benefit {
  icon: LucideIcon;
  text: string;
  color: string;
}

interface ProductPageTemplateProps {
  title: string;
  tagline: string;
  problemTitle: string;
  problemText: string;
  solutionTitle: string;
  solutionText: string;
  benefitsTitle: string;
  benefits: Benefit[];
  testimonialQuote: string;
  testimonialAuthor: string;
  credibilityText: string;
  ctaTitle: string;
  ctaDescription: string;
  ctaButtonText: string;
  ctaProcessingText: string;
  ctaSecondaryText: string;
  backgroundColor: string;
  isDark?: boolean;
  productSource: string;
}

export function ProductPageTemplate({
  title,
  tagline,
  problemTitle,
  problemText,
  solutionTitle,
  solutionText,
  benefitsTitle,
  benefits,
  testimonialQuote,
  testimonialAuthor,
  credibilityText,
  ctaTitle,
  ctaDescription,
  ctaButtonText,
  ctaProcessingText,
  ctaSecondaryText,
  backgroundColor,
  isDark = false,
  productSource
}: ProductPageTemplateProps) {
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
          source: productSource,
          tags: [`${productSource}_interest`, 'early_access'],
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
            event_label: title,
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

  const textColor = isDark ? 'text-white' : 'text-gray-900';
  const secondaryTextColor = isDark ? 'text-gray-300' : 'text-gray-600';
  const cardBg = isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-white';
  const inputBg = isDark ? 'bg-slate-700 border-slate-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500';
  const ctaCardBg = isDark ? 'bg-slate-800/80 border-slate-600' : 'bg-white shadow-xl';

  return (
    <div className={`min-h-screen ${backgroundColor}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Back to Home Button */}
        <div className="mb-8">
          <Link 
            href="/" 
            className={`inline-flex items-center space-x-2 ${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-purple-600'} transition-colors duration-200`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back to Home</span>
          </Link>
        </div>

        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className={`text-5xl md:text-6xl font-bold ${textColor} mb-6`}>
            {title}
          </h1>
          <p className={`text-xl ${secondaryTextColor} max-w-3xl mx-auto mb-8`}>
            {tagline}
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Left Column - Content */}
          <div className="space-y-8">
            
            {/* Problem */}
            <Card className={`border-l-4 border-red-500 ${isDark ? 'bg-red-900/20 border-red-400/50' : 'bg-red-50'}`}>
              <CardContent className="p-6">
                <h2 className={`text-2xl font-bold ${textColor} mb-4`}>{problemTitle}</h2>
                <p className={`${secondaryTextColor} leading-relaxed`}>
                  {problemText}
                </p>
              </CardContent>
            </Card>

            {/* Solution */}
            <Card className={`border-l-4 border-green-500 ${isDark ? 'bg-green-900/20 border-green-400/50' : 'bg-green-50'}`}>
              <CardContent className="p-6">
                <h2 className={`text-2xl font-bold ${textColor} mb-4`}>{solutionTitle}</h2>
                <p className={`${secondaryTextColor} leading-relaxed`}>
                  {solutionText}
                </p>
              </CardContent>
            </Card>

            {/* Benefits */}
            <Card className={cardBg}>
              <CardContent className="p-6">
                <h2 className={`text-2xl font-bold ${textColor} mb-6`}>{benefitsTitle}</h2>
                <div className="space-y-4">
                  {benefits.map((benefit, index) => {
                    const IconComponent = benefit.icon;
                    return (
                      <div key={index} className="flex items-start space-x-3">
                        <IconComponent className={`w-6 h-6 ${benefit.color} flex-shrink-0 mt-1`} />
                        <div>
                          <p className={`font-semibold ${textColor}`}>{benefit.text}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Testimonial */}
            <Card className={`${isDark ? 'bg-gradient-to-r from-blue-900/50 to-indigo-900/50 border-blue-400/30' : 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200'}`}>
              <CardContent className="p-6">
                <blockquote className={`text-lg italic ${secondaryTextColor} mb-4`}>
                  "{testimonialQuote}"
                </blockquote>
                <cite className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>— {testimonialAuthor}</cite>
              </CardContent>
            </Card>

            {/* Credibility */}
            <Card className={`${isDark ? 'bg-gradient-to-r from-purple-900/50 to-pink-900/50 border-purple-400/30' : 'bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200'}`}>
              <CardContent className="p-6">
                <p className={`${secondaryTextColor} leading-relaxed`} dangerouslySetInnerHTML={{ __html: credibilityText }} />
              </CardContent>
            </Card>

            {/* Trust Badges */}
            <div className="mt-8">
              <TrustBadges layout="grid" showDescriptions={false} className={isDark ? "opacity-80" : ""} />
            </div>
          </div>

          {/* Right Column - CTA */}
          <div className="lg:sticky lg:top-8">
            <Card className={ctaCardBg}>
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <h3 className={`text-2xl font-bold ${textColor} mb-2`}>
                    {ctaTitle}
                  </h3>
                  <p className={secondaryTextColor}>
                    {ctaDescription}
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
                      className={`px-4 py-3 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:opacity-50 transition-colors duration-200 ${inputBg}`}
                    />
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Last Name"
                      required
                      disabled={isSubmitting}
                      className={`px-4 py-3 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:opacity-50 transition-colors duration-200 ${inputBg}`}
                    />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email Address"
                    required
                    disabled={isSubmitting}
                    className={`w-full px-4 py-3 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:opacity-50 transition-colors duration-200 ${inputBg}`}
                  />
                  <Button
                    type="submit"
                    disabled={isSubmitting || !firstName || !lastName || !email}
                    className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none transition-all duration-200"
                    size="lg"
                  >
                    {isSubmitting ? ctaProcessingText : ctaButtonText}
                  </Button>
                  {message && (
                    <p className={`text-sm text-center ${message.includes('Successfully') ? (isDark ? 'text-green-400' : 'text-green-600') : (isDark ? 'text-red-400' : 'text-red-600')}`}>
                      {message}
                    </p>
                  )}
                </form>

                <div className={`mt-6 pt-6 border-t ${isDark ? 'border-slate-600' : 'border-gray-200'}`}>
                  <div className={`flex items-center justify-center space-x-4 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    {ctaSecondaryText.split(' • ').map((text, index) => (
                      <span key={index}>{text}</span>
                    ))}
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