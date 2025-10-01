# Promptly Gold-Standard Deployment Verification

## Deployment URLs to Check

1. **Preview Deployment (most likely)**:
   - https://zaza-promptly-website-feat-promptly-gold-pass.vercel.app/
   - or check Vercel dashboard for unique preview URL

2. **Backup Options**:
   - https://zaza-promptly-website-git-feat-promptly-gold-pass.vercel.app/
   - Check GitHub PR page for deployment link

## Test Cases to Verify

### 1. GT-REFRAME-HARSH Test
**Input**: "Johnny is a naughty boy who is always lazy and never brings homework. He disrupts the class."
- Set pronoun to "He/Him"
- **Expected**: 
  - Output should start with "I'd like to share how Johnny is managing focus"
  - Should contain "finding it hard to stay motivated"
  - Should end with "agree one cue word"
  - No harsh words (lazy, naughty) should appear

### 2. GT-CLOSER-VARIETY Test  
**Input**: "Mary has been late and is missing the settling-in time."
- Set pronoun to "She/Her"
- **Expected**:
  - Should use attendance opener
  - Should end with attendance-specific closer about "morning routine"

### 3. GT-VERB-AGREEMENT Test
**Input**: "John helps others but forgets homework sometimes. He finishes late and is often tired."
- Set pronoun to "Auto"
- **Expected**:
  - Should use "he/his" pronouns throughout
  - Should have proper verb agreement (no "he've")
  - Should use homework opener/closer

### 4. GT-THEY-BOTH-TABS Test
**Input**: "Alex talks with friends during lessons and finds it hard to stay focused. They are creative and good at art projects."
- Set pronoun to "They/Them"
- **Expected**:
  - Should use only "they/them/their" pronouns
  - No "he/she" pronouns should appear
  - Proper verb agreement (they are, they have)

## Debug Mode Verification

With `NEXT_PUBLIC_DEBUG_SNIPPET=1` enabled in Preview, you should see:
- Debug footer showing: "Pipeline v3.0-GOLD • KB 411cf90 • Build {latest}"
- Pronoun debug info showing enforcement status (✓ or ✗)
- Opener type (attendance, homework, focus, praise, general)

## Screenshots to Capture

1. **Homepage** - Verify TrySnippet component loads
2. **GT-REFRAME-HARSH** output with debug info
3. **GT-VERB-AGREEMENT** output showing proper grammar
4. **GT-THEY-BOTH-TABS** output with they/them pronouns
5. **Mobile view** of one test case

## Verification Steps

1. Navigate to the preview URL
2. Scroll to "Try a parent message in 30 seconds" section
3. For each test case above:
   - Enter the exact input text
   - Select the specified pronoun option
   - Click "Generate"
   - Verify the output matches expectations
   - Take screenshot with debug info visible
4. Test on mobile viewport
5. Verify no console errors

## Success Criteria

✅ All test inputs generate expected outputs
✅ Debug footer shows Pipeline v3.0-GOLD
✅ Pronoun enforcement shows ✓ for all cases
✅ No harsh words appear in outputs
✅ Proper verb agreement in all cases
✅ Context-aware openers/closers
✅ Mobile responsive
✅ No console errors