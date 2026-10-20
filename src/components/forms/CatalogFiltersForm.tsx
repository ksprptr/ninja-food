'use client';

import { DietTag } from '@/common/enums/dish.enums';
import { categories } from '@/common/lib/categories';
import { cuisines } from '@/common/lib/cuisines';
import { dietLabels, dishes } from '@/common/lib/dishes';
import { formatPrice } from '@/common/lib/format';
import { CatalogFilters, CatalogRange } from '@/common/types/dish.types';

import Checkbox from '../inputs/Checkbox';
import Input from '../inputs/Input';
import Range from '../inputs/Range';
import { Search } from 'lucide-react';

interface Props {
  filters: CatalogFilters;
  priceRange: CatalogRange;
  energyRange: CatalogRange;
  onChange: (filters: CatalogFilters) => void;
  onReset: () => void;
}

const availableCuisines = cuisines.filter((c) => dishes.some((d) => d.cuisine === c.slug));

const toggle = <T,>(values: T[], value: T): T[] =>
  values.includes(value) ? values.filter((v) => v !== value) : [...values, value];

/**
 * Component representing a catalog filters form
 */
export default function CatalogFiltersForm({
  filters,
  priceRange,
  energyRange,
  onChange,
  onReset,
}: Readonly<Props>) {
  return (
    <form
      onSubmit={(event) => event.preventDefault()}
      className='rounded-card bg-paper-muted dark:bg-night-muted flex flex-col gap-6 p-4'>
      <Input
        type='search'
        icon={Search}
        value={filters.search}
        placeholder='Hledat jídlo'
        aria-label='Hledat jídlo'
        onChange={(search) => onChange({ ...filters, search })}
      />

      <fieldset className='space-y-2'>
        <legend className='text-caption font-semibold'>Dieta</legend>
        <div className='grid grid-cols-2 gap-2'>
          {Object.values(DietTag).map((diet) => (
            <Checkbox
              key={diet}
              label={dietLabels[diet]}
              checked={filters.diets.includes(diet)}
              onChange={() => onChange({ ...filters, diets: toggle(filters.diets, diet) })}
            />
          ))}
        </div>
      </fieldset>

      <fieldset className='space-y-2'>
        <legend className='text-caption font-semibold'>Kuchyně</legend>
        <div className='grid grid-cols-2 gap-2'>
          {availableCuisines.map((cuisine) => (
            <Checkbox
              key={cuisine.slug}
              label={cuisine.name}
              checked={filters.cuisines.includes(cuisine.slug)}
              onChange={() =>
                onChange({ ...filters, cuisines: toggle(filters.cuisines, cuisine.slug) })
              }
            />
          ))}
        </div>
      </fieldset>

      <fieldset className='space-y-2'>
        <legend className='text-caption font-semibold'>Kategorie</legend>
        <div className='grid grid-cols-2 gap-2'>
          {categories.map((category) => (
            <Checkbox
              key={category.slug}
              label={category.name}
              checked={filters.categories.includes(category.slug)}
              onChange={() =>
                onChange({ ...filters, categories: toggle(filters.categories, category.slug) })
              }
            />
          ))}
        </div>
      </fieldset>

      <Range
        label='Cena do'
        valueLabel={formatPrice(filters.priceCzkMax)}
        min={priceRange.min}
        max={priceRange.max}
        step={10}
        value={filters.priceCzkMax}
        onChange={(priceCzkMax) => onChange({ ...filters, priceCzkMax })}
      />

      <Range
        label='Energie do'
        valueLabel={`${filters.energyKcalMax} kcal`}
        min={energyRange.min}
        max={energyRange.max}
        step={10}
        value={filters.energyKcalMax}
        onChange={(energyKcalMax) => onChange({ ...filters, energyKcalMax })}
      />

      <button
        type='button'
        onClick={onReset}
        className='rounded-pill bg-paper-raised text-ink-soft ring-line hover:text-ink dark:bg-night-raised dark:ring-line-night dark:hover:text-night-ink py-2.5 font-semibold ring-1 transition-colors'>
        Zrušit filtry
      </button>
    </form>
  );
}
