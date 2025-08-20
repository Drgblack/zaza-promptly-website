'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronUp, ThumbsUp, ThumbsDown, Shield, CheckCircle2, Users, Clock, Zap, MessageCircle, BookOpen, Star, Mail } from 'lucide-react'
import { useAnalytics } from '@/hooks/useAnalytics'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { EmailCaptureForm } from '@/components/EmailCaptureForm'
import Link from 'next/link'

interface FAQ {
  id: string
  question: string
  answer: string
  icon: React.ComponentType<any>
  testimonial?: {
    quote: string
    author: string
    role: string
  }
  trustBadges?: string[]
  crossLinks?: {
    text: string
    href: string
  }[]
}

// Prioritized FAQs for teachers
const prioritizedFAQs: FAQ[] = [
  {
    id: 'data-safety',
    question: 'Is my student data safe with AI?',
    answer: 'Absolutely. Zaza Promptly meets the highest privacy standards with GDPR compliance, bank-level encryption, and EU-only data processing. Your student information NEVER trains other AI models or leaves secure servers. We provide data processing agreements for schools and maintain full audit trails for compliance officers.',
    icon: Shield,
    testimonial: {
      quote: "I was worried about data privacy, but Zaza's compliance documentation convinced our head teacher immediately.",
      author: "Rachel M.",
      role: "Year 4 Teacher"
    },
    trustBadges: ['GDPR Compliant', 'Bank-Level Security', 'EU Data Processing']
  },
  {
    id: 'student-misuse',
    question: 'Will students misuse this technology?',
    answer: 'Students cannot access Zaza Promptly - it\'s a teacher-only tool designed for professional communication and report writing. Unlike public AI tools, Promptly is specifically built for educator use with safeguards that prevent inappropriate content and ensure age-appropriate communication standards.',
    icon: Users,
    testimonial: {
      quote: "Finally, an AI tool I can use professionally without worrying about students accessing it.",
      author: "James K.",
      role: "Secondary Science Teacher"
    },
    trustBadges: ['Teacher-Only Access', 'Content Filtering', 'Age-Appropriate']
  },
  {
    id: 'vs-chatgpt',
    question: 'How is Zaza Promptly different from ChatGPT?',
    answer: 'ChatGPT is a general-purpose AI that can hallucinate false information about students. Zaza Promptly is specifically designed for education by Dr. Greg Blackburn (PhD in Professional Education) with built-in safeguards against hallucinations, GDPR compliance, and educational context understanding. It speaks your professional language from day one.',
    icon: Zap,
    testimonial: {
      quote: "I tried ChatGPT first - it was like using a hammer when I needed a scalpel. Zaza just gets teaching.",
      author: "Michael R.",
      role: "Primary Deputy Head"
    },
    trustBadges: ['Education-Specific', 'Hallucination-Safe', 'PhD Designed']
  },
  {
    id: 'time-savings',
    question: 'Does this actually save time or create more work?',
    answer: 'Teachers report saving 3-5 hours per week on report writing and parent communication. What used to take 15-20 minutes per comment now takes 2-3 minutes. This gives you time back for lesson planning, marking, or simply going home earlier.',
    icon: Clock,
    testimonial: {
      quote: "I've reclaimed my evenings. Report writing used to ruin my weekends - now it's done in half the time.",
      author: "Emma T.",
      role: "Year 6 Teacher"
    },
    trustBadges: ['3-5 Hours Saved Weekly', '12,000+ Teachers', 'Proven Results']
  },
  {
    id: 'sound-like-me',
    question: 'Will the comments sound like me?',
    answer: 'Yes. Promptly can match your tone, whether you\'re empathetic, direct, or positive-but-honest. You can tweak responses with one tap or write your own templates that the AI learns from. Every suggestion is fully editable - you\'re always in control.',
    icon: MessageCircle,
    testimonial: {
      quote: "Parents say my reports sound more 'like me' than ever. Zaza captures my voice perfectly.",
      author: "Lisa P.",
      role: "Reception Teacher"
    }
  }
]

export default function FAQSimple() {
  const { trackEvent } = useAnalytics()
  const [openItems, setOpenItems] = useState<string[]>([])
  const [feedback, setFeedback] = useState<Record<string, 'up' | 'down' | null>>({})

  const toggleItem = (id: string) => {
    setOpenItems(prev => {
      const isOpen = prev.includes(id)
      const newOpenItems = isOpen 
        ? prev.filter(item => item !== id)
        : [...prev, id]
      
      if (!isOpen) {
        trackEvent('faq_expanded', { question_id: id })
      }
      
      return newOpenItems
    })
  }

  const handleFeedback = (faqId: string, type: 'up' | 'down') => {
    setFeedback(prev => ({ ...prev, [faqId]: type }))
    trackEvent('faq_feedback', { 
      question_id: faqId, 
      feedback: type 
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="bg-gradient-to-br from-purple-600 via-indigo-700 to-blue-800 rounded-3xl p-12 md:p-16 relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Background decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-300/10 rounded-full translate-y-24 -translate-x-24" />
            
            <div className="relative z-10 text-center">
              <motion.div
                className="inline-flex items-center bg-white/10 rounded-full px-4 py-2 mb-6 backdrop-blur-sm"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.4 }}
              >
                <MessageCircle className="w-4 h-4 mr-2 text-purple-200" />
                <span className="text-sm font-medium text-white">Teacher Questions Answered</span>
              </motion.div>
              
              <motion.h1 
                className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                Frequently Asked{' '}
                <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                  Questions
                </span>
              </motion.h1>
              
              <motion.p 
                className="text-xl md:text-2xl text-purple-100 max-w-3xl mx-auto mb-10 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                Everything teachers need to know about AI safety, data privacy, and saving time with Zaza Promptly.
              </motion.p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            {prioritizedFAQs.map((faq, index) => (
              <motion.div
                key={faq.id}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <button
                  className="w-full p-6 text-left hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  onClick={() => toggleItem(faq.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="bg-gradient-to-br from-purple-500 to-indigo-600 p-2 rounded-lg">
                        <faq.icon className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 pr-4">
                        {faq.question}
                      </h3>
                    </div>
                    <ChevronUp
                      className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                        openItems.includes(faq.id) ? 'transform rotate-180' : ''
                      }`}
                    />
                  </div>
                </button>

                <AnimatePresence>
                  {openItems.includes(faq.id) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 border-t border-gray-100">
                        <div className="pt-4 space-y-4">
                          <p className="text-gray-700 leading-relaxed text-lg">
                            {faq.answer}
                          </p>

                          {/* Trust Badges */}
                          {faq.trustBadges && (
                            <div className="flex flex-wrap gap-2">
                              {faq.trustBadges.map((badge, idx) => (
                                <Badge 
                                  key={idx}
                                  className="bg-green-100 text-green-800 border-green-200"
                                >
                                  <CheckCircle2 className="w-3 h-3 mr-1" />
                                  {badge}
                                </Badge>
                              ))}
                            </div>
                          )}

                          {/* Testimonial */}
                          {faq.testimonial && (
                            <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-4 rounded-lg border-l-4 border-purple-500">
                              <blockquote className="text-gray-800 italic mb-2">
                                "{faq.testimonial.quote}"
                              </blockquote>
                              <cite className="text-sm text-gray-600">
                                — {faq.testimonial.author}, {faq.testimonial.role}
                              </cite>
                            </div>
                          )}

                          {/* Feedback */}
                          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                            <span className="text-sm text-gray-600">Did this answer your question?</span>
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleFeedback(faq.id, 'up')}
                                className={`p-2 rounded-lg transition-colors ${
                                  feedback[faq.id] === 'up' 
                                    ? 'bg-green-100 text-green-600' 
                                    : 'bg-gray-100 text-gray-500 hover:bg-green-100 hover:text-green-600'
                                }`}
                              >
                                <ThumbsUp className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleFeedback(faq.id, 'down')}
                                className={`p-2 rounded-lg transition-colors ${
                                  feedback[faq.id] === 'down' 
                                    ? 'bg-red-100 text-red-600' 
                                    : 'bg-gray-100 text-gray-500 hover:bg-red-100 hover:text-red-600'
                                }`}
                              >
                                <ThumbsDown className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Email Capture Banner */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="bg-gradient-to-r from-green-600 to-teal-700 rounded-3xl p-8 text-center relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16" />
            <div className="relative z-10">
              <Mail className="w-8 h-8 text-white mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-3">
                Want more time-saving resources for teachers?
              </h3>
              <p className="text-green-100 mb-6">
                Get free AI prompts, templates, and teaching guides delivered to your inbox.
              </p>
              <div className="max-w-md mx-auto">
                <EmailCaptureForm
                  title=""
                  subtitle=""
                  placeholder="Enter your email"
                  buttonText="Get Free Resources"
                  source="faq_inline"
                  variant="hero"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Sticky CTA Banner */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Zap className="w-6 h-6 text-yellow-300" />
              <span className="font-semibold text-lg">
                Want to save time and reduce stress?
              </span>
            </div>
            <Button 
              className="bg-white text-indigo-600 hover:bg-gray-100 font-bold shadow-lg"
              onClick={() => {
                trackEvent('faq_sticky_cta_clicked', { source: 'sticky_banner' })
                window.location.href = '/#demo-section'
              }}
            >
              Try Zaza Promptly Today →
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom padding to account for sticky banner */}
      <div className="pb-20" />
    </div>
  )
}