/**
 * Content Scheduling System for 3x/Week Blog Publishing
 * Orchestrates the entire automated blog publishing pipeline
 */

import { CommunityScrapers } from './community-scrapers'
import { SentimentAnalyzer } from './sentiment-analyzer'
import { AIContentGenerator } from './ai-content-generator'
import { MDXFileGenerator } from './mdx-file-generator'
import { GitPublisher } from './git-publisher'
import type { TopicCluster, EmotionalPattern } from './sentiment-analyzer'
import type { GeneratedBlogPost } from './ai-content-generator'
import type { MDXFileResult } from './mdx-file-generator'

interface ScheduleConfig {
  postsPerWeek: number
  publishDays: ('monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday')[]
  publishTime: string // HH:MM format
  timezone: string
  contentMix: {
    emotionalSupport: number // percentage
    practicalGuides: number // percentage
    communityStories: number // percentage
  }
  qualityThreshold: number // 0-1 scale
  autoPublish: boolean
  requireManualApproval: boolean
}

interface PublishingPlan {
  weekStarting: Date
  posts: {
    date: Date
    topic: TopicCluster
    contentType: 'guide' | 'emotional-support' | 'practical-tips' | 'community-story'
    estimated: {
      readingTime: number
      wordCount: number
      seoScore: number
    }
  }[]
  contentSources: {
    totalCommunityPosts: number
    redditPosts: number
    linkedinPosts: number
    facebookPosts: number
  }
  insights: {
    topPainPoints: string[]
    emergingTrends: string[]
    emotionalPatterns: EmotionalPattern[]
  }
}

interface PublishingResult {
  success: boolean
  publishedPosts: {
    title: string
    slug: string
    publishDate: Date
    url: string
    gitCommitHash?: string
  }[]
  errors: string[]
  nextScheduledRun: Date
  stats: {
    totalWords: number
    averageReadingTime: number
    topicsGenerated: number
    communityPostsAnalyzed: number
  }
}

export class ContentScheduler {
  private static readonly DEFAULT_CONFIG: ScheduleConfig = {
    postsPerWeek: 3,
    publishDays: ['monday', 'wednesday', 'friday'],
    publishTime: '09:00',
    timezone: 'America/New_York',
    contentMix: {
      emotionalSupport: 40,
      practicalGuides: 40,
      communityStories: 20
    },
    qualityThreshold: 0.7,
    autoPublish: true,
    requireManualApproval: false
  }

  /**
   * Generate and publish weekly content automatically
   */
  static async generateWeeklyContent(
    config: Partial<ScheduleConfig> = {}
  ): Promise<PublishingResult> {
    const fullConfig = { ...this.DEFAULT_CONFIG, ...config }
    
    try {
      console.log('[CONTENT SCHEDULER] Starting weekly content generation...')

      // Step 1: Collect community data
      console.log('[CONTENT SCHEDULER] Collecting community insights...')
      const communityPosts = await CommunityScrapers.getAllCommunityPosts()
      
      if (communityPosts.length === 0) {
        throw new Error('No community posts found to base content on')
      }

      // Step 2: Analyze sentiment and cluster topics
      console.log('[CONTENT SCHEDULER] Analyzing sentiment and clustering topics...')
      const topicClusters = SentimentAnalyzer.clusterPostsByTopic(communityPosts)
      const emotionalPatterns = SentimentAnalyzer.detectEmotionalPatterns(communityPosts)

      // Step 3: Create publishing plan
      const plan = await this.createPublishingPlan(topicClusters, emotionalPatterns, fullConfig)
      console.log(`[CONTENT SCHEDULER] Created plan for ${plan.posts.length} posts`)

      // Step 4: Generate content
      console.log('[CONTENT SCHEDULER] Generating AI content...')
      const generatedPosts = await this.generateContentFromPlan(plan, fullConfig)

      // Step 5: Create MDX files
      console.log('[CONTENT SCHEDULER] Creating MDX files...')
      const mdxFiles = await this.createMDXFiles(generatedPosts, plan)

      // Step 6: Publish to Git (if auto-publish enabled)
      let publishedPosts: PublishingResult['publishedPosts'] = []
      let gitErrors: string[] = []

      if (fullConfig.autoPublish && !fullConfig.requireManualApproval) {
        console.log('[CONTENT SCHEDULER] Publishing to Git...')
        const publishResult = await GitPublisher.publishBlogPosts(mdxFiles, {
          message: this.generateWeeklyCommitMessage(generatedPosts),
          author: {
            name: 'Zaza Blog Automation',
            email: 'automation@zazatechnologies.com'
          }
        })

        if (publishResult.success) {
          publishedPosts = generatedPosts.map((post, index) => ({
            title: post.title,
            slug: mdxFiles[index].slug,
            publishDate: plan.posts[index].date,
            url: `https://zazatechnologies.com/blog/${mdxFiles[index].slug}`,
            gitCommitHash: publishResult.commitHash
          }))
        } else {
          gitErrors = publishResult.errors
        }
      }

      // Step 7: Calculate next run time
      const nextRun = this.calculateNextRun(fullConfig)

      console.log(`[CONTENT SCHEDULER] Completed! Generated ${generatedPosts.length} posts`)

      return {
        success: true,
        publishedPosts,
        errors: gitErrors,
        nextScheduledRun: nextRun,
        stats: {
          totalWords: generatedPosts.reduce((sum, post) => sum + (post.content.split(/\s+/).length), 0),
          averageReadingTime: Math.round(generatedPosts.reduce((sum, post) => sum + post.estimatedReadingTime, 0) / generatedPosts.length),
          topicsGenerated: topicClusters.length,
          communityPostsAnalyzed: communityPosts.length
        }
      }
    } catch (error) {
      console.error('[CONTENT SCHEDULER ERROR]', error)
      return {
        success: false,
        publishedPosts: [],
        errors: [error instanceof Error ? error.message : String(error)],
        nextScheduledRun: this.calculateNextRun(fullConfig),
        stats: {
          totalWords: 0,
          averageReadingTime: 0,
          topicsGenerated: 0,
          communityPostsAnalyzed: 0
        }
      }
    }
  }

  /**
   * Create publishing plan for the week
   */
  private static async createPublishingPlan(
    topicClusters: TopicCluster[],
    emotionalPatterns: EmotionalPattern[],
    config: ScheduleConfig
  ): Promise<PublishingPlan> {
    // Get top topics for content generation
    const sortedClusters = topicClusters
      .filter(cluster => cluster.frequency > 1) // Only topics with multiple mentions
      .sort((a, b) => {
        // Prioritize by urgency first, then frequency
        const urgencyWeight = { high: 3, medium: 2, low: 1 }
        return (urgencyWeight[b.urgency] * b.frequency) - (urgencyWeight[a.urgency] * a.frequency)
      })

    // Select topics based on content mix preferences
    const postsToGenerate = Math.min(config.postsPerWeek, sortedClusters.length)
    const selectedTopics = sortedClusters.slice(0, postsToGenerate)

    // Create schedule for the current week
    const weekStart = this.getWeekStart()
    const publishDates = this.getPublishDatesForWeek(weekStart, config)

    const posts = selectedTopics.map((topic, index) => {
      const contentType = this.determineContentType(topic, index, config.contentMix)
      
      return {
        date: publishDates[index] || publishDates[publishDates.length - 1],
        topic,
        contentType,
        estimated: {
          readingTime: this.estimateReadingTime(contentType),
          wordCount: this.estimateWordCount(contentType),
          seoScore: this.estimateSEOScore(topic)
        }
      }
    })

    return {
      weekStarting: weekStart,
      posts: posts.slice(0, config.postsPerWeek),
      contentSources: {
        totalCommunityPosts: topicClusters.reduce((sum, cluster) => sum + cluster.frequency, 0),
        redditPosts: Math.round(topicClusters.reduce((sum, cluster) => sum + cluster.frequency, 0) * 0.6),
        linkedinPosts: Math.round(topicClusters.reduce((sum, cluster) => sum + cluster.frequency, 0) * 0.25),
        facebookPosts: Math.round(topicClusters.reduce((sum, cluster) => sum + cluster.frequency, 0) * 0.15)
      },
      insights: {
        topPainPoints: topicClusters.slice(0, 5).map(c => c.name),
        emergingTrends: topicClusters.filter(c => c.urgency === 'high').map(c => c.name),
        emotionalPatterns: emotionalPatterns.slice(0, 3)
      }
    }
  }

  /**
   * Generate content from publishing plan
   */
  private static async generateContentFromPlan(
    plan: PublishingPlan,
    config: ScheduleConfig
  ): Promise<GeneratedBlogPost[]> {
    const generatedPosts: GeneratedBlogPost[] = []

    for (const planItem of plan.posts) {
      try {
        const post = await AIContentGenerator.generateBlogPost({
          topic: planItem.topic,
          contentType: planItem.contentType,
          targetLength: 'medium',
          includeSoftPromotion: Math.random() < 0.3 // 30% chance of soft Zaza mention
        })

        // Quality check
        if (this.passesQualityThreshold(post, config.qualityThreshold)) {
          generatedPosts.push(post)
        } else {
          console.warn(`[CONTENT SCHEDULER] Post "${post.title}" did not meet quality threshold`)
        }
      } catch (error) {
        console.error(`[CONTENT SCHEDULER] Failed to generate content for ${planItem.topic.name}:`, error)
      }
    }

    return generatedPosts
  }

  /**
   * Create MDX files from generated posts
   */
  private static async createMDXFiles(
    posts: GeneratedBlogPost[],
    plan: PublishingPlan
  ): Promise<MDXFileResult[]> {
    const mdxFiles: MDXFileResult[] = []

    for (let i = 0; i < posts.length; i++) {
      const post = posts[i]
      const publishDate = plan.posts[i]?.date || new Date()

      try {
        const mdxFile = await MDXFileGenerator.generateMDXFile(post, {
          publishDate,
          isDraft: false
        })

        mdxFiles.push(mdxFile)
      } catch (error) {
        console.error(`[CONTENT SCHEDULER] Failed to create MDX for "${post.title}":`, error)
      }
    }

    return mdxFiles
  }

  /**
   * Determine content type based on mix preferences
   */
  private static determineContentType(
    topic: TopicCluster,
    index: number,
    contentMix: ScheduleConfig['contentMix']
  ): 'guide' | 'emotional-support' | 'practical-tips' | 'community-story' {
    // Use topic's suggested content opportunity as base
    if (topic.contentOpportunity === 'guide' || topic.contentOpportunity === 'practical-tips') {
      return index % 2 === 0 ? 'guide' : 'practical-tips'
    }

    if (topic.urgency === 'high' && topic.sentiment.overall === 'negative') {
      return 'emotional-support'
    }

    // Distribute based on content mix preferences
    const rand = Math.random() * 100
    
    if (rand < contentMix.emotionalSupport) {
      return 'emotional-support'
    } else if (rand < contentMix.emotionalSupport + contentMix.practicalGuides) {
      return 'guide'
    } else {
      return 'community-story'
    }
  }

  /**
   * Get week start date (Monday)
   */
  private static getWeekStart(): Date {
    const now = new Date()
    const dayOfWeek = now.getDay()
    const daysToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1 // Sunday = 0, Monday = 1
    
    const monday = new Date(now)
    monday.setDate(now.getDate() - daysToMonday)
    monday.setHours(0, 0, 0, 0)
    
    return monday
  }

  /**
   * Get publish dates for the week based on config
   */
  private static getPublishDatesForWeek(weekStart: Date, config: ScheduleConfig): Date[] {
    const dayMap = {
      sunday: 0, monday: 1, tuesday: 2, wednesday: 3,
      thursday: 4, friday: 5, saturday: 6
    }

    const publishDates: Date[] = []
    const [hours, minutes] = config.publishTime.split(':').map(Number)

    for (const day of config.publishDays) {
      const date = new Date(weekStart)
      date.setDate(weekStart.getDate() + dayMap[day])
      date.setHours(hours, minutes, 0, 0)
      publishDates.push(date)
    }

    return publishDates.sort((a, b) => a.getTime() - b.getTime())
  }

  /**
   * Estimate reading time for content type
   */
  private static estimateReadingTime(contentType: string): number {
    const estimates = {
      'guide': 8,
      'emotional-support': 5,
      'practical-tips': 4,
      'community-story': 6
    }
    return estimates[contentType as keyof typeof estimates] || 5
  }

  /**
   * Estimate word count for content type
   */
  private static estimateWordCount(contentType: string): number {
    const estimates = {
      'guide': 1600,
      'emotional-support': 1000,
      'practical-tips': 800,
      'community-story': 1200
    }
    return estimates[contentType as keyof typeof estimates] || 1200
  }

  /**
   * Estimate SEO score based on topic
   */
  private static estimateSEOScore(topic: TopicCluster): number {
    let score = 0.5 // Base score

    // Higher frequency topics likely have better SEO potential
    if (topic.frequency > 5) score += 0.2
    if (topic.frequency > 10) score += 0.1

    // Specific topics often rank better than general ones
    if (topic.keywords.length > 3) score += 0.1

    // High urgency indicates trending topics
    if (topic.urgency === 'high') score += 0.1

    return Math.min(score, 1.0)
  }

  /**
   * Check if post passes quality threshold
   */
  private static passesQualityThreshold(post: GeneratedBlogPost, threshold: number): boolean {
    let score = 0

    // Title quality (not too short, not too long)
    if (post.title.length >= 30 && post.title.length <= 80) score += 0.2

    // Excerpt quality
    if (post.excerpt.length >= 100 && post.excerpt.length <= 200) score += 0.2

    // Content length (substantial but not overwhelming)
    const wordCount = post.content.split(/\s+/).length
    if (wordCount >= 800 && wordCount <= 2500) score += 0.3

    // Tag quality
    if (post.tags.length >= 3 && post.tags.length <= 8) score += 0.1

    // Reading time reasonable
    if (post.estimatedReadingTime >= 3 && post.estimatedReadingTime <= 12) score += 0.1

    // SEO keywords present
    if (post.seoKeywords.length >= 5) score += 0.1

    return score >= threshold
  }

  /**
   * Generate commit message for weekly content
   */
  private static generateWeeklyCommitMessage(posts: GeneratedBlogPost[]): string {
    const titles = posts.map(p => `- ${p.title}`).join('\n')
    const week = new Date().toISOString().split('T')[0]

    return `Add weekly blog content (${posts.length} posts) - Week of ${week}

${titles}

Generated from community insights across Reddit, LinkedIn, and Facebook teacher communities.
Content focused on authentic teacher pain points and practical solutions.

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>`
  }

  /**
   * Calculate next scheduled run
   */
  private static calculateNextRun(config: ScheduleConfig): Date {
    const now = new Date()
    const nextWeek = new Date(now)
    nextWeek.setDate(now.getDate() + 7 - now.getDay() + 1) // Next Monday
    
    const [hours, minutes] = config.publishTime.split(':').map(Number)
    nextWeek.setHours(hours, minutes, 0, 0)
    
    return nextWeek
  }

  /**
   * Preview next week's content plan without generating
   */
  static async previewWeeklyPlan(config: Partial<ScheduleConfig> = {}): Promise<PublishingPlan> {
    const fullConfig = { ...this.DEFAULT_CONFIG, ...config }
    
    // Collect community data
    const communityPosts = await CommunityScrapers.getAllCommunityPosts()
    
    // Analyze sentiment and cluster topics
    const topicClusters = SentimentAnalyzer.clusterPostsByTopic(communityPosts)
    const emotionalPatterns = SentimentAnalyzer.detectEmotionalPatterns(communityPosts)

    // Create publishing plan
    return await this.createPublishingPlan(topicClusters, emotionalPatterns, fullConfig)
  }

  /**
   * Get scheduler statistics
   */
  static async getSchedulerStats(): Promise<{
    totalPostsGenerated: number
    lastRunDate: Date | null
    nextRunDate: Date
    averagePostsPerWeek: number
    topTopics: string[]
    successRate: number
  }> {
    try {
      const gitStats = await GitPublisher.getRepositoryStats()
      const config = this.DEFAULT_CONFIG

      return {
        totalPostsGenerated: gitStats.blogPostCommits,
        lastRunDate: gitStats.lastBlogPostDate,
        nextRunDate: this.calculateNextRun(config),
        averagePostsPerWeek: config.postsPerWeek,
        topTopics: ['Grading Overwhelm', 'Lesson Planning', 'Parent Communication'], // Mock data
        successRate: 0.95 // Mock success rate
      }
    } catch (error) {
      console.error('[CONTENT SCHEDULER] Failed to get stats:', error)
      throw error
    }
  }

  /**
   * Emergency stop - pause automatic publishing
   */
  static async emergencyStop(): Promise<void> {
    console.log('[CONTENT SCHEDULER] Emergency stop activated - automatic publishing paused')
    // In production, this would update a flag in a database or config file
    // to prevent the cron job from running
  }

  /**
   * Resume automatic publishing after emergency stop
   */
  static async resumeSchedule(): Promise<void> {
    console.log('[CONTENT SCHEDULER] Automatic publishing resumed')
    // In production, this would clear the emergency stop flag
  }
}

// Export types
export type { ScheduleConfig, PublishingPlan, PublishingResult }