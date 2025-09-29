'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useDailyLimit } from '@/hooks/useDailyLimit';
import { Copy, Sparkles, Loader2, Share2, Link, Mail, Twitter, Facebook } from 'lucide-react';
import { generateSnippet } from '@/lib/ai/generateSnippet';
import type { SnippetInput } from '@/lib/ai/buildPrompt';

// Preset scaffolds for different message types
const presetScaffolds = {
  praise: "I wanted to share some positive news about [student name]. Today they...",
  behaviour: "I need to discuss [student name]'s behaviour today. What happened: ... Impact: ... Next step: ...",
  missing: "About the homework due on [date]: [student name] has not submitted... Next step: ...",
  attendance: "Following up about [student name]'s recent absences on [dates]... Impact: ... Support: ..."
};

interface SimplifiedSnippetToolProps {
  className?: string;
}

export function SimplifiedSnippetTool({ className }: SimplifiedSnippetToolProps) {
  const t = useTranslations('snippet');
  const { count, canGenerate, incrementCount } = useDailyLimit(5);
  
  // State
  const [roughNote, setRoughNote] = useState('');
  const [output, setOutput] = useState<{ polished: string; email: { greeting: string; body: string; closing: string; signature: string; } } | null>(null);
  const [activeTab, setActiveTab] = useState('polished');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [sharing, setSharing] = useState(false);

  // Toast state
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Show toast
  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Handle preset button click
  const handlePresetClick = (presetKey: keyof typeof presetScaffolds) => {
    if (!roughNote.trim()) {
      setRoughNote(presetScaffolds[presetKey]);
    }
  };

  // Polish the note
  const handlePolish = async () => {
    if (!canGenerate) {
      showToast("You've reached today's free limit. Start a free trial for unlimited access.", 'error');
      return;
    }

    if (!roughNote.trim()) {
      showToast("Please write a rough note or use a preset.", 'error');
      return;
    }

    setIsLoading(true);
    
    try {
      const input: SnippetInput = {
        roughNote: roughNote.trim(),
        tone: 'supportive', // Default tone
        language: 'en' // Default language
      };

      const result = await generateSnippet(input);
      setOutput(result);
      incrementCount();
      showToast("Message ready!");
      setActiveTab('polished');
    } catch (error) {
      console.error('Generation failed:', error);
      showToast("Something went wrong. Please try again.", 'error');
    } finally {
      setIsLoading(false);
    }
  };

  // Copy to clipboard
  const handleCopy = async () => {
    if (!output) return;
    
    let textToCopy = output.polished;
    
    if (activeTab === 'email') {
      const { greeting, body, closing, signature } = output.email;
      textToCopy = `${greeting}\n\n${body}\n\n${closing}\n${signature}`;
    }
    
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      showToast("Copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Copy failed:', error);
      showToast("Copy failed. Please try again.", 'error');
    }
  };

  // Share functionality
  const createShareLink = async () => {
    if (!output) return null;
    
    const contentToShare = activeTab === 'email' 
      ? `${output.email.greeting}\n\n${output.email.body}\n\n${output.email.closing}\n${output.email.signature}`
      : output.polished;

    try {
      setSharing(true);
      const response = await fetch('/api/share', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          content: contentToShare,
          locale: 'en' 
        })
      });

      if (!response.ok) throw new Error('Failed to create share link');
      
      const data = await response.json();
      return data.url;
    } catch (error) {
      console.error('Share failed:', error);
      showToast("Failed to create share link.", 'error');
      return null;
    } finally {
      setSharing(false);
    }
  };

  const handleCopyLink = async () => {
    const shareUrl = await createShareLink();
    if (shareUrl) {
      await navigator.clipboard.writeText(shareUrl);
      showToast("Share link copied!");
    }
  };

  const handleShareEmail = async () => {
    const shareUrl = await createShareLink();
    if (shareUrl) {
      const subject = encodeURIComponent("Try Promptly – AI Comment Helper");
      const body = encodeURIComponent(`I just used Promptly to polish a parent message and it saved me so much time.\n\nSee what it created: ${shareUrl}\n\nTry it free here: https://zazapromptly.com`);
      window.open(`mailto:?subject=${subject}&body=${body}`);
    }
  };

  const handleShareTwitter = async () => {
    const shareUrl = await createShareLink();
    if (shareUrl) {
      const text = encodeURIComponent(`Just used Promptly to polish a parent message – saved me time and stress! Try it free 👉 ${shareUrl} #EdTech #Teachers`);
      window.open(`https://twitter.com/intent/tweet?text=${text}`);
    }
  };

  const handleShareFacebook = async () => {
    const shareUrl = await createShareLink();
    if (shareUrl) {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`);
    }
  };

  return (
    <section 
      id="snippet-tool" 
      className={`py-16 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-purple-900/20 ${className}`}
    >
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">Try a parent message in 30 seconds</h2>
          <p className="text-muted-foreground">Real outputs from Promptly's Comment Agent. No signup needed.</p>
        </div>

        {/* Main Tool */}
        <Card className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border rounded-2xl">
          <CardContent className="p-8">
            <div className="space-y-8">
              {/* Quick Start Presets */}
              <div className="text-center">
                <h3 className="text-sm font-medium text-muted-foreground mb-4">Quick Start</h3>
                <div className="flex flex-wrap justify-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePresetClick('praise')}
                    className="text-sm"
                  >
                    Praise
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePresetClick('behaviour')}
                    className="text-sm"
                  >
                    Behaviour
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePresetClick('missing')}
                    className="text-sm"
                  >
                    Missing Homework
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePresetClick('attendance')}
                    className="text-sm"
                  >
                    Attendance
                  </Button>
                </div>
              </div>

              {/* Textarea - Centered */}
              <div className="max-w-2xl mx-auto">
                <Textarea
                  placeholder="Type or paste your rough note here…"
                  value={roughNote}
                  onChange={(e) => setRoughNote(e.target.value)}
                  className="min-h-[120px] resize-none"
                  rows={4}
                />
              </div>

              {/* Main Button - Big and Centered */}
              <div className="text-center space-y-4">
                <Button
                  onClick={handlePolish}
                  disabled={!canGenerate || isLoading || !roughNote.trim()}
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-12 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                      Polishing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-5 w-5 mr-2" />
                      Polish my note
                    </>
                  )}
                </Button>

                {/* Daily limit text */}
                <p className="text-sm text-muted-foreground">
                  {count} of 5 free messages used today
                </p>
              </div>

              {/* Output Card */}
              {output && (
                <div className="max-w-3xl mx-auto">
                  <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <div className="flex items-center justify-between mb-4">
                      <TabsList className="grid w-auto grid-cols-2">
                        <TabsTrigger value="polished">Polished</TabsTrigger>
                        <TabsTrigger value="email">Email-ready</TabsTrigger>
                      </TabsList>
                      <div className="flex items-center gap-2">
                        <Button
                          onClick={handleCopy}
                          variant="outline"
                          size="sm"
                          disabled={copied}
                        >
                          <Copy className="h-4 w-4 mr-1" />
                          {copied ? 'Copied!' : 'Copy'}
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              disabled={sharing}
                            >
                              <Share2 className="h-4 w-4 mr-1" />
                              Share
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent 
                            align="end" 
                            sideOffset={8} 
                            collisionPadding={8} 
                            className="w-48 z-50 shadow-lg bg-background"
                          >
                            <DropdownMenuItem onClick={handleCopyLink} disabled={sharing}>
                              <Link className="h-4 w-4 mr-2" />
                              Copy Link
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={handleShareEmail} disabled={sharing}>
                              <Mail className="h-4 w-4 mr-2" />
                              Share via Email
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={handleShareTwitter} disabled={sharing}>
                              <Twitter className="h-4 w-4 mr-2" />
                              Share to X (Twitter)
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={handleShareFacebook} disabled={sharing}>
                              <Facebook className="h-4 w-4 mr-2" />
                              Share to Facebook
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                    
                    <TabsContent value="polished">
                      <Card>
                        <CardContent className="p-6">
                          <div className="prose prose-sm max-w-none">
                            <div className="text-sm leading-relaxed whitespace-pre-wrap">
                              {output.polished}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                    
                    <TabsContent value="email">
                      <Card>
                        <CardContent className="p-6">
                          <div className="prose prose-sm max-w-none">
                            <div className="text-sm leading-relaxed whitespace-pre-wrap">
                              {`${output.email.greeting}\n\n${output.email.body}\n\n${output.email.closing}\n${output.email.signature}`}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                  </Tabs>
                </div>
              )}

              {/* Trial CTA - Only show after output */}
              {output && (
                <div className="text-center pt-4">
                  <div className="inline-flex items-center gap-4 px-6 py-3 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-lg border">
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      Love this? Save and refine in Promptly
                    </span>
                    <Button 
                      size="sm"
                      className="bg-purple-600 hover:bg-purple-700 text-white"
                    >
                      Start Free Trial
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-4 right-4 z-50">
          <div className={`px-4 py-2 rounded-lg shadow-lg ${
            toast.type === 'error' ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
          }`}>
            {toast.message}
          </div>
        </div>
      )}
    </section>
  );
}