import { runPromptlyPipeline } from './promptlyPipeline';

// Golden test cases (concrete examples to keep in repo)
const GOLDEN_TESTS = [
  {
    name: "Negative (behaviour + lateness)",
    input: "Maggie is naughty, disruptive, always late.",
    expectations: {
      neutralOpener: true,
      correctPronouns: 'she/her',
      mentions: ['lateness', 'disruption'],
      strategies: ['meet at door', 'leave 10 minutes'],
      wordRange: [85, 130]
    }
  },
  {
    name: "Mixed (strength + concern)",
    input: "Ravi helps others in science but misses homework.",
    expectations: {
      neutralOpener: true,
      correctPronouns: 'he/him', 
      mentions: ['helps', 'homework'],
      strategies: ['checklist', '15-minute'],
      wordRange: [85, 130]
    }
  },
  {
    name: "Praise",
    input: "Ava led group project brilliantly.",
    expectations: {
      warmOpener: true,
      correctPronouns: 'she/her',
      mentions: ['brilliant', 'leadership'],
      strategies: ['continue to provide', 'encourage'],
      wordRange: [85, 130]
    }
  },
  {
    name: "Sleepy",
    input: "Dylan falls asleep in class.",
    expectations: {
      neutralOpener: true,
      correctPronouns: 'he/him',
      mentions: ['tired', 'sleep'],
      strategies: ['water break', 'bedtime'],
      wordRange: [85, 130]
    }
  }
];

// Test the Promptly-grade pipeline
async function testPromptlyPipeline() {
  console.log('=== Testing Promptly Pipeline (Golden Tests) ===\n');
  
  let allPassed = true;
  
  for (const test of GOLDEN_TESTS) {
    console.log(`--- ${test.name} ---`);
    console.log('Input:', test.input);
    
    try {
      const result = await runPromptlyPipeline(test.input);
      console.log('Output:', result.polished);
      
      const wordCount = result.polished.split(/\s+/).length;
      const text = result.polished.toLowerCase();
      
      // Check expectations
      const hasNeutralOpener = test.expectations.neutralOpener && 
        (text.includes("i'd like to share an update") || text.includes("here's a quick update"));
      const hasWarmOpener = test.expectations.warmOpener && 
        text.includes("pleased to share");
      const hasCorrectOpener = hasNeutralOpener || hasWarmOpener;
      
      const hasCorrectPronouns = checkPronouns(result.polished, test.expectations.correctPronouns);
      const hasStrategies = test.expectations.strategies.some(strategy => 
        text.includes(strategy.toLowerCase())
      );
      const isGoodLength = wordCount >= test.expectations.wordRange[0] && 
                          wordCount <= test.expectations.wordRange[1];
      
      const testPassed = hasCorrectOpener && hasCorrectPronouns && hasStrategies && isGoodLength;
      
      console.log('✅ Correct opener:', hasCorrectOpener);
      console.log('✅ Correct pronouns:', hasCorrectPronouns);
      console.log('✅ Has strategies:', hasStrategies);
      console.log('✅ Good length:', isGoodLength, `(${wordCount} words)`);
      console.log('Result:', testPassed ? '✅ PASS' : '❌ FAIL');
      console.log('');
      
      if (!testPassed) allPassed = false;
      
    } catch (error) {
      console.error('Test failed:', error);
      console.log('Result: ❌ FAIL\n');
      allPassed = false;
    }
  }
  
  return allPassed;
}

function checkPronouns(text: string, expected: string): boolean {
  const lower = text.toLowerCase();
  switch (expected) {
    case 'she/her':
      return (lower.includes('she') || lower.includes('her')) && !lower.includes(' he ') && !lower.includes(' him ');
    case 'he/him':
      return (lower.includes(' he ') || lower.includes('him') || lower.includes('his')) && !lower.includes('she') && !lower.includes(' her ');
    case 'they/them':
      return lower.includes('they') || lower.includes('them') || lower.includes('their');
    default:
      return false;
  }
}

// Run test if executed directly
if (require.main === module) {
  testPromptlyPipeline().then(success => {
    console.log('Overall test result:', success ? '✅ PASS' : '❌ FAIL');
  });
}

export { testPromptlyPipeline };