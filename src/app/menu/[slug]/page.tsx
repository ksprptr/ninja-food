import { getAllergenByCode } from '@/common/lib/allergens';
import { getCategoryBySlug } from '@/common/lib/categories';
import { getCuisineBySlug } from '@/common/lib/cuisines';
import { dietLabels, dishes, getDishBySlug, getDishesByCategory } from '@/common/lib/dishes';
import { formatPrice } from '@/common/lib/format';
import { SlugProps } from '@/common/types/slug.types';
import Section from '@/components/layout/Section';
import Badge from '@/components/ui/Badge';
import ButtonLink from '@/components/ui/ButtonLink';
import DishCard from '@/components/ui/DishCard';
import DishImage from '@/components/ui/DishImage';
import Motion from '@/components/ui/Motion';
import Spiciness from '@/components/ui/Spiciness';

import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

// Function to generate static params for dish pages
export const generateStaticParams = async () => {
  return dishes.map((d) => ({
    slug: d.slug,
  }));
};

// Function to generate metadata for dish pages
export async function generateMetadata({ params }: SlugProps): Promise<Metadata> {
  const { slug } = await params;

  const dish = getDishBySlug(slug.toLowerCase());

  if (!dish) {
    return { title: 'Jídlo nenalezeno' };
  }

  return { title: dish.name, description: dish.description };
}

/**
 * Component representing a dish page
 */
export default async function Page({ params }: SlugProps) {
  const { slug } = await params;

  const dish = getDishBySlug(slug);

  if (!dish) {
    return notFound();
  }

  const category = getCategoryBySlug(dish.category);
  const cuisine = getCuisineBySlug(dish.cuisine);
  const related = getDishesByCategory(dish.category)
    .filter((d) => d.slug !== dish.slug)
    .slice(0, 3);

  const macros = [
    {
      label: 'Bílkoviny',
      grams: dish.nutrition.proteinG,
      kcal: dish.nutrition.proteinG * 4,
      color: 'bg-accent',
    },
    {
      label: 'Sacharidy',
      grams: dish.nutrition.carbsG,
      kcal: dish.nutrition.carbsG * 4,
      color: 'bg-macro-carbs',
    },
    {
      label: 'Tuky',
      grams: dish.nutrition.fatG,
      kcal: dish.nutrition.fatG * 9,
      color: 'bg-macro-fat',
    },
  ];
  const macrosKcal = macros.reduce((sum, macro) => sum + macro.kcal, 0) || 1;

  const specs = [
    { label: 'Porce', value: `${dish.portion.amount} ${dish.portion.unit}` },
    { label: 'Energie', value: `${dish.energyKcal} kcal` },
    {
      label: `Na 100 ${dish.portion.unit}`,
      value: `~${Math.round((dish.energyKcal / dish.portion.amount) * 100)} kcal`,
    },
  ];

  return (
    <>
      <section id='hero' className='mt-12 grid items-center gap-10 lg:grid-cols-2'>
        {/* Illustration */}
        <Motion>
          <DishImage
            image={dish.image}
            priority
            sizes='(max-width: 1024px) 100vw, 600px'
            className='rounded-panel aspect-square'
          />
        </Motion>

        {/* Information */}
        <Motion delay={0.1} className='space-y-6'>
          <nav aria-label='Drobečková navigace' className='text-caption text-ink-soft flex gap-2'>
            <Link href='/menu' className='hover:text-accent-deep'>
              Menu
            </Link>
            <span aria-hidden>/</span>
            {category && (
              <Link href={`/kategorie/${category.slug}`} className='hover:text-accent-deep'>
                {category.name}
              </Link>
            )}
          </nav>

          <div className='space-y-3'>
            <h1 className='text-display font-semibold tracking-tight'>{dish.name}</h1>
            <p className='text-lead text-ink-soft'>{dish.tagline}</p>
          </div>

          <div className='flex flex-wrap items-center gap-2'>
            <Badge>{cuisine?.name ?? dish.cuisine} kuchyně</Badge>
            {dish.diets.map((diet) => (
              <Badge key={diet} variant='accent'>
                {dietLabels[diet]}
              </Badge>
            ))}
            <Badge>
              {dish.spiciness ? 'Pálivost' : 'Nepálivé'}
              <Spiciness level={dish.spiciness} />
            </Badge>
          </div>

          <p className='font-display text-display font-semibold'>{formatPrice(dish.priceCzk)}</p>

          <div className='flex flex-wrap gap-3'>
            <ButtonLink href='/rozvoz'>Objednat s rozvozem</ButtonLink>
            <ButtonLink href='/zasyti-me-to' variant='ghost'>
              Zasytí mě to?
            </ButtonLink>
          </div>
        </Motion>
      </section>

      {/* Nutrition and description */}
      <section id='o-jidle' className='grid gap-6 lg:grid-cols-2 lg:items-start'>
        <Motion className='rounded-card bg-paper-muted dark:bg-night-muted space-y-6 p-6 sm:p-8'>
          <h2 className='text-title font-semibold'>Nutriční hodnoty</h2>

          <dl className='grid grid-cols-3 gap-4'>
            {specs.map((spec) => (
              <div key={spec.label}>
                <dt className='text-caption text-ink-soft'>{spec.label}</dt>
                <dd className='font-display text-title font-semibold'>{spec.value}</dd>
              </div>
            ))}
          </dl>

          {/* Macronutrient split */}
          <div className='space-y-3'>
            <div className='rounded-pill bg-paper-raised dark:bg-night-raised flex h-3 overflow-hidden'>
              {macros.map((macro) => (
                <span
                  key={macro.label}
                  className={macro.color}
                  style={{ width: `${(macro.kcal / macrosKcal) * 100}%` }}
                />
              ))}
            </div>
            <ul className='grid grid-cols-3 gap-4'>
              {macros.map((macro) => (
                <li key={macro.label} className='flex items-start gap-2'>
                  <span className={`mt-1.5 size-2.5 shrink-0 rounded-full ${macro.color}`} />
                  <span>
                    <span className='text-caption text-ink-soft block'>{macro.label}</span>
                    <span className='font-semibold'>{macro.grams} g</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Motion>

        <Motion
          delay={0.1}
          className='rounded-card bg-paper-muted dark:bg-night-muted space-y-5 p-6 sm:p-8'>
          <h2 className='text-title font-semibold'>O jídle</h2>
          <p className='text-ink-soft'>{dish.description}</p>
          <ul className='flex flex-wrap gap-2'>
            {dish.highlights.map((highlight) => (
              <li
                key={highlight}
                className='rounded-pill bg-paper-raised dark:bg-night-raised px-3 py-1.5 text-sm font-medium'>
                {highlight}
              </li>
            ))}
          </ul>

          {/* Allergens */}
          <div className='border-line dark:border-line-night space-y-3 border-t pt-5'>
            <div className='flex items-baseline justify-between gap-2'>
              <h3 className='text-title font-semibold'>Alergeny</h3>
              <Link
                href='/alergeny'
                className='text-caption text-accent-deep font-semibold hover:underline'>
                Co čísla znamenají
              </Link>
            </div>
            {dish.allergens.length ? (
              <ul className='flex flex-wrap gap-2'>
                {dish.allergens.map((code) => (
                  <li key={code}>
                    <Badge>
                      <span className='text-ink dark:text-night-ink font-semibold'>{code}</span>
                      {getAllergenByCode(code)?.name}
                    </Badge>
                  </li>
                ))}
              </ul>
            ) : (
              <p className='font-medium'>Neobsahuje žádný ze 14 hlavních alergenů.</p>
            )}
          </div>
        </Motion>
      </section>

      {/* Related dishes */}
      {related.length > 0 && (
        <Section
          id='mohlo-by-ti-chutnat'
          title='Mohlo by ti chutnat'
          href={category ? `/kategorie/${category.slug}` : '/menu'}
          linkLabel={category ? `Vše z kategorie ${category.name}` : 'Zobrazit celé menu'}>
          <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
            {related.map((d) => (
              <DishCard key={d.slug} dish={d} />
            ))}
          </div>
        </Section>
      )}
    </>
  );
}
