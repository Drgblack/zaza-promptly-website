export const STRIPE_CONFIG = {
  publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
  
  // Test price IDs - safe to commit
  testPriceIds: {
    starter: 'price_test_starter_123',
    professional: 'price_test_pro_456', 
    enterprise: 'price_test_ent_789'
  },
  
  // Production price IDs from environment
  productionPriceIds: {
    starter: process.env.NEXT_PUBLIC_STRIPE_PRICE_STARTER,
    professional: process.env.NEXT_PUBLIC_STRIPE_PRICE_PRO,
    enterprise: process.env.NEXT_PUBLIC_STRIPE_PRICE_ENTERPRISE
  },
  
  get priceIds() {
    const isProduction = process.env.NODE_ENV === 'production' && 
                        process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY?.startsWith('pk_live_')
    
    return isProduction ? this.productionPriceIds : this.testPriceIds
  },
  
  get isEnabled() {
    return !!this.publishableKey
  }
} as const