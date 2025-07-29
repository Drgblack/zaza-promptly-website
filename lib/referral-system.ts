"use client"

// Referral system utilities for tracking and generating referral links
export class ReferralSystem {
  private static readonly REFERRAL_KEY = 'zaza_referral_data'
  private static readonly UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content']
  
  // Generate a referral link for a given email
  static generateReferralLink(email: string, baseUrl: string = 'https://zazapromptly.com'): string {
    const encodedEmail = encodeURIComponent(email)
    return `${baseUrl}/?ref=${encodedEmail}`
  }

  // Extract referral data from URL parameters
  static extractReferralData(searchParams: URLSearchParams): ReferralData {
    const referralEmail = searchParams.get('ref')
    const utmData: UTMData = {}
    
    // Extract UTM parameters
    this.UTM_KEYS.forEach(key => {
      const value = searchParams.get(key)
      if (value) {
        utmData[key] = value
      }
    })

    return {
      referralEmail: referralEmail || null,
      utmData,
      timestamp: new Date().toISOString(),
      pageUrl: typeof window !== 'undefined' ? window.location.href : '',
    }
  }

  // Store referral data in localStorage
  static storeReferralData(data: ReferralData): void {
    if (typeof window === 'undefined') return

    try {
      const existingData = this.getReferralData()
      
      // Only update if we have new referral information
      if (data.referralEmail || Object.keys(data.utmData).length > 0) {
        const updatedData = {
          ...existingData,
          ...data,
          firstVisit: existingData?.firstVisit || data.timestamp,
          lastUpdate: data.timestamp
        }
        
        localStorage.setItem(this.REFERRAL_KEY, JSON.stringify(updatedData))
        
        // Track referral in analytics if available
        if ((window as any).zazeAnalytics) {
          (window as any).zazeAnalytics.trackReferral(data.referralEmail, data.utmData)
        }
      }
    } catch (error) {
      console.error('Error storing referral data:', error)
    }
  }

  // Retrieve referral data from localStorage
  static getReferralData(): ReferralData | null {
    if (typeof window === 'undefined') return null

    try {
      const stored = localStorage.getItem(this.REFERRAL_KEY)
      return stored ? JSON.parse(stored) : null
    } catch (error) {
      console.error('Error retrieving referral data:', error)
      return null
    }
  }

  // Clear referral data (useful after conversion)
  static clearReferralData(): void {
    if (typeof window === 'undefined') return
    localStorage.removeItem(this.REFERRAL_KEY)
  }

  // Check if user came from a referral
  static hasReferral(): boolean {
    const data = this.getReferralData()
    return !!(data?.referralEmail || (data?.utmData && Object.keys(data.utmData).length > 0))
  }

  // Get referrer email for attribution
  static getReferrerEmail(): string | null {
    const data = this.getReferralData()
    return data?.referralEmail || null
  }

  // Generate shareable referral links with tracking
  static generateShareableLinks(email: string): ShareableLinks {
    const baseUrl = 'https://zazapromptly.com'
    const referralUrl = this.generateReferralLink(email, baseUrl)
    
    return {
      direct: referralUrl,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(referralUrl)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralUrl)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(referralUrl)}&text=${encodeURIComponent('Check out Zaza Promptly - AI-powered feedback for teachers!')}`,
      email: `mailto:?subject=${encodeURIComponent('AI Tool for Teachers - Zaza Promptly')}&body=${encodeURIComponent(`I thought you might be interested in this AI tool for teachers: ${referralUrl}`)}`
    }
  }

  // Track referral conversion (when someone signs up)
  static trackReferralConversion(userEmail: string): void {
    const referralData = this.getReferralData()
    
    if (referralData?.referralEmail) {
      // Send conversion data to backend
      this.sendReferralConversion({
        referrerEmail: referralData.referralEmail,
        newUserEmail: userEmail,
        utmData: referralData.utmData,
        conversionDate: new Date().toISOString(),
        firstVisitDate: referralData.firstVisit
      })

      // Track in analytics
      if ((window as any).zazeAnalytics) {
        (window as any).zazeAnalytics.trackReferralConversion(
          referralData.referralEmail,
          userEmail,
          referralData.utmData
        )
      }
    }
  }

  // Send referral conversion to backend
  private static async sendReferralConversion(data: ReferralConversion): Promise<void> {
    try {
      await fetch('/api/referral-conversion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      })
    } catch (error) {
      console.error('Error sending referral conversion:', error)
    }
  }

  // Generate referral stats for a user
  static async getReferralStats(email: string): Promise<ReferralStats> {
    try {
      const response = await fetch(`/api/referral-stats?email=${encodeURIComponent(email)}`)
      return await response.json()
    } catch (error) {
      console.error('Error fetching referral stats:', error)
      return { totalReferrals: 0, successfulReferrals: 0, pendingReferrals: 0 }
    }
  }
}

// Type definitions
export interface ReferralData {
  referralEmail: string | null
  utmData: UTMData
  timestamp: string
  pageUrl: string
  firstVisit?: string
  lastUpdate?: string
}

export interface UTMData {
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_term?: string
  utm_content?: string
  [key: string]: string | undefined
}

export interface ShareableLinks {
  direct: string
  linkedin: string
  facebook: string
  twitter: string
  email: string
}

export interface ReferralConversion {
  referrerEmail: string
  newUserEmail: string
  utmData: UTMData
  conversionDate: string
  firstVisitDate?: string
}

export interface ReferralStats {
  totalReferrals: number
  successfulReferrals: number
  pendingReferrals: number
  rewardPoints?: number
}

// Enhanced analytics tracking for referrals - types are defined in global.d.ts