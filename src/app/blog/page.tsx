import { articles } from '@/common/lib/articles';
import PageHeader from '@/components/layout/PageHeader';
import ArticleCard from '@/components/ui/ArticleCard';
import Motion from '@/components/ui/Motion';

import { Metadata } from 'next';

// Page description
const description =
  'Jak vaříme, odkud bereme suroviny a co se děje za pultem, když zrovna nikdo nekouká.';

// Page metadata
export const metadata: Metadata = {
  title: 'Blog',
  description,
};

/**
 * Component representing a blog page
 */
export default function Page() {
  return (
    <>
      {/* Page header */}
      <PageHeader title='Z naší kuchyně' description={description} />

      {/* Articles */}
      <Motion as='section' id='articles' className='border-line dark:border-line-night border-b'>
        <h2 className='sr-only'>Všechny články</h2>
        {articles.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </Motion>
    </>
  );
}
