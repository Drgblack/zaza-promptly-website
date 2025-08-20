'use client';

import React, { useState } from 'react';
import { useABTest } from '@/lib/ab-testing';
import { useAnalytics } from '@/hooks/useAnalytics';

interface SnippetDemoABTestProps {
  className?: string;
}

const snippetExamples = [
  {
    id: 'parent_email',
    title: 'Parent Communication',
    prompt: 'Write a professional email to parents about homework completion',
    result: `Dear Parents,

I hope this message finds you well. I wanted to reach out regarding homework completion patterns I've noticed in class.

Your child shows excellent engagement during lessons and contributes meaningfully to discussions. However, I've observed some inconsistency with homework submissions over the past two weeks.

I'd love to chat briefly about how we can work together to support your child's learning at home. Would you be available for a quick call this week?

Best regards,
Ms. Johnson`
  },
  {
    id: 'student_feedback',
    title: 'Student Report Comments',
    prompt: 'Write encouraging feedback for a student improving in mathematics',
    result: `[Student Name] has shown remarkable growth in mathematical reasoning this term. Their perseverance with challenging problems demonstrates a developing growth mindset.

Strengths:
• Consistently attempts multi-step problems
• Shows clear working in algebraic expressions
• Asks thoughtful questions during lessons

Next steps:
• Continue practicing fraction operations
• Build confidence with word problems
• Consider joining the math support group

Overall, [Student Name] is making steady progress and should feel proud of their mathematical journey this term.`
  },
  {
    id: 'lesson_plan',
    title: 'Quick Lesson Outline',
    prompt: 'Create a 45-minute lesson on photosynthesis for grade 7',
    result: `Lesson: Introduction to Photosynthesis (45 mins)

Opening Hook (5 mins):
• Show time-lapse video of plant growth
• Ask: "What do plants need to survive and grow?"

Direct Instruction (15 mins):
• Photosynthesis equation: 6CO₂ + 6H₂O + light → C₆H₁₂O₆ + 6O₂
• Role of chloroplasts and chlorophyll
• Light vs. dark reactions (simplified)

Guided Practice (15 mins):
• Diagram labeling activity
• Think-pair-share on everyday examples

Independent Work (8 mins):
• Exit ticket: 3-2-1 (3 facts, 2 questions, 1 connection)

Wrap-up (2 mins):
• Preview tomorrow's lab investigation`
  }
];

export function SnippetDemoABTest({ className = '' }: SnippetDemoABTestProps) {
  const layoutTest = useABTest('snippet_demo_layout');
  const { trackSnippetGenerate, trackExperimentConversion } = useAnalytics();
  const [activeExample, setActiveExample] = useState(snippetExamples[0]);
  const [isGenerating, setIsGenerating] = useState(false);

  if (layoutTest.isLoading) {
    return (
      <div className={`animate-pulse ${className}`}>
        <div className="h-64 bg-gray-200 rounded-lg"></div>
      </div>
    );
  }

  const isTabsBeside = layoutTest.isInVariant('variant_a');

  const handleExampleSelect = (example: typeof snippetExamples[0]) => {
    setActiveExample(example);
    trackSnippetGenerate(example.id, example.prompt);
    layoutTest.trackConversion('example_interaction');
  };

  const handleGenerateClick = () => {
    setIsGenerating(true);
    trackSnippetGenerate('custom_prompt', 'user_generated');
    layoutTest.trackConversion('generate_click');
    
    // Simulate generation time
    setTimeout(() => {
      setIsGenerating(false);
    }, 2000);
  };

  if (isTabsBeside) {
    return (
      <div 
        className={`snippet-demo-ab-test bg-white rounded-xl shadow-lg overflow-hidden ${className}`}
        data-ab-test="snippet_demo_layout"
        data-ab-variant={layoutTest.assignment}
      >
        <div className="grid md:grid-cols-5 gap-0 min-h-[400px]">
          {/* Tabs beside (left side) */}
          <div className="md:col-span-2 bg-gray-50 border-r">
            <div className="p-4 border-b bg-gray-100">
              <h3 className="font-semibold text-gray-900">Try These Examples</h3>
              <p className="text-sm text-gray-600 mt-1">Click to see AI-generated content</p>
            </div>
            <div className="space-y-1 p-2">
              {snippetExamples.map((example) => (
                <button
                  key={example.id}
                  onClick={() => handleExampleSelect(example)}
                  className={`w-full text-left p-3 rounded-md transition-all duration-200 ${
                    activeExample.id === example.id
                      ? 'bg-purple-100 border-l-4 border-purple-500 text-purple-900'
                      : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  <div className="font-medium text-sm">{example.title}</div>
                  <div className="text-xs text-gray-500 mt-1 line-clamp-2">
                    {example.prompt}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Content area (right side) */}
          <div className="md:col-span-3 flex flex-col">
            <div className="p-4 border-b bg-purple-50">
              <h4 className="font-semibold text-purple-900 mb-2">{activeExample.title}</h4>
              <p className="text-sm text-purple-700 bg-white p-3 rounded border">
                <span className="font-medium">Prompt:</span> {activeExample.prompt}
              </p>
            </div>
            <div className="flex-1 p-4">
              <div className="h-full bg-gray-50 rounded-lg p-4 font-mono text-sm text-gray-800 whitespace-pre-line border-2 border-dashed border-gray-200">
                {activeExample.result}
              </div>
            </div>
            <div className="p-4 border-t bg-gray-50">
              <button
                onClick={handleGenerateClick}
                disabled={isGenerating}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-200 disabled:opacity-50"
              >
                {isGenerating ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Generating...
                  </div>
                ) : (
                  'Try Your Own Prompt'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Control version: tabs above
  return (
    <div 
      className={`snippet-demo-ab-test bg-white rounded-xl shadow-lg overflow-hidden ${className}`}
      data-ab-test="snippet_demo_layout"
      data-ab-variant={layoutTest.assignment}
    >
      {/* Tabs above */}
      <div className="border-b bg-gray-50">
        <div className="flex flex-wrap gap-1 p-2">
          {snippetExamples.map((example) => (
            <button
              key={example.id}
              onClick={() => handleExampleSelect(example)}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                activeExample.id === example.id
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border'
              }`}
            >
              {example.title}
            </button>
          ))}
        </div>
      </div>

      {/* Content area below */}
      <div className="p-6">
        <div className="mb-4">
          <h4 className="font-semibold text-gray-900 mb-2">{activeExample.title}</h4>
          <p className="text-sm text-gray-600 bg-purple-50 p-3 rounded border">
            <span className="font-medium">Prompt:</span> {activeExample.prompt}
          </p>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm text-gray-800 whitespace-pre-line border-2 border-dashed border-gray-200 min-h-[200px] mb-4">
          {activeExample.result}
        </div>
        
        <button
          onClick={handleGenerateClick}
          disabled={isGenerating}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-200 disabled:opacity-50"
        >
          {isGenerating ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Generating...
            </div>
          ) : (
            'Try Your Own Prompt'
          )}
        </button>
      </div>
    </div>
  );
}