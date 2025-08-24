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
    <section aria-labelledby="founder-hero" className="py-12">
      <div className="mx-auto max-w-5xl px-4">
        <div className="flex flex-col md:flex-row items-start gap-8">
          <Image
            src={imageSrc}
            alt={imageAlt}
            width={160}
            height={160}
            priority
            className="rounded-full"
          />
          <div>
            <h1 id="founder-hero" className="text-3xl font-semibold">
              {title}
            </h1>
            <p className="mt-4 text-lg max-w-prose">{lead}</p>
            <div className="mt-6 flex gap-3">
              <a className="inline-flex px-4 py-2 rounded-md border" href={primaryCta.href}>
                {primaryCta.label}
              </a>
              {secondaryCta && (
                <a className="inline-flex px-4 py-2 rounded-md border" href={secondaryCta.href}>
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