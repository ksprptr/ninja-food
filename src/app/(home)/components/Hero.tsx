'use client';

import { delivery } from '@/common/lib/delivery';
import { getDishBySlug } from '@/common/lib/dishes';
import { formatPrice } from '@/common/lib/format';
import ButtonLink from '@/components/ui/ButtonLink';

import { motion } from 'motion/react';
import Image from 'next/image';

const ease = [0.22, 1, 0.36, 1] as const;

const sideDishes = [
  { slug: 'tonkotsu-ramen', className: 'bottom-[4%] left-[-2%] w-[38%]', delay: 0.55, float: 7 },
  { slug: 'matcha-limonada', className: 'top-[2%] right-[2%] w-[27%]', delay: 0.65, float: 9 },
  { slug: 'gyoza', className: 'right-[-4%] bottom-[10%] w-[33%]', delay: 0.75, float: 6 },
];

const facts = [
  { value: `od ${Math.min(...delivery.zones.map((z) => z.feeCzk))} Kč`, label: 'rozvoz po Hradci' },
  { value: formatPrice(delivery.freeDeliveryFromCzk), label: 'a vozíme zdarma' },
  { value: `${delivery.zones[0].deliveryTimeMin.to} min`, label: 'do centra' },
];

/**
 * Component representing a home page hero with an illustrated plate
 */
export default function Hero() {
  const burger = getDishBySlug('ninja-burger');

  return (
    <section
      id='hero'
      className='mt-12 grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-8'>
      {/* Title, description and actions */}
      <div className='space-y-7'>
        <motion.h1
          data-reveal
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease }}
          className='text-hero max-w-xl font-semibold tracking-tight'>
          Street food rychlostí ninji
        </motion.h1>
        <motion.p
          data-reveal
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.7, ease }}
          className='text-lead text-ink-soft max-w-md'>
          Burgery, ramen, bowly a wrapy inspirované americkou a asijskou kuchyní. Vaříme z čerstvých
          surovin a po Hradci ti jídlo dovezeme do hodiny.
        </motion.p>
        <motion.div
          data-reveal
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.7, ease }}
          className='flex flex-wrap gap-3'>
          <ButtonLink href='/menu'>Prohlédnout menu</ButtonLink>
          <ButtonLink href='/rozvoz' variant='ghost'>
            Kam vozíme?
          </ButtonLink>
        </motion.div>

        {/* Delivery facts */}
        <motion.dl
          data-reveal
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45, duration: 0.8 }}
          className='flex flex-wrap gap-x-8 gap-y-4 pt-2'>
          {facts.map((fact) => (
            <div key={fact.label} className='flex flex-col-reverse'>
              <dt className='text-caption text-ink-soft'>{fact.label}</dt>
              <dd className='font-display text-title font-semibold'>{fact.value}</dd>
            </div>
          ))}
        </motion.dl>
      </div>

      {/* Illustrated plate */}
      <div className='relative mx-auto aspect-square w-full max-w-136'>
        <motion.span
          data-reveal
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.9, ease }}
          className='bg-blob absolute inset-[6%] rounded-full'
        />
        <motion.span
          data-reveal
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.9, ease }}
          className='bg-paper-raised ring-paper-muted dark:bg-night-muted dark:ring-night-raised shadow-cozy absolute inset-[18%] rounded-full ring-14'
        />
        {burger && (
          <motion.div
            data-reveal
            initial={{ y: -60, opacity: 0, rotate: -8 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 160, damping: 14 }}
            className='absolute inset-[20%]'>
            <Image src={burger.image.src} alt={burger.image.alt} fill priority sizes='400px' />
          </motion.div>
        )}

        {sideDishes.map(({ slug, className, delay, float }) => {
          const dish = getDishBySlug(slug);

          if (!dish) return null;

          return (
            <motion.div
              key={slug}
              data-reveal
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay, type: 'spring', stiffness: 220, damping: 16 }}
              className={`absolute aspect-square ${className}`}>
              <motion.div
                animate={{ y: [0, -float, 0] }}
                transition={{ duration: 5 + float / 3, repeat: Infinity, ease: 'easeInOut' }}
                className='relative size-full'>
                <Image src={dish.image.src} alt={dish.image.alt} fill sizes='200px' />
              </motion.div>
            </motion.div>
          );
        })}

        {/* Sticker */}
        <motion.p
          data-reveal
          initial={{ scale: 0, rotate: -40 }}
          animate={{ scale: 1, rotate: -12 }}
          transition={{ delay: 0.95, type: 'spring', stiffness: 260, damping: 14 }}
          className='bg-accent text-accent-ink font-display absolute top-[8%] left-[4%] grid size-24 place-items-center rounded-full text-center text-sm leading-tight font-semibold sm:size-28 sm:text-base'>
          Čerstvě
          <br />
          každý den
        </motion.p>
      </div>
    </section>
  );
}
