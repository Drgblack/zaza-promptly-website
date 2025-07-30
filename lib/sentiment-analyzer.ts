/**
 * Sentiment Analysis and Topic Clustering for Teacher Pain Points
 * Analyzes emotional patterns and clusters topics for content generation
 */

import type { TeacherPost, CommunityInsight } from './community-scrapers'

interface SentimentScore {
  positive: number
  negative: number
  neutral: number
  overall: 'positive' | 'negative' | 'neutral'
  confidence: number
}

interface TopicCluster {
  id: string
  name: string
  keywords: string[]
  posts: TeacherPost[]
  sentiment: SentimentScore
  urgency: 'high' | 'medium' | 'low'
  frequency: number
  potentialSolutions: string[]
  contentOpportunity: 'guide' | 'emotional-support' | 'practical-tips' | 'community-story'
}

interface EmotionalPattern {
  emotion: string
  triggers: string[]
  frequency: number
  timePatterns: string[] // e.g., 'sunday-evening', 'monday-morning', 'report-card-season'
  suggestedSupport: string[]
}

export class SentimentAnalyzer {
  private static readonly EMOTION_KEYWORDS = {
    frustrated: ['frustrated', 'annoying', 'ridiculous', 'impossible', 'fed up', 'sick of', 'can\'t believe'],
    exhausted: ['tired', 'exhausted', 'drained', 'worn out', 'burnt out', 'no energy', 'overwhelmed'],
    overwhelmed: ['overwhelmed', 'too much', 'drowning', 'can\'t keep up', 'stressed', 'pressure'],
    hopeful: ['hopeful', 'optimistic', 'excited', 'looking forward', 'positive', 'encouraged'],
    angry: ['angry', 'furious', 'mad', 'outraged', 'livid', 'pissed', 'infuriating'],
    sad: ['sad', 'depressed', 'heartbroken', 'disappointed', 'defeated', 'hopeless', 'crying'],
    anxious: ['anxious', 'worried', 'nervous', 'scared', 'afraid', 'panic', 'stress']
  }

  private static readonly URGENCY_INDICATORS = {
    high: ['urgent', 'crisis', 'emergency', 'breaking point', 'can\'t continue', 'quitting', 'desperate'],
    medium: ['need help', 'struggling', 'difficult', 'challenging', 'concerned', 'worried'],
    low: ['wondering', 'curious', 'thinking about', 'considering', 'interested in']
  }

  private static readonly TOPIC_KEYWORDS = {
    'grading-overwhelm': ['grading', 'marking', 'feedback', 'hours of', 'pile of papers', 'essays', 'assessments'],
    'lesson-planning-stress': ['lesson planning', 'preparation', 'curriculum', 'materials', 'resources', 'planning time'],
    'parent-communication': ['parents', 'families', 'emails', 'conferences', 'complaints', 'demands'],
    'classroom-management': ['behavior', 'discipline', 'disruptions', 'management', 'control', 'chaos'],
    'admin-pressure': ['administration', 'principal', 'meetings', 'requirements', 'mandates', 'paperwork'],
    'work-life-balance': ['family time', 'weekends', 'evenings', 'personal life', 'balance', 'burnout'],
    'technology-struggles': ['technology', 'digital', 'online', 'software', 'platform', 'tech issues'],
    'differentiation-challenges': ['differentiation', 'diverse learners', 'special needs', 'levels', 'individualized'],
    'testing-pressure': ['testing', 'assessments', 'data', 'scores', 'standardized', 'accountability'],
    'supply-shortages': ['supplies', 'materials', 'budget', 'resources', 'money', 'funding']
  }

  /**
   * Analyze sentiment of a single post
   */
  static analyzeSentiment(content: string): SentimentScore {
    const words = content.toLowerCase().split(/\s+/)
    let positiveScore = 0
    let negativeScore = 0
    let totalWords = words.length

    // Simple keyword-based sentiment analysis
    // In production, use a more sophisticated NLP library
    const positiveWords = ['great', 'amazing', 'wonderful', 'excellent', 'fantastic', 'love', 'enjoy', 'happy', 'grateful', 'thankful', 'successful', 'proud', 'accomplished']
    const negativeWords = ['terrible', 'awful', 'horrible', 'hate', 'frustrated', 'angry', 'sad', 'disappointed', 'stressed', 'overwhelmed', 'exhausted', 'burnt', 'failing', 'impossible', 'useless']

    words.forEach(word => {
      if (positiveWords.includes(word)) positiveScore++
      if (negativeWords.includes(word)) negativeScore++
    })

    // Normalize scores
    const positive = positiveScore / totalWords
    const negative = negativeScore / totalWords
    const neutral = 1 - positive - negative

    // Determine overall sentiment
    let overall: 'positive' | 'negative' | 'neutral'
    let confidence: number

    if (positive > negative + 0.02) {
      overall = 'positive'
      confidence = positive / (positive + negative + 0.01)
    } else if (negative > positive + 0.02) {
      overall = 'negative'
      confidence = negative / (positive + negative + 0.01)
    } else {
      overall = 'neutral'
      confidence = neutral
    }

    return {
      positive: Math.round(positive * 100) / 100,
      negative: Math.round(negative * 100) / 100,
      neutral: Math.round(neutral * 100) / 100,
      overall,
      confidence: Math.round(confidence * 100) / 100
    }
  }

  /**
   * Detect emotional patterns in teacher posts
   */
  static detectEmotionalPatterns(posts: TeacherPost[]): EmotionalPattern[] {
    const patterns: Record<string, EmotionalPattern> = {}

    posts.forEach(post => {
      const content = post.content.toLowerCase()
      
      // Detect emotions based on keywords
      Object.entries(this.EMOTION_KEYWORDS).forEach(([emotion, keywords]) => {
        const hasEmotion = keywords.some(keyword => content.includes(keyword))
        
        if (hasEmotion) {
          if (!patterns[emotion]) {
            patterns[emotion] = {
              emotion,
              triggers: [],
              frequency: 0,
              timePatterns: [],
              suggestedSupport: []
            }
          }
          
          patterns[emotion].frequency++
          
          // Identify triggers (categories that commonly cause this emotion)
          if (!patterns[emotion].triggers.includes(post.category)) {
            patterns[emotion].triggers.push(post.category)
          }
          
          // Time pattern analysis (simplified)
          const dayOfWeek = post.timestamp.getDay()
          if (dayOfWeek === 0 || dayOfWeek === 6) { // Weekend
            if (!patterns[emotion].timePatterns.includes('weekend-stress')) {
              patterns[emotion].timePatterns.push('weekend-stress')
            }
          } else if (dayOfWeek === 1) { // Monday
            if (!patterns[emotion].timePatterns.includes('monday-blues')) {
              patterns[emotion].timePatterns.push('monday-blues')
            }
          }
        }
      })
    })

    // Add suggested support for each emotion
    Object.values(patterns).forEach(pattern => {
      pattern.suggestedSupport = this.getSuggestedSupport(pattern.emotion)
    })

    return Object.values(patterns).sort((a, b) => b.frequency - a.frequency)
  }

  /**
   * Cluster posts by topic
   */
  static clusterPostsByTopic(posts: TeacherPost[]): TopicCluster[] {
    const clusters: Record<string, TopicCluster> = {}

    posts.forEach(post => {
      const content = post.content.toLowerCase()
      let assignedToCluster = false

      // Check which topic cluster this post belongs to
      Object.entries(this.TOPIC_KEYWORDS).forEach(([topicId, keywords]) => {
        const relevanceScore = keywords.filter(keyword => 
          content.includes(keyword) || 
          post.tags.some(tag => tag.includes(keyword))
        ).length

        if (relevanceScore > 0 && !assignedToCluster) {
          if (!clusters[topicId]) {
            clusters[topicId] = {
              id: topicId,
              name: this.getTopicDisplayName(topicId),
              keywords,
              posts: [],
              sentiment: { positive: 0, negative: 0, neutral: 0, overall: 'neutral', confidence: 0 },
              urgency: 'medium',
              frequency: 0,
              potentialSolutions: [],
              contentOpportunity: 'guide'
            }
          }
          
          clusters[topicId].posts.push(post)
          clusters[topicId].frequency++
          assignedToCluster = true
        }
      })

      // If post doesn't fit existing clusters, create a general cluster
      if (!assignedToCluster) {
        const generalId = 'general-teaching-challenges'
        if (!clusters[generalId]) {
          clusters[generalId] = {
            id: generalId,
            name: 'General Teaching Challenges',
            keywords: ['teaching', 'education', 'classroom'],
            posts: [],
            sentiment: { positive: 0, negative: 0, neutral: 0, overall: 'neutral', confidence: 0 },
            urgency: 'medium',
            frequency: 0,
            potentialSolutions: [],
            contentOpportunity: 'community-story'
          }
        }
        clusters[generalId].posts.push(post)
        clusters[generalId].frequency++
      }
    })

    // Analyze sentiment and urgency for each cluster
    Object.values(clusters).forEach(cluster => {
      cluster.sentiment = this.calculateClusterSentiment(cluster.posts)
      cluster.urgency = this.calculateClusterUrgency(cluster.posts)
      cluster.potentialSolutions = this.generatePotentialSolutions(cluster.id)
      cluster.contentOpportunity = this.determineContentOpportunity(cluster)
    })

    return Object.values(clusters).sort((a, b) => b.frequency - a.frequency)
  }

  /**
   * Calculate overall sentiment for a cluster
   */
  private static calculateClusterSentiment(posts: TeacherPost[]): SentimentScore {
    if (posts.length === 0) {
      return { positive: 0, negative: 0, neutral: 1, overall: 'neutral', confidence: 0 }
    }

    let totalPositive = 0
    let totalNegative = 0
    let totalNeutral = 0

    posts.forEach(post => {
      const sentiment = this.analyzeSentiment(post.content)
      totalPositive += sentiment.positive
      totalNegative += sentiment.negative
      totalNeutral += sentiment.neutral
    })

    const avgPositive = totalPositive / posts.length
    const avgNegative = totalNegative / posts.length
    const avgNeutral = totalNeutral / posts.length

    let overall: 'positive' | 'negative' | 'neutral'
    if (avgPositive > avgNegative + 0.1) {
      overall = 'positive'
    } else if (avgNegative > avgPositive + 0.1) {
      overall = 'negative'
    } else {
      overall = 'neutral'
    }

    return {
      positive: Math.round(avgPositive * 100) / 100,
      negative: Math.round(avgNegative * 100) / 100,
      neutral: Math.round(avgNeutral * 100) / 100,
      overall,
      confidence: Math.round(Math.abs(avgPositive - avgNegative) * 100) / 100
    }
  }

  /**
   * Calculate urgency level for a cluster
   */
  private static calculateClusterUrgency(posts: TeacherPost[]): 'high' | 'medium' | 'low' {
    let highUrgencyCount = 0
    let mediumUrgencyCount = 0

    posts.forEach(post => {
      const content = post.content.toLowerCase()
      
      if (this.URGENCY_INDICATORS.high.some(indicator => content.includes(indicator))) {
        highUrgencyCount++
      } else if (this.URGENCY_INDICATORS.medium.some(indicator => content.includes(indicator))) {
        mediumUrgencyCount++
      }
    })

    const highUrgencyRatio = highUrgencyCount / posts.length
    const mediumUrgencyRatio = mediumUrgencyCount / posts.length

    if (highUrgencyRatio > 0.3) return 'high'
    if (mediumUrgencyRatio > 0.4) return 'medium'
    return 'low'
  }

  /**
   * Get display name for topic ID
   */
  private static getTopicDisplayName(topicId: string): string {
    const displayNames: Record<string, string> = {
      'grading-overwhelm': 'Grading Overwhelm',
      'lesson-planning-stress': 'Lesson Planning Stress',
      'parent-communication': 'Parent Communication Challenges',
      'classroom-management': 'Classroom Management Issues',
      'admin-pressure': 'Administrative Pressure',
      'work-life-balance': 'Work-Life Balance Struggles',
      'technology-struggles': 'Technology Integration Challenges',
      'differentiation-challenges': 'Differentiation Difficulties',
      'testing-pressure': 'Testing and Assessment Pressure',
      'supply-shortages': 'Resource and Supply Shortages'
    }
    
    return displayNames[topicId] || topicId.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
  }

  /**
   * Generate potential solutions for a topic
   */
  private static generatePotentialSolutions(topicId: string): string[] {
    const solutions: Record<string, string[]> = {
      'grading-overwhelm': [
        'Use voice feedback to save time',
        'Implement student self-assessment rubrics',
        'Try focused feedback on 2-3 key areas',
        'Use digital tools for instant feedback'
      ],
      'lesson-planning-stress': [
        'Collaborate with grade-level teams',
        'Create reusable lesson templates',
        'Use backwards design methodology',
        'Plan in weekly blocks instead of daily'
      ],
      'parent-communication': [
        'Set clear communication boundaries',
        'Use standard email templates',
        'Schedule regular update times',
        'Create a classroom blog for updates'
      ],
      'classroom-management': [
        'Establish clear expectations early',
        'Use positive behavior systems',
        'Create engaging lesson hooks',
        'Build relationships with challenging students'
      ],
      'admin-pressure': [
        'Document all requests and timelines',
        'Form teacher advocacy groups',
        'Request specific training for new initiatives',
        'Communicate needs with data'
      ],
      'work-life-balance': [
        'Set firm work hour boundaries',
        'Prioritize high-impact activities only',
        'Use Sunday prep time efficiently',
        'Practice saying no to extra commitments'
      ]
    }

    return solutions[topicId] || [
      'Connect with other teachers facing similar challenges',
      'Break the problem into smaller, manageable steps',
      'Seek professional development opportunities',
      'Consider innovative tools or approaches'
    ]
  }

  /**
   * Determine content opportunity type
   */
  private static determineContentOpportunity(cluster: TopicCluster): 'guide' | 'emotional-support' | 'practical-tips' | 'community-story' {
    // High urgency + negative sentiment = emotional support needed
    if (cluster.urgency === 'high' && cluster.sentiment.overall === 'negative') {
      return 'emotional-support'
    }
    
    // Medium/high frequency + specific topic = guide opportunity
    if (cluster.frequency > 5 && cluster.id !== 'general-teaching-challenges') {
      return 'guide'
    }
    
    // Lower frequency but specific solutions = practical tips
    if (cluster.potentialSolutions.length > 3) {
      return 'practical-tips'
    }
    
    // Everything else = community story
    return 'community-story'
  }

  /**
   * Get suggested support for emotions
   */
  private static getSuggestedSupport(emotion: string): string[] {
    const support: Record<string, string[]> = {
      frustrated: [
        'Acknowledge that frustration is normal',
        'Focus on small wins and progress',
        'Connect with supportive colleagues',
        'Take breaks when possible'
      ],
      exhausted: [
        'Prioritize rest and self-care',
        'Identify time-wasters to eliminate',
        'Ask for help with overwhelming tasks',
        'Consider professional support'
      ],
      overwhelmed: [
        'Break large tasks into smaller steps',
        'Use organizational systems',
        'Delegate when possible',
        'Practice stress management techniques'
      ],
      anxious: [
        'Practice mindfulness and grounding',
        'Prepare for challenging situations',
        'Build support networks',
        'Consider professional help if needed'
      ]
    }

    return support[emotion] || [
      'Recognize that these feelings are valid',
      'Seek support from trusted colleagues',
      'Focus on what you can control',
      'Remember your positive impact on students'
    ]
  }

  /**
   * Generate content recommendations based on analysis
   */
  static generateContentRecommendations(clusters: TopicCluster[], patterns: EmotionalPattern[]): {
    urgentTopics: TopicCluster[]
    emotionalSupportNeeded: EmotionalPattern[]
    guideOpportunities: TopicCluster[]
    trendingIssues: TopicCluster[]
  } {
    const urgentTopics = clusters.filter(c => c.urgency === 'high').slice(0, 3)
    const emotionalSupportNeeded = patterns.filter(p => p.frequency > 2).slice(0, 3)
    const guideOpportunities = clusters.filter(c => c.contentOpportunity === 'guide').slice(0, 5)
    const trendingIssues = clusters.sort((a, b) => b.frequency - a.frequency).slice(0, 5)

    return {
      urgentTopics,
      emotionalSupportNeeded,
      guideOpportunities,
      trendingIssues
    }
  }
}

// Export types
export type { SentimentScore, TopicCluster, EmotionalPattern }