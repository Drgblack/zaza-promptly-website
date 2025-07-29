"use client"

import { useEffect } from "react"

interface PerformanceMetrics {
  lcp: number
  fid: number
  cls: number
  ttfb: number
  fcp: number
  pageLoadTime: number
  domContentLoaded: number
  firstByte: number
  domInteractive: number
  loadComplete: number
}

interface ResourceMetrics {
  name: string
  duration: number
  size: number
  type: string
}

export function PerformanceMonitor() {
  useEffect(() => {
    const metrics: PerformanceMetrics = {
      lcp: 0,
      fid: 0,
      cls: 0,
      ttfb: 0,
      fcp: 0,
      pageLoadTime: 0,
      domContentLoaded: 0,
      firstByte: 0,
      domInteractive: 0,
      loadComplete: 0,
    }

    const resourceMetrics: ResourceMetrics[] = []

    // Monitor Core Web Vitals
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        if (entry.entryType === "largest-contentful-paint") {
          metrics.lcp = entry.startTime
          sendMetric("LCP", entry.startTime)
        }
        if (entry.entryType === "first-input") {
          metrics.fid = (entry as any).processingStart - entry.startTime
          sendMetric("FID", metrics.fid)
        }
        if (entry.entryType === "layout-shift") {
          if (!(entry as any).hadRecentInput) {
            metrics.cls += (entry as any).value
            sendMetric("CLS", (entry as any).value)
          }
        }
        if (entry.entryType === "paint") {
          if (entry.name === "first-contentful-paint") {
            metrics.fcp = entry.startTime
            sendMetric("FCP", entry.startTime)
          }
        }
      })
    })

    observer.observe({ 
      entryTypes: ["largest-contentful-paint", "first-input", "layout-shift", "paint"] 
    })

    // Monitor resource loading
    const resourceObserver = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        if (entry.entryType === "resource") {
          const resourceEntry = entry as PerformanceResourceTiming
          resourceMetrics.push({
            name: resourceEntry.name,
            duration: resourceEntry.duration,
            size: resourceEntry.transferSize || 0,
            type: resourceEntry.initiatorType,
          })
        }
      })
    })

    resourceObserver.observe({ entryTypes: ["resource"] })

    // Monitor navigation timing
    window.addEventListener("load", () => {
      const navigation = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming
      
      metrics.pageLoadTime = navigation.loadEventEnd - navigation.fetchStart
      metrics.domContentLoaded = navigation.domContentLoadedEventEnd - navigation.fetchStart
      metrics.firstByte = navigation.responseStart - navigation.fetchStart
      metrics.domInteractive = navigation.domInteractive - navigation.fetchStart
      metrics.loadComplete = navigation.loadEventEnd - navigation.fetchStart
      metrics.ttfb = navigation.responseStart - navigation.requestStart


      // Send comprehensive metrics
      sendPerformanceData(metrics, resourceMetrics)
    })

    // Monitor memory usage (if available)
    if ('memory' in performance) {
      const memory = (performance as any).memory;
      sendMetric("MemoryUsed", memory.usedJSHeapSize);
      sendMetric("MemoryTotal", memory.totalJSHeapSize);
    }

    // Monitor long tasks
    const longTaskObserver = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        if (entry.duration > 50) {
          sendMetric("LongTask", entry.duration)
        }
      })
    })

    longTaskObserver.observe({ entryTypes: ["longtask"] })

    return () => {
      observer.disconnect()
      resourceObserver.disconnect()
      longTaskObserver.disconnect()
    }
  }, [])

  const sendMetric = async (metricName: string, value: number) => {
    try {
      await fetch("/api/analytics/performance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          metric: metricName,
          value,
          timestamp: new Date().toISOString(),
          url: window.location.href,
          userAgent: navigator.userAgent,
        }),
      })
    } catch (error) {
      // Silently fail
    }
  }

  const sendPerformanceData = async (metrics: PerformanceMetrics, resources: ResourceMetrics[]) => {
    try {
      await fetch("/api/analytics/performance-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          metrics,
          resources: resources.slice(0, 20), // Limit to top 20 resources
          timestamp: new Date().toISOString(),
          url: window.location.href,
          userAgent: navigator.userAgent,
          connection: (navigator as any).connection?.effectiveType || "unknown",
          deviceMemory: (navigator as any).deviceMemory || "unknown",
          hardwareConcurrency: navigator.hardwareConcurrency || "unknown",
        }),
      })
    } catch (error) {
      // Silently fail
    }
  }

  return null
}
