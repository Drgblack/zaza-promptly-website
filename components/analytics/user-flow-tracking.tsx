"use client"

import { useEffect, useCallback, useRef } from "react"

interface UserFlowEvent {
  event_type: "page_view" | "section_view" | "interaction" | "conversion"
  section_name?: string
  interaction_type?: string
  timestamp: number
  sequence_number: number
}

export function useUserFlowTracking() {
  const flowSequenceRef = useRef<number>(0)
  const userFlowRef = useRef<UserFlowEvent[]>([])
  const sectionObserverRef = useRef<IntersectionObserver | null>(null)

  const trackUserFlowEvent = useCallback((event: Omit<UserFlowEvent, "timestamp" | "sequence_number">) => {
    flowSequenceRef.current += 1
    const flowEvent: UserFlowEvent = {
      ...event,
      timestamp: Date.now(),
      sequence_number: flowSequenceRef.current,
    }

    userFlowRef.current.push(flowEvent)

    // Track in Google Analytics with enhanced ecommerce
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "user_flow_step", {
        event_category: "user_journey",
        event_label: event.section_name || event.interaction_type,
        custom_parameter_1: event.event_type,
        custom_parameter_2: flowEvent.sequence_number.toString(),
        value: flowEvent.sequence_number,
      })
    }

    // Send to internal analytics
    fetch("/api/analytics/user-flow", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event: flowEvent,
        session_id: getSessionId(),
        user_flow: userFlowRef.current.slice(-10), // Last 10 events
      }),
    }).catch(console.error)
  }, [])

  const trackSectionView = useCallback(
    (sectionName: string) => {
      trackUserFlowEvent({
        event_type: "section_view",
        section_name: sectionName,
      })
    },
    [trackUserFlowEvent],
  )

  const trackInteraction = useCallback(
    (interactionType: string, sectionName?: string) => {
      trackUserFlowEvent({
        event_type: "interaction",
        interaction_type: interactionType,
        section_name: sectionName,
      })
    },
    [trackUserFlowEvent],
  )

  const trackConversion = useCallback(
    (conversionType: string) => {
      trackUserFlowEvent({
        event_type: "conversion",
        interaction_type: conversionType,
      })

      // Enhanced conversion tracking
          if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "conversion", {
          send_to: "AW-CONVERSION_ID/CONVERSION_LABEL", // Replace with actual conversion ID
          event_category: "conversion",
          event_label: conversionType,
          value: 1,
        })
      }
    },
    [trackUserFlowEvent],
  )

  const getSessionId = useCallback(() => {
    let sessionId = sessionStorage.getItem("user_flow_session")
    if (!sessionId) {
      sessionId = `flow_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      sessionStorage.setItem("user_flow_session", sessionId)
    }
    return sessionId
  }, [])

  // Set up intersection observer for automatic section tracking
  useEffect(() => {
    sectionObserverRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            const sectionName = entry.target.getAttribute("data-section") || entry.target.id
            if (sectionName) {
              trackSectionView(sectionName)
            }
          }
        })
      },
      {
        threshold: 0.5,
        rootMargin: "-10% 0px -10% 0px",
      },
    )

    // Observe all sections
    const sections = document.querySelectorAll("[data-section], section[id]")
    sections.forEach((section) => {
      sectionObserverRef.current?.observe(section)
    })

    return () => {
      sectionObserverRef.current?.disconnect()
    }
  }, [trackSectionView])

  // Track page view on mount
  useEffect(() => {
    trackUserFlowEvent({
      event_type: "page_view",
    })
  }, [trackUserFlowEvent])

  return {
    trackSectionView,
    trackInteraction,
    trackConversion,
    getUserFlow: () => userFlowRef.current,
  }
}
