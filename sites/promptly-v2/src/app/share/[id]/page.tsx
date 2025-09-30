import { notFound } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';

// Simple in-memory storage - same as API route (replace with actual database)
const sharedSnippets = new Map<string, {
  id: string;
  content: string;
  timestamp: number;
  locale: string;
}>();

async function getSharedSnippet(id: string) {
  // In a real app, this would fetch from database
  // For now, we'll make an API call to our own endpoint
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/share?id=${id}`, {
      cache: 'no-store'
    });
    
    if (!response.ok) {
      return null;
    }
    
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch shared snippet:', error);
    return null;
  }
}

interface SharePageProps {
  params: {
    id: string;
  };
}

export default async function SharePage({ params }: SharePageProps) {
  const snippet = await getSharedSnippet(params.id);

  if (!snippet) {
    notFound();
  }

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-purple-900/20">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              Shared Parent Message
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Created with Promptly on {formatDate(snippet.timestamp)}
            </p>
          </div>

          {/* Snippet Card */}
          <Card className="mb-8 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
            <CardContent className="p-8">
              <div className="prose prose-sm max-w-none">
                <div className="text-base leading-relaxed whitespace-pre-wrap text-gray-900 dark:text-gray-100">
                  {snippet.content}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CTA Section */}
          <div className="text-center space-y-6">
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-2xl p-8 border">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                Love this? Save and refine in Promptly
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Create unlimited polished parent messages with tone controls, templates, and more.
              </p>
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                asChild
              >
                <a href="/#snippet-tool">
                  <Sparkles className="w-5 h-5 mr-2" />
                  Start Free Trial
                </a>
              </Button>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                5 free messages per day • No credit card required
              </p>
            </div>

            {/* Secondary CTA */}
            <div className="text-center">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Want to try creating your own parent message?
              </p>
              <Button
                variant="outline"
                size="lg"
                className="border-purple-200 text-purple-700 hover:bg-purple-50 dark:border-purple-700 dark:text-purple-300 dark:hover:bg-purple-900/20"
                asChild
              >
                <a href="/#snippet-tool">
                  Try Promptly Free
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function generateMetadata({ params }: SharePageProps) {
  return {
    title: 'Shared Parent Message | Promptly',
    description: 'A parent message created with Promptly - AI-powered communication tools for teachers.',
    robots: 'noindex, nofollow', // Prevent indexing of shared snippets
  };
}