import { getTopThreeLatestArticles } from '@/common/lib/articles';
import { categories } from '@/common/lib/categories';
import { getFeaturedDishes } from '@/common/lib/dishes';
import FeaturedDishes from '@/components/catalog/FeaturedDishes';
import Section from '@/components/layout/Section';
import ArticleCard from '@/components/ui/ArticleCard';
import CategoryCard from '@/components/ui/CategoryCard';

import DeliveryBand from './components/DeliveryBand';
import Hero from './components/Hero';
import { Metadata } from 'next';

// Page metadata
export const metadata: Metadata = {
  title: 'Domů',
};

/**
 * Component representing a home page
 */
export default function Page() {
  const featuredDishes = getFeaturedDishes();
  const topThreeLatestArticles = getTopThreeLatestArticles();

  return (
    <>
      {/* Title section */}
      <Hero />

      {/* Categories */}
      <Section
        id='kategorie'
        title='Na co máš chuť?'
        href='/kategorie'
        linkLabel='Všechny kategorie'>
        <div className='-mx-gutter px-gutter flex snap-x gap-4 overflow-x-auto pb-2 sm:mx-0 sm:grid sm:grid-cols-4 sm:gap-6 sm:overflow-visible sm:px-0 lg:grid-cols-7'>
          {categories.map((category) => (
            <CategoryCard key={category.slug} category={category} compact />
          ))}
        </div>
      </Section>

      {/* Featured dishes */}
      <FeaturedDishes dishes={featuredDishes} />

      {/* Delivery */}
      <DeliveryBand />

      {/* Latest articles */}
      <Section
        id='nejnovejsi-clanky'
        title='Z naší kuchyně'
        href='/blog'
        linkLabel='Všechny články'>
        <div className='border-line dark:border-line-night border-b'>
          {topThreeLatestArticles.map((a) => (
            <ArticleCard key={a.slug} article={a} />
          ))}
        </div>
      </Section>
    </>
  );
}
