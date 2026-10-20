import { Dish } from '@/common/types/dish.types';

import Section from '../layout/Section';
import DishCard from '../ui/DishCard';

// Props interface
interface Props {
  dishes: Dish[];
}

/**
 * Component representing a featured dishes section
 */
export default function FeaturedDishes({ dishes }: Readonly<Props>) {
  const [first, ...rest] = dishes;

  return (
    <Section
      id='doporucujeme'
      title='Doporučujeme'
      description='Jídla, pro která si k nám lidé chodí nejčastěji.'
      href='/menu'
      linkLabel='Zobrazit celé menu'>
      <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
        {first && (
          <div className='sm:col-span-2 lg:row-span-2'>
            <DishCard dish={first} large />
          </div>
        )}
        {rest.map((dish) => (
          <DishCard key={dish.slug} dish={dish} />
        ))}
      </div>
    </Section>
  );
}
