"use client"

import { useCallback } from "react"

interface ConversionEvent {
  event_name: string
  event_category: string
  event_label?: string
  value?: number
  currency?: string
  custom_parameters?: Record<string, any>
}

export function useConversionTracking() {
  // Track primary CTA clicks
  const trackPrimaryCTA = useCallback((ctaText: string, location: string) => {
    const event: ConversionEvent = {
      event_name: "primary_cta_click",
      event_category: "conversion",
      event_label: ctaText,
      value: 100, // Assign value for conversion tracking
      custom_parameters: {
        cta_location: location,
        cta_text: ctaText,
        timestamp: new Date().toISOString(),
      },
    }

    // Google Analytics 4
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "primary_cta_click", {
        event_category: "conversion",
        event_label: ctaText,
        value: 100,
        cta_location: location,
        cta_text: ctaText,
      })
    }

    // Facebook Pixel
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("track", "Lead", {
        content_name: ctaText,
        content_category: "CTA",
        value: 100,
        currency: "USD",
      })
    }

    // Custom analytics
    trackCustomEvent(event)
  }, [])

  // Track secondary CTA clicks
  const trackSecondaryCTA = useCallback((ctaText: string, location: string) => {
    const event: ConversionEvent = {
      event_name: "secondary_cta_click",
      event_category: "engagement",
      event_label: ctaText,
      value: 50,
      custom_parameters: {
        cta_location: location,
        cta_text: ctaText,
        timestamp: new Date().toISOString(),
      },
    }

    // Google Analytics 4
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "secondary_cta_click", {
        event_category: "engagement",
        event_label: ctaText,
        value: 50,
        cta_location: location,
      })
    }

    trackCustomEvent(event)
  }, [])

  // Track demo interactions
  const trackDemoInteraction = useCallback((action: string, step: string, completion_rate?: number) => {
    const event: ConversionEvent = {
      event_name: "demo_interaction",
      event_category: "demo",
      event_label: action,
      custom_parameters: {
        demo_step: step,
        completion_rate: completion_rate,
        timestamp: new Date().toISOString(),
      },
    }

    // Google Analytics 4
    if (typeof window !== "undefined" && (window as any).gtag) {
    //   (window as any).gtag("event", "demo_interaction", {
    //     event_category: "demo",
    //     event_label: action,
    //     demo_step: step,
    //     completion_rate: completion_rate,
    //   })
    }

    // Track demo completion milestone
    if (completion_rate && completion_rate >= 100) {
          // Google Analytics 4
          if ((window as any).gtag) {
            (window as any).gtag("event", "demo_completed", {
              event_category: "conversion",
              value: 75,
            })
          }

      if (window.fbq) {
        window.fbq("track", "CompleteRegistration", {
          content_name: "Demo Completion",
          value: 75,
          currency: "USD",
        })
      }
    }

    trackCustomEvent(event)
  }, [])

  // Track email signups
  const trackEmailSignup = useCallback((source: string, email?: string) => {
    const event: ConversionEvent = {
      event_name: "email_signup",
      event_category: "conversion",
      event_label: source,
      value: 150,
      custom_parameters: {
        signup_source: source,
        has_email: !!email,
        timestamp: new Date().toISOString(),
      },
    }

    // Google Analytics 4
    if (typeof window !== "undefined" && (window as any).gtag) {
    //   (window as any).gtag("event", "sign_up", {
    //     method: source,
    //     event_category: "conversion",
    //     value: 150,
    //   })
    }

    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("track", "Lead", {
        content_name: "Email Signup",
        content_category: source,
        value: 150,
        currency: "USD",
      })
    }

    trackCustomEvent(event)
  }, [])

  // Track feature interactions
  const trackFeatureInteraction = useCallback((feature: string, action: string) => {
    const event: ConversionEvent = {
      event_name: "feature_interaction",
      event_category: "engagement",
      event_label: feature,
      custom_parameters: {
        feature_name: feature,
        interaction_type: action,
        timestamp: new Date().toISOString(),
      },
    }

    // Google Analytics 4
    if (typeof window !== "undefined" && (window as any).gtag) {
    //   (window as any).gtag("event", "feature_interaction", {
    //     event_category: "engagement",
    //     event_label: feature,
    //     feature_name: feature,
    //     interaction_type: action,
    //   })
    }

    trackCustomEvent(event)
  }, [])

  // Custom event tracking for internal analytics
  const trackCustomEvent = useCallback((event: ConversionEvent) => {
    // Send to internal analytics API
    if (typeof window !== "undefined") {
      fetch("/api/analytics/track", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...event,
          user_agent: navigator.userAgent,
          page_url: window.location.href,
          referrer: document.referrer,
          session_id: getSessionId(),
        }),
      }).catch((error) => {
        console.error("Analytics tracking error:", error)
      })
    }
  }, [])

  // Get or create session ID
  const getSessionId = useCallback(() => {
    let sessionId = sessionStorage.getItem("analytics_session_id")
    if (!sessionId) {
      sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      sessionStorage.setItem("analytics_session_id", sessionId)
    }
    return sessionId
  }, [])

  return {
    trackPrimaryCTA,
    trackSecondaryCTA,
    trackDemoInteraction,
    trackEmailSignup,
    trackFeatureInteraction,
    trackCustomEvent,
  }
}
