// Service Worker for static asset caching
// Improves Core Web Vitals for returning visitors

const CACHE_NAME = 'zaza-promptly-v1'
const STATIC_ASSETS = [
  '/images/logo/zaza-logo-icon.svg',
  '/favicon.ico',
  '/icon.png',
  '/manifest.json'
]

// Install event - cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS)
    })
  )
  self.skipWaiting()
})

// Activate event - cleanup old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName)
          }
        })
      )
    })
  )
})

// Fetch event - serve from cache when possible
self.addEventListener('fetch', (event) => {
  // Only handle GET requests for static assets
  if (event.request.method !== 'GET') return
  
  const url = new URL(event.request.url)
  
  // Only cache same-origin static assets
  if (url.origin !== location.origin) return
  
  // Skip API routes and dynamic content
  if (url.pathname.startsWith('/api/') || 
      url.pathname.startsWith('/_next/') ||
      url.searchParams.has('session_id')) return
      
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request)
    })
  )
})