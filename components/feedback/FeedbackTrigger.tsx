'use client'

import { useEffect } from 'react'
import { GamifiedFeedbackPrompt, useFeedbackPrompt } from './GamifiedFeedbackPrompt'

interface FeedbackTriggerProps {
  userEmail?: string
  userName?: string
  className?: string
}

export function FeedbackTrigger({ userEmail, userName, className = '' }: FeedbackTriggerProps) {
  const { showPrompt, setShowPrompt, promptProps, triggerFeedbackPrompt, handleFeedback } = useFeedbackPrompt()

  // Expose trigger function globally for easy integration
  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).zazaFeedbackTrigger = {
        triggerFeedbackPrompt: (props: { generatedContent?: string }) => {
          triggerFeedbackPrompt({
            userEmail,
            userName,
            ...props
          })
        }
      }
    }

    return () => {
      if (typeof window !== 'undefined') {
        delete (window as any).zazaFeedbackTrigger
      }
    }
  }, [userEmail, userName, triggerFeedbackPrompt])

  return (
    <div className={className}>
      <GamifiedFeedbackPrompt
        isOpen={showPrompt}
        onClose={() => setShowPrompt(false)}
        onFeedback={handleFeedback}
        userEmail={promptProps.userEmail || userEmail}
        userName={promptProps.userName || userName}
        generatedContent={promptProps.generatedContent}
      />
    </div>
  )
}

// Simple utility for triggering feedback
export const feedbackUtils = {
  // Call this after the first AI comment generation
  onFirstAIComment: (generatedContent?: string) => {
    if (typeof window !== 'undefined' && (window as any).zazaFeedbackTrigger) {
      (window as any).zazaFeedbackTrigger.triggerFeedbackPrompt({ generatedContent })
    }
  }
}