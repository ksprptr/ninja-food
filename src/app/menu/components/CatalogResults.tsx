'use client';

import { CatalogView } from '@/common/enums/dish.enums';
import { Dish } from '@/common/types/dish.types';
import DishCard from '@/components/ui/DishCard';

import { AnimatePresence, motion } from 'motion/react';

interface Props {
  dishes: Dish[];
  view: CatalogView;
  onReset: () => void;
}

/**
 * Component representing catalog results
 */
export default function CatalogResults({ dishes, view, onReset }: Readonly<Props>) {
  return (
    <>
      <h2 className='sr-only'>Nabídka jídel</h2>
      {dishes.length ? (
        <motion.ul
          layout
          className={
            view === CatalogView.GRID
              ? 'grid gap-4 sm:grid-cols-2 xl:grid-cols-3'
              : 'flex flex-col gap-3'
          }>
          <AnimatePresence mode='popLayout' initial={false}>
            {dishes.map((dish, i) => (
              <motion.li
                key={dish.slug}
                layout
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ type: 'spring', stiffness: 320, damping: 30 }}>
                <DishCard dish={dish} view={view} eager={i < 3} />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className='rounded-card bg-paper-muted dark:bg-night-muted space-y-3 p-10 text-center'>
          <p className='font-display text-title font-semibold'>
            Žádné jídlo neodpovídá zvoleným filtrům.
          </p>
          <button
            type='button'
            onClick={onReset}
            className='text-accent-deep decoration-accent font-semibold underline decoration-2 underline-offset-4'>
            Zrušit filtry
          </button>
        </motion.div>
      )}
    </>
  );
}
