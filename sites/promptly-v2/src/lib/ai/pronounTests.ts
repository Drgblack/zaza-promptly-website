// GT-PRONOUN-001..004 - Golden Test Cases for Pronoun Enforcement

import { runPromptlyPipeline } from './promptlyPipeline';
import { qualityGate } from '@/lib/quality/qualityGate';
import { inferPronouns } from '@/lib/text/pronouns';

export interface PronounTestCase {
  id: string;
  name: string;
  input: string;
  expectedPronouns: 'he' | 'she' | 'they';
  mustNotContain: string[];
  description: string;
}

export const PRONOUN_TESTS: PronounTestCase[] = [
  {
    id: 'GT-PRONOUN-001',
    name: 'Sandra - She/Her Consistency',
    input: 'Sandra has been late to class and disrupted other students. She needs support with focus.',
    expectedPronouns: 'she',
    mustNotContain: ['he', 'him', 'his', 'they', 'them', 'their'],
    description: 'Sandra (she) uses only she/her/hers throughout - no mixed pronouns'
  },
  {
    id: 'GT-PRONOUN-002', 
    name: 'Marcus - He/Him Consistency',
    input: 'Marcus forgot his homework again. He seems tired and unfocused during lessons.',
    expectedPronouns: 'he',
    mustNotContain: ['she', 'her', 'hers', 'they', 'them', 'their'],
    description: 'Marcus (he) uses only he/him/his throughout - no mixed pronouns'
  },
  {
    id: 'GT-PRONOUN-003',
    name: 'Alex - They/Them Consistency', 
    input: 'Alex has been excellent this week. They helped peers and completed all work.',
    expectedPronouns: 'they',
    mustNotContain: ['he', 'him', 'his', 'she', 'her', 'hers'],
    description: 'Alex (they) uses only they/them/their throughout - no mixed pronouns'
  },
  {
    id: 'GT-PRONOUN-004',
    name: 'Jamie - Auto-Inference Edge Case',
    input: 'Jamie threw items during group work and used inappropriate language.',
    expectedPronouns: 'they', // Unisex name should default to they
    mustNotContain: ['he', 'him', 'his', 'she', 'her', 'hers'],
    description: 'Jamie (unisex name) defaults to they/them/their - no singular pronouns'
  }
];

export async function runPronounTests(): Promise<{ passed: number; total: number; results: any[] }> {
  const results = [];
  let passed = 0;
  
  console.log('🧪 Running GT-PRONOUN-001..004 Test Cases\n');
  
  for (const testCase of PRONOUN_TESTS) {
    console.log(`\n🧪 Testing: ${testCase.id} - ${testCase.name}`);
    
    try {
      const pronouns = inferPronouns(testCase.name.split(' ')[0], 'auto');
      const output = await runPromptlyPipeline(testCase.input, pronouns);
      const gate = qualityGate(output.polished, pronouns);
      
      const testResult = {
        id: testCase.id,
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
      
      // Check pronoun consistency - must NOT contain forbidden pronouns
      for (const forbiddenPronoun of testCase.mustNotContain) {
        const regex = new RegExp(`\\b${forbiddenPronoun}\\b`, 'gi');
        if (regex.test(output.polished)) {
          testResult.passed = false;
          testResult.errors.push(`Contains forbidden pronoun: "${forbiddenPronoun}"`);
        }
      }
      
      // Check for mixed pronoun issues in quality gate
      if (gate.metrics.mixedPronouns.length > 0) {
        testResult.passed = false;
        testResult.errors.push(`Mixed pronouns detected: ${gate.metrics.mixedPronouns.join(', ')}`);
      }
      
      // Check paragraph count (must be 3)
      const paragraphs = output.polished.split('\n\n').filter(p => p.trim().length > 0).length;
      if (paragraphs !== 3) {
        testResult.passed = false;
        testResult.errors.push(`Expected 3 paragraphs, got ${paragraphs}`);
      }
      
      // Check word count (95-120)
      const words = output.polished.split(/\s+/).filter(w => w.length > 0).length;
      if (words < 95 || words > 120) {
        testResult.passed = false;
        testResult.errors.push(`Word count ${words} outside 95-120 range`);
      }
      
      if (testResult.passed) {
        passed++;
        console.log(`✅ ${testCase.id} - PASSED`);
        console.log(`   📊 ${words} words, ${paragraphs} paragraphs, pronouns: ${pronouns.subj}/${pronouns.obj}/${pronouns.possAdj}`);
      } else {
        console.log(`❌ ${testCase.id} - FAILED`);
        testResult.errors.forEach(error => console.log(`   ${error}`));
        console.log(`   📊 ${words} words, ${paragraphs} paragraphs`);
      }
      
      results.push(testResult);
      
    } catch (error) {
      console.log(`❌ ${testCase.id} - ERROR: ${error}`);
      results.push({
        id: testCase.id,
        name: testCase.name,
        passed: false,
        errors: [`Exception: ${error}`],
        output: null,
        metrics: null
      });
    }
  }
  
  console.log(`\n📊 Pronoun Test Results: ${passed}/${PRONOUN_TESTS.length} passed`);
  
  if (passed === PRONOUN_TESTS.length) {
    console.log('🎉 All pronoun consistency tests PASSED!');
  } else {
    console.log('❌ Some pronoun tests failed. Mixed pronoun enforcement needs adjustment.');
  }
  
  return {
    passed,
    total: PRONOUN_TESTS.length,
    results
  };
}