'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const options = [
    { value: 'light', label: 'Light' },
    { value: 'system', label: 'System' },
    { value: 'dark', label: 'Dark' },
  ];

  return (
    <div 
      role="radiogroup" 
      aria-label="Theme selection"
      className="flex items-center space-x-1 bg-slate-100/50 dark:bg-slate-800/50 rounded-lg p-1"
    >
      {options.map((option) => (
        <button
          key={option.value}
          role="radio"
          aria-checked={theme === option.value}
          onClick={() => setTheme(option.value)}
          className={`
            px-3 py-1.5 text-sm font-medium rounded-md transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900
            ${
              theme === option.value
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-700/50'
            }
          `}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}