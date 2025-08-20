'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Loader2, Sparkles, Copy, RefreshCw } from 'lucide-react';
import { useAnalytics } from '@/hooks/useAnalytics';

interface SampleOutput {
  studentComment: string;
  parentMessage: string;
  reportOutline: string;
}

const SAMPLE_TOPICS = [
  { value: 'mathematics_improvement', label: 'Mathematics Improvement', description: 'Student showing progress in math skills' },
  { value: 'reading_comprehension', label: 'Reading Comprehension', description: 'Student developing reading skills' },
  { value: 'behavior_concern', label: 'Behavior Concern', description: 'Addressing classroom behavior issues' },
  { value: 'creative_writing', label: 'Creative Writing', description: 'Student excelling in creative expression' },
  { value: 'participation', label: 'Class Participation', description: 'Student engagement and participation' },
  { value: 'teamwork', label: 'Teamwork & Collaboration', description: 'Working well with others' },
];

const SAMPLE_OUTPUTS: Record<string, SampleOutput> = {
  mathematics_improvement: {
    studentComment: "Sarah has shown remarkable improvement in mathematics this term. Her problem-solving strategies have become more sophisticated, and she consistently demonstrates a growth mindset when tackling challenging concepts. Her work with fractions shows clear understanding of mathematical relationships.",
    parentMessage: "I wanted to share some exciting news about Sarah's progress in mathematics! She's been working hard on problem-solving strategies, and it's really paying off. Her confidence has grown tremendously, especially when working with fractions. I'd love to discuss ways we can continue supporting her mathematical development at home.",
    reportOutline: "• Mathematical Problem-Solving: Shows improved strategic thinking\n• Conceptual Understanding: Strong grasp of fractions and relationships\n• Growth Mindset: Approaches challenges with persistence\n• Areas for Growth: Continue building fluency with multi-step problems\n• Recommendations: Practice word problems, explore math games at home"
  },
  reading_comprehension: {
    studentComment: "Marcus has made significant strides in reading comprehension this semester. He demonstrates strong inferential thinking skills and can identify main ideas effectively. His discussions during guided reading show deep engagement with text and growing vocabulary knowledge.",
    parentMessage: "Marcus is doing wonderfully with his reading development! His comprehension skills have really blossomed - he's able to make connections between stories and his own experiences. His vocabulary is expanding rapidly, and he loves sharing what he's learned from his books. Keep encouraging his love of reading at home!",
    reportOutline: "• Reading Level: Advanced to Grade 4 level (from Grade 3)\n• Comprehension Skills: Strong inference and main idea identification\n• Vocabulary Growth: 150+ new words acquired this term\n• Discussion Participation: Excellent contributions to literature circles\n• Next Steps: Challenge with chapter books, explore different genres"
  },
  behavior_concern: {
    studentComment: "While Emma is a bright and capable student, she has been experiencing some challenges with self-regulation during group activities. We've been working together on strategies for managing frustration and taking turns. Her academic work remains strong, and I'm confident these social skills will continue to develop.",
    parentMessage: "I wanted to touch base about Emma's social interactions in class. While she's academically thriving, we've noticed some challenges during group work where she sometimes struggles with sharing ideas and taking turns. We're working on some strategies together, and I'd love to partner with you on consistent approaches at home.",
    reportOutline: "• Academic Performance: Exceeds grade level expectations\n• Social Skills: Working on turn-taking and collaboration\n• Self-Regulation: Developing coping strategies for frustration\n• Intervention: Daily check-ins, visual reminder cards\n• Home-School Partnership: Consistent expectations and praise for positive choices"
  },
  creative_writing: {
    studentComment: "Alex has truly found their voice as a creative writer this year. Their stories are imaginative, well-structured, and filled with vivid descriptions that bring characters to life. They take creative risks with language and consistently craft engaging narratives that captivate their audience.",
    parentMessage: "Alex's creative writing has been absolutely incredible to watch develop! Their imagination is so vivid, and they've learned to craft stories that really draw readers in. The way they describe characters and settings shows such mature thinking. I'd encourage continuing this passion - maybe a creative writing journal at home?",
    reportOutline: "• Writing Voice: Strong, unique narrative style developing\n• Story Structure: Clear beginning, middle, and end organization\n• Descriptive Language: Rich vocabulary and sensory details\n• Creativity: Original ideas and willingness to take creative risks\n• Publishing Opportunities: Submit to school literary magazine, explore writing contests"
  },
  participation: {
    studentComment: "Jordan has become an increasingly confident contributor to our classroom community. Their thoughtful questions and willingness to share ideas enrich our discussions. They demonstrate active listening skills and often build upon their classmates' contributions in meaningful ways.",
    parentMessage: "Jordan's participation in class has been wonderful to see grow! They're asking such thoughtful questions and sharing ideas confidently. It's clear they're really listening to their classmates and building on what others say. This kind of engagement shows they're not just learning content but developing important communication skills.",
    reportOutline: "• Oral Communication: Confident and clear expression of ideas\n• Active Listening: Builds on peers' contributions effectively\n• Question Formation: Asks probing, thoughtful questions\n• Community Building: Positive influence on classroom culture\n• Growth Areas: Continue encouraging leadership opportunities in discussions"
  },
  teamwork: {
    studentComment: "Riley exemplifies excellent collaboration skills. They listen respectfully to group members, contribute ideas constructively, and help ensure everyone's voice is heard. Their natural leadership qualities shine through in group projects, where they balance task completion with maintaining positive group dynamics.",
    parentMessage: "Riley's teamwork skills have been such a strength in our classroom! They have a natural ability to bring out the best in their group members while keeping everyone focused on their goals. It's wonderful to see how they make sure everyone feels included and valued. These are skills that will serve them well throughout life!",
    reportOutline: "• Leadership: Natural ability to guide without dominating\n• Inclusion: Ensures all group members participate meaningfully\n• Conflict Resolution: Mediates disagreements constructively\n• Task Management: Balances relationship and task focus effectively\n• Peer Recognition: Frequently chosen as group leader by classmates"
  }
};

export function SampleGenerator({ compact = false }: { compact?: boolean }) {
  const [selectedTopic, setSelectedTopic] = useState<string>('');
  const [studentName, setStudentName] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showOutput, setShowOutput] = useState(false);
  const [currentOutput, setCurrentOutput] = useState<SampleOutput | null>(null);
  const { trackSnippetGenerate } = useAnalytics();

  const generateSample = async () => {
    if (!selectedTopic) return;

    setIsGenerating(true);
    trackSnippetGenerate('demo_sample_generate', selectedTopic);

    // Simulate API call with realistic delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    const sample = SAMPLE_OUTPUTS[selectedTopic];
    
    // Personalize with student name if provided
    let personalizedSample = { ...sample };
    if (studentName.trim()) {
      const name = studentName.trim();
      personalizedSample = {
        studentComment: sample.studentComment.replace(/Sarah|Marcus|Emma|Alex|Jordan|Riley/g, name),
        parentMessage: sample.parentMessage.replace(/Sarah|Marcus|Emma|Alex|Jordan|Riley/g, name),
        reportOutline: sample.reportOutline
      };
    }

    setCurrentOutput(personalizedSample);
    setShowOutput(true);
    setIsGenerating(false);

    // Update streak counter if available
    if ((window as any).updateStreakCounter) {
      (window as any).updateStreakCounter();
    }
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    trackSnippetGenerate('demo_copy_text', type);
    // Could add toast notification here
  };

  const selectedTopicData = SAMPLE_TOPICS.find(t => t.value === selectedTopic);

  if (compact) {
    return (
      <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200">
        <CardHeader className="pb-3">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-purple-600" />
            <CardTitle className="text-lg">Try AI Sample Generator</CardTitle>
          </div>
          <CardDescription className="text-sm">
            See how AI generates professional comments and messages
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-1 gap-3">
            <div>
              <Label htmlFor="topic-select" className="text-sm font-medium">Choose a scenario</Label>
              <Select value={selectedTopic} onValueChange={setSelectedTopic}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select a teaching scenario..." />
                </SelectTrigger>
                <SelectContent>
                  {SAMPLE_TOPICS.map((topic) => (
                    <SelectItem key={topic.value} value={topic.value}>
                      <div>
                        <div className="font-medium">{topic.label}</div>
                        <div className="text-xs text-gray-600">{topic.description}</div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="student-name" className="text-sm font-medium">Student name (optional)</Label>
              <Input
                id="student-name"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                placeholder="Enter student name..."
                className="mt-1"
              />
            </div>
          </div>

          <Button 
            onClick={generateSample} 
            disabled={!selectedTopic || isGenerating}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                Generate Sample
              </>
            )}
          </Button>

          {showOutput && currentOutput && (
            <div className="space-y-4 mt-4 pt-4 border-t border-purple-200">
              <div className="space-y-3">
                <div className="bg-white rounded-lg p-3 border">
                  <div className="flex justify-between items-center mb-2">
                    <Badge variant="secondary" className="text-xs">Student Comment</Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(currentOutput.studentComment, 'student_comment')}
                      className="h-6 w-6 p-0"
                    >
                      <Copy className="w-3 h-3" />
                    </Button>
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed">{currentOutput.studentComment}</p>
                </div>

                <div className="bg-white rounded-lg p-3 border">
                  <div className="flex justify-between items-center mb-2">
                    <Badge variant="secondary" className="text-xs">Parent Message</Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(currentOutput.parentMessage, 'parent_message')}
                      className="h-6 w-6 p-0"
                    >
                      <Copy className="w-3 h-3" />
                    </Button>
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed">{currentOutput.parentMessage}</p>
                </div>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowOutput(false)}
                className="w-full"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Try Another
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  // Full-size version would be similar but with more space and detail
  return (
    <div className="space-y-6">
      {/* Implementation for full version would go here */}
    </div>
  );
}