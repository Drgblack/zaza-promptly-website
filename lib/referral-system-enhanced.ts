export interface ReferralCode {
  id: string
  code: string
  referrerEmail: string
  referrerName: string
  isActive: boolean
  createdAt: Date
  expiresAt?: Date
  maxUses?: number
  currentUses: number
  rewardType: 'month_free' | 'discount' | 'credit'
  rewardValue: number
  metadata: {
    source: string
    plan?: string
    [key: string]: any
  }
}

export interface ReferralStats {
  totalRefers: number
  successfulConversions: number
  totalRewards: number
  activeRewards: number
  conversionRate: number
  topReferrers: {
    email: string
    name: string
    conversions: number
    rewards: number
  }[]
}

export interface ReferralReward {
  id: string
  referralCodeId: string
  referrerEmail: string
  newUserEmail: string
  rewardType: 'month_free' | 'discount' | 'credit'
  rewardValue: number
  isRedeemed: boolean
  redeemedAt?: Date
  createdAt: Date
  stripeMetadata?: {
    customerId?: string
    subscriptionId?: string
    invoiceId?: string
  }
}

export class EnhancedReferralSystem {
  private baseUrl: string

  constructor(baseUrl: string = 'https://zazapromptly.com') {
    this.baseUrl = baseUrl
  }

  // Generate a unique referral code
  generateReferralCode(referrerEmail: string, referrerName: string): string {
    const cleanName = referrerName
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '')
      .substring(0, 8)
    
    const randomSuffix = Math.random().toString(36).substring(2, 6)
    return `${cleanName}${randomSuffix}`
  }

  // Create a new referral code
  async createReferralCode(
    referrerEmail: string,
    referrerName: string,
    options: {
      rewardType?: 'month_free' | 'discount' | 'credit'
      rewardValue?: number
      maxUses?: number
      expiresAt?: Date
      metadata?: Record<string, any>
    } = {}
  ): Promise<ReferralCode> {
    const code = this.generateReferralCode(referrerEmail, referrerName)
    
    const referralCode: ReferralCode = {
      id: `ref_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`,
      code,
      referrerEmail,
      referrerName,
      isActive: true,
      createdAt: new Date(),
      expiresAt: options.expiresAt,
      maxUses: options.maxUses,
      currentUses: 0,
      rewardType: options.rewardType || 'month_free',
      rewardValue: options.rewardValue || 1,
      metadata: {
        source: 'dashboard',
        ...options.metadata
      }
    }

    // In a real app, save to database
    this.saveReferralCode(referralCode)
    
    return referralCode
  }

  // Generate shareable referral links
  generateReferralLinks(code: string): {
    general: string
    pricing: string
    freeResources: string
    social: {
      twitter: string
      facebook: string
      linkedin: string
      whatsapp: string
      email: string
    }
  } {
    const baseParams = `?ref=${code}&utm_source=referral&utm_medium=link`
    
    const general = `${this.baseUrl}${baseParams}&utm_campaign=general`
    const pricing = `${this.baseUrl}/pricing${baseParams}&utm_campaign=pricing`
    const freeResources = `${this.baseUrl}/free-resources${baseParams}&utm_campaign=resources`

    // Pre-written social messages
    const socialMessage = `Just discovered this amazing AI tool for teachers! It's saving me hours every week on parent communication. Check it out 👉 ${general}`
    const encodedMessage = encodeURIComponent(socialMessage)
    const encodedUrl = encodeURIComponent(general)

    return {
      general,
      pricing,
      freeResources,
      social: {
        twitter: `https://twitter.com/intent/tweet?text=${encodedMessage}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedMessage}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
        whatsapp: `https://wa.me/?text=${encodedMessage}`,
        email: `mailto:?subject=Check out this AI tool for teachers&body=${encodedMessage}`
      }
    }
  }

  // Track referral usage
  async trackReferralUsage(
    code: string,
    newUserEmail: string,
    conversionData: {
      plan?: string
      subscriptionId?: string
      customerId?: string
      metadata?: Record<string, any>
    } = {}
  ): Promise<ReferralReward | null> {
    const referralCode = await this.getReferralCode(code)
    
    if (!referralCode || !this.isReferralCodeValid(referralCode)) {
      return null
    }

    // Create reward for successful conversion
    const reward: ReferralReward = {
      id: `reward_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`,
      referralCodeId: referralCode.id,
      referrerEmail: referralCode.referrerEmail,
      newUserEmail,
      rewardType: referralCode.rewardType,
      rewardValue: referralCode.rewardValue,
      isRedeemed: false,
      createdAt: new Date(),
      stripeMetadata: {
        customerId: conversionData.customerId,
        subscriptionId: conversionData.subscriptionId
      }
    }

    // Update referral code usage
    referralCode.currentUses += 1
    
    // Save to storage
    await this.saveReferralReward(reward)
    await this.saveReferralCode(referralCode)

    // Track analytics
    if (typeof window !== 'undefined' && (window as any).zazeAnalytics) {
      (window as any).zazeAnalytics.trackReferralConversion(
        referralCode.referrerEmail,
        newUserEmail,
        {
          source: 'referral',
          medium: 'link',
          campaign: conversionData.metadata?.utm_campaign || 'general',
          ...conversionData.metadata
        }
      )
    }

    return reward
  }

  // Check if referral code is valid
  private isReferralCodeValid(referralCode: ReferralCode): boolean {
    if (!referralCode.isActive) return false
    
    if (referralCode.expiresAt && referralCode.expiresAt < new Date()) {
      return false
    }
    
    if (referralCode.maxUses && referralCode.currentUses >= referralCode.maxUses) {
      return false
    }
    
    return true
  }

  // Get referral statistics
  async getReferralStats(referrerEmail?: string): Promise<ReferralStats> {
    // In a real app, query from database
    // For now, return mock data
    return {
      totalRefers: 15,
      successfulConversions: 8,
      totalRewards: 8,
      activeRewards: 3,
      conversionRate: 0.53,
      topReferrers: [
        { email: 'sarah@school.edu', name: 'Sarah Chen', conversions: 5, rewards: 5 },
        { email: 'mike@district.org', name: 'Mike Rodriguez', conversions: 3, rewards: 3 },
        { email: 'jenny@academy.com', name: 'Jenny Park', conversions: 2, rewards: 2 }
      ]
    }
  }

  // Simplified storage methods (in production, use a real database)
  private async saveReferralCode(referralCode: ReferralCode): Promise<void> {
    if (typeof window !== 'undefined') {
      const existing = JSON.parse(localStorage.getItem('referral_codes') || '[]')
      const index = existing.findIndex((r: ReferralCode) => r.id === referralCode.id)
      
      if (index >= 0) {
        existing[index] = referralCode
      } else {
        existing.push(referralCode)
      }
      
      localStorage.setItem('referral_codes', JSON.stringify(existing))
    }
  }

  private async saveReferralReward(reward: ReferralReward): Promise<void> {
    if (typeof window !== 'undefined') {
      const existing = JSON.parse(localStorage.getItem('referral_rewards') || '[]')
      existing.push(reward)
      localStorage.setItem('referral_rewards', JSON.stringify(existing))
    }
  }

  private async getReferralCode(code: string): Promise<ReferralCode | null> {
    if (typeof window !== 'undefined') {
      const codes = JSON.parse(localStorage.getItem('referral_codes') || '[]')
      return codes.find((r: ReferralCode) => r.code === code) || null
    }
    return null
  }

  // Extract referral code from URL
  static extractReferralFromUrl(url: string): string | null {
    try {
      const urlObj = new URL(url)
      return urlObj.searchParams.get('ref')
    } catch {
      return null
    }
  }

  // Generate referral dashboard data
  async getDashboardData(userEmail: string): Promise<{
    referralCode: ReferralCode | null
    stats: ReferralStats
    rewards: ReferralReward[]
    links: ReturnType<typeof this.generateReferralLinks>
  }> {
    // Get or create referral code for user
    let referralCode = await this.getUserReferralCode(userEmail)
    
    if (!referralCode) {
      // Create a new referral code for the user
      const userName = userEmail.split('@')[0].replace(/[^a-zA-Z0-9]/g, '')
      referralCode = await this.createReferralCode(userEmail, userName)
    }

    const stats = await this.getReferralStats(userEmail)
    const rewards = await this.getUserRewards(userEmail)
    const links = this.generateReferralLinks(referralCode.code)

    return {
      referralCode,
      stats,
      rewards,
      links
    }
  }

  private async getUserReferralCode(email: string): Promise<ReferralCode | null> {
    if (typeof window !== 'undefined') {
      const codes = JSON.parse(localStorage.getItem('referral_codes') || '[]')
      return codes.find((r: ReferralCode) => r.referrerEmail === email) || null
    }
    return null
  }

  private async getUserRewards(email: string): Promise<ReferralReward[]> {
    if (typeof window !== 'undefined') {
      const rewards = JSON.parse(localStorage.getItem('referral_rewards') || '[]')
      return rewards.filter((r: ReferralReward) => r.referrerEmail === email)
    }
    return []
  }
}

// Singleton instance
export const referralSystem = new EnhancedReferralSystem()