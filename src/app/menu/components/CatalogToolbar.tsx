'use client';

import { CatalogSort, CatalogView } from '@/common/enums/dish.enums';
import Select from '@/components/inputs/Select';

import { LayoutGrid, Rows3 } from 'lucide-react';
import { motion } from 'motion/react';

interface Props {
  count: number;
  sort: CatalogSort;
  view: CatalogView;
  onSortChange: (sort: CatalogSort) => void;
  onViewChange: (view: CatalogView) => void;
}

const sortLabels: Record<CatalogSort, string> = {
  [CatalogSort.PRICE_ASC]: 'Cena vzestupně',
  [CatalogSort.PRICE_DESC]: 'Cena sestupně',
  [CatalogSort.PROTEIN_DESC]: 'Nejvíc bílkovin',
  [CatalogSort.ENERGY_ASC]: 'Nejméně kalorií',
};

const sortOptions = Object.values(CatalogSort).map((value) => ({
  value,
  label: sortLabels[value],
}));

const viewOptions = [
  { value: CatalogView.GRID, label: 'Mřížka', Icon: LayoutGrid },
  { value: CatalogView.LIST, label: 'Seznam', Icon: Rows3 },
];

/**
 * Component representing a catalog toolbar with the result count, sorting and view toggle
 */
export default function CatalogToolbar({
  count,
  sort,
  view,
  onSortChange,
  onViewChange,
}: Readonly<Props>) {
  return (
    <div className='flex flex-wrap items-center justify-between gap-3'>
      <p className='text-ink-soft' aria-live='polite'>
        Nalezeno {count} jídel
      </p>

      <div data-requires-js className='flex items-center gap-2'>
        {/* Sorting */}
        <Select
          aria-label='Řazení'
          value={sort}
          options={sortOptions}
          onChange={onSortChange}
          className='text-caption'
        />

        {/* View toggle */}
        <div className='rounded-pill bg-paper-muted dark:bg-night-muted flex p-1'>
          {viewOptions.map(({ value, label, Icon }) => (
            <button
              key={value}
              type='button'
              aria-label={label}
              aria-pressed={view === value}
              onClick={() => onViewChange(value)}
              className={`rounded-pill relative p-2 transition-colors ${
                view === value
                  ? 'text-accent-ink'
                  : 'text-ink-soft hover:text-ink dark:hover:text-night-ink'
              }`}>
              {view === value && (
                <motion.span
                  layoutId='catalog-view'
                  transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  className='bg-accent rounded-pill absolute inset-0'
                />
              )}
              <Icon size={16} className='relative' />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
