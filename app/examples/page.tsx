'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function ExamplesRedirect() {
  const router = useRouter()
  
  useEffect(() => {
    // Redirect to free resources page
    router.replace('/free-resources')
  }, [router])
  
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Redirecting...</h1>
        <p className="text-gray-600">Taking you to our free resources page.</p>
      </div>
    </div>
  )
}