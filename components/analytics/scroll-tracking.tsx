"use client"

import { useEffect, useRef, useCallback } from "react"

export function useScrollTracking() {
  const scrollDepthRef = useRef<Set<number>>(new Set())
  const timeOnPageRef = useRef<number>(Date.now())
  const maxScrollRef = useRef<number>(0)

  const trackScrollDepth = useCallback((percentage: number) => {
    if (!scrollDepthRef.current.has(percentage)) {
      scrollDepthRef.current.add(percentage)

      // Track in Google Analytics
          if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "scroll_depth", {
          event_category: "engagement",
          event_label: `${percentage}%`,
          value: percentage,
          custom_parameter_1: "scroll_milestone",
        })
      }

      // Track significant milestones
      if (percentage >= 75) {
            if ((window as any).gtag) {
      (window as any).gtag("event", "high_engagement", {
            event_category: "engagement",
            event_label: "75_percent_scroll",
            value: 75,
          })
        }
      }
    }
  }, [])

  const trackTimeOnPage = useCallback(() => {
    const timeSpent = Math.round((Date.now() - timeOnPageRef.current) / 1000)

    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "time_on_page", {
        event_category: "engagement",
        value: timeSpent,
        custom_parameter_1: "session_duration",
      })
    }

    // Track engagement milestones
    // Temporarily commented out due to TypeScript issues
    // if (timeSpent >= 30 && timeSpent < 60) {
    //   (window as any).gtag?.("event", "engaged_user", {
    //     event_category: "engagement",
    //     event_label: "30_seconds",
    //     value: 30,
    //   })
    // } else if (timeSpent >= 120) {
    //   (window as any).gtag?.("event", "highly_engaged_user", {
    //     event_category: "engagement",
    //     event_label: "2_minutes",
    //     value: 120,
    //   })
    // }
  }, [])

  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollTop = window.pageYOffset || document.documentElement.scrollTop
          const docHeight = document.documentElement.scrollHeight - window.innerHeight
          const scrollPercent = Math.round((scrollTop / docHeight) * 100)

          // Update max scroll depth
          if (scrollPercent > maxScrollRef.current) {
            maxScrollRef.current = scrollPercent
          }

          // Track scroll milestones
          const milestones = [25, 50, 75, 90, 100]
          milestones.forEach((milestone) => {
            if (scrollPercent >= milestone) {
              trackScrollDepth(milestone)
            }
          })

          ticking = false
        })
        ticking = true
      }
    }

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        trackTimeOnPage()
      } else if (document.visibilityState === "visible") {
        timeOnPageRef.current = Date.now()
      }
    }

    const handleBeforeUnload = () => {
      trackTimeOnPage()

      // Send final scroll depth
          if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "max_scroll_depth", {
          event_category: "engagement",
          value: maxScrollRef.current,
          custom_parameter_1: "final_scroll_position",
        })
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    document.addEventListener("visibilitychange", handleVisibilityChange)
    window.addEventListener("beforeunload", handleBeforeUnload)

    // Track initial page load
    timeOnPageRef.current = Date.now()

    return () => {
      window.removeEventListener("scroll", handleScroll)
      document.removeEventListener("visibilitychange", handleVisibilityChange)
      window.removeEventListener("beforeunload", handleBeforeUnload)
    }
  }, [trackScrollDepth, trackTimeOnPage])

  return {
    trackScrollDepth,
    trackTimeOnPage,
  }
}
