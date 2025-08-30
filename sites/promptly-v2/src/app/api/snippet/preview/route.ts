import { NextRequest, NextResponse } from 'next/server'

// Edge Runtime for fast response
export const runtime = 'edge'

// Deterministic sample responses based on input patterns
const SAMPLE_RESPONSES = {
  default: {
    original: "Good progress this term. Keep working hard.",
    improved: "I've been really pleased to see the consistent effort you've been putting in this term. Your dedication to your learning is clearly paying off, and I can see real growth in your understanding. Keep up this excellent work ethic - it's exactly what will help you continue to flourish.",
    explanation: "Added specific praise for effort and consistency, mentioned observable growth, and provided encouraging forward-looking guidance."
  },
  behavior: {
    original: "Talks too much in class. Needs to focus.",
    improved: "I've noticed that your enthusiasm for sharing ideas sometimes means you're eager to contribute even when others are speaking. While I love your engagement, practicing active listening will help you build even stronger relationships with your classmates and allow everyone's voice to be heard.",
    explanation: "Reframed talking as enthusiasm, provided specific behavior guidance, and connected to positive social outcomes."
  },
  academic: {
    original: "Struggling with math concepts.",
    improved: "Mathematics is presenting some challenges right now, but I can see you're working hard to understand new concepts. Your persistence is admirable, and with continued practice and support, I'm confident you'll see improvement. Let's work together to identify specific areas where we can provide extra support.",
    explanation: "Acknowledged effort, provided hope and encouragement, and offered concrete next steps for support."
  }
}

function getResponseType(text: string): keyof typeof SAMPLE_RESPONSES {
  const lowerText = text.toLowerCase()
  
  if (lowerText.includes('talk') || lowerText.includes('disrupt') || lowerText.includes('behav')) {
    return 'behavior'
  }
  if (lowerText.includes('math') || lowerText.includes('struggle') || lowerText.includes('difficult')) {
    return 'academic'  
  }
  return 'default'
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { text, tone = 'professional' } = body

    // Validate input
    if (!text || typeof text !== 'string') {
      return NextResponse.json(
        { error: 'Text input is required' },
        { status: 400 }
      )
    }

    if (text.length > 500) {
      return NextResponse.json(
        { error: 'Text input too long (max 500 characters)' },
        { status: 400 }
      )
    }

    // Add realistic delay to simulate processing
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000))

    // Get appropriate sample response
    const responseType = getResponseType(text)
    const sampleResponse = SAMPLE_RESPONSES[responseType]

    const result = {
      success: true,
      original: text,
      improved: sampleResponse.improved,
      explanation: sampleResponse.explanation,
      tone: tone,
      timestamp: new Date().toISOString(),
      // Add metadata for frontend to show this is a demo
      isDemo: true,
      demoMessage: "This is a preview using sample responses. The full version provides personalized AI-generated improvements."
    }

    return NextResponse.json(result, {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      }
    })

  } catch (error) {
    console.error('Snippet preview error:', error)
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    )
  }
}