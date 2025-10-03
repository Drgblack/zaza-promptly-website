import Link from 'next-intl/link';
import { useLocale } from 'next-intl';
import { LocaleSwitcher } from './site/LocaleSwitcher';

export function Header() {
  const locale = useLocale();
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href={`/${locale}`} className="flex items-center">
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Zaza Draft
            </span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-8">
            <div className="relative group">
              <button className="text-gray-600 hover:text-purple-600 transition-colors flex items-center gap-1">
                Our Solutions
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <a href="https://zazadraft.com" target="_blank" rel="noopener noreferrer" className="block px-4 py-2 text-gray-600 hover:text-purple-600 hover:bg-gray-50 rounded-t-lg">
                  Zaza Draft <span className="text-xs text-gray-400">(new tab)</span>
                </a>
                <a href="https://zazateach.com" target="_blank" rel="noopener noreferrer" className="block px-4 py-2 text-gray-600 hover:text-purple-600 hover:bg-gray-50 rounded-b-lg">
                  Zaza Teach <span className="text-xs text-gray-400">(new tab)</span>
                </a>
              </div>
            </div>
            <Link href={`/${locale}/blog`} className="text-gray-600 hover:text-purple-600 transition-colors">
              Blog
            </Link>
            <Link href={`/${locale}/resources`} className="text-gray-600 hover:text-purple-600 transition-colors">
              Resources
            </Link>
            <Link href={`/${locale}/about`} className="text-gray-600 hover:text-purple-600 transition-colors">
              About
            </Link>
            <div className="flex items-center gap-4">
              <LocaleSwitcher />
              <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
              Try Zaza Draft Free
              </button>
            </div>
          </nav>
          
          <button className="md:hidden p-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
