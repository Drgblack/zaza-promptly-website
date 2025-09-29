'use client';

export function SkipNavigation() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] 
                 bg-white dark:bg-slate-900 text-slate-900 dark:text-white 
                 px-4 py-2 rounded-md border-2 border-purple-600 
                 font-medium text-sm transition-all duration-200
                 focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const mainContent = document.getElementById('main-content');
          if (mainContent) {
            mainContent.focus();
            mainContent.scrollIntoView();
          }
        }
      }}
    >
      Skip to main content
    </a>
  );
}