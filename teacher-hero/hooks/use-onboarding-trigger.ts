"use client"

import { useEffect, useState, useCallback } from "react"

export function useOnboardingTrigger() {
  const [shouldShow, setShouldShow] = useState(false)
  const [cardInteractions, setCardInteractions] = useState(0)
  const [hasScrolledPast70, setHasScrolledPast70] = useState(false)

  // Check if user has already dismissed or signed up
  const checkUserChoice = useCallback(() => {
    if (typeof window !== "undefined") {
      const dismissed = localStorage.getItem("zaza-onboarding-dismissed")
      const clicked = localStorage.getItem("zaza-onboarding-clicked")
      return dismissed === "true" || clicked === "true"
    }
    return false
  }, [])

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      const resourceGrid = document.getElementById("resources-grid")
      if (resourceGrid && !hasScrolledPast70) {
        const rect = resourceGrid.getBoundingClientRect()
        const gridHeight = resourceGrid.offsetHeight
        const scrolledPast70 = rect.top + gridHeight * 0.7 < window.innerHeight

        if (scrolledPast70) {
          setHasScrolledPast70(true)
        }
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [hasScrolledPast70])

  // Track card interactions
  const trackCardInteraction = useCallback(() => {
    if (!checkUserChoice()) {
      setCardInteractions((prev) => prev + 1)
    }
  }, [checkUserChoice])

  // Determine if onboarding should show
  useEffect(() => {
    if (!checkUserChoice() && (hasScrolledPast70 || cardInteractions >= 2)) {
      // Add a small delay for better UX
      const timer = setTimeout(() => {
        setShouldShow(true)
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [hasScrolledPast70, cardInteractions, checkUserChoice])

  const dismissOnboarding = useCallback(() => {
    setShouldShow(false)
  }, [])

  const handleSignUp = useCallback(() => {
    setShouldShow(false)
    // Redirect to signup page or open signup modal
    console.log("Redirecting to signup...")
  }, [])

  return {
    shouldShow,
    trackCardInteraction,
    dismissOnboarding,
    handleSignUp,
  }
}
