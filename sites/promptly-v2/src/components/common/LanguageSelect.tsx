'use client';

import { useEffect, useState } from 'react';

interface LanguageSelectProps {
  value?: string;
  onChange?: (language: string) => void;
}

export default function LanguageSelect({ value, onChange }: LanguageSelectProps) {
  const [currentLang, setCurrentLang] = useState('en-US');
  const [mounted, setMounted] = useState(false);

  const languages = [
    { value: 'en-US', label: 'English (US)' },
    { value: 'en-GB', label: 'English (UK)' },
    { value: 'de-DE', label: 'Deutsch' },
    { value: 'fr-FR', label: 'Français' },
  ];

  useEffect(() => {
    setMounted(true);
    // Load from localStorage or use provided value
    const stored = localStorage.getItem('lang') || value || 'en-US';
    setCurrentLang(stored);
    
    // Update html lang attribute
    document.documentElement.lang = stored;
  }, [value]);

  const handleChange = (newLang: string) => {
    setCurrentLang(newLang);
    localStorage.setItem('lang', newLang);
    document.documentElement.lang = newLang;
    
    if (onChange) {
      onChange(newLang);
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="relative">
      <label htmlFor="language-select" className="sr-only">
        Select language
      </label>
      <select
        id="language-select"
        value={currentLang}
        onChange={(e) => handleChange(e.target.value)}
        className="
          appearance-none bg-slate-100/50 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300 
          text-sm rounded-lg px-3 py-1.5 pr-8 
          border-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900
          hover:bg-slate-200/50 dark:hover:bg-slate-700/50 transition-colors
        "
      >
        {languages.map((lang) => (
          <option key={lang.value} value={lang.value}>
            {lang.label}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-700 dark:text-slate-300">
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
}