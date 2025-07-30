/**
 * Weekly Blog Generation Cron Job API
 * Triggered 3x per week (Mon/Wed/Fri) to generate and publish blog posts
 */

import { NextRequest, NextResponse } from 'next/server'
import { BlogAutomationOrchestrator } from '@/lib/blog-automation-orchestrator'
import { ContentScheduler } from '@/lib/content-scheduler'
import type { ScheduleConfig } from '@/lib/content-scheduler'

// Increase timeout for content generation
export const maxDuration = 300 // 5 minutes

export async function POST(request: NextRequest) {
  const startTime = Date.now()
  
  try {
    // Verify cron job authorization
    const authHeader = request.headers.get('authorization') || request.headers.get('x-vercel-cron-secret')
    const cronSecret = process.env.CRON_SECRET || process.env.VERCEL_CRON_SECRET
    
    if (!cronSecret || authHeader !== cronSecret) {
      console.log('[CRON] Unauthorized request to blog generation endpoint')
      return NextResponse.json({ 
        error: 'Unauthorized',
        message: 'Valid cron secret required'
      }, { status: 401 })
    }

    console.log('[CRON] Starting automated blog pipeline with quality control...')

    // Run the complete orchestrated pipeline
    const result = await BlogAutomationOrchestrator.runAutomatedPipeline()
    
    const executionTime = Date.now() - startTime
    console.log(`[CRON] Blog generation completed in ${executionTime}ms`)

    if (result.success) {
      console.log(`[CRON] Successfully generated and published ${result.postsGenerated} posts`)
      console.log(`[CRON] Quality score: ${(result.qualityMetrics.overallScore * 100).toFixed(1)}%`)
      console.log(`[CRON] Performance: ${result.performance.executionTime}ms, ${result.performance.apiCalls.successful}/${result.performance.apiCalls.total} API calls successful`)
      
      // Log post details
      result.publishedPosts?.forEach(post => {
        console.log(`[CRON] Published: "${post.title}" at ${post.url}`)
      })

      return NextResponse.json({
        success: true,
        message: `Successfully generated ${result.postsGenerated} blog posts with ${(result.qualityMetrics.overallScore * 100).toFixed(1)}% quality score`,
        data: {
          publishedPosts: result.publishedPosts,
          qualityMetrics: result.qualityMetrics,
          performance: result.performance,
          communityInsights: result.communityInsights,
          recommendations: result.recommendations,
          nextActions: result.nextActions,
          executionTimeMs: executionTime
        }
      })
    } else {
      console.error('[CRON] Blog generation pipeline failed')
      console.error('[CRON] Errors:', result.recommendations)
      
      return NextResponse.json({
        success: false,
        message: 'Automated blog generation pipeline failed',
        data: {
          performance: result.performance,
          recommendations: result.recommendations,
          nextActions: result.nextActions,
          executionTimeMs: executionTime
        }
      }, { status: 500 })
    }

  } catch (error: any) {
    const executionTime = Date.now() - startTime
    console.error('[CRON] Unexpected error in blog generation:', error)

    return NextResponse.json({
      success: false,
      message: 'Unexpected error during blog generation',
      error: error.message,
      executionTimeMs: executionTime
    }, { status: 500 })
  }
}

// GET endpoint for manual testing and status checking
export async function GET(request: NextRequest) {
  try {
    // Check if this is a status check or preview request
    const searchParams = request.nextUrl.searchParams
    const action = searchParams.get('action')

    if (action === 'preview') {
      // Generate preview of next week's content plan
      const plan = await ContentScheduler.previewWeeklyPlan()
      
      return NextResponse.json({
        message: 'Weekly content plan preview',
        plan: {
          weekStarting: plan.weekStarting,
          postsPlanned: plan.posts.length,
          topics: plan.posts.map(p => ({
            topic: p.topic.name,
            contentType: p.contentType,
            publishDate: p.date,
            estimated: p.estimated
          })),
          insights: plan.insights,
          contentSources: plan.contentSources
        }
      })
    }

    if (action === 'stats') {
      // Get scheduler statistics
      const stats = await ContentScheduler.getSchedulerStats()
      
      return NextResponse.json({
        message: 'Blog scheduler statistics',
        stats
      })
    }

    // Default: return endpoint information
    return NextResponse.json({
      endpoint: 'Weekly Blog Generation Cron Job',
      status: 'active',
      schedule: 'Monday/Wednesday/Friday at 9:00 AM EST',
      lastDeployment: new Date().toISOString(),
      availableActions: {
        POST: 'Generate and publish weekly content (requires cron secret)',
        'GET?action=preview': 'Preview next week\'s content plan',
        'GET?action=stats': 'View scheduler statistics'
      },
      configuration: {
        postsPerWeek: process.env.BLOG_POSTS_PER_WEEK || '3',
        publishDays: process.env.BLOG_PUBLISH_DAYS || 'monday,wednesday,friday',
        publishTime: process.env.BLOG_PUBLISH_TIME || '09:00',
        autoPublish: process.env.BLOG_AUTO_PUBLISH !== 'false',
        requireManualApproval: process.env.BLOG_REQUIRE_APPROVAL === 'true'
      }
    })

  } catch (error: any) {
    console.error('[CRON] Error in GET request:', error)
    
    return NextResponse.json({
      error: 'Failed to process request',
      message: error.message
    }, { status: 500 })
  }
}

// PUT endpoint for emergency controls
export async function PUT(request: NextRequest) {
  try {
    const { action } = await request.json()
    
    if (action === 'emergency-stop') {
      await ContentScheduler.emergencyStop()
      return NextResponse.json({
        success: true,
        message: 'Emergency stop activated - automatic publishing paused'
      })
    }

    if (action === 'resume') {
      await ContentScheduler.resumeSchedule()
      return NextResponse.json({
        success: true,
        message: 'Automatic publishing resumed'
      })
    }

    return NextResponse.json({
      error: 'Invalid action',
      availableActions: ['emergency-stop', 'resume']
    }, { status: 400 })

  } catch (error: any) {
    console.error('[CRON] Error in PUT request:', error)
    
    return NextResponse.json({
      error: 'Failed to process control action',
      message: error.message
    }, { status: 500 })
  }
}