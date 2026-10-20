import { allergens } from '@/common/lib/allergens';
import { getDishesByAllergen } from '@/common/lib/dishes';
import PageHeader from '@/components/layout/PageHeader';
import ButtonLink from '@/components/ui/ButtonLink';
import Motion from '@/components/ui/Motion';

import { Metadata } from 'next';

// Page description
const description =
  'U každého jídla uvádíme alergeny podle čísel 1 až 14. Tady je přehled, co která čísla znamenají a kolik jídel z menu je obsahuje.';

// Page metadata
export const metadata: Metadata = {
  title: 'Alergeny',
  description,
};

/**
 * Component representing an allergens page
 */
export default function Page() {
  return (
    <>
      {/* Page header */}
      <PageHeader title='Alergeny' description={description} />

      {/* Allergen list */}
      <section id='allergens' className='grid gap-3 md:grid-cols-2'>
        <h2 className='sr-only'>Seznam alergenů</h2>
        {allergens.map((allergen, i) => {
          const count = getDishesByAllergen(allergen.code).length;

          return (
            <Motion key={allergen.code} delay={(i % 2) * 0.06}>
              <article className='rounded-card bg-paper-muted dark:bg-night-muted flex h-full gap-5 p-5'>
                {/* Allergen code */}
                <span
                  className={`font-display grid size-14 shrink-0 place-items-center rounded-full text-2xl font-semibold ${
                    count ? 'bg-blob' : 'bg-paper-raised text-ink-soft dark:bg-night-raised'
                  }`}>
                  {allergen.code}
                </span>

                {/* Allergen name, description and number of dishes */}
                <div className='space-y-1'>
                  <div className='flex flex-wrap items-baseline justify-between gap-x-4'>
                    <h2 className='text-title font-semibold'>{allergen.name}</h2>
                    <p className='text-caption text-ink-soft'>
                      {count ? `${count} jídel v menu` : 'V menu není'}
                    </p>
                  </div>
                  <p className='text-ink-soft'>{allergen.description}</p>
                </div>
              </article>
            </Motion>
          );
        })}
      </section>

      {/* Menu button */}
      <div>
        <ButtonLink href='/menu'>Prohlédnout menu</ButtonLink>
      </div>
    </>
  );
}
