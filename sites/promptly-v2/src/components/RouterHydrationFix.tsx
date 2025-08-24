'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function RouterHydrationFix() {
  const router = useRouter()

  useEffect(() => {
    // Force router hydration on mount
    console.log('[Router Fix] Ensuring router hydration...')
    
    // Clear any stale caches
    if (typeof window !== 'undefined') {
      // Clear service workers
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistrations().then(registrations => {
          registrations.forEach(registration => {
            console.log('[Router Fix] Clearing SW:', registration.scope)
            registration.unregister()
          })
        })
      }
      
      // Clear caches API
      if ('caches' in window) {
        caches.keys().then(cacheNames => {
          cacheNames.forEach(cacheName => {
            console.log('[Router Fix] Clearing cache:', cacheName)
            caches.delete(cacheName)
          })
        })
      }
      
      // Force prefetch critical routes
      setTimeout(() => {
        router.prefetch('/blog')
        router.prefetch('/case-studies')
        router.prefetch('/learning-centre')
        router.prefetch('/faq')
        router.prefetch('/free-resources')
        router.prefetch('/pricing')
        console.log('[Router Fix] Routes prefetched')
      }, 1000)
    }
  }, [router])

  return null
}