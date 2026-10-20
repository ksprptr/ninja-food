'use client';

import { Tone } from '@/common/enums/calculator.enums';
import { calculators } from '@/common/lib/calculators';
import { dishes } from '@/common/lib/dishes';
import { getDailyKcal, getSatietyThreshold } from '@/common/lib/satiety';

import Range from '../inputs/Range';
import Select from '../inputs/Select';
import DishCard from '../ui/DishCard';
import DishImage from '../ui/DishImage';
import Motion from '../ui/Motion';
import { AnimatePresence, motion } from 'motion/react';
import { useMemo, useState } from 'react';

const toneClasses: Record<Tone, string> = {
  [Tone.SUCCESS]: 'bg-tone-success/12 text-tone-success',
  [Tone.OK]: 'bg-tone-ok/12 text-tone-ok',
  [Tone.WARNING]: 'bg-tone-warning/12 text-tone-warning',
  [Tone.DANGER]: 'bg-tone-danger/12 text-tone-danger',
};

const barClasses: Record<Tone, string> = {
  [Tone.SUCCESS]: 'bg-tone-success',
  [Tone.OK]: 'bg-tone-ok',
  [Tone.WARNING]: 'bg-tone-warning',
  [Tone.DANGER]: 'bg-tone-danger',
};

/**
 * Component representing a dish satiety calculator
 */
export default function SatietyCalculator() {
  const [weightKg, setWeightKg] = useState<number>(75);
  const [slug, setSlug] = useState<string>(dishes[0].slug);

  const dish = dishes.find((d) => d.slug === slug) ?? dishes[0];
  const threshold = getSatietyThreshold(dish.energyKcal, weightKg);
  const dailyKcal = Math.round(getDailyKcal(weightKg));
  const share = Math.min(dish.energyKcal / dailyKcal, 1);

  const light = useMemo(
    () =>
      dishes
        .filter((d) => getSatietyThreshold(d.energyKcal, weightKg).tone === Tone.SUCCESS)
        .sort((a, b) => b.energyKcal - a.energyKcal)
        .slice(0, 3),
    [weightKg],
  );

  return (
    <div className='space-y-section'>
      <div className='grid gap-6 lg:grid-cols-[1fr_1.1fr]'>
        {/* Body weight and dish selection */}
        <Motion className='rounded-card bg-paper-muted dark:bg-night-muted flex flex-col gap-8 p-6 sm:p-8'>
          <Range
            label='Tvoje hmotnost'
            valueLabel={`${weightKg} kg`}
            min={45}
            max={130}
            step={1}
            value={weightKg}
            onChange={setWeightKg}
          />
          <Select
            label='Jídlo'
            value={slug}
            options={dishes.map((dishItem) => ({
              value: dishItem.slug,
              label: `${dishItem.name} (${dishItem.energyKcal} kcal)`,
            }))}
            onChange={setSlug}
          />
          <p className='text-caption text-ink-soft mt-auto'>{calculators.satiety.disclaimer}</p>
        </Motion>

        {/* Satiety result */}
        <Motion delay={0.1}>
          <div
            aria-live='polite'
            className='rounded-card bg-paper-raised ring-line dark:bg-night-muted dark:ring-line-night grid h-full gap-6 p-6 ring-1 sm:grid-cols-[10rem_1fr] sm:items-center sm:p-8'>
            <AnimatePresence mode='wait' initial={false}>
              <motion.div
                key={dish.slug}
                initial={{ opacity: 0, scale: 0.8, rotate: -6 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.8, rotate: 6 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}>
                <DishImage
                  image={dish.image}
                  sizes='160px'
                  className='mx-auto aspect-square w-40 rounded-full'
                />
              </motion.div>
            </AnimatePresence>

            <div className='space-y-4'>
              <p
                className={`rounded-pill w-fit px-3 py-1 text-sm font-semibold transition-colors ${toneClasses[threshold.tone]}`}>
                {threshold.label}
              </p>
              <p className='font-display text-section font-semibold'>
                {Math.round(share * 100)} % denní potřeby
              </p>

              {/* Share of the daily energy intake */}
              <div className='rounded-pill bg-paper-muted dark:bg-night-raised h-3 overflow-hidden'>
                <motion.span
                  animate={{ width: `${share * 100}%` }}
                  transition={{ type: 'spring', stiffness: 120, damping: 20 }}
                  className={`rounded-pill block h-full transition-colors ${barClasses[threshold.tone]}`}
                />
              </div>
              <p className='text-caption text-ink-soft'>
                {dish.name} má {dish.energyKcal} kcal, tvoje odhadovaná denní potřeba je {dailyKcal}{' '}
                kcal.
              </p>
            </div>
          </div>
        </Motion>
      </div>

      {/* Light dishes */}
      {light.length > 0 && (
        <Motion as='section' className='space-y-6'>
          <h2 className='text-section font-semibold tracking-tight'>Lehká jídla pro tebe</h2>
          <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
            {light.map((dishItem) => (
              <DishCard key={dishItem.slug} dish={dishItem} />
            ))}
          </div>
        </Motion>
      )}
    </div>
  );
}
