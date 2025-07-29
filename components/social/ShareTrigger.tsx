'use client'

import { useEffect } from 'react'
import { PostSuccessShareModal, usePostSuccessShare } from './PostSuccessShareModal'

interface ShareTriggerProps {
  userEmail?: string
  userName?: string
  className?: string
}

export function ShareTrigger({ userEmail, userName, className = '' }: ShareTriggerProps) {
  const { showModal, setShowModal, modalProps, triggerShareModal } = usePostSuccessShare()

  // Expose trigger function globally for easy integration
  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).zazaShareTrigger = {
        onAICommentGenerated: (timeSaved = 10) => {
          triggerShareModal({
            successType: 'ai_comment',
            userEmail,
            userName,
            timeSaved
          })
        },
        onEmailGenerated: (timeSaved = 5) => {
          triggerShareModal({
            successType: 'email_generated',
            userEmail,
            userName,
            timeSaved
          })
        },
        onReportCompleted: (timeSaved = 60) => {
          triggerShareModal({
            successType: 'report_completed',
            userEmail,
            userName,
            timeSaved
          })
        },
        onTemplateUsed: (timeSaved = 3) => {
          triggerShareModal({
            successType: 'template_used',
            userEmail,
            userName,
            timeSaved
          })
        }
      }
    }

    return () => {
      if (typeof window !== 'undefined') {
        delete (window as any).zazaShareTrigger
      }
    }
  }, [userEmail, userName, triggerShareModal])

  return (
    <div className={className}>
      <PostSuccessShareModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        successType={modalProps.successType || 'ai_comment'}
        userEmail={modalProps.userEmail || userEmail}
        userName={modalProps.userName || userName}
        timeSaved={modalProps.timeSaved}
      />
    </div>
  )
}

// Utility functions for direct integration
export const shareUtils = {
  // Call this after successful AI comment generation
  onAICommentSuccess: (userEmail?: string, userName?: string, timeSaved = 10) => {
    if (typeof window !== 'undefined' && (window as any).zazaShareTrigger) {
      (window as any).zazaShareTrigger.onAICommentGenerated(timeSaved)
    }
  },

  // Call this after successful email generation
  onEmailSuccess: (userEmail?: string, userName?: string, timeSaved = 5) => {
    if (typeof window !== 'undefined' && (window as any).zazaShareTrigger) {
      (window as any).zazaShareTrigger.onEmailGenerated(timeSaved)
    }
  },

  // Call this after report completion
  onReportSuccess: (userEmail?: string, userName?: string, timeSaved = 60) => {
    if (typeof window !== 'undefined' && (window as any).zazaShareTrigger) {
      (window as any).zazaShareTrigger.onReportCompleted(timeSaved)
    }
  },

  // Call this after template usage
  onTemplateSuccess: (userEmail?: string, userName?: string, timeSaved = 3) => {
    if (typeof window !== 'undefined' && (window as any).zazaShareTrigger) {
      (window as any).zazaShareTrigger.onTemplateUsed(timeSaved)
    }
  }
}