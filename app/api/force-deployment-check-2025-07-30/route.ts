import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const timestamp = new Date().toISOString()
  const deploymentId = process.env.VERCEL_DEPLOYMENT_ID || 'local-dev'
  const commitSha = process.env.VERCEL_GIT_COMMIT_SHA || 'unknown'
  
  return NextResponse.json({
    status: 'DEPLOYMENT_UPDATED',
    message: 'If you can see this, the deployment system is working!',
    timestamp,
    deploymentId: deploymentId.substring(0, 12),
    commitSha: commitSha.substring(0, 8),
    latestCommit: 'f5829a71',
    blogSystemStatus: 'Ready to test',
    nextSteps: [
      'Test /api/test-blog-system',
      'Test /api/deployment-health', 
      'Force revalidate with /api/revalidate-blog',
      'Test /blog-new route'
    ]
  }, {
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
      'Surrogate-Control': 'no-store'
    }
  })
}