'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

export default function LoadingIndicator() {
  const [isLoading, setIsLoading] = useState(false)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    
    // Show loading indicator when route changes
    setIsLoading(true)
    
    // Hide loading indicator after a short delay to allow page to render
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 800)

    return () => clearTimeout(timer)
  }, [pathname, mounted])

  if (!mounted || !isLoading) return null

  return (
    <div 
      className="fixed top-0 left-0 right-0 z-50 h-1 bg-blue-600/20"
      role="progressbar" 
      aria-label="Page loading"
    >
      <div 
        className="h-full bg-blue-600 transition-all duration-800 ease-out"
        style={{
          width: '100%',
          animation: 'loading-progress 0.8s ease-out forwards'
        }}
      />
      <style jsx>{`
        @keyframes loading-progress {
          0% { width: 0%; }
          50% { width: 70%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  )
}