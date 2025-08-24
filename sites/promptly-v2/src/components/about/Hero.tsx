'use client';

import Image from 'next/image';

export type HeroProps = {
  title: string;
  lead: string;
  imageSrc: string;
  imageAlt: string;
  primaryCta: { href: string; label: string };
  secondaryCta?: { href: string; label: string };
};

export default function Hero({
  title,
  lead,
  imageSrc,
  imageAlt,
  primaryCta,
  secondaryCta,
}: HeroProps) {
  return (
    <section aria-labelledby="founder-hero" className="py-16 sm:py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-16">
          <div className="relative flex-shrink-0">
            <Image
              src={imageSrc}
              alt={imageAlt}
              width={200}
              height={200}
              priority
              className="rounded-2xl shadow-lg ring-1 ring-white/10"
            />
          </div>
          <div className="flex-1">
            <h1 id="founder-hero" className="text-4xl sm:text-5xl font-semibold tracking-tight text-gray-900 dark:text-white">
              {title}
            </h1>
            <p className="mt-6 text-xl leading-8 text-gray-600 dark:text-gray-300 max-w-2xl">{lead}</p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <a 
                href={primaryCta.href}
                className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 transition-colors duration-200"
              >
                {primaryCta.label}
              </a>
              {secondaryCta && (
                <a 
                  href={secondaryCta.href}
                  className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-gray-900 dark:text-white bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg shadow-lg ring-1 ring-gray-300 dark:ring-gray-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 transition-colors duration-200"
                >
                  {secondaryCta.label}
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}