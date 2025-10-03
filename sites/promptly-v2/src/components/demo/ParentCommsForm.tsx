'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Copy, Check } from 'lucide-react';

export function ParentCommsForm() {
  const t = useTranslations('draft.demo.form');
  const [formData, setFormData] = useState({
    student: '',
    context: '',
    tone: 'warm',
    length: 'medium'
  });
  const [result, setResult] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Generate mock result based on inputs
    const mockResult = generateMockDraft(formData);
    setResult(mockResult);
    setIsGenerating(false);

    // Track GA4 event
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'draft_demo_generated', {
        tab: 'parent',
        tone: formData.tone,
        length: formData.length,
        locale: document.documentElement.lang || 'en'
      });
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);

      // Track GA4 event
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'demo_copy_clicked', {
          tab: 'parent',
          locale: document.documentElement.lang || 'en'
        });
      }
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="student" className="block text-sm font-medium text-gray-700 mb-2">
            {t('student')}
          </label>
          <input
            type="text"
            id="student"
            value={formData.student}
            onChange={(e) => setFormData({...formData, student: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            placeholder="e.g., Emma"
            required
          />
        </div>

        <div>
          <label htmlFor="context" className="block text-sm font-medium text-gray-700 mb-2">
            {t('context')}
          </label>
          <textarea
            id="context"
            value={formData.context}
            onChange={(e) => setFormData({...formData, context: e.target.value})}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            placeholder="e.g., Great progress in math this week, helped classmates"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="tone" className="block text-sm font-medium text-gray-700 mb-2">
              {t('tone')}
            </label>
            <select
              id="tone"
              value={formData.tone}
              onChange={(e) => setFormData({...formData, tone: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            >
              <option value="pro">{t('toneOpts.pro')}</option>
              <option value="warm">{t('toneOpts.warm')}</option>
              <option value="concise">{t('toneOpts.concise')}</option>
            </select>
          </div>

          <div>
            <label htmlFor="length" className="block text-sm font-medium text-gray-700 mb-2">
              {t('length')}
            </label>
            <select
              id="length"
              value={formData.length}
              onChange={(e) => setFormData({...formData, length: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            >
              <option value="short">{t('lengthOpts.short')}</option>
              <option value="med">{t('lengthOpts.med')}</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          disabled={isGenerating}
          className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isGenerating ? 'Generating...' : t('submit')}
        </button>

        <p className="text-xs text-gray-500 mt-2">
          {t('privacyNote')}
        </p>
      </form>

      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-700">
          {t('resultLabel')}
        </label>
        <div className="relative">
          <textarea
            value={result}
            readOnly
            rows={8}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700"
            placeholder="Your generated draft will appear here..."
          />
          {result && (
            <button
              onClick={handleCopy}
              className="absolute top-2 right-2 p-2 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label={copied ? "Copied!" : t('copy')}
            >
              {copied ? (
                <Check className="w-4 h-4 text-green-500" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
          )}
        </div>
        
        {copied && (
          <div 
            className="text-sm text-green-600"
            aria-live="polite"
          >
            Copied to clipboard!
          </div>
        )}
      </div>
    </div>
  );
}

function generateMockDraft(formData: {student: string, context: string, tone: string, length: string}) {
  const templates = {
    warm: {
      short: `Hi [Parent],

I wanted to share some wonderful news about ${formData.student}! ${formData.context}. It's been a joy to see their progress.

Best regards,
[Teacher Name]`,
      medium: `Dear [Parent],

I hope this message finds you well. I wanted to take a moment to share some positive updates about ${formData.student}'s recent performance in class.

${formData.context}. Their enthusiasm and dedication have been truly remarkable, and it's clear that the support at home is making a significant difference.

Please feel free to reach out if you have any questions or would like to discuss ${formData.student}'s progress further.

Warm regards,
[Teacher Name]`
    },
    pro: {
      short: `Dear [Parent],

This message is to inform you of ${formData.student}'s recent academic progress. ${formData.context}.

Please contact me if you require further information.

Sincerely,
[Teacher Name]`,
      medium: `Dear [Parent],

I am writing to provide you with an update on ${formData.student}'s academic performance and classroom participation.

${formData.context}. This demonstrates strong engagement with the curriculum and positive peer interactions.

Should you wish to discuss ${formData.student}'s progress in more detail, please do not hesitate to schedule a meeting.

Kind regards,
[Teacher Name]`
    },
    concise: {
      short: `Hi [Parent],

Quick update: ${formData.student} ${formData.context}. Great work!

[Teacher Name]`,
      medium: `Hi [Parent],

Wanted to share: ${formData.student} ${formData.context}. Really pleased with their effort and attitude in class.

Let me know if you have any questions.

[Teacher Name]`
    }
  };

  return templates[formData.tone as keyof typeof templates][formData.length as 'short' | 'medium'] || 'Draft generated successfully!';
}