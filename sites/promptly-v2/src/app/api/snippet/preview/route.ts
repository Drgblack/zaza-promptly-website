import { NextRequest, NextResponse } from 'next/server'

// Edge Runtime for fast response
export const runtime = 'edge'

// Sample responses for demo generation based on form data
const DEMO_RESPONSES = {
  'Mathematics-Secondary-Supportive-Medium': "I'm pleased to see the steady progress you've made in Mathematics this term. Your approach to problem-solving has become more methodical, and you're showing good perseverance when tackling challenging algebra questions. Keep building on this foundation - your hard work is definitely paying off.",
  
  'English-Primary-Motivational-Short': "Your reading has improved tremendously! Keep up the fantastic effort with your comprehension work.",
  
  'Science-GCSE-Formal-Long': "Throughout this academic period, your performance in Science has demonstrated a commendable level of consistency and application. Your laboratory work shows attention to detail and proper adherence to safety protocols. Your understanding of key concepts in biology and chemistry is developing well, though there remains scope for improvement in physics calculations. I would recommend focusing additional study time on mathematical applications within physics to strengthen this area. Overall, you are making satisfactory progress toward your GCSE objectives.",
  
  'General-Primary-Supportive-Medium': "It's wonderful to see how you've grown this term, both academically and socially. You're becoming more confident in participating during class discussions and your positive attitude is infectious. Your willingness to help classmates shows great character development.",
  
  // Default responses for various combinations
  'positive_default': "Your consistent effort and positive attitude in class have been wonderful to observe this term. You approach new challenges with enthusiasm and show real growth in your understanding. Keep up this excellent work - you're developing skills that will serve you well.",
  
  'improvement_default': "I can see you're working hard to master new concepts, and your persistence is commendable. With continued practice and support, I'm confident you'll see significant improvement. Let's work together to identify the best strategies to help you succeed.",
  
  'behavior_positive': "Your classroom behavior has shown marked improvement this term. You're demonstrating better self-regulation and are contributing positively to our learning environment. This progress reflects your growing maturity and consideration for others."
} as const

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

function generateDemoComment(subject: string, level: string, tone: string, length: string, scenario?: string): string {
  // Try exact match first
  const exactKey = `${subject}-${level}-${tone}-${length}`
  if (DEMO_RESPONSES[exactKey as keyof typeof DEMO_RESPONSES]) {
    return DEMO_RESPONSES[exactKey as keyof typeof DEMO_RESPONSES]
  }

  // If scenario includes behavior keywords, use behavior response
  if (scenario && /behav|improve|positive|attitude/i.test(scenario)) {
    return DEMO_RESPONSES.behavior_positive
  }

  // If scenario includes struggle/support keywords, use improvement response  
  if (scenario && /support|help|difficult|challenge|struggle/i.test(scenario)) {
    return DEMO_RESPONSES.improvement_default
  }

  // Default to positive response
  return DEMO_RESPONSES.positive_default
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { text, tone = 'professional', demo = false, subject, level, length, scenario } = body

    // Handle demo generation (new format)
    if (demo && subject && level && tone && length) {
      // Add realistic delay to simulate processing
      await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 1200))

      const generatedText = generateDemoComment(subject, level, tone, length, scenario)

      return NextResponse.json({
        success: true,
        text: generatedText,
        isDemo: true,
        demoMessage: "This is a preview using sample responses. The full version provides personalized AI-generated content.",
        metadata: {
          subject,
          level,
          tone,
          length,
          scenario: scenario || null
        }
      }, {
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
        }
      })
    }

    // Handle legacy comment improvement
    if (!text || typeof text !== 'string') {
      return NextResponse.json(
        { error: 'Text input is required for comment improvement' },
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