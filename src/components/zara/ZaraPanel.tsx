'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Minimize2, X, Loader2, Lock } from 'lucide-react';
import { ZaraAnswerComponent } from './ZaraAnswer';
import { useLocale } from 'next-intl';
import type { ZaraAnswer } from '@/lib/zara/schema';

type Message = {
  id: string;
  content: string;
  answer?: ZaraAnswer;
  isUser: boolean;
  timestamp: Date;
};

type ZaraPanelProps = {
  isMinimized: boolean;
  onMinimize: () => void;
  onClose: () => void;
};

export function ZaraPanel({ isMinimized, onMinimize, onClose }: ZaraPanelProps) {
  const locale = useLocale();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [usageCount, setUsageCount] = useState(0);
  const [showMiniWall, setShowMiniWall] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const MAX_DAILY_MESSAGES = 3;

  // Quick action chips
  const quickActions = [
    { text: "Write a parent message", icon: "✉️" },
    { text: "Strategy: after-lunch calm", icon: "🧘" },
    { text: "Pricing & plans", icon: "💳" },
    { text: "Privacy & GDPR", icon: "🔒" }
  ];

  useEffect(() => {
    // Load usage count from localStorage (24h rolling window)
    const now = new Date();
    const today = now.toDateString();
    const stored = localStorage.getItem('zara-usage-v2');
    const usage = stored ? JSON.parse(stored) : {};
    
    // Clean up old entries (older than 24h)
    Object.keys(usage).forEach(date => {
      const entryDate = new Date(date);
      if (now.getTime() - entryDate.getTime() > 24 * 60 * 60 * 1000) {
        delete usage[date];
      }
    });
    
    setUsageCount(usage[today] || 0);
    localStorage.setItem('zara-usage-v2', JSON.stringify(usage));
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const updateUsageCount = () => {
    const today = new Date().toDateString();
    const stored = localStorage.getItem('zara-usage-v2');
    const usage = stored ? JSON.parse(stored) : {};
    
    const newCount = (usage[today] || 0) + 1;
    usage[today] = newCount;
    
    localStorage.setItem('zara-usage-v2', JSON.stringify(usage));
    setUsageCount(newCount);
    
    // Show mini-wall after 3rd message
    if (newCount >= MAX_DAILY_MESSAGES) {
      setShowMiniWall(true);
    }
  };

  const handleSubmit = async (messageText?: string) => {
    const textToSend = messageText || input.trim();
    if (!textToSend || isLoading) return;
    
    if (usageCount >= MAX_DAILY_MESSAGES) {
      setShowMiniWall(true);
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      content: textToSend,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/zara/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: textToSend,
          locale,
          history: messages.slice(-4)
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.answer?.title || 'Response',
        answer: data.answer,
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
      updateUsageCount();

      // Track analytics
      fetch('/api/zara/analytics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'message_sent',
          locale,
          lane: data.lane,
          usedPlaybook: data.usedPlaybook,
          path: window.location.pathname
        }),
      }).catch(() => {
        // Ignore analytics errors
      });

    } catch (error) {
      console.error('Error getting Zara response:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: 'Error',
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  if (isMinimized) {
    return (
      <div className="fixed bottom-20 right-6 z-50 w-80 h-16 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-bold">Z</span>
          </div>
          <span className="text-sm font-medium">Zara</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500">{usageCount}/{MAX_DAILY_MESSAGES}</span>
          <button
            onClick={onMinimize}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
            aria-label="Restore Zara"
          >
            <Minimize2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-20 right-6 z-50 w-96 h-[500px] bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-bold">Z</span>
          </div>
          <div>
            <h3 className="font-semibold text-sm">Zara</h3>
            <p className="text-xs text-gray-500">Teacher Assistant</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-xs text-gray-500 px-2">{usageCount}/{MAX_DAILY_MESSAGES}</span>
          <button
            onClick={onMinimize}
            className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
            aria-label="Minimize"
          >
            <Minimize2 className="w-4 h-4" />
          </button>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="space-y-4">
            <div className="text-center text-gray-500 text-sm py-4">
              <p className="mb-2">👋 Hi! I'm Zara, your teaching assistant.</p>
              <p>I provide classroom strategies, help with parent communications, and answer product questions.</p>
            </div>
            
            {/* Quick Action Chips */}
            <div className="space-y-2">
              <p className="text-xs text-gray-500 font-medium">Quick help:</p>
              <div className="grid grid-cols-2 gap-2">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    onClick={() => handleSubmit(action.text)}
                    className="text-left p-2 text-xs bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-lg transition-colors"
                    disabled={isLoading || usageCount >= MAX_DAILY_MESSAGES}
                  >
                    <span className="mr-1">{action.icon}</span>
                    {action.text}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
          >
            {message.isUser ? (
              <div className="max-w-[80%] bg-purple-600 text-white rounded-lg px-3 py-2 text-sm">
                {message.content}
              </div>
            ) : (
              message.answer ? (
                <ZaraAnswerComponent answer={message.answer} />
              ) : (
                <div className="max-w-[85%] bg-gray-50 dark:bg-gray-700 rounded-lg p-3 text-sm">
                  {message.content}
                </div>
              )
            )}
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg px-3 py-2 flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span className="text-sm text-gray-600 dark:text-gray-300">Zara is thinking...</span>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Mini Wall */}
      {showMiniWall && (
        <div className="p-4 border-t border-amber-200 bg-amber-50 dark:bg-amber-900/20">
          <div className="flex items-center gap-2 mb-2">
            <Lock className="w-4 h-4 text-amber-600" />
            <span className="text-sm font-medium text-amber-800 dark:text-amber-200">Daily limit reached</span>
          </div>
          <p className="text-xs text-amber-700 dark:text-amber-300 mb-3">
            You've used your 3 free conversations today. Get unlimited access with Promptly.
          </p>
          <a 
            href="/pricing" 
            className="inline-flex items-center px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-medium rounded transition-colors"
          >
            Try Promptly Free →
          </a>
        </div>
      )}

      {/* Input */}
      {!showMiniWall && (
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="flex gap-2">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about teaching strategies, write parent messages, or get product info..."
              className="flex-1 min-h-[40px] max-h-[100px] px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
              disabled={isLoading || usageCount >= MAX_DAILY_MESSAGES}
              rows={1}
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading || usageCount >= MAX_DAILY_MESSAGES}
              className="px-3 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg transition-colors duration-200 flex items-center justify-center min-w-[40px]"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}