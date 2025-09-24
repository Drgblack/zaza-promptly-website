'use client';

import { ExternalLink, ArrowRight, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import type { ZaraAnswer } from '@/lib/zara/schema';

type ZaraAnswerProps = {
  answer: ZaraAnswer;
};

export function ZaraAnswer({ answer }: ZaraAnswerProps) {
  const [copiedItems, setCopiedItems] = useState<Set<string>>(new Set());

  const copyToClipboard = async (text: string, itemId: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedItems(prev => new Set([...prev, itemId]));
      setTimeout(() => {
        setCopiedItems(prev => {
          const updated = new Set(prev);
          updated.delete(itemId);
          return updated;
        });
      }, 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const handleCtaClick = (ctaType: 'improve_in_promptly' | 'start_trial') => {
    if (ctaType === 'improve_in_promptly') {
      // Build deep link with context
      const params = new URLSearchParams();
      Object.entries(answer.context_payload).forEach(([key, value]) => {
        if (value) {
          params.append(`ctx_${key}`, value.toString());
        }
      });
      window.open(`https://app.zazapromptly.com?${params.toString()}`, '_blank');
    } else {
      window.open('/pricing', '_blank');
    }
  };

  return (
    <div className="max-w-[90%] bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 px-4 py-3 border-b border-gray-200 dark:border-gray-600">
        <h4 className="font-semibold text-purple-800 dark:text-purple-200 text-sm">
          {answer.title}
        </h4>
      </div>

      <div className="p-4 space-y-4">
        {/* What to Do */}
        <div>
          <h5 className="font-medium text-gray-900 dark:text-gray-100 text-xs mb-2 flex items-center gap-1">
            ✅ What to do
          </h5>
          <ul className="space-y-1">
            {answer.what_to_do.map((item, index) => (
              <li key={index} className="text-sm text-gray-700 dark:text-gray-300 flex items-start gap-2">
                <span className="text-purple-600 dark:text-purple-400 font-bold text-xs mt-0.5">
                  {index + 1}.
                </span>
                <span className="flex-1">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Say This (Scripts) */}
        {answer.say_this.length > 0 && (
          <div>
            <h5 className="font-medium text-gray-900 dark:text-gray-100 text-xs mb-2 flex items-center gap-1">
              💬 Say this
            </h5>
            <div className="space-y-2">
              {answer.say_this.map((script, index) => (
                <div 
                  key={index}
                  className="bg-blue-50 dark:bg-blue-900/20 border-l-2 border-blue-400 p-2 rounded-r text-sm"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-blue-800 dark:text-blue-200 italic flex-1">
                      "{script}"
                    </span>
                    <button
                      onClick={() => copyToClipboard(script, `script-${index}`)}
                      className="flex-shrink-0 p-1 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200"
                      title="Copy script"
                    >
                      {copiedItems.has(`script-${index}`) ? (
                        <Check className="w-3 h-3" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Differentiation */}
        {answer.differentiation.length > 0 && (
          <div>
            <h5 className="font-medium text-gray-900 dark:text-gray-100 text-xs mb-2 flex items-center gap-1">
              🎯 Differentiation
            </h5>
            <ul className="space-y-1">
              {answer.differentiation.map((item, index) => (
                <li key={index} className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2">
                  <span className="text-green-600 dark:text-green-400 text-xs mt-0.5">•</span>
                  <span className="flex-1">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Next Steps */}
        {answer.next_steps.length > 0 && (
          <div>
            <h5 className="font-medium text-gray-900 dark:text-gray-100 text-xs mb-2 flex items-center gap-1">
              🚀 Next steps
            </h5>
            <ul className="space-y-1">
              {answer.next_steps.map((step, index) => (
                <li key={index} className="text-sm text-gray-700 dark:text-gray-300 flex items-start gap-2">
                  <span className="text-amber-600 dark:text-amber-400 text-xs mt-0.5">→</span>
                  <span className="flex-1">{step}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-100 dark:border-gray-700">
          <button
            onClick={() => handleCtaClick('improve_in_promptly')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white rounded-md text-xs font-medium transition-colors"
          >
            <span>{answer.ctas.improve_in_promptly}</span>
            <ExternalLink className="w-3 h-3" />
          </button>
          
          <button
            onClick={() => handleCtaClick('start_trial')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded-md text-xs font-medium transition-colors"
          >
            <span>{answer.ctas.start_trial}</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
}