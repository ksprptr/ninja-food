import { getDishBySlug, getFeaturedDishes } from '@/common/lib/dishes';
import FeaturedDishes from '@/components/catalog/FeaturedDishes';
import PageHeader from '@/components/layout/PageHeader';
import ButtonLink from '@/components/ui/ButtonLink';
import DishImage from '@/components/ui/DishImage';

/**
 * Component representing a not found page
 */
export default function Page() {
  const featuredDishes = getFeaturedDishes();
  const edamame = getDishBySlug('edamame');

  return (
    <>
      {/* Title section */}
      <section id='hero' className='grid items-center gap-8 md:grid-cols-[1fr_18rem]'>
        <div className='space-y-6'>
          <PageHeader
            title='Tahle stránka není v menu'
            description='Možná jsme ji stáhli, nebo se v odkazu schovala chyba. Zkus to z domovské stránky.'
          />
          <ButtonLink href='/'>Zpět na domovskou stránku</ButtonLink>
        </div>
        {edamame && (
          <DishImage image={edamame.image} sizes='288px' className='aspect-square rounded-full' />
        )}
      </section>

      {/* Featured dishes */}
      <FeaturedDishes dishes={featuredDishes} />
    </>
  );
}
