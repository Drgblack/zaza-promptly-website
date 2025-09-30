// Test name normalization logic
import { runPromptlyPipeline } from '../src/lib/ai/promptlyPipeline';

async function testNameNormalization() {
  console.log('🧪 Testing Name Normalization...\n');
  
  const testCases = [
    {
      name: 'Basic Mary',
      input: 'Mary is late',
      expected: 'she',
      description: 'Basic name should work'
    },
    {
      name: 'Whitespace Mary',
      input: ' Mary. is late',
      expected: 'she', 
      description: 'Whitespace and punctuation should be handled'
    },
    {
      name: 'Compound name',
      input: 'Mary-Jane is late',
      expected: 'she',
      description: 'First token of compound name should work'
    },
    {
      name: 'Unknown name',
      input: 'Zxxqy is late',
      expected: 'they',
      description: 'Unknown names should default to they'
    },
    {
      name: 'Johnny (male)',
      input: 'Johnny is late',
      expected: 'he',
      description: 'Male name should return he'
    }
  ];

  for (const testCase of testCases) {
    console.log(`\n=== ${testCase.name} ===`);
    console.log(`Input: "${testCase.input}"`);
    console.log(`Expected: ${testCase.expected}`);
    
    try {
      const result = await runPromptlyPipeline(testCase.input, 'auto');
      
      // Check if the output contains the expected pronouns
      const text = result.polished.toLowerCase();
      let actualPronoun = 'unknown';
      
      if (text.includes(' she ') || text.includes('her')) {
        actualPronoun = 'she';
      } else if (text.includes(' he ') || text.includes('him') || text.includes('his')) {
        actualPronoun = 'he';
      } else if (text.includes('they') || text.includes('them') || text.includes('their')) {
        actualPronoun = 'they';
      }
      
      const passed = actualPronoun === testCase.expected;
      console.log(`Actual: ${actualPronoun} ${passed ? '✅' : '❌'}`);
      console.log(`Description: ${testCase.description}`);
      
      if (!passed) {
        console.log(`❌ FAILED: Expected ${testCase.expected}, got ${actualPronoun}`);
        console.log(`Output snippet: ${text.substring(0, 100)}...`);
      }
      
    } catch (error) {
      console.log(`❌ Error: ${error}`);
    }
    
    console.log('='.repeat(50));
  }
}

testNameNormalization().catch(console.error);