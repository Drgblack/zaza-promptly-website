import { runPromptlyPipeline } from './promptlyPipeline';

// Gold standard acceptance tests - must pass for Promptly-grade quality
const GOLD_STANDARD_TESTS = [
  {
    name: "Sally (complex: late + throwing + homework)",
    input: "Sally is a very naughty girl… throws things… often late… only sometimes does homework… good at sport.",
    expectations: {
      containsText: [
        "I'd like to share an update about Sally",
        "She has arrived late",
        "threw items", 
        "shows real strength",
        "PE", "sport",
        "I'll meet Sally at the door",
        "Please aim to leave 10 minutes earlier"
      ],
      pronounsOnly: 'she/her',
      wordRange: [110, 120],
      actionVerbs: ['meet', 'leave'],
      paragraphs: 3,
      noBannedWords: true,
      noDelighted: true
    }
  },
  {
    name: "Johnny (maths challenge + effort in sport)",
    input: "Johnny struggles with maths but tries really hard in PE and sport.",
    expectations: {
      containsText: [
        "I'd like to share an update about Johnny",
        "strength in physical activities",
        "maths", "challenging"
      ],
      pronounsOnly: 'he/him',
      wordRange: [95, 120],
      actionVerbs: ['provide', 'set'],
      paragraphs: 3,
      noBannedWords: true,
      noDelighted: true
    }
  },
  {
    name: "Ava (praise only)",
    input: "Ava led group project brilliantly.",
    expectations: {
      containsText: [
        "I'm pleased to share some positive news about Ava",
        "leadership",
        "continue to provide opportunities",
        "encourage"
      ],
      pronounsOnly: 'she/her',
      wordRange: [85, 120],
      actionVerbs: ['provide', 'encourage'],
      paragraphs: 3,
      noBannedWords: true,
      warmOpenerAllowed: true
    }
  },
  {
    name: "Dylan (sleepy)",
    input: "Dylan falls asleep in class.",
    expectations: {
      containsText: [
        "I'd like to share an update about Dylan",
        "tired", "appears tired",
        "water break",
        "bedtime"
      ],
      pronounsOnly: 'he/him',
      wordRange: [90, 120], 
      actionVerbs: ['offer', 'provide'],
      paragraphs: 3,
      noBannedWords: true,
      noBlame: true
    }
  }
];

// Test runner
async function testPromptlyGrade() {
  console.log('=== Promptly-Grade Quality Tests ===\n');
  
  let allPassed = true;
  
  for (const test of GOLD_STANDARD_TESTS) {
    console.log(`--- ${test.name} ---`);
    console.log('Input:', test.input);
    
    try {
      const result = await runPromptlyPipeline(test.input);
      console.log('Output:\n' + result.polished + '\n');
      
      const text = result.polished;
      const wordCount = text.split(/\s+/).filter(w => w.length > 0).length;
      const paragraphs = text.split(/\n{2,}/).filter(p => p.trim().length > 0).length;
      
      // Check expectations
      const checks = {
        containsText: test.expectations.containsText.every(phrase => 
          text.toLowerCase().includes(phrase.toLowerCase())
        ),
        correctPronouns: checkPronouns(text, test.expectations.pronounsOnly),
        goodLength: wordCount >= test.expectations.wordRange[0] && 
                   wordCount <= test.expectations.wordRange[1],
        hasActionVerbs: test.expectations.actionVerbs.some(verb => 
          text.toLowerCase().includes(verb.toLowerCase())
        ),
        correctParagraphs: paragraphs === test.expectations.paragraphs,
        noBanned: !containsBannedWords(text),
        noDelighted: test.expectations.noDelighted ? !text.toLowerCase().includes('delighted') : true
      };
      
      const testPassed = Object.values(checks).every(Boolean);
      
      console.log('✅ Contains required text:', checks.containsText);
      console.log('✅ Correct pronouns:', checks.correctPronouns);
      console.log('✅ Good length:', checks.goodLength, `(${wordCount} words)`);
      console.log('✅ Has action verbs:', checks.hasActionVerbs);
      console.log('✅ Correct paragraphs:', checks.correctParagraphs, `(${paragraphs})`);
      console.log('✅ No banned words:', checks.noBanned);
      console.log('✅ Appropriate tone:', checks.noDelighted);
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
      return (lower.includes('she') || lower.includes('her')) && 
             !lower.includes(' he ') && !lower.includes(' him ') &&
             !lower.includes('they');
    case 'he/him':
      return (lower.includes(' he ') || lower.includes('him') || lower.includes('his')) && 
             !lower.includes('she') && !lower.includes(' her ') &&
             !lower.includes('they');
    case 'they/them':
      return (lower.includes('they') || lower.includes('them') || lower.includes('their')) &&
             !lower.includes('she') && !lower.includes(' he ');
    default:
      return false;
  }
}

function containsBannedWords(text: string): boolean {
  const banned = ['lazy', 'naughty', 'stupid', 'dumb', 'bad kid', 'always', 'never'];
  const lower = text.toLowerCase();
  return banned.some(word => lower.includes(word));
}

// Run test if executed directly
if (require.main === module) {
  testPromptlyGrade().then(success => {
    console.log('=== FINAL RESULT ===');
    console.log(success ? '✅ ALL TESTS PASS - Promptly-grade quality achieved!' : '❌ SOME TESTS FAILED');
    process.exit(success ? 0 : 1);
  });
}

export { testPromptlyGrade };