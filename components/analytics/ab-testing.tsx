"use client"

import { useEffect, useState, createContext, useContext } from "react"

interface ABTest {
  id: string
  name: string
  variants: {
    id: string
    name: string
    weight: number
  }[]
  isActive: boolean
  startDate: string
  endDate?: string
}

interface ABTestContextType {
  getVariant: (testId: string) => string
  trackConversion: (testId: string, variantId: string, value?: number) => void
  trackEvent: (testId: string, variantId: string, eventName: string, data?: any) => void
}

const ABTestContext = createContext<ABTestContextType | null>(null)

// Define your A/B tests
const abTests: ABTest[] = [
  {
    id: "hero-cta",
    name: "Hero CTA Button Test",
    variants: [
      { id: "control", name: "Start Free Trial", weight: 50 },
      { id: "variant-a", name: "Try Zaza Promptly", weight: 25 },
      { id: "variant-b", name: "Save Hours Today", weight: 25 },
    ],
    isActive: true,
    startDate: "2024-01-01",
  },
  {
    id: "pricing-display",
    name: "Pricing Display Test",
    variants: [
      { id: "control", name: "Monthly First", weight: 50 },
      { id: "variant-a", name: "Annual First", weight: 50 },
    ],
    isActive: true,
    startDate: "2024-01-01",
  },
  {
    id: "demo-section",
    name: "Demo Section Test",
    variants: [
      { id: "control", name: "Standard Demo", weight: 50 },
      { id: "variant-a", name: "Interactive Demo", weight: 50 },
    ],
    isActive: true,
    startDate: "2024-01-01",
  },
  {
    id: "email-signup",
    name: "Email Signup Test",
    variants: [
      { id: "control", name: "Standard Form", weight: 50 },
      { id: "variant-a", name: "Enhanced Form", weight: 50 },
    ],
    isActive: true,
    startDate: "2024-01-01",
  },
]

export function ABTestingProvider({ children }: { children: React.ReactNode }) {
  const [assignments, setAssignments] = useState<Record<string, string>>({})

  // Initialize A/B test assignments
  useEffect(() => {
    const storedAssignments = localStorage.getItem("ab-test-assignments")
    if (storedAssignments) {
      setAssignments(JSON.parse(storedAssignments))
    } else {
      const newAssignments: Record<string, string> = {}
      
      abTests.forEach((test) => {
        if (test.isActive) {
          newAssignments[test.id] = assignVariant(test)
        }
      })
      
      setAssignments(newAssignments)
      localStorage.setItem("ab-test-assignments", JSON.stringify(newAssignments))
    }
  }, [])

  // Assign variant based on weights
  const assignVariant = (test: ABTest): string => {
    const random = Math.random() * 100
    let cumulativeWeight = 0
    
    for (const variant of test.variants) {
      cumulativeWeight += variant.weight
      if (random <= cumulativeWeight) {
        return variant.id
      }
    }
    
    return test.variants[0].id // fallback
  }

  // Get variant for a specific test
  const getVariant = (testId: string): string => {
    return assignments[testId] || "control"
  }

  // Track conversion
  const trackConversion = (testId: string, variantId: string, value?: number) => {
    const test = abTests.find(t => t.id === testId)
    if (!test) return

    // Send to analytics
    // Temporarily commented out due to TypeScript issues
    // if (typeof window !== "undefined" && (window as any).gtag) {
    //   (window as any).gtag("event", "ab_test_conversion", {
    //     test_id: testId,
    //     test_name: test.name,
    //     variant_id: variantId,
    //     variant_name: test.variants.find(v => v.id === variantId)?.name,
    //     value: value,
    //     page_url: window.location.href,
    //     timestamp: Date.now(),
    //   })
    // }

    // Send to custom analytics endpoint
    fetch("/api/analytics/ab-test", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "conversion",
        testId,
        testName: test.name,
        variantId,
        variantName: test.variants.find(v => v.id === variantId)?.name,
        value,
        url: window.location.href,
        timestamp: Date.now(),
      })
    }).catch(() => {
      // Silently fail if analytics endpoint is not available
    })
  }

  // Track custom events
  const trackEvent = (testId: string, variantId: string, eventName: string, data?: any) => {
    const test = abTests.find(t => t.id === testId)
    if (!test) return

    // Send to analytics
    // Temporarily commented out due to TypeScript issues
    // if (typeof window !== "undefined" && (window as any).gtag) {
    //   (window as any).gtag("event", "ab_test_event", {
    //     test_id: testId,
    //     test_name: test.name,
    //     variant_id: variantId,
    //     variant_name: test.variants.find(v => v.id === variantId)?.name,
    //     event_name: eventName,
    //     event_data: data,
    //     page_url: window.location.href,
    //     timestamp: Date.now(),
    //   })
    // }

    // Send to custom analytics endpoint
    fetch("/api/analytics/ab-test", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "event",
        testId,
        testName: test.name,
        variantId,
        variantName: test.variants.find(v => v.id === variantId)?.name,
        eventName,
        eventData: data,
        url: window.location.href,
        timestamp: Date.now(),
      })
    }).catch(() => {
      // Silently fail if analytics endpoint is not available
    })
  }

  return (
    <ABTestContext.Provider value={{ getVariant, trackConversion, trackEvent }}>
      {children}
    </ABTestContext.Provider>
  )
}

// Hook to use A/B testing
export function useABTest() {
  const context = useContext(ABTestContext)
  if (!context) {
    throw new Error("useABTest must be used within an ABTestingProvider")
  }
  return context
}

// Component to render different variants
interface ABTestVariantProps {
  testId: string
  variants: {
    [key: string]: React.ReactNode
  }
  onVariantRender?: (variantId: string) => void
}

export function ABTestVariant({ testId, variants, onVariantRender }: ABTestVariantProps) {
  const { getVariant } = useABTest()
  const variantId = getVariant(testId)
  
  useEffect(() => {
    onVariantRender?.(variantId)
  }, [variantId, onVariantRender])

  return <>{variants[variantId] || variants["control"]}</>
}

// Component to track conversions
interface ABTestConversionProps {
  testId: string
  variantId: string
  value?: number
  children: React.ReactNode
  onClick?: () => void
}

export function ABTestConversion({ testId, variantId, value, children, onClick }: ABTestConversionProps) {
  const { trackConversion } = useABTest()

  const handleClick = () => {
    trackConversion(testId, variantId, value)
    onClick?.()
  }

  return (
    <div onClick={handleClick}>
      {children}
    </div>
  )
}

// Component to track events
interface ABTestEventProps {
  testId: string
  variantId: string
  eventName: string
  eventData?: any
  children: React.ReactNode
  onClick?: () => void
}

export function ABTestEvent({ testId, variantId, eventName, eventData, children, onClick }: ABTestEventProps) {
  const { trackEvent } = useABTest()

  const handleClick = () => {
    trackEvent(testId, variantId, eventName, eventData)
    onClick?.()
  }

  return (
    <div onClick={handleClick}>
      {children}
    </div>
  )
}
