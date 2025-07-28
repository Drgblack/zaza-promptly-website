"use client"

import { useState, useEffect } from "react"
import { analytics } from "@/utils/analytics"

interface ABTestConfig {
  testName: string
  variants: string[]
  weights?: number[]
}

export function useABTest(config: ABTestConfig) {
  const [variant, setVariant] = useState<string>("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const getVariant = () => {
      // Check if user already has a variant assigned
      const storageKey = `ab_test_${config.testName}`
      const existingVariant = localStorage.getItem(storageKey)

      if (existingVariant && config.variants.includes(existingVariant)) {
        return existingVariant
      }

      // Assign new variant based on weights
      const weights = config.weights || config.variants.map(() => 1)
      const totalWeight = weights.reduce((sum, weight) => sum + weight, 0)
      const random = Math.random() * totalWeight

      let cumulativeWeight = 0
      for (let i = 0; i < config.variants.length; i++) {
        cumulativeWeight += weights[i]
        if (random <= cumulativeWeight) {
          const selectedVariant = config.variants[i]
          localStorage.setItem(storageKey, selectedVariant)
          return selectedVariant
        }
      }

      return config.variants[0]
    }

    const selectedVariant = getVariant()
    setVariant(selectedVariant)
    setIsLoading(false)

    // Track the variant assignment
    analytics.trackABTest(config.testName, selectedVariant)
  }, [config])

  const trackOutcome = (outcome: string) => {
    analytics.trackABTest(config.testName, variant, outcome)
  }

  return { variant, isLoading, trackOutcome }
}
