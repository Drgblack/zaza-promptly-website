// Enhanced Service Worker for performance and offline capabilities
const CACHE_NAME = "zaza-promptly-v3"
const STATIC_CACHE = "static-v3"
const DYNAMIC_CACHE = "dynamic-v3"
const API_CACHE = "api-v3"

// Static assets to cache immediately
const staticAssets = [
  "/",
  "/manifest.json",
  "/zaza-logo.png",
  "/zaza-logo.webp",
  "/zaza-logo.avif",
  "/favicon.ico",
  "/offline.html",
  "/placeholder.svg",
]

// API endpoints to cache
const apiEndpoints = [
  "/api/email-signup",
  "/api/generate",
  "/api/gpt-helper",
]

// External resources to cache
const externalResources = [
  "https://fonts.googleapis.com/",
  "https://fonts.gstatic.com/",
]

// Install event - cache static assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    Promise.all([
      caches.open(STATIC_CACHE).then((cache) => {
        console.log("Caching static assets")
        return cache.addAll(staticAssets)
      }),
      caches.open(API_CACHE).then((cache) => {
        console.log("Caching API endpoints")
        return cache.addAll(apiEndpoints.map(endpoint => `${self.location.origin}${endpoint}`))
      })
    ])
  )
  self.skipWaiting()
})

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((cacheName) => {
            return cacheName !== STATIC_CACHE && 
                   cacheName !== DYNAMIC_CACHE && 
                   cacheName !== API_CACHE
          })
          .map((cacheName) => {
            console.log("Deleting old cache:", cacheName)
            return caches.delete(cacheName)
          })
      )
    })
  )
  self.clients.claim()
})

// Helper function to determine if a request should be cached
function shouldCache(url) {
  // Cache API requests
  if (url.includes("/api/")) {
    return true
  }
  
  // Cache external resources
  if (externalResources.some(resource => url.startsWith(resource))) {
    return true
  }
  
  // Cache image requests
  if (url.match(/\.(jpg|jpeg|png|gif|webp|avif|svg)$/i)) {
    return true
  }
  
  // Cache font requests
  if (url.match(/\.(woff|woff2|ttf|eot)$/i)) {
    return true
  }
  
  return false
}

// Helper function to get cache strategy
function getCacheStrategy(request) {
  const url = new URL(request.url)
  
  // Static assets - cache first
  if (staticAssets.some(asset => url.pathname === asset)) {
    return "cache-first"
  }
  
  // API requests - network first with cache fallback
  if (url.pathname.startsWith("/api/")) {
    return "network-first"
  }
  
  // Images - cache first with network fallback
  if (url.pathname.match(/\.(jpg|jpeg|png|gif|webp|avif|svg)$/i)) {
    return "cache-first"
  }
  
  // Fonts - cache first
  if (url.pathname.match(/\.(woff|woff2|ttf|eot)$/i)) {
    return "cache-first"
  }
  
  // Default - network first
  return "network-first"
}

// Fetch event - serve from cache, fallback to network
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return

  const strategy = getCacheStrategy(event.request)
  
  if (strategy === "cache-first") {
    event.respondWith(cacheFirst(event.request))
  } else {
    event.respondWith(networkFirst(event.request))
  }
})

// Cache first strategy
async function cacheFirst(request) {
  const cachedResponse = await caches.match(request)
  if (cachedResponse) {
    return cachedResponse
  }
  
  try {
    const networkResponse = await fetch(request)
    if (networkResponse.ok && shouldCache(request.url)) {
      const cache = await caches.open(DYNAMIC_CACHE)
      cache.put(request, networkResponse.clone())
    }
    return networkResponse
  } catch (error) {
    // Return offline page for navigation requests
    if (request.mode === "navigate") {
      return caches.match("/offline.html")
    }
    throw error
  }
}

// Network first strategy
async function networkFirst(request) {
  try {
    const networkResponse = await fetch(request)
    if (networkResponse.ok && shouldCache(request.url)) {
      const cache = await caches.open(DYNAMIC_CACHE)
      cache.put(request, networkResponse.clone())
    }
    return networkResponse
  } catch (error) {
    const cachedResponse = await caches.match(request)
    if (cachedResponse) {
      return cachedResponse
    }
    
    // Return offline page for navigation requests
    if (request.mode === "navigate") {
      return caches.match("/offline.html")
    }
    throw error
  }
}

// Background sync for offline form submissions
self.addEventListener("sync", (event) => {
  if (event.tag === "background-sync") {
    event.waitUntil(doBackgroundSync())
  }
})

async function doBackgroundSync() {
  try {
    const requests = await getPendingRequests()
    for (const request of requests) {
      await fetch(request.url, {
        method: request.method,
        headers: request.headers,
        body: request.body
      })
      await removePendingRequest(request.id)
    }
  } catch (error) {
    console.error("Background sync failed:", error)
  }
}

// Helper functions for background sync
async function getPendingRequests() {
  // Implementation would depend on your storage strategy
  return []
}

async function removePendingRequest(id) {
  // Implementation would depend on your storage strategy
}

// Push notifications (if needed)
self.addEventListener("push", (event) => {
  const options = {
    body: event.data ? event.data.text() : "New update available!",
    icon: "/zaza-logo.png",
    badge: "/zaza-logo.png",
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: "explore",
        title: "View",
        icon: "/zaza-logo.png"
      },
      {
        action: "close",
        title: "Close",
        icon: "/zaza-logo.png"
      }
    ]
  }
  
  event.waitUntil(
    self.registration.showNotification("Zaza Promptly", options)
  )
})

// Handle notification clicks
self.addEventListener("notificationclick", (event) => {
  event.notification.close()
  
  if (event.action === "explore") {
    event.waitUntil(
      clients.openWindow("/")
    )
  }
})
