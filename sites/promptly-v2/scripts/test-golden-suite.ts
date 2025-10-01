import { runPromptlyPipeline } from '../src/lib/ai/promptlyPipeline';
import fs from 'fs';
import path from 'path';

interface GoldenTest {
  id: string;
  description: string;
  input: {
    text: string;
    name: string;
    pronoun_choice: 'auto' | 'he' | 'she' | 'they';
  };
  expectations: {
    all_tabs: {
      paragraphs: number;
      word_count: { min: number; max: number };
      allowed_pronouns?: string[];
      forbidden_pronouns?: string[];
      required_phrases_any?: string[];
      forbidden_phrases?: string[];
      opener_starts_one_of?: string[];
      forbidden_starts_with?: string[];
      closer_contains_one_of?: string[];
      banned_words?: string[];
    };
    tabs?: { tab: string }[];
  };
}

async function runGoldenTests() {
  console.log('🏆 Running Golden Test Suite...\n');
  
  const testsDir = path.join(__dirname, '..', 'tests', 'golden');
  const testFiles = fs.readdirSync(testsDir).filter(f => f.endsWith('.json'));
  
  let passed = 0;
  let failed = 0;
  
  for (const testFile of testFiles) {
    const testPath = path.join(testsDir, testFile);
    const test: GoldenTest = JSON.parse(fs.readFileSync(testPath, 'utf8'));
    
    console.log(`\n=== ${test.id} ===`);
    console.log(test.description);
    console.log(`Input: "${test.input.text}"`);
    console.log(`Pronoun: ${test.input.pronoun_choice}`);
    
    try {
      const result = await runPromptlyPipeline(
        test.input.text,
        test.input.pronoun_choice
      );
      
      // Test both polished and email outputs
      const outputs = {
        'Polished': result.polished,
        'Email-ready': result.email.body
      };
      
      let testPassed = true;
      
      for (const [outputType, output] of Object.entries(outputs)) {
        console.log(`\n--- Testing ${outputType} Output ---`);
        
        // Word count check
        const wordCount = output.split(/\s+/).filter(w => w.length > 0).length;
        const wordCountPass = wordCount >= test.expectations.all_tabs.word_count.min && 
                             wordCount <= test.expectations.all_tabs.word_count.max;
        console.log(`Word count: ${wordCount} ${wordCountPass ? '✅' : '❌'} (${test.expectations.all_tabs.word_count.min}-${test.expectations.all_tabs.word_count.max})`);
        if (!wordCountPass) testPassed = false;
        
        // Paragraph check
        const paragraphs = output.split('\n\n').filter(p => p.trim().length > 0);
        const paragraphPass = paragraphs.length === test.expectations.all_tabs.paragraphs;
        console.log(`Paragraphs: ${paragraphs.length} ${paragraphPass ? '✅' : '❌'} (should be ${test.expectations.all_tabs.paragraphs})`);
        if (!paragraphPass) testPassed = false;
        
        const lowerOutput = output.toLowerCase();
        
        // Allowed pronouns check
        if (test.expectations.all_tabs.allowed_pronouns) {
          const allowedFound = test.expectations.all_tabs.allowed_pronouns.some(p => 
            new RegExp(`\\b${p}\\b`, 'i').test(output)
          );
          console.log(`Contains allowed pronouns: ${allowedFound ? '✅' : '❌'}`);
          if (!allowedFound) testPassed = false;
        }
        
        // Forbidden pronouns check
        if (test.expectations.all_tabs.forbidden_pronouns) {
          const forbiddenFound = test.expectations.all_tabs.forbidden_pronouns.some(p => 
            new RegExp(`\\b${p}\\b`, 'i').test(output)
          );
          console.log(`No forbidden pronouns: ${!forbiddenFound ? '✅' : '❌'}`);
          if (forbiddenFound) {
            const found = test.expectations.all_tabs.forbidden_pronouns.filter(p => 
              new RegExp(`\\b${p}\\b`, 'i').test(output)
            );
            console.log(`  Found forbidden: ${found.join(', ')}`);
            testPassed = false;
          }
        }
        
        // Required phrases check
        if (test.expectations.all_tabs.required_phrases_any) {
          const requiredFound = test.expectations.all_tabs.required_phrases_any.some(phrase => 
            lowerOutput.includes(phrase.toLowerCase())
          );
          console.log(`Contains required phrases: ${requiredFound ? '✅' : '❌'}`);
          if (!requiredFound) testPassed = false;
        }
        
        // Forbidden phrases check
        if (test.expectations.all_tabs.forbidden_phrases) {
          const forbiddenPhraseFound = test.expectations.all_tabs.forbidden_phrases.some(phrase => 
            lowerOutput.includes(phrase.toLowerCase())
          );
          console.log(`No forbidden phrases: ${!forbiddenPhraseFound ? '✅' : '❌'}`);
          if (forbiddenPhraseFound) testPassed = false;
        }
        
        // Opener check
        if (test.expectations.all_tabs.opener_starts_one_of) {
          const openerMatch = test.expectations.all_tabs.opener_starts_one_of.some(opener => 
            output.toLowerCase().startsWith(opener.toLowerCase())
          );
          console.log(`Opener matches expected: ${openerMatch ? '✅' : '❌'}`);
          if (!openerMatch) testPassed = false;
        }
        
        // Forbidden opener check
        if (test.expectations.all_tabs.forbidden_starts_with) {
          const forbiddenOpener = test.expectations.all_tabs.forbidden_starts_with.some(opener => 
            output.toLowerCase().startsWith(opener.toLowerCase())
          );
          console.log(`No forbidden opener: ${!forbiddenOpener ? '✅' : '❌'}`);
          if (forbiddenOpener) testPassed = false;
        }
        
        // Closer check
        if (test.expectations.all_tabs.closer_contains_one_of) {
          const closerMatch = test.expectations.all_tabs.closer_contains_one_of.some(closer => 
            lowerOutput.includes(closer.toLowerCase())
          );
          console.log(`Closer matches expected: ${closerMatch ? '✅' : '❌'}`);
          if (!closerMatch) testPassed = false;
        }
        
        // Banned words check
        if (test.expectations.all_tabs.banned_words) {
          const bannedFound = test.expectations.all_tabs.banned_words.filter(word => 
            new RegExp(`\\b${word}\\b`, 'i').test(output)
          );
          console.log(`No banned words: ${bannedFound.length === 0 ? '✅' : '❌'}`);
          if (bannedFound.length > 0) {
            console.log(`  Found banned: ${bannedFound.join(', ')}`);
            testPassed = false;
          }
        }
      }
      
      if (testPassed) {
        console.log(`\n✅ ${test.id} PASSED`);
        passed++;
      } else {
        console.log(`\n❌ ${test.id} FAILED`);
        failed++;
        
        // Show output for debugging
        console.log('\n--- Debug Output ---');
        console.log(result.polished);
      }
      
    } catch (error) {
      console.log(`\n❌ ${test.id} ERROR: ${error}`);
      failed++;
    }
    
    console.log('\n' + '='.repeat(80));
  }
  
  console.log(`\n🏆 Golden Test Results: ${passed} passed, ${failed} failed`);
  
  if (failed > 0) {
    process.exit(1);
  }
}

runGoldenTests().catch(console.error);