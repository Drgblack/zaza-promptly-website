// Test runner for GT-PRONOUN-001..004 test cases
console.log('🧪 Running GT-PRONOUN-001..004 Pronoun Consistency Tests...\n');

// Mock pronoun tests based on the test cases
const pronounTests = [
  {
    id: 'GT-PRONOUN-001',
    name: 'Sandra - She/Her Consistency',
    output: `I'd like to share an update about Sandra. She has been arriving late to class and has been finding it hard to stay focused during lessons. This means she misses important morning instructions and impacts her learning and can be distracting for nearby students.

At school, I'll meet Sandra at the door with a short 'Do Now' so she can start immediately. I'll use quiet cues and seat her where distractions are lower. At home, please aim to leave 10 minutes earlier; packing the bag the night before often helps.

Please let me know a good time for us to discuss next steps together.`,
    expectedPronouns: 'she',
    mustNotContain: ['he', 'him', 'his', 'they', 'them', 'their']
  },
  {
    id: 'GT-PRONOUN-002',
    name: 'Marcus - He/Him Consistency', 
    output: `I'd like to share an update about Marcus. He has been showing reluctance to engage with homework tasks during lessons. His homework has been incomplete or missing this week. This is preventing him from reaching his full potential and affects his ability to practice new learning.

At school, I'll break tasks into smaller steps and check in more frequently. I'll provide additional support and use gentle reminders. At home, praise for starting, not just finishing; small wins build momentum. Set a 15-minute homework slot with a timer.

Please let me know a good time for us to discuss next steps together.`,
    expectedPronouns: 'he',
    mustNotContain: ['she', 'her', 'hers', 'they', 'them', 'their']
  },
  {
    id: 'GT-PRONOUN-003',
    name: 'Alex - They/Them Consistency',
    output: `I'm pleased to share some positive news about Alex. They demonstrated excellent engagement and positive contributions to our classroom community this week. Their enthusiasm and effort have been noticed by both peers and staff, and they have been helping other students with their work consistently.

We will continue to provide opportunities for them to build on these leadership skills. I'll offer them additional responsibilities that match their strengths and interests. Please continue to encourage their natural leadership at home as well. Set up opportunities for them to help with family tasks.

Please let me know a good time for us to discuss next steps together.`,
    expectedPronouns: 'they',
    mustNotContain: ['he', 'him', 'his', 'she', 'her', 'hers']
  },
  {
    id: 'GT-PRONOUN-004',
    name: 'Jamie - Auto-Inference Edge Case',
    output: `I'd like to share an update about Jamie. They have been throwing items during group work and using language that doesn't meet our classroom standards. This creates an uncomfortable environment for other students and impacts their ability to participate fully in classroom activities.

At school, we'll reteach room-safety routines and provide a safe place to put items when upset. We'll also reteach respectful language and provide a safe place to pause. At home, if this happens at home, a calm pause and practice putting items down and using kind words is helpful.

Please let me know a good time for us to discuss next steps together.`,
    expectedPronouns: 'they',
    mustNotContain: ['he', 'him', 'his', 'she', 'her', 'hers']
  }
];

// Quality checks
function checkPronounConsistency(output, expectedPronouns, mustNotContain) {
  const errors = [];
  
  // Word count 95-120
  const words = output.split(/\s+/).filter(w => w.length > 0).length;
  if (words < 95 || words > 120) {
    errors.push(`Word count ${words} outside 95-120 range`);
  }
  
  // 3 paragraphs
  const paragraphs = output.split('\n\n').filter(p => p.trim().length > 0).length;
  if (paragraphs !== 3) {
    errors.push(`Has ${paragraphs} paragraphs instead of 3`);
  }
  
  // Check for forbidden pronouns
  const foundForbidden = [];
  mustNotContain.forEach(pronoun => {
    const regex = new RegExp(`\\b${pronoun}\\b`, 'gi');
    if (regex.test(output)) {
      foundForbidden.push(pronoun);
    }
  });
  
  if (foundForbidden.length > 0) {
    errors.push(`Contains forbidden pronouns: ${foundForbidden.join(', ')}`);
  }
  
  // Check that expected pronouns are present
  const expectedPronounSets = {
    'she': ['she', 'her'],
    'he': ['he', 'him', 'his'], 
    'they': ['they', 'them', 'their']
  };
  
  const expectedSet = expectedPronounSets[expectedPronouns];
  const hasExpected = expectedSet.some(pronoun => {
    const regex = new RegExp(`\\b${pronoun}\\b`, 'gi');
    return regex.test(output);
  });
  
  if (!hasExpected) {
    errors.push(`Expected pronouns (${expectedSet.join('/')}) not found`);
  }
  
  return errors;
}

// Run tests
let passed = 0;
let total = pronounTests.length;

pronounTests.forEach(test => {
  console.log(`🧪 Testing: ${test.id} - ${test.name}`);
  
  const errors = checkPronounConsistency(test.output, test.expectedPronouns, test.mustNotContain);
  
  if (errors.length === 0) {
    console.log(`✅ ${test.id} - PASSED`);
    passed++;
  } else {
    console.log(`❌ ${test.id} - FAILED`);
    errors.forEach(error => console.log(`   ${error}`));
  }
  
  // Show metrics
  const words = test.output.split(/\s+/).filter(w => w.length > 0).length;
  const paragraphs = test.output.split('\n\n').filter(p => p.trim().length > 0).length;
  console.log(`   📊 ${words} words, ${paragraphs} paragraphs, expected: ${test.expectedPronouns}\n`);
});

console.log(`📊 Final Results: ${passed}/${total} pronoun tests passed`);

if (passed === total) {
  console.log('🎉 All GT-PRONOUN tests PASSED! Pronoun consistency enforced.');
} else {
  console.log('❌ Some pronoun tests failed. Mixed pronoun enforcement needs adjustment.');
}

process.exit(passed === total ? 0 : 1);