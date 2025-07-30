'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import { locales, localeNames, localeFlags, type Locale } from '@/i18n';
import { ChevronDown, Globe, Check } from 'lucide-react';

export default function LanguageToggle() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale() as Locale;

  // Ensure component is mounted before rendering to avoid hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);

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

  const switchLanguage = (newLocale: Locale) => {
    if (newLocale === currentLocale) {
      setIsOpen(false);
      return;
    }

    // Get the current path without the locale prefix
    const pathWithoutLocale = pathname.startsWith(`/${currentLocale}`) 
      ? pathname.slice(`/${currentLocale}`.length) 
      : pathname;

    // Construct new path with the selected locale
    const newPath = newLocale === 'en' 
      ? pathWithoutLocale || '/' // For default locale (en), don't add prefix
      : `/${newLocale}${pathWithoutLocale || ''}`;

    // Store language preference in localStorage and cookie
    if (typeof window !== 'undefined') {
      localStorage.setItem('preferred-locale', newLocale);
      document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;
    }
    
    setIsOpen(false);
    router.push(newPath);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Don't render until component is mounted to avoid hydration mismatch
  if (!mounted) {
    return (
      <div className="w-[120px] h-[40px] bg-gray-100 animate-pulse rounded-lg"></div>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200"
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label="Select language"
      >
        <Globe className="w-4 h-4 text-gray-500" />
        <span className="flex items-center space-x-1">
          <span>{localeFlags[currentLocale]}</span>
          <span className="hidden sm:inline">{localeNames[currentLocale]}</span>
          <span className="sm:hidden">{currentLocale.toUpperCase()}</span>
        </span>
        <ChevronDown 
          className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`} 
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50 py-1">
          <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide border-b border-gray-100">
            Select Language
          </div>
          
          {locales.map((locale) => (
            <button
              key={locale}
              onClick={() => switchLanguage(locale)}
              className={`w-full flex items-center justify-between px-3 py-2 text-sm hover:bg-purple-50 hover:text-purple-700 transition-colors duration-150 ${
                locale === currentLocale 
                  ? 'bg-purple-50 text-purple-700 font-medium' 
                  : 'text-gray-700'
              }`}
              role="menuitem"
            >
              <div className="flex items-center space-x-3">
                <span className="text-lg">{localeFlags[locale]}</span>
                <span>{localeNames[locale]}</span>
              </div>
              
              {locale === currentLocale && (
                <Check className="w-4 h-4 text-purple-600" />
              )}
            </button>
          ))}
          
          <div className="border-t border-gray-100 mt-1 pt-1">
            <div className="px-3 py-2 text-xs text-gray-500">
              Language preference is saved
            </div>
          </div>
        </div>
      )}
    </div>
  );
}