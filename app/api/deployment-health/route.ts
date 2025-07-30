import { NextRequest, NextResponse } from 'next/server'
import { getAllBlogPosts } from '@/lib/blog'

export async function GET(request: NextRequest) {
  try {
    const deploymentId = process.env.VERCEL_DEPLOYMENT_ID || 'local'
    const deploymentUrl = process.env.VERCEL_URL || 'localhost'
    const region = process.env.VERCEL_REGION || 'local'
    const gitCommitSha = process.env.VERCEL_GIT_COMMIT_SHA || 'unknown'
    const gitCommitMessage = process.env.VERCEL_GIT_COMMIT_MESSAGE || 'unknown'
    
    // Test blog system
    let blogStatus = 'error'
    let blogPosts = 0
    let publishedPosts = 0
    let blogError = null
    
    try {
      const posts = await getAllBlogPosts()
      blogPosts = posts.length
      publishedPosts = posts.filter(p => p.isPublished && !p.isDraft).length
      blogStatus = 'working'
    } catch (error: any) {
      blogError = error.message
    }
    
    // Check if running on correct domain
    const host = request.headers.get('host') || 'unknown'
    const forwardedHost = request.headers.get('x-forwarded-host') || host
    const isCorrectDomain = forwardedHost.includes('zazatechnologies.com')
    
    return NextResponse.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      deployment: {
        id: deploymentId,
        url: deploymentUrl,
        region: region,
        commit: {
          sha: gitCommitSha.substring(0, 8),
          message: gitCommitMessage
        }
      },
      domain: {
        host: host,
        forwardedHost: forwardedHost,
        isCorrectDomain: isCorrectDomain,
        expectedDomain: 'zazatechnologies.com'
      },
      blog: {
        status: blogStatus,
        totalPosts: blogPosts,
        publishedPosts: publishedPosts,
        error: blogError
      },
      environment: {
        nodeEnv: process.env.NODE_ENV,
        vercelEnv: process.env.VERCEL_ENV,
        buildId: process.env.VERCEL_DEPLOYMENT_ID?.substring(0, 8) || 'local'
      }
    })
    
  } catch (error: any) {
    return NextResponse.json({
      status: 'error',
      error: error.message,
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}