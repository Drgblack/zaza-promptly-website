'use client';

import { usePathname } from 'next/navigation';

interface HrefLangTagsProps {
  locale?: string;
}

export function HrefLangTags({ locale = 'en' }: HrefLangTagsProps) {
  const pathname = usePathname();
  
  return (
    <>
      {/* x-default for search engines */}
      <link
        rel="alternate"
        hrefLang="x-default"
        href={`https://zazapromptly.com${pathname}`}
      />
      
      {/* English version (single language) */}
      <link
        rel="alternate"
        hrefLang="en"
        href={`https://zazapromptly.com${pathname}`}
      />
    </>
  );
}