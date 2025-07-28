import type React from "react"
export interface SoftOnboardingProps {
  isVisible: boolean
  onDismiss: () => void
  onSignUp: () => void
  className?: string
}

export interface OnboardingTriggerProps {
  children: React.ReactNode
  onTrigger: () => void
}
