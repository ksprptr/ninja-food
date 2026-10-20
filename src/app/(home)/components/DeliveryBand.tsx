import { delivery } from '@/common/lib/delivery';
import { getDishBySlug } from '@/common/lib/dishes';
import { formatPrice } from '@/common/lib/format';
import ButtonLink from '@/components/ui/ButtonLink';
import Motion from '@/components/ui/Motion';

import Image from 'next/image';

/**
 * Component representing a delivery and opening hours band
 */
export default function DeliveryBand() {
  const fries = getDishBySlug('ninja-hranolky');

  return (
    <Motion
      as='section'
      id='rozvoz'
      className='dark rounded-panel bg-night-muted text-night-ink relative isolate overflow-hidden px-6 py-10 sm:px-12 sm:py-14'>
      <span className='bg-blob absolute -right-32 -bottom-40 -z-10 size-80 rounded-full' />
      <div className='grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center'>
        {/* Delivery zones */}
        <div className='space-y-6'>
          <h2 className='text-section font-semibold tracking-tight'>Uvaříme a dovezeme</h2>
          <p className='text-ink-soft max-w-md'>
            Rozvážíme po celém Hradci Králové ve třech zónách. Při objednávce nad{' '}
            {formatPrice(delivery.freeDeliveryFromCzk)} je doprava zdarma.
          </p>
          <ul className='divide-line-night divide-y'>
            {delivery.zones.map((zone) => (
              <li
                key={zone.slug}
                className='flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-3'>
                <span className='font-display text-title font-semibold'>{zone.name}</span>
                <span className='text-ink-soft'>
                  {zone.deliveryTimeMin.from}–{zone.deliveryTimeMin.to} min,{' '}
                  {formatPrice(zone.feeCzk)}
                </span>
              </li>
            ))}
          </ul>
          <ButtonLink href='/rozvoz'>Zobrazit podmínky rozvozu</ButtonLink>
        </div>

        {/* Opening hours */}
        <div className='relative'>
          <div className='rounded-card bg-night-raised space-y-4 p-6'>
            <h3 className='text-title font-semibold'>Otevírací doba</h3>
            <dl className='grid gap-3'>
              {delivery.openingHours.map((hours) => (
                <div key={hours.days} className='flex justify-between gap-4'>
                  <dt className='text-ink-soft'>{hours.days}</dt>
                  <dd className='font-semibold'>
                    {hours.from}
                    {' - '}
                    {hours.to}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          {fries && (
            <div className='absolute -top-16 -right-4 hidden size-32 rotate-12 sm:block'>
              <Image src={fries.image.src} alt='' fill sizes='128px' />
            </div>
          )}
        </div>
      </div>
    </Motion>
  );
}
