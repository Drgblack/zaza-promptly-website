'use client';

import { formatTeachingResponse, formatProductResponse, buildDeepLinkUrl } from '@/lib/zara/format';
import { ExternalLink, ArrowRight } from 'lucide-react';

type ZaraAnswerProps = {
  content: string;
  locale: string;
  topic?: string;
  isProductQuery?: boolean;
  userDraft?: string;
};

export function ZaraAnswer({ content, locale, topic = '', isProductQuery = false, userDraft }: ZaraAnswerProps) {
  const formattedResponse = isProductQuery 
    ? formatProductResponse(content, locale, topic)
    : formatTeachingResponse('Teacher Help', content, locale, topic, userDraft);

  const handleButtonClick = (button: typeof formattedResponse.buttons[0]) => {
    if (button.action === 'promptly' && button.contextPayload) {
      const deepLinkUrl = buildDeepLinkUrl('https://app.zazapromptly.com', button.contextPayload);
      window.open(deepLinkUrl, '_blank');
    } else if (button.action === 'trial' || button.action === 'link') {
      window.open(button.url, '_blank');
    }
  };

  return (
    <div className="max-w-[85%] bg-gray-50 dark:bg-gray-700 rounded-lg p-4 space-y-3">
      {/* Answer Content */}
      <div className="text-sm text-gray-800 dark:text-gray-200 leading-relaxed whitespace-pre-wrap">
        {formattedResponse.content}
      </div>
      
      {/* Action Buttons */}
      <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-200 dark:border-gray-600">
        {formattedResponse.buttons.map((button, index) => (
          <button
            key={index}
            onClick={() => handleButtonClick(button)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-1 ${
              button.action === 'promptly'
                ? 'bg-purple-600 hover:bg-purple-700 text-white shadow-sm'
                : button.action === 'trial'
                ? 'bg-green-600 hover:bg-green-700 text-white shadow-sm'
                : 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-700 dark:text-gray-200'
            }`}
          >
            <span>{button.text}</span>
            {button.action === 'promptly' || button.action === 'link' || button.action === 'trial' ? (
              <ExternalLink className="w-3 h-3" />
            ) : (
              <ArrowRight className="w-3 h-3" />
            )}
          </button>
        ))}
      </div>
      
      {/* Usage hint */}
      <p className="text-xs text-gray-500 dark:text-gray-400 pt-1">
        💡 Try more questions or paste drafts for rewriting
      </p>
    </div>
  );
}