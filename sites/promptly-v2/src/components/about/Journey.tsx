'use client';

import { useEffect, useRef, useState } from 'react';
import { usePrefersReducedMotion } from '@/lib/motion';

type JourneyStep = {
  title: string;
  detail: string;
};

const steps: JourneyStep[] = [
  { 
    title: "1980s — Painter's Apprenticeship (Cascade Brewery)", 
    detail: "Learned perseverance by finishing the trade." 
  },
  { 
    title: "Early 1990s — World Travel", 
    detail: "Backpacking taught me learning opens every door." 
  },
  { 
    title: "1994–1995 — German Language Diploma (Frankfurt)", 
    detail: "Enabled entry to university." 
  },
  { 
    title: "1995–1999 — UTAS — Information Systems (Honours)", 
    detail: "University of Tasmania." 
  },
  { 
    title: "2000–2004 — MBA (The University of Queensland)", 
    detail: "Master of Business Administration." 
  },
  { 
    title: "2016–2019 — PhD, Professional Education (City, University of London)", 
    detail: "Research in ed-tech and professional development." 
  },
  { 
    title: "2025 — Zaza Technologies", 
    detail: "Building teacher-first AI that respects educators." 
  },
];

export default function Journey() {
  const shouldReduceMotion = usePrefersReducedMotion();
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    if (shouldReduceMotion) {
      // If motion is reduced, show all items immediately
      setVisibleItems(new Set(Array.from({ length: steps.length }, (_, i) => i)));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = parseInt(entry.target.getAttribute('data-index') || '0');
          if (entry.isIntersecting) {
            setVisibleItems(prev => new Set(Array.from(prev).concat(index)));
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    itemRefs.current.forEach((item) => {
      if (item) observer.observe(item);
    });

    return () => observer.disconnect();
  }, [shouldReduceMotion]);

  return (
    <section 
      id="journey" 
      aria-labelledby="journey-heading" 
      className="py-12 sm:py-16"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-8 sm:mb-12">
          <h2 
            id="journey-heading" 
            className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-100 dark:text-white"
          >
            The Journey
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            From apprentice to educator-tech builder
          </p>
        </header>

        <div className="relative">
          {/* Timeline line */}
          <div 
            aria-hidden="true" 
            className="absolute left-4 md:left-1/2 md:-ml-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-500 to-purple-600 opacity-30" 
          />

          <ol className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
            {steps.map((step, index) => {
              const isEven = index % 2 === 0;
              const isVisible = visibleItems.has(index);
              
              return (
                <li
                  key={index}
                  ref={el => { itemRefs.current[index] = el; }}
                  data-index={index}
                  className={`relative transition-all duration-700 ease-out ${
                    isEven ? 'md:pr-8 md:text-right' : 'md:pl-8 md:text-left'
                  } pl-12 md:pl-0 ${
                    shouldReduceMotion 
                      ? 'opacity-100 transform-none' 
                      : isVisible 
                        ? 'opacity-100 translate-y-0' 
                        : 'opacity-0 translate-y-4'
                  }`}
                  style={{ 
                    transitionDelay: shouldReduceMotion ? '0ms' : `${index * 100}ms` 
                  }}
                >
                  {/* Timeline dot */}
                  <span
                    aria-hidden="true"
                    className={`absolute ${
                      isEven 
                        ? 'left-2 md:right-0 md:left-auto md:-mr-2' 
                        : 'left-2 md:left-0 md:-ml-2'
                    } top-3 inline-flex h-4 w-4 items-center justify-center rounded-full bg-white dark:bg-slate-900 ring-2 ring-indigo-600 shadow-lg transition-all duration-500 ease-out ${
                      shouldReduceMotion 
                        ? 'scale-100 opacity-100' 
                        : isVisible 
                          ? 'scale-100 opacity-100' 
                          : 'scale-75 opacity-60'
                    }`}
                    style={{ 
                      transitionDelay: shouldReduceMotion ? '0ms' : `${index * 100 + 150}ms` 
                    }}
                  />
                  
                  <article
                    tabIndex={0}
                    className="rounded-2xl border border-white/10 bg-white/5 dark:bg-white/5 backdrop-blur p-5 md:p-6 shadow-lg hover:shadow-xl focus:shadow-xl transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50 dark:focus-visible:ring-offset-slate-900 hover:scale-[1.01] hover:-translate-y-0.5 focus:scale-[1.01] focus:-translate-y-0.5"
                  >
                    <h3 className="text-lg font-semibold text-slate-100 dark:text-white leading-6">
                      {step.title}
                    </h3>
                    <p className="mt-2.5 md:mt-3 text-gray-600 dark:text-gray-300 leading-relaxed">
                      {step.detail}
                    </p>
                  </article>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}