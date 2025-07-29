'use client';

import { usePathname } from 'next/navigation';
import { locales } from '@/i18n';

interface HrefLangTagsProps {
  locale: string;
}

export function HrefLangTags({ locale }: HrefLangTagsProps) {
  const pathname = usePathname();
  
  // Remove the locale prefix from pathname to get the base path
  const basePath = pathname.replace(`/${locale}`, '') || '';
  
  return (
    <>
      {/* x-default for search engines */}
      <link
        rel="alternate"
        hrefLang="x-default"
        href={`https://zazapromptly.com${basePath}`}
      />
      
      {/* Generate hreflang for each supported locale */}
      {locales.map((loc) => (
        <link
          key={loc}
          rel="alternate"
          hrefLang={loc}
          href={`https://zazapromptly.com${loc === 'en' ? '' : `/${loc}`}${basePath}`}
        />
      ))}
    </>
  );
}