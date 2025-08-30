export const STRIPE_CONFIG = {
  publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
  
  // Test price IDs - safe to commit
  testPriceIds: {
    promptlyMonthly: 'price_1QKMfnGLWNYhKl5w2gqWExWG',
    promptlyAnnual: 'price_1QKMh2GLWNYhKl5w4dqJQZl7'
  },
  
  // Production price IDs from environment
  productionPriceIds: {
    promptlyMonthly: process.env.STRIPE_PRICE_ID_PROMPTLY_MONTHLY,
    promptlyAnnual: process.env.STRIPE_PRICE_ID_PROMPTLY_ANNUAL
  },
  
  get priceIds() {
    const isProduction = process.env.NODE_ENV === 'production' && 
                        process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY?.startsWith('pk_live_')
    
    return isProduction ? this.productionPriceIds : this.testPriceIds
  },
  
  get isEnabled() {
    return !!this.publishableKey && !!process.env.STRIPE_SECRET_KEY
  },
  
  // Server-side price validation
  validatePriceId(priceId: string): boolean {
    const allValidIds = [
      ...Object.values(this.testPriceIds),
      ...Object.values(this.productionPriceIds).filter(Boolean)
    ]
    return allValidIds.includes(priceId)
  },
  
  // Get current environment's valid price IDs
  getValidPriceIds(): string[] {
    return Object.values(this.priceIds).filter(Boolean) as string[]
  }
} as const