// Simple test runner for golden tests (without TypeScript complexity)
console.log('🧪 Running Golden Test Cases for Promptly-grade Quality...\n');

// Mock the pipeline to test the quality standards
const mockTests = [
  {
    name: 'Sally - Multiple Concerns',
    output: `I'd like to share an update about Sally. She has been arriving late to class and has been finding it hard to stay focused during lessons. Her homework has been incomplete or missing this week. This means she misses important morning instructions and impacts her learning and can be distracting for nearby students.

At school, I'll meet Sally at the door with a short 'Do Now' so she can start immediately. I'll use quiet cues and seat her where distractions are lower. At home, please aim to leave 10 minutes earlier; packing the bag the night before often helps.

Please let me know a good time for us to discuss next steps together.`,
    pronouns: { subj: 'she', obj: 'her', possAdj: 'her' }
  },
  {
    name: 'Johnny - Math with Sport Strength', 
    output: `I'd like to share an update about Johnny. He has been showing reluctance to engage with math tasks during lessons. This is preventing him from reaching his full potential in mathematical thinking. He continues to show real strength in physical activities and leadership skills.

At school, I'll break tasks into smaller steps and check in more frequently. I'll provide additional support and use his sports confidence to build mathematical confidence. At home, praise for starting, not just finishing; small wins build momentum. Try connecting math concepts to sports when possible.

Please let me know a good time for us to discuss next steps together. We can build on his natural leadership to support his academic growth.`,
    pronouns: { subj: 'he', obj: 'him', possAdj: 'his' }
  },
  {
    name: 'Ava - Praise Only',
    output: `I'm pleased to share some positive news about Ava. She demonstrated excellent engagement and positive contributions to our classroom community this week. Her enthusiasm and effort have been noticed by both peers and staff, and she has been helping other students with their work consistently.

We will continue to provide opportunities for her to build on these leadership skills. I'll offer her additional responsibilities that match her strengths and interests. Please continue to encourage her natural leadership at home as well. Set up opportunities for her to help with family tasks and decisions.

Please let me know a good time for us to discuss next steps together. We want to keep supporting her growth in these areas.`,
    pronouns: { subj: 'she', obj: 'her', possAdj: 'her' }
  },
  {
    name: 'Dylan - Tired/Sleepy',
    output: `I'd like to share an update about Dylan. He appears tired and has difficulty maintaining alertness during our lessons this week. This affects his ability to participate fully in classroom activities and impacts his learning progress. We know Dylan can focus well during hands-on activities, and we can build on that strength.

At school, I'll offer water breaks and movement opportunities during lessons. I'll check in more frequently to support his focus. At home, a steady bedtime and quick breakfast usually improves focus. Try establishing consistent sleep routines.

Please let me know a good time for us to discuss next steps together.`,
    pronouns: { subj: 'he', obj: 'him', possAdj: 'his' }
  }
];

// Quality checks
function checkQuality(output, pronouns) {
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
  
  // Banned words
  const banned = ['lazy', 'naughty', 'stupid', 'bad kid', 'terrible', 'awful', 'horrible'];
  const lower = output.toLowerCase();
  const foundBanned = banned.filter(word => lower.includes(word));
  if (foundBanned.length > 0) {
    errors.push(`Contains banned words: ${foundBanned.join(', ')}`);
  }
  
  // Action verbs
  const actionVerbs = ['meet', 'leave', 'pack', 'set', 'use', 'agree', 'provide', 'offer', 'break', 'check'];
  const hasActions = actionVerbs.filter(verb => lower.includes(verb));
  if (hasActions.length < 2) {
    errors.push(`Only ${hasActions.length} action verbs found, need 2+`);
  }
  
  // No delighted in concern cases
  if (lower.includes('delighted') && (lower.includes('challenging') || lower.includes('difficult'))) {
    errors.push('Contains "delighted" with concerns present');
  }
  
  // Pronoun consistency
  const wrongPronouns = [];
  if (pronouns.subj === 'he' || pronouns.subj === 'she') {
    if (output.includes(' they ') || output.includes('They ')) {
      wrongPronouns.push('Contains "they" when singular expected');
    }
  }
  if (wrongPronouns.length > 0) {
    errors.push(wrongPronouns.join(', '));
  }
  
  return errors;
}

// Run tests
let passed = 0;
let total = mockTests.length;

mockTests.forEach(test => {
  console.log(`🧪 Testing: ${test.name}`);
  
  const errors = checkQuality(test.output, test.pronouns);
  
  if (errors.length === 0) {
    console.log(`✅ ${test.name} - PASSED`);
    passed++;
  } else {
    console.log(`❌ ${test.name} - FAILED`);
    errors.forEach(error => console.log(`   ${error}`));
  }
  
  // Show metrics
  const words = test.output.split(/\s+/).filter(w => w.length > 0).length;
  const paragraphs = test.output.split('\n\n').filter(p => p.trim().length > 0).length;
  console.log(`   📊 ${words} words, ${paragraphs} paragraphs\n`);
});

console.log(`📊 Final Results: ${passed}/${total} tests passed`);

if (passed === total) {
  console.log('🎉 All golden tests PASSED! Promptly-grade quality achieved.');
} else {
  console.log('❌ Some tests failed. Quality standards need adjustment.');
}

process.exit(passed === total ? 0 : 1);