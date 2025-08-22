import { describe, test, expect, beforeAll } from '@jest/globals'

// Types matching the API response
interface QualityScore {
  score: number
  reasons: string[]
}

interface ImproveCommentResponse {
  improvedText?: string
  rationaleBullets?: string[]
  quality?: QualityScore
  warnings?: string[]
  variants?: {
    improvedText: string
    rationaleBullets: string[]
    quality: QualityScore
    warnings: string[]
  }[]
}

// Test configuration
const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3000'
const API_TIMEOUT = 30000 // 30 seconds

// Tough test cases that challenge the system
const TOUGH_DRAFTS = [
  {
    name: 'Problematic language with labels',
    draft: 'Johnny is a problem child who is lazy and never pays attention. He is stupid when it comes to math and disrupts the class.',
    tone: 'Supportive' as const,
    readingLevel: 'Parent-friendly',
    length: 'Medium' as const
  },
  {
    name: 'Vague and unhelpful feedback',
    draft: 'Could do better. Needs improvement. Should try harder.',
    tone: 'Professional' as const,
    readingLevel: 'Year 8 level',
    length: 'Medium' as const
  },
  {
    name: 'Overly negative tone',
    draft: 'Sarah never completes her work and always talks during lessons. She is disrespectful and her behavior is unacceptable.',
    tone: 'Firm-but-kind' as const,
    readingLevel: 'Parent-friendly',
    length: 'Long' as const
  },
  {
    name: 'Single word comment',
    draft: 'Disappointing.',
    tone: 'Supportive' as const,
    readingLevel: 'Parent-friendly',
    length: 'Medium' as const
  },
  {
    name: 'Academic jargon heavy',
    draft: 'The student demonstrates inadequate metacognitive strategies and lacks scaffolding for differentiated pedagogical approaches in curriculum delivery.',
    tone: 'Professional' as const,
    readingLevel: 'Parent-friendly',
    length: 'Medium' as const
  }
]

// Banned words that should not appear in improved text (unless quoted from original)
const BANNED_WORDS = ['problem', 'lazy', 'stupid']

// Strategy indicators - phrases that suggest actionable advice
const STRATEGY_PATTERNS = [
  // Action verbs at start of sentences
  /^(Try|Practice|Work|Help|Encourage|Support|Consider|Focus|Set|Create|Use|Ask|Provide|Review|Check|Break|Start|Continue)\s+/im,
  // Bullet-like patterns
  /^[-•*]\s*.*(try|practice|work|help|encourage|support)/im,
  /\b(at home|together|daily|weekly|routine|strategy|approach|method|technique)\b/im,
  /\b(could|can|might|would benefit|consider|suggest|recommend)\b.*\b(try|practice|work|help|support)\b/im,
  // "Next steps" language
  /\b(next steps?|moving forward|to improve|to develop|going forward)\b/im
]

async function callImproveAPI(draft: string, tone: string, readingLevel: string, length: string): Promise<ImproveCommentResponse> {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT)

  try {
    const response = await fetch(`${API_BASE_URL}/api/improve-comment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        draft,
        tone,
        readingLevel,
        length,
        language: 'Auto-detect'
      }),
      signal: controller.signal
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      throw new Error(`API call failed with status ${response.status}: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    clearTimeout(timeoutId)
    throw error
  }
}

function countStrategyPhrases(text: string): number {
  return STRATEGY_PATTERNS.reduce((count, pattern) => {
    const matches = text.match(pattern)
    return count + (matches ? matches.length : 0)
  }, 0)
}

function findBannedWords(text: string, originalDraft: string): string[] {
  const found: string[] = []
  
  BANNED_WORDS.forEach(word => {
    const regex = new RegExp(`\\b${word}\\b`, 'gi')
    const matches = text.match(regex)
    
    if (matches) {
      // Check if the word was in the original draft (acceptable if replaced/improved)
      const wasInOriginal = originalDraft.toLowerCase().includes(word.toLowerCase())
      
      if (!wasInOriginal) {
        found.push(...matches)
      } else {
        // If it was in original, it should be replaced/recontextualized
        // Allow if it's quoted or clearly referring to the original
        const quotedRegex = new RegExp(`["'].*${word}.*["']`, 'gi')
        const isQuoted = quotedRegex.test(text)
        
        if (!isQuoted) {
          found.push(...matches)
        }
      }
    }
  })
  
  return found
}

describe('Snippet API Smoke Tests', () => {
  beforeAll(() => {
    // Ensure we have the required environment or fallback
    if (!process.env.API_BASE_URL && !process.env.CI) {
      console.log('🚀 Running smoke tests against localhost:3000')
    }
  })

  describe('Quality and Safety Standards', () => {
    TOUGH_DRAFTS.forEach((testCase, index) => {
      test(`Case ${index + 1}: ${testCase.name}`, async () => {
        console.log(`\n📝 Testing: ${testCase.name}`)
        console.log(`📄 Draft: "${testCase.draft}"`)

        // Call the API
        const response = await callImproveAPI(
          testCase.draft,
          testCase.tone,
          testCase.readingLevel,
          testCase.length
        )

        // Get the improved text (handle both single response and variants)
        let improvedText: string
        let quality: QualityScore
        
        if (response.variants && response.variants.length > 0) {
          // Use the best variant (they're sorted by quality)
          improvedText = response.variants[0].improvedText
          quality = response.variants[0].quality
        } else {
          improvedText = response.improvedText || ''
          quality = response.quality || { score: 0, reasons: ['No quality score provided'] }
        }

        console.log(`✨ Improved: "${improvedText.substring(0, 100)}..."`)
        console.log(`📊 Quality Score: ${quality.score}`)

        // Assertion 1: Quality score >= 0.8
        expect(quality.score).toBeGreaterThanOrEqual(0.8)

        // Assertion 2: Contains at least 2 strategy phrases
        const strategyCount = countStrategyPhrases(improvedText)
        console.log(`🎯 Strategy phrases found: ${strategyCount}`)
        expect(strategyCount).toBeGreaterThanOrEqual(2)

        // Assertion 3: No banned words (unless properly handled from original)
        const bannedWordsFound = findBannedWords(improvedText, testCase.draft)
        if (bannedWordsFound.length > 0) {
          console.log(`⚠️  Banned words found: ${bannedWordsFound.join(', ')}`)
        }
        expect(bannedWordsFound).toHaveLength(0)

        // Additional checks
        expect(improvedText.length).toBeGreaterThan(testCase.draft.length * 1.2) // At least 20% longer
        expect(improvedText).not.toBe(testCase.draft) // Must be different from original
        
        console.log(`✅ Passed all checks for: ${testCase.name}`)
      }, API_TIMEOUT + 5000)
    })
  })

  describe('Edge Cases', () => {
    test('Handles empty draft gracefully', async () => {
      await expect(
        callImproveAPI('', 'Supportive', 'Parent-friendly', 'Medium')
      ).rejects.toThrow()
    })

    test('Handles very long draft', async () => {
      const longDraft = 'This is a test. '.repeat(100) // ~1500 chars
      
      const response = await callImproveAPI(
        longDraft,
        'Professional',
        'Parent-friendly',
        'Medium'
      )

      const improvedText = response.improvedText || response.variants?.[0]?.improvedText || ''
      expect(improvedText.length).toBeGreaterThan(0)
      expect(improvedText.length).toBeLessThan(3000) // Reasonable upper bound
    })

    test('Maintains professional tone when requested', async () => {
      const response = await callImproveAPI(
        'Student talks too much in class.',
        'Professional',
        'Year 10 level',
        'Medium'
      )

      const improvedText = response.improvedText || response.variants?.[0]?.improvedText || ''
      
      // Should not contain overly casual language
      expect(improvedText).not.toMatch(/\b(awesome|cool|super|totally)\b/i)
      
      // Should contain professional language patterns
      expect(improvedText).toMatch(/\b(demonstrates|exhibits|shows|develops|requires|benefits)\b/i)
    })
  })

  describe('Response Format', () => {
    test('Returns properly structured response', async () => {
      const response = await callImproveAPI(
        'Good student but could improve.',
        'Supportive',
        'Parent-friendly',
        'Medium'
      )

      if (response.variants) {
        expect(Array.isArray(response.variants)).toBe(true)
        response.variants.forEach(variant => {
          expect(typeof variant.improvedText).toBe('string')
          expect(Array.isArray(variant.rationaleBullets)).toBe(true)
          expect(typeof variant.quality.score).toBe('number')
          expect(Array.isArray(variant.quality.reasons)).toBe(true)
          expect(Array.isArray(variant.warnings)).toBe(true)
        })
      } else {
        expect(typeof response.improvedText).toBe('string')
        expect(Array.isArray(response.rationaleBullets)).toBe(true)
        expect(typeof response.quality?.score).toBe('number')
        expect(Array.isArray(response.quality?.reasons)).toBe(true)
        expect(Array.isArray(response.warnings)).toBe(true)
      }
    })
  })
})

// Helper function for manual testing
export async function runManualTest() {
  console.log('🧪 Running manual snippet smoke test...\n')
  
  for (let index = 0; index < TOUGH_DRAFTS.length; index++) {
    const testCase = TOUGH_DRAFTS[index]
    try {
      console.log(`\n--- Test ${index + 1}: ${testCase.name} ---`)
      console.log(`Draft: "${testCase.draft}"`)
      
      const response = await callImproveAPI(
        testCase.draft,
        testCase.tone,
        testCase.readingLevel,
        testCase.length
      )

      const improvedText = response.improvedText || response.variants?.[0]?.improvedText || ''
      const quality = response.quality || response.variants?.[0]?.quality || { score: 0, reasons: [] }

      console.log(`Improved: "${improvedText}"`)
      console.log(`Quality Score: ${quality.score}`)
      console.log(`Strategy Count: ${countStrategyPhrases(improvedText)}`)
      
      const banned = findBannedWords(improvedText, testCase.draft)
      if (banned.length > 0) {
        console.log(`⚠️  Banned words: ${banned.join(', ')}`)
      }
      
      console.log(`Status: ${quality.score >= 0.8 && countStrategyPhrases(improvedText) >= 2 && banned.length === 0 ? '✅ PASS' : '❌ FAIL'}`)
    } catch (error) {
      console.log(`❌ Error: ${error}`)
    }
  }
}

// For running directly with ts-node
if (require.main === module) {
  runManualTest().catch(console.error)
}