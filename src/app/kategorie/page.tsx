import { categories } from '@/common/lib/categories';
import PageHeader from '@/components/layout/PageHeader';
import CategoryCard from '@/components/ui/CategoryCard';
import Motion from '@/components/ui/Motion';

import { Metadata } from 'next';

// Page description
const description = 'Od burgerů přes ramen až po dezerty. Vyber si, na co máš zrovna chuť.';

// Page metadata
export const metadata: Metadata = {
  title: 'Kategorie',
  description,
};

/**
 * Component representing a categories page
 */
export default function Page() {
  return (
    <>
      {/* Page header */}
      <PageHeader title='Kategorie' description={description} />

      {/* Categories */}
      <section id='categories' className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
        <h2 className='sr-only'>Všechny kategorie</h2>
        {categories.map((category, i) => (
          <Motion key={category.slug} delay={i * 0.06}>
            <CategoryCard category={category} eager={i < 3} />
          </Motion>
        ))}
      </section>
    </>
  );
}
