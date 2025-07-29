// Growth automation system for email campaigns and user engagement

export class GrowthAutomation {
  private static readonly BREVO_API_BASE = 'https://api.brevo.com/v3'
  
  // Weekly newsletter content generation
  static generateWeeklyNewsletter() {
    const currentWeek = this.getCurrentWeek()
    
    return {
      subject: `Week ${currentWeek}: New AI Tools + Teacher Tip Inside 🚀`,
      templateId: 1, // Brevo template ID
      content: {
        greeting: this.getPersonalizedGreeting(),
        mostDownloadedResource: this.getMostDownloadedResource(),
        tipOfTheWeek: this.getTipOfTheWeek(),
        newBlogPost: this.getLatestBlogPost(),
        socialProof: this.getWeeklySocialProof(),
        inviteToShare: this.getShareInvitation(),
        footer: this.getNewsletterFooter()
      }
    }
  }

  // Re-engagement email for inactive users
  static generateReEngagementEmail(daysSinceLastActivity: number) {
    if (daysSinceLastActivity < 3) return null
    
    const urgencyLevel = this.getUrgencyLevel(daysSinceLastActivity)
    
    return {
      subject: this.getReEngagementSubject(urgencyLevel),
      templateId: 2,
      content: {
        personalizedMessage: this.getReEngagementMessage(urgencyLevel),
        missedContent: this.getMissedContent(),
        incentive: this.getReEngagementIncentive(urgencyLevel),
        easyActions: this.getEasyEngagementActions(),
        unsubscribeOption: this.getGentleUnsubscribeOption()
      }
    }
  }

  // Send automated email via Brevo
  static async sendAutomatedEmail(
    emailAddress: string, 
    emailType: 'weekly' | 'reengagement', 
    customData?: any
  ): Promise<boolean> {
    try {
      const apiKey = process.env.BREVO_API_KEY
      if (!apiKey) {
        console.error('Brevo API key not configured')
        return false
      }

      let emailContent
      if (emailType === 'weekly') {
        emailContent = this.generateWeeklyNewsletter()
      } else {
        emailContent = this.generateReEngagementEmail(customData?.daysSinceLastActivity || 3)
      }

      if (!emailContent) return false

      const response = await fetch(`${this.BREVO_API_BASE}/smtp/email`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'api-key': apiKey,
        },
        body: JSON.stringify({
          sender: {
            name: "Zaza Promptly Team",
            email: "hello@zazapromptly.com"
          },
          to: [{
            email: emailAddress,
            name: customData?.name || "Teacher"
          }],
          subject: emailContent.subject,
          templateId: emailContent.templateId,
          params: emailContent.content,
          tags: [emailType, `week_${this.getCurrentWeek()}`]
        })
      })

      if (response.ok) {
        console.log(`${emailType} email sent successfully to ${emailAddress}`)
        return true
      } else {
        console.error(`Failed to send ${emailType} email:`, await response.text())
        return false
      }
    } catch (error) {
      console.error(`Error sending ${emailType} email:`, error)
      return false
    }
  }

  // Content generation helpers
  private static getCurrentWeek(): number {
    const startOfYear = new Date(new Date().getFullYear(), 0, 1)
    const today = new Date()
    const dayOfYear = Math.floor((today.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24))
    return Math.ceil((dayOfYear + startOfYear.getDay() + 1) / 7)
  }

  private static getPersonalizedGreeting(): string {
    const greetings = [
      "Hope your week is off to a great start!",
      "Ready for another week of teaching wins?",
      "Here's what's new in the teacher community:",
      "Your weekly dose of teaching inspiration is here!"
    ]
    return greetings[Math.floor(Math.random() * greetings.length)]
  }

  private static getMostDownloadedResource(): any {
    // In production, this would query actual download stats
    const resources = [
      {
        title: "AI Prompt Templates for Parent Communication",
        downloads: 1247,
        description: "Save hours writing parent emails with these tested templates",
        link: "https://zazapromptly.com/free-resources"
      },
      {
        title: "Time-Saving Lesson Planning Guide",
        downloads: 892,
        description: "Cut your planning time in half with these proven strategies",
        link: "https://zazapromptly.com/free-resources"
      }
    ]
    
    return resources[Math.floor(Math.random() * resources.length)]
  }

  private static getTipOfTheWeek(): any {
    const tips = [
      {
        title: "AI Feedback Hack",
        content: "Use AI to create 3 different versions of the same feedback comment, then choose the one that best fits your student's personality.",
        actionable: "Try this with your next batch of assignments!"
      },
      {
        title: "5-Minute Planning Win",
        content: "Before you leave school, write tomorrow's 3 main objectives on a sticky note. You'll start the next day with clarity and purpose.",
        actionable: "Start this habit today - future you will thank you!"
      },
      {
        title: "Parent Email Template",
        content: "Start difficult conversations with: 'I'm reaching out because I care about [student name] and want to partner with you to help them succeed.'",
        actionable: "Save this as a template in your email drafts."
      }
    ]
    
    return tips[Math.floor(Math.random() * tips.length)]
  }

  private static getLatestBlogPost(): any {
    // In production, this would fetch the actual latest blog post
    const posts = [
      {
        title: "The Complete Guide to AI Tools for Teachers in 2025",
        excerpt: "Discover the best AI tools for teachers and how to implement them effectively in your classroom.",
        readTime: "12 min read",
        link: "https://zazapromptly.com/blog/ai-tools-teachers-guide-2025"
      },
      {
        title: "Teacher Burnout Prevention: 15 Evidence-Based Strategies",
        excerpt: "Learn practical strategies to prevent burnout and maintain your passion for teaching.",
        readTime: "14 min read",
        link: "https://zazapromptly.com/blog/teacher-burnout-prevention-strategies"
      }
    ]
    
    return posts[Math.floor(Math.random() * posts.length)]
  }

  private static getWeeklySocialProof(): any {
    return {
      newTeachers: 23 + Math.floor(Math.random() * 10),
      totalDownloads: 3891 + Math.floor(Math.random() * 100),
      testimomialHighlight: "This week's feedback: 'Zaza Promptly saved me 6 hours on report cards!' - Sarah K., 3rd grade teacher"
    }
  }

  private static getShareInvitation(): any {
    return {
      message: "Know a teacher who could use more time? Share Zaza Promptly with a colleague!",
      incentive: "You'll both get bonus resources when they sign up.",
      shareLink: "https://zazapromptly.com/?ref={{contact.EMAIL}}"
    }
  }

  private static getNewsletterFooter(): any {
    return {
      unsubscribe: "https://zazapromptly.com/unsubscribe",
      preferences: "https://zazapromptly.com/email-preferences",
      social: {
        linkedin: "https://linkedin.com/company/zaza-technologies",
        twitter: "https://twitter.com/zazateach"
      }
    }
  }

  // Re-engagement helpers
  private static getUrgencyLevel(days: number): 'gentle' | 'moderate' | 'final' {
    if (days < 7) return 'gentle'
    if (days < 14) return 'moderate'
    return 'final'
  }

  private static getReEngagementSubject(urgency: string): string {
    const subjects = {
      gentle: [
        "We miss you! Here's what you missed 👋",
        "Quick check-in + new teacher resources inside",
        "Your teaching toolkit is waiting!"
      ],
      moderate: [
        "Don't let these resources slip away...",
        "Last chance to grab your free teaching tools",
        "We've saved your spot in the teacher community"
      ],
      final: [
        "One final resource before we say goodbye",
        "Final call: Keep your teacher resources active",
        "We don't want to see you go..."
      ]
    }
    
    const options = subjects[urgency as keyof typeof subjects] || subjects.gentle
    return options[Math.floor(Math.random() * options.length)]
  }

  private static getReEngagementMessage(urgency: string): string {
    const messages = {
      gentle: "We noticed you haven't been around lately. No worries - teaching keeps us all busy! Here's what you might have missed:",
      moderate: "It's been a while since we've seen you. We've been busy creating new resources to make your teaching life easier:",
      final: "We understand if Zaza Promptly isn't the right fit right now. Before you go, we wanted to share one final resource that might help:"
    }
    
    return messages[urgency as keyof typeof messages] || messages.gentle
  }

  private static getMissedContent(): any {
    return {
      blogPosts: 2,
      newResources: 3,
      communityGrowth: "347 new teachers joined",
      mostPopular: "AI Prompt Templates (downloaded 1,200+ times)"
    }
  }

  private static getReEngagementIncentive(urgency: string): any {
    const incentives = {
      gentle: {
        title: "Exclusive Bonus Pack",
        description: "10 additional AI templates just for coming back",
        cta: "Claim Your Bonus"
      },
      moderate: {
        title: "VIP Resource Bundle",
        description: "Everything we've created in the past month, in one download",
        cta: "Get VIP Access"
      },
      final: {
        title: "Complete Teacher Toolkit",
        description: "Our entire resource library, yours to keep forever",
        cta: "Download Everything"
      }
    }
    
    return incentives[urgency as keyof typeof incentives] || incentives.gentle
  }

  private static getEasyEngagementActions(): any[] {
    return [
      {
        action: "Browse free resources",
        timeRequired: "2 minutes",
        link: "https://zazapromptly.com/free-resources"
      },
      {
        action: "Read our latest teacher tips",
        timeRequired: "5 minutes",
        link: "https://zazapromptly.com/blog"
      },
      {
        action: "Join the teacher community",
        timeRequired: "1 minute",
        link: "https://zazapromptly.com/community"
      }
    ]
  }

  private static getGentleUnsubscribeOption(): any {
    return {
      message: "If you're no longer teaching or don't find our content helpful, we understand.",
      options: [
        {
          text: "Pause emails for 3 months",
          action: "pause"
        },
        {
          text: "Change email frequency",
          action: "frequency"
        },
        {
          text: "Unsubscribe completely",
          action: "unsubscribe"
        }
      ]
    }
  }

  // User activity tracking
  static trackUserActivity(email: string, activity: string, metadata?: any): void {
    // In production, this would update user activity in your database
    const activityData = {
      email,
      activity,
      timestamp: new Date().toISOString(),
      metadata: metadata || {}
    }
    
    // For now, just log (in production, save to database)
    console.log('User activity tracked:', {
      email: email.replace(/(.{2}).*(@.*)/, '$1***$2'),
      activity,
      timestamp: activityData.timestamp
    })
  }

  // Automation triggers
  static async processAutomationTriggers(): Promise<void> {
    // This would typically be called by a cron job
    console.log('Processing growth automation triggers...')
    
    // Check for users due for re-engagement
    // Check for weekly newsletter sends
    // Update user segments
    // Process referral rewards
  }
}

// Types for better TypeScript support
export interface EmailContent {
  subject: string
  templateId: number
  content: Record<string, any>
}

export interface UserActivity {
  email: string
  activity: string
  timestamp: string
  metadata?: Record<string, any>
}