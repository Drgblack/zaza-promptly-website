// Unified Brevo lead capture system with cross-app tagging

interface UnifiedBrevoContact {
  email: string
  name?: string
  source: string // promptly, teach, visuals, ecosystem, etc.
  campaign?: string // utm_campaign or internal campaign name
  leadSource: string // specific source like 'exit_intent', 'blog_subscription', etc.
  tags: string[]
  attributes?: Record<string, any>
  utmData?: {
    source?: string
    medium?: string
    campaign?: string
    term?: string
    content?: string
  }
  crossAppData?: {
    hasZazaTeachAccount?: boolean
    hasZazaVisualsAccount?: boolean
    lastApp?: string
    linkedApps?: string[]
  }
}

export class UnifiedBrevoCapture {
  private static readonly BREVO_API_BASE = 'https://api.brevo.com/v3'
  
  // Unified contact creation with intelligent tagging
  static async createContact(contactData: UnifiedBrevoContact): Promise<boolean> {
    try {
      const apiKey = process.env.BREVO_API_KEY
      if (!apiKey) {
        console.error('Brevo API key not configured')
        return false
      }

      // Enrich contact with cross-app intelligence
      const enrichedContact = await this.enrichContactData(contactData)
      
      // Create standardized contact payload
      const payload = {
        email: enrichedContact.email,
        attributes: {
          FIRSTNAME: enrichedContact.name?.split(' ')[0] || '',
          LASTNAME: enrichedContact.name?.split(' ').slice(1).join(' ') || '',
          SOURCE_APP: enrichedContact.source,
          LEAD_SOURCE: enrichedContact.leadSource,
          CAMPAIGN: enrichedContact.campaign || '',
          UTM_SOURCE: enrichedContact.utmData?.source || '',
          UTM_MEDIUM: enrichedContact.utmData?.medium || '',
          UTM_CAMPAIGN: enrichedContact.utmData?.campaign || '',
          UTM_TERM: enrichedContact.utmData?.term || '',
          UTM_CONTENT: enrichedContact.utmData?.content || '',
          SIGNUP_DATE: new Date().toISOString(),
          CROSS_APP_USER: enrichedContact.crossAppData?.linkedApps?.length > 0,
          HAS_TEACH_ACCOUNT: enrichedContact.crossAppData?.hasZazaTeachAccount || false,
          HAS_VISUALS_ACCOUNT: enrichedContact.crossAppData?.hasZazaVisualsAccount || false,
          LAST_APP_USED: enrichedContact.crossAppData?.lastApp || enrichedContact.source,
          USER_JOURNEY_STAGE: this.determineJourneyStage(enrichedContact),
          ...enrichedContact.attributes
        },
        listIds: this.getListIds(enrichedContact),
        updateEnabled: true
      }

      const response = await fetch(`${this.BREVO_API_BASE}/contacts`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'api-key': apiKey,
        },
        body: JSON.stringify(payload)
      })

      if (response.ok) {
        // Apply tags after contact creation
        await this.applyContactTags(enrichedContact.email, enrichedContact.tags)
        
        // Track successful capture
        this.trackLeadCapture(enrichedContact)
        
        console.log(`Contact created successfully: ${enrichedContact.email}`)
        return true
      } else {
        const errorText = await response.text()
        console.error(`Failed to create contact:`, errorText)
        return false
      }
    } catch (error) {
      console.error(`Error creating Brevo contact:`, error)
      return false
    }
  }

  // Enrich contact data with cross-app detection
  private static async enrichContactData(contactData: UnifiedBrevoContact): Promise<UnifiedBrevoContact> {
    // Detect cross-app usage patterns
    const crossAppData = {
      hasZazaTeachAccount: this.detectAppUsage('teach', contactData.email),
      hasZazaVisualsAccount: this.detectAppUsage('visuals', contactData.email),
      lastApp: this.getLastUsedApp(contactData.email),
      linkedApps: this.getLinkedApps(contactData.email)
    }

    // Generate intelligent tags based on behavior
    const intelligentTags = this.generateIntelligentTags(contactData, crossAppData)
    
    return {
      ...contactData,
      crossAppData,
      tags: [...contactData.tags, ...intelligentTags]
    }
  }

  // Detect if user has used other Zaza apps
  private static detectAppUsage(app: string, email: string): boolean {
    // In production, this would query your user database
    // For now, check localStorage/cookies as fallback
    if (typeof window !== 'undefined') {
      return !!localStorage.getItem(`zaza_${app}_user`) || 
             document.cookie.includes(`zaza_${app}_user=true`)
    }
    return false
  }

  private static getLastUsedApp(email: string): string | undefined {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('zaza_last_app') || undefined
    }
    return undefined
  }

  private static getLinkedApps(email: string): string[] {
    if (typeof window !== 'undefined') {
      const linkedAppsStr = localStorage.getItem('zaza_linked_apps')
      return linkedAppsStr ? JSON.parse(linkedAppsStr) : []
    }
    return []
  }

  // Generate intelligent tags based on user behavior and context
  private static generateIntelligentTags(
    contactData: UnifiedBrevoContact, 
    crossAppData: any
  ): string[] {
    const tags: string[] = []

    // App-specific tags
    tags.push(`app_${contactData.source}`)
    
    // Lead source tags
    tags.push(`source_${contactData.leadSource}`)
    
    // Cross-app user detection
    if (crossAppData.linkedApps?.length > 0) {
      tags.push('cross_app_user')
    }
    
    if (crossAppData.hasZazaTeachAccount) {
      tags.push('teach_user')
    }
    
    if (crossAppData.hasZazaVisualsAccount) {
      tags.push('visuals_user')
    }

    // UTM-based tags
    if (contactData.utmData?.source) {
      tags.push(`utm_${contactData.utmData.source}`)
    }
    
    if (contactData.utmData?.medium) {
      tags.push(`medium_${contactData.utmData.medium}`)
    }

    // Campaign tags
    if (contactData.campaign) {
      tags.push(`campaign_${contactData.campaign}`)
    }

    // Behavior-based tags
    const behaviorTags = this.getBehaviorTags(contactData.leadSource)
    tags.push(...behaviorTags)

    // Intent-based tags
    const intentTags = this.getIntentTags(contactData.source, contactData.leadSource)
    tags.push(...intentTags)

    return tags.filter(tag => tag && tag.length > 0)
  }

  private static getBehaviorTags(leadSource: string): string[] {
    const behaviorMap: { [key: string]: string[] } = {
      'exit_intent': ['high_intent', 'potential_churner'],
      'blog_subscription': ['content_interested', 'educational_focus'],
      'resource_download': ['resource_seeker', 'practical_focus'],
      'referral': ['social_sharer', 'community_member'],
      'homepage_signup': ['direct_interest', 'proactive'],
      'pricing_page': ['purchase_intent', 'budget_conscious'],
      'comparison_page': ['research_phase', 'evaluating_options']
    }
    
    return behaviorMap[leadSource] || ['general_interest']
  }

  private static getIntentTags(source: string, leadSource: string): string[] {
    const tags: string[] = []
    
    // High purchase intent indicators
    if (['pricing_page', 'comparison_page', 'free_trial'].includes(leadSource)) {
      tags.push('high_purchase_intent')
    }
    
    // Education phase indicators
    if (['blog_subscription', 'resource_download', 'community_join'].includes(leadSource)) {
      tags.push('education_phase')
    }
    
    // Immediate value seekers
    if (['exit_intent', 'homepage_signup'].includes(leadSource)) {
      tags.push('immediate_value_seeker')
    }

    return tags
  }

  // Determine user's journey stage
  private static determineJourneyStage(contactData: UnifiedBrevoContact): string {
    // Cross-app users are typically more advanced
    if (contactData.crossAppData?.linkedApps?.length > 0) {
      return 'power_user'
    }
    
    // Purchase intent indicators
    if (['pricing_page', 'comparison_page', 'free_trial'].includes(contactData.leadSource)) {
      return 'evaluation'
    }
    
    // Educational content engagement
    if (['blog_subscription', 'resource_download'].includes(contactData.leadSource)) {
      return 'learning'
    }
    
    // High-intent actions
    if (['exit_intent', 'referral'].includes(contactData.leadSource)) {
      return 'interested'
    }
    
    return 'awareness'
  }

  // Get appropriate Brevo list IDs based on contact characteristics
  private static getListIds(contactData: UnifiedBrevoContact): number[] {
    const listIds: number[] = []
    
    // Main app lists (replace with actual Brevo list IDs)
    const appLists = {
      promptly: 1,
      teach: 2,
      visuals: 3,
      ecosystem: 4
    }
    
    // Add to main app list
    const appListId = appLists[contactData.source as keyof typeof appLists]
    if (appListId) {
      listIds.push(appListId)
    }
    
    // Add to cross-app list if applicable
    if (contactData.crossAppData?.linkedApps?.length > 0) {
      listIds.push(5) // Cross-app users list
    }
    
    // Add to high-intent list if applicable
    if (['pricing_page', 'comparison_page', 'exit_intent'].includes(contactData.leadSource)) {
      listIds.push(6) // High-intent leads list
    }
    
    return listIds
  }

  // Apply tags to existing contact
  private static async applyContactTags(email: string, tags: string[]): Promise<void> {
    try {
      const apiKey = process.env.BREVO_API_KEY
      if (!apiKey || tags.length === 0) return

      // Brevo tag application would go here
      // This is a simplified version - in production you'd use the tags API
      console.log(`Applied tags to ${email}:`, tags)
      
    } catch (error) {
      console.error('Error applying contact tags:', error)
    }
  }

  // Track lead capture for analytics
  private static trackLeadCapture(contactData: UnifiedBrevoContact): void {
    if (typeof window !== 'undefined' && (window as any).zazeAnalytics) {
      (window as any).zazeAnalytics.trackBrevoSubscribe(
        contactData.leadSource,
        contactData.source,
        {
          campaign: contactData.campaign,
          crossAppUser: contactData.crossAppData?.linkedApps?.length > 0,
          journeyStage: this.determineJourneyStage(contactData),
          tags: contactData.tags
        }
      )
    }
  }

  // Create contact for specific app contexts
  static async capturePromptlyLead(
    email: string,
    name: string | undefined,
    leadSource: string,
    utmData?: any,
    additionalTags: string[] = []
  ): Promise<boolean> {
    return this.createContact({
      email,
      name,
      source: 'promptly',
      leadSource,
      tags: ['promptly_user', 'free_user', ...additionalTags],
      utmData,
      campaign: utmData?.utm_campaign
    })
  }

  static async captureTeachLead(
    email: string,
    name: string | undefined,
    leadSource: string,
    utmData?: any,
    additionalTags: string[] = []
  ): Promise<boolean> {
    return this.createContact({
      email,
      name,
      source: 'teach',
      leadSource,
      tags: ['teach_interest', 'premium_potential', ...additionalTags],
      utmData,
      campaign: utmData?.utm_campaign
    })
  }

  static async captureVisualsLead(
    email: string,
    name: string | undefined,
    leadSource: string,
    utmData?: any,
    additionalTags: string[] = []
  ): Promise<boolean> {
    return this.createContact({
      email,
      name,
      source: 'visuals',
      leadSource,
      tags: ['visuals_interest', 'creative_focus', ...additionalTags],
      utmData,
      campaign: utmData?.utm_campaign
    })
  }

  static async captureEcosystemLead(
    email: string,
    name: string | undefined,
    leadSource: string,
    utmData?: any,
    additionalTags: string[] = []
  ): Promise<boolean> {
    return this.createContact({
      email,
      name,
      source: 'ecosystem',
      leadSource,
      tags: ['ecosystem_interest', 'multi_app_potential', ...additionalTags],
      utmData,
      campaign: utmData?.utm_campaign
    })
  }
}

// Email sequence configurations for different user types
export const EMAIL_SEQUENCES = {
  promptly_new_user: {
    name: 'Promptly New User Sequence',
    emails: [
      { delay: 0, template: 'welcome_promptly', subject: 'Welcome to Zaza Promptly! 🎉' },
      { delay: 1, template: 'getting_started', subject: 'Get the most from your AI prompts' },
      { delay: 3, template: 'teach_introduction', subject: 'Ready for complete lesson planning?' },
      { delay: 7, template: 'community_invitation', subject: 'Join 1,200+ teachers sharing tips' },
      { delay: 14, template: 'advanced_features', subject: 'Advanced AI techniques for teachers' }
    ]
  },
  
  cross_app_user: {
    name: 'Cross-App User Sequence',
    emails: [
      { delay: 0, template: 'cross_app_welcome', subject: 'Your Zaza ecosystem is growing! 🚀' },
      { delay: 2, template: 'integration_tips', subject: 'How to connect your Zaza apps' },
      { delay: 5, template: 'workflow_optimization', subject: 'Optimize your teaching workflow' },
      { delay: 10, template: 'ecosystem_expansion', subject: 'Discover more Zaza tools' }
    ]
  },
  
  high_intent_lead: {
    name: 'High Intent Lead Sequence',
    emails: [
      { delay: 0, template: 'immediate_value', subject: 'Start saving time today' },
      { delay: 1, template: 'social_proof', subject: 'See how teachers like you succeed' },
      { delay: 3, template: 'trial_offer', subject: 'Try Zaza Teach free for 7 days' },
      { delay: 5, template: 'objection_handling', subject: 'Common questions answered' },
      { delay: 7, template: 'final_offer', subject: 'Last chance for early access' }
    ]
  }
}

// Utility functions for form integrations
export function getUTMData(): any {
  if (typeof window === 'undefined') return {}
  
  const urlParams = new URLSearchParams(window.location.search)
  return {
    source: urlParams.get('utm_source'),
    medium: urlParams.get('utm_medium'),
    campaign: urlParams.get('utm_campaign'),
    term: urlParams.get('utm_term'),
    content: urlParams.get('utm_content')
  }
}

export function getCurrentAppSource(): string {
  if (typeof window === 'undefined') return 'promptly'
  
  const hostname = window.location.hostname
  if (hostname.includes('zazateach.com')) return 'teach'
  if (hostname.includes('zazavisuals.com')) return 'visuals'
  return 'promptly'
}