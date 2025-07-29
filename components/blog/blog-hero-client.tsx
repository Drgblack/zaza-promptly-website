'use client'

import { useTranslations } from 'next-intl';
import { TrendingUp, Clock, Tag } from 'lucide-react';

interface BlogHeroClientProps {
  allPostsCount: number;
  categoriesCount: number;
}

export function BlogHeroClient({ allPostsCount, categoriesCount }: BlogHeroClientProps) {
  const t = useTranslations();

  return (
    <section className="py-16 bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-800 mb-6">
            {t('Blog.title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            {t('Blog.subtitle')}
          </p>
          
          {/* Quick Stats */}
          <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-600">
            <div className="flex items-center">
              <TrendingUp className="w-4 h-4 mr-2 text-purple-600" />
              {allPostsCount} {t('Blog.allArticles')}
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2 text-purple-600" />
              5-10 {t('Blog.readingTime')}
            </div>
            <div className="flex items-center">
              <Tag className="w-4 h-4 mr-2 text-purple-600" />
              {categoriesCount} {t('Blog.categories')}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}