export default function Component() {
  if (process.env.NODE_ENV !== 'production') {
    return <div>Component: performance-monitor</div>
  }
  return null
}

// Named exports for flexibility
export const PerformancemonitorSection = Component
export const Performancemonitor = Component
export const PerformanceMonitor = Component
