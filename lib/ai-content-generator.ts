/**
 * AI Content Generation Engine for Teacher-Focused Blog Posts
 * Generates authentic, community-driven content based on teacher pain points
 */

import type { TopicCluster, EmotionalPattern } from './sentiment-analyzer'
import type { TeacherPost } from './community-scrapers'

interface BlogPostRequest {
  topic: TopicCluster
  emotionalContext?: EmotionalPattern
  contentType: 'guide' | 'emotional-support' | 'practical-tips' | 'community-story'
  targetLength: 'short' | 'medium' | 'long' // 800-1200, 1200-2000, 2000+ words
  includeSoftPromotion?: boolean // Whether to include soft Zaza mentions
}

interface GeneratedBlogPost {
  title: string
  excerpt: string
  content: string
  tags: string[]
  category: string
  author: string
  estimatedReadingTime: number
  seoKeywords: string[]
  hasZazaMention: boolean
  emotionalTone: 'supportive' | 'practical' | 'empowering' | 'understanding'
  targetAudience: 'new-teachers' | 'experienced-teachers' | 'all-teachers' | 'administrators'
}

export class AIContentGenerator {
  private static readonly OPENAI_API_KEY = process.env.OPENAI_API_KEY
  private static readonly ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY

  /**
   * Generate blog post content based on community insights
   */
  static async generateBlogPost(request: BlogPostRequest): Promise<GeneratedBlogPost> {
    try {
      const prompt = this.buildContentPrompt(request)
      const content = await this.callAIService(prompt, request.targetLength)
      
      return this.parseAIResponse(content, request)
    } catch (error) {
      console.error('[AI CONTENT GENERATOR ERROR]', error)
      throw new Error(`Failed to generate blog post: ${error}`)
    }
  }

  /**
   * Build comprehensive content generation prompt
   */
  private static buildContentPrompt(request: BlogPostRequest): string {
    const { topic, emotionalContext, contentType, includeSoftPromotion } = request

    // Get sample posts for context
    const samplePosts = topic.posts.slice(0, 3).map(post => 
      `"${post.content}" - ${post.author} (${post.platform})`
    ).join('\n\n')

    const basePrompt = `
You are an expert educational content writer who creates supportive, authentic blog posts for teachers. 

CONTEXT:
Topic: ${topic.name}
Pain Points: ${topic.posts.map(p => p.painPoint).slice(0, 3).join('; ')}
Emotional Context: ${emotionalContext ? `Teachers are feeling ${emotionalContext.emotion} about this topic` : 'Mixed emotions'}
Content Type: ${contentType}
Urgency Level: ${topic.urgency}

REAL TEACHER VOICES (use these for authenticity, but don't quote directly):
${samplePosts}

CONTENT REQUIREMENTS:
1. Write in a warm, understanding tone that shows you "get it"
2. Be practical and actionable - teachers need solutions, not just sympathy
3. Include specific examples and scenarios teachers will recognize
4. Avoid being preachy or condescending
5. Focus on realistic solutions that work in real classrooms
6. Use "you" to speak directly to teachers
7. Include emotional validation alongside practical advice

${includeSoftPromotion ? `
SUBTLE PRODUCT MENTIONS (if naturally relevant):
- Zaza Promptly: AI-powered tool for generating student comments and parent communication
- Zaza Teach: Comprehensive teaching toolkit with lesson planning and assessment tools
Only mention if it genuinely solves the specific problem discussed. Never be promotional or salesy.
` : 'Do NOT mention any products or tools. Focus purely on organic solutions.'}

CONTENT TYPE SPECIFIC GUIDANCE:
${this.getContentTypeGuidance(contentType)}

Generate a complete blog post with:
- Compelling, empathetic title (60-80 characters)
- Engaging excerpt (150-200 characters)  
- Full article content with proper markdown formatting
- SEO-optimized keywords
- Appropriate tags
- Reading time estimate

Make it feel like it was written by a teacher who truly understands the struggles.
`

    return basePrompt
  }

  /**
   * Get content type specific guidance
   */
  private static getContentTypeGuidance(contentType: string): string {
    const guidance = {
      'guide': `
GUIDE FORMAT:
- Start with empathy and problem acknowledgment
- Provide 5-8 actionable steps or strategies
- Include real classroom examples
- End with encouragement and next steps
- Use headers, bullet points, and clear structure
      `,
      'emotional-support': `
EMOTIONAL SUPPORT FORMAT:
- Validate feelings immediately - "You're not alone in this"
- Share why this struggle is so common
- Provide perspective and hope
- Include practical coping strategies
- End with community connection and encouragement
- Use a conversational, caring tone throughout
      `,
      'practical-tips': `
PRACTICAL TIPS FORMAT:
- Lead with the most impactful tip
- Provide 7-10 specific, actionable strategies
- Include time-saving shortcuts
- Mention common pitfalls to avoid
- Give implementation timelines
- Focus on efficiency and effectiveness
      `,
      'community-story': `
COMMUNITY STORY FORMAT:
- Start with a relatable scenario
- Weave in multiple teacher perspectives
- Show the universal nature of the challenge
- Highlight different approaches and solutions
- Create connection and shared understanding
- End with collective wisdom and support
      `
    }

    return guidance[contentType] || guidance['guide']
  }

  /**
   * Call AI service (OpenAI or Anthropic)
   */
  private static async callAIService(prompt: string, targetLength: string): Promise<string> {
    const wordCount = this.getTargetWordCount(targetLength)
    
    // Try OpenAI first, fallback to Anthropic
    if (this.OPENAI_API_KEY) {
      return await this.callOpenAI(prompt, wordCount)
    } else if (this.ANTHROPIC_API_KEY) {
      return await this.callAnthropic(prompt, wordCount)
    } else {
      // Fallback to mock content for development
      return this.generateMockContent(prompt, targetLength)
    }
  }

  /**
   * Call OpenAI API
   */
  private static async callOpenAI(prompt: string, wordCount: number): Promise<string> {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: `You are an expert educational content writer. Generate approximately ${wordCount} words.`
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: Math.min(wordCount * 2, 4000),
        temperature: 0.7,
      }),
    })

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`)
    }

    const data = await response.json()
    return data.choices[0].message.content
  }

  /**
   * Call Anthropic API
   */
  private static async callAnthropic(prompt: string, wordCount: number): Promise<string> {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': this.ANTHROPIC_API_KEY!,
        'Content-Type': 'application/json',
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-sonnet-20240229',
        max_tokens: Math.min(wordCount * 2, 4000),
        messages: [
          {
            role: 'user',
            content: `${prompt}\n\nTarget length: approximately ${wordCount} words.`
          }
        ],
      }),
    })

    if (!response.ok) {
      throw new Error(`Anthropic API error: ${response.statusText}`)
    }

    const data = await response.json()
    return data.content[0].text
  }

  /**
   * Generate mock content for development/testing
   */
  private static generateMockContent(prompt: string, targetLength: string): string {
    const mockContent = {
      short: `
# When Grading Feels Like Climbing Everest (And You're Out of Oxygen)

*Every teacher knows that Sunday night feeling when you see the pile of papers that needs grading before Monday morning.*

## You're Not Alone in This Mountain

If you're reading this at 10 PM on a Sunday with a stack of essays staring at you, first things first: breathe. That crushing feeling in your chest? It's not just you. Every teacher I know has been exactly where you are right now.

The grading pile seems to grow exponentially. You grade five papers, and somehow there are still twenty more. You spend two hours writing thoughtful feedback, and you've barely made a dent. Meanwhile, your family is asking when you'll be done, and all you can think is "when will I ever be done?"

## Why Grading Feels So Overwhelming

Here's the truth nobody talks about in teacher training: grading isn't just about checking answers. You're being a writing coach, a therapist, a cheerleader, and an assessor all at once. No wonder it takes forever.

You want to give meaningful feedback because you care about your students. But meaningful feedback takes time you don't have. It's an impossible equation that leaves you feeling like you're failing your students and your family.

## Practical Strategies That Actually Work

**Focus on Two Things Only**: Pick two specific areas to comment on per paper. That's it. Students can't process ten different pieces of feedback anyway.

**Use Voice Comments**: Record 30-second voice notes instead of writing. Students love hearing your voice, and you can give more nuanced feedback faster than typing.

**Student Self-Assessment First**: Have students evaluate their own work using your rubric before you grade. They catch many errors themselves.

**Grade Selectively**: Not every assignment needs a grade. Some work is just practice, and that's okay.

## Remember Why You're Here

On those Sunday nights when grading feels impossible, remember that your feedback matters. Even if it's just two focused comments, you're helping a young person grow. That pile of papers represents minds you're shaping.

The grading will get done. Maybe not perfectly, maybe not as thoroughly as you'd like, but it will get done. And your students will be better for your efforts, even if they don't say thank you.

Take care of yourself too. You can't pour from an empty cup.

---

*Tags: grading, teacher burnout, work-life balance, productivity, self-care*
*Category: Teacher Wellness*
*Reading Time: 3 minutes*
      `,
      medium: `
# The Sunday Night Teacher Anxiety (And Why Monday Doesn't Have to Feel Like a Mountain)

*It's 8 PM on Sunday, and that familiar knot is forming in your stomach. Welcome to the Sunday Scaries, teacher edition.*

## The Weight of Sunday Evening

You know the feeling. Sunday afternoon was nice – maybe you had coffee with friends, went for a walk, or just relaxed. But as evening approaches, the weight of Monday morning starts pressing down on your chest.

Suddenly, your mind is racing: Did I make enough copies for tomorrow? What about that parent email I need to respond to? The lesson plan that's half-finished? The assessment data that's due? That IEP meeting on Wednesday I haven't prepared for?

Before you know it, you're mentally at school while physically still on your couch, and the weekend feels like it never happened.

## Why This Happens to Teachers

Teaching is one of the few professions where your "customers" are mandatory participants who don't always want to be there. Every day, you're performing, managing, teaching, counseling, and problem-solving for 6-8 hours straight with maybe a 30-minute break.

Unlike other jobs where you can coast through a rough day, teaching demands your full presence every moment. A teacher having an off day affects 25-150 students directly. That's enormous pressure, even if we don't consciously think about it.

## The Sunday Anxiety Spiral

Here's how it usually goes:
1. You think about one thing you need to do Monday
2. That reminds you of three other things
3. Those three things remind you of seven more
4. Suddenly you're convinced you're behind on everything
5. You feel guilty for relaxing on the weekend
6. You start working, which confirms that weekends aren't really for rest
7. The cycle continues

## Breaking the Cycle: Practical Sunday Strategies

**The Sunday Shutdown Ritual**: At 6 PM Sunday, write down everything on your mind. Everything. Then close the notebook and commit to not opening it until Monday morning. Your brain needs to know there's a containment system.

**Monday Morning Preparation (Friday Afternoon)**: Before you leave Friday, spend 15 minutes setting up Monday morning. Lay out copies, write the agenda on the board, set up materials. Monday morning you will thank Friday afternoon you.

**The 3-Item Rule**: Sunday evening, pick only three things that MUST happen Monday. Not ten, not seven, three. Everything else is bonus.

**Mindful Transition Time**: Give yourself one hour Sunday evening to mentally transition to the week. Listen to music, take a bath, journal – something that helps you shift gears intentionally rather than anxiously.

**Saturday Planning Session**: Spend 30 minutes Saturday morning doing your weekly prep. When it's done in the middle of your weekend, you can truly relax Sunday knowing you're prepared.

## Reframing Monday Morning

Instead of Monday being the enemy, try thinking of it as a fresh start. Every Monday is a chance to:
- Try that new strategy you've been thinking about
- Connect with students in a new way
- Start over with the challenging class
- Be the teacher you want to be

## The Reality Check

Some Sundays will still be hard. Some Monday mornings will still feel overwhelming. That's not a sign you're failing – it's a sign you care deeply about your work.

But you deserve to enjoy your weekends. You deserve Sunday evenings that don't feel like the countdown to doom. You deserve to feel excited about Monday morning sometimes.

## Community and Connection

Remember that thousands of teachers are feeling exactly what you're feeling right now. You're not alone in this Sunday evening anxiety. In fact, it's so common there should be a support group (maybe there is – check Facebook!).

Reach out to your teacher friends. Text them Sunday evening: "Having the Sunday scaries. You too?" The response will probably be immediate and reassuring.

## Permission to Rest

Here's your official permission: You don't have to be productive every moment of the weekend. You don't have to have everything perfect for Monday. You don't have to carry the weight of every student's success on your shoulders.

You're human. You're allowed to rest. You're allowed to enjoy Sunday evening without thinking about school.

Monday will come whether you worry about it or not. But you'll handle it better if you've actually rested on Sunday.

---

*The Sunday scaries are real, but they don't have to rule your weekend. What strategies help you transition peacefully into your teaching week?*

*Tags: sunday anxiety, teacher mental health, work-life balance, weekend recovery, teacher wellness*
*Category: Teacher Wellness*  
*Reading Time: 7 minutes*
      `,
      long: `[Longer content would be generated here for 'long' target length]`
    }

    return mockContent[targetLength as keyof typeof mockContent] || mockContent.medium
  }

  /**
   * Parse AI response and extract structured data
   */
  private static parseAIResponse(content: string, request: BlogPostRequest): GeneratedBlogPost {
    // Extract title (look for # header)
    const titleMatch = content.match(/^#\s+(.+)$/m)
    const title = titleMatch ? titleMatch[1] : this.generateFallbackTitle(request.topic.name)

    // Extract excerpt (look for italic text or first paragraph)
    const excerptMatch = content.match(/\*([^*]+)\*/) || content.match(/^(?!#)(.+)$/m)
    const excerpt = excerptMatch ? excerptMatch[1].substring(0, 200) : this.generateFallbackExcerpt(request.topic.name)

    // Count words for reading time
    const wordCount = content.split(/\s+/).length
    const estimatedReadingTime = Math.ceil(wordCount / 200) // 200 words per minute

    // Check for Zaza mentions
    const hasZazaMention = /zaza|promptly|teach/i.test(content)

    // Generate tags from topic and content
    const tags = this.extractTags(content, request.topic)

    // Determine category
    const category = this.mapTopicToCategory(request.topic.id)

    // Determine emotional tone
    const emotionalTone = this.determineEmotionalTone(content)

    // Determine target audience
    const targetAudience = this.determineTargetAudience(content, request.topic)

    // Generate SEO keywords
    const seoKeywords = this.generateSEOKeywords(title, request.topic)

    return {
      title: title.replace(/[#*]/g, '').trim(),
      excerpt: excerpt.replace(/[*_]/g, '').trim(),
      content: content,
      tags,
      category,
      author: 'Zaza Technologies Team',
      estimatedReadingTime,
      seoKeywords,
      hasZazaMention,
      emotionalTone,
      targetAudience
    }
  }

  /**
   * Extract relevant tags from content and topic
   */
  private static extractTags(content: string, topic: TopicCluster): string[] {
    const baseTags = [...topic.keywords.slice(0, 3)]
    
    // Add content-specific tags
    const contentTags: string[] = []
    
    if (/stress|anxiety|overwhelm/i.test(content)) contentTags.push('teacher stress')
    if (/balance|family|weekend/i.test(content)) contentTags.push('work-life balance')
    if (/strategy|tip|solution/i.test(content)) contentTags.push('teaching strategies')
    if (/burnout|exhausted/i.test(content)) contentTags.push('teacher burnout')
    if (/support|community|together/i.test(content)) contentTags.push('teacher support')
    if (/time|efficient|productivity/i.test(content)) contentTags.push('time management')
    if (/student|classroom/i.test(content)) contentTags.push('classroom management')

    // Combine and deduplicate
    const allTags = [...baseTags, ...contentTags]
    return [...new Set(allTags)].slice(0, 8) // Limit to 8 tags
  }

  /**
   * Map topic ID to blog category
   */
  private static mapTopicToCategory(topicId: string): string {
    const categoryMap: Record<string, string> = {
      'grading-overwhelm': 'Teacher Wellness',
      'lesson-planning-stress': 'Lesson Planning',
      'parent-communication': 'Parent Relations',
      'classroom-management': 'Classroom Management',
      'admin-pressure': 'Professional Navigation',
      'work-life-balance': 'Teacher Wellness',
      'technology-struggles': 'Technology & Teaching',
      'differentiation-challenges': 'Teaching Strategies',
      'testing-pressure': 'Assessment & Testing',
      'supply-shortages': 'Resources & Budget'
    }

    return categoryMap[topicId] || 'Teaching Strategies'
  }

  /**
   * Determine emotional tone of content
   */
  private static determineEmotionalTone(content: string): 'supportive' | 'practical' | 'empowering' | 'understanding' {
    if (/you're not alone|understand|feel|support/i.test(content)) return 'supportive'
    if (/strategy|step|tip|how to|solution/i.test(content)) return 'practical'
    if (/you can|believe|strong|capable|deserve/i.test(content)) return 'empowering'
    return 'understanding'
  }

  /**
   * Determine target audience
   */
  private static determineTargetAudience(content: string, topic: TopicCluster): 'new-teachers' | 'experienced-teachers' | 'all-teachers' | 'administrators' {
    if (/first year|new teacher|beginning|starting/i.test(content)) return 'new-teachers'
    if (/veteran|experienced|years of/i.test(content)) return 'experienced-teachers'
    if (/admin|principal|leadership/i.test(content)) return 'administrators'
    return 'all-teachers'
  }

  /**
   * Generate SEO keywords
   */
  private static generateSEOKeywords(title: string, topic: TopicCluster): string[] {
    const titleWords = title.toLowerCase().split(/\s+/).filter(word => word.length > 3)
    const topicKeywords = topic.keywords.slice(0, 3)
    const teacherKeywords = ['teacher', 'teaching', 'classroom', 'education', 'educator']
    
    return [...titleWords, ...topicKeywords, ...teacherKeywords].slice(0, 10)
  }

  /**
   * Generate fallback title if extraction fails
   */
  private static generateFallbackTitle(topicName: string): string {
    const templates = [
      `${topicName}: A Teacher's Guide to Finding Balance`,
      `Overcoming ${topicName}: Strategies That Actually Work`,
      `${topicName} and How to Handle It (Without Burning Out)`,
      `The Reality of ${topicName}: Support for Struggling Teachers`
    ]
    
    return templates[Math.floor(Math.random() * templates.length)]
  }

  /**
   * Generate fallback excerpt if extraction fails
   */
  private static generateFallbackExcerpt(topicName: string): string {
    return `Every teacher faces ${topicName.toLowerCase()}. Here's how to handle it with practical strategies and emotional support from someone who understands.`
  }

  /**
   * Get target word count for length category
   */
  private static getTargetWordCount(targetLength: string): number {
    const wordCounts = {
      short: 1000,
      medium: 1500,
      long: 2500
    }
    
    return wordCounts[targetLength as keyof typeof wordCounts] || 1500
  }

  /**
   * Generate multiple blog post options
   */
  static async generateMultiplePosts(topics: TopicCluster[], count: number = 3): Promise<GeneratedBlogPost[]> {
    const posts: GeneratedBlogPost[] = []
    const topTopics = topics.slice(0, count)

    for (const topic of topTopics) {
      const request: BlogPostRequest = {
        topic,
        contentType: topic.contentOpportunity,
        targetLength: 'medium',
        includeSoftPromotion: Math.random() > 0.7 // 30% chance of soft promotion
      }

      try {
        const post = await this.generateBlogPost(request)
        posts.push(post)

        // Add small delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 1000))
      } catch (error) {
        console.error(`Failed to generate post for topic ${topic.name}:`, error)
      }
    }

    return posts
  }

  /**
   * Generate content calendar for the week
   */
  static async generateWeeklyContent(topics: TopicCluster[]): Promise<{
    monday: GeneratedBlogPost
    wednesday: GeneratedBlogPost
    friday: GeneratedBlogPost
  }> {
    const topThreeTopics = topics.slice(0, 3)

    const [mondayPost, wednesdayPost, fridayPost] = await Promise.all([
      this.generateBlogPost({
        topic: topThreeTopics[0],
        contentType: 'emotional-support',
        targetLength: 'medium',
        includeSoftPromotion: false
      }),
      this.generateBlogPost({
        topic: topThreeTopics[1],
        contentType: 'guide',
        targetLength: 'long',
        includeSoftPromotion: true
      }),
      this.generateBlogPost({
        topic: topThreeTopics[2],
        contentType: 'practical-tips',
        targetLength: 'short',
        includeSoftPromotion: false
      })
    ])

    return {
      monday: mondayPost,
      wednesday: wednesdayPost,
      friday: fridayPost
    }
  }
}

// Export types
export type { BlogPostRequest, GeneratedBlogPost }