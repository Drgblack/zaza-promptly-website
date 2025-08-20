'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { locales, localeNames, localeFlags } from '@/i18n';

export interface Language {
  code: string;
  name: string;
  flag: string;
}

// Use the locales from i18n configuration
export const languages: Language[] = locales.map(code => ({
  code,
  name: localeNames[code],
  flag: localeFlags[code]
}));

interface LanguageSelectorProps {
  className?: string;
  compact?: boolean;
}

export default function LanguageSelector({ className = '', compact = false }: LanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState<Language>(languages[0]); // Default to English
  const [mounted, setMounted] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const router = useRouter();
  const pathname = usePathname();

  // Ensure component is mounted before rendering to avoid hydration issues
  useEffect(() => {
    setMounted(true);
    
    // Detect current language from URL or use saved preference
    const detectCurrentLanguage = () => {
      // Check if URL has locale prefix (English has no prefix, others do)
      const urlLocale = pathname.match(/^\/([a-z]{2})(?:\/|$)/)?.[1];
      // If no locale in URL, assume English (default)
      const detectedLocale = urlLocale || 'en';
      
      const currentLang = languages.find(lang => lang.code === detectedLocale) || languages[0];
      setCurrentLanguage(currentLang);
      
      // Save to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('preferred-language', currentLang.code);
      }
    };
    
    detectCurrentLanguage();
  }, [pathname]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Close dropdown on escape key
  useEffect(() => {
    function handleEscapeKey(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey);
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen]);

  const handleLanguageChange = (language: Language) => {
    if (language.code === currentLanguage.code) {
      setIsOpen(false);
      return;
    }

    // Temporarily disable language switching while we fix routing
    if (language.code !== 'en') {
      alert('Multiple languages are temporarily unavailable while we fix routing issues. Coming soon!');
      setIsOpen(false);
      return;
    }

    setCurrentLanguage(language);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Don't render until component is mounted to avoid hydration mismatch
  if (!mounted) {
    return (
      <div className={`animate-pulse bg-gray-100 dark:bg-gray-800 rounded-lg ${
        compact ? 'w-10 h-10' : 'w-[120px] h-[40px]'
      }`}></div>
    );
  }

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        onMouseEnter={() => setIsOpen(true)}
        className={`flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-all duration-200 ${
          compact ? 'p-2' : ''
        }`}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label="Select language"
      >
        <Globe className="w-4 h-4 text-gray-500 dark:text-gray-400" />
        {!compact && (
          <>
            <span className="flex items-center space-x-1">
              <span>{currentLanguage.flag}</span>
              <span className="hidden sm:inline">{currentLanguage.name}</span>
              <span className="sm:hidden">{currentLanguage.code.toUpperCase()}</span>
            </span>
            <ChevronDown 
              className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                isOpen ? 'rotate-180' : ''
              }`} 
            />
          </>
        )}
        {compact && (
          <span className="text-xs font-bold">{currentLanguage.code.toUpperCase()}</span>
        )}
      </button>

      {isOpen && (
        <div 
          className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 py-1"
          onMouseLeave={() => setIsOpen(false)}
        >
          <div className="px-3 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide border-b border-gray-100 dark:border-gray-700">
            Select Language
          </div>
          
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => handleLanguageChange(language)}
              disabled={language.code !== 'en'}
              className={`w-full flex items-center justify-between px-3 py-2 text-sm transition-colors duration-150 ${
                language.code === currentLanguage.code 
                  ? 'bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 font-medium' 
                  : language.code === 'en'
                  ? 'text-gray-700 dark:text-gray-200 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:text-purple-700 dark:hover:text-purple-300'
                  : 'text-gray-400 dark:text-gray-500 cursor-not-allowed'
              }`}
              role="menuitem"
            >
              <div className="flex items-center space-x-3">
                <span className="text-lg">{language.flag}</span>
                <span>{language.name}</span>
                {language.code !== 'en' && (
                  <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 px-2 py-1 rounded">Soon</span>
                )}
              </div>
              
              {language.code === currentLanguage.code && (
                <Check className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              )}
            </button>
          ))}
          
          <div className="border-t border-gray-100 dark:border-gray-700 mt-1 pt-1">
            <div className="px-3 py-2 text-xs text-gray-500 dark:text-gray-400">
              Language preference is saved
            </div>
          </div>
        </div>
      )}
    </div>
  );
}