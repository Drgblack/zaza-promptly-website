import { Suspense } from 'react'
import CheckoutSuccessClient from './checkout-success-client'

export default function CheckoutSuccess() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading...</p>
      </div>
    </div>}>
      <CheckoutSuccessClient />
    </Suspense>
  )
}