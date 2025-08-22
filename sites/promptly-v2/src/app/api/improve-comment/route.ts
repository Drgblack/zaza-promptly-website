import { NextResponse } from 'next/server'

interface ImproveCommentRequest {
  draft: string
  tone: string
  readingLevel: string
  length: string
  language: string
  role?: string
}

interface ImproveCommentResponse {
  improvedText: string
  rationaleBullets: string[]
  warnings: string[]
}

// Mock improvements for when no LLM is configured
function generateMockImprovement(request: ImproveCommentRequest): ImproveCommentResponse {
  const { draft, tone, readingLevel, length } = request
  
  let improved = draft.trim()
  const rationale = []
  const warnings = []
  
  // Basic transformations based on settings
  if (tone === 'Professional') {
    improved = improved
      .replace(/\bcan't\b/gi, 'cannot')
      .replace(/\bwon't\b/gi, 'will not')
      .replace(/\bdon't\b/gi, 'do not')
      .replace(/\bit's\b/gi, 'it is')
    rationale.push('Expanded contractions for professional tone')
  }
  
  if (tone === 'Supportive') {
    if (!improved.match(/\b(well done|good|great|excellent|pleased|proud)\b/i)) {
      improved = `Well done with your efforts. ${improved}`
      rationale.push('Added positive reinforcement at the beginning')
    }
  }
  
  if (tone === 'Firm-but-kind') {
    if (!improved.includes('.')) {
      improved += '.'
    }
    improved += ' Please continue to focus on this area for improvement.'
    rationale.push('Added constructive guidance while maintaining kindness')
  }
  
  if (readingLevel === 'Parent-friendly') {
    improved = improved
      .replace(/\bassessment\b/gi, 'test')
      .replace(/\bcurriculum\b/gi, 'syllabus')
      .replace(/\bpedagogical\b/gi, 'teaching')
    rationale.push('Simplified educational jargon for parent readability')
  }
  
  if (length === 'Short' && improved.length > 100) {
    const sentences = improved.split(/[.!?]+/)
    improved = sentences.slice(0, 2).join('. ').trim()
    if (!improved.endsWith('.')) improved += '.'
    rationale.push('Condensed to keep comment concise')
  }
  
  if (length === 'Long' && improved.length < 150) {
    improved += ' This demonstrates good understanding and with continued practice, even greater progress can be achieved.'
    rationale.push('Extended comment to provide more comprehensive feedback')
  }
  
  // Add warnings for common issues
  if (draft.match(/\bbad\b/i)) {
    warnings.push('Consider replacing "bad" with more specific, constructive language')
  }
  
  if (draft.match(/\bfail/i)) {
    warnings.push('The word "fail" might be discouraging - consider alternatives')
  }
  
  if (!draft.match(/[.!?]$/)) {
    improved = improved.trim() + '.'
    rationale.push('Added proper sentence ending punctuation')
  }
  
  // Ensure we have some rationale
  if (rationale.length === 0) {
    rationale.push('Enhanced clarity and structure of the original comment')
  }
  
  return {
    improvedText: improved,
    rationaleBullets: rationale,
    warnings
  }
}

async function improveWithLLM(request: ImproveCommentRequest): Promise<ImproveCommentResponse> {
  const { draft, tone, readingLevel, length, language, role } = request
  
  // Check for available LLM providers
  const openaiKey = process.env.OPENAI_API_KEY
  const anthropicKey = process.env.ANTHROPIC_API_KEY
  
  if (!openaiKey && !anthropicKey) {
    console.log('No LLM keys configured, using mock improvement')
    return generateMockImprovement(request)
  }
  
  const systemPrompt = `You are an expert educational comment writer helping teachers improve their feedback to students and parents.

Your task is to improve the given draft comment according to these specifications:
- Tone: ${tone}
- Reading Level: ${readingLevel} 
- Length: ${length}
- Language: ${language}
- Teacher Role: ${role || 'teacher'}

Guidelines:
- For "Supportive" tone: Use encouraging language, highlight positives, suggest improvements kindly
- For "Professional" tone: Use formal language, avoid contractions, be clear and precise
- For "Firm-but-kind" tone: Be direct about areas needing work while remaining constructive

- For "Parent-friendly" reading level: Avoid educational jargon, use simple clear language
- For year-specific levels: Match vocabulary and complexity to that age group
- For "Professional" level: Use appropriate educational terminology

- For "Short": 1-2 sentences, focus on key point
- For "Medium": 2-3 sentences, balanced feedback
- For "Long": 3-4+ sentences, comprehensive feedback

Return a JSON response with:
{
  "improvedText": "the improved comment text",
  "rationaleBullets": ["explanation of change 1", "explanation of change 2"],
  "warnings": ["any concerns about original text"]
}`

  const userPrompt = `Please improve this draft comment: "${draft}"`
  
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
          max_tokens: 500,
          temperature: 0.7
        })
      })
      
      if (response.ok) {
        const data = await response.json()
        const content = data.choices[0]?.message?.content
        
        if (content) {
          try {
            const parsed = JSON.parse(content)
            return {
              improvedText: parsed.improvedText || draft,
              rationaleBullets: parsed.rationaleBullets || ['AI-enhanced for clarity'],
              warnings: parsed.warnings || []
            }
          } catch (parseError) {
            console.error('Failed to parse LLM response:', parseError)
          }
        }
      }
    } else if (anthropicKey) {
      // Anthropic Claude integration could go here
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${anthropicKey}`,
          'Content-Type': 'application/json',
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: 'claude-3-haiku-20240307',
          max_tokens: 500,
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
          try {
            const parsed = JSON.parse(content)
            return {
              improvedText: parsed.improvedText || draft,
              rationaleBullets: parsed.rationaleBullets || ['AI-enhanced for clarity'],
              warnings: parsed.warnings || []
            }
          } catch (parseError) {
            console.error('Failed to parse Claude response:', parseError)
          }
        }
      }
    }
  } catch (error) {
    console.error('LLM API error:', error)
  }
  
  // Fallback to mock if LLM fails
  console.log('LLM failed, falling back to mock improvement')
  return generateMockImprovement(request)
}

export async function POST(req: Request) {
  try {
    const body: ImproveCommentRequest = await req.json()
    
    // Validate input
    if (!body.draft || typeof body.draft !== 'string') {
      return NextResponse.json(
        { error: 'Draft comment is required' },
        { status: 400 }
      )
    }
    
    if (body.draft.length > 2000) {
      return NextResponse.json(
        { error: 'Draft comment is too long (max 2000 characters)' },
        { status: 400 }
      )
    }
    
    // Clean and validate settings
    const request: ImproveCommentRequest = {
      draft: body.draft.trim(),
      tone: body.tone || 'Supportive',
      readingLevel: body.readingLevel || 'Parent-friendly',
      length: body.length || 'Medium',
      language: body.language || 'auto-detect',
      role: body.role || 'teacher'
    }
    
    console.log('Improving comment:', {
      draftLength: request.draft.length,
      tone: request.tone,
      readingLevel: request.readingLevel,
      length: request.length,
      language: request.language,
      role: request.role
    })
    
    const result = await improveWithLLM(request)
    
    return NextResponse.json(result)
    
  } catch (error) {
    console.error('Comment improvement error:', error)
    return NextResponse.json(
      { error: 'Failed to improve comment. Please try again.' },
      { status: 500 }
    )
  }
}