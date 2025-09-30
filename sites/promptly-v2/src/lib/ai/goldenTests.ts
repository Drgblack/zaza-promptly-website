// Golden test cases for Promptly-grade quality validation

import { runPromptlyPipeline } from './promptlyPipeline';
import { qualityGate } from '@/lib/quality/qualityGate';
import { inferPronouns } from '@/lib/text/pronouns';

export interface GoldenTestCase {
  name: string;
  input: string;
  expectedPronouns: 'he' | 'she' | 'they';
  mustContain: string[];
  mustNotContain: string[];
  concerns: string[];
  description: string;
}

export const GOLDEN_TESTS: GoldenTestCase[] = [
  {
    name: 'Sally - Multiple Concerns',
    input: 'Sally was late three times this week and disrupted the class by talking. She also forgot her homework yesterday.',
    expectedPronouns: 'she',
    mustContain: ['lateness', 'disruption', 'homework', 'school', 'home'],
    mustNotContain: ['delighted', 'lazy', 'naughty', 'they'],
    concerns: ['lateness', 'focus_disruption', 'missing_homework'],
    description: 'Neutral opener, she/her pronouns, school & home strategies, growth line included'
  },
  {
    name: 'Johnny - Math Challenge with Sport Strength',
    input: 'Johnny struggles with math but he is brilliant at sports and helps other kids.',
    expectedPronouns: 'he',
    mustContain: ['strength', 'sport', 'math', 'support'],
    mustNotContain: ['delighted', 'terrible', 'they'],
    concerns: ['low_effort'],
    description: 'One strength line, one concern, balanced strategies, he/him pronouns'
  },
  {
    name: 'Ava - Praise Only',
    input: 'Ava has been wonderful this week. She helped her peers and completed all her work brilliantly.',
    expectedPronouns: 'she',
    mustContain: ['positive', 'strength', 'leadership'],
    mustNotContain: ['concerns', 'they'],
    concerns: [],
    description: 'Warm opener, 1 strength sentence, no extra strategies'
  },
  {
    name: 'Dylan - Tired/Sleepy',
    input: 'Dylan seems very tired in class and falls asleep during lessons.',
    expectedPronouns: 'he',
    mustContain: ['water break', 'bedtime', 'tired'],
    mustNotContain: ['lazy', 'delighted', 'they'],
    concerns: ['tired_sleepy'],
    description: 'Tired/sleepy strategy applied, no blame, supportive tone'
  }
];

export async function runGoldenTests(): Promise<{ passed: number; total: number; results: any[] }> {
  const results = [];
  let passed = 0;
  
  for (const testCase of GOLDEN_TESTS) {
    console.log(`\n🧪 Testing: ${testCase.name}`);
    
    try {
      const pronouns = inferPronouns(testCase.name.split(' ')[0], 'auto');
      const output = await runPromptlyPipeline(testCase.input, pronouns);
      const gate = qualityGate(output.polished, pronouns);
      
      const testResult = {
        name: testCase.name,
        passed: true,
        errors: [] as string[],
        output: output.polished,
        metrics: gate.metrics
      };
      
      // Check quality gate
      if (!gate.ok) {
        testResult.passed = false;
        testResult.errors.push(`Quality gate failed: ${gate.errors.join(', ')}`);
      }
      
      // Check pronoun consistency
      const pronounCheck = testCase.expectedPronouns === 'she' ? 
        (output.polished.includes(' she ') || output.polished.includes('She ')) :
        testCase.expectedPronouns === 'he' ?
        (output.polished.includes(' he ') || output.polished.includes('He ')) :
        (output.polished.includes(' they ') || output.polished.includes('They '));
        
      if (!pronounCheck) {
        testResult.passed = false;
        testResult.errors.push(`Pronoun mismatch: expected ${testCase.expectedPronouns}`);
      }
      
      // Check must contain
      for (const phrase of testCase.mustContain) {
        if (!output.polished.toLowerCase().includes(phrase.toLowerCase())) {
          testResult.passed = false;
          testResult.errors.push(`Missing required phrase: "${phrase}"`);
        }
      }
      
      // Check must not contain
      for (const phrase of testCase.mustNotContain) {
        if (output.polished.toLowerCase().includes(phrase.toLowerCase())) {
          testResult.passed = false;
          testResult.errors.push(`Contains banned phrase: "${phrase}"`);
        }
      }
      
      if (testResult.passed) {
        passed++;
        console.log(`✅ ${testCase.name} - PASSED`);
      } else {
        console.log(`❌ ${testCase.name} - FAILED`);
        testResult.errors.forEach(error => console.log(`   ${error}`));
      }
      
      results.push(testResult);
      
    } catch (error) {
      console.log(`❌ ${testCase.name} - ERROR: ${error}`);
      results.push({
        name: testCase.name,
        passed: false,
        errors: [`Exception: ${error}`],
        output: null,
        metrics: null
      });
    }
  }
  
  console.log(`\n📊 Test Results: ${passed}/${GOLDEN_TESTS.length} passed`);
  
  return {
    passed,
    total: GOLDEN_TESTS.length,
    results
  };
}