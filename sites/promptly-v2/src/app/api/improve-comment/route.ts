import { NextResponse } from 'next/server'
import { z } from 'zod'

// Input validation schema
const InputSchema = z.object({
  draft: z.string().min(1).max(2000),
  tone: z.enum(['Supportive', 'Professional', 'Firm-but-kind']),
  readingLevel: z.string(),
  length: z.enum(['Short', 'Medium', 'Long']),
  language: z.string().default('Auto-detect'),
  subject: z.string().optional(),
  goal: z.string().optional(),
  strengths: z.string().optional(),
  concerns: z.string().optional()
})

// Response types
interface QualityScore {
  score: number // 0-1
  reasons: string[]
}

interface ImproveCommentResponse {
  improvedText: string
  rationaleBullets: string[]
  quality: QualityScore
  warnings: string[]
}

interface RubricScore {
  specificity: number
  strategies: number
  structure: number
  tone: number
  language: number
  overall: number
  failedCriteria: string[]
}

const SYSTEM_PROMPT_V2 = `# Zaza Promptly – Comment Rewrite v2

You are an expert educational comment writer specializing in creating substantial, specific, parent-ready feedback that includes clear actionable strategies.

## Core Requirements:
- Transform drafts into comprehensive, specific feedback with concrete strategies
- Never just append words - rewrite for clarity, specificity, and impact
- Include 2-3 specific, actionable strategies parents can use at home
- Make comments parent-ready: clear, jargon-free, constructive
- Focus on specific examples and observable behaviors

## Structure Template:
1. **Opening**: Acknowledge specific work/behavior observed
2. **Main Content**: Specific examples of strengths and/or areas for development  
3. **Strategies**: 2-3 clear, actionable steps parents can take
4. **Closing**: Encouraging next steps or continued partnership

## Tone Guidelines:
- **Supportive**: Emphasize strengths, gentle guidance, "building on..." language
- **Professional**: Formal structure, educational terminology, objective observations
- **Firm-but-kind**: Direct about concerns while maintaining warmth and solutions focus

## Quality Standards:
- Specificity: Include concrete examples, observable behaviors, measurable progress
- Strategies: Practical, home-focused actions parents can implement
- Structure: Clear beginning, middle, end with logical flow
- Parent-ready: Accessible language, clear next steps, collaborative tone

## Forbidden Practices:
- Never label students as "problems" or use shaming language
- Avoid generic phrases like "needs improvement" without specifics
- No PII beyond what's in the original draft
- Don't just add length - add value and specificity

Return JSON with improved comment that transforms the draft into professional, strategic feedback.`

const CRITIQUE_PROMPT = `Evaluate this comment against our rubric and score each criterion 0-1:

1. **Specificity** (0-1): Does it include concrete examples, observable behaviors, or specific instances rather than generic statements?
2. **Strategies** (0-1): Does it provide 2-3 clear, actionable strategies parents can implement at home?
3. **Structure** (0-1): Does it have a clear flow with opening acknowledgment, main content, strategies, and encouraging close?
4. **Tone** (0-1): Does it match the requested tone while remaining constructive and professional?
5. **Language** (0-1): Is it parent-friendly, jargon-free, and appropriate for the reading level?

Comment to evaluate: "{comment}"

Return JSON:
{
  "specificity": 0-1,
  "strategies": 0-1, 
  "structure": 0-1,
  "tone": 0-1,
  "language": 0-1,
  "failedCriteria": ["list specific issues if score < 0.8"]
}`

const REFINE_PROMPT = `The previous comment scored below our quality threshold. Please refine it to:

1. **Increase Specificity**: Add concrete examples, observable behaviors, specific instances
2. **Enhance Strategies**: Ensure 2-3 clear, actionable steps parents can take at home
3. **Improve Structure**: Strengthen opening acknowledgment, main content flow, strategic guidance, and encouraging close
4. **Perfect Language**: Match reading level, eliminate jargon, ensure parent-friendly tone

Failed criteria to address: {failedCriteria}

Original draft: "{originalDraft}"
Previous attempt: "{previousComment}"
Settings: Tone={tone}, Reading Level={readingLevel}, Length={length}

Return refined comment that meets all quality standards.`

// Scoring rubric
function scoreComment(comment: string, originalDraft: string): RubricScore {
  const failedCriteria: string[] = []
  
  // Specificity: Check for concrete examples, specific language
  const specificityMarkers = [
    /\b(during|when|while|in the|on the|showed|demonstrated|exhibited|completed)\b/gi,
    /\b(for example|specifically|particularly|notably)\b/gi,
    /\b\d+(\s)?(times?|minutes?|questions?|problems?|pages?)\b/gi
  ]
  const specificityScore = Math.min(1, specificityMarkers.reduce((acc, regex) => 
    acc + (comment.match(regex)?.length || 0), 0) / 3)
  
  if (specificityScore < 0.6) {
    failedCriteria.push("Lacks specific examples and observable behaviors")
  }
  
  // Strategies: Check for actionable guidance
  const strategyMarkers = [
    /\b(try|practice|work on|help|encourage|support|at home|together)\b/gi,
    /\b(could|can|might|would benefit|consider|suggest)\b/gi,
    /\b(next steps?|moving forward|to improve|to develop)\b/gi
  ]
  const strategiesScore = Math.min(1, strategyMarkers.reduce((acc, regex) => 
    acc + (comment.match(regex)?.length || 0), 0) / 4)
  
  if (strategiesScore < 0.6) {
    failedCriteria.push("Missing clear actionable strategies for parents")
  }
  
  // Structure: Check for logical flow
  const sentences = comment.split(/[.!?]+/).filter(s => s.trim().length > 0)
  const hasOpening = sentences.length > 0 && sentences[0].includes('work')
  const hasStrategies = comment.toLowerCase().includes('help') || comment.toLowerCase().includes('practice')
  const hasClosing = sentences.length > 1 && (sentences[sentences.length - 1].includes('continue') || comment.includes('forward'))
  
  const structureScore = (hasOpening ? 0.4 : 0) + (hasStrategies ? 0.4 : 0) + (hasClosing ? 0.2 : 0)
  
  if (structureScore < 0.6) {
    failedCriteria.push("Lacks clear structure with opening, strategies, and closing")
  }
  
  // Tone: Basic positivity check
  const negativeWords = comment.match(/\b(bad|poor|failed?|wrong|can't|won't|difficult|struggle)\b/gi)?.length || 0
  const positiveWords = comment.match(/\b(good|well|great|excellent|progress|strength|improve|develop|grow)\b/gi)?.length || 0
  const toneScore = Math.max(0, Math.min(1, (positiveWords - negativeWords * 0.5) / Math.max(1, sentences.length)))
  
  if (toneScore < 0.5) {
    failedCriteria.push("Tone could be more constructive and encouraging")
  }
  
  // Language: Parent-friendly check
  const jargonWords = comment.match(/\b(curriculum|pedagogy|assessment|differentiation|scaffolding|metacognition)\b/gi)?.length || 0
  const languageScore = Math.max(0, 1 - (jargonWords / sentences.length))
  
  if (languageScore < 0.7) {
    failedCriteria.push("Contains too much educational jargon for parents")
  }
  
  const overall = (specificityScore + strategiesScore + structureScore + toneScore + languageScore) / 5
  
  return {
    specificity: specificityScore,
    strategies: strategiesScore,
    structure: structureScore,
    tone: toneScore,
    language: languageScore,
    overall,
    failedCriteria
  }
}

// Fallback template system
function generateFallbackComment(input: z.infer<typeof InputSchema>): ImproveCommentResponse {
  const { draft, tone, readingLevel, length, subject } = input
  
  // Extract key information
  const isPositive = draft.match(/\b(good|well|great|excellent|progress)\b/gi)
  const hasStruggle = draft.match(/\b(difficult|struggle|challenge|need|improve)\b/gi)
  
  let improved = ''
  const rationale: string[] = []
  
  // Opening acknowledgment
  if (isPositive) {
    improved += `I've been pleased to see the effort ${subject ? `in ${subject}` : 'in class'} recently. `
    rationale.push('Added positive acknowledgment of effort')
  } else if (hasStruggle) {
    improved += `I've noticed some areas where we can work together to support progress${subject ? ` in ${subject}` : ''}. `
    rationale.push('Reframed challenges as collaborative opportunities')
  } else {
    improved += `${subject ? `In ${subject}` : 'In class'}, there are some specific areas I'd like to highlight. `
  }
  
  // Main content with specificity
  const mainContent = draft.replace(/\b(bad|poor|failed?)\b/gi, 'developing')
                          .replace(/\bcan't\b/gi, 'is working to')
                          .replace(/\bwon't\b/gi, 'could benefit from support with')
  improved += `${mainContent.charAt(0).toUpperCase()}${mainContent.slice(1)}. `
  rationale.push('Enhanced original content with more specific, constructive language')
  
  // Add strategies
  improved += 'To support this at home, you might try practicing together for 10-15 minutes daily, '
  improved += 'and celebrating small improvements along the way. '
  rationale.push('Added two concrete strategies parents can implement')
  
  // Encouraging close
  if (tone === 'Firm-but-kind') {
    improved += 'With consistent effort, I expect to see positive changes soon.'
  } else {
    improved += 'Please feel free to reach out if you have questions about how to best support at home.'
  }
  rationale.push('Added collaborative, encouraging closing')
  
  // Apply length adjustments
  if (length === 'Short' && improved.length > 150) {
    const sentences = improved.split('. ')
    improved = sentences.slice(0, 2).join('. ') + '.'
    rationale.push('Condensed to requested short length')
  } else if (length === 'Long' && improved.length < 200) {
    improved = improved.replace('.', ', and I believe continued practice will lead to strong progress.')
    rationale.push('Extended to provide more comprehensive feedback')
  }
  
  const score = scoreComment(improved, draft)
  
  return {
    improvedText: improved,
    rationaleBullets: rationale,
    quality: {
      score: score.overall,
      reasons: score.failedCriteria.length > 0 ? score.failedCriteria : ['Meets quality standards']
    },
    warnings: draft.match(/\b(bad|fail|stupid|lazy)\b/gi) 
      ? ['Avoided potentially discouraging language from original'] 
      : []
  }
}

// LLM integration with self-critique
async function improveWithLLM(input: z.infer<typeof InputSchema>): Promise<ImproveCommentResponse> {
  const openaiKey = process.env.OPENAI_API_KEY
  const anthropicKey = process.env.ANTHROPIC_API_KEY
  
  if (!openaiKey && !anthropicKey) {
    return generateFallbackComment(input)
  }
  
  const { draft, tone, readingLevel, length, language, subject, goal, strengths, concerns } = input
  
  // Build context
  const context = [
    `Draft: "${draft}"`,
    `Tone: ${tone}`,
    `Reading Level: ${readingLevel}`, 
    `Length: ${length}`,
    language !== 'Auto-detect' ? `Language: ${language}` : '',
    subject ? `Subject: ${subject}` : '',
    goal ? `Goal: ${goal}` : '',
    strengths ? `Strengths: ${strengths}` : '',
    concerns ? `Concerns: ${concerns}` : ''
  ].filter(Boolean).join('\n')
  
  try {
    // First pass: Generate improved comment
    const firstPassPrompt = `${SYSTEM_PROMPT_V2}\n\n${context}\n\nProvide a substantial rewrite that transforms this draft into specific, strategic parent-ready feedback.`
    
    let improvedText = ''
    let rationaleBullets: string[] = []
    
    if (openaiKey) {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${openaiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'user', content: firstPassPrompt }
          ],
          max_tokens: 600,
          temperature: 0.3
        })
      })
      
      if (response.ok) {
        const data = await response.json()
        const content = data.choices[0]?.message?.content
        
        if (content) {
          try {
            const parsed = JSON.parse(content)
            improvedText = parsed.improvedText || content
            rationaleBullets = parsed.rationaleBullets || ['AI-enhanced for specificity and strategies']
          } catch {
            // If not JSON, treat as plain text
            improvedText = content.trim()
            rationaleBullets = ['Rewritten for clarity, specificity, and actionable strategies']
          }
        }
      }
    }
    
    // Fallback if LLM failed
    if (!improvedText) {
      return generateFallbackComment(input)
    }
    
    // Score the result
    const score = scoreComment(improvedText, draft)
    
    // Self-critique: If score < 0.8 or any criteria failed, refine
    if (score.overall < 0.8 || score.failedCriteria.length > 0) {
      const refinePrompt = REFINE_PROMPT
        .replace('{failedCriteria}', score.failedCriteria.join(', '))
        .replace('{originalDraft}', draft)
        .replace('{previousComment}', improvedText)
        .replace('{tone}', tone)
        .replace('{readingLevel}', readingLevel)
        .replace('{length}', length)
      
      try {
        const refineResponse = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${openaiKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages: [
              { role: 'user', content: refinePrompt }
            ],
            max_tokens: 600,
            temperature: 0.2
          })
        })
        
        if (refineResponse.ok) {
          const refineData = await refineResponse.json()
          const refinedContent = refineData.choices[0]?.message?.content
          
          if (refinedContent) {
            improvedText = refinedContent.trim()
            rationaleBullets.push('Refined for enhanced specificity and strategic guidance')
            
            // Re-score
            const newScore = scoreComment(improvedText, draft)
            return {
              improvedText,
              rationaleBullets,
              quality: {
                score: newScore.overall,
                reasons: newScore.failedCriteria.length > 0 ? newScore.failedCriteria : ['Meets enhanced quality standards']
              },
              warnings: detectWarnings(draft)
            }
          }
        }
      } catch (refineError) {
        console.error('Refine pass failed:', refineError)
      }
    }
    
    // Apply internationalization if needed
    if (language !== 'Auto-detect' && language.toLowerCase() !== 'english') {
      // This would need translation service integration
      rationaleBullets.push(`Note: Translation to ${language} would require additional service`)
    }
    
    return {
      improvedText,
      rationaleBullets,
      quality: {
        score: score.overall,
        reasons: score.failedCriteria.length > 0 ? score.failedCriteria : ['Meets quality standards']
      },
      warnings: detectWarnings(draft)
    }
    
  } catch (error) {
    console.error('LLM error:', error)
    return generateFallbackComment(input)
  }
}

function detectWarnings(draft: string): string[] {
  const warnings: string[] = []
  
  if (draft.match(/\b(bad|stupid|lazy|fail|problem child)\b/gi)) {
    warnings.push('Removed potentially discouraging language from original draft')
  }
  
  if (draft.match(/\b(john|jane|smith|mr\.|mrs\.|ms\.)\b/gi)) {
    warnings.push('Detected potential PII - please review for privacy')
  }
  
  if (draft.length < 20) {
    warnings.push('Original draft was very short - substantial enhancement provided')
  }
  
  return warnings
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    
    // Validate input with Zod
    const validatedInput = InputSchema.parse(body)
    
    console.log('Improving comment v2:', {
      draftLength: validatedInput.draft.length,
      tone: validatedInput.tone,
      readingLevel: validatedInput.readingLevel,
      length: validatedInput.length,
      language: validatedInput.language,
      hasContext: !!(validatedInput.subject || validatedInput.goal || validatedInput.strengths || validatedInput.concerns)
    })
    
    const result = await improveWithLLM(validatedInput)
    
    return NextResponse.json(result)
    
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          error: 'Invalid input parameters',
          details: error.issues.map(e => `${e.path.join('.')}: ${e.message}`)
        },
        { status: 400 }
      )
    }
    
    console.error('Comment improvement error:', error)
    return NextResponse.json(
      { error: 'Failed to improve comment. Please try again.' },
      { status: 500 }
    )
  }
}