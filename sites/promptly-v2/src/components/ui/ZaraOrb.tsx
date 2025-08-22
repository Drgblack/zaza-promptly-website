'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/Button'

interface ZaraOrbProps {
  isInSnippetTool?: boolean
  onContextAction?: (action: string) => void
}

export default function ZaraOrb({ isInSnippetTool = false, onContextAction }: ZaraOrbProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [chatInput, setChatInput] = useState('')
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Array<{text: string, isUser: boolean}>>([])
  const [isLoading, setIsLoading] = useState(false)
  const orbRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  // Load preferences from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('zara-orb-preferences')
      if (saved) {
        const prefs = JSON.parse(saved)
        setIsMinimized(prefs.isMinimized || false)
      }
    } catch (error) {
      console.log('Failed to load Zara preferences:', error)
    }
  }, [])

  // Save preferences to localStorage
  const savePreferences = (newMinimized: boolean) => {
    try {
      localStorage.setItem('zara-orb-preferences', JSON.stringify({
        isMinimized: newMinimized,
        timestamp: Date.now()
      }))
    } catch (error) {
      console.log('Failed to save Zara preferences:', error)
    }
  }

  const quickChips = [
    'Explain my improved comment',
    'Suggest tone changes',
    'Translate for parents',
    'Keep confidential data safe'
  ]

  const contextButtons = isInSnippetTool ? [
    'Why these edits?',
    'Softer tone',
    'Shorter'
  ] : []

  const handleOrbClick = () => {
    setIsOpen(!isOpen)
    if (isMinimized) {
      setIsMinimized(false)
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape' && isOpen) {
      setIsOpen(false)
      orbRef.current?.focus()
    }
  }

  const handleQuickChip = (chip: string) => {
    sendMessage(chip)
  }

  const handleContextAction = (action: string) => {
    if (onContextAction) {
      onContextAction(action)
    }
  }

  const handleMinimize = () => {
    setIsMinimized(true)
    savePreferences(true)
  }

  const sendMessage = async (message: string) => {
    if (!message.trim()) return

    setIsLoading(true)
    const userMessage = { text: message, isUser: true }
    setMessages(prev => [...prev, userMessage])
    setChatInput('')

    try {
      const response = await fetch('/api/zara', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: message,
          context: isInSnippetTool ? 'snippet-tool' : 'general',
          userRole: 'teacher'
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to get response')
      }

      const data = await response.json()
      const assistantMessage = { text: data.response, isUser: false }
      setMessages(prev => [...prev, assistantMessage])

      if (data.warnings?.length > 0) {
        const warningMessage = { 
          text: `⚠️ ${data.warnings[0]}`, 
          isUser: false 
        }
        setMessages(prev => [...prev, warningMessage])
      }

    } catch (error) {
      console.error('Error sending message:', error)
      const errorMessage = { 
        text: 'Sorry, I\'m having trouble responding right now. Please try again.', 
        isUser: false 
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (isOpen && panelRef.current) {
      panelRef.current.focus()
    }
  }, [isOpen])

  return (
    <>
      {/* Floating Orb */}
      <button
        ref={orbRef}
        onClick={handleOrbClick}
        className={`fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-50 flex items-center justify-center group ${
          isMinimized ? 'animate-bounce' : ''
        }`}
        aria-label="Open Zara assistant"
        aria-expanded={isOpen}
        aria-controls="zara-panel"
      >
        <svg 
          className="w-6 h-6 text-white group-hover:scale-110 transition-transform" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
          />
        </svg>
        <span className="absolute -top-2 -right-2 w-4 h-4 bg-green-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
      </button>

      {/* Side Panel Drawer */}
      {isOpen && !isMinimized && (
        <div 
          className="fixed inset-0 z-40 overflow-hidden"
          onKeyDown={handleKeyDown}
        >
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          ></div>
          
          {/* Panel */}
          <div 
            ref={panelRef}
            id="zara-panel"
            className="absolute right-0 top-0 h-full w-full max-w-md bg-slate-900 shadow-2xl border-l border-slate-700 flex flex-col"
            role="dialog"
            aria-labelledby="zara-title"
            tabIndex={-1}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-slate-700">
              <h2 id="zara-title" className="text-lg font-semibold text-white flex items-center">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                Zara Assistant
              </h2>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleMinimize}
                  className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                  aria-label="Minimize assistant"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                  </svg>
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                  aria-label="Close assistant"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 p-4 space-y-4 overflow-y-auto">
              {/* Chat Messages */}
              {messages.length > 0 ? (
                <div className="space-y-3 mb-4">
                  {messages.map((message, index) => (
                    <div 
                      key={index}
                      className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                    >
                      <div 
                        className={`max-w-[80%] px-3 py-2 rounded-lg text-sm ${
                          message.isUser 
                            ? 'bg-purple-600 text-white' 
                            : message.text.startsWith('⚠️')
                            ? 'bg-yellow-900/30 text-yellow-300 border border-yellow-500/30'
                            : 'bg-slate-800 text-slate-300'
                        }`}
                      >
                        {message.text}
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-slate-800 text-slate-300 px-3 py-2 rounded-lg text-sm">
                        <div className="flex items-center">
                          <div className="animate-pulse">Thinking...</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-slate-300 text-sm">
                  <p className="mb-3">How can I help you today?</p>
                </div>
              )}

              {/* Quick Action Chips */}
              <div className="space-y-2">
                <h3 className="text-xs font-medium text-slate-400 uppercase tracking-wide">Quick Actions</h3>
                <div className="flex flex-wrap gap-2">
                  {quickChips.map((chip) => (
                    <button
                      key={chip}
                      onClick={() => handleQuickChip(chip)}
                      className="px-3 py-2 text-sm bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg border border-slate-600 hover:border-slate-500 transition-colors"
                    >
                      {chip}
                    </button>
                  ))}
                </div>
              </div>

              {/* Context Buttons (when in Snippet Tool) */}
              {contextButtons.length > 0 && (
                <div className="space-y-2">
                  <h3 className="text-xs font-medium text-slate-400 uppercase tracking-wide">Context Actions</h3>
                  <div className="flex flex-wrap gap-2">
                    {contextButtons.map((action) => (
                      <Button
                        key={action}
                        variant="outline"
                        size="sm"
                        onClick={() => handleContextAction(action)}
                        className="text-sm"
                      >
                        {action}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Chat Input */}
            <div className="p-4 border-t border-slate-700">
              <div className="space-y-3">
                <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-3">
                  <p className="text-yellow-300 text-xs">
                    ⚠️ Keep conversations general. Avoid sharing student names, personal details, or confidential information.
                  </p>
                </div>
                
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Ask me anything..."
                    className="flex-1 px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && chatInput.trim() && !isLoading) {
                        sendMessage(chatInput)
                      }
                    }}
                    disabled={isLoading}
                  />
                  <Button
                    size="sm"
                    disabled={!chatInput.trim() || isLoading}
                    onClick={() => sendMessage(chatInput)}
                    className="px-3"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}