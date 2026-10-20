import { getDishesByCategory } from '@/common/lib/dishes';
import { Category } from '@/common/types/category.types';

import DishImage from './DishImage';
import {
  CupSoda,
  Drumstick,
  Hamburger,
  IceCreamCone,
  LucideIcon,
  Salad,
  Sandwich,
  Soup,
} from 'lucide-react';
import Link from 'next/link';

interface Props {
  category: Category;
  compact?: boolean;
  active?: boolean;
  eager?: boolean;
}

export const icons: Record<string, LucideIcon> = {
  hamburger: Hamburger,
  sandwich: Sandwich,
  salad: Salad,
  soup: Soup,
  drumstick: Drumstick,
  'ice-cream-cone': IceCreamCone,
  'cup-soda': CupSoda,
};

/**
 * Component representing a category card
 */
export default function CategoryCard({ category, compact, active, eager }: Readonly<Props>) {
  const Icon = icons[category.icon] ?? Hamburger;
  const categoryDishes = getDishesByCategory(category.slug);

  if (compact) {
    // Other categories are dimmed when one of them is active
    const dimmed = active === false;

    return (
      <Link
        href={`/kategorie/${category.slug}`}
        aria-current={active ? 'page' : undefined}
        className='group flex w-24 shrink-0 snap-start flex-col items-center gap-3 text-center sm:w-auto'>
        <span
          data-category-circle
          className={`grid size-20 place-items-center rounded-full transition-colors duration-300 sm:size-24 ${
            active
              ? 'bg-accent shadow-glow in-data-indicator-ready:bg-transparent in-data-indicator-ready:shadow-none'
              : 'bg-paper-muted group-hover:bg-blob dark:bg-night-muted'
          }`}>
          <Icon
            size={32}
            strokeWidth={active ? 2.25 : 1.75}
            className={`relative z-2 transition-[color,opacity,transform] duration-300 group-hover:scale-110 group-hover:-rotate-6 motion-reduce:transition-none ${
              active ? 'text-accent-ink' : 'text-accent-deep'
            } ${dimmed ? 'opacity-60 group-hover:opacity-100' : ''}`}
          />
        </span>
        <span
          className={`text-caption flex flex-col items-center gap-1.5 font-semibold transition-colors sm:text-sm ${
            dimmed ? 'text-ink-soft group-hover:text-ink dark:group-hover:text-night-ink' : ''
          }`}>
          {category.name}

          {/* Active category marker */}
          {active && (
            <span
              data-category-marker
              className='bg-accent rounded-pill h-1 w-8 in-data-indicator-ready:invisible'
            />
          )}
        </span>
      </Link>
    );
  }

  return (
    <Link
      href={`/kategorie/${category.slug}`}
      className='group rounded-card bg-paper-raised ring-line hover:shadow-cozy dark:bg-night-muted dark:ring-line-night flex h-full flex-col gap-4 p-3 ring-1 transition-all duration-300 hover:-translate-y-1 motion-reduce:transition-none'>
      {categoryDishes[0] && (
        <DishImage
          image={categoryDishes[0].image}
          eager={eager}
          sizes='(max-width: 640px) 100vw, 360px'
          className='rounded-tile aspect-16/10'
        />
      )}
      <div className='flex flex-1 flex-col gap-1.5 px-2 pb-2'>
        <div className='flex items-center justify-between gap-2'>
          <h3 className='text-title font-semibold'>{category.name}</h3>
          <Icon size={20} className='text-accent-deep' />
        </div>
        <p className='text-ink-soft'>{category.description}</p>
        <p className='text-caption text-ink-soft mt-auto pt-2'>
          {categoryDishes.length} jídel v menu
        </p>
      </div>
    </Link>
  );
}
