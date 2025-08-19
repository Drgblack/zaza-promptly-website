'use client'

import Link from 'next/link';

interface SEOInternalLinksProps {
  currentPage?: string;
  context?: 'homepage' | 'blog' | 'product' | 'faq';
  className?: string;
}

export function SEOInternalLinks({ currentPage, context, className }: SEOInternalLinksProps) {
  // Strategic internal links for SEO keyword targeting
  const keywordLinks = {
    homepage: [
      { text: "AI for teacher reports", href: "/promptly", keyword: "AI for teacher reports" },
      { text: "AI lesson planning assistant", href: "/teach", keyword: "AI lesson planning assistant" },
      { text: "safe AI for teachers", href: "/faqs", keyword: "safe AI for teachers" },
      { text: "best AI tools for teachers 2025", href: "/blog", keyword: "best AI tools for teachers 2025" }
    ],
    blog: [
      { text: "hallucination-safe AI tool", href: "/promptly", keyword: "hallucination-safe AI" },
      { text: "reduce teacher workload with AI", href: "/teach", keyword: "reduce teacher workload with AI" },
      { text: "GDPR compliant AI for teachers", href: "/faqs", keyword: "GDPR compliant AI for teachers" },
      { text: "teacher productivity apps", href: "/products", keyword: "teacher productivity apps" }
    ],
    product: [
      { text: "AI vs ChatGPT for teachers", href: "/blog/ai-vs-chatgpt-for-teachers", keyword: "AI vs ChatGPT for teachers" },
      { text: "parent email generator for teachers", href: "/promptly", keyword: "parent email generator for teachers" },
      { text: "teacher comment bank AI", href: "/promptly", keyword: "teacher comment bank AI" },
      { text: "free AI tools for teachers", href: "/free-resources", keyword: "free AI tools for teachers" }
    ],
    faq: [
      { text: "is using AI for teaching cheating", href: "/blog/ai-vs-chatgpt-for-teachers", keyword: "is using AI for teaching cheating" },
      { text: "best AI tools for teachers 2025", href: "/blog/best-ai-tools-for-teachers-2025", keyword: "best AI tools for teachers 2025" },
      { text: "reduce teacher workload", href: "/blog/reduce-teacher-workload-with-ai", keyword: "reduce teacher workload with AI" },
      { text: "AI for school HR", href: "/spark", keyword: "AI for school HR" }
    ]
  };

  const links = context ? keywordLinks[context] : keywordLinks.homepage;
  
  // Filter out current page
  const filteredLinks = links.filter(link => link.href !== currentPage);

  if (filteredLinks.length === 0) return null;

  return (
    <nav className={`seo-internal-links ${className}`} aria-label="Related topics">
      <div className="text-sm text-gray-600 mb-2">
        Related topics:
      </div>
      <div className="flex flex-wrap gap-2">
        {filteredLinks.slice(0, 4).map((link, index) => (
          <Link 
            key={index}
            href={link.href}
            className="inline-block px-3 py-1 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-full text-sm transition-colors duration-200"
            title={`Learn more about ${link.keyword}`}
          >
            {link.text}
          </Link>
        ))}
      </div>
    </nav>
  );
}

// Component for contextual in-content linking
export function ContextualLink({ 
  text, 
  href, 
  keyword, 
  className = "" 
}: { 
  text: string; 
  href: string; 
  keyword?: string; 
  className?: string;
}) {
  return (
    <Link 
      href={href}
      className={`text-purple-600 hover:text-purple-800 underline font-medium ${className}`}
      title={keyword ? `Learn more about ${keyword}` : undefined}
    >
      {text}
    </Link>
  );
}

// Pre-built contextual links for common use cases
export const SEOLinks = {
  aiForTeacherReports: (
    <ContextualLink 
      text="AI for teacher reports" 
      href="/promptly" 
      keyword="AI for teacher reports and parent communication"
    />
  ),
  safeAIForTeachers: (
    <ContextualLink 
      text="safe AI for teachers" 
      href="/faqs" 
      keyword="hallucination-safe AI tools designed for educators"
    />
  ),
  aiLessonPlanning: (
    <ContextualLink 
      text="AI lesson planning assistant" 
      href="/teach" 
      keyword="curriculum-aligned AI lesson planning"
    />
  ),
  bestAITools2025: (
    <ContextualLink 
      text="best AI tools for teachers 2025" 
      href="/blog/best-ai-tools-for-teachers-2025" 
      keyword="comprehensive guide to safe AI tools for education"
    />
  ),
  reduceWorkload: (
    <ContextualLink 
      text="reduce teacher workload with AI" 
      href="/blog/reduce-teacher-workload-with-ai" 
      keyword="save 3-5 hours per week with AI productivity tools"
    />
  ),
  aiVsChatGPT: (
    <ContextualLink 
      text="AI vs ChatGPT for teachers" 
      href="/blog/ai-vs-chatgpt-for-teachers" 
      keyword="why education-specific AI outperforms generic chatbots"
    />
  ),
  hallucinationSafeAI: (
    <ContextualLink 
      text="hallucination-safe AI" 
      href="/promptly" 
      keyword="AI that never invents false information about students"
    />
  ),
  gdprCompliantAI: (
    <ContextualLink 
      text="GDPR compliant AI for teachers" 
      href="/faqs" 
      keyword="privacy-first AI tools for educational data"
    />
  )
};