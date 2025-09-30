import { runPromptlyPipeline } from '../src/lib/ai/promptlyPipeline';

async function testPronounPipeline() {
  console.log('🧪 Testing GT-PRONOUN cases...\n');
  
  const testCases = [
    {
      name: 'GT-PRONOUN-001: Sandra (She/Her)',
      input: "Sandra is naughty in class and bad at maths homework. She's late most days and disrupts others during lessons.",
      pronouns: { subj: 'she', obj: 'her', possAdj: 'her' }
    },
    {
      name: 'GT-PRONOUN-002: John (He/Him)', 
      input: "John helps others but forgets homework sometimes. He's good at explaining things to classmates.",
      pronouns: { subj: 'he', obj: 'him', possAdj: 'his' }
    },
    {
      name: 'GT-PRONOUN-003: Alex (They/Them)',
      input: "Alex talks with friends during lessons and finds it hard to stay focused. They are creative and good at art projects.",
      pronouns: { subj: 'they', obj: 'them', possAdj: 'their' }
    },
    {
      name: 'GT-PRONOUN-004: Johnny (Auto-detect)',
      input: "Johnny is late and sometimes forgets homework. He tries hard in sports and is popular with classmates.",
      pronouns: undefined
    }
  ];

  for (const testCase of testCases) {
    console.log(`\n=== ${testCase.name} ===`);
    console.log(`Input: ${testCase.input}`);
    console.log(`Expected pronouns: ${testCase.pronouns ? `${testCase.pronouns.subj}/${testCase.pronouns.obj}/${testCase.pronouns.possAdj}` : 'auto-detect'}`);
    
    try {
      const result = await runPromptlyPipeline(testCase.input, testCase.pronouns);
      
      console.log(`\n✅ Output (${result.polished.split(/\s+/).length} words):`);
      console.log(result.polished);
      
      // Check word count
      const wordCount = result.polished.split(/\s+/).length;
      const wordCountPass = wordCount >= 95 && wordCount <= 120;
      console.log(`\nWord count: ${wordCount} ${wordCountPass ? '✅' : '❌'} (95-120)`);
      
      // Check paragraphs
      const paragraphs = result.polished.split('\n\n').filter(p => p.trim().length > 0);
      const paragraphPass = paragraphs.length === 3;
      console.log(`Paragraphs: ${paragraphs.length} ${paragraphPass ? '✅' : '❌'} (should be 3)`);
      
      // Check pronouns
      const text = result.polished.toLowerCase();
      let pronounPass = true;
      let pronounMessage = '';
      
      if (testCase.pronouns) {
        const targetSubj = testCase.pronouns.subj.toLowerCase();
        const targetObj = testCase.pronouns.obj.toLowerCase();
        const targetPoss = testCase.pronouns.possAdj.toLowerCase();
        
        if (targetSubj === 'she') {
          pronounPass = text.includes('she') && !text.includes(' he ') && !text.includes('they');
          pronounMessage = `Contains she/her: ${text.includes('she') && text.includes('her')}`;
        } else if (targetSubj === 'he') {
          pronounPass = text.includes(' he ') && !text.includes('she') && !text.includes('they');
          pronounMessage = `Contains he/him: ${text.includes(' he ') && (text.includes('him') || text.includes('his'))}`;
        } else if (targetSubj === 'they') {
          pronounPass = text.includes('they') && !text.includes(' he ') && !text.includes('she');
          pronounMessage = `Contains they/them: ${text.includes('they') && (text.includes('them') || text.includes('their'))}`;
        }
      } else {
        // Auto-detect should use he/him for Johnny
        pronounPass = text.includes(' he ') && !text.includes('she') && !text.includes('they');
        pronounMessage = `Auto-detected he/him: ${pronounPass}`;
      }
      
      console.log(`Pronouns: ${pronounMessage} ${pronounPass ? '✅' : '❌'}`);
      
    } catch (error) {
      console.log(`❌ Error: ${error}`);
    }
    
    console.log('\n' + '='.repeat(60));
  }
}

testPronounPipeline().catch(console.error);