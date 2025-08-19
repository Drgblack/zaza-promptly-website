import { parseNotes, generateFromNotes } from '@/lib/snippetRules';

describe('snippetRules', () => {
  const testInput = "Johnny is most often late for class and is disruptive when he arrives, but he gets good results in maths and English.";

  describe('parseNotes', () => {
    it('should extract name correctly', () => {
      const result = parseNotes(testInput);
      expect(result.name).toBe('Johnny');
    });

    it('should identify positives and concerns', () => {
      const result = parseNotes(testInput);
      expect(result.positives).toContain('strong progress in core subjects');
      expect(result.concerns).toContain('punctuality and focus after lunch');
    });

    it('should handle input with no name', () => {
      const result = parseNotes("good at math but late");
      expect(result.name).toBeUndefined();
    });
  });

  describe('generateFromNotes', () => {
    it('should generate deterministic report comments', () => {
      const result1 = generateFromNotes(testInput, 'report');
      const result2 = generateFromNotes(testInput, 'report');
      
      expect(result1).toBe(result2); // Deterministic
      expect(result1).toContain('Johnny');
      expect(result1).toContain('strong progress in core subjects');
      expect(result1).toContain('punctuality and focus after lunch');
      expect(result1).toContain('next step');
    });

    it('should generate deterministic parent messages', () => {
      const result = generateFromNotes(testInput, 'parent');
      
      expect(result).toContain('Johnny');
      expect(result).toContain('Hi there');
      expect(result).toContain('challenging');
      expect(result).toContain('strong progress in core subjects');
      expect(result).toContain('Thanks for');
    });

    it('should generate deterministic IEP goals', () => {
      const result = generateFromNotes(testInput, 'iep');
      
      expect(result).toContain('**Present level:**');
      expect(result).toContain('**Goal');
      expect(result).toContain('**Supports:**');
      expect(result).toContain('**Success criteria:**');
      expect(result).toContain('Johnny');
    });

    it('should generate deterministic positive notes', () => {
      const result = generateFromNotes(testInput, 'praise');
      
      expect(result).toContain('Johnny');
      expect(result).toContain('proud');
      expect(result).toContain('strong progress in core subjects');
      expect(result).toContain('Keep');
    });

    it('should handle empty input gracefully', () => {
      const result = generateFromNotes('', 'report');
      
      expect(result).toBe("Add a few quick notes, and I'll turn them into a clear, professional message.");
    });

    it('should use "the student" when no name found', () => {
      const result = generateFromNotes('late and disruptive but good at math', 'report');
      
      expect(result).toContain('the student');
      expect(result).not.toContain('undefined');
    });

    it('should be completely deterministic', () => {
      // Test multiple times to ensure no randomness
      const results = Array.from({ length: 5 }, () => 
        generateFromNotes(testInput, 'report')
      );
      
      const firstResult = results[0];
      expect(results.every(r => r === firstResult)).toBe(true);
    });
  });
});