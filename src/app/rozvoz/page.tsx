import { delivery } from '@/common/lib/delivery';
import { getDishBySlug } from '@/common/lib/dishes';
import { formatPrice } from '@/common/lib/format';
import PageHeader from '@/components/layout/PageHeader';
import ButtonLink from '@/components/ui/ButtonLink';
import Motion from '@/components/ui/Motion';

import { Clock, MapPin } from 'lucide-react';
import { Metadata } from 'next';
import Image from 'next/image';

// Page description
const description =
  'Vozíme po celém Hradci Králové ve třech zónách. Čím blíž jsi, tím dřív máš jídlo na stole.';

// Page metadata
export const metadata: Metadata = {
  title: 'Rozvoz',
  description,
};

/**
 * Component representing a delivery page
 */
export default function Page() {
  const soda = getDishBySlug('yuzu-soda');

  return (
    <>
      {/* Page header */}
      <PageHeader title='Rozvoz' description={description} />

      {/* Delivery zones */}
      <section id='zones' className='grid gap-4 lg:grid-cols-3'>
        <h2 className='sr-only'>Rozvozové zóny</h2>
        {delivery.zones.map((zone, i) => (
          <Motion key={zone.slug} delay={i * 0.08}>
            <article className='rounded-card bg-paper-muted dark:bg-night-muted flex h-full flex-col gap-5 p-6'>
              {/* Zone name and delivery time */}
              <div className='space-y-1'>
                <h2 className='text-title font-semibold'>{zone.name}</h2>
                <p className='font-display text-display font-semibold'>
                  {zone.deliveryTimeMin.from}
                  {' - '}
                  {zone.deliveryTimeMin.to}
                  <span className='text-ink-soft text-lead font-sans font-normal'> min</span>
                </p>
              </div>

              {/* Areas */}
              <p className='text-ink-soft flex gap-2'>
                <MapPin size={18} className='text-accent-deep mt-0.5 shrink-0' />
                {zone.areas.join(', ')}
              </p>

              {/* Fee and minimum order */}
              <dl className='border-line dark:border-line-night mt-auto grid grid-cols-2 gap-4 border-t pt-4'>
                <div>
                  <dt className='text-caption text-ink-soft'>Doprava</dt>
                  <dd className='font-semibold'>{formatPrice(zone.feeCzk)}</dd>
                </div>
                <div>
                  <dt className='text-caption text-ink-soft'>Minimální objednávka</dt>
                  <dd className='font-semibold'>{formatPrice(zone.minOrderCzk)}</dd>
                </div>
              </dl>
            </article>
          </Motion>
        ))}
      </section>

      {/* Free delivery and opening hours */}
      <section id='oteviraci-doba' className='grid gap-6 lg:grid-cols-[1fr_1.2fr]'>
        <Motion className='rounded-card bg-accent text-accent-ink relative isolate flex flex-col justify-between gap-6 overflow-hidden p-6 sm:p-8'>
          <h2 className='text-section max-w-xs font-semibold tracking-tight'>
            Nad {formatPrice(delivery.freeDeliveryFromCzk)} vozíme zdarma
          </h2>
          <p className='max-w-60 font-medium'>
            Platí ve všech zónách, stačí přidat dezert nebo limonádu.
          </p>
          {soda && (
            <div className='absolute -right-2 -bottom-4 -z-10 aspect-square w-36 rotate-12 sm:w-44'>
              <Image src={soda.image.src} alt='' fill sizes='176px' />
            </div>
          )}
        </Motion>

        <Motion
          delay={0.1}
          className='rounded-card bg-paper-muted dark:bg-night-muted space-y-5 p-6 sm:p-8'>
          <h2 className='text-title flex items-center gap-2 font-semibold'>
            <Clock size={20} className='text-accent-deep' />
            Otevírací doba
          </h2>
          <dl className='divide-line dark:divide-line-night divide-y'>
            {delivery.openingHours.map((hours) => (
              <div key={hours.days} className='flex justify-between gap-4 py-3'>
                <dt className='text-ink-soft'>{hours.days}</dt>
                <dd className='font-semibold'>
                  {hours.from}
                  {' - '}
                  {hours.to}
                </dd>
              </div>
            ))}
          </dl>
          <p className='text-caption text-ink-soft'>
            Poslední objednávky na rozvoz přijímáme 30 minut před zavírací dobou.
          </p>
        </Motion>
      </section>

      {/* Menu button */}
      <div>
        <ButtonLink href='/menu'>Vybrat si z menu</ButtonLink>
      </div>
    </>
  );
}
