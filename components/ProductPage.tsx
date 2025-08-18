'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

interface ProductPageProps {
  title: string;
  description: string;
  locale?: string;
}

export default function ProductPage({ title, description, locale = 'en' }: ProductPageProps) {
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
          source: `product_page_${title.toLowerCase().replace(/\s+/g, '_')}`,
          tags: ['product_interest', 'early_access'],
          listId: 1
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage(locale === 'de' ? 'Erfolgreich angemeldet! Prüfen Sie Ihre E-Mail.' : 'Successfully subscribed! Check your email.');
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
        setMessage(result.error || (locale === 'de' ? 'Anmeldung fehlgeschlagen. Bitte versuchen Sie es erneut.' : 'Subscription failed. Please try again.'));
      }
    } catch (error) {
      setMessage(locale === 'de' ? 'Netzwerkfehler. Bitte versuchen Sie es erneut.' : 'Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const backText = locale === 'de' ? 'Zurück zur Startseite' : 'Back to Home';
  const firstNamePlaceholder = locale === 'de' ? 'Vorname' : 'First Name';
  const lastNamePlaceholder = locale === 'de' ? 'Nachname' : 'Last Name';
  const emailPlaceholder = locale === 'de' ? 'E-Mail-Adresse' : 'Email Address';
  const submitText = locale === 'de' ? 'Benachrichtigen Sie mich' : 'Notify Me';
  const submittingText = locale === 'de' ? 'Wird gesendet...' : 'Submitting...';

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Back to Home Button */}
        <div className="mb-8">
          <Link 
            href="/" 
            className="inline-flex items-center space-x-2 text-gray-600 hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400 transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">{backText}</span>
          </Link>
        </div>

        {/* Main Content */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              {title}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              {description}
            </p>
          </div>

          {/* Email Capture Form */}
          <div className="max-w-md mx-auto">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder={firstNamePlaceholder}
                  required
                  disabled={isSubmitting}
                  className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 disabled:opacity-50 transition-colors duration-200"
                />
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder={lastNamePlaceholder}
                  required
                  disabled={isSubmitting}
                  className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 disabled:opacity-50 transition-colors duration-200"
                />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={emailPlaceholder}
                required
                disabled={isSubmitting}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 disabled:opacity-50 transition-colors duration-200"
              />
              <button
                type="submit"
                disabled={isSubmitting || !firstName || !lastName || !email}
                className="w-full py-3 px-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none disabled:hover:scale-100 transition-all duration-200"
              >
                {isSubmitting ? submittingText : submitText}
              </button>
              {message && (
                <p className={`text-sm text-center ${message.includes('Successfully') || message.includes('Erfolgreich') ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                  {message}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}