'use client'

import { useState, useEffect } from 'react'
import { MessageCircle, Send, Heart, Coffee, Sparkles, User, Clock, CheckCircle, AlertCircle, HelpCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface SupportTicket {
  id: string
  name: string
  email: string
  category: string
  priority: 'low' | 'medium' | 'high'
  subject: string
  message: string
  timestamp: Date
  status: 'pending' | 'responded' | 'resolved'
}

interface SupportFormProps {
  isOpen: boolean
  onClose: () => void
  userEmail?: string
  userName?: string
  context?: {
    page?: string
    feature?: string
    error?: string
  }
  className?: string
}

export function SupportForm({ 
  isOpen, 
  onClose, 
  userEmail, 
  userName,
  context,
  className = '' 
}: SupportFormProps) {
  const [step, setStep] = useState<'initial' | 'form' | 'success'>('initial')
  const [formData, setFormData] = useState({
    name: userName || '',
    email: userEmail || '',
    category: '',
    priority: 'medium' as 'low' | 'medium' | 'high',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Pre-fill context if provided
  useEffect(() => {
    if (context && isOpen) {
      let contextMessage = ''
      if (context.page) contextMessage += `Page: ${context.page}\n`
      if (context.feature) contextMessage += `Feature: ${context.feature}\n`
      if (context.error) contextMessage += `Error: ${context.error}\n`
      
      if (contextMessage) {
        setFormData(prev => ({
          ...prev,
          message: `${contextMessage}\n\nDescription:\n`
        }))
      }
    }
  }, [context, isOpen])

  const categories = [
    { value: 'technical', label: 'Technical Issue', emoji: '🔧' },
    { value: 'account', label: 'Account Help', emoji: '👤' },
    { value: 'billing', label: 'Billing Question', emoji: '💳' },
    { value: 'feature', label: 'Feature Request', emoji: '💡' },
    { value: 'feedback', label: 'General Feedback', emoji: '💭' },
    { value: 'other', label: 'Other', emoji: '❓' }
  ]

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Create support ticket
    const ticket: SupportTicket = {
      id: `ticket_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`,
      ...formData,
      timestamp: new Date(),
      status: 'pending'
    }

    try {
      // In a real app, send to support system (Brevo, Zendesk, etc.)
      await simulateSupportSubmission(ticket)
      
      // Track support request
      if (typeof window !== 'undefined' && (window as any).zazeAnalytics) {
        (window as any).zazeAnalytics.trackSupportRequest({
          category: formData.category,
          priority: formData.priority,
          hasContext: !!context
        })
      }

      setStep('success')
    } catch (error) {
      console.error('Support submission failed:', error)
      // Show error state
    } finally {
      setIsSubmitting(false)
    }
  }

  const simulateSupportSubmission = async (ticket: SupportTicket) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Store locally for demo
    const existingTickets = JSON.parse(localStorage.getItem('zaza_support_tickets') || '[]')
    existingTickets.push(ticket)
    localStorage.setItem('zaza_support_tickets', JSON.stringify(existingTickets))
  }

  if (!isOpen) return null

  return (
    <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 ${className}`}>
      <Card className="w-full max-w-lg bg-white dark:bg-gray-800 shadow-2xl">
        {step === 'initial' && (
          <>
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                Hi, I'm Zara! 👋
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Need a hand? I'm here to help make your teaching journey smoother!
              </p>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <Button
                  onClick={() => setStep('form')}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 h-auto flex-col space-y-2"
                >
                  <MessageCircle className="w-6 h-6" />
                  <span className="text-sm">Get Help</span>
                </Button>
                
                <Button
                  variant="outline"
                  onClick={onClose}
                  className="p-4 h-auto flex-col space-y-2"
                >
                  <Coffee className="w-6 h-6" />
                  <span className="text-sm">Maybe Later</span>
                </Button>
              </div>
              
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg p-4 border border-purple-200 dark:border-purple-700">
                <div className="flex items-start space-x-3">
                  <Heart className="w-5 h-5 text-pink-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-1">
                      Here for You
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Teaching is tough work, and you shouldn't have to navigate tech challenges alone. 
                      I typically respond within a few hours! ⏰
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </>
        )}

        {step === 'form' && (
          <>
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                    How Can I Help?
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Tell me what's on your mind
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="ml-auto text-gray-400 hover:text-gray-600 text-xl"
                >
                  ×
                </button>
              </div>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Your Name
                    </label>
                    <Input
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Ms. Smith"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Email
                    </label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="teacher@school.edu"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      What's This About?
                    </label>
                    <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat.value} value={cat.value}>
                            <span className="flex items-center space-x-2">
                              <span>{cat.emoji}</span>
                              <span>{cat.label}</span>
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      How Urgent?
                    </label>
                    <Select value={formData.priority} onValueChange={(value) => handleInputChange('priority', value as 'low' | 'medium' | 'high')}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">🟢 Low - Can Wait</SelectItem>
                        <SelectItem value="medium">🟡 Medium - Soon Please</SelectItem>
                        <SelectItem value="high">🔴 High - Need Help Now</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Quick Summary
                  </label>
                  <Input
                    value={formData.subject}
                    onChange={(e) => handleInputChange('subject', e.target.value)}
                    placeholder="Briefly describe your question or issue"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Tell Me More
                  </label>
                  <Textarea
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    placeholder="The more details you share, the better I can help! Include what you were trying to do, what happened, and any error messages..."
                    rows={4}
                    required
                  />
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 border border-blue-200 dark:border-blue-700">
                  <div className="flex items-start space-x-2">
                    <Clock className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      <strong>Response Time:</strong> I typically respond within 2-4 hours during school hours, 
                      or by the next morning for evening messages. You're not alone in this! 💙
                    </p>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep('initial')}
                    className="flex-1"
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center space-x-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                        <span>Sending...</span>
                      </div>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </>
        )}

        {step === 'success' && (
          <>
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                Message Received! 📨
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Thanks for reaching out! I'll get back to you soon.
              </p>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg p-4 border border-green-200 dark:border-green-700">
                <div className="flex items-start space-x-3">
                  <Sparkles className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-green-900 dark:text-green-100 mb-2">
                      What Happens Next?
                    </h3>
                    <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
                      <li>• I'll review your message personally</li>
                      <li>• You'll get a response within a few hours</li>
                      <li>• We'll work together to solve this</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  In the meantime, keep being the amazing teacher you are! ⭐
                </p>
                
                <Button
                  onClick={onClose}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                >
                  <Heart className="w-4 h-4 mr-2" />
                  Back to Teaching
                </Button>
              </div>
            </CardContent>
          </>
        )}
      </Card>
    </div>
  )
}

// Floating help button that triggers support
interface FloatingHelpButtonProps {
  userEmail?: string
  userName?: string
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'
  className?: string
}

export function FloatingHelpButton({ 
  userEmail, 
  userName,
  position = 'bottom-right',
  className = '' 
}: FloatingHelpButtonProps) {
  const [showSupport, setShowSupport] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const positions = {
    'bottom-right': 'bottom-6 right-6',
    'bottom-left': 'bottom-6 left-6',
    'top-right': 'top-6 right-6',
    'top-left': 'top-6 left-6'
  }

  return (
    <>
      <div className={`fixed ${positions[position]} z-40 ${className}`}>
        <div className="relative">
          {/* Help tooltip */}
          {isHovered && (
            <div className="absolute bottom-full right-0 mb-2 animate-in fade-in slide-in-from-bottom-2 duration-200">
              <div className="bg-gray-800 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap shadow-lg">
                Need help? I'm here! 💙
                <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-t-gray-800" />
              </div>
            </div>
          )}
          
          <button
            onClick={() => setShowSupport(true)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="w-14 h-14 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full shadow-lg shadow-purple-500/30 flex items-center justify-center text-white hover:scale-110 hover:shadow-xl hover:shadow-purple-500/40 transition-all duration-300"
          >
            <MessageCircle className="w-6 h-6" />
          </button>
        </div>
      </div>

      <SupportForm
        isOpen={showSupport}
        onClose={() => setShowSupport(false)}
        userEmail={userEmail}
        userName={userName}
      />
    </>
  )
}

// Support integration for footer
interface FooterSupportProps {
  userEmail?: string
  userName?: string
  className?: string
}

export function FooterSupport({ userEmail, userName, className = '' }: FooterSupportProps) {
  const [showSupport, setShowSupport] = useState(false)

  return (
    <div className={className}>
      <button
        onClick={() => setShowSupport(true)}
        className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
      >
        <HelpCircle className="w-4 h-4" />
        <span className="text-sm">Need Help?</span>
      </button>

      <SupportForm
        isOpen={showSupport}
        onClose={() => setShowSupport(false)}
        userEmail={userEmail}
        userName={userName}
      />
    </div>
  )
}

// Hook for programmatic support triggering
export function useSupportEscalation() {
  const [showSupport, setShowSupport] = useState(false)
  const [supportContext, setSupportContext] = useState<{
    page?: string
    feature?: string
    error?: string
  }>({})

  const openSupport = (context?: typeof supportContext) => {
    if (context) setSupportContext(context)
    setShowSupport(true)
  }

  const closeSupport = () => {
    setShowSupport(false)
    setSupportContext({})
  }

  return {
    showSupport,
    supportContext,
    openSupport,
    closeSupport,
    SupportModal: ({ userEmail, userName }: { userEmail?: string; userName?: string }) => (
      <SupportForm
        isOpen={showSupport}
        onClose={closeSupport}
        userEmail={userEmail}
        userName={userName}
        context={supportContext}
      />
    )
  }
}

// Utility functions for error-triggered support
export const supportTriggers = {
  // Trigger support with error context
  onError: (error: string, feature?: string, page?: string) => {
    if (typeof window !== 'undefined' && (window as any).zazaSupportTrigger) {
      (window as any).zazaSupportTrigger.openSupport({
        error,
        feature,
        page: page || window.location.pathname
      })
    }
  },

  // Trigger support with feature context
  onFeatureHelp: (feature: string, page?: string) => {
    if (typeof window !== 'undefined' && (window as any).zazaSupportTrigger) {
      (window as any).zazaSupportTrigger.openSupport({
        feature,
        page: page || window.location.pathname
      })
    }
  },

  // Trigger general support
  openGeneral: () => {
    if (typeof window !== 'undefined' && (window as any).zazaSupportTrigger) {
      (window as any).zazaSupportTrigger.openSupport()
    }
  }
}