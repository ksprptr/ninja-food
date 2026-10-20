'use client';

import { CatalogSort, CatalogView } from '@/common/enums/dish.enums';
import { filterDishes, getDefaultFilters, sortDishes } from '@/common/lib/dishes';
import { CatalogFilters } from '@/common/types/dish.types';

import CatalogResults from './CatalogResults';
import CatalogSidebar from './CatalogSidebar';
import CatalogToolbar from './CatalogToolbar';
import { useMemo, useState } from 'react';

/**
 * Component representing a dish catalog with its filters
 */
export default function DishCatalog() {
  const [filters, setFilters] = useState<CatalogFilters>(getDefaultFilters);
  const [sort, setSort] = useState<CatalogSort>(CatalogSort.PRICE_ASC);
  const [view, setView] = useState<CatalogView>(CatalogView.GRID);

  const results = useMemo(() => sortDishes(filterDishes(filters), sort), [filters, sort]);

  const resetFilters = () => setFilters(getDefaultFilters());

  return (
    <div className='gap-block grid lg:grid-cols-[22rem_1fr] lg:items-start'>
      {/* Filters sidebar */}
      <CatalogSidebar filters={filters} onChange={setFilters} onReset={resetFilters} />

      {/* Catalog */}
      <div className='space-y-5'>
        <CatalogToolbar
          count={results.length}
          sort={sort}
          view={view}
          onSortChange={setSort}
          onViewChange={setView}
        />

        <CatalogResults dishes={results} view={view} onReset={resetFilters} />
      </div>
    </div>
  );
}
