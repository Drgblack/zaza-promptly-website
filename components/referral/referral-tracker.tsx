"use client"

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { ReferralSystem } from '@/lib/referral-system'

// Component to track referral data from URL parameters
export function ReferralTracker() {
  const searchParams = useSearchParams()

  useEffect(() => {
    // Extract and store referral data from URL parameters
    const referralData = ReferralSystem.extractReferralData(searchParams)
    
    // Only store if we have meaningful referral data
    if (referralData.referralEmail || Object.keys(referralData.utmData).length > 0) {
      ReferralSystem.storeReferralData(referralData)
      
      // Log referral tracking (anonymized)
      console.log('Referral tracked:', {
        hasReferralEmail: !!referralData.referralEmail,
        utmCount: Object.keys(referralData.utmData).length,
        timestamp: referralData.timestamp
      })
    }
  }, [searchParams])

  // This component doesn't render anything visible
  return null
}

// Hook for accessing referral data in other components
export function useReferralData() {
  const getReferralData = () => ReferralSystem.getReferralData()
  const hasReferral = () => ReferralSystem.hasReferral()
  const getReferrerEmail = () => ReferralSystem.getReferrerEmail()
  const trackConversion = (userEmail: string) => ReferralSystem.trackReferralConversion(userEmail)
  
  return {
    getReferralData,
    hasReferral,
    getReferrerEmail,
    trackConversion
  }
}