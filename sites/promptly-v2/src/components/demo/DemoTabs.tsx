'use client';

import { Lock } from 'lucide-react';

interface Tab {
  id: string;
  label: string;
  active: boolean;
  disabled?: boolean;
}

interface DemoTabsProps {
  tabs: readonly Tab[];
  onDisabledClick: (id: 'reports' | 'staff' | 'docs') => void;
}

export function DemoTabs({ tabs, onDisabledClick }: DemoTabsProps) {
  return (
    <div className="border-b border-gray-200">
      <div 
        role="tablist" 
        className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={tab.active}
            aria-controls={`tabpanel-${tab.id}`}
            aria-disabled={tab.disabled}
            disabled={tab.disabled}
            tabIndex={tab.disabled ? -1 : 0}
            className={`
              flex-shrink-0 snap-start px-4 py-3 text-sm font-medium transition-all
              flex items-center gap-2 min-w-fit whitespace-nowrap
              focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-inset
              ${tab.active 
                ? 'text-purple-600 border-b-2 border-purple-600 bg-purple-50' 
                : tab.disabled
                  ? 'text-gray-400 cursor-not-allowed border-b-2 border-transparent'
                  : 'text-gray-500 hover:text-gray-700 border-b-2 border-transparent hover:border-gray-300'
              }
            `}
            onClick={() => {
              if (tab.disabled && (tab.id === 'reports' || tab.id === 'staff' || tab.id === 'docs')) {
                onDisabledClick(tab.id as 'reports' | 'staff' | 'docs');
              }
            }}
          >
            {tab.label}
            {tab.disabled && (
              <>
                <Lock className="w-3 h-3" aria-hidden="true" />
                <span className="text-xs bg-purple-100 text-purple-600 px-1.5 py-0.5 rounded-full">
                  Pro
                </span>
              </>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}