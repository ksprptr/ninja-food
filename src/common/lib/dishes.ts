import { CatalogSort, DietTag } from '@/common/enums/dish.enums';
import { CatalogFilters, CatalogRange, Dish } from '@/common/types/dish.types';
import { dishValidationSchema } from '@/common/validations/dish.validations';
import dishData from '@/data/dishes.json';

import z from 'zod';

// Dishes array
export const dishes: Dish[] = z.array(dishValidationSchema).parse(dishData);

// Diet labels
export const dietLabels: Record<DietTag, string> = {
  [DietTag.VEGETARIAN]: 'Vegetariánské',
  [DietTag.VEGAN]: 'Veganské',
  [DietTag.GLUTEN_FREE]: 'Bez lepku',
};

/**
 * Function to get dish by slug
 */
export const getDishBySlug = (slug: string): Dish | null => {
  const dish = dishes.find((d) => d.slug === slug);

  return dish || null;
};

/**
 * Function to get a numeric range of a dish property
 */
export const getRange = (pick: (dish: Dish) => number): CatalogRange => {
  const values = dishes.map(pick);

  return {
    min: Math.min(...values),
    max: Math.max(...values),
  };
};

/**
 * Function to build default catalog filters
 */
export const getDefaultFilters = (): CatalogFilters => ({
  search: '',
  cuisines: [],
  categories: [],
  diets: [],
  priceCzkMax: getRange((d) => d.priceCzk).max,
  energyKcalMax: getRange((d) => d.energyKcal).max,
});

/**
 * Function to filter dishes by catalog filters
 */
export const filterDishes = (filters: CatalogFilters): Dish[] => {
  const search = filters.search.trim().toLowerCase();

  return dishes.filter((d) => {
    const label = `${d.cuisine} ${d.name}`.toLowerCase();

    return (
      (!search || label.includes(search)) &&
      (!filters.cuisines.length || filters.cuisines.includes(d.cuisine)) &&
      (!filters.categories.length || filters.categories.includes(d.category)) &&
      filters.diets.every((diet) => d.diets.includes(diet)) &&
      d.priceCzk <= filters.priceCzkMax &&
      d.energyKcal <= filters.energyKcalMax
    );
  });
};

/**
 * Function to sort dishes
 */
export const sortDishes = (list: Dish[], sort: CatalogSort): Dish[] => {
  const comparators: Record<CatalogSort, (a: Dish, b: Dish) => number> = {
    [CatalogSort.PRICE_ASC]: (a, b) => a.priceCzk - b.priceCzk,
    [CatalogSort.PRICE_DESC]: (a, b) => b.priceCzk - a.priceCzk,
    [CatalogSort.PROTEIN_DESC]: (a, b) => b.nutrition.proteinG - a.nutrition.proteinG,
    [CatalogSort.ENERGY_ASC]: (a, b) => a.energyKcal - b.energyKcal,
  };

  return [...list].sort(comparators[sort]);
};

/**
 * Function to get featured dishes
 */
export const getFeaturedDishes = (): Dish[] => {
  return dishes.filter((d) => d.featured);
};

/**
 * Funciton to get dishes by category
 */
export const getDishesByCategory = (category: string): Dish[] => {
  return dishes.filter((d) => d.category === category);
};

/**
 * Function to get dishes by allergen
 */
export const getDishesByAllergen = (code: number): Dish[] => {
  return dishes.filter((d) => d.allergens.includes(code));
};
