import PageHeader from '@/components/layout/PageHeader';

import DishCatalog from './components/DishCatalog';
import { Metadata } from 'next';

// Page description
const description =
  'Filtruj v reálném čase podle diety, kuchyně, kategorie, ceny i energetické hodnoty.';

// Page metadata
export const metadata: Metadata = {
  title: 'Menu',
  description,
};

/**
 * Component representing a menu page
 */
export default function Page() {
  return (
    <>
      {/* Page header */}
      <PageHeader title='Jídelní lístek' description={description} />

      {/* Dish catalog */}
      <DishCatalog />
    </>
  );
}
