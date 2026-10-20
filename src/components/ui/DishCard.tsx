import { CatalogView } from '@/common/enums/dish.enums';
import { getCuisineBySlug } from '@/common/lib/cuisines';
import { formatPrice } from '@/common/lib/format';
import { Dish } from '@/common/types/dish.types';

import DishImage from './DishImage';
import Spiciness from './Spiciness';
import Link from 'next/link';

interface Props {
  dish: Dish;
  view?: CatalogView;
  large?: boolean;
  eager?: boolean;
}

/**
 * Component representing a dish card
 */
export default function DishCard({ dish, view = CatalogView.GRID, large, eager }: Readonly<Props>) {
  const list = view === CatalogView.LIST;

  return (
    <Link
      href={`/menu/${dish.slug}`}
      className={`group rounded-card bg-paper-raised ring-line hover:shadow-cozy dark:bg-night-muted dark:ring-line-night flex h-full gap-4 p-3 ring-1 transition-all duration-300 hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:translate-y-0 ${
        list ? 'flex-row items-center' : 'flex-col'
      }`}>
      <DishImage
        image={dish.image}
        sizes={large ? '(max-width: 1024px) 100vw, 600px' : '(max-width: 640px) 100vw, 360px'}
        priority={large}
        eager={eager}
        className={`rounded-tile shrink-0 ${
          list
            ? 'aspect-square w-28 sm:w-36'
            : large
              ? 'aspect-4/3 lg:aspect-auto lg:flex-1'
              : 'aspect-4/3'
        }`}
      />
      <div
        className={`flex flex-col gap-1.5 ${list ? 'flex-1 py-1 pr-2' : large ? 'px-2 pb-2' : 'flex-1 px-2 pb-2'}`}>
        <div className='text-caption text-ink-soft flex items-center justify-between gap-2'>
          <span>{getCuisineBySlug(dish.cuisine)?.name ?? dish.cuisine} kuchyně</span>
          <Spiciness level={dish.spiciness} />
        </div>
        <h3 className={`font-semibold ${large ? 'text-section' : 'text-title'}`}>{dish.name}</h3>
        <p className={`text-ink-soft ${large ? 'text-lead' : 'line-clamp-2'}`}>{dish.tagline}</p>
        <div className='mt-auto flex items-end justify-between gap-2 pt-3'>
          <p className='font-display text-title font-semibold'>{formatPrice(dish.priceCzk)}</p>
          <p className='text-caption text-ink-soft'>
            {dish.portion.amount} {dish.portion.unit} / {dish.energyKcal} kcal
          </p>
        </div>
      </div>
    </Link>
  );
}
