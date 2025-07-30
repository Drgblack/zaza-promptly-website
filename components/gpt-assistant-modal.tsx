'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { X, Send, Sparkles, Loader2 } from 'lucide-react'

interface Message {
  id: string
  type: 'user' | 'assistant'
  content: string
  timestamp: Date
}

interface GPTAssistantModalProps {
  isClicked: boolean
}

export default function GPTAssistantModal({ isClicked }: GPTAssistantModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: "Hi! I'm your AI teaching assistant. Ask me anything about Zaza Promptly or how AI can help with your classroom needs!",
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Auto-open when clicked for the first time
  useEffect(() => {
    if (isClicked && !isOpen) {
      setIsOpen(true)
    }
  }, [isClicked, isOpen])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      // Delay focus to ensure modal is fully rendered
      setTimeout(() => {
        inputRef.current?.focus()
      }, 100)
    }
  }, [isOpen])

  const quickReplies = [
    "How does Zaza Promptly work?",
    "What makes it different from ChatGPT?",
    "How much time can I save?",
    "Is there a free trial?"
  ]

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: content.trim(),
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    // Simulate AI response with more realistic delay
    setTimeout(() => {
      const responses: Record<string, string> = {
        'how does zaza promptly work': 'Zaza Promptly uses advanced AI to transform your simple student observations into professional, personalized feedback. Just describe what you\'ve noticed about a student, choose your tone, and get meaningful comments in seconds!',
        'what makes it different from chatgpt': 'Unlike generic AI tools, Zaza Promptly is specifically designed for teachers. It understands educational contexts, curriculum standards, and appropriate teacher language. Plus, it\'s optimized for quick feedback generation, not general conversation.',
        'how much time can i save': 'Teachers typically save 3-5 hours per week using Zaza Promptly! What used to take 15-20 minutes per comment now takes just 30 seconds. That\'s your weekend back!',
        'is there a free trial': 'Yes! We offer a 30-day money-back guarantee. Try Zaza Promptly risk-free and see how it transforms your feedback process. Most teachers see the value within the first week.',
        'default': 'That\'s a great question! Zaza Promptly is designed to help teachers save time while providing better feedback to students. Would you like to know more about our pricing, features, or see a demo?'
      }

      const key = content.toLowerCase()
      const responseContent = responses[key] || responses['default']

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: responseContent,
        timestamp: new Date()
      }

      setMessages(prev => [...prev, assistantMessage])
      setIsTyping(false)
    }, 1200 + Math.random() * 800) // Vary response time slightly
  }

  const handleQuickReply = (reply: string) => {
    handleSendMessage(reply)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage(inputValue)
    }
  }

  const handleClose = () => {
    setIsOpen(false)
  }

  if (!isOpen) return null

  return (
    <div 
      className="fixed bottom-6 right-6 z-50 w-80 h-96 bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 duration-300"
      role="dialog"
      aria-label="AI Teaching Assistant"
      aria-modal="true"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="text-white font-semibold text-sm">AI Teaching Assistant</h3>
            <p className="text-purple-100 text-xs">Always here to help</p>
          </div>
        </div>
        <Button
          onClick={handleClose}
          variant="ghost"
          size="sm"
          className="text-white hover:bg-white/20 w-8 h-8 p-0"
          aria-label="Close assistant"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3" role="log" aria-live="polite">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                message.type === 'user'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                  : 'bg-gray-100 text-gray-800'
              }`}
              role={message.type === 'assistant' ? 'status' : undefined}
            >
              {message.content}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-100 p-3 rounded-2xl text-sm flex items-center space-x-2">
              <Loader2 className="w-4 h-4 animate-spin text-gray-500" />
              <span className="text-gray-500">AI is typing...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Replies */}
      {messages.length === 1 && (
        <div className="px-4 pb-2">
          <p className="text-xs text-gray-500 mb-2">Quick questions:</p>
          <div className="flex flex-wrap gap-1">
            {quickReplies.slice(0, 2).map((reply, index) => (
              <Button
                key={index}
                onClick={() => handleQuickReply(reply)}
                variant="outline"
                size="sm"
                className="text-xs px-2 py-1 h-auto bg-white hover:bg-gray-50 border-gray-200"
              >
                {reply}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-2">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me anything..."
            className="flex-1 p-2 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 text-sm"
            disabled={isTyping}
            aria-label="Type your message"
          />
          <Button
            onClick={() => handleSendMessage(inputValue)}
            disabled={!inputValue.trim() || isTyping}
            size="sm"
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 w-8 h-8 p-0"
            aria-label="Send message"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}