import { setRequestLocale } from 'next-intl/server';
import { SimplifiedSnippetTool } from '@/components/snippet-tool/SimplifiedSnippetTool';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Snippet Demo - Zaza Promptly',
  description: 'Private demo of the Zaza Promptly snippet tool for internal testing.',
  robots: {
    index: false,
    follow: false
  }
};

type Props = {
  params: Promise<{locale: string}>;
};

export default async function SnippetDemoPage({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-purple-900/20">
      {/* Header */}
      <section className="py-16 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Snippet Tool Demo
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300">
            Private testing environment for the simplified snippet tool
          </p>
        </div>
      </section>

      {/* Snippet Tool */}
      <SimplifiedSnippetTool />
    </div>
  );
}