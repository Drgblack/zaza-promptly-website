'use client'

import { useState, useEffect } from 'react'

export default function MotionSettingsButton() {
  const [isReduced, setIsReduced] = useState(false)
  const [showFeedback, setShowFeedback] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const motionPref = localStorage.getItem('motion')
      setIsReduced(motionPref === 'reduced')
    }
  }, [])

  const handleToggle = () => {
    if (typeof window !== 'undefined') {
      const newValue = !isReduced
      if (newValue) {
        localStorage.setItem('motion', 'reduced')
        setShowFeedback(true)
        setTimeout(() => setShowFeedback(false), 2000)
      } else {
        localStorage.removeItem('motion')
      }
      setIsReduced(newValue)
      
      // Dispatch custom event to notify MotionProvider
      window.dispatchEvent(new CustomEvent('motionPreferenceChange', {
        detail: { reduced: newValue }
      }))
    }
  }

  return (
    <div className="relative">
      <button
        onClick={handleToggle}
        className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-left flex items-center gap-2"
      >
        <span className={`w-10 h-6 rounded-full transition-colors ${
          isReduced ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
        }`}>
          <span className={`block w-4 h-4 mt-1 ml-1 rounded-full bg-white transition-transform ${
            isReduced ? 'translate-x-4' : 'translate-x-0'
          }`} />
        </span>
        Reduce Motion
      </button>
      
      {showFeedback && (
        <div className="absolute left-0 top-8 bg-blue-600 text-white text-xs px-2 py-1 rounded shadow-lg whitespace-nowrap">
          Animations simplified.
        </div>
      )}
    </div>
  )
}
