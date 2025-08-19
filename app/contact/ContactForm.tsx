'use client';

import { useState } from 'react';
import { User, Mail, MessageSquare, Send, CheckCircle, AlertCircle } from 'lucide-react';

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });

      const result = await response.json();
      
      if (result.success) {
        setSuccess(true);
        setName('');
        setEmail('');
        setMessage('');
      } else {
        setError(result.error || 'Something went wrong. Please try again.');
      }
    } catch (err: any) {
      setError('Oops! Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Get in{" "}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Touch
            </span>
          </h1>
          <p className="text-lg text-gray-600 max-w-xl mx-auto">
            Have a question, suggestion, or just want to say hello? We'd love to hear from you.
          </p>
        </div>

        {/* Contact Form Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/60 p-8 md:p-12">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Name Field */}
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <User size={20} />
              </div>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white/60 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500"
                placeholder="Your name"
              />
              {name && (
                <label className="absolute left-12 -top-2 bg-white px-2 text-sm text-indigo-600 font-medium">
                  Name
                </label>
              )}
            </div>

            {/* Email Field */}
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <Mail size={20} />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white/60 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500"
                placeholder="Your email address"
              />
              {email && (
                <label className="absolute left-12 -top-2 bg-white px-2 text-sm text-indigo-600 font-medium">
                  Email
                </label>
              )}
            </div>

            {/* Message Field */}
            <div className="relative">
              <div className="absolute left-4 top-6 text-gray-400">
                <MessageSquare size={20} />
              </div>
              <textarea
                required
                rows={6}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white/60 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500 resize-none"
                placeholder="Your message"
              />
              {message && (
                <label className="absolute left-12 -top-2 bg-white px-2 text-sm text-indigo-600 font-medium">
                  Message
                </label>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 hover:from-blue-600 hover:via-indigo-600 hover:to-purple-600 disabled:from-gray-400 disabled:via-gray-500 disabled:to-gray-600 text-white font-semibold py-4 px-8 rounded-2xl shadow-lg transform hover:scale-[1.02] disabled:hover:scale-100 transition-all duration-200 flex items-center justify-center space-x-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <Send size={20} />
                  <span>Send Message</span>
                </>
              )}
            </button>

            {/* Success Message */}
            {success && (
              <div className="bg-green-50 border border-green-200 rounded-2xl p-4 flex items-center space-x-3">
                <CheckCircle className="text-green-600" size={24} />
                <div>
                  <h3 className="text-green-800 font-semibold">Message sent successfully!</h3>
                  <p className="text-green-700 text-sm">Thanks! We'll be in touch soon.</p>
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-2xl p-4 flex items-center space-x-3">
                <AlertCircle className="text-red-600" size={24} />
                <div>
                  <h3 className="text-red-800 font-semibold">Oops! Something went wrong</h3>
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              </div>
            )}
          </form>
        </div>

        {/* Alternative Contact */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">Or use the main Zaza Technologies contact page:</p>
          <a 
            href="https://zazatechnologies.com/contact" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 text-indigo-600 hover:text-indigo-700 font-medium transition-colors duration-200"
          >
            <span>Visit Main Contact Page</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}