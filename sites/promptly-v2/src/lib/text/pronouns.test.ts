import { inferPronouns, enforcePronouns, extractStudentName } from './pronouns';

// Simple unit test for pronouns
function testPronounEnforcement() {
  const text = "Maggie was naughty today. They arrived late and their behavior was disruptive. We need to support them.";
  
  // Test inference for Maggie
  const pronouns = inferPronouns("Maggie", "auto");
  console.log("Inferred pronouns for Maggie:", pronouns);
  
  // Test enforcement
  const corrected = enforcePronouns(text, pronouns);
  console.log("Original:", text);
  console.log("Corrected:", corrected);
  
  // Should be all she/her
  const hasCorrectPronouns = corrected.includes("She arrived") && 
                            corrected.includes("her behavior") && 
                            corrected.includes("support her");
  
  console.log("✅ Pronoun test passed:", hasCorrectPronouns);
  
  // Test name extraction
  const extractedName = extractStudentName("Maggie was naughty today");
  console.log("Extracted name:", extractedName);
  
  return hasCorrectPronouns && extractedName === "Maggie";
}

// Run test if this file is executed directly
if (require.main === module) {
  testPronounEnforcement();
}

export { testPronounEnforcement };