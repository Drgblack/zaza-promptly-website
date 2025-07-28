"use client"

import { useState, useCallback } from "react"
import type { UserInteraction } from "@/types/recommendations"

export function useRecommendations() {
  const [userInteractions, setUserInteractions] = useState<UserInteraction[]>([])

  const trackInteraction = useCallback((interaction: UserInteraction) => {
    setUserInteractions((prev) => {
      // Limit to last 50 interactions to prevent memory issues
      const updated = [...prev, interaction].slice(-50)

      // Store in localStorage for persistence
      if (typeof window !== "undefined") {
        localStorage.setItem("zaza-user-interactions", JSON.stringify(updated))
      }

      return updated
    })
  }, [])

  const loadStoredInteractions = useCallback(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("zaza-user-interactions")
      if (stored) {
        try {
          const interactions = JSON.parse(stored) as UserInteraction[]
          setUserInteractions(interactions)
        } catch (error) {
          console.error("Failed to load stored interactions:", error)
        }
      }
    }
  }, [])

  return {
    userInteractions,
    trackInteraction,
    loadStoredInteractions,
  }
}
