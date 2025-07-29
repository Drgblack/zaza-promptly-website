import { getAllBlogPosts, getPopularPosts, getAllCategories, getAllTags } from '@/lib/blog';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Calendar, Clock, Tag, TrendingUp, Search, Filter } from 'lucide-react';
import { BlogIndexClient } from '@/components/blog/blog-index-client';
import { BlogHeroClient } from '@/components/blog/blog-hero-client';

export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  
  const titles = {
    en: 'AI Education Blog - Teaching Tips & Strategies',
    de: 'KI-Bildungs-Blog - Unterrichtstipps & Strategien',
    fr: 'Blog éducation IA - Conseils et stratégies d\'enseignement',
    es: 'Blog de educación con IA - Consejos y estrategias de enseñanza',
    it: 'Blog educazione IA - Consigli e strategie di insegnamento'
  };

  const descriptions = {
    en: 'Discover the latest insights, tips, and strategies for using AI in education. Written by teachers, for teachers.',
    de: 'Entdecken Sie die neuesten Erkenntnisse, Tipps und Strategien für den Einsatz von KI in der Bildung. Von Lehrern für Lehrer geschrieben.',
    fr: 'Découvrez les dernières idées, conseils et stratégies pour utiliser l\'IA dans l\'éducation. Écrit par des enseignants, pour des enseignants.',
    es: 'Descubre las últimas ideas, consejos y estrategias para usar IA en educación. Escrito por maestros, para maestros.',
    it: 'Scopri le ultime intuizioni, consigli e strategie per usare l\'IA nell\'educazione. Scritto da insegnanti, per insegnanti.'
  };

  return {
    title: titles[locale as keyof typeof titles] || titles.en,
    description: descriptions[locale as keyof typeof descriptions] || descriptions.en,
  };
}

export default async function BlogPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  
  const [allPosts, popularPosts, categories, tags] = await Promise.all([
    getAllBlogPosts(locale),
    getPopularPosts(6, locale),
    getAllCategories(locale),
    getAllTags(locale)
  ]);

  return (
    <>
      <Header />
      
      <main className="min-h-screen pt-16 lg:pt-20 bg-gray-50">
        {/* Hero Section */}
        <BlogHeroClient 
          allPostsCount={allPosts.length}
          categoriesCount={categories.length}
        />

        {/* Blog Content with Client-side filtering */}
        <BlogIndexClient
          allPosts={allPosts}
          popularPosts={popularPosts}
          categories={categories}
          tags={tags}
          locale={locale}
        />
      </main>

      <Footer />
    </>
  );
}