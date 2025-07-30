'use client'

import { useState, useEffect, lazy, Suspense } from 'react'
import { MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

// Lazy load the actual GPT Assistant component
const GPTAssistantModal = lazy(() => import('./gpt-assistant-modal'))

interface LazyGPTAssistantProps {
  className?: string
}

export function LazyGPTAssistant({ className = '' }: LazyGPTAssistantProps) {
  const [shouldLoad, setShouldLoad] = useState(false)
  const [hasScrolled, setHasScrolled] = useState(false)
  const [isClicked, setIsClicked] = useState(false)

  // Track scroll to trigger lazy loading
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500 && !hasScrolled) {
        setHasScrolled(true)
        setShouldLoad(true)
      }
    }

    // Add scroll listener with passive option for performance
    window.addEventListener('scroll', handleScroll, { passive: true })
    
    // Also load after 3 seconds if user hasn't scrolled
    const timer = setTimeout(() => {
      if (!hasScrolled) {
        setShouldLoad(true)
      }
    }, 3000)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(timer)
    }
  }, [hasScrolled])

  const handleClick = () => {
    setIsClicked(true)
    if (!shouldLoad) {
      setShouldLoad(true)
    }
  }

  return (
    <div className={className}>
      {/* Always show the floating button for instant feedback */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={handleClick}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          title="Chat with AI Assistant"
          aria-label="Open AI Teaching Assistant"
        >
          <MessageCircle className="w-6 h-6 text-white" />
        </Button>
        
        {/* Pulse Animation - only show before first interaction */}
        {!isClicked && (
          <div 
            className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 animate-ping opacity-75"
            aria-hidden="true"
          />
        )}
      </div>

      {/* Lazy load the modal only when needed */}
      {shouldLoad && (
        <Suspense 
          fallback={
            <div className="fixed bottom-6 right-6 z-50 w-80 h-96 bg-white rounded-2xl shadow-2xl border border-gray-200 flex items-center justify-center">
              <div className="flex items-center space-x-2 text-gray-500">
                <div className="w-4 h-4 border-2 border-purple-600 border-t-transparent rounded-full animate-spin" />
                <span className="text-sm">Loading assistant...</span>
              </div>
            </div>
          }
        >
          <GPTAssistantModal isClicked={isClicked} />
        </Suspense>
      )}
    </div>
  )
}