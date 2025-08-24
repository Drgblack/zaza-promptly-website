import { NextResponse } from 'next/server'

interface ZaraRequest {
  message: string
  context?: 'snippet-tool' | 'general'
  userRole?: string
}

interface ZaraResponse {
  response: string
  suggestions?: string[]
  warnings?: string[]
}

// Safety-first prompt system
const SYSTEM_PROMPTS = {
  base: `You are Zara, an AI assistant helping teachers with Promptly. You prioritize student privacy and safety above all else.

SAFETY RULES (NEVER violate):
1. NEVER ask for or process student names, addresses, grades, or personal details
2. ALWAYS remind users to keep conversations general if they share sensitive information
3. REFUSE to help with anything that could identify, embarrass, or harm students
4. Focus on pedagogical strategies, not individual student cases

Your responses should be:
- Helpful for teaching practice
- Privacy-respecting
- Encouraging and supportive
- Brief and actionable (2-3 sentences max)`,

  snippetTool: `You are helping with comment improvement in Promptly's Snippet Tool.

Focus on:
- Explaining pedagogical reasoning behind edits
- Suggesting tone improvements
- Recommending communication strategies with parents
- Helping with language accessibility

NEVER:
- Ask about specific students
- Request personal information
- Suggest identifying details in comments`,

  general: `You are a general teaching assistant helping with Promptly.

You can help with:
- General teaching strategies
- Using Promptly's features
- Communication best practices
- Technology in education

Keep responses practical and brief.`
}

// Mock responses for when no LLM is configured
function generateMockResponse(request: ZaraRequest): ZaraResponse {
  const { message, context } = request
  
  // Check for potential PII in message
  const piiPatterns = [
    /\b[A-Z][a-z]+ [A-Z][a-z]+\b/, // Names like "John Smith"
    /\bgrade[s]?\s*[A-F0-9]+/i, // Grades like "grade A" or "grades 85"
    /\bstudent[s]?\s+[A-Z][a-z]+/i // "student John"
  ]
  
  const warnings = []
  
  for (const pattern of piiPatterns) {
    if (pattern.test(message)) {
      warnings.push('I noticed you might have shared student-specific details. Let\'s keep our conversation general to protect privacy.')
      break
    }
  }
  
  // Generate contextual responses
  let response = ''
  let suggestions: string[] = []
  
  if (context === 'snippet-tool') {
    if (message.toLowerCase().includes('why') || message.toLowerCase().includes('edit')) {
      response = 'Comment improvements focus on clarity, tone, and parent-friendliness. Each change aims to make feedback more constructive and easier to understand.'
      suggestions = ['Show me the explanation panel', 'Try a different tone', 'Make it shorter']
    } else if (message.toLowerCase().includes('tone')) {
      response = 'Different tones serve different purposes: Supportive builds confidence, Professional maintains authority, and Firm-but-kind balances expectations with encouragement.'
      suggestions = ['Switch to Supportive tone', 'Switch to Professional tone', 'Switch to Firm-but-kind']
    } else if (message.toLowerCase().includes('translate') || message.toLowerCase().includes('parent')) {
      response = 'Parent-friendly language avoids educational jargon and uses clear, everyday terms that all families can understand.'
      suggestions = ['Use Parent-friendly reading level', 'Explain educational terms', 'Keep language simple']
    } else {
      response = 'I\'m here to help you improve your comments. What would you like to know about the suggested changes or communication strategies?'
      suggestions = ['Why these edits?', 'Softer tone', 'Shorter']
    }
  } else {
    // General context
    if (message.toLowerCase().includes('help') || message.toLowerCase().includes('how')) {
      response = 'I can help with teaching strategies, using Promptly\'s features, and communication best practices. What specific area would you like guidance on?'
      suggestions = ['Improve my comments', 'Communication tips', 'Teaching strategies']
    } else if (message.toLowerCase().includes('comment') || message.toLowerCase().includes('feedback')) {
      response = 'Effective feedback is specific, actionable, and encouraging. Focus on what students did well and provide clear next steps for improvement.'
      suggestions = ['Try the Snippet Tool', 'Learn about tone options', 'Parent communication tips']
    } else {
      response = 'I\'m here to support your teaching practice. Feel free to ask about comment writing, parent communication, or using Promptly\'s features.'
      suggestions = ['How do I write better comments?', 'What tone should I use?', 'How can I save time?']
    }
  }
  
  return {
    response,
    suggestions: warnings.length > 0 ? [] : suggestions, // No suggestions if privacy warning
    warnings
  }
}

async function getZaraResponse(request: ZaraRequest): Promise<ZaraResponse> {
  const { message, context = 'general', userRole = 'teacher' } = request
  
  // Check for available LLM providers
  const openaiKey = process.env.OPENAI_API_KEY
  const anthropicKey = process.env.ANTHROPIC_API_KEY
  
  if (!openaiKey && !anthropicKey) {
    console.log('No LLM keys configured, using mock Zara response')
    return generateMockResponse(request)
  }
  
  const contextPrompt = context === 'snippet-tool' ? SYSTEM_PROMPTS.snippetTool : SYSTEM_PROMPTS.general
  const systemPrompt = `${SYSTEM_PROMPTS.base}\n\n${contextPrompt}`
  
  const userPrompt = `User role: ${userRole}
Context: ${context}
Message: "${message}"

Respond as Zara with a brief, helpful answer. If you detect any student-specific information, politely redirect to general advice.`
  
  try {
    if (openaiKey) {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${openaiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt }
          ],
          max_tokens: 300,
          temperature: 0.7
        })
      })
      
      if (response.ok) {
        const data = await response.json()
        const content = data.choices[0]?.message?.content
        
        if (content) {
          return {
            response: content,
            suggestions: [],
            warnings: []
          }
        }
      }
    } else if (anthropicKey) {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${anthropicKey}`,
          'Content-Type': 'application/json',
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: 'claude-3-haiku-20240307',
          max_tokens: 300,
          messages: [
            {
              role: 'user',
              content: `${systemPrompt}\n\n${userPrompt}`
            }
          ]
        })
      })
      
      if (response.ok) {
        const data = await response.json()
        const content = data.content[0]?.text
        
        if (content) {
          return {
            response: content,
            suggestions: [],
            warnings: []
          }
        }
      }
    }
  } catch (error) {
    console.error('LLM API error:', error)
  }
  
  // Fallback to mock if LLM fails
  console.log('LLM failed, falling back to mock Zara response')
  return generateMockResponse(request)
}

export async function POST(req: Request) {
  try {
    const body: ZaraRequest = await req.json()
    
    // Validate input
    if (!body.message || typeof body.message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }
    
    if (body.message.length > 1000) {
      return NextResponse.json(
        { error: 'Message too long (max 1000 characters)' },
        { status: 400 }
      )
    }
    
    // Clean input
    const request: ZaraRequest = {
      message: body.message.trim(),
      context: body.context || 'general',
      userRole: body.userRole || 'teacher'
    }
    
    console.log('Zara request:', {
      messageLength: request.message.length,
      context: request.context,
      userRole: request.userRole
    })
    
    const result = await getZaraResponse(request)
    
    return NextResponse.json(result)
    
  } catch (error) {
    console.error('Zara API error:', error)
    return NextResponse.json(
      { error: 'Failed to process request. Please try again.' },
      { status: 500 }
    )
  }
}
