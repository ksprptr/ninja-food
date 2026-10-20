'use client';

import { getRange } from '@/common/lib/dishes';
import { CatalogFilters } from '@/common/types/dish.types';
import CatalogFiltersForm from '@/components/forms/CatalogFiltersForm';

import { SlidersHorizontal } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';

interface Props {
  filters: CatalogFilters;
  onChange: (filters: CatalogFilters) => void;
  onReset: () => void;
}

const priceRange = getRange((d) => d.priceCzk);
const energyRange = getRange((d) => d.energyKcal);

/**
 * Component representing a catalog sidebar with filters
 */
export default function CatalogSidebar({ filters, onChange, onReset }: Readonly<Props>) {
  const [open, setOpen] = useState<boolean>(false);

  const form = (
    <CatalogFiltersForm
      filters={filters}
      priceRange={priceRange}
      energyRange={energyRange}
      onChange={onChange}
      onReset={onReset}
    />
  );

  return (
    <aside className='lg:sticky lg:top-24'>
      <noscript>
        <p className='rounded-card bg-paper-muted dark:bg-night-muted text-ink-soft p-4'>
          Filtrování a vyhledávání funguje se zapnutým JavaScriptem. Níže je celé menu.
        </p>
      </noscript>

      <button
        type='button'
        data-requires-js
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className='rounded-pill bg-paper-muted dark:bg-night-muted flex w-full items-center justify-center gap-2 py-3 font-semibold lg:hidden'>
        <SlidersHorizontal size={16} />
        Filtry
      </button>

      {/* Desktop filters */}
      <div data-requires-js className='hidden lg:block'>
        {form}
      </div>

      {/* Mobile filters */}
      <motion.div
        data-requires-js
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className='overflow-hidden lg:hidden'>
        <div className='pt-3'>{form}</div>
      </motion.div>
    </aside>
  );
}
