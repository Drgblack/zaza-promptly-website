'use client';

import { motion } from 'framer-motion';
import { usePrefersReducedMotion, fadeInUp, staggerContainer, hoverLift } from '@/lib/motion';

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

  // Custom stagger variants for journey items
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.08,
        delayChildren: shouldReduceMotion ? 0 : 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { 
      opacity: shouldReduceMotion ? 1 : 0, 
      y: shouldReduceMotion ? 0 : 24 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: shouldReduceMotion ? 0.01 : 0.35, 
        ease: [0.25, 0.1, 0.25, 1] as const
      }
    },
  };

  const dotVariants = {
    hidden: { 
      scale: shouldReduceMotion ? 1 : 0.8, 
      opacity: shouldReduceMotion ? 1 : 0 
    },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        duration: shouldReduceMotion ? 0.01 : 0.2, 
        ease: [0.25, 0.1, 0.25, 1] as const
      }
    },
  };

  const hoverVariants = shouldReduceMotion ? {} : {
    scale: 1.01,
    y: -2,
    transition: { duration: 0.15, ease: [0.25, 0.1, 0.25, 1] as const }
  };

  return (
    <section 
      id="journey" 
      aria-labelledby="journey-heading" 
      className="py-16 sm:py-20"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-12">
          <h2 
            id="journey-heading" 
            className="text-3xl sm:text-4xl font-semibold tracking-tight text-gray-900 dark:text-white"
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

          <motion.ol 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "0px 0px -100px 0px" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {steps.map((step, index) => {
              const isEven = index % 2 === 0;
              
              return (
                <motion.li
                  key={index}
                  variants={itemVariants}
                  className={`relative ${
                    isEven ? 'md:pr-8 md:text-right' : 'md:pl-8 md:text-left'
                  } pl-12 md:pl-0`}
                >
                  {/* Timeline dot */}
                  <motion.span
                    variants={dotVariants}
                    aria-hidden="true"
                    className={`absolute ${
                      isEven 
                        ? 'left-2 md:right-0 md:left-auto md:-mr-2' 
                        : 'left-2 md:left-0 md:-ml-2'
                    } top-3 inline-flex h-4 w-4 items-center justify-center rounded-full bg-white dark:bg-slate-900 ring-2 ring-indigo-600 shadow-lg`}
                  />
                  
                  <motion.article
                    whileHover={hoverVariants}
                    whileFocus={hoverVariants}
                    tabIndex={0}
                    className="rounded-2xl border border-white/10 bg-white/5 dark:bg-white/5 backdrop-blur p-6 shadow-lg hover:shadow-xl focus:shadow-xl transition-shadow duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50 dark:focus-visible:ring-offset-slate-900"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white leading-6">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-gray-600 dark:text-gray-300 leading-relaxed">
                      {step.detail}
                    </p>
                  </motion.article>
                </motion.li>
              );
            })}
          </motion.ol>
        </div>
      </div>
    </section>
  );
}