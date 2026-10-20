import { categories, getCategoryBySlug } from '@/common/lib/categories';
import { getDishesByCategory } from '@/common/lib/dishes';
import { SlugProps } from '@/common/types/slug.types';
import ButtonLink from '@/components/ui/ButtonLink';
import DishCard from '@/components/ui/DishCard';
import Motion from '@/components/ui/Motion';

import { Metadata } from 'next';
import { notFound } from 'next/navigation';

// Function to generate static params for category pages
export const generateStaticParams = async () => {
  return categories.map((c) => ({
    slug: c.slug,
  }));
};

// Function to generate metadata for category pages
export async function generateMetadata({ params }: SlugProps): Promise<Metadata> {
  const { slug } = await params;

  const category = getCategoryBySlug(slug.toLowerCase());

  if (!category) {
    return { title: 'Kategorie nenalezena' };
  }

  return { title: category.name, description: category.description };
}

/**
 * Component representing a category page
 */
export default async function Page({ params }: SlugProps) {
  const { slug } = await params;

  const category = getCategoryBySlug(slug);

  if (!category) {
    return notFound();
  }

  const categoryDishes = getDishesByCategory(category.slug);

  return (
    <>
      {/* Dishes */}
      <section id='dishes' className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
        <h2 className='sr-only'>Jídla v kategorii {category.name}</h2>
        {categoryDishes.map((dish, i) => (
          <Motion key={dish.slug} delay={i * 0.06}>
            <DishCard dish={dish} eager={i < 3} />
          </Motion>
        ))}
      </section>

      {/* Menu button */}
      <div>
        <ButtonLink href='/menu' variant='ghost'>
          Zobrazit celé menu
        </ButtonLink>
      </div>
    </>
  );
}
