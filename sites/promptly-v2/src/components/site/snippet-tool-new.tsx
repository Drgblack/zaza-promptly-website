'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useDailyLimit } from '@/hooks/useDailyLimit';
import { Copy, Sparkles } from 'lucide-react';

// Preset scaffolds for different message types
const presetScaffolds = {
  behaviour: "I wanted to share an update about behaviour this week…",
  praise: "I wanted to share some positive news about…",
  missing: "I'm writing about homework that was not submitted on…",
  attendance: "I'm following up about recent absences and how we can support…"
};

interface SnippetToolProps {
  className?: string;
}

export function SnippetTool({ className }: SnippetToolProps) {
  const t = useTranslations('snippet');
  const { count, isLimited, incrementCount } = useDailyLimit(5);
  
  // State
  const [studentName, setStudentName] = useState('');
  const [tone, setTone] = useState('supportive');
  const [language, setLanguage] = useState('en');
  const [roughNote, setRoughNote] = useState('');
  const [output, setOutput] = useState('');
  const [activeTab, setActiveTab] = useState('polished');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  // Toast state
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  // Show toast
  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Handle preset button click
  const handlePresetClick = (presetKey: keyof typeof presetScaffolds) => {
    setRoughNote(presetScaffolds[presetKey]);
  };

  // Generate message from preset only
  const handleGenerate = async () => {
    if (isLimited) {
      showToast(t('toast.rateLimited'), 'error');
      return;
    }

    if (!roughNote.trim()) {
      showToast(t('toast.needNote'), 'error');
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const polishedMessage = generatePolishedMessage(roughNote, tone, studentName);
      setOutput(polishedMessage);
      incrementCount();
      showToast(t('toast.generated'));
      setIsLoading(false);
    }, 1500);
  };

  // Improve user's rough note
  const handleImprove = async () => {
    if (isLimited) {
      showToast(t('toast.rateLimited'), 'error');
      return;
    }

    if (!roughNote.trim()) {
      showToast(t('toast.needNote'), 'error');
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const improvedMessage = generatePolishedMessage(roughNote, tone, studentName);
      setOutput(improvedMessage);
      incrementCount();
      showToast(t('toast.improved'));
      setIsLoading(false);
    }, 1500);
  };

  // Generate polished message based on input
  const generatePolishedMessage = (note: string, selectedTone: string, student: string): string => {
    const studentPart = student ? student : "your child";
    
    let tonePrefix = "";
    switch (selectedTone) {
      case 'supportive':
        tonePrefix = "I hope this message finds you well. ";
        break;
      case 'neutral':
        tonePrefix = "I am writing to inform you that ";
        break;
      case 'firm':
        tonePrefix = "I need to discuss an important matter regarding ";
        break;
      case 'enthusiastic':
        tonePrefix = "I'm delighted to share some wonderful news about ";
        break;
      default:
        tonePrefix = "I wanted to reach out regarding ";
    }

    return `${tonePrefix}${note}

This update concerns ${studentPart} and I wanted to ensure you were informed. If you have any questions or would like to discuss this further, please don't hesitate to contact me.

Best regards,
[Your name]`;
  };

  // Generate email-ready version
  const getEmailReadyMessage = (): string => {
    if (!output) return '';
    
    const greeting = "Hi there,\n\n";
    const closing = "\n\nWarm regards,\n[Teacher name]";
    
    return greeting + output + closing;
  };

  // Copy to clipboard
  const handleCopy = async () => {
    let textToCopy = output;
    
    if (activeTab === 'email') {
      textToCopy = getEmailReadyMessage();
    }
    
    if (textToCopy) {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      showToast(t('toast.copied'));
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Get output title
  const getOutputTitle = (): string => {
    if (studentName) {
      return t('output.titleWithStudent', { name: studentName });
    }
    return t('output.titleNoStudent');
  };

  return (
    <section id="snippet-tool" className={`py-16 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-purple-900/20 ${className}`}>
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">Try a parent message in 30 seconds</h2>
          <p className="text-muted-foreground">Real outputs from Promptly's Comment Agent. No signup needed.</p>
        </div>

        {/* Main Tool */}
        <Card className="max-w-5xl mx-auto">
          <CardContent className="p-6">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Left Column - Input */}
              <div className="space-y-6">
                {/* Quick Start Presets */}
                <div>
                  <Label className="text-sm font-medium">{t('quickStart')}</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePresetClick('behaviour')}
                      className="justify-start text-left h-auto py-2"
                    >
                      {t('presets.behaviour')}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePresetClick('praise')}
                      className="justify-start text-left h-auto py-2"
                    >
                      {t('presets.praise')}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePresetClick('missing')}
                      className="justify-start text-left h-auto py-2"
                    >
                      {t('presets.missing')}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePresetClick('attendance')}
                      className="justify-start text-left h-auto py-2"
                    >
                      {t('presets.attendance')}
                    </Button>
                  </div>
                </div>

                {/* Student Name */}
                <div>
                  <Label htmlFor="student-name">{t('student.label')}</Label>
                  <Input
                    id="student-name"
                    placeholder={t('student.placeholder')}
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                  />
                </div>

                {/* Tone */}
                <div>
                  <Label htmlFor="tone">{t('tone.label')}</Label>
                  <Select value={tone} onValueChange={setTone}>
                    <SelectTrigger id="tone">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="supportive">{t('tone.supportive')}</SelectItem>
                      <SelectItem value="neutral">{t('tone.neutral')}</SelectItem>
                      <SelectItem value="firm">{t('tone.firm')}</SelectItem>
                      <SelectItem value="enthusiastic">{t('tone.enthusiastic')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Language */}
                <div>
                  <Label htmlFor="language">{t('language.label')}</Label>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger id="language">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="de">German</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="it">Italian</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Rough Note */}
                <div>
                  <Label htmlFor="rough-note">{t('note.label')}</Label>
                  <Textarea
                    id="rough-note"
                    placeholder={t('note.placeholder')}
                    value={roughNote}
                    onChange={(e) => setRoughNote(e.target.value)}
                    className="min-h-[120px] resize-none"
                    aria-describedby="note-help"
                  />
                </div>

                {/* Limit Banner (when limited) */}
                {isLimited && (
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                    <h4 className="font-medium text-orange-900">{t('limit.banner.title')}</h4>
                    <p className="text-sm text-orange-700 mt-1">{t('limit.banner.body')}</p>
                    <Button 
                      className="mt-3 bg-purple-600 hover:bg-purple-700 text-white"
                      size="sm"
                    >
                      {t('btn.startTrial')}
                    </Button>
                  </div>
                )}

                {/* Buttons */}
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <Button
                      onClick={handleGenerate}
                      disabled={isLimited || isLoading || !roughNote.trim()}
                      className="flex-1"
                      aria-disabled={isLimited}
                    >
                      {isLoading ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      ) : (
                        <Sparkles className="h-4 w-4 mr-2" />
                      )}
                      {t('btn.generate')}
                    </Button>
                    <Button
                      onClick={handleImprove}
                      disabled={isLimited || isLoading || !roughNote.trim()}
                      variant="outline"
                      className="flex-1"
                      aria-disabled={isLimited}
                    >
                      {t('btn.improve')}
                    </Button>
                  </div>

                  {/* Helper text and CTA */}
                  <div className="text-center space-y-2">
                    <p className="text-xs text-muted-foreground">{count} of 5 free messages used today</p>
                    <Button 
                      className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                      size="lg"
                    >
                      {t('btn.startTrial')}
                    </Button>
                  </div>
                </div>
              </div>

              {/* Right Column - Output */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-gray-900 dark:text-gray-100">
                    {output ? getOutputTitle() : t('output.empty')}
                  </h3>
                  {output && (
                    <Button
                      onClick={handleCopy}
                      variant="outline"
                      size="sm"
                      className="shrink-0"
                    >
                      <Copy className="h-4 w-4 mr-1" />
                      {t('btn.copy')}
                    </Button>
                  )}
                </div>

                {output ? (
                  <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="polished">{t('output.tabs.polished')}</TabsTrigger>
                      <TabsTrigger value="email">{t('output.tabs.email')}</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="polished" className="mt-4">
                      <div 
                        className="min-h-[200px] p-4 bg-gray-50 dark:bg-gray-800 rounded-lg text-sm whitespace-pre-wrap"
                        aria-live="polite"
                      >
                        {output}
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="email" className="mt-4">
                      <div 
                        className="min-h-[200px] p-4 bg-gray-50 dark:bg-gray-800 rounded-lg text-sm whitespace-pre-wrap"
                        aria-live="polite"
                      >
                        {getEmailReadyMessage()}
                      </div>
                    </TabsContent>
                  </Tabs>
                ) : (
                  <div className="min-h-[200px] p-4 bg-gray-50 dark:bg-gray-800 rounded-lg text-sm text-gray-500 flex items-center justify-center">
                    {t('output.empty')}
                  </div>
                )}

                {/* Footer */}
                {output && (
                  <div className="text-center">
                    <p className="text-xs text-gray-500">{t('footer.madeWith')}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Sticky CTA Bar */}
            {output && (
              <div className="mt-8 p-4 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-lg border">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-900 dark:text-gray-100">
                    {t('stickyCta.text')}
                  </span>
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                    {t('btn.startTrial')}
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-4 right-4 z-50">
          <div className={`px-4 py-2 rounded-lg shadow-lg ${
            toast.type === 'error' ? 'bg-red-500 text-white' :
            toast.type === 'info' ? 'bg-blue-500 text-white' :
            'bg-green-500 text-white'
          }`}>
            {toast.message}
          </div>
        </div>
      )}
    </section>
  );
}